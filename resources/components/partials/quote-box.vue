<template>
    <div class="quote-box-component">
        <div class="quote-box-component-quote" v-html="quoteText"></div>

        <div
            v-if="cContent.logo !== 'none'"
            class="quote-box-component-logo">

            <img :src="'/img/logos/' + cContent.logo + '.png'" />
        </div>

        <hr />
    </div>
</template>

<script>
    export default {
        props: {
            cContent: {
                type: Object
            }
        },

        computed: {
            quoteText() {
                return this.cContent.quote.replace(/<br[^>]*>/g, "<span class='line-break'> </span>");
            }
        }
    };
</script>
