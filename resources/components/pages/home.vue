<template>
    <div class="home-component">
        <div class="intro-slider">
            <transition-group tag="div">
                <div
                    v-for="(item, index) in introSliderItems"
                    class="intro-slider-item"
                    :class="{ first: index === 0, last: index === introSliderItems.length - 1 }"
                    :key="item.id">

                    <div class="intro-slider-item-inner">
                        <div
                            class="intro-slider-item-image"
                            :style="{ backgroundImage: 'url(' + item.image + ')' }">
                        </div>

                        <div class="intro-slider-item-copy">
                            <h1 class="intro-slider-item-copy-title" v-html="formatBr(item.title)"></h1>
                            <p class="intro-slider-item-copy-body" v-html="formatBr(item.body)"></p>
                        </div>

                        <router-link
                            v-if="item.to !== ''"
                            class="intro-slider-item-link"
                            :to="item.to">
                        </router-link>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import BasePage from "mixins/base-page.js";

    export default {
        mixins: [
            BasePage
        ],

        data() {
            return {
                navTheme: "dark",
                navHidden: !this.$store.getters.getIntroPlayed,
                footerHidden: true,
                canMove: true,
                canMoveTimeout: undefined,
                autoplayTimeout: undefined,
                autoplayWait: 6000,

                introSliderItems: [
                    {
                        id: "the-seaport",
                        image: "/img/home/the-seaport.jpg",
                        title: window.trans["home"]["the-seaport"],
                        body: window.trans["home"]["anchoring"],
                        to: "/neighborhood"
                    },

                    {
                        id: "kpf-architecture",
                        image: "/img/home/kpf-architecture.jpg",
                        title: window.trans["home"]["kpf-architecture"],
                        body: window.trans["home"]["contemporary-landmark"],
                        to: "/architecture-and-design"
                    },

                    {
                        id: "urban-resort",
                        image: "/img/home/urban-resort.jpg",
                        title: window.trans["home"]["urban-living"],
                        body: window.trans["home"]["extraordinary"],
                        to: "/lifestyle"
                    },

                    {
                        id: "modern-living",
                        image: "/img/home/modern-living.jpg",
                        title: window.trans["home"]["modern-living"],
                        body: window.trans["home"]["canvas"],
                        to: "/residences"
                    }
                ]
            };
        },

        methods: {
            afterLoop() {
                this.autoplay();

                this.canMoveTimeout = setTimeout(() => {
                    this.canMove = true;
                }, 750);
            },

            loopNext() {
                if (this.canMove) {
                    this.canMove = false;
                    this.introSliderItems.push(this.introSliderItems.shift());
                    this.afterLoop();
                }
            },

            loopPrev() {
                if (this.canMove) {
                    this.canMove = false;
                    this.introSliderItems.unshift(this.introSliderItems.pop());
                    this.afterLoop();
                }
            },

            autoplay() {
                clearTimeout(this.autoplayTimeout);
                this.autoplayTimeout = setTimeout(this.loopNext, this.autoplayWait);
            },

            formatBr(string) {
                return string.replace(/<br\ *\/>/g, "<div class='no-break-mobile'> </div>");
            }
        },

        mounted() {
            if (this.$store.getters.getIntroPlayed) {
                this.autoplay();
            }
        },

        watch: {
            "$store.getters.getIntroPlayed"(to, from) {
                if (!from && to) {
                    this.autoplay();
                }
            }
        },

        beforeDestroy() {
            clearTimeout(this.canMoveTimeout);
            clearTimeout(this.autoplayTimeout);
        }
    };
</script>
