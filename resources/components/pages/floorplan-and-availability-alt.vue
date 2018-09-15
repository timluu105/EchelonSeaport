<template>
    <div class="floorplan-and-availability-alt-component">
        <h1>For Floor Plans &amp; Availability</h1>
        <h2>Contact Us at <a id="main-number-availability" class="mobile-block" :href="$store.getters.getMainNumberLink">{{ $store.getters.getMainNumber }}</a></h2>

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

        components: {
            "contact-registration": ContactRegistration
        }
    };
</script>
