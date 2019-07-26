"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var options = {
    current: true,
    hover: false,
    parent: false
};
exports.default = options;
/**
 * Extend shorthand options.
 *
 * @param  {object} options The options to extend.
 * @return {object}			The extended options.
 */
function extendShorthandOptions(options) {
    if (typeof options == 'boolean') {
        options = {
            hover: options,
            parent: options
        };
    }
    if (typeof options != 'object') {
        options = {};
    }
    return options;
}
exports.extendShorthandOptions = extendShorthandOptions;
;
