/*! Improved jQuery.cookie plugin by @mathias: http://mths.be/cookie */
(function (a, b) { b.cookie = function (g, h, f) { var c = "", e, d; if (typeof h != "undefined") { f || (f = {}); if (!h) { h = ""; f.expires = -1 } if (f.expires && (typeof f.expires == "number" || f.expires.toUTCString)) { e = new Date; if (typeof f.expires == "number") { e.setTime(+new Date() + (f.expires * 86400000)) } else { e = f.expires } c = "; expires=" + e.toUTCString() } a.cookie = [g, "=", encodeURIComponent(h), c, f.path ? "; path=" + f.path : "", f.domain ? "; domain=" + f.domain : "", f.secure ? "; secure" : ""].join("") } else { d = a.cookie.match(new RegExp("(?:^|;)\\s?" + g.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1") + "=(.*?)(?:;|$)", "i")); return d && unescape(d[1]) } } } (document, jQuery));