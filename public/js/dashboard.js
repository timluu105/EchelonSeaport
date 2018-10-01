"use strict";

// loc takes the first route
// the url goes here if it has a hash, otherwise the empty string is falsey
var url = { full: location.href },
    loc = "";

/*
 * loc is an array, everything after the fully qualified domain
 * and before the hash, split by slashes EXAMPLE:
 *
 * {
 *     "full": "http://base:8000/dashboard/118east59th",
 *     "domain": "http://base:8000",
 *     "extended": [
 *         "dashboard",
 *         "118east59th"
 *     ]
 * }
 *
 */

function parseURL() {
    // loc is an array of what's left after we've extracted the other url parts
    url.extended = url.full.replace(/#.*/, function (h) {
        // pull out the hash, if it exists
        url.hash = h;return "";
    }).replace(/\?.*/, function (que) {
        // just in case there's a fragment from google ads or something
        url.fragment = que;return "";
    }).replace(/https*:\/\/[^\/]*\//, function (domain) {
        // maybe you want to use the domain at some point?
        // check if on production? idk
        url.domain = domain.slice(0, -1); // throw away the slash
        return "";
    }).split("/"); // split what's left

    loc = url.extended[0]; // backwards compatibility
}

/*
|--------------------------------------------------------------------------
| Poof JS
|--------------------------------------------------------------------------
*/

function poof() {
    var bgTop = 0,
        frame = 0,
        frames = 6,
        frameSize = 32,
        frameRate = 80,
        poof = $("#poof");

    var animate = function animate() {
        if (frame < frames) {
            poof.css({ backgroundPosition: "0 " + bgTop + "px" });
            bgTop -= frameSize;
            frame++;
            setTimeout(animate, frameRate);
        }
    };

    animate();

    setTimeout(function () {
        poof.hide();
    }, frames * frameRate);
}

var reorder = {
    sortable: null,

    /**
     * Run the Reorder function
     *
     * @param {string} id - The list id
     * @param {string} item - A selector matching list items
     * @param {string} url - The URL path of the sort functionality
     * @return {void}
     */
    run: function run(id, item, url) {
        var order = {};

        $("#" + id).find(item).each(function (index) {
            order[index] = $(this).data("id");
        });

        // Send an ajax PATCH with the new order
        $.ajax({
            type: "PATCH",
            url: url,
            data: {
                order: order,
                _token: $("input[name=\"_token\"]").val()
            }
        }).always(function (res) {
            if (res !== "success") {
                console.log("Reorder failed");
                return ChangeCategories.iChangeCategories();
            }
        });
    },

    /**
     * Create New Reorder Object
     *
     * @param {string} id - The list id
     * @param {string} item - A selector matching list items
     * @param {string} handle - A selector matching the sort grab handle
     * @param {string} url - The URL path of the sort functionality
     * @return {void}
     */
    create: function create(id, item, handle, url) {
        this.sortable = Sortable.create(document.getElementById(id), {
            handle: handle,
            onUpdate: function onUpdate() {
                reorder.run(id, item, url);
            }
        });
    }

};

var prompt = {

    /**
     * Listen
     *
     * @return {void}
     */
    listen: function listen() {
        // Listen for escape key
        $(document).keyup(function (e) {
            if (e.keyCode === 27) {
                prompt.destroy();
            }
        });

        // Listen for clicking anything except in the box
        $(".prompt, .prompt .center").bind("click", function (e) {
            if (e.target === this) {
                prompt.destroy();
            }
        });
    },

    /**
     * Inject
     *
     * @param {string} content - The dialog content
     * @return {void}
     */
    inject: function inject(content) {
        $("body").append("<div class='prompt'><div class='center'><div class='box'>" + content + "</div></div></div>");
    },

    /**
     * Destroy
     *
     * @return {void}
     */
    destroy: function destroy() {
        $(".prompt").remove();
    },

    /**
     * Input
     *
     * @param {string} text - The message in the dialog
     * @param {regexp} regexp - The regular expression to match on success
     * @param {function} callback - The function to run when the regular expression is matched
     * @return {void}
     */
    input: function input(text, regexp, callback) {
        // Create html to go in the box
        var $input = "<label for='prompt_input'>" + text + "</label><input type='text' name='itemname'><button>Submit</button>";

        // Function that is called upon completion
        var complete = function complete(e) {
            var val = $input.val().trim();

            if (!val.match(regexp) && val !== "") {
                // Set e.input
                e.input = val;

                // Destroy
                prompt.destroy();

                // Call callback
                callback(e);
            } else {
                $(".prompt .box").addClass("animated shake");

                setTimeout(function () {
                    $(".prompt .box").removeClass("animated shake");
                }, 1000);
            }
        };

        // Inject into the box
        prompt.inject($input);

        // Listen for box closings.
        prompt.listen();

        // Set $input as our physical dom element
        $input = $(".prompt input[name='itemname']");

        // Focus input that we added to the box
        $input.focus();

        // Listen for an enter key or click of the submit button
        $input.keypress(function (e) {
            if (e.which === 13) {
                complete(e);
            }
        });

        $(".prompt button").on("click", complete);
    }

};

//
// dashboard/access.js
//
// JavaScript functions for the access portion of the
// dashboard.
//

var access = {

    /**
     * Initalize
     *
     * @param  page
     * @return void
     */
    Init: function Init(page) {
        switch (page) {
            case "logins":
                access.logins.Init();
                break;
            case "users":
                access.users.Init();
                break;
        }
    },

    logins: {
        /**
         * Initalize
         *
         * @return void
         */
        Init: function Init() {
            // Sort Tables
            $(".table").tablesorter();
        }
    },

    users: {
        /**
         * Initalize
         *
         * @return void
         */
        Init: function Init() {
            // Sort Tables
            $(".table").tablesorter();

            // Setup Adding New Users
            access.users.AddUser();

            // Setup Deleting Users
            access.users.DeleteUser();
        },

        /**
         * Add User
         *
         * @return void
         */
        AddUser: function AddUser() {
            var $newUsers = $(".new-users"),
                animTime = 500;

            var hideNewUser = function hideNewUser(e) {
                if (e.target === this || e.keyCode === 27) {
                    $(".new-users, .overlay-user, .add-user").off("click", hideNewUser);
                    $(document).off("keyup", hideNewUser);
                    $newUsers.fadeOut(animTime);
                }
            };

            $(".new-user").off("click").on("click", function (e) {
                $newUsers.fadeIn(animTime);
                $(".new-users, .overlay-user, .add-user").off("click", hideNewUser).on("click", hideNewUser);
                $(document).off("keyup", hideNewUser).on("keyup", hideNewUser);
            });
        },

        /**
         * Delete User
         *
         * @return void
         */
        DeleteUser: function DeleteUser() {
            var $userDelete = $(".delete-user");

            var deleting = false;

            $userDelete.off("click").on("click", function (e) {
                // Save this as a variable
                var $this = $(this),
                    $user = $this.closest(".user");

                e.preventDefault();

                if (deleting === false) {
                    deleting = true;

                    // Poof!
                    $("#poof").css({
                        left: e.pageX - 24 + "px",
                        top: e.pageY - 24 + "px"
                    }).show();poof();

                    // Slide up like we're deleting instantly.
                    $user.fadeOut(500);

                    // Send the delete command
                    $.ajax({
                        type: "DELETE",
                        url: "/dashboard/access/users/delete",
                        data: {
                            id: $this.data("id"),
                            _token: $("#token").val(),
                            project: Page[0]
                        }
                    }).always(function (res) {
                        if (res === "success") {
                            // Delete from front-end
                            $user.remove();
                        } else {
                            // Do not delete from front-end
                            $user.fadeIn(500);
                            console.log("deletion failed");
                        }

                        deleting = false;
                    });
                }
            });
        }
    }

};

