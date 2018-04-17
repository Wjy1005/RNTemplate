/**
 * Created by git on 16/8/5.
 * @flow
 */

'use strict';


const EventTarget = require("event-target-shim");


class Foo extends EventTarget {
}

var AppEventEmitter = new Foo();

module.exports = AppEventEmitter;