// Determine whether to use vue.js in debug or production mode
const Vue = env.debug ? require("vue/dist/vue.js") : require("vue/dist/vue.min.js");
const RoostApp = {};

// Detect input style
require("what-input");

// Polyfill for Object.assign
require("es6-object-assign").polyfill();

// Import plugins
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import Vuex from "vuex";
import { sync } from "vuex-router-sync";
import vuexI18n from 'vuex-i18n';

// Load plugins
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

// CSRF prevention header
Vue.http.headers.common["X-CSRF-TOKEN"] = document.querySelector("meta[name=_token]").getAttribute("value");

// Import local javascript
import Analytics from "imports/analytics.js";

// Import page components
import Home from "pages/home.vue";
import Lifestyle from "pages/lifestyle.vue";
import Residences from "pages/residences.vue";
import Neighborhood from "pages/neighborhood.vue";
import Architecture from "pages/architecture.vue";
import FloorplanAndAvailability from "pages/floorplan-and-availability-alt.vue";
import News from "pages/news.vue";
import Gallery from "pages/gallery.vue";
import Team from "pages/team.vue";
import Contact from "pages/contact.vue";
import Thanks from "pages/thanks.vue";
import Newspaper from "pages/newspaper.vue";
import Error404 from "pages/error404.vue";

// Import section components
import Nav from "sections/nav.vue";
import Footer from "sections/footer.vue";
import CallToAction from "sections/call-to-action.vue";
import Intro from "sections/intro.vue";

// Name the section components so they can be used globally
Vue.component("nav-component", Nav);
Vue.component("footer-component", Footer);
Vue.component("call-to-action", CallToAction);
Vue.component("intro-component", Intro);

// Create a router instance
const router = new VueRouter({
    mode: "history",
    linkActiveClass: "active",
    root: "/",

    routes: [
        { path: "/", component: Home },
        { path: "/neighborhood", component: Neighborhood },
        { path: "/architecture-and-design", component: Architecture },
        { path: "/lifestyle", component: Lifestyle },
        { path: "/residences", component: Residences },
        { path: "/floorplan-and-availability", component: FloorplanAndAvailability },
        { path: "/news", component: News },
        { path: "/gallery", component: Gallery },
        { path: "/team", component: Team },
        { path: "/contact", component: Contact },
        { path: "/thanks", component: Thanks },
        { path: "/newspaper", component: Newspaper },
        { path: "/*", component: Error404 }
    ],

    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: `[id='${to.hash.slice(1)}']`
            };
        } else {
            return { x: 0, y: 0 };
        }
    }
});

// Create a vuex store instance
const store = new Vuex.Store({
    state: {
        firstLoad: true,
        lastPath: "",
        navTheme: "light",
        navHidden: false,
        footerHidden: false,
        pageTransitions: true,
        introPlayed: false,
        mainNumber: "617.861.9330",
        ctaOpen: true,

        screenBreak: {
            screenXs: 480,
            screenSm: 768,
            screenMd: 992,
            screenLg: 1200,
            screenXl: 1600
        },

        agentDetect: {
            isMobile: (/Mobi/).test(navigator.userAgent),
            isMobileSafari: (/iP(hone|ad|od);/).test(navigator.userAgent),
            isIE: !window.ActiveXObject && "ActiveXObject" in window,
            isEdge: window.navigator.userAgent.indexOf("Edge") > -1
        }
    },

    getters: {
        getLang: state => {
            return state.lang;
        },

        getFirstLoad: state => {
            return state.firstLoad;
        },

        getLastPath: state => {
            return state.lastPath;
        },

        getNavTheme: state => {
            return state.navTheme;
        },

        getNavHidden: state => {
            return state.navHidden;
        },

        getFooterHidden: state => {
            return state.footerHidden;
        },

        getPageTransitions: state => {
            return state.pageTransitions;
        },

        getIntroPlayed: state => {
            return state.introPlayed;
        },

        getMainNumber: state => {
            return state.mainNumber;
        },

        getMainNumberLink: state => {
            return `tel:+1${state.mainNumber.replace(/\./g, "")}`;
        },

        getScreenBreak: state => {
            return state.screenBreak;
        },

        getAgentDetect: state => {
            return state.agentDetect;
        },

        getCtaOpen: state => {
            return state.ctaOpen;
        }
    },

    mutations: {
        setLang(state, value) {
            state.lang = value;
        },

        setFirstLoad(state, value) {
            state.firstLoad = value;
        },

        setLastPath(state, value) {
            state.lastPath = value;
        },

        setNavTheme(state, value) {
            state.navTheme = value;
        },

        setNavHidden(state, value) {
            state.navHidden = value;
        },

        setFooterHidden(state, value) {
            state.footerHidden = value;
        },

        setPageTransitions(state, value) {
            state.pageTransitions = value;
        },

        setIntroPlayed(state, value) {
            state.introPlayed = value;
        },

        setCtaOpen(state, value) {
            state.ctaOpen = value;
        }
    },

    actions: {

    }
});

