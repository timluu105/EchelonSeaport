<template>
    <div class="error-component container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <router-link class="error-component-logo" to="/" exact>
                    <img src="/img/logo.svg" alt="Echelon Seaport" />
                </router-link>

                <h1>{{ $t("errors.not-found") }}</h1>
            </div>
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
