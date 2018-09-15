<template>
    <div
        class="dual-image-column-component"
        :class="[ 'order-' + cContent.order, 'bgcolor-' + cContent.bgcolor ]">

        <div class="dual-image-column-component-inner">
            <div class="dual-image-column-component-title-column">
                <div
                    class="dual-image-column-component-title-column-image"
                    :style="{ backgroundImage: 'url(' + cContent.titleimage + ')' }">
                </div>

                <div class="dual-image-column-component-title-column-wrapper">
                    <div
                        class="dual-image-column-component-title-column-title"
                        v-html="cContent.title">
                    </div>

                    <div
                        v-if="cContent.body !== ''"
                        class="dual-image-column-component-title-column-body"
                        v-html="preventDanglingWords(cContent.body)">
                    </div>
                </div>
            </div>

            <div
                class="dual-image-column-component-image-column"
                :style="{ backgroundImage: 'url(' + cContent.image + ')', backgroundPosition: cContent.halign + ' ' + cContent.valign }">
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
