import ObjectIterable from "../ObjectIterable.js";

export default class {

    constructor(defaultLanguage, translationLanguages) {
        this.defaultLanguage = defaultLanguage;
        this.translationLanguages = translationLanguages;
    }

    _flattenTranslationsMap(languageTranslations, fallbackTranslations = null) {
        let flattenedTranslations = {};

        for (let page of new ObjectIterable(languageTranslations)) {
            let pageTranslations = languageTranslations[page];
            for (let transkey of new ObjectIterable(pageTranslations)) {
                flattenedTranslations[page + "." + transkey] = pageTranslations[transkey];
            }
        }

        if (fallbackTranslations !== null) {
            for (let key of new ObjectIterable(fallbackTranslations)) {
                if (!(key in flattenedTranslations) || flattenedTranslations[key] === null) {
                    flattenedTranslations[key] = fallbackTranslations[key];
                }
            }
        }

        return flattenedTranslations;
    }

    prepareTranslations(translationsMap) {
        let flattenedTranslations = new Map();
        let mainLanguage = [this.defaultLanguage];
        let translationLanguages = this.translationLanguages;

        let mainTranslations = this._flattenTranslationsMap(translationsMap[mainLanguage]);
        flattenedTranslations[mainLanguage] = mainTranslations;
        for (let iLanguage of translationLanguages) {
            flattenedTranslations[iLanguage] = this._flattenTranslationsMap(translationsMap[iLanguage], mainTranslations);
        }

        return flattenedTranslations;
    }
}