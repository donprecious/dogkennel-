"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("./../oncanvas/mmenu.oncanvas");
var _options_1 = require("./_options");
var _configs_1 = require("./_configs");
var translate_1 = require("./translations/translate");
var DOM = require("../_dom");
var _options_2 = require("./_options");
var _helpers_1 = require("../../core/_helpers");
//  Add the translations.
translate_1.default();
//  Add the options and configs.
mmenu_oncanvas_1.default.options.screenReader = _options_1.default;
mmenu_oncanvas_1.default.configs.screenReader = _configs_1.default;
function default_1() {
    var _this = this;
    //	Extend options.
    var options = _options_2.extendShorthandOptions(this.opts.screenReader);
    this.opts.screenReader = _helpers_1.extend(options, mmenu_oncanvas_1.default.options.screenReader);
    //	Extend configs.
    var configs = this.conf.screenReader;
    //	Add Aria-* attributes
    if (options.aria) {
        //	Add screenreader / aria hooks for add-ons
        //	In orde to keep this list short, only extend hooks that are actually used by other add-ons.
        this.bind('initAddons:after', function () {
            _this.bind('initMenu:after', function () {
                this.trigger('initMenu:after:sr-aria', [].slice.call(arguments));
            });
            _this.bind('initNavbar:after', function () {
                this.trigger('initNavbar:after:sr-aria', [].slice.call(arguments));
            });
            _this.bind('openPanel:start', function () {
                this.trigger('openPanel:start:sr-aria', [].slice.call(arguments));
            });
            _this.bind('close:start', function () {
                this.trigger('close:start:sr-aria', [].slice.call(arguments));
            });
            _this.bind('close:finish', function () {
                this.trigger('close:finish:sr-aria', [].slice.call(arguments));
            });
            _this.bind('open:start', function () {
                this.trigger('open:start:sr-aria', [].slice.call(arguments));
            });
            _this.bind('initOpened:after', function () {
                this.trigger('initOpened:after:sr-aria', [].slice.call(arguments));
            });
        });
        //	Update aria-hidden for hidden / visible listitems
        this.bind('updateListview', function () {
            _this.node.pnls
                .querySelectorAll('.mm-listitem')
                .forEach(function (listitem) {
                mmenu_oncanvas_1.default.sr_aria(listitem, 'hidden', listitem.matches('.mm-hidden'));
            });
        });
        //	Update aria-hidden for the panels when opening and closing a panel.
        this.bind('openPanel:start', function (panel) {
            /** Panels that should be considered "hidden". */
            var hidden = DOM.find(_this.node.pnls, '.mm-panel')
                .filter(function (hide) { return hide !== panel; })
                .filter(function (hide) { return !hide.parentElement.matches('.mm-panel'); });
            /** Panels that should be considered "visible". */
            var visible = [panel];
            DOM.find(panel, '.mm-listitem_vertical .mm-listitem_opened').forEach(function (listitem) {
                visible.push.apply(visible, DOM.children(listitem, '.mm-panel'));
            });
            //	Set the panels to be considered "hidden" or "visible".
            hidden.forEach(function (panel) {
                mmenu_oncanvas_1.default.sr_aria(panel, 'hidden', true);
            });
            visible.forEach(function (panel) {
                mmenu_oncanvas_1.default.sr_aria(panel, 'hidden', false);
            });
        });
        this.bind('closePanel', function (panel) {
            mmenu_oncanvas_1.default.sr_aria(panel, 'hidden', true);
        });
        //	Add aria-haspopup and aria-owns to prev- and next buttons.
        this.bind('initPanels:after', function (panels) {
            panels.forEach(function (panel) {
                DOM.find(panel, '.mm-btn').forEach(function (button) {
                    mmenu_oncanvas_1.default.sr_aria(button, 'haspopup', true);
                    var href = button.getAttribute('href');
                    if (href) {
                        mmenu_oncanvas_1.default.sr_aria(button, 'owns', href.replace('#', ''));
                    }
                });
            });
        });
        //	Add aria-hidden for navbars in panels.
        this.bind('initNavbar:after', function (panel) {
            /** The navbar in the panel. */
            var navbar = DOM.children(panel, '.mm-navbar')[0];
            /** Whether or not the navbar should be considered "hidden". */
            var hidden = navbar.matches('.mm-hidden');
            //	Set the navbar to be considered "hidden" or "visible".
            mmenu_oncanvas_1.default.sr_aria(navbar, 'hidden', hidden);
        });
        //	Text
        if (options.text) {
            //	Add aria-hidden to titles in navbars
            if (this.opts.navbar.titleLink == 'parent') {
                this.bind('initNavbar:after', function (panel) {
                    /** The navbar in the panel. */
                    var navbar = DOM.children(panel, '.mm-navbar')[0];
                    /** Whether or not the navbar should be considered "hidden". */
                    var hidden = navbar.querySelector('.mm-btn_prev')
                        ? true
                        : false;
                    //	Set the navbar-title to be considered "hidden" or "visible".
                    mmenu_oncanvas_1.default.sr_aria(DOM.find(navbar, '.mm-navbar__title')[0], 'hidden', hidden);
                });
            }
        }
    }
    //	Add screenreader text
    if (options.text) {
        //	Add screenreader / text hooks for add-ons
        //	In orde to keep this list short, only extend hooks that are actually used by other add-ons.
        this.bind('initAddons:after', function () {
            _this.bind('setPage:after', function () {
                this.trigger('setPage:after:sr-text', [].slice.call(arguments));
            });
            _this.bind('initBlocker:after', function () {
                this.trigger('initBlocker:after:sr-text', [].slice.call(arguments));
            });
        });
        //	Add text to the prev-buttons.
        this.bind('initNavbar:after', function (panel) {
            var navbar = DOM.children(panel, '.mm-navbar')[0];
            if (navbar) {
                var button = DOM.children(navbar, '.mm-btn_prev')[0];
                if (button) {
                    button.innerHTML = mmenu_oncanvas_1.default.sr_text(_this.i18n(configs.text.closeSubmenu));
                }
            }
        });
        //	Add text to the next-buttons.
        this.bind('initListview:after', function (panel) {
            var parent = panel['mmParent'];
            if (parent) {
                var next = DOM.children(parent, '.mm-btn_next')[0];
                if (next) {
                    var text = _this.i18n(configs.text[next.parentElement.matches('.mm-listitem_vertical')
                        ? 'toggleSubmenu'
                        : 'openSubmenu']);
                    next.innerHTML += mmenu_oncanvas_1.default.sr_text(text);
                }
            }
        });
    }
}
exports.default = default_1;
//	Methods
(function () {
    var attr = function (element, attr, value) {
        element[attr] = value;
        if (value) {
            element.setAttribute(attr, value.toString());
        }
        else {
            element.removeAttribute(attr);
        }
    };
    /**
     * Add aria (property and) attribute to a HTML element.
     *
     * @param {HTMLElement} 	element	The node to add the attribute to.
     * @param {string}			name	The (non-aria-prefixed) attribute name.
     * @param {string|boolean}	value	The attribute value.
     */
    mmenu_oncanvas_1.default.sr_aria = function (element, name, value) {
        attr(element, 'aria-' + name, value);
    };
    /**
     * Add role attribute to a HTML element.
     *
     * @param {HTMLElement}		element	The node to add the attribute to.
     * @param {string|boolean}	value	The attribute value.
     */
    mmenu_oncanvas_1.default.sr_role = function (element, value) {
        attr(element, 'role', value);
    };
    /**
     * Wrap a text in a screen-reader-only node.
     *
     * @param 	{string} text	The text to wrap.
     * @return	{string}		The wrapped text.
     */
    mmenu_oncanvas_1.default.sr_text = function (text) {
        return '<span class="mm-sronly">' + text + '</span>';
    };
})();
