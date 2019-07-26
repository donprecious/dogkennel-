"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("../../core/oncanvas/mmenu.oncanvas");
var DOM = require("../../core/_dom");
function default_1(navbar) {
    var _this = this;
    //	Add content
    var next = DOM.create('a.mm-btn.mm-btn_next.mm-navbar__btn');
    navbar.append(next);
    //	Update to opened panel
    var org;
    var _url, _txt;
    this.bind('openPanel:start', function (panel) {
        org = panel.querySelector('.' + _this.conf.classNames.navbars.panelNext);
        _url = org ? org.getAttribute('href') : '';
        _txt = org ? org.innerHTML : '';
        if (_url) {
            next.setAttribute('href', _url);
        }
        else {
            next.removeAttribute('href');
        }
        next.classList[_url || _txt ? 'remove' : 'add']('mm-hidden');
        next.innerHTML = _txt;
    });
    //	Add screenreader / aria support
    this.bind('openPanel:start:sr-aria', function (panel) {
        mmenu_oncanvas_1.default.sr_aria(next, 'hidden', next.matches('mm-hidden'));
        mmenu_oncanvas_1.default.sr_aria(next, 'owns', (next.getAttribute('href') || '').slice(1));
    });
}
exports.default = default_1;
;
