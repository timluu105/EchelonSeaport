<template>
    <div class="newspaper-component">
        <div class="newspaper-component-wrapper">
            <div class="newspaper-top text-center">
                <router-link class="logo-link" to="/" exact>
                    <img src="/img/logo.svg" alt="Echelon Seaport" />
                </router-link>
            </div>

            <div class="newspaper-container">
                <div class="newspaper-wrapper">
                    <div class="newspaper-middle">
                        <div :id="newspaperElementId" class="newspaper">
                            <div v-for="n in pageCount" :style="{ backgroundImage: 'url(/img/newspaper/' + newspaperId + '/' + n + '.jpg)' }"></div>
                        </div>
                    </div>
                </div>

                <div class="newspaper-actions">
                    <div class="newspaper-btn newspaper-zoomin" @click="zoomIn">+</div>
                    <div class="newspaper-btn newspaper-zoomout" @click="zoomOut">-</div>
                </div>
            </div>

            <div class="newspaper-bottom text-center">
                <div class="return-home">
                    <router-link to="/" exact>
                        <h2 class="return-home-cta"><span>Register to learn more</span></h2>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BasePage from "mixins/base-page.js";

    export default {
        mixins: [
            BasePage
        ],

        data() {
            return {
                newspaperElementId: "newspaper",
                zoomValue: 1,
                pageCount: 28,
                newspaperId: "01-preview"
            };
        },

        computed: {
            newspaperElement() {
                return $(`#${this.newspaperElementId}`);
            }
        },

        methods: {
            keyboardEvents(e) {
                if (e.keyCode === 37) {
                    this.newspaperElement.turn("previous");
                } else if (e.keyCode === 39) {
                    this.newspaperElement.turn("next");
                }
            },

            initMouseEvents() {
                this.newspaperElement.find(".page").each((index, el) => {
                    const direction = index % 2 === 0 ? "next" : "previous";

                    $(el).on("click", () => {
                        this.newspaperElement.turn(direction);
                    });
                });
            },

            initNewspaper() {
                this.newspaperElement.turn({
                    display: "double",
                    duration: 500,
                    elevation: 25,
                    width: 771,
                    height: 600
                });

                $(document).on("keydown", this.keyboardEvents);
                this.initMouseEvents();
            },

            zoomIn() {
                if (this.zoomValue <= 3) {
                    this.zoomValue += 1;
                }

                this.newspaperElement.turn("zoom", this.zoomValue, 1000);
            },

            zoomOut() {
                if (this.zoomValue >= 1) {
                    this.zoomValue -= 1;
                }

                this.newspaperElement.turn("zoom", this.zoomValue, 1000);
            },

            zoomReset() {
                this.zoomValue = 1;
            }
        },

        mounted() {
            this.$nextTick(this.initNewspaper);
        },

        beforeDestroy() {
            $(document).off("keydown", this.keyboardEvents);
        }
    };
</script>
