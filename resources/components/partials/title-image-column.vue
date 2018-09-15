<template>
    <div class="title-image-column-component">
        <div class="title-image-column-component-top-row">
            <div class="title-image-column-component-top-row-title-column">
                <div class="title-image-column-component-top-row-title-column-wrapper">
                    <div
                        class="title-image-column-component-top-row-title-column-subtitle"
                        v-html="cContent.subtitle">
                    </div>

                    <div
                        class="title-image-column-component-top-row-title-column-title"
                        v-html="cContent.title">
                    </div>
                </div>
            </div>

            <div
                class="title-image-column-component-top-row-image-column"
                :style="{ backgroundImage: 'url(' + cContent.image + ')', backgroundPosition: cContent.halign + ' ' + cContent.valign }">
            </div>
        </div>

        <div
            v-if="cContent.body !== ''"
            class="title-image-column-component-bottom-row">

            <div
                class="title-image-column-component-bottom-row-body"
                v-html="preventDanglingWords(cContent.body)">
            </div>
        </div>
    </div>
</template>

<script>
    import PreventDanglingWords from "mixins/prevent-dangling-words.js";

    export default {
        mixins: [
            PreventDanglingWords
        ],

        props: {
            cContent: {
                type: Object
            }
        }
    };
</script>
