export default {
    methods: {
        scrollToAnchor(id, animationDuration) {
            if(typeof animationDuration === "undefined") {
                animationDuration = 500;
            }
            const $element = $(id);

            if ($element.length) {
                $("html, body").animate({
                    scrollTop: $element.offset().top - $(".navbar-component-nav").height()
                }, animationDuration);
            }
        }
    }
};
