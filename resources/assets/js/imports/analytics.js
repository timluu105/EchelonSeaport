export default {
    send: function(type, body) {
        if (typeof ga !== "undefined") {
            if (type === "pageview") {
                ga("set", "page", body.page);
                ga("set", "title", body.title);
                ga("send", "pageview");
            } else {
                ga("send", type, body);
            }
        }

        if (typeof dataLayer !== "undefined") {
            if (type === "pageview") {
                dataLayer.push({
                    "event": "VirtualPageview",
                    "virtualPageURL": body.page,
                    "virtualPageTitle": body.title
                });
            } else {
                dataLayer.push({ [type]: body });
            }
        }
    }
};
