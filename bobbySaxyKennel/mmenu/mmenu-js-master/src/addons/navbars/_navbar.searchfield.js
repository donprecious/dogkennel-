"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _helpers_1 = require("../../core/_helpers");
function default_1(navbar) {
    if (_helpers_1.type(this.opts.searchfield) != 'object') {
        this.opts.searchfield = {};
    }
    this.opts.searchfield.add = true;
    this.opts.searchfield.addTo = [navbar];
}
exports.default = default_1;
;
