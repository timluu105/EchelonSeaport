import ObjectIterable from "../ObjectIterable.js";

export default class {
    constructor(resourceUrl) {
        this.map = new Map();
        this.resourceUrl = resourceUrl;
    }

    retrieve(key) {
        if(this.map.has(key)) {
            return Promise.resolve(this.map.get(key));
        }

        var self = this;

        return $.ajax({
            method: "GET",
            url: this.resourceUrl.replace("{key}", key),
            success: function(response) {
                console.log("Downloaded data", response);
                self.map.set(key, response);
            }
        });
    }
}