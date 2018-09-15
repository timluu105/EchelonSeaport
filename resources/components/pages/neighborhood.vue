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
                                <h2>Seaport</h2>
                                <h1>Dining</h1>
                            </div>

                            <p class="neighborhood-component-dining-text-copy">
                                Award-winning restaurateurs have made the Seaport Boston’s hottest dining destination. With restaurants from world-renowned James Beard award-winners Barbara Lynch, Ming Tsai, Joanne Chang, amongst others the Seaport offers a delicious diversity of food.
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
                    subtitle: "Seaport Neighborhood",
                    title: "Get Centered. <br />Get Connected.",
                    body: "Anchoring the Innovation District is the Boston’s most anticipated residential destination. More than an address, EchelonSeaport offers an exciting new way to live with curated retail, dynamic courtyards, and enriching indoor and outdoor amenities. EchelonSeaport follows the rich tradition of Boston place making, leaving its mark on the continued momentum of the city."
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
                    title: "The New Center of Boston",
                    body: "Charming, historic, cosmopolitan Boston has a brand-new face. The Seaport District has rapidly come into its own, becoming one the premiere neighborhoods in Boston.",
                    image: "/img/neighborhood/soaring-heights.jpg",
                    halign: "center",
                    valign: "center",
                    margin: "inset"
                },

                grandlyScaledContent: {
                    title: "Seaport Styled",
                    body: "Not just for dining, the Seaport District is shaping up to be Boston’s chicest neighborhood. With retailers ranging from innovative eyewear company, Warby Parker to classic brands like Filson, Lululemon and L.L. Bean there’s something for everyone. And that’s just the beginning…",
                    titleimage: "/img/neighborhood/seaport-styled-detail.jpg",
                    image: "/img/neighborhood/seaport-styled.jpg",
                    halign: "center",
                    valign: "center",
                    order: "image-title",
                    bgcolor: "transparent"
                },

                seaportSweatContent: {
                    title: "Destination Wellness",
                    body: "Whether you like to run, walk or bike there is no better place to break a sweat than Seaport’s picturesque waterfront. The neighborhood sets a high bar for wellness with outdoor workouts on Seaport Green featuring the best of local and national fitness companies from Everybody Fights to Soulcycle and Equinox. Stock up on new gear at Lululemon or L.L Bean or grab a healthy meal at Juice Press and byChloe. Wellness made easy.",
                    image: "/img/neighborhood/seaport-sweat.jpg",
                    halign: "center",
                    valign: "center",
                    margin: "full-bleed"
                },

                neighborhoodGalleryContent: {
                    subtitle: "Neighborhood",
                    title: "Gallery",
                    body: "Discover the Seaport. Vibrant and energetic, the Seaport neighborhood has arrived. On the cutting edge of Boston’s dining, shopping, and culture scene it's no wonder the Seaport is the city’s hottest “new” neighborhood."
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
