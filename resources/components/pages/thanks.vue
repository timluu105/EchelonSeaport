<template>
    <div class="thanks-component">
        <div class="thanks-text">
            <router-link class="thanks-text-logo" to="/" exact>
                <img src="/img/logo.svg" alt="Echelon Seaport" />
            </router-link>

            <h1>{{ $t("register-thank-you.thank-you") }}</h1>
            <h2>{{ $t("register-thank-you.echelon-insiders") }}</h2>
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
