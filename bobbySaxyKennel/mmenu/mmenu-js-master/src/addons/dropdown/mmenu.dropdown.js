"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("../../core/oncanvas/mmenu.oncanvas");
var _options_1 = require("./_options");
var _configs_1 = require("./_configs");
var DOM = require("../../core/_dom");
var _options_2 = require("./_options");
var _helpers_1 = require("../../core/_helpers");
//	Add the options and configs.
mmenu_oncanvas_1.default.options.dropdown = _options_1.default;
mmenu_oncanvas_1.default.configs.dropdown = _configs_1.default;
function default_1() {
    var _this = this;
    if (!this.opts.offCanvas) {
        return;
    }
    var options = _options_2.extendShorthandOptions(this.opts.dropdown);
    this.opts.dropdown = _helpers_1.extend(options, mmenu_oncanvas_1.default.options.dropdown);
    var configs = this.conf.dropdown;
    if (!options.drop) {
        return;
    }
    var button;
    this.bind('initMenu:after', function () {
        _this.node.menu.classList.add('mm-menu_dropdown');
        if (typeof options.position.of != 'string') {
            var id = _helpers_1.originalId(_this.node.menu.id);
            if (id && id.length) {
                options.position.of = '[href="#' + id + '"]';
            }
        }
        if (typeof options.position.of != 'string') {
            return;
        }
        //	Get the button to put the menu next to
        button = DOM.find(document.body, options.position.of)[0];
        //	Emulate hover effect
        var events = options.event.split(' ');
        if (events.length == 1) {
            events[1] = events[0];
        }
        if (events[0] == 'hover') {
            button.addEventListener('mouseenter', function (evnt) {
                _this.open();
            }, { passive: true });
        }
        if (events[1] == 'hover') {
            _this.node.menu.addEventListener('mouseleave', function (evnt) {
                _this.close();
            }, { passive: true });
        }
    });
    //	Add/remove classname and style when opening/closing the menu
    this.bind('open:start', function () {
        _this.node.menu['mmStyle'] = _this.node.menu.getAttribute('style');
        _this.node.wrpr.classList.add('mm-wrapper_dropdown');
    });
    this.bind('close:finish', function () {
        _this.node.menu.setAttribute('style', _this.node.menu['mmStyle']);
        _this.node.wrpr.classList.remove('mm-wrapper_dropdown');
    });
    /**
     * Find the position (x, y) and sizes (width, height) for the menu.
     *
     * @param  {string} dir The direction to measure ("x" for horizontal, "y" for vertical)
     * @param  {object} obj The object where (previously) measured values are stored.
     * @return {object}		The object where measered values are stored.
     */
    var getPosition = function (dir, obj) {
        var css = obj[0], cls = obj[1];
        var _scrollPos = dir == 'x' ? 'scrollX' : 'scrollY', _outerSize = dir == 'x' ? 'offsetWidth' : 'offsetHeight', _startPos = dir == 'x' ? 'left' : 'top', _stopPos = dir == 'x' ? 'right' : 'bottom', _size = dir == 'x' ? 'width' : 'height', _winSize = dir == 'x' ? 'innerWidth' : 'innerHeight', _maxSize = dir == 'x' ? 'maxWidth' : 'maxHeight', _position = null;
        var scrollPos = window[_scrollPos], startPos = DOM.offset(button, _startPos) - scrollPos, stopPos = startPos + button[_outerSize], windowSize = window[_winSize];
        /** Offset for the menu relative to the button. */
        var offs = configs.offset.button[dir] + configs.offset.viewport[dir];
        //	Position set in option
        if (options.position[dir]) {
            switch (options.position[dir]) {
                case 'left':
                case 'bottom':
                    _position = 'after';
                    break;
                case 'right':
                case 'top':
                    _position = 'before';
                    break;
            }
        }
        //	Position not set in option, find most space
        if (_position === null) {
            _position =
                startPos + (stopPos - startPos) / 2 < windowSize / 2
                    ? 'after'
                    : 'before';
        }
        //	Set position and max
        var val, max;
        if (_position == 'after') {
            val = dir == 'x' ? startPos : stopPos;
            max = windowSize - (val + offs);
            css[_startPos] = val + configs.offset.button[dir] + 'px';
            css[_stopPos] = 'auto';
            if (options.tip) {
                cls.push('mm-menu_tip-' + (dir == 'x' ? 'left' : 'top'));
            }
        }
        else {
            val = dir == 'x' ? stopPos : startPos;
            max = val - offs;
            css[_stopPos] =
                'calc( 100% - ' + (val - configs.offset.button[dir]) + 'px )';
            css[_startPos] = 'auto';
            if (options.tip) {
                cls.push('mm-menu_tip-' + (dir == 'x' ? 'right' : 'bottom'));
            }
        }
        if (options.fitViewport) {
            css[_maxSize] = Math.min(configs[_size].max, max) + 'px';
        }
        return [css, cls];
    };
    function position() {
        if (!this.vars.opened) {
            return;
        }
        this.node.menu.setAttribute('style', this.node.menu['mmStyle']);
        var obj = [{}, []];
        obj = getPosition.call(this, 'y', obj);
        obj = getPosition.call(this, 'x', obj);
        for (var s in obj[0]) {
            this.node.menu.style[s] = obj[0][s];
        }
        if (options.tip) {
            this.node.menu.classList.remove('mm-menu_tip-left', 'mm-menu_tip-right', 'mm-menu_tip-top', 'mm-menu_tip-bottom');
            (_a = this.node.menu.classList).add.apply(_a, obj[1]);
        }
        var _a;
    }
    this.bind('open:start', position);
    window.addEventListener('resize', function (evnt) {
        position.call(_this);
    }, { passive: true });
    if (!this.opts.offCanvas.blockUI) {
        window.addEventListener('scroll', function (evnt) {
            position.call(_this);
        }, { passive: true });
    }
}
exports.default = default_1;
