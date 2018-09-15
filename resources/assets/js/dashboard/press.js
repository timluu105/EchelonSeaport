//
// dashboard/press.js
//
// JavaScript functions for the content portion of the
// dashboard.
//

const press = {

    /**
     * Initalize
     *
     * @param  page
     * @return void
     */
    Init: function(page) {
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
        Init: function() {
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

            $(".date-picker").each(function() {
                const $this = $(this);

                if (!$this.hasClass("hasDatepicker")) {
                    $this.datepicker({
                        dateFormat: "yy-mm-dd",
                        onSelect: function() {
                            $this.val($.datepicker.formatDate("yy-mm-dd", $this.datepicker("getDate"))).trigger("propertychange");
                        }
                    });
                }
            });

            $(".file-input").off("change").on("change", function() {
                const $this = $(this),
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
        ToggleItem: function() {
            $(".toggle-item").off("click").on("click", function() {
                const $this = $(this),
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
                }).always(function(res) {
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
        EditItem: function() {
            const animTime = 500;

            let timers = [];

            $(".items .item-body form input:not(.file-upload-input), .items .item-body form textarea").off("input propertychange paste").on("input propertychange paste", function(e) {
                const $this = $(this),
                    $status = $this.parent().find(".status"),
                    name = $this.data("page") + $this.data("name") + $this.data("language");

                $status.find(".waiting").fadeIn(animTime);
                clearTimeout(timers[name]);

                timers[name] = setTimeout(function() {
                    // Get the "status" div and then show that the
                    // request is procesing.
                    $status.find(".waiting").fadeOut(animTime, function() {
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
                    }).always(function(res) {
                        // Fade out sending and fade in either success or failure
                        $status.children().eq(1).fadeOut(animTime, function() {
                            $status.children().eq(res === "success" ? 2 : 3).fadeIn(animTime, function() {
                                $(this).fadeOut(animTime);
                                if ($this.data("name") === "title") { $this.closest(".item").find(".item-info").text($this.val()); }
                            });
                        });
                    });

                    // Fallback
                    setTimeout(function() {
                        $status.find(".sending").fadeOut(animTime, function() {
                            $status.children().eq(2).fadeIn(animTime, function() {
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
        EditImage: function() {
            const animTime = 500;

            let timers = [];

            $(".items .item-body form input.file-upload-input.image").off("change").on("change", function(e) {
                const $this = $(this),
                    $status = $this.parent().next(".status"),
                    $thumb = $this.parent().find(".thumb"),
                    source = $thumb.attr("src"),
                    name = $this.data("page") + $this.data("name") + $this.data("language");

                let res;

                $status.find(".waiting").fadeIn(animTime);
                clearTimeout(timers[name]);

                timers[name] = setTimeout(function() {
                    // Get the "status" div and then show that the
                    // request is procesing.
                    $status.find(".waiting").fadeOut(animTime, function() {
                        $status.find(".sending").fadeIn(animTime);
                    });

                    res = press.UploadImage($this.data("id"), $this, function(res) {
                        if (res) {
                            // Fade out sending and fade in either success or failure
                            $status.children().eq(1).fadeOut(animTime, function() {
                                $status.children().eq(2).fadeIn(animTime, function() {
                                    $(this).fadeOut(animTime);
                                    $thumb.attr("src", source + "?" + new Date().getTime());
                                    $this.parent().addClass("has-file");
                                });
                            });
                        } else {
                            $status.find(".sending").fadeOut(animTime, function() {
                                $status.children().eq(3).fadeIn(animTime, function() {
                                    $(this).fadeOut(animTime);
                                });
                            });
                        }

                        // Fallback
                        setTimeout(function() {
                            $status.find(".sending").fadeOut(animTime, function() {
                                $status.children().eq(2).fadeIn(animTime, function() {
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
        EditPdf: function() {
            const animTime = 500;

            let timers = [];

            $(".items .item-body form input.file-upload-input.pdf").off("change").on("change", function(e) {
                const $this = $(this),
                    $status = $this.parent().next(".status"),
                    name = $this.data("page") + $this.data("name") + $this.data("language");

                let res;

                $status.find(".waiting").fadeIn(animTime);
                clearTimeout(timers[name]);

                timers[name] = setTimeout(function() {
                    // Get the "status" div and then show that the
                    // request is procesing.
                    $status.find(".waiting").fadeOut(animTime, function() {
                        $status.find(".sending").fadeIn(animTime);
                    });

                    res = press.UploadPdf($this.data("id"), $this, function(res) {
                        if (res) {
                            // Fade out sending and fade in either success or failure
                            $status.children().eq(1).fadeOut(animTime, function() {
                                $status.children().eq(2).fadeIn(animTime, function() {
                                    $(this).fadeOut(animTime);
                                    $this.parent().addClass("has-file");
                                });
                            });
                        } else {
                            $status.find(".sending").fadeOut(animTime, function() {
                                $status.children().eq(3).fadeIn(animTime, function() {
                                    $(this).fadeOut(animTime);
                                });
                            });
                        }

                        // Fallback
                        setTimeout(function() {
                            $status.find(".sending").fadeOut(animTime, function() {
                                $status.children().eq(2).fadeIn(animTime, function() {
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
        AddArticle: function() {
            const $submit = $("#submit"),
                $newArticle = $(".new-article"),
                $newArticles = $(".new-articles"),
                $form = $("#new-article-form"),
                $image = $("#image"),
                $imageClear = $("#image-clear"),
                $pdf = $("#pdf"),
                $pdfClear = $("#pdf-clear"),
                animTime = 500;

            let submitting = false;

            const hideNewArticle = function(e) {
                if (e.target === this || e.keyCode === 27) {
                    $(".new-articles, .overlay-article, .add-article").off("click", hideNewArticle);
                    $(document).off("keyup", hideNewArticle);
                    $newArticles.fadeOut(animTime);
                }
            };

            const submissionComplete = function() {
                submitting = false;
                return ChangeCategories.iChangeCategories();
            };

            $newArticle.off("click").on("click", function() {
                $newArticles.fadeIn(animTime);
                $(".new-articles, .overlay-article, .add-article").off("click", hideNewArticle).on("click", hideNewArticle);
                $(document).off("keyup", hideNewArticle).on("keyup", hideNewArticle);
            });

            $imageClear.off("click").on("click", function(e) {
                e.preventDefault();
                $image.val("").trigger("change");
            });

            $pdfClear.off("click").on("click", function(e) {
                e.preventDefault();
                $pdf.val("").trigger("change");
            });

            $submit.off("click").on("click", function(e) {
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
                    }).always(function(res) {
                        if (res.toString().match(/^[0-9][0-9]*$/) !== null) {
                            console.log("Successfully submitted data");

                            if ($image.val() === "" && $pdf.val() === "") {
                                submissionComplete();
                            } else if ($image.val() === "") {
                                press.UploadPdf(res, $("#pdf"), submissionComplete);
                            } else {
                                press.UploadImage(res, $("#image"), function() {
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

        ReorderPress: function() {
            let sortOrder = {};

            Sortable.create($(".items")[0], {
                handle: ".item-sort",
                onUpdate: function() {
                    const $items = $(".items .press-item"),
                        lastItem = $items.length - 1;

                    // update the sortOrder object based on the updated order
                    $items.each(function(index) {
                        sortOrder[$(this).data("id")] = lastItem - index;
                    });

                    $.ajax({
                        type: "POST",
                        url: "/dashboard/press/articles/press-reorder",
                        data: {
                            order: sortOrder,
                            _token: $("#token").val()
                        }
                    }).always(function(res) {
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
        const animTime = 500;

        $(".item-delete").off("click").on("click", function(e) {
            const $this = $(this),
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
            }).always(function(res) {
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
    UploadImage: function(id, $imageFileInput, callback) {
        const imageData = new FormData();

        let uploadStatus = false;

        imageData.append("file", $imageFileInput[0].files[0]);
        imageData.append("id", id);
        console.log("Uploading image: " + id + ".jpg");

        $.ajax({
            type: "POST",
            url: "/dashboard/press/articles/image-upload",
            data: imageData,
            processData: false,
            contentType: false,
            beforeSend: function(xhr) { xhr.setRequestHeader("X-CSRF-TOKEN", $("input[name=\"_token\"]").val()); }
        }).always(function(res) {
            if (res === "success") {
                console.log("Successfully uploaded Image");
                uploadStatus = true;
            } else {
                console.log("Failed to upload Image");
                console.log(res.responseText);
            }

            if (callback !== undefined) { callback(uploadStatus); }
        });
    },

    /**
     * Delete Image
     *
     * @return void
     */
    DeleteImage: function() {
        $(".file-upload-delete.image").off("click").on("click", function(e) {
            // Save this as a variable
            const $this = $(this),
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
            }).always(function(res) {
                if (res === "success") {
                    // Delete from front-end
                    console.log("Successfully deleted Image");

                    $this.transition({ opacity: 0 }, 200, function() {
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
    UploadPdf: function(id, $pdfFileInput, callback) {
        const pdfData = new FormData();

        let uploadStatus = false;

        pdfData.append("file", $pdfFileInput[0].files[0]);
        pdfData.append("path", id + ".pdf");
        console.log("Uploading pdf: " + id + ".pdf");

        $.ajax({
            type: "POST",
            url: "/dashboard/press/articles/pdf-upload",
            data: pdfData,
            processData: false,
            contentType: false,
            beforeSend: function(xhr) { xhr.setRequestHeader("X-CSRF-TOKEN", $("input[name=\"_token\"]").val()); }
        }).always(function(res) {
            if (res === "success") {
                console.log("Successfully uploaded PDF");
                uploadStatus = true;
            } else {
                console.log("Failed to upload PDF");
                console.log(res.responseText);
            }

            if (callback !== undefined) { callback(uploadStatus); }
        });
    },

    /**
     * Delete PDF
     *
     * @return void
     */
    DeletePdf: function() {
        $(".file-upload-delete.pdf").off("click").on("click", function(e) {
            // Save this as a variable
            const $this = $(this),
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
            }).always(function(res) {
                if (res === "success") {
                    // Delete from front-end
                    console.log("Successfully deleted PDF");

                    $this.transition({ opacity: 0 }, 200, function() {
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
