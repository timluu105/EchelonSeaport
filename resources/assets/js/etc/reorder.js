const reorder = {
    sortable: null,

    /**
     * Run the Reorder function
     *
     * @param {string} id - The list id
     * @param {string} item - A selector matching list items
     * @param {string} url - The URL path of the sort functionality
     * @return {void}
     */
    run: function(id, item, url) {
        let order = {};

        $("#" + id).find(item).each(function(index) {
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
        }).always(function(res) {
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
    create: function(id, item, handle, url) {
        this.sortable = Sortable.create(document.getElementById(id), {
            handle: handle,
            onUpdate: function() { reorder.run(id, item, url); }
        });
    }

};
