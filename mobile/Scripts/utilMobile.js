
function saveCookie(name, value, days) {
    if (days == null) {
        days = 1;
    }
    $.cookie(name, encodeURI(value), { expires: days });
}

function saveCookieGlobal(name, value, days) {
    saveCookieGlobalEncOpt(name, value, days, false);
}

function saveCookieGlobalEncOpt(name, value, days, encode) {
    if (days == null) {
        days = 1;
    }

    var savedvalue = value;

    if(encode == true){
        savedvalue = encodeURI(value);
    }

    $.cookie(name, savedvalue, { expires: days, path: '/' });
}

function getCookie(name) {
    if ($.cookie(name) != null) {
        return decodeURI($.cookie(name));
    }
    return "";
}

function eraseCookie(name) {
    saveCookie(name, "", -1);
    saveCookieGlobal(name, "", -1);
}

function eraseAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++)
        eraseCookie(cookies[i].split("=")[0]);
}