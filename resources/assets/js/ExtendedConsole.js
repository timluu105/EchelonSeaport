/**
 * Creator: Bryan Mayor
 * Company: Blue Nest Digital, LLC
 * Date: 3/7/19
 * Time: 23:36
 * License: (All rights reserved)
 */

export default class ExtendedConsole {
    static extend(console) {
        console.debug = function() {
            console.log("[DEBUG]");
            console.log.apply(console, arguments);
        };

        console.remove = function() {
            console.log("[REMOVE ME]");
            console.log.apply(console, arguments);
        }
    }
}