<template>
    <div
        class="video-source-component"
        :class="{ loaded }"
        :style="{ backgroundImage: 'url(/img/posters/' + cSource + '.jpg)' }">

        <video
            :poster="'/img/posters/' + cSource + '.jpg'"
            :autoplay="cAutoplay"
            :loop="cLoop"
            :muted="cMuted"
            playsinline>

            <source
                v-for="format in formats"
                :src="s3url + cSource + '.' + format"
                :type="'video/' + format"
            />
        </video>
    </div>
</template>

<script>
    import ContainElement from "contain-element/contain-element-module.js";

    export default {
        props: {
            cSource: {
                type: String
            },

            cAutoplay: {
                type: Boolean,
                default: true
            },

            cLoop: {
                type: Boolean,
                default: true
            },

            cMuted: {
                type: Boolean,
                default: true
            }
        },

        data() {
            return {
                s3url: "https://wny.s3.amazonaws.com/echelon/",
                formats: [ "webm", "mp4" ],
                contain: undefined,
                containTimeout: undefined,
                containInterval: undefined,
                loaded: false
            };
        },

        methods: {
            containUpdate() {
                if (this.contain !== undefined) {
                    this.contain.update();
                    clearTimeout(this.containTimeout);
                    clearInterval(this.containInterval);
                    this.containInterval = setInterval(this.contain.update, 50);

                    this.containTimeout = setTimeout(() => {
                        clearInterval(this.containInterval);
                    }, 1000);
                }
            }
        },

        mounted() {
            const video = $(this.$el).find("video")[0];

            video.addEventListener("loadedmetadata", () => {
                this.contain = new ContainElement({
                    element: video,
                    width: video.videoWidth,
                    height: video.videoHeight
                });

                this.containUpdate();
                $(window).on("resize orientationchange", this.containUpdate);

                this.$nextTick(() => {
                    this.containUpdate();
                    this.loaded = true;
                });
            });
        },

        beforeDestroy() {
            $(window).off("resize orientationchange", this.containUpdate);
            clearTimeout(this.containTimeout);
            clearInterval(this.containInterval);
        }
    };
</script>
