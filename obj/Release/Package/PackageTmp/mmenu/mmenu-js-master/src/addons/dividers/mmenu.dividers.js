"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("../../core/oncanvas/mmenu.oncanvas");
var _options_1 = require("./_options");
var DOM = require("../../core/_dom");
var _options_2 = require("./_options");
var _helpers_1 = require("../../core/_helpers");
//	Add the options.
mmenu_oncanvas_1.default.options.dividers = _options_1.default;
//  Add the classnames.
mmenu_oncanvas_1.default.configs.classNames.divider = 'Divider';
function default_1() {
    var _this = this;
    var options = _options_2.extendShorthandOptions(this.opts.dividers);
    this.opts.dividers = _helpers_1.extend(options, mmenu_oncanvas_1.default.options.dividers);
    //	Refactor divider classname
    this.bind('initListview:after', function (panel) {
        var listviews = DOM.children(panel, 'ul, ol');
        listviews.forEach(function (listview) {
            DOM.children(listview).forEach(function (listitem) {
                DOM.reClass(listitem, _this.conf.classNames.divider, 'mm-divider');
                if (listitem.matches('.mm-divider')) {
                    listitem.classList.remove('mm-listitem');
                }
            });
        });
    });
    //	Add classname to the menu to specify the type of the dividers
    if (options.type) {
        this.bind('initMenu:after', function () {
            _this.node.menu.classList.add('mm-menu_dividers-' + options.type);
        });
    }
    //	Add dividers
    if (options.add) {
        this.bind('initListview:after', function (panel) {
            if (!panel.matches(options.addTo)) {
                return;
            }
            DOM.find(panel, '.mm-divider').forEach(function (divider) {
                divider.remove();
            });
            DOM.find(panel, '.mm-listview').forEach(function (listview) {
                var lastletter = '', listitems = DOM.children(listview);
                DOM.filterLI(listitems).forEach(function (listitem) {
                    var letter = DOM.children(listitem, '.mm-listitem__text')[0]
                        .textContent.trim()
                        .toLowerCase()[0];
                    if (letter.length && letter != lastletter) {
                        lastletter = letter;
                        var divider = DOM.create('li.mm-divider');
                        divider.textContent = letter;
                        listview.insertBefore(divider, listitem);
                    }
                });
            });
        });
    }
}
exports.default = default_1;
