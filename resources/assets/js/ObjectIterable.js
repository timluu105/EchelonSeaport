/**
 * Creator: Bryan Mayor
 * Company: Blue Nest Digital, LLC
 * Date: 3/7/19
 * Time: 23:36
 * License: (All rights reserved)
 */

export default class ObjectIterable {
    constructor(object) {
        if(typeof object !== "object") {
            throw Error("Argument must be an object, not " + typeof object);
        }
        this.object = object;
    }

    [Symbol.iterator]() {
        let keys = Object.keys(this.object);

        return {
          next() {
              let done = keys.length === 0;
              let next = !done ? keys.pop() : undefined;

              return {
                  done: done,
                  value: next
              };
          },
        };
    }
}