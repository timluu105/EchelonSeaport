<template>
    <div class="floorplan-and-availability-component">
        <availability-table
            v-for="building in Object.keys(buildings)"
            :c-building="building"
            :c-units="buildings[building]"
            @view-floorplan="viewFloorplan"
        />

        <div class="modal-gallery" :class="{ open: modalGalleryImages.length }">
            <div class="modal-gallery-image-container">
                <div
                    v-for="(image, index) in modalGalleryImages"
                    class="modal-gallery-image"
                    :class="{ active: index === currentModalGalleryImage }"
                    :style="{ backgroundImage: 'url(' + image + ')' }">
                </div>
            </div>

            <div
                class="modal-gallery-close"
                @click="triggerCloseModalGallery">
            </div>

            <template v-if="modalGalleryImages.length > 1">
                <div class="modal-gallery-nav-button prev" @click="prevModalGalleryImage"></div>
                <div class="modal-gallery-nav-button next" @click="nextModalGalleryImage"></div>
            </template>
        </div>
    </div>
</template>

<script>
    import BasePage from "mixins/base-page.js";
    import AvailabilityTable from "partials/availability-table.vue";

    export default {
        mixins: [
            BasePage
        ],

        components: {
            "availability-table": AvailabilityTable
        },

        data() {
            return {
                buildings: [],
                modalGalleryImages: [],
                currentModalGalleryImage: 0
            };
        },

        methods: {
            fetchUnits() {
                // Get units from the database
                this.$http.get("/api/units" + env.apiToken).then((response) => {
                    // Add units info to the units array in the data function so it can be used in the html
                    this.buildings = response.body;
                }, (response) => {
                    console.log("error with api/units/all in availability.vue");
                });
            },

            closeModalGallery() {
                $(window).off("hashchange", this.closeModalGallery);
                $("html").removeClass("no-scroll");
                this.modalGalleryImages = [];
                this.currentModalGalleryImage = 0;
            },

            triggerCloseModalGallery() {
                history.back();
            },

            escapeCloseModalGallery(e) {
                if (e.keyCode === 27 && this.modalGalleryImages.length) {
                    this.triggerCloseModalGallery();
                }
            },

            viewModalGallery() {
                window.history.pushState("", "", "#gallery");
                $(window).on("hashchange", this.closeModalGallery);
                $("html").addClass("no-scroll");
            },

            viewFloorplan(images) {
                this.modalGalleryImages = images;
                this.viewModalGallery();
            },

            prevModalGalleryImage() {
                if (this.currentModalGalleryImage === 0) {
                    this.currentModalGalleryImage = this.modalGalleryImages.length - 1;
                } else {
                    this.currentModalGalleryImage--;
                }
            },

            nextModalGalleryImage() {
                if (this.currentModalGalleryImage === this.modalGalleryImages.length - 1) {
                    this.currentModalGalleryImage = 0;
                } else {
                    this.currentModalGalleryImage++;
                }
            }
        },

        created() {
            // Populate the availability table
            this.fetchUnits();

            // Detect whether the modal gallery is open and close if it is when the escape button is hit
            $(document).on("keyup", this.escapeCloseModalGallery);

            // Strip any hash in the URL to ensure the back button will close the modal gallery
            history.replaceState({}, "", window.location.pathname);
        },

        beforeDestroy() {
            $("html").removeClass("no-scroll");
            $(document).off("keyup", this.escapeCloseModalGallery);
            $(window).off("hashchange", this.closeModalGallery);
        }
    };
</script>
