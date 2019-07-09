"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _helpers_1 = require("../../core/_helpers");
var options = {
    use: false,
    top: [],
    bottom: [],
    position: 'left',
    type: 'default'
};
exports.default = options;
/**
 * Extend shorthand options.
 *
 * @param  {object} options The options to extend.
 * @return {object}			The extended options.
 */
function extendShorthandOptions(options) {
    if (_helpers_1.type(options) == 'array') {
        options = {
            use: true,
            top: options
        };
    }
    if (_helpers_1.type(options) != 'object') {
        options = {};
    }
    if (typeof options.use == 'undefined') {
        options.use = true;
    }
    if (typeof options.use == 'boolean' && options.use) {
        options.use = true;
    }
    return options;
}
exports.extendShorthandOptions = extendShorthandOptions;
;
