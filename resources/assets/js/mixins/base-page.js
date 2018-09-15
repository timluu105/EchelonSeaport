import Lorem from "partials/lorem.vue";

export default {
    components: {
        "lorem": Lorem
    },

    data() {
        return {
            navTheme: "light",
            navHidden: false,
            footerHidden: false
        };
    },

    created() {
        this.$store.commit("setNavTheme", this.navTheme);
        this.$store.commit("setNavHidden", this.navHidden);
        this.$store.commit("setFooterHidden", this.footerHidden);
    }
};
