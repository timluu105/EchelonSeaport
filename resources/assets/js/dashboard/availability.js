//
// dashboard/availability.js
//
// JavaScript functions for the availability portion of the
// dashboard.
//

const availability = {

    /**
     * Initalize
     *
     * @param  page
     * @return void
     */
    Init: function(page) {
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
        Init: function() {
            availability.tableInput.AddUnit();
            availability.tableInput.UpdateUnit();
            availability.tableInput.DeleteUnit();
        },

        /**
         * Add Unit
         *
         * @return void
         */
        AddUnit: function() {
            const $view = $("html, body"),
                $addUnit = $("#add-unit"),
                $newUnit = $("#new-unit"),
                $newUnits = $("#new-units"),
                topBarHeight = $(".topbar").first().height(),
                fadeSpeed = 500;

            let form_data = {},
                sending = false;

            const populateFormData = function() {
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

            const hideForm = function() {
                $addUnit.off("click");
                $newUnits.fadeOut(fadeSpeed);
            };

            $newUnit.off("click").on("click", function(e) {
                $newUnits.fadeIn(fadeSpeed);

                $addUnit.off("click").on("click", function(e) {
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
                        }).always(function(res) {
                            let r, key, missed;

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
                                $view.animate({ scrollTop: $(".error").first().offset().top - topBarHeight }, 200, function() {
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

                $(document).keyup(function(e) {
                    if (e.keyCode === 27 && sending === false) { hideForm(); }
                });
            });
        },

        /**
         * Update Unit
         *
         * @return void
         */
        UpdateUnit: function() {
            const $controls = $("tr.unit input, tr.unit select");

            let timers = [];

            const update = function(elem) {
                const $this = $(elem),
                    name = $this.data("id") + $this.attr("id");

                clearTimeout(timers[name]);

                timers[name] = setTimeout(function() {
                    let val;

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
                    }).always(function(res) {
                        $this.parent().removeClass("sending success failure");

                        if (res === "success") {
                            $this.parent().addClass("success");
                        } else {
                            $this.parent().addClass("failure");
                        }

                        // Enable the controls
                        $controls.prop("disabled", false);

                        // Trigger a click in the edited element if it's a text box so it gets selected again
                        if ($this.attr("type") === "text") { $this.trigger("click"); }

                        setTimeout(function() {
                            $this.parent().removeClass("sending success failure");
                        }, 1000);
                    });
                }, 1000);
            };

            // Unbind old bindings left behind because we reloaded with ajax
            $controls.off("input change propertychange paste");

            // Bind the update functionality to updates to text input fields
            $("tr.unit input[type=\"text\"]").off("input propertychange paste").on("input propertychange paste", function() {
                update(this);
            });

            // Bind the update functionality to changes on select elements and checkboxes
            $("tr.unit select, tr.unit input[type=\"checkbox\"]").off("change").on("change", function() {
                update(this);
            });
        },

        /**
         * Delete Unit
         *
         * @return void
         */
        DeleteUnit: function() {
            const $unitDelete = $(".delete-unit");

            let deleting = false;

            $unitDelete.off("click").on("click", function(e) {
                // Save this as a variable
                const $this = $(this),
                    $unit = $this.closest(".unit");

                e.preventDefault();

                if (deleting === false) {
                    deleting = true;

                    // Poof!
                    $("#poof").css({
                        left: e.pageX - 24 + "px",
                        top: e.pageY - 24 + "px"
                    }).show(); poof();

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
                    }).always(function(res) {
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
        Init: function() {
            availability.tableNavigation.KeyboardNavigation();
            availability.tableNavigation.MouseNavigation();
        },

        KeyboardNavigation: function() {
            // Use arrows to navigate the availability table and select all text in a cell when entering
            $(".table td").keyup(function(e) {
                const $this = $(this),
                    currCol = $this.data("col"),
                    currRow = $this.data("row");

                let nextCell;

                switch (e.keyCode) {
                    case 37:
                        // Left
                        nextCell = $("td[data-col=\"" + (currCol - 1) + "\"][data-row=\"" + currRow + "\"]").find("input");
                        if (!nextCell.length) { nextCell = $this.find("input"); }
                        nextCell.focus();
                        nextCell.select();
                        break;
                    case 38:
                        // Up
                        nextCell = $("td[data-col=\"" + currCol + "\"][data-row=\"" + (currRow - 1) + "\"]").find("input");
                        if (!nextCell.length) { nextCell = $this.find("input"); }
                        nextCell.focus();
                        nextCell.select();
                        break;
                    case 39:
                        // Right
                        nextCell = $("td[data-col=\"" + (currCol + 1) + "\"][data-row=\"" + currRow + "\"]").find("input");
                        if (!nextCell.length) { nextCell = $this.find("input"); }
                        nextCell.focus();
                        nextCell.select();
                        break;
                    case 40:
                        // Down
                        nextCell = $("td[data-col=\"" + currCol + "\"][data-row=\"" + (currRow + 1) + "\"]").find("input");
                        if (!nextCell.length) { nextCell = $this.find("input"); }
                        nextCell.focus();
                        nextCell.select();
                        break;
                    default:
                        // Nothing
                }
            });
        },

        MouseNavigation: function() {
            // Clicking in a cell selects all text
            $(".table input:not(.new)").off("click").on("click", function(e) {
                // Behave normally if the ctrl key is pressed
                if (e.ctrlKey) { return false; }
                $(this).select();
            });
        }
    }

};
