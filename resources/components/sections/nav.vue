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
                    <a class="navlink" v-on:click="languageSwitch('cn')">
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
                                v-if="link.hasOwnProperty('page') && subnavLinksAll.hasOwnProperty(link.page)"
                                class="subnav">

                                <template v-for="subnavLink in subnavLinksAll[link.page]">
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
                                <a v-on:click="languageSwitch('en')" class="subnav-link">{{$t("shared.lang-en")}} | {{$t("shared.lang-english")}}</a>
                                <span @mouseover="expandLanguageMenu" @mouseleave="hideLanguageMenu">
                                    <div class="subnav-link subnav-horizontal">
                                        <a v-on:click="languageSwitch('cn')">{{$t("shared.lang-cn")}} | {{$t("shared.lang-chinese")}}</a>
                                    </div>
                                    <div class="subnav-link subnav-horizontal menu-slide-out menu-slide-out-hidden">
                                        <a v-on:click="languageSwitch('zh-CN')">{{$t("shared.lang-zh-CN") }}</a>
                                    </div>
                                </span>
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
    import TranslationsMixin from "mixins/translations-mixin.js";

    export default {
        mixins: [
            ScrollToAnchor,
            TranslationsMixin
        ],

        data() {
            return {
                openNav: false,
                openLanguageNav: false,
                subnavLinks: {},
                subnavLinksServerSide: {}
            };
        },

        methods: {
            fetchSubnavLinks() {
                this.$http.get("/api/subnav-links" + env.apiToken).then((response) => {
                    this.subnavLinksServerSide = response;
                }, (response) => {
                    // unsuccessful response
                    console.log("error fetching subnav links");
                });
            },

            toggleCTA() {
                this.$store.commit("setCtaOpen", !this.$store.getters.getCtaOpen);
            },
            expandLanguageMenu() {
                $(".subnav").each(function() {
                    $(this).css( {
                        width: $(this).css("width")
                    })
                });

                $(".menu-slide-out").each(function() {
                    var naturalWidth = $(this).get(0).scrollWidth;
                    $(this).animate({
                        display: '',
                    });
                    $(this).removeClass("menu-slide-out-hidden");
                });
            },
            hideLanguageMenu() {
                $(".menu-slide-out").each(function() {
                    $(this).css({
                        display: "none !important",
                    });
                });
            }
        },

        created() {
            this.fetchSubnavLinks();
        },

        computed: {
            subnavLinksAll() {
                let subnavLinksComputed = this.subnavLinks;

                if(this.subnavLinksServerSide.length !== 0) {
                    subnavLinksComputed = this.subnavLinksServerSide;

                    Object.keys(this.localSubnavLinks).forEach((page) => {
                        subnavLinksComputed[page] = this.localSubnavLinks[page];
                    });
                }

                return subnavLinksComputed;
            },
            localSubnavLinks() {
                return {
                    neighborhood: [
                        { id: "the-seaport", title: this.$t("subnav-neighborhood.the-seaport") },
                        { id: "map", title: this.$t("subnav-neighborhood.map") },
                        { id: "neighborhood-gallery", title: this.$t("subnav-neighborhood.neighborhood-gallery") },
                        { id: "neighborhood-video", title: this.$t("subnav-neighborhood.neighborhood-video") }
                    ],
                    lifestyle: [
                        {
                            "id": "the-waterfall-terrace-pool",
                            "title": this.$t("subnav-lifestyle.the-waterfall-terrace-pool")
                        },
                        {
                            "id": "alfresco-dining",
                            "title": this.$t("subnav-lifestyle.alfresco-dining")
                        },
                        {
                            "id": "the-grand-pool",
                            "title": this.$t("subnav-lifestyle.the-grand-pool")
                        },
                        {
                            "id": "133-seaport-lounge",
                            "title": this.$t("subnav-lifestyle.133-seaport-lounge")
                        },
                        {
                            "id": "library-lounge",
                            "title": this.$t("subnav-lifestyle.library-lounge")
                        },
                        {
                            "id": "tasting-room",
                            "title": this.$t("subnav-lifestyle.tasting-room")
                        },
                        {
                            "id": "135-seaport-lounge",
                            "title": this.$t("subnav-lifestyle.135-seaport-lounge")
                        },
                        {
                            "id": "regent-service",
                            "title": this.$t("subnav-lifestyle.regent-service")
                        },
                        {
                            "id": "indoor-pool",
                            "title": this.$t("subnav-lifestyle.indoor-pool")
                        },
                        {
                            "id": "fitness",
                            "title": this.$t("subnav-lifestyle.fitness")
                        },
                        {
                            "id": "basketball-court",
                            "title": this.$t("subnav-lifestyle.basketball-court")
                        },
                        {
                            "id": "spa-suite",
                            "title": this.$t("subnav-lifestyle.spa-suite")
                        },
                        {
                            "id": "innovation-center",
                            "title": this.$t("subnav-lifestyle.innovation-center")
                        },
                        {
                            "id": "echelon-life",
                            "title": this.$t("subnav-lifestyle.echelon-life")
                        },
                        {
                            "id": "sky-lounge",
                            "title": this.$t("subnav-lifestyle.sky-lounge")
                        },
                        {
                            "id": "echelon-pets",
                            "title": this.$t("subnav-lifestyle.echelon-pets")
                        },
                        {
                            "id": "playroom",
                            "title": this.$t("subnav-lifestyle.playroom")
                        }
                    ],
                    "residences": [
                        {
                            "id": "overview",
                            "title": this.$t("subnav-residences.overview")
                        },
                        {
                            "id": "133-seaport",
                            "title": this.$t("subnav-residences.133-seaport")
                        },
                        {
                            "id": "lobby",
                            "title": this.$t("subnav-residences.lobby")
                        },
                        {
                            "id": "living-room",
                            "title": this.$t("subnav-residences.living-room")
                        },
                        {
                            "id": "views",
                            "title": this.$t("subnav-residences.views")
                        },
                        {
                            "id": "kitchen",
                            "title": this.$t("subnav-residences.kitchen")
                        },
                        {
                            "id": "terraces",
                            "title": this.$t("subnav-residences.terraces")
                        },
                        {
                            "id": "penthouse",
                            "title": this.$t("subnav-residences.penthouse")
                        },
                        {
                            "id": "135-seaport",
                            "title": this.$t("subnav-residences.135-seaport")
                        },
                        {
                            "id": "135-seaport-lobby",
                            "title": this.$t("subnav-residences.lobby")
                        },
                        {
                            "id": "135-seaport-lounge",
                            "title": this.$t("subnav-residences.lounge")
                        }
                    ],
                    "architecture": [
                        {
                            "id": "kpf-architecture",
                            "title": this.$t("subnav-architecture-and-design.kpf-architecture")
                        },
                        {
                            "id": "jeffrey-beers-interiors",
                            "title": this.$t("subnav-architecture-and-design.jeffrey-beers-interiors")
                        }
                    ]
                }
            },
            navLinks: function() {
                return [
                    { path: "/lifestyle", title: this.$t("pages.lifestyle"), page: "lifestyle" },
                    { path: "/residences", title: this.$t("pages.residences"), page: "residences" },
                    { path: "/neighborhood", title: this.$t("pages.neighborhood"), page: "neighborhood" },
                    { path: "/architecture-and-design", title: this.$t("pages.architecture"), page: "architecture" },
                    { path: "/floorplan-and-availability", title: this.$t("pages.floor-plans") },
                    { path: "/news", title: this.$t("pages.news") },
                    { path: "/gallery", title: this.$t("pages.gallery") },
                    { path: "/team", title: this.$t("pages.team") },
                    { path: "/contact", title: this.$t("pages.contact") }
                ]
            }
        },

        watch: {
            // Close the mobile nav if it's open when the route changes
            "$route"(to, from) {
                this.openNav = false;
            }
        }
    };
</script>