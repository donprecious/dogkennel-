"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("../../core/oncanvas/mmenu.oncanvas");
var _options_1 = require("./_options");
var DOM = require("../../core/_dom");
var _options_2 = require("./_options");
var _helpers_1 = require("../../core/_helpers");
//	Add the options.
mmenu_oncanvas_1.default.options.columns = _options_1.default;
function default_1() {
    var _this = this;
    var options = _options_2.extendShorthandOptions(this.opts.columns);
    this.opts.columns = _helpers_1.extend(options, mmenu_oncanvas_1.default.options.columns);
    //	Add the columns
    if (options.add) {
        options.visible.min = Math.max(1, Math.min(6, options.visible.min));
        options.visible.max = Math.max(options.visible.min, Math.min(6, options.visible.max));
        /** Columns related clasnames for the menu. */
        var colm = '';
        /** Columns related clasnames for the panels. */
        var colp = '';
        for (var i = 0; i <= options.visible.max; i++) {
            colm += ' mm-menu_columns-' + i;
            colp += ' mm-panel_columns-' + i;
        }
        if (colm.length) {
            colm = colm.slice(1);
            colp = colp.slice(1);
        }
        /** Classnames to remove from panels in favor of showing columns. */
        var rmvc = colp + ' mm-panel_opened mm-panel_opened-parent mm-panel_highest';
        //	Close all later opened panels
        this.bind('openPanel:before', function (panel) {
            /** The parent panel. */
            var parent;
            if (panel) {
                parent = panel['mmParent'];
            }
            if (!parent) {
                return;
            }
            parent = parent.closest('.mm-panel');
            if (!parent) {
                return;
            }
            var classname = parent.className;
            if (!classname.length) {
                return;
            }
            classname = classname.split('mm-panel_columns-')[1];
            if (!classname) {
                return;
            }
            var colnr = parseInt(classname.split(' ')[0], 10) + 1;
            while (colnr > 0) {
                panel = DOM.children(_this.node.pnls, '.mm-panel_columns-' + colnr)[0];
                if (panel) {
                    colnr++;
                    panel.classList.remove(rmvc);
                    panel.classList.add('mm-hidden');
                }
                else {
                    colnr = -1;
                    break;
                }
            }
        });
        this.bind('openPanel:start', function (panel) {
            var columns = DOM.children(_this.node.pnls, '.mm-panel_opened-parent').length;
            if (!panel.matches('.mm-panel_opened-parent')) {
                columns++;
            }
            columns = Math.min(options.visible.max, Math.max(options.visible.min, columns));
            (_a = _this.node.menu.classList).remove.apply(_a, colm.split(' '));
            _this.node.menu.classList.add('mm-menu_columns-' + columns);
            var panels = [];
            DOM.children(_this.node.pnls, '.mm-panel').forEach(function (panel) {
                (_a = panel.classList).remove.apply(_a, colp.split(' '));
                if (panel.matches('.mm-panel_opened-parent')) {
                    panels.push(panel);
                }
                var _a;
            });
            panels.push(panel);
            panels.slice(-options.visible.max).forEach(function (panel, p) {
                panel.classList.add('mm-panel_columns-' + p);
            });
            var _a;
        });
    }
}
exports.default = default_1;
