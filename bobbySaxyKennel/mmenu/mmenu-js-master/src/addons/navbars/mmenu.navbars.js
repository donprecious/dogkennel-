"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("../../core/oncanvas/mmenu.oncanvas");
var _options_1 = require("./_options");
var _configs_1 = require("./_configs");
var DOM = require("../../core/_dom");
var media = require("../../core/_matchmedia");
var _options_2 = require("./_options");
//  Add the options and configs.
mmenu_oncanvas_1.default.options.navbars = _options_1.default;
mmenu_oncanvas_1.default.configs.navbars = _configs_1.default;
//  Add the classnames.
mmenu_oncanvas_1.default.configs.classNames.navbars = {
    panelNext: 'Next',
    panelPrev: 'Prev',
    panelTitle: 'Title'
};
var _navbar_breadcrumbs_1 = require("./_navbar.breadcrumbs");
var _navbar_close_1 = require("./_navbar.close");
var _navbar_next_1 = require("./_navbar.next");
var _navbar_prev_1 = require("./_navbar.prev");
var _navbar_searchfield_1 = require("./_navbar.searchfield");
var _navbar_title_1 = require("./_navbar.title");
Navbars.navbarContents = {
    breadcrumbs: _navbar_breadcrumbs_1.default,
    close: _navbar_close_1.default,
    next: _navbar_next_1.default,
    prev: _navbar_prev_1.default,
    searchfield: _navbar_searchfield_1.default,
    title: _navbar_title_1.default
};
var _navbar_tabs_1 = require("./_navbar.tabs");
Navbars.navbarTypes = {
    tabs: _navbar_tabs_1.default
};
function Navbars() {
    var _this = this;
    var navs = this.opts.navbars;
    if (typeof navs == 'undefined') {
        return;
    }
    if (!(navs instanceof Array)) {
        navs = [navs];
    }
    var navbars = {};
    if (!navs.length) {
        return;
    }
    navs.forEach(function (options) {
        options = _options_2.extendShorthandOptions(options);
        if (!options.use) {
            return false;
        }
        //	Create the navbar element.
        var navbar = DOM.create('div.mm-navbar');
        //	Get the position for the navbar.
        var position = options.position;
        //	Restrict the position to either "bottom" or "top" (default).
        if (position !== 'bottom') {
            position = 'top';
        }
        //	Create the wrapper for the navbar position.
        if (!navbars[position]) {
            navbars[position] = DOM.create('div.mm-navbars_' + position);
        }
        navbars[position].append(navbar);
        //	Add content to the navbar.
        for (var c = 0, l = options.content.length; c < l; c++) {
            var ctnt = options.content[c];
            //	The content is a string.
            if (typeof ctnt == 'string') {
                var func = Navbars.navbarContents[ctnt];
                //	The content refers to one of the navbar-presets ("prev", "title", etc).
                if (typeof func == 'function') {
                    //	Call the preset function.
                    func.call(_this, navbar);
                    //	The content is just HTML.
                }
                else {
                    //	Add the HTML.
                    //  Wrap the HTML in a single node
                    var node = DOM.create('span');
                    node.innerHTML = ctnt;
                    //  If there was only a single node, use that.
                    var children = DOM.children(node);
                    if (children.length == 1) {
                        node = children[0];
                    }
                    navbar.append(node);
                }
                //	The content is not a string, it must be an element.
            }
            else {
                navbar.append(ctnt);
            }
        }
        //	The type option is set.
        if (typeof options.type == 'string') {
            //	The function refers to one of the navbar-presets ("tabs").
            var func = Navbars.navbarTypes[options.type];
            if (typeof func == 'function') {
                //	Call the preset function.
                func.call(_this, navbar);
            }
        }
        //	En-/disable the navbar.
        var enable = function () {
            navbar.classList.remove('mm-hidden');
            mmenu_oncanvas_1.default.sr_aria(navbar, 'hidden', false);
        };
        var disable = function () {
            navbar.classList.add('mm-hidden');
            mmenu_oncanvas_1.default.sr_aria(navbar, 'hidden', true);
        };
        if (typeof options.use != 'boolean') {
            media.add(options.use, enable, disable);
        }
    });
    //	Add to menu.
    this.bind('initMenu:after', function () {
        for (var position in navbars) {
            _this.node.menu[position == 'bottom' ? 'append' : 'prepend'](navbars[position]);
        }
    });
}
exports.default = Navbars;
