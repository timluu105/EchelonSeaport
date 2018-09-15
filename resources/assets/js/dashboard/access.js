//
// dashboard/access.js
//
// JavaScript functions for the access portion of the
// dashboard.
//

const access = {

    /**
     * Initalize
     *
     * @param  page
     * @return void
     */
    Init: function(page) {
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
        Init: function() {
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
        Init: function() {
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
        AddUser: function() {
            const $newUsers = $(".new-users"),
                animTime = 500;

            const hideNewUser = function(e) {
                if (e.target === this || e.keyCode === 27) {
                    $(".new-users, .overlay-user, .add-user").off("click", hideNewUser);
                    $(document).off("keyup", hideNewUser);
                    $newUsers.fadeOut(animTime);
                }
            };

            $(".new-user").off("click").on("click", function(e) {
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
        DeleteUser: function() {
            const $userDelete = $(".delete-user");

            let deleting = false;

            $userDelete.off("click").on("click", function(e) {
                // Save this as a variable
                const $this = $(this),
                    $user = $this.closest(".user");

                e.preventDefault();

                if (deleting === false) {
                    deleting = true;

                    // Poof!
                    $("#poof").css({
                        left: e.pageX - 24 + "px",
                        top: e.pageY - 24 + "px"
                    }).show(); poof();

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
                    }).always(function(res) {
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
