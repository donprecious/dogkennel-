//unminified
(function (a) {
    a.fn.accordion = function () {
        var c = this;
        a(c).addClass("accordion");
        var b = null;
        a(c).children("li").each(function (d, f) {
            a(f).children("ul").children("li").mouseenter(function () {
                a(this).addClass("hover")
            });
            a(f).children("ul").children("li").mouseleave(function () {
                a(this).removeClass("hover")
            });
            if (a(f).children("ul").children("li.active").length > 0) {
                b = a(f)
            }
            a(f).children("a").click(function () {
                var e = a(this).parent().get(0);
                a(e).parent().children("li").each(function (g, h) {
                    if (h != e) {
                        a(h).children("ul").slideUp()
                    }
                });
                a(e).children("ul").slideDown();
                return false
            })
        });
        if (b != null) {
            b.children("ul").show()
        }
    }
})(jQuery);
(function (a) {
    function b(g) {
        var l = {
            stepTime: 60,
            format: "dd:hh:mm:ss",
            startTime: "01:12:32:55",
            digitImages: 6,
            digitWidth: 53,
            digitHeight: 77,
            autoStart: true,
            timerEnd: function () { },
            image: "digits.png"
        };
        var d = [],
            e;

        function j(r) {
            var z = 0,
                A = 0,
                C = 0,
                q = 0,
                B, w, D, y;
            if ((typeof l.startTime == "object") && (l.startTime.constructor == Date)) {
                var n = new Date();
                if (l.startTime.getTime() < n.getTime()) {
                    l.startTime.setFullYear(l.startTime.getFullYear() + 1)
                }
                var p = Math.ceil((l.startTime.getTime() - n.getTime()) / 1000);
                var o = Math.floor(p / 86400);
                var x = Math.floor((p % 86400) / 3600);
                var u = Math.floor(((p % 86400) % 3600) / 60);
                var s = ((p % 86400) % 3600) % 60;
                l.startTime = o + ":" + x + ":" + u + ":" + s
            }
            D = l.startTime.split("");
            B = 0;
            for (w = 0; w < D.length; w++) {
                if (isNaN(parseInt(D[w]))) {
                    B = B + 1
                }
            }
            var t = l.startTime.split(":");
            var m = "";
            for (w = 0; w < t.length; w++) {
                var v = 59;
                if (t.length == 3) {
                    if (w === 0) {
                        v = 9999
                    }
                }
                if (t.length == 4) {
                    if (w === 0) {
                        v = 9999
                    }
                    if (w === 1) {
                        v = 23
                    }
                }
                if (t[w] > v) {
                    t[w] = v
                }
                if (t[w].length < 2) {
                    t[w] = "0" + t[w]
                }
            }
            l.startTime = t.join(":");
            switch (B) {
                case 3:
                    if (l.startTime.split(":")[0].length == 3) {
                        l.format = "ddd:hh:mm:ss"
                    } else {
                        l.format = "dd:hh:mm:ss"
                    }
                    break;
                case 2:
                    l.format = "hh:mm:ss";
                    break;
                case 1:
                    l.format = "mm:ss";
                    break;
                case 0:
                    l.format = "ss";
                    break
            }
            l.startTime = l.startTime.split("");
            l.format = l.format.split("");
            for (w = 0; w < l.startTime.length; w++) {
                if (parseInt(l.startTime[w]) >= 0) {
                    y = jQuery('<div id="cnt_' + w + '" class="cntDigit" />').css({
                        height: l.digitHeight * l.digitImages * 10,
                        "float": "left",
                        background: "url('" + l.image + "')",
                        width: l.digitWidth
                    });
                    d.push(y);
                    f(z, -((parseInt(l.startTime[w]) * l.digitHeight * l.digitImages)));
                    d[z].__max = 9;
                    switch (l.format[w]) {
                        case "h":
                            if (A < 1) {
                                d[z].__max = 2;
                                A = 1
                            } else {
                                d[z].__condmax = 3
                            }
                            break;
                        case "d":
                            d[z].__max = 9;
                            break;
                        case "m":
                            if (C < 1) {
                                d[z].__max = 5;
                                C = 1
                            } else {
                                d[z].__condmax = 9
                            }
                            break;
                        case "s":
                            if (q < 1) {
                                d[z].__max = 5;
                                q = 1
                            } else {
                                d[z].__condmax = 9
                            }
                            break
                    }++z
                } else {
                    y = jQuery('<div class="cntSeparator"/>').css({
                        "float": "left"
                    }).text(l.startTime[w])
                }
                r.append("<div>");
                r.append(y);
                r.append("</div>")
            }
        }

        function f(m, n) {
            if (n !== undefined) {
                return d[m].css({
                    marginTop: n + "px"
                })
            }
            return parseInt(d[m].css("marginTop").replace("px", ""))
        }

        function h(n) {
            var m;
            d[n]._digitInitial = -(d[n].__max * l.digitHeight * l.digitImages);
            return function o() {
                m = f(n) + l.digitHeight;
                if (m == l.digitHeight) {
                    f(n, d[n]._digitInitial);
                    if (n > 0) {
                        h(n - 1)()
                    } else {
                        clearInterval(e);
                        for (var p = 0; p < d.length; p++) {
                            f(p, 0)
                        }
                        l.timerEnd();
                        return
                    }
                    if ((n > 0) && (d[n].__condmax !== undefined) && (d[n - 1]._digitInitial == f(n - 1))) {
                        f(n, -(d[n].__condmax * l.digitHeight * l.digitImages))
                    }
                    return
                }
                f(n, m);
                if (f(n) / l.digitHeight % l.digitImages !== 0) {
                    setTimeout(o, l.stepTime)
                }
                if (m === 0) {
                    d[n].__isma = true
                }
            }
        }

        function c() {
            if (e === undefined) {
                e = setInterval(h(d.length - 1), 1000)
            }
        }

        function k() {
            if (e) {
                window.clearInterval(e);
                e = undefined
            }
        }
        this.data("countdown", {
            start: c,
            pause: k
        });
        a.extend(l, g);
        this.css({
            height: l.digitHeight,
            overflow: "hidden"
        });
        j(this);
        if (l.autoStart) {
            c()
        }
    }
    a.fn.countdown = function (d) {
        var c = this.data("countdown");
        if (c && c[d]) {
            return c[d].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof d === "object" || !d) {
                return b.apply(this, arguments)
            } else {
                a.error("Method " + d + " does not exist on jQuery.countdown")
            }
        }
    }
})(jQuery);
(function (c) {
    var b = {
        init: function (e) {
            var f = {
                set_width: false,
                set_height: false,
                horizontalScroll: false,
                scrollInertia: 950,
                mouseWheel: true,
                mouseWheelPixels: "auto",
                autoDraggerLength: true,
                autoHideScrollbar: false,
                alwaysShowScrollbar: false,
                snapAmount: null,
                snapOffset: 0,
                scrollButtons: {
                    enable: false,
                    scrollType: "continuous",
                    scrollSpeed: "auto",
                    scrollAmount: 40
                },
                advanced: {
                    updateOnBrowserResize: true,
                    updateOnContentResize: false,
                    autoExpandHorizontalScroll: false,
                    autoScrollOnFocus: true,
                    normalizeMouseWheelDelta: false
                },
                contentTouchScroll: true,
                callbacks: {
                    onScrollStart: function () { },
                    onScroll: function () { },
                    onTotalScroll: function () { },
                    onTotalScrollBack: function () { },
                    onTotalScrollOffset: 0,
                    onTotalScrollBackOffset: 0,
                    whileScrolling: function () { }
                },
                theme: "light"
            },
                e = c.extend(true, f, e);
            return this.each(function () {
                var n = c(this);
                if (e.set_width) {
                    n.css("width", e.set_width)
                }
                if (e.set_height) {
                    n.css("height", e.set_height)
                }
                if (!c(document).data("mCustomScrollbar-index")) {
                    c(document).data("mCustomScrollbar-index", "1")
                } else {
                    var u = parseInt(c(document).data("mCustomScrollbar-index"));
                    c(document).data("mCustomScrollbar-index", u + 1)
                }
                n.wrapInner("<div class='mCustomScrollBox mCS-" + e.theme + "' id='mCSB_" + c(document).data("mCustomScrollbar-index") + "' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_" + c(document).data("mCustomScrollbar-index"));
                var g = n.children(".mCustomScrollBox");
                if (e.horizontalScroll) {
                    g.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");
                    var l = g.children(".mCSB_h_wrapper");
                    l.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({
                        width: l.children().outerWidth(),
                        position: "relative"
                    }).unwrap()
                } else {
                    g.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />")
                }
                var p = g.children(".mCSB_container");
                if (c.support.touch) {
                    p.addClass("mCS_touch")
                }
                p.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");
                var m = g.children(".mCSB_scrollTools"),
                    h = m.children(".mCSB_draggerContainer"),
                    r = h.children(".mCSB_dragger");
                if (e.horizontalScroll) {
                    r.data("minDraggerWidth", r.width())
                } else {
                    r.data("minDraggerHeight", r.height())
                }
                if (e.scrollButtons.enable) {
                    if (e.horizontalScroll) {
                        m.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>")
                    } else {
                        m.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")
                    }
                }
                g.bind("scroll", function () {
                    if (!n.is(".mCS_disabled")) {
                        g.scrollTop(0).scrollLeft(0)
                    }
                });
                n.data({
                    mCS_Init: true,
                    mCustomScrollbarIndex: c(document).data("mCustomScrollbar-index"),
                    horizontalScroll: e.horizontalScroll,
                    scrollInertia: e.scrollInertia,
                    scrollEasing: "mcsEaseOut",
                    mouseWheel: e.mouseWheel,
                    mouseWheelPixels: e.mouseWheelPixels,
                    autoDraggerLength: e.autoDraggerLength,
                    autoHideScrollbar: e.autoHideScrollbar,
                    alwaysShowScrollbar: e.alwaysShowScrollbar,
                    snapAmount: e.snapAmount,
                    snapOffset: e.snapOffset,
                    scrollButtons_enable: e.scrollButtons.enable,
                    scrollButtons_scrollType: e.scrollButtons.scrollType,
                    scrollButtons_scrollSpeed: e.scrollButtons.scrollSpeed,
                    scrollButtons_scrollAmount: e.scrollButtons.scrollAmount,
                    autoExpandHorizontalScroll: e.advanced.autoExpandHorizontalScroll,
                    autoScrollOnFocus: e.advanced.autoScrollOnFocus,
                    normalizeMouseWheelDelta: e.advanced.normalizeMouseWheelDelta,
                    contentTouchScroll: e.contentTouchScroll,
                    onScrollStart_Callback: e.callbacks.onScrollStart,
                    onScroll_Callback: e.callbacks.onScroll,
                    onTotalScroll_Callback: e.callbacks.onTotalScroll,
                    onTotalScrollBack_Callback: e.callbacks.onTotalScrollBack,
                    onTotalScroll_Offset: e.callbacks.onTotalScrollOffset,
                    onTotalScrollBack_Offset: e.callbacks.onTotalScrollBackOffset,
                    whileScrolling_Callback: e.callbacks.whileScrolling,
                    bindEvent_scrollbar_drag: false,
                    bindEvent_content_touch: false,
                    bindEvent_scrollbar_click: false,
                    bindEvent_mousewheel: false,
                    bindEvent_buttonsContinuous_y: false,
                    bindEvent_buttonsContinuous_x: false,
                    bindEvent_buttonsPixels_y: false,
                    bindEvent_buttonsPixels_x: false,
                    bindEvent_focusin: false,
                    bindEvent_autoHideScrollbar: false,
                    mCSB_buttonScrollRight: false,
                    mCSB_buttonScrollLeft: false,
                    mCSB_buttonScrollDown: false,
                    mCSB_buttonScrollUp: false
                });
                if (e.horizontalScroll) {
                    if (n.css("max-width") !== "none") {
                        if (!e.advanced.updateOnContentResize) {
                            e.advanced.updateOnContentResize = true
                        }
                    }
                } else {
                    if (n.css("max-height") !== "none") {
                        var t = false,
                            s = parseInt(n.css("max-height"));
                        if (n.css("max-height").indexOf("%") >= 0) {
                            t = s, s = n.parent().height() * t / 100
                        }
                        n.css("overflow", "hidden");
                        g.css("max-height", s)
                    }
                }
                n.mCustomScrollbar("update");
                if (e.advanced.updateOnBrowserResize) {
                    var j, k = c(window).width(),
                        v = c(window).height();
                    c(window).bind("resize." + n.data("mCustomScrollbarIndex"), function () {
                        if (j) {
                            clearTimeout(j)
                        }
                        j = setTimeout(function () {
                            if (!n.is(".mCS_disabled") && !n.is(".mCS_destroyed")) {
                                var x = c(window).width(),
                                    w = c(window).height();
                                if (k !== x || v !== w) {
                                    if (n.css("max-height") !== "none" && t) {
                                        g.css("max-height", n.parent().height() * t / 100)
                                    }
                                    n.mCustomScrollbar("update");
                                    k = x;
                                    v = w
                                }
                            }
                        }, 150)
                    })
                }
                if (e.advanced.updateOnContentResize) {
                    var q;
                    if (e.horizontalScroll) {
                        var o = p.outerWidth()
                    } else {
                        var o = p.outerHeight()
                    }
                    q = setInterval(function () {
                        if (e.horizontalScroll) {
                            if (e.advanced.autoExpandHorizontalScroll) {
                                p.css({
                                    position: "absolute",
                                    width: "auto"
                                }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                                    width: p.outerWidth(),
                                    position: "relative"
                                }).unwrap()
                            }
                            var w = p.outerWidth()
                        } else {
                            var w = p.outerHeight()
                        }
                        if (w != o) {
                            n.mCustomScrollbar("update");
                            o = w
                        }
                    }, 300)
                }
            })
        },
        update: function () {
            var o = c(this),
                l = o.children(".mCustomScrollBox"),
                r = l.children(".mCSB_container");
            r.removeClass("mCS_no_scrollbar");
            o.removeClass("mCS_disabled mCS_destroyed");
            l.scrollTop(0).scrollLeft(0);
            var z = l.children(".mCSB_scrollTools"),
                p = z.children(".mCSB_draggerContainer"),
                n = p.children(".mCSB_dragger");
            if (o.data("horizontalScroll")) {
                var B = z.children(".mCSB_buttonLeft"),
                    u = z.children(".mCSB_buttonRight"),
                    f = l.width();
                if (o.data("autoExpandHorizontalScroll")) {
                    r.css({
                        position: "absolute",
                        width: "auto"
                    }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                        width: r.outerWidth(),
                        position: "relative"
                    }).unwrap()
                }
                var A = r.outerWidth()
            } else {
                var x = z.children(".mCSB_buttonUp"),
                    g = z.children(".mCSB_buttonDown"),
                    s = l.height(),
                    j = r.outerHeight()
            }
            if (j > s && !o.data("horizontalScroll")) {
                z.css("display", "block");
                var t = p.height();
                if (o.data("autoDraggerLength")) {
                    var v = Math.round(s / j * t),
                        m = n.data("minDraggerHeight");
                    if (v <= m) {
                        n.css({
                            height: m
                        })
                    } else {
                        if (v >= t - 10) {
                            var q = t - 10;
                            n.css({
                                height: q
                            })
                        } else {
                            n.css({
                                height: v
                            })
                        }
                    }
                    n.children(".mCSB_dragger_bar").css({
                        "line-height": n.height() + "px"
                    })
                }
                var C = n.height(),
                    y = (j - s) / (t - C);
                o.data("scrollAmount", y).mCustomScrollbar("scrolling", l, r, p, n, x, g, B, u);
                var E = Math.abs(r.position().top);
                o.mCustomScrollbar("scrollTo", E, {
                    scrollInertia: 0,
                    trigger: "internal"
                })
            } else {
                if (A > f && o.data("horizontalScroll")) {
                    z.css("display", "block");
                    var h = p.width();
                    if (o.data("autoDraggerLength")) {
                        var k = Math.round(f / A * h),
                            D = n.data("minDraggerWidth");
                        if (k <= D) {
                            n.css({
                                width: D
                            })
                        } else {
                            if (k >= h - 10) {
                                var e = h - 10;
                                n.css({
                                    width: e
                                })
                            } else {
                                n.css({
                                    width: k
                                })
                            }
                        }
                    }
                    var w = n.width(),
                        y = (A - f) / (h - w);
                    o.data("scrollAmount", y).mCustomScrollbar("scrolling", l, r, p, n, x, g, B, u);
                    var E = Math.abs(r.position().left);
                    o.mCustomScrollbar("scrollTo", E, {
                        scrollInertia: 0,
                        trigger: "internal"
                    })
                } else {
                    l.unbind("mousewheel focusin");
                    if (o.data("horizontalScroll")) {
                        n.add(r).css("left", 0)
                    } else {
                        n.add(r).css("top", 0)
                    }
                    if (o.data("alwaysShowScrollbar")) {
                        if (!o.data("horizontalScroll")) {
                            n.css({
                                height: p.height()
                            })
                        } else {
                            if (o.data("horizontalScroll")) {
                                n.css({
                                    width: p.width()
                                })
                            }
                        }
                    } else {
                        z.css("display", "none");
                        r.addClass("mCS_no_scrollbar")
                    }
                    o.data({
                        bindEvent_mousewheel: false,
                        bindEvent_focusin: false
                    })
                }
            }
        },
        scrolling: function (j, r, o, l, B, f, E, z) {
            var m = c(this);
            if (!m.data("bindEvent_scrollbar_drag")) {
                var p, q, D, A, e;
                if (c.support.pointer) {
                    D = "pointerdown";
                    A = "pointermove";
                    e = "pointerup"
                } else {
                    if (c.support.msPointer) {
                        D = "MSPointerDown";
                        A = "MSPointerMove";
                        e = "MSPointerUp"
                    }
                }
                if (c.support.pointer || c.support.msPointer) {
                    l.bind(D, function (L) {
                        L.preventDefault();
                        m.data({
                            on_drag: true
                        });
                        l.addClass("mCSB_dragger_onDrag");
                        var K = c(this),
                            N = K.offset(),
                            J = L.originalEvent.pageX - N.left,
                            M = L.originalEvent.pageY - N.top;
                        if (J < K.width() && J > 0 && M < K.height() && M > 0) {
                            p = M;
                            q = J
                        }
                    });
                    c(document).bind(A + "." + m.data("mCustomScrollbarIndex"), function (L) {
                        L.preventDefault();
                        if (m.data("on_drag")) {
                            var K = l,
                                N = K.offset(),
                                J = L.originalEvent.pageX - N.left,
                                M = L.originalEvent.pageY - N.top;
                            H(p, q, M, J)
                        }
                    }).bind(e + "." + m.data("mCustomScrollbarIndex"), function (x) {
                        m.data({
                            on_drag: false
                        });
                        l.removeClass("mCSB_dragger_onDrag")
                    })
                } else {
                    l.bind("mousedown touchstart", function (L) {
                        L.preventDefault();
                        L.stopImmediatePropagation();
                        var K = c(this),
                            O = K.offset(),
                            J, N;
                        if (L.type === "touchstart") {
                            var M = L.originalEvent.touches[0] || L.originalEvent.changedTouches[0];
                            J = M.pageX - O.left;
                            N = M.pageY - O.top
                        } else {
                            m.data({
                                on_drag: true
                            });
                            l.addClass("mCSB_dragger_onDrag");
                            J = L.pageX - O.left;
                            N = L.pageY - O.top
                        }
                        if (J < K.width() && J > 0 && N < K.height() && N > 0) {
                            p = N;
                            q = J
                        }
                    }).bind("touchmove", function (L) {
                        L.preventDefault();
                        L.stopImmediatePropagation();
                        var O = L.originalEvent.touches[0] || L.originalEvent.changedTouches[0],
                            K = c(this),
                            N = K.offset(),
                            J = O.pageX - N.left,
                            M = O.pageY - N.top;
                        H(p, q, M, J)
                    });
                    c(document).bind("mousemove." + m.data("mCustomScrollbarIndex"), function (L) {
                        if (m.data("on_drag")) {
                            var K = l,
                                N = K.offset(),
                                J = L.pageX - N.left,
                                M = L.pageY - N.top;
                            H(p, q, M, J)
                        }
                    }).bind("mouseup." + m.data("mCustomScrollbarIndex"), function (x) {
                        m.data({
                            on_drag: false
                        });
                        l.removeClass("mCSB_dragger_onDrag")
                    })
                }
                m.data({
                    bindEvent_scrollbar_drag: true
                })
            }

            function H(K, L, M, J) {
                if (m.data("horizontalScroll")) {
                    m.mCustomScrollbar("scrollTo", (l.position().left - (L)) + J, {
                        moveDragger: true,
                        trigger: "internal"
                    })
                } else {
                    m.mCustomScrollbar("scrollTo", (l.position().top - (K)) + M, {
                        moveDragger: true,
                        trigger: "internal"
                    })
                }
            }
            if (c.support.touch && m.data("contentTouchScroll")) {
                if (!m.data("bindEvent_content_touch")) {
                    var n, F, t, u, w, G, I;
                    r.bind("touchstart", function (x) {
                        x.stopImmediatePropagation();
                        n = x.originalEvent.touches[0] || x.originalEvent.changedTouches[0];
                        F = c(this);
                        t = F.offset();
                        w = n.pageX - t.left;
                        u = n.pageY - t.top;
                        G = u;
                        I = w
                    });
                    r.bind("touchmove", function (x) {
                        x.preventDefault();
                        x.stopImmediatePropagation();
                        n = x.originalEvent.touches[0] || x.originalEvent.changedTouches[0];
                        F = c(this).parent();
                        t = F.offset();
                        w = n.pageX - t.left;
                        u = n.pageY - t.top;
                        if (m.data("horizontalScroll")) {
                            m.mCustomScrollbar("scrollTo", I - w, {
                                trigger: "internal"
                            })
                        } else {
                            m.mCustomScrollbar("scrollTo", G - u, {
                                trigger: "internal"
                            })
                        }
                    })
                }
            }
            if (!m.data("bindEvent_scrollbar_click")) {
                o.bind("click", function (J) {
                    var x = (J.pageY - o.offset().top) * m.data("scrollAmount"),
                        y = c(J.target);
                    if (m.data("horizontalScroll")) {
                        x = (J.pageX - o.offset().left) * m.data("scrollAmount")
                    }
                    if (y.hasClass("mCSB_draggerContainer") || y.hasClass("mCSB_draggerRail")) {
                        m.mCustomScrollbar("scrollTo", x, {
                            trigger: "internal",
                            scrollEasing: "draggerRailEase"
                        })
                    }
                });
                m.data({
                    bindEvent_scrollbar_click: true
                })
            }
            if (m.data("mouseWheel")) {
                if (!m.data("bindEvent_mousewheel")) {
                    j.bind("mousewheel", function (L, N) {
                        var K, J = m.data("mouseWheelPixels"),
                            x = Math.abs(r.position().top),
                            M = l.position().top,
                            y = o.height() - l.height();
                        if (m.data("normalizeMouseWheelDelta")) {
                            if (N < 0) {
                                N = -1
                            } else {
                                N = 1
                            }
                        }
                        if (J === "auto") {
                            J = 100 + Math.round(m.data("scrollAmount") / 2)
                        }
                        if (m.data("horizontalScroll")) {
                            M = l.position().left;
                            y = o.width() - l.width();
                            x = Math.abs(r.position().left)
                        }
                        if ((N > 0 && M !== 0) || (N < 0 && M !== y)) {
                            L.preventDefault();
                            L.stopImmediatePropagation()
                        }
                        K = x - (N * J);
                        m.mCustomScrollbar("scrollTo", K, {
                            trigger: "internal"
                        })
                    });
                    m.data({
                        bindEvent_mousewheel: true
                    })
                }
            }
            if (m.data("scrollButtons_enable")) {
                if (m.data("scrollButtons_scrollType") === "pixels") {
                    if (m.data("horizontalScroll")) {
                        z.add(E).unbind("mousedown touchstart MSPointerDown pointerdown mouseup MSPointerUp pointerup mouseout MSPointerOut pointerout touchend", k, h);
                        m.data({
                            bindEvent_buttonsContinuous_x: false
                        });
                        if (!m.data("bindEvent_buttonsPixels_x")) {
                            z.bind("click", function (x) {
                                x.preventDefault();
                                s(Math.abs(r.position().left) + m.data("scrollButtons_scrollAmount"))
                            });
                            E.bind("click", function (x) {
                                x.preventDefault();
                                s(Math.abs(r.position().left) - m.data("scrollButtons_scrollAmount"))
                            });
                            m.data({
                                bindEvent_buttonsPixels_x: true
                            })
                        }
                    } else {
                        f.add(B).unbind("mousedown touchstart MSPointerDown pointerdown mouseup MSPointerUp pointerup mouseout MSPointerOut pointerout touchend", k, h);
                        m.data({
                            bindEvent_buttonsContinuous_y: false
                        });
                        if (!m.data("bindEvent_buttonsPixels_y")) {
                            f.bind("click", function (x) {
                                x.preventDefault();
                                s(Math.abs(r.position().top) + m.data("scrollButtons_scrollAmount"))
                            });
                            B.bind("click", function (x) {
                                x.preventDefault();
                                s(Math.abs(r.position().top) - m.data("scrollButtons_scrollAmount"))
                            });
                            m.data({
                                bindEvent_buttonsPixels_y: true
                            })
                        }
                    }

                    function s(x) {
                        if (!l.data("preventAction")) {
                            l.data("preventAction", true);
                            m.mCustomScrollbar("scrollTo", x, {
                                trigger: "internal"
                            })
                        }
                    }
                } else {
                    if (m.data("horizontalScroll")) {
                        z.add(E).unbind("click");
                        m.data({
                            bindEvent_buttonsPixels_x: false
                        });
                        if (!m.data("bindEvent_buttonsContinuous_x")) {
                            z.bind("mousedown touchstart MSPointerDown pointerdown", function (y) {
                                y.preventDefault();
                                var x = C();
                                m.data({
                                    mCSB_buttonScrollRight: setInterval(function () {
                                        m.mCustomScrollbar("scrollTo", Math.abs(r.position().left) + x, {
                                            trigger: "internal",
                                            scrollEasing: "easeOutCirc"
                                        })
                                    }, 17)
                                })
                            });
                            var k = function (x) {
                                x.preventDefault();
                                clearInterval(m.data("mCSB_buttonScrollRight"))
                            };
                            z.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout", k);
                            E.bind("mousedown touchstart MSPointerDown pointerdown", function (y) {
                                y.preventDefault();
                                var x = C();
                                m.data({
                                    mCSB_buttonScrollLeft: setInterval(function () {
                                        m.mCustomScrollbar("scrollTo", Math.abs(r.position().left) - x, {
                                            trigger: "internal",
                                            scrollEasing: "easeOutCirc"
                                        })
                                    }, 17)
                                })
                            });
                            var h = function (x) {
                                x.preventDefault();
                                clearInterval(m.data("mCSB_buttonScrollLeft"))
                            };
                            E.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout", h);
                            m.data({
                                bindEvent_buttonsContinuous_x: true
                            })
                        }
                    } else {
                        f.add(B).unbind("click");
                        m.data({
                            bindEvent_buttonsPixels_y: false
                        });
                        if (!m.data("bindEvent_buttonsContinuous_y")) {
                            f.bind("mousedown touchstart MSPointerDown pointerdown", function (y) {
                                y.preventDefault();
                                var x = C();
                                m.data({
                                    mCSB_buttonScrollDown: setInterval(function () {
                                        m.mCustomScrollbar("scrollTo", Math.abs(r.position().top) + x, {
                                            trigger: "internal",
                                            scrollEasing: "easeOutCirc"
                                        })
                                    }, 17)
                                })
                            });
                            var v = function (x) {
                                x.preventDefault();
                                clearInterval(m.data("mCSB_buttonScrollDown"))
                            };
                            f.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout", v);
                            B.bind("mousedown touchstart MSPointerDown pointerdown", function (y) {
                                y.preventDefault();
                                var x = C();
                                m.data({
                                    mCSB_buttonScrollUp: setInterval(function () {
                                        m.mCustomScrollbar("scrollTo", Math.abs(r.position().top) - x, {
                                            trigger: "internal",
                                            scrollEasing: "easeOutCirc"
                                        })
                                    }, 17)
                                })
                            });
                            var g = function (x) {
                                x.preventDefault();
                                clearInterval(m.data("mCSB_buttonScrollUp"))
                            };
                            B.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout", g);
                            m.data({
                                bindEvent_buttonsContinuous_y: true
                            })
                        }
                    }

                    function C() {
                        var x = m.data("scrollButtons_scrollSpeed");
                        if (m.data("scrollButtons_scrollSpeed") === "auto") {
                            x = Math.round((m.data("scrollInertia") + 100) / 40)
                        }
                        return x
                    }
                }
            }
            if (m.data("autoScrollOnFocus")) {
                if (!m.data("bindEvent_focusin")) {
                    j.bind("focusin", function () {
                        j.scrollTop(0).scrollLeft(0);
                        var x = c(document.activeElement);
                        if (x.is("input,textarea,select,button,a[tabindex],area,object")) {
                            var K = r.position().top,
                                y = x.position().top,
                                J = j.height() - x.outerHeight();
                            if (m.data("horizontalScroll")) {
                                K = r.position().left;
                                y = x.position().left;
                                J = j.width() - x.outerWidth()
                            }
                            if (K + y < 0 || K + y > J) {
                                m.mCustomScrollbar("scrollTo", y, {
                                    trigger: "internal"
                                })
                            }
                        }
                    });
                    m.data({
                        bindEvent_focusin: true
                    })
                }
            }
            if (m.data("autoHideScrollbar") && !m.data("alwaysShowScrollbar")) {
                if (!m.data("bindEvent_autoHideScrollbar")) {
                    j.bind("mouseenter", function (x) {
                        j.addClass("mCS-mouse-over");
                        d.showScrollbar.call(j.children(".mCSB_scrollTools"))
                    }).bind("mouseleave touchend", function (x) {
                        j.removeClass("mCS-mouse-over");
                        if (x.type === "mouseleave") {
                            d.hideScrollbar.call(j.children(".mCSB_scrollTools"))
                        }
                    });
                    m.data({
                        bindEvent_autoHideScrollbar: true
                    })
                }
            }
        },
        scrollTo: function (e, f) {
            var j = c(this),
                p = {
                    moveDragger: false,
                    trigger: "external",
                    callbacks: true,
                    scrollInertia: j.data("scrollInertia"),
                    scrollEasing: j.data("scrollEasing")
                },
                f = c.extend(p, f),
                q, g = j.children(".mCustomScrollBox"),
                l = g.children(".mCSB_container"),
                s = g.children(".mCSB_scrollTools"),
                k = s.children(".mCSB_draggerContainer"),
                h = k.children(".mCSB_dragger"),
                u = draggerSpeed = f.scrollInertia,
                r, t, n, m;
            if (!l.hasClass("mCS_no_scrollbar")) {
                j.data({
                    mCS_trigger: f.trigger
                });
                if (j.data("mCS_Init")) {
                    f.callbacks = false
                }
                if (e || e === 0) {
                    if (typeof (e) === "number") {
                        if (f.moveDragger) {
                            q = e;
                            if (j.data("horizontalScroll")) {
                                e = h.position().left * j.data("scrollAmount")
                            } else {
                                e = h.position().top * j.data("scrollAmount")
                            }
                            draggerSpeed = 0
                        } else {
                            q = e / j.data("scrollAmount")
                        }
                    } else {
                        if (typeof (e) === "string") {
                            var w;
                            if (e === "top") {
                                w = 0
                            } else {
                                if (e === "bottom" && !j.data("horizontalScroll")) {
                                    w = l.outerHeight() - g.height()
                                } else {
                                    if (e === "left") {
                                        w = 0
                                    } else {
                                        if (e === "right" && j.data("horizontalScroll")) {
                                            w = l.outerWidth() - g.width()
                                        } else {
                                            if (e === "first") {
                                                w = j.find(".mCSB_container").find(":first")
                                            } else {
                                                if (e === "last") {
                                                    w = j.find(".mCSB_container").find(":last")
                                                } else {
                                                    w = j.find(e)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (w.length === 1) {
                                if (j.data("horizontalScroll")) {
                                    e = w.position().left
                                } else {
                                    e = w.position().top
                                }
                                q = e / j.data("scrollAmount")
                            } else {
                                q = e = w
                            }
                        }
                    }
                    if (j.data("horizontalScroll")) {
                        if (j.data("onTotalScrollBack_Offset")) {
                            t = -j.data("onTotalScrollBack_Offset")
                        }
                        if (j.data("onTotalScroll_Offset")) {
                            m = g.width() - l.outerWidth() + j.data("onTotalScroll_Offset")
                        }
                        if (q < 0) {
                            q = e = 0;
                            clearInterval(j.data("mCSB_buttonScrollLeft"));
                            if (!t) {
                                r = true
                            }
                        } else {
                            if (q >= k.width() - h.width()) {
                                q = k.width() - h.width();
                                e = g.width() - l.outerWidth();
                                clearInterval(j.data("mCSB_buttonScrollRight"));
                                if (!m) {
                                    n = true
                                }
                            } else {
                                e = -e
                            }
                        }
                        var o = j.data("snapAmount");
                        if (o) {
                            e = Math.round(e / o) * o - j.data("snapOffset")
                        }
                        d.mTweenAxis.call(this, h[0], "left", Math.round(q), draggerSpeed, f.scrollEasing);
                        d.mTweenAxis.call(this, l[0], "left", Math.round(e), u, f.scrollEasing, {
                            onStart: function () {
                                if (f.callbacks && !j.data("mCS_tweenRunning")) {
                                    v("onScrollStart")
                                }
                                if (j.data("autoHideScrollbar") && !j.data("alwaysShowScrollbar")) {
                                    d.showScrollbar.call(s)
                                }
                            },
                            onUpdate: function () {
                                if (f.callbacks) {
                                    v("whileScrolling")
                                }
                            },
                            onComplete: function () {
                                if (f.callbacks) {
                                    v("onScroll");
                                    if (r || (t && l.position().left >= t)) {
                                        v("onTotalScrollBack")
                                    }
                                    if (n || (m && l.position().left <= m)) {
                                        v("onTotalScroll")
                                    }
                                }
                                h.data("preventAction", false);
                                j.data("mCS_tweenRunning", false);
                                if (j.data("autoHideScrollbar") && !j.data("alwaysShowScrollbar")) {
                                    if (!g.hasClass("mCS-mouse-over")) {
                                        d.hideScrollbar.call(s)
                                    }
                                }
                            }
                        })
                    } else {
                        if (j.data("onTotalScrollBack_Offset")) {
                            t = -j.data("onTotalScrollBack_Offset")
                        }
                        if (j.data("onTotalScroll_Offset")) {
                            m = g.height() - l.outerHeight() + j.data("onTotalScroll_Offset")
                        }
                        if (q < 0) {
                            q = e = 0;
                            clearInterval(j.data("mCSB_buttonScrollUp"));
                            if (!t) {
                                r = true
                            }
                        } else {
                            if (q >= k.height() - h.height()) {
                                q = k.height() - h.height();
                                e = g.height() - l.outerHeight();
                                clearInterval(j.data("mCSB_buttonScrollDown"));
                                if (!m) {
                                    n = true
                                }
                            } else {
                                e = -e
                            }
                        }
                        var o = j.data("snapAmount");
                        if (o) {
                            e = Math.round(e / o) * o - j.data("snapOffset")
                        }
                        d.mTweenAxis.call(this, h[0], "top", Math.round(q), draggerSpeed, f.scrollEasing);
                        d.mTweenAxis.call(this, l[0], "top", Math.round(e), u, f.scrollEasing, {
                            onStart: function () {
                                if (f.callbacks && !j.data("mCS_tweenRunning")) {
                                    v("onScrollStart")
                                }
                                if (j.data("autoHideScrollbar") && !j.data("alwaysShowScrollbar")) {
                                    d.showScrollbar.call(s)
                                }
                            },
                            onUpdate: function () {
                                if (f.callbacks) {
                                    v("whileScrolling")
                                }
                            },
                            onComplete: function () {
                                if (f.callbacks) {
                                    v("onScroll");
                                    if (r || (t && l.position().top >= t)) {
                                        v("onTotalScrollBack")
                                    }
                                    if (n || (m && l.position().top <= m)) {
                                        v("onTotalScroll")
                                    }
                                }
                                h.data("preventAction", false);
                                j.data("mCS_tweenRunning", false);
                                if (j.data("autoHideScrollbar") && !j.data("alwaysShowScrollbar")) {
                                    if (!g.hasClass("mCS-mouse-over")) {
                                        d.hideScrollbar.call(s)
                                    }
                                }
                            }
                        })
                    }
                    if (j.data("mCS_Init")) {
                        j.data({
                            mCS_Init: false
                        })
                    }
                }
            }

            function v(x) {
                if (j.data("mCustomScrollbarIndex")) {
                    this.mcs = {
                        top: l.position().top,
                        left: l.position().left,
                        draggerTop: h.position().top,
                        draggerLeft: h.position().left,
                        topPct: Math.round((100 * Math.abs(l.position().top)) / Math.abs(l.outerHeight() - g.height())),
                        leftPct: Math.round((100 * Math.abs(l.position().left)) / Math.abs(l.outerWidth() - g.width()))
                    };
                    switch (x) {
                        case "onScrollStart":
                            j.data("mCS_tweenRunning", true).data("onScrollStart_Callback").call(j, this.mcs);
                            break;
                        case "whileScrolling":
                            j.data("whileScrolling_Callback").call(j, this.mcs);
                            break;
                        case "onScroll":
                            j.data("onScroll_Callback").call(j, this.mcs);
                            break;
                        case "onTotalScrollBack":
                            j.data("onTotalScrollBack_Callback").call(j, this.mcs);
                            break;
                        case "onTotalScroll":
                            j.data("onTotalScroll_Callback").call(j, this.mcs);
                            break
                    }
                }
            }
        },
        stop: function () {
            var g = c(this),
                e = g.children().children(".mCSB_container"),
                f = g.children().children().children().children(".mCSB_dragger");
            d.mTweenAxisStop.call(this, e[0]);
            d.mTweenAxisStop.call(this, f[0])
        },
        disable: function (e) {
            var k = c(this),
                f = k.children(".mCustomScrollBox"),
                h = f.children(".mCSB_container"),
                g = f.children(".mCSB_scrollTools"),
                j = g.children().children(".mCSB_dragger");
            f.unbind("mousewheel focusin mouseenter mouseleave touchend");
            h.unbind("touchstart touchmove");
            if (e) {
                if (k.data("horizontalScroll")) {
                    j.add(h).css("left", 0)
                } else {
                    j.add(h).css("top", 0)
                }
            }
            g.css("display", "none");
            h.addClass("mCS_no_scrollbar");
            k.data({
                bindEvent_mousewheel: false,
                bindEvent_focusin: false,
                bindEvent_content_touch: false,
                bindEvent_autoHideScrollbar: false
            }).addClass("mCS_disabled")
        },
        destroy: function () {
            var e = c(this);
            e.removeClass("mCustomScrollbar _mCS_" + e.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove();
            c(document).unbind("mousemove." + e.data("mCustomScrollbarIndex") + " mouseup." + e.data("mCustomScrollbarIndex") + " MSPointerMove." + e.data("mCustomScrollbarIndex") + " MSPointerUp." + e.data("mCustomScrollbarIndex"));
            c(window).unbind("resize." + e.data("mCustomScrollbarIndex"))
        }
    },
        d = {
            showScrollbar: function () {
                this.stop().animate({
                    opacity: 1
                }, "fast")
            },
            hideScrollbar: function () {
                this.stop().animate({
                    opacity: 0
                }, "fast")
            },
            mTweenAxis: function (g, j, h, f, p, z) {
                var z = z || {},
                    w = z.onStart || function () { },
                    q = z.onUpdate || function () { },
                    x = z.onComplete || function () { };
                var o = u(),
                    m, k = 0,
                    s = g.offsetTop,
                    t = g.style;
                if (j === "left") {
                    s = g.offsetLeft
                }
                var n = h - s;
                r();
                e();

                function u() {
                    if (window.performance && window.performance.now) {
                        return window.performance.now()
                    } else {
                        if (window.performance && window.performance.webkitNow) {
                            return window.performance.webkitNow()
                        } else {
                            if (Date.now) {
                                return Date.now()
                            } else {
                                return new Date().getTime()
                            }
                        }
                    }
                }

                function y() {
                    if (!k) {
                        w.call()
                    }
                    k = u() - o;
                    v();
                    if (k >= g._time) {
                        g._time = (k > g._time) ? k + m - (k - g._time) : k + m - 1;
                        if (g._time < k + 1) {
                            g._time = k + 1
                        }
                    }
                    if (g._time < f) {
                        g._id = _request(y)
                    } else {
                        x.call()
                    }
                }

                function v() {
                    if (f > 0) {
                        g.currVal = l(g._time, s, n, f, p);
                        t[j] = Math.round(g.currVal) + "px"
                    } else {
                        t[j] = h + "px"
                    }
                    q.call()
                }

                function e() {
                    m = 1000 / 60;
                    g._time = k + m;
                    _request = (!window.requestAnimationFrame) ? function (A) {
                        v();
                        return setTimeout(A, 0.01)
                    } : window.requestAnimationFrame;
                    g._id = _request(y)
                }

                function r() {
                    if (g._id == null) {
                        return
                    }
                    if (!window.requestAnimationFrame) {
                        clearTimeout(g._id)
                    } else {
                        window.cancelAnimationFrame(g._id)
                    }
                    g._id = null
                }

                function l(C, B, G, F, D) {
                    switch (D) {
                        case "linear":
                            return G * C / F + B;
                            break;
                        case "easeOutQuad":
                            C /= F;
                            return -G * C * (C - 2) + B;
                            break;
                        case "easeInOutQuad":
                            C /= F / 2;
                            if (C < 1) {
                                return G / 2 * C * C + B
                            }
                            C--;
                            return -G / 2 * (C * (C - 2) - 1) + B;
                            break;
                        case "easeOutCubic":
                            C /= F;
                            C--;
                            return G * (C * C * C + 1) + B;
                            break;
                        case "easeOutQuart":
                            C /= F;
                            C--;
                            return -G * (C * C * C * C - 1) + B;
                            break;
                        case "easeOutQuint":
                            C /= F;
                            C--;
                            return G * (C * C * C * C * C + 1) + B;
                            break;
                        case "easeOutCirc":
                            C /= F;
                            C--;
                            return G * Math.sqrt(1 - C * C) + B;
                            break;
                        case "easeOutSine":
                            return G * Math.sin(C / F * (Math.PI / 2)) + B;
                            break;
                        case "easeOutExpo":
                            return G * (-Math.pow(2, -10 * C / F) + 1) + B;
                            break;
                        case "mcsEaseOut":
                            var E = (C /= F) * C,
                                A = E * C;
                            return B + G * (0.499999999999997 * A * E + -2.5 * E * E + 5.5 * A + -6.5 * E + 4 * C);
                            break;
                        case "draggerRailEase":
                            C /= F / 2;
                            if (C < 1) {
                                return G / 2 * C * C * C + B
                            }
                            C -= 2;
                            return G / 2 * (C * C * C + 2) + B;
                            break
                    }
                }
            },
            mTweenAxisStop: function (e) {
                if (e._id == null) {
                    return
                }
                if (!window.requestAnimationFrame) {
                    clearTimeout(e._id)
                } else {
                    window.cancelAnimationFrame(e._id)
                }
                e._id = null
            },
            rafPolyfill: function () {
                var f = ["ms", "moz", "webkit", "o"],
                    e = f.length;
                while (--e > -1 && !window.requestAnimationFrame) {
                    window.requestAnimationFrame = window[f[e] + "RequestAnimationFrame"];
                    window.cancelAnimationFrame = window[f[e] + "CancelAnimationFrame"] || window[f[e] + "CancelRequestAnimationFrame"]
                }
            }
        };
    d.rafPolyfill.call();
    c.support.touch = !!("ontouchstart" in window);
    c.support.pointer = window.navigator.pointerEnabled;
    c.support.msPointer = window.navigator.msPointerEnabled;
    var a = ("https:" == document.location.protocol) ? "https:" : "http:";
    c.event.special.mousewheel || document.write('<script src="' + a + '//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.0.6/jquery.mousewheel.min.js"><\/script>');
    c.fn.mCustomScrollbar = function (e) {
        if (b[e]) {
            return b[e].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof e === "object" || !e) {
                return b.init.apply(this, arguments)
            } else {
                c.error("Method " + e + " does not exist")
            }
        }
    }
})(jQuery);
/*! jquery.selectBoxIt - v3.8.1 - 2013-11-17
 * http://www.selectboxit.com
 * Copyright (c) 2013 Greg Franko; Licensed MIT*/
;
! function (b) {
    b(window.jQuery, window, document)
}(function (g, f, k, j) {
    g.widget("selectBox.selectBoxIt", {
        VERSION: "3.8.1",
        options: {
            showEffect: "none",
            showEffectOptions: {},
            showEffectSpeed: "medium",
            hideEffect: "none",
            hideEffectOptions: {},
            hideEffectSpeed: "medium",
            showFirstOption: !0,
            defaultText: "",
            defaultIcon: "",
            downArrowIcon: "",
            theme: "default",
            keydownOpen: !0,
            isMobile: function () {
                var b = navigator.userAgent || navigator.vendor || f.opera;
                return /iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(b)
            },
            "native": !1,
            aggressiveChange: !1,
            selectWhenHidden: !0,
            viewport: g(f),
            similarSearch: !1,
            copyAttributes: ["title", "rel"],
            copyClasses: "button",
            nativeMousedown: !1,
            customShowHideEvent: !1,
            autoWidth: !0,
            html: !0,
            populate: "",
            dynamicPositioning: !0,
            hideCurrent: !1
        },
        getThemes: function () {
            var a = this,
                d = g(a.element).attr("data-theme") || "c";
            return {
                bootstrap: {
                    focus: "active",
                    hover: "",
                    enabled: "enabled",
                    disabled: "disabled",
                    arrow: "caret",
                    button: "btn",
                    list: "dropdown-menu",
                    container: "bootstrap",
                    open: "open"
                },
                jqueryui: {
                    focus: "ui-state-focus",
                    hover: "ui-state-hover",
                    enabled: "ui-state-enabled",
                    disabled: "ui-state-disabled",
                    arrow: "ui-icon ui-icon-triangle-1-s",
                    button: "ui-widget ui-state-default",
                    list: "ui-widget ui-widget-content",
                    container: "jqueryui",
                    open: "selectboxit-open"
                },
                jquerymobile: {
                    focus: "ui-btn-down-" + d,
                    hover: "ui-btn-hover-" + d,
                    enabled: "ui-enabled",
                    disabled: "ui-disabled",
                    arrow: "ui-icon ui-icon-arrow-d ui-icon-shadow",
                    button: "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + d,
                    list: "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + d,
                    container: "jquerymobile",
                    open: "selectboxit-open"
                },
                "default": {
                    focus: "selectboxit-focus",
                    hover: "selectboxit-hover",
                    enabled: "selectboxit-enabled",
                    disabled: "selectboxit-disabled",
                    arrow: "selectboxit-default-arrow",
                    button: "selectboxit-btn",
                    list: "selectboxit-list",
                    container: "selectboxit-container",
                    open: "selectboxit-open"
                }
            }
        },
        isDeferred: function (a) {
            return g.isPlainObject(a) && a.promise && a.done
        },
        _create: function (a) {
            var m = this,
                l = m.options.populate,
                c = m.options.theme;
            if (m.element.is("select")) {
                return m.widgetProto = g.Widget.prototype, m.originalElem = m.element[0], m.selectBox = m.element, m.options.populate && m.add && !a && m.add(l), m.selectItems = m.element.find("option"), m.firstSelectItem = m.selectItems.slice(0, 1), m.documentHeight = g(k).height(), m.theme = g.isPlainObject(c) ? g.extend({}, m.getThemes()["default"], c) : m.getThemes()[c] ? m.getThemes()[c] : m.getThemes()["default"], m.currentFocus = 0, m.blur = !0, m.textArray = [], m.currentIndex = 0, m.currentText = "", m.flipped = !1, a || (m.selectBoxStyles = m.selectBox.attr("style")), m._createDropdownButton()._createUnorderedList()._copyAttributes()._replaceSelectBox()._addClasses(m.theme)._eventHandlers(), m.originalElem.disabled && m.disable && m.disable(), m._ariaAccessibility && m._ariaAccessibility(), m.isMobile = m.options.isMobile(), m._mobile && m._mobile(), m.options["native"] && this._applyNativeSelect(), m.triggerEvent("create"), m
            }
        },
        _createDropdownButton: function () {
            var a = this,
                p = a.originalElemId = a.originalElem.id || "",
                o = a.originalElemValue = a.originalElem.value || "",
                n = a.originalElemName = a.originalElem.name || "",
                m = a.options.copyClasses,
                l = a.selectBox.attr("class") || "";
            return a.dropdownText = g("<span/>", {
                id: p && p + "SelectBoxItText",
                "class": "selectboxit-text",
                unselectable: "on",
                text: a.firstSelectItem.text()
            }).attr("data-val", o), a.dropdownImageContainer = g("<span/>", {
                "class": "selectboxit-option-icon-container"
            }), a.dropdownImage = g("<i/>", {
                id: p && p + "SelectBoxItDefaultIcon",
                "class": "selectboxit-default-icon",
                unselectable: "on"
            }), a.dropdown = g("<span/>", {
                id: p && p + "SelectBoxIt",
                "class": "selectboxit " + ("button" === m ? l : "") + " " + (a.selectBox.prop("disabled") ? a.theme.disabled : a.theme.enabled),
                name: n,
                tabindex: a.selectBox.attr("tabindex") || "0",
                unselectable: "on"
            }).append(a.dropdownImageContainer.append(a.dropdownImage)).append(a.dropdownText), a.dropdownContainer = g("<span/>", {
                id: p && p + "SelectBoxItContainer",
                "class": "selectboxit-container " + a.theme.container + " " + ("container" === m ? l : "")
            }).append(a.dropdown), a
        },
        _createUnorderedList: function () {
            var J, I, H, G, F, E, D, C, B, A, z, y, x, w = this,
                v = "",
                u = w.originalElemId || "",
                t = g("<ul/>", {
                    id: u && u + "SelectBoxItOptions",
                    "class": "selectboxit-options",
                    tabindex: -1
                });
            if (w.options.showFirstOption || (w.selectItems.first().attr("disabled", "disabled"), w.selectItems = w.selectBox.find("option").slice(1)), w.selectItems.each(function (b) {
                y = g(this), I = "", H = "", J = y.prop("disabled"), G = y.attr("data-icon") || "", F = y.attr("data-iconurl") || "", E = F ? "selectboxit-option-icon-url" : "", D = F ? "style=\"background-image:url('" + F + "');\"" : "", C = y.attr("data-selectedtext"), B = y.attr("data-text"), z = B ? B : y.text(), x = y.parent(), x.is("optgroup") && (I = "selectboxit-optgroup-option", 0 === y.index() && (H = '<span class="selectboxit-optgroup-header ' + x.first().attr("class") + '"data-disabled="true">' + x.first().attr("label") + "</span>")), y.attr("value", this.value), v += H + '<li data-id="' + b + '" data-val="' + this.value + '" data-disabled="' + J + '" class="' + I + " selectboxit-option " + (g(this).attr("class") || "") + '"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon ' + G + " " + (E || w.theme.container) + '"' + D + "></i></span>" + (w.options.html ? z : w.htmlEscape(z)) + "</a></li>", A = y.attr("data-search"), w.textArray[b] = J ? "" : A ? A : z, this.selected && (w._setText(w.dropdownText, C || z), w.currentFocus = b)
            }), w.options.defaultText || w.selectBox.attr("data-text")) {
                var a = w.options.defaultText || w.selectBox.attr("data-text");
                w._setText(w.dropdownText, a), w.options.defaultText = a
            }
            return t.append(v), w.list = t, w.dropdownContainer.append(w.list), w.listItems = w.list.children("li"), w.listAnchors = w.list.find("a"), w.listItems.first().addClass("selectboxit-option-first"), w.listItems.last().addClass("selectboxit-option-last"), w.list.find("li[data-disabled='true']").not(".optgroupHeader").addClass(w.theme.disabled), w.dropdownImage.addClass(w.selectBox.attr("data-icon") || w.options.defaultIcon || w.listItems.eq(w.currentFocus).find("i").attr("class")), w.dropdownImage.attr("style", w.listItems.eq(w.currentFocus).find("i").attr("style")), w
        },
        _replaceSelectBox: function () {
            var a, p, o, n = this,
                m = n.originalElem.id || "",
                l = n.selectBox.attr("data-size"),
                d = n.listSize = l === j ? "auto" : "0" === l ? "auto" : +l;
            return n.selectBox.css("display", "none").after(n.dropdownContainer), n.dropdownContainer.appendTo("body").addClass("selectboxit-rendering"), a = n.dropdown.height(), n.downArrow = g("<i/>", {
                id: m && m + "SelectBoxItArrow",
                "class": "selectboxit-arrow",
                unselectable: "on"
            }), n.downArrowContainer = g("<span/>", {
                id: m && m + "SelectBoxItArrowContainer",
                "class": "selectboxit-arrow-container",
                unselectable: "on"
            }).append(n.downArrow), n.dropdown.append(n.downArrowContainer), n.listItems.removeClass("selectboxit-selected").eq(n.currentFocus).addClass("selectboxit-selected"), p = n.downArrowContainer.outerWidth(!0), o = n.dropdownImage.outerWidth(!0), n.options.autoWidth && (n.dropdown.css({
                width: "auto"
            }).css({
                width: n.list.outerWidth(!0) + p + o
            }), n.list.css({
                "min-width": n.dropdown.width()
            })), n.dropdownText.css({
                "max-width": n.dropdownContainer.outerWidth(!0) - (p + o)
            }), n.selectBox.after(n.dropdownContainer), n.dropdownContainer.removeClass("selectboxit-rendering"), "number" === g.type(d) && (n.maxHeight = n.listAnchors.outerHeight(!0) * d), n
        },
        _scrollToView: function (m) {
            var l = this,
                s = l.listItems.eq(l.currentFocus),
                r = l.list.scrollTop(),
                q = s.height(),
                p = s.position().top,
                o = Math.abs(p),
                n = l.list.height();
            return "search" === m ? q > n - p ? l.list.scrollTop(r + (p - (n - q))) : -1 > p && l.list.scrollTop(p - q) : "up" === m ? -1 > p && l.list.scrollTop(r - o) : "down" === m && q > n - p && l.list.scrollTop(r + (o - n + q)), l
        },
        _callbackSupport: function (a) {
            var d = this;
            return g.isFunction(a) && a.call(d, d.dropdown), d
        },
        _setText: function (e, d) {
            var l = this;
            return l.options.html ? e.html(d) : e.text(d), l
        },
        open: function (m) {
            var l = this,
                r = l.options.showEffect,
                q = l.options.showEffectSpeed,
                p = l.options.showEffectOptions,
                o = l.options["native"],
                n = l.isMobile;
            return !l.listItems.length || l.dropdown.hasClass(l.theme.disabled) ? l : (o || n || this.list.is(":visible") || (l.triggerEvent("open"), l._dynamicPositioning && l.options.dynamicPositioning && l._dynamicPositioning(), "none" === r ? l.list.show() : "show" === r || "slideDown" === r || "fadeIn" === r ? l.list[r](q) : l.list.show(r, p, q), l.list.promise().done(function () {
                l._scrollToView("search"), l.triggerEvent("opened")
            })), l._callbackSupport(m), l)
        },
        close: function (m) {
            var l = this,
                r = l.options.hideEffect,
                q = l.options.hideEffectSpeed,
                p = l.options.hideEffectOptions,
                o = l.options["native"],
                n = l.isMobile;
            return o || n || !l.list.is(":visible") || (l.triggerEvent("close"), "none" === r ? l.list.hide() : "hide" === r || "slideUp" === r || "fadeOut" === r ? l.list[r](q) : l.list.hide(r, p, q), l.list.promise().done(function () {
                l.triggerEvent("closed")
            })), l._callbackSupport(m), l
        },
        toggle: function () {
            var d = this,
                c = d.list.is(":visible");
            c ? d.close() : c || d.open()
        },
        _keyMappings: {
            38: "up",
            40: "down",
            13: "enter",
            8: "backspace",
            9: "tab",
            32: "space",
            27: "esc"
        },
        _keydownMethods: function () {
            var d = this,
                c = d.list.is(":visible") || !d.options.keydownOpen;
            return {
                down: function () {
                    d.moveDown && c && d.moveDown()
                },
                up: function () {
                    d.moveUp && c && d.moveUp()
                },
                enter: function () {
                    var a = d.listItems.eq(d.currentFocus);
                    d._update(a), "true" !== a.attr("data-preventclose") && d.close(), d.triggerEvent("enter")
                },
                tab: function () {
                    d.triggerEvent("tab-blur"), d.close()
                },
                backspace: function () {
                    d.triggerEvent("backspace")
                },
                esc: function () {
                    d.close()
                }
            }
        },
        _eventHandlers: function () {
            var a, r, q = this,
                p = q.options.nativeMousedown,
                o = q.options.customShowHideEvent,
                n = q.focusClass,
                m = q.hoverClass,
                l = q.openClass;
            return this.dropdown.on({
                "click.selectBoxIt": function () {
                    q.dropdown.trigger("focus", !0), q.originalElem.disabled || (q.triggerEvent("click"), p || o || q.toggle())
                },
                "mousedown.selectBoxIt": function () {
                    g(this).data("mdown", !0), q.triggerEvent("mousedown"), p && !o && q.toggle()
                },
                "mouseup.selectBoxIt": function () {
                    q.triggerEvent("mouseup")
                },
                "blur.selectBoxIt": function () {
                    q.blur && (q.triggerEvent("blur"), q.close(), g(this).removeClass(n))
                },
                "focus.selectBoxIt": function (d, t) {
                    var s = g(this).data("mdown");
                    g(this).removeData("mdown"), s || t || setTimeout(function () {
                        q.triggerEvent("tab-focus")
                    }, 0), t || (g(this).hasClass(q.theme.disabled) || g(this).addClass(n), q.triggerEvent("focus"))
                },
                "keydown.selectBoxIt": function (e) {
                    var d = q._keyMappings[e.keyCode],
                        s = q._keydownMethods()[d];
                    s && (s(), !q.options.keydownOpen || "up" !== d && "down" !== d || q.open()), s && "tab" !== d && e.preventDefault()
                },
                "keypress.selectBoxIt": function (s) {
                    var d = s.charCode || s.keyCode,
                        u = q._keyMappings[s.charCode || s.keyCode],
                        t = String.fromCharCode(d);
                    q.search && (!u || u && "space" === u) && q.search(t, !0, !0), "space" === u && s.preventDefault()
                },
                "mouseenter.selectBoxIt": function () {
                    q.triggerEvent("mouseenter")
                },
                "mouseleave.selectBoxIt": function () {
                    q.triggerEvent("mouseleave")
                }
            }), q.list.on({
                "mouseover.selectBoxIt": function () {
                    q.blur = !1
                },
                "mouseout.selectBoxIt": function () {
                    q.blur = !0
                },
                "focusin.selectBoxIt": function () {
                    q.dropdown.trigger("focus", !0)
                }
            }), q.list.on({
                "mousedown.selectBoxIt": function () {
                    q._update(g(this)), q.triggerEvent("option-click"), "false" === g(this).attr("data-disabled") && "true" !== g(this).attr("data-preventclose") && q.close(), setTimeout(function () {
                        q.dropdown.trigger("focus", !0)
                    }, 0)
                },
                "focusin.selectBoxIt": function () {
                    q.listItems.not(g(this)).removeAttr("data-active"), g(this).attr("data-active", "");
                    var c = q.list.is(":hidden");
                    (q.options.searchWhenHidden && c || q.options.aggressiveChange || c && q.options.selectWhenHidden) && q._update(g(this)), g(this).addClass(n)
                },
                "mouseup.selectBoxIt": function () {
                    p && !o && (q._update(g(this)), q.triggerEvent("option-mouseup"), "false" === g(this).attr("data-disabled") && "true" !== g(this).attr("data-preventclose") && q.close())
                },
                "mouseenter.selectBoxIt": function () {
                    "false" === g(this).attr("data-disabled") && (q.listItems.removeAttr("data-active"), g(this).addClass(n).attr("data-active", ""), q.listItems.not(g(this)).removeClass(n), g(this).addClass(n), q.currentFocus = +g(this).attr("data-id"))
                },
                "mouseleave.selectBoxIt": function () {
                    "false" === g(this).attr("data-disabled") && (q.listItems.not(g(this)).removeClass(n).removeAttr("data-active"), g(this).addClass(n), q.currentFocus = +g(this).attr("data-id"))
                },
                "blur.selectBoxIt": function () {
                    g(this).removeClass(n)
                }
            }, ".selectboxit-option"), q.list.on({
                "click.selectBoxIt": function (b) {
                    b.preventDefault()
                }
            }, "a"), q.selectBox.on({
                "change.selectBoxIt, internal-change.selectBoxIt": function (b, s) {
                    var d, c;
                    s || (d = q.list.find('li[data-val="' + q.originalElem.value + '"]'), d.length && (q.listItems.eq(q.currentFocus).removeClass(q.focusClass), q.currentFocus = +d.attr("data-id"))), d = q.listItems.eq(q.currentFocus), c = d.attr("data-selectedtext"), a = d.attr("data-text"), r = a ? a : d.find("a").text(), q._setText(q.dropdownText, c || r), q.dropdownText.attr("data-val", q.originalElem.value), d.find("i").attr("class") && (q.dropdownImage.attr("class", d.find("i").attr("class")).addClass("selectboxit-default-icon"), q.dropdownImage.attr("style", d.find("i").attr("style"))), q.triggerEvent("changed")
                },
                "disable.selectBoxIt": function () {
                    q.dropdown.addClass(q.theme.disabled)
                },
                "enable.selectBoxIt": function () {
                    q.dropdown.removeClass(q.theme.disabled)
                },
                "open.selectBoxIt": function () {
                    var d, c = q.list.find("li[data-val='" + q.dropdownText.attr("data-val") + "']");
                    c.length || (c = q.listItems.not("[data-disabled=true]").first()), q.currentFocus = +c.attr("data-id"), d = q.listItems.eq(q.currentFocus), q.dropdown.addClass(l).removeClass(m).addClass(n), q.listItems.removeClass(q.selectedClass).removeAttr("data-active").not(d).removeClass(n), d.addClass(q.selectedClass).addClass(n), q.options.hideCurrent && (q.listItems.show(), d.hide())
                },
                "close.selectBoxIt": function () {
                    q.dropdown.removeClass(l)
                },
                "blur.selectBoxIt": function () {
                    q.dropdown.removeClass(n)
                },
                "mouseenter.selectBoxIt": function () {
                    g(this).hasClass(q.theme.disabled) || q.dropdown.addClass(m)
                },
                "mouseleave.selectBoxIt": function () {
                    q.dropdown.removeClass(m)
                },
                destroy: function (b) {
                    b.preventDefault(), b.stopPropagation()
                }
            }), q
        },
        _update: function (m) {
            var l, r, q, p = this,
                o = p.options.defaultText || p.selectBox.attr("data-text"),
                n = p.listItems.eq(p.currentFocus);
            "false" === m.attr("data-disabled") && (l = p.listItems.eq(p.currentFocus).attr("data-selectedtext"), r = n.attr("data-text"), q = r ? r : n.text(), (o && p.options.html ? p.dropdownText.html() === o : p.dropdownText.text() === o) && p.selectBox.val() === m.attr("data-val") ? p.triggerEvent("change") : (p.selectBox.val(m.attr("data-val")), p.currentFocus = +m.attr("data-id"), p.originalElem.value !== p.dropdownText.attr("data-val") && p.triggerEvent("change")))
        },
        _addClasses: function (m) {
            var l = this,
                q = (l.focusClass = m.focus, l.hoverClass = m.hover, m.button),
                p = m.list,
                o = m.arrow,
                n = m.container;
            return l.openClass = m.open, l.selectedClass = "selectboxit-selected", l.downArrow.addClass(l.selectBox.attr("data-downarrow") || l.options.downArrowIcon || o), l.dropdownContainer.addClass(n), l.dropdown.addClass(q), l.list.addClass(p), l
        },
        refresh: function (e, d) {
            var l = this;
            return l._destroySelectBoxIt()._create(!0), d || l.triggerEvent("refresh"), l._callbackSupport(e), l
        },
        htmlEscape: function (b) {
            return String(b).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        },
        triggerEvent: function (e) {
            var d = this,
                l = d.options.showFirstOption ? d.currentFocus : d.currentFocus - 1 >= 0 ? d.currentFocus : 0;
            return d.selectBox.trigger(e, {
                selectbox: d.selectBox,
                selectboxOption: d.selectItems.eq(l),
                dropdown: d.dropdown,
                dropdownOption: d.listItems.eq(d.currentFocus)
            }), d
        },
        _copyAttributes: function () {
            var b = this;
            return b._addSelectBoxAttributes && b._addSelectBoxAttributes(), b
        },
        _realOuterWidth: function (e) {
            if (e.is(":visible")) {
                return e.outerWidth(!0)
            }
            var d, l = e.clone();
            return l.css({
                visibility: "hidden",
                display: "block",
                position: "absolute"
            }).appendTo("body"), d = l.outerWidth(!0), l.remove(), d
        }
    });
    var h = g.selectBox.selectBoxIt.prototype;
    h.add = function (a, d) {
        this._populate(a, function (s) {
            var r, q, p = this,
                o = g.type(s),
                n = 0,
                m = [],
                l = p._isJSON(s),
                c = l && p._parseJSON(s);
            if (s && ("array" === o || l && c.data && "array" === g.type(c.data)) || "object" === o && s.data && "array" === g.type(s.data)) {
                for (p._isJSON(s) && (s = c), s.data && (s = s.data), q = s.length; q - 1 >= n; n += 1) {
                    r = s[n], g.isPlainObject(r) ? m.push(g("<option/>", r)) : "string" === g.type(r) && m.push(g("<option/>", {
                        text: r,
                        value: r
                    }))
                }
                p.selectBox.append(m)
            } else {
                s && "string" === o && !p._isJSON(s) ? p.selectBox.append(s) : s && "object" === o ? p.selectBox.append(g("<option/>", s)) : s && p._isJSON(s) && g.isPlainObject(p._parseJSON(s)) && p.selectBox.append(g("<option/>", p._parseJSON(s)))
            }
            return p.dropdown ? p.refresh(function () {
                p._callbackSupport(d)
            }, !0) : p._callbackSupport(d), p
        })
    }, h._parseJSON = function (a) {
        return JSON && JSON.parse && JSON.parse(a) || g.parseJSON(a)
    }, h._isJSON = function (l) {
        var e, n = this;
        try {
            return e = n._parseJSON(l), !0
        } catch (m) {
            return !1
        }
    }, h._populate = function (a, l) {
        var e = this;
        return a = g.isFunction(a) ? a.call() : a, e.isDeferred(a) ? a.done(function (b) {
            l.call(e, b)
        }) : l.call(e, a), e
    }, h._ariaAccessibility = function () {
        var a = this,
            d = g("label[for='" + a.originalElem.id + "']");
        return a.dropdownContainer.attr({
            role: "combobox",
            "aria-autocomplete": "list",
            "aria-haspopup": "true",
            "aria-expanded": "false",
            "aria-owns": a.list[0].id
        }), a.dropdownText.attr({
            "aria-live": "polite"
        }), a.dropdown.on({
            "disable.selectBoxIt": function () {
                a.dropdownContainer.attr("aria-disabled", "true")
            },
            "enable.selectBoxIt": function () {
                a.dropdownContainer.attr("aria-disabled", "false")
            }
        }), d.length && a.dropdownContainer.attr("aria-labelledby", d[0].id), a.list.attr({
            role: "listbox",
            "aria-hidden": "true"
        }), a.listItems.attr({
            role: "option"
        }), a.selectBox.on({
            "open.selectBoxIt": function () {
                a.list.attr("aria-hidden", "false"), a.dropdownContainer.attr("aria-expanded", "true")
            },
            "close.selectBoxIt": function () {
                a.list.attr("aria-hidden", "true"), a.dropdownContainer.attr("aria-expanded", "false")
            }
        }), a
    }, h._addSelectBoxAttributes = function () {
        var a = this;
        return a._addAttributes(a.selectBox.prop("attributes"), a.dropdown), a.selectItems.each(function (b) {
            a._addAttributes(g(this).prop("attributes"), a.listItems.eq(b))
        }), a
    }, h._addAttributes = function (a, n) {
        var m = this,
            l = m.options.copyAttributes;
        return a.length && g.each(a, function (c, p) {
            var o = p.name.toLowerCase(),
                e = p.value;
            "null" === e || -1 === g.inArray(o, l) && -1 === o.indexOf("data") || n.attr(o, e)
        }), m
    }, h.destroy = function (d) {
        var c = this;
        return c._destroySelectBoxIt(), c.widgetProto.destroy.call(c), c._callbackSupport(d), c
    }, h._destroySelectBoxIt = function () {
        var a = this;
        return a.dropdown.off(".selectBoxIt"), g.contains(a.dropdownContainer[0], a.originalElem) && a.dropdownContainer.before(a.selectBox), a.dropdownContainer.remove(), a.selectBox.removeAttr("style").attr("style", a.selectBoxStyles), a.triggerEvent("destroy"), a
    }, h.disable = function (d) {
        var c = this;
        return c.options.disabled || (c.close(), c.selectBox.attr("disabled", "disabled"), c.dropdown.removeAttr("tabindex").removeClass(c.theme.enabled).addClass(c.theme.disabled), c.setOption("disabled", !0), c.triggerEvent("disable")), c._callbackSupport(d), c
    }, h.disableOption = function (a, q) {
        var p, o, n, m = this,
            l = g.type(a);
        return "number" === l && (m.close(), p = m.selectBox.find("option").eq(a), m.triggerEvent("disable-option"), p.attr("disabled", "disabled"), m.listItems.eq(a).attr("data-disabled", "true").addClass(m.theme.disabled), m.currentFocus === a && (o = m.listItems.eq(m.currentFocus).nextAll("li").not("[data-disabled='true']").first().length, n = m.listItems.eq(m.currentFocus).prevAll("li").not("[data-disabled='true']").first().length, o ? m.moveDown() : n ? m.moveUp() : m.disable())), m._callbackSupport(q), m
    }, h._isDisabled = function () {
        var b = this;
        return b.originalElem.disabled && b.disable(), b
    }, h._dynamicPositioning = function () {
        var v = this;
        if ("number" === g.type(v.listSize)) {
            v.list.css("max-height", v.maxHeight || "none")
        } else {
            var u = v.dropdown.offset().top,
                t = v.list.data("max-height") || v.list.outerHeight(),
                s = v.dropdown.outerHeight(),
                r = v.options.viewport,
                q = r.height(),
                p = g.isWindow(r.get(0)) ? r.scrollTop() : r.offset().top,
                o = q + p >= u + s + t,
                n = !o;
            if (v.list.data("max-height") || v.list.data("max-height", v.list.outerHeight()), n) {
                if (v.dropdown.offset().top - p >= t) {
                    v.list.css("max-height", t), v.list.css("top", v.dropdown.position().top - v.list.outerHeight())
                } else {
                    var m = Math.abs(u + s + t - (q + p)),
                        a = Math.abs(v.dropdown.offset().top - p - t);
                    a > m ? (v.list.css("max-height", t - m - s / 2), v.list.css("top", "auto")) : (v.list.css("max-height", t - a - s / 2), v.list.css("top", v.dropdown.position().top - v.list.outerHeight()))
                }
            } else {
                v.list.css("max-height", t), v.list.css("top", "auto")
            }
        }
        return v
    }, h.enable = function (d) {
        var c = this;
        return c.options.disabled && (c.triggerEvent("enable"), c.selectBox.removeAttr("disabled"), c.dropdown.attr("tabindex", 0).removeClass(c.theme.disabled).addClass(c.theme.enabled), c.setOption("disabled", !1), c._callbackSupport(d)), c
    }, h.enableOption = function (a, o) {
        var n, m = this,
            l = g.type(a);
        return "number" === l && (n = m.selectBox.find("option").eq(a), m.triggerEvent("enable-option"), n.removeAttr("disabled"), m.listItems.eq(a).attr("data-disabled", "false").removeClass(m.theme.disabled)), m._callbackSupport(o), m
    }, h.moveDown = function (l) {
        var e = this;
        e.currentFocus += 1;
        var n = "true" === e.listItems.eq(e.currentFocus).attr("data-disabled") ? !0 : !1,
            m = e.listItems.eq(e.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;
        if (e.currentFocus === e.listItems.length) {
            e.currentFocus -= 1
        } else {
            if (n && m) {
                return e.listItems.eq(e.currentFocus - 1).blur(), e.moveDown(), void 0
            }
            n && !m ? e.currentFocus -= 1 : (e.listItems.eq(e.currentFocus - 1).blur().end().eq(e.currentFocus).focusin(), e._scrollToView("down"), e.triggerEvent("moveDown"))
        }
        return e._callbackSupport(l), e
    }, h.moveUp = function (l) {
        var e = this;
        e.currentFocus -= 1;
        var n = "true" === e.listItems.eq(e.currentFocus).attr("data-disabled") ? !0 : !1,
            m = e.listItems.eq(e.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;
        if (-1 === e.currentFocus) {
            e.currentFocus += 1
        } else {
            if (n && m) {
                return e.listItems.eq(e.currentFocus + 1).blur(), e.moveUp(), void 0
            }
            n && !m ? e.currentFocus += 1 : (e.listItems.eq(this.currentFocus + 1).blur().end().eq(e.currentFocus).focusin(), e._scrollToView("up"), e.triggerEvent("moveUp"))
        }
        return e._callbackSupport(l), e
    }, h._setCurrentSearchOption = function (d) {
        var c = this;
        return (c.options.aggressiveChange || c.options.selectWhenHidden || c.listItems.eq(d).is(":visible")) && c.listItems.eq(d).data("disabled") !== !0 && (c.listItems.eq(c.currentFocus).blur(), c.currentIndex = d, c.currentFocus = d, c.listItems.eq(c.currentFocus).focusin(), c._scrollToView("search"), c.triggerEvent("search")), c
    }, h._searchAlgorithm = function (u, t) {
        var s, r, q, p, o = this,
            n = !1,
            m = o.textArray,
            l = o.currentText;
        for (s = u, q = m.length; q > s; s += 1) {
            for (p = m[s], r = 0; q > r; r += 1) {
                -1 !== m[r].search(t) && (n = !0, r = q)
            }
            if (n || (o.currentText = o.currentText.charAt(o.currentText.length - 1).replace(/[|()\[{.+*?$\\]/g, "\\$0"), l = o.currentText), t = new RegExp(l, "gi"), l.length < 3) {
                if (t = new RegExp(l.charAt(0), "gi"), -1 !== p.charAt(0).search(t)) {
                    return o._setCurrentSearchOption(s), (p.substring(0, l.length).toLowerCase() !== l.toLowerCase() || o.options.similarSearch) && (o.currentIndex += 1), !1
                }
            } else {
                if (-1 !== p.search(t)) {
                    return o._setCurrentSearchOption(s), !1
                }
            }
            if (p.toLowerCase() === o.currentText.toLowerCase()) {
                return o._setCurrentSearchOption(s), o.currentText = "", !1
            }
        }
        return !0
    }, h.search = function (m, l, p) {
        var o = this;
        p ? o.currentText += m.replace(/[|()\[{.+*?$\\]/g, "\\$0") : o.currentText = m.replace(/[|()\[{.+*?$\\]/g, "\\$0");
        var n = o._searchAlgorithm(o.currentIndex, new RegExp(o.currentText, "gi"));
        return n && o._searchAlgorithm(0, o.currentText), o._callbackSupport(l), o
    }, h._updateMobileText = function () {
        var l, e, n, m = this;
        l = m.selectBox.find("option").filter(":selected"), e = l.attr("data-text"), n = e ? e : l.text(), m._setText(m.dropdownText, n), m.list.find('li[data-val="' + l.val() + '"]').find("i").attr("class") && m.dropdownImage.attr("class", m.list.find('li[data-val="' + l.val() + '"]').find("i").attr("class")).addClass("selectboxit-default-icon")
    }, h._applyNativeSelect = function () {
        var b = this;
        return b.dropdownContainer.append(b.selectBox), b.dropdown.attr("tabindex", "-1"), b.selectBox.css({
            display: "block",
            visibility: "visible",
            width: b._realOuterWidth(b.dropdown),
            height: b.dropdown.outerHeight(),
            opacity: "0",
            position: "absolute",
            top: "0",
            left: "0",
            cursor: "pointer",
            "z-index": "999999",
            margin: b.dropdown.css("margin"),
            padding: "0",
            "-webkit-appearance": "menulist-button"
        }), b.originalElem.disabled && b.triggerEvent("disable"), this
    }, h._mobileEvents = function () {
        var b = this;
        b.selectBox.on({
            "changed.selectBoxIt": function () {
                b.hasChanged = !0, b._updateMobileText(), b.triggerEvent("option-click")
            },
            "mousedown.selectBoxIt": function () {
                b.hasChanged || !b.options.defaultText || b.originalElem.disabled || (b._updateMobileText(), b.triggerEvent("option-click"))
            },
            "enable.selectBoxIt": function () {
                b.selectBox.removeClass("selectboxit-rendering")
            },
            "disable.selectBoxIt": function () {
                b.selectBox.addClass("selectboxit-rendering")
            }
        })
    }, h._mobile = function () {
        var b = this;
        return b.isMobile && (b._applyNativeSelect(), b._mobileEvents()), this
    }, h.remove = function (a, r) {
        var q, p, o = this,
            n = g.type(a),
            m = 0,
            l = "";
        if ("array" === n) {
            for (p = a.length; p - 1 >= m; m += 1) {
                q = a[m], "number" === g.type(q) && (l += l.length ? ", option:eq(" + q + ")" : "option:eq(" + q + ")")
            }
            o.selectBox.find(l).remove()
        } else {
            "number" === n ? o.selectBox.find("option").eq(a).remove() : o.selectBox.find("option").remove()
        }
        return o.dropdown ? o.refresh(function () {
            o._callbackSupport(r)
        }, !0) : o._callbackSupport(r), o
    }, h.selectOption = function (a, n) {
        var m = this,
            l = g.type(a);
        return "number" === l ? m.selectBox.val(m.selectItems.eq(a).val()).change() : "string" === l && m.selectBox.val(a).change(), m._callbackSupport(n), m
    }, h.setOption = function (a, n, m) {
        var l = this;
        return "string" === g.type(a) && (l.options[a] = n), l.refresh(function () {
            l._callbackSupport(m)
        }, !0), l
    }, h.setOptions = function (a, l) {
        var e = this;
        return g.isPlainObject(a) && (e.options = g.extend({}, e.options, a)), e.refresh(function () {
            e._callbackSupport(l)
        }, !0), e
    }, h.wait = function (e, d) {
        var l = this;
        return l.widgetProto._delay.call(l, d, e), l
    }
});

function WelcomeMsg() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    var a = 0;
    var b = 0;
    this.Show = function () {
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        var c = "";
        if (userLogin != null && userLogin.isLoggedIn()) {
            c = this.pages.WelcomeMsg_LoggedIn;
            var d = userLogin.customerData;
            c = c.replace(/#CUSTOMERNAME#/gi, d.FirstName + " " + d.LastName);
            this.afterShowPage = function () {
                this.FillSliders(d)
            }
        } else {
            c = this.pages.WelcomeMsg_NotLoggedIn
        }
        $("#welcomeMsg").html(c);
        if (this.afterShowPage != null) {
            this.afterShowPage()
        }
    };
    this.FillSliders = function (j) {
        if (j.hasActiveOrders.toLowerCase() == "true") {
            $("#order_track").show()
        } else {
            $("#order_track").hide()
        }
        $(".history_orders").unbind("click");
        $(".history_orders").click(function () {
            loadOtherScripts(function () {
                showHistoryOrders()
            })
        });
        $(".favorite_orders").unbind("click");
        $(".favorite_orders").click(function () {
            loadOtherScripts(function () {
                showFavoriteItems()
            })
        });
        var e = $("#historySlider");
        e.empty();
        if (j.HistoryOrders.length == 0) {
            e.html("<div style='padding: 1em'><h6>" + Translate("You don't have history orders") + "</h6></div>")
        } else {
            $("#historySlider").width(j.HistoryOrders.length * 100 + "%")
        }
        for (var g = 0; g < j.HistoryOrders.length; g++) {
            var c = j.HistoryOrders[g];
            var k = HTML_Pages.orderSlide;
            k = k.replace(/#ORDERID#/gi, c.orderID);
            k = k.replace(/#WIDTH#/gi, 100 / j.HistoryOrders.length + "%");
            k = k.replace(/#DETAILS#/gi, formatDate(ConvertDateServerDate(c.orderDate), "dd MMM, yyyy") + "<br />" + c.orderTitle.slice(0, 40) + "...");
            k = k.replace(/#REORDERLINK#/gi, genActionLink({
                owner: this,
                cart: c.orderCart
            }, function (n) {
                var m = n.cart;
                var l = n.owner;
                googleTag.push({
                    event: "Reorder From History",
                    Category: "Home",
                    ElementType: "",
                    ID: "",
                    Name: ""
                });
                reorderCheck(m)
            }));
            e.append(k)
        }
        $(function () {
            var l = $("#historySlider .orderSlide");
            $("#NextHist").click(function () {
                a = ++a % l.length;
                $("#historySlider").animate({
                    left: -(l.eq(a).position().left)
                }, 600)
            });
            $("#PrevHist").click(function () {
                a = --a % l.length;
                $("#historySlider").animate({
                    left: -(l.eq(a).position().left)
                }, 600)
            })
        });
        if (j != null && j.favItems != null && FavoriteItemsList.length == 0) {
            FavoriteItems.InitFavList(j.favItems)
        }
        var d = [];
        for (var g = 0; g < FavoriteItemsList.length; g++) {
            if (FavoriteItems.canDisplayed(FavoriteItemsList[g])) {
                d.push(FavoriteItemsList[g])
            }
        }
        var f = $("#favoriteSlider");
        f.empty();
        if (d.length == 0) {
            f.html("<div style='padding: 1em'><h6>" + Translate("You don't have favorite items") + "</h6></div>")
        } else {
            $("#favoriteSlider").width(d.length * 100 + "%")
        }
        for (var g = 0; g < d.length; g++) {
            var h = d[g];
            var k = HTML_Pages.orderSlide;
            k = k.replace(/#WIDTH#/gi, 100 / d.length + "%");
            k = k.replace(/#DETAILS#/gi, h.Name + "<br />" + (h.Description != null ? h.Description : "").slice(0, 40) + "...");
            k = k.replace(/#REORDERLINK#/gi, genActionLink({
                owner: this,
                cartItem: h
            }, function (n) {
                var m = n.cartItem;
                var l = n.owner;
                googleTag.push({
                    event: "Reorder From Favorite",
                    Category: "Home",
                    ElementType: "",
                    ID: "",
                    Name: ""
                });
                FavoriteItems.ReorderItem(m.EntryID, 1)
            }));
            f.append(k)
        }
        $(function () {
            var l = $("#favoriteSlider .orderSlide");
            $("#NextFav").click(function () {
                b = ++b % l.length;
                $("#favoriteSlider").animate({
                    left: -(l.eq(b).position().left)
                }, 600)
            });
            $("#PrevFav").click(function () {
                b = --b % l.length;
                $("#favoriteSlider").animate({
                    left: -(l.eq(b).position().left)
                }, 600)
            })
        });
        $(window).resize(function () {
            $("#favoriteSlider").css("left", 0);
            $("#historySlider").css("left", 0);
            b = 0;
            a = 0
        })
    }
}

function isEmpty(b) {
    if (b == null) {
        return true
    }
    if (b.length > 0) {
        return false
    }
    if (b.length === 0) {
        return true
    }
    for (var a in b) {
        if (hasOwnProperty.call(b, a)) {
            return false
        }
    }
    return true
}
var edit = null;
var oldChangeAddressTo = null;
var PromoMenu = null;
var homeSliderItem = 0;

function showEditProfile(a) {
    if (!ValidateLogin()) {
        return
    }
    changeAddressTo("editprofile");
    edit = new EditProfile();
    edit.pages = HTML_Pages;
    edit.pagesContainer = $("#container_inner").get(0);
    edit.beforeShowPage = function () {
        closefloat()
    };
    edit.afterShowPage = function () {
        FillEditProfilePage();
        showFloat("EDIT PROFILE", 2);
        $("input, textarea").placeholder()
    };
    edit._SubmitAccountDone = edit.SubmitAccountDone;
    edit.SubmitAccountDone = function (b, c) {
        this._SubmitAccountDone(b, c);
        $("#ProfileNotifications").hide();
        $("#ProfileGeneral").hide();
        var d = userLogin.customerData;
        $("#fullname").html(d.FirstName + " " + d.LastName);
        $("#defTel").html(d.PhoneNumber);
        $("#emailAdd").html(d.EMail);
        $("#mainProfileDiv").show();
        if (a == "undefined") {
            ScrollUp(($("#frmEdit").offset().top) - 20)
        }
    };
    edit.afterClose = a;
    edit.btnChangeEmail_Click = function () {
        showChangeEmail()
    };
    edit.btnChangePassword_Click = function () {
        showChangePassword()
    };
    edit.btnChangeSecurityQ_Click = function () {
        showChangeSecurityQ()
    };
    edit.btnNotificationsInfo_Click = function () {
        ShowChangeNotifications()
    };
    edit.Show()
}

function FillEditProfilePage() {
    var e = userLogin.customerData;
    $("#fullname").html(e.FirstName + " " + e.LastName);
    $("#defTel").html(e.PhoneNumber);
    $("#emailAdd").html(e.EMail);
    $("#editProfileBtn").click(function () {
        $("#mainProfileDiv").hide();
        edit.btnGeneralInformation_Click();
        $("#btnSubmitAccount").unbind("click");
        $("#btnSubmitAccount").click(function () {
            edit.validator.ValidateBeforePost(function (f) {
                edit.btnSubmitAccount_Click()
            })
        })
    });
    $("#history_orders").unbind("click");
    $("#history_orders").click(function () {
        loadOtherScripts(function () {
            showHistoryOrders()
        });
        return false
    });
    $(".history_orders").unbind("click");
    $(".history_orders").click(function () {
        loadOtherScripts(function () {
            showHistoryOrders()
        });
        return false
    });
    $("#fav_menu").unbind("click");
    $("#fav_menu").click(function () {
        loadOtherScripts(function () {
            showFavoriteMenu()
        });
        return false
    });
    $("#fav_items").unbind("click");
    $("#fav_items").click(function () {
        loadOtherScripts(function () {
            showFavoriteItems()
        });
        return false
    });
    var b = $("#addresses");
    b.empty();
    for (var d = 0; d < e.Addresses.length; d++) {
        var a = e.Addresses[d];
        var c = HTML_Pages.EditProfile_AddressItem;
        c = c.replace(/#NO#/gi, d + 1);
        c = c.replace(/#ID#/gi, a.ID);
        c = c.replace(/#ADDRESSNAME#/gi, a.Name);
        c = c.replace(/#TYPE#/gi, a.AddressTypeName);
        c = c.replace(/#BUILDINGNAME#/gi, a.BldngName);
        c = c.replace(/#STREET#/gi, a.StreetText);
        c = c.replace(/#AREA#/gi, a.AreaText);
        c = c.replace(/#PROVINCE#/gi, a.ProvinceText);
        c = c.replace(/#PHONENUMBER1#/gi, a.Phone1Number);
        c = c.replace(/#DESCRIPTION#/gi, a.Description);
        b.append(c)
    }
    $(".editAddress").click(function () {
        ShowEditAddress($(this).attr("id"))
    });
    $("#btnAddNewAddress").click(function () {
        ShowNewAddressForm()
    });
    $("#btnCancelAddress").click(function () {
        $("#ChangeAddress").hide();
        $("#mainProfileDiv").show();
        ScrollUp(($("#frmEdit").offset().top) - 20)
    })
}

function showChangeEmail() {
    var a = HTML_Pages.EditProfile_ChangeEMail;
    $("#ChangeEMail").html(a);
    $("#ProfileGeneral").hide();
    $("#ChangeEMail").show();
    ScrollUp(($("#frmEdit").offset().top) - 20);
    this.validator = new FormValidator($("#frmChangeEmail"), {
        newemail: {
            required: true,
            requiredMsg: Translate("Please fill the EMail address"),
            email: true,
            emailMsg: Translate("Please enter a valid EMail address")
        },
        confirmnewemail: {
            required: true,
            requiredMsg: Translate("Please fill Confirm Email Address field"),
            email: true,
            emailMsg: Translate("Please enter a valid EMail address"),
            equalTo: "#newemail",
            equalToMsg: Translate("Please enter the same EMail address as above")
        }
    });
    this.validator.onShowValidateMessage = function (g, c, e, f, h) {
        var d = null;
        if (!g) {
            tooltip($("#" + c), f, 0, h, d)
        } else {
            tooltip($("#" + c), "", 1, false, d)
        }
    };
    var b = this;
    $("#btnSubmitChangeEMail").click(function () {
        b.validator.ValidateBeforePost(function (c) {
            edit.SubmitEMailDone = _SubmitEMailDone;
            edit.btnSubmitEMail_Click();
            ScrollUp(($("#frmEdit").offset().top) - 20)
        })
    });
    $("#btnCancelChangeEMail").click(function () {
        $("#ChangeEMail").hide();
        $("#ProfileGeneral").show();
        ScrollUp(($("#frmEdit").offset().top) - 20)
    });
    googleTag.push({
        event: "Open",
        Category: "Change Email",
        ElementType: "",
        ID: "",
        Name: ""
    })
}

function _SubmitEMailDone(a, b) {
    if (a) {
        if (b.valid) {
            alert(b.message);
            $("#ChangeEMail").hide();
            $("#ProfileGeneral").show();
            ScrollUp(($("#frmEdit").offset().top) - 20);
            googleTag.push({
                event: "Submit",
                Category: "Change Email",
                ElementType: "",
                ID: "",
                Name: ""
            })
        } else {
            alert(b.message)
        }
    } else {
        alert("Request failed")
    }
}

function showChangePassword() {
    var a = HTML_Pages.EditProfile_ChangePassword;
    $("#ChangePassword").html(a);
    $("#ProfileGeneral").hide();
    $("#ChangePassword").show();
    ScrollUp(($("#frmEdit").offset().top) - 20);
    this.validator = new FormValidator($("#frmChangePassword"), {
        currentpassword: {
            required: true,
            requiredMsg: Translate("Please fill Current Password field")
        },
        newpassword: {
            required: true,
            requiredMsg: Translate("Please fill Confirm New Password field")
        },
        confirmnewpassword: {
            required: true,
            requiredMsg: Translate("Please fill Confirm New Password field"),
            equalTo: "#newpassword",
            equalToMsg: Translate("Please enter the same password as above")
        }
    });
    this.validator.onShowValidateMessage = function (g, c, e, f, h) {
        var d = null;
        if (!g) {
            tooltip($("#" + c), f, 0, h, d)
        } else {
            tooltip($("#" + c), "", 1, false, d)
        }
    };
    var b = this;
    $("#btnSubmitPassword").click(function () {
        b.validator.ValidateBeforePost(function (c) {
            edit.SubmitPasswordDone = _SubmitPasswordDone;
            edit.btnSubmitPassword_Click();
            ScrollUp(($("#frmEdit").offset().top) - 20)
        })
    });
    $("#btnCancelPassword").click(function () {
        $("#ChangePassword").hide();
        $("#ProfileGeneral").show();
        ScrollUp(($("#frmEdit").offset().top) - 20)
    });
    googleTag.push({
        event: "Open",
        Category: "Change Password",
        ElementType: "",
        ID: "",
        Name: ""
    })
}

function _SubmitPasswordDone(a, b) {
    if (a) {
        if (b.valid) {
            alert(b.message);
            $("#ChangePassword").hide();
            $("#ProfileGeneral").show();
            ScrollUp(($("#frmEdit").offset().top) - 20);
            googleTag.push({
                event: "Submit",
                Category: "Change Password",
                ElementType: "",
                ID: "",
                Name: ""
            })
        } else {
            alert(b.message)
        }
    } else {
        alert("Request failed")
    }
}

function showChangeSecurityQ() {
    var a = HTML_Pages.EditProfile_ChangeSecurityQ;
    $("#ChangeSecurityQ").html(a);
    if (useJUICombo) {
        $("#securityQuestion").combobox()
    }
    $("#ProfileGeneral").hide();
    $("#ChangeSecurityQ").show();
    ScrollUp(($("#frmEdit").offset().top) - 20);
    this.validator = new FormValidator($("#frmChangeSecQ"), {
        secQCurrentPassword: {
            required: true,
            requiredMsg: Translate("Please fill Current Password field")
        },
        securityQuestion: {
            customValidation: function (c, d, f) {
                var e = parseInt($("#securityQuestion").val());
                if (e < 0) {
                    f(false, Translate("Please select a security question"), d)
                } else {
                    f(true, "", d)
                }
            }
        },
        securityAnswer: {
            required: true,
            requiredMsg: Translate("Please enter an answer to the question chosen above.")
        }
    });
    this.validator.onShowValidateMessage = function (g, c, e, f, h) {
        var d = null;
        if (!g) {
            tooltip($("#" + c), f, 0, h, d)
        } else {
            tooltip($("#" + c), "", 1, false, d)
        }
    };
    if (isTouchDevice()) { }
    var b = this;
    $("#btnSubmitChangeSecQ").click(function () {
        b.validator.ValidateBeforePost(function (c) {
            edit.SubmitSecurityQDone = _SubmitSecurityQDone;
            edit.btnSubmitSecurityQ_Click();
            ScrollUp(($("#frmEdit").offset().top) - 20)
        })
    });
    $("#btnCancelChangeSecQ").click(function () {
        $("#ChangeSecurityQ").hide();
        $("#ProfileGeneral").show();
        ScrollUp(($("#frmEdit").offset().top) - 20)
    });
    googleTag.push({
        event: "Open",
        Category: "Change Security Question",
        ElementType: "",
        ID: "",
        Name: ""
    })
}

function _SubmitSecurityQDone(a, b) {
    if (a) {
        if (b.valid) {
            alert(b.message);
            $("#ChangeSecurityQ").hide();
            $("#ProfileGeneral").show();
            ScrollUp(($("#frmEdit").offset().top) - 20);
            googleTag.push({
                event: "Submit",
                Category: "Change Security Question",
                ElementType: "",
                ID: "",
                Name: ""
            })
        } else {
            alert(b.message)
        }
    } else {
        alert("Request failed")
    }
}

function ShowChangeNotifications() {
    $("#mainProfileDiv").hide();
    edit.FillGeneralData();
    $("#ProfileNotifications").show();
    ScrollUp(($("#frmEdit").offset().top) - 20);
    $("#btnSubmitAccount2").click(function () {
        edit.validator.ValidateBeforePost(function (a) {
            edit.btnSubmitAccount_Click();
            ScrollUp(($("#frmEdit").offset().top) - 20)
        })
    })
}

function ShowNewAddressForm() {
    edit.getSelectedActiveAddress = function () {
        return null
    };
    $("#mainProfileDiv").hide();
    edit.FillAddressData();
    $("#ChangeAddress").show();
    if (AddressEntryType == "Both" || AddressEntryType == "Map") {
        google.maps.event.trigger(edit.map, "resize");
        edit.map.setCenter(new google.maps.LatLng(edit.address_latitude, edit.address_longitude))
    }
}

function ShowEditAddress(a) {
    edit.getSelectedActiveAddress = function () {
        var e = userLogin.customerData;
        var b = null;
        for (var c = 0; c < e.Addresses.length; c++) {
            var d = e.Addresses[c];
            if (d.ID == a) {
                b = d;
                break
            }
        }
        return b
    };
    $("#mainProfileDiv").hide();
    edit.FillAddressData();
    if (isTouchDevice()) { }
    $("#ChangeAddress").show();
    if (AddressEntryType == "Both" || AddressEntryType == "Map") {
        google.maps.event.trigger(edit.map, "resize");
        edit.map.setCenter(new google.maps.LatLng(edit.address_latitude, edit.address_longitude))
    }
    googleTag.push({
        event: "Edit Address",
        Category: "Address Book",
        ElementType: "",
        ID: "",
        Name: ""
    })
}

function ScrollUp(a) {
    window.scrollTo(0, a)
}

function ScrollToElement(b) {
    var a = ($("#" + b).offset().top) - 20;
    window.scrollTo(0, a)
}

function createShadow(a) { }

function hideScroll() { }

function mobileScrollTop() {
    $(window).scrollTop(0)
}

function showFloat(e, a, d, b) {
    hideScroll();
    if (typeof e === "undefined") {
        e = ""
    }
    if (typeof a === "undefined") {
        a = 1
    }
    if (typeof d === "undefined") {
        d = false
    }
    if (typeof b === "undefined") {
        b = false
    }
    closefloat();
    document.bk.enable(true);
    $("#popup_form_title").html(e);
    if (e == "Nutrition Information") {
        $("#customDropdown").combobox()
    }
    if (e == "Register" || e == "CONTACT US" || e == "Nutrition Information") { }
    if (e == "CHECKOUT" || e == "FAQs" || e == "Register") {
        BindAccordion()
    }
    $("#welcomeMsg").hide();
    $("#homePage").hide();
    $("#homeBanner").hide();
    $("#content").hide();
    $("#basket_box").hide();
    $("#container_inner").show();
    $("#upperSubMenu").show();
    $("#lowerSubMenu").show();
    $("#signupform").show();
    if (e == "CHECKOUT") {
        checkoutAfterShowPage()
    }
    if (e == "Nutrition Information") {
        nutritionAfterShowPage()
    }
    if (e == "Deal Builder") {
        $("#upperSubMenu").hide();
        $("#container_inner").css("padding-top", 0)
    }
    if (e == "FAQs") {
        $(".findStore").unbind("click");
        $(".findStore").click(function () {
            loadOtherScripts(function () {
                ShowStoreLocator()
            });
            return false
        })
    }
    if (e == "LOGIN" && $(window).width() < 500) {
        ScrollToElement("UsenameContainer")
    }
    $("input, textarea").placeholder();
    $("select").bind({
        open: function () {
            $(".selectboxit-options").css("z-index", getTopmostZIndex())
        },
        close: function () {
            $(".selectboxit-options").css("z-index", 1)
        }
    });
    if (e == "FAVORITE MENU") {
        var c = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if (c) {
            $("#favoriteorder_container").addClass("Chrome")
        }
    }
    if (e == "HISTORY ORDERS") {
        var c = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if (c) {
            $("#historyorder_container").addClass("Chrome")
        }
    }
    if (e == "PASSWORD RECOVERY") {
        $("#RecoveryStep1").css("display", "block")
    }
}

function checkoutAfterShowPage() {
    if (isTouchDevice()) { }
    $("#dockedBasket").hide();
    $("#upperSubMenu").hide();
    checkoutForm._updateDateLabel = checkoutForm.updateDateLabel;
    checkoutForm.updateDateLabel = function (a, b) {
        checkoutForm._updateDateLabel(a, b)
    };
    checkoutForm.showChangepayMethod = function () {
        $("#CHECKOUT_POST").hide();
        $("#changepaymethod").show();
        $("html, body").animate({
            scrollTop: $("#changepaymethod").offset().top - 150
        }, 2000);
        $("#CHECKOUT_CANCELORDER").data("ctrlr", this);
        $("#CHECKOUT_CANCELORDER").click(function () {
            $(this).data("ctrlr").CancelOrder()
        });
        $("#CHECKOUT_CASH").data("ctrlr", this);
        $("#CHECKOUT_CASH").click(function () {
            $(this).data("ctrlr").ChangeToCashOrder()
        });
        $("#CHECKOUT_CREDIT").data("ctrlr", this);
        $("#CHECKOUT_CREDIT").click(function () {
            $(this).data("ctrlr").ChangeToCreditOrder()
        });
        setFloatingWindowStyle(1)
    };
    checkoutForm.useCountDown = true
}

function nutritionAfterShowPage() {
    $("#allergensInfo").click(function () {
        $("#nutritionInfo").removeClass("active");
        $("#allergensInfo").addClass("active");
        $("#NutritionContainer").hide();
        $("#AllergenContainer").show()
    });
    $("#nutritionInfo").click(function () {
        $("#allergensInfo").removeClass("active");
        $("#nutritionInfo").addClass("active");
        $("#AllergenContainer").hide();
        $("#NutritionContainer").show()
    })
}

function shareToFacebook() {
    FB.ui({
        method: "feed",
        name: "Pizza Hut Middle East",
        link: "http://www.pizzahut.ae",
        picture: "http://www.pizzahut.ae/Themes/Yum-PizzaHut-Americana-v1/Image/logo-sq-150.png",
        caption: "I just ordered from PH UAE",
        description: "Pizza Hut Middle East has been sharing the fun times and delicious products across the region since 1986! Check out our latest deals @ www.pizzahut.ae"
    })
}

function setFloatingWindowStyle(a) { }

function closefloat(a) {
    if (typeof a === "undefined") {
        a = false
    }
    if (typeof document.close_in !== "undefined" && document.close_in == true) {
        return
    }
    document.close_in = true;
    $("#upperSubMenu").show();
    $("#lowerSubMenu").show();
    $("#basket_box").hide();
    $("#StoreLocatorContainer").hide();
    $("#PromotionMenu").hide();
    $("#dockedBasket").show();
    $("#signupform").show();
    ShowWelcomeMsg();
    if (!a) {
        $("#container_inner").hide();
        $("#content").hide();
        $("#welcomeMsg").show();
        $("#homePage").show();
        $("#homeBanner").show()
    }
    if (typeof document.close_callback !== "undefined" && document.close_callback != null) {
        document.close_callback();
        document.close_callback = null
    }
    document.close_in = false;
    mobileScrollTop();
    updatePromoPage();
    styleHomeSubmenu();
    $("input, textarea").placeholder();
    $("#DEALITEMPRICE_-8412004_0").text($("#DEALITEMPRICE_-8412004_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-8411004_0").text($("#DEALITEMPRICE_-8411004_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-8410004_0").text($("#DEALITEMPRICE_-8410004_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-6148012_0").text($("#DEALITEMPRICE_-6148012_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-4156012_0").text($("#DEALITEMPRICE_-4156012_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-693014_0").text($("#DEALITEMPRICE_-693014_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-692012_0").text($("#DEALITEMPRICE_-692012_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-690014_0").text($("#DEALITEMPRICE_-690014_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-689012_0").text($("#DEALITEMPRICE_-689012_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-687014_0").text($("#DEALITEMPRICE_-687014_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-686012_0").text($("#DEALITEMPRICE_-686012_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-685014_0").text($("#DEALITEMPRICE_-685014_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-684014_0").text($("#DEALITEMPRICE_-684014_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-683012_0").text($("#DEALITEMPRICE_-683012_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-682008_0").text($("#DEALITEMPRICE_-682008_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-681012_0").text($("#DEALITEMPRICE_-681012_0").text().replace("Extra ", ""));
    $("#DEALITEMPRICE_-3676002_0").text($("#DEALITEMPRICE_-3676002_0").text().replace("Extra ", ""))
}

function closeFloatPerm(a) {
    closefloat(a);
    $.address.value("")
}

function closeOrBack() {
    if (history.length > 0) {
        history.back()
    } else {
        closefloat()
    }
}

function showMyCart() {
    mobileScrollTop();
    changeAddressTo("basket");
    updateAddressOrderMode();
    storeAddressLocator.Close();
    $("#welcomeMsg").hide();
    $("#homePage").hide();
    $("#homeBanner").hide();
    $("#container_inner").hide();
    $("#signupform").hide();
    $("#upperSubMenu").hide();
    $("#lowerSubMenu").show();
    $("#content").hide();
    $("#dockedBasket").hide();
    $("#basket_box").show();
    $("#StoreLocatorContainer").hide();
    $("#PromotionMenu").hide();
    $("#basketitems_box img").each(function () {
        this.onerror = function () {
            ReplaceMissingImage(this)
        }
    });
    googleTag.push({
        event: "PageView",
        PageName: "Shopping Cart",
        PageURL: "/basket"
    });
    googleTag.push({
        event: "Open",
        Category: "Shopping Cart",
        ElementType: "",
        ID: "",
        Name: ""
    })
}

function showBkMenu() {
    mobileScrollTop();
    $("#welcomeMsg").hide();
    $("#homePage").hide();
    $("#homeBanner").hide();
    $("#container_inner").hide();
    $("#signupform").show();
    $("#upperSubMenu").show();
    $("#lowerSubMenu").show();
    $("#basket_box").hide();
    $("#dockedBasket").show();
    $("#content").show();
    adjustMenuItemsPositions()
}

function showHome() {
    FillItemsSequence(HomeSubmenu);
    changeAddressTo("/");
    mobileScrollTop();
    ShowWelcomeMsg();
    $("#container_inner").hide();
    $("#PromotionMenu").hide();
    $("#upperSubMenu").show();
    $("#lowerSubMenu").show();
    $("#StoreLocatorContainer").hide();
    $("#content").hide();
    $("#basket_box").hide();
    $("#dockedBasket").show();
    $("#signupform").show();
    $("#welcomeMsg").show();
    $("#homePage").show();
    $("#homeBanner").show();
    updatePromoPage();
    styleHomeSubmenu();
    googleTag.push({
        event: "PageView",
        PageName: "Home",
        PageURL: "/" + UserLanguage + "/home"
    });
    googleTag.push({
        event: "Open",
        Category: "Home",
        ElementType: "",
        ID: "",
        Name: ""
    })
}

function CloseAppPopup() {
    $("#downloadApp").hide()
}
$(document).ready(function () {
    if (isTouchDevice()) {
        $("#downloadApp").show()
    }
    minimumOrderTotal = 0;
    //for (var c in OriginalStores) {
    //    if (OriginalStores[c].Services.indexOf("Delivery") == -1) {
    //        OriginalStores[c].Delivery = false
    //    }
    //    if (OriginalStores[c].Services.indexOf("Takeout") == -1) {
    //        OriginalStores[c].Takeout = false
    //    }
    //    if (OriginalStores[c].Services.indexOf("Dine-in") == -1) {
    //        OriginalStores[c].DineIn = false
    //    }
    //}
    PhoneMasks[2] = "059-9999999";
    AddPromoItem();
    var e = new TopMenu();
    e.data = MenuList;
    e.pages = HTML_Pages;
    e.menuContainer = $("#main-nav2").get(0);
    e.menuClick = function (f) {
        ItemsViewerOpenMenu(f)
    };
    e.beforeShowPage = function () {
        closefloat()
    };
    e.afterShowPage = function () {
        showFloat("MENU LIST", 0)
    };
    e.Init();
    updateMenuName();
    $(window).resize(function () {
        updateMenuName()
    });
    updatePromoPage();
    PromoMenu = new ItemsViewer();
    PromoMenu.dataItems = HomeSubmenu.Items;
    PromoMenu.dataTitle = HomeSubmenu.Name;
    PromoMenu.ImagesFolder = HomeSubmenu.ImagesFolder;
    PromoMenu.imgExtentions = HomeSubmenu.imgExtentions;
    PromoMenu.container = $("#homePromoMenuItems").get(0);
    PromoMenu.addItemToCart = function (f) {
        cart.addItemToCart(f)
    };
    PromoMenu.showItemInfo = function (f) {
        showItemInformation(f, true)
    };
    PromoMenu.customizeItem = function (g, f) {
        showItemCustomize(g, f)
    };
    PromoMenu.activeStyle = new HtmlStyle("Promo_ItemsContainer", "Promo_ItemFilter", "Promo_Item", "BackgroundList_ThumbsItem_SelectorItem", 0, 0, "Thumbs", false, true);
    PromoMenu.Init();
    styleHomeSubmenu();
    $($("#homePromoMenuItems").find(".SubMenuItem")[0]).addClass("dealItem");
    $($("#homePromoMenuItems").find(".SubMenuItem")[1]).addClass("dealItem");
    $("#home").unbind("click");
    $("#home").click(function (f) {
        f.preventDefault();
        showHome()
    });
    cart.onCartUpdated = function () {
        showAddingNotify()
    };
    var d = $("#catNavPrimary").html();
    var a = Translate("Pizza Builder");
    var b = -6640000;
    d += "<li><a id='builder' href='#/pizzabuilder/" + b + "'>" + a + "</a> </li>";
    $("#navigation").append(d);
    if (typeof tooltip !== "undefined") {
        oldTooltip = tooltip
    }
    tooltip = function (j, k, f, h, g) {
        if (!j.closest("section").hasClass("active")) {
            j.closest("section").find("a.sectionheader").trigger("click")
        }
        if (oldTooltip != null) {
            oldTooltip(j, k, f, h, g)
        }
        if (!f) {
            j.addClass("error")
        } else {
            j.removeClass("error")
        }
    };
    $("#login").click(function () {
        changeAddressTo("/login");
        $("#homePage").hide();
        $("#homeBanner").hide();
        $("#content").hide();
        $("#basket_box").hide();
        showLoginWindow();
        $("#container_inner").show();
        $("#upperSubMenu").show();
        $("#lowerSubMenu").show();
        $("#signupform").show();
        return false
    });
    toolTop = 20;
    toolLeft = 0;
    $("#phone1type").selectBoxIt();
    cart.drawCart({
        itemGroupTemplate: "CartItemGroup",
        itemTemplate: "CartItem",
        itemDetTemplate: "CartItemDetail",
        itemTemplateEmpty: "CartItemEmpty",
        basketItemsUI: $("#cart_basketitems_box"),
        basketTotalUI: $("#cart_basketTotal"),
        basketSubTotalUI: $("#cart_subTotalPrice"),
        orderStatusUI: $("#cart_OrderStatus")
    });
    cart.updateCart();
    cart.onAddNewItem = function (l) {
        var m = l.Name;
        var k = l.Price;
        if (typeof l.DealID !== "undefined" && l.DealID > 0) {
            var f = dealNumber_extract(l.DealID);
            dealID = f.dealID;
            var j = f.bookmark;
            stepNumber = f.stepNumber;
            var g = OriginalDeals[dealID];
            m = g.Name;
            k = 0
        }
        $("#addedItemName").html(m);
        if (k > 0) {
            if (l._qtyToAdd > null && l._qtyToAdd !== "undefined") {
                k = k * l._qtyToAdd
            }
            $("#addedItemPrice").html(k + CurrencySymbol)
        } else {
            $("#addedItemPrice").html("")
        }
        var h = _genActionLink(l, function (n) {
            cart.clearItem(getCartItemCRC(n))
        }, true);
        $("#delAddedItem").attr("href", h);
        $("#addedToBasket").fadeIn();
        setTimeout(function () {
            $("#addedToBasket").fadeOut()
        }, 3000)
    };
    $("#cornerNav").unbind("click");
    $("#cornerNav").click(function (g) {
        g.preventDefault();
        var f = $("#navigation").offset().top;
        window.scrollTo(0, f)
    });
    bk.activeStyle.onItemFiltering = function () {
        adjustMenuItemsPositions()
    };
    bk.descLimit = 200;
    subscriptionForm();
    $("input, textarea").placeholder();
    $("select").bind({
        open: function () {
            $(".selectboxit-options").css("z-index", getTopmostZIndex())
        },
        close: function () {
            $(".selectboxit-options").css("z-index", 1)
        }
    });
    cart.timeValidation_doAddToCart = cart.addItemToCart;
    cart.addItemToCart = function (h) {
        var g = new Date(getDateFromFormat(cart.cartHeader.delivarytime_date, "yyyy-MM-dd HH:mm:ss"));
        var f = cart.cartHeader.DelivaryOrTakeout == "Delivary";
        if (validateItemOrderingTime(h.ID, f, g)) {
            cart.timeValidation_doAddToCart(h)
        }
    };
    _validatetime_showItemCustomize = showItemCustomize;
    showItemCustomize = function (k, f, j, l) {
        var h = new Date(getDateFromFormat(cart.cartHeader.delivarytime_date, "yyyy-MM-dd HH:mm:ss"));
        var g = cart.cartHeader.DelivaryOrTakeout == "Delivary";
        if (validateItemOrderingTime(k.ID, g, h)) {
            _validatetime_showItemCustomize(k, f, j, l)
        }
    };
    _validatetime_ItemsViewerOpenMenu = ItemsViewerOpenMenu;
    ItemsViewerOpenMenu = function (h, j) {
        var g = new Date(getDateFromFormat(cart.cartHeader.delivarytime_date, "yyyy-MM-dd HH:mm:ss"));
        var f = cart.cartHeader.DelivaryOrTakeout == "Delivary";
        if (validateMenuAccess(h, j, f, g)) {
            _validatetime_ItemsViewerOpenMenu(h, j)
        }
    };
    _validatetime_showDealBuilder = showDealBuilder;
    showDealBuilder = function (j, f) {
        var h = new Date(getDateFromFormat(cart.cartHeader.delivarytime_date, "yyyy-MM-dd HH:mm:ss"));
        var g = cart.cartHeader.DelivaryOrTakeout == "Delivary";
        if (validateItemOrderingTime(j.ID, g, h)) {
            _validatetime_showDealBuilder(j, f)
        }
    }
});

function ShowSignIn() {
    changeAddressTo("/login");
    $("#homePage").hide();
    $("#homeBanner").hide();
    $("#content").hide();
    $("#basket_box").hide();
    showLoginWindow();
    $("#container_inner").show();
    $("#upperSubMenu").show();
    $("#lowerSubMenu").show();
    $("#signupform").show()
}

function ShowSignUp() {
    showCustomerRegistration()
}

function ShowWelcomeMsg() {
    var a = new WelcomeMsg();
    a.pages = HTML_Pages;
    a.Show()
}
IsItemCustomizable = function (d, f, e) {
    var c = 0;
    if (typeof e !== "undefined") {
        c = e.DealID
    }
    if (typeof f === "undefined") {
        f = false
    }
    if (d.SpecialItem) {
        return {
            canAdd: true,
            canCustomize: false
        }
    } else {
        if (d.IsSubmenu) {
            return {
                canAdd: false,
                canCustomize: false
            }
        } else {
            if (d.IsDeal) {
                return {
                    canAdd: false,
                    canCustomize: true
                }
            } else {
                if (typeof OriginalVirtualGroups[d.VirtualGroupID] !== "undefined" && c != 0 && d.CustomizationType == 0) {
                    return {
                        canAdd: false,
                        canCustomize: false
                    }
                } else {
                    var b = true;
                    var a = d.CustomizationType > 0;
                    if (f) {
                        a = d.CustomizationType > 0 || d.VirtualGroupID > 0 || itemHasQuickCustomize(d.ID)
                    }
                    return {
                        canAdd: b,
                        canCustomize: a
                    }
                }
            }
        }
    }
};

function BindAccordion() {
    $("section .title").click(function (a) {
        section = $(this).closest("section");
        if (section.hasClass("active")) {
            section.removeClass("active")
        } else {
            section.addClass("active")
        }
        a.preventDefault()
    })
}

function showAddingNotify() { }

function shareChannel(a, b) {
    document.getElementById("spanID1").setAttribute("st_url", a);
    document.getElementById("spanID1").setAttribute("st_title", b);
    stButtons.locateElements();
    displaypopup()
}

function adjustMenuItemsPositions() {
    var a = $(".SubMenuItem").parent();
    a.each(function () {
        doAdjustMenuItemsPositions($(this))
    })
}

function doAdjustMenuItemsPositions(l) {
    var k = 720;
    var m = l.find(".SubMenuItem");
    if (l.hasClass("homeMenuItmContainer")) {
        return
    }
    $("#BKID_-47000_1").hide();
    $("#BKID_361_5").hide();
    m = m.filter(function () {
        return $(this).css("display") != "none"
    });
    l.css("position", "relative");
    var n = l.width();
    if (n <= k) {
        l.css("height", "");
        m.each(function () {
            $(this).css("position", "");
            $(this).css("left", "");
            $(this).css("right", "");
            $(this).css("top", "")
        });
        return
    }
    var o = m.height();
    var a = m.width();
    var g = n * 3.58 / 100;
    var h = Math.floor((n + g) / (a + g));
    var f = Math.ceil(m.length / h);
    var e = 0;
    var p = 0;
    var c = Math.round((n - (h * (a + g) - g)) / 2);
    var b = c;
    l.height(f * (o + g));
    for (var d = 0; d < m.length; d++) {
        if (e >= h) {
            e = 0;
            b = 0;
            p += o + g;
            b = c
        }
        if (e == 0 && ((m.length - d) < h)) {
            h = m.length - d;
            b = Math.round((n - (h * (a + g) - g)) / 2)
        }
        if (e == 0 && ((m.length - d) >= h) && h == 4) {
            b = 15
        }
        var j = $(m.get(d));
        j.css("position", "absolute");
        if (!translate) {
            j.css("left", b);
            j.css("top", p)
        } else {
            j.css("right", b);
            j.css("top", p)
        }
        b += a + g;
        e++
    }
}
$(window).resize(function () {
    var a = window.location.hash.toString() == "" || window.location.hash.toString() == "#/" || window.location.hash.toString() == "#";
    if (!a) {
        adjustMenuItemsPositions()
    } else {
        styleHomeSubmenu()
    }
});

function subscriptionForm() {
    this.subFrmValidator = new FormValidator($("#signupform"), {
        subscriberName: {
            required: true,
            requiredMsg: Translate("Please enter your name")
        },
        subscriberEmail: {
            required: true,
            requiredMsg: Translate("Please fill the EMail address"),
            email: true,
            emailMsg: Translate("Please enter a valid EMail address")
        }
    });
    this.subFrmValidator.onShowValidateMessage = function (f, b, d, e, g) {
        var c = null;
        if (!f) {
            tooltip($("#" + b), e, 0, g, c)
        } else {
            tooltip($("#" + b), "", 1, false, c)
        }
    };
    $("#subscribeSubmit").data("owner", this);
    $("#subscribeSubmit").click(function (b) {
        b.preventDefault();
        $(this).data("owner").subFrmValidator.ValidateBeforePost(function (c) {
            document.getElementById("signupform").submit()
        })
    });
    if (userLogin.isLoggedIn()) {
        var a = userLogin.customerData;
        $("#subscriberName").val(a.FirstName + " " + a.LastName);
        $("#subscriberEmail").val(a.EMail)
    }
    if (userLogin.afterLogin != null) {
        userLogin.prevAfterLogin = userLogin.afterLogin
    } else {
        userLogin.prevAfterLogin = null
    }
    userLogin.afterLogin = function () {
        if (this.prevAfterLogin != null) {
            this.prevAfterLogin()
        }
        var b = userLogin.customerData;
        $("#subscriberName").val(b.FirstName + " " + b.LastName);
        $("#subscriberEmail").val(b.EMail);
        $("#subscriberName").removeClass("placeholder");
        $("#subscriberEmail").removeClass("placeholder")
    }
}

function isTouchDevice() {
    var a = {
        Android: function () {
            return navigator.userAgent.match(/Android/i) ? true : false
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i) ? true : false
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) ? true : false
        },
        any: function () {
            return (a.Android() || a.BlackBerry() || a.iOS() || a.Windows())
        }
    };
    return (("ontouchstart" in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0) || window.TouchEvent || window.Touch) && a.any()
}

function AddPromoItem() {
    document.ownpizza__showItemCustomize = showItemCustomize;
    showItemCustomize = function (e, a, c, f) {
        if (typeof e == "undefined" || isNaN(e.ID)) {
            var b = new Object();
            b.ID = e.OriginalItemID;
            b.Name = OriginalItems[e.OriginalItemID]["Name"];
            b.Price = 0;
            b.Weight = 0;
            b.modGroupsItems = new Array();
            var d = new Object();
            b.modGroupsItems.push(d);
            var e = OriginalItems[b.ID];
            e.SelectedToppingFilter = 2;
            showPizzaBuilder(e, b, f);
            return
        }
        document.ownpizza__showItemCustomize(e, a, c, f)
    }
}

function styleHomeSubmenu() {
    $(".homeMenuItmContainer").addClass("sliderWrapper");
    $("#homePromoMenuItems").addClass("main-slider-space");
    $("#homeDealsCarousel2").addClass("sliderContainer");
    $(function () {
        var j = $(".sliderWrapper .SubMenuItem");
        $("#main-slider-next").unbind("click");
        $("#main-slider-next").bind("click", function () {
            ++homeSliderItem;
            if (homeSliderItem == j.length) {
                homeSliderItem = 0
            }
            slideTo(homeSliderItem)
        });
        $("#main-slider-prev").unbind("click");
        $("#main-slider-prev").click(function () {
            --homeSliderItem;
            if (homeSliderItem < 0) {
                homeSliderItem = j.length - 1
            }
            slideTo(homeSliderItem)
        })
    });
    if ($(".homeMenuItmContainer").hasClass("sliderWrapper")) {
        $(".sliderWrapper").stop();
        homeSliderItem = 0;
        $(".sliderWrapper").css("left", 0);
        var h = ($(".sliderWrapper .SubMenuItem").length * 100) + 10;
        var f = 100 / $(".sliderWrapper .SubMenuItem").length;
        $(".sliderWrapper").css("width", h + "%");
        $(".sliderWrapper .SubMenuItem").css("width", f + "%");
        var a = $(".homeMenuItmContainer").find(".SubMenuItem");
        var g = $("#promoPaging");
        var e = "";
        var b;
        for (i = 0; i < a.length; i++) {
            var c = i + 1;
            var d = "<div id='page_" + i + "' class='promoPage'>&nbsp;&nbsp;</div>";
            e = e + d
        }
        g.html(e);
        g.css("max-width", d * 20);
        if ($(window).width() >= 950) {
            g.css("left", ((11 - a.length) / 2) * 11 + "%")
        }
        $("#page_0").addClass("active");
        $(".promoPage").unbind("click");
        $(".promoPage").click(function (j) {
            homeSliderItem = this.id.replace("page_", "");
            slideTo(homeSliderItem)
        });

        function l() {
            if (typeof sliderInterval !== "undefined") {
                clearInterval(sliderInterval)
            }
            sliderInterval = setInterval(function () {
                homeSliderItem = ++homeSliderItem % $(".sliderWrapper .SubMenuItem").length;
                slideTo(homeSliderItem)
            }, 7000)
        }
        l();
        $(".sliderWrapper").hover(function () {
            if (typeof sliderInterval !== "undefined") {
                clearInterval(sliderInterval)
            }
        });
        $(".sliderWrapper").mouseleave(function () {
            l()
        })
    }
    var k = window.location.hash.toString() == "" || window.location.hash.toString() == "#/" || window.location.hash.toString() == "#";
    if (k) {
        $("#upperSubMenu").addClass("isHomePage");
        $("#main-nav").removeClass("med-large-100");
        $("#main-nav").addClass("med-large-90")
    } else {
        $("#upperSubMenu").removeClass("isHomePage");
        $("#main-nav").addClass("med-large-100");
        $("#main-nav").removeClass("med-large-90")
    }
}

function slideTo(a) {
    if ($(".sliderWrapper .SubMenuItem").length > 1) {
        $(".promoPage").removeClass("active");
        $("#page_" + a).addClass("active");
        if (isNaN(a)) {
            a = 0
        }
        $(".sliderWrapper").animate({
            left: -($(".sliderWrapper .SubMenuItem").eq(a).position().left)
        }, 600)
    }
}

function updatePromoPage() {
    var c = getSubMenuStyle(HomeSubmenu);
    for (var b in c) {
        var a = new ItemsViewer();
        var d = b;
        Items = c[b].Items;
        if (b == "Promo" || b == "default") {
            a.container = $("#homePromoMenuItems").get(0);
            d = "Promo"
        } else {
            a.container = $("#homeBanner").get(0)
        }
        FillItemsSequence(HomeSubmenu);
        a.dataItems = Items;
        a.dataTitle = HomeSubmenu.Name;
        a.ImagesFolder = HomeSubmenu.ImagesFolder;
        a.imgExtentions = HomeSubmenu.imgExtentions;
        a.openSubmenu = function (f) {
            var e = OriginalSubMenu[f.ID * -1];
            ItemsViewerOpenMenu(e, true)
        };
        a.addItemToCart = function (e) {
            cart.addItemToCart(e)
        };
        a.showItemInfo = function (e) {
            showItemInformation(e, true)
        };
        a.customizeItem = function (f, e) {
            showItemCustomize(f, e)
        };
        if (d == "") {
            d = "Promo"
        }
        if (d == "Promo") {
            a.activeStyle = new HtmlStyle(d + "_ItemsContainer", d + "_ItemFilter", d + "_Item", "BackgroundList_ThumbsItem_SelectorItem", 0, 0, "Thumbs", false, true)
        } else {
            a.activeStyle = new HtmlStyle(d + "_ItemsContainer", d + "_ItemFilter", d + "_Item", "BackgroundList_ThumbsItem_SelectorItem", 0, 0, "Thumbs", false, false)
        }
        a.Init()
    }
    $("#homePromoMenuItems").find(".SubMenuItem").removeClass("dealItem");
    $($("#homeBanner").find(".fakepanelContainer")[0]).addClass("fakepanelContainerLeft");
    $($("#homeBanner").find(".fakepanelContainer")[1]).addClass("fakepanelContainerRight");
    activateAppropriateEvent()
}

function getSubMenuStyle(f) {
    var e = {};
    for (var b in f.ItemsIDz) {
        var d = f.ItemsIDz[b];
        if (typeof d.Style === "undefined" && d.Style == "") {
            d.Style = "default"
        }
        if (typeof e[d.Style] === "undefined") {
            e[d.Style] = {};
            e[d.Style]["Items"] = []
        }
        var a = d.ID;
        var c = d.CalculatedPrice;
        var h = isNaN(a) ? f.Items[b] : OriginalItems[a];
        if (typeof h !== "undefined") {
            h.MenuPrice = c;
            h.SubMenu_ID = f.ID;
            h.SubMenu_Name = f.Name;
            if (h.ItemTitleStyle == "") {
                h.ItemTitleStyle = f.ItemTitleStyle
            }
            var g = e[d.Style]["Items"].length;
            e[d.Style]["Items"][g] = h
        }
    }
    return e
}

function CRMPopup() {
    var c = new PopupForm();
    c.width = 800;
    c.height = 600;
    c.container.addClass("suggestiveWrapper");
    c.Show();
    var a = c.container;
    var b = "crm-free-wings.jpg";
    var d = HTML_Pages.crmpopup;
    d = d.replace(/#OK#/gi, "OKBtnID");
    d = d.replace(/#IMG#/gi, b);
    a.html(d);
    $("#OKBtnID").data("popup", c);
    $("#OKBtnID").click(function () {
        $(this).data("popup").Close()
    })
}

function updateMenuName() {
    if ($(window).width() < 480) {
        $(".mnu-4000042").text("New San Francisco Pizza")
    } else {
        $(".mnu-4000042").text("New SFO Pizza")
    }
}
PizzaBuilder.prototype.controlsMap = [{
    type: "COMBO",
    title: "Size",
    index: 1,
    source: "selector1"
}, {
    type: "COMBO",
    title: "Dough",
    index: 2,
    source: "selector2"
}, {
    type: "COMBO",
    title: "Drizzle",
    index: 3,
    source: "selector3"
}, {
    type: "COMBO",
    title: "Crust Finisher",
    index: 4,
    source: "modgroup",
    link_condition: function (a) {
        return a.Name.toLowerCase().indexOf("cheesy bites crust") > -1
    }
}, {
    type: "COMBO",
    title: "Cuts",
    index: 6,
    source: "moditems",
    source_filter: function (a) {
        return a.ID >= 417 && a.ID <= 421
    }
}, {
    type: "TOPPING_GROUP",
    title: "Recipes",
    html_name: "recipes",
    source: "vgroup"
}, {
    type: "TOPPING_GROUP",
    title: "Vege",
    html_name: "vege",
    source: "moditems",
    msg: "",
    source_filter: function (a) {
        return ([494, 521, 547, 508, 535, 561, 499, 526, 552, 517, 544, 570, 525, 551, 503, 530, 556, 510, 537, 563, 504, 531, 557, 506, 533, 559, 4838, 4839, 7437, 7443, 7449, 6677, 6679, 6720, 6721, 6723, 6725, 6726, 6728, 6731, 6735, 6736, 6738, 6739, 6740, 6741, 6744, 6745, 6747, 6749, 6750, 6712, 6714, 6715, 6716, 6717, 6752, 6645, 6653, 6683, 6776, 6707, 6687, 6688, 6692, 6693, 6696, 6697, 6699, 6702, 6704, 6711, 6755, 6759, 6760, 6762, 6763, 6764, 6765, 6768, 6769, 6771, 6773, 6603, 6606, 6607, 6608, 6609, 6610, 6774, 6658, 6662, 6663, 6624, 6625, 6667, 6668, 6671, 6672, 6674].indexOf(a.ID) > -1)
    }
}, {
    type: "TOPPING_GROUP",
    title: "Meat",
    html_name: "meat",
    source: "moditems",
    msg: "",
    source_filter: function (a) {
        return ([509, 536, 562, 578, 581, 584, 496, 523, 549, 495, 522, 548, 512, 539, 565, 511, 538, 564, 7438, 7435, 7440, 7444, 7441, 7446, 7450, 7447, 7452, 6678, 6718, 6719, 6722, 6724, 6727, 6729, 6730, 6732, 6733, 6734, 6737, 6742, 6743, 6746, 6675, 6748, 6751, 6713, 6646, 6647, 6648, 6649, 6650, 6651, 6652, 6654, 6681, 6682, 6775, 6705, 6706, 6708, 6684, 6685, 6689, 6694, 6698, 6700, 6703, 6709, 6710, 6753, 6754, 6756, 6757, 6758, 6761, 6766, 6767, 6770, 6695, 6772, 6613, 6614, 6656, 6657, 6659, 6660, 6664, 6669, 6670, 6673].indexOf(a.ID) > -1)
    }
}, {
    type: "TOPPING_GROUP",
    title: "Crust Flavor",
    html_name: "Crust",
    source: "moditems",
    msg: "Add flavor to your crust with our new Crust Flavors! Choose up to #MAX# flavor(s) for your pizza.",
    source_filter: function (a) {
        return ([5940, 5941, 5942, 5943, 5944, 5949, 5948, 5945, 5946, 5947, 5954, 5953, 5951, 5952, 5959, 5958, 5956, 5957, 5964, 5963, 5961, 5962].indexOf(a.ID) > -1)
    }
}, {
    type: "TOPPING_GROUP",
    title: "Drizzle",
    html_name: "Drizzle",
    source: "moditems",
    msg: "",
    source_filter: function (a) {
        return ([7471, 7472, 7473, 7477, 7478, 7479, 7480, 7481, 7482].indexOf(a.ID) > -1)
    }
}];
PizzaBuilder.prototype.cyo_old_canShowFilter = PizzaBuilder.prototype.canShowFilter;
PizzaBuilder.prototype.canShowFilter = function (a, b) {
    if (a == "Crust" && (b.Selector2ValueID == 4000023 || b.Selector2ValueID == 4000027 || b.Selector2ValueID == 4000022 || b.Selector2ValueID == 4000021 || b.Selector2ValueID == 132 || b.Selector2ValueID == 114 || b.Selector2ValueID == 4000008 || b.Selector2ValueID == 4000014)) {
        return false
    } else {
        if (a == "Drizzle" && (b.Selector2ValueID == 4000014)) {
            return false
        }
    }
    return this.cyo_old_canShowFilter(a, b)
};
PizzaBuilder.prototype.old_customizeSubtitle = PizzaBuilder.prototype.customizeSubtitle;
PizzaBuilder.prototype.customizeSubtitle = function (a) {
    if (a.Selector2ValueID == 4000008) {
        return "The images are for illustration only and do not reflect the actual shape of the Big Dipper."
    }
    if (a.Selector2ValueID == 4000021) {
        return "The images are for illustration only and do not reflect the actual shape of the Cheesy Bites."
    }
    return this.old_customizeSubtitle(a)
};
PizzaBuilder.prototype.old_getImageIndex = PizzaBuilder.prototype.getImageIndex;
PizzaBuilder.prototype.getImageIndex = function (e, b, f) {
    var d = OriginalItems[e];
    if (typeof d !== "undefined") {
        for (var c in PizzaBuilder.prototype.controlsMap) {
            var a = this.controlsMap[c];
            if (a.html_name == "Crust") {
                if (a.source_filter(d)) {
                    return 1
                }
            }
        }
    }
    if (e == 4000015 || e == 4000016 || e == 4000017) {
        return ++f
    }
    return this.old_getImageIndex(d, b, f)
};
PizzaBuilder.prototype.showSelector3DropDown = function (a) {
    if (a.Selector3ValueID !== -1) {
        return true
    } else {
        return false
    }
};
"use strict";
var CustomPromo;
CustomPromotion.BOGOWowOfferSubMenuID = 4000008;

function CustomPromotion() {
    this.originaItemSelected = null;
    this.useCartAddFunction = false;
    this.discountedItemSelected = null;
    this.MediumSizeSelectorValue = 103;
    this.LargeSizeSelectorValue = 102;
    this.fullPriceItemSelected = null;
    this.popupObj = new PopupForm();
    this.htmlContainer = null;
    this.popupObj.width = 700;
    if ($(window).width() >= 768) {
        this.popupObj.height = 600
    } else {
        this.popupObj.height = 300
    }
    $(window).on("FullDataRequested", function (a) {
        CustomPromo.loadItems()
    });
    this.Init = function (j, b, a, k) {
        this.CustomPromoMessage = b;
        var g = j.split("|");
        for (var f in g) {
            var c = g[f].trim();
            var d = c.indexOf("=");
            var h = c.slice(0, d);
            var e = c.substr(d + 1).trim();
            this.EligibilityCrieteria[f] = ({
                PropertyName: h.trim(),
                Values: e.split(",")
            })
        }
        this.PromotionSubmenu = OriginalSubMenu[k];
        this.EligibleSubmenu = OriginalSubMenu[a];
        this.WowOfferSubMenu = OriginalSubMenu[CustomPromotion.BOGOWowOfferSubMenuID];
        this.loadItems()
    };
    this.loadItems = function () {
        for (var a in this.PromotionSubmenu.Items) {
            var b = this.PromotionSubmenu.Items[a];
            this.PromotionItems[b.ID] = b
        }
        for (var a in this.EligibleSubmenu.Items) {
            var b = this.EligibleSubmenu.Items[a];
            this.EligibleItems[b.ID] = b
        }
        for (var a in this.WowOfferSubMenu.Items) {
            var b = this.WowOfferSubMenu.Items[a];
            this.WowOfferItems[b.ID] = b
        }
    };
    this.showDialog = function () {
        confirm(this.CustomPromoMessage, {
            owner: this
        }, function (b, a) {
            if (b) {
                a.owner.onOK()
            } else {
                a.owner.onCancel()
            }
        })
    };
    this.onOK = function () {
        this.showDiscountedSubmenu()
    };
    this.onCancel = function () {
        this.discountedItemSelected = null;
        this.addItems()
    };
    this.CustomizeViewableItems = function () {
        var a = [];
        if (typeof CustomPromo.originaItemSelected !== "undefined" && CustomPromo.originaItemSelected != null) {
            var c = OriginalItems[CustomPromo.originaItemSelected.ID]["Selector1ValueID"];
            for (var b in this.PromotionSubmenu.Items) {
                var d = this.PromotionSubmenu.Items[b];
                if (d.Selector1ValueID == c) {
                    a.push(d)
                }
            }
        }
        return a
    };
    this.showDiscountedSubmenu = function () {
        var a = new ItemsViewer();
        a.dataItems = this.CustomizeViewableItems();
        a.dataTitle = this.PromotionSubmenu.Name;
        a.subMenuID = this.PromotionSubmenu.ID;
        a.ImagesFolder = "";
        a.imgExtentions = "";
        a.productCategory = this.PromotionSubmenu.NameEN;
        a.container = $("#PromotionMenu").get(0);
        a.activeStyle = new HtmlStyle("BackgroundList_ScrollPage", "BackgroundList_ScrollPageItemFilter", "BackgroundList_ThumbsItem", "BackgroundList_ThumbsItem_SelectorItem", 0, 0, "Thumbs", false, false);
        a.activeStyle.getSelectedItemOfGroup = bk.activeStyle.getSelectedItemOfGroup;
        a.activeStyle._CustomPromo = this;
        a.addItemToCart = function (b) {
            this._CustomPromo.discountedItemSelected = b;
            this._CustomPromo.addItems()
        };
        a.customizeItem = function (c, b, d) {
            showItemCustomize(c, b, null, d)
        };
        a.activeStyle.onItemFiltering = function () {
            adjustMenuItemsPositions()
        };
        a.activeStyle.updateVisualGroupPrice = function (k) {
            var b = k.data("vgroup_data");
            if (typeof b === "undefined" || b == null) {
                return
            }
            var j = k.data("qty");
            if (typeof j === "undefined" || j == null) {
                j = 1
            }
            var d = $("#PRICE_" + b.ITEMID + "_" + this.subMenuID);
            var g = $("#PRICE_2_" + b.ITEMID + "_" + this.subMenuID);
            var f = $("#DEALITEMPRICE_" + b.ITEMID + "_" + this.subMenuID);
            $("#QTY_" + b.ITEMID + "_" + this.subMenuID).html(j);
            var h = this.getSelectedItemOfGroup(k);
            if (h != null) {
                var e = RoundPrice(h.Price * j);
                d.html(e > 0 ? RoundPrice(h.Price * j) + "<span class='currencySymbol'>" + CurrencySymbol + "</span>" : "Free");
                g.html(e > 0 ? RoundPrice(h.Price * j) + "<span class='currencySymbol'>" + CurrencySymbol + "</span>" : "Free");
                f.html((e > 0 ? Translate("Extra") + " " + e + "<span class='currencySymbol'>" + CurrencySymbol + "</span>" : Translate("Continue")))
            } else {
                alert("Sorry. No items are available for the selected options. Please select different options.");
                var c = Translate("None");
                d.html(c);
                g.html(c);
                f.html(c)
            }
        };
        a.Init();
        a.Update();
        this.afterShowDiscountMenu();
        activateAppropriateEvent();
        changeAddressTo("menu/" + this.PromotionSubmenu.ID + "/");
        window.scrollTo(0, 0)
    };
    this.addItem = function (d, b) {
        var a = 0;
        for (var c in d.modGroupsItems) {
            a += d.modGroupsItems[c].Price
        }
        if (d.Price > 0 && d.Price != a) {
            this.fullPriceItemSelected = d
        }
        if (this.useCartAddFunction) {
            cart.addItemToCart(d, true)
        } else {
            this.addItemToCart(d, b)
        }
    }
}
CustomPromotion.prototype.PromotionList = [];
CustomPromotion.prototype.CustomPromoMessage = "";
CustomPromotion.prototype.addItemToCart = null;
CustomPromotion.prototype.afterAddItems = function () {
    CustomPromo.originaItemSelected = null;
    CustomPromo.discountedItemSelected = null;
    $("#PromotionMenu").hide();
    showHome();
    CustomPromo.showWowOfferPopup()
};
CustomPromotion.prototype.EligibilityCrieteria = {};
CustomPromotion.prototype.PromotionSubmenu;
CustomPromotion.prototype.EligibleSubmenu;
CustomPromotion.prototype.PromotionItems = {};
CustomPromotion.prototype.EligibleItems = {};
CustomPromotion.prototype.WowOfferItems = {};
CustomPromotion.prototype.ExcludeDealItems = true;
CustomPromotion.prototype.afterShowDiscountMenu = function () {
    closefloat();
    mobileScrollTop();
    $("#welcomeMsg").hide();
    $("#homePage").hide();
    $("#homeBanner").hide();
    $("#container_inner").hide();
    $("#signupform").show();
    $("#upperSubMenu").show();
    $("#lowerSubMenu").show();
    $("#basket_box").hide();
    $("#dockedBasket").show();
    $("#content").hide();
    $("#PromotionMenu").show();
    adjustMenuItemsPositions()
};
CustomPromotion.prototype.IsCustomPromotionApplicable = function (c) {
    var f = false;
    if ((this.ExcludeDealItems && c.DealID > 0) || this.PromotionItems.hasOwnProperty(c.ID)) {
        return f
    }
    var g = OriginalItems[c.ID];
    if (this.getEquivalentItem(this.PromotionItems, g) == null) {
        return f
    }
    for (var b in this.EligibilityCrieteria) {
        var a = this.EligibilityCrieteria[b];
        for (var d in a.Values) {
            var e = a.Values[d].trim();
            if (e == g[a.PropertyName]) {
                f = true;
                break
            }
        }
        if (f) {
            continue
        } else {
            break
        }
    }
    return f
};
CustomPromotion.prototype.addItems = function () {
    var b = [];
    this.originaItemSelected.isDiscountedItem = false;
    this.originaItemSelected.OriginalPrice = this.originaItemSelected.Price;
    this.originaItemSelected.OriginalItemID = this.EligibleItems[this.originaItemSelected.ID].ID;
    this.originaItemSelected.existInCart = false;
    b.push(this.originaItemSelected);
    if (this.discountedItemSelected != null) {
        var a = this.getOriginalPriceAndType(this.discountedItemSelected);
        a.existInCart = false;
        b.push(a)
    }
    this.reviewCartItems(b);
    if (this.afterAddItems != null) {
        this.afterAddItems()
    }
};
CustomPromotion.prototype.removeUnappliableModifiers = function (h, j) {
    for (var e in h.modGroupsItems) {
        var q = h.modGroupsItems[e];
        var a = q.ModGroupID;
        var d = q.Name;
        var p = q.ID;
        var s = false;
        if (!s) {
            for (var l in j.modGroup) {
                var r = j.modGroup[l];
                if (typeof r === "undefined") {
                    continue
                }
                for (var f in r.Items) {
                    var b = r.Items[f]["ID"];
                    var k = r.ID;
                    var o = r.Items[f]["Name"];
                    if (b == p && k == a) {
                        s = true;
                        break
                    } else {
                        if (o == d) {
                            h.modGroupsItems[e]["ID"] = b;
                            h.modGroupsItems[e]["ModGroupID"] = k;
                            h.modGroupsItems[e]["ModGroupOrder"] = getModGroupOrder(h.ID, k);
                            h.modGroupsItems[e]["Price"] = getCartItemPrice(h.modGroupsItems[e]);
                            h.modGroupsItems[e]["Weight"] = GetModItemWeight(OriginalModGroups[k], b);
                            s = true;
                            break
                        }
                    }
                }
            }
        }
        if (!s) {
            delete h[e]
        }
    }
    for (var c in h.NoModCodeItems) {
        var q = h.NoModCodeItems[c];
        var a = q.ModGroupID;
        var d = q.Name;
        var p = q.ID;
        var s = false;
        if (!s) {
            for (var l in j.modGroup) {
                var r = j.modGroup[l];
                if (typeof r === "undefined") {
                    continue
                }
                for (var f in r.Items) {
                    var b = r.Items[f]["ID"];
                    var k = r.ID;
                    var o = r.Items[f]["Name"];
                    if (b == p && k == a) {
                        s = true;
                        break
                    } else {
                        if (o == d) {
                            h.NoModCodeItems[c]["ID"] = b;
                            h.NoModCodeItems[c]["ModGroupID"] = k;
                            h.NoModCodeItems[c]["ModGroupOrder"] = getModGroupOrder(h.ID, k);
                            h.NoModCodeItems[c]["Price"] = getCartItemPrice(h.NoModCodeItems[c]);
                            h.NoModCodeItems[c]["Weight"] = GetModItemWeight(OriginalModGroups[k], b);
                            s = true;
                            break
                        }
                    }
                }
            }
        }
        if (!s) {
            delete h[c]
        }
    }
    return h
};
CustomPromotion.prototype.getEquivalentItem = function (d, a) {
    var b = null;
    for (var c in d) {
        var e = d[c];
        if (e.Selector1ValueID == a.Selector1ValueID && e.Selector2ValueID == a.Selector2ValueID && e.Selector3ValueID == a.Selector3ValueID && e.VirtualGroupID == a.VirtualGroupID) {
            b = e;
            break
        }
    }
    return b
};
CustomPromotion.prototype.getOriginalPriceAndType = function (b) {
    if (this.PromotionItems.hasOwnProperty(b.ID)) {
        b.isDiscountedItem = true;
        var a = this.getEquivalentItem(this.EligibleItems, this.PromotionItems[b.ID]);
        b.OriginalPrice = a.Price;
        b.OriginalItemID = a.ID
    } else {
        b.isDiscountedItem = false;
        b.OriginalPrice = this.EligibleItems[b.ID]["Price"];
        b.OriginalItemID = b.ID
    }
    return b
};
CustomPromotion.prototype.reviewCartItems = function (g) {
    var f = [];
    if (typeof g !== "undefined") {
        for (var q in g) {
            f.push(g[q])
        }
    }
    if (cart.cartData.length > 0) {
        for (var q in cart.cartData) {
            var r = cart.cartData[q];
            if (this.PromotionItems.hasOwnProperty(r.ID)) {
                var c = this.getOriginalPriceAndType(r);
                c.existInCart = true;
                f.push(c)
            } else {
                if (this.IsCustomPromotionApplicable(r)) {
                    var j = r;
                    j.isDiscountedItem = false;
                    j.OriginalPrice = j.Price;
                    j.OriginalItemID = j.ID;
                    j.existInCart = true;
                    f.push(j)
                }
            }
        }
    }
    f = f.sort(function (u, t) {
        var v = u.OriginalPrice - t.OriginalPrice;
        if (v == 0) {
            var w = u.isDiscountedItem === t.isDiscountedItem;
            return w ? (u.modGroupsItems.length - t.modGroupsItems.length) : (u.isDiscountedItem ? -1 : 1)
        } else {
            return v
        }
    });
    var e = [];
    var h = [];
    for (var q in f) {
        var l = OriginalItems[f[q]["ID"]];
        if (l.Selector1ValueID == this.MediumSizeSelectorValue) {
            e.push(f[q])
        } else {
            if (l.Selector1ValueID == this.LargeSizeSelectorValue) {
                h.push(f[q])
            }
        }
    }
    var p = Math.floor(f.length / 2);
    var k = Math.floor(e.length / 2);
    var d = Math.floor(h.length / 2);
    for (var q = k; q < e.length; q++) {
        var s = e[q];
        if (!s.isDiscountedItem && s.existInCart) {
            continue
        } else {
            if (!s.isDiscountedItem && !s.existInCart) {
                this.addItem(s, true)
            } else {
                if (s.existInCart) {
                    cart.cartData.splice(cart.cartData.indexOf(s), 1)
                }
                var b = this.getEquivalentItem(this.EligibleItems, this.PromotionItems[s.ID]);
                var o = {
                    ID: b.ID,
                    Name: b.Name,
                    Price: b.Price,
                    Weight: b.Weight,
                    modGroupsItems: s.modGroupsItems,
                    NoModCodeItems: s.NoModCodeItems,
                    DealID: b.DealID,
                    Qty: s.Qty
                };
                o = this.removeUnappliableModifiers(o, b);
                o.Price = getCartItemPrice(o);
                this.addItem(o, true)
            }
        }
    }
    for (var q = 0; q < k; q++) {
        var s = e[q];
        if (s.isDiscountedItem && s.existInCart) {
            continue
        } else {
            if (s.isDiscountedItem && !s.existInCart) {
                this.addItem(s, true)
            } else {
                if (s.existInCart) {
                    cart.cartData.splice(cart.cartData.indexOf(s), 1)
                }
                var n = this.getEquivalentItem(this.PromotionItems, this.EligibleItems[s.ID]);
                var o = {
                    ID: n.ID,
                    Name: n.Name,
                    Price: n.Price,
                    Weight: n.Weight,
                    modGroupsItems: s.modGroupsItems,
                    NoModCodeItems: s.NoModCodeItems,
                    DealID: n.DealID,
                    Qty: s.Qty
                };
                o = this.removeUnappliableModifiers(o, n);
                o.Price = getCartItemPrice(o);
                this.addItem(o, true)
            }
        }
    }
    for (var q = d; q < h.length; q++) {
        var s = h[q];
        if (!s.isDiscountedItem && s.existInCart) {
            continue
        } else {
            if (!s.isDiscountedItem && !s.existInCart) {
                this.addItem(s, true)
            } else {
                if (s.existInCart) {
                    cart.cartData.splice(cart.cartData.indexOf(s), 1)
                }
                var b = this.getEquivalentItem(this.EligibleItems, this.PromotionItems[s.ID]);
                var o = {
                    ID: b.ID,
                    Name: b.Name,
                    Price: b.Price,
                    Weight: b.Weight,
                    modGroupsItems: s.modGroupsItems,
                    NoModCodeItems: s.NoModCodeItems,
                    DealID: b.DealID
                };
                o = this.removeUnappliableModifiers(o, b);
                o.Price = getCartItemPrice(o);
                this.addItem(o, true)
            }
        }
    }
    for (var q = 0; q < d; q++) {
        var s = h[q];
        if (s.isDiscountedItem && s.existInCart) {
            continue
        } else {
            if (s.isDiscountedItem && !s.existInCart) {
                this.addItem(s, true)
            } else {
                if (s.existInCart) {
                    cart.cartData.splice(cart.cartData.indexOf(s), 1)
                }
                var n = this.getEquivalentItem(this.PromotionItems, this.EligibleItems[s.ID]);
                var o = {
                    ID: n.ID,
                    Name: n.Name,
                    Price: n.Price,
                    Weight: n.Weight,
                    modGroupsItems: s.modGroupsItems,
                    NoModCodeItems: s.NoModCodeItems,
                    DealID: n.DealID
                };
                o = this.removeUnappliableModifiers(o, n);
                o.Price = getCartItemPrice(o);
                this.addItem(o, true)
            }
        }
    }
    var m = 0;
    if (cart.cartData.length > 0) {
        for (var q in cart.cartData) {
            var r = cart.cartData[q];
            if (this.WowOfferItems.hasOwnProperty(r.ID)) {
                m++
            }
        }
    }
    var a = m - p;
    for (var q in cart.cartData) {
        if (a > 0) {
            var r = cart.cartData[q];
            if (this.WowOfferItems.hasOwnProperty(r.ID)) {
                cart.cartData.splice(cart.cartData.indexOf(r), 1);
                a--
            }
        } else {
            break
        }
    }
};
CustomPromotion.prototype.reviewWowOfferItemsQty = function (b) {
    var h = [];
    if (cart.cartData.length > 0) {
        for (var f in cart.cartData) {
            var c = cart.cartData[f];
            if (this.PromotionItems.hasOwnProperty(c.ID)) {
                var d = this.getOriginalPriceAndType(c);
                d.existInCart = true;
                h.push(d)
            } else {
                if (this.IsCustomPromotionApplicable(c)) {
                    var g = c;
                    g.isDiscountedItem = false;
                    g.OriginalPrice = g.Price;
                    g.OriginalItemID = g.ID;
                    g.existInCart = true;
                    h.push(g)
                }
            }
        }
    }
    var j = Math.floor(h.length / 2);
    var e = b - j;
    if (e > 0) {
        var a = b - e;
        return a
    } else {
        return b
    }
};
CustomPromotion.prototype.showWowOfferPopup = function () {
    this.OKBtnID = createUUID();
    this.cancelBtnID = createUUID();
    this.popupObj.container.addClass("suggestiveWrapper");
    this.popupObj.Show();
    this.htmlContainer = this.popupObj.container;
    var a = "BOGOWowOffer-" + UserLanguage + ".jpg";
    var b = HTML_Pages.BOGOWowOffer;
    b = b.replace(/#OK#/gi, this.OKBtnID);
    b = b.replace(/#CANCEL#/gi, this.cancelBtnID);
    b = b.replace(/#IMG#/gi, a);
    this.htmlContainer.html(b);
    $("#" + this.cancelBtnID).data("owner", this);
    $("#" + this.cancelBtnID).click(function () {
        $(this).data("owner").onWowOfferPopupCancel()
    });
    $("#" + this.OKBtnID).data("owner", this);
    $("#" + this.OKBtnID).click(function () {
        $(this).data("owner").onWowOfferPopupOK()
    })
};
CustomPromotion.prototype.onWowOfferPopupOK = function () {
    this.popupObj.Close();
    ItemsViewerOpenMenu(OriginalSubMenu[CustomPromotion.BOGOWowOfferSubMenuID])
};
CustomPromotion.prototype.onWowOfferPopupCancel = function () {
    this.popupObj.Close();
    closefloat();
    changeAddressTo("")
};
$(document).ready(function () {
    CustomPromotion.prototype.addItemToCart = function (p, k) {
        if (typeof k === "undefined") {
            k = false
        }
        if (p.SpecialItem == true) {
            var o = specialPizzaCreateDefaultCartItem(p);
            autoSelectDefaultModifiers(o);
            cart.addItemToCart(o, k)
        } else {
            if (this.WowOfferItems.hasOwnProperty(p.ID)) {
                var n = CustomPromo.reviewWowOfferItemsQty(p.Qty);
                var h = CustomPromo.fullPriceItemSelected;
                var l = new Object();
                var g = 346;
                l.ID = p.ID;
                l.ModGroupID = g;
                l.ModGroupOrder = getModGroupOrder(CustomPromo.fullPriceItemSelected.ID, g);
                l.Name = p.Name;
                l.Weight = GetModItemWeight(OriginalModGroups[g], p.ID);
                l.Price = getCartItemPrice(l);
                l.modGroupsItems = [];
                h.Qty = n;
                h.modGroupsItems.push(l);
                for (var m in cart.cartData) {
                    var j = cart.cartData[m];
                    if (j.ID == CustomPromo.fullPriceItemSelected.ID) {
                        cart.cartData.splice(cart.cartData.indexOf(j), 1);
                        n--;
                        if (n == 0) {
                            break
                        }
                    }
                }
                cart.addItemToCart(h, k);
                showHome();
                return
            }
            cart.addItemToCart(p, k)
        }
    };
    CustomPromotion.prototype.cartAddItemToCart = cart.addItemToCart;
    var d = WebCustomParameters.EnableCustomPromotion;
    var c = WebCustomParameters.CustomPromotionEligibility;
    var f = WebCustomParameters.CustomPromoSubmenuID;
    var e = WebCustomParameters.CustomPromoEligibleSubmenuID;
    var b = WebCustomParameters.CustomPromoEligibleItemsOnlySubmenu;
    if (typeof d === "undefined" || c === "undefined" || f === "undefined") {
        d = false
    }
    if (d) {
        var a = WebCustomParameters.CustomPromoMessage;
        if (typeof a === "undefined") {
            a = "Would you like to try our special promotion?"
        }
        CustomPromo = new CustomPromotion();
        CustomPromo.Init(c, a, e, f);
        bk.addItemToCart = function (g) {
            if (window.location.href.indexOf("menu/" + b) > -1) {
                CustomPromo.originaItemSelected = g;
                CustomPromo.showDiscountedSubmenu()
            } else {
                if (CustomPromo.IsCustomPromotionApplicable(g)) {
                    CustomPromo.showDialog()
                } else {
                    CustomPromo.addItemToCart(g)
                }
            }
        };
        PromoMenu.addItemToCart = function (g) {
            CustomPromo.originaItemSelected = g;
            if (CustomPromo.IsCustomPromotionApplicable(g)) {
                CustomPromo.useCartAddFunction = true;
                CustomPromo.showDialog()
            } else {
                cart.addItemToCart(g)
            }
        };
        cart.addItemToCart = function (g, h) {
            CustomPromo.cartAddItemToCart(g);
            if (typeof h === "undefined" || !h) {
                CustomPromo.reviewCartItems()
            }
        };
        cart.onCartUpdated = function () {
            CustomPromo.reviewCartItems()
        }
    }
});

function showPizzaBuilder(c, a, b, d) {
    loadFullItems(function () {
        changeAddressTo("pizzabuilder/" + (typeof c !== "undefined" ? c.ID : ""));
        if (typeof b === "undefined") {
            b = false
        }
        var e = new PizzaBuilder();
        e.pizzaItem = c;
        if (b) {
            e.__popupObj = new PopupForm();
            e.__popupObj.width = 900;
            e.__popupObj.height = 600;
            e.__popupObj.container.css("background", "none");
            e.__popupObj.container.css("border", "none");
            if (typeof a != "undefined" && a != null && a.DealID > 0) {
                e.__popupObj.container.addClass("DealBuilder_Content");
                e.__popupObj.container.addClass("firstStep")
            }
        } else {
            e.__popupObj = null
        }
        if (!b) {
            e.pagesContainer = $("#container_inner").get(0)
        } else {
            e.pagesContainer = e.__popupObj.container.get(0)
        }
        e.cartItemCrc = null;
        e.isDeal = false;
        if (typeof a !== "undefined" && a != null) {
            e.cartItemCrc = getCartItemCRC(a);
            e.isDeal = a.DealID > 0
        }
        e.beforeShowPage = function () {
            if (this.__popupObj == null) {
                closefloat()
            }
        };
        e.afterShowPage = function () {
            if (this.__popupObj == null) {
                showFloat("Pizza Builder", 3, false)
            }
        };
        e.onOK = function (g) {
            if (this.isDeal) {
                g.Qty = 1;
                cart.clearItem(this.cartItemCrc, 1)
            } else {
                if (this.cartItemCrc != null) {
                    cart.clearItem(this.cartItemCrc)
                }
            }
            if (this.cartItemCrc == null && typeof CustomPromo !== "undefined") {
                if (CustomPromo.IsCustomPromotionApplicable(g)) {
                    if (CustomPromo.originaItemSelected == null) {
                        CustomPromo.originaItemSelected = g
                    }
                    CustomPromo.useCartAddFunction = true;
                    CustomPromo.showDiscountedSubmenu();
                    return
                } else {
                    if (CustomPromo.originaItemSelected != null && CustomPromo.discountedItemSelected == null && CustomPromo.PromotionItems.hasOwnProperty(g.ID)) {
                        CustomPromo.discountedItemSelected = g;
                        CustomPromo.addItems()
                    } else {
                        cart.addItemToCart(g, true)
                    }
                }
            } else {
                cart.addItemToCart(g)
            }
            if (this.__popupObj == null) {
                closefloat();
                changeAddressTo("");
                var f = GoogleTrack_getItemEnName(this.pizzaItem.ID);
                googleTag.push({
                    event: "Submit",
                    Category: "Pizza Builder",
                    ElementType: "Item",
                    ID: this.pizzaItem.ID,
                    Name: f
                })
            } else {
                this.__popupObj.Close()
            }
        };
        e.onCancel = function () {
            if (this.__popupObj == null) {
                closefloat();
                changeAddressTo("")
            } else {
                this.__popupObj.Close()
            }
        };
        if (e.__popupObj != null) {
            e.__popupObj.Show()
        }
        e.Init(c, a, d)
    })
}
$(function () {
    $(window).on("FullDataRequested", function (a) {
        PizzaBuilder.FlatBreadItems = [OriginalItems[6644]]
    });
    PizzaBuilder.FlatBreadItemsIDs = [6644];
    PizzaBuilder.FlatBreadItems = [OriginalItems[6644]];
    PizzaBuilder.onApplyBuilderImage = function (a) {
        var b = a.ImageInfo;
        if (a.PizzaBuilder.flatBread && a.ImageLayer["Type"] == "modItem") {
            b.url = "/Images/FlatBreadTopping/itm" + strPadLeft("0", 6, a.ImageLayer["ID"]) + ".png"
        }
        return b
    };
    PizzaBuilder.prototype.flatbread_oldInit = PizzaBuilder.prototype.Init;
    PizzaBuilder.prototype.Init = function (e, b, g) {
        this.flatBread = false;
        if (this.eligibleItems == null && ((b != null && b.DealID == 0) || b == null)) {
            this.eligibleItems = PizzaBuilder.getEligibleItems(e, b)
        }
        if (PizzaBuilder.FlatBreadItemsIDs.indexOf(e.ID) > -1) {
            this.allowSelectRecipes = false;
            this.eligibleItems = PizzaBuilder.FlatBreadItems;
            this.flatBread = true
        } else {
            if (this.eligibleItems != null) {
                var c = [];
                for (var d in this.eligibleItems) {
                    var f = false;
                    for (var a in PizzaBuilder.FlatBreadItems) {
                        if (typeof PizzaBuilder.FlatBreadItems[a] !== "undefined" && PizzaBuilder.FlatBreadItems[a]["ID"] == this.eligibleItems[d]["ID"]) {
                            f = true;
                            break
                        }
                    }
                    if (!f) {
                        c.push(this.eligibleItems[d])
                    }
                }
                this.eligibleItems = c
            }
        }
        this.flatbread_oldInit(e, b, g)
    };
    cart._oldflatbread_addItemToCart = cart.addItemToCart;
    cart.addItemToCart = function (a) {
        var b = OriginalItems[a.ID];
        if ((window.location.href.indexOf("pizzabuilder") == -1 && a.DealID == 0) && (PizzaBuilder.FlatBreadItemsIDs.indexOf(b.ID) > -1)) {
            showItemCustomize(b, a)
        } else {
            cart._oldflatbread_addItemToCart(a)
        }
    }
});
PizzaBuilder.CYOSubmenID = 4000002;
$(function () {
    PizzaBuilder.CYOItems = [];
    PizzaBuilder.CYOItemsIDs = [];
    a();
    $(window).on("FullDataRequested", function (b) {
        a()
    });

    function a() {
        if (typeof OriginalSubMenu[PizzaBuilder.CYOSubmenID] !== "undefined") {
            for (var b in OriginalSubMenu[PizzaBuilder.CYOSubmenID].Items) {
                var c = OriginalSubMenu[PizzaBuilder.CYOSubmenID].Items[b];
                PizzaBuilder.CYOItemsIDs.push(c.ID);
                PizzaBuilder.CYOItems.push(c)
            }
        }
    }
    PizzaBuilder.prototype.cyo_oldInit = PizzaBuilder.prototype.Init;
    PizzaBuilder.prototype.Init = function (f, c, h) {
        this.cyo = false;
        if (this.eligibleItems == null && ((c != null && c.DealID == 0) || c == null)) {
            this.eligibleItems = PizzaBuilder.getEligibleItems(f, c)
        }
        if (PizzaBuilder.CYOItemsIDs.indexOf(f.ID) > -1) {
            this.allowSelectRecipes = false;
            this.eligibleItems = PizzaBuilder.CYOItems;
            this.cyo = true
        } else {
            if (this.eligibleItems != null) {
                var d = [];
                for (var e in this.eligibleItems) {
                    var g = false;
                    for (var b in PizzaBuilder.FlatBreadItems) {
                        if (typeof PizzaBuilder.FlatBreadItems[b] !== "undefined" && PizzaBuilder.FlatBreadItems[b]["ID"] == this.eligibleItems[e]["ID"]) {
                            g = true;
                            break
                        }
                    }
                    if (!g) {
                        d.push(this.eligibleItems[e])
                    }
                }
                this.eligibleItems = d
            }
        }
        this.cyo_oldInit(f, c, h)
    };
    PizzaBuilder.prototype.getToppingMessage = function (c, b) {
        if (this.cyo) {
            return "The Create Your Own Pizza is limited to 4 toppings for cooking purposes"
        } else {
            return b
        }
    };
    cart._oldcyo_addItemToCart = cart.addItemToCart;
    cart.addItemToCart = function (b) {
        var c = OriginalItems[b.ID];
        if ((window.location.href.indexOf("pizzabuilder") == -1 && b.DealID == 0) && (PizzaBuilder.CYOItemsIDs.indexOf(c.ID) > -1)) {
            showItemCustomize(c, b)
        } else {
            cart._oldcyo_addItemToCart(b)
        }
    }
});
PizzaBuilder.PizzaOfTheDaySubmenID = 4000009;
$(function () {
    PizzaBuilder.PizzaOfTheDayItemsIDs = [];
    a();
    $(window).on("FullDataRequested", function (b) {
        a()
    });

    function a() {
        if (typeof OriginalSubMenu[PizzaBuilder.PizzaOfTheDaySubmenID] !== "undefined") {
            for (var b in OriginalSubMenu[PizzaBuilder.PizzaOfTheDaySubmenID].Items) {
                var c = OriginalSubMenu[PizzaBuilder.PizzaOfTheDaySubmenID].Items[b];
                PizzaBuilder.PizzaOfTheDayItemsIDs.push(c.ID)
            }
        }
    }
    PizzaBuilder.prototype.pizzaofday_oldInit = PizzaBuilder.prototype.Init;
    PizzaBuilder.prototype.Init = function (c, b, d) {
        if (PizzaBuilder.PizzaOfTheDayItemsIDs.indexOf(c.ID) > -1) {
            this.allowSelectRecipes = false
        }
        this.pizzaofday_oldInit(c, b, d)
    }
});
"use strict";
var ScrollClicked = false;
(function (a) {
    a.fn.createVScroll = function () {
        return this.each(function () {
            if ("ontouchstart" in document.documentElement) {
                a(this).css("overflow-x", "hidden");
                a(this).css("overflow-y", "auto");
                return
            }
            var e = this;
            a(e).css("overflow", "hidden");
            a(e).unbind("mousewheel");
            a(e).bind("mousewheel", function (k, m, j, h) {
                ScrollClicked = true;
                var l = m * Math.round(this.scrollHeight / 12);
                var g = this.scrollHeight - a(this).height();
                var f = this.scrollTop - l;
                if (f > g) {
                    f = g
                } else {
                    if (f < 0) {
                        f = 0
                    }
                }
                this.scrollTop = f;
                if (typeof this.scrollable !== "undefined") {
                    this.scrollable.setValue(f * 100 / g)
                }
                return false
            });
            var b = e.scrollHeight - a(e).height();
            if (b < 0) {
                b = 0
            }
            if (b > 0 && (typeof e.scrollable === "undefined")) {
                var c = a("<div>");
                c.css("position", "absolute");
                c.css("left", a(e).position().left + a(e).width() - 15 + "px");
                c.css("top", a(e).position().top + 3 + "px");
                c.css("width", "15px");
                c.css("height", a(e).height() - 6 + "px");
                a(e).parent().append(c);
                var d = new Scroll();
                e.scrollable = d;
                d.container = c.get(0);
                d.isHorz = false;
                d.scrollDiv = e;
                d.scrollValueChanged = function (g) {
                    var f = this.scrollDiv.scrollHeight - a(this.scrollDiv).height();
                    this.scrollDiv.scrollTop = g * f / 100
                };
                d.init()
            } else {
                if (b <= 0 && (typeof e.scrollable !== "undefined")) {
                    var d = e.scrollable;
                    a(d.container).css("display", "none")
                } else {
                    if (b > 0 && (typeof e.scrollable !== "undefined")) {
                        var d = e.scrollable;
                        if (a(e).css("position") == "static") {
                            a(e).css("position", "relative")
                        }
                        var c = a(d.container);
                        c.css("position", "absolute");
                        c.css("left", e.offsetLeft + a(e).width() - 15 + "px");
                        c.css("top", e.offsetTop + 3 + "px");
                        c.css("width", "15px");
                        c.css("height", a(e).height() - 6 + "px");
                        c.css("display", "block");
                        d.resize();
                        d.setValue(e.scrollTop * 100 / b)
                    }
                }
            }
        })
    }
})(jQuery);

function Scroll() {
    this.container = null;
    this.min = 0;
    this.max = 0;
    this.scrollableControl = null;
    this.isHorz = true;
    this.screenWidth = 0;
    this.screenHeight = 0;
    this.isMoving = false;
    this.scrollCarrier = null;
    this.value = 0;
    this.scrollValueChanged = null;
    this.issmall = false;
    this.init = function () {
        this.grabber = $("<img>");
        this.scrollLine = $("<div>");
        this.scrollCarrier = $("<div>");
        $(this.container).append(this.scrollCarrier);
        this.scrollCarrier.append(this.scrollLine);
        this.scrollCarrier.append(this.grabber);
        this.scrollCarrier.css("position", "relative");
        this.grabber.css("position", "absolute");
        this.scrollLine.css("position", "absolute");
        this.grabber.css("cursor", "pointer");
        $(this.scrollCarrier).css("cursor", "pointer");
        this.scrollLine.css("background-color", "gray");
        if (this.isHorz) {
            this.grabber.attr("src", "/Images/SharedImages/scrollh.png");
            this.scrollLine.css("height", "4px");
            this.scrollLine.css("top", "5px")
        } else {
            if (!this.issmall) {
                this.grabber.attr("src", "/Images/SharedImages/scrollv.png")
            } else {
                this.grabber.attr("src", "/Images/SharedImages/scrollv_s.png")
            }
            this.scrollLine.css("width", "4px");
            this.scrollLine.css("left", "5px")
        }
        this.grabber.data("scroll", this);
        this.scrollLine.data("scroll", this);
        $(this.scrollCarrier).data("scroll", this);
        this.grabber.mousedown(function (a) {
            a.preventDefault();
            ScrollClicked = true;
            $(document).data("scroll", $(this).data("scroll"));
            $(this).data("scroll").isMoving = true;
            $(this).data("scroll").scrollStart(a);
            $(this).data("scroll").scrollMove(a);
            $(document).bind("mouseup", function (b) {
                if ($(this).data("scroll").isMoving) {
                    $(this).data("scroll").isMoving = false;
                    $(this).data("scroll").scrollEnd(b)
                }
                $(document).unbind("mouseup");
                $(document).unbind("mousemove");
                return false
            });
            $(document).bind("mousemove", function (b) {
                if (typeof $(this).data("scroll") !== "undefined" && $(this).data("scroll").isMoving) {
                    b.preventDefault();
                    $(this).data("scroll").scrollMove(b)
                }
                return false
            });
            return false
        });
        $(this.scrollCarrier).mousedown(function (d) {
            d.preventDefault();
            ScrollClicked = true;
            if ($(this).data("scroll").isMoving) {
                return
            }
            var b = $(this).data("scroll");
            var a = d.offsetX;
            var f = d.offsetY;
            if (typeof a === "undefined") {
                a = d.layerX - $(d.target).position().left;
                f = d.layerY - $(d.target).position().top
            }
            if (b.isHorz) {
                var e = b.getThumbMax() * a / b.scrollLine.width();
                b.setThumbPos(e);
                b.value = e * 100 / b.getThumbMax();
                if (typeof b.scrollValueChanged !== "undefined" && b.scrollValueChanged != null) {
                    b.scrollValueChanged(b.value)
                }
            } else {
                var c = b.getThumbMax() * f / b.scrollLine.height();
                b.setThumbPos(c);
                b.value = c * 100 / b.getThumbMax();
                if (typeof b.scrollValueChanged !== "undefined" && b.scrollValueChanged != null) {
                    b.scrollValueChanged(b.value)
                }
            }
            return false
        });
        this.resize()
    };
    this.resize = function () {
        this.screenWidth = $(this.container).width();
        this.screenHeight = $(this.container).height();
        this.scrollCarrier.css("height", this.screenHeight + "px");
        this.scrollCarrier.css("width", this.screenWidth + "px");
        this.issmall = !(this.screenHeight - 100 > 300);
        if (this.isHorz) {
            this.scrollLine.css("width", this.screenWidth + "px")
        } else {
            this.scrollLine.css("height", this.screenHeight + "px")
        }
        if (this.isHorz) {
            this.grabber.attr("src", "/Images/SharedImages/scrollh.png")
        } else {
            if (!this.issmall) {
                this.grabber.attr("src", "/Images/SharedImages/scrollv.png")
            } else {
                this.grabber.attr("src", "/Images/SharedImages/scrollv_s.png")
            }
        }
    };
    this.getThumbPos = function () {
        var a = 0;
        if (this.isHorz) {
            a = this.grabber.css("left")
        } else {
            a = this.grabber.css("top")
        }
        a = parseInt(a);
        if (isNaN(a) || a === "undefined") {
            a = 0
        }
        return a
    };
    this.getThumbMax = function () {
        var a = 88;
        if (this.isHorz) {
            a = this.grabber.naturalWidth()
        } else {
            a = this.grabber.naturalHeight()
        }
        if (this.isHorz) {
            return this.screenWidth - a
        } else {
            return this.screenHeight - a
        }
    };
    this.setThumbPos = function (a) {
        if (this.isHorz) {
            this.grabber.css("left", a + "px")
        } else {
            this.grabber.css("top", a + "px")
        }
    };
    this.scrollStart = function (a) {
        if (this.isHorz) {
            this.offsetStart = a.pageX - this.getThumbPos()
        } else {
            this.offsetStart = a.pageY - this.getThumbPos()
        }
    };
    this.scrollEnd = function (a) { };
    this.scrollMove = function (b) {
        if (this.isHorz) {
            var c = b.pageX - this.offsetStart;
            if (c >= 0 && c <= this.getThumbMax()) {
                this.setThumbPos(b.pageX - this.offsetStart);
                this.value = c * 100 / this.getThumbMax();
                if (typeof this.scrollValueChanged !== "undefined" && this.scrollValueChanged != null) {
                    this.scrollValueChanged(this.value)
                }
            }
        } else {
            var a = b.pageY - this.offsetStart;
            if (a >= 0 && a <= this.getThumbMax()) {
                this.setThumbPos(b.pageY - this.offsetStart);
                this.value = a * 100 / this.getThumbMax();
                if (typeof this.scrollValueChanged !== "undefined" && this.scrollValueChanged != null) {
                    this.scrollValueChanged(this.value)
                }
            }
        }
    };
    this.setValue = function (a) {
        this.value = a;
        if (!this.isMoving) {
            this.setThumbPos(this.getThumbMax() * this.value / 100)
        }
    };
    this.getValue = function () {
        return this.value
    }
}
$(document).ready(function () {
    storeAddressLocator.beforeShowPage = function () {
        document.preDivDisplay = {};
        document.preDivDisplay.homePage = $("#homePage").css("display");
        document.preDivDisplay.homeBanner = $("#homeBanner").css("display");
        document.preDivDisplay.container_inner = $("#container_inner").css("display");
        document.preDivDisplay.upperSubMenu = $("#upperSubMenu").css("display");
        document.preDivDisplay.lowerSubMenu = $("#lowerSubMenu").css("display");
        document.preDivDisplay.content = $("#content").css("display");
        document.preDivDisplay.dockedBasket = $("#dockedBasket").css("display");
        document.preDivDisplay.basket_box = $("#basket_box").css("display");
        document.preDivDisplay.signupform = $("#signupform").css("display");
        if ($(window).width() > 799) {
            if (!this.isVisible) {
                showShadow()
            }
            var b = getTopmostZIndex() + 10;
            $("#StoreLocatorContainer").css("display", "none");
            $("#StoreLocatorContainer").addClass("popup");
            $("#dockedBasket").css("zIndex", b);
            var a = $("#dockedBasket").height();
            $("#StoreLocatorContainer").css("bottom", -1 * $("#StoreLocatorContainer").height());
            $("#StoreLocatorContainer").css("display", "block");
            $("#StoreLocatorContainer").css("zIndex", b);
            $("#StoreLocatorContainer").animate({
                bottom: a
            }, 500)
        } else {
            $("#StoreLocatorContainer").removeClass("popup");
            $("#homePage").hide();
            $("#homeBanner").hide();
            $("#container_inner").hide();
            $("#upperSubMenu").hide();
            $("#lowerSubMenu").show();
            $("#content").hide();
            $("#basket_box").hide();
            $("#signupform").show();
            $("#dockedBasket").show();
            $("#StoreLocatorContainer").show()
        }
        $("#EditOrderMode").hide();
        $("#CloseOrderMode").show();
        if (isTouchDevice()) {
            $(".selectboxit-container").css({
                overflow: "hidden"
            })
        }
        $("#dockedBasket").show();
        if (!userLogin.isLoggedIn()) {
            userLogin.drawInlineLoginBlock($("#StoreLocator_LoginWindow").get(0), function () {
                closeFloatPerm();
                storeAddressLocator.Show()
            })
        }
        this.LoginBtnUI.unbind("click");
        this.LoginBtnUI.click(function () {
            $(this).data("owner").ShowLoginWindow()
        })
    };
    storeAddressLocator.onClose = function () {
        if ($("#StoreLocatorContainer").hasClass("popup")) {
            $("#StoreLocatorContainer").animate({
                bottom: -1 * $("#StoreLocatorContainer").height()
            }, 500, function () {
                hideShadow();
                $("#StoreLocatorContainer").hide();
                $("#EditOrderMode").show();
                $("#CloseOrderMode").hide()
            });
            $("#dockedBasket").css("display", document.preDivDisplay.dockedBasket)
        } else {
            $("#StoreLocatorContainer").hide();
            $("#EditOrderMode").show();
            $("#CloseOrderMode").hide()
        }
        if (typeof document.preDivDisplay !== "undefined") {
            $("#homePage").css("display", document.preDivDisplay.homePage);
            $("#homeBanner").css("display", document.preDivDisplay.homeBanner);
            $("#container_inner").css("display", document.preDivDisplay.container_inner);
            $("#upperSubMenu").css("display", document.preDivDisplay.upperSubMenu);
            $("#lowerSubMenu").css("display", document.preDivDisplay.lowerSubMenu);
            $("#content").css("display", document.preDivDisplay.content);
            $("#dockedBasket").css("display", document.preDivDisplay.dockedBasket);
            $("#basket_box").css("display", document.preDivDisplay.basket_box);
            $("#signupform").css("display", document.preDivDisplay.signupform)
        }
        storeAddressLocator.continueAsGuestClicked = false
    };
    storeAddressLocator.onUpdateCartInfo = function () {
        updateAddressOrderMode()
    };
    storeAddressLocator.onDataChanged = function () { };
    storeAddressLocator.ShowDelivery = function () {
        if (!userLogin.isLoggedIn()) {
            if (storeAddressLocator.isOrderModeSelected() || storeAddressLocator.continueAsGuestClicked) {
                this.ShowDeliveryNewAddress()
            } else {
                if (!storeAddressLocator.continueAsGuestClicked) {
                    this.ShowLoginWindow()
                }
            }
            return
        }
        this.OrderModeSelected = "Delivary";
        this.OrderModeToggleUI.removeClass("takeaway");
        this.OrderModeToggleUI.addClass("delivery");
        this.address_lastFillPage = 0;
        $("#StoreLocator_LoginWindow").hide();
        $("#ContinueAsGuest").hide();
        $("#addLocatorOrderMode").show();
        $("#StrAddressLocatorTitle").show();
        $("#StrAddressLocator").removeClass("StrAddrLoc_loginWindow");
        this.TakewayBtnUI.removeClass("active");
        this.DeliveryBtnUI.addClass("active");
        if (typeof this.DeliveryBtnUI[0] != "undefined" && this.DeliveryBtnUI[0].type == "radio") {
            $("input:radio[name=" + this.OrderModeUIName + "][value=delivery]").prop("checked", true);
            $("input:radio[name=" + this.OrderModeUIName + "][value=carryout]").prop("checked", false)
        }
        this.StoresContainerUI.hide();
        this.AddressesContainerUI.hide();
        this.NewAddressContainerUI.hide();
        this.MapSearchFldUI.hide();
        this.SearchFldUI.show();
        this.SearchFldUI.prop("disabled", true);
        this.AddressesContainerUI.show();
        this.MoreLocationsBtnUI.show();
        this.LessLocationsBtnUI.show();
        this.LocationsCountUI.show();
        this.MapContainerUI.show();
        this.showMarkers(false, true);
        this.removeNewAddressMarker();
        this.FillAddresses()
    };
    storeAddressLocator.ShowLoginWindow = function () {
        this.TakewayBtnUI.removeClass("active");
        this.DeliveryBtnUI.addClass("active");
        $("#StrAddressLocator").addClass("StrAddrLoc_loginWindow");
        this.StoresContainerUI.hide();
        this.AddressesContainerUI.hide();
        this.NewAddressContainerUI.hide();
        this.MapSearchFldUI.hide();
        this.SearchFldUI.show();
        this.SearchFldUI.prop("disabled", true);
        this.AddressesContainerUI.hide();
        this.MoreLocationsBtnUI.hide();
        this.LessLocationsBtnUI.hide();
        this.LocationsCountUI.hide();
        this.MapContainerUI.hide();
        $("#addLocatorOrderMode").hide();
        $("#StrAddressLocatorTitle").hide();
        $("#showGuestAddress").unbind("click");
        $("#showGuestAddress").click(function () {
            storeAddressLocator.continueAsGuestClicked = true;
            storeAddressLocator.Refresh()
        });
        this.removeNewAddressMarker();
        $("#StoreLocator_LoginWindow").show();
        $("#ContinueAsGuest").show()
    };
    storeAddressLocator._prev_ShowTakeway = storeAddressLocator.ShowTakeway;
    storeAddressLocator.ShowTakeway = function () {
        $("#StoreLocator_LoginWindow").hide();
        $("#ContinueAsGuest").hide();
        $("#addLocatorOrderMode").show();
        $("#StrAddressLocatorTitle").show();
        $("#StrAddressLocator").removeClass("StrAddrLoc_loginWindow");
        this.MapContainerUI.show();
        storeAddressLocator._prev_ShowTakeway()
    };
    storeAddressLocator._prev_ShowDeliveryNewAddress = storeAddressLocator.ShowDeliveryNewAddress;
    storeAddressLocator.ShowDeliveryNewAddress = function () {
        $("#StoreLocator_LoginWindow").hide();
        $("#ContinueAsGuest").hide();
        $("#addLocatorOrderMode").show();
        $("#StrAddressLocatorTitle").show();
        $("#StrAddressLocator").removeClass("StrAddrLoc_loginWindow");
        this.MapContainerUI.show();
        storeAddressLocator._prev_ShowDeliveryNewAddress()
    };
    $("#EditOrderModeContainer").click(function () {
        storeAddressLocator.Toggle()
    });
    storeAddressLocator._prev_UpdateCartHeader = storeAddressLocator.UpdateCartHeader;
    storeAddressLocator.UpdateCartHeader = function (h, e, c) {
        var a = true;
        for (var d = 0; d < cart.cartData.length; d++) {
            var j = OriginalItems[cart.cartData[0].ID];
            if (typeof j.Availability !== "undefined") {
                var g = j.Availability;
                var f = j.Availability.orderMode;
                if ((h && f.indexOf("delivery") > -1) || (!h && f.indexOf("takeaway") > -1)) {
                    a = true
                } else {
                    a = false;
                    break
                }
            }
        }
        var b = h ? "Takeaway" : "Delivery";
        if (a) {
            storeAddressLocator._prev_UpdateCartHeader(h, e, c)
        } else {
            confirm("Some items in your cart are only available for " + b + " if you wish to proceed with changing the order mode your cart will be emptied. Do you wish to proceed?", {
                isDelivery: h,
                objID: e,
                obj: c
            }, function (l, k) {
                if (l) {
                    cart.cartData = [];
                    cart.updateCart();
                    storeAddressLocator._prev_UpdateCartHeader(k.isDelivery, k.objID, k.obj)
                } else { }
            })
        }
        updateAddressOrderMode()
    }
});

function updateAddressOrderMode() {
    var c = Translate("Delivery to");
    var d = Translate("Click here to choose your delivery location");
    if (cart.cartHeader.DelivaryOrTakeout == "Delivary" && cart.cartHeader.AddressID > 0) {
        c = Translate("Delivery to");
        for (var b in userLogin.customerData.Addresses) {
            if (cart.cartHeader.AddressID == userLogin.customerData.Addresses[b]["ID"]) {
                address = userLogin.customerData.Addresses[b];
                d = address.Description;
                break
            }
        }
    } else {
        if (cart.cartHeader.DelivaryOrTakeout == "Delivary" && cart.cartHeader.AddressID == 0 && typeof cart.cartHeader.NewAddress !== "undefined") {
            c = Translate("Delivery to");
            d = cart.cartHeader.NewAddress["Directions"]
        } else {
            if (cart.cartHeader.DelivaryOrTakeout == "Takeaway" && cart.cartHeader.StoreID > 0) {
                c = Translate("Carryout from");
                //if (OriginalStores[cart.cartHeader.StoreID] == null) {
                //    d = Translate("The store details are currently unavailable.")
                //} else {
                //    var a = OriginalStores[cart.cartHeader.StoreID];
                //    d = a.Address
                //}
            }
        }
    }
    $("#OrderModeType").html(c);
    $("#cartOrderMode").html(c);
    $("#DeliveryTitle").html(d);
    $("#cartAddress").html(d)
}
$(window).resize(function () {
    if (typeof storeAddressLocator !== undefined && storeAddressLocator != null) {
        if (storeAddressLocator.isVisible) {
            if ($(window).width() > 799 && !$("#StoreLocatorContainer").hasClass("popup")) {
                showShadow();
                var b = getTopmostZIndex() + 10;
                $("#StoreLocatorContainer").addClass("popup");
                $("#dockedBasket").css("zIndex", b);
                var a = $("#dockedBasket").height();
                if (!$("#StoreLocatorContainer").is(":visible")) {
                    $("#StoreLocatorContainer").css("bottom", -1 * $("#StoreLocatorContainer").height())
                }
                $("#StoreLocatorContainer").css("display", "block");
                $("#StoreLocatorContainer").css("zIndex", b);
                $("#StoreLocatorContainer").show()
            } else {
                if ($(window).width() < 799 && $("#StoreLocatorContainer").hasClass("popup")) {
                    hideShadow();
                    $("#StoreLocatorContainer").removeClass("popup");
                    $("#homePage").hide();
                    $("#homeBanner").hide();
                    $("#container_inner").hide();
                    $("#upperSubMenu").hide();
                    $("#lowerSubMenu").show();
                    $("#content").hide();
                    $("#basket_box").hide();
                    $("#signupform").show();
                    $("#dockedBasket").show();
                    $("#StoreLocatorContainer").show()
                }
            }
        }
    }
});
var isSubmenuHoverActivated = false;
var isSubmenuClickActivated = false;
var isSubmenuLrgClickActivated = false;

function activateHover() {
    $(".ItemBack").unbind("click");
    $(".ItemFront").unbind("click");
    $(".SubMenuItem").unbind("mouseenter mouseleave");
    $(".SubMenuItem").hover(function () {
        $(this).find(".ItemFront").hide();
        $(this).find(".ItemBack").show();
        $(this).find(".ItemCustomizeSection").show();
        $(this).find(".ItemCustomizeSection2").hide();
        $(this).addClass("opened")
    }, function () {
        $(this).find(".ItemBack").hide();
        $(this).find(".ItemCustomizeSection").hide();
        $(this).find(".ItemCustomizeSection2").show();
        $(this).find(".ItemFront").show();
        $(this).removeClass("opened")
    });
    isSubmenuClickActivated = false;
    isSubmenuHoverActivated = true;
    isSubmenuLrgClickActivated = false
}

function activateClick() {
    $(".ItemCustomizeSection2").unbind("click");
    $(".ItemCustomizeSection2").bind("click", function () {
        var a = $(this).parent().parent();
        a.find(".ItemFront").trigger("click")
    });
    $(".SubMenuItem").unbind("mouseenter mouseleave");
    $(".ItemFront").unbind("click");
    $(".ItemFront").bind("click", function () {
        var a = $(this).parent().parent();
        if (a.hasClass("opened")) {
            a.find(".ItemCustomizeSection").hide();
            a.find(".ItemCustomizeSection2").show();
            a.removeClass("opened")
        } else {
            a.find(".ItemBack").show();
            a.find(".ItemCustomizeSection").show();
            a.find(".ItemCustomizeSection2").hide();
            a.addClass("opened")
        }
    });
    $(".ItemBack").unbind("click");
    $(".ItemBack").bind("click", function () {
        var a = $(this).parent().parent();
        if (a.hasClass("opened")) {
            a.find(".ItemCustomizeSection").hide();
            a.removeClass("opened")
        } else {
            a.find(".ItemBack").show();
            a.find(".ItemCustomizeSection").show();
            a.addClass("opened")
        }
    });
    isSubmenuClickActivated = true;
    isSubmenuHoverActivated = false;
    isSubmenuLrgClickActivated = false
}

function activateClickForLargeDevices() {
    $(".ItemCustomizeSection2").unbind("click");
    $(".ItemCustomizeSection2").bind("click", function () {
        var a = $(this).parent().parent();
        a.find(".ItemFront").trigger("click")
    });
    $(".SubMenuItem").unbind("mouseenter mouseleave");
    $(".ItemFront").unbind("click");
    $(".ItemFront").bind("click", function () {
        var a = $(this).parent().parent();
        a.find(".ItemFront").hide();
        a.find(".ItemBack").show();
        a.find(".ItemCustomizeSection").show();
        a.find(".ItemCustomizeSection2").hide();
        a.addClass("opened")
    });
    $(".ItemBack").unbind("click");
    $(".ItemBack").bind("click", function () {
        var a = $(this).parent().parent();
        a.find(".ItemBack").hide();
        a.find(".ItemCustomizeSection").hide();
        a.find(".ItemCustomizeSection2").show();
        a.find(".ItemFront").show();
        a.removeClass("opened")
    });
    isSubmenuClickActivated = false;
    isSubmenuHoverActivated = false;
    isSubmenuLrgClickActivated = true
}

function activateAppropriateEvent() {
    if ($(window).width() > 750) {
        if (isTouchDevice()) {
            activateClickForLargeDevices()
        } else {
            activateHover()
        }
        return
    }
    if ($(window).width() < 750) {
        activateClick();
        return
    }
}
$(document).foundation();
$(document).ready(function () {
    if (typeof bk !== "undefined" && typeof bk.oldUpdate === "undefined") {
        bk.oldUpdate = bk.Update;
        bk.Update = function (a) {
            this.oldUpdate(a);
            activateAppropriateEvent()
        }
    }
    activateAppropriateEvent()
});
$(window).resize(function () {
    if ($(window).width() < 750 && (isSubmenuHoverActivated || isSubmenuLrgClickActivated)) {
        activateClick();
        return
    }
    if ($(window).width() > 750 && (isSubmenuClickActivated || isSubmenuLrgClickActivated) || !isTouchDevice()) {
        activateHover();
        return
    }
    if (isTouchDevice() && $(window).width() > 750 && (isSubmenuClickActivated || isSubmenuHoverActivated)) {
        activateClickForLargeDevices();
        return
    }
});
$(function () {
    DealBuilder.prototype.GetStepItems = function (c, f, a) {
        var h = null;
        for (var b in this.selectedItems) {
            var d = this.selectedItems[b];
            if (d.StepNum == f - 1) {
                h = d;
                break
            }
        }
        for (var e in c.Items) {
            if (this.deal.ID == 36 && f == 3) {
                var j = OriginalItems[h.Item["ID"]];
                var g = c.Items[e];
                if (h.Item["ID"] == g.ID || (j.VirtualGroupID != -1 && (j.VirtualGroupID == g.VirtualGroupID || g.ID == 7600)) || (j.ID == "7600" && g.VirtualGroupID != -1)) {
                    continue
                } else {
                    c.Items[e]["Sequence"] = c.Items[e]["Rank"];
                    a.push(c.Items[e])
                }
            } else {
                c.Items[e]["Sequence"] = c.Items[e]["Rank"];
                a.push(c.Items[e])
            }
        }
    }
});
$(document).ready(function () {
    bk.activeStyle.getSelectedItemOfGroup = function (h) {
        var c = h.data("vgroup_data");
        if (typeof c === "undefined" || c == null) {
            return null
        }
        var g = h.data("Selector1Val");
        var e = h.data("Selector2Val");
        var b = h.data("Selector3Val");
        if (e == 4000014) {
            h.addClass("selector3")
        } else {
            if (b == 4000015 || b == 4000016 || b == 4000017) {
                h.removeClass("selector3");
                b = -1
            }
        }
        var d = null;
        for (var j in c.Items) {
            var f = c.Items[j];
            if ((typeof g === "undefined" || g == f.Selector1ValueID) && (typeof e === "undefined" || e == f.Selector2ValueID) && (typeof b === "undefined" || b == f.Selector3ValueID)) {
                d = f;
                break
            }
        }
        return d
    };
    var a = null;
    PizzaBuilder.prototype.org_populateSelectablePizzaItems = PizzaBuilder.prototype.populateSelectablePizzaItems;
    PizzaBuilder.prototype.populateSelectablePizzaItems = function () {
        if (this.currentSelectorOpt2.ID != 4000014) {
            this.currentSelectorOpt3 = null;
            $("#selector3_dropdown").hide()
        } else {
            if (this.currentSelectorOpt3 != null) {
                a = this.currentSelectorOpt3
            } else {
                if (this.currentSelectorOpt3 == null && a != null) {
                    this.currentSelectorOpt3 = a;
                    $(this.ComboCtrlTitleUI[3]["ui"][0]).html(this.currentSelectorOpt3.Name)
                } else {
                    this.currentSelectorOpt3 = OriginalVirtualSelectors[38]["SelectorValues"][4000015];
                    $(this.ComboCtrlTitleUI[3]["ui"][0]).html(this.currentSelectorOpt3.Name)
                }
            }
            $("#selector3_dropdown").show()
        }
        this.org_populateSelectablePizzaItems()
    }
});