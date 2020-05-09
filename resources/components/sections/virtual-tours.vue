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
                formId: this.$t("virtual-tours.hubspot.form-id")
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
                    inlineMessage: this.$t("hubspot.thank-you"),
                    onFormReady: this.formReady
                });
            });
        }
    };
</script>
