"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var opts = {
    height: 'default'
};
exports.default = opts;
/**
 * Extend shorthand options.
 *
 * @param  {object} options The options to extend.
 * @return {object}			The extended options.
 */
function extendShorthandOptions(options) {
    if (typeof options == 'boolean' && options) {
        options = {
            height: 'auto'
        };
    }
    if (typeof options == 'string') {
        options = {
            height: options
        };
    }
    if (typeof options != 'object') {
        options = {};
    }
    return options;
}
exports.extendShorthandOptions = extendShorthandOptions;
;
