"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("../../core/oncanvas/mmenu.oncanvas");
var _options_1 = require("./_options");
var DOM = require("../../core/_dom");
var _options_2 = require("./_options");
var _helpers_1 = require("../../core/_helpers");
//	Add the options.
mmenu_oncanvas_1.default.options.backButton = _options_1.default;
function default_1() {
    var _this = this;
    if (!this.opts.offCanvas) {
        return;
    }
    var options = _options_2.extendShorthandOptions(this.opts.backButton);
    this.opts.backButton = _helpers_1.extend(options, mmenu_oncanvas_1.default.options.backButton);
    var _menu = '#' + this.node.menu.id;
    //	Close menu
    if (options.close) {
        var states = [];
        var setStates = function () {
            states = [_menu];
            DOM.children(_this.node.pnls, '.mm-panel_opened, .mm-panel_opened-parent').forEach(function (panel) {
                states.push('#' + panel.id);
            });
        };
        this.bind('open:finish', function () {
            history.pushState(null, document.title, _menu);
        });
        this.bind('open:finish', setStates);
        this.bind('openPanel:finish', setStates);
        this.bind('close:finish', function () {
            states = [];
            history.back();
            history.pushState(null, document.title, location.pathname + location.search);
        });
        window.addEventListener('popstate', function (evnt) {
            if (_this.vars.opened) {
                if (states.length) {
                    states = states.slice(0, -1);
                    var hash = states[states.length - 1];
                    if (hash == _menu) {
                        _this.close();
                    }
                    else {
                        _this.openPanel(_this.node.menu.querySelector(hash));
                        history.pushState(null, document.title, _menu);
                    }
                }
            }
        });
    }
    if (options.open) {
        window.addEventListener('popstate', function (evnt) {
            if (!_this.vars.opened && location.hash == _menu) {
                _this.open();
            }
        });
    }
}
exports.default = default_1;
