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
                        title: "The <br />Seaport",
                        body: "Anchoring Boston’s Innovation District is Boston’s most anticipated residential destination. <br />More than an address, EchelonSeaport offers an exciting new way to live.",
                        to: "/neighborhood"
                    },

                    {
                        id: "kpf-architecture",
                        image: "/img/home/kpf-architecture.jpg",
                        title: "KPF Architecture <br />Jeffrey Beers Design",
                        body: "EchelonSeaport is a defining contemporary landmark <br />by internationally-lauded Kohn Pedersen Fox featuring <br />sophisticated amenities crafted by globally recognized <br />interior designer Jeffrey Beers.",
                        to: "/architecture-and-design"
                    },

                    {
                        id: "urban-resort",
                        image: "/img/home/urban-resort.jpg",
                        title: "Urban Resort <br />Living",
                        body: "Extraordinary in every aspect, EchelonSeaport <br />offers a wealth of amenities beyond anything ever before offered in Boston.",
                        to: "/lifestyle"
                    },

                    {
                        id: "modern-living",
                        image: "/img/home/modern-living.jpg",
                        title: "Modern <br />Living",
                        body: "A canvas for personal style. Residences feature <br />oversized window walls capturing city, sky and harbor views <br />and are bathed in natural light.",
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
