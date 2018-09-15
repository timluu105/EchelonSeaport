<template>
    <div
        class="call-to-action-component">
        <div
            class="call-to-action-component-underlay"
            :class="{ disabled: !expanded }"
            @click="contract">
        </div>

        <div
            class="call-to-action-component-element"
            :class="[{ 'fade-out': hideCallToAction || !expanded && submitted, expanded, 'cta-open': this.$store.getters.getCtaOpen }]">

            <div class="call-to-action-component-element-thanks">
                <div>
                    <img
                        class="call-to-action-component-element-thanks-logo"
                        src="/img/logo-icon-gold.svg"
                        alt="Echelon Seaport"
                    />

                    <h1 class="call-to-action-component-element-thanks-headline">
                        Thank You for Registering
                    </h1>

                    <p class="call-to-action-component-element-thanks-body">
                        A broker will contact you with additional information
                    </p>
                </div>
            </div>

            <div
                class="call-to-action-component-element-form"
                :class="{ 'fade-out': submitted }">

                <form @submit.prevent="onSubmit">
                    <label for="first_name">
                        <span class="required">First Name</span>
                    </label>

                    <input
                        v-model="form.first_name"
                        type="text"
                        name="first_name"
                        class="contact-field input"
                    />

                    <label for="last_name">
                        <span class="required">Last Name</span>
                    </label>

                    <input
                        v-model="form.last_name"
                        type="text"
                        name="last_name"
                        class="contact-field input"
                    />

                    <label for="email">
                        <span class="required">Email</span>
                    </label>

                    <input
                        v-model="form.email"
                        type="text"
                        name="email"
                        class="contact-field input"
                    />

                    <label for="phone">
                        Phone
                    </label>

                    <input
                        v-model="form.phone"
                        type="text"
                        name="phone"
                        class="contact-field input"
                    />

                    <input
                        class="contact-field submit"
                        type="submit"
                        value="Tell Me More"
                        :disabled="!canSubmit"
                    />
                </form>
            </div>

            <div
                class="call-to-action-component-element-cover"
                :class="{ 'fade-out': expanded }"
                @click="expand">

                <div class="call-to-action-component-element-cover-inner">
                    <div class="call-to-action-component-element-cover-inner-text heavy">
                        For More Information
                    </div>

                    <div class="call-to-action-component-element-cover-inner-text light">
                        On Echelon Seaport
                    </div>
                </div>
            </div>

            <div
                 class="call-to-action-component-element-toggle"
                 :class="{ interactive: expanded }"
                 @click="contract">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabIndex: -1,
                expanded: false,
                submitted: false,
                canSubmit: true,
                countMissed: 0,
                pageBlackList: [ "/", "/contact" ],

                form: {
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone: "",
                    hubspotutk: "",
                    submitpageurl: "",
                    submitpagetitle: ""
                }
            };
        },

        computed: {
            hideCallToAction() {
                return this.pageBlackList.indexOf(this.$route.path) !== -1;
            },

            contactFields() {
                return $(this.$el).find(".contact-field");
            }
        },

        methods: {
            expand() {
                if (!this.expanded) {
                    this.expanded = true;
                }
            },

            contract() {
                if (this.expanded) {
                    this.expanded = false;
                    this.tabIndex = -1;
                }
            },

            contractOnEscape(e) {
                if (this.expanded && e.keyCode === 27) {
                    this.contract();
                }
            },

            tabFocus(e) {
                const code = e.keyCode || e.which;

                // Keycode 9 is the tab key
                if (this.expanded && !this.submitted && code === 9) {
                    e.preventDefault();

                    if ($(this.$el).find(".contact-field:focus").length) {
                        if (e.shiftKey) {
                            this.tabIndex--;
                        } else {
                            this.tabIndex++;
                        }

                        if (this.tabIndex < 0) {
                            this.tabIndex = this.contactFields.length - 1;
                        } else if (this.tabIndex > this.contactFields.length - 1) {
                            this.tabIndex = 0;
                        }
                    } else {
                        this.tabIndex = 0;
                    }

                    this.contactFields[this.tabIndex].focus();
                }
            },

            tabFocusInit() {
                this.contactFields.each((index, field) => {
                    $(field).on("click", () => {
                        this.tabIndex = index;
                    });
                });

                $(document).on("keydown", this.tabFocus);
            },

            missedFields(res) {
                let missed = [],
                    $field;

                // Set the number of missed fields to 0
                this.countMissed = 0;

                // Remove the error class from any contact-field elements that have it
                $(this.$el).find(".contact-field.error").removeClass("error");

                for (let field in res.errors) {
                    if ($(this.$el).find(`[name="${field}"]`).length) {
                        // Add the error class to fields containing errors
                        $(this.$el).find(`[name="${field}"]`).addClass("error");

                        // Add the field to the list of missed fields
                        missed.push(field);
                    }
                }

                this.countMissed = missed.length;
            },

            onSubmit() {
                const hubspotCookieMatch = document.cookie.match(/hubspotutk=([a-zA-Z0-9][a-zA-Z0-9]*)/);

                if (this.canSubmit === true) {
                    this.canSubmit = false;

                    // Record the hubspotutk cookie if present
                    if (hubspotCookieMatch) {
                        this.form.hubspotutk = hubspotCookieMatch[1];
                    }

                    // Record the page the submission was made on
                    this.form.submitpageurl = document.location.href;
                    this.form.submitpagetitle = document.title;

                    // Make submission
                    this.$http.post("/api/register-contact" + env.apiToken, JSON.stringify(this.form))
                        .then((response) => {
                            this.submitted = true;
                        }, (response) => {
                            this.canSubmit = true;
                            this.missedFields(response.body);
                        });
                }
            }
        },

        mounted() {
            // Close the call to action when the underlay is scrolled
            $(this.$el).find(".call-to-action-component-underlay").on("mousewheel DOMMouseScroll", this.contract);

            // Close the call to action when the escape button is pressed
            $(document).on("keydown", this.contractOnEscape);

            // Initialize tab index for form elements
            this.tabFocusInit();
        },

        watch: {
            // Close the mobile nav if it's open when the route changes
            "$route"(to, from) {
                this.contract();
            }
        },

        beforeDestroy() {
            $(document).off("keydown", this.tabFocus);
            $(document).off("keydown", this.contractOnEscape);
        }
    };
</script>
