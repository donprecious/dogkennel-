"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("../../core/oncanvas/mmenu.oncanvas");
var _options_1 = require("./_options");
var DOM = require("../../core/_dom");
var support = require("../../core/_support");
var _options_2 = require("./_options");
var _helpers_1 = require("../../core/_helpers");
//  Add the options.
mmenu_oncanvas_1.default.options.sectionIndexer = _options_1.default;
function default_1() {
    var _this = this;
    var options = _options_2.extendShorthandOptions(this.opts.sectionIndexer);
    this.opts.sectionIndexer = _helpers_1.extend(options, mmenu_oncanvas_1.default.options.sectionIndexer);
    if (!options.add) {
        return;
    }
    this.bind('initPanels:after', function (panels) {
        //	Set the panel(s)
        if (options.addTo != 'panels') {
            panels = DOM.find(_this.node.menu, options.addTo).filter(function (panel) {
                return panel.matches('.mm-panel');
            });
        }
        //	Add the indexer, only if it does not allready excists
        if (!_this.node.indx) {
            var buttons_1 = '';
            'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function (letter) {
                buttons_1 += '<a href="#">' + letter + '</a>';
            });
            var indexer = DOM.create('div.mm-sectionindexer');
            indexer.innerHTML = buttons_1;
            _this.node.pnls.prepend(indexer);
            _this.node.indx = indexer;
            //	Prevent default behavior when clicking an anchor
            _this.node.indx.addEventListener('click', function (evnt) {
                var anchor = evnt.target;
                if (anchor.matches('a')) {
                    evnt.preventDefault();
                }
            });
            //	Scroll onMouseOver / onTouchStart
            var mouseOverEvent = function (evnt) {
                if (!evnt.target.matches('a')) {
                    return;
                }
                var letter = evnt.target.textContent, panel = DOM.children(_this.node.pnls, '.mm-panel_opened')[0];
                var newTop = -1, oldTop = panel.scrollTop;
                panel.scrollTop = 0;
                DOM.find(panel, '.mm-divider')
                    .filter(function (divider) { return !divider.matches('.mm-hidden'); })
                    .forEach(function (divider) {
                    if (newTop < 0 &&
                        letter ==
                            divider.textContent
                                .trim()
                                .slice(0, 1)
                                .toLowerCase()) {
                        newTop = divider.offsetTop;
                    }
                });
                panel.scrollTop = newTop > -1 ? newTop : oldTop;
            };
            if (support.touch) {
                _this.node.indx.addEventListener('touchstart', mouseOverEvent);
                _this.node.indx.addEventListener('touchmove', mouseOverEvent);
            }
            else {
                _this.node.indx.addEventListener('mouseover', mouseOverEvent);
            }
        }
        //	Show or hide the indexer
        _this.bind('openPanel:start', function (panel) {
            var active = DOM.find(panel, '.mm-divider').filter(function (divider) { return !divider.matches('.mm-hidden'); }).length;
            _this.node.indx.classList[active ? 'add' : 'remove']('mm-sectionindexer_active');
        });
    });
}
exports.default = default_1;
