<template>
    <div class="residences-component">
        <div class="singular-destination-component" id="overview">
            <div class="singular-destination-component-title-row">
                <h1 class="singular-destination-component-title-row-title">
                    {{ $t("residences.two-addresses") }}<br>
                    {{ $t("residences.singular-destination") }}
                </h1>

                <p class="singular-destination-component-title-row-body">
                    "{{ $t("residences.text-1") }}"
                </p>
            </div>

            <div class="singular-destination-component-image-row">
                <div class="column left">
                    <div class="image"></div>

                    <div class="text">
                        <h2>133 Seaport</h2>

                        <p>{{ $t("residences.text-2") }}</p>
                    </div>
                </div>

                <div class="column right">
                    <div class="image"></div>

                    <div class="text">
                        <h2>135 Seaport</h2>

                        <p>{{ $t("residences.text-3") }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="inset-image-component" id="133-seaport">
            <div class="inset-image-component-inner" style="background-image: url(&quot;/uploads/img/2-image.jpg?version=1530029525&quot;); background-position: center center;"></div>
        </div>

        <div class="stripe-component" id="section-3">
            <div class="stripe-component-content">
                <h2 class="stripe-component-content-subtitle">Echelon</h2>

                <h1 class="stripe-component-content-title">133 Seaport</h1>

                <div class="stripe-component-content-body">
                    <p>{{ $t("residences.text-4") }}</p>
                </div>
            </div>
        </div>

        <div class="captioned-image-component margin-full-bleed" id="lobby">
            <div class="captioned-image-component-image" style="background-image: url(&quot;/uploads/img/4-image.jpg?version=1530029525&quot;); background-position: center center;"></div>

            <div class="captioned-image-component-caption">
                <h1 class="captioned-image-component-caption-title">Different by Design</h1>

                <div class="captioned-image-component-caption-body">
                    <p>{{ $t("residences.text-5") }}</p>
                </div>
            </div>
        </div>

        <div class="inset-image-component" id="living-room">
            <div class="inset-image-component-inner" style="background-image: url(&quot;/uploads/img/5-image.jpg?version=1530029525&quot;); background-position: center bottom;"></div>
        </div>

        <div class="stripe-component" id="section-6">
            <div class="stripe-component-content">
                <h2 class="stripe-component-content-subtitle">133 Seaport Residences</h2>

                <h1 class="stripe-component-content-title">A Living Work of Art</h1>

                <div class="stripe-component-content-body">
                    <p>{{ $t("residences.text-6") }}</p>
                </div>
            </div>
        </div>

        <div class="captioned-image-component margin-full-bleed" id="views">
            <div class="captioned-image-component-image" style="background-image: url(&quot;/uploads/img/7-image.jpg?version=1530029525&quot;); background-position: center bottom;"></div>

            <div class="captioned-image-component-caption">
                <h1 class="captioned-image-component-caption-title">Own the Sky</h1>

                <div class="captioned-image-component-caption-body">
                    <p>{{ $t("residences.text-7") }}</p>
                </div>
            </div>
        </div>

        <div class="captioned-image-component margin-full-bleed" id="kitchen">
            <div class="captioned-image-component-image" style="background-image: url(&quot;/uploads/img/8-image.jpg?version=1530029525&quot;); background-position: center center;"></div>

            <div class="captioned-image-component-caption">
                <h1 class="captioned-image-component-caption-title">Top Chef</h1>

                <div class="captioned-image-component-caption-body">
                    <p>{{ $t("residences.text-8") }}</p>
                </div>
            </div>
        </div>

        <div class="captioned-image-component margin-full-bleed" id="terraces">
            <div class="captioned-image-component-image" style="background-image: url(&quot;/uploads/img/10-image.jpg?version=1530029526&quot;); background-position: center bottom;"></div>

            <div class="captioned-image-component-caption">
                <h1 class="captioned-image-component-caption-title">Signature City Terraces</h1>

                <div class="captioned-image-component-caption-body">
                    <p>{{ $t("residences.text-9") }}</p>
                </div>
            </div>
        </div>

        <div class="one-thirty-five-seaport-component" id="section-11">
            <div class="one-thirty-five-seaport-component-column hero"></div>

            <div class="one-thirty-five-seaport-component-column contact">
                <div class="one-thirty-five-seaport-component-column contact-wrapper">
                    <h1>For a Preview of EchelonSeaport</h1>

                    <h2>Please Provide Your Contact Information Below.</h2>

                    <contact-registration id="contact-registration" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BasePage from "mixins/base-page.js";
    import ContactRegistration from "sections/contact-registration.vue";

    export default {
        mixins: [ BasePage ],

        components: {
            "contact-registration": ContactRegistration
        }
    };
</script>
