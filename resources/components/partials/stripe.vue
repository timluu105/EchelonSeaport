<template>
    <div class="stripe-component">
        <div class="stripe-component-content">
            <h2
                v-if="('subtitle' in cContent) && cContent.subtitle !== ''"
                class="stripe-component-content-subtitle"
                v-html="cContent.subtitle">
            </h2>

            <h1
                v-if="('title' in cContent) && cContent.title !== ''"
                class="stripe-component-content-title"
                v-html="cContent.title">
            </h1>

            <div
                v-if="('body' in cContent) && cContent.body !== ''"
                class="stripe-component-content-body"
                v-html="preventDanglingWords(cContent.body)">
            </div>
            <div v-if="hasDefaultSlot" :style="inlineComponentBodyStyles" class="stripe-component-content-body">
                <slot></slot>
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
                type: Object,
                default: function() {
                    return {
                        "width": null
                    };
                }
            }
        },
        computed: {
            inlineComponentBodyStyles: function() {
                if(this.cContent["width"] !== null) {
                    return {
                        "max-width": this.cContent["width"] + "px"
                    };
                } else {
                    return {};
                }
            },
            hasDefaultSlot () {
                return !!this.$slots.default
            },
        }
    };
</script>
