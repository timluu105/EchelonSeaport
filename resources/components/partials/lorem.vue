<template>
    <span class="lorem">{{ text }}</span>
</template>

<script>
    export default {
        data() {
            return {
                text: "",

                wordList: [
                    "lorem",
                    "ipsum",
                    "dolor",
                    "sit",
                    "amet",
                    "consectetur",
                    "adipiscing",
                    "elit",
                    "sed",
                    "do",
                    "for",
                    "the",
                    "a",
                    "at",
                    "ut",
                    "ex",
                    "ea",
                    "duis",
                    "in",
                    "on",
                    "eu",
                    "nulla",
                    "non",
                    "qui",
                    "laborum",
                    "est",
                    "proident",
                    "voluptate",
                    "velit"
                ],

                symbolList: [
                    ",",
                    ":",
                    ";",
                    "-"
                ]
            };
        },

        props: {
            wordCount: {
                type: Number,
                default: 25
            },

            ucFirstWord: {
                type: Boolean,
                default: true
            },

            punctuation: {
                type: Boolean,
                default: true
            },

            punctuationHard: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            random(min, max) {
                const maxInt = Math.floor(max),
                    minInt = Math.ceil(min);

                return Math.floor(Math.random() * (maxInt - minInt) + minInt);
            }
        },

        mounted() {
            const symbolOdds = this.punctuationHard ? 6 : 11;

            let tempText = "";

            for (let i = 0; i < this.wordCount; i++) {
                let w = this.random(0, this.wordList.length),
                    s = this.random(0, this.symbolList.length);

                if (i !== 0) {
                    tempText += " ";
                }

                tempText += this.wordList[w];

                if (this.punctuation && i !== this.wordCount - 1) {
                    tempText += this.random(0, symbolOdds) === 0 ? this.symbolList[s] : "";
                }
            }

            if (this.ucFirstWord) {
                tempText = tempText.charAt(0).toUpperCase() + tempText.slice(1);
            }

            if (this.punctuation) {
                tempText += ".";
            }

            this.text = tempText;
        }
    };
</script>