Vue.use(vuexI18n.plugin, store);

//RoostApp.translations = translations;
import * as translations from './translations/translations.json';

import TranslationsHelper from "translations/translations.js";
import MapIterable from "ObjectIterable.js";
import ExtendedConsole from "ExtendedConsole";

ExtendedConsole.extend(console);
let translationHelper = new TranslationsHelper("en", ["en", "cn", "zh-CN"]);

const flattenedTranslations = translationHelper.prepareTranslations(translations);
let languageSelected = (window.translanguage in flattenedTranslations) ? window.translanguage : "en";

for(let languageKey of new MapIterable(flattenedTranslations)) {
    Vue.i18n.add(languageKey, flattenedTranslations[languageKey]);
}
Vue.i18n.set(languageSelected);
window.trans = translations[languageSelected];
// Sync vue-router-sync with vuex store

sync(store, router);

// Functionality to run before page load and change
router.beforeEach((to, from, next) => {
    const routePath = to.path.replace(/\//, "").replace(/\/.*/, ""),
        prevRoutePath = from.path.replace(/\//, "").replace(/\/.*/, ""),
        bodyClass = `page-${routePath}`,
        prevBodyClass = `page-${prevRoutePath}`;

    if (to.path !== store.getters.getLastPath) {
        // Update the body class
        if (to.path === "/") {
            $("body").removeClass(prevBodyClass).addClass("page-home");
        } else {
            $("body").removeClass(`page-home ${prevBodyClass}`).addClass(bodyClass);
        }

        if (store.getters.getFirstLoad || !store.getters.getPageTransitions) {
            next();
        } else {
            // Fade the page out when moving from one page to another
            TweenMax.to("#main-content", 0.25, {
                opacity: 0,
                onComplete: next
            });
        }
    }
});

// Functionality to run on page load and change
router.afterEach((to, from) => {
    const fullPath = document.location.origin + to.path,
        routePath = to.path.replace(/^\//, ""),
        metaTags = {
            "title": [ "name", "title" ],
            "description": [ "name", "description" ],
            "keywords": [ "name", "keywords" ],
            "dc:title": [ "name", "title" ],
            "dc:description": [ "name", "description" ],
            "og:title": [ "property", "title" ],
            "og:description": [ "property", "description" ],
            "og:url": [ "property", "url" ],
            "twitter:title": [ "name", "title" ],
            "twitter:description": [ "name", "description" ]
        };

    // Update meta for tags that exist
    const updateMeta = function(name, attribute, content) {
        const $tag = $("meta[" + name + "=" + attribute.replace(/:/, "\\:") + "]");

        if ($tag.length) {
            $tag.attr("content", content);
        }
    };

    if (to.path !== store.getters.getLastPath) {
        store.commit("setLastPath", to.path);

        // Update metadata using the meta api response
        $.ajax({
            type: "POST",
            url: "/api/meta" + env.apiToken,
            data: { path: routePath === "" ? "home" : routePath },
            headers: {
                "X-Selected-Language": window.translanguage
            }
        }).done(function(metaData) {
            let metaInfo, metaContent;

            // Update non-meta tags in <head>
            document.title = metaData.title;
            $("link[rel=canonical]").attr("href", fullPath);

            // Update meta tags in <head>
            for (let name in metaTags) {
                if (metaTags.hasOwnProperty(name)) {
                    metaInfo = metaTags[name];

                    switch (metaInfo[1]) {
                        case "title":
                            metaContent = metaData.title;
                            break;
                        case "description":
                            metaContent = metaData.description;
                            break;
                        case "keywords":
                            metaContent = metaData.keywords;
                            break;
                        case "url":
                            metaContent = fullPath;
                            break;
                        default:
                            metaContent = "";
                    }

                    updateMeta(metaInfo[0], name, metaContent);
                }
            }

            // Send pageview to google analyics if its included in the project
            Analytics.send("pageview", {
                page: to.path,
                title: metaData.title
            });
        });

        if (store.getters.getFirstLoad) {
            // Set firstLoad to false so we know the initial load has completed
            store.commit("setFirstLoad", false);

            // Add is-ie class to the body if the browser is ie11 or below
            if (store.getters.getAgentDetect.isIE) {
                $("body").addClass("is-ie");
            }

            // Add is-mobile-safari class to the body if the browser is mobile safari
            if (store.getters.getAgentDetect.isMobileSafari) {
                $("body").addClass("is-mobile-safari");
            }

            // Add is-mobile class to the body if the browser is mobile
            if (store.getters.getAgentDetect.isMobile) {
                $("body").addClass("is-mobile");
            }
        } else if (store.getters.getPageTransitions) {
            Vue.nextTick(() => {
                TweenMax.to("#main-content", 0.5, { opacity: 1 });
            });
        } else {
            store.commit("setPageTransitions", true);
        }
    }
});

const App = new Vue({
    router,
    store
}).$mount("#app");
