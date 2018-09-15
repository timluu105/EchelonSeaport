<template>
    <div class="slide-component">
        <div
            class="image slide image-slider-image"
            :class="'slide-'+id"
            :style="{ backgroundImage:  'url(' + src + ')' }">
        </div>

        <div
            v-for="(hotspot, index) in hotspots"
            v-if="hotspots"
            class="hotspot slide-hotspots-container text-center"
            :class="[ 'hotspot-container-' + (index + 1), hotspot.status ? hotspot.status : '' ]"
            :style="{ top: hotspot.y, left: hotspot.x }">

            <div class="hotspot-tooltip" :class="hotspot.status === 'sold' ? hotspot.status : ''">
                <h3 class="hotspot-title">{{ hotspot.status ? hotspot.status : hotspot.title }}</h3>
                <hr />
                <p class="hotspot-caption">{{ hotspot.caption }}</p>

                <div class="hotspot-links-wrapper">
                    <span class="hotspot-link request-floorplan-link" @click="moveToContact(hotspot.title)">
                        Request Floor Plan
                    </span>

                    <span class="hotspot-link">
                        <a class="factsheet-link" target="_blank" :href="hotspot.link">
                            Fact Sheet
                        </a>
                    </span>
                </div>
            </div>
        </div>

        <div
            class="slide-caption"
            :class="[ 'slide-caption-' + id, { static: pageIsSmall } ]"
            :style="{ top: offsetTop, right: offsetRight, bottom: offsetBottom, left: offsetLeft }">

            <h3 class="slide-caption-top">{{ topCaption }}</h3>
            <h3 class="slide-caption-bottom">{{ bottomCaption }}</h3>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: Number
            },

            src: {
                type: String
            },

            topCaption: {
                type: String
            },

            bottomCaption: {
                type: String
            },

            offsetTop: {
                type: String,
                default: "auto"
            },

            offsetRight: {
                type: String,
                default: "auto"
            },

            offsetBottom: {
                type: String,
                default: "auto"
            },

            offsetLeft: {
                type: String,
                default: "auto"
            },

            /* each slide may also have an (optional) array of hotspots, each of which contain
            - a top-offset and left-offset (percentage of containing image height/width)
            - a title and caption
            - a Request Floor Plan link which redirects to the Contact Page
            - a Fact Sheet link which downloads a pdf
            */
            hotspots: {
                type: Array
            }
        },

        data() {
            return {
                hotspotActive: false,
                pageIsSmall: false
            };
        },

        methods: {
            moveToContact(title) {
                this.$store.commit("setRequestInfo", title);
                this.$router.push("/contact");
            },

            isPageSmall() {
                this.pageIsSmall = $(window).width() < this.$store.getters.getScreenBreak.screenSm;
            }
        },

        mounted() {
            this.isPageSmall();
            this.$nextTick(this.isPageSmall);
            $(window).on("resize orientationchange", this.isPageSmall);
        },

        beforeDestroy() {
            $(window).off("resize orientationchange", this.isPageSmall);
        }
    };
</script>
