<template>
    <div
        v-if="cImages.length"
        class="image-gallery-component">

        <div class="gallery-image-container">
            <div
                v-for="(image, index) in cImages"
                class="gallery-image"
                :class="{ active: index === currentImage }"
                :style="{ backgroundImage: 'url(' + image + ')' }">
            </div>
        </div>

        <div
            v-if="cPrevButton"
            class="gallery-button prev"
            @click="prevImage">

            <div class="gallery-button-arrow"></div>
        </div>

        <div
            v-if="cNextButton"
            class="gallery-button next"
            @click="nextImage">

            <div class="gallery-button-arrow"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            cImages: {
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

            cStartingImage: {
                type: Number,
                default: 0
            }
        },

        data() {
            return {
                currentImage: null
            };
        },

        methods: {
            prevImage() {
                if (this.currentImage <= 0) {
                    this.currentImage = this.cImages.length - 1;
                } else {
                    this.currentImage--;
                }
            },

            nextImage() {
                if (this.currentImage >= this.cImages.length - 1) {
                    this.currentImage = 0;
                } else {
                    this.currentImage++;
                }
            }
        },

        created() {
            this.currentImage = this.cStartingImage;
        }
    };
</script>
