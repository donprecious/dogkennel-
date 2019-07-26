"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("./../oncanvas/mmenu.oncanvas");
var _options_1 = require("./_options");
var DOM = require("../_dom");
var support = require("../../core/_support");
var _options_2 = require("./_options");
var _helpers_1 = require("../../core/_helpers");
//  Add the options.
mmenu_oncanvas_1.default.options.scrollBugFix = _options_1.default;
function default_1() {
    var _this = this;
    //	The scrollBugFix add-on fixes a scrolling bug
    //		1) on touch devices
    //		2) in an off-canvas menu
    //		3) that -when opened- blocks the UI from interaction
    if (!support.touch || // 1
        !this.opts.offCanvas || // 2
        !this.opts.offCanvas.blockUI // 3
    ) {
        return;
    }
    //	Extend options.
    var options = _options_2.extendShorthandOptions(this.opts.scrollBugFix);
    this.opts.scrollBugFix = _helpers_1.extend(options, mmenu_oncanvas_1.default.options.scrollBugFix);
    if (!options.fix) {
        return;
    }
    //	When opening the menu, scroll to the top of the current opened panel.
    this.bind('open:start', function () {
        DOM.children(_this.node.pnls, '.mm-panel_opened')[0].scrollTop = 0;
    });
    //	Only needs to be done once per page.
    if (!mmenu_oncanvas_1.default.vars.scrollBugFixed) {
        var scrolling_1 = false;
        //	Prevent the body from scrolling.
        document.addEventListener('touchmove', function (evnt) {
            if (_this.node.wrpr.matches('.mm-wrapper_opened')) {
                evnt.preventDefault();
            }
        });
        document.body.addEventListener('touchstart', function (evnt) {
            var panel = evnt.target;
            if (!panel.matches('.mm-panels > .mm-panel')) {
                return;
            }
            if (_this.node.wrpr.matches('.mm-wrapper_opened')) {
                if (!scrolling_1) {
                    //	Since we're potentially scrolling the panel in the onScroll event,
                    //	this little hack prevents an infinite loop.
                    scrolling_1 = true;
                    if (panel.scrollTop === 0) {
                        panel.scrollTop = 1;
                    }
                    else if (panel.scrollHeight ===
                        panel.scrollTop + panel.offsetHeight) {
                        panel.scrollTop -= 1;
                    }
                    //	End of infinite loop preventing hack.
                    scrolling_1 = false;
                }
            }
        });
        document.body.addEventListener('touchmove', function (evnt) {
            var panel = evnt.target;
            if (!panel.matches('.mm-panels > .mm-panel')) {
                return;
            }
            if (_this.node.wrpr.matches('.mm-wrapper_opened')) {
                if (panel.scrollHeight > panel.clientHeight) {
                    evnt.stopPropagation();
                }
            }
        });
    }
    mmenu_oncanvas_1.default.vars.scrollBugFixed = true;
    //	Fix issue after device rotation change.
    window.addEventListener('orientationchange', function (evnt) {
        var panel = DOM.children(_this.node.pnls, '.mm-panel_opened')[0];
        panel.scrollTop = 0;
        //	Apparently, changing the overflow-scrolling property triggers some event :)
        panel.style['-webkit-overflow-scrolling'] = 'auto';
        panel.style['-webkit-overflow-scrolling'] = 'touch';
    });
}
exports.default = default_1;
