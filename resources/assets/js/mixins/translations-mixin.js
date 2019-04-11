import ResourceMap from "../translations/ResourceMap";

export default {
    data() {
        return {
            translationsResource: new ResourceMap("/language-api/data/{key}"),
        }
    }
    ,
    methods: {
        languageSwitch(language) {
            var self = this;
            this.translationsResource.retrieve(language).then(function(data) {
                self.$i18n.add(language, data);
                self.$i18n.set(language);
                window.location.reload(true);
            });
        }
    }
};
