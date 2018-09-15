<template>
    <div class="modal-gallery-component" :class="{ open: modalGalleryOpen }">
        <div class="modal-gallery-component-image-container">
            <div
                v-for="(item, index) in cImages"
                class="modal-gallery-component-image"
                :class="{ active: index === currentModalGalleryImage }"
                :style="{ backgroundImage: 'url(' + item.image + ')' }">

                <div
                    v-if="item.hasOwnProperty('title') && item.title !== ''"
                    class="modal-gallery-component-image-title">

                    {{ item.title }}
                </div>
            </div>
        </div>

        <div
            class="modal-gallery-component-close"
            @click="triggerCloseModalGallery">
        </div>

        <div class="modal-gallery-component-nav-button prev" @click="prevModalGalleryImage"></div>
        <div class="modal-gallery-component-nav-button next" @click="nextModalGalleryImage"></div>
    </div>
</template>

<script>
    export default {
        props: {
            cImages: {
                type: Array,
                default() { return []; }
            }
        },

        data() {
            return {
                modalGalleryOpen: false,
                currentModalGalleryImage: 0
            };
        },

        methods: {
            prevModalGalleryImage() {
                if (this.currentModalGalleryImage > 0) {
                    this.currentModalGalleryImage--;
                } else {
                    this.currentModalGalleryImage = this.cImages.length - 1;
                }
            },

            nextModalGalleryImage() {
                if (this.currentModalGalleryImage < this.cImages.length - 1) {
                    this.currentModalGalleryImage++;
                } else {
                    this.currentModalGalleryImage = 0;
                }
            },

            closeModalGallery() {
                $(window).off("hashchange", this.closeModalGallery);
                $("html").removeClass("no-scroll");
                this.modalGalleryOpen = false;
            },

            triggerCloseModalGallery() {
                history.back();
            },

            escapeCloseModalGallery(e) {
                if (e.keyCode === 27 && this.modalGalleryOpen) {
                    this.triggerCloseModalGallery();
                }
            },

            openModalGallery(e, index) {
                this.currentModalGalleryImage = index;
                this.modalGalleryOpen = true;
                window.history.pushState("", "", "#gallery");
                $(window).on("hashchange", this.closeModalGallery);
                $("html").addClass("no-scroll");
            }
        },

        created() {
            $(document).on("keyup", this.escapeCloseModalGallery);
        },

        mounted() {
            $(this.$el).on("open", this.openModalGallery);
        },

        beforeDestroy() {
            $("html").removeClass("no-scroll");
            $(document).off("keyup", this.escapeCloseModalGallery);
            $(window).off("hashchange", this.closeModalGallery);
        }
    };
</script>
