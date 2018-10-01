<template>
    <footer
        class="footer-component"
        :class="{ 'footer-hidden': $store.getters.getFooterHidden }">

        <div class="footer-component-wrapper">
            <h1>EchelonSeaport</h1>
            <h2><span class="mobile-block bold">Sales Gallery:</span> <span class="mobile-block">101 Seaport Blvd. Boston&nbsp;MA&nbsp;02210</span></h2>
            <h2><a id="main-number-footer" class="mobile-block" :href="$store.getters.getMainNumberLink">{{ $store.getters.getMainNumber }}</a> <span class="divider">|</span> <a class="mobile-block" href="mailto:info@echelonseaport.com">info@echelonseaport.com</a></h2>

            <h2 class="footer-component-links-wrapper">
                <a target="_blank" rel="noopener" href="https://www.facebook.com/echelonseaport"><i class="fa fa-facebook-f"></i></a>
                <a target="_blank" rel="noopener" href="https://www.instagram.com/echelonseaport/"><i class="fa fa-instagram"></i></a>
                <a target="_blank" rel="noopener" href="https://twitter.com/echelonseaport"><i class="fa fa-twitter"></i></a>
            </h2>

            <p>
                <span
                    class="legal-toggle"
                    @click="toggleLegal">

                    Legal
                </span>
            </p>
            <p>
                <span>
                    <a href="/lang/en">EN</a> |
                    <a href="/lang/cn">CN</a>
                </span>
            </p>
        </div>

        <div class="footer-component-legal">
            <div class="footer-component-legal-inner">
                <img src="/img/eho.svg" alt="Equal Housing Opportunity" />
                <p>EchelonSeaport is an Equal Housing Opportunity project. We are in compliance with Title VIII of the Civil Rights Act of 1968. We have not and will not discriminate against you because of your race, color, religion, sex, or national origin.</p>
                <p>This material shall not constitute a valid offer in any state where prior registration is required. Materials, features and amenities described and depicted herein are based upon current development plans, which are subject to change without notice. Actual development may not be as currently proposed. No guarantee is made that the features, amenities and facilities depicted by artists’ renderings or otherwise described herein will be built or, if built, will be of the same type, size or nature as depicted or described.</p>
                <p>The residential units described herein and marketed under the licensed “REGENT” and/or “REGENT COLLECTION” trademark are not owned, developed, or sold by Regent Asia Pacific Management Limited (“Regent”) or any of its affiliates, and neither Regent nor any of its affiliates makes any representation, warranty, or guarantee with respect to such residential units.</p>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        data() {
            return {
                legalToggled: false
            };
        },

        computed: {
            legal() {
                return $(this.$el).find(".footer-component-legal");
            },

            view() {
                return $("html, body");
            }
        },

        methods: {
            toggleLegal() {
                this.legalToggled = !this.legalToggled;

                if (this.legalToggled) {
                    this.legal.slideDown();

                    this.view.animate({
                        scrollTop: $(document).height()
                    }, 500);
                } else {
                    this.legal.slideUp();
                }
            }
        },

        beforeDestroy() {
            this.view.stop();
        }
    };
</script>
