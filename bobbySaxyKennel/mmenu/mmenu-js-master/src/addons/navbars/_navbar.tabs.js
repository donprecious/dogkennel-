"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOM = require("../../core/_dom");
function default_1(navbar) {
    var _this = this;
    navbar.classList.add('mm-navbar_tabs');
    navbar.parentElement.classList.add('mm-navbars_has-tabs');
    var anchors = DOM.children(navbar, 'a');
    navbar.addEventListener('click', function (evnt) {
        var anchor = evnt.target;
        if (!anchor.matches('a')) {
            return;
        }
        if (anchor.matches('.mm-navbar__tab_selected')) {
            evnt.stopImmediatePropagation();
            return;
        }
        try {
            _this.openPanel(_this.node.menu.querySelector(anchor.getAttribute('href')), false);
            evnt.stopImmediatePropagation();
        }
        catch (err) { }
    });
    function selectTab(panel) {
        anchors.forEach(function (anchor) {
            anchor.classList.remove('mm-navbar__tab_selected');
        });
        var anchor = anchors.filter(function (anchor) { return anchor.matches('[href="#' + panel.id + '"]'); })[0];
        if (anchor) {
            anchor.classList.add('mm-navbar__tab_selected');
        }
        else {
            var parent = panel['mmParent'];
            if (parent) {
                selectTab.call(this, parent.closest('.mm-panel'));
            }
        }
    }
    this.bind('openPanel:start', selectTab);
}
exports.default = default_1;
;
