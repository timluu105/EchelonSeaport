export default {
    methods: {
        scrollToAnchor(id) {
            const $element = $(id);

            if ($element.length) {
                $("html, body").animate({
                    scrollTop: $element.offset().top - $(".navbar-component-nav").height()
                }, 500);
            }
        }
    }
};
