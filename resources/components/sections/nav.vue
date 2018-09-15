<template>
    <nav
        class="navbar-component"
        :class="'theme-' + $store.getters.getNavTheme">

        <div class="navbar-component-spacer"></div>

        <div
            class="navbar-component-nav"
            :class="{ 'nav-hidden': $store.getters.getNavHidden }">

            <div class="navbar-mobile-header">
                <a
                    id="main-number-nav"
                    class="navbar-mobile-header-phone-link"
                    :href="$store.getters.getMainNumberLink">

                    <i class="fa fa-phone"></i>&nbsp;{{ $store.getters.getMainNumber }}
                </a>

                <button
                    class="navbar-mobile-header-toggle"
                    :class="{ open: openNav }"
                    @click="openNav = !openNav">

                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="sr-only">Toggle navigation</span>
                </button>

                <router-link class="navbar-mobile-header-logo" to="/" exact>
                    <div class="navbar-mobile-header-logo-image dark"></div>
                    <div class="navbar-mobile-header-logo-image light"></div>
                </router-link>

                <div
                    @click="toggleCTA"
                    class="navbar-mobile-header-cta-toggle"
                    :class="{ 'cta-open': this.$store.getters.getCtaOpen }">
                    <div class="navbar-mobile-header-cta-toggle-inner"></div>
                </div>
            </div>

            <div class="navlinks" :class="{ open: openNav }">
                <div class="navlinks-wrapper">
                    <router-link class="desktop-logo" to="/" exact>
                        <img class="desktop-logo-image dark" src="/img/logo-icon-nav.svg" alt="Echelon Seaport" />
                        <img class="desktop-logo-image light" src="/img/logo-icon-nav-white.svg" alt="Echelon Seaport" />
                    </router-link>

                    <router-link
                        v-for="link in navLinks"
                        class="navlink"
                        :to="link.path"
                        exact>

                        <div class="spacer">{{ link.title }}</div>

                        <div class="link">
                            {{ link.title }}

                            <div
                                v-if="link.hasOwnProperty('page') && subnavLinks.hasOwnProperty(link.page)"
                                class="subnav">

                                <template v-for="subnavLink in subnavLinks[link.page]">
                                    <a
                                        v-if="link.path === $route.path"
                                        class="subnav-link"
                                        :href="'#' + subnavLink.id"
                                        @click.prevent="scrollToAnchor('#' + subnavLink.id)">

                                        {{ subnavLink.title }}
                                    </a>

                                    <router-link
                                        v-else
                                        class="subnav-link"
                                        :to="link.path + '#' + subnavLink.id">

                                        {{ subnavLink.title }}
                                    </router-link>
                                </template>
                            </div>
                        </div>
                    </router-link>

                    <a class="navlink hide-mobile" :href="$store.getters.getMainNumberLink">
                        <div class="link"><i class="fa fa-phone"></i>&nbsp;{{ $store.getters.getMainNumber }}</div>
                        <div class="spacer"><i class="fa fa-phone"></i>&nbsp;{{ $store.getters.getMainNumber }}</div>
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import ScrollToAnchor from "mixins/scroll-to-anchor.js";

    export default {
        mixins: [
            ScrollToAnchor
        ],

        data() {
            return {
                openNav: false,
                subnavLinks: {},

                localSubnavLinks: {
                    neighborhood: [
                        { id: "the-seaport", title: "The Seaport" },
                        { id: "map", title: "Map" },
                        { id: "neighborhood-gallery", title: "Neighborhood Gallery" }
                    ]
                },

                navLinks: [
                    { path: "/lifestyle", title: "Lifestyle", page: "lifestyle" },
                    { path: "/residences", title: "Residences", page: "residences" },
                    { path: "/neighborhood", title: "Neighborhood", page: "neighborhood" },
                    { path: "/architecture-and-design", title: "Architecture & Design", page: "architecture" },
                    { path: "/floorplan-and-availability", title: "Floor Plans" },
                    { path: "/news", title: "News" },
                    { path: "/gallery", title: "Gallery" },
                    { path: "/team", title: "Team" },
                    { path: "/contact", title: "Contact" }
                ]
            };
        },

        methods: {
            fetchSubnavLinks() {
                this.$http.get("/api/subnav-links" + env.apiToken).then((response) => {
                    // successful response
                    this.subnavLinks = response.body;

                    Object.keys(this.localSubnavLinks).forEach((page) => {
                        this.subnavLinks[page] = this.localSubnavLinks[page];
                    });
                }, (response) => {
                    // unsuccessful response
                    console.log("error fetching subnav links");
                });
            },

            toggleCTA() {
                this.$store.commit("setCtaOpen", !this.$store.getters.getCtaOpen);
            }
        },

        created() {
            this.fetchSubnavLinks();
        },

        watch: {
            // Close the mobile nav if it's open when the route changes
            "$route"(to, from) {
                this.openNav = false;
            }
        }
    };
</script>
