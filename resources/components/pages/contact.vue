<template>
    <div class="contact-component">
        <div class="contact-component-wrapper">
            <h2>{{ $t("contact.interested") }}</h2>
            <h5>{{ $t("contact.receive-updates") }}</h5>
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
