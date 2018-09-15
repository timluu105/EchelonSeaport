<template>
    <div class="news-component">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-lg-10 col-lg-offset-1 col-xl-8 col-xl-offset-2">
                    <div
                        v-for="item in press_items"
                        class="press-item">

                        <div
                            v-if="item.image !== ''"
                            class="press-item-image"
                            :style="{ backgroundImage: 'url(' + item.image + ')' }">
                        </div>

                        <h1 class="press-item-title">
                            {{ item.title }}
                        </h1>

                        <div class="press-item-details">
                            <span class="press-item-details-publication">{{ item.publisher }}</span>
                            <span class="press-item-details-spacer">|</span>
                            <span class="press-item-details-date">{{ item.date }}</span>

                            <template v-if="item.pdf !== ''">
                                <span class="press-item-details-spacer">|</span>

                                <a
                                    class="press-item-details-pdf"
                                    :href="item.pdf"
                                    target="_blank">

                                    Download PDF
                                </a>
                            </template>
                        </div>

                        <div
                            class="press-item-description"
                            v-html="item.description">
                        </div>
                    </div>
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
                press_items: []
            };
        },

        methods: {
            fetchPressArticles() {
                this.$http.get("/api/press-articles" + env.apiToken).then((response) => {
                    // successful response
                    this.press_items = response.body;
                }, (response) => {
                    // unsuccessful response
                    console.log("error fetching enabled press articles");
                });
            }
        },

        created() {
            this.fetchPressArticles();
        }
    };
</script>
