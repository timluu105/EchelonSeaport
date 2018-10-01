<template>
    <div
        class="intro-component"
        :class="{ 'show-intro': showIntro, animate }"
        @click="skipIntro">

        <div :style="{ opacity: animate ? 1 : 0 }">
            <div class="intro-component-cityscape-image color"></div>
            <div class="intro-component-cityscape-image mixed"></div>
            <div class="intro-component-cityscape-image grayscale"></div>

            <div class="intro-component-cover">
                <div class="intro-component-cover-background"></div>

                <div class="intro-component-cover-logo">
                    <img src="/img/logo-icon-white.svg" />

                    <img
                        class="intro-component-cover-logo-text"
                        src="/img/logo-text-white.svg"
                        alt="Echelon Seaport"
                    />
                </div>

                <div class="intro-component-cover-copy">
                    <div>{{ $t("intro.header-1") }}</div>
                    <div>{{ $t("intro.header-2") }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                introTimeout: undefined,
                animate: false
            };
        },

        computed: {
            showIntro() {
                return this.$route.path === "/" && !this.$store.getters.getIntroPlayed;
            }
        },

        methods: {
            finishIntro() {
                this.$store.commit("setIntroPlayed", true);
            },

            skipIntro() {
                clearTimeout(this.introTimeout);
                this.$store.commit("setNavHidden", false);
                this.finishIntro();
            },

            initIntro() {
                clearTimeout(this.introTimeout);

                if (this.showIntro && !this.$store.getters.getIntroPlayed) {
                    this.animate = true;

                    this.introTimeout = setTimeout(() => {
                        this.$store.commit("setNavHidden", false);
                        this.introTimeout = setTimeout(this.finishIntro, 2500);
                    }, 5500);
                } else if (this.$store.getters.getIntroPlayed) {
                    this.finishIntro();
                } else {
                    this.animate = false;
                }
            }
        },

        mounted() {
            this.$nextTick(this.initIntro);
        },

        watch: {
            showIntro() {
                this.initIntro();
            }
        },

        beforeDestroy() {
            clearTimeout(this.introTimeout);
        }
    };
</script>
