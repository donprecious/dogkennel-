"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Whether or not touch gestures are supported by the browser. */
exports.touch = 'ontouchstart' in window ||
    (navigator.msMaxTouchPoints ? true : false) ||
    false;
