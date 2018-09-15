//
// dashboard/content.js
//
// JavaScript functions for the content portion of the dashboard
//

const content = {

    /**
     * Initalize
     *
     * @param  page
     * @return void
     */
    Init: function(page) {
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
        Init: function() {
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
        EditItem: function() {
            let timers = [];

            $(".items .item-body form input").off("input propertychange paste").on("input propertychange paste", function(e) {
                const $this = $(this),
                    name = $this.data("page") + $this.data("name");

                $this.next(".status").find(".waiting").fadeIn(500);
                console.log(timers);
                console.log(name + " === " + timers[name]);
                clearTimeout(timers[name]);

                timers[name] = setTimeout(function() {
                    // Save this as a variable
                    const $that = $(this),
                        $status = $that.next(".status");

                    // Get the "status" div and then show that the request is processing
                    $status.find(".waiting").fadeOut(500, function() {
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
                    }).always(function(res) {
                        // Fade out sending and fade in either success or failure
                        $status.find(".sending").fadeOut(500, function() {
                            $status.children().eq(res === "success" ? 2 : 3).fadeIn(500, function() {
                                $(this).fadeOut(500);
                            });
                        });
                    });

                    // Fallback
                    setTimeout(function() {
                        $status.find(".sending").fadeOut(500, function() {
                            $status.children().eq(2).fadeIn(500, function() {
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
        AddItem: function() {
            $(".new-item").off("click").on("click", function() {
                // Get the default object that we'll clone
                const $new = $(".item.default").eq(0).clone({ deepWithDataAndEvents: true }),
                    items = $("ul.items li");

                let regexp = "",
                    page;

                for (let i = 0; i < items.length; i++) {
                    page = $(items[i]).find(".item-info").text().trim();
                    regexp += page;
                    regexp += i !== items.length - 1 ? "|" : "";
                }

                regexp = new RegExp(`^(${regexp})$`, "gi");

                // Create a new prompt
                prompt.input("Page", regexp, function(e) {
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
                    }).always(function(res) {
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
        Init: function() {
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
        PagesListInit: function() {
            // Navigate to the sections list for a given page if the edit button for that page is clicked
            $(".item-edit").each(function() {
                const $this = $(this),
                    pageName = $this.data("name");

                $this.off("click").on("click", function(e) {
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
        SectionsListInit: function() {
            const $window = $(window),
                $sectionsList = $("#sections-list");

            let submitting = false;

            const pageBack = function(e) {
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
            $(".new-item").off("click").on("click", function() {
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
                    }).always(function(res) {
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
            $(".item-edit").each(function() {
                const $this = $(this),
                    sectionId = $this.data("id");

                $this.off("click").on("click", function(e) {
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
        SectionContentInit: function() {
            const $window = $(window),
                $form = $("#section-edit"),
                $contentInput = $form.find(".content-input"),
                $contentText = $form.find(".content-text"),
                $contentImage = $form.find(".content-image"),
                $submitButton = $form.find("#submit"),
                sectionId = $form.data("section"),
                $token = $("#token"),
                newPageSection = "newPageSection" in Store ? Store.newPageSection : false;

            let data = {},
                changes = false,
                submitting = false;

            const pageBack = function(e) {
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
                    }).always(function(res) {
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

            const editImage = function(e) {
                const $editor = $("#image-editor"),
                    $container = $editor.find(".image-editor-overlay-edit-image").first(),
                    $submitButton = $editor.find(".btn-submit").first(),
                    $cancelButton = $editor.find(".btn-cancel").first(),
                    imageUrl = $(e.target).data("image-url"),
                    imageFile = $(e.target).data("image-file");

                let $img, x, y, width, height,
                    cropping = false,
                    cropper = undefined;

                const closeImageEditor = function(callback) {
                    $cancelButton.off("click");
                    $submitButton.off("click");
                    $("html").removeClass("no-scroll");

                    $editor.fadeOut(function() {
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

                const cropImage = function() {
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
                        }).always(function(res) {
                            cropping = false;

                            if (res === "success") {
                                closeImageEditor(function() {
                                    return ChangeCategories.iChangeCategories();
                                });
                            } else {
                                console.log("There was an error editing the image");
                            }
                        });
                    }
                };

                $container.html(`<img id="image-editor-img" src="${imageUrl}" />`);
                $img = $("#image-editor-img");

                $img.on("load", function() {
                    cropper = new Cropper($img[0], {
                        responsive: false,
                        scalable: false,
                        zoomable: false
                    });

                    this.addEventListener("cropend", function(e) {
                        const cropWidth = cropper.getCropBoxData().width,
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
                                height,
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

            const getData = function() {
                const pushData = function(name, value) {
                    // Add the value to a key with the column name
                    data.values[name] = value;
                };

                data = {
                    id: sectionId,
                    values: {},
                    _token: $token.val()
                };

                $contentInput.each(function() {
                    const $this = $(this),
                        name = $this.attr("id"),
                        value = $this.val();

                    pushData(name, value);
                });

                $contentText.each(function() {
                    const $this = $(this),
                        name = $this.attr("id"),
                        value = Store.contentTextArray[name].value();

                    pushData(name, value);
                });
            };

            const uploadImage = function(e) {
                const $imageInputs = $(".content-image"),
                    lastImage = $imageInputs.length - 1;

                let currImage = 0;

                const uploadSuccess = function() {
                    delete Store.contentTextArray;
                    submitting = false;
                    return ChangeCategories.iChangeCategories();
                };

                // Upload each image until there are no images left
                const uploadNextImage = function() {
                    const $currImage = $imageInputs.eq(currImage);

                    if ($currImage.val() !== "") {
                        const imageData = new FormData();

                        imageData.append("file", $currImage[0].files[0]);
                        imageData.append("path", $currImage.data("image-path"));
                        console.log("Uploading image file: " + $currImage.data("image-path"));

                        $.ajax({
                            type: "POST",
                            url: "/dashboard/content/sections/image-upload",
                            data: imageData,
                            processData: false,
                            contentType: false,
                            beforeSend: function(xhr) { xhr.setRequestHeader("X-CSRF-TOKEN", $token.val()); }
                        }).always(function(res) {
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

            const submitData = function(e) {
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
                    }).always(function(res) {
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

            const watchForChanges = function() {
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
            $contentText.each(function() {
                const $this = $(this),
                    name = $this.attr("id");

                if (!$this.parent().find(".CodeMirror").length) {
                    Store.contentTextArray[name] = new SimpleMDE({
                        element: this,
                        toolbar: [ "bold", "italic", "|", "heading-1", "heading-2", "heading-3", "|", "quote", "unordered-list", "ordered-list", "link" ],
                        blockStyles: { italic: "_" },
                        autoDownloadFontAwesome: false,
                        tabSize: 4,
                        spellChecker: false
                    });

                    setTimeout(function() {
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
    ItemSlider: function() {
        $(".item-info").off("click").on("click", function(target) {
            $(this).parent().next(".item-body").stop().slideToggle(250);
        });
    },

    /**
     * Delete Item
     *
     * @param  url
     * @return void
     */
    DeleteItem: function(url) {
        $(".item-delete").off("click").on("click", function(e) {
            const $this = $(this),
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
            }).always(function(res) {
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
    ToggleItem: function(url) {
        $(".toggle-item").off("click").on("click", function() {
            const $this = $(this),
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
            }).always(function(res) {
                if (res !== "success") {
                    console.log("Toggling enabled state failed");
                    return ChangeCategories.iChangeCategories();
                }
            });
        });
    }

};
