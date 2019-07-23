"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("../../core/oncanvas/mmenu.oncanvas");
var DOM = require("../../core/_dom");
function default_1(navbar) {
    var _this = this;
    //	Add content
    var close = DOM.create('a.mm-btn.mm-btn_close.mm-navbar__btn');
    navbar.append(close);
    //	Update to page node
    this.bind('setPage:after', function (page) {
        close.setAttribute('href', '#' + page.id);
    });
    //	Add screenreader / text support
    this.bind('setPage:after:sr-text', function () {
        close.innerHTML = mmenu_oncanvas_1.default.sr_text(_this.i18n(_this.conf.screenReader.text.closeMenu));
        mmenu_oncanvas_1.default.sr_aria(close, 'owns', close.getAttribute('href').slice(1));
    });
}
exports.default = default_1;
;
