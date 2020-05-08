<template>
    <div class="contact-component">
        <div class="contact-component-wrapper">
            <h2>{{ $t("contact.interested") }}</h2>
            <h5>{{ $t("contact.receive-updates") }}</h5>
            <virtual-tours />
        </div>
    </div>
</template>

<script>
    import BasePage from "mixins/base-page.js";
    import VirtualTours from "sections/virtual-tours.vue";

    export default {
        mixins: [
            BasePage
        ],

        components: {
            "virtual-tours": VirtualTours
        }
    };
</script>
