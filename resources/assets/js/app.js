// Determine whether to use vue.js in debug or production mode
const Vue = env.debug ? require("vue/dist/vue.js") : require("vue/dist/vue.min.js");

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

const translations = {
    "en": {
        "pages": {
            "lifestyle": "Lifestyle",
            "neighborhood": "Neighborhood",
            "residences": "Residences",
            "architecture": "Architecture & Design",
            "floor-plans": "Floor Plans",
            "news": "News",
            "gallery": "Gallery",
            "team": "Team",
            "contact": "Contact"
        },
        "subnav-lifestyle": {
            "the-waterfall-terrace-pool": "The Waterfall Terrace Pool",
            "alfresco-dining": "Alfresco Dining",
            "the-grand-pool": "The Grand Pool",
            "133-seaport-lounge": "133 Seaport Lounge",
            "library-lounge": "Library Lounge",
            "tasting-room": "Tasting Room",
            "135-seaport-lounge": "135 Seaport Lounge",
            "regent-service": "Regent Service",
            "indoor-pool": "Indoor Pool",
            "fitness": "Fitness",
            "basketball-court": "Basketball Court",
            "spa-suite": "Spa Suite",
            "innovation-center": "Innovation Center",
            "echelon-life": "Echelon Life",
            "sky-lounge": "Sky Lounge",
            "echelon-pets": "Echelon Pets",
            "playroom": "Playroom",
        },
        "subnav-residences": {
            "overview": "Overview",
            "133-seaport": "133 Seaport",
            "lobby": "Lobby",
            "living-room": "Living Room",
            "views": "Views",
            "kitchen": "Kitchen",
            "terraces": "Terraces"
        },
        "subnav-architecture-and-design": {
            "kpf-architecture": "KPF Architecture",
            "jeffrey-beers-interiors": "Jeffrey Beers Interiors"
        },
        "subnav-neighborhood": {
            "the-seaport": "The Seaport",
            "map": "Map",
            "neighborhood-gallery": "Neighborhood Gallery"
        },
        "architecture": {
            "stripe-content-body": "This is the premiere address at the Seaport, encompassing an entire city block. A defining contemporary landmark by internationally-lauded Kohn Pedersen Fox (KPF). A trio of residential towers anchored by a center destination courtyard with an architecturally-striking landmark bridge, pedestrian lanes and beautiful tree canopies.",
            "caption-body": "Art meets commerce. Surrounded by striking architecture, the central courtyard will be one of the most talked-about public spaces in Boston, populated by destination retail and signature epicurean experiences.",
            "jeff-beers-international": "Interior Design by Jeffrey Beers International",
            "globally-recognized": "Globally recognized, Jeffrey Beers has created some of the most recognized hospitality environments for Four Seasons, Langham Hotels, and Ritz Carlton. For EchelonSeaport he created elegant and superbly crafted arrival and amenity spaces with a strong eye for detail and meaning.",
            "design-sensibility": "Jeffrey Beers' design sensibility combines crisp lines, unexpected textures, and natural materials that combine style and functionality. The distinctive interiors for EchelonSeaport were crafted to feel like an extension of one's own living room; warm, inviting and comfortable. Creating a sense of community the amenity experiences encourage residents to gather and socialize.",
            "boston-is-heading": "This is Where Boston is Heading",
            "shaping-the-future": "Shaping the Future",
            "architecture-by": "Architecture By Kohn Pedersen Fox",
            "different-by-design": "Different by Design",
            "a-cultivated-designed": "A Cultivated Design by Jeffrey Beers",
        },
        "intro": {
            "header-1": "Urban resort living in",
            "header-2": "Boston's most vibrant neighborhood.",
        },
        "home": {
            "anchoring": "Anchoring Boston’s Innovation District is Boston’s most anticipated residential destination. <br />More than an address, EchelonSeaport offers an exciting new way to live.",
            "contemporary-landmark": "EchelonSeaport is a defining contemporary landmark <br />by internationally-lauded Kohn Pedersen Fox featuring <br />sophisticated amenities crafted by globally recognized <br />interior designer Jeffrey Beers.",
            "extraordinary": "Extraordinary in every aspect, EchelonSeaport <br />offers a wealth of amenities beyond anything ever before offered in Boston.",
            "canvas": "A canvas for personal style. Residences feature <br />oversized window walls capturing city, sky and harbor views <br />and are bathed in natural light.",
            "the-seaport": "The <br />Seaport",
            "kpf-architecture": "KPF Architecture <br />Jeffrey Beers Design",
            "urban-living": "Urban Resort <br />Living",
            "modern-living": "Modern <br />Living"
        },
        "contact": {
            "interested": "Interested in learning more?",
            "receive-updates": "To receive exclusive updates, please provide your contact information below.",
        },
        "neighborhood": {
            "dining-text-copy": "Award-winning restaurateurs have made the Seaport Boston’s hottest dining destination. With restaurants from world-renowned James Beard award-winners Barbara Lynch, Ming Tsai, Joanne Chang, amongst others the Seaport offers a delicious diversity of food.",
            "dining-text-title": "Seaport",
            "dining-text-title-2": "Dining",
            "location-seaport": "Anchoring the Innovation District is the Boston’s most anticipated residential destination. More than an address, EchelonSeaport offers an exciting new way to live with curated retail, dynamic courtyards, and enriching indoor and outdoor amenities. EchelonSeaport follows the rich tradition of Boston place making, leaving its mark on the continued momentum of the city.",
            "soaring-heights": "Charming, historic, cosmopolitan Boston has a brand-new face. The Seaport District has rapidly come into its own, becoming one the premiere neighborhoods in Boston.",
            "grandly-scaled": "Not just for dining, the Seaport District is shaping up to be Boston’s chicest neighborhood. With retailers ranging from innovative eyewear company, Warby Parker to classic brands like Filson, Lululemon and L.L. Bean there’s something for everyone. And that’s just the beginning…",
            "seaport-sweat": "Whether you like to run, walk or bike there is no better place to break a sweat than Seaport’s picturesque waterfront. The neighborhood sets a high bar for wellness with outdoor workouts on Seaport Green featuring the best of local and national fitness companies from Everybody Fights to Soulcycle and Equinox. Stock up on new gear at Lululemon or L.L Bean or grab a healthy meal at Juice Press and byChloe. Wellness made easy.",
            "gallery": "Discover the Seaport. Vibrant and energetic, the Seaport neighborhood has arrived. On the cutting edge of Boston’s dining, shopping, and culture scene it's no wonder the Seaport is the city’s hottest “new” neighborhood.",
            "get-centered": "Get Centered.",
            "get-connected": "Get Connected.",
            "seaport-neighborhood": "Seaport Neighborhood",
            "wellness": "Destination Wellness",
            "seaport-styled":  "Seaport Styled",
            "new-center":  "The New Center of Boston",
            "gallery-subtitle": "Neighborhood",
            "gallery-title": "Gallery",
            "seaport-dining-1": "Seaport",
            "seaport-dining-2": "Dining"
        },
        "team": {
            "team-1": "Echelon Life represents the evolution of a new development philosophy that pairs extraordinary design with incomparable lifestyle amenities. Cottonwood Management, headquartered in Los Angeles, with over $2 Billion in assets under management, chose Boston as its East Coast headquarters and inaugural Echelon Life city, in recognition and reflection of the energy, academic spirit and innovative drive that permeate the city and make Boston’s urban life so appealing.",
            "team-2": "Kohn Pedersen Fox brings unsurpassed architectural excellence to the Seaport. Based in New York City, London, Hong Kong & Shanghai, KPF is architect to some of the most influential projects in cities around the world. The firm is known for its elegant designs and expertly crafted buildings. KPF’s signature multi-use developments are gateways to centers of commerce and innovation and include Covent Garden in London, Hudson Yards New York, Tokyo’s Rappongi Hills, Shanghai World Financial Center, Hong Kong’s International Commerce Center, and now EchelonSeaport in Boston.",
            "team-3": "Widely known for its hospitality expertise and acclaimed for its expertly tailored designs, Jeffery Beers International (JBI) of New York City has chosen EchelonSeaport as its inaugural residential project in Boston. EchelonSeaport amenities areas both inside and out speak as a beautifully cohesive whole under JBI’s masterful eye. JBI is currently designing residential amenities for Rafael Vinoly’s 277 Fifth Avenue project in New York. Iconic JBI hospitality projects include Fontainebleau in Miami and Dune by chef Jean George at the One & Only Club in the Bahamas.",
            "team-4": "Regent Hotels & Resorts, known the world over for award-winning, white gloved five-star service, has teamed with Cottonwood to bring its expertise to Boston for EchelonSeaport, its first Regent Collection property in the United States. Regent will bring a sense of style and attention to service detail second to none to EchelonSeaport.",
            "team-5": "CBT Architects know Boston intimately and has teamed with KPF to bring EchelonSeaport to life in Boston. The award-winning architect has designed many of the finest residential projects in the City, including the Mandarin Oriental Condominiums, Twenty-Two Liberty and Millennium Ritz Carlton Boston.",
            "team-6": "Boston's leading builder in the Seaport District, John Moriarty & Associates is at the helm for EchelonSeaport. Renowned for their quality of delivered product, JMA has built over 20,000 luxury condominiums on the East Coast. Boston-based and privately owned, JMA thrives and succeeds building urban projects for trusted repeat clients and partners.",
            "team-7": "Boston-based TCC has been the market leader in dedicated project condominium sales in and around the city, successfully closing over $6 billion in urban and suburban real estate sales over the past three decades. TCC's well-renowned sales team at EchelonSeaport has helped shape an unprecedented Sales & Experience Center for residents to explore all facets of Echelon Life.",
            "team-1-role": "Developer",
            "team-2-role": "Architect",
            "team-3-role": "Amenities Interiors",
            "team-4-role": "Service Standards",
            "team-4-name": "Regent Hotels &amp; Resorts",
            "team-5-role": "Residence Architect",
            "team-6-role": "Builder",
            "team-7-role": "Sales &amp; Marketing",
        },
        "contact-form": {
            "broker": "Are You Currently Represented By A Broker?",
            "first-name": "Your First Name",
            "last-name": "Your Last Name",
            "email": "Your Email",
            "phone": "Your Phone",
            "street": "Your Street Address",
            "city": "City",
            "state": "State",
            "zip": "Zip",
            "type": "Type of Residence",
            "studio": "Studio",
            "1-bedroom-a": "1 Bed",
            "1-bedroom-b": "1 Bed + Den/1BA",
            "2-bedroom": "2 Bed + Den/2.5 BA",
            "3-bedroom": "3 Bed/3-3.5 BA",
            "interested": "I’m Interested"
        },
        "residences": {
            "text-1": "The two contextual towers are a refined addition to the Seaport skyline. Timelessly crafted in stone and glass, Kohn Pedersen Fox created a silhouette with setbacks enhancing select residences with oversized private terraces.",
            "text-2": "Live large. A flagship address offering 255 condominium residences with Boston Harbor and Seaport park views, generous private stepped terraces, grand and elegant interiors, and extensive outdoor amenities including a spa pool, lounge and dining areas.",
            "text-3": "Live modern. Contemporary and cool, 135 Seaport offers 192 condominium residences with Harbor and wrap-around city and sunset views to the west. The expansive fifth-floor terrace offers a grand outdoor pool, sun cabanas, outdoor dining and lounge areas.",
            "text-4": "Addressed to impress, the flagship residence at EchelonSeaport offers a hospitality-driven lifestyle experience. From the singular arrival and amenity experiences to the smartly crafted condominiums, every touchpoint emanates the extraordinariness of this residence.",
            "text-5": "The Jeffrey Beers designed, double-height, 24-hour attended lobby ushers in the elevated design experience. Exotic marbles, warm woods, and intriguing metals create a richly-textured lobby experience with multiple conversation areas. Embracing the art of hospitality, this is an urban resort warm, inviting, comfortable and stimulating. By creating a sense of community, the lobby experiences encourage residents to gather and socialize.",
            "text-6": "Each residence is a canvas for personal style with oversized window walls capturing city, sky and harbor views. Homes are bathed in natural light with engineered white oak wood plank flooring throughout.",
            "text-7": "Dynamic vistas are offered at all levels, intimate views of the landscaped courtyard, glittering panoramas of the ever-changing skyline, and a captivating new perspective of the Boston Harbor.",
            "text-8": "Both foodies and take-out aficionados will appreciate the clean lines of the open kitchens outfitted with custom cabinetry imported from Italy, and a state-of-the-art suite of top-of-the-line integrated appliances.",
            "text-9": "The tiered silhouette of EchelonSeaport creates an array of oversized private outdoor terraces rarely seen in Boston. Designed to be an extension of your living and dining rooms, best enjoyed on beautiful spring, summer and fall days.",
            "two-addresses": "Two addresses.",
            "singular-destination": "A Singular Destination.",
            "different-by-design": "Different by Design",
            "133-seaport-residences": "133 Seaport Residences",
            "living-work": "A Living Work of Art",
            "own-sky": "Own the Sky",
            "top-chef": "Top Chef",
            "signature-terraces": "Signature City Terraces",
            "preview-of": "For a Preview of EchelonSeaport",
            "contact-info": "Please Provide Your Contact Information Below"
        },
        "lifestyle": {
            "text-1": "An address unlike anywhere else. Indoors and out, EchelonSeaport offers a captivating lifestyle experience, with over 50,000 square feet of amenities designed by Jeffrey Beers International, the leading tastemaker in hospitality interiors.",
            "text-2": "EchelonSeaport will offer the most talked about outdoor amenity spaces in Boston with manicured gardens, al fresco dining areas, and poolside sun terraces with cabanas. This is an outdoor living room for all residents to enjoy.",
            "text-3": "Boldly inviting. EchelonSeaport offers three distinctive pool experiences designed to create a design-centric sanctuary at The Seaport. This is not just another residential address. This is an urban resort.",
            "text-4": "Impeccably styled on a grand scale, a collection of social lounges overlook the outdoor gardens and amenities. Stylishly detailed, with soaring ceiling heights and rich architectural details. These spaces can be reserved for private entertaining and meetings.",
            "text-5": "Inspired by Boston's rich intellectual heritage, the Library Lounge is appointed with curated artwork and photography. Comfortable seating areas create an ideal setting for a cocktail and a good book.",
            "text-6": "Temperature-controlled wine storage, handsomely finished with custom wood and glass cabinetry offers an inviting space to sip, savor and learn about wine and viniculture.",
            "text-7": "This is Boston's most coveted dinner invitation. Jeffrey Beers has designed for the industry's most recognized chefs, including Jean Georges Vongerichten and Todd English. At EchelonSeaport, he brings a special flair to the Private Dining Rooms with a state-of-the-art exhibition kitchen at the ready.",
            "text-8": "Globally recognized for their unparalleled and intuitive hospitality standards, Regent Hotels &amp; Resorts has been selected to manage and oversee Residential Services. From the expertly trained concierge to the specially selected spa technicians, every EchelonSeaport service associate will deliver the Regent touch.",
            "text-9": "In addition to the two outdoor pools and the indoor pool, EchelonSeaport offers an 8,500 square-feet Wellness Center that incorporates fitness as well as a tranquility spa with indoor and outdoor treatment areas.",
            "text-10": "Re-charge yourself in the state-of-the-art fitness center, or find your balance in private yoga or stretching rooms nearby.",
            "text-11": "Get pumped on the two-story indoor basketball court with a tech wall that can broadcast live games or group fitness classes. Enjoy a round at the finest courses with the cutting-edge golf simulator used by top PGA pros. Game on!",
            "text-12": "Connected to the rooftop gardens, The Spa at EchelonSeaport includes private treatment rooms accented in teak, stone and natural materials. Treatments can be taken indoors, or residents can enjoy the lushly landscaped private outdoor sanctuaries.",
            "text-13": "A first-of-its-kind residential amenity. The Echelon Innovation Center features programming developed by Boston's leading academics and incubators. Gather with fellow residents to gain inspiration and ideas from top business, tech and cultural leaders. Or find a creative place to work any time of the day.",
            "text-14": "At its core, EchelonSeaport is about the luxury of saved time and convenience. Through the Echelon Life App, you now have access to a global luxury lifestyle management and concierge service that can accommodate your needs. Call the valet for your car, make a restaurant reservation, or book a private jet to Nantucket (or Paris). All in the palm of your hand.",
            "text-15": "Relax and enjoy the view with your fellow residents in The Sky Lounge, an exclusive lifestyle clubhouse reserved for residents of 133 Seaport. Let the Regent-trained staff arrange for catering for your next meeting or get together.",
            "text-16": "EchelonSeaport brings playtime for your pets to a whole new level. Your pup will quickly feel at home here, meeting other dogs at the outdoor pet run and play area or getting pampered at the pet spa. You can even coordinate with your dog walker or cat groomer through your Echelon Life app.",
            "text-17": "Whether you have children or grandchildren, EchelonSeaport's family play center will make you wish you were a little kid again. The children in your life will love this room, made for discovery and fun. In true EchelonSeaport fashion, it includes dedicated outdoor play space as well.",
            "elevate": "Elevate",
            "expectations": "Your Expectations",
            "captivating": "Naturally Captivating",
            "grandpool": "The Grand Pool",
            "echelonentertaining": "Echelon Entertaining",
            "impressive": "Impressive at Every Angle",
            "chapter": "The Next Chapter",
            "toast": "Toast in Style",
            "epicurean": "The Art of Epicurean",
            "regentcollection": "A Regent Collection Property",
            "fivestarservice": "Five-Star Residence Service",
            "echelonwellness": "Echelon Wellness",
            "reinvigorate": "A New Way to Reinvigorate",
            "fitness": "High-Definition Fitness",
            "gaming": "High Definition Gaming",
            "zen": "Your Private Zen",
            "culture": "Echelon Culture",
            "innovation": "Innovative at its Core",
            "echelonlife": "Echelon Life",
            "aboveitall": "Above It All",
            "pets": "Echelon Pets",
            "dogrun": "Outdoor Dog Run &amp; Pet Spa",
            "playtime": "Playtime"
        },
        "legal": {
            "equal-opportunity": "EchelonSeaport is an Equal Housing Opportunity project. We are in compliance with Title VIII of the Civil Rights Act of 1968. We have not and will not discriminate against you because of your race, color, religion, sex, or national origin.",
            "this-material": "This material shall not constitute a valid offer in any state where prior registration is required. Materials, features and amenities described and depicted herein are based upon current development plans, which are subject to change without notice. Actual development may not be as currently proposed. No guarantee is made that the features, amenities and facilities depicted by artists’ renderings or otherwise described herein will be built or, if built, will be of the same type, size or nature as depicted or described.",
            "units-described": "The residential units described herein and marketed under the licensed “REGENT” and/or “REGENT COLLECTION” trademark are not owned, developed, or sold by Regent Asia Pacific Management Limited (“Regent”) or any of its affiliates, and neither Regent nor any of its affiliates makes any representation, warranty, or guarantee with respect to such residential units.",
        },
        "images": {
            "gallery": "Gallery",
            "image-1": "EchelonSeaport",
            "image-2": "133 Seaport",
            "image-3": "135 Seaport",
            "image-4": "Central Courtyard",
            "image-5": "Iconic Pedestrian Bridge",
            "image-6": "Courtyard Retail",
            "image-7": "133 Lobby",
            "image-8": "133 Sky Lounge",
            "image-9": "Fireplace Lounge",
            "image-10": "Library Lounge",
            "image-11": "Tasting Room",
            "image-12": "135 Seaport Lounge",
            "image-13": "Echelon Innovation Center",
            "image-14": "The Relaxation Pool",
            "image-15": "Hi-Def Basketball Court",
            "image-16": "The Spa at EchelonSeaport",
            "image-17": "The Grand Pool",
            "image-18": "The Waterfall Terrace Pool",
            "image-19": "Outdoor Fireplace Lounge",
            "image-20": "133 Resident Living Room",
            "image-21": "133 Resident Kitchen",
            "image-22": "133 Resident Terrace"
        },
        "image-slider": {
            "previous": "Previous",
            "next": "Next"
        },
        "floorplans": {
            "for-availability": "For Floor Plans & Availability",
            "contact-us-at": "Contact Us at %phone_link%"
        },
        "singular-destination": {
            "133-Seaport": "133 Seaport",
            "135-Seaport": "135 Seaport",
            "text-1": "The two contextual towers are a refined addition to the Seaport skyline. Timelessly crafted in stone and glass, Kohn Pedersen Fox created a silhouette with setbacks enhancing select residences with oversized private terraces.",
            "text-2": "Live large. A flagship address offering 255 condominium residences with Boston Harbor and Seaport park views, generous private stepped terraces, grand and elegant interiors, and extensive outdoor amenities including a spa pool, lounge and dining areas.",
            "text-3": "Live modern. Contemporary and cool, 135 Seaport offers 192 condominium residences with Harbor and wrap-around city and sunset views to the west. The expansive fifth-floor terrace offers a grand outdoor pool, sun cabanas, outdoor dining and lounge areas.",
            "two-addresses": "Two addresses.",
            "singular-destination": "A Singular Destination.",
        },
        "call-to-action": {
            "first-name": "First Name",
            "last-name": "Last Name",
            "email": "Email",
            "phone": "Phone",
            "more-information": "For More Information",
            "on-echelon": "On Echelon Seaport",
            "tell-me-more": "Tell Me More",
            "thank-you": "Thank You for Registering",
            "broker-will": "A broker will contact you with additional information"
        },
        "neighborhood-map": {
            "all": "All",
            "dining": "Dining",
            "shopping": "Shopping",
            "culture": "Culture",
            "hotels": "Hotels"
        },
        "footer": {
            "sales-gallery": "Sales Gallery",
            "legal": "Legal",
        },
        "shared": {
            "lang-en": "EN",
            "lang-cn": "中文",
            "lang-english": "English",
            "lang-chinese": "Chinese"
        },
        "hubspot": {
            "form-id": "e585428e-7606-4ab7-8e10-bfbdd5992a00",
            "thank-you": "Thank you for registering",
        },
        "register-thank-you": {
            "thank-you": "Thank you for registering your interest.",
            "echelon-insiders": "Exclusive Echelon Insiders will be the first to receive project updates, announcements and invitations."
        },
        "news": {
            "download-pdf": "Download PDF"
        }
    },
    "cn": {
        "pages": {
            "lifestyle": "品质生活",
            "neighborhood": "社区",
            "residences": "住宅",
            "architecture": "建筑与设计",
            "floor-plans": "楼层计划",
            "news": "新闻报导",
            "gallery": "照片",
            "team": "团队",
            "contact": "联系方式"
        },
        "subnav-lifestyle": {
            "the-waterfall-terrace-pool": "瀑布游泳池",
            "alfresco-dining": "户外雅座",
            "the-grand-pool": "室外大游泳池",
            "133-seaport-lounge": "1号楼休息室",
            "library-lounge": "图书馆及商务中心",
            "tasting-room": "品酒室",
            "135-seaport-lounge": "2号楼休息室",
            "regent-service": "丽晶服务",
            "indoor-pool": "室内游泳池",
            "fitness": "健身中心",
            "basketball-court": "室内篮球馆",
            "spa-suite": "Spa套房",
            "innovation-center": "创新中心",
            "echelon-life": "Echelon 生活",
            "sky-lounge": "空中酒廊e",
            "echelon-pets": "宠物社区",
            "playroom": "亲子乐园",
        },
        "subnav-residences": {
            "overview": "Overview",
            "133-seaport": "133 Seaport （不用翻译）",
            "lobby": "大堂",
            "living-room": "客厅",
            "views": "景观",
            "kitchen": "厨房",
            "terraces": "露台"
        },
        "subnav-architecture-and-design": {
            "kpf-architecture": "KPF建筑设计事务所",
            "jeffrey-beers-interiors": "JBI室内设计公司"
        },
        "subnav-neighborhood": {
            "the-seaport": "海港区",
            "map": "地图",
            "neighborhood-gallery": "街区集景"
        },
        "architecture": {
            "stripe-content-body": "EchelonSeaport 已经成为海港区甚至是波士顿整个城市街区的代表性建筑，是由国际顶级建筑师事务所Kohn Pedersen Fox（KPF）定义的当代地标。三座住宅楼环绕着中央庭院，美轮美奂的廊桥、多条人行道及郁郁葱葱的树冠纵横交织，坐落其中。",
            "caption-body": "艺术契合商业。中央庭院四周围绕着众多引人注目的建筑，共同营造出波士顿地区最受期待的公共空间。高端零售及难以忘怀的美食体验，成就了这个集生活、购物及娱乐于一体的社区。",
            "jeff-beers-international": "JEFFREY BEERS INTERNATIONAL的室内设计",
            "globally-recognized": "广受全球赞誉的室内设计师Jeffrey Beers 曾为四季酒店、朗廷酒店和丽思卡尔顿酒店设计出一系列令人赞不绝口的作品。在他的实力操刀下，EchelonSeaport尽显优雅，奢华中不乏细节。精心打造的接待区及注重细腻与意义的舒适空间，无一不体现出EchelonSeaport的独具匠心。",
            "design-sensibility": "清晰的线条、绚丽的纹理、风格与功能相结合的天然材料，这些成就了Jeffrey Beers的设计灵感。独特内饰风格的公共空间如同自家起居室的延伸，充满了温暖、舒适与温馨。它所渲染的社交氛围也愈发调动了住户们渴望交流与沟通的内心。",
            "boston-is-heading": "前行——心之所向",
            "shaping-the-future": "塑造未来",
            "architecture-by": "建筑师KOHN PEDERSEN FOX",
            "different-by-design": "因设计而不同",
            "a-cultivated-designed": "来自JEFFREY BEERS的精心设计",
        },
        "intro": {
            "header-1": "在波士顿活力十足的社区定居",
            "header-2": "拥有度假般的体验。",
        },
        "home": {
            "anchoring": "海港区作为波士顿的最具创新与活力的区域，早已成为当地最令人神往的居住宝地。坐落于此的EchelonSeaport定会为您带来最值得期待的生活方式。",
            "contemporary-landmark": "由国际顶尖建筑设计事务所KPF实力操刀，另搭配由美国著名室内设计所Jefferey Beers精品打造共享空间设施，EchelonSeaport将注定成为波士顿当地的经典地标。",
            "extraordinary": "集萃风华，醇熟悦享，高档生活配套设施一应俱全，悦享城市高尚生活。",
            "canvas": "绮丽的阳光悄悄透过落地窗，温柔地洒落在屋中的每个角落。眺望窗外，在慵懒中静观曼妙的波士顿海天一线。",
            "the-seaport": "海港区",
            "kpf-architecture": "KPF 建筑事务所 <br />JEFFREY BEERS设计",
            "urban-living": "城市度假生活",
            "modern-living": "摩登生活"
        },
        "contact": {
            "interested": "有兴趣收到更多资讯？",
            "receive-updates": "欲收到独家资讯更新，请于下方留下您的联系方式",
        },
        "neighborhood": {
            "dining-text-copy": "屡获殊荣的餐饮品牌早已令波士顿海港区成为最受欢迎的餐饮聚集地。在这里，您能享受到美食届的奥斯卡奖­——James Beard奖项获得者Barbara Lynch、Ming Tsai和Joanne Chang等人制作出来的美食佳肴，多滋多样，应有尽有。",
            "dining-text-title": "Seaport",
            "dining-text-title-2": "Dining",
            "location-seaport": "EchelonSeaport坐落在波士顿最受期待的创新区，这不仅仅是一处居所，更是一种崭新的生活方式。无论是活力十足的中庭氛围，还是品牌化管理的商业中心，亦或是多样的室内外生活设施，都可以为您带来全新的体验。不但传承了波士顿丰富的文化格调，更在城市持续发展的过程中留下了自己的独特印记。",
            "soaring-heights": "迷人的波士顿一直是历史文化底蕴和国际时尚潮流的融合体，如今它再次以一副崭新的面貌面向全世界，海港区飞速发展，已经成为波士顿首屈一指的新中心。",
            "grandly-scaled": "这里不仅是美食的天堂，还是波士顿最时尚的圣殿。商业中心范围广，品牌多样化，不仅仅有Filson，Lululemon，L.L. Bean此类经典品牌，也不乏Warby Parker这类创新品牌，只要您需要，总能在这里找到自己喜爱的商品。而这，仅仅是一个开始……",
            "seaport-sweat": "喜欢户外跑步、骑车、散步？那还有什么地方比Seaport风景如画的海滨区更合适！您可以在Lululemon或L.L Bean置办一身崭新的运动装备，然后到全美知名的Everbody Fights、Soulcycle和Equinox健身会所挥洒汗水，再前往Juice Press、byChloe享用健康的一餐。健康变得轻松而简单……",
            "gallery": "充满生机与活力的海港区正在缓缓向我们走来，它时刻行走在波士顿美食艺术、购物及文化领域的最前沿，毫无疑问地成为了这座城市备受期待的“新”街区。",
            "get-centered": "汇聚一堂",
            "get-connected": "",
            "seaport-neighborhood": "SEAPORT社区",
            "wellness": "阳光户外",
            "seaport-styled":  "海港城的格调",
            "new-center":  "波士顿新中心",
            "gallery-subtitle": "街区",
            "gallery-title": "集景",
            "seaport-dining-1": "海港区的餐饮文化",
            "seaport-dining-2": ""
        },
        "team": {
            "team-1": "Echelon的生活代表着一种全新的发展理念的演变，就是将非凡的设计艺术同无可比拟的生活设施相结合起来。Cottonwood Management总部设在美国洛杉矶，管理着超过20亿美元的资产。公司选择了波士顿作为其东海岸总部和首座发布Echelon Life品牌的城市，将活力、学术精神和创新动力更加完美地渗透到这座城市中，令其更具吸引力，更加彰显魅力风采。",
            "team-2": "全球顶级建筑师事务所Kohn Pedersen Fox（KPF）为海港区带来了无与伦比的建筑美学。这家国际顶尖的建筑师事务所在美国纽约、英国伦敦、中国香港及上海都设有工作室，在世界各地留下众多具有影响力的作品，以其优雅的设计理念和独具匠心的建筑风格而闻名全球。KPF设计建造的标志性综合体项目是通往商业中心和创新中心的门户，包括伦敦的Covent Garden、纽约的Hudson Yards、东京的Rappongi Hills、上海的环球金融中心、香港的环球贸易广场，以及波士顿的EchelonSeaport等等。",
            "team-3": "国际知名室内设计公司Jeffrey Beers International以其专业的私人定制设计而闻名于世。位于纽约的JBI选择了EchelonSeaport作为其在波士顿的首个住宅项目，JBI用大师级的审美将EchelonSeaport的内外生活设施空间塑造成一个美丽的整体。而目前JBI正在为Rafael Vinoly于纽约277 Fifth Avenue的项目进行室内装潢设计。JBI设计的标志性酒店项目包括迈阿密的Fontainebleau，和著名主厨Jean-George于巴哈马开设的Dune餐厅。",
            "team-4": "以多次荣获奖项和高水准的五星级服务而闻名于世的丽晶携手Cottonwood，共同为波士顿EchelonSeaport带来了专业的酒店知识和丰富的行业经验。而作为其重返美国市场的第一步，丽晶无所保留地将其特有的经营风格和对服务细节的考量融入进来。",
            "team-5": "总部位于波士顿的美国著名建筑公司CBT与国际知名建筑师事务所KPF倾力合作，将EchelonSeaport赋予生命。荣获众多殊荣的CBT在波士顿设计了一系列卓越的住宅作品，包括Mandarin Oriental、丽思卡尔顿酒店、Twenty-Two Liberty等。",
            "team-6": "作为波士顿海港区的领先建筑商，John Moriarty & Associates（JMA）全权掌舵EchelonSeaport项目。JMA以其交付产品的精品质量而闻名，在美国东海岸建造了超过两万套豪华产权公寓。公司总部位于美国波士顿，JMA的蓬勃发展，不断为赋予其信任的新老客户和合作伙伴打造精品城市项目。",
            "team-7": "总部设在美国波士顿的TCC一直是波士顿地区市场领先的公寓项目销售公司，在过去的三十年中，TCC完美达成了超过60亿美元的城市和郊区房地产销售业绩。TCC在EchelonSeaport的知名销售团队塑造了一个前所未有的销售体验中心，以帮助客户探索 Echelon Life的方方面面。",
            "team-1-role": "开发商",
            "team-2-role": "建筑事务所",
            "team-3-role": "公共设施/室内设计",
            "team-4-role": "服务标准", // service standards
            "team-4-name": "丽晶服务品质",
            "team-5-role": "住宅设计",
            "team-6-role": "建筑商",
            "team-7-role": "销售&市场",
        },
        "contact-form": {
            "broker": "您现在是由经纪人作为代表吗？",
            "first-name": "您的名字",
            "last-name": "您的姓氏",
            "email": "您的电子邮件",
            "phone": "您的电话",
            "street": "您的街道地址",
            "city": "城市",
            "state": "州",
            "zip": "邮编",
            "type": "住宅类型",
            "studio": "开间户型",
            "1-bedroom-a": "1居室户型",
            "1-bedroom-b": "1居室+1浴室户型",
            "2-bedroom": "2居室+2.5浴室户型",
            "3-bedroom": "3居室+3/3.5浴室户型",
            "interested": "我很感兴趣"
        },
        "residences": {
            "text-1": "两幢住宅楼的外墙被恒久耐看的石头及玻璃材质所包围，海港区的天际线将在不久后被重新定义。KPF将楼梯轮廓设计为节节高升的云梯状，为住户打造出私家超大空中露台。",
            "text-2": "133 Seaport共含产权公寓255套，主打宽阔奢华生活空间。不仅令住户尽享波士顿海湾和海港公园景致，还配有豪华高贵的小区配套设施，例如SPA、酒廊和餐饮等等。",
            "text-3": "135 Seaport共含产权公寓192套，主打时尚精致生活空间。城市风光，海湾胜景，日升日落，海天一线，极致美景尽入眼帘。位于3层的小区花园更设有高标准的室外泳池，水边凉亭，以及户外休闲空间。",
            "text-4": "EchelonSeaport旨在令住户享受到五星级酒店般的生活体验。从您踏入EchelonSeaport的那一刻起，每一项贴心服务，每一套生活设施的使用，每一处感官，都会散发出它的独特魅力。",
            "text-5": "EchelonSeaport配有24小时大堂前台，一层大堂内还设有多个社交区域。在Jefferey Beers的设计下，异国风情的大理石地面，暖色调的木质与迷人的金属光泽交相辉映，将大堂烘托出一种高贵奢华之感。",
            "text-6": "品上一杯香浓的咖啡，坐在落地窗边远望城市和海湾胜景，逃离了喧嚣与繁杂，静享暖阳。温柔的阳光洒落在白色的橡木地板上，如同一幅镌刻永恒的画卷，墨染流年，岁月静好。",
            "text-7": "独一无二的中庭花园，如同海市蜃楼般的城市天际全景，美轮美奂的波士顿海湾新视角，您坐在家中就能观赏到这些极致美景，EchelonSeaport似乎将美学赋予了最大内涵。",
            "text-8": "意大利进口定制橱柜，顶级集成电器，一流的选材，时尚的艺术理念，真正缔造了EchelonSeaport开放式厨房的艺术价值。品味生活，尽享美食。",
            "text-9": "EchelonSeaport 的阶梯式建筑轮廓构建出波士顿高端住宅中罕见的超大私家露台，即便在家中也能同时坐拥户外休闲与尽享美食的空间，感知四季变迁，笑看云卷云舒。",
            "two-addresses": "不同的建筑",
            "singular-destination": "相同的体验",
            "different-by-design": "独一无二的设计",
            "133-seaport-residences": "133 SEAPORT尊贵生活",
            "living-work": "生活的艺术",
            "own-sky": "坐拥城市天际",
            "top-chef": "艺术厨房",
            "signature-terraces": "独特的空中私家露台",
            "preview-of": "预约参观EchelonSeaport",
            "contact-info": "请留下您的联系方式"
        },
        "lifestyle": {
            "text-1": "EchelonSeaport拥有超过50,000平方英尺的生活配套设施，由世界知名的室内设计公司Jeffrey Beers International全新打造。室内外尽显与众不同，着眼于高端居住品质，优越生活不言自明。",
            "text-2": "户外花园鲜花满簇，露天餐区阳光满怀，池畔阳光露台为夏季带来丝丝清凉，最受期待的共享户外休闲区带来无限的欢乐和幸福。",
            "text-3": "三种独特的泳池体验，融入无与伦比的空间感和宁谧感，享受无可比拟的曼妙。EchelonSeaport致力于将海港区打造成一座以高档奢华为主旋律的圣殿，亦将生活与休闲合而为一。",
            "text-4": "无可挑剔的豪华风格，充满时尚的设计理念，搭配挑高的天花板和丰富的建筑细节。客户将私享一系列可俯瞰户外美景的社交及休闲空间。",
            "text-5": "图书馆休息区内陈列着众多精美的艺术品和摄影作品，完美传承了来自波士顿自身散发的文化艺术气息。一杯鸡尾酒，一本好书，在静谧中享受智慧的洗礼。",
            "text-6": "尊享美酒品鉴室，品味杯中风情，崇尚时尚魅力。矗立的温控葡萄酒储藏室，融合精美定制的酒柜，共同营造出无法抵挡的品酒独立空间。",
            "text-7": "EchelonSeaport主厨餐厅最具独特潮流之感，彰显时尚风范。艺术的传承离不开卓越的设计师，国际著名室内设计大师Jeffrey Beers曾经为业界知名厨师Jean Georges Vongerichten和Todd English设计私人餐厅，得到高度评价。更在此次设计中将艺术与美食相互交融，为您尊贵生活的每一刻留下眷恋。",
            "text-8": "丽晶国际以其无与伦比的服务标准获得全球认可，因而被选中负责整个物业的服务品质。从经过专业培训的礼宾服务到精心挑选的水疗技师，每位EchelonSeaport的服务助理都将传承丽晶格调。",
            "text-9": "除了三个室内外泳池，EchelonSeaport特为客户提供了一个8,500平方英尺的健身中心，专属配备了SPA及室内外理疗区，享受生活，从健康开始。",
            "text-10": "动与静的结合，阴与阳的平衡。无论是在健身中心重新燃烧自我激情，亦或是在附近的私人瑜伽馆尽享根源之美，EchelonSeaport 都会满足您的需求。",
            "text-11": "追逐，是一种执着；跳跃，是一种激情。在两层高的室内篮球场中肆意奔跑，独有的科技墙尽显场上青春魅力的别样风采。更可享有顶级PGA职业选手专用的尖端高尔夫模拟器，一球，尽在我手。游戏，开始了……",
            "text-12": "EchelonSeaport专享温泉与独一无二的空中花园相互连接，更添带有柚木香、天然石料的私人理疗室，尽情汲取“天然氧吧”之精华。您可以选择在室内进行理疗，也可享受郁郁葱葱的私人户外殿堂，在青葱的原生态环境中感受和谐美妙的氛围。",
            "text-13": "独一无二的居住配套。Echelon创新中心以由波士顿 顶尖学府和孵化机构开发的项目为特色。居住在这里，你既可以和周边的业主一起，与高端商业、技术、和文化领袖精英们分享卓越的思维，也可以在一天的任何时候进行富有创意的工作。",
            "text-14": "EchelonSeaport 的核心就是在省时便捷中尽享奢华。因此，您可以通过一系列Echelon Life APP，即时享有国际一流的管理和礼宾服务。您可随时为爱车呼叫礼宾泊车、预定餐厅酒店，甚至是预定飞往楠塔基特（或巴黎）的私人飞机服务等等。一切，尽在您的掌握之中。",
            "text-15": "在空中酒廊休息室眺望波士顿海湾胜景，于静谧空间感知四季变迁。这是为住户专属预留的独家生活俱乐部，经过丽晶专业培训的工作人员服务贴心到位，将为您妥善安排每次的会面与聚餐。",
            "text-16": "EchelonSeaport为您提供全新的宠物欢乐时光。在户外宠物活动区及游乐园同其他爱宠们玩耍，在宠物美容中心做“SPA”，您还能够通过Echelon Life APP与您的训宠师随时进行沟通交流。定令您的爱宠宾至如归，尽享生活的轻松舒适。",
            "text-17": "EchelonSeaport的亲子乐园会令您好似重返童年时光，我们相信不仅仅是您自己，您的子女也会无法抵挡这里探索和欢愉的魅力，定会乐不思蜀。",
            "elevate": "超乎您的想象",
            "expectations": "", // empty second half of elevate
            "captivating": "阳光与自然",
            "grandpool": "室外大游泳池",
            "echelonentertaining": "设计风格",
            "impressive": "每个角度都令人印象深刻",
            "chapter": "文化与艺术的传承",
            "toast": "良辰与美酒",
            "epicurean": "艺术与美食",
            "regentcollection": "丽晶服务品质",
            "fivestarservice": "五星级居住体验",
            "echelonwellness": "健康生活",
            "reinvigorate": "为生活注入新活力",
            "fitness": "运动的升华",
            "gaming": "球场上的激情",
            "zen": "私人禅式空间",
            "culture": "ECHELON文化",
            "innovation": "核心打造 创新无限",
            "echelonlife": "ECHELON生活",
            "aboveitall": "高空俯瞰",
            "pets": "宠物社区",
            "dogrun": "户外宠物活动区&宠物美容",
            "playtime": "亲子乐园"
        },
        "legal": {
            "equal-opportunity": "ECHELONSEAPORT是一个拥有平等机会的住房项目。我们遵守1968年民权法案第八条。我们绝不会因为您的种族、肤色、宗教信仰、性别或国际问题而产生歧视。",
            "this-material": "在需要事先注册的任何州或国家，本材料不构成有效法律效力。本网站描述的材料、特征和设施均基于当前的开发计划，如有更改，恕不另行通知。实际开发结果可能不符合当前的方案。不能保证设计师效果图描绘的或本网站他处描述的特征、设施和设备将会被建造，或者如果被建造，不保证将一定能与所描绘或描述的类型、尺寸或性质保持一致。",
            "units-described": "本网站描述的并在“丽晶”和/或“丽晶系列”商标许可下销售的住宅单位未由丽晶亚太地区管理有限公司（“丽晶”）或其任何附属公司所拥有、开发或销售，且丽晶及其任何附属公司对此类住宅单位将不作出任何陈述、保证或担保。",
        },
        "images": {
            "gallery": "照片",
            "image-1": "EchelonSeaport 波士顿海港区EchelonSeaport",
            "image-2": "133 Seaport 1 号楼建筑外观",
            "image-3": "135 Seaport 2 号楼建筑外观",
            "image-4": "Central Courtyard 中央庭院",
            "image-5": "Iconic Pedestrian Bridge 标志性廊桥",
            "image-6": "Courtyard Retail 中央庭院商业",
            "image-7": "133 Lobby 1 号楼大堂",
            "image-8": "133 Sky Lounge 1 号楼空中酒廊",
            "image-9": "Fireplace Lounge 壁炉休息室",
            "image-10": "Library Lounge 图书馆及商务中心",
            "image-11": "Tasting Room 品酒室",
            "image-12": "135 Seaport Lounge 2 号楼大堂",
            "image-13": "Echelon Innovation Center 创新中心",
            "image-14": "The Relaxation Pool 室内游泳池",
            "image-15": "Hi-Def Basketball Court 室内篮球馆",
            "image-16": "The Spa at EchelonSeaport 室",
            "image-17": "The Grand Pool 室外大游泳池",
            "image-18": "The Waterfall Terrace Pool 瀑布游泳池",
            "image-19": "Outdoor Fireplace Lounge 室外壁炉休息空间",
            "image-20": "133 Resident Living Room 客厅",
            "image-21": "133 Resident Kitchen 厨房",
            "image-22": "133 Resident Terrace 阳台",
        },
        "image-slider": {
            "previous": "上一页",
            "next": "下一页"
        },
        "floorplans": {
            "for-availability": "对于楼层计划与可出售情况",
            "contact-us-at": "请拨打电话%phone_link%与我们取得联系"
        },
         "singular-destination": {
             "133-Seaport": "133 Seaport",
             "135-Seaport": "135 Seaport",
             "text-1": "两幢住宅楼的外墙被恒久耐看的石头及玻璃材质所包围，海港区的天际线将在不久后被重新定义。KPF将楼梯轮廓设计为节节高升的云梯状，为住户打造出私家超大空中露台。",
             "text-2": "133 Seaport共含产权公寓255套，主打宽阔奢华生活空间。不仅令住户尽享波士顿海湾和海港公园景致，还配有豪华高贵的小区配套设施，例如SPA、酒廊和餐饮等等。",
             "text-3": "135 Seaport共含产权公寓180套，主打时尚精致生活空间。城市风光，海湾胜景，日升日落，海天一线，极致美景尽入眼帘。位于3层的小区花园更设有高标准的室外泳池，水边凉亭，以及户外休闲空间。",
             "two-addresses": "不同的建筑",
             "singular-destination": "相同的体验",
        },
        "call-to-action": {
            "first-name": "您的名字",
            "last-name": "您的姓氏",
            "email": "您的电子邮件",
            "phone": "您的电话",
            "more-information": "更多关于EchelonSeaport的资讯",
            "on-echelon": "",
            "tell-me-more": "与我联系",
            "thank-you": "感谢您的注册",
            "broker-will": "销售人员将与您联系并告知更多资讯"
        },
        "neighborhood-map": {
                "all": "全部",
                "dining": "餐饮",
                "shopping": "购物",
                "culture": "文化",
                "hotels": "酒店"
        },
        "footer": {
            "sales-gallery": "销售展示中心地址",
            "legal": "法务声明",
        },
        "shared": {
            "lang-en": "EN",
            "lang-cn": "中文",
            "lang-english": "English",
            "lang-chinese": "Chinese"
        },
        "hubspot": {
            "form-id": "3baecad0-a9ff-43e3-8455-8ae1b4f359f9",
            "thank-you": "感谢您的注册",
        },
        "register-thank-you": {
            "thank-you": "感谢您的注册",
            "echelon-insiders": "Echelon专属用户将收到一手最新项目更新资讯、通告及活动邀请"
        },
        "news": {
            "download-pdf": "下载PDF"
        }
    }
};

var flattenedTranslations = {};
for(var language in translations) {
    var languageTranslations = translations[language];

    flattenedTranslations[language] = {};

    for(var page in languageTranslations) {
        var pageTranslations = languageTranslations[page];
        for(var transkey in pageTranslations) {
            var val = pageTranslations[transkey];
            flattenedTranslations[language][page + "." + transkey] = val;
        }
    }
}

Vue.i18n.add('en', flattenedTranslations["en"]);
Vue.i18n.add('cn', flattenedTranslations["cn"]);

var languageSelected = (window.translanguage in flattenedTranslations) ? window.translanguage : "en";

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
            data: { path: routePath === "" ? "home" : routePath }
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
