"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("../../core/oncanvas/mmenu.oncanvas");
var DOM = require("../../core/_dom");
//	Add the classnames.
mmenu_oncanvas_1.default.configs.classNames.toggles = {
    toggle: 'Toggle',
    check: 'Check'
};
function default_1() {
    var _this = this;
    this.bind('initPanels:after', function (panels) {
        //	Refactor toggle classes
        panels.forEach(function (panel) {
            DOM.find(panel, 'input').forEach(function (input) {
                DOM.reClass(input, _this.conf.classNames.toggles.toggle, 'mm-toggle');
                DOM.reClass(input, _this.conf.classNames.toggles.check, 'mm-check');
            });
        });
    });
}
exports.default = default_1;
