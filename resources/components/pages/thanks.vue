<template>
    <div class="thanks-component">
        <div class="thanks-text">
            <router-link class="thanks-text-logo" to="/" exact>
                <img src="/img/logo.svg" alt="Echelon Seaport" />
            </router-link>

            <h1>Thank you for registering your interest.</h1>
            <h2>Exclusive Echelon Insiders will be the first to receive project updates, announcements and invitations.</h2>
        </div>
    </div>
</template>

<script>
    import BasePage from "mixins/base-page.js";

    export default {
        mixins: [
            BasePage
        ]
    };
</script>
