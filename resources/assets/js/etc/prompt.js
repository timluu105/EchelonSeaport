const prompt = {

    /**
     * Listen
     *
     * @return {void}
     */
    listen: function() {
        // Listen for escape key
        $(document).keyup(function(e) {
            if (e.keyCode === 27) { prompt.destroy(); }
        });

        // Listen for clicking anything except in the box
        $(".prompt, .prompt .center").bind("click", function(e) {
            if (e.target === this) { prompt.destroy(); }
        });
    },

    /**
     * Inject
     *
     * @param {string} content - The dialog content
     * @return {void}
     */
    inject: function(content) {
        $("body").append("<div class='prompt'><div class='center'><div class='box'>" + content + "</div></div></div>");
    },

    /**
     * Destroy
     *
     * @return {void}
     */
    destroy: function() {
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
    input: function(text, regexp, callback) {
        // Create html to go in the box
        let $input = "<label for='prompt_input'>" + text + "</label><input type='text' name='itemname'><button>Submit</button>";

        // Function that is called upon completion
        const complete = function(e) {
            const val = $input.val().trim();

            if (!val.match(regexp) && val !== "") {
                // Set e.input
                e.input = val;

                // Destroy
                prompt.destroy();

                // Call callback
                callback(e);
            } else {
                $(".prompt .box").addClass("animated shake");

                setTimeout(function() {
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
        $input.keypress(function(e) {
            if (e.which === 13) { complete(e); }
        });

        $(".prompt button").on("click", complete);
    }

};
