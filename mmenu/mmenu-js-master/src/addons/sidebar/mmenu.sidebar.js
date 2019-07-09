"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("../../core/oncanvas/mmenu.oncanvas");
var _options_1 = require("./_options");
var DOM = require("../../core/_dom");
var media = require("../../core/_matchmedia");
var _options_2 = require("./_options");
var _helpers_1 = require("../../core/_helpers");
//  Add the options.
mmenu_oncanvas_1.default.options.sidebar = _options_1.default;
function default_1() {
    var _this = this;
    if (!this.opts.offCanvas) {
        return;
    }
    var options = _options_2.extendShorthandOptions(this.opts.sidebar);
    this.opts.sidebar = _helpers_1.extend(options, mmenu_oncanvas_1.default.options.sidebar);
    var clsclpsd = 'mm-wrapper_sidebar-collapsed', clsxpndd = 'mm-wrapper_sidebar-expanded';
    //	Collapsed
    if (options.collapsed.use) {
        //	Make the menu collapsable.
        this.bind('initMenu:after', function () {
            _this.node.menu.classList.add('mm-menu_sidebar-collapsed');
            if (options.collapsed.blockMenu &&
                _this.opts.offCanvas &&
                !DOM.children(_this.node.menu, '.mm-menu__blocker')[0]) {
                var anchor = DOM.create('a.mm-menu__blocker');
                anchor.setAttribute('href', '#' + _this.node.menu.id);
                _this.node.menu.prepend(anchor);
            }
            if (options.collapsed.hideNavbar) {
                _this.node.menu.classList.add('mm-menu_hidenavbar');
            }
            if (options.collapsed.hideDivider) {
                _this.node.menu.classList.add('mm-menu_hidedivider');
            }
        });
        //	En-/disable the collapsed sidebar.
        var enable = function () {
            _this.node.wrpr.classList.add(clsclpsd);
        };
        var disable = function () {
            _this.node.wrpr.classList.remove(clsclpsd);
        };
        if (typeof options.collapsed.use == 'boolean') {
            this.bind('initMenu:after', enable);
        }
        else {
            media.add(options.collapsed.use, enable, disable);
        }
    }
    //	Expanded
    if (options.expanded.use) {
        //	Make the menu expandable
        this.bind('initMenu:after', function () {
            _this.node.menu.classList.add('mm-menu_sidebar-expanded');
        });
        //	En-/disable the expanded sidebar.
        var enable = function () {
            _this.node.wrpr.classList.add(clsxpndd);
            if (!_this.node.wrpr.matches('.mm-wrapper_sidebar-closed')) {
                _this.open();
            }
        };
        var disable = function () {
            _this.node.wrpr.classList.remove(clsxpndd);
            _this.close();
        };
        if (typeof options.expanded.use == 'boolean') {
            this.bind('initMenu:after', enable);
        }
        else {
            media.add(options.expanded.use, enable, disable);
        }
        this.bind('close:start', function () {
            if (_this.node.wrpr.matches('.' + clsxpndd)) {
                _this.node.wrpr.classList.add('mm-wrapper_sidebar-closed');
            }
        });
        this.bind('open:start', function () {
            _this.node.wrpr.classList.remove('mm-wrapper_sidebar-closed');
        });
        //	Add click behavior.
        //	Prevents default behavior when clicking an anchor
        this.clck.push(function (anchor, args) {
            if (args.inMenu && args.inListview) {
                if (_this.node.wrpr.matches('.mm-wrapper_sidebar-expanded')) {
                    return {
                        close: false
                    };
                }
            }
        });
    }
}
exports.default = default_1;
