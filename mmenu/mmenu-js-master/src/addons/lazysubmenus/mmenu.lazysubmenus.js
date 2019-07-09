"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("../../core/oncanvas/mmenu.oncanvas");
var _options_1 = require("./_options");
var DOM = require("../../core/_dom");
var _options_2 = require("./_options");
var _helpers_1 = require("../../core/_helpers");
//	Add the options.
mmenu_oncanvas_1.default.options.lazySubmenus = _options_1.default;
function default_1() {
    var _this = this;
    var options = _options_2.extendShorthandOptions(this.opts.lazySubmenus);
    this.opts.lazySubmenus = _helpers_1.extend(options, mmenu_oncanvas_1.default.options.lazySubmenus);
    //	Sliding submenus
    if (options.load) {
        //	prevent all sub panels from initPanels
        this.bind('initMenu:after', function () {
            var panels = [];
            //	Find all potential subpanels
            DOM.find(_this.node.pnls, 'li').forEach(function (listitem) {
                panels.push.apply(panels, DOM.children(listitem, _this.conf.panelNodetype.join(', ')));
            });
            //	Filter out all non-panels and add the lazyload classes
            panels
                .filter(function (panel) { return !panel.matches('.mm-listview_inset'); })
                .filter(function (panel) { return !panel.matches('.mm-nolistview'); })
                .filter(function (panel) { return !panel.matches('.mm-nopanel'); })
                .forEach(function (panel) {
                panel.classList.add('mm-panel_lazysubmenu', 'mm-nolistview', 'mm-nopanel');
            });
        });
        //	prepare current and one level sub panels for initPanels
        this.bind('initPanels:before', function (panels) {
            panels =
                panels ||
                    DOM.children(_this.node.pnls, _this.conf.panelNodetype.join(', '));
            panels.forEach(function (panel) {
                var filter = '.mm-panel_lazysubmenu', panels = DOM.find(panel, filter);
                if (panel.matches(filter)) {
                    panels.unshift(panel);
                }
                panels
                    .filter(function (panel) {
                    return !panel.matches('.mm-panel_lazysubmenu .mm-panel_lazysubmenu');
                })
                    .forEach(function (panel) {
                    panel.classList.remove('mm-panel_lazysubmenu', 'mm-nolistview', 'mm-nopanel');
                });
            });
        });
        //	initPanels for the default opened panel
        this.bind('initOpened:before', function () {
            var panels = [];
            DOM.find(_this.node.pnls, '.' + _this.conf.classNames.selected).forEach(function (listitem) {
                panels.push.apply(panels, DOM.parents(listitem, '.mm-panel_lazysubmenu'));
            });
            if (panels.length) {
                panels.forEach(function (panel) {
                    panel.classList.remove('mm-panel_lazysubmenu', 'mm-nolistview mm-nopanel');
                });
                _this.initPanels([panels[panels.length - 1]]);
            }
        });
        //	initPanels for current- and sub panels before openPanel
        this.bind('openPanel:before', function (panel) {
            var filter = '.mm-panel_lazysubmenu', panels = DOM.find(panel, filter);
            if (panel.matches(filter)) {
                panels.unshift(panel);
            }
            panels = panels.filter(function (panel) {
                return !panel.matches('.mm-panel_lazysubmenu .mm-panel_lazysubmenu');
            });
            if (panels.length) {
                _this.initPanels(panels);
            }
        });
    }
}
exports.default = default_1;
