<template>
    <div class="neighborhood-component">
        <inset-image id="the-seaport" :c-content="headerImageContent" />
        <stripe :c-content="locationSeaportContent" />
        <captioned-image :c-content="soaringHeightsContent" />

        <div class="neighborhood-component-dining">
            <div class="neighborhood-component-dining-wrapper">
                <div class="neighborhood-component-dining-inner">
                    <div class="neighborhood-component-dining-text">
                        <div class="neighborhood-component-dining-text-inner">
                            <div class="neighborhood-component-dining-text-title">
                                <h2>{{$t("neighborhood.seaport-dining-1")}}</h2>
                                <h1>{{$t("neighborhood.seaport-dining-2")}}</h1>
                            </div>

                            <p class="neighborhood-component-dining-text-copy">
                                {{$t("neighborhood.dining-text-copy")}}
                            </p>
                        </div>
                    </div>

                    <div class="neighborhood-component-dining-middle-space hide-mobile"></div>
                    <div class="neighborhood-component-dining-image at-the-bar hide-mobile"></div>
                    <div class="neighborhood-component-dining-image delicious-dinner hide-mobile"></div>
                    <div class="neighborhood-component-dining-image tasty-dessert hide-mobile"></div>
                    <div class="neighborhood-component-dining-image at-the-entrance hide-mobile"></div>
                    <div class="neighborhood-component-dining-image fine-dining"></div>
                </div>
            </div>
        </div>

        <dual-image-column :c-content="grandlyScaledContent" />
        <captioned-image :c-content="seaportSweatContent" />
        <neighborhood-map id="map" />

        <div
            id="neighborhood-gallery"
            class="neighborhood-component-slider-wrapper">

            <image-slider
                :c-slider-images="neighborhoodSliderImages"
                @loop="updateNeighborhoodSliderImage"
                @active-clicked="imageSliderOpenGallery"
            />
        </div>

        <stripe :c-content="neighborhoodGalleryContent" />
        <modal-gallery :c-images="neighborhoodSliderImages" />
        <stripe :c-content="{width: 1060}">
            <div id="neighborhood-video" class='embed-container'>
                <iframe src="https://www.youtube.com/embed/fsafWusvKig" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </stripe>
        <stripe :c-content="neighborhoodVideoDescriptionContent" />
    </div>
</template>

<script>
    import BasePage from "mixins/base-page.js";
    import NeighborhoodMap from "sections/neighborhood-map.vue";
    import InsetImage from "partials/inset-image.vue";
    import CaptionedImage from "partials/captioned-image.vue";
    import Stripe from "partials/stripe.vue";
    import DualImageColumn from "partials/dual-image-column.vue";
    import ImageSlider from "partials/image-slider.vue";
    import ModalGallery from "partials/modal-gallery.vue";

    export default {
        mixins: [
            BasePage
        ],

        components: {
            "neighborhood-map": NeighborhoodMap,
            "inset-image": InsetImage,
            "captioned-image": CaptionedImage,
            "stripe": Stripe,
            "dual-image-column": DualImageColumn,
            "image-slider": ImageSlider,
            "modal-gallery": ModalGallery
        },

        data() {
            return {
                currentNeighborhoodSliderImage: 0,

                headerImageContent: {
                    image: "/img/cityscape-color.jpg?version=2",
                    halign: "15%",
                    valign: "bottom"
                },

                locationSeaportContent: {
                    subtitle: this.$t("neighborhood.seaport-neighborhood"),
                    title: this.$t("neighborhood.get-centered") + " <br />" + this.$t("neighborhood.get-connected"),
                    body: this.$t("neighborhood.location-seaport")
                },

                neighborhoodSliderImages: [
                    { image: "/img/neighborhood/fine-dining.jpg" },
                    { image: "/img/neighborhood/fine-scents.jpg" },
                    { image: "/img/neighborhood/morning-coffee.jpg" },
                    { image: "/img/neighborhood/menton.jpg", align: "hright" },
                    { image: "/img/neighborhood/ica.jpg" },
                    { image: "/img/neighborhood/ships.jpg" },
                    { image: "/img/neighborhood/by-chloe.jpg" },
                    { image: "/img/neighborhood/beer.jpg" },
                    { image: "/img/neighborhood/shop.jpg" },
                    { image: "/img/neighborhood/district-hall.jpg" },
                    { image: "/img/neighborhood/chairs.jpg" },
                    { image: "/img/neighborhood/food.jpg" },
                    { image: "/img/neighborhood/plants.jpg", align: "hright" },
                    { image: "/img/neighborhood/seaport-water.jpg", align: "hright" },
                    { image: "/img/neighborhood/boat.jpg" },
                    { image: "/img/neighborhood/bar.jpg" },
                    { image: "/img/neighborhood/fort-point.jpg", align: "hcenter" },
                    { image: "/img/neighborhood/seafood.jpg" }

                ],

                soaringHeightsContent: {
                    title: this.$t("neighborhood.new-center"),
                    body: this.$t("neighborhood.soaring-heights"),
                    image: "/img/neighborhood/soaring-heights.jpg",
                    halign: "center",
                    valign: "center",
                    margin: "inset"
                },

                grandlyScaledContent: {
                    title: this.$t("neighborhood.seaport-styled"),
                    body: this.$t("neighborhood.grandly-scaled"),
                    titleimage: "/img/neighborhood/seaport-styled-detail.jpg",
                    image: "/img/neighborhood/seaport-styled.jpg",
                    halign: "center",
                    valign: "center",
                    order: "image-title",
                    bgcolor: "transparent"
                },

                seaportSweatContent: {
                    title: this.$t("neighborhood.wellness"),
                    body: this.$t("neighborhood.seaport-sweat"),
                    image: "/img/neighborhood/seaport-sweat.jpg",
                    halign: "center",
                    valign: "center",
                    margin: "full-bleed"
                },

                neighborhoodGalleryContent: {
                    subtitle: this.$t("neighborhood.gallery-subtitle"),
                    title: this.$t("neighborhood.gallery-title"),
                    body: this.$t("neighborhood.gallery")
                },

                neighborhoodVideoDescriptionContent: {
                    subtitle: this.$t("neighborhood.gallery-video-subtitle"),
                    title: this.$t("neighborhood.gallery-video-title"),
                    body: this.$t("neighborhood.gallery-video")
                }
            };
        },

        computed: {
            modalGallery() {
                return $(this.$el).find(".modal-gallery-component").first();
            }
        },

        methods: {
            updateNeighborhoodSliderImage(index) {
                this.currentNeighborhoodSliderImage = index;
            },

            imageSliderOpenGallery() {
                this.modalGallery.trigger("open", this.currentNeighborhoodSliderImage);
            }
        }
    };
</script>
<style scoped>
    .embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; }
    .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
</style>