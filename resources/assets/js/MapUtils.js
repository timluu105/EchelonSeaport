/**
 * Creator: Bryan Mayor
 * Company: Blue Nest Digital, LLC
 * Date: 3/7/19
 * Time: 23:36
 * License: (All rights reserved)
 */

export default class MapUtils {
    static fromObject(obj) {
        if(typeof obj !== "object") {
            throw Error("Argument must be an object, not " + typeof object);
        }

        var entries = [];
        Object.keys(obj).forEach(function(key) {
            entries.push([key, obj[key]]);
        });

        return new Map(entries);
    }
}