//
// dashboard/availability.js
//
// JavaScript functions for the availability portion of the
// dashboard.
//

var availability = {

    /**
     * Initalize
     *
     * @param  page
     * @return void
     */
    Init: function Init(page) {
        switch (page) {
            case "table":
                availability.tableInput.Init();
                availability.tableNavigation.Init();
                break;
        }
    },

    tableInput: {
        /**
         * Initalize
         *
         * @return void
         */
        Init: function Init() {
            availability.tableInput.AddUnit();
            availability.tableInput.UpdateUnit();
            availability.tableInput.DeleteUnit();
        },

        /**
         * Add Unit
         *
         * @return void
         */
        AddUnit: function AddUnit() {
            var $view = $("html, body"),
                $addUnit = $("#add-unit"),
                $newUnit = $("#new-unit"),
                $newUnits = $("#new-units"),
                topBarHeight = $(".topbar").first().height(),
                fadeSpeed = 500;

            var form_data = {},
                sending = false;

            var populateFormData = function populateFormData() {
                form_data = {
                    building: $("#building").val(),
                    residence: $("#residence").val(),
                    beds: $("#beds").val(),
                    baths: $("#baths").val(),
                    area: $("#area").val(),
                    exterior: $("#exterior").val(),
                    price: $("#price").val(),
                    cc: $("#cc").val(),
                    taxes: $("#taxes").val(),
                    floor_plan: $("#floor_plan").val(),
                    available: $("#available").is(":checked") ? 1 : 0,
                    _token: $("#token").val()
                };
            };

            var hideForm = function hideForm() {
                $addUnit.off("click");
                $newUnits.fadeOut(fadeSpeed);
            };

            $newUnit.off("click").on("click", function (e) {
                $newUnits.fadeIn(fadeSpeed);

                $addUnit.off("click").on("click", function (e) {
                    e.preventDefault();

                    if (sending === false) {
                        sending = true;

                        // Disable the submit button
                        $addUnit.prop("disabled", true);

                        // Add form data to the form_data object
                        populateFormData();
                        console.log(form_data);

                        // Submit a new site
                        $.ajax({
                            type: "POST",
                            url: "/dashboard/availability/data/new",
                            data: form_data
                        }).always(function (res) {
                            var r = void 0,
                                key = void 0,
                                missed = void 0;

                            // Hide errors before processing the ajax return field
                            $(".error").removeClass("error");

                            if (res === "success") {
                                Page[1] = "table";

                                return ChangeCategories.iChangeCategories();
                            }

                            r = res.responseJSON;
                            missed = 0;

                            // Highlight each row with missed form data
                            for (key in r.errors) {
                                if ($("#" + key).length) {
                                    $("#" + key).addClass("error");
                                    missed++;
                                }
                            }

                            // Output the number of missed fiedls to the console
                            console.log("missed fields: " + missed);

                            // scroll up to the first missed field
                            if ($(".error").length) {
                                $view.animate({ scrollTop: $(".error").first().offset().top - topBarHeight }, 200, function () {
                                    // Re-enable the submit button
                                    $addUnit.prop("disabled", false);
                                });
                            } else {
                                // Re-enable the submit button
                                $addUnit.prop("disabled", false);
                            }
                        });

                        $addUnit.prop("disabled", false);
                        sending = false;
                    }
                });

                $(document).keyup(function (e) {
                    if (e.keyCode === 27 && sending === false) {
                        hideForm();
                    }
                });
            });
        },

        /**
         * Update Unit
         *
         * @return void
         */
        UpdateUnit: function UpdateUnit() {
            var $controls = $("tr.unit input, tr.unit select");

            var timers = [];

            var update = function update(elem) {
                var $this = $(elem),
                    name = $this.data("id") + $this.attr("id");

                clearTimeout(timers[name]);

                timers[name] = setTimeout(function () {
                    var val = void 0;

                    // Disable the controls
                    $controls.prop("disabled", true);

                    $this.parent().removeClass("success failure");
                    $this.parent().addClass("sending");

                    if ($this.attr("type") === "checkbox") {
                        val = $this.is(":checked") ? 1 : 0;
                    } else {
                        val = $this.val();
                    }

                    // Send PUT
                    $.ajax({
                        type: "PUT",
                        url: "/dashboard/availability/data/update",
                        data: {
                            id: $this.data("id"),
                            name: $this.attr("name"),
                            value: val,
                            _token: $("#token").val()
                        }
                    }).always(function (res) {
                        $this.parent().removeClass("sending success failure");

                        if (res === "success") {
                            $this.parent().addClass("success");
                        } else {
                            $this.parent().addClass("failure");
                        }

                        // Enable the controls
                        $controls.prop("disabled", false);

                        // Trigger a click in the edited element if it's a text box so it gets selected again
                        if ($this.attr("type") === "text") {
                            $this.trigger("click");
                        }

                        setTimeout(function () {
                            $this.parent().removeClass("sending success failure");
                        }, 1000);
                    });
                }, 1000);
            };

            // Unbind old bindings left behind because we reloaded with ajax
            $controls.off("input change propertychange paste");

            // Bind the update functionality to updates to text input fields
            $("tr.unit input[type=\"text\"]").off("input propertychange paste").on("input propertychange paste", function () {
                update(this);
            });

            // Bind the update functionality to changes on select elements and checkboxes
            $("tr.unit select, tr.unit input[type=\"checkbox\"]").off("change").on("change", function () {
                update(this);
            });
        },

        /**
         * Delete Unit
         *
         * @return void
         */
        DeleteUnit: function DeleteUnit() {
            var $unitDelete = $(".delete-unit");

            var deleting = false;

            $unitDelete.off("click").on("click", function (e) {
                // Save this as a variable
                var $this = $(this),
                    $unit = $this.closest(".unit");

                e.preventDefault();

                if (deleting === false) {
                    deleting = true;

                    // Poof!
                    $("#poof").css({
                        left: e.pageX - 24 + "px",
                        top: e.pageY - 24 + "px"
                    }).show();poof();

                    // Slide up like we're deleting instantly.
                    $unit.fadeOut(500);

                    // Send the delete command
                    $.ajax({
                        type: "DELETE",
                        url: "/dashboard/availability/data/delete",
                        data: {
                            id: $this.data("id"),
                            _token: $("#token").val(),
                            project: Page[0]
                        }
                    }).always(function (res) {
                        if (res === "success") {
                            // Delete from front-end
                            $unit.remove();
                        } else {
                            // Do not delete from front-end
                            $unit.fadeIn(500);
                            console.log("deletion failed");
                        }

                        deleting = false;
                    });
                }
            });
        }
    },

    tableNavigation: {
        /**
         * Initalize
         *
         * @return void
         */
        Init: function Init() {
            availability.tableNavigation.KeyboardNavigation();
            availability.tableNavigation.MouseNavigation();
        },

        KeyboardNavigation: function KeyboardNavigation() {
            // Use arrows to navigate the availability table and select all text in a cell when entering
            $(".table td").keyup(function (e) {
                var $this = $(this),
                    currCol = $this.data("col"),
                    currRow = $this.data("row");

                var nextCell = void 0;

                switch (e.keyCode) {
                    case 37:
                        // Left
                        nextCell = $("td[data-col=\"" + (currCol - 1) + "\"][data-row=\"" + currRow + "\"]").find("input");
                        if (!nextCell.length) {
                            nextCell = $this.find("input");
                        }
                        nextCell.focus();
                        nextCell.select();
                        break;
                    case 38:
                        // Up
                        nextCell = $("td[data-col=\"" + currCol + "\"][data-row=\"" + (currRow - 1) + "\"]").find("input");
                        if (!nextCell.length) {
                            nextCell = $this.find("input");
                        }
                        nextCell.focus();
                        nextCell.select();
                        break;
                    case 39:
                        // Right
                        nextCell = $("td[data-col=\"" + (currCol + 1) + "\"][data-row=\"" + currRow + "\"]").find("input");
                        if (!nextCell.length) {
                            nextCell = $this.find("input");
                        }
                        nextCell.focus();
                        nextCell.select();
                        break;
                    case 40:
                        // Down
                        nextCell = $("td[data-col=\"" + currCol + "\"][data-row=\"" + (currRow + 1) + "\"]").find("input");
                        if (!nextCell.length) {
                            nextCell = $this.find("input");
                        }
                        nextCell.focus();
                        nextCell.select();
                        break;
                    default:
                    // Nothing
                }
            });
        },

        MouseNavigation: function MouseNavigation() {
            // Clicking in a cell selects all text
            $(".table input:not(.new)").off("click").on("click", function (e) {
                // Behave normally if the ctrl key is pressed
                if (e.ctrlKey) {
                    return false;
                }
                $(this).select();
            });
        }
    }

};

