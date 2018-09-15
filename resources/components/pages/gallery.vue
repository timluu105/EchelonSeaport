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
                        <h1 class="gallery-component-title">Gallery</h1>

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
                    { image: "/img/gallery/architecture-city-aerial.jpg", title: "EchelonSeaport" },
                    { image: "/img/gallery/residences-hero.jpg", title: "133 Seaport" },
                    { image: "/img/gallery/residences-street-view.jpg", title: "135 Seaport", align: "vbottom" },
                    { image: "/img/gallery/architecture-central-courtyard.jpg", title: "Central Courtyard" },
                    { image: "/img/gallery/architecture-courtyard-view.jpg", title: "Iconic Pedestrian Bridge" },
                    { image: "/img/gallery/architecture-courtyard-detail.jpg", title: "Courtyard Retail" },
                    { image: "/img/gallery/residences-seaport-lobby.jpg", title: "133 Lobby" },
                    { image: "/img/gallery/residences-sky-lounge.jpg", title: "133 Sky Lounge" },
                    { image: "/img/gallery/lifestyle-entrance.jpg", title: "Fireplace Lounge" },
                    { image: "/img/gallery/lifestyle-library-lounge.jpg", title: "Library Lounge" },
                    { image: "/img/gallery/lifestyle-wine-room.jpg", title: "Tasting Room" },
                    { image: "/img/gallery/lifestyle-designphilosophy-livingroom.jpg", title: "135 Seaport Lounge" },
                    { image: "/img/gallery/lifestyle-innovation-center.jpg", title: "Echelon Innovation Center" },
                    { image: "/img/gallery/lifestyle-wellness-pool.jpg", title: "The Relaxation Pool" },
                    { image: "/img/gallery/lifestyle-basketball-court.jpg", title: "Hi-Def Basketball Court" },
                    { image: "/img/gallery/lifestyle-spa-room.jpg", title: "The Spa at EchelonSeaport", align: "vbottom" },
                    { image: "/img/gallery/lifestyle-outdoor-pool-day.jpg", title: "The Grand Pool" },
                    { image: "/img/gallery/lifestyle-outdoor-pool-dusk.jpg", title: "The Waterfall Terrace Pool" },
                    { image: "/img/gallery/lifestyle-pool-lounge.jpg", title: "Outdoor Fireplace Lounge" },
                    { image: "/img/gallery/residences-living-dining.jpg", title: "133 Resident Living Room" },
                    { image: "/img/gallery/residences-kitchen.jpg", title: "133 Resident Kitchen" },
                    { image: "/img/gallery/residences-private-terrace.jpg", title: "133 Resident Terrace" }
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
