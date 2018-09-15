<template>
    <div
        id="contact-registration"
        class="contact-registration-component">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formId: "e585428e-7606-4ab7-8e10-bfbdd5992a00"
            };
        },

        methods: {
            formReady() {
                $("body").on("hsvalidatedsubmit", "#hsForm_" + this.formId, (e) => {
                    this.$router.push("/thanks");
                });
            }
        },

        mounted() {
            this.$nextTick(() => {
                hbspt.forms.create({
                    portalId: "3434592",
                    formId: this.formId,
                    target: "#contact-registration",
                    inlineMessage: "Thank you for registering",
                    onFormReady: this.formReady
                });
            });
        }
    };
</script>
