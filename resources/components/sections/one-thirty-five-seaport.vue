<template>
    <div class="one-thirty-five-seaport-component">
        <div class="one-thirty-five-seaport-component-column hero"></div>

        <div class="one-thirty-five-seaport-component-column contact">
            <div class="one-thirty-five-seaport-component-column contact-wrapper">
                <h1>For a Preview of EchelonSeaport</h1>
                <h2>Please Provide Your Contact Information Below.</h2>
                <contact-registration />
            </div>
        </div>
    </div>
</template>

<script>
    import ContactRegistration from "sections/contact-registration.vue";

    export default {
        components: {
            "contact-registration": ContactRegistration
        }
    };
</script>
