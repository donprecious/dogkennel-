"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var options = {
    add: false,
    addTo: 'panels',
    count: false
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
            add: options,
            addTo: 'panels',
            count: options
        };
    }
    if (typeof options != 'object') {
        options = {};
    }
    if (options.addTo == 'panels') {
        options.addTo = '.mm-panel';
    }
    return options;
}
exports.extendShorthandOptions = extendShorthandOptions;
