//
// declare global variables
//

let Page, LastCategory, Store = {};

//
// setup the application.
//

//
// ActiveElements is an object that contains functions
// which set the correct active elements.
//

const ActiveElements = {

    //
    // All is a function that runs all active menu item
    // changes.
    //

    All: function() {
        ActiveElements.SetActiveTopbarItem();
        ActiveElements.SetActiveSidebarItem();
    },

    //
    // SetActiveSubnavItem is a function that changes the
    // active sidebar menu item.
    //

    SetActiveSidebarItem: function() {
        let linkClass = `link-${Page[0]}`;

        // remove all currently active pages
        $(".sidebar li").removeClass("active");

        // set the correct active sidebar item
        if (Page[0] !== "") {
            if (Page[1] !== "") {
                linkClass += `-${Page[1]}`;
            }

            if (Page[2] !== "") {
                linkClass += `-${Page[2]}`;
            }

            $(".sidebar li." + linkClass).addClass("active");
        }
    },

    //
    // SetActiveTopbarItem is a function that changes the
    // active topbar menu item.
    //

    SetActiveTopbarItem: function() {
        // remove all currently active pages
        $(".topbar li").removeClass("active");

        // set the correct active topbar item
        $(".topbar li#" + (Page[1] === "" ? "home" : Page[1])).addClass("active");
    }

};

//
// ChangeCategories is an object that contains functions,
// and helper functions, which load and unload content.
//

const ChangeCategories = {

    //
    // ChangeMainCategory is a function that changes
    // the main category we are currently on.
    //

    ChangeMainCategory: function() {
        $(".sidebar").find("li, .sidebar-logo").off("click").on("click", function() {
            const category = $(this).data("category"),
                page = $(this).data("page"),
                subpage = $(this).data("subpage");

            if (category === Page[0] && page === Page[1] && subpage === Page[2]) {
                return false;
            } else {
                Page[0] = category;
                Page[1] = page;
                Page[2] = subpage;
                Page[3] = "";

                return ChangeCategories.iChangeCategories();
            }
        });
    },

    //
    // ChangeSubCategory is a function that changes the
    // subcategory that we are currently on. This is
    // similar to ChangeMainCategory, but needs to
    // be rebinded every time we load a new page.
    // It's also a tiny-bit different.
    //

    ChangeSubCategory: function() {
        $(".topbar ul li").off("click").on("click", function() {
            let id = $(this).attr("id");

            Page[1] = id === "home" ? "" : id;
            Page[2] = "";
            Page[3] = "";

            return ChangeCategories.iChangeCategories();
        });
    },

    //
    // iChangeCategories is a helper function that
    // all the other functions in this object use
    // so we don't duplicate code anywhere.
    //

    iChangeCategories: function(callback) {
        // get just the path
        let path = Page.join("/");

        path = path === "/" ? "" : path;

        // fix problems
        Page[0] = typeof Page[0] === "undefined" ? "" : Page[2];

        // change the history/browser url
        path = ("/dashboard/" + path.replace(/\/\/|\/$/, "")).replace(/\/\/|\/$/, "");
        history.pushState(null, null, path);

        // browser url has been changed, so update your cached value
        Page = GetPage();

        // set the new active list items
        ActiveElements.All();

        // load new content into our container
        LoadNewContent(callback);
    },

    //
    // RunPageScripts is a function that runs local
    // scripts for each main category page.
    //

    RunPageScripts: function() {
        switch (Page[0]) {
            case "access":
                access.Init(Page[1]);
                break;
            case "content":
                content.Init(Page[1]);
                break;
            case "availability":
                availability.Init(Page[1]);
                break;
            case "press":
                press.Init(Page[1]);
                break;
        }
    },

    //
    // ChangePageOptions is a function that looks for
    // a div with the class "page-options" and then for
    // each data attribute it has, it adjusts the look
    // of that page.
    //

    ChangePageOptions: function() {
        // get our dataset
        let opts = $(".page-options")[0];

        opts = typeof opts === "undefined" ? {} : opts.dataset;

        // container adds classes to the container. If we don't have
        // this then we need to set it back to normal.
        if (opts.container) {
            $("#dashboard-container").addClass(opts.container);
        } else {
            $("#dashboard-container").removeClass();
        }
    }

};

//
// GetPage is a function that returns which page we are
// currently on. It returns it in an array with two set
// values.
//
// [0] the main page
// [1] the sub-page
//

function GetPage() {
    return [
        location.href.split("/")[4],
        location.href.split("/")[5],
        location.href.split("/")[6],
        location.href.split("/")[7]
    ].map(function(L) {
        if (typeof L === "undefined") {
            return "";
        } else {
            return L.split("?")[0].split("#")[0];
        }
    });
}

//
// LoadNewContent is a function that loads new content
// into the container on the page. There should only
// EVER be one container on the page, and all the
// content is loaded into that container. Things
// might get screwed up if someone adds more
// containers anywhere, so please do not.
//

function LoadNewContent(callback) {
    const $loading = $(".loading");
    let failed = false;

    // it's possible that the user might navigate manually to a panel that doesn't exist
    // if they do, they'll get caught in a state where it looks like something is loading
    // we need to give them feedback. this function should display an error message
    const failureHandler = function(response) {
        if (!failed) {
            failed = true;

            // fade out the loading spinner
            $loading.fadeOut(250);

            // fade in the error
            $("#dashboard-container").html(response.responseText).fadeIn(100);
        }
    };

    // iFinishedLoading is a helper function for the parent
    // function, LoadNewContent. It is called when one of
    // the elements that ajax new content in is finished
    // loading their content. If all of them are done
    // loading their content, then we fade out our loading screen
    const iFinishedLoading = function() {
        if ([ ".topbar", "#dashboard-container" ].filter(function(elem) {
            return $(elem).css("display") === "none";
        }).length === 0) {
            ActiveElements.SetActiveTopbarItem();
            ChangeCategories.RunPageScripts();
            ChangeCategories.ChangePageOptions();
            $(".loading").fadeOut(250);

            // run the callback if provided
            if (callback !== undefined) { callback(); }

            // check page
            if (Page[0] !== "") {
                $(".no-click").removeClass("no-click");
            }
        }
    };

    $loading.fadeIn(250);

    // send get requests for all the content you'll need for your new page
    // call iFinishedLoading when you get it
    // call failureHandler if you have any issues
    $("#dashboard-container").fadeOut(100);

    if (Page[0] !== LastCategory) {
        $(".topbar").fadeOut(100);
        LastCategory = Page[0];

        setTimeout(function() {
            $(".topbar > .page-title").text(Page[0]);

            $.get("/dashboard/get-that-subnav/" + Page[0].replace(/\/\/|\/$/, ""), function(content) {
                $("#topbar-content").html(content);
                $(".topbar").fadeIn(100, ChangeCategories.ChangeSubCategory);
            }).fail(failureHandler);
        }, 100);
    } else {
        ChangeCategories.ChangeSubCategory();
    }

    setTimeout(function() {
        $.get("/dashboard/get-that-content/" + Page.join("/").replace(/\/\/|\/$/, ""), function(content) {
            $("#dashboard-container").html(content);
            $("#dashboard-container").fadeIn(100, iFinishedLoading);
        }).fail(failureHandler);
    }, 100);
}

$(function() {
    Page = GetPage();
    ActiveElements.All();
    ChangeCategories.ChangeMainCategory();
    LoadNewContent();
});
