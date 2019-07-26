"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mmenu_oncanvas_1 = require("../../core/oncanvas/mmenu.oncanvas");
var _options_1 = require("./_options");
var _configs_1 = require("./_configs");
var DOM = require("../../core/_dom");
var _options_2 = require("./_options");
var _helpers_1 = require("../../core/_helpers");
//	Add the options and configs.
mmenu_oncanvas_1.default.options.drag = _options_1.default;
mmenu_oncanvas_1.default.configs.drag = _configs_1.default;
function default_1() {
    var _this = this;
    if (!this.opts.offCanvas) {
        return;
    }
    if (typeof window['Hammer'] != 'function' || window['Hammer'].VERSION < 2) {
        return;
    }
    var options = _options_2.extendShorthandOptions(this.opts.drag);
    this.opts.drag = _helpers_1.extend(options, mmenu_oncanvas_1.default.options.drag);
    var configs = this.conf.drag;
    function minMax(val, min, max) {
        if (val < min) {
            val = min;
        }
        if (val > max) {
            val = max;
        }
        return val;
    }
    //	Drag open the menu
    if (options.menu.open) {
        this.bind('setPage:after', function () {
            //	defaults for "left"
            var drag = {
                events: 'panleft panright',
                typeLower: 'x',
                typeUpper: 'X',
                open_dir: 'right',
                close_dir: 'left',
                negative: false
            };
            var _dimension = 'width', _winDimension = 'innerWidth', _direction = drag.open_dir;
            var doPanstart = function (pos) {
                if (pos <= options.menu.maxStartPos) {
                    _stage = 1;
                }
            };
            var getSlideNodes = function () {
                return DOM.find(document.body, '.mm-slideout');
            };
            var _stage = 0, _distance = 0, _maxDistance = 0;
            var new_distance, drag_distance;
            //	Find menu position from Positioning extension
            var x = _this.opts.extensions['all'];
            var position = typeof x == 'undefined'
                ? 'left'
                : x.indexOf('mm-menu_position-right') > -1
                    ? 'right'
                    : x.indexOf('mm-menu_position-top') > -1
                        ? 'top'
                        : x.indexOf('mm-menu_position-bottom') > -1
                            ? 'bottom'
                            : 'left';
            var zposition = typeof x == 'undefined'
                ? 'back'
                : x.indexOf('mm-menu_position-top') > -1 ||
                    x.indexOf('mm-menu_position-bottom') > -1 ||
                    x.indexOf('mm-menu_position-front') > -1
                    ? 'front'
                    : 'back';
            switch (position) {
                case 'top':
                case 'bottom':
                    drag.events = 'panup pandown';
                    drag.typeLower = 'y';
                    drag.typeUpper = 'Y';
                    _dimension = 'height';
                    _winDimension = 'innerHeight';
                    break;
            }
            switch (position) {
                case 'right':
                case 'bottom':
                    drag.negative = true;
                    doPanstart = function (pos) {
                        if (pos >=
                            window[_winDimension] - options.menu.maxStartPos) {
                            _stage = 1;
                        }
                    };
                    break;
            }
            switch (position) {
                case 'right':
                    drag.open_dir = 'left';
                    drag.close_dir = 'right';
                    break;
                case 'top':
                    drag.open_dir = 'down';
                    drag.close_dir = 'up';
                    break;
                case 'bottom':
                    drag.open_dir = 'up';
                    drag.close_dir = 'down';
                    break;
            }
            switch (zposition) {
                case 'front':
                    getSlideNodes = function () {
                        return [this.node.menu];
                    };
                    break;
            }
            var slideOutNodes;
            var dragNode = _helpers_1.valueOrFn(_this.node.menu, options.menu.node, mmenu_oncanvas_1.default.node.page);
            if (typeof dragNode == 'string') {
                dragNode = document.querySelector(dragNode);
            }
            //	Bind events
            var _hammer = new window['Hammer'](dragNode, _this.opts.drag.vendors.hammer);
            _hammer.on('panstart', function (evnt) {
                doPanstart.call(_this, evnt.center[drag.typeLower]);
                slideOutNodes = getSlideNodes.call(_this);
                _direction = drag.open_dir;
            });
            _hammer.on(drag.events + ' panend', function (evnt) {
                if (_stage > 0) {
                    evnt.preventDefault();
                }
            });
            _hammer.on(drag.events, function (evnt) {
                new_distance = evnt['delta' + drag.typeUpper];
                if (drag.negative) {
                    new_distance = -new_distance;
                }
                if (new_distance != _distance) {
                    _direction =
                        new_distance >= _distance
                            ? drag.open_dir
                            : drag.close_dir;
                }
                _distance = new_distance;
                if (_distance > options.menu.threshold) {
                    if (_stage == 1) {
                        if (_this.node.wrpr.matches('.mm-wrapper_opened')) {
                            return;
                        }
                        _stage = 2;
                        _this._openSetup();
                        _this.trigger('open:start');
                        _this.node.wrpr.classList.add('mm-wrapper_dragging');
                        _maxDistance = minMax(window[_winDimension] *
                            configs.menu[_dimension].perc, configs.menu[_dimension].min, configs.menu[_dimension].max);
                    }
                }
                if (_stage == 2) {
                    drag_distance =
                        minMax(_distance, 10, _maxDistance) -
                            (zposition == 'front' ? _maxDistance : 0);
                    if (drag.negative) {
                        drag_distance = -drag_distance;
                    }
                    var css_value_1 = 'translate' +
                        drag.typeUpper +
                        '(' +
                        drag_distance +
                        'px )';
                    slideOutNodes.forEach(function (node) {
                        node.style['-webkit-transform'] =
                            '-webkit-' + css_value_1;
                        node.style['transform'] = css_value_1;
                    });
                }
            });
            _hammer.on('panend', function (evnt) {
                if (_stage == 2) {
                    _this.node.wrpr.classList.remove('mm-wrapper_dragging');
                    slideOutNodes.forEach(function (node) {
                        node.style['-webkit-transform'] = '';
                        node.style['transform'] = '';
                    });
                    _this[_direction == drag.open_dir ? '_openStart' : 'close']();
                }
                _stage = 0;
            });
        });
    }
    //	Drag close panels
    if (options.panels.close) {
        this.bind('initPanel:after', function (panel) {
            var parent = panel['mmParent '];
            if (parent) {
                parent = parent.closest('.mm-panel');
                var _hammer = new window['Hammer'](panel, _this.opts.drag.vendors.hammer), timeout = null;
                _hammer.on('panright', function (evnt) {
                    if (timeout) {
                        return;
                    }
                    _this.openPanel(parent);
                    //	prevent dragging while panel still open.
                    timeout = setTimeout(function () {
                        clearTimeout(timeout);
                        timeout = null;
                    }, _this.conf.openingInterval + _this.conf.transitionDuration);
                });
            }
        });
    }
}
exports.default = default_1;
