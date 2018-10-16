<template>
    <div class="floorplan-and-availability-alt-component">
        <h1>{{ $t("floorplans.for-availability") }}</h1>
        <h2 v-html="contactlinkandtext"><!-- contact link and text --></h2>

        <div class="floorplan-and-availability-alt-contact-container">
            <contact-registration />
        </div>
    </div>
</template>

<script>
    import BasePage from "mixins/base-page.js";
    import ContactRegistration from "sections/contact-registration.vue";

    export default {
        mixins: [
            BasePage
        ],

        data: function() {
            var contactText = this.$t("floorplans.contact-us-at");
            var contactLinkAndText = contactText.replace('%phone_link%', '<a id="main-number-availability" class="mobile-block" href="' + this.$store.getters.getMainNumberLink + '">' + this.$store.getters.getMainNumber + '</a>');
                return {
                    "contactlinkandtext": contactLinkAndText,
                }
            }
        ,

        components: {
            "contact-registration": ContactRegistration
        }
    };
</script>
