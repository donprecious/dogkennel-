"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("../../core/oncanvas/mmenu.oncanvas");
var _options_1 = require("./_options");
var DOM = require("../../core/_dom");
var _options_2 = require("./_options");
var _helpers_1 = require("../../core/_helpers");
//	Add the options.
mmenu_oncanvas_1.default.options.counters = _options_1.default;
//	Add the classnames.
mmenu_oncanvas_1.default.configs.classNames.counters = {
    counter: 'Counter'
};
function default_1() {
    var _this = this;
    var options = _options_2.extendShorthandOptions(this.opts.counters);
    this.opts.counters = _helpers_1.extend(options, mmenu_oncanvas_1.default.options.counters);
    //	Refactor counter class
    this.bind('initListview:after', function (panel) {
        var cntrclss = _this.conf.classNames.counters.counter, counters = panel.querySelectorAll('.' + cntrclss);
        counters.forEach(function (counter) {
            DOM.reClass(counter, cntrclss, 'mm-counter');
        });
    });
    //	Add the counters after a listview is initiated.
    if (options.add) {
        this.bind('initListview:after', function (panel) {
            if (!panel.matches(options.addTo)) {
                return;
            }
            var parent = panel['mmParent'];
            if (parent) {
                //	Check if no counter already excists.
                if (!parent.querySelector('.mm-counter')) {
                    var counter = DOM.create('span.mm-counter');
                    var btn = DOM.children(parent, '.mm-btn')[0];
                    if (btn) {
                        btn.prepend(counter);
                    }
                }
            }
        });
    }
    if (options.count) {
        var count = function (panel) {
            var panels = panel
                ? [panel]
                : DOM.children(_this.node.pnls, '.mm-panel');
            panels.forEach(function (panel) {
                var parent = panel['mmParent'];
                if (!parent) {
                    return;
                }
                var counter = parent.querySelector('.mm-counter');
                if (!counter) {
                    return;
                }
                var listitems = [];
                DOM.children(panel, '.mm-listview').forEach(function (listview) {
                    listitems.push.apply(listitems, DOM.children(listview));
                });
                counter.innerHTML = DOM.filterLI(listitems).length.toString();
            });
        };
        this.bind('initListview:after', count);
        this.bind('updateListview', count);
    }
}
exports.default = default_1;
