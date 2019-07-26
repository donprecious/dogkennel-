"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var options = {
    drop: false,
    fitViewport: true,
    event: 'click',
    position: {},
    tip: true
};
exports.default = options;
/**
 * Extend shorthand options.
 *
 * @param  {object} options The options to extend.
 * @return {object}			The extended options.
 */
function extendShorthandOptions(options) {
    if (typeof options == 'boolean' && options) {
        options = {
            drop: options
        };
    }
    if (typeof options != 'object') {
        options = {};
    }
    if (typeof options.position == 'string') {
        options.position = {
            of: options.position
        };
    }
    return options;
}
exports.extendShorthandOptions = extendShorthandOptions;
;
