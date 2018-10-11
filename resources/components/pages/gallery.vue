<template>
    <div class="gallery-component">
        <div class="gallery-component-slider-wrapper">
            <image-slider
                :c-slider-images="galleryImages"
                @loop="updateGallerySliderImage"
                @active-clicked="imageSliderOpenGallery"
            />
        </div>

        <div class="gallery-component-image-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <h1 class="gallery-component-title">{{$t("images.gallery")}}</h1>

                        <div class="gallery-component-image-grid">
                            <div
                                v-for="(item, index) in galleryImages"
                                :key="index"
                                class="gallery-component-image-grid-item"
                                @click="openModalGallery(index)">

                                <div
                                    class="gallery-component-image-grid-item-image"
                                    :class="item.align"
                                    :style="{ backgroundImage: 'url(' + item.image + ')' }">
                                </div>

                                <div class="gallery-component-image-grid-item-title">
                                    {{ item.title }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <modal-gallery :c-images="galleryImages" />
    </div>
</template>

<script>
    import BasePage from "mixins/base-page.js";
    import ImageSlider from "partials/image-slider.vue";
    import ModalGallery from "partials/modal-gallery.vue";

    export default {
        mixins: [
            BasePage
        ],

        components: {
            "image-slider": ImageSlider,
            "modal-gallery": ModalGallery
        },

        data() {
            return {
                currentGallerySliderImage: 0,

                galleryImages: [
                    {
                        "image": "/img/gallery/architecture-city-aerial.jpg",
                        "title": window.trans['images']['image-1']
                    },
                    {
                        "image": "/img/gallery/residences-hero.jpg",
                        "title": window.trans['images']['image-2']
                    },
                    {
                        "image": "/img/gallery/residences-street-view.jpg",
                        "title": window.trans['images']['image-3'],
                        "align": "vbottom"
                    },
                    {
                        "image": "/img/gallery/architecture-central-courtyard.jpg",
                        "title": window.trans['images']['image-4']
                    },
                    {
                        "image": "/img/gallery/architecture-courtyard-view.jpg",
                        "title": window.trans['images']['image-5']
                    },
                    {
                        "image": "/img/gallery/architecture-courtyard-detail.jpg",
                        "title": window.trans['images']['image-6']
                    },
                    {
                        "image": "/img/gallery/residences-seaport-lobby.jpg",
                        "title": window.trans['images']['image-7']
                    },
                    {
                        "image": "/img/gallery/residences-sky-lounge.jpg",
                        "title": window.trans['images']['image-8']
                    },
                    {
                        "image": "/img/gallery/lifestyle-entrance.jpg",
                        "title": window.trans['images']['image-9']
                    },
                    {
                        "image": "/img/gallery/lifestyle-library-lounge.jpg",
                        "title": window.trans['images']['image-10']
                    },
                    {
                        "image": "/img/gallery/lifestyle-wine-room.jpg",
                        "title": window.trans['images']['image-11']
                    },
                    {
                        "image": "/img/gallery/lifestyle-designphilosophy-livingroom.jpg",
                        "title": window.trans['images']['image-12']
                    },
                    {
                        "image": "/img/gallery/lifestyle-innovation-center.jpg",
                        "title": window.trans['images']['image-13']
                    },
                    {
                        "image": "/img/gallery/lifestyle-wellness-pool.jpg",
                        "title": window.trans['images']['image-14']
                    },
                    {
                        "image": "/img/gallery/lifestyle-basketball-court.jpg",
                        "title": window.trans['images']['image-15']
                    },
                    {
                        "image": "/img/gallery/lifestyle-spa-room.jpg",
                        "title": window.trans['images']['image-16'],
                        "align": "vbottom"
                    },
                    {
                        "image": "/img/gallery/lifestyle-outdoor-pool-day.jpg",
                        "title": window.trans['images']['image-17']
                    },
                    {
                        "image": "/img/gallery/lifestyle-outdoor-pool-dusk.jpg",
                        "title": window.trans['images']['image-18']
                    },
                    {
                        "image": "/img/gallery/lifestyle-pool-lounge.jpg",
                        "title": window.trans['images']['image-19']
                    },
                    {
                        "image": "/img/gallery/residences-living-dining.jpg",
                        "title": window.trans['images']['image-20']
                    },
                    {
                        "image": "/img/gallery/residences-kitchen.jpg",
                        "title": window.trans['images']['image-21']
                    },
                    {
                        "image": "/img/gallery/residences-private-terrace.jpg",
                        "title": window.trans['images']['image-22']
                    }
                ]
            };
        },

        computed: {
            modalGallery() {
                return $(this.$el).find(".modal-gallery-component").first();
            }
        },

        methods: {
            updateGallerySliderImage(index) {
                this.currentGallerySliderImage = index;
            },

            openModalGallery(index) {
                this.modalGallery.trigger("open", index);
            },

            imageSliderOpenGallery() {
                this.openModalGallery(this.currentGallerySliderImage);
            }
        }
    };
</script>
