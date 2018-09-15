<template>
    <div v-if="sliderImageItems !== undefined" class="image-slider-component">
        <div class="slider-image-container">
            <div class="slider-image-wrapper">
                <transition-group tag="div">
                    <div
                        v-for="(imageItem, index) in sliderImageItems"
                        :key="imageItem.imageKey"
                        class="slider-image"
                        :class="[ 'image-index-' + imageItem.imageIndex, 'image-' + imageItem.imageKey, { first: index === 0, last: index === sliderImageItems.length - 1 } ]">

                        <div
                            class="slider-image-inner"
                            :style="{ transform: 'translateX(-' + (cSliderImages.length * 100 + 50) + '%)' }">

                            <div
                                class="slider-image-inner-image"
                                :class="[ imageItem.align, { navigate: index !== centerIndex } ]"
                                :style="{ backgroundImage: 'url(' + imageItem.image + ')' }"
                                @click="innerImageNavigate(index)"
                                @mouseover="innerImageMouseover(index)"
                                @mouseout="hideNavigation">
                            </div>

                            <div
                                class="slider-image-inner-click"
                                :class="{ active: canMove && index === centerIndex }"
                                @click="sliderImageClick(canMove && index === centerIndex)">
                            </div>

                            <div
                                class="slider-image-inner-overlay"
                                :class="[ imageItem.align, { 'transparent-overlay': transparentOverlay } ]"
                                :style="{ opacity: getOpacity(index), backgroundImage: 'url(' + imageItem.image + ')' }">
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>

        <div
            v-if="cPrevButton || cNextButton"
            class="slider-image-navigation">

            <div
                v-if="cPrevButton"
                class="slider-image-navigation-button prev"
                :class="{ show: alwaysShowNavigation || showPrev }"
                @click="loopPrev"
                @touchend="tapClick"
                @mouseover="showPrevNavigation"
                @mouseout="hideNavigation">

                Previous
                <div class="slider-image-navigation-button-arrow"></div>
            </div>

            <div
                v-if="cNextButton"
                class="slider-image-navigation-button next"
                :class="{ show: alwaysShowNavigation || showNext }"
                @click="loopNext"
                @touchend="tapClick"
                @mouseover="showNextNavigation"
                @mouseout="hideNavigation">

                <div class="slider-image-navigation-button-arrow"></div>
                Next
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            cSliderImages: {
                type: Array,
                default() { return []; }
            },

            cPrevButton: {
                type: Boolean,
                default: true
            },

            cNextButton: {
                type: Boolean,
                default: true
            },

            cAutoplay: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                alwaysShowNavigation: this.$store.getters.getAgentDetect.isMobile,
                transparentOverlay: false,
                showPrev: false,
                showNext: false,
                canMove: true,
                canMoveTimeout: undefined,
                autoplayTimeout: undefined,
                autoplayWait: 10000,
                itemOffset: "0%",
                sliderImageItems: [],
                centerIndex: 0
            };
        },

        methods: {
            pushSliderItem(item) {
                this.sliderImageItems.push(Object.assign({
                    imageKey: this.sliderImageItems.length
                }, item));
            },

            getOpacity(index) {
                switch (Math.abs(this.centerIndex - index)) {
                    case 0:
                        return 0;
                    case 1:
                        return 0.6;
                    default:
                        return 0.85;
                }
            },

            autoplay() {
                if (this.cAutoplay) {
                    clearTimeout(this.autoplayTimeout);
                    this.autoplayTimeout = setTimeout(this.loopNext, this.autoplayWait);
                }
            },

            emitLoop() {
                this.$emit("loop", this.sliderImageItems[this.centerIndex].imageIndex);
            },

            afterLoop() {
                this.emitLoop();
                this.autoplay();

                this.canMoveTimeout = setTimeout(() => {
                    this.canMove = true;
                }, 750);
            },

            loopPrev() {
                if (this.canMove) {
                    this.canMove = false;
                    this.sliderImageItems.unshift(this.sliderImageItems.pop());
                    this.afterLoop();
                }
            },

            loopNext() {
                if (this.canMove) {
                    this.canMove = false;
                    this.sliderImageItems.push(this.sliderImageItems.shift());
                    this.afterLoop();
                }
            },

            initSwipeNavigation() {
                $.detectSwipe.preventDefault = false;
                $.detectSwipe.threshold = 50;
                $(this.$el).find("*").on("swiperight", this.loopPrev);
                $(this.$el).find("*").on("swipeleft", this.loopNext);
            },

            showPrevNavigation() {
                this.showNext = false;
                this.showPrev = true;
            },

            showNextNavigation() {
                this.showPrev = false;
                this.showNext = true;
            },

            hideNavigation(middleImage = false) {
                if (middleImage || !$(this.$el).find("slider-image-inner-image:hover, slider-image-navigation:hover").length) {
                    this.showPrev = false;
                    this.showNext = false;
                }
            },

            innerImageMouseover(index) {
                if (index < this.centerIndex) {
                    this.showPrevNavigation();
                } else if (index > this.centerIndex) {
                    this.showNextNavigation();
                } else {
                    this.hideNavigation(true);
                }
            },

            innerImageNavigate(index) {
                if (index < this.centerIndex) {
                    this.loopPrev();
                } else if (index > this.centerIndex) {
                    this.loopNext();
                }
            },

            tapClick(e) {
                e.preventDefault();
                $(e.target).trigger("click");
            },

            navigateTo(e, imageIndex) {
                const tempSliderImageItems = this.sliderImageItems;

                let moveInDirection;

                if (this.sliderImageItems[this.centerIndex].imageIndex > imageIndex) {
                    moveInDirection = () => {
                        tempSliderImageItems.unshift(tempSliderImageItems.pop());
                    };
                } else {
                    moveInDirection = () => {
                        tempSliderImageItems.push(tempSliderImageItems.shift());
                    };
                }

                if (this.canMove && tempSliderImageItems[this.centerIndex].imageIndex !== imageIndex) {
                    this.canMove = false;

                    while (tempSliderImageItems[this.centerIndex].imageIndex !== imageIndex) {
                        moveInDirection();
                    }

                    this.sliderImageItems = tempSliderImageItems;
                    this.afterLoop();
                }
            },

            transparentOverlayCheck() {
                if (this.$store.getters.getAgentDetect.isIE || this.$store.getters.getAgentDetect.isEdge) {
                    this.transparentOverlay = true;
                }
            },

            sliderImageClick(active) {
                if (active) {
                    this.$emit("active-clicked");
                }
            }
        },

        created() {
            // Determine whether the transparent overlay should be used
            this.transparentOverlayCheck();

            // Set the center index
            this.centerIndex = this.cSliderImages.length;

            // Build the sliderImageItems array with appropriate index and key values
            for (let count = 1; count <= 3; count++) {
                this.cSliderImages.forEach((imageItem, imageIndex) => {
                    if (count === 1) {
                        this.cSliderImages[imageIndex].imageIndex = imageIndex;
                    }

                    this.pushSliderItem(imageItem);
                });
            }
        },

        mounted() {
            this.emitLoop();
            this.$nextTick(this.autoplay);
            this.$nextTick(this.initSwipeNavigation);
            $(this.$el).on("navigate-to", this.navigateTo);
        },

        beforeDestroy() {
            clearTimeout(this.canMoveTimeout);
            clearTimeout(this.autoplayTimeout);
        }
    };
</script>
