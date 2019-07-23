"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("../../core/oncanvas/mmenu.oncanvas");
var _options_1 = require("./_options");
var _configs_1 = require("./_configs");
var DOM = require("../../core/_dom");
var _options_2 = require("./_options");
var _helpers_1 = require("../../core/_helpers");
//	Add the options and configs.
mmenu_oncanvas_1.default.options.pageScroll = _options_1.default;
mmenu_oncanvas_1.default.configs.pageScroll = _configs_1.default;
function default_1() {
    var _this = this;
    var options = _options_2.extendShorthandOptions(this.opts.pageScroll);
    this.opts.pageScroll = _helpers_1.extend(options, mmenu_oncanvas_1.default.options.pageScroll);
    var configs = this.conf.pageScroll;
    var section;
    function scrollTo() {
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        section = null;
    }
    function anchorInPage(href) {
        try {
            if (href != '#' && href.slice(0, 1) == '#') {
                return mmenu_oncanvas_1.default.node.page.querySelector(href);
            }
            return null;
        }
        catch (err) {
            return null;
        }
    }
    //	Scroll to section after clicking menu item.
    if (options.scroll) {
        this.bind('close:finish', function () {
            scrollTo();
        });
    }
    //	Add click behavior.
    //	Prevents default behavior when clicking an anchor.
    if (this.opts.offCanvas && options.scroll) {
        this.clck.push(function (anchor, args) {
            section = null;
            //	Don't continue if the clicked anchor is not in the menu.
            if (!args.inMenu) {
                return;
            }
            //	Don't continue if the targeted section is not on the page.
            var href = anchor.getAttribute('href');
            section = anchorInPage(href);
            if (!section) {
                return;
            }
            //	If the sidebar add-on is "expanded"...
            if (_this.node.menu.matches('.mm-menu_sidebar-expanded') &&
                _this.node.wrpr.matches('.mm-wrapper_sidebar-expanded')) {
                //	... scroll the page to the section.
                scrollTo();
                //	... otherwise...
            }
            else {
                //	... close the menu.
                return {
                    close: true
                };
            }
        });
    }
    //	Update selected menu item after scrolling.
    if (options.update) {
        var scts_1 = [];
        this.bind('initListview:after', function (panel) {
            var listitems = DOM.find(panel, '.mm-listitem');
            DOM.filterLIA(listitems).forEach(function (anchor) {
                var href = anchor.getAttribute('href');
                var section = anchorInPage(href);
                if (section) {
                    scts_1.unshift(section);
                }
            });
        });
        var _selected_1 = -1;
        window.addEventListener('scroll', function (evnt) {
            var scrollTop = window.scrollY;
            for (var s = 0; s < scts_1.length; s++) {
                if (scts_1[s].offsetTop < scrollTop + configs.updateOffset) {
                    if (_selected_1 !== s) {
                        _selected_1 = s;
                        var panel = DOM.children(_this.node.pnls, '.mm-panel_opened')[0], listitems = DOM.find(panel, '.mm-listitem'), anchors = DOM.filterLIA(listitems);
                        anchors = anchors.filter(function (anchor) {
                            return anchor.matches('[href="#' + scts_1[s].id + '"]');
                        });
                        if (anchors.length) {
                            _this.setSelected(anchors[0].parentElement);
                        }
                    }
                    break;
                }
            }
        });
    }
}
exports.default = default_1;
