"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    this.conf.classNames.selected = 'current-menu-item';
    var wpadminbar = document.getElementById('wpadminbar');
    if (wpadminbar) {
        wpadminbar.style.position = 'fixed';
        wpadminbar.classList.add('mm-slideout');
    }
}
exports.default = default_1;
