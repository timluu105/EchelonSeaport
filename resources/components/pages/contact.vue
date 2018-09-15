<template>
    <div class="contact-component">
        <div class="contact-component-wrapper">
            <h2>Interested in learning more?</h2>
            <h5>To receive exclusive updates, please provide your contact information below.</h5>
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
