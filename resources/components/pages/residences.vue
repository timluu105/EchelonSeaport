<template>
    <div class="residences-component">
        <residences-video></residences-video>

        <div class="singular-destination-component" id="overview">
            <div class="singular-destination-component-title-row">
                <h1 class="singular-destination-component-title-row-title">
                    {{ $t("residences.two-addresses") }}<br>
                    {{ $t("residences.singular-destination") }}
                </h1>

                <p class="singular-destination-component-title-row-body">
                    {{ $t("residences.text-1") }}
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
                <h1 class="captioned-image-component-caption-title">{{ $t("residences.different-by-design") }}</h1>

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
                <h2 class="stripe-component-content-subtitle">{{ $t("residences.133-seaport-residences") }}</h2>

                <h1 class="stripe-component-content-title">{{ $t("residences.living-work") }}</h1>

                <div class="stripe-component-content-body">
                    <p>{{ $t("residences.text-6") }}</p>
                </div>
            </div>
        </div>

        <div class="captioned-image-component margin-full-bleed" id="views">
            <div class="captioned-image-component-image" style="background-image: url(&quot;/uploads/img/7-image.jpg?version=1530029525&quot;); background-position: center bottom;"></div>

            <div class="captioned-image-component-caption">
                <h1 class="captioned-image-component-caption-title">{{ $t("residences.own-sky") }}</h1>

                <div class="captioned-image-component-caption-body">
                    <p>{{ $t("residences.text-7") }}</p>
                </div>
            </div>
        </div>

        <div class="captioned-image-component margin-full-bleed" id="kitchen">
            <div class="captioned-image-component-image" style="background-image: url(&quot;/uploads/img/8-image.jpg?version=1530029525&quot;); background-position: center center;"></div>

            <div class="captioned-image-component-caption">
                <h1 class="captioned-image-component-caption-title">{{ $t("residences.top-chef") }}</h1>

                <div class="captioned-image-component-caption-body">
                    <p>{{ $t("residences.text-8") }}</p>
                </div>
            </div>
        </div>

        <div class="captioned-image-component margin-full-bleed" id="terraces">
            <div class="captioned-image-component-image" style="background-image: url(&quot;/uploads/img/10-image.jpg?version=1530029526&quot;); background-position: center bottom;"></div>

            <div class="captioned-image-component-caption">
                <h1 class="captioned-image-component-caption-title">{{ $t("residences.signature-terraces") }}</h1>

                <div class="captioned-image-component-caption-body">
                    <p>{{ $t("residences.text-9") }}</p>
                </div>
            </div>
        </div>

         <div class="inset-image-component" id="living-room-2">
            <div class="inset-image-component-inner" style="background-image: url(&quot;/img/CTW1125_Echelon_S020_INT_LivingDining_Final2000.jpg&quot;); background-position: center bottom;"></div>
        </div>

        <div class="stripe-component" id="living-dining">
            <div class="stripe-component-content">

                <h2 class="captioned-image-component-caption-title">{{ $t("residences.title-elevate-perspective") }}</h2>

                <div class="stripe-component-content-body">
                    <p>{{ $t("residences.corner-glass-living-room") }}</p>
                </div>
            </div>
        </div>

        <div class="captioned-image-component margin-full-bleed" id="penthouse-2">
            <div class="captioned-image-component-image large-image" style="background-image: url(&quot;/img/CTW1125_Echelon_S030_INT_Living_Final2000.jpg&quot;); background-position: center bottom;"></div>

            <div class="captioned-image-component-caption">
                <h1 class="captioned-image-component-caption-title">{{ $t("residences.title-welcome-home") }}</h1>

                <div class="captioned-image-component-caption-body">
                    <p>{{ $t("residences.living-room-2") }}</p>
                </div>
            </div>
        </div>

        <div class="captioned-image-component margin-full-bleed" id="penthouse-3">
            <div class="captioned-image-component-image large-image" style="background-image: url(&quot;/img/CTW1125_Echelon_S040_INT_KitchenDining_Final2000.jpg&quot;); background-position: center bottom;"></div>

            <div class="captioned-image-component-caption">
                <h1 class="captioned-image-component-caption-title">{{ $t("residences.title-kitchens-inspire") }}</h1>

                <div class="captioned-image-component-caption-body">
                    <p>{{ $t("residences.penthouse-kitchen") }}</p>
                </div>
            </div>
        </div>

        <div class="captioned-image-component margin-full-bleed" id="penthouse-4">
            <div class="captioned-image-component-image large-image" style="background-image: url(&quot;/img/CTW1125_Echelon_S050_INT_Bath_Final2000.jpg&quot;); background-position: center bottom;"></div>

            <div class="captioned-image-component-caption">
                <h1 class="captioned-image-component-caption-title">{{ $t("residences.title-penthouse-bath") }}</h1>

                <div class="captioned-image-component-caption-body">
                    <p>{{ $t("residences.penthouse-bath") }}</p>
                </div>
            </div>
        </div>

        <div class="inset-image-component" id="135-seaport">
            <div class="inset-image-component-inner" style="background-image: url(&quot;/img/Neoscape_Cottonwood-EchelonSeaport_Hero_V3_FINAL.jpg&quot;); background-position: center center;"></div>
        </div>

        <div class="stripe-component" id="135-seaport-stripe">
            <div class="stripe-component-content">
                <h2 class="stripe-component-content-subtitle">Echelon</h2>

                <h1 class="stripe-component-content-title">135 Seaport</h1>

                <div class="stripe-component-content-body">
                    <p>{{ $t("residences.135-hero") }}</p>
                </div>
            </div>
        </div>

        <div class="captioned-image-component margin-full-bleed" id="135-seaport-lobby">
            <div class="captioned-image-component-image" style="background-image: url(&quot;/img/T2 Lobby Final Rendering.jpg&quot;); background-position: center center;"></div>

            <div class="captioned-image-component-caption">
                <h1 class="captioned-image-component-caption-title">{{ $t("residences.lobby") }}</h1>

                <div class="captioned-image-component-caption-body">
                    <p>{{ $t("residences.135-lobby") }}</p>
                </div>
            </div>
        </div>

        <div class="inset-image-component" id="135-seaport-lounge">
            <div class="inset-image-component-inner" style="background-image: url(&quot;/img/T2 Lounge Final Rendering.jpg&quot;); background-position: center bottom;"></div>
        </div>

        <div class="stripe-component" id="135-seaport-lounge-stripe">
            <div class="stripe-component-content">

                <h2 class="captioned-image-component-caption-body">{{ $t("residences.lounge") }}</h2>

                <div class="stripe-component-content-body">
                    <p>{{ $t("residences.135-lounge") }}</p>
                </div>
            </div>
        </div>


        <div class="one-thirty-five-seaport-component" id="section-11">
            <div class="one-thirty-five-seaport-component-column hero"></div>

            <div class="one-thirty-five-seaport-component-column contact">
                <div class="one-thirty-five-seaport-component-column contact-wrapper">
                    <h1>{{ $t("residences.preview-of") }}</h1>

                    <h2>{{ $t("residences.contact-info") }}</h2>

                    <contact-registration id="contact-registration" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BasePage from "mixins/base-page.js";
    import ContactRegistration from "sections/contact-registration.vue";
    import ResidencesVideo from "sections/residences-video.vue";

    export default {
        mixins: [ BasePage ],

        components: {
            "contact-registration": ContactRegistration,
            "residences-video": ResidencesVideo
        }
    };
</script>

<style>
    #135-seaport .inset-aspect:before, .captioned-image-component.margin-inset .captioned-image-component-image:before, .inset-image-component-inner:before {
	    padding-top: 60% !important;
    }
</style>