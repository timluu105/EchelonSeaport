<template>
    <div
        class="slide-gallery-component"
        :class="uniqueClass"
        :style="{ height: sliderHeight + 'px' }">

        <div
            class="gallery-component-wrapper"
            :style="{ height: imageHeight + 'px' }">

            <transition name="fade">
                <slide
                    :id="slides[position].id"
                    :class="'ar-' + aspectRatio"
                    :src="slides[position].url"
                    :top-caption="slides[position].captionT"
                    :bottom-caption="slides[position].captionB"
                    :offset-top="slides[position].top"
                    :offset-right="slides[position].right"
                    :offset-bottom="slides[position].bottom"
                    :offset-left="slides[position].left"
                    :hotspots="slides[position].hotspots"
                    :key="slides[position].id"
                />
            </transition>

            <div
                class="gallery-button prev-button"
                @click="prev"
                v-show="hasMultipleSlides">
            </div>

            <div
                class="gallery-button next-button"
                @click="next"
                v-show="hasMultipleSlides">
            </div>
        </div>

        <div
            class="gallery-bullet-wrapper"
            v-if="hasMultipleSlides && !pageIsSmall">

            <div
                class="gallery-bullet"
                :class="[ { active: position === index }, 'gallery-bullet-' + bulletType ]"
                v-for="(slide, index) in slides"
                @click="goTo(index)">

                <span>{{ slides[position].captionT }} {{ slides[position].captionB }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Slide from "partials/slide.vue";

    export default {
        components: {
            "slide": Slide
        },

        data() {
            return {
                currentNumber: 0,
                showTitles: "titles",
                showDots: "dots",
                imageHeight: 1,
                sliderHeight: 1,
                aspectNumber: 0,
                pageIsSmall: false,
                captionsPresent: false
            };
        },

        props: {
            uniqueClass: {
                type: String,
                default: ""
            },

            slides: {
                type: Array
            },

            aspectRatio: {
                type: String,
                default: "16-9"
            },

            bulletType: {
                type: String,
                default: "dots"
            }
        },

        computed: {
            position() {
                const pos = this.currentNumber % this.slides.length;

                if (pos < 0) {
                    return Math.abs(this.slides.length + pos);
                } else {
                    return this.currentNumber % this.slides.length;
                }
            },

            computedARfromString() {
                const dashPosition = this.aspectRatio.indexOf("-"),
                    aspectW = this.aspectRatio.slice(0, dashPosition),
                    aspectH = this.aspectRatio.slice(dashPosition + 1, this.aspectRatio.length),
                    computed = aspectW / aspectH;

                this.aspectNumber = computed;
                return computed;
            },

            hasMultipleSlides() {
                return this.slides.length > 1;
            }
        },

        methods: {
            next() {
                this.currentNumber++;
            },

            prev() {
                this.currentNumber--;
            },

            goTo(index) {
                this.currentNumber = index;
            },

            hasCaptions() {
                for (let i = 0; i < this.slides.length; i++) {
                    if (this.slides[i].captionT) {
                        this.captionsPresent = true;
                    }
                }
            },

            computeHeight() {
                const screenWidth = $(window).width(),
                    screenHeight = $(window).height();

                let bulletsHeight = 0,
                    tempHeight;

                if (screenWidth < this.$store.getters.getScreenBreak.screenSm) {
                    bulletsHeight = 0;
                    this.pageIsSmall = true;
                } else {
                    if (this.hasMultipleSlides) {
                        bulletsHeight = 64;
                    }

                    this.pageIsSmall = false;
                }

                tempHeight = $(this.$el).width() / this.computedARfromString;

                if (tempHeight <= screenHeight) {
                    this.imageHeight = tempHeight;
                } else {
                    this.imageHeight = screenHeight;
                }

                this.sliderHeight = this.imageHeight + bulletsHeight;
            }
        },

        mounted() {
            this.computeHeight();
            $(window).on("resize orientationchange", this.computeHeight);

            this.$nextTick(() => {
                this.computeHeight();
                this.hasCaptions();
            });
        },

        beforeDestroy() {
            $(window).off("resize orientationchange", this.computeHeight);
        }
    };
</script>
