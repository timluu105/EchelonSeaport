<template>
    <div
        class="captioned-image-component"
        :class="'margin-' + cContent.margin">

        <div
            class="captioned-image-component-image"
            :style="{ backgroundImage: 'url(' + cContent.image + ')', backgroundPosition: cContent.halign + ' ' + cContent.valign }">
        </div>

        <div class="captioned-image-component-caption">
            <h1
                v-if="cContent.title !== ''"
                class="captioned-image-component-caption-title">

                {{ cContent.title }}
            </h1>

            <div
                v-if="cContent.body !== ''"
                class="captioned-image-component-caption-body"
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