//
// dashboard/content.js
//
// JavaScript functions for the content portion of the dashboard
//

var content = {

    /**
     * Initalize
     *
     * @param  page
     * @return void
     */
    Init: function Init(page) {
        switch (page) {
            case "meta":
                content.meta.Init();
                break;
            case "pages":
                content.pages.Init();
                break;
        }
    },

    meta: {
        /**
         * Initalize
         *
         * @return void
         */
        Init: function Init() {
            // Setup meta slider
            content.ItemSlider();

            // Delete Item
            content.DeleteItem("/dashboard/content/meta/delete");

            // Setup edit item
            content.meta.EditItem();

            // Setup add new item
            content.meta.AddItem();

            // Setup toggle enabled state
            content.ToggleItem("/dashboard/content/meta/edit");
        },

        /**
         * Edit Item
         *
         * @return void
         */
        EditItem: function EditItem() {
            var timers = [];

            $(".items .item-body form input").off("input propertychange paste").on("input propertychange paste", function (e) {
                var $this = $(this),
                    name = $this.data("page") + $this.data("name");

                $this.next(".status").find(".waiting").fadeIn(500);
                console.log(timers);
                console.log(name + " === " + timers[name]);
                clearTimeout(timers[name]);

                timers[name] = setTimeout(function () {
                    // Save this as a variable
                    var $that = $(this),
                        $status = $that.next(".status");

                    // Get the "status" div and then show that the request is processing
                    $status.find(".waiting").fadeOut(500, function () {
                        $status.find(".sending").fadeIn(500);
                    });

                    // Send PUT
                    $.ajax({
                        type: "PUT",
                        url: "/dashboard/content/meta/edit",
                        data: {
                            id: $that.data("id"),
                            name: $that.data("name"),
                            value: $that.val(),
                            _token: $("input[name=\"_token\"]").val()
                        }
                    }).always(function (res) {
                        // Fade out sending and fade in either success or failure
                        $status.find(".sending").fadeOut(500, function () {
                            $status.children().eq(res === "success" ? 2 : 3).fadeIn(500, function () {
                                $(this).fadeOut(500);
                            });
                        });
                    });

                    // Fallback
                    setTimeout(function () {
                        $status.find(".sending").fadeOut(500, function () {
                            $status.children().eq(2).fadeIn(500, function () {
                                $(this).fadeOut(500);
                            });
                        });
                    }, 1200);
                }.bind(this), 1000);
            });
        },

        /**
         * Add New Item
         *
         * @return void
         */
        AddItem: function AddItem() {
            $(".new-item").off("click").on("click", function () {
                // Get the default object that we'll clone
                var $new = $(".item.default").eq(0).clone({ deepWithDataAndEvents: true }),
                    items = $("ul.items li");

                var regexp = "",
                    page = void 0;

                for (var i = 0; i < items.length; i++) {
                    page = $(items[i]).find(".item-info").text().trim();
                    regexp += page;
                    regexp += i !== items.length - 1 ? "|" : "";
                }

                regexp = new RegExp("^(" + regexp + ")$", "gi");

                // Create a new prompt
                prompt.input("Page", regexp, function (e) {
                    // Update name
                    $new.find(".item-info").text(e.input);

                    // Update title
                    $new.find("input[name=\"title\"]").val("");

                    // Update description
                    $new.find("input[name=\"description\"]").val("");

                    // Update keywords
                    $new.find("input[name=\"keywords\"]").val("");

                    // Send PUT
                    $.ajax({
                        type: "PUT",
                        url: "/dashboard/content/meta/create",
                        data: {
                            page: e.input.replace(/\//g, "."),
                            _token: $("input[name=\"_token\"]").val()
                        }
                    }).always(function (res) {
                        if (res === "success") {
                            // Refresh the page
                            return ChangeCategories.iChangeCategories();
                        } else {
                            // There was an error
                        }
                    });
                });
            });
        }
    },

    pages: {
        /**
         * Initalize
         *
         * @return void
         */
        Init: function Init() {
            if (Page[3] !== "") {
                // Edit a page section
                content.pages.SectionContentInit();
            } else if (Page[2] !== "") {
                // List page sections
                content.pages.SectionsListInit();
            } else {
                // List pages
                content.pages.PagesListInit();
            }
        },

        /**
         * Pages List Init
         *
         * @return void
         */
        PagesListInit: function PagesListInit() {
            // Navigate to the sections list for a given page if the edit button for that page is clicked
            $(".item-edit").each(function () {
                var $this = $(this),
                    pageName = $this.data("name");

                $this.off("click").on("click", function (e) {
                    e.preventDefault();
                    Page[2] = pageName;

                    return ChangeCategories.iChangeCategories();
                });
            });
        },

        /**
         * Sections List Init
         *
         * @return void
         */
        SectionsListInit: function SectionsListInit() {
            var $window = $(window),
                $sectionsList = $("#sections-list");

            var submitting = false;

            var pageBack = function pageBack(e) {
                e.preventDefault();
                $window.off("popstate");
                Page[2] = "";

                return ChangeCategories.iChangeCategories();
            };

            // Navigate to the pages list if the url changes and the page doens't reload (most likely the back function)
            $window.off("popstate").on("popstate", pageBack);

            // Navigate to the pages list if the back button is clicked
            $(".back-button").off("click").on("click", pageBack);

            // Create a new section with a given id and navigate to its edit page
            $(".new-item").off("click").on("click", function () {
                if (!submitting) {
                    submitting = true;

                    // Submit a new site
                    $.ajax({
                        type: "POST",
                        url: "/dashboard/content/sections/new",
                        data: {
                            page: Page[2],
                            type: $("#new-type").val(),
                            _token: $("#token").val()
                        }
                    }).always(function (res) {
                        submitting = false;

                        if (res.toString().match(/^[0-9][0-9]*$/) !== null) {
                            Page[3] = res;
                            Store.newPageSection = true;

                            return ChangeCategories.iChangeCategories();
                        } else {
                            console.log("There was an error creating the new section");
                        }
                    });
                }
            });

            // Navigate to the edit page for a given section if its edit button is clicked
            $(".item-edit").each(function () {
                var $this = $(this),
                    sectionId = $this.data("id");

                $this.off("click").on("click", function (e) {
                    e.preventDefault();
                    Page[3] = sectionId;

                    return ChangeCategories.iChangeCategories();
                });
            });

            // Initialize deletion functionality
            content.DeleteItem("/dashboard/content/sections/delete");

            // Setup toggle enabled state
            content.ToggleItem("/dashboard/content/sections/edit");

            // Initialize re-order functionality if order is set
            if ($sectionsList.data("sort-style") === "reorder") {
                reorder.create("sections-list", "li.item", ".sort-icon-solo", "/dashboard/content/sections/reorder");
            }
        },

        /**
         * Section Content Init
         *
         * @return void
         */
        SectionContentInit: function SectionContentInit() {
            var $window = $(window),
                $form = $("#section-edit"),
                $contentInput = $form.find(".content-input"),
                $contentText = $form.find(".content-text"),
                $contentImage = $form.find(".content-image"),
                $submitButton = $form.find("#submit"),
                sectionId = $form.data("section"),
                $token = $("#token"),
                newPageSection = "newPageSection" in Store ? Store.newPageSection : false;

            var data = {},
                changes = false,
                submitting = false;

            var pageBack = function pageBack(e) {
                e.preventDefault();
                $window.off("popstate");
                delete Store.contentTextArray;

                if (newPageSection) {
                    // Delete the section if the user navigated back without saving
                    $.ajax({
                        type: "DELETE",
                        url: "/dashboard/content/sections/delete",
                        data: {
                            id: Page[3],
                            _token: $("input[name=\"_token\"]").val()
                        }
                    }).always(function (res) {
                        if (res !== "success") {
                            console.log("Unable to delete new section");
                        }

                        Page[3] = "";

                        return ChangeCategories.iChangeCategories();
                    });
                } else {
                    Page[3] = "";

                    return ChangeCategories.iChangeCategories();
                }
            };

            var editImage = function editImage(e) {
                var $editor = $("#image-editor"),
                    $container = $editor.find(".image-editor-overlay-edit-image").first(),
                    $submitButton = $editor.find(".btn-submit").first(),
                    $cancelButton = $editor.find(".btn-cancel").first(),
                    imageUrl = $(e.target).data("image-url"),
                    imageFile = $(e.target).data("image-file");

                var $img = void 0,
                    x = void 0,
                    y = void 0,
                    width = void 0,
                    height = void 0,
                    cropping = false,
                    cropper = undefined;

                var closeImageEditor = function closeImageEditor(callback) {
                    $cancelButton.off("click");
                    $submitButton.off("click");
                    $("html").removeClass("no-scroll");

                    $editor.fadeOut(function () {
                        if (cropper !== undefined) {
                            cropper.destroy();
                            cropper = undefined;
                        }

                        $container.text("");
                    });

                    if (callback !== undefined) {
                        callback();
                    }
                };

                var cropImage = function cropImage() {
                    if (!cropping && cropper !== undefined) {
                        cropping = true;

                        // Submit a new site
                        $.ajax({
                            type: "POST",
                            url: "/dashboard/content/sections/image-edit",
                            data: {
                                id: sectionId,
                                image: imageFile,
                                x: cropper.getData(true).x,
                                y: cropper.getData(true).y,
                                width: cropper.getData(true).width,
                                height: cropper.getData(true).height,
                                _token: $("#token").val()
                            }
                        }).always(function (res) {
                            cropping = false;

                            if (res === "success") {
                                closeImageEditor(function () {
                                    return ChangeCategories.iChangeCategories();
                                });
                            } else {
                                console.log("There was an error editing the image");
                            }
                        });
                    }
                };

                $container.html("<img id=\"image-editor-img\" src=\"" + imageUrl + "\" />");
                $img = $("#image-editor-img");

                $img.on("load", function () {
                    cropper = new Cropper($img[0], {
                        responsive: false,
                        scalable: false,
                        zoomable: false
                    });

                    this.addEventListener("cropend", function (e) {
                        var cropWidth = cropper.getCropBoxData().width,
                            cropHeight = cropper.getCropBoxData().height,
                            cropTop = cropper.getCropBoxData().top,
                            cropBottom = cropTop + cropHeight,
                            cropLeft = cropper.getCropBoxData().left,
                            cropRight = cropLeft + cropWidth,
                            canvasWidth = cropper.getCanvasData().width,
                            canvasHeight = cropper.getCanvasData().height,
                            canvasTop = cropper.getCanvasData().top,
                            canvasBottom = canvasTop + canvasHeight,
                            canvasLeft = cropper.getCanvasData().left,
                            canvasRight = canvasLeft + canvasWidth;

                        if (cropLeft < canvasLeft && cropRight > canvasRight) {
                            cropper.setCropBoxData({
                                width: canvasWidth,
                                left: canvasLeft
                            });
                        } else if (cropRight < canvasLeft) {
                            cropper.setCropBoxData({
                                width: 0,
                                left: canvasLeft
                            });
                        } else if (cropLeft < canvasLeft) {
                            cropper.setCropBoxData({
                                width: cropWidth - (canvasLeft - cropLeft),
                                left: canvasLeft
                            });
                        } else if (cropLeft > canvasRight) {
                            cropper.setCropBoxData({
                                width: 0,
                                left: canvasRight
                            });
                        } else if (cropRight > canvasRight) {
                            cropper.setCropBoxData({
                                width: canvasRight - cropLeft
                            });
                        }

                        if (cropTop < canvasTop && cropBottom > canvasBottom) {
                            cropper.setCropBoxData({
                                height: canvasHeight,
                                top: canvasTop
                            });
                        } else if (cropBottom < canvasTop) {
                            cropper.setCropBoxData({
                                height: height,
                                top: canvasTop
                            });
                        } else if (cropTop < canvasTop) {
                            cropper.setCropBoxData({
                                height: cropHeight - (canvasTop - cropTop),
                                top: canvasTop
                            });
                        } else if (cropTop > canvasBottom) {
                            cropper.setCropBoxData({
                                height: 0,
                                top: canvasBottom
                            });
                        } else if (cropBottom > canvasBottom) {
                            cropper.setCropBoxData({
                                height: canvasBottom - cropTop
                            });
                        }
                    });

                    $submitButton.off("click").on("click", cropImage).removeClass("disabled");
                    $cancelButton.off("click").on("click", closeImageEditor);
                    $("html").addClass("no-scroll");
                    $editor.fadeIn();
                });
            };

            var getData = function getData() {
                var pushData = function pushData(name, value) {
                    // Add the value to a key with the column name
                    data.values[name] = value;
                };

                data = {
                    id: sectionId,
                    values: {},
                    _token: $token.val()
                };

                $contentInput.each(function () {
                    var $this = $(this),
                        name = $this.attr("id"),
                        value = $this.val();

                    pushData(name, value);
                });

                $contentText.each(function () {
                    var $this = $(this),
                        name = $this.attr("id"),
                        value = Store.contentTextArray[name].value();

                    pushData(name, value);
                });
            };

            var uploadImage = function uploadImage(e) {
                var $imageInputs = $(".content-image"),
                    lastImage = $imageInputs.length - 1;

                var currImage = 0;

                var uploadSuccess = function uploadSuccess() {
                    delete Store.contentTextArray;
                    submitting = false;
                    return ChangeCategories.iChangeCategories();
                };

                // Upload each image until there are no images left
                var uploadNextImage = function uploadNextImage() {
                    var $currImage = $imageInputs.eq(currImage);

                    if ($currImage.val() !== "") {
                        var imageData = new FormData();

                        imageData.append("file", $currImage[0].files[0]);
                        imageData.append("path", $currImage.data("image-path"));
                        console.log("Uploading image file: " + $currImage.data("image-path"));

                        $.ajax({
                            type: "POST",
                            url: "/dashboard/content/sections/image-upload",
                            data: imageData,
                            processData: false,
                            contentType: false,
                            beforeSend: function beforeSend(xhr) {
                                xhr.setRequestHeader("X-CSRF-TOKEN", $token.val());
                            }
                        }).always(function (res) {
                            if (res === "success") {
                                console.log("Successfully uploaded image file");

                                if (currImage < lastImage) {
                                    // If there are more images increase currImage by one and run uploadNextImage again
                                    currImage++;
                                    uploadNextImage();
                                } else {
                                    uploadSuccess();
                                }
                            } else {
                                console.log("Failed to upload image file");
                                $submitButton.removeClass("submitting");
                                submitting = false;
                            }
                        });
                    } else if (currImage < lastImage) {
                        currImage++;
                        uploadNextImage();
                    } else {
                        uploadSuccess();
                    }
                };

                // Run the uploadSuccess function if there are no images to upload
                if (lastImage >= 0) {
                    uploadNextImage();
                } else {
                    uploadSuccess();
                }
            };

            var submitData = function submitData(e) {
                e.preventDefault();

                if (!submitting) {
                    submitting = true;
                    $submitButton.addClass("submitting");
                    getData();

                    // Submit a new site
                    $.ajax({
                        type: "POST",
                        url: "/dashboard/content/sections/update",
                        data: data
                    }).always(function (res) {
                        if (res === "success") {
                            console.log("Successfully updated data");
                            uploadImage(e);
                        } else {
                            console.log("There was an error updating the section content: " + res);
                            $submitButton.removeClass("submitting");
                            submitting = false;
                        }
                    });
                }
            };

            var watchForChanges = function watchForChanges() {
                changes = true;
                $submitButton.removeClass("disabled");
            };

            // Delete the newPageSection variable if it exists in Store
            if ("newPageSection" in Store) {
                delete Store.newPageSection;
            }

            // Setup the submit button
            $submitButton.off("click").on("click", submitData);

            // Navigate to the page section list if the url changes and the page doens't reload (most likely the back function)
            $window.off("popstate").on("popstate", pageBack);

            // Navigate to the page section list if the back button is clicked
            $(".back-button").off("click").on("click", pageBack);

            // Open the image editor when the edit image button is clicked
            $(".edit-image").off("click").on("click", editImage);

            // Initialize a global array for storing markdown editors
            Store.contentTextArray = [];

            // Initialize the mde editor
            $contentText.each(function () {
                var $this = $(this),
                    name = $this.attr("id");

                if (!$this.parent().find(".CodeMirror").length) {
                    Store.contentTextArray[name] = new SimpleMDE({
                        element: this,
                        toolbar: ["bold", "italic", "|", "heading-1", "heading-2", "heading-3", "|", "quote", "unordered-list", "ordered-list", "link"],
                        blockStyles: { italic: "_" },
                        autoDownloadFontAwesome: false,
                        tabSize: 4,
                        spellChecker: false
                    });

                    setTimeout(function () {
                        Store.contentTextArray[name].value($this.attr("value"));
                    }, 100);
                }
            });

            // Determine when changes have been made
            $form.find("input").on("input change", watchForChanges);
            $form.find(".CodeMirror").on("keydown", watchForChanges);
            $form.find("select").on("change", watchForChanges);
        }
    },

    /**
     * Item Slider
     *
     * @return void
     */
    ItemSlider: function ItemSlider() {
        $(".item-info").off("click").on("click", function (target) {
            $(this).parent().next(".item-body").stop().slideToggle(250);
        });
    },

    /**
     * Delete Item
     *
     * @param  url
     * @return void
     */
    DeleteItem: function DeleteItem(url) {
        $(".item-delete").off("click").on("click", function (e) {
            var $this = $(this),
                $item = $this.closest("li.item");

            // Poof!
            $("#poof").css({ left: e.pageX - 24 + "px", top: e.pageY - 24 + "px" }).show();
            poof();

            // Slide up like we're deleting instantly.
            $item.slideUp(500);

            // Send DELETE
            $.ajax({
                type: "DELETE",
                url: url,
                data: {
                    id: $this.data("id"),
                    _token: $("input[name=\"_token\"]").val()
                }
            }).always(function (res) {
                if (res === "success") {
                    // Delete from front-end
                    $item.remove();
                } else {
                    // Do not delete from front-end
                    $item.slideDown(500);
                }
            });
        });
    },

    /**
     * Toggle Enabled/Disabled Item
     *
     * @return void
     */
    ToggleItem: function ToggleItem(url) {
        $(".toggle-item").off("click").on("click", function () {
            var $this = $(this),
                $item = $this.closest("li.item"),
                $toggleElements = $item.find(".toggle-item, .preview-item"),
                toggleState = !$this.hasClass("item-enabled");

            // Toggle active/enabled
            $item.toggleClass("active");
            $toggleElements.toggleClass("item-disabled item-enabled");

            // Fix wording
            $this.text(toggleState ? "ENABLED" : "DISABLED");

            // Send PUT
            $.ajax({
                type: "PUT",
                url: url,
                data: {
                    id: $this.data("id"),
                    name: "enabled",
                    value: toggleState,
                    _token: $("input[name=\"_token\"]").val()
                }
            }).always(function (res) {
                if (res !== "success") {
                    console.log("Toggling enabled state failed");
                    return ChangeCategories.iChangeCategories();
                }
            });
        });
    }

};

//
// dashboard/press.js
//
// JavaScript functions for the content portion of the
// dashboard.
//

var press = {

    /**
     * Initalize
     *
     * @param  page
     * @return void
     */
    Init: function Init(page) {
        switch (page) {
            case "articles":
                press.articles.Init();
                break;
        }
    },

    articles: {
        /**
         * Initalize
         *
         * @return void
         */
        Init: function Init() {
            press.ItemSlider();
            press.DeleteItem("/dashboard/press/articles/delete");
            press.DeleteImage();
            press.DeletePdf();
            press.articles.ToggleItem();
            press.articles.EditItem();
            press.articles.EditImage();
            press.articles.EditPdf();
            press.articles.AddArticle();
            press.articles.ReorderPress();

            $(".date-picker").each(function () {
                var $this = $(this);

                if (!$this.hasClass("hasDatepicker")) {
                    $this.datepicker({
                        dateFormat: "yy-mm-dd",
                        onSelect: function onSelect() {
                            $this.val($.datepicker.formatDate("yy-mm-dd", $this.datepicker("getDate"))).trigger("propertychange");
                        }
                    });
                }
            });

            $(".file-input").off("change").on("change", function () {
                var $this = $(this),
                    $label = $this.parent().find(".file-label span"),
                    $clear = $this.parent().find(".file-clear"),
                    value = $this.val();

                $label.text(value);

                if ($this.val() === "") {
                    $clear.removeClass("active");
                } else {
                    $clear.addClass("active");
                }
            });
        },

        /**
         * Toggle Enabled/Disabled Item
         *
         * @return void
         */
        ToggleItem: function ToggleItem() {
            $(".toggle-item").off("click").on("click", function () {
                var $this = $(this),
                    $item = $this.closest("li.item"),
                    toggleState = !$this.hasClass("item-enabled");

                // Toggle active/enabled
                $item.toggleClass("active");
                $this.toggleClass("item-disabled item-enabled");

                // Fix wording
                $this.text(toggleState ? "ENABLED" : "DISABLED");

                // Send PUT
                $.ajax({
                    type: "PUT",
                    url: "/dashboard/press/articles/edit",
                    data: {
                        id: $this.data("id"),
                        name: "enabled",
                        value: toggleState,
                        _token: $("input[name=\"_token\"]").val()
                    }
                }).always(function (res) {
                    if (res !== "success") {
                        return ChangeCategories.iChangeCategories();
                    }
                });
            });
        },

        /**
         * Edit Item
         *
         * @return void
         */
        EditItem: function EditItem() {
            var animTime = 500;

            var timers = [];

            $(".items .item-body form input:not(.file-upload-input), .items .item-body form textarea").off("input propertychange paste").on("input propertychange paste", function (e) {
                var $this = $(this),
                    $status = $this.parent().find(".status"),
                    name = $this.data("page") + $this.data("name") + $this.data("language");

                $status.find(".waiting").fadeIn(animTime);
                clearTimeout(timers[name]);

                timers[name] = setTimeout(function () {
                    // Get the "status" div and then show that the
                    // request is procesing.
                    $status.find(".waiting").fadeOut(animTime, function () {
                        $status.find(".sending").fadeIn(animTime);
                    });

                    // Send PUT
                    $.ajax({
                        type: "PUT",
                        url: "/dashboard/press/articles/edit",
                        data: {
                            id: $this.data("id"),
                            language: $this.data("language"),
                            name: $this.data("name"),
                            value: $this.val(),
                            _token: $("input[name=\"_token\"]").val()
                        }
                    }).always(function (res) {
                        // Fade out sending and fade in either success or failure
                        $status.children().eq(1).fadeOut(animTime, function () {
                            $status.children().eq(res === "success" ? 2 : 3).fadeIn(animTime, function () {
                                $(this).fadeOut(animTime);
                                if ($this.data("name") === "title") {
                                    $this.closest(".item").find(".item-info").text($this.val());
                                }
                            });
                        });
                    });

                    // Fallback
                    setTimeout(function () {
                        $status.find(".sending").fadeOut(animTime, function () {
                            $status.children().eq(2).fadeIn(animTime, function () {
                                $(this).fadeOut(animTime);
                            });
                        });
                    }, 1200);
                }, 1000);
            });
        },

        /**
         * Edit Image
         *
         * @return void
         */
        EditImage: function EditImage() {
            var animTime = 500;

            var timers = [];

            $(".items .item-body form input.file-upload-input.image").off("change").on("change", function (e) {
                var $this = $(this),
                    $status = $this.parent().next(".status"),
                    $thumb = $this.parent().find(".thumb"),
                    source = $thumb.attr("src"),
                    name = $this.data("page") + $this.data("name") + $this.data("language");

                var res = void 0;

                $status.find(".waiting").fadeIn(animTime);
                clearTimeout(timers[name]);

                timers[name] = setTimeout(function () {
                    // Get the "status" div and then show that the
                    // request is procesing.
                    $status.find(".waiting").fadeOut(animTime, function () {
                        $status.find(".sending").fadeIn(animTime);
                    });

                    res = press.UploadImage($this.data("id"), $this, function (res) {
                        if (res) {
                            // Fade out sending and fade in either success or failure
                            $status.children().eq(1).fadeOut(animTime, function () {
                                $status.children().eq(2).fadeIn(animTime, function () {
                                    $(this).fadeOut(animTime);
                                    $thumb.attr("src", source + "?" + new Date().getTime());
                                    $this.parent().addClass("has-file");
                                });
                            });
                        } else {
                            $status.find(".sending").fadeOut(animTime, function () {
                                $status.children().eq(3).fadeIn(animTime, function () {
                                    $(this).fadeOut(animTime);
                                });
                            });
                        }

                        // Fallback
                        setTimeout(function () {
                            $status.find(".sending").fadeOut(animTime, function () {
                                $status.children().eq(2).fadeIn(animTime, function () {
                                    $(this).fadeOut(animTime);
                                });
                            });
                        }, 1200);
                    });
                }, 1000);
            });
        },

        /**
         * Edit PDF
         *
         * @return void
         */
        EditPdf: function EditPdf() {
            var animTime = 500;

            var timers = [];

            $(".items .item-body form input.file-upload-input.pdf").off("change").on("change", function (e) {
                var $this = $(this),
                    $status = $this.parent().next(".status"),
                    name = $this.data("page") + $this.data("name") + $this.data("language");

                var res = void 0;

                $status.find(".waiting").fadeIn(animTime);
                clearTimeout(timers[name]);

                timers[name] = setTimeout(function () {
                    // Get the "status" div and then show that the
                    // request is procesing.
                    $status.find(".waiting").fadeOut(animTime, function () {
                        $status.find(".sending").fadeIn(animTime);
                    });

                    res = press.UploadPdf($this.data("id"), $this, function (res) {
                        if (res) {
                            // Fade out sending and fade in either success or failure
                            $status.children().eq(1).fadeOut(animTime, function () {
                                $status.children().eq(2).fadeIn(animTime, function () {
                                    $(this).fadeOut(animTime);
                                    $this.parent().addClass("has-file");
                                });
                            });
                        } else {
                            $status.find(".sending").fadeOut(animTime, function () {
                                $status.children().eq(3).fadeIn(animTime, function () {
                                    $(this).fadeOut(animTime);
                                });
                            });
                        }

                        // Fallback
                        setTimeout(function () {
                            $status.find(".sending").fadeOut(animTime, function () {
                                $status.children().eq(2).fadeIn(animTime, function () {
                                    $(this).fadeOut(animTime);
                                });
                            });
                        }, 1200);
                    });
                }, 1000);
            });
        },

        /**
         * Add Article
         *
         * @return void
         */
        AddArticle: function AddArticle() {
            var $submit = $("#submit"),
                $newArticle = $(".new-article"),
                $newArticles = $(".new-articles"),
                $form = $("#new-article-form"),
                $image = $("#image"),
                $imageClear = $("#image-clear"),
                $pdf = $("#pdf"),
                $pdfClear = $("#pdf-clear"),
                animTime = 500;

            var submitting = false;

            var hideNewArticle = function hideNewArticle(e) {
                if (e.target === this || e.keyCode === 27) {
                    $(".new-articles, .overlay-article, .add-article").off("click", hideNewArticle);
                    $(document).off("keyup", hideNewArticle);
                    $newArticles.fadeOut(animTime);
                }
            };

            var submissionComplete = function submissionComplete() {
                submitting = false;
                return ChangeCategories.iChangeCategories();
            };

            $newArticle.off("click").on("click", function () {
                $newArticles.fadeIn(animTime);
                $(".new-articles, .overlay-article, .add-article").off("click", hideNewArticle).on("click", hideNewArticle);
                $(document).off("keyup", hideNewArticle).on("keyup", hideNewArticle);
            });

            $imageClear.off("click").on("click", function (e) {
                e.preventDefault();
                $image.val("").trigger("change");
            });

            $pdfClear.off("click").on("click", function (e) {
                e.preventDefault();
                $pdf.val("").trigger("change");
            });

            $submit.off("click").on("click", function (e) {
                e.preventDefault();

                if (!submitting) {
                    submitting = true;
                    $submit.addClass("submitting");

                    // submit a new article
                    $.ajax({
                        type: "POST",
                        url: "/dashboard/press/articles/new",
                        data: {
                            title: $("#title").val(),
                            publisher: $("#publisher").val(),
                            date: $("#date").val(),
                            description: $("#description").val(),
                            _token: $("input[name=\"_token\"]").val()
                        }
                    }).always(function (res) {
                        if (res.toString().match(/^[0-9][0-9]*$/) !== null) {
                            console.log("Successfully submitted data");

                            if ($image.val() === "" && $pdf.val() === "") {
                                submissionComplete();
                            } else if ($image.val() === "") {
                                press.UploadPdf(res, $("#pdf"), submissionComplete);
                            } else {
                                press.UploadImage(res, $("#image"), function () {
                                    if ($pdf.val() === "") {
                                        submissionComplete();
                                    } else {
                                        press.UploadPdf(res, $("#pdf"), submissionComplete);
                                    }
                                });
                            }
                        } else {
                            console.log("Failed to submit data");
                            console.log(res.responseText);
                            $submit.removeClass("submitting");
                            submitting = false;
                        }
                    });
                }
            });
        },

        ReorderPress: function ReorderPress() {
            var sortOrder = {};

            Sortable.create($(".items")[0], {
                handle: ".item-sort",
                onUpdate: function onUpdate() {
                    var $items = $(".items .press-item"),
                        lastItem = $items.length - 1;

                    // update the sortOrder object based on the updated order
                    $items.each(function (index) {
                        sortOrder[$(this).data("id")] = lastItem - index;
                    });

                    $.ajax({
                        type: "POST",
                        url: "/dashboard/press/articles/press-reorder",
                        data: {
                            order: sortOrder,
                            _token: $("#token").val()
                        }
                    }).always(function (res) {
                        if (res !== "success") {
                            console.log("ERROR: Sorting failed");
                            console.log(res);
                            $(window).off("popstate");
                            return ChangeCategories.iChangeCategories();
                        }
                    });
                }
            });
        }
    },

    /**
     * Item Slider
     *
     * @return void
     */
    ItemSlider: function ItemSlider() {
        $(".item-info").off("click").on("click", function (target) {
            $(this).parent().next(".item-body").stop().slideToggle(250);
        });
    },

    /**
     * Delete Item
     *
     * @param  url
     * @return void
     */
    DeleteItem: function DeleteItem(url) {
        var animTime = 500;

        $(".item-delete").off("click").on("click", function (e) {
            var $this = $(this),
                $item = $this.closest("li.item");

            // Poof!
            $("#poof").css({ left: e.pageX - 24 + "px", top: e.pageY - 24 + "px" }).show();
            poof();

            // Slide up like we're deleting instantly.
            $item.slideUp(animTime);

            // Send DELETE
            $.ajax({
                type: "DELETE",
                url: url,
                data: {
                    id: $this.data("id"),
                    _token: $("input[name=\"_token\"]").val(),
                    project: Page[0]
                }
            }).always(function (res) {
                if (res === "success") {
                    // Delete from front-end
                    $item.remove();
                } else {
                    // Do not delete from front-end
                    $item.slideDown(animTime);
                }
            });
        });
    },

    /**
     * Upload Image
     *
     * @param  id
     * @param  $imageFileInput
     * @param  callback
     * @return void
     */
    UploadImage: function UploadImage(id, $imageFileInput, callback) {
        var imageData = new FormData();

        var uploadStatus = false;

        imageData.append("file", $imageFileInput[0].files[0]);
        imageData.append("id", id);
        console.log("Uploading image: " + id + ".jpg");

        $.ajax({
            type: "POST",
            url: "/dashboard/press/articles/image-upload",
            data: imageData,
            processData: false,
            contentType: false,
            beforeSend: function beforeSend(xhr) {
                xhr.setRequestHeader("X-CSRF-TOKEN", $("input[name=\"_token\"]").val());
            }
        }).always(function (res) {
            if (res === "success") {
                console.log("Successfully uploaded Image");
                uploadStatus = true;
            } else {
                console.log("Failed to upload Image");
                console.log(res.responseText);
            }

            if (callback !== undefined) {
                callback(uploadStatus);
            }
        });
    },

    /**
     * Delete Image
     *
     * @return void
     */
    DeleteImage: function DeleteImage() {
        $(".file-upload-delete.image").off("click").on("click", function (e) {
            // Save this as a variable
            var $this = $(this),
                $fileUpload = $this.closest(".file-upload");

            // Send DELETE
            $.ajax({
                type: "POST",
                url: "/dashboard/press/articles/image-delete",
                data: {
                    id: $this.data("id"),
                    _token: $("input[name=\"_token\"]").val(),
                    project: Page[0]
                }
            }).always(function (res) {
                if (res === "success") {
                    // Delete from front-end
                    console.log("Successfully deleted Image");

                    $this.transition({ opacity: 0 }, 200, function () {
                        $fileUpload.removeClass("has-file");
                        $this.css({ opacity: 1 });
                    });
                } else {
                    // Do not delete from front-end
                    console.log("Failed to delete Image");
                    console.log(res.responseText);
                }
            });
        });
    },

    /**
     * Upload PDF
     *
     * @param  id
     * @param  $pdfFileInput
     * @param  callback
     * @return void
     */
    UploadPdf: function UploadPdf(id, $pdfFileInput, callback) {
        var pdfData = new FormData();

        var uploadStatus = false;

        pdfData.append("file", $pdfFileInput[0].files[0]);
        pdfData.append("path", id + ".pdf");
        console.log("Uploading pdf: " + id + ".pdf");

        $.ajax({
            type: "POST",
            url: "/dashboard/press/articles/pdf-upload",
            data: pdfData,
            processData: false,
            contentType: false,
            beforeSend: function beforeSend(xhr) {
                xhr.setRequestHeader("X-CSRF-TOKEN", $("input[name=\"_token\"]").val());
            }
        }).always(function (res) {
            if (res === "success") {
                console.log("Successfully uploaded PDF");
                uploadStatus = true;
            } else {
                console.log("Failed to upload PDF");
                console.log(res.responseText);
            }

            if (callback !== undefined) {
                callback(uploadStatus);
            }
        });
    },

    /**
     * Delete PDF
     *
     * @return void
     */
    DeletePdf: function DeletePdf() {
        $(".file-upload-delete.pdf").off("click").on("click", function (e) {
            // Save this as a variable
            var $this = $(this),
                $fileUpload = $this.closest(".file-upload");

            // Send DELETE
            $.ajax({
                type: "POST",
                url: "/dashboard/press/articles/pdf-delete",
                data: {
                    id: $this.data("id"),
                    _token: $("input[name=\"_token\"]").val(),
                    project: Page[0]
                }
            }).always(function (res) {
                if (res === "success") {
                    // Delete from front-end
                    console.log("Successfully deleted PDF");

                    $this.transition({ opacity: 0 }, 200, function () {
                        $fileUpload.removeClass("has-file");
                        $this.css({ opacity: 1 });
                    });
                } else {
                    // Do not delete from front-end
                    console.log("Failed to delete PDF");
                    console.log(res.responseText);
                }
            });
        });
    }

};

//
// declare global variables
//

var Page = void 0,
    LastCategory = void 0,
    Store = {};

//
// setup the application.
//

//
// ActiveElements is an object that contains functions
// which set the correct active elements.
//

var ActiveElements = {

    //
    // All is a function that runs all active menu item
    // changes.
    //

    All: function All() {
        ActiveElements.SetActiveTopbarItem();
        ActiveElements.SetActiveSidebarItem();
    },

    //
    // SetActiveSubnavItem is a function that changes the
    // active sidebar menu item.
    //

    SetActiveSidebarItem: function SetActiveSidebarItem() {
        var linkClass = "link-" + Page[0];

        // remove all currently active pages
        $(".sidebar li").removeClass("active");

        // set the correct active sidebar item
        if (Page[0] !== "") {
            if (Page[1] !== "") {
                linkClass += "-" + Page[1];
            }

            if (Page[2] !== "") {
                linkClass += "-" + Page[2];
            }

            $(".sidebar li." + linkClass).addClass("active");
        }
    },

    //
    // SetActiveTopbarItem is a function that changes the
    // active topbar menu item.
    //

    SetActiveTopbarItem: function SetActiveTopbarItem() {
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

var ChangeCategories = {

    //
    // ChangeMainCategory is a function that changes
    // the main category we are currently on.
    //

    ChangeMainCategory: function ChangeMainCategory() {
        $(".sidebar").find("li, .sidebar-logo").off("click").on("click", function () {
            var category = $(this).data("category"),
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

    ChangeSubCategory: function ChangeSubCategory() {
        $(".topbar ul li").off("click").on("click", function () {
            var id = $(this).attr("id");

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

    iChangeCategories: function iChangeCategories(callback) {
        // get just the path
        var path = Page.join("/");

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

    RunPageScripts: function RunPageScripts() {
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

    ChangePageOptions: function ChangePageOptions() {
        // get our dataset
        var opts = $(".page-options")[0];

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
    return [location.href.split("/")[4], location.href.split("/")[5], location.href.split("/")[6], location.href.split("/")[7]].map(function (L) {
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
    var $loading = $(".loading");
    var failed = false;

    // it's possible that the user might navigate manually to a panel that doesn't exist
    // if they do, they'll get caught in a state where it looks like something is loading
    // we need to give them feedback. this function should display an error message
    var failureHandler = function failureHandler(response) {
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
    var iFinishedLoading = function iFinishedLoading() {
        if ([".topbar", "#dashboard-container"].filter(function (elem) {
            return $(elem).css("display") === "none";
        }).length === 0) {
            ActiveElements.SetActiveTopbarItem();
            ChangeCategories.RunPageScripts();
            ChangeCategories.ChangePageOptions();
            $(".loading").fadeOut(250);

            // run the callback if provided
            if (callback !== undefined) {
                callback();
            }

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

        setTimeout(function () {
            $(".topbar > .page-title").text(Page[0]);

            $.get("/dashboard/get-that-subnav/" + Page[0].replace(/\/\/|\/$/, ""), function (content) {
                $("#topbar-content").html(content);
                $(".topbar").fadeIn(100, ChangeCategories.ChangeSubCategory);
            }).fail(failureHandler);
        }, 100);
    } else {
        ChangeCategories.ChangeSubCategory();
    }

    setTimeout(function () {
        $.get("/dashboard/get-that-content/" + Page.join("/").replace(/\/\/|\/$/, ""), function (content) {
            $("#dashboard-container").html(content);
            $("#dashboard-container").fadeIn(100, iFinishedLoading);
        }).fail(failureHandler);
    }, 100);
}

$(function () {
    Page = GetPage();
    ActiveElements.All();
    ChangeCategories.ChangeMainCategory();
    LoadNewContent();
});