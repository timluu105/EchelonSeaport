// loc takes the first route
// the url goes here if it has a hash, otherwise the empty string is falsey
let url = { full: location.href },
    loc = "";

/*
 * loc is an array, everything after the fully qualified domain
 * and before the hash, split by slashes EXAMPLE:
 *
 * {
 *     "full": "http://base:8000/dashboard/118east59th",
 *     "domain": "http://base:8000",
 *     "extended": [
 *         "dashboard",
 *         "118east59th"
 *     ]
 * }
 *
 */

function parseURL() {
    // loc is an array of what's left after we've extracted the other url parts
    url.extended = url.full
        .replace(/#.*/, function(h) {
            // pull out the hash, if it exists
            url.hash = h; return "";
        })
        .replace(/\?.*/, function(que) {
            // just in case there's a fragment from google ads or something
            url.fragment = que; return "";
        })
        .replace(/https*:\/\/[^\/]*\//, function(domain) {
            // maybe you want to use the domain at some point?
            // check if on production? idk
            url.domain = domain.slice(0, -1); // throw away the slash
            return "";
        })
        .split("/"); // split what's left

    loc = url.extended[0]; // backwards compatibility
}
