<template>
    <div class="stripe-component">
        <div class="stripe-component-content">
            <h2
                v-if="cContent.subtitle !== ''"
                class="stripe-component-content-subtitle"
                v-html="cContent.subtitle">
            </h2>

            <h1
                v-if="cContent.title !== ''"
                class="stripe-component-content-title"
                v-html="cContent.title">
            </h1>

            <div
                v-if="cContent.body !== ''"
                class="stripe-component-content-body"
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
