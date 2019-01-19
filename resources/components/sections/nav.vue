<template>
    <nav
        class="navbar-component"
        :class="'theme-' + $store.getters.getNavTheme">

        <div class="navbar-component-spacer"></div>

        <div
            class="navbar-component-nav"
            :class="{ 'nav-hidden': $store.getters.getNavHidden }">

            <div class="navbar-mobile-header">
                <!--div class="navlink">
                        <div class="spacer"><i class="fa fa-globe"></i></div>
                        <div class="link">
                            <i class="fa fa-globe"></i>
                            <div class="subnav">
                                <a href="/lang/en" class="subnav-link">{{$t("shared.lang-en")}}</a>
                                <a href="/lang/cn" class="subnav-link">{{$t("shared.lang-cn")}}</a>
                            </div>
                        </div>
                    </div-->
                <a
                    id="main-number-nav"
                    class="navbar-mobile-header-phone-link"
                    :href="$store.getters.getMainNumberLink">

                    <i class="fa fa-phone"></i>&nbsp;{{ $store.getters.getMainNumber }}
                </a>

                <button
                    class="navbar-mobile-header-toggle"
                    :class="{ open: openNav }"
                    @click="openNav = !openNav; openLanguageNav = false;">

                    <!-- hamburger icon: 3 bars -->
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="sr-only">Toggle navigation</span>
                </button>

                <button
                    class="navbar-mobile-header-toggle navbar-mobile-header-toggle-language"
                    :class="{ open: openLanguageNav }"
                    @click="openLanguageNav = !openLanguageNav; openNav = false;">

                    <span class="fa fa-globe"></span>
                    <span class="sr-only">Toggle language selector</span>
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

            <!-- Language Nav Selector -->
            <div class="navlinks" :class="{ open: openLanguageNav}" v-show="openLanguageNav">
                <div class="navlinks-wrapper">
                    <a class="navlink" href="/lang/en">
                        <div class="spacer">{{$t("shared.lang-en")}}</div>

                        <div class="link">
                            {{$t("shared.lang-en")}}
                        </div>
                    </a>
                    <a class="navlink" href="/lang/cn">
                        <div class="spacer">{{$t("shared.lang-cn")}}</div>

                        <div class="link">
                            {{$t("shared.lang-cn")}}
                        </div>
                    </a>
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

                    <div class="navlink">
                        <div class="spacer"><i class="fa fa-globe"></i></div>
                        <div class="link">
                            <i class="fa fa-globe"></i>
                            <div class="subnav">
                                <a href="/lang/en" class="subnav-link">{{$t("shared.lang-en")}} | {{$t("shared.lang-english")}}</a>
                                <a href="/lang/cn" class="subnav-link">{{$t("shared.lang-cn")}} | {{$t("shared.lang-chinese")}}</a>
                            </div>
                        </div>
                    </div>

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
                openLanguageNav: false,
                subnavLinks: {},

                localSubnavLinks: {
                    neighborhood: [
                        { id: "the-seaport", title: window.trans['subnav-neighborhood']['the-seaport'] },
                        { id: "map", title: window.trans['subnav-neighborhood']['map'] },
                        { id: "neighborhood-gallery", title: window.trans['subnav-neighborhood']['neighborhood-gallery'] },
                        { id: "neighborhood-video", title: window.trans['subnav-neighborhood']['neighborhood-video'] }
                    ],
                    lifestyle: [
                        {
                            "id": "the-waterfall-terrace-pool",
                            "title": window.trans['subnav-lifestyle']['the-waterfall-terrace-pool']
                        },
                        {
                            "id": "alfresco-dining",
                            "title": window.trans['subnav-lifestyle']['alfresco-dining']
                        },
                        {
                            "id": "the-grand-pool",
                            "title": window.trans['subnav-lifestyle']['the-grand-pool']
                        },
                        {
                            "id": "133-seaport-lounge",
                            "title": window.trans['subnav-lifestyle']['133-seaport-lounge']
                        },
                        {
                            "id": "library-lounge",
                            "title": window.trans['subnav-lifestyle']['library-lounge']
                        },
                        {
                            "id": "tasting-room",
                            "title": window.trans['subnav-lifestyle']['tasting-room']
                        },
                        {
                            "id": "135-seaport-lounge",
                            "title": window.trans['subnav-lifestyle']['135-seaport-lounge']
                        },
                        {
                            "id": "regent-service",
                            "title": window.trans['subnav-lifestyle']['regent-service']
                        },
                        {
                            "id": "indoor-pool",
                            "title": window.trans['subnav-lifestyle']['indoor-pool']
                        },
                        {
                            "id": "fitness",
                            "title": window.trans['subnav-lifestyle']['fitness']
                        },
                        {
                            "id": "basketball-court",
                            "title": window.trans['subnav-lifestyle']['basketball-court']
                        },
                        {
                            "id": "spa-suite",
                            "title": window.trans['subnav-lifestyle']['spa-suite']
                        },
                        {
                            "id": "innovation-center",
                            "title": window.trans['subnav-lifestyle']['innovation-center']
                        },
                        {
                            "id": "echelon-life",
                            "title": window.trans['subnav-lifestyle']['echelon-life']
                        },
                        {
                            "id": "sky-lounge",
                            "title": window.trans['subnav-lifestyle']['sky-lounge']
                        },
                        {
                            "id": "echelon-pets",
                            "title": window.trans['subnav-lifestyle']['echelon-pets']
                        },
                        {
                            "id": "playroom",
                            "title": window.trans['subnav-lifestyle']['playroom']
                        }
                    ],
                    "residences": [
                        {
                            "id": "overview",
                            "title": window.trans['subnav-residences']['overview']
                        },
                        {
                            "id": "133-seaport",
                            "title": window.trans['subnav-residences']['133-seaport']
                        },
                        {
                            "id": "lobby",
                            "title": window.trans['subnav-residences']['lobby']
                        },
                        {
                            "id": "living-room",
                            "title": window.trans['subnav-residences']['living-room']
                        },
                        {
                            "id": "views",
                            "title": window.trans['subnav-residences']['views']
                        },
                        {
                            "id": "kitchen",
                            "title": window.trans['subnav-residences']['kitchen']
                        },
                        {
                            "id": "terraces",
                            "title": window.trans['subnav-residences']['terraces']
                        },
                        {
                            "id": "penthouse",
                            "title": window.trans['subnav-residences']['penthouse']
                        }
                    ],
                    "architecture": [
                        {
                            "id": "kpf-architecture",
                            "title": window.trans['subnav-architecture-and-design']['kpf-architecture']
                        },
                        {
                            "id": "jeffrey-beers-interiors",
                            "title": window.trans['subnav-architecture-and-design']['jeffrey-beers-interiors']
                        }
                    ]
                },

                navLinks: [
                    { path: "/lifestyle", title: window.trans["pages"]["lifestyle"], page: "lifestyle" },
                    { path: "/residences", title: window.trans["pages"]["residences"], page: "residences" },
                    { path: "/neighborhood", title: window.trans["pages"]["neighborhood"], page: "neighborhood" },
                    { path: "/architecture-and-design", title: window.trans["pages"]["architecture"], page: "architecture" },
                    { path: "/floorplan-and-availability", title: window.trans["pages"]["floor-plans"] },
                    { path: "/news", title: window.trans["pages"]["news"] },
                    { path: "/gallery", title: window.trans["pages"]["gallery"] },
                    { path: "/team", title: window.trans["pages"]["team"] },
                    { path: "/contact", title: window.trans["pages"]["contact"] }
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
