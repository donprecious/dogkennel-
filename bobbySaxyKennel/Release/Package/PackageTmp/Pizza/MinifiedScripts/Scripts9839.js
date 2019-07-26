(function(e, a, f) {
    var c, b = e.getElementsByTagName(a)[0];
    if (e.getElementById(f)) {
        return
    }
    c = e.createElement(a);
    c.id = f;
    c.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=" + FacebookAppID + "&version=v2.5";
    b.parentNode.insertBefore(c, b)
}(document, "script", "facebook-jssdk"));
$(document).ready(function() {
    initFacebook()
});
var facebookLibInitiated = false;

function initFacebook() {
    if (facebookLibInitiated) {
        return
    }
    if (typeof FB !== "undefined") {
        FB.init({
            appId: FacebookAppID,
            xfbml: true,
            version: "v2.0"
        });
        facebookLibInitiated = true
    }
}

function getFacebookUserInfo(a) {
    initFacebook();
    document.__faceUserInfoCallback1 = a;
    internalGetFacebookUserInfo(document.__faceUserInfoCallback1)
}

function internalGetFacebookUserInfo(a) {
    document.__faceUserInfoCallback = a;
    FB.getLoginStatus(function(b) {
        if (b.status === "connected") {
            FB.api("/me?fields=email, birthday, first_name, last_name, gender, hometown, locale, location, relationship_status ", function(c) {
                var d = {
                    birthday: ((typeof c.birthday !== "undefined") ? c.birthday : ""),
                    email: ((typeof c.email !== "undefined") ? c.email : ""),
                    firstname: c.first_name,
                    gender: ((typeof c.gender !== "undefined") ? c.gender : ""),
                    hometown: ((typeof c.hometown !== "undefined") ? c.hometown["name"] : ""),
                    id: ((typeof c.id !== "undefined") ? c.id : ""),
                    logintoken: b.authResponse["accessToken"],
                    lastname: c.last_name,
                    language: ((typeof c.locale !== "undefined") ? c.locale : ""),
                    location: ((typeof c.location !== "undefined") ? c.location["name"] : ""),
                    relation: ((typeof c.relationship_status !== "undefined") ? c.relationship_status : "")
                };
                document.__faceUserInfoCallback(true, d)
            })
        } else {
            FB.login(function(c) {
                if (c.status === "connected") {
                    internalGetFacebookUserInfo(document.__faceUserInfoCallback)
                } else {
                    document.__faceUserInfoCallback(false)
                }
            }, {
                scope: "public_profile,email,user_birthday,user_hometown,user_location,user_relationships"
            })
        }
    })
}
var customizeCartImage = null;

function getCartItemCRC(a) {
    function d(f, g) {
        for (var j in f.modGroupsItems) {
            var h = f.modGroupsItems[j];
            g[g.length] = h.ID;
            if (h.modGroupsItems != null && h.modGroupsItems.length > 0) {
                d(h, g)
            }
        }
        for (var j in f.NoModCodeItems) {
            var h = f.NoModCodeItems[j];
            g[g.length] = "no" + h.ID;
            if (h.NoModCodeItems != null && h.NoModCodeItems.length > 0) {
                d(h, g)
            }
        }
    }
    var c = [a.ID];
    d(a, c);
    c.sort();
    var b = "";
    for (var e in c) {
        b += "_" + c[e]
    }
    b += "_" + c.length;
    if (typeof a.DealID !== "undefined" && a.DealID > 0) {
        b += "_" + a.DealID
    }
    return b
}

function isSameItem(c, b) {
    if (c.ID != b.ID) {
        return false
    }
    if (c.modGroupsItems.length != b.modGroupsItems.length) {
        return false
    }
    if (typeof c.NoModCodeItems !== "undefined" && typeof b.NoModCodeItems !== "undefined" && c.NoModCodeItems.length != b.NoModCodeItems.length) {
        return false
    }
    var d = getCartItemCRC(c);
    var a = getCartItemCRC(b);
    return d == a
}

function _drawItemDetails(k, a, j) {
    var f = "";
    var c = groupItemDetails(k.modGroupsItems);
    for (var e in c) {
        var h = c[e];
        if ((typeof h.ModGroupID !== "undefined" && typeof OriginalModGroups[h.ModGroupID] !== "undefined" && OriginalModGroups[h.ModGroupID]["Items"].length > 0) || (typeof h.ModGroupID === "undefined")) {
            var g = j;
            var l = dubStr("&nbsp;", 3 * (a));
            if (typeof h.Qty === "undefined") {
                h.Qty = 1
            }
            if (typeof h.showModItemPrice === "undefined") {
                h.showModItemPrice = true
            }
            g = g.replace(/#NAME#/gi, l + h.Name);
            g = g.replace(/#FULLNAME#/gi, h.Name);
            g = g.replace(/#QTY#/gi, ((h.Qty != 1 && h.Qty != 0) || (h.Qty == 1 && showQtyWhenOne)) ? (h.Qty + "&nbsp;x&nbsp;") : "");
            if (h.showModItemPrice) {
                var d = h.Price;
                if (d > 0) {
                    for (var e in h.modGroupsItems) {
                        var b = h.modGroupsItems[e];
                        d -= b.Price
                    }
                }
                g = g.replace(/#PRICE#/gi, (h.Qty * d) > 0 ? (RoundPrice(h.Qty * d) + "<span class='currencySymbol'>" + CurrencySymbol + "</span>") : "");
                g = g.replace(/#HAS_PRICE_DISPLAY#/gi, d > 0 ? "inline" : "none")
            } else {
                g = g.replace(/#PRICE#/gi, "");
                g = g.replace(/#HAS_PRICE_DISPLAY#/gi, "none")
            }
            f += g
        }
        f += _drawItemDetails(h, a + 1, j)
    }
    for (var e in k.NoModCodeItems) {
        var h = k.NoModCodeItems[e];
        var g = j;
        var l = dubStr("&nbsp;", 3 * (a));
        if (typeof h.Qty === "undefined") {
            h.Qty = 1
        }
        g = g.replace(/#NAME#/gi, l + Translate("No") + " " + h.Name);
        g = g.replace(/#FULLNAME#/gi, h.Name);
        g = g.replace(/#QTY#/gi, ((h.Qty != 1 && h.Qty != 0) || (h.Qty == 1 && showQtyWhenOne)) ? ("&nbsp;X&nbsp;" + h.Qty) : "");
        g = g.replace(/#PRICE#/gi, "");
        g = g.replace(/#HAS_PRICE_DISPLAY#/gi, "none");
        f += g
    }
    return f
}

function groupItemDetails(a) {
    var e = [];
    for (var d in a) {
        var c = a[d];
        var f = false;
        for (var b in e) {
            if (isSameItem(e[b], c)) {
                e[b]["Qty"] = e[b]["Qty"] + 1;
                f = true;
                break
            }
        }
        if (!f) {
            c.Qty = 1;
            e.push(c)
        }
    }
    return e
}

function getCheckTotal(b) {
    var d = 0;
    var a = null;
    if (typeof b.cart !== "undefined") {
        a = b.cart
    } else {
        a = b
    }
    if (a != null) {
        for (var c in a) {
            d += getCartItemPrice(a[c])
        }
    }
    return d
}

function drawCartItemsAsHTML(ao, b, h) {
    var R = b.basketItemsUI;
    var E = b.basketTotalUI;
    var am = b.basketQtyUI;
    var V = b.mobileBasketQtyUI;
    var p = b.basketSubTotalUI;
    var d = b.basketServiceChargeUI;
    var ag = b.mobileBasketTotalUI;
    var W = b.textLimit;
    var Z = b.callback;
    var at = b.addServiceCharge;
    var ah = 0;
    if (typeof Z === "undefined") {
        Z = null
    }
    var ap = {};
    for (var an in ao) {
        var y = ao[an];
        var w = 0;
        var f = "";
        var u = true;
        var g = 0;
        var t = false;
        var ar = -1;
        var ab = 0;
        if (y.DealID > 0) {
            var D = dealNumber_extract(y.DealID);
            ab = D.dealID;
            var g = D.bookmark;
            ar = D.stepNumber;
            var S = OriginalDeals[ab];
            w = ab + "_" + g;
            f = S.Name;
            t = S.ItemID == y.ID
        } else {
            w = getCartItemCRC(y);
            f = y.Name
        }
        if (typeof ap[w] === "undefined") {
            ap[w] = {
                Name: f,
                Qty: 1,
                Bookmarks: {},
                DrawItems: [],
                RealItems: [],
                DealID: ab,
                OriginalPrice: getItemOrgPrice(y)
            };
            if (!t && (ab > 0 && OriginalDeals[ab].ItemID != -1)) {
                var aq = cloneObject(y);
                aq.stepNumber = ar;
                ap[w]["DrawItems"].push(aq)
            }
            ap[w]["Bookmarks"][g] = g
        } else {
            if (typeof ap[w]["Bookmarks"][g] === "undefined" || g == 0) {
                ap[w]["Bookmarks"][g] = g;
                ap[w]["Qty"]++
            }
        }
        ap[w]["RealItems"].push(y);
        var o = false;
        if (ab == 0) {
            for (var an in ap[w]["DrawItems"]) {
                var N = ap[w]["DrawItems"][an];
                if (isSameItem(N, y)) {
                    o = true;
                    break
                }
            }
        }
        if (!o) {
            if (!t) {
                var aq = cloneObject(y);
                aq.stepNumber = ar;
                ap[w]["DrawItems"].push(aq)
            }
        }
        if (t) {
            for (var al in y.modGroupsItems) {
                var J = y.modGroupsItems[al];
                var aq = cloneObject(J);
                var aj = dealNumber_extract(J.DealID);
                aq.stepNumber = aj.stepNumber;
                ap[w]["DrawItems"].push(aq)
            }
        }
    }
    for (var w in ap) {
        if (typeof OriginalDeals[ap[w]["DealID"]] === "undefined") {
            continue
        }
        var ab = ap[w]["DealID"];
        var Q = OriginalDeals[ab];
        var S = ap[w];
        var aa = {};
        var al = 0;
        for (var an in Q.Steps) {
            var U = Q.Steps[an];
            var ad = U.Min;
            if (ad < 0) {
                ad = 1
            }
            while (ad > 0) {
                aa[al] = U;
                al++;
                ad--
            }
        }
        for (var l in aa) {
            var U = aa[l];
            if (U.NoThanks_ItemTitle != null && U.NoThanks_ItemTitle != "") {
                var o = false;
                for (var Y in S.DrawItems) {
                    var aq = S.DrawItems[Y];
                    var a = aq.stepNumber;
                    if (a == l) {
                        o = true;
                        break
                    }
                }
                if (!o) {
                    var M = {
                        ID: Number.NaN,
                        StepID: U.ID,
                        Name: U.NoThanks_ItemTitle,
                        Title: U.NoThanks_ItemTitle,
                        Description: U.NoThanks_ItemDesc,
                        ImageName: U.NoThanks_ItemImage,
                        ItemTitleStyle: U.NoThanks_ItemStyle,
                        stepNumber: l,
                        VirtualGroupID: 0,
                        SpecialItem: true,
                        modGroup: [],
                        modGroupIDz: [],
                        Price: 0,
                        Weight: 0,
                        PizzaItem: false,
                        IsSubmenu: false,
                        Filter: "",
                        Rank: -1
                    };
                    S.DrawItems.push(M)
                }
            }
        }
        S.DrawItems.sort(function(au, x) {
            return au.stepNumber - x.stepNumber
        })
    }
    var af = HTML_Pages[typeof b.itemGroupTemplate !== "undefined" ? b.itemGroupTemplate : "CartItemGroup"];
    var v = HTML_Pages[typeof b.itemTemplate !== "undefined" ? b.itemTemplate : "CartItem"];
    var c = HTML_Pages[typeof b.itemDetTemplate !== "undefined" ? b.itemDetTemplate : "CartItemDetail"];
    var ac = HTML_Pages[typeof b.itemTemplateEmpty !== "undefined" ? b.itemTemplateEmpty : "CartItemEmpty"];
    var P = "";
    var ae = 0;
    var z = 0;
    var H = false;
    for (var al in ap) {
        var C = ap[al];
        var B = "";
        H = true;
        var k = 0;
        var I = "";
        var A = "";
        if (C.DealID > 0) {
            A = "deal" + strPadLeft("0", 6, C.DealID.toString()) + ".jpg"
        }
        for (var Y in C.DrawItems) {
            if (C.DealID > 0) {
                k++
            }
            var ak = C.DrawItems[Y];
            var G = ak.Name;
            var j = getCartItemPrice(ak, null, 0, 100, h);
            I = _drawItemDetails(ak, 0, c);
            var X = v;
            X = X.replace(/#NAME#/gi, G);
            X = X.replace(/#FULLNAME#/gi, G);
            X = X.replace(/#PRICE#/gi, j != 0 ? j.toString() + "<span class='currencySymbol'>" + CurrencySymbol + "</span>" : "");
            var L = "itm" + strPadLeft("0", 6, ak.ID.toString()) + ".jpg";
            var O = typeof OriginalItems[ak.ID] !== "undefined" ? (typeof OriginalItems[ak.ID]["VirtualGroupID"] !== "undefined" && OriginalItems[ak.ID]["VirtualGroupID"] > 0) : false;
            L = typeof OriginalItems[ak.ID] !== "undefined" ? OriginalItems[ak.ID]["ImageName"] + ".jpg" : ".jpg";
            if (typeof ak !== "undefined" && L == ".jpg") {
                if (customizeCartImage == null) {
                    if (!ak.IsDeal && !isNaN(ak.ID) && typeof OriginalItems[ak.ID] !== "undefined") {
                        L = "itm" + strPadLeft("0", 6, (!O ? ak.ID.toString() : OriginalItems[ak.ID]["VirtualGroupID"].toString())) + ".jpg"
                    } else {
                        if (ak.IsDeal) {
                            L = "deal" + strPadLeft("0", 6, ak.DealID.toString()) + ".jpg"
                        } else {
                            if (typeof ak.StepID !== "undefined" && ak.StepID > 0) {
                                L = "stepdef" + strPadLeft("0", 6, ak.StepID.toString()) + ".jpg"
                            }
                        }
                    }
                } else {
                    L = customizeCartImage(ak)
                }
            }
            if (A == "") {
                A = L
            }
            X = X.replace(/#DETAILS#/gi, I);
            X = X.replace(/#IMAGE#/gi, "Menu" + CurrentMenuTemplateID + "/" + L);
            if (Z != null) {
                X = Z("Item", ak, X)
            }
            B += X
        }
        var K = 0;
        for (var Y in C.RealItems) {
            K += getCartItemPrice(C.RealItems[Y], null, 0, 100, h)
        }
        K = RoundPrice(K);
        var T = C.Name;
        var F = C.Qty.toString();
        var m = C.OriginalPrice;
        var ai = createUUID();
        z += parseInt(F);
        var s = af;
        if (Z != null) {
            s = Z("Group", C, s)
        }
        s = s.replace(/#NAME#/gi, T);
        s = s.replace(/#FULLNAME#/gi, T);
        s = s.replace(/#DETAILS#/gi, (k > 1 || (k > 0 && C.DealID > 0)) ? B : I);
        s = s.replace(/#QTY#/gi, F);
        s = s.replace(/#ORIGINALPRICE#/, m == 0 ? "" : m.toString() + "<span class='currencySymbol'>" + CurrencySymbol + "</span>");
        s = s.replace(/#PRICE#/gi, (K != 0 ? K.toString() + "<span class='currencySymbol'>" + CurrencySymbol + "</span>" : ""));
        s = s.replace(/#IMAGE#/gi, "Menu" + CurrentMenuTemplateID + "/" + A);
        for (an = 1; an <= maxQuantityInSelect; an++) {
            var e = new RegExp("#SELECTED" + an + "#", "gi");
            if (F == an) {
                s = s.replace(e, 'selected="selected"')
            } else {
                s = s.replace(e, "")
            }
        }
        ae += K;
        ae = RoundPrice(ae);
        P += s
    }
    if (!H && typeof ac !== "undefined") {
        P += ac
    }
    var q = 0;
    var r = ae;
    if (at && ae > 0) {
        q = ServiceChargeDelivery;
        ae += q
    }
    $(d).html(RoundPrice(q) + "<span class='currencySymbol'>" + CurrencySymbol + "</span>");
    $(p).html(RoundPrice(r) + "<span class='currencySymbol'>" + CurrencySymbol + "</span>");
    $(E).html(RoundPrice(ae) + "<span class='currencySymbol'>" + CurrencySymbol + "</span>");
    $(R).html(P);
    $(am).html(z);
    $(V).html(z);
    $(ag).html(RoundPrice(ae) + "<span class='currencySymbol'>" + CurrencySymbol + "</span>");
    return P
}
"use strict";
var isValidateForDelivary = false;
var validateDeliveryTime = new Date();
var validateIsFutureOrder = false;
var maxQuantityInSelect = 25;
var showQtyWhenOne = false;

function ShoppingCart() {
    this.cartData = null;
    this.cartHeader = {};
    this.cartTotals = null;
    this.cartTotalPrice = 0;
    this.cartSubTotalPrice = 0;
    this.cartContainer = null;
    this.clearCartBtn = null;
    this.checkoutBtn = null;
    this.totalArea = null;
    this.itemscountArea = null;
    this.mobileItemscountArea = null;
    this.subTotalArea = null;
    this.mobileTotalArea = null;
    this.drawCartsContainers = [];
    this.NotificationUI = null;
    this.servicechargeArea = null;
    this.useSavedPrices = false;
    this.addServiceCharge = addServiceChargeToCartTotal;
    this.postOrderID = 0;
    this.onCartUpdated = null;
    this.onUpdateCartTotals = null;
    this.onAddNewItem = null;
    this.onBeforeAddNewItem = null;
    this.Init = function() {
        $(this.clearCartBtn).data("this", this);
        $(this.clearCartBtn).click(function() {
            if (confirm("Are you sure you want to clear the cart ?", $(this).data("this"), function(b, c) {
                    if (b) {
                        c.clearCart()
                    }
                })) {}
        });
        try {
            this.readFromLocal()
        } catch (a) {
            this.clearCart()
        }
        $(this.cartContainer).addClass("VScrollable");
        this.drawCart({
            basketItemsUI: this.cartContainer,
            basketTotalUI: this.totalArea,
            basketQtyUI: this.itemscountArea,
            mobileBasketQtyUI: this.mobileItemscountArea,
            basketSubTotalUI: this.subTotalArea,
            basketServiceChargeUI: this.servicechargeArea,
            mobileBasketTotalUI: this.mobileTotalArea
        });
        this.updateCart()
    };
    this.getItemMark = function(a) {
        return a.ID + "_" + (typeof a.modGroupsItems !== "undefined" ? a.modGroupsItems.length : 0) + "_" + ((typeof a.modGroupsItems !== "undefined" && a.modGroupsItems.length > 0) ? a.modGroupsItems[0]["ID"] : "")
    };
    this.clearItem = function(d, c) {
        var a = [];
        if (typeof c === "undefined" || c == 0 || c == null) {
            c = -1
        }
        for (var b in this.cartData) {
            var e = this.cartData[b];
            if (getCartItemCRC(e) == d) {
                a.push(b);
                if (c != -1) {
                    c--
                }
            }
            if (c == 0 && c != -1) {
                break
            }
        }
        a.sort(function(g, f) {
            return g - f
        });
        while (a.length > 0) {
            var b = a.pop();
            this.cartData.splice(b, 1)
        }
    };
    this.getItemQty = function(e) {
        var d = 0;
        var b = getCartItemCRC(e);
        for (var a in this.cartData) {
            var c = this.cartData[a];
            if (getCartItemCRC(c) == b) {
                d++
            }
        }
        return d
    };
    this.actFunc = function(c) {
        var x = cart;
        var B = c.act;
        var f = c.itm;
        var o = c.group;
        var t = c.validate;
        var m = c.comboID;
        if (typeof f !== "undefined") {
            if (B == "cust") {
                var A = cloneObject(f);
                A.Qty = x.getItemQty(f);
                x.showCustomize(A, A.Qty);
                return
            }
        }
        if (B == "up" || B == "down" || B == "del") {
            var e = 0;
            var y = "";
            var g = 0;
            var h = 1;
            var s = false;
            if (typeof f !== "undefined") {
                e = f.ID;
                y = f.Name;
                g = f.Price
            } else {
                if (o.RealItems.length == 1) {
                    var d = o.RealItems[0];
                    e = d.ID;
                    y = d.Name;
                    g = d.Price
                } else {
                    if (o.DrawItems.length == 1) {
                        var d = o.DrawItems[0];
                        e = d.ID;
                        y = d.Name;
                        g = d.Price
                    } else {
                        e = o.DealID;
                        y = o.Name;
                        g = o.OriginalPrice;
                        s = true
                    }
                }
            }
            if (B == "del") {
                h = o.Qty
            }
            var r = GoogleTrack_getItemEnName(e, s);
            var v = GoogleTrack_getItemCategory(e);
            if (B == "up") {
                googleTag.push({
                    event: "addToCart",
                    Category: "Shopping Cart",
                    ElementType: "Item",
                    ID: e,
                    Name: r,
                    ecommerce: {
                        add: {
                            products: [{
                                name: r,
                                id: e,
                                price: g,
                                brand: "",
                                category: v,
                                variant: "",
                                quantity: h
                            }]
                        }
                    }
                })
            } else {
                if (B == "down") {
                    googleTag.push({
                        event: "removeFromCart",
                        Category: "Shopping Cart",
                        ElementType: "Item",
                        ID: e,
                        Name: r,
                        ecommerce: {
                            remove: {
                                products: [{
                                    name: r,
                                    id: e,
                                    price: g,
                                    brand: "",
                                    category: v,
                                    variant: "",
                                    quantity: h
                                }]
                            }
                        }
                    })
                } else {
                    if (B == "del") {
                        for (w = 0; w < h; w++) {
                            googleTag.push({
                                event: "removeFromCart",
                                Category: "Shopping Cart",
                                ElementType: "Item",
                                ID: e,
                                Name: r,
                                ecommerce: {
                                    remove: {
                                        products: [{
                                            name: r,
                                            id: e,
                                            price: g,
                                            brand: "",
                                            category: v,
                                            variant: "",
                                            quantity: 1
                                        }]
                                    }
                                }
                            })
                        }
                    }
                }
            }
        }
        if (typeof o !== "undefined") {
            var l = 0;
            var b = genDealBookmark();
            for (var w in o.Bookmarks) {
                l = o.Bookmarks[w];
                break
            }
            for (var w in o.RealItems) {
                var f = o.RealItems[w];
                if (B == "up") {
                    var j = cloneObject(f);
                    j.EntryID = -1;
                    if (j.DealID > 0) {
                        var q = dealNumber_extract(j.DealID);
                        if (q.bookmark != l) {
                            continue
                        }
                        q.bookmark = b;
                        j.DealID = dealNumber_combine(q.dealID, q.stepNumber, q.bookmark)
                    }
                    x.cartData.push(j);
                    if (l == 0) {
                        break
                    }
                } else {
                    if (B == "down") {
                        var z = 0;
                        if (f.DealID > 0) {
                            var q = dealNumber_extract(f.DealID);
                            z = q.bookmark
                        }
                        if (z != l && l != 0) {
                            continue
                        }
                        x.cartData.splice(x.cartData.indexOf(f), 1);
                        if (l == 0) {
                            break
                        }
                    } else {
                        if (B == "del") {
                            x.cartData.splice(x.cartData.indexOf(f), 1)
                        } else {
                            if (B == "addfav") {
                                var p = false;
                                if (o.RealItems.indexOf(f) == o.RealItems.length - 1) {
                                    p = true
                                }
                                FavoriteItems.AddItemToFavorite(f, p);
                                if (o.Qty > 1) {
                                    break
                                }
                            } else {
                                if (B == "changeQty") {
                                    var k = $("#" + m).val();
                                    if (k < o.Qty) {
                                        for (w = 0; w < o.Qty - k; w++) {
                                            var C = x.cartData.indexOf(f);
                                            for (var u in x.cartData) {
                                                if (x.cartData[u]["ID"] == f.ID) {
                                                    x.cartData.splice(x.cartData.indexOf(x.cartData[u]), 1);
                                                    break
                                                }
                                            }
                                        }
                                    } else {
                                        var j = cloneObject(f);
                                        j.EntryID = -1;
                                        if (j.DealID > 0) {
                                            var q = dealNumber_extract(j.DealID);
                                            if (q.bookmark != l) {
                                                continue
                                            }
                                            q.bookmark = b;
                                            j.DealID = dealNumber_combine(q.dealID, q.stepNumber, q.bookmark)
                                        }
                                        for (w = 0; w < k - o.Qty; w++) {
                                            x.cartData.push(j)
                                        }
                                    }
                                    if (l == 0) {
                                        break
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (x.cartData.length == 0) {
            t = false
        }
        if (t) {
            x.recalcCart(x, function(a) {
                a.updateCart(true);
                a.saveToLocal()
            }, isValidateForDelivary, validateIsFutureOrder, validateDeliveryTime)
        } else {
            x.updateCart();
            x.saveToLocal()
        }
    };
    this.drawCart = function(a) {
        a.cart_callback = a.callback;
        a.callback = null;
        this.drawCartsContainers.push(a)
    };
    this.getCartItemsAsHTML = function(e, c) {
        e.callback = function(h, s, q) {
            var k = null;
            var z = null;
            var f = false;
            var y = createUUID();
            if (h == "Group") {
                var o = s;
                k = o.RealItems[0];
                f = s.DealID > 0;
                var m = _genActionLink({
                    "this": this,
                    act: "up",
                    group: o,
                    validate: false
                }, cart.actFunc, true);
                var g = _genActionLink({
                    "this": this,
                    act: "down",
                    group: o,
                    validate: false
                }, cart.actFunc, true);
                var x = _genActionLink({
                    "this": this,
                    act: "del",
                    group: o,
                    validate: false
                }, cart.actFunc, true);
                var u = _genActionLink({
                    "this": this,
                    act: "up",
                    group: o,
                    validate: true
                }, cart.actFunc, true);
                var l = _genActionLink({
                    "this": this,
                    act: "down",
                    group: o,
                    validate: true
                }, cart.actFunc, true);
                var p = _genActionLink({
                    "this": this,
                    act: "del",
                    group: o,
                    validate: true
                }, cart.actFunc, true);
                var r = _genActionLink({
                    "this": this,
                    act: "changeQty",
                    group: o,
                    validate: true,
                    comboID: y
                }, cart.actFunc, false);
                var j = _genActionLink({
                    "this": this,
                    act: "addfav",
                    group: o,
                    validate: false
                }, cart.actFunc, true);
                q = q.replace(/#ADD#/gi, m);
                q = q.replace(/#REMOVE#/gi, g);
                q = q.replace(/#DELETE#/gi, x);
                q = q.replace(/#ADD_V#/gi, u);
                q = q.replace(/#REMOVE_V#/gi, l);
                q = q.replace(/#DELETE_V#/gi, p);
                q = q.replace(/#COMBOBOX_ID#/gi, y);
                q = q.replace(/#CHANGE_QTY#/gi, r);
                q = q.replace(/#ADD_FAV#/gi, j)
            } else {
                if (h == "Item") {
                    k = s
                }
            }
            var v = OriginalItems[k.ID];
            var z = "";
            if (v) {
                z = v.ImageName + ".jpg"
            }
            if (typeof v !== "undefined" && z == ".jpg") {
                if (customizeCartImage == null) {
                    if (!v.IsDeal && !isNaN(v.ID)) {
                        var t = typeof OriginalVirtualGroups[v.VirtualGroupID] !== "undefined";
                        z = "itm" + strPadLeft("0", 6, (!t ? v.ID.toString() : v.VirtualGroupID.toString())) + ".jpg"
                    } else {
                        if (v.IsDeal) {
                            z = "deal" + strPadLeft("0", 6, v.DealID.toString()) + ".jpg"
                        } else {
                            if (typeof v.StepID !== "undefined" && v.StepID > 0) {
                                z = "stepdef" + strPadLeft("0", 6, v.StepID.toString()) + ".jpg"
                            }
                        }
                    }
                } else {
                    z = customizeCartImage(k)
                }
            }
            var w = _genActionLink({
                "this": this,
                act: "cust",
                itm: k
            }, cart.actFunc, true);
            if (!f) {
                q = q.replace(/#IMAGE#/gi, "Menu" + CurrentMenuTemplateID + "/" + z)
            }
            q = q.replace(/#EDIT#/gi, w);
            q = q.replace(/#DEAL_EDIT#/gi, w);
            if (typeof v !== "undefined" && !f && IsItemCustomizable(v, true, k)["canCustomize"]) {
                q = q.replace(/#EDITABLE#/gi, "inline-block");
                q = q.replace(/#DEAL_EDITABLE#/gi, "none")
            } else {
                if (typeof v !== "undefined" && f) {
                    q = q.replace(/#EDITABLE#/gi, "none");
                    q = q.replace(/#DEAL_EDITABLE#/gi, "inline-block")
                } else {
                    if (typeof v !== "undefined" && v.CustomizationType == 3) {
                        q = q.replace(/#EDITABLE#/gi, "none");
                        q = q.replace(/#DEAL_EDITABLE#/gi, "inline-block")
                    } else {
                        q = q.replace(/#EDITABLE#/gi, "none");
                        q = q.replace(/#DEAL_EDITABLE#/gi, "none")
                    }
                }
            }
            if (f) {
                q = q.replace("basketModItm", "basketModItm DealMod")
            }
            return q
        };
        e.addServiceCharge = typeof this.cartHeader.DelivaryOrTakeout == "undefined" || this.cartHeader.DelivaryOrTakeout == "Delivary";
        var b = drawCartItemsAsHTML(this.cartData, e, c);
        var d = 0;
        var a = getCheckTotal(this.cartData);
        this.cartSubTotalPrice = a;
        if (e.addServiceCharge && a > 0) {
            a += ServiceChargeDelivery
        }
        this.cartTotalPrice = a;
        return b
    };
    this.fixModItemPrices = function(d, c) {
        if (typeof d.modGroupsItems !== "undefined") {
            for (var b in d.modGroupsItems) {
                var a = d.modGroupsItems[b];
                this.fixModItemPrices(a.modGroupsItems, c);
                a.Price = getCartItemPrice(a, null, 0, 100, c);
                d.modGroupsItems[b] = a
            }
        }
    };
    this.fixCartPrices = function(b) {
        for (var a in this.cartData) {
            var c = this.cartData[a];
            if (b && typeof c.itmPriceWOMod === "undefined") {
                c.itmPriceWOMod = c.Price
            }
            this.fixModItemPrices(c, b);
            c.Price = getCartItemPrice(c, null, 0, 100, b);
            this.cartData[a] = c
        }
    };
    this.updateCart = function(c) {
        this.cartHeader.MenuTemplateID = CurrentMenuTemplateID;
        this.fixCartPrices(c);
        if (this.drawCartsContainers.length > 0) {
            for (var b in this.drawCartsContainers) {
                var e = this.drawCartsContainers[b];
                var a = this.getCartItemsAsHTML(e, c);
                $(e.basketItemsUI).html(a);
                $(e.basketItemsUI).find("img").each(function() {
                    if (!$(this).attr("orgimg")) {
                        $(this).attr("orgimg", $(this).attr("src"))
                    }
                    this.onerror = function() {
                        ReplaceMissingImage(this)
                    }
                });
                $(e.basketItemsUI).find(".qtySelect").each(function() {
                    if (useJUICombo) {
                        $(this).combobox()
                    } else {
                        if (useBoxIt) {
                            $(this).selectBoxIt({
                                downArrowIcon: "icon-red-arrow"
                            })
                        }
                    }
                });
                var f = e.cart_callback;
                if (typeof f !== "undefined" && f != null) {
                    f()
                }
                var d = "";
                if (typeof this.postOrderID !== "undefined" && cart.postOrderID > 0) {
                    d = Translate("Edit order") + " " + cart.postOrderID
                } else {
                    d = Translate("New order")
                }
                if (typeof e.orderStatusUI !== "undefined") {
                    $(e.orderStatusUI).html(d)
                }
            }
        }
        if (this.onCartUpdated != null) {
            this.onCartUpdated()
        }
    };
    this.clearCart = function() {
        this.postOrderID = 0;
        this.useSavedPrices = false;
        this.cartData.splice(0, this.cartData.length);
        this.cartHeader = {};
        this.saveToLocal();
        this.updateCart();
        googleTag.push({
            event: "Clear",
            Category: "Shopping Cart",
            ElementType: "",
            ID: "",
            Name: ""
        })
    };
    this.recalcCart = function(e, c, a, d, b) {
        if (typeof a === "undefined") {
            a = true
        }
        if (typeof d === "undefined") {
            d = false
        }
        if (typeof b === "undefined") {
            b = new Date()
        }
        serverQuery("/Handlers/ShoppingCart.ashx", {
            action: "recalc",
            cartHeader: this.cartHeader,
            cart: this.cartData,
            isDelivary: a,
            deliveryTime: formatDate(b, "yyyy-MM-dd HH:mm:ss"),
            futureOrder: d
        }, function(j, h, f) {
            if (j) {
                if (h.cart == null && h.message != null) {
                    alert(Translate(h.message));
                    return
                }
                f.useSavedPrices = true;
                f.cartData = h.cart;
                e.cartData = h.cart;
                TranslateCartNames(f.cartData);
                f.cartTotals = h.cartTotals;
                if (f.onUpdateCartTotals != null) {
                    f.cartTotals = f.onUpdateCartTotals(h.cartTotals)
                }
                var g = 0;
                for (var k in f.cartTotals.Discounts) {
                    g += f.cartTotals.Discounts[k]
                }
                f.cartTotals.DiscountTotal = g;
                f.cartTotals.SubTotal = f.cartTotals.GrossTotal - f.cartTotals.DiscountTotal;
                f.cartTotals.ExclusiveTaxes = f.cartTotals.ExclusiveTaxes;
                f.cartTotals.InclusiveTaxes = f.cartTotals.InclusiveTaxes;
                f.cartTotals.Total = f.cartTotals.Total;
                f.updateCart(true);
                f.saveToLocal();
                c(e)
            }
        }, this)
    };
    this.saveToLocal = function() {
        serverQuery("/Handlers/ShoppingCart.ashx?ShowWait=0", {
            action: "save",
            cart: this.cartData,
            orderID: this.postOrderID,
            cartHeader: this.cartHeader,
            cartTotals: this.cartTotals
        }, function(c, b, a) {}, this)
    };
    this.readFromLocal = function() {};
    this.autoSelectDefaultModifiers = function(a, f) {
        for (var h in f.modGroup) {
            var b = f.modGroup[h];
            if (b.Items.length == 1 && b.Minimum > 0) {
                var d = b.Minimum / GetModItemWeight(b, b.Items[0]["ID"]);
                for (var c = 0; c < d; c++) {
                    var e = new Object();
                    e.EntryID = -1;
                    e.ID = b.Items[0]["ID"];
                    e.ModGroupID = b.ID;
                    e.ModGroupOrder = getModGroupOrder(a.ID, b.ID);
                    e.Name = b.Items[0]["Name"];
                    e.Weight = GetModItemWeight(b, b.Items[0]["ID"]);
                    e.Price = GetModItemPrice(b, b.Items[0]["ID"]);
                    e.modGroupsItems = [];
                    a.modGroupsItems[a.modGroupsItems.length] = e;
                    this.autoSelectDefaultModifiers(e, b.Items[0])
                }
            }
        }
    };
    this.addItemToCart = function(e) {
        this.useSavedPrices = false;
        var b = {
            EntryID: e.EntryID,
            ID: e.ID,
            Name: e.Name,
            Price: getCartItemPrice(e),
            Weight: e.Weight,
            modGroupsItems: e.modGroupsItems,
            NoModCodeItems: e.NoModCodeItems,
            DealID: e.DealID
        };
        if (typeof e.EntryID === "undefined") {
            b.EntryID = -1
        }
        if (typeof e.DealID === "undefined") {
            b.DealID = 0
        }
        if (typeof b.modGroupsItems === "undefined") {
            b.modGroupsItems = []
        }
        if (typeof b.NoModCodeItems === "undefined") {
            b.NoModCodeItems = []
        }
        if (b.modGroupsItems.length == 0) {
            autoSelectDefaultModifiers(b)
        }
        reorderPizzaHalfs(b);
        if (typeof e.shopping_cart_group !== "undefined") {
            cart.clearItem(e.shopping_cart_group)
        }
        b._qtyToAdd = 1;
        if (typeof e.Qty !== "undefined") {
            b._qtyToAdd = e.Qty
        }
        var d = function(f) {
            for (var g = 0; g < f._qtyToAdd; g++) {
                cart.cartData[cart.cartData.length] = cloneObject(f)
            }
            cart.updateCart();
            if (cart.onAddNewItem != null) {
                cart.onAddNewItem(f)
            }
            cart.saveToLocal()
        };
        if (cart.onBeforeAddNewItem != null) {
            cart.onBeforeAddNewItem(b, d)
        } else {
            d(b)
        }
        var a = GoogleTrack_getItemEnName(b.ID);
        var c = "";
        if (b.DealID > 0) {
            c = "Deals"
        } else {
            c = GoogleTrack_getItemCategory(b.ID)
        }
        googleTag.push({
            event: "addToCart",
            Category: "Shopping Cart",
            ElementType: "Item",
            ID: b.ID,
            Name: a,
            ecommerce: {
                add: {
                    products: [{
                        name: a,
                        id: b.ID,
                        price: b.Price,
                        brand: "",
                        category: c,
                        variant: "",
                        quantity: b._qtyToAdd
                    }]
                }
            }
        })
    }
}

function reorderPizzaHalfs(a) {
    var d = null;
    var b = null;
    for (var e in a.modGroupsItems) {
        var c = a.modGroupsItems[e];
        if (c.ID == Original_LeftSideItemID) {
            d = c;
            a.modGroupsItems.splice(e, 1);
            break
        }
    }
    for (var e in a.modGroupsItems) {
        var c = a.modGroupsItems[e];
        if (c.ID == Original_RightSideItemID) {
            b = c;
            a.modGroupsItems.splice(e, 1);
            break
        }
    }
    if (d != null && d.modGroupsItems.length > 0) {
        a.modGroupsItems[a.modGroupsItems.length] = d
    }
    if (b != null && b.modGroupsItems.length > 0) {
        a.modGroupsItems[a.modGroupsItems.length] = b
    }
}

function reorderPizzaHalfsForAll(b) {
    for (var c in b) {
        var a = b[c];
        reorderPizzaHalfs(a)
    }
}
"use strict";

function isNumber(a) {
    return !isNaN(parseFloat(a)) && isFinite(a)
}

function getObjectClass(b) {
    if (b && b.constructor && b.constructor.toString) {
        var a = b.constructor.toString().match(/function\s*(\w+)/);
        if (a && a.length == 2) {
            return a[1]
        }
    }
    return undefined
}

function Translate(b) {
    if (typeof TranslatedMessaged === "undefined" || TranslatedMessaged == null) {
        return b
    }
    var a = TranslatedMessaged[b];
    if (typeof a === "undefined") {
        a = b
    }
    return a
}

function limitText(b, a) {
    if (b.length > a) {
        return b.substr(0, a) + "..."
    } else {
        return b
    }
}

function scrollToControl(h, d, g, f, l) {
    var c = d;
    var j = false;
    if (typeof l === "undefined") {
        l = 0
    }
    var a = h;
    var k = 0;
    while (a != c && a != null) {
        k += a.offsetTop - 10;
        a = a.offsetParent
    }
    if (a == null) {
        j = true
    }
    if (!j) {
        if (l == 0) {
            k -= Math.round($(c).height() * 0.4)
        } else {
            if (l == 1) {
                k += h.offsetHeight - c.offsetHeight
            } else {
                k += 0
            }
        }
        if (typeof f !== "undefined") {
            $(c).data("scroll_finish", f);
            $(c).data("scroll_finish_params", g)
        }
        $(c).clearQueue();
        $(c).animate({
            scrollTop: k
        }, {
            duration: 800,
            step: function(m, o) {},
            complete: function() {
                if ($(this).data("scroll_finish") != null) {
                    $(this).data("scroll_finish")($(this).data("scroll_finish_params"))
                }
            }
        })
    } else {
        var e = 0;
        while ($(window).scrollTop() > k) {
            e = $(window).scrollTop();
            var b = $(window).scrollTop() + 10;
            if (b > k) {
                b = k
            }
            $(window).scrollTop(b);
            if ($(window).scrollTop() == e) {
                break
            }
        }
        if (f != null) {
            f(g)
        }
    }
}

function goTo(a) {
    var c = 0;
    var b = $(a).get(0);
    while (b != null) {
        c += b.offsetTop - 10;
        b = b.offsetParent
    }
    $("html, body").clearQueue();
    $("html, body").animate({
        scrollTop: c
    }, {
        duration: 800,
        step: function(d, e) {},
        complete: function() {}
    })
}

function getServerTime(c) {
    if ((typeof document.servertime_sync === "undefined") || (typeof c !== "undefined" && c)) {
        var a = new Date();
        var b = formatDate(a, "MM/dd/yyyy HH:mm:ss");
        $.ajax({
            type: "POST",
            cache: false,
            dataType: "text",
            url: "/Handlers/ItemsInfo.ashx?ShowWait=0",
            timeout: timeoutInterval,
            data: {
                GetServerTime: b
            },
            success: function(d) {
                document.servertime_sync = parseInt(d.toString().trim(), 10)
            },
            error: function(d) {}
        });
        return a
    } else {
        var a = new Date();
        return new Date(a.valueOf() - document.servertime_sync)
    }
}

function TranslateCartNames(a) {
    function c(d) {
        if (typeof OriginalItems[d.ID] === "undefined") {
            return
        }
        d.Name = OriginalItems[d.ID]["Name"];
        for (var e in d.modGroupsItems) {
            c(d.modGroupsItems[e])
        }
        if (typeof d.NoModCodeItems !== "undefined") {
            for (var e in d.NoModCodeItems) {
                c(d.NoModCodeItems[e])
            }
        }
    }
    for (var b in a) {
        c(a[b])
    }
}
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
};
String.prototype.removeSpecialChars = function() {
    return this.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
};

function UpdateScrolls() {}

function showNotificationBallon(a) {
    new PopupAdvert({
        page: a,
        message: HTML_Pages[a],
        height: 250,
        width: 450
    })
}

function ConvertDateServerDate(a) {
    return new Date(parseInt(a.replace(/\/Date\((-?\d+)\)\//, "$1")))
}

function FillDropDownList(k, c, j, h, g, d) {
    if (!c) {
        return
    }
    var f = $("#" + k);
    if (!f) {
        return
    }
    if (!f.is("select")) {
        return
    }
    if (typeof d === "undefined") {
        d = false
    }
    f.children().remove();
    if (j) {
        if (j) {
            if (useBoxIt) {
                f.append($("<option value=''>- " + Translate("Select a value") + " -</option>"))
            }
            if (useJUICombo) {
                f.append($("<option value='-1'>- " + Translate("Select a value") + " -</option>"))
            }
        }
    }
    var e = [];
    if (d) {
        for (var b in c) {
            var a = c[b];
            e.push(a)
        }
        e = e.sort(function(o, m) {
            return o.Name.toString().localeCompare(m.Name.toString())
        })
    } else {
        e = c
    }
    for (var b in e) {
        var l = e[b];
        if (h) {
            if (l[h] != g) {
                continue
            }
        }
        f.append($("<option value='" + (typeof l.ID !== "undefined" ? l.ID : id) + "'>" + (typeof l.Name !== "undefined" ? l.Name : l) + "</option>"))
    }
}

function dump(a, g) {
    var f = "";
    if (!g) {
        g = 0
    }
    var e = "";
    for (var b = 0; b < g + 1; b++) {
        e += "    "
    }
    if (typeof(a) == "object") {
        for (var c in a) {
            var d = a[c];
            if (typeof(d) == "object") {
                f += e + "" + c + " : \n";
                f += dump(d, g + 1)
            } else {
                f += e + "" + c + " : " + d + "\n"
            }
        }
    } else {
        f = "===>" + a + "<===(" + typeof(a) + ")"
    }
    return f
}

function print_r(a) {
    if (a.constructor == Array || a.constructor == Object) {
        document.write("<ul>");
        for (var b in a) {
            if (a[b].constructor == Array || a[b].constructor == Object) {
                document.write("<li>[" + b + "] => " + typeof(a) + "</li>");
                document.write("<ul>");
                print_r(a[b]);
                document.write("</ul>")
            } else {
                document.write("<li>[" + b + "] => " + a[b] + "</li>")
            }
        }
        document.write("</ul>")
    }
}

function MesureStart() {
    document.start_seconds = new Date().getTime()
}

function MesureEnd() {
    var a = new Date().getTime() - document.start_seconds;
    alert(a)
}

function createCookie(c, d, e) {
    if (e) {
        var b = new Date();
        b.setTime(b.getTime() + (e * 24 * 60 * 60 * 1000));
        var a = "; expires=" + b.toGMTString()
    } else {
        var a = ""
    }
    document.cookie = c + "=" + d + a + "; path=/"
}

function readCookie(b) {
    var e = b + "=";
    var a = document.cookie.split(";");
    for (var d = 0; d < a.length; d++) {
        var f = a[d];
        while (f.charAt(0) == " ") {
            f = f.substring(1, f.length)
        }
        if (f.indexOf(e) == 0) {
            return f.substring(e.length, f.length)
        }
    }
    return null
}

function eraseCookie(a) {
    createCookie(a, "", -1)
}

function writeObjectToCookie(c, b, d) {
    var a = JSON.stringify(b);
    createCookie(c, a, 3)
}

function readObjectFromCookie(b) {
    var a = readCookie(b);
    return JSON.parse(a)
}

function GetModItemPrice(d, f) {
    if (typeof d !== "undefined") {
        for (var b in d.ItemsIDz) {
            var a = d.ItemsIDz[b]["ID"];
            var e = d.ItemsIDz[b]["CalculatedPrice"];
            var c = d.ItemsIDz[b]["Weight"];
            if (a == f) {
                return e
            }
        }
    }
    return 0
}

function GetModItemWeight(d, e) {
    if (typeof d === "undefined" || d == null) {
        return 0
    }
    for (var b in d.ItemsIDz) {
        var a = d.ItemsIDz[b]["ID"];
        var c = d.ItemsIDz[b]["Weight"];
        if (a == e) {
            return c
        }
    }
    return 0
}

function GetModItemDefWeight(d, e) {
    for (var b in d.ItemsIDz) {
        var a = d.ItemsIDz[b]["ID"];
        var c = d.ItemsIDz[b]["DefWeight"];
        if (a == e) {
            return c
        }
    }
    return 0
}

function RoundPrice(c) {
    var b = 1;
    if (CurrencyDigits > 0) {
        b = Math.pow(10, CurrencyDigits)
    }
    var a = Math.round(c * b) / b;
    return a
}

function getCartItemPricePizaHAH(e, d, c, a, b, l) {
    var j = 0;
    var f = 0;
    var g = 0;
    if (d != null) {
        f = getCartItemPrice(d, null, b, 100, l)
    }
    if (c != null) {
        g = getCartItemPrice(c, null, b, 100, l)
    }
    var k = 0;
    var h = 0;
    if (PizzaPortionPricingMethod == 0) {
        if (d != null) {
            k = getCartItemPrice(d, a, b, PizzaPortionPercentAmount, l)
        }
        if (c != null) {
            h = getCartItemPrice(c, a, b, PizzaPortionPercentAmount, l)
        }
    } else {
        if (PizzaPortionPricingMethod == 2) {
            if (f > g) {
                if (d != null) {
                    k = getCartItemPrice(d, a, b, 100, l)
                }
                if (c != null) {
                    h = getCartItemPrice(c, a, b, 0, l)
                }
            } else {
                if (d != null) {
                    k = getCartItemPrice(d, a, b, 0, l)
                }
                if (c != null) {
                    h = getCartItemPrice(c, a, b, 100, l)
                }
            }
        } else {
            if (PizzaPortionPricingMethod == 3) {
                if (d != null) {
                    k = getCartItemPrice(d, a, b, 100, l)
                }
                if (c != null) {
                    h = getCartItemPrice(c, a, b, 100, l)
                }
            }
        }
    }
    return k + h
}

function getCartItemPrice(r, s, a, g, c) {
    var o = 0;
    var e = 1;
    if (typeof c === "undefined") {
        c = false
    }
    if (typeof a === "undefined") {
        a = 0
    }
    if (typeof r.ModGroupID === "undefined" || r.ModGroupID == null) {
        if (typeof OriginalItems[r.ID] !== "undefined") {
            o = OriginalItems[r.ID]["Price"]
        }
    } else {
        var d = r.Weight;
        if (d == 0) {
            d = 1
        }
        var b = GetModItemWeight(OriginalModGroups[r.ModGroupID], r.ID);
        var l = GetModItemPrice(OriginalModGroups[r.ModGroupID], r.ID);
        if (typeof g !== "undefined") {
            o = l * g / 100
        } else {
            if (b > 0) {
                o = d * l / b
            }
        }
    }
    o = RoundPrice(o);
    if (c && typeof r.itmPriceWOMod !== "undefined") {
        o = r.itmPriceWOMod
    }
    if (typeof s !== "undefined" && s != null && typeof r.ModGroupID !== "undefined") {
        var j = false;
        for (var p in s) {
            if (s[p]["ID"] == r.ID) {
                s[p]["Qty"] = s[p]["Qty"] + e;
                j = true;
                break
            }
        }
        if (!j) {
            if (typeof OriginalItems[r.ID] !== "undefined") {
                s[s.length] = {
                    ID: r.ID,
                    Name: OriginalItems[r.ID]["Name"],
                    Qty: e,
                    Price: o,
                    Level: a
                }
            } else {
                s[s.length] = {
                    ID: r.Name,
                    Name: r.Name,
                    Qty: e,
                    Price: o,
                    Level: a
                }
            }
        }
    }
    var h = [];
    for (var p in r.modGroupsItems) {
        var k = r.modGroupsItems[p]["ModGroupID"];
        if (typeof h[k] === "undefined") {
            if (typeof OriginalModGroups[k] !== "undefined") {
                h[k] = OriginalModGroups[k]["Free"]
            }
            if (typeof OriginalItems[r.ID] !== "undefined") {
                for (var m in OriginalItems[r.ID].itemModGroups) {
                    if (k == OriginalItems[r.ID].itemModGroups[m].ID) {
                        h[k] = OriginalItems[r.ID].itemModGroups[m].Free;
                        break
                    }
                }
            }
        }
    }
    var u = [];
    for (var p in r.modGroupsItems) {
        var f = r.modGroupsItems[p];
        u[u.length] = f
    }
    u.sort(function(y, x) {
        var w = y.ModGroupOrder;
        var v = x.ModGroupOrder;
        if (typeof w === "undefined" || w == null) {
            w = 9999
        }
        if (typeof v === "undefined" || v == null) {
            v = 9999
        }
        return parseInt(w) - parseInt(v)
    });
    var t = null;
    var q = null;
    for (var p in u) {
        var f = u[p];
        var k = u[p]["ModGroupID"];
        if (f.ID == Original_LeftSideItemID) {
            t = f;
            continue
        }
        if (f.ID == Original_RightSideItemID) {
            q = f;
            continue
        }
        if (h[k] <= 0) {
            f.Price = getCartItemPrice(f, s, a + 1, g, c);
            o += f.Price
        } else {
            f.Price = 0;
            h[k] = h[k] - GetModItemWeight(OriginalModGroups[k], f.ID)
        }
    }
    if (typeof s !== "undefined" && s != null && typeof r.NoModCodeItems !== "undefined") {
        for (var p in r.NoModCodeItems) {
            var f = r.NoModCodeItems[p];
            s[s.length] = {
                ID: r.ID,
                Name: "No " + f.Name,
                Qty: 0,
                Price: 0,
                Level: a + 1
            }
        }
    }
    if ((t != null || q != null)) {
        o += getCartItemPricePizaHAH(r, t, q, s, a + 1, c)
    }
    return RoundPrice(o)
}

function getItemOrgPrice(a, c) {
    var d = 0;
    var b = 1;
    if (typeof c === "undefined") {
        c = false
    }
    if (typeof OriginalItems[a.ID] !== "undefined") {
        d = OriginalItems[a.ID]["Price"]
    }
    d = RoundPrice(d);
    if (c) {
        d = a.Price
    }
    return d
}

function getSelectedModifiersWeight(b, d) {
    var a = 0;
    for (var c in b.modGroupsItems) {
        var e = b.modGroupsItems[c];
        if (e.ModGroupID == d) {
            a += e.Weight;
            break
        }
    }
    return a
}

function _isModifierSelected(a, e, c) {
    var d = false;
    for (var b in a.modGroupsItems) {
        var f = a.modGroupsItems[b];
        if (f.ModGroupID == e && f.ID == c) {
            d = true;
            break
        }
    }
    return d
}

function isIDinDefaultList(d, c) {
    var b = OriginalItems[d];
    for (var a in b.DefaultModItems) {
        if (b.DefaultModItems[a] == c) {
            return true
        }
    }
    return false
}

function isDefaultListInModGroup(f, c) {
    var e = OriginalItems[f];
    var d = e.DefaultModItems;
    var b = OriginalModGroups[c]["Items"];
    for (var a in d) {
        var h = d[a];
        for (var g in b) {
            if (b[g]["ID"] == h) {
                return true
            }
        }
    }
    return false
}

function autoSelectDefaultModifiers(b, a, q) {
    return;
    if (typeof a === "undefined" || a == null) {
        a = getMenuItemById(b.ID)
    }
    if (typeof q === "undefined") {
        q = b.ID
    }
    for (var l in a.modGroup) {
        var r = a.modGroup[l];
        var m = isDefaultListInModGroup(q, r.ID);
        for (var e in r.Items) {
            var p = r.Items[e];
            var k = GetModItemWeight(r, p.ID);
            var d = 0;
            if (m) {
                if (isIDinDefaultList(q, p.ID)) {
                    d = k
                }
            } else {
                d = GetModItemDefWeight(r, p.ID)
            }
            if (d > 0 || r.Items.length == 1) {
                var c = 1;
                if (k != 0) {
                    c = Math.max(r.Minimum, d) / k
                }
                var j = getSelectedModifiersWeight(b, r.ID);
                var o = 0;
                if (j > 0) {
                    o = j / Math.max(r.Minimum, d)
                }
                for (var h = 0; h < (c - o); h++) {
                    var f = new Object();
                    f.EntryID = -1;
                    f.ID = p.ID;
                    f.ModGroupID = r.ID;
                    f.ModGroupOrder = getModGroupOrder(b.ID, r.ID);
                    f.Name = p.Name;
                    f.Weight = GetModItemWeight(r, p.ID);
                    f.Price = GetModItemPrice(r, p.ID);
                    f.modGroupsItems = [];
                    b.modGroupsItems[b.modGroupsItems.length] = f;
                    autoSelectDefaultModifiers(f, p, q)
                }
            }
        }
    }
}

function IsItemCustomizable(d) {
    if (d.SpecialItem) {
        return {
            canAdd: true,
            canCustomize: true
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
                if (typeof d.modGroup === "undefined") {
                    return {
                        canAdd: true,
                        canCustomize: false
                    }
                }
            }
        }
    }
    var c = true;
    var a = d.CustomizationType > 0;
    if (AutoFillDefaultItems) {
        for (var b in d.modGroup) {
            if (d.modGroup[b]["Minimum"] > 0) {
                c = true;
                break
            }
        }
    }
    for (var b in d.modGroup) {
        if ((d.modGroup[b]["Maximum"] >= d.modGroup[b]["Minimum"]) && d.modGroup[b]["Items"].length > 1) {
            a = true;
            break
        }
    }
    return {
        canAdd: c,
        canCustomize: a
    }
}

function getMenuItemById(a) {
    return OriginalItems[a]
}

function getModGroupOrder(d, c) {
    var b = OriginalItems[d];
    var a = 0;
    if (typeof b === "undefined") {
        return a
    }
    for (var e in b.modGroupIDz) {
        if (c == b.modGroupIDz[e]) {
            break
        }
        a++
    }
    return a
}

function createUUID() {
    var d = [];
    var a = "0123456789abcdef";
    for (var b = 0; b < 36; b++) {
        d[b] = a.substr(Math.floor(Math.random() * 16), 1)
    }
    d[14] = "4";
    d[19] = a.substr((d[19] & 3) | 8, 1);
    d[8] = d[13] = d[18] = d[23] = "-";
    var c = d.join("");
    return c
}

function getTopmostZIndex() {
    var a = 0;
    var e = 2147483648 - 10000;
    var d = $("*");
    for (var c = 0; c < d.length; c++) {
        var b = $(d.get(c));
        var f = parseInt(b.css("zIndex"));
        if (!isNaN(f) && (f > a) && (f < e)) {
            a = f
        }
    }
    $("#dockedBasket").css("z-index", a + 2);
    return a + 1
}

function getInnerHeight() {
    var a = 0;
    if (window.innerHeight) {
        a = window.innerHeight
    } else {
        if (document.documentElement.clientHeight) {
            a = document.documentElement.clientHeight
        } else {
            a = document.body.clientHeight
        }
    }
    return a
}

function getInnerWidth() {
    var a = 0;
    if (window.innerWidth) {
        a = window.innerWidth
    } else {
        if (document.documentElement.clientWidth) {
            a = document.documentElement.clientWidth
        } else {
            a = document.body.clientWidth
        }
    }
    return a
}

function getFullHeight() {
    return Math.max(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), Math.max(document.body.offsetHeight, document.documentElement.offsetHeight), Math.max(document.body.clientHeight, document.documentElement.clientHeight))
}

function getFullWidth() {
    return Math.max(Math.max(document.body.scrollWidth, document.documentElement.scrollWidth), Math.max(document.body.offsetWidth, document.documentElement.offsetWidth), Math.max(document.body.clientWidth, document.documentElement.clientWidth))
}

function replaceHtmlWithValues(d, a) {
    var b = d;
    for (var c in TemplateVariables) {
        if (typeof(TemplateVariables[c]) != "object") {
            b = b.replace("#" + c.toString().toUpperCase() + "#", TemplateVariables[c]);
            b = b.replace("#" + c.toString() + "#", TemplateVariables[c])
        }
    }
    for (var c in a) {
        if (typeof(a[c]) != "object") {
            b = b.replace("#" + c.toString().toUpperCase() + "#", a[c]);
            b = b.replace("#" + c.toString() + "#", a[c])
        }
    }
    return b
}

function _genActionLink(c, f, b) {
    var e = "";
    if (typeof document.cr_acts === "undefined") {
        document.cr_acts = new Array()
    }
    if (typeof document._cr_act === "undefined") {
        document._cr_act = function(g) {
            document.cr_acts[g]["act"](document.cr_acts[g]["args"])
        }
    }
    var a = document.cr_acts;
    var d = a.length;
    if (c == null) {
        c = new Array()
    }
    a[d] = {
        args: c,
        act: f
    };
    if (b) {
        return "javascript:document._cr_act(" + d + ");"
    } else {
        return "document._cr_act(" + d + ");"
    }
}

function genActionLink(a, b) {
    return _genActionLink(a, b, true)
}

function strPadLeft(b, a, c) {
    while (c.toString().length < a) {
        c = b + c
    }
    return c
}

function dubStr(d, a) {
    var c = "";
    for (var b = 0; b < a; b++) {
        c += d
    }
    return c
}

function cloneObject(a) {
    return jQuery.extend(true, {}, a)
}

function serverQuery(b, c, d, a) {
    $.ajax({
        type: "POST",
        url: b,
        dataType: "json",
        timeout: timeoutInterval,
        data: {
            json_query: JSON.stringify(c)
        },
        success: function(e) {
            if (d) {
                d(true, e, this.customUserParam)
            }
        },
        error: function(e) {
            if (d) {
                d(false, null, this.customUserParam)
            }
        },
        customUserParam: a
    })
}

function showStaticPage(b, c, a) {
    var d = HTML_Pages[b];
    for (var e in TemplateVariables) {
        if (typeof(TemplateVariables[e]) != "object") {
            d = d.replace("#" + e.toString().toUpperCase() + "#", TemplateVariables[e]);
            d = d.replace("#" + e.toString() + "#", TemplateVariables[e])
        }
    }
    $(c).html(d);
    if (a !== null) {
        a()
    }
    UpdateScrolls()
}

function LogToConsole() {
    if (typeof console == "undefined" || typeof console.log == "undefined") {
        return
    }
}

function ReplaceMissingImage(a, b) {
    LogToConsole("Missing Image: " + a.src);
    if (b) {
        a.src = TemplateVariables.THEME_PATH + "/Image/noimage_big.jpg"
    } else {
        a.src = TemplateVariables.THEME_PATH + "/Image/noimage_small.jpg"
    }
}

function ValidateCheck(b, a, c) {
    serverQuery("/Handlers/ShoppingCart.ashx", {
        action: "recalc",
        cart: b,
        isDelivary: true
    }, function(f, e, d) {
        if (f) {
            var g = e.cart;
            TranslateCartNames(g);
            c(d, g, e.cartTotals)
        }
    }, a)
}

function loadScript(c, e, b) {
    if (typeof document.scripts_loaded === "undefined") {
        document.scripts_loaded = {}
    }
    if (typeof document.scripts_loaded[c] !== "undefined" && document.scripts_loaded[c] == true) {
        for (var d in e) {
            e[d]()
        }
        return
    } else {
        if (typeof document.scripts_loaded[c] !== "undefined" && document.scripts_loaded[c]["loaded"] == false) {
            document.scripts_loaded[c]["callback"][document.scripts_loaded[c]["callback"].length] = e;
            return
        } else {
            if (typeof document.scripts_loaded[c] === "undefined") {
                var a = document.createElement("script");
                a.type = "text/javascript";
                document.scripts_loaded[c] = {
                    loaded: false,
                    callback: e,
                    errorCallback: b
                };
                if (a.readyState) {
                    a.onreadystatechange = function() {
                        var h = this.src;
                        if (this.attributes && this.attributes.getNamedItem) {
                            h = this.attributes.getNamedItem("src").value
                        }
                        if (this.readyState == "loaded" || this.readyState == "complete") {
                            this.onreadystatechange = null;
                            var f = document.scripts_loaded[h]["callback"];
                            document.scripts_loaded[h] = true;
                            for (var g in f) {
                                f[g]()
                            }
                        }
                    }
                } else {
                    a.onload = function() {
                        var h = this.src;
                        if (this.attributes && this.attributes.getNamedItem) {
                            h = this.attributes.getNamedItem("src").value
                        }
                        var f = document.scripts_loaded[h]["callback"];
                        document.scripts_loaded[h] = true;
                        for (var g in f) {
                            f[g]()
                        }
                    }
                }
                a.onerror = function(g) {
                    var h = this.src;
                    if (this.attributes && this.attributes.getNamedItem) {
                        h = this.attributes.getNamedItem("src").value
                    }
                    var f = document.scripts_loaded[h]["errorCallback"];
                    if (typeof f != "undefined" && f != null) {
                        f()
                    }
                };
                a.src = c;
                document.getElementsByTagName("head")[0].appendChild(a)
            }
        }
    }
}

function soundex(h) {
    h = (h + "").toUpperCase();
    if (!h) {
        return ""
    }
    var e = [0, 0, 0, 0],
        a = {
            B: 1,
            F: 1,
            P: 1,
            V: 1,
            C: 2,
            G: 2,
            J: 2,
            K: 2,
            Q: 2,
            S: 2,
            X: 2,
            Z: 2,
            D: 3,
            T: 3,
            L: 4,
            M: 5,
            N: 5,
            R: 6
        },
        d = 0,
        b, f = 0,
        k, g;
    while ((k = h.charAt(d++)) && f < 4) {
        if (b = a[k]) {
            if (b !== g) {
                e[f++] = g = b
            }
        } else {
            f += d === 1;
            g = 0
        }
    }
    e[0] = h.charAt(0);
    return e.join("")
}

function namesSimilar(b, a) {
    b = b.toLowerCase().trim();
    a = a.toLowerCase().trim().replace("`", "");
    if (b == "" || a == "") {
        return false
    }
    if ((b == a) || (soundex(b) == soundex(a))) {
        return true
    } else {
        return false
    }
}

function fillCartAndProcessToCheckout(a) {
    fillCart(a);
    if (cart.cartData.length > 0 && cart.cartSubTotalPrice > minimumOrderTotal) {
        showCheckout()
    }
}

function fillCart(c) {
    cart.clearCart();
    var b = true;
    for (var d in c) {
        var a = c[d];
        if (typeof OriginalItems[a.ID] !== "undefined") {
            cart.addItemToCart(a)
        } else {
            b = false
        }
    }
    var e = "";
    if (!b) {
        confirm("One or more items are no longer available, do you want to continue ?", null, function(f, g) {
            if (f) {
                cart.updateCart()
            } else {
                cart.clearCart()
            }
        })
    } else {
        cart.updateCart()
    }
}

function reorderCheck(a) {
    ValidateCheck(a, a, function(k, b, c) {
        var j = [];
        for (var e in k) {
            var l = k[e];
            var o = false;
            for (var f in b) {
                var h = b[f];
                if (l.ID == h.ID) {
                    o = true;
                    break
                }
            }
            if (!o) {
                if (typeof OriginalItems[l.ID] !== "undefined") {
                    j.push(OriginalItems[l.ID])
                }
            }
        }
        var g = [];
        jQuery.extend(g, j, b);
        ValidateModGroupsMaximum(g);
        if (g.length != k.length || j.length > 0) {
            var d = "";
            if (g.length != k.length) {
                d = "One or more items are no longer available, do you want to continue ?"
            }
            if (j.length > 0) {
                d = "Suggested menu has been replaced due to unavailability in some items, do you want to continue ?"
            }
            confirm(d, null, function(m, p) {
                if (m) {
                    fillCart(g)
                }
            })
        } else {
            fillCart(g)
        }
    })
}

function ValidateModGroupsMaximum(d) {
    for (var j in d) {
        var h = d[j];
        var k = {};
        for (var g in h.modGroupsItems) {
            var e = h.modGroupsItems[g]["ModGroupID"];
            k[e] = typeof k[e] === "undefined" ? 1 : ++k[e]
        }
        var o = OriginalItems[h.ID];
        if (typeof o === "undefined" || o == null) {
            return
        }
        var c = o.itemModGroups.length > 0 ? o.itemModGroups : o.modGroup;
        for (var b in k) {
            for (var m in c) {
                if (typeof c[m] !== "undefined" && c[m] != null && c[m].ID == b) {
                    var a = c[m].Maximum;
                    if (a > 0 && a < k[b]) {
                        for (var l in h.modGroupsItems) {
                            if (h.modGroupsItems[l]["ModGroupID"] == b) {
                                h.modGroupsItems.splice(l, k[b] - a);
                                break
                            }
                        }
                    }
                    break
                }
            }
        }
    }
}

function getInnerHeight() {
    var a = 0;
    if (window.innerHeight) {
        a = window.innerHeight
    } else {
        if (document.documentElement.clientHeight) {
            a = document.documentElement.clientHeight
        } else {
            a = document.body.clientHeight
        }
    }
    return a
}

function getInnerWidth() {
    var a = 0;
    if (window.innerWidth) {
        a = window.innerWidth
    } else {
        if (document.documentElement.clientWidth) {
            a = document.documentElement.clientWidth
        } else {
            a = document.body.clientWidth
        }
    }
    return a
}

function getFullHeight() {
    return Math.max(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), Math.max(document.body.offsetHeight, document.documentElement.offsetHeight), Math.max(document.body.clientHeight, document.documentElement.clientHeight))
}

function getFullWidth() {
    return Math.max(Math.max(document.body.scrollWidth, document.documentElement.scrollWidth), Math.max(document.body.offsetWidth, document.documentElement.offsetWidth), Math.max(document.body.clientWidth, document.documentElement.clientWidth))
}

function showShadow() {
    if (typeof document.shadowStack === "undefined") {
        document.shadowStack = 0
    }
    document.shadowStack++;
    if (document.shadowStack == 1) {
        var a = getTopmostZIndex() + 1;
        if (typeof document.shadowCtrl === "undefined") {
            document.shadowCtrl = $("<div style='position:fixed;top:0px;left:0px;right:0px;bottom:0px;opacity: 0.5; background-color: black;' />")
        }
        document.shadowCtrl.css("zIndex", a);
        $(document.body).append(document.shadowCtrl);
        document.shadowCtrl.show()
    }
}

function hideShadow() {
    if (typeof document.shadowStack === "undefined") {
        document.shadowStack = 0
    }
    document.shadowStack = document.shadowStack - 1;
    if (typeof document.shadowCtrl !== "undefined" && document.shadowStack <= 0) {
        document.shadowCtrl.hide()
    }
    if (document.shadowStack <= 0) {
        document.shadowStack = 0
    }
}

function showLoadingProgress() {
    var a = document.progressCtrl;
    if (typeof a === "undefined") {
        a = $(HTML_Pages.AjaxWaitPopup);
        document.progressCtrl = a;
        $("#wait_progress").click(function() {
            hideLoadingProgress(true);
            return false
        })
    }
    showShadow(true);
    var b = getTopmostZIndex() + 3;
    a.css("zIndex", b);
    $(document.body).append(a);
    a.show();
    $("#wait_progress").hide()
}

function hideLoadingProgress(a) {
    if (typeof a === "undefined") {
        a = false
    }
    if (typeof document.progressCtrl !== "undefined") {
        document.progressCtrl.hide()
    }
    hideShadow(true);
    if (a) {
        closefloat()
    }
}
$.ajaxSetup({
    beforeSend: function(a) {
        if (this.url.indexOf("ShowWait=0") < 0) {
            showLoadingProgress();
            window.setTimeout(function() {
                $("#wait_progress").show()
            }, timeoutInterval)
        }
    },
    complete: function(b, a) {
        if (this.url.indexOf("ShowWait=0") < 0) {
            hideLoadingProgress()
        }
    },
    error: function(c, a, b) {
        if (this.url.indexOf("ShowWait=0") < 0) {
            hideLoadingProgress()
        }
    },
    success: function(a, b, c) {}
});

function set_textarea_maxlength() {
    $("textarea[maxlength]").live("keyup blur", function() {
        var a = $(this).attr("maxlength");
        var b = $(this).val();
        if (b.length > a) {
            $(this).val(b.slice(0, a))
        }
    })
}

function refreshConfigurations(a) {
    serverQuery("/Handlers/ItemsInfo.ashx?ShowWait=0", {
        action: "refreshconfigurations"
    }, function(d, c, b) {
        if (d && c.status == true) {
            if (typeof a !== "undefined" && a != null) {
                a()
            }
        }
    }, null)
}

function itemHasQuickCustomize(b) {
    var d = OriginalItems[b];
    for (var c in d.modGroup) {
        var a = d.modGroup[c];
        if (typeof a !== "undefined" && typeof a.QuickCustomize !== "undefined" && a.QuickCustomize) {
            return true;
            break
        }
    }
    return false
}

function showCountDown(b, f) {
    var a;
    var e;
    if (f > 60) {
        a = "hh:mm:ss";
        var d = Math.floor(f / 60);
        var c = (f % 60);
        e = d + ":" + c + ":00";
        $("#" + b).css("width", "250px")
    } else {
        a = "mm:ss";
        e = f + ":00";
        $("#" + b).css("width", "155px")
    }
    $("#" + b).countdown({
        image: "/Images/SharedImages/digits.png",
        startTime: e,
        format: a,
        digitWidth: 34,
        digitHeight: 50
    })
}

function distanceBetweenTwoPoints(d, c, b, a) {
    return Math.sqrt(Math.pow(Math.abs(d - b), 2) + Math.pow(Math.abs(c - a), 2))
}

function sendEmailForNewsletterSubscription(c, b, d) {
    var a = {};
    a.Name = c;
    a.Email = b;
    serverQuery("/Handlers/SubscribeForm.ashx", a, d, null)
}

function isTouchDevice() {
    var a = {
        Android: function() {
            return navigator.userAgent.match(/Android/i) ? true : false
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i) ? true : false
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) ? true : false
        },
        any: function() {
            return (a.Android() || a.BlackBerry() || a.iOS() || a.Windows())
        }
    };
    return ((Modernizr.touch || window.TouchEvent || window.Touch) && a.any())
}

function convertToAmPmTime(d) {
    var e = "am";
    var a = d.slice(0, d.indexOf(":"));
    if (a >= 24) {
        a = a % 24
    }
    if (a >= 12) {
        var e = "pm"
    }
    var c = ("0" + d.substr(d.indexOf(":"))).slice(-2);
    var b = ("0" + a).slice(-2) + ":" + c + " " + e;
    return b
}

function ValidateIfAreaIsServed(b, e, c, a, d) {
    if (!b) {
        if (typeof d !== "undefined" && d != null) {
            d()
        }
    } else {
        if (b && VerifyIfAreaIsServed) {
            serverQuery("/Handlers/StoreInfo.ashx", {
                Action: "ValidateAreaStore",
                Latitude: e,
                Longitude: c
            }, function(h, g, f) {
                if (h && g.valid == true) {
                    if (g.AreaServed == false) {
                        if (a) {
                            alert(Translate("Sorry, this area is not served."))
                        } else {
                            $(".areanotservedmsg").show()
                        }
                        return false
                    }
                    $(".areanotservedmsg").hide();
                    if (typeof d !== "undefined" && d != null) {
                        d(g)
                    }
                }
            }, this)
        } else {
            if (typeof d !== "undefined" && d != null) {
                d()
            }
        }
    }
}
"use strict";
var cart = null;
var bk = null;
var topMenu = null;
var userLogin = null;
var HomeSubmenu = null;
var pageinit = true;
var pageopened = false;
var SubmenuItems = {};
var MenuList = [];
var useJUICombo = true;
var useBoxIt = false;
var storeAddressLocator = null;
var FullDataRequestedEvent = $.Event("FullDataRequested");
var CurrentMenuTemplateID = DefMenuTemplateID;

function BuildSpecialMenu() {
    SpecialSubmenu.Items = [];
    if (typeof AdditionalPizzaItems === "undefiend" || AdditionalPizzaItems == null || AdditionalPizzaItems.length == 0) {
        return
    }
    for (var a in AdditionalPizzaItems) {
        var b = AdditionalPizzaItems[a];
        var e = OriginalItems[b.ModItemID];
        var c = OriginalModGroups[b.ModGroupID];
        if (typeof e === "undefined" || e == null) {
            continue
        }
        if (typeof c === "undefined" || c == null) {
            continue
        }
        var d = {
            SpecialItem: true,
            ID: e.ID,
            modGroup: [],
            modGroupIDz: [],
            Name: e.Name,
            Title: e.Name,
            Price: 0,
            Weight: 0,
            PizzaItem: true,
            IsSubmenu: false,
            Description: e.Description,
            ImageName: e.ImageName,
            Filter: e.Filter,
            Crust: b.CrustID,
            Size: b.SizeID,
            PizzaMenuItemMod: e,
            PizzaMenuItemModGroup: c,
            ItemTitleStyle: e.ItemTitleStyle,
            ItemTitleValign: e.ItemTitleValign,
            DescriptionTop: e.DescriptionTop,
            PromoTop: e.PromoTop,
            PromoLeft: e.PromoLeft,
            PromoBottom: e.PromoBottom,
            PromoRight: e.PromoRight,
            Rank: b.Rank
        };
        SpecialSubmenu.Items[SpecialSubmenu.Items.length] = d;
        SubmenuItems[e.ID] = d
    }
    SpecialSubmenu.Items.sort(function(g, f) {
        return g.Rank - f.Rank
    });
    OriginalSubMenu["0"] = SpecialSubmenu
}

function BuildMenuList(u) {
    if (typeof u === "undefined" || u == null) {
        u = false
    }
    for (var Z in OriginalModGroups) {
        var G = OriginalModGroups[Z];
        if (typeof G.MergeWithModGroupID !== "undefined" && G.MergeWithModGroupID > 0 && (typeof OriginalModGroups[G.MergeWithModGroupID] !== "undefined")) {
            var r = G.MergeWithModGroupID;
            var X = OriginalModGroups[r]["ItemsIDz"].length;
            for (var Y in G.ItemsIDz) {
                OriginalModGroups[r]["ItemsIDz"][X] = G.ItemsIDz[Y];
                X++
            }
            delete OriginalModGroups[Z]
        }
    }
    for (var Z in OriginalModGroups) {
        var G = OriginalModGroups[Z];
        var V = 0;
        for (var R in G.ItemsIDz) {
            var Q = G.ItemsIDz[R]["ID"];
            var k = G.ItemsIDz[R]["CalculatedPrice"];
            var W = OriginalItems[Q];
            G.Items[V] = W;
            V++
        }
    }
    for (var Z in OriginalItems) {
        var A = OriginalItems[Z];
        A.FixedPrice = A.Price;
        A.MenuPrice = A.Price;
        A.SpecialItem = false;
        A.modGroup = [];
        for (var R in A.modGroupIDz) {
            var o = A.modGroupIDz[R];
            var y = OriginalModGroups[o];
            if (typeof y === "undefined") {
                continue
            }
            if (EnableModGrpsBasedOnItmModGrpRelation) {
                if (A.itemModGroups == 0) {
                    continue
                }
                for (var ab in A.itemModGroups) {
                    var P = A.itemModGroups[ab];
                    if (P.ID == o) {
                        y.Sequence = P.Sequence;
                        y.Style = P.Style;
                        A.modGroup.push(y)
                    }
                }
            } else {
                A.modGroup.push(y)
            }
        }
    }
    for (var Z in OriginalDealSteps) {
        var e = OriginalDealSteps[Z];
        e.Items = {};
        for (var R in e.ItemIDs) {
            var Q = e.ItemIDs[R];
            var W = OriginalItems[Q];
            if (typeof W !== "undefined") {
                e.Items[Q] = W
            }
        }
    }
    for (var Z in OriginalDeals) {
        var H = OriginalDeals[Z];
        H.Steps = {};
        var V = 0;
        for (var R in H.StepIDs) {
            var D = H.StepIDs[R];
            var F = D.ID;
            var B = D.Max;
            var ae = D.Min;
            var K = OriginalDealSteps[F];
            if (typeof K !== "undefined") {
                var s = cloneObject(K);
                s.Min = ae;
                s.Max = B;
                H.Steps[V] = s;
                V++
            }
        }
    }
    BuildSpecialMenu();
    var ad = true;
    for (var Z in OriginalSubMenu) {
        var O = OriginalSubMenu[Z];
        if (O.useFixedHeight) {
            ad = false
        }
        var V = 0;
        for (var R in O.ItemsIDz) {
            var Q = O.ItemsIDz[R]["ID"];
            var k = O.ItemsIDz[R]["CalculatedPrice"];
            var W = OriginalItems[Q];
            if (typeof W !== "undefined") {
                W.MenuPrice = k;
                W.SubMenu_ID = OriginalSubMenu[Z].ID;
                W.SubMenu_Name = OriginalSubMenu[Z].Name;
                O.Items[V] = W;
                if (W.ItemTitleStyle == "") {
                    W.ItemTitleStyle = O.ItemTitleStyle
                }
                SubmenuItems[Q] = W
            } else {
                continue;
                O.Items[V] = null
            }
            V++
        }
    }
    for (var Z in OriginalMenus) {
        var U = OriginalMenus[Z];
        U.SubMenus = {};
        for (var V in U.SubMenuIDs) {
            var f = U.SubMenuIDs[V];
            var L = OriginalSubMenu[f];
            if (typeof L !== "undefined") {
                U.SubMenus[f] = L
            }
        }
    }
    if (!u) {
        for (var Z in OriginalStoreGroupCats) {
            var p = OriginalStoreGroupCats[Z];
            p.StoresGroup = {};
            for (var R in p.StoreGroupIDs) {
                var d = p.StoreGroupIDs[R];
                var ac = OriginalStoreGroups[d];
                if (typeof ac !== "undefined") {
                    p.StoresGroup[d] = ac
                }
            }
        }
        for (var Z in OriginalStoreGroups) {
            var ac = OriginalStoreGroups[Z];
            ac.Stores = {};
            for (var R in ac.StoresIDs) {
                var l = ac.StoresIDs[R];
                var T = OriginalStores[l];
                if (typeof T !== "undefined") {
                    ac.Stores[l] = T
                }
            }
        }
        for (var Z in OriginalStores) {
            var c = OriginalStores[Z];
            var aa = new Date();
            var C = c.workHourStart;
            var w = c.workHourEnd;
            var S = parseInt(C.substring(0, C.indexOf(":")).trim());
            var E = parseInt(C.substring(C.indexOf(":") + 1).trim());
            var af = parseInt(w.substring(0, w.indexOf(":")).trim());
            var I = parseInt(w.substring(w.indexOf(":") + 1).trim());
            if (af <= S) {
                af += 24
            }
            var v = new Date(aa.getFullYear(), aa.getMonth(), aa.getDate());
            var b = new Date(aa.getFullYear(), aa.getMonth(), aa.getDate());
            b.setDate(b.getDate() + 1);
            var h = new Date(aa.getFullYear(), aa.getMonth(), aa.getDate());
            h.setDate(h.getDate() - 1);
            var q = new Date(aa.getFullYear(), aa.getMonth(), aa.getDate());
            q.setHours(v.getHours() + S);
            q.setMinutes(v.getMinutes() + E);
            var N = new Date(aa.getFullYear(), aa.getMonth(), aa.getDate());
            N.setHours(v.getHours() + af);
            N.setMinutes(v.getMinutes() + I);
            var J = new Date(b.getFullYear(), b.getMonth(), b.getDate());
            J.setHours(J.getHours() + S);
            J.setMinutes(J.getMinutes() + E);
            var t = new Date(b.getFullYear(), b.getMonth(), b.getDate());
            t.setHours(b.getHours() + af);
            t.setMinutes(b.getMinutes() + I);
            var M = new Date(h.getFullYear(), h.getMonth(), h.getDate());
            M.setHours(h.getHours() + S);
            M.setMinutes(h.getMinutes() + E);
            var z = new Date(h.getFullYear(), h.getMonth(), h.getDate());
            z.setHours(h.getHours() + af);
            z.setMinutes(h.getMinutes() + I);
            var a = false;
            if (aa >= J && aa <= t) {
                a = true
            } else {
                if (aa >= q && aa <= N) {
                    a = true
                } else {
                    if (aa >= M && aa <= z) {
                        a = true
                    }
                }
            }
            c.IsInWorkHours = a
        }
    }
    BuildActiveMenu()
}

function BuildActiveMenu() {
    var c = null;
    for (var a in OriginalMenus) {
        var d = OriginalMenus[a];
        if (d.Name.indexOf("~") > -1 || c == null) {
            c = d
        }
    }
    MenuList = [];
    HomeSubmenu = null;
    c.SubMenus = {};
    for (var f in c.SubMenuIDs) {
        var e = c.SubMenuIDs[f];
        var b = OriginalSubMenu[e];
        if (typeof b !== "undefined") {
            c.SubMenus[e] = b;
            if (b.Name.indexOf("~") > -1) {
                HomeSubmenu = b
            } else {
                if (b.Name.indexOf("~") == -1) {
                    MenuList.push(b)
                }
            }
        }
    }
    MenuList.sort(function(h, g) {
        return h.Order - g.Order
    })
}

function ChangeMenuTemplate(a, c) {
    if (EnableMultipleMenuTemplates) {
        if (CurrentMenuTemplateID != a) {
            CurrentMenuTemplateID = a;
            cart.cartHeader.MenuTemplateID = a;
            cart.saveToLocal();
            var b = function() {
                OriginalMenus = Rep_OriginalMenus[CurrentMenuTemplateID];
                OriginalSubMenu = Rep_OriginalSubMenu[CurrentMenuTemplateID];
                Original_LeftSideItemID = Rep_Original_LeftSideItemID[CurrentMenuTemplateID];
                Original_RightSideItemID = Rep_Original_RightSideItemID[CurrentMenuTemplateID];
                Pizza_MenuItemsFilter = Rep_Pizza_MenuItemsFilter[CurrentMenuTemplateID];
                Pizza_MenuItemsData = Rep_Pizza_MenuItemsData[CurrentMenuTemplateID];
                SpecialSubmenu = Rep_SpecialSubmenu[CurrentMenuTemplateID];
                SpecialSubmenuCrust = Rep_SpecialSubmenuCrust[CurrentMenuTemplateID];
                SpecialSubmenuSize = Rep_SpecialSubmenuSize[CurrentMenuTemplateID];
                PizzaPortionPricingMethod = Rep_PizzaPortionPricingMethod[CurrentMenuTemplateID];
                PizzaPortionPercentAmount = Rep_PizzaPortionPercentAmount[CurrentMenuTemplateID];
                AdditionalPizzaItems = Rep_AdditionalPizzaItems[CurrentMenuTemplateID];
                OriginalItems = Rep_OriginalItems[CurrentMenuTemplateID];
                OriginalModGroups = Rep_OriginalModGroups[CurrentMenuTemplateID];
                OriginalVirtualGroups = Rep_OriginalVirtualGroups[CurrentMenuTemplateID];
                OriginalVirtualSelectors = Rep_OriginalVirtualSelectors[CurrentMenuTemplateID];
                OriginalDeals = Rep_OriginalDeals[CurrentMenuTemplateID];
                OriginalDealSteps = Rep_OriginalDealSteps[CurrentMenuTemplateID];
                OriginalSuggesiveSelling = Rep_OriginalSuggesiveSelling[CurrentMenuTemplateID];
                BuildMenuList();
                BuildActiveMenu();
                topMenu.data = MenuList;
                topMenu.Init();
                if (bottomSubMenu) {
                    bottomSubMenu.data = MenuList;
                    bottomSubMenu.Init();
                    $("#navigation").html($("#catNavPrimary").html())
                }
                var d = [];
                for (var f in cart.cartData) {
                    var e = cart.cartData[f];
                    if (typeof OriginalItems[e.ID] === "undefined") {
                        d.push(OriginalItems[e.ID])
                    }
                }
                if (d.length > 0) {
                    alert("The selected address or store belong to a different region. Kindly note that some items and prices could be different", 170)
                }
                cart.cartData.splice(0, cart.cartData.length);
                cart.updateCart();
                if (c) {
                    c()
                }
            };
            if (Rep_OriginalItems[CurrentMenuTemplateID] && Rep_OriginalModGroups[CurrentMenuTemplateID] && Rep_OriginalSubMenu[CurrentMenuTemplateID]) {
                b()
            } else {
                loadFullItems(b)
            }
        } else {
            if (c) {
                c()
            }
        }
    } else {
        cart.cartHeader.MenuTemplateID = CurrentMenuTemplateID;
        if (c) {
            c()
        }
    }
}

function ReloadMenu() {
    var a = DefMenuTemplateID;
    var f = 0;
    if (cart.cartHeader.DelivaryOrTakeout == "Delivary") {
        f = 1;
        if (cart.cartHeader.AddressID != 0 && userLogin.customerData != null) {
            for (var e in userLogin.customerData.Addresses) {
                var b = userLogin.customerData.Addresses[e];
                if (b.ID == cart.cartHeader.AddressID) {
                    a = b.StoreMenuTemplateID
                }
            }
        } else {
            if (typeof cart.cartHeader.NewAddress !== "undefined" && cart.cartHeader.NewAddress != null) {
                var d = cart.cartHeader.NewAddress["StoreMenuTemplateID"];
                if (typeof d !== "undefined" && d != null && d != 0) {
                    a = d
                }
            }
        }
    } else {
        if (cart.cartHeader.DelivaryOrTakeout == "Takeaway") {
            f = 2;
            var c = OriginalStores[cart.cartHeader.StoreID];
            if (typeof c !== "undefined") {
                a = c.StoreMenuTemplateID
            }
        } else {
            f = 0
        }
    }
    ChangeMenuTemplate(a, function() {
        showHome()
    })
}
BuildMenuList();

function isJoinAllModGrp(b) {
    var a = false;
    return a
}

function showItemCustomize(c, a, b, d) {
    loadFullItems(function() {
        if ((c.CustomizationType == 1) || (typeof OriginalVirtualGroups[c.VirtualGroupID] !== "undefined" && OriginalVirtualGroups[c.VirtualGroupID].CustomizationType == 1)) {
            showPizzaBuilder(c, a, b, d);
            return
        } else {
            if (c.CustomizationType == 2 || c.IsDeal) {
                showDealBuilder(c, a);
                return
            } else {
                if ((c.modGroup.length == 1 || isJoinAllModGrp(c.modGroup)) && c.modGroup[0].Maximum != 1 && c.modGroup[0].Style != "required" && c.modGroup[0].Ingredient) {
                    showSignleModGrp(c, a, b, d);
                    return
                } else {
                    if (c.modGroup.length == 0 && (typeof a !== "undefined" && (typeof OriginalVirtualGroups[c.VirtualGroupID] !== "undefined" || itemHasQuickCustomize(c.ID)) && a.DealID == 0)) {
                        showVirtualGroupCustomization(c, a);
                        return
                    } else {
                        if (typeof a !== "undefined" && a != null && a.DealID > 0) {
                            var j = dealNumber_extract(a.DealID);
                            for (var e in OriginalItems) {
                                if (OriginalItems[e]["IsDeal"] && OriginalItems[e]["DealID"] == j.dealID) {
                                    showDealBuilder(OriginalItems[e], a)
                                }
                            }
                            return
                        }
                    }
                }
            }
        }
        changeAddressTo("customize/" + c.ID);
        if (typeof b === "undefined") {
            b = false
        }
        b = false;
        var h = false;
        for (var g in Pizza_MenuItemsData) {
            for (var k in Pizza_MenuItemsData[g]) {
                if (Pizza_MenuItemsData[g][k] == c.ID) {
                    h = true
                }
            }
        }
        if (c.SpecialItem) {
            h = true
        }
        var f = null;
        if (!h) {
            f = new CustomizeItem()
        } else {
            f = new CustomizePizza()
        }
        if (b) {
            f.__popupObj = new PopupForm();
            f.__popupObj.width = 746;
            f.__popupObj.height = 570;
            f.__popupObj.container.css("overflow-y", "scroll")
        } else {
            f.__popupObj = null
        }
        f.data = MenuList;
        f.pages = HTML_Pages;
        f.menuItem = OriginalItems[c.ID];
        f.Qty = d;
        f.cartItemUpdate = false;
        if (typeof a !== "undefined" && a != null) {
            f.cartItem = OriginalItems[a.ID];
            f.cartItemUpdate = true
        }
        if (!b) {
            f.pagesContainer = $("#container_inner").get(0)
        } else {
            f.pagesContainer = f.__popupObj.container.get(0)
        }
        f.beforeShowPage = function() {
            if (this.__popupObj == null) {
                closefloat()
            }
        };
        f.afterShowPage = function() {
            if (this.__popupObj == null) {
                if (this.menuItem != null) {
                    showFloat(Translate("Customizing") + " " + this.menuItem.Name, 3, false)
                } else {
                    showFloat("FREE STYLE PIZZA", 3, false)
                }
            }
        };
        f.onOK = function(l) {
            cart.addItemToCart(l, true);
            if (this.__popupObj == null) {
                closefloat();
                changeAddressTo("");
                showHome()
            } else {
                this.__popupObj.Close()
            }
        };
        f.onCancel = function() {
            if (this.__popupObj == null) {
                closefloat();
                changeAddressTo("")
            } else {
                this.__popupObj.Close()
            }
        };
        f.onShowItemInfo = function(l) {
            showItemInformation(l, true)
        };
        if (f.__popupObj != null) {
            f.__popupObj.Show()
        }
        f.Init()
    })
}

function showPizzaBuilder(c, a, b, d) {
    loadFullItems(function() {
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
        e.beforeShowPage = function() {
            if (this.__popupObj == null) {
                closefloat()
            }
        };
        e.afterShowPage = function() {
            if (this.__popupObj == null) {
                showFloat("Pizza Builder", 3, false)
            }
        };
        e.onOK = function(g) {
            if (this.isDeal) {
                g.Qty = 1;
                cart.clearItem(this.cartItemCrc, 1)
            } else {
                if (this.cartItemCrc != null) {
                    cart.clearItem(this.cartItemCrc)
                }
            }
            cart.addItemToCart(g);
            if (this.__popupObj == null) {
                changeAddressTo("");
                closefloat();
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
        e.onCancel = function() {
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

function showSignleModGrp(d, a, c, e) {
    if (typeof c === "undefined" || c == null) {
        c = true
    }
    var b = new SingleCustomization();
    b.selectedQty = e;
    if (c) {
        b.__popupObj = new PopupForm();
        b.__popupObj.width = 700;
        b.__popupObj.height = 350;
        b.__popupObj.container.css("background", "none");
        b.__popupObj.container.css("border", "none")
    } else {
        b.__popupObj = null;
        changeAddressTo("customize/" + (typeof d !== "undefined" ? d.ID : ""))
    }
    if (!c) {
        b.pagesContainer = $("#container_inner").get(0)
    } else {
        b.pagesContainer = b.__popupObj.container.get(0)
    }
    b.cartItemCrc = null;
    if (typeof a !== "undefined" && a != null) {
        b.cartItemCrc = getCartItemCRC(a)
    }
    b.beforeShowPage = function() {
        if (this.__popupObj == null) {
            closefloat()
        }
    };
    b.afterShowPage = function() {
        if (this.__popupObj == null) {
            showFloat("Customize", 3, false)
        }
    };
    b.onOK = function(f) {
        if (this.cartItemCrc != null) {
            cart.clearItem(this.cartItemCrc)
        }
        cart.addItemToCart(f);
        if (this.__popupObj == null) {
            closefloat();
            changeAddressTo("")
        } else {
            this.__popupObj.Close()
        }
    };
    b.onCancel = function() {
        if (this.__popupObj == null) {
            closefloat();
            changeAddressTo("")
        } else {
            this.__popupObj.Close()
        }
    };
    if (b.__popupObj != null) {
        b.__popupObj.Show()
    }
    b.Init(d, a)
}

function showDealBuilder(b, a) {
    loadFullItems(function() {
        changeAddressTo("dealbuilder/" + (typeof b !== "undefined" ? b.ID : ""));
        var c = new DealBuilder();
        c.pagesContainer = $("#container_inner").get(0);
        c.dealItem = b;
        c.beforeShowPage = function() {
            closefloat()
        };
        c.afterShowPage = function() {
            showFloat("Deal Builder", 3, false)
        };
        c.onOK = function(e) {
            closefloat();
            for (var f in e) {
                cart.addItemToCart(e[f])
            }
            changeAddressTo("");
            var d = GoogleTrack_getItemEnName(this.dealItem.ID);
            googleTag.push({
                event: "Submit",
                Category: "Deal Builder",
                ElementType: "Item",
                ID: this.dealItem.ID,
                Name: d
            })
        };
        c.onCancel = function() {
            closefloat();
            changeAddressTo("")
        };
        c.afterShowPageStep = function() {
            adjustMenuItemsPositions();
            activateAppropriateEvent()
        };
        c.Init(b, a)
    })
}

function showCustomerRegistration(b, c) {
    changeAddressTo("register");
    var a = new CustomerRegistration();
    a.pages = HTML_Pages;
    a.pagesContainer = $("#container_inner").get(0);
    a.beforeShowPage = function() {
        closefloat()
    };
    a.afterShowPage = function(d) {
        if (typeof d === "undefined") {
            d = 2
        }
        showFloat("Register", d)
    };
    a.OnClose = function() {
        closefloat();
        changeAddressTo("")
    };
    if (!b && !c) {
        a.Show()
    } else {
        if (b) {
            storeAddressLocator.Close();
            a.ShowRegisterUsingFacebook()
        } else {
            if (c) {
                storeAddressLocator.Close();
                a.ShowRegisterUsingGoogle()
            }
        }
    }
}

function showItemInformation(b, a) {
    if (typeof a === "undefined") {
        a = false
    }
    if (!a) {
        changeAddressTo("item/" + b.ID + "/")
    }
    var c = new ItemInformation();
    c.pages = HTML_Pages;
    c.item = b;
    c.isdialog = a;
    c.pagesContainer = $("#container_inner").get(0);
    c.beforeShowPage = function() {
        closefloat()
    };
    c.afterShowPage = function(d) {
        if (typeof d === "undefined") {
            d = 2
        }
        showFloat(this.item.Name, d)
    };
    c.onOK = function() {
        closefloat();
        changeAddressTo("")
    };
    c.customizeItem = function(e, d) {
        showItemCustomize(e, d)
    };
    c.addItemToCart = function(d) {
        if (d.SpecialItem) {
            cart.addItemToCart(specialPizzaCreateDefaultCartItem(d))
        } else {
            cart.addItemToCart(d)
        }
    };
    c.Init()
}

function showCheckout(b) {
    if (typeof b === "undefined") {
        if (cart.cartData.length == 0) {
            alert("Your cart is empty, please add some items to your shopping cart first");
            return
        }
    }
    var a = cart.cartHeader.DelivaryOrTakeout == "Delivary";
    var c = $("input:radio[name=checkout_delivarytime]:checked").val() == "advance";
    cart.recalcCart(cart, function(g) {
        if (typeof b === "undefined" || b == "") {
            if (cart.cartSubTotalPrice < minimumOrderTotal && cart.cartHeader.DelivaryOrTakeout != "Takeaway") {
                var f = Translate("The minimum amount for an order is");
                var d = Translate("Please add more items and click Checkout.");
                alert(f + " " + minimumOrderTotal + " " + CurrencySymbol + ". " + d);
                return
            }
        }
        if (typeof b === "undefined" || b == "") {
            if (!storeAddressLocator.isOrderModeSelected()) {
                if (isResponsive && $(window).width() < 800) {
                    window.scrollTo(0, 0)
                }
                storeAddressLocator.Show(true);
                return
            }
        }
        if (!userLogin.isLoggedIn() && !AllowGuestCheckout) {
            alert("Please login in first");
            return
        }
        changeAddressTo("checkout");
        var e = new Checkout();
        e.pages = HTML_Pages;
        e.cartData = cart.cartData;
        e.cartHeader = cart.cartHeader;
        e.customerData = userLogin.customerData;
        e.pagesContainer = $("#container_inner").get(0);
        e.beforeShowPage = function() {
            closefloat()
        };
        e.afterShowPage = function(h) {
            showFloat("CHECKOUT", h, false, true)
        };
        e.OnClose = function() {
            closefloat(true);
            changeAddressTo("")
        };
        e.OnTrackOrder = function(h, j) {
            closefloat();
            showOrderTracking(h, j)
        };
        e.Show(b)
    })
}

function showPasswordRecovery() {
    changeAddressTo("forgotpassword");
    var a = new PasswordRecovery();
    a.pages = HTML_Pages;
    a.pagesContainer = $("#container_inner").get(0);
    a.beforeShowPage = function() {
        closefloat()
    };
    a.afterShowPage = function() {
        showFloat("PASSWORD RECOVERY", 2)
    };
    a.Show()
}

function showFavoriteMenu() {
    loadFullItems(function() {
        if (!ValidateLogin()) {
            return
        }
        changeAddressTo("favoritesorders");
        var a = new FavoriteMenu();
        a.pages = HTML_Pages;
        a.pagesContainer = $("#container_inner").get(0);
        a.beforeShowPage = function() {
            closefloat()
        };
        a.afterShowPage = function() {
            showFloat("FAVORITE MENU", 1)
        };
        a.onClose = function() {
            closefloat(true);
            changeAddressTo("")
        };
        a.Show()
    })
}

function showFavoriteItems() {
    loadFullItems(function() {
        if (!ValidateLogin()) {
            return
        }
        changeAddressTo("favoriteitems");
        var a = new FavoriteItems();
        a.pages = HTML_Pages;
        a.pagesContainer = $("#container_inner").get(0);
        a.beforeShowPage = function() {
            closefloat()
        };
        a.afterShowPage = function() {
            showFloat("FAVORITE ITEMS", 1)
        };
        a.onClose = function() {
            closefloat(true);
            changeAddressTo("")
        };
        a.Show()
    })
}

function showOrderTracking(a, b) {
    loadFullItems(function() {
        if (typeof(b) === "undefined") {
            if (!ValidateLogin()) {
                return
            }
            changeAddressTo("trackorder")
        } else {
            changeAddressTo("trackorder/" + b + "/" + a)
        }
        var c = new OrderTracking();
        c.pages = HTML_Pages;
        c.orderid = a;
        c.customerid = b;
        c.pagesContainer = $("#container_inner").get(0);
        c.beforeShowPage = function() {
            closefloat()
        };
        c.afterShowPage = function() {
            showFloat("ORDER TRACKING", 9)
        };
        c.onClose = function() {
            closefloat(true);
            changeAddressTo("")
        };
        c.Show()
    })
}

function showHistoryOrders() {
    loadFullItems(function() {
        if (!ValidateLogin()) {
            return
        }
        changeAddressTo("lastorders");
        var a = new HistoryOrders();
        a.pages = HTML_Pages;
        a.pagesContainer = $("#container_inner").get(0);
        a.beforeShowPage = function() {
            closefloat()
        };
        a.afterShowPage = function() {
            showFloat("HISTORY ORDERS", 1)
        };
        a.onClose = function() {
            closefloat(true);
            changeAddressTo("")
        };
        a.Show()
    })
}

function showEditProfile(a) {
    loadFullItems(function() {
        if (!ValidateLogin()) {
            return
        }
        changeAddressTo("editprofile");
        var b = new EditProfile();
        b.pages = HTML_Pages;
        b.pagesContainer = $("#container_inner").get(0);
        b.beforeShowPage = function() {
            closefloat()
        };
        b.afterShowPage = function() {
            showFloat("EDIT PROFILE", 2)
        };
        b.afterClose = a;
        b.Show()
    })
}

function showChangeEMailRequest(a) {
    var b = new ChangeEMailRequest();
    b.token = a;
    b.pages = HTML_Pages;
    b.pagesContainer = $("#container_inner").get(0);
    b.beforeShowPage = function() {
        closefloat(true)
    };
    b.afterShowPage = function() {
        showFloat("CHANGE EMAIL", 2)
    };
    b.Show()
}

function showContactUs(b) {
    changeAddressTo("contact");
    var a = new ContactUs();
    a.pages = HTML_Pages;
    a.pagesContainer = $("#container_inner").get(0);
    a.orderID = b;
    a.onClose = function() {
        closefloat();
        changeAddressTo("")
    };
    a.beforeShowPage = function() {
        closefloat()
    };
    a.afterShowPage = function(c) {
        showFloat("CONTACT US", c)
    };
    a.Show()
}

function showCareers() {
    changeAddressTo("career");
    var a = new Careers();
    a.pages = HTML_Pages;
    a.pagesContainer = $("#container_inner").get(0);
    a.onClose = function() {
        closefloat();
        changeAddressTo("")
    };
    a.beforeShowPage = function() {
        closefloat()
    };
    a.afterShowPage = function(b) {
        showFloat("Careers", b)
    };
    a.Show()
}

function showPrivacy() {
    changeAddressTo("privacy");
    showStaticPage("Privacy", $("#container_inner").get(0), function() {
        showFloat("Privacy Policy", 2)
    });
    googleTag.push({
        event: "PageView",
        PageName: "Privacy",
        PageURL: "/privacy"
    });
    googleTag.push({
        event: "Open",
        Category: "Privacy",
        ElementType: "",
        ID: "",
        Name: ""
    })
}

function showNutrition() {
    changeAddressTo("nutrition");
    showStaticPage("Nutrition", $("#container_inner").get(0), function() {
        showFloat("Nutrition Information", 2)
    });
    googleTag.push({
        event: "PageView",
        PageName: "Nutrition Information",
        PageURL: "/nutrition"
    });
    googleTag.push({
        event: "Open",
        Category: "Nutrition Information",
        ElementType: "",
        ID: "",
        Name: ""
    })
}

function showFaq() {
    changeAddressTo("faq");
    showStaticPage("Faq", $("#container_inner").get(0), function() {
        showFloat("FAQs", 2)
    });
    googleTag.push({
        event: "PageView",
        PageName: "FAQs",
        PageURL: "/faq"
    });
    googleTag.push({
        event: "Open",
        Category: "FAQs",
        ElementType: "",
        ID: "",
        Name: ""
    })
}

function showAbout() {
    changeAddressTo("about");
    showStaticPage("About", $("#container_inner").get(0), function() {
        showFloat("ABOUT US", 2)
    });
    googleTag.push({
        event: "PageView",
        PageName: "About us",
        PageURL: "/" + UserLanguage + "/about"
    });
    googleTag.push({
        event: "Open",
        Category: "About us",
        ElementType: "",
        ID: "",
        Name: ""
    })
}

function showTerms() {
    changeAddressTo("terms");
    showStaticPage("Terms", $("#container_inner").get(0), function() {
        showFloat("TERMS AND CONDITIONS", 2)
    });
    googleTag.push({
        event: "PageView",
        PageName: "Terms and conditions",
        PageURL: "/terms"
    });
    googleTag.push({
        event: "Open",
        Category: "Terms and conditions",
        ElementType: "",
        ID: "",
        Name: ""
    })
}

function showSitemap() {
    changeAddressTo("sitemap");
    var a = new Sitemap();
    a.pages = HTML_Pages;
    a.data = MenuList;
    a.pagesContainer = $("#container_inner").get(0);
    a.menuClick = function(b) {
        ItemsViewerOpenMenu(b)
    };
    a.beforeShowPage = function() {
        closefloat()
    };
    a.afterShowPage = function() {
        showFloat("SITEMAP", 10)
    };
    a.Show()
}

function showQuestionnaire() {
    changeAddressTo("questionnaire");
    var a = new Questionnaire();
    a.pages = HTML_Pages;
    a.pagesContainer = $("#container_inner").get(0);
    a.onClose = function() {
        closefloat();
        changeAddressTo("")
    };
    a.beforeShowPage = function() {
        closefloat()
    };
    a.afterShowPage = function() {
        showFloat("QUESTIONNAIRE", 11)
    };
    a.Show()
}

function loadFullItems(a) {
    if (DeferedLoadingEnabled == "true") {
        showLoadingProgress();
        loadScript("/Handlers/ItemsInfo.ashx?DeferedOtherData=true&Language=" + UserLanguage + "&MenuTemplateID=" + CurrentMenuTemplateID + "&ts=" + RepositoryFileModifiedDate, [function() {
            if (FullDataRequested) {
                FullDataRequested = false;
                BuildMenuList(true);
                $(window).trigger(FullDataRequestedEvent)
            }
            hideLoadingProgress(false)
        }, a])
    } else {
        a()
    }
}

function loadOtherScripts(a) {
    if (mergeScripts) {
        loadScript("/Handlers/Scripts.ashx?other=1", [a])
    } else {
        a()
    }
}

function linkButtons(a) {
    $("#privacy").unbind("click");
    $("#privacy").click(function() {
        showPrivacy();
        return false
    });
    $("#nutrition").unbind("click");
    $("#nutrition").click(function() {
        showNutrition();
        return false
    });
    $("#faq").unbind("click");
    $("#faq").click(function() {
        showFaq();
        return false
    });
    $("#about").unbind("click");
    $("#about").click(function() {
        showAbout();
        return false
    });
    $("#terms").unbind("click");
    $("#terms").click(function() {
        showTerms();
        return false
    });
    $("#sitemap").unbind("click");
    $("#sitemap").click(function() {
        loadOtherScripts(function() {
            showSitemap()
        });
        return false
    });
    $("#login_register").unbind("click");
    $("#login_register").click(function() {
        loadOtherScripts(function() {
            showCustomerRegistration()
        });
        return false
    });
    $("#btnCheckout").unbind("click");
    $("#btnCheckout").click(function() {
        loadOtherScripts(function() {
            showCheckout()
        });
        return false
    });
    $("#forgetpassword").unbind("click");
    $("#forgetpassword").click(function() {
        loadOtherScripts(function() {
            showPasswordRecovery()
        });
        return false
    });
    $("#order_track").unbind("click");
    $("#order_track").click(function() {
        loadOtherScripts(function() {
            showOrderTracking()
        });
        return false
    });
    $("#history_orders").unbind("click");
    $("#history_orders").click(function() {
        loadOtherScripts(function() {
            showHistoryOrders()
        });
        return false
    });
    $("#edit_profile").unbind("click");
    $("#edit_profile").click(function() {
        loadOtherScripts(function() {
            showEditProfile()
        });
        return false
    });
    $("#footer_edit_profile").unbind("click");
    $("#footer_edit_profile").click(function() {
        loadOtherScripts(function() {
            showEditProfile()
        });
        return false
    });
    $("#top_footer_edit_profile").unbind("click");
    $("#top_footer_edit_profile").click(function() {
        loadOtherScripts(function() {
            showEditProfile()
        });
        return false
    });
    $("#contact").unbind("click");
    $("#contact").click(function() {
        loadOtherScripts(function() {
            showContactUs()
        });
        return false
    });
    $("#career").unbind("click");
    $("#career").click(function() {
        loadOtherScripts(function() {
            showCareers()
        });
        return false
    });
    $("#fav_menu").unbind("click");
    $("#fav_menu").click(function() {
        loadOtherScripts(function() {
            showFavoriteMenu()
        });
        return false
    });
    $("#fav_items").unbind("click");
    $("#fav_items").click(function() {
        loadOtherScripts(function() {
            showFavoriteItems()
        });
        return false
    });
    $("#btnAddToFavorite").unbind("click");
    $("#btnAddToFavorite").click(function() {
        loadOtherScripts(function() {
            saveOrderToFavorite()
        });
        return false
    });
    $("#storelocator").unbind("click");
    $("#storelocator").click(function() {
        loadOtherScripts(function() {
            ShowStoreLocator()
        });
        return false
    });
    $("#questionnaire").unbind("click");
    $("#questionnaire").click(function() {
        loadOtherScripts(function() {
            showQuestionnaire()
        });
        return false
    })
}

function FillItemsSequence(c) {
    for (var b in c.ItemsIDz) {
        var a = c.ItemsIDz[b];
        var d = c.Items[b];
        if (a.Order == 0) {
            d.Sequence = d.Rank
        } else {
            d.Sequence = a.Order
        }
    }
}

function ItemsViewerOpenMenu(a, b) {
    loadFullItems(function() {
        FillItemsSequence(a);
        bk.dataItems = a.Items;
        bk.dataTitle = a.Name;
        bk.subMenuID = a.ID;
        bk.dataDesc = a.Desc;
        bk.ColumnsPerPage = a.ColumnsPerPage;
        bk.columnsToScroll = a.ColumnsToScroll;
        bk.useFixedColumnWidth = a.useFixedWidth;
        bk.fixedColumnWidth = a.fixedWidth;
        bk.useFixedColumnHeight = a.useFixedHeight;
        bk.fixedColumnHeight = a.fixedHeight;
        bk.ImagesFolder = a.ImagesFolder;
        bk.backgroundURL = a.backgroundURL;
        bk.imgExtentions = a.imgExtentions;
        bk.filters = a.Filter;
        bk.cropBottom = a.cropBottom;
        if (typeof b === "undefined") {
            b = true
        }
        var c = null;
        if (a.Style != "") {
            c = (bk.stylesList.filter(function(d) {
                return d.Title == a.Style
            }))[0]
        } else {
            c = bk.stylesList[0]
        }
        if (b) {
            if (!bk.initiated) {
                bk.Init()
            }
            if (typeof c !== "undefined") {
                bk.Update(c)
            } else {
                bk.Update()
            }
            closefloat();
            if (typeof showBkMenu !== "undefined") {
                showBkMenu()
            }
            changeAddressTo("menu/" + a.ID + "/");
            topMenu.setActiveSubMenu(a.ID);
            googleTag.push({
                event: "PageView",
                PageName: "Sub Menu",
                PageURL: "/" + UserLanguage + "/" + a.NameEN.toLowerCase().replace(" ", "-")
            });
            googleTag.push({
                event: "Open",
                Category: "Sub Menu",
                ElementType: "Sub Menu",
                ID: a.ID,
                Name: a.NameEN
            })
        }
    })
}
$(document).ready(function() {
    getServerTime(true);
    CurrencySymbol = Translate(CurrencySymbol);
    topMenu = new TopMenu();
    topMenu.data = MenuList;
    topMenu.pages = HTML_Pages;
    topMenu.menuContainer = $("#main-nav").get(0);
    topMenu.menuClick = function(b) {
        ItemsViewerOpenMenu(b)
    };
    topMenu.beforeShowPage = function() {
        closefloat()
    };
    topMenu.afterShowPage = function() {
        showFloat("MENU LIST", 0)
    };
    topMenu.Init();
    cart = new ShoppingCart();
    cart.pages = HTML_Pages;
    cart.cartData = new Array();
    var a = function() {
        if (typeof SavedCart != "undefined" && SavedCart != null) {
            TranslateCartNames(SavedCart);
            for (var b in SavedCart) {
                if (typeof OriginalItems[SavedCart[b]["ID"]] !== "undefined") {
                    cart.cartData.push(SavedCart[b])
                }
            }
        }
        if (typeof SavedCartTotals != "undefined" && SavedCartTotals != null) {
            cart.cartTotals = SavedCartTotals
        }
        if (typeof SavedCartID != "undefined" && SavedCartID != null) {
            cart.postOrderID = SavedCartID
        }
    };
    if (typeof SavedCartHeader != "undefined" && SavedCartHeader != null) {
        cart.cartHeader = SavedCartHeader;
        if (SavedCartHeader.MenuTemplateID) {
            ChangeMenuTemplate(SavedCartHeader.MenuTemplateID, function() {
                a()
            })
        }
    } else {
        a()
    }
    cart.cartContainer = $("#basketitems_box").get(0);
    cart.clearCartBtn = $("#btnBasketClear").get(0);
    cart.checkoutBtn = $("#btnCheckout").get(0);
    cart.pagesContainer = $("#container_inner").get(0);
    cart.totalArea = $("#basketTotal").get(0);
    cart.itemscountArea = $("#basketCount").get(0);
    cart.mobileItemscountArea = $("#mobileBasketCount").get(0);
    cart.servicechargeArea = $("#cart_servicecharge").get(0);
    cart.subTotalArea = $("#subTotalPrice").get(0);
    cart.mobileTotalArea = $("#mobileBasketTotal").get(0);
    cart.showCustomize = function(b, d) {
        var c = getMenuItemById(b.ID);
        loadOtherScripts(function() {
            showItemCustomize(c, b, true, d)
        })
    };
    cart.showItemInfo = function(b) {
        showItemInformation(b, true)
    };
    cart.beforeShowPage = function() {
        closefloat()
    };
    cart.afterShowPage = function() {
        showFloat("", 2)
    };
    cart.Init();
    bk = new ItemsViewer();
    bk.container = $("#content").get(0);
    bk.customizeItem = function(c, b, d) {
        loadOtherScripts(function() {
            showItemCustomize(c, b, null, d)
        })
    };
    bk.addItemToCart = function(c) {
        if (c.SpecialItem == true) {
            var b = specialPizzaCreateDefaultCartItem(c);
            autoSelectDefaultModifiers(b);
            cart.addItemToCart(b)
        } else {
            cart.addItemToCart(c)
        }
    };
    bk.openSubmenu = function(c) {
        var b = OriginalSubMenu[c.ID * -1];
        ItemsViewerOpenMenu(b, true)
    };
    bk.showItemInfo = function(b) {
        showItemInformation(b, true)
    };
    document.bk = bk;
    userLogin = new UserLogin();
    userLogin.data = MenuList;
    userLogin.pages = HTML_Pages;
    userLogin.pagesContainer = $("#container_inner").get(0);
    userLogin.userMenuHolder = $("#welcome_box").get(0);
    userLogin.userFooterMenuHolder = $("#footerUserMenu").get(0);
    userLogin.userTopFooterMenuHolder = $("#topFooterUserMenu").get(0);
    userLogin.userMobileMenuHolder = $("#mobileLogin").get(0);
    if (typeof CustomerData !== "undefined") {
        userLogin.customerData = CustomerData
    } else {
        userLogin.customerData = null
    }
    userLogin.beforeShowPage = function() {
        closefloat()
    };
    userLogin.afterShowPage = function() {
        showFloat("", 2)
    };
    userLogin.afterLogin = function() {
        linkButtons(true)
    };
    userLogin.afterLogout = function() {
        linkButtons(false)
    };
    userLogin.OnShowRegisterCustomer = function(b, c) {
        showCustomerRegistration(b, c)
    };
    userLogin.OnShowRecoverPassword = function() {
        storeAddressLocator.Close();
        showPasswordRecovery()
    };
    userLogin.onSignout = function() {
        closefloat();
        $("#loggedInPopup").hide();
        changeAddressTo("")
    };
    userLogin.drawUserMenu();
    storeAddressLocator = new StoreAddressLocator();
    storeAddressLocator.pagesContainer = $("#StoreLocatorContainer").get(0);
    storeAddressLocator.beforeShowPage = function() {
        closefloat()
    };
    storeAddressLocator.afterShowPage = function() {};
    storeAddressLocator.onClose = function() {};
    storeAddressLocator.Init();
    closefloat();
    window.setTimeout(function() {
        UpdateScrolls()
    }, 200);
    ExecuteAutoFunctions();
    loadOtherScripts(function() {});
    refreshConfigurations()
});

function showResetPassword(a) {
    var b = {
        Action: "RequestResetPassword",
        CustomerID: a[1],
        RecoveryCode: a[2]
    };
    serverQuery("/Handlers/PasswordRecovery.ashx", b, function(d, f, c) {
        if (d) {
            var e = new PasswordRecovery();
            e.pages = HTML_Pages;
            e.pagesContainer = $("#container_inner").get(0);
            e.beforeShowPage = function() {
                closefloat()
            };
            e.afterShowPage = function(g) {
                showFloat("PASSWORD RECOVERY", g)
            };
            e.Show("showResetPassword", f.valid)
        } else {
            alert("Request failed")
        }
    }, null)
}

function showActivateCustomer(a) {
    var b = {
        Action: "RegisterNewCustomer_Activate",
        CustomerID: a[1],
        ActivationCode: a[2],
        OldSessionID: a[3]
    };
    serverQuery("/Handlers/CustomerRegistration.ashx", b, function(d, e, c) {
        if (d) {
            if (e.valid) {
                userLogin.customerData = e.customer;
                userLogin.drawUserMenu();
                if (typeof showHome !== "undefined") {
                    showHome()
                }
                showNotificationBallon("CustomerRegistration_ActivationSuccessBallon");
                googleTag.push({
                    event: "Activated",
                    Category: "Register New",
                    ElementType: "",
                    ID: "",
                    Name: ""
                });
                if (e.cartData) {
                    cart.cartData = e.cartData;
                    cart.updateCart();
                    if (cart.cartData.length > 0) {
                        showCheckout()
                    }
                }
            } else {
                alert("Activation failed")
            }
        } else {
            alert("Request failed")
        }
    }, null)
}

function showActivateCustomerExisting(a) {
    var b = {
        Action: "RegisterExistingCustomer_GetCustomerInfo",
        CustomerID: a[1],
        ActivationCode: a[2]
    };
    serverQuery("/Handlers/CustomerRegistration.ashx", b, function(d, f, c) {
        if (d && f.valid) {
            var e = new CustomerRegistration();
            e.pages = HTML_Pages;
            e.pagesContainer = $("#container_inner").get(0);
            e.beforeShowPage = function() {
                closefloat()
            };
            e.afterShowPage = function() {
                showFloat("", 1)
            };
            e.OnClose = function() {
                closefloat();
                changeAddressTo("")
            };
            e.ShowRegisterExisting(f.customerData)
        } else {
            alert("Request failed")
        }
    }, null)
}

function ShowMissingPage() {
    showStaticPage("Page404", $("#container_inner").get(0), function() {
        showFloat("Page not available", 2)
    })
}

function showActivationRequired(a) {
    var b = new CustomerRegistration();
    b.pages = HTML_Pages;
    b.pagesContainer = $("#container_inner").get(0);
    b.beforeShowPage = function() {
        closefloat()
    };
    b.afterShowPage = function() {
        showFloat("", 1)
    };
    b.OnClose = function() {
        closefloat();
        changeAddressTo("")
    };
    b.ShowActivationRequired(a)
}

function ExecuteAutoFunctions() {
    if (typeof FunctionToCall === "undefined") {
        return
    }
    if (FunctionToCall) {
        serverQuery("/Handlers/GeneralHandler.ashx", {
            Action: "removeFunctionToCall"
        }, null, null);
        if (typeof FunctionToCallArgs === "undefined") {
            window[FunctionToCall]()
        } else {
            window[FunctionToCall](FunctionToCallArgs)
        }
        FunctionToCall = null
    }
}

function ValidateLogin() {
    if (userLogin == null || !userLogin.isLoggedIn()) {
        alert("You are not logged in yet");
        return false
    } else {
        return true
    }
}

function showLoginWindow() {
    if (userLogin.isLoggedIn()) {
        showHome();
        return
    }
    var a = new LoginWindow();
    a.pages = HTML_Pages;
    a.pagesContainer = $("#container_inner").get(0);
    a.beforeShowPage = function() {
        closefloat()
    };
    a.afterShowPage = function() {
        showFloat("LOGIN")
    };
    a.Show()
}

function ShowStoreLocator() {
    changeAddressTo("storelocator");
    var a = new StoreLocator();
    a.pagesContainer = $("#container_inner").get(0);
    a.beforeShowPage = function() {
        closefloat()
    };
    a.afterShowPage = function() {
        showFloat()
    };
    a.Init()
}

function ShowStoreInfo(a) {
    changeAddressTo("store/" + a);
    var b = new StoreInfo();
    b.pages = HTML_Pages;
    b.pagesContainer = $("#container_inner").get(0);
    b.beforeShowPage = function() {
        closefloat()
    };
    b.afterShowPage = function() {
        showFloat()
    };
    b.onClose = function() {
        closefloat();
        changeAddressTo("")
    };
    b.Show(a)
}
if (typeof closefloat === "undefined") {
    var closefloat = function() {}
}
if (typeof showFloat === "undefined") {
    var showFloat = function() {}
}
if (typeof setFloatingWindowStyle === "undefined") {
    var setFloatingWindowStyle = function() {}
}
$.address.externalChange(function(a) {
    var c = a.pathNames;
    if (a.path == "/" && window.location.pathname != "/") {
        var m = window.location.pathname.split("/");
        c = [];
        for (var b in m) {
            if (m[b] != null && m[b] != "" && m[b] != "en" && m[b] != "un") {
                c[c.length] = m[b]
            }
        }
    }
    var l = false;
    var h = a.path;
    $("#lang_url_un").attr("href", "/?lang=un&sub=" + encodeURIComponent(h));
    $("#lang_url_en").attr("href", "/?lang=en&sub=" + encodeURIComponent(h));
    if (pageopened) {
        pageinit = false;
        return
    }
    hideShadow();
    var g = "home";
    if (c.length > 0) {
        g = c[0]
    }
    g = decodeURIComponent(g);
    for (var e in OriginalSubMenu) {
        var f = OriginalSubMenu[e];
        if (g == f.Name.toLowerCase().replace(" ", "-")) {
            ItemsViewerOpenMenu(f);
            return
        }
    }
    if (g == "home") {
        closefloat();
        l = true;
        googleTag.push({
            event: "PageView",
            PageName: "Home",
            PageURL: "/" + UserLanguage + "/home"
        })
    } else {
        if (g == "register") {
            loadOtherScripts(function() {
                showCustomerRegistration()
            })
        } else {
            if (g == "forgotpassword") {
                loadOtherScripts(function() {
                    showPasswordRecovery()
                })
            } else {
                if (g == "resetpassword") {
                    loadOtherScripts(function() {
                        showResetPassword(c)
                    })
                } else {
                    if (g == "activate") {
                        loadOtherScripts(function() {
                            showActivateCustomer(c)
                        })
                    } else {
                        if (g == "activate-existing") {
                            loadOtherScripts(function() {
                                showActivateCustomerExisting(c)
                            })
                        } else {
                            if (g == "login") {
                                loadOtherScripts(function() {
                                    showLoginWindow()
                                })
                            } else {
                                if (g == "editprofile") {
                                    loadOtherScripts(function() {
                                        showEditProfile()
                                    })
                                } else {
                                    if (g == "trackorder") {
                                        loadOtherScripts(function() {
                                            var o, p;
                                            if (c.length > 2) {
                                                o = c[1];
                                                p = c[2]
                                            }
                                            showOrderTracking(p, o)
                                        })
                                    } else {
                                        if (g == "favoritesorders") {
                                            loadOtherScripts(function() {
                                                showFavoriteMenu()
                                            })
                                        } else {
                                            if (g == "favoriteitems") {
                                                loadOtherScripts(function() {
                                                    showFavoriteItems()
                                                })
                                            } else {
                                                if (g == "lastorders") {
                                                    loadOtherScripts(function() {
                                                        showHistoryOrders()
                                                    })
                                                } else {
                                                    if (g == "about") {
                                                        showAbout()
                                                    } else {
                                                        if (g == "faq") {
                                                            showFaq()
                                                        } else {
                                                            if (g == "nutrition") {
                                                                showNutrition()
                                                            } else {
                                                                if (g == "privacy") {
                                                                    showPrivacy()
                                                                } else {
                                                                    if (g == "contact") {
                                                                        loadOtherScripts(function() {
                                                                            showContactUs()
                                                                        })
                                                                    } else {
                                                                        if (g == "career") {
                                                                            showCareers()
                                                                        } else {
                                                                            if (g == "terms") {
                                                                                showTerms()
                                                                            } else {
                                                                                if (g == "sitemap") {
                                                                                    showSitemap()
                                                                                } else {
                                                                                    if (g == "basket") {
                                                                                        showMyCart()
                                                                                    } else {
                                                                                        if (g == "questionnaire") {
                                                                                            showQuestionnaire()
                                                                                        } else {
                                                                                            if (g == "checkout") {
                                                                                                var k = "";
                                                                                                if (c.length > 1) {
                                                                                                    k = c[1]
                                                                                                }
                                                                                                loadOtherScripts(function() {
                                                                                                    if (cart.cartData.length > 0 || k != "") {
                                                                                                        showCheckout(k)
                                                                                                    } else {
                                                                                                        changeAddressTo("/");
                                                                                                        closefloat()
                                                                                                    }
                                                                                                })
                                                                                            } else {
                                                                                                if (g == "menu") {
                                                                                                    var j = c[1];
                                                                                                    for (var e in OriginalSubMenu) {
                                                                                                        var f = OriginalSubMenu[e];
                                                                                                        if (f.ID == j) {
                                                                                                            ItemsViewerOpenMenu(f);
                                                                                                            l = true;
                                                                                                            pageinit = false;
                                                                                                            return
                                                                                                        }
                                                                                                    }
                                                                                                    ShowMissingPage()
                                                                                                } else {
                                                                                                    if (g == "item") {
                                                                                                        var j = c[1];
                                                                                                        loadOtherScripts(function() {
                                                                                                            showItemInformation(OriginalItems[j], false)
                                                                                                        })
                                                                                                    } else {
                                                                                                        if (g == "changeemail") {
                                                                                                            loadOtherScripts(function() {
                                                                                                                showChangeEMailRequest(c[1])
                                                                                                            })
                                                                                                        } else {
                                                                                                            if (g == "customize") {
                                                                                                                var j = c[1];
                                                                                                                loadFullItems(function() {
                                                                                                                    for (var q in OriginalSubMenu) {
                                                                                                                        var p = OriginalSubMenu[q];
                                                                                                                        for (var o in p.Items) {
                                                                                                                            var r = p.Items[o];
                                                                                                                            if (r.ID == j) {
                                                                                                                                loadOtherScripts(function() {
                                                                                                                                    showItemCustomize(r)
                                                                                                                                });
                                                                                                                                pageinit = false;
                                                                                                                                return
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                    ShowMissingPage()
                                                                                                                })
                                                                                                            } else {
                                                                                                                if (g == "pizzabuilder") {
                                                                                                                    loadOtherScripts(function() {
                                                                                                                        loadFullItems(function() {
                                                                                                                            var o = c[1];
                                                                                                                            showPizzaBuilder(OriginalItems[o])
                                                                                                                        })
                                                                                                                    })
                                                                                                                } else {
                                                                                                                    if (g == "dealbuilder") {
                                                                                                                        loadOtherScripts(function() {
                                                                                                                            loadFullItems(function() {
                                                                                                                                var o = c[1];
                                                                                                                                showDealBuilder(OriginalItems[o])
                                                                                                                            })
                                                                                                                        })
                                                                                                                    } else {
                                                                                                                        if (g == "store") {
                                                                                                                            var d = c[1];
                                                                                                                            ShowStoreInfo(d)
                                                                                                                        } else {
                                                                                                                            if (g == "storelocator") {
                                                                                                                                ShowStoreLocator()
                                                                                                                            } else {
                                                                                                                                ShowMissingPage()
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    pageinit = false
});

function changeAddressTo(a) {
    if (!pageinit) {
        if (!pageopened) {
            $.address.value(a)
        } else {
            pageopened = false
        }
    }
    $("#lang_url_un").attr("href", "/?lang=un&sub=" + encodeURIComponent("/" + a));
    $("#lang_url_en").attr("href", "/?lang=en&sub=" + encodeURIComponent("/" + a))
}
"use strict";
var activeFilterName = "all";
var useAllFilter = true;

function HtmlStyle(e, d, h, c, f, b, a, g, j) {
    this.dataItems = null;
    this.dataTitle = "";
    this.dataDesc = "";
    this.subMenuID = 0;
    this.getScrollColumnsCount = 1;
    this.useFixedColumnWidth = false;
    this.fixedColumnWidth = 0;
    this.useFixedColumnHeight = false;
    this.fixedColumnHeight = 0;
    this.widthRatio = 0;
    this.columnsPerPage = function() {
        return 1
    };
    this.columnsToScroll = 1;
    this.fixAnchors = false;
    this.isPromo = false;
    this.rightSpace = 0;
    this.leftSpace = 0;
    this.topSpace = 0;
    this.bottomSpace = 0;
    if (typeof g !== "undefined") {
        this.fixAnchors = g
    }
    if (typeof j !== "undefined") {
        this.isPromo = j
    }
    this.itemsPerPage = 0;
    this.recalcOnResize = true;
    this.PageHtmlTemplate = e;
    this.ItemHtmlTemplate = h;
    this.SelectorItemTemplate = c;
    this.PageFilterItemHtmlTemplate = d;
    this.filtersAvailable = {};
    this.filters = "";
    this.onItemFiltering = null;
    this.stylesAvailable = null;
    this.styleName = "";
    this.onStyleClick = null;
    this.onInitParams = null;
    this.onCustomItemVariables = null;
    if (typeof a !== "undefined") {
        this.styleName = a
    }
    this.leftOffset = 10;
    this.topOffset = 10;
    if (typeof f !== "undefined") {
        this.leftOffset = f
    }
    if (typeof b !== "undefined") {
        this.topOffset = b
    }
    this.itemClick = function(l) {
        if (l.itm["IsSubmenu"]) {
            if (typeof l.ctrlr !== "undefined") {
                if (typeof l.ctrlr["openSubmenu"] !== "undefined") {
                    l.ctrlr.openSubmenu(l.itm)
                }
            }
        } else {
            if (l.btn == "addToCart") {
                if (typeof l.ctrlr !== "undefined") {
                    if (typeof l.ctrlr["addItemToCart"] !== "undefined") {
                        l.ctrlr.doAddToCart(l.itm)
                    }
                }
            } else {
                if (l.btn == "customize") {
                    if (typeof l.ctrlr !== "undefined") {
                        if (typeof l.ctrlr["customizeItem"] !== "undefined") {
                            l.ctrlr.doCustomizeItem(l.itm)
                        }
                    }
                } else {
                    if (l.btn == "info") {
                        if (typeof l.ctrlr !== "undefined") {
                            if (typeof l.ctrlr["showItemInfo"] !== "undefined") {
                                l.ctrlr.showItemInfo(l.itm)
                            }
                        }
                    } else {
                        if (l.btn == "favitem") {
                            if (typeof l.ctrlr !== "undefined") {
                                if (typeof l.ctrlr["favItemToggle"] !== "undefined") {
                                    l.ctrlr.favItemToggle(l.itm)
                                }
                            }
                        } else {
                            if (l.btn == "qtyUp" || l.btn == "qtyDown") {
                                var m = $("#BKID_" + l.itm["ID"] + "_" + l.ctrlr.subMenuID);
                                var q = m.data("qty");
                                if (typeof q === "undefined" || q == null) {
                                    q = 1
                                }
                                if (l.btn == "qtyUp") {
                                    q++
                                } else {
                                    if (l.btn == "qtyDown") {
                                        q--
                                    }
                                }
                                if (q < 1) {
                                    q = 1
                                }
                                m.data("qty", q);
                                var p = l.itm;
                                var o = p.Price;
                                if (typeof p.MenuPrice !== "undefined") {
                                    o = p.MenuPrice
                                }
                                $("#QTY_" + l.itm["ID"] + "_" + l.ctrlr.subMenuID).html(q);
                                $("#QTY2_" + l.itm["ID"] + "_" + l.ctrlr.subMenuID).html(q);
                                $("#QTY3_" + l.itm["ID"] + "_" + l.ctrlr.subMenuID).html(q);
                                var k = RoundPrice(q * o) + "<span class='currencySymbol'>" + CurrencySymbol + "</span>";
                                $("#PRICE_" + l.itm["ID"] + "_" + l.ctrlr.subMenuID).html(k);
                                $("#PRICE_2_" + l.itm["ID"] + "_" + l.ctrlr.subMenuID).html(k);
                                l.ctrlr.updateVisualGroupPrice(m)
                            }
                        }
                    }
                }
            }
        }
    };
    this.getColumnsCount = function(k, l) {
        return 1
    };
    this.getNumberOfItemsInsideVGroup = function(m) {
        var l = 0;
        for (var k = 0; k < this.dataItems.length; k++) {
            var o = this.dataItems[k];
            if (o.VirtualGroupID == m) {
                l++
            }
        }
        return l
    };
    this.DrawColumn = function(Z, N) {
        var ag = HTML_Pages[this.PageHtmlTemplate];
        var k = HTML_Pages[this.PageFilterItemHtmlTemplate];
        var w = HTML_Pages[this.ItemHtmlTemplate];
        this.filterContainerID = createUUID();
        this.stylesContainerID = createUUID();
        this.itemsContainerID = createUUID();
        var S = ag;
        var ah = "";
        if (g) {
            ah = " style='position:absolute;left:" + this.leftSpace + "px;top:" + this.topSpace + "px;bottom:" + this.bottomSpace + "px;right:" + this.rightSpace + "px;' "
        }
        ah += " class='homeMenuItmContainer'";
        if (this.onInitParams != null) {
            S = this.onInitParams(S)
        }
        S = S.replace("#ITEMS#", "<div " + ah + " id='" + this.itemsContainerID + "'></div>");
        S = S.replace("#ITEMS_CONTAINER#", this.itemsContainerID);
        S = S.replace(/#TITLE#/gi, this.dataTitle.replace(/[@]/g, ""));
        var L = typeof this.subMenuID === "undefined" ? "" : "subHead" + strPadLeft("0", 6, this.subMenuID.toString());
        S = S.replace(/#IMG#/gi, "Menu" + CurrentMenuTemplateID + "/" + L + ".jpg");
        S = S.replace(/#IMG_LNG#/gi, "Menu" + CurrentMenuTemplateID + "/" + L + "-" + UserLanguage + ".jpg");
        S = S.replace(/#DESCRIPTION#/gi, this.dataDesc);
        S = S.replace(/#FILTERS#/gi, this.filterContainerID);
        S = S.replace(/#STYLES#/gi, this.stylesContainerID);
        S = S.replace(/#SUBMENUID#/gi, this.subMenuID);
        N.append($(S));
        this.itemsContiner = $("#" + this.itemsContainerID);
        this.itemsContiner.addClass("submnu" + this.subMenuID);
        this.filtersAvailable = {};
        if (useAllFilter) {
            this.filtersAvailable.all = {
                id: "FLTR_" + this.subMenuID + "_all",
                key: "all",
                title: Translate("All"),
                items: []
            }
        }
        this.OrderedStyle = this.filters;
        if (typeof this.OrderedStyle === "undefined" || this.OrderedStyle == null) {
            this.OrderedStyle = ""
        }
        var ap = this.OrderedStyle.toLowerCase().split(",");
        for (var aq in ap) {
            if (ap[aq].toString().trim() == "") {
                continue
            }
            var l = $.md5(ap[aq].toString().trim());
            if (typeof this.filtersAvailable[l] === "undefined") {
                this.filtersAvailable[l] = {};
                this.filtersAvailable[l]["id"] = "FLTR_" + this.subMenuID + "_" + l;
                this.filtersAvailable[l]["key"] = l;
                this.filtersAvailable[l]["title"] = ap[aq].toString().trim();
                this.filtersAvailable[l]["items"] = []
            }
        }
        var A = 0;
        var az = this.dataItems.length - 1;
        var ay = this.dataItems;
        ay = ay.sort(function(x, s) {
            if (x.Sequence == s.Sequence) {
                return x.ID - s.ID
            } else {
                return x.Sequence - s.Sequence
            }
        });
        var r = {};
        var ax = true;
        var ak = false;
        var an = null;
        for (var au = A; au <= az; au++) {
            var ar = this.dataItems[au];
            if (typeof ar.OrderMode === "undefined") {
                ar.OrderMode = 0
            }
            if (ar.PizzaItem) {
                continue
            }
            ax = true;
            an = null;
            ak = false;
            var U = "";
            var R = typeof OriginalVirtualGroups[ar.VirtualGroupID] !== "undefined";
            if (U == "") {
                if (ar.IsSubmenu) {
                    U = "portf" + strPadLeft("0", 6, ar.ID.toString().replace("-", "")) + ".jpg"
                } else {
                    if (!ar.IsDeal && !isNaN(ar.ID)) {
                        U = "itm" + strPadLeft("0", 6, (!R ? ar.ID.toString() : ar.VirtualGroupID.toString())) + ".jpg"
                    } else {
                        if (ar.IsDeal) {
                            U = "deal" + strPadLeft("0", 6, ar.DealID.toString()) + ".jpg"
                        } else {
                            if (typeof ar.StepID !== "undefined" && ar.StepID > 0) {
                                U = "stepdef" + strPadLeft("0", 6, ar.StepID.toString()) + ".jpg"
                            } else {
                                if (ar.ImageName !== "" && !R) {
                                    U = ar.ImageName + ".jpg"
                                }
                            }
                        }
                    }
                }
            }
            if (R && this.getNumberOfItemsInsideVGroup(ar.VirtualGroupID) > 1) {
                if (typeof r[ar.VirtualGroupID] === "undefined") {
                    r[ar.VirtualGroupID] = {
                        ID: ar.VirtualGroupID,
                        obj: OriginalVirtualGroups[ar.VirtualGroupID],
                        UIID: ("BKID_" + ar.ID + "_" + this.subMenuID),
                        ITEMID: ar.ID,
                        Items: []
                    }
                } else {
                    ax = false;
                    var u = IsItemCustomizable(ar);
                    var ae = $("#BKID_" + r[ar.VirtualGroupID].ITEMID + "_" + this.subMenuID);
                    if (!u.canAdd && ae.attr("class").indexOf("canAdd") > 0) {
                        ae.removeClass("canAdd");
                        ae.addClass("canNotAdd")
                    }
                    if (u.canCustomize) {
                        ae.addClass("canCustomize")
                    }
                }
                r[ar.VirtualGroupID]["Items"].push(ar);
                ak = true;
                an = r[ar.VirtualGroupID]
            }
            if (!ax) {
                continue
            }
            var H = false;
            var q = null;
            for (var aw in ar.modGroup) {
                var T = ar.modGroup[aw];
                if (typeof T !== "undefined" && typeof T.QuickCustomize !== "undefined" && T.QuickCustomize) {
                    q = ar.modGroup[aw];
                    H = true;
                    break
                }
            }
            var v = w;
            var Y = ar.Price;
            if (typeof ar.MenuPrice !== "undefined") {
                Y = ar.MenuPrice
            }
            Y = RoundPrice(Y);
            v = v.replace(/#UIID#/gi, "BKID_" + ar.ID + "_" + this.subMenuID);
            if (this.onCustomItemVariables != null) {
                v = this.onCustomItemVariables(v, ar)
            }
            v = v.replace(/#NAME#/gi, (!ak) ? ar.Name.replace(/[@]/g, "") : OriginalVirtualGroups[ar.VirtualGroupID]["Name"]);
            v = v.replace(/#IMG#/gi, "Menu" + CurrentMenuTemplateID + "/" + U);
            v = v.replace(/#IMG_LNG#/gi, "Menu" + CurrentMenuTemplateID + "/" + U.replace(".", "-" + UserLanguage + "."));
            v = v.replace(/#PRICEVALUE#/gi, Y > 0 ? Y + "<span class='currencySymbol'>" + CurrencySymbol + "</span>" : "");
            v = v.replace(/#PRICE#/gi, Y > 0 ? Y + "<span class='currencySymbol'>" + CurrencySymbol + "</span>" : Translate("Order Now"));
            v = v.replace(/#DEALITEMPRICE#/gi, Y > 0 ? Translate("Extra") + " " + Y + "<span class='currencySymbol'>" + CurrencySymbol + "</span>" : Translate("Continue"));
            v = v.replace(/#DESCRIPTION#/gi, limitText((!ak) ? ar.Description : OriginalVirtualGroups[ar.VirtualGroupID]["Description"], bk.descLimit));
            v = v.replace(/#SELECTOR1VISIBILITY#/gi, (an == null || typeof OriginalVirtualSelectors[an.obj.Selector1ID] !== "undefined") ? "none" : "default");
            v = v.replace(/#SELECTOR2VISIBILITY#/gi, (an == null || typeof OriginalVirtualSelectors[an.obj.Selector2ID] !== "undefined") ? "none" : "default");
            v = v.replace(/#SELECTOR3VISIBILITY#/gi, (an == null || typeof OriginalVirtualSelectors[an.obj.Selector3ID] !== "undefined") ? "none" : "default");
            v = v.replace(/#SELECTOR1TITLE#/gi, "SEL1TITLE_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#SELECTOR2TITLE#/gi, "SEL2TITLE_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#SELECTOR3TITLE#/gi, "SEL3TITLE_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#SELECTOR1CTRLTITLE#/gi, "SEL1CTRLTITLE_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#SELECTOR2CTRLTITLE#/gi, "SEL2CTRLTITLE_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#SELECTOR3CTRLTITLE#/gi, "SEL3CTRLTITLE_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#SELECTOR1CTRL#/gi, "SEL1CTRL_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#SELECTOR2CTRL#/gi, "SEL2CTRL_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#SELECTOR3CTRL#/gi, "SEL3CTRL_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#CUST_MODGROUP_VISIBILITY#/gi, H ? "none" : "default");
            v = v.replace(/#CUST_MODGROUP_TITLE#/gi, "CUST_MOD_GROUP_TITLE_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#CUST_MODGROUP_CTRLTITLE#/gi, "CUST_MODGROUP_CTRLTITLE_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#CUST_MODGROUP_CTRL#/gi, "CUST_MODGROUP_CTRL_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#QTY_UP#/gi, genActionLink({
                ctrlr: this,
                btn: "qtyUp",
                itm: ar
            }, this.itemClick));
            v = v.replace(/#QTY_DOWN#/gi, genActionLink({
                ctrlr: this,
                btn: "qtyDown",
                itm: ar
            }, this.itemClick));
            var O = "QTY_DROP_" + ar.ID + "_" + this.subMenuID;
            v = v.replace(/#QTY_TITLE#/gi, "QTY_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#QTY_TITLE2#/gi, "QTY2_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#QTY_TITLE3#/gi, "QTY3_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#QTY_DROPDOWN#/gi, O);
            v = v.replace(/#PRICE_LABEL#/gi, "PRICE_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#PRICE_LABEL2#/gi, "PRICE_2_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#DEALITEMPRICE_LABEL#/gi, "DEALITEMPRICE_" + ar.ID + "_" + this.subMenuID);
            v = v.replace(/#ADDTOCART#/gi, genActionLink({
                ctrlr: this,
                btn: "addToCart",
                itm: ar
            }, this.itemClick));
            v = v.replace(/#CUSTOMIZE#/gi, genActionLink({
                ctrlr: this,
                btn: "customize",
                itm: ar
            }, this.itemClick));
            v = v.replace(/#SHOWINFO#/gi, genActionLink({
                ctrlr: this,
                btn: "info",
                itm: ar
            }, this.itemClick));
            v = v.replace(/#TOGGLEFAVORITE#/gi, genActionLink({
                ctrlr: this,
                btn: "favitem",
                itm: ar
            }, this.itemClick));
            var u = IsItemCustomizable(ar);
            v = v.replace(/#ADDTOCART_VISIBILITY#/gi, u.canAdd ? "inline-block" : "none");
            v = v.replace(/#CUSTOMIZE_VISIBILITY#/gi, u.canCustomize ? "inline-block" : "none");
            v = v.replace(/#SUGGESTIVEITM_ID#/gi, "SUGGESTIVEITM_" + ar.ID);
            var aj = $(v);
            if (u.canAdd) {
                aj.addClass("canAdd")
            } else {
                aj.addClass("canNotAdd")
            }
            if (u.canCustomize) {
                aj.addClass("canCustomize")
            }
            if (ar.IsDeal || ar.IsSubmenu) {
                aj.addClass("dealItem")
            }
            if (an != null && typeof OriginalVirtualSelectors[an.obj.Selector1ID] !== "undefined") {
                aj.addClass("selector1")
            }
            if (an != null && typeof OriginalVirtualSelectors[an.obj.Selector2ID] !== "undefined") {
                aj.addClass("selector2")
            }
            if (an != null && typeof OriginalVirtualSelectors[an.obj.Selector3ID] !== "undefined" && ar.Selector3ValueID != 0 && ar.Selector3ValueID != -1) {
                aj.addClass("selector3")
            }
            if (H) {
                aj.addClass("cust_modgroup")
            }
            this.itemsContiner.append(aj);
            $("#" + O).data("ctrlr", this);
            $("#" + O).data("itm", ar);
            $("#" + O).on("change", function() {
                var aB = $(this).data("itm");
                var s = $("#BKID_" + aB.ID + "_" + $(this).data("ctrlr").subMenuID);
                var aA = $(this).val();
                s.data("qty", aA);
                var x = aB.Price;
                if (typeof aB.MenuPrice !== "undefined") {
                    x = aB.MenuPrice
                }
                $("#PRICE_" + $(this).data("itm")["ID"] + "_" + $(this).data("ctrlr").subMenuID).html(RoundPrice(aA * x) + "<span class='currencySymbol'>" + CurrencySymbol + "</span>");
                $("#PRICE_2_" + $(this).data("itm")["ID"] + "_" + $(this).data("ctrlr").subMenuID).html(RoundPrice(aA * x) + "<span class='currencySymbol'>" + CurrencySymbol + "</span>");
                $(this).data("ctrlr").updateVisualGroupPrice(s)
            });
            if (useJUICombo) {
                $("#" + O).combobox()
            }
            aj.data("qtyDropDownUI", $("#" + O));
            var ap = ar.Filter.toString().toLowerCase().split(",");
            if (useAllFilter) {
                this.filtersAvailable.all["items"][this.filtersAvailable.all["items"].length] = aj
            }
            for (var aq in ap) {
                if (ap[aq].toString().trim() == "") {
                    continue
                }
                var l = $.md5(ap[aq].toString().trim());
                if (this.filtersAvailable[l] == null || typeof this.filtersAvailable[l] === "undefined") {
                    this.filtersAvailable[l] = {};
                    this.filtersAvailable[l]["id"] = "FLTR_" + this.subMenuID + "_" + l;
                    this.filtersAvailable[l]["key"] = l;
                    this.filtersAvailable[l]["title"] = ap[aq].toString().trim();
                    this.filtersAvailable[l]["items"] = []
                }
                this.filtersAvailable[l]["items"][this.filtersAvailable[l]["items"].length] = aj
            }
            aj.find("img").each(function() {
                if (!$(this).attr("orgimg")) {
                    $(this).attr("orgimg", $(this).attr("src"))
                }
                this.onerror = function() {
                    ReplaceMissingImage(this)
                }
            });
            var C = $("#CUST_MOD_GROUP_TITLE_" + ar.ID + "_" + this.subMenuID);
            var m = $("#CUST_MODGROUP_CTRLTITLE_" + ar.ID + "_" + this.subMenuID);
            var P = $("#CUST_MODGROUP_CTRL_" + ar.ID + "_" + this.subMenuID);
            if (H) {
                C.html(q.Title);
                var o = true;
                for (var aq in q.Items) {
                    var X = q.Items[aq];
                    var D = HTML_Pages[this.SelectorItemTemplate];
                    D = D.replace(/#ID#/gi, X.ID);
                    D = D.replace(/#NAME#/gi, X.Name);
                    D = D.replace(/#DESCRIPTION#/gi, X.Description);
                    var I = $(D);
                    I.data("modItem", X);
                    I.data("modGroup", q);
                    I.data("TitleUI", m);
                    I.data("ItemUI", aj);
                    I.data("Ctrlr", this);
                    P.append(I);
                    if (o) {
                        aj.data("modItem", X.ID);
                        aj.data("modGroup", q.ID);
                        m.html(X.Name.trim());
                        o = false
                    }
                    I.click(function(aA) {
                        aA.preventDefault();
                        $(this).foundation("dropdown", "close", $(this).parent());
                        var aB = $(this).data("modItem");
                        var s = $(this).data("modGroup");
                        var x = $(this).data("ItemUI");
                        x.data("modItem", aB.ID);
                        x.data("modGroup", s.ID);
                        $(this).data("TitleUI").html(aB.Name.trim());
                        $(this).data("Ctrlr").updateVisualGroupPrice(x)
                    })
                }
            }
        }
        for (var y in r) {
            var z = r[y];
            var W = OriginalVirtualGroups[z.ID];
            var ad = $("#" + z.UIID);
            ad.data("vgroup_data", z);
            var at = [];
            var M = [];
            var G = [];
            for (au = 0; au < 3; au++) {
                at[au] = $("#SEL" + (au + 1) + "TITLE_" + z.ITEMID + "_" + this.subMenuID);
                M[au] = $("#SEL" + (au + 1) + "CTRLTITLE_" + z.ITEMID + "_" + this.subMenuID);
                G[au] = $("#SEL" + (au + 1) + "CTRL_" + z.ITEMID + "_" + this.subMenuID)
            }
            var ab = [];
            var av = [];
            for (au = 0; au < 3; au++) {
                ab[au] = [];
                av[au] = {};
                for (var aq in z.Items) {
                    var ar = z.Items[aq];
                    var Q = 0;
                    var am = 0;
                    if (au == 0) {
                        Q = ar.Selector1ValueID;
                        am = OriginalVirtualGroups[z.ID].Selector1ID
                    } else {
                        if (au == 1) {
                            Q = ar.Selector2ValueID;
                            am = OriginalVirtualGroups[z.ID].Selector2ID
                        } else {
                            Q = ar.Selector3ValueID;
                            am = OriginalVirtualGroups[z.ID].Selector3ID
                        }
                    }
                    if (Q > 0 && typeof av[au][Q] === "undefined" && typeof OriginalVirtualSelectors[am] !== "undefined") {
                        if (typeof av[Q] === "undefined") {
                            ab[au].push(OriginalVirtualSelectors[am].SelectorValues[Q]);
                            av[Q] = Q
                        }
                    }
                }
                ab[au] = ab[au].sort(function(x, s) {
                    return x.Seq - s.Seq
                })
            }
            ad.data("selectorTitle", at);
            ad.data("selectorCtrlTitle", M);
            ad.data("selectorCtrl", G);
            ad.data("selectorValsArr", ab);
            for (var af = 0; af < 3; af++) {
                var am = 0;
                var p = 0;
                if (af == 0) {
                    am = W.Selector1ID;
                    p = OriginalVirtualGroups[z.ID].Selector1DefaultValueID
                } else {
                    if (af == 1) {
                        am = W.Selector2ID;
                        p = OriginalVirtualGroups[z.ID].Selector2DefaultValueID
                    } else {
                        if (af == 2) {
                            am = W.Selector3ID;
                            p = OriginalVirtualGroups[z.ID].Selector3DefaultValueID
                        }
                    }
                }
                if (typeof OriginalVirtualSelectors[am] !== "undefined") {
                    at[af].html(OriginalVirtualSelectors[am].Name)
                }
                if (G[af].length == 1) {
                    var ac = false;
                    for (var au in ab[af]) {
                        var E = ab[af][au];
                        if (E.ID == p) {
                            ac = true;
                            break
                        }
                    }
                    if (!ac && ab[af].length > 0) {
                        p = ab[af][0]["ID"]
                    }
                    for (var au in ab[af]) {
                        var E = ab[af][au];
                        if (typeof E === "undefined") {
                            continue
                        }
                        var D = HTML_Pages[this.SelectorItemTemplate];
                        D = D.replace(/#ID#/gi, E.ID);
                        D = D.replace(/#NAME#/gi, E.Name);
                        D = D.replace(/#DESCRIPTION#/gi, E.Description);
                        var I = $(D);
                        I.data("Val", E);
                        I.data("Index", af);
                        I.data("TitleUI", M[af]);
                        I.data("ItemUI", ad);
                        I.data("Ctrlr", this);
                        G[af].append(I);
                        if (E.ID == p) {
                            if (af == 0) {
                                ad.data("Selector1Val", E.ID)
                            } else {
                                if (af == 1) {
                                    ad.data("Selector2Val", E.ID)
                                } else {
                                    if (af == 2) {
                                        ad.data("Selector3Val", E.ID)
                                    }
                                }
                            }
                            M[af].html(E.Name.trim())
                        }
                        I.click(function(aC) {
                            aC.preventDefault();
                            $(this).foundation("dropdown", "close", $(this).parent());
                            var aB = $(this).data("Val");
                            var aA = $(this).data("ItemUI");
                            var s = $(this).data("Index");
                            if (s == 0) {
                                aA.data("Selector1Val", aB.ID)
                            } else {
                                if (s == 1) {
                                    aA.data("Selector2Val", aB.ID)
                                } else {
                                    if (s == 2) {
                                        aA.data("Selector3Val", aB.ID)
                                    }
                                }
                            }
                            if (typeof ItemsViewer.onSelectorChanged !== "undefined" && ItemsViewer.onSelectorChanged != null) {
                                var x = ItemsViewer.onSelectorChanged({
                                    ItemUI: aA,
                                    Selector1Val: aA.data("Selector1Val"),
                                    Selector2Val: aA.data("Selector2Val"),
                                    Selector3Val: aA.data("Selector3Val")
                                });
                                if (x != null) {
                                    aA.data("Selector1Val", x.Selector1Val);
                                    aA.data("Selector2Val", x.Selector2Val);
                                    aA.data("Selector3Val", x.Selector3Val)
                                }
                            }
                            $(this).data("Ctrlr").updateVisualGroupSelectors(aA);
                            $(this).data("Ctrlr").updateVisualGroupPrice(aA)
                        })
                    }
                }
            }
            this.updateVisualGroupPrice(ad)
        }
        this.updateVisualGroupSelectors = function(aB) {
            var aD = aB.data("selectorCtrlTitle");
            var aA = aB.data("selectorValsArr");
            var aC = [aB.data("Selector1Val"), aB.data("Selector2Val"), aB.data("Selector3Val")];
            for (var s = 0; s < 3; s++) {
                if (typeof aC[s] !== "undefined") {
                    for (var aE in aA[s]) {
                        if (typeof aA[s][aE] !== "undefined") {
                            if (aC[s] == aA[s][aE]["ID"]) {
                                aD[s].html(aA[s][aE]["Name"])
                            }
                        }
                    }
                }
            }
        };
        this.filterContainer = $("#" + this.filterContainerID);
        this.filterContainer.empty();
        var V = null;
        var t = "";
        var ai = 0;
        var K = [];
        K.push("all");
        for (var B in this.filtersAvailable) {
            if (B != "all") {
                K.push(B)
            }
        }
        for (var au in K) {
            var B = K[au];
            var J = k;
            J = J.replace(/#FILTERBTN#/gi, "FLTR_" + this.subMenuID + "_" + B);
            J = J.replace(/#FILTERTITLE#/gi, this.filtersAvailable[B]["title"].toUpperCase());
            this.filterContainer.append(J);
            var F = $("#FLTR_" + this.subMenuID + "_" + B);
            if (!this.isPromo && ai == 0) {
                F.addClass("background_page_filter_button_Active");
                activeFilterName = B
            }
            if (this.isPromo && B == "all") {
                F.addClass("background_page_filter_button_Active");
                activeFilterName = B
            }
            if (B == activeFilterName) {
                V = F
            }
            F.data("param", this.filtersAvailable[B]);
            F.data("owner", this);
            F.click(function() {
                var s = $(this).data("param");
                $(this).data("owner").filterItems($(this).data("owner").oldFilter, s);
                $(this).data("owner").oldFilter = s;
                if ($(this).data("owner").onItemFiltering != null) {
                    $(this).data("owner").onItemFiltering()
                }
            });
            ai++
        }
        this.oldFilter = this.filtersAvailable[B];
        this.filterContainer.append("<div class='c'></div>");
        if (ai > 1) {
            this.filterContainer.show()
        } else {
            this.filterContainer.hide()
        }
        if (V != null) {
            V.click()
        }
        this.stylesContainer = $("#" + this.stylesContainerID);
        this.stylesContainer.empty();
        if (this.stylesAvailable != null) {
            for (var al in this.stylesAvailable) {
                var ao = this.stylesAvailable[al];
                var J = "<input type='button' class='background_page_style_btn' id='style#STYLETITLE#'  />";
                J = J.replace(/#STYLETITLE#/gi, ao.Title);
                var aa = $(J);
                this.stylesContainer.append(aa);
                if (ao.Title == this.styleName) {
                    aa.addClass("background_page_style_btn_active")
                }
                aa.data("owner_style", ao);
                aa.data("owner_evt", this.onStyleClick);
                aa.click(function() {
                    $(this).data("owner_evt")($(this).data("owner_style"));
                    return false
                })
            }
        }
        this.fixContentTop()
    };
    this.getSelectedItemOfGroup = function(r) {
        var l = r.data("vgroup_data");
        if (typeof l === "undefined" || l == null) {
            return null
        }
        var q = r.data("Selector1Val");
        var o = r.data("Selector2Val");
        var k = r.data("Selector3Val");
        var m = null;
        for (var s in l.Items) {
            var p = l.Items[s];
            if ((typeof q === "undefined" || q == p.Selector1ValueID) && (typeof o === "undefined" || o == p.Selector2ValueID) && (typeof k === "undefined" || k == p.Selector3ValueID)) {
                m = p;
                break
            }
        }
        return m
    };
    this.updateVisualGroupPrice = function(t) {
        var k = t.data("vgroup_data");
        if (typeof k === "undefined" || k == null) {
            return
        }
        var s = t.data("qty");
        if (typeof s === "undefined" || s == null) {
            s = 1
        }
        var m = $("#PRICE_" + k.ITEMID + "_" + this.subMenuID);
        var q = $("#PRICE_2_" + k.ITEMID + "_" + this.subMenuID);
        var p = $("#DEALITEMPRICE_" + k.ITEMID + "_" + this.subMenuID);
        $("#QTY_" + k.ITEMID + "_" + this.subMenuID).html(s);
        var r = this.getSelectedItemOfGroup(t);
        if (r != null) {
            m.html(RoundPrice(r.Price * s) + "<span class='currencySymbol'>" + CurrencySymbol + "</span>");
            q.html(RoundPrice(r.Price * s) + "<span class='currencySymbol'>" + CurrencySymbol + "</span>");
            var o = RoundPrice(r.Price * s);
            p.html((o > 0 ? Translate("Extra") + " " + o + "<span class='currencySymbol'>" + CurrencySymbol + "</span>" : Translate("Continue")))
        } else {
            alert(Translate("Sorry. No items are available for the selected options. Please select different options."));
            var l = Translate("None");
            m.html(l);
            q.html(l);
            p.html(l)
        }
    };
    this.addModifierItems = function(k, m) {
        var o = k.data("modItem");
        var p = k.data("modGroup");
        if (typeof o !== "undefined" && typeof p !== "undefined" && o > 0 && p > 0) {
            if (typeof m.modGroupsItems === "undefined") {
                m.modGroupsItems = []
            }
            var l = new Object();
            l.ID = o;
            l.ModGroupID = p;
            l.Name = OriginalItems[o]["Name"];
            l.Weight = GetModItemDefWeight(OriginalModGroups[p], o);
            l.Price = getCartItemPrice(l);
            l.modGroupsItems = [];
            m.modGroupsItems.push(l)
        }
    };
    this.doAddToCart = function(s) {
        var m = $("#BKID_" + s.ID + "_" + this.subMenuID);
        var r = m.data("qty");
        if (typeof r === "undefined" || r == null) {
            r = 1
        }
        var p = s;
        if (typeof OriginalVirtualGroups[s.VirtualGroupID] !== "undefined" && this.getNumberOfItemsInsideVGroup(s.VirtualGroupID) > 1) {
            p = this.getSelectedItemOfGroup(m)
        }
        if (p == null) {
            alert("Sorry. No items are available for the selected options.");
            return
        }
        var q = {
            ID: p.ID,
            Name: p.Name,
            Price: getCartItemPrice(p),
            Weight: p.Weight,
            modGroupsItems: [],
            NoModCodeItems: [],
            DealID: p.DealID
        };
        this.addModifierItems(m, q);
        q.Qty = r;
        this.addItemToCart(q);
        var o = p.Price;
        if (typeof p.MenuPrice !== "undefined") {
            o = p.MenuPrice
        }
        m.data("qty", 1);
        $("#QTY_" + s.ID + "_" + this.subMenuID).html(1);
        $("#QTY2_" + s.ID + "_" + this.subMenuID).html(1);
        $("#QTY3_" + s.ID + "_" + this.subMenuID).html(1);
        $("#PRICE_" + s.ID + "_" + this.subMenuID).html(RoundPrice(o) + "<span class='currencySymbol'>" + CurrencySymbol + "</span>");
        $("#PRICE_2_" + s.ID + "_" + this.subMenuID).html(RoundPrice(o) + "<span class='currencySymbol'>" + CurrencySymbol + "</span>");
        if (typeof m.data("qtyDropDownUI") !== "undefined" && m.data("qtyDropDownUI") != null) {
            m.data("qtyDropDownUI").val(1).change()
        }
        if (!isNaN(p.ID)) {
            var k = GoogleTrack_getItemEnName(p.ID);
            var l = GoogleTrack_getItemCategory(p.ID);
            googleTag.push({
                event: "ClickItem",
                Category: "Sub Menu",
                ElementType: "Item",
                ID: p.ID,
                Name: k
            });
            googleTag.push({
                event: "productClick",
                Category: "",
                ElementType: "Item",
                ID: p.ID,
                Name: k,
                ecommerce: {
                    click: {
                        products: [{
                            name: k,
                            id: q.ID,
                            price: q.Price,
                            brand: "",
                            category: l,
                            variant: ""
                        }]
                    }
                }
            })
        }
    };
    this.doCustomizeItem = function(s) {
        var q = $("#BKID_" + s.ID + "_" + this.subMenuID);
        var r = q.data("qty");
        if (typeof q.data("qtyDropDownUI") !== "undefined" && q.data("qtyDropDownUI").length > 0) {
            r = q.data("qtyDropDownUI").val()
        }
        if (typeof r === "undefined" || r == null) {
            r = 1
        }
        var p = null;
        if (typeof OriginalVirtualGroups[s.VirtualGroupID] !== "undefined") {
            p = this.getSelectedItemOfGroup(q)
        }
        var m = {
            EntryID: s.EntryID,
            ID: s.ID,
            Name: s.Name,
            Price: getCartItemPrice(s),
            Weight: s.Weight,
            modGroupsItems: s.modGroupsItems,
            NoModCodeItems: s.NoModCodeItems,
            DealID: s.DealID,
            Qty: r
        };
        if (p == null) {
            p = s
        }
        var l = p.ID;
        if (isNaN(p.ID) && typeof p.OriginalItemID !== "undefined") {
            l = p.OriginalItemID
        }
        var k = GoogleTrack_getItemEnName(l);
        k = (typeof k === "undefined") ? p.Name : k;
        var o = GoogleTrack_getItemCategory(l);
        googleTag.push({
            event: "CustomizeItem",
            Category: "Sub Menu",
            ElementType: "Item",
            ID: l,
            Name: k
        });
        googleTag.push({
            event: "PageView",
            PageName: "Customize Item",
            PageURL: "customize"
        });
        googleTag.push({
            event: "Open",
            Category: "Customize Item",
            ElementType: "Item",
            ID: l,
            Name: k
        });
        if (s.DealID > 0) {
            googleTag.push({
                event: "promotionClick",
                Category: "Sub Menu",
                ElementType: "Item",
                ID: l,
                Name: k,
                ecommerce: {
                    promoClick: {
                        promotions: [{
                            id: l,
                            name: k,
                            creative: "",
                            position: ""
                        }]
                    }
                }
            });
            googleTag.push({
                event: "productClick",
                Category: "",
                ElementType: "Item",
                ID: l,
                Name: k,
                ecommerce: {
                    click: {
                        products: [{
                            name: k,
                            id: l,
                            price: p.Price,
                            brand: "",
                            category: o,
                            variant: ""
                        }]
                    }
                }
            })
        } else {
            googleTag.push({
                event: "productDetails",
                Category: "Sub Menu",
                ElementType: "Item",
                ID: l,
                Name: k,
                ecommerce: {
                    detail: {
                        products: [{
                            id: l,
                            name: k,
                            price: getCartItemPrice(p),
                            brand: "",
                            category: o,
                            variant: ""
                        }]
                    }
                }
            })
        }
        if (p.DealID > 0) {
            this.customizeItem(p, null, r)
        } else {
            this.customizeItem(p, null, r)
        }
    };
    this.favItemToggle = function(l) {
        var k = $("#BKID_" + l.ID);
        if (FavoriteItems.isItemInFavorite(l.ID)) {
            FavoriteItems.RemoveFromFavorite(l.ID);
            k.removeClass("favoriteItem")
        } else {
            FavoriteItems.AddToFavorite(l);
            k.addClass("favoriteItem")
        }
    };
    this.filterItems = function(l, m) {
        if (l == m) {
            return
        }
        activeFilterName = m.key;
        $("#" + l.id).removeClass("background_page_filter_button_Active");
        $("#" + m.id).addClass("background_page_filter_button_Active");
        for (var k in l.items) {
            l.items[k].hide()
        }
        for (var k in m.items) {
            m.items[k].show()
        }
        this.fixContentTop();
        if (m.key != "all") {
            googleTag.push({
                event: "Filter",
                Category: "Sub Menu",
                ElementType: "Filter",
                ID: "",
                Name: m.title.replace(/ /g, "-")
            })
        }
    };
    this.fixContentTop = function() {
        $(".background_page_content_thumbs").css("top", $(".background_page_filters_wrapper").height() + 15 + "px")
    };
    this.resizeColumnDiv = function(k, l) {
        this.fixContentTop();
        UpdateScrolls()
    };
    this.createItemInfoButton = function(m, k) {
        if (m.css("position") == "static") {
            m.css("position", "relative")
        }
        var l = $("<img src='/Images/SharedImages/iteminfo.png' />");
        l.data("ctrlr", this);
        l.data("itm", k);
        l.css("position", "absolute");
        l.css("top", this.topOffset + "px");
        l.css("left", this.leftOffset + "px");
        l.css("cursor", "pointer");
        if (!(this.ItemHtmlTemplate.indexOf("Thumbs") > -1)) {
            l.addClass("blockBtn")
        } else {
            l.addClass("infobtn")
        }
        l.hide();
        l.click(function() {
            var p = $(this).data("itm");
            var o = $(this).data("ctrlr");
            o.itemClick({
                ctrlr: o,
                btn: "info",
                itm: p
            })
        });
        m.data("infBtn", l);
        m.append(l);
        m.mouseenter(function() {
            var o = $(this).data("infBtn");
            o.css("zIndex", getTopmostZIndex() + 1);
            o.show()
        });
        m.mouseleave(function() {
            var o = $(this).data("infBtn");
            o.hide()
        })
    }
}

function ItemsViewer() {
    this.activeStyle = null;
    this.stylesList = null;
    this.descLimit = 164;
    this.initiated = false;
    if (typeof isMobile !== "undefined" && !isMobile) {
        this.stylesList = [{
            Index: 0,
            Title: "Thumbs",
            Icon: "/Images/SharedImages/view_icons.png",
            Icon_active: "/Images/SharedImages/view_icons_active.png",
            Style: new HtmlStyle("BackgroundList_ScrollPage", "BackgroundList_ScrollPageItemFilter", "BackgroundList_ThumbsItem", "BackgroundList_ThumbsItem_SelectorItem", 0, 0, "Thumbs", false)
        }, {
            Index: 1,
            Title: "Blocks",
            Icon: "/Images/SharedImages/view_blocks.png",
            Icon_active: "/Images/SharedImages/view_blocks_active.png",
            Style: new HtmlStyle("BackgroundList_ScrollPage", "BackgroundList_ScrollPageItemFilter", "BackgroundList_BlocksItem", "", 0, 0, "Blocks", false)
        }, {
            Index: 2,
            Title: "Portfolio",
            Icon: "/Images/SharedImages/view_blocks.png",
            Icon_active: "/Images/SharedImages/view_blocks_active.png",
            Style: new HtmlStyle("Portfolio_ItemsContainer", "Portfolio_ItemFilter", "Portfolio_Item", "", 0, 0, "Portfolio", false)
        }];
        var a = 0;
        a = readCookie("ctrlr_style_i");
        if (typeof a === "undefined" || a == null || a >= this.stylesList.length) {
            a = 0
        }
        this.activeStyle = this.stylesList[a]["Style"]
    } else {
        this.activeStyle = new HtmlStyle("BackgroundList_MobilePage", "BackgroundList_MobileItemFilter", "BackgroundList_MobileItem", "")
    }
    this.container = null;
    this.backgroundDiv = null;
    this.scrollIndex = 0;
    this.columnsCount = 0;
    this.scrolling = false;
    this.shadow = null;
    this.addItemToCart = null;
    this.customizeItem = null;
    this.showItemInfo = null;
    this.openSubmenu = null;
    this.minColWidth = 300;
    this.columnStyleMinHeight = 760;
    this.widthRatio = 0;
    this.cropBottom = false;
    this.ImagesFolder = "";
    this.imgExtentions = "jpg";
    this.onCustomItemVariables = null;
    this.updateStylesParameters = function() {
        this.activeStyle.dataItems = this.dataItems;
        this.activeStyle.dataTitle = this.dataTitle;
        this.activeStyle.dataDesc = this.dataDesc;
        this.activeStyle.subMenuID = this.subMenuID;
        this.activeStyle.origColumnsPerPage = this.ColumnsPerPage;
        this.activeStyle.columnsToScroll = this.columnsToScroll;
        this.activeStyle.filters = this.filters;
        if (this.imgExtentions != "") {
            this.activeStyle.imgExtentions = this.imgExtentions
        } else {
            this.activeStyle.imgExtentions = "jpg"
        }
        this.activeStyle.addItemToCart = this.addItemToCart;
        this.activeStyle.customizeItem = this.customizeItem;
        this.activeStyle.showItemInfo = this.showItemInfo;
        this.activeStyle.openSubmenu = this.openSubmenu;
        this.activeStyle.stylesAvailable = this.stylesList;
        this.activeStyle.styleName = "";
        var b = this;
        this.activeStyle.onStyleClick = function(c) {
            b.Update(c)
        };
        this.activeStyle.onCustomItemVariables = this.onCustomItemVariables
    };
    this.Init = function() {
        this.initiated = true;
        document.bk = this;
        this.updateStylesParameters();
        document.bk_ctrlr = this;
        $(this.container).html("");
        this.backgroundDiv = $("<div>");
        $(this.container).append(this.backgroundDiv);
        this.activeStyle.DrawColumn(0, this.backgroundDiv);
        $("#col_" + 0 + " img").each(function() {
            this.onerror = function() {
                if ($(this).width() <= 250) {
                    ReplaceMissingImage(this, false)
                } else {
                    ReplaceMissingImage(this, true)
                }
            }
        });
        $(this.container).data("bkctrlr", this)
    };
    this.enable = function(b) {};
    this.Update = function(b) {
        if (typeof b !== "undefined") {
            var c = b.Index;
            createCookie("ctrlr_style_i", c, 365);
            this.activeStyle = b.Style
        }
        this.updateStylesParameters();
        this.backgroundDiv.empty();
        this.activeStyle.DrawColumn(0, this.backgroundDiv)
    }
}
"use strict";

function TopMenu() {
    this.data = null;
    this.pages = null;
    this.menuContainer = null;
    this.afterShowPage = null;
    this.menuClick = null;
    this.oldLnkID = null;
    this.setActiveSubMenu = function(c) {
        for (var a in this.data) {
            var d = this.data[a];
            if (d.ID == c) {
                var b = d.topMenuLnkID;
                if (!$("#" + b).hasClass("active")) {
                    $("#" + b).addClass("active");
                    this.oldLnkID = b
                }
                break
            }
        }
    };
    this.Init = function() {
        var h = this.pages.TopMenu_Main;
        var g = this.pages.TopMenu_Item;
        var d = h;
        var b = "";
        var e = [];
        var a = 0;
        for (var c in this.data) {
            var k = this.data[c];
            e[c] = k;
            if (k.Name.indexOf("@") > -1) {
                continue
            }
            var l = createUUID();
            if (typeof k.topMenuLnkID !== "undefined") {
                k.topMenuLnkID2 = l
            } else {
                k.topMenuLnkID = l
            }
            var f = genActionLink({
                ctrlr: this,
                itm: k,
                id: l
            }, function(m) {
                var o = m.id;
                if (m.ctrlr.oldLnkID != null) {
                    $("#" + m.ctrlr.oldLnkID).removeClass("active")
                }
                $("#" + o).addClass("active");
                m.ctrlr.oldLnkID = o;
                m.ctrlr.menuClick(m.itm)
            });
            var j = g;
            j = j.replace("#TITLE#", k.Name);
            j = j.replace("#LNK#", f);
            j = j.replace("#ID#", l);
            j = j.replace("#IMAGE#", "Menu" + CurrentMenuTemplateID + "/Sub" + k.ID + ".png");
            j = j.replace("#IMG_YPOSITION#", +(a * -45));
            j = j.replace("#SUBMENUID#", k.ID);
            a++;
            b += j
        }
        d = d.replace("#ITEMS#", b);
        $(this.menuContainer).html(d)
    }
}
"use strict";

function UserLogin() {
    this.userMenuHolder = null;
    this.userFooterMenuHolder = null;
    this.userMobileMenuHolder = null;
    this.pagesContainer = null;
    this.afterShowPage = null;
    this.customerData = null;
    this.afterLogin = null;
    this.afterLogout = null;
    this.OnShowRegisterCustomer = null;
    this.OnShowRecoverPassword = null;
    this.onSignout = null;
    this.validator = null;
    this.userTopFooterMenuHolder = null;
    this.proceedToFacebookRegistration = true;
    this.proceedToGoogleRegistration = true;
    this.drawUserMenu = function() {
        if (this.customerData == null) {
            this.drawUserMenuLogin()
        } else {
            this.drawUserMenuLoggedIn()
        }
    };
    this.drawUserMenuLogin = function() {
        var b = this.pages.Login;
        $(this.userMenuHolder).html(b);
        var c = this.pages.footerLogin;
        $(this.userFooterMenuHolder).html(c);
        var d = this.pages.topFooterLogin;
        $(this.userTopFooterMenuHolder).html(d);
        var a = this.pages.MobileLogin;
        $(this.userMobileMenuHolder).html(a);
        this.prepareFieldsTitles($("#login_email").get(0), $("#login_password").get(0));
        $("#login_action").data("ctrlr", this);
        $("#login_action").click(function() {
            $(this).data("ctrlr").doLogin()
        });
        $("#register_action").data("ctrlr", this);
        $("#register_action").click(function() {
            $(this).data("ctrlr").OnShowRegisterCustomer()
        });
        $("#login_email").data("ctrlr", this);
        $("#login_email").keydown(function(e) {
            if (e.which == 13) {
                $(this).data("ctrlr").doLogin()
            }
        });
        $("#login_password").data("ctrlr", this);
        $("#login_password").keydown(function(e) {
            if (e.which == 13) {
                $(this).data("ctrlr").doLogin()
            }
        });
        this.afterLogout()
    };
    this.drawUserMenuLoggedIn = function() {
        var e = this.customerData;
        var a = this.pages.UserMenu;
        var d = this.pages.footerUserMenu;
        var b = this.pages.topFooterUserMenu;
        var c = this.pages.MobileUserMenu;
        if (typeof d === "undefined" || d == null) {
            d = ""
        }
        if (typeof b === "undefined" || b == null) {
            b = ""
        }
        a = a.replace("#CUSTOMERNAME#", e.FirstName + " " + e.LastName);
        a = a.replace("#SIGNOUT#", genActionLink(this, function(f) {
            f.signout()
        }));
        d = d.replace("#SIGNOUT#", genActionLink(this, function(f) {
            f.signout()
        }));
        b = b.replace("#SIGNOUT#", genActionLink(this, function(f) {
            f.signout()
        }));
        if (typeof c !== "undefined") {
            c = c.replace("#SIGNOUT#", genActionLink(this, function(f) {
                f.signout()
            }))
        }
        $(this.userMenuHolder).html(a);
        $(this.userFooterMenuHolder).html(d);
        $(this.userTopFooterMenuHolder).html(b);
        $(this.userMobileMenuHolder).html(c);
        this.updateWelcomeMessage();
        this.afterLogin();
        this.showStoreNotes()
    };
    this.updateWelcomeMessage = function() {
        var a = this.customerData;
        $("#UserMenu_UserNameID").html(limitText(a.FirstName + " " + a.LastName, 20));
        $("#UserMenu_UserCorpID").html(a.CorpID)
    };
    this.postLoginActions = function() {
        googleTag.push({
            event: "Submit",
            Category: "Login",
            ElementType: "",
            ID: "",
            Name: ""
        });
        if (this.customerData.PreferedLang == "1") {
            this.customerData.PreferedLang = "E"
        } else {
            if (this.customerData.PreferedLang == "2") {
                this.customerData.PreferedLang = "U"
            }
        }
        if (translate && userLogin.customerData.PreferedLang == "E") {
            var a = window.location.pathname == "/" ? window.location.hash.replace("#", "") : window.location.pathname;
            window.location.href = "/?lang=en&sub=" + encodeURIComponent(a)
        }
        if (!translate && userLogin.customerData.PreferedLang == "U") {
            var a = window.location.pathname == "/" ? window.location.hash.replace("#", "") : window.location.pathname;
            window.location.href = "/?lang=un&sub=" + encodeURIComponent(a)
        }
        this.drawUserMenuLoggedIn()
    };
    this.doLogin = function(a, c, d) {
        if (typeof a === "undefined") {
            a = false
        }
        if (typeof c === "undefined") {
            c = null
        }
        var f = false;
        var e = $("#login_email").val();
        var b = $("#login_password").val();
        var f = $("#login_restorepwd").prop("checked");
        if (c != null) {
            e = $(c).data("loginname").val();
            b = $(c).data("pwd").val();
            f = $(c).data("remember").prop("checked")
        }
        e = e.toLowerCase();
        serverQuery("/Handlers/Customer.ashx", {
            action: "login",
            login: e,
            password: b,
            remember: f
        }, function(k, j, g) {
            var l = g.UIInlineContainer;
            if (k && j.valid == true) {
                g.owner.customerData = j.customer;
                if (l != null) {
                    $(l).html("")
                }
                var m = g.loginCallback;
                if (translate && userLogin.customerData.PreferedLang == "E") {
                    var h = window.location.pathname == "/" ? window.location.hash.replace("#", "") : window.location.pathname;
                    window.location.href = "/?lang=en&sub=" + encodeURIComponent(h)
                }
                if (!translate && userLogin.customerData.PreferedLang == "U") {
                    var h = window.location.pathname == "/" ? window.location.hash.replace("#", "") : window.location.pathname;
                    window.location.href = "/?lang=un&sub=" + encodeURIComponent(h)
                }
                if (typeof m !== "undefined" && m != null) {
                    m()
                }
                g.owner.postLoginActions()
            } else {
                if (l != null) {
                    $(l).data("loginname").val($(l).data("loginname").val());
                    $(l).data("pwd").val($(l).data("pwd").val())
                } else {
                    $("#login_email").val($("#login_email").data("old_title"));
                    $("#login_password").val($("#login_password").data("old_title"))
                }
                if (j != null) {
                    if (j.error == 0) {
                        alert("Invalid username or password")
                    } else {
                        if (j.error == 1) {
                            showActivationRequired(e)
                        } else {
                            if (j.error == 2) {
                                alert("This account is suspended")
                            } else {
                                alert("Login failed")
                            }
                        }
                    }
                } else {
                    alert("Server error")
                }
            }
        }, {
            owner: this,
            fromInlineBlock: a,
            UIInlineContainer: c,
            loginCallback: d
        })
    };
    this.login = function(h, d, g, c, f, b, a, e) {
        if (typeof e === "undefined") {
            e = false
        }
        serverQuery("/Handlers/Customer.ashx", {
            action: "login",
            login: h,
            password: d,
            remember: g,
            usingFacebook: b,
            usingGoogle: a,
            showAlert: e
        }, function(l, k, j) {
            googleTag.push({
                event: "Submit",
                Category: "Login",
                ElementType: "",
                ID: "",
                Name: ""
            });
            var o = j.loginCallback;
            if (l && k.valid == true) {
                j.owner.customerData = k.customer;
                if (typeof o !== "undefined" && o != null) {
                    o(true, "", j.loginParam)
                }
                j.owner.postLoginActions()
            } else {
                var m = "";
                if (k != null) {
                    if (k.error == 0) {
                        m = "Invalid username or password"
                    } else {
                        if (k.error == 1) {
                            m = "This account is not activated"
                        } else {
                            if (k.error == 2) {
                                m = "This account is suspended"
                            } else {
                                m = "Login failed"
                            }
                        }
                    }
                } else {
                    m = "Server error"
                }
                if (j.showAlert) {
                    alert(m)
                }
                if (typeof o !== "undefined" && o != null) {
                    o(false, m, j.loginParam)
                }
            }
        }, {
            owner: this,
            loginCallback: f,
            loginParam: c
        })
    };
    this.showStoreNotes = function() {
        var f = this.customerData.Addresses;
        var b = [];
        for (var h in f) {
            var a = f[h];
            var d = a.Name + ":\n" + a.StoreNote;
            if (typeof a.StoreNote !== "undefined" && a.StoreNote != "") {
                var e = false;
                for (var g in b) {
                    if (b[g] == d) {
                        e = true;
                        break
                    }
                }
                if (!e) {
                    b[b.length] = d
                }
            }
        }
        var c = "";
        for (var h in b) {
            c += b[h] + "\n\n"
        }
        if (c != "") {
            Announcement(c)
        }
    };
    this.drawInlineLoginBlock = function(o, h, q, l) {
        if (!this.isLoggedIn()) {
            if (typeof q === "undefined") {
                q = false
            }
            var f = this.pages.InlineLogin;
            var a = createUUID();
            var b = createUUID();
            var e = createUUID();
            var d = createUUID();
            var k = createUUID();
            var j = createUUID();
            var c = createUUID();
            var g = createUUID();
            var p = createUUID();
            f = f.replace("#REGISTER#", a);
            f = f.replace("#EMAIL#", b);
            f = f.replace("#PASSWORD#", e);
            f = f.replace("#LOGIN#", d);
            f = f.replace("#REMEMBER#", k);
            f = f.replace("#REMEMBERLABEL#", k);
            f = f.replace("#FORGETPASSWORD#", j);
            f = f.replace("#CANCEL#", c);
            f = f.replace("#FACBOOK_LOGIN#", g);
            f = f.replace("#GOOGLE_LOGIN#", p);
            $(o).html(f);
            $(o).data("loginname", $("#" + b));
            $(o).data("pwd", $("#" + e));
            $(o).data("remember", $("#" + k));
            this.prepareFieldsTitles($("#" + b).get(0), $("#" + e).get(0));
            var m = {
                Username: b,
                Password: e
            };
            this.validator = new FormValidator($("#frmInlineLogin"), {
                Username: {
                    required: true,
                    requiredMsg: Translate("Please enter your username")
                },
                Password: {
                    required: true,
                    requiredMsg: Translate("Please fill Password field")
                }
            }, m);
            this.validator.onShowValidateMessage = function(v, r, t, u, w) {
                var s = null;
                if (typeof(m) !== "undefined" || m != null) {
                    r = m[r]
                }
                if (!v) {
                    tooltip($("#" + r), u, 0, w, s)
                } else {
                    tooltip($("#" + r), "", 1, false, s)
                }
            };
            $("#" + d).data("ctrlr", this);
            $("#" + d).data("LoginContiner", o);
            $("#" + d).data("loginCallback", h);
            $("#" + d).click(function() {
                var r = $(this).data("ctrlr");
                var s = $(this).data("LoginContiner");
                var t = $(this).data("loginCallback");
                r.validator.ValidateBeforePost(function(u) {
                    r.doLogin(true, s, t)
                })
            });
            $("#" + g).data("ctrlr", this);
            $("#" + g).data("loginCallback", h);
            $("#" + g).click(function() {
                var r = $(this).data("ctrlr");
                var s = $(this).data("loginCallback");
                r.loginUsingFacebook(s)
            });
            $("#" + p).data("ctrlr", this);
            $("#" + p).data("loginCallback", h);
            $("#" + p).click(function() {
                var r = $(this).data("ctrlr");
                var s = $(this).data("loginCallback");
                r.loginUsingGoogle(s)
            });
            $("#" + b).data("ctrlr", this);
            $("#" + b).data("LoginContiner", o);
            $("#" + b).data("loginCallback", h);
            $("#" + b).keydown(function(r) {
                if (r.which == 13) {
                    $(this).data("ctrlr").doLogin(true, $(this).data("LoginContiner"), $(this).data("loginCallback"))
                }
            });
            $("#" + e).data("ctrlr", this);
            $("#" + e).data("LoginContiner", o);
            $("#" + e).data("loginCallback", h);
            $("#" + e).keydown(function(r) {
                if (r.which == 13) {
                    $(this).data("ctrlr").doLogin(true, $(this).data("LoginContiner"), $(this).data("loginCallback"))
                }
            });
            $("#" + a).data("ctrlr", this);
            $("#" + a).click(function() {
                if (q) {
                    l.Close()
                }
                $(this).data("ctrlr").OnShowRegisterCustomer()
            });
            $("#" + j).data("ctrlr", this);
            $("#" + j).click(function() {
                if (q) {
                    l.Close()
                }
                $(this).data("ctrlr").OnShowRecoverPassword()
            });
            $("#" + c).data("owner", this);
            $("#" + c).click(function() {
                l.Close()
            });
            if (!q) {
                $("#" + c).hide()
            } else {
                $("#" + c).show()
            }
        }
    };
    this.prepareFieldsTitles = function(d, c) {
        var a = $(d).val();
        var b = $(c).val();
        $(d).data("old_title", a);
        $(c).data("old_title", b);
        var e = function() {
            if ($(this).val() == $(this).data("old_title")) {
                $(this).val("")
            }
        };
        var f = function() {
            if ($(this).val() == "") {
                $(this).val($(this).data("old_title"))
            }
        };
        if (a != "") {
            $(d).focus(e);
            $(d).blur(f)
        }
        if (b != "") {
            $(c).focus(e);
            $(c).blur(f)
        }
    };
    this.signout = function() {
        if (isResponsive && $(window).width() < 800) {
            window.scrollTo(0, 0)
        }
        if (confirm("Do you want to logout", this, function(a, b) {
                if (a) {
                    serverQuery("/Handlers/Customer.ashx", {
                        action: "logout"
                    }, function(e, d, c) {
                        c.customerData = null;
                        c.drawUserMenu();
                        c.onSignout();
                        cart.cartHeader = {}
                    }, b)
                }
            })) {}
    };
    this.isLoggedIn = function() {
        return this.customerData != null
    };
    this.loginUsingFacebook = function(c) {
        var a = this;
        var b = c;
        getFacebookUserInfo(function(d, e) {
            if (d) {
                var f = $("#login_restorepwd").prop("checked");
                if (typeof f === "undefined") {
                    f = true
                }
                a.login(e.email, e.logintoken, f, {
                    ucallback: b
                }, function(g, j, h) {
                    if (g) {
                        h.ucallback()
                    } else {
                        if (!a.proceedToFacebookRegistration) {
                            alert(Translate("Unable to login using Facebook account, user not registered"))
                        } else {
                            a.OnShowRegisterCustomer(true, false)
                        }
                    }
                }, true, false)
            }
        })
    };
    this.loginUsingGoogle = function(c) {
        var b = this;
        var a = c;
        getGoogleUserInfo(function(d, e) {
            if (d) {
                var f = $("#login_restorepwd").prop("checked");
                if (typeof f === "undefined") {
                    f = true
                }
                b.login(e.email, "", f, {
                    ucallback: a
                }, function(g, j, h) {
                    if (g) {
                        h.ucallback()
                    } else {
                        if (!b.proceedToGoogleRegistration) {
                            alert(Translate("Unable to login using Google account, user not registered"))
                        } else {
                            b.OnShowRegisterCustomer(false, true)
                        }
                    }
                }, false, true)
            }
        })
    }
}
var _gaq = [];
var googleTag = [];
var GTM_dataLayer = [];
if (GoogleTrackingType == "Both" || GoogleTrackingType == "Analytics") {
    (function(d, e, j, h, f, c, b) {
        d.GoogleAnalyticsObject = f;
        d[f] = d[f] || function() {
            (d[f].q = d[f].q || []).push(arguments)
        }, d[f].l = 1 * new Date();
        c = e.createElement(j), b = e.getElementsByTagName(j)[0];
        c.async = 1;
        c.src = h;
        b.parentNode.insertBefore(c, b)
    })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
    ga("create", GoogleAnalyticsAccount, "auto");
    ga("require", "ec")
}
if (GoogleTrackingType == "Both" || GoogleTrackingType == "TagManager") {
    (function(b, m, h, a, g) {
        b[a] = b[a] || [];
        b[a].push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js"
        });
        var k = m.getElementsByTagName(h)[0],
            e = m.createElement(h),
            c = a != "dataLayer" ? "&l=" + a : "";
        e.async = true;
        e.src = "//www.googletagmanager.com/gtm.js?id=" + g + c;
        k.parentNode.insertBefore(e, k)
    })(window, document, "script", "GTM_dataLayer", GoogleTagManagerAccount)
}
googleTag.push = function(e) {
    if (GoogleTrackingType == "Both" || GoogleTrackingType == "TagManager") {
        GTM_dataLayer.push(e)
    }
    if (GoogleTrackingType == "Both" || GoogleTrackingType == "Analytics") {
        if (typeof e.PageURL !== "undefined") {
            this.page = e.PageURL
        }
        if (typeof e.event !== "undefined" && e.event == "PageView" && typeof e.PageURL !== "undefined") {
            ga("send", "pageview", e.PageURL)
        } else {
            if (typeof e.Category !== "undefined" && typeof e.event !== "undefined") {
                ga("send", "event", e.Category, e.event, e.Name, {
                    page: this.page
                })
            }
        }
        if (typeof e.event !== "undefined" && typeof e.ecommerce !== "undefined" && e.event == "purchase") {
            var a = e.ecommerce["purchase"]["actionField"];
            var d = e.ecommerce["purchase"]["products"];
            for (var c in d) {
                var b = d[c];
                ga("ec:addProduct", {
                    id: b.id,
                    name: b.name,
                    sku: b.id,
                    category: b.category,
                    price: b.price,
                    quantity: b.quantity,
                    currency: ""
                })
            }
            ga("ec:setAction", "purchase", {
                id: a.id,
                affiliation: "",
                revenue: a.revenue,
                shipping: 0,
                tax: 0,
                currency: ""
            })
        }
    }
    return Array.prototype.push.apply(this, arguments)
};

function GoogleTrack_getItemCategory(a) {
    for (var c in OriginalSubMenu) {
        var d = OriginalSubMenu[c];
        var b = d.Items;
        for (var f in b) {
            var e = b[f];
            if (e.ID == a) {
                return d.NameEN.replace("~", "")
            }
        }
    }
    return "Deals"
}

function GoogleTrack_getItemEnName(a, c) {
    if (!isNaN(a)) {
        if (typeof c === "undefined" || !c) {
            var d = OriginalItems[a];
            if (typeof d !== "undefined") {
                return d.NameEN
            }
        } else {
            var b = OriginalDeals[a];
            if (typeof b !== "undefined") {
                return b.NameEN
            }
        }
    }
}
"use strict";

function loadGoogleMapsJS(b) {
    if (typeof document.googleMapLoaded !== "undefined" && document.googleMapLoaded == true && typeof b !== "undefined") {
        b()
    } else {
        if (typeof document.googleMapLoading !== "undefined" && document.googleMapLoading && typeof b !== "undefined") {
            document.googleMapCallbacks.push(b)
        } else {
            if (typeof document.googleMapLoaded === "undefined") {
                var a = "";
                if (typeof GoogleMapsKey !== "undefined" && GoogleMapsKey != "") {
                    a = "&key=" + GoogleMapsKey
                }
                document.googleMapCallbacks = [];
                if (typeof b !== "undefined") {
                    document.googleMapCallbacks.push(b)
                }
                document.googleMapLoading = true;
                document.googleMapLoaded = false;
                document.__mapCallback = function() {
                    document.googleMapLoadeding = false;
                    document.googleMapLoaded = true;
                    if (typeof document.googleMapCallbacks !== "undefined") {
                        while (document.googleMapCallbacks.length > 0) {
                            var c = document.googleMapCallbacks.pop();
                            c()
                        }
                    }
                };
                loadScript("https://maps.googleapis.com/maps/api/js?v=3" + a + "&libraries=places&language=en&callback=document.__mapCallback", [function() {}])
            }
        }
    }
}

function getGPSLocation(b, a) {
    if (typeof a === "undefined") {
        a = false
    }
    document._gps_callback = b;
    if (typeof document._gps_location != "undefined") {
        if (typeof document._gps_callback !== "undefined" && document._gps_callback !== null) {
            document._gps_callback(document._gps_location)
        }
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(c) {
                document._gps_location = new google.maps.LatLng(c.coords.latitude, c.coords.longitude);
                if (typeof document._gps_callback !== "undefined" && document._gps_callback !== null) {
                    document._gps_callback(document._gps_location)
                }
            }, function(c) {
                if (ForceUsingGPS) {
                    if (a) {
                        switch (c.code) {
                            case c.PERMISSION_DENIED:
                            case c.TIMEOUT:
                                alert(Translate("GPS location service is not enabled, please enable it and refresh your browser to determine your current location."), 160);
                                break
                        }
                    }
                } else {
                    document._gps_location = new google.maps.LatLng(DefaultMapAddressLocation.split(",")[0].trim(), DefaultMapAddressLocation.split(",")[1].trim());
                    if (typeof document._gps_callback !== "undefined" && document._gps_callback !== null) {
                        document._gps_callback(document._gps_location)
                    }
                }
            }, {
                timeout: 7000,
                maximumAge: 60000
            })
        } else {
            if (typeof document._gps_callback !== "undefined" && document._gps_callback !== null) {
                document._gps_callback(document._gps_location)
            }
        }
    }
}

function GetPlaceName(c, b, d) {
    var a = new google.maps.places.PlacesService(c);
    a.nearbySearch({
        location: b,
        radius: 100,
        type: ["establishment"]
    }, function(f, e) {
        if (e === google.maps.places.PlacesServiceStatus.OK && f.length > 0) {
            a.getDetails({
                placeId: f[0]["place_id"]
            }, function(h, g) {
                if (g === google.maps.places.PlacesServiceStatus.OK) {
                    d(h.name)
                }
            })
        }
    })
}

function GetPlace(c, b, d) {
    var a = new google.maps.places.PlacesService(c);
    a.nearbySearch({
        location: b,
        radius: 100,
        type: ["establishment"]
    }, function(f, e) {
        if (e === google.maps.places.PlacesServiceStatus.OK && f.length > 0) {
            a.getDetails({
                placeId: f[0]["place_id"]
            }, function(h, g) {
                if (g === google.maps.places.PlacesServiceStatus.OK) {
                    d(h)
                }
            })
        }
    })
}

function createMap(b, a) {
    if (typeof document._map_Conainer === "undefined") {
        document._map_Conainer = $("<div></div>").get(0);
        $(b).append(document._map_Conainer);
        $(document._map_Conainer).height($(b).height());
        $(document._map_Conainer).width($(b).width());
        var c = new google.maps.Map(document._map_Conainer, {
            zoom: 6,
            center: a,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        document._map_ctrl = c
    } else {
        $(document._map_Conainer).detach();
        $(b).append(document._map_Conainer);
        document._map_ctrl.setCenter(a);
        c = document._map_ctrl
    }
    google.maps.event.trigger(c, "resize");
    return c
}

function isMapObjOfType(b, c) {
    if (typeof b.types === "undefined") {
        return false
    }
    for (var a in b.types) {
        if (b.types[a] == c) {
            return true
        }
    }
    return false
}

function isGPSEnabled() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(a) {
            return true
        }, function(a) {
            return false
        }, {
            timeout: 7000
        })
    } else {
        return false
    }
}

function AddressFromMap() {
    this.startLocationName = GoogleMapsCountry;
    this.pages = null;
    this.OnOk = null;
    this.OnCancel = null;
    this.width = 900;
    this.height = 520;
    this.APIKey = GoogleMapsKey;
    this.addressMarker = null;
    this.map = null;
    this.addressLatLng = null;
    this.addressLat = 0;
    this.addressLng = 0;
    this.placeID = null;
    this.place = null;
    this.init = function() {
        if (typeof document._map === "undefined") {
            document._map = this;
            document._showMap = function() {
                document._map.show_Form()
            };
            loadGoogleMapsJS(document._showMap)
        } else {
            document._map = this;
            this.show_Form()
        }
    };
    this.show_Form = function() {
        var f = this;
        this.popupObj = new PopupForm();
        this.popupObj.width = this.width;
        this.popupObj.height = this.height;
        this.popupObj.borderColor = "#83633D";
        this.popupObj.backgroundColor = "rgb(210, 210, 210)";
        var b = HTML_Pages.AddressOnMap_Main;
        this.popupObj.container.html(b);
        var c = true;
        this.addressLatLng = new google.maps.LatLng(0, 0);
        if (typeof this.addressLat !== "undefined" && this.addressLat != null && this.addressLat != 0) {
            this.addressLatLng = new google.maps.LatLng(this.addressLat, this.addressLng);
            c = false
        }
        var e = createMap($("#address_map").get(0), this.addressLatLng);
        this.map = e;
        e.setZoom(6);
        this.popupObj.Show();
        google.maps.event.trigger(e, "resize");
        if (c) {
            var a = new google.maps.places.PlacesService(e);
            a.textSearch({
                query: this.startLocationName
            }, function(k, h) {
                if (h == google.maps.places.PlacesServiceStatus.OK) {
                    for (var j = 0; j < k.length; j++) {
                        var g = k[j];
                        var l = g.geometry.location;
                        f.addressLatLng = l;
                        f.addressMarker = new google.maps.Marker({
                            map: f.map,
                            draggable: true,
                            animation: google.maps.Animation.DROP,
                            position: f.addressLatLng
                        });
                        google.maps.event.addListener(f.addressMarker, "dragend", function(m) {
                            f.placeID = null
                        });
                        e.setCenter(l);
                        f.setUsingGPS();
                        break
                    }
                }
            })
        } else {
            this.addressMarker = new google.maps.Marker({
                map: this.map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: this.addressLatLng
            });
            google.maps.event.addListener(this.addressMarker, "dragend", function(g) {
                f.placeID = null
            });
            e.setCenter(this.addressLatLng);
            e.setZoom(17)
        }
        google.maps.event.addListener(e, "click", function(g) {
            f.addressMarker.setPosition(g.latLng);
            f.placeID = g.placeId
        });
        var d = new google.maps.places.Autocomplete($("#AddressOnMap_Search").get(0), {
            componentRestrictions: {
                country: GoogleMapsCountryCode
            }
        });
        d.bindTo("bounds", e);
        this.autocomplete = d;
        google.maps.event.addListener(d, "place_changed", function() {
            var g = d.getPlace();
            if (!g.geometry) {
                return
            }
            if (g.geometry.viewport) {
                e.fitBounds(g.geometry.viewport)
            } else {
                e.setCenter(g.geometry.location);
                e.setZoom(17)
            }
            f.addressLatLng = g.geometry.location;
            f.addressMarker.setPosition(f.addressLatLng);
            f.placeID = g.place_id;
            f.place = g
        });
        $("#AddressOnMap_Ok").data("ctrlr", this);
        $("#AddressOnMap_Ok").click(function() {
            $(this).data("ctrlr").OkClicked();
            googleTag.push({
                event: "Submit",
                Category: "Address Using Map",
                ElementType: "",
                ID: "",
                Name: ""
            })
        });
        $("#AddressOnMap_Cancel").data("ctrlr", this);
        $("#AddressOnMap_Cancel").click(function() {
            $(this).data("ctrlr").disposeItems();
            $(this).data("ctrlr").popupObj.Close();
            if ($(this).data("ctrlr").OnCancel != null) {
                $(this).data("ctrlr").OnCancel()
            }
            googleTag.push({
                event: "Cancel",
                Category: "Address Using Map",
                ElementType: "",
                ID: "",
                Name: ""
            })
        });
        googleTag.push({
            event: "Open",
            Category: "Address Using Map",
            ElementType: "",
            ID: "",
            Name: ""
        });
        $(".pac-container").css("zIndex", getTopmostZIndex() + 99)
    };
    this.setUsingGPS = function() {
        var a = this;
        if (navigator.geolocation) {
            getGPSLocation(function(b) {
                a.addressLatLng = b;
                a.addressMarker.setPosition(b);
                a.map.setCenter(b);
                a.map.setZoom(16)
            })
        }
    };
    this.disposeItems = function() {
        google.maps.event.clearListeners(this.autocomplete, "place_changed");
        this.autocomplete.unbindAll();
        $(".pac-container").remove();
        if (this.addressMarker != null) {
            google.maps.event.clearListeners(this.addressMarker, "click");
            this.addressMarker.setMap(null);
            this.addressMarker.unbindAll()
        }
        google.maps.event.clearListeners(this.map, "click");
        this.map.unbindAll();
        this.addressMarker = null;
        this.map = null;
        this.addressLatLng = null;
        this.autocomplete = null
    };
    this.OkClicked = function() {
        if (this.addressLatLng == null) {
            alert("Please mark your location first");
            return
        }
        this.addressLatLng = this.addressMarker.getPosition();
        var c = this;
        if (this.placeID != null) {
            var a = new google.maps.places.PlacesService(this.map);
            a.getDetails({
                placeId: this.placeID
            }, function(g, f) {
                if (f === google.maps.places.PlacesServiceStatus.OK) {
                    var e = g;
                    var h = {};
                    h.Country = "";
                    h.CountryCode = "";
                    h.PostCode = "";
                    h.Province = "";
                    h.City = "";
                    h.District = "";
                    h.Block = "";
                    h.Route = "";
                    h.Street = "";
                    h.Building = "";
                    h.latitude = c.addressLatLng.lat();
                    h.longitude = c.addressLatLng.lng();
                    h.addressText = g.formatted_address;
                    h.PlaceID = g.place_id;
                    h.Place = g;
                    for (var d in g.address_components) {
                        var j = g.address_components[d];
                        if (j.types.length == 0) {
                            continue
                        }
                        if (isMapObjOfType(j, "country") && h.Country == "") {
                            h.Country = j.long_name;
                            h.CountryCode = j.short_name
                        } else {
                            if (isMapObjOfType(j, "postal_code") && h.PostCode == "") {
                                h.PostCode = j.long_name
                            } else {
                                if (isMapObjOfType(j, "administrative_area_level_1") && h.Province == "") {
                                    h.Province = j.long_name
                                } else {
                                    if (isMapObjOfType(j, "administrative_area_level_2") && h.District == "") {
                                        h.District = j.long_name
                                    } else {
                                        if (isMapObjOfType(j, "locality") && h.City == "") {
                                            h.City = j.long_name
                                        } else {
                                            if (isMapObjOfType(j, "sublocality") && h.District == "") {
                                                h.District = j.long_name;
                                                h.Block = j.long_name
                                            } else {
                                                if (isMapObjOfType(j, "neighborhood") && h.Block == "") {
                                                    h.Block = j.long_name
                                                } else {
                                                    if (isMapObjOfType(j, "route") && h.Route == "") {
                                                        h.Route = j.long_name
                                                    } else {
                                                        if (isMapObjOfType(j, "street_number") && h.Street == "") {
                                                            h.Street = j.long_name
                                                        } else {
                                                            if (isMapObjOfType(j, "premise") && h.Building == "") {
                                                                h.Building = j.long_name
                                                            } else {
                                                                if (isMapObjOfType(j, "establishment") && h.Building == "") {
                                                                    h.Building = j.long_name
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if ((isMapObjOfType(g, "establishment") || isMapObjOfType(g, "premise")) && h.Building == "") {
                        h.Building = g.name
                    }
                    c.disposeItems();
                    c.popupObj.Close();
                    if (typeof AddressFromMap.OnOverrideResult !== "undefined" && AddressFromMap.OnOverrideResult != null) {
                        h = AddressFromMap.OnOverrideResult(h)
                    }
                    if (c.OnOk != null) {
                        c.OnOk(h)
                    }
                } else {
                    alert("The current selected location is not a valid address")
                }
            })
        } else {
            var b = new google.maps.Geocoder();
            b.geocode({
                latLng: this.addressLatLng
            }, function(g, e) {
                if (e == google.maps.GeocoderStatus.OK && g.length > 0) {
                    var f = {};
                    f.Country = "";
                    f.CountryCode = "";
                    f.PostCode = "";
                    f.Province = "";
                    f.City = "";
                    f.District = "";
                    f.Block = "";
                    f.Route = "";
                    f.Street = "";
                    f.Building = "";
                    f.latitude = c.addressLatLng.lat();
                    f.longitude = c.addressLatLng.lng();
                    f.addressText = g[0].formatted_address;
                    for (var k = g.length - 1; k >= 0; k--) {
                        var j = g[k];
                        for (var d in j.address_components) {
                            var h = j.address_components[d];
                            if (h.types.length == 0) {
                                continue
                            }
                            if (isMapObjOfType(h, "country") && f.Country == "") {
                                f.Country = h.long_name;
                                f.CountryCode = h.short_name
                            } else {
                                if (isMapObjOfType(h, "postal_code") && f.PostCode == "") {
                                    f.PostCode = h.long_name
                                } else {
                                    if (isMapObjOfType(h, "administrative_area_level_1") && f.Province == "") {
                                        f.Province = h.long_name
                                    } else {
                                        if (isMapObjOfType(h, "administrative_area_level_2") && f.District == "") {
                                            f.District = h.long_name
                                        } else {
                                            if (isMapObjOfType(h, "locality") && f.City == "") {
                                                f.City = h.long_name
                                            } else {
                                                if (isMapObjOfType(h, "sublocality") && f.District == "") {
                                                    f.District = h.long_name
                                                } else {
                                                    if (isMapObjOfType(h, "neighborhood") && f.Block == "") {
                                                        f.Block = h.long_name
                                                    } else {
                                                        if (isMapObjOfType(h, "route") && f.Route == "") {
                                                            f.Route = h.long_name
                                                        } else {
                                                            if (isMapObjOfType(h, "street_number") && f.Street == "") {
                                                                f.Street = h.long_name
                                                            } else {
                                                                if (isMapObjOfType(h, "premise") && f.Building == "") {
                                                                    f.Building = h.long_name
                                                                } else {
                                                                    if (isMapObjOfType(h, "establishment") && f.Building == "") {
                                                                        f.Building = h.long_name
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    c.disposeItems();
                    c.popupObj.Close();
                    if (typeof AddressFromMap.OnOverrideResult !== "undefined" && AddressFromMap.OnOverrideResult != null) {
                        f = AddressFromMap.OnOverrideResult(f)
                    }
                    if (c.OnOk != null) {
                        c.OnOk(f)
                    }
                } else {
                    alert("The current selected location is not a valid address")
                }
            })
        }
    }
}

function PopupAdvert(b) {
    this.popupObj = new PopupForm();
    if (typeof b.message === "undefined") {
        this.msg = b.toString()
    } else {
        this.msg = b.message
    }
    if (typeof b.width !== "undefined") {
        this.popupObj.width = b.width
    } else {
        this.popupObj.width = 450
    }
    if (typeof b.height !== "undefined") {
        this.popupObj.height = b.height
    } else {
        this.popupObj.height = 190
    }
    if (b.page == "CustomerRegistration_ActivationSuccessBallon") {
        this.popupObj.container.addClass("actvPopup")
    }
    var a = this.popupObj;
    this.popupObj.containerWrapper.click(function() {
        a.Close()
    });
    this.popupObj.shadow.click(function() {
        a.Close()
    });
    this.Show = function() {
        var d = genActionLink({
            ctrlr: this
        }, function(e) {
            e.ctrlr.Close()
        });
        var c = "<div style='width:100%;text-align:center;font-size:35px;word-wrap:break-word;line-height:normal;'>" + this.msg + "</div>";
        this.popupObj.container.html(c);
        this.popupObj.Show()
    };
    this.Close = function() {
        this.popupObj.Close()
    };
    this.Show()
}

function Alert(h, e, c, f, g, a, j, d, b) {
    if (typeof g === "undefined" || g == null) {
        g = 150
    }
    if (typeof a === "undefined" || a == null) {
        a = 320
    }
    this.closeText = Translate("Close");
    this.okText = Translate("Ok");
    this.cancelText = Translate("Cancel");
    if (typeof j !== "undefined" && j != null) {
        this.okText = j
    }
    if (typeof b !== "undefined" && b != null) {
        this.closeText = b
    }
    if (typeof d !== "undefined" && d != null) {
        this.cancelText = d
    }
    this.popupObj = new PopupForm();
    this.popupObj.width = a;
    this.popupObj.height = g;
    this.popupObj.containerStyle = "alertPage";
    this.faction = c;
    this.factionparam = f;
    if (typeof dialogType === "undefined") {
        dialogType = 0
    }
    this.Show = function(q, r) {
        if (typeof document._popupDialog_Open === "undefined") {
            document._popupDialog_Open = false
        }
        if (document._popupDialog_Open && document._popupDialog_msg == q) {
            return
        }
        document._popupDialog_Open = true;
        document._popupDialog_msg = q;
        var m = genActionLink({
            ctrlr: this
        }, function(t) {
            t.ctrlr.Close();
            if (typeof t.ctrlr.faction === "function") {
                t.ctrlr.faction(false, t.ctrlr.factionparam)
            }
        });
        var k = genActionLink({
            ctrlr: this
        }, function(t) {
            t.ctrlr.Close();
            if (typeof t.ctrlr.faction === "function") {
                t.ctrlr.faction(true, t.ctrlr.factionparam)
            }
        });
        var p = "";
        var o = "";
        var s = createUUID();
        if (r == 0) {
            o = "info.png";
            p = "<a id='" + s + "' class='clearbutton reducedAddButton' style='padding:7px;position:relative;top:5px;display:inline-block;text-align:center;width:auto; max-width: " + a + "px; font-size:13px;' href='" + k + "'>" + this.closeText + "</a>"
        } else {
            if (r == 2) {
                o = "info.png";
                p = "<a id='" + s + " 'class='clearbutton reducedAddButton' style='padding:7px;position:relative;top:5px;display:inline-block;text-align:center;width:70px;font-size:13px' href='" + k + "'>" + this.closeText + "</a>"
            } else {
                if (r == 1) {
                    o = "question.png";
                    p = "<a id='" + s + "' class='clearbutton reducedAddButton buttonBlack' style='padding:7px;position:relative;top:5px;display:inline-block;text-align:center;padding-left:5px;padding-right:5px;margin-right:5px;font-size:13px;width:70px;' href='" + k + "'>" + this.okText + "</a>&nbsp;<a class='clearbutton2 counterAdjustButtons buttonBlack2' style='position:relative;top:5px;display:inline-block;text-align:center;padding:7px;font-size:13px; width:70px;color:#FFFFFF;padding: 10px 20px 10px 20px !important;' href='" + m + "'>" + this.cancelText + "</a>"
                }
            }
        }
        var l = "<div style='position:relative;height:100%;width:100%;'><div id='popup_message_content' class='blackmsg' style='line-height:16px;font-weight:bold;position:absolute;left:70px;right:10px;top:10px;bottom:60px;padding-top:10px;overflow:auto;color:#000000;font-size:13px;'>" + q.replace(/\n/gi, "<br/>") + "</div><img style='position:absolute;width:48px;height:48px;left:10px;top:10px;' src='/Images/SharedImages/" + o + "' /><div class='alertHT' style='position:absolute;height:50px;left:0px;right:20px;bottom:0px;text-align:right;'>" + p + "</div></div>";
        this.popupObj.container.html(l);
        this.popupObj.Show();
        $("#" + s).focus()
    };
    this.Close = function() {
        document._popupDialog_Open = false;
        document._popupDialog_msg = "";
        this.popupObj.Close()
    };
    this.Show(h, e)
}

function alert(d, b, c, a) {
    new Alert(Translate(d), 0, null, null, b, c, null, null, a)
}

function warn(c, a, b) {
    new Alert(Translate(c), 2, null, null, a, b)
}

function confirm(f, d, g, b, e, a, c) {
    new Alert(Translate(f), 1, g, d, b, e, a, c, null)
}
"use strict";

function Announcement(a) {
    AnnouncementNotify(a)
}

function AnnouncementDlg(d) {
    var c = new PopupForm();
    c.width = 600;
    c.height = 350;
    var a = createUUID();
    var b = HTML_Pages.announce;
    b = b.replace(/#TEXT#/gi, d.replace(/<(?:.|\n)*?>/gm, ""));
    b = b.replace(/#CLOSE#/gi, a);
    c.container.html(b);
    $("#" + a).data("popup", c);
    $("#" + a).click(function() {
        $(this).data("popup").Close()
    });
    c.Show();
    UpdateScrolls()
}

function AnnouncementNotify(c) {
    if (typeof document.prev_announc !== "undefined" && document.prev_announc != null) {
        document.prev_announc.slideUp()
    }
    var a = createUUID();
    var b = HTML_Pages.Notification;
    c = c.replace(/\n/gm, "<br />");
    b = b.replace(/#MESSAGE#/gi, c.replace(/\n/gi, ""));
    b = b.replace(/#CLOSE#/gi, a);
    var d = $(b);
    d.css("display", "none");
    d.css("position", "fixed");
    d.css("left", "15px");
    d.css("bottom", "80px");
    d.css("zIndex", getTopmostZIndex() + 1);
    $(document.body).append(d);
    d.delay(0).slideDown();
    document.prev_announc = d;
    $("#" + a).click(function() {
        document.prev_announc.slideUp();
        document.prev_announc = null
    });
    setTimeout(function() {
        if (typeof document.prev_announc !== "undefined" && document.prev_announc != null) {
            document.prev_announc.slideUp();
            document.prev_announc = null
        }
    }, 10000)
}

function Careers() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.onClose = null;
    this.Show = function() {
        this.DrawContact()
    };
    this.DrawContact = function() {
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        var a = this.pages.Careers_Main;
        $(this.pagesContainer).html(a);
        var c = this;
        $("#career_send").click(function() {
            c.send_click()
        });
        $("#resume").change(function() {
            var d = $("#resume");
            $("#selectedFile").html(d[0].value)
        });
        $("#career_close").click(function() {
            c.close_click()
        });
        $.mask.definitions["#"] = "[_ 0-9]";
        $("#phone1type").change(function() {
            var d = $("#phone1type").val();
            $("#career_telephone").val("").prop("readonly", (d == -1)).mask(PhoneMasks[d]);
            if ((d == -1) || (d == 2)) {
                $("#lblPhone1Ext").prop("disabled", true);
                $("#phone1ext").prop("disabled", true)
            } else {
                $("#lblPhone1Ext").removeAttr("disabled");
                $("#phone1ext").removeAttr("disabled")
            }
        }).val(DefPhoneType).change();
        if (userLogin.isLoggedIn()) {
            var b = userLogin.customerData;
            $("#career_fname").val(b.FirstName);
            $("#career_lname").val(b.LastName);
            $("#career_email").val(b.EMail);
            $("#phone1type").val(b.PhoneType);
            $("#career_telephone").val(b.PhoneNumber);
            $("#phone1ext").val(b.PhoneExtension)
        }
        if (this.afterShowPage != null) {
            this.afterShowPage(2)
        }
    };
    this.DrawThanks = function() {
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        var a = this.pages.Careers_Thanks;
        $(this.pagesContainer).html(a);
        $("#career_close").data("ctrlr", this);
        $("#career_close").click(function() {
            $(this).data("ctrlr").close_click()
        });
        if (this.afterShowPage != null) {
            this.afterShowPage(1)
        }
    };
    this.send_click = function() {
        var b = {
            Action: "career",
            contact_fname: $("#career_fname").val(),
            contact_lname: $("#career_lname").val(),
            contact_email: $("#career_email").val(),
            contact_phoneType: $("#phone1type").val(),
            contact_telephone: $("#career_telephone").val(),
            contact_phoneExt: $("#phone1ext").val(),
            contact_comment: $("#career_comment").val()
        };
        if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($("#career_email").val())) {
            alert("Please enter a valid email");
            return
        }
        if (b.contact_fname == "" || b.contact_email == "" || b.contact_telephone == "" || $("#resume").val() == "") {
            alert("Please enter all the required fields.");
            return
        }
        b = JSON.stringify(b);
        var a = $("#career_form");
        a.attr("action", "/Handlers/Career.ashx");
        a.attr("method", "post");
        $("#json_query").val(b);
        $("#career_send").attr("disabled", "disabled");
        a.submit(function() {
            $(this).ajaxSubmit();
            $("#career_send").removeAttr("disabled");
            return false
        });
        a.submit();
        this.DrawThanks();
        return false
    };
    this.close_click = function() {
        if (this.onClose != null) {
            this.onClose()
        }
    }
}
/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
;
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("undefined" != typeof jQuery ? jQuery : window.Zepto)
}(function(e) {
    function t(t) {
        var r = t.data;
        t.isDefaultPrevented() || (t.preventDefault(), e(t.target).ajaxSubmit(r))
    }

    function r(t) {
        var r = t.target,
            a = e(r);
        if (!a.is("[type=submit],[type=image]")) {
            var n = a.closest("[type=submit]");
            if (0 === n.length) {
                return
            }
            r = n[0]
        }
        var i = this;
        if (i.clk = r, "image" == r.type) {
            if (void 0 !== t.offsetX) {
                i.clk_x = t.offsetX, i.clk_y = t.offsetY
            } else {
                if ("function" == typeof e.fn.offset) {
                    var o = a.offset();
                    i.clk_x = t.pageX - o.left, i.clk_y = t.pageY - o.top
                } else {
                    i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop
                }
            }
        }
        setTimeout(function() {
            i.clk = i.clk_x = i.clk_y = null
        }, 100)
    }

    function a() {
        if (e.fn.ajaxSubmit.debug) {
            var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
        }
    }
    var n = {};
    n.fileapi = void 0 !== e("<input type='file'/>").get(0).files, n.formdata = void 0 !== window.FormData;
    var i = !!e.fn.prop;
    e.fn.attr2 = function() {
        if (!i) {
            return this.attr.apply(this, arguments)
        }
        var e = this.prop.apply(this, arguments);
        return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
    }, e.fn.ajaxSubmit = function(t) {
        function r(r) {
            var a, n, i = e.param(r, t.traditional).split("&"),
                o = i.length,
                s = [];
            for (a = 0; o > a; a++) {
                i[a] = i[a].replace(/\+/g, " "), n = i[a].split("="), s.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])])
            }
            return s
        }

        function o(a) {
            for (var n = new FormData, i = 0; i < a.length; i++) {
                n.append(a[i].name, a[i].value)
            }
            if (t.extraData) {
                var o = r(t.extraData);
                for (i = 0; i < o.length; i++) {
                    o[i] && n.append(o[i][0], o[i][1])
                }
            }
            t.data = null;
            var s = e.extend(!0, {}, e.ajaxSettings, t, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: u || "POST"
            });
            t.uploadProgress && (s.xhr = function() {
                var r = e.ajaxSettings.xhr();
                return r.upload && r.upload.addEventListener("progress", function(e) {
                    var r = 0,
                        a = e.loaded || e.position,
                        n = e.total;
                    e.lengthComputable && (r = Math.ceil(a / n * 100)), t.uploadProgress(e, a, n, r)
                }, !1), r
            }), s.data = null;
            var c = s.beforeSend;
            return s.beforeSend = function(e, r) {
                r.data = t.formData ? t.formData : n, c && c.call(this, e, r)
            }, e.ajax(s)
        }

        function s(r) {
            function n(e) {
                var t = null;
                try {
                    e.contentWindow && (t = e.contentWindow.document)
                } catch (r) {
                    a("cannot get iframe.contentWindow document: " + r)
                }
                if (t) {
                    return t
                }
                try {
                    t = e.contentDocument ? e.contentDocument : e.document
                } catch (r) {
                    a("cannot get iframe.contentDocument: " + r), t = e.document
                }
                return t
            }

            function o() {
                function t() {
                    try {
                        var e = n(g).readyState;
                        a("state = " + e), e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50)
                    } catch (r) {
                        a("Server abort: ", r, " (", r.name, ")"), s(k), j && clearTimeout(j), j = void 0
                    }
                }
                var r = f.attr2("target"),
                    i = f.attr2("action"),
                    o = "multipart/form-data",
                    c = f.attr("enctype") || f.attr("encoding") || o;
                w.setAttribute("target", p), (!u || /post/i.test(u)) && w.setAttribute("method", "POST"), i != m.url && w.setAttribute("action", m.url), m.skipEncodingOverride || u && !/post/i.test(u) || f.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), m.timeout && (j = setTimeout(function() {
                    T = !0, s(D)
                }, m.timeout));
                var l = [];
                try {
                    if (m.extraData) {
                        for (var d in m.extraData) {
                            m.extraData.hasOwnProperty(d) && l.push(e.isPlainObject(m.extraData[d]) && m.extraData[d].hasOwnProperty("name") && m.extraData[d].hasOwnProperty("value") ? e('<input type="hidden" name="' + m.extraData[d].name + '">').val(m.extraData[d].value).appendTo(w)[0] : e('<input type="hidden" name="' + d + '">').val(m.extraData[d]).appendTo(w)[0])
                        }
                    }
                    m.iframeTarget || v.appendTo("body"), g.attachEvent ? g.attachEvent("onload", s) : g.addEventListener("load", s, !1), setTimeout(t, 15);
                    try {
                        w.submit()
                    } catch (h) {
                        var x = document.createElement("form").submit;
                        x.apply(w)
                    }
                } finally {
                    w.setAttribute("action", i), w.setAttribute("enctype", c), r ? w.setAttribute("target", r) : f.removeAttr("target"), e(l).remove()
                }
            }

            function s(t) {
                if (!x.aborted && !F) {
                    if (M = n(g), M || (a("cannot access response document"), t = k), t === D && x) {
                        return x.abort("timeout"), void S.reject(x, "timeout")
                    }
                    if (t == k && x) {
                        return x.abort("server abort"), void S.reject(x, "error", "server abort")
                    }
                    if (M && M.location.href != m.iframeSrc || T) {
                        g.detachEvent ? g.detachEvent("onload", s) : g.removeEventListener("load", s, !1);
                        var r, i = "success";
                        try {
                            if (T) {
                                throw "timeout"
                            }
                            var o = "xml" == m.dataType || M.XMLDocument || e.isXMLDoc(M);
                            if (a("isXml=" + o), !o && window.opera && (null === M.body || !M.body.innerHTML) && --O) {
                                return a("requeing onLoad callback, DOM not available"), void setTimeout(s, 250)
                            }
                            var u = M.body ? M.body : M.documentElement;
                            x.responseText = u ? u.innerHTML : null, x.responseXML = M.XMLDocument ? M.XMLDocument : M, o && (m.dataType = "xml"), x.getResponseHeader = function(e) {
                                var t = {
                                    "content-type": m.dataType
                                };
                                return t[e.toLowerCase()]
                            }, u && (x.status = Number(u.getAttribute("status")) || x.status, x.statusText = u.getAttribute("statusText") || x.statusText);
                            var c = (m.dataType || "").toLowerCase(),
                                l = /(json|script|text)/.test(c);
                            if (l || m.textarea) {
                                var f = M.getElementsByTagName("textarea")[0];
                                if (f) {
                                    x.responseText = f.value, x.status = Number(f.getAttribute("status")) || x.status, x.statusText = f.getAttribute("statusText") || x.statusText
                                } else {
                                    if (l) {
                                        var p = M.getElementsByTagName("pre")[0],
                                            h = M.getElementsByTagName("body")[0];
                                        p ? x.responseText = p.textContent ? p.textContent : p.innerText : h && (x.responseText = h.textContent ? h.textContent : h.innerText)
                                    }
                                }
                            } else {
                                "xml" == c && !x.responseXML && x.responseText && (x.responseXML = X(x.responseText))
                            }
                            try {
                                E = _(x, c, m)
                            } catch (y) {
                                i = "parsererror", x.error = r = y || i
                            }
                        } catch (y) {
                            a("error caught: ", y), i = "error", x.error = r = y || i
                        }
                        x.aborted && (a("upload aborted"), i = null), x.status && (i = x.status >= 200 && x.status < 300 || 304 === x.status ? "success" : "error"), "success" === i ? (m.success && m.success.call(m.context, E, "success", x), S.resolve(x.responseText, "success", x), d && e.event.trigger("ajaxSuccess", [x, m])) : i && (void 0 === r && (r = x.statusText), m.error && m.error.call(m.context, x, i, r), S.reject(x, "error", r), d && e.event.trigger("ajaxError", [x, m, r])), d && e.event.trigger("ajaxComplete", [x, m]), d && !--e.active && e.event.trigger("ajaxStop"), m.complete && m.complete.call(m.context, x, i), F = !0, m.timeout && clearTimeout(j), setTimeout(function() {
                            m.iframeTarget ? v.attr("src", m.iframeSrc) : v.remove(), x.responseXML = null
                        }, 100)
                    }
                }
            }
            var c, l, m, d, p, v, g, x, y, b, T, j, w = f[0],
                S = e.Deferred();
            if (S.abort = function(e) {
                    x.abort(e)
                }, r) {
                for (l = 0; l < h.length; l++) {
                    c = e(h[l]), i ? c.prop("disabled", !1) : c.removeAttr("disabled")
                }
            }
            if (m = e.extend(!0, {}, e.ajaxSettings, t), m.context = m.context || m, p = "jqFormIO" + (new Date).getTime(), m.iframeTarget ? (v = e(m.iframeTarget), b = v.attr2("name"), b ? p = b : v.attr2("name", p)) : (v = e('<iframe name="' + p + '" src="' + m.iframeSrc + '" />'), v.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })), g = v[0], x = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function() {},
                    getResponseHeader: function() {},
                    setRequestHeader: function() {},
                    abort: function(t) {
                        var r = "timeout" === t ? "timeout" : "aborted";
                        a("aborting upload... " + r), this.aborted = 1;
                        try {
                            g.contentWindow.document.execCommand && g.contentWindow.document.execCommand("Stop")
                        } catch (n) {}
                        v.attr("src", m.iframeSrc), x.error = r, m.error && m.error.call(m.context, x, r, t), d && e.event.trigger("ajaxError", [x, m, r]), m.complete && m.complete.call(m.context, x, r)
                    }
                }, d = m.global, d && 0 === e.active++ && e.event.trigger("ajaxStart"), d && e.event.trigger("ajaxSend", [x, m]), m.beforeSend && m.beforeSend.call(m.context, x, m) === !1) {
                return m.global && e.active--, S.reject(), S
            }
            if (x.aborted) {
                return S.reject(), S
            }
            y = w.clk, y && (b = y.name, b && !y.disabled && (m.extraData = m.extraData || {}, m.extraData[b] = y.value, "image" == y.type && (m.extraData[b + ".x"] = w.clk_x, m.extraData[b + ".y"] = w.clk_y)));
            var D = 1,
                k = 2,
                A = e("meta[name=csrf-token]").attr("content"),
                L = e("meta[name=csrf-param]").attr("content");
            L && A && (m.extraData = m.extraData || {}, m.extraData[L] = A), m.forceSync ? o() : setTimeout(o, 10);
            var E, M, F, O = 50,
                X = e.parseXML || function(e, t) {
                    return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
                },
                C = e.parseJSON || function(e) {
                    return window.eval("(" + e + ")")
                },
                _ = function(t, r, a) {
                    var n = t.getResponseHeader("content-type") || "",
                        i = "xml" === r || !r && n.indexOf("xml") >= 0,
                        o = i ? t.responseXML : t.responseText;
                    return i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"), a && a.dataFilter && (o = a.dataFilter(o, r)), "string" == typeof o && ("json" === r || !r && n.indexOf("json") >= 0 ? o = C(o) : ("script" === r || !r && n.indexOf("javascript") >= 0) && e.globalEval(o)), o
                };
            return S
        }
        if (!this.length) {
            return a("ajaxSubmit: skipping submit process - no element selected"), this
        }
        var u, c, l, f = this;
        "function" == typeof t ? t = {
            success: t
        } : void 0 === t && (t = {}), u = t.type || this.attr2("method"), c = t.url || this.attr2("action"), l = "string" == typeof c ? e.trim(c) : "", l = l || window.location.href || "", l && (l = (l.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, {
            url: l,
            success: e.ajaxSettings.success,
            type: u || e.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, t);
        var m = {};
        if (this.trigger("form-pre-serialize", [this, t, m]), m.veto) {
            return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this
        }
        if (t.beforeSerialize && t.beforeSerialize(this, t) === !1) {
            return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this
        }
        var d = t.traditional;
        void 0 === d && (d = e.ajaxSettings.traditional);
        var p, h = [],
            v = this.formToArray(t.semantic, h);
        if (t.data && (t.extraData = t.data, p = e.param(t.data, d)), t.beforeSubmit && t.beforeSubmit(v, this, t) === !1) {
            return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this
        }
        if (this.trigger("form-submit-validate", [v, this, t, m]), m.veto) {
            return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this
        }
        var g = e.param(v, d);
        p && (g = g ? g + "&" + p : p), "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + g, t.data = null) : t.data = g;
        var x = [];
        if (t.resetForm && x.push(function() {
                f.resetForm()
            }), t.clearForm && x.push(function() {
                f.clearForm(t.includeHidden)
            }), !t.dataType && t.target) {
            var y = t.success || function() {};
            x.push(function(r) {
                var a = t.replaceTarget ? "replaceWith" : "html";
                e(t.target)[a](r).each(y, arguments)
            })
        } else {
            t.success && x.push(t.success)
        }
        if (t.success = function(e, r, a) {
                for (var n = t.context || this, i = 0, o = x.length; o > i; i++) {
                    x[i].apply(n, [e, r, a || f, f])
                }
            }, t.error) {
            var b = t.error;
            t.error = function(e, r, a) {
                var n = t.context || this;
                b.apply(n, [e, r, a, f])
            }
        }
        if (t.complete) {
            var T = t.complete;
            t.complete = function(e, r) {
                var a = t.context || this;
                T.apply(a, [e, r, f])
            }
        }
        var j = e("input[type=file]:enabled", this).filter(function() {
                return "" !== e(this).val()
            }),
            w = j.length > 0,
            S = "multipart/form-data",
            D = f.attr("enctype") == S || f.attr("encoding") == S,
            k = n.fileapi && n.formdata;
        a("fileAPI :" + k);
        var A, L = (w || D) && !k;
        t.iframe !== !1 && (t.iframe || L) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function() {
            A = s(v)
        }) : A = s(v) : A = (w || D) && k ? o(v) : e.ajax(t), f.removeData("jqxhr").data("jqxhr", A);
        for (var E = 0; E < h.length; E++) {
            h[E] = null
        }
        return this.trigger("form-submit-notify", [this, t]), this
    }, e.fn.ajaxForm = function(n) {
        if (n = n || {}, n.delegation = n.delegation && e.isFunction(e.fn.on), !n.delegation && 0 === this.length) {
            var i = {
                s: this.selector,
                c: this.context
            };
            return !e.isReady && i.s ? (a("DOM not ready, queuing ajaxForm"), e(function() {
                e(i.s, i.c).ajaxForm(n)
            }), this) : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this)
        }
        return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this) : this.ajaxFormUnbind().bind("submit.form-plugin", n, t).bind("click.form-plugin", n, r)
    }, e.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    }, e.fn.formToArray = function(t, r) {
        var a = [];
        if (0 === this.length) {
            return a
        }
        var i, o = this[0],
            s = this.attr("id"),
            u = t ? o.getElementsByTagName("*") : o.elements;
        if (u && !/MSIE [678]/.test(navigator.userAgent) && (u = e(u).get()), s && (i = e(':input[form="' + s + '"]').get(), i.length && (u = (u || []).concat(i))), !u || !u.length) {
            return a
        }
        var c, l, f, m, d, p, h;
        for (c = 0, p = u.length; p > c; c++) {
            if (d = u[c], f = d.name, f && !d.disabled) {
                if (t && o.clk && "image" == d.type) {
                    o.clk == d && (a.push({
                        name: f,
                        value: e(d).val(),
                        type: d.type
                    }), a.push({
                        name: f + ".x",
                        value: o.clk_x
                    }, {
                        name: f + ".y",
                        value: o.clk_y
                    }))
                } else {
                    if (m = e.fieldValue(d, !0), m && m.constructor == Array) {
                        for (r && r.push(d), l = 0, h = m.length; h > l; l++) {
                            a.push({
                                name: f,
                                value: m[l]
                            })
                        }
                    } else {
                        if (n.fileapi && "file" == d.type) {
                            r && r.push(d);
                            var v = d.files;
                            if (v.length) {
                                for (l = 0; l < v.length; l++) {
                                    a.push({
                                        name: f,
                                        value: v[l],
                                        type: d.type
                                    })
                                }
                            } else {
                                a.push({
                                    name: f,
                                    value: "",
                                    type: d.type
                                })
                            }
                        } else {
                            null !== m && "undefined" != typeof m && (r && r.push(d), a.push({
                                name: f,
                                value: m,
                                type: d.type,
                                required: d.required
                            }))
                        }
                    }
                }
            }
        }
        if (!t && o.clk) {
            var g = e(o.clk),
                x = g[0];
            f = x.name, f && !x.disabled && "image" == x.type && (a.push({
                name: f,
                value: g.val()
            }), a.push({
                name: f + ".x",
                value: o.clk_x
            }, {
                name: f + ".y",
                value: o.clk_y
            }))
        }
        return a
    }, e.fn.formSerialize = function(t) {
        return e.param(this.formToArray(t))
    }, e.fn.fieldSerialize = function(t) {
        var r = [];
        return this.each(function() {
            var a = this.name;
            if (a) {
                var n = e.fieldValue(this, t);
                if (n && n.constructor == Array) {
                    for (var i = 0, o = n.length; o > i; i++) {
                        r.push({
                            name: a,
                            value: n[i]
                        })
                    }
                } else {
                    null !== n && "undefined" != typeof n && r.push({
                        name: this.name,
                        value: n
                    })
                }
            }
        }), e.param(r)
    }, e.fn.fieldValue = function(t) {
        for (var r = [], a = 0, n = this.length; n > a; a++) {
            var i = this[a],
                o = e.fieldValue(i, t);
            null === o || "undefined" == typeof o || o.constructor == Array && !o.length || (o.constructor == Array ? e.merge(r, o) : r.push(o))
        }
        return r
    }, e.fieldValue = function(t, r) {
        var a = t.name,
            n = t.type,
            i = t.tagName.toLowerCase();
        if (void 0 === r && (r = !0), r && (!a || t.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !t.checked || ("submit" == n || "image" == n) && t.form && t.form.clk != t || "select" == i && -1 == t.selectedIndex)) {
            return null
        }
        if ("select" == i) {
            var o = t.selectedIndex;
            if (0 > o) {
                return null
            }
            for (var s = [], u = t.options, c = "select-one" == n, l = c ? o + 1 : u.length, f = c ? o : 0; l > f; f++) {
                var m = u[f];
                if (m.selected) {
                    var d = m.value;
                    if (d || (d = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), c) {
                        return d
                    }
                    s.push(d)
                }
            }
            return s
        }
        return e(t).val()
    }, e.fn.clearForm = function(t) {
        return this.each(function() {
            e("input,select,textarea", this).clearFields(t)
        })
    }, e.fn.clearFields = e.fn.clearInputs = function(t) {
        var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var a = this.type,
                n = this.tagName.toLowerCase();
            r.test(a) || "textarea" == n ? this.value = "" : "checkbox" == a || "radio" == a ? this.checked = !1 : "select" == n ? this.selectedIndex = -1 : "file" == a ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (t === !0 && /hidden/.test(a) || "string" == typeof t && e(this).is(t)) && (this.value = "")
        })
    }, e.fn.resetForm = function() {
        return this.each(function() {
            ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
        })
    }, e.fn.enable = function(e) {
        return void 0 === e && (e = !0), this.each(function() {
            this.disabled = !e
        })
    }, e.fn.selected = function(t) {
        return void 0 === t && (t = !0), this.each(function() {
            var r = this.type;
            if ("checkbox" == r || "radio" == r) {
                this.checked = t
            } else {
                if ("option" == this.tagName.toLowerCase()) {
                    var a = e(this).parent("select");
                    t && a[0] && "select-one" == a[0].type && a.find("option").selected(!1), this.selected = t
                }
            }
        })
    }, e.fn.ajaxSubmit.debug = !1
});
var StoreGroupCats = null;
var sortedStoreGroupCats = null;
var StoresArray = [];
var fullLoaded = false;
var checkoutForm = null;
var SelectDefaultAddress = true;

function Checkout() {
    this.cartHeader = {};
    this.cartTotal = 0;
    this.cartData = null;
    this.lastOrder = null;
    this.cartViewHTML = "";
    this.orderNumber = 0;
    this.promiseTime = 0;
    this.customerID = null;
    this.checkoutBtn = null;
    this.pages = null;
    this.checkoutBtn = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.OnTrackOrder = null;
    this.OnClose = null;
    this.minDate = getServerTime();
    this.showCountDown = null;
    this.remainPromiseTime = 0;
    this.useCalendar = true;
    this.useCountDown = false;
    this.orderTimeElements = {};
    this.map = null;
    this.MapContainerUI = null;
    this.page = "";
    checkoutForm = this;
    this.Show = function(page) {
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        if (typeof page === "undefined" || page == null) {
            page = ""
        }
        this.page = page;
        this.orderTimeElements = {
            ComboContainerID: "checkoutadvance_comboContainer",
            CalendarContainerID: "checkoutadvance_calendarContainer",
            inputID: "checkout_delivarydate",
            dateFieldID: "checkout_delivarydate_advance",
            hourFieldID: "checkout_delivarydate_hour",
            minFieldID: "checkout_delivarydate_minute",
            OrderTimeRadioName: "checkout_delivarytime",
            deliveryDateLabelID: "checkout_delivarydate_label",
            deliveryDateValueID: "checkout_delivarydate_value"
        };
        if (page == "") {
            this.showCheckout();
            if (this.afterShowPage != null) {
                this.afterShowPage()
            }
            setFloatingWindowStyle(2)
        } else {
            this.readStoredSession();
            if (page == "finish") {
                this.showThankyou()
            } else {
                if (page == "changepaymethod") {
                    this.showChangepayMethod()
                } else {
                    if (page == "error") {
                        this.showError()
                    }
                }
            }
            setFloatingWindowStyle(1);
            if (this.afterShowPage != null) {
                this.afterShowPage()
            }
        }
    };
    this.getDisplayAddress = function(data, IsStore) {
        if (this.cartHeader.DelivaryOrTakeout == "Delivary") {
            if (userLogin.isLoggedIn() && (typeof this.cartHeader.NewAddress === "undefined" || this.cartHeader.NewAddress == null)) {
                var addressID = this.cartHeader.AddressID;
                for (var n in this.customerData.Addresses) {
                    var address = this.customerData.Addresses[n];
                    if (address.ID == addressID) {
                        return address.Description
                    }
                }
            } else {
                var addressData = this.cartHeader.NewAddress;
                if (addressData.UseMap == true && addressData.Directions) {
                    return addressData.Directions
                } else {
                    return this.getDisplayAddressValue(addressData.BuildingName) + this.getDisplayAddressValue(addressData.BuildingNum) + this.getDisplayAddressValue(addressData.Area) + this.getDisplayAddressValue(addressData.District) + this.getDisplayAddressValue(addressData.Road) + this.getDisplayCity(addressData.City)
                }
            }
        } else {
            var storeID = this.cartHeader.StoreID;
            return OriginalStores[storeID]["Address"]
        }
    };
    this.getDisplayCity = function(cityID) {
        if (cityID && cityID != -1 && OriginalCities[cityID]) {
            return OriginalCities[cityID].Name
        } else {
            return ""
        }
    };
    this.getDisplayAddressValue = function(value) {
        if (typeof value !== "undefined" && value != "" && value != null) {
            return value + ", "
        } else {
            return ""
        }
    };
    this.showCheckout = function() {
        googleTag.push({
            event: "Open",
            Category: "Checkout",
            ElementType: "",
            ID: "",
            Name: ""
        });
        googleTag.push({
            event: "PageView",
            PageName: "Checkout",
            PageURL: "/checkout"
        });
        if (userLogin.isLoggedIn()) {
            var customer = userLogin.customerData
        }
        if (typeof this.cartHeader.DelivaryOrTakeout === "undefined") {
            this.cartHeader.DelivaryOrTakeout = "Delivary"
        }
        if (typeof this.cartHeader.AddressID === "undefined") {
            this.cartHeader.AddressID = 0;
            if (SelectDefaultAddress && userLogin.isLoggedIn()) {
                if (customer.Addresses.length > 0) {
                    this.cartHeader.AddressID = customer.Addresses[0]["ID"]
                }
            }
        }
        if (typeof this.cartHeader.StoreID === "undefined") {
            this.cartHeader.StoreID = 0
        }
        if (typeof this.cartHeader.paymethod === "undefined") {
            this.cartHeader.paymethod = "Cash"
        }
        if (typeof this.cartHeader.payamount === "undefined") {
            this.cartHeader.payamount = 0
        }
        if (typeof this.cartHeader.paysavedcard === "undefined") {
            this.cartHeader.paysavedcard = ""
        }
        if (typeof this.cartHeader.total === "undefined") {
            this.cartHeader.total = 0
        }
        if (typeof this.cartHeader.ordernote === "undefined") {
            this.cartHeader.ordernote = ""
        }
        if (typeof this.cartHeader.coupon === "undefined") {
            this.cartHeader.coupon = ""
        }
        if (typeof this.cartHeader.receivetaxreceipt === "undefined") {
            this.cartHeader.receivetaxreceipt = false
        }
        if (typeof this.cartHeader.taxreceiptinfo === "undefined") {
            this.cartHeader.taxreceiptinfo = ""
        }
        if (typeof this.cartHeader.delivarytime_type === "undefined") {
            this.cartHeader.delivarytime_type = "now"
        }
        if (typeof this.cartHeader.delivarytime_date === "undefined") {
            this.cartHeader.delivarytime_date = "2000-01-01 00:00:00"
        }
        $(this.pagesContainer).empty();
        if (userLogin.isLoggedIn()) {
            var checkoutHTML = this.pages.Checkout_Main;
            checkoutHTML = checkoutHTML.replace(/#CUSTOMERNAME#/gi, customer.FirstName + " " + customer.LastName);
            checkoutHTML = checkoutHTML.replace(/#CUSTOMEREMAIL#/gi, customer.UserName);
            checkoutHTML = checkoutHTML.replace(/#CUSTOMERPHONE#/gi, customer.PhoneNumber);
            checkoutHTML = checkoutHTML.replace(/#ORDERMODE#/gi, (this.cartHeader.DelivaryOrTakeout == "Delivary") ? Translate("Delivery to") : Translate("Carryout from"));
            checkoutHTML = checkoutHTML.replace(/#ADDRESS#/gi, this.getDisplayAddress())
        } else {
            var checkoutHTML = this.pages.Checkout_NotLoggedIn;
            checkoutHTML = checkoutHTML.replace(/#ORDERMODE#/gi, (this.cartHeader.DelivaryOrTakeout == "Delivary") ? Translate("Delivery to") : Translate("Carryout from"));
            checkoutHTML = checkoutHTML.replace(/#ADDRESS#/gi, this.getDisplayAddress())
        }
        if ((this.cartHeader.DelivaryOrTakeout == "Takeaway" && !OriginalStores[this.cartHeader.StoreID]["IsInWorkHours"]) || !IsValidStoreWorkTime) {
            checkoutHTML = checkoutHTML.replace(/#CLOSEDMSG_VISIBILITY#/gi, "block")
        } else {
            checkoutHTML = checkoutHTML.replace(/#CLOSEDMSG_VISIBILITY#/gi, "none")
        }
        if (this.cartHeader.DelivaryOrTakeout == "Takeaway") {
            checkoutHTML = checkoutHTML.replace(/#TAKEOUT_VISIBILITY#/gi, "none")
        } else {
            checkoutHTML = checkoutHTML.replace(/#TAKEOUT_VISIBILITY#/gi, "block")
        }
        if (navigator.userAgent.match(/Android/i)) {
            checkoutHTML = checkoutHTML.replace(/#ANDROID_VISIBILITY#/gi, "inline")
        } else {
            checkoutHTML = checkoutHTML.replace(/#ANDROID_VISIBILITY#/gi, "none")
        }
        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            checkoutHTML = checkoutHTML.replace(/#IOS_VISIBILITY#/gi, "inline")
        } else {
            checkoutHTML = checkoutHTML.replace(/#IOS_VISIBILITY#/gi, "none")
        }
        $(this.pagesContainer).html("<span>" + checkoutHTML + "</span>");
        if (!userLogin.isLoggedIn()) {
            userLogin.drawInlineLoginBlock($("#loginContent").get(0), function() {
                changeAddressTo("checkout");
                closeFloatPerm();
                checkoutForm.Show()
            });
            this.guestFrmValidator = new FormValidator($("#guestCheckout"), {
                firstname: {
                    customValidation: function(fieldID, callbackParam, callback) {
                        var val = $("#firstname").val();
                        var fieldExist = $("#firstname").length == 1;
                        callback(fieldExist == false || (fieldExist && val), Translate("Please enter your first name"), callbackParam)
                    }
                },
                lastname: {
                    customValidation: function(fieldID, callbackParam, callback) {
                        var val = $("#lastname").val();
                        var fieldExist = $("#lastname").length == 1;
                        callback(fieldExist == false || (fieldExist && val), Translate("Please enter your last name"), callbackParam)
                    }
                },
                fullname: {
                    customValidation: function(fieldID, callbackParam, callback) {
                        var val = $("#fullname").val();
                        var fieldExist = $("#fullname").length == 1;
                        callback(fieldExist == false || (fieldExist && val), Translate("Please enter your full name"), callbackParam)
                    }
                },
                phone1number: {
                    customValidation: function(fieldID, callbackParam, callback) {
                        var type = parseInt($("#phone1type").val());
                        var number = $("#phone1number").val().replace(/[^\d]*/g, "");
                        var requiredLength = PhoneMasks[type].replace(/[^\d]*/g, "").length;
                        if (type < 0) {
                            callback(false, Translate("Please select a phone type"), callbackParam)
                        } else {
                            if (number.length < requiredLength) {
                                callback(false, Translate("Please enter your mobile number"), callbackParam)
                            } else {
                                callback(true, "", callbackParam)
                            }
                        }
                    }
                }
            });
            this.guestFrmValidator.onShowValidateMessage = function(res, fieldID, fieldData, Message, isPost) {
                var anchoreFieldID = null;
                if (fieldID == "phone1type" || fieldID == "phone1number" || fieldID == "phone1ext") {
                    if ($("#phone1Container").length) {
                        anchoreFieldID = $("#phone1Container")
                    } else {
                        anchoreFieldID = $("#phone1ext")
                    }
                }
                if (!res) {
                    tooltip($("#" + fieldID), Message, 0, isPost, anchoreFieldID)
                } else {
                    tooltip($("#" + fieldID), "", 1, false, anchoreFieldID)
                }
            }
        }
        if (useJUICombo) {
            $("#phone1type").combobox();
            $("#checkout_payamount").combobox();
            $("#checkout_paysavedcard").combobox()
        }
        $("#phone1type").change(function() {
            var phoneType = $("#phone1type").val();
            $("#phone1number").val("").prop("readonly", (phoneType == -1)).mask(PhoneMasks[phoneType]);
            if ((phoneType == -1) || (phoneType == 2)) {
                $("#lblPhone1Ext").prop("disabled", true);
                $("#phone1ext").prop("disabled", true)
            } else {
                $("#lblPhone1Ext").removeAttr("disabled");
                $("#phone1ext").removeAttr("disabled")
            }
        }).val(DefPhoneType).change();
        var changeDelivaryMethod = function() {
            var val = $("input:radio[name=checkout_delivarymethod]:checked").val();
            if (val == "2") {
                $(this).data("ctrlr")["cartHeader"]["DelivaryOrTakeout"] = "Takeaway";
                $("#Checkout_ServiceChargeArea").hide()
            } else {
                $(this).data("ctrlr")["cartHeader"]["DelivaryOrTakeout"] = "Delivary";
                $("#Checkout_ServiceChargeArea").show()
            }
            isValidateForDelivary = (val != "2");
            $(this).data("ctrlr").DrawAddressesAndBranches();
            $(this).data("ctrlr").DrawItems()
        };
        $("#tab_delivary").data("ctrlr", this);
        $("#tab_delivary").click(changeDelivaryMethod);
        $("#tab_takeaway").data("ctrlr", this);
        $("#tab_takeaway").click(changeDelivaryMethod);
        isValidateForDelivary = this.cartHeader.DelivaryOrTakeout == "Delivary";
        if (isValidateForDelivary) {
            $("input:radio[name=checkout_delivarymethod][value=1]").prop("checked", true)
        } else {
            $("input:radio[name=checkout_delivarymethod][value=2]").prop("checked", true)
        }
        $("#checkout_taxreceipt").prop("checked", this.cartHeader.receivetaxreceipt);
        $("#checkout_taxreceiptinfo").val(this.cartHeader.taxreceiptinfo);
        $("#checkout_taxreceiptinfo").prop("disabled", !this.cartHeader.receivetaxreceipt);
        $("#checkout_taxreceipt").bind("change", function() {
            var val = $("#checkout_taxreceipt").prop("checked");
            $("#checkout_taxreceiptinfo").prop("disabled", !val);
            if (val) {
                $("#checkout_taxreceiptinfo").focus()
            }
        });
        $("#checkout_payamount").bind("keyup blur", function() {
            $(this).val($(this).val() == null ? null : $(this).val().replace(/[^0-9\.]/g, ""))
        });
        $("#checkout_payamount").val((useJUICombo && (this.cartHeader.payamount == "" || this.cartHeader.payamount == null)) ? -1 : this.cartHeader.payamount);
        $("#checkout_paysavedcard").val((useJUICombo && (this.cartHeader.paysavedcard == "" || this.cartHeader.paysavedcard == null)) ? -1 : this.cartHeader.paysavedcard);
        $("#checkout_coupon").val((this.cartHeader.coupon == "" || this.cartHeader.coupon == null) ? "" : this.cartHeader.coupon);
        var __paymethod = this.cartHeader.paymethod;
        $("input:radio[name=checkout_paymethod]").each(function(i, ctrl) {
            $(ctrl).prop("checked", $(ctrl).val() == __paymethod)
        });
        $("#CHECKOUT_POST").data("ctrlr", this);
        $("#CHECKOUT_POST").click(function() {
            var _ctrlr = $(this).data("ctrlr");
            if (userLogin.isLoggedIn()) {
                _ctrlr.postOrderToServer()
            } else {
                if (!$("#chkAcceptTermsAndConditions").prop("checked")) {
                    alert("Can't proceed with the registration without accepting the terms and conditions");
                    return
                }
                _ctrlr.guestFrmValidator.ValidateBeforePost(function(res) {
                    _ctrlr.postOrderToServer()
                })
            }
        });
        $("#CHECKOUT_CLOSE").data("ctrlr", this);
        $("#CHECKOUT_CLOSE").click(function() {
            $(this).data("ctrlr").OnClose()
        });
        $("input:radio[name=checkout_paymethod]").bind("change", function() {
            var val = $("input:radio[name=checkout_paymethod]:checked").val();
            $("#checkout_payamount").prop("disabled", val != "Change").change();
            if (val == "Change") {
                $("#checkout_payamount").focus().change();
                if (useBoxIt) {
                    $("#checkout_payamount").data("selectBox-selectBoxIt").refresh()
                }
            }
        });
        $("#checkout_paysavedcard").empty();
        var _this = this;
        if (userLogin.isLoggedIn() && typeof customer.CreditCards !== "undefined" && customer.CreditCards != null) {
            $.each(customer.CreditCards, function(index, item) {
                $("#checkout_paysavedcard").append($("<option value=" + item.Value + ">" + item.Title + "</option>"));
                if ($("#checkout_combocont_paymethod").length > 0) {
                    var htmlOption = HTML_Pages.Checkout_Savedcard;
                    htmlOption = htmlOption.replace(/#SAVED_CARD_VALUE#/gi, item.Value);
                    htmlOption = htmlOption.replace(/#SAVED_CARD_TITLE#/gi, item.Title);
                    htmlOption = htmlOption.replace(/#SAVED_CARD_ID#/gi, "SAVEDCARD" + index);
                    var htmlPayOption = $(htmlOption);
                    $("#checkout_combocont_paymethod").append(htmlPayOption);
                    htmlPayOption.data("value", item.Value);
                    htmlPayOption.data("title", item.Title);
                    htmlPayOption.data("owner", _this);
                    htmlPayOption.click(function(e) {
                        var _owner = $(this).data("owner");
                        var title = $(this).data("title");
                        var value = $(this).data("value");
                        _owner.cartHeader.paymethod = "Noon_SavedCard";
                        _owner.cartHeader.paysavedcard = value
                    })
                }
            })
        }
        $("#checkout_payamount").prop("disabled", this.cartHeader.paymethod != "Change").change();
        $("#checkout_paysavedcard").prop("disabled", this.cartHeader.paymethod != "Noon_SavedCard").change();
        $("#checkout_ordernote").val(this.cartHeader.ordernote);
        $("#checkout_coupon").val(this.cartHeader.coupon);
        $("#checkout_coupon").data("ctrlr", this);
        $("#checkout_coupon").bind("change", function() {
            $(this).data("ctrlr").validateCouponNumber();
            $(this).data("ctrlr").validateCheck(true)
        });
        $("#validatecoupon").data("ctrlr", this);
        $("#validatecoupon").unbind("click");
        $("#validatecoupon").click(function() {
            $(this).data("ctrlr").validateCouponNumber();
            $(this).data("ctrlr").validateCheck(true)
        });
        $("#checkout_taxreceipt").val(this.cartHeader.receivetaxreceipt);
        $("#checkout_taxreceiptinfo").val(this.cartHeader.taxreceiptinfo);
        showFutureOrderFields(this);
        this.DrawAddressesAndBranches();
        if (cart.postOrderID > 0) {
            if (this.cartHeader.paymethod == "Change") {
                $("input:radio[name=checkout_paymethod]").prop("disabled", true);
                $("input:radio[name=checkout_payamount]").prop("disabled", true).change()
            }
            $("input:radio[name=checkout_delivarytime]").prop("disabled", true);
            var lockFutureDate = this.cartHeader.delivarytime_type != "advance";
            $("#checkout_delivarydate_advance").prop("disabled", lockFutureDate);
            $("#checkout_delivarydate_hour").prop("disabled", lockFutureDate);
            $("#checkout_delivarydate_minute").prop("disabled", lockFutureDate);
            $("input:radio[name=checkout_delivarymethod]").prop("disabled", true);
            $("#checkout_delivarydate").prop("disabled", lockFutureDate)
        }
        updateDateLabel(checkoutForm);
        this.sendOrderToGoogleAnalytics(false);
        this.DrawCart()
    };
    this.DrawCart = function() {
        if (cart.cartData == null) {
            return
        }
        if (cart.cartTotals == null) {
            this.validateCheck(true);
            return
        }
        this.cartData = cart.cartData;
        drawCartItemsAsHTML(cart.cartData, {
            basketItemsUI: $("#Checkout_ItemsContent"),
            orderStatusUI: $("#Checkout_OrderStatus"),
            itemGroupTemplate: "Checkout_CartItemGroup",
            itemTemplate: "Checkout_CartItem",
            itemDetTemplate: "Checkout_CartItemDetail"
        }, true);
        $("#Checkout_GrossTotal").html(RoundPrice(cart.cartTotals.GrossTotal) + CurrencySymbol);
        $("#Checkout_DiscountTotal").html(RoundPrice(cart.cartTotals.DiscountTotal) + CurrencySymbol);
        if (cart.cartTotals.ServiceCharge > 0) {
            $("#Checkout_ServiceCharge").html(RoundPrice(cart.cartTotals.ServiceCharge) + CurrencySymbol)
        } else {
            $("#Checkout_ServiceCharge").html(Translate("Free"))
        }
        $("#Checkout_SubTotal").html(RoundPrice(cart.cartTotals.SubTotal) + CurrencySymbol);
        $("#Checkout_ExclusiveTaxesTotal").html(RoundPrice(cart.cartTotals.ExclusiveTaxes) + CurrencySymbol);
        $("#Checkout_InclusiveTaxesTotal").html(RoundPrice(cart.cartTotals.InclusiveTaxes) + CurrencySymbol);
        $("#Checkout_Total").html(RoundPrice(cart.cartTotals.Total) + CurrencySymbol);
        if (cart.cartTotals.DiscountTotal > 0) {
            $("#Checkout_DiscountsArea").show()
        } else {
            $("#Checkout_DiscountsArea").hide()
        }
        var discountsHtml = "";
        var discountTempl = HTML_Pages.Checkout_DiscountItem;
        for (var discountName in cart.cartTotals.Discounts) {
            var discountValue = cart.cartTotals.Discounts[discountName];
            discountsHtml += discountTempl.replace("#NAME#", Translate(discountName)).replace("#VALUE#", discountValue + CurrencySymbol)
        }
        $("#Checkout_Discounts").html(discountsHtml);
        $(".cart_img").each(function() {
            this.onerror = function() {
                ReplaceMissingImage(this, false)
            }
        })
    };
    this._DrawCart = function() {
        var _this = this;
        cart.drawCart({
            basketItemsUI: $("#Checkout_ItemsContent"),
            orderStatusUI: $("#Checkout_OrderStatus"),
            itemGroupTemplate: "Checkout_CartItemGroup",
            itemTemplate: "Checkout_CartItem",
            itemDetTemplate: "Checkout_CartItemDetail",
            callback: function() {
                $("#Checkout_GrossTotal").html(RoundPrice(cart.cartTotals.GrossTotal) + CurrencySymbol);
                $("#Checkout_DiscountTotal").html(RoundPrice(cart.cartTotals.DiscountTotal) + CurrencySymbol);
                if (cart.cartTotals.ServiceCharge > 0) {
                    $("#Checkout_ServiceCharge").html(RoundPrice(cart.cartTotals.ServiceCharge) + CurrencySymbol)
                } else {
                    $("#Checkout_ServiceCharge").html(Translate("Free"))
                }
                $("#Checkout_SubTotal").html(RoundPrice(cart.cartTotals.SubTotal) + CurrencySymbol);
                $("#Checkout_ExclusiveTaxesTotal").html(RoundPrice(cart.cartTotals.ExclusiveTaxes) + CurrencySymbol);
                $("#Checkout_InclusiveTaxesTotal").html(RoundPrice(cart.cartTotals.InclusiveTaxes) + CurrencySymbol);
                $("#Checkout_Total").html(RoundPrice(cart.cartTotals.Total) + CurrencySymbol);
                if (cart.cartTotals.DiscountTotal > 0) {
                    $("#Checkout_DiscountsArea").show()
                } else {
                    $("#Checkout_DiscountsArea").hide()
                }
                var discountsHtml = "";
                var discountTempl = HTML_Pages.Checkout_DiscountItem;
                for (var discountName in cart.cartTotals.Discounts) {
                    var discountValue = cart.cartTotals.Discounts[discountName];
                    discountsHtml += discountTempl.replace("#NAME#", Translate(discountName)).replace("#VALUE#", discountValue + CurrencySymbol)
                }
                $("#Checkout_Discounts").html(discountsHtml);
                $(".cart_img").each(function() {
                    this.onerror = function() {
                        ReplaceMissingImage(this, false)
                    }
                });
                _this.cartData = cart.cartData
            }
        })
    };
    this.DrawItems = function(useSavedPrice) {
        cart.updateCart(useSavedPrice)
    };
    this.DrawLastOrderItems = function(useSavedPrice) {
        cart.updateCart(useSavedPrice);
        drawCartItemsAsHTML(this.lastOrder, {
            basketItemsUI: $("#Checkout_ItemsContent"),
            itemGroupTemplate: "Checkout_CartItemGroup",
            itemTemplate: "Checkout_CartItem",
            itemDetTemplate: "Checkout_CartItemDetail"
        }, true)
    };
    this.readStoredSession = function() {
        var checkoutSession = CheckoutSession;
        if (checkoutSession != null) {
            this.orderNumber = checkoutSession.orderNumber;
            this.cartHeader = checkoutSession.cartHeader;
            this.lastOrder = checkoutSession.lastOrder;
            this.customerID = checkoutSession.customerID;
            this.remainPromiseTime = checkoutSession.cartHeader["delivarytime_date"];
            this.promiseTime = checkoutSession.promiseTime
        } else {
            this.orderNumber = 0;
            this.cartHeader = null;
            this.lastOrder = null;
            this.customerID = null;
            this.promiseTime = 0
        }
    };
    this.saveSession = function(params, callback) {
        var checkoutSession = {
            cartHeader: this.cartHeader,
            orderNumber: this.orderNumber,
            lastOrder: this.lastOrder,
            customerID: this.customerID,
            promiseTime: this.promiseTime
        };
        serverQuery("/Handlers/Checkout.ashx", {
            action: "savesession",
            CheckoutSession: checkoutSession
        }, function(res, response, args) {
            if (res && response.status == true) {
                args.callback(args.params)
            } else {
                if (response != null) {
                    alert(response.message)
                }
            }
        }, {
            params: params,
            callback: callback
        })
    };
    this.FillStoreGroupCats = function() {
        var html = "";
        var selectedStoreGroupID = 0;
        if (typeof this.cartHeader.StoreGroupID !== "undefined") {
            selectedStoreGroupID = this.cartHeader.StoreGroupID
        }
        for (var rc in sortedStoreGroupCats) {
            html += "<optgroup label='" + sortedStoreGroupCats[rc]["Name"] + "'>";
            var StoreGroups = sortedStoreGroupCats[rc]["StoresGroup"];
            for (var r in StoreGroups) {
                html += "<option value='" + StoreGroups[r]["ID"] + "'>" + StoreGroups[r]["Name"] + "</option>";
                if (selectedStoreGroupID == 0) {
                    selectedStoreGroupID = StoreGroups[r]["ID"]
                }
            }
            html += "</optgroup>"
        }
        $("#checkout_storegroups").html(html);
        $("#checkout_storegroups").val(selectedStoreGroupID);
        if (cart.postOrderID > 0) {
            $("#checkout_storegroups").prop("disabled", true)
        }
        this.FillStoreGroupsDetails(OriginalStoreGroups[selectedStoreGroupID])
    };
    this.FillStoreGroupsDetails = function(StoreGroup) {
        this.cartHeader.StoreGroupID = StoreGroup.ID;
        var html = "";
        var itmTemp = this.pages.Checkout_BranchItem;
        var selectedStoreID = 0;
        var firstLoadedStoreID = 0;
        if (typeof this.cartHeader.StoreID !== "undefined") {
            selectedStoreID = this.cartHeader.StoreID
        }
        for (var n in StoreGroup.Stores) {
            var store = StoreGroup.Stores[n];
            var itmHTML = itmTemp;
            itmHTML = itmHTML.replace("#NAME#", limitText(store.Name, 14));
            itmHTML = itmHTML.replace("#ID#", store.ID);
            itmHTML = itmHTML.replace("#DETAILS#", store.Address);
            var branchImg = "/Images/SharedImages/" + (store.IsInWorkHours ? "verified" : "notverified") + ".png";
            itmHTML = itmHTML.replace("#STATUS_IMAGE#", branchImg);
            itmHTML = itmHTML.replace("#STATUS#", Translate(store.IsInWorkHours ? "Open" : "Closed"));
            var ShowMap = function(args) {
                var link = args.link;
                var pos = args.pos;
                if ((link == null || link == "") && (pos != null) && (pos.Latitude != 0) && (pos.Longitude != 0)) {
                    var lat = pos.Latitude;
                    var lng = pos.Longitude;
                    new StoreMapLocation(lat, lng)
                } else {
                    if (link != null && link != "") {
                        window.open(link, "_blank")
                    }
                }
            };
            var canShowLink = (store.mapLink != null && store.mapLink != "") || ((store.MapLocation != null) && (store.MapLocation.Latitude != 0) && (store.MapLocation.Longitude != 0));
            itmHTML = itmHTML.replace("#MAP#", genActionLink({
                link: store.mapLink,
                pos: store.MapLocation
            }, ShowMap));
            itmHTML = itmHTML.replace("#MAP_DISPLAY#", canShowLink ? "inline" : "none");
            html += itmHTML;
            if (selectedStoreID == 0) {
                selectedStoreID = store.ID
            }
            if (firstLoadedStoreID == 0) {
                firstLoadedStoreID = store.ID
            }
        }
        $("#checkout_storesitems").html(html);
        if ($("input:radio[name=CHECKOUT_STORE][value=" + selectedStoreID + "]").length > 0) {
            $("input:radio[name=CHECKOUT_STORE][value=" + selectedStoreID + "]").prop("checked", true)
        } else {
            $("input:radio[name=CHECKOUT_STORE][value=" + firstLoadedStoreID + "]").prop("checked", true)
        }
        $("input:radio[name=CHECKOUT_STORE]").data("owner", this);
        $("input:radio[name=CHECKOUT_STORE]").click(function() {
            $(this).data("owner").fillStoreInfo()
        });
        if (cart.postOrderID > 0) {
            $("input:radio[name=CHECKOUT_STORE]").prop("disabled", true)
        }
        this.fillStoreInfo()
    };
    this.DrawAddressesAndBranches = function() {
        var content = $("#checkoutContent");
        content.empty();
        var html = "";
        if (userLogin.isLoggedIn()) {
            this.customerData = userLogin.customerData;
            var UserAddresses = this.customerData.Addresses;
            var Stores = this.customerData.Addresses;
            var selectedAddressID = 0;
            if (typeof this.cartHeader.AddressID !== "undefined") {
                selectedAddressID = this.cartHeader.AddressID
            }
        }
        if (this.cartHeader.DelivaryOrTakeout == "Delivary" && userLogin.isLoggedIn() && (typeof this.cartHeader.NewAddress === "undefined" || this.cartHeader.NewAddress == null)) {
            var addresses = "";
            var branchTemp = this.pages.Checkout_Addresses;
            var itmTemp = this.pages.Checkout_AddressItem;
            for (var n in UserAddresses) {
                var address = UserAddresses[n];
                var itmHTML = itmTemp;
                itmHTML = itmHTML.replace("#NAME#", limitText(address.Name, 14));
                itmHTML = itmHTML.replace("#ID#", address.ID);
                var addVerImg = "/Images/SharedImages/" + (address.Verified ? "verified" : "notverified") + ".png";
                itmHTML = itmHTML.replace("#VERIFIEDIMAGE#", addVerImg);
                itmHTML = itmHTML.replace("#VERIFIED#", Translate(address.Verified ? "Verified" : "Not Verified"));
                var details = "";
                if (address.CityText != null && address.CityText != "") {
                    details += address.CityText
                }
                if (address.ProvinceText != null && address.ProvinceText != "") {
                    details += " - " + address.ProvinceText
                }
                if (address.DistrictText != null && address.DistrictText != "") {
                    details += " - " + address.DistrictText
                }
                if (address.AreaText != null && address.AreaText != "") {
                    details += " - " + address.AreaText
                }
                if (address.StreetText != null && address.StreetText != "") {
                    details += " - " + address.StreetText
                }
                if (address.BldngNum != null && address.BldngNum != "") {
                    details += " - " + address.BldngNum
                }
                if (address.FlatNumber != null && address.FlatNumber != "") {
                    details += " - " + address.FlatNumber
                }
                details = details.replace(/^(\s\-\s)*|((\s\-\s)*)$/g, "");
                details = details.trim();
                itmHTML = itmHTML.replace("#DETAILS#", details);
                addresses += itmHTML;
                if (selectedAddressID == 0 && SelectDefaultAddress) {
                    selectedAddressID = address.ID
                }
            }
            html = branchTemp.replace("#CONTENT#", addresses)
        } else {
            if (this.cartHeader.DelivaryOrTakeout == "Takeaway") {
                var branchTemp = this.pages.Checkout_Branches;
                html = branchTemp
            }
        }
        content.html(html);
        if (cart.postOrderID > 0) {
            $("input:radio[name=CHECKOUT_ADDRESS]").prop("disabled", true)
        }
        if (this.cartHeader.DelivaryOrTakeout == "Takeaway") {
            $("#checkout_storegroups").data("ctrlr", this);
            $("#checkout_storegroups").change(function() {
                $(this).data("ctrlr").cartHeader.StoreGroupID = $(this).val();
                $(this).data("ctrlr").FillStoreGroupsDetails(OriginalStoreGroups[$(this).val()])
            })
        } else {
            if (selectedAddressID != 0) {
                $("input:radio[name=CHECKOUT_ADDRESS][value=" + selectedAddressID + "]").prop("checked", true)
            }
            $("input:radio[name=CHECKOUT_ADDRESS]").data("owner", this);
            $("input:radio[name=CHECKOUT_ADDRESS]").click(function() {
                $(this).data("owner").fillStoreInfo()
            });
            this.fillStoreInfo();
            $("#checkout_editprofile").data("owner", this);
            $("#checkout_editprofile").click(function() {
                showEditProfile(showCheckout);
                return false
            })
        }
        var _this = this;
        $("#STORE_FROM_MAP").data("owner", this);
        $("#STORE_FROM_MAP").click(function() {
            _this.showStoresOnMapSelection();
            return false
        });
        UpdateScrolls()
    };
    this.showStoresOnMapSelection = function() {
        var _this = this;
        var map = new StoreFromMap();
        map.Stores = StoresArray;
        map.OnOk = function(Store) {
            var StoreGroupID = 0;
            for (var c in StoreGroupCats) {
                for (var g in StoreGroupCats[c]["StoresGroup"]) {
                    for (var s in StoreGroupCats[c]["StoresGroup"][g]["Stores"]) {
                        var nodeStore = StoreGroupCats[c]["StoresGroup"][g]["Stores"][s];
                        if (nodeStore.ID == Store.ID) {
                            StoreGroupID = StoreGroupCats[c]["StoresGroup"][g]["ID"];
                            break
                        }
                    }
                }
            }
            $("#checkout_storegroups").val(StoreGroupID);
            _this.FillStoreGroupsDetails(OriginalStoreGroups[StoreGroupID]);
            $("input:radio[name=CHECKOUT_STORE]").prop("checked", false);
            $("input:radio[name=CHECKOUT_STORE][value=" + Store.ID + "]").prop("checked", true);
            _this.fillStoreInfo()
        };
        map.init()
    };
    this.validateCheck = function(callDrawCart, callback) {
        this.fillCartHeadrInfo();
        if (typeof callDrawCart === "undefined") {
            callDrawCart = false
        }
        var isDelivary = this.cartHeader.DelivaryOrTakeout == "Delivary";
        var isFuture = $("input:radio[name=checkout_delivarytime]:checked").val() == "advance";
        var delivarytime_date = getServerTime();
        delivarytime_date = new Date(delivarytime_date.getFullYear(), delivarytime_date.getMonth(), delivarytime_date.getDate(), 0, 0, 0);
        delivarytime_date.setDate(delivarytime_date.getDate() + parseInt($("#checkout_delivarydate_advance").val()));
        delivarytime_date.setHours(parseInt($("#checkout_delivarydate_hour").val()));
        delivarytime_date.setMinutes(parseInt($("#checkout_delivarydate_minute").val()));
        var msg = "";
        cart.recalcCart(this, function(param) {
            if (callDrawCart && this.page != "finish") {
                param.DrawCart()
            } else {
                param.DrawItems(true)
            }
            if (typeof callback !== "undefined" && callback != null) {
                callback()
            }
        }, isDelivary, isFuture, delivarytime_date, msg)
    };
    this.validateCouponNumber = function() {
        var couponNo = $("#checkout_coupon").val();
        serverQuery("/Handlers/ShoppingCart.ashx", {
            action: "validatecoupon",
            coupon: couponNo
        }, function(res, response, userParam) {
            if (res) {
                if (response.isValidCoupon) {
                    $("#couponvalidationmsg").html(Translate("Voucher code has been applied"));
                    $("#couponvalidationmsg").css("color", "green")
                } else {
                    $("#couponvalidationmsg").html(Translate("Voucher code is invalid"));
                    $("#couponvalidationmsg").css("color", "red")
                }
            }
        }, this)
    };
    this.validateBeforePost = function() {
        var total = cart.cartTotals.Total;
        if (this.cartHeader.paymethod == "change" && this.cartHeader.payamount < total) {
            alert("Paid amount should be more than total amount");
            return false
        }
        var delivarytime_type = $("input:radio[name=checkout_delivarytime]:checked").val();
        var delivarytime_date = getServerTime();
        delivarytime_date = new Date(delivarytime_date.getFullYear(), delivarytime_date.getMonth(), delivarytime_date.getDate(), 0, 0, 0);
        if (this.useCalendar) {
            var delivaryDateStr = $("#checkout_delivarydate").val();
            delivarytime_date = new Date(getDateFromFormat(delivaryDateStr, "yyyy/MM/dd HH:mm"))
        } else {
            delivarytime_date.setDate(delivarytime_date.getDate() + parseInt($("#checkout_delivarydate_advance").val()));
            delivarytime_date.setHours(parseInt($("#checkout_delivarydate_hour").val()));
            delivarytime_date.setMinutes(parseInt($("#checkout_delivarydate_minute").val()))
        }
        return true
    };
    this.fillStoreInfo = function() {
        this.cartHeader.AddressID = 0;
        this.cartHeader.StoreID = 0;
        var StoreNote = "";
        var receiveOfficialInvoice = this.cartHeader.receivetaxreceipt;
        var officialInvoiceInfo = this.cartHeader.taxreceiptinfo;
        if (this.cartHeader.DelivaryOrTakeout != "Delivary") {
            var selectedStore = $("input:radio[name=CHECKOUT_STORE]:checked").val();
            if (typeof selectedStore === "undefined" || selectedStore == null) {
                return
            }
            this.cartHeader.StoreID = selectedStore;
            var StoreGroup = null;
            for (var rg in StoreGroupCats) {
                for (var r in StoreGroupCats[rg]["StoresGroup"]) {
                    if (StoreGroupCats[rg]["StoresGroup"][r]["ID"] == this.cartHeader.StoreGroupID) {
                        StoreGroup = StoreGroupCats[rg]["StoresGroup"][r]
                    }
                }
            }
            var stores = StoreGroup.Stores;
            for (var s in stores) {
                if (stores[s]["ID"] == selectedStore) {
                    StoreNote = stores[s]["StoreNote"];
                    break
                }
            }
        } else {
            var selectedAddress = $("input:radio[name=CHECKOUT_ADDRESS]:checked").val();
            if (typeof selectedAddress === "undefined" || selectedAddress == null) {
                return
            }
            this.cartHeader.AddressID = selectedAddress;
            var addresses = userLogin.customerData.Addresses;
            for (var i in addresses) {
                if (addresses[i]["ID"] == selectedAddress) {
                    StoreNote = addresses[i]["StoreNote"];
                    if (addresses[i]["receiveOfficialInvoice"]) {
                        receiveOfficialInvoice = addresses[i]["receiveOfficialInvoice"];
                        officialInvoiceInfo = addresses[i]["officialInvoiceInfo"]
                    }
                    break
                }
            }
        }
        if (typeof StoreNote !== "undefined" && StoreNote != null && StoreNote != "") {
            Announcement(StoreNote)
        }
        $("#checkout_taxreceipt").prop("checked", receiveOfficialInvoice);
        $("#checkout_taxreceiptinfo").val(officialInvoiceInfo);
        $("#checkout_taxreceiptinfo").prop("disabled", !receiveOfficialInvoice);
        this.validateCheck()
    };
    this.fillCartHeadrInfo = function() {
        if ($("input:radio[name=checkout_paymethod]:checked").length > 0) {
            this.cartHeader.paymethod = $("input:radio[name=checkout_paymethod]:checked").val()
        }
        if ($("#checkout_payamount").length > 0) {
            this.cartHeader.payamount = $("#checkout_payamount").val()
        }
        if ($("#checkout_paysavedcard").length > 0) {
            this.cartHeader.paysavedcard = $("#checkout_paysavedcard").val()
        }
        if ($("#checkout_ordernote").length > 0) {
            this.cartHeader.ordernote = $("#checkout_ordernote").val()
        }
        if ($("#checkout_coupon").length > 0) {
            this.cartHeader.coupon = $("#checkout_coupon").val()
        }
        this.cartHeader.total = cart.cartTotalPrice;
        this.cartHeader.receivetaxreceipt = $("#checkout_taxreceipt").prop("checked");
        this.cartHeader.taxreceiptinfo = $("#checkout_taxreceiptinfo").val();
        this.cartHeader.delivarytime_type = $("input:radio[name=checkout_delivarytime]:checked").val();
        var delivarytime_date = getServerTime();
        delivarytime_date = new Date(delivarytime_date.getFullYear(), delivarytime_date.getMonth(), delivarytime_date.getDate(), 0, 0, 0);
        if (this.useCalendar) {
            var delivaryDateStr = $("#checkout_delivarydate").val();
            delivarytime_date = new Date(getDateFromFormat(delivaryDateStr, "yyyy/MM/dd HH:mm"))
        } else {
            delivarytime_date.setDate(delivarytime_date.getDate() + parseInt($("#checkout_delivarydate_advance").val()));
            delivarytime_date.setHours(parseInt($("#checkout_delivarydate_hour").val()));
            delivarytime_date.setMinutes(parseInt($("#checkout_delivarydate_minute").val()))
        }
        this.cartHeader.delivarytime_date = formatDate(delivarytime_date, "yyyy-MM-dd HH:mm:ss");
        reorderPizzaHalfsForAll(this.cartData)
    };
    this.isItemInActiveMenu = function(ID, isDeal, DealID) {
        var found = false;
        if (!isDeal) {
            for (var s in MenuList) {
                var Submenu = MenuList[s];
                for (var i in Submenu.Items) {
                    var itm = Submenu.Items[i];
                    if (itm.ID == ID) {
                        found = true;
                        break
                    }
                }
            }
            for (var o in OriginalSuggesiveSelling) {
                var Suggestive = OriginalSuggesiveSelling[o];
                for (var k in Suggestive.Items) {
                    var itm = Suggestive.Items[k];
                    if (itm.ItemID == ID) {
                        found = true;
                        break
                    }
                }
            }
        } else {
            var deal = OriginalDeals[DealID];
            if (deal.ItemID == ID) {
                found = true
            } else {
                for (var n in deal.Steps) {
                    var step = deal.Steps[n];
                    for (var j in step.Items) {
                        var stepItm = step.Items[j];
                        if (stepItm.ID == ID) {
                            found = true
                        }
                    }
                }
            }
        }
        return found
    };
    this.isValidItemOrderTime = function(ID, isDeal, DealID) {
        var orgitm = OriginalItems[ID];
        if (typeof orgitm.Availability !== "undefined") {
            var itmAvailability = orgitm.Availability;
            var valDaysStr = orgitm.Availability.days;
            var fromMins = orgitm.Availability.start;
            var toMins = orgitm.Availability.end;
            var ordrMode = orgitm.Availability.orderMode;
            var orderTime = getServerTime();
            var orderDay = orderTime.getDay();
            var orderMins = orderTime.getHours() * 60 + orderTime.getMinutes();
            if ((valDaysStr.indexOf(orderDay) > -1) && (orderMins >= fromMins) && (orderMins <= toMins)) {
                return true
            } else {
                return false
            }
        }
        return true
    };
    this.hasOrderTimeValidation = function(ID) {
        var orgitm = OriginalItems[ID];
        if (typeof orgitm !== "undefined" && typeof orgitm.Availability !== "undefined") {
            var itmAvailability = orgitm.Availability;
            var valDaysStr = orgitm.Availability.days;
            for (var i = 0; i <= 6; i++) {
                if (valDaysStr.indexOf(i) == -1) {
                    return true
                }
            }
            return false
        } else {
            return false
        }
    };
    this.postOrderToServer = function() {
        var total = cart.cartTotals.Total;
        if (this.cartHeader.paymethod == "change" && this.cartHeader.payamount < total) {
            alert("Paid amount shoud be more than total amount");
            return false
        }
        var delivarytime_type = $("input:radio[name=checkout_delivarytime]:checked").val();
        var delivarytime_date = getServerTime();
        delivarytime_date = new Date(delivarytime_date.getFullYear(), delivarytime_date.getMonth(), delivarytime_date.getDate(), 0, 0, 0);
        if (this.useCalendar) {
            var delivaryDateStr = $("#checkout_delivarydate").val();
            delivarytime_date = new Date(getDateFromFormat(delivaryDateStr, "yyyy/MM/dd HH:mm"))
        } else {
            delivarytime_date.setDate(delivarytime_date.getDate() + parseInt($("#checkout_delivarydate_advance").val()));
            delivarytime_date.setHours(parseInt($("#checkout_delivarydate_hour").val()));
            delivarytime_date.setMinutes(parseInt($("#checkout_delivarydate_minute").val()))
        }
        this.fillCartHeadrInfo();
        if (this.cartHeader.total < minimumOrderTotal && this.cartHeader.DelivaryOrTakeout != "Takeaway") {
            var msgPart1 = Translate("The minimum amount for an order is");
            var msgPart2 = Translate("Please add more items.");
            alert(msgPart1 + " " + minimumOrderTotal + " " + CurrencySymbol + ". " + msgPart2);
            return
        }
        if (this.cartHeader.DelivaryOrTakeout == "Delivary" && typeof this.cartHeader.NewAddress === "undefined") {
            if (userLogin.isLoggedIn()) {
                if (this.cartHeader.AddressID == 0) {
                    alert("Please select your delivery address");
                    return
                }
            } else {
                if (typeof this.cartHeader.CustomerData === "undefined" || this.cartHeader.CustomerData == null) {
                    alert("Please select your delivery address");
                    return
                }
            }
        } else {
            if (this.cartHeader.DelivaryOrTakeout == "Takeaway") {
                if (this.cartHeader.StoreID == 0) {
                    alert("Please select your store for takeout");
                    return
                }
            }
        }
        if (this.cartData == null || this.cartData.length == 0) {
            alert("Please add some items to your cart");
            return
        }
        if ($("#checkout_taxreceipt").prop("checked") && $("#checkout_taxreceiptinfo").val() == "") {
            alert("Please fill Tax receipt information");
            return
        }
        var missingItems = [];
        var missingItemsCount = 0;
        var newCartCount = 0;
        var newCart = [];
        var missingItemsNames = "";
        for (var i in this.cartData) {
            var itm = this.cartData[i];
            var ID = 0;
            var isDeal = false;
            var DealID = 0;
            if (itm.DealID > 0) {
                var DealInfo = dealNumber_extract(itm.DealID);
                DealID = DealInfo.dealID;
                if (OriginalDeals[DealID].ItemID > 0) {
                    isDeal = true
                } else {
                    DealID = 0;
                    itm.DealID = 0
                }
            }
            ID = itm.ID;
            if (!this.isItemInActiveMenu(ID, isDeal, DealID)) {
                missingItemsCount++;
                missingItems.push(ID);
                missingItemsNames += "<br/>" + itm.Name
            } else {
                if (!this.isValidItemOrderTime(ID, isDeal, DealID)) {
                    missingItemsCount++;
                    missingItems.push(ID);
                    missingItemsNames += "<br/>" + itm.Name
                } else {
                    if (this.hasOrderTimeValidation(ID) && this.cartHeader.delivarytime_type != "now" && new Date(this.cartHeader.delivarytime_date).getDate() != getServerTime().getDate()) {
                        missingItemsCount++;
                        missingItems.push(ID);
                        missingItemsNames += "<br/>" + itm.Name
                    } else {
                        newCartCount++;
                        newCart.push(itm)
                    }
                }
            }
        }
        var _this = this;
        if (missingItemsCount == 0) {
            this.postOrderToServer_AfterValidation()
        } else {
            if (newCartCount == 0) {
                var delivarytime_string = this.cartHeader.delivarytime_type == "now" ? "today" : "at the selected day";
                alert("Sorry, All of the selected items are not available for ordering " + delivarytime_string);
                return
            } else {
                var delivarytime_string = this.cartHeader.delivarytime_type == "now" ? "today" : "at the day specified";
                if (confirm(Translate("One or more items are not available for ordering " + delivarytime_string + ". Do you want to proceed without these items?") + missingItemsNames, {
                        owner: this,
                        newCart: newCart
                    }, function(res, param) {
                        if (res) {
                            param.owner.cartData = param.newCart;
                            cart.cartData = param.newCart;
                            param.owner.validateCheck(false, function() {
                                if (cart.cartSubTotalPrice < minimumOrderTotal && cart.cartHeader.DelivaryOrTakeout != "Takeaway") {
                                    var minimumTxt1 = Translate("The minimum amount for an order is");
                                    var minimumTxt2 = Translate("Please add more items and click Checkout.");
                                    alert(minimumTxt1 + " " + minimumOrderTotal + " " + CurrencySymbol + ". " + minimumTxt2);
                                    showMyCart();
                                    return
                                }
                                _this.postOrderToServer_AfterValidation()
                            })
                        }
                    })) {}
            }
        }
    };
    this.postOrderToServer_AfterValidation = function() {
        if (!userLogin.isLoggedIn()) {
            this.cartHeader.CustomerData = {};
            this.cartHeader.CustomerData.EmailAddress = $("#emailaddress").length > 0 ? $("#emailaddress").val() : "";
            this.cartHeader.CustomerData.Password = "";
            this.cartHeader.CustomerData.FirstName = $("#firstname").val();
            this.cartHeader.CustomerData.MidName = "";
            this.cartHeader.CustomerData.LastName = $("#lastname").val();
            this.cartHeader.CustomerData.FullName = $("#fullname").val();
            this.cartHeader.CustomerData.Gender = 0;
            this.cartHeader.CustomerData.CustomerTitle = 0;
            this.cartHeader.CustomerData.DateOfBirth = "";
            this.cartHeader.CustomerData.Offer1 = 0;
            this.cartHeader.CustomerData.Offer2 = 0;
            this.cartHeader.CustomerData.Phone1ID = -1;
            this.cartHeader.CustomerData.Phone1Type = $("#phone1type").val();
            this.cartHeader.CustomerData.Phone1Number = $("#phone1number").val();
            this.cartHeader.CustomerData.Phone1Ext = $("#phone1ext").val();
            this.cartHeader.CustomerData.PhoneID = -1;
            this.cartHeader.CustomerData.PhoneType = $("#phone1type").val();
            this.cartHeader.CustomerData.PhoneNumber = $("#phone1number").val();
            this.cartHeader.CustomerData.PhoneExt = $("#phone1ext").val()
        }
        if (typeof this.cartHeader.NewAddress !== "undefined" && this.cartHeader.NewAddress != null) {
            if (!userLogin.isLoggedIn()) {
                this.cartHeader.NewAddress.Phone1ID = this.cartHeader.CustomerData.PhoneID;
                this.cartHeader.NewAddress.Phone1Type = this.cartHeader.CustomerData.PhoneType;
                this.cartHeader.NewAddress.Phone1Number = this.cartHeader.CustomerData.PhoneNumber;
                this.cartHeader.NewAddress.Phone1Ext = this.cartHeader.CustomerData.PhoneExt
            } else {
                this.cartHeader.NewAddress.Phone1ID = -1;
                this.cartHeader.NewAddress.Phone1Type = this.customerData.PhoneType;
                this.cartHeader.NewAddress.Phone1Number = this.customerData.PhoneNumber;
                this.cartHeader.NewAddress.Phone1Ext = typeof this.customerData.PhoneExt === "undefined" ? "" : this.customerData.PhoneExt
            }
        }
        serverQuery("/Handlers/Checkout.ashx", {
            action: "checkout",
            cartHeader: this.cartHeader,
            cart: this.cartData,
            orderNumber: cart.postOrderID
        }, function(res, response, args) {
            $("#CHECKOUT_POST").prop("disabled", true);
            $("#CHECKOUT_POST").prop("value", "Please wait...");
            if (res && response.status == true) {
                var orderNumber = response.orderNumber;
                args.orderNumber = orderNumber;
                args.promiseTime = response.promisetime;
                args.customerID = response.customerID;
                args.sendOrderToGoogleAnalytics(true);
                if (userLogin.isLoggedIn()) {
                    userLogin.customerData = response.customer
                }
                var updatedOrder = cart.postOrderID > 0;
                args.lastOrder = cart.cartData.slice(0);
                cart.postOrderID = 0;
                if (!(args.cartHeader.paymethod.toLowerCase() == "cash" || args.cartHeader.paymethod.toLowerCase() == "change")) {
                    if (cart.postOrderID != 0) {
                        alert("Cannot use credit card payment for existing orders")
                    } else {
                        args.saveSession(args, function(param) {
                            param.redirectToPaymentGateway(param.cartHeader.paymethod)
                        })
                    }
                } else {
                    args.showThankyou(updatedOrder)
                }
            } else {
                if (response != null) {
                    var msg = response.message;
                    if (msg.toString().indexOf("Please select a new delivery time") > -1) {
                        var date = new Date();
                        delivaryTime.setTime(getDateFromFormat(args.cartHeader.delivarytime_date, "yyyy-MM-dd HH:mm:ss"));
                        msg = Translate("Unfortunately we can't complete your order at the moment, we apologize for any inconvenience.") + "<br/>";
                        msg += Translate("Please select a new delivery time, the valid working hours are:") + "<br/>";
                        msg += Translate("Order Time") + " : " + args.cartHeader.delivarytime_date + "<br/>";
                        msg += Translate("Delivery") + " : " + convertToAmPmTime(getWorkTime(true, true, date)) + " - " + convertToAmPmTime(getWorkTime(true, false, date)) + "<br/>";
                        msg += Translate("Takeout") + " : " + convertToAmPmTime(getWorkTime(false, true, date)) + " - " + convertToAmPmTime(getWorkTime(false, false, date)) + "<br/>"
                    }
                    alert(msg, 200, 400);
                    $("#CHECKOUT_POST").removeAttr("disable");
                    $("#CHECKOUT_POST").prop("value", "Checkout")
                }
            }
        }, this)
    };
    this.showThankyou = function(updatedOrder) {
        if (this.orderNumber == 0) {
            return
        }
        googleTag.push({
            event: "Submit",
            Category: "Checkout",
            ElementType: "",
            ID: "",
            Name: ""
        });
        cart.clearCart();
        $(window).scrollTop(0);
        var PromiseTimeContID = createUUID();
        var MapParentContainerID = createUUID();
        var MapContainerID = createUUID();
        var pageTemplateName = "Checkout_Finish";
        if (updatedOrder) {
            pageTemplateName = "Checkout_FinishUpdate"
        }
        var thankyouHTML = this.pages[pageTemplateName];
        thankyouHTML = thankyouHTML.replace(/#ORDERNUMBER#/gi, this.orderNumber);
        thankyouHTML = thankyouHTML.replace(/#ORDERMODE#/gi, (this.cartHeader.DelivaryOrTakeout == "Delivary") ? Translate("Delivery to") : Translate("Carryout from"));
        thankyouHTML = thankyouHTML.replace(/#ORDERMODE_TIME#/gi, (this.cartHeader.DelivaryOrTakeout == "Delivary") ? Translate("Delivery time") : Translate("Carryout time"));
        thankyouHTML = thankyouHTML.replace(/#ORDERMODE_DATE#/gi, (this.cartHeader.DelivaryOrTakeout == "Delivary") ? Translate("Delivery date") : Translate("Carryout date"));
        thankyouHTML = thankyouHTML.replace("#MAP#", MapParentContainerID);
        thankyouHTML = thankyouHTML.replace("#MAP_CONTAINER#", MapContainerID);
        thankyouHTML = thankyouHTML.replace(/#ADDRESS#/gi, this.getDisplayAddress());
        thankyouHTML = thankyouHTML.replace("#SIGNUP_VISIBILITY#", userLogin.isLoggedIn() ? "none" : "normal");
        thankyouHTML = thankyouHTML.replace("#PROMISETIMECONTAINER#", PromiseTimeContID);
        thankyouHTML = thankyouHTML.replace("#CONFIRMATIONEMAIL_DISPLAYSTYLE#", !userLogin.isLoggedIn() && !this.cartHeader.CustomerData.EmailAddress ? "none" : "inline-block");
        var orderDueTime = new Date((getServerTime().getTime()) + this.promiseTime * 60000);
        if (this.promiseTime > 0 && this.cartHeader.delivarytime_type == "now") {
            thankyouHTML = thankyouHTML.replace("#PROMISETIME#", "");
            thankyouHTML = thankyouHTML.replace("#DUETIME#", orderDueTime.format("hh:MM TT"));
            thankyouHTML = thankyouHTML.replace("#DUEDATE#", orderDueTime.format("mm/dd/yyyy"));
            if (this.cartHeader.DelivaryOrTakeout == "Delivary" && thankyouHTML.indexOf("#FIXEDDELIVERYDUETIMECONTAINER#") > 0) {
                thankyouHTML = thankyouHTML.replace("#FIXEDDELIVERYDUETIME_DISPLAYSTYLE#", "inline-block");
                thankyouHTML = thankyouHTML.replace("#FIXEDCARRYOUTDUETIME_DISPLAYSTYLE#", "none");
                thankyouHTML = thankyouHTML.replace("#PROMISETIME_DISPLAYSTYLE#", "none");
                thankyouHTML = thankyouHTML.replace("#DUETIME_DISPLAYSTYLE#", "none")
            } else {
                if (this.cartHeader.DelivaryOrTakeout == "Takeaway" && thankyouHTML.indexOf("#FIXEDCARRYOUTDUETIMECONTAINER#") > 0) {
                    thankyouHTML = thankyouHTML.replace("#FIXEDCARRYOUTDUETIME_DISPLAYSTYLE#", "inline-block");
                    thankyouHTML = thankyouHTML.replace("#FIXEDDELIVERYDUETIME_DISPLAYSTYLE#", "none");
                    thankyouHTML = thankyouHTML.replace("#PROMISETIME_DISPLAYSTYLE#", "none");
                    thankyouHTML = thankyouHTML.replace("#DUETIME_DISPLAYSTYLE#", "none")
                } else {
                    thankyouHTML = thankyouHTML.replace("#FIXEDCARRYOUTDUETIME_DISPLAYSTYLE#", "none");
                    thankyouHTML = thankyouHTML.replace("#FIXEDDELIVERYDUETIME_DISPLAYSTYLE#", "none");
                    thankyouHTML = thankyouHTML.replace("#PROMISETIME_DISPLAYSTYLE#", "block");
                    thankyouHTML = thankyouHTML.replace("#DUETIME_DISPLAYSTYLE#", "block")
                }
            }
        } else {
            if (this.cartHeader.delivarytime_type != "now") {
                thankyouHTML = thankyouHTML.replace("#PROMISETIME#", this.cartHeader.delivarytime_date);
                if (thankyouHTML.indexOf("#DUEDATE#") > 0) {
                    thankyouHTML = thankyouHTML.replace("#DUETIME#", new Date(getDateFromFormat(this.cartHeader.delivarytime_date, "yyyy-MM-dd HH:mm:ss")).format("hh:MM TT"));
                    thankyouHTML = thankyouHTML.replace("#DUEDATE#", new Date(getDateFromFormat(this.cartHeader.delivarytime_date, "yyyy-MM-dd HH:mm:ss")).format("mm/dd/yyyy"))
                } else {
                    thankyouHTML = thankyouHTML.replace("#DUETIME#", this.cartHeader.delivarytime_date)
                }
                thankyouHTML = thankyouHTML.replace("#PROMISETIME_DISPLAYSTYLE#", "inline-block");
                thankyouHTML = thankyouHTML.replace("#DUETIME_DISPLAYSTYLE#", "inline-block");
                thankyouHTML = thankyouHTML.replace("#FIXEDDELIVERYDUETIME_DISPLAYSTYLE#", "none");
                thankyouHTML = thankyouHTML.replace("#FIXEDCARRYOUTDUETIME_DISPLAYSTYLE#", "none");
                $("#" + PromiseTimeContID).removeClass("promiseTimeContainer")
            } else {
                thankyouHTML = thankyouHTML.replace("#PROMISETIME#", "");
                thankyouHTML = thankyouHTML.replace("#DUETIME#", "");
                thankyouHTML = thankyouHTML.replace("#PROMISETIME_DISPLAYSTYLE#", "none");
                thankyouHTML = thankyouHTML.replace("#DUETIME_DISPLAYSTYLE#", "none");
                thankyouHTML = thankyouHTML.replace("#FIXEDDELIVERYDUETIME_DISPLAYSTYLE#", "none");
                thankyouHTML = thankyouHTML.replace("#FIXEDCARRYOUTDUETIME_DISPLAYSTYLE#", "none")
            }
        }
        $(this.pagesContainer).html(thankyouHTML);
        this.MapContainerUI = $("#" + MapContainerID);
        if (this.useCountDown && this.promiseTime > 0 && this.cartHeader.delivarytime_type == "now") {
            showCountDown(PromiseTimeContID, this.promiseTime)
        }
        if (!userLogin.isLoggedIn()) {
            $("#email").val(this.cartHeader.CustomerData.EmailAddress);
            $("#email").prop("readonly", true)
        }
        this.DrawCart();
        var _this = this;
        $("#CHECKOUT_TRACKORDER").click(function() {
            _this.OnTrackOrder(_this.orderNumber, _this.customerID)
        });
        $("#CHECKOUT_CLOSE").click(function() {
            _this.OnClose()
        });
        $("#signupAsGuest").click(function() {
            _this.validator.ValidateBeforePost(function(res) {
                _this.SubmitRegisterGuest()
            })
        });
        $("#addToFavorite").click(function() {
            _this.AddToFavorite()
        });
        if (this.cartHeader.DelivaryOrTakeout == "Delivary") {
            if (this.cartHeader.delivarytime_type == "now") {
                $("#delivered").html(Translate("delivered around"))
            } else {
                $("#delivered").html(Translate("delivered on"))
            }
            $("#carryout").hide()
        } else {
            if (this.cartHeader.delivarytime_type == "now") {
                $("#carryout").html(Translate("ready for takeaway around"))
            } else {
                $("#carryout").html(Translate("ready for carryout on"))
            }
            $("#delivered").hide()
        }
        this.DrawLastOrderItems();
        this.validator = new FormValidator($("#frmGuestSignUp"), {
            email: {
                required: true,
                requiredMsg: Translate("Please fill the EMail address"),
                email: true,
                emailMsg: Translate("Please enter a valid EMail address"),
                customValidation: function(fieldID, callbackParam, callback) {
                    var email = $("#" + fieldID).val();
                    serverQuery("/Handlers/CustomerRegistration.ashx?ShowWait=0", {
                        Action: "ValidateEMailExistance",
                        emailaddress: email
                    }, function(status, responseData, callback) {
                        if (status) {
                            callback(responseData.valid, responseData.msg, callbackParam)
                        } else {
                            callback(false, "Validation failed due to a server error", callbackParam)
                        }
                    }, callback)
                }
            },
            password: {
                required: true,
                requiredMsg: Translate("Please enter a password")
            },
            confirmPassword: {
                required: true,
                requiredMsg: Translate("Please re-type your password"),
                equalTo: "#password",
                equalToMsg: Translate("Please enter the same password as above")
            }
        });
        this.validator.onShowValidateMessage = function(res, fieldID, fieldData, Message, isPost) {
            var anchoreFieldID = null;
            if (!res) {
                tooltip($("#" + fieldID), Message, 0, isPost, anchoreFieldID)
            } else {
                tooltip($("#" + fieldID), "", 1, false, anchoreFieldID)
            }
        };
        setFloatingWindowStyle(1);
        if (userLogin.CustomerData != null) {
            userLogin.CustomerData.hasActiveOrders = "True"
        }
        if ($("#" + MapParentContainerID).length > 0) {
            if (this.cartHeader.DelivaryOrTakeout == "Takeaway") {
                this.ShowStoreMap()
            } else {
                $("#" + MapParentContainerID).hide()
            }
        }
    };
    this.ShowStoreMap = function(thankyouHTML) {
        document._checkout = this;
        document._continueInit = function() {
            document._checkout.continueInit()
        };
        loadGoogleMapsJS(document._continueInit)
    };
    this.continueInit = function() {
        if (typeof this.cartHeader.StoreID !== "undefined") {
            var StoreID = this.cartHeader.StoreID;
            var store = OriginalStores[StoreID];
            var center = new google.maps.LatLng(0, 0);
            this.curPosition = new google.maps.LatLng(0, 0);
            var a = this.MapContainerUI.get(0);
            this.map = new google.maps.Map(this.MapContainerUI.get(0), {
                zoom: 6,
                center: center,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var storePos = new google.maps.LatLng(store.MapLocation.Latitude, store.MapLocation.Longitude);
            var storeMarker = new google.maps.Marker({
                position: storePos,
                map: this.map,
                title: store.Name,
                cursor: "pointer",
                draggableCursor: "pointer",
                icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
            });
            this.map.setCenter(storeMarker.getPosition());
            this.map.setZoom(16);
            this.DrawLastOrderItems()
        }
    };
    this.AddToFavorite = function() {
        if (!userLogin.isLoggedIn()) {
            alert(Translate("You have to login first."));
            return
        }
        var html = HTML_Pages.FavoriteOrders_OrderName;
        var _this = this;
        var popupDlg = new PopupForm();
        popupDlg.width = 300;
        popupDlg.height = 100;
        popupDlg.borderColor = "#8fe3b6";
        popupDlg.backgroundColor = "rgb(0, 101, 45)";
        popupDlg.borderWidth = 1;
        popupDlg.container.html(html);
        $("#btnOkFavOrderName").data("popup", popupDlg);
        $("#btnOkFavOrderName").click(function() {
            var ordername = $("#txtFavOrderName").val();
            if (ordername == "") {
                alert("Please fill order name");
                return
            }
            var dataToSend = {
                action: "postfavoriteorder",
                ordername: ordername,
                cart: _this.lastOrder
            };
            $("#addToFavorite").attr("disabled", "disabled");
            serverQuery("/Handlers/FavoriteMenu.ashx", dataToSend, function(status, responseData, owner) {
                $("#addToFavorite").removeAttr("disabled");
                popupDlg.Close();
                if (status && responseData.valid) {
                    userLogin.customerData = responseData.customer;
                    alert("Your order is saved")
                } else {
                    if (status && !responseData.valid && typeof responseData.message !== "undefined" && responseData.message != null) {
                        alert(responseData.message)
                    } else {
                        alert("Request failed")
                    }
                }
            }, this)
        });
        $("#btnCancelFavOrderName").data("popup", popupDlg);
        $("#btnCancelFavOrderName").click(function() {
            $(this).data("popup").Close()
        });
        popupDlg.Show();
        $("#txtFavOrderName").focus()
    };
    this.SubmitRegisterGuest = function() {
        var email = $("#email").val();
        var dataToSend = {
            Action: "RegisterGuestCustomer",
            CustomerID: this.customerID,
            EmailAddress: email,
            Password: $("#password").val().trim()
        };
        $("#signup").attr("disabled", "disabled");
        serverQuery("/Handlers/CustomerRegistration.ashx", dataToSend, function(status, responseData, owner) {
            $("#signup").removeAttr("disabled");
            if (status && responseData.valid) {
                setFloatingWindowStyle(1);
                $(owner.pagesContainer).html(owner.pages.CustomerRegistration_ActivateYourAccount);
                $("#register_icon_gmail").hide();
                $("#register_icon_hotmail").hide();
                $("#register_icon_yahoo").hide();
                if (email.indexOf("@gmail") > -1) {
                    $("#register_icon_gmail").show()
                } else {
                    if (email.indexOf("@yahoo") > -1) {
                        $("#register_icon_yahoo").show()
                    } else {
                        if (email.indexOf("@hotmail") > -1 || email.indexOf("@live") > -1 || email.indexOf("@msn") > -1) {
                            $("#register_icon_hotmail").show()
                        } else {
                            $("#go_to_inbox").hide()
                        }
                    }
                }
            } else {
                if (status && !responseData.valid) {
                    alert(responseData.message)
                } else {
                    alert("Request failed")
                }
            }
        }, this)
    };
    this.showError = function() {
        $(this.pagesContainer).html(this.pages.Checkout_Error);
        $("#CHECKOUT_CLOSE").data("ctrlr", this);
        $("#CHECKOUT_CLOSE").click(function() {
            $(this).data("ctrlr").OnClose()
        });
        setFloatingWindowStyle(1)
    };
    this.showChangepayMethod = function() {
        var HTML = this.pages.Checkout_ChangePayMethod;
        HTML = HTML.replace("#ORDERNUMBER#", this.orderNumber);
        $(this.pagesContainer).html(HTML);
        $("#CHECKOUT_CANCELORDER").data("ctrlr", this);
        $("#CHECKOUT_CANCELORDER").click(function() {
            $(this).data("ctrlr").CancelOrder()
        });
        $("#CHECKOUT_CASH").data("ctrlr", this);
        $("#CHECKOUT_CASH").click(function() {
            $(this).data("ctrlr").ChangeToCashOrder()
        });
        $("#CHECKOUT_CREDIT").data("ctrlr", this);
        $("#CHECKOUT_CREDIT").click(function() {
            $(this).data("ctrlr").ChangeToCreditOrder()
        });
        setFloatingWindowStyle(1)
    };
    this.UpdateOrder = function(status) {
        serverQuery("/Handlers/Checkout.ashx", {
            action: "update",
            status: status
        }, function(res, response, args) {
            if (res && response.status == true) {
                if (args.status == "cancel") {
                    args.owner.showCancelOrder()
                } else {
                    args.owner.showThankyou()
                }
            } else {
                if (response != null) {
                    alert(response.message)
                }
            }
        }, {
            owner: this,
            status: status
        })
    };
    this.CancelOrder = function() {
        this.UpdateOrder("cancel")
    };
    this.ChangeToCashOrder = function() {
        this.UpdateOrder("Cash")
    };
    Checkout.prototype.ChangeToCreditOrder = function() {
        this.redirectToPaymentGateway(this.cartHeader.paymethod)
    };
    this.showCancelOrder = function() {
        var HTML = this.pages.Checkout_Canceled;
        HTML = HTML.replace("#ORDERNUMBER#", this.orderNumber);
        $(this.pagesContainer).html(HTML);
        $("#CHECKOUT_CLOSE").data("ctrlr", this);
        $("#CHECKOUT_CLOSE").click(function() {
            $(this).data("ctrlr").OnClose()
        });
        setFloatingWindowStyle(1)
    };
    Checkout.prototype.redirectToPaymentGateway = function(gateway) {
        var __checkout = this;
        this.checkoutGateway = gateway;
        serverQuery("/Handlers/Checkout.ashx", {
            action: "GetPaymentInfo",
            Gateway: gateway,
            orderNumber: this.orderNumber,
            orderAmount: this.cartHeader.total,
            savedCard: this.cartHeader.paysavedcard,
            callbackMethod: "__checkout.paymentJsCallback"
        }, function(res, response, args) {
            if (res && response.status == true) {
                if (response.method == "Post" || response.method == "Get") {
                    var html = "";
                    var formID = createUUID();
                    html = "<form id='" + formID + "' style='display:none' method='" + response.method + "' action='" + response.PaymentGatewayURL + "'>";
                    var postValues = response.postValues;
                    for (var n in postValues) {
                        var v = postValues[n];
                        html += "<input type='hidden' name='" + n + "' value='" + v + "' />"
                    }
                    html += "</form>";
                    $(document.body).html(html);
                    $("#" + formID).submit()
                } else {
                    if (response.method == "Script") {
                        var script = response.postScript;
                        eval(script)
                    }
                }
            } else {
                if (response != null) {
                    alert(response.message)
                }
            }
        }, this)
    };
    Checkout.prototype.paymentJsCallback = function(data) {
        if (data) {
            serverQuery("/Handlers/Checkout.ashx?action=ProcessPayment&Gateway=" + this.checkoutGateway + "&orderNumber=" + this.orderNumber, data, function(res, response, args) {
                $("#CHECKOUT_POST").removeAttr("disabled");
                $("#CHECKOUT_POST").prop("value", "Checkout");
                if (response.status) {
                    args.showThankyou(false)
                } else {
                    args.showChangepayMethod()
                }
            }, this)
        } else {
            args.showChangepayMethod()
        }
    };
    this.sendOrderToGoogleAnalytics = function(isPosted) {
        var city = "";
        var area = "";
        var country = "";
        var address = null;
        if (typeof this.cartHeader.NewAddress !== "undefined" && this.cartHeader.AddressID == 0) {
            address = this.cartHeader.NewAddress;
            city = address.City;
            area = address.Area
        } else {
            if (userLogin.customerData != null) {
                address = userLogin.customerData.Addresses[0];
                for (var i = 0; i < userLogin.customerData.Addresses.length; i++) {
                    if (userLogin.customerData.Addresses[i].ID == this.cartHeader.AddressID) {
                        address = userLogin.customerData.Addresses[i];
                        break
                    }
                }
                city = address.CityText;
                area = address.AreaText
            }
        }
        var checkoutOptions = {};
        var actionField = {
            id: this.orderNumber,
            revenue: this.cartHeader.total,
            tax: "0",
            shipping: "0",
            step: 1
        };
        if (isPosted) {
            checkoutOptions = {
                paymentType: this.cartHeader.paymethod,
                orderType: (this.cartHeader.deliverytime_type == "now" ? "Immediate" : "Future"),
                orderMode: this.cartHeader.DelivaryOrTakeout == "Delivary" ? "Delivery" : "Takeaway",
                city: city,
                area: area,
                country: country
            };
            var paymentMethod = this.cartHeader.paymethod;
            var orderType = (this.cartHeader.delivarytime_type == "now" ? "Immediate" : "Future");
            var orderMode = this.cartHeader.DelivaryOrTakeout == "Delivary" ? "Delivery" : "Takeaway";
            var checkout_option = paymentMethod + ", " + orderType + ", " + orderMode;
            actionField.shipping = cart.cartTotals.ServiceCharge
        }
        var products = [];
        for (var n in cart.cartData) {
            var item = cart.cartData[n];
            products.push({
                name: GoogleTrack_getItemEnName(item.ID),
                id: item.ID,
                price: item.Price,
                brand: "",
                category: GoogleTrack_getItemCategory(item.ID),
                variant: "",
                quantity: 1,
                coupon: ""
            })
        }
        if (!isPosted) {
            googleTag.push({
                event: "checkout",
                Category: "",
                ElementType: "",
                ID: "",
                Name: "",
                ecommerce: {
                    checkout: {
                        actionField: actionField,
                        products: products
                    }
                }
            })
        } else {
            googleTag.push({
                event: "checkoutOption",
                Category: "",
                ElementType: "",
                ID: "",
                Name: "",
                ecommerce: {
                    checkout_option: {
                        actionField: {
                            step: 1,
                            option: checkout_option
                        }
                    }
                }
            });
            googleTag.push({
                event: "purchase",
                Category: "",
                ElementType: "",
                ID: "",
                Name: "",
                ecommerce: {
                    purchase: {
                        actionField: actionField,
                        products: products
                    }
                }
            })
        }
    }
}

function updateDateLabel(a, e) {
    if ($("input:radio[name=" + a.orderTimeElements.OrderTimeRadioName + "][value=advance]").prop("checked")) {
        var H = getServerTime();
        H = new Date(H.getFullYear(), H.getMonth(), H.getDate(), 0, 0, 0);
        var F = parseInt($("#" + a.orderTimeElements.dateFieldID).val());
        var b = parseInt($("#" + a.orderTimeElements.hourFieldID).val());
        var d = parseInt($("#" + a.orderTimeElements.minFieldID).val());
        if (isNaN(b)) {
            b = 0
        }
        if (isNaN(d)) {
            d = 0
        }
        H.setDate(H.getDate() + F);
        H.setHours(b);
        H.setMinutes(d);
        var x = formatDate(H, "yyyy-MM-dd HH:mm EE");
        $("#" + a.orderTimeElements.deliveryDateValueID).html(x);
        validateDeliveryTime = H;
        validateIsFutureOrder = true;
        var g = $("input:radio[name=" + a.orderTimeElements.OrderTimeRadioName + "]:checked").val() == 2;
        var G = (g ? getWorkTime(false, true, H) : getWorkTime(true, true, H)).split(":");
        workHoursFrom = parseInt(G[0].trim(), 10);
        workMinutesFrom = parseInt(G[1].trim(), 10);
        G = (g ? getWorkTime(false, false, H) : getWorkTime(true, false, H)).split(":");
        workHoursTo = parseInt(G[0].trim(), 10);
        workMinutesTo = parseInt(G[1].trim(), 10);
        var v = getServerTime();
        var f = null;
        var D = null;
        var c = null;
        var C = null;
        if (workHoursTo < 24) {
            f = new Date(v.getFullYear(), v.getMonth(), v.getDate(), workHoursFrom, workMinutesFrom, 0);
            D = new Date(v.getFullYear(), v.getMonth(), v.getDate(), workHoursTo, workMinutesTo, 0)
        } else {
            f = new Date(v.getFullYear(), v.getMonth(), v.getDate(), 0, 0, 0);
            D = new Date(v.getFullYear(), v.getMonth(), v.getDate(), workHoursTo - 24, workMinutesTo, 0);
            c = new Date(v.getFullYear(), v.getMonth(), v.getDate(), workHoursFrom, workMinutesFrom, 0);
            C = new Date(v.getFullYear(), v.getMonth(), v.getDate(), 23, 59, 0)
        }
        if (f != null) {
            f.setDate(v.getDate() + parseInt($("#" + a.orderTimeElements.dateFieldID).val()))
        }
        if (D != null) {
            D.setDate(v.getDate() + parseInt($("#" + a.orderTimeElements.dateFieldID).val()))
        }
        if (c != null) {
            c.setDate(v.getDate() + parseInt($("#" + a.orderTimeElements.dateFieldID).val()))
        }
        if (C != null) {
            C.setDate(v.getDate() + parseInt($("#" + a.orderTimeElements.dateFieldID).val()))
        }
        var z = $("#" + a.orderTimeElements.hourFieldID + " option");
        var s = $("#" + a.orderTimeElements.minFieldID + " option");
        v = new Date(v.getTime() + minFutureMinutes * 60000);
        var y = false;
        var B = "";
        var k = "";
        if (H.getTime() > v.getTime()) {
            if (D != null && (f.getTime() <= H.getTime() && H.getTime() < D.getTime())) {
                y = true
            } else {
                if (C != null && (c.getTime() <= H.getTime() && H.getTime() < C.getTime())) {
                    y = true
                }
            }
        }
        for (var A = 0; A < z.length; A++) {
            var o = $(z.get(A));
            var p = o.attr("value");
            var r = false;
            for (var w = 0; w < s.length; w++) {
                var q = $(s.get(w));
                var u = q.attr("value");
                var l = getServerTime();
                l = new Date(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0);
                l.setDate(l.getDate() + parseInt($("#" + a.orderTimeElements.dateFieldID).val()));
                l.setHours(p);
                l.setMinutes(u);
                if (l.getTime() > v.getTime()) {
                    if (D != null && (f.getTime() <= l.getTime() && l.getTime() < D.getTime())) {
                        r = true
                    } else {
                        if (C != null && (c.getTime() <= l.getTime() && l.getTime() < C.getTime())) {
                            r = true
                        }
                    }
                    if (B == "") {
                        B = $(o).val();
                        k = $(q).val()
                    }
                }
            }
            if (r) {
                o.removeAttr("disabled");
                o.show()
            } else {
                o.attr("disabled", "disabled");
                o.hide()
            }
        }
        for (var w = 0; w < s.length; w++) {
            var q = $(s.get(w));
            var u = q.attr("value");
            var l = getServerTime();
            l = new Date(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0);
            l.setDate(l.getDate() + parseInt($("#" + a.orderTimeElements.dateFieldID).val()));
            l.setHours($("#" + a.orderTimeElements.hourFieldID).val());
            l.setMinutes(u);
            if (l.getTime() > v.getTime() && D != null && (f.getTime() <= l.getTime() && l.getTime() < D.getTime())) {
                q.removeAttr("disabled");
                q.show()
            } else {
                if (l.getTime() > v.getTime() && C != null && (c.getTime() <= l.getTime() && l.getTime() < C.getTime())) {
                    q.removeAttr("disabled");
                    q.show()
                } else {
                    q.attr("disabled", "disabled");
                    q.hide()
                }
            }
        }
        if (!y && (typeof e === "undefined" || !e)) {
            $("#" + a.orderTimeElements.hourFieldID).val(B);
            $("#" + a.orderTimeElements.minFieldID).val(k);
            updateDateLabel(a, true)
        } else {
            if (typeof checkoutForm !== "undefined" && checkoutForm != null) {
                checkoutForm.validateCheck(checkoutForm.page == "finish" ? false : true)
            }
        }
        if (useBoxIt) {
            var E = $("#" + a.orderTimeElements.dateFieldID).data("selectBox-selectBoxIt");
            var t = $("#" + a.orderTimeElements.hourFieldID).data("selectBox-selectBoxIt");
            var j = $("#" + a.orderTimeElements.minFieldID).data("selectBox-selectBoxIt");
            if (typeof E !== "undefined" && E != null) {
                E.refresh()
            }
            if (typeof t !== "undefined" && t != null) {
                t.refresh()
            }
            if (typeof j !== "undefined" && j != null) {
                j.refresh()
            }
        }
    } else {
        if (typeof checkoutForm !== "undefined" && checkoutForm != null) {
            checkoutForm.validateCheck(checkoutForm.page == "finish" ? false : true)
        }
    }
}

function showFutureOrderFields(b) {
    var m = typeof b.cartHeader === "undefined";
    var o = 24 * 60 * 60 * 1000;
    var f = new Date(b.minDate.valueOf() + (minFutureMinutes * 60 * 1000));
    var a = new Date(f.valueOf() + (MaxFutureDays * 24 * 60 * 60 * 1000));
    var j = Math.round(Math.abs((f.getTime() - a.getTime()) / (o)));
    b.useCalendar = j > 10;
    delivaryTime = new Date();
    if (typeof b.cartHeader !== "undefined") {
        var l = new Date();
        l = getDateFromFormat(b.cartHeader.delivarytime_date, "yyyy-MM-dd HH:mm:ss")
    }
    delivaryTime.setTime(m ? cart.cartHeader.delivarytime_date : l);
    validateDeliveryTime = delivaryTime;
    var k = Math.round(Math.abs((f.getTime() - delivaryTime.getTime()) / (o)));
    if (b.useCalendar) {
        if ($("#" + b.orderTimeElements.ComboContainerID).length) {
            $("#" + b.orderTimeElements.ComboContainerID).hide()
        }
        if ($("#" + b.orderTimeElements.CalendarContainerID).length) {
            $("#" + b.orderTimeElements.CalendarContainerID).show()
        }
        f = new Date(f.valueOf() + (30 * 60 * 1000));
        a = new Date(f.valueOf() + (MaxFutureDays * 24 * 60 * 60 * 1000));
        var c = a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate();
        $("#" + b.orderTimeElements.inputID).datetimepicker({
            minDate: f.getFullYear() + "/" + (f.getMonth() + 1) + "/" + f.getDate() + " " + f.getHours() + ":" + f.getMinutes(),
            maxDate: c,
            dateFormat: "dd/mm/yyyy",
            timeFormat: "hh:mm",
            ampm: false,
            step: 30
        });
        if (f > delivaryTime) {
            $("#" + b.orderTimeElements.inputID).val("")
        } else {
            if ((typeof b.OrderTimeSelected !== "undefined" && b.OrderTimeSelected == "advance") || (typeof b.cartHeader !== "undefined" && b.cartHeader.delivarytime_type == "advance")) {
                $("#" + b.orderTimeElements.inputID).val(delivaryTime.getFullYear() + "/" + ("0" + (delivaryTime.getMonth() + 1)).slice(-2) + "/" + ("0" + delivaryTime.getDate()).slice(-2) + " " + (delivaryTime.getHours() < 10 ? "0" : "") + delivaryTime.getHours() + ":" + (delivaryTime.getMinutes() < 10 ? "0" : "") + delivaryTime.getMinutes())
            }
        }
    } else {
        if ($("#" + b.orderTimeElements.ComboContainerID).length) {
            $("#" + b.orderTimeElements.ComboContainerID).show()
        }
        if ($("#" + b.orderTimeElements.CalendarContainerID).length) {
            $("#" + b.orderTimeElements.CalendarContainerID).hide()
        }
        var h = "<option value='0' selected='selected'>" + Translate("Today") + "</option>";
        for (var g = 1; g <= j; g++) {
            var e = "";
            if (k == g) {
                e = " selected='selected' "
            }
            if (g > 2) {
                h += "<option " + e + " value='" + g + "'>" + Translate("After") + " " + g + " " + Translate("days") + "</option>"
            } else {
                if (g == 2) {
                    h += "<option " + e + " value='" + g + "'>" + Translate("After Tomorrow") + "</option>"
                } else {
                    if (g == 1) {
                        h += "<option " + e + " value='" + g + "'>" + Translate("Tomorrow") + "</option>"
                    }
                }
            }
        }
        $("#" + b.orderTimeElements.dateFieldID).html(h);
        if ((typeof b.OrderTimeSelected !== "undefined" && b.OrderTimeSelected == "advance") || (typeof b.cartHeader !== "undefined" && b.cartHeader.delivarytime_type == "advance")) {
            $("#" + b.orderTimeElements.hourFieldID).val(delivaryTime.getHours());
            $("#" + b.orderTimeElements.minFieldID).val(delivaryTime.getMinutes())
        }
        $("#" + b.orderTimeElements.dateFieldID).change(function() {
            updateDateLabel(b)
        });
        $("#" + b.orderTimeElements.hourFieldID).change(function() {
            updateDateLabel(b)
        });
        $("#" + b.orderTimeElements.minFieldID).change(function() {
            updateDateLabel(b)
        })
    }
    if ((m ? cart.cartHeader.delivarytime_type : b.cartHeader.delivarytime_type) == "advance") {
        $("input:radio[name=" + b.orderTimeElements.OrderTimeRadioName + "][value=advance]").prop("checked", true);
        $("input:radio[name=" + b.orderTimeElements.OrderTimeRadioName + "][value=now]").prop("checked", false);
        if (!b.useCalendar) {
            $("#" + b.orderTimeElements.deliveryDateLabelID).show();
            $("#" + b.orderTimeElements.deliveryDateValueID).show()
        }
        validateIsFutureOrder = true
    } else {
        $("input:radio[name=" + b.orderTimeElements.OrderTimeRadioName + "][value=now]").prop("checked", true);
        $("input:radio[name=" + b.orderTimeElements.OrderTimeRadioName + "][value=advance]").prop("checked", false);
        if (!b.useCalendar) {
            $("#" + b.orderTimeElements.deliveryDateLabelID).hide();
            $("#" + b.orderTimeElements.deliveryDateValueID).hide()
        }
        validateIsFutureOrder = false
    }
    $("input:radio[name=" + b.orderTimeElements.OrderTimeRadioName + "]").data("radioCtrl", b);
    $("input:radio[name=" + b.orderTimeElements.OrderTimeRadioName + "]").click(function() {
        var d = $("input:radio[name=" + b.orderTimeElements.OrderTimeRadioName + "]:checked").val();
        if (!$(this).data("radioCtrl").useCalendar) {
            $("#" + b.orderTimeElements.dateFieldID).prop("disabled", d == "now");
            $("#" + b.orderTimeElements.hourFieldID).prop("disabled", d == "now");
            $("#" + b.orderTimeElements.minFieldID).prop("disabled", d == "now");
            if (d == "advance") {
                $("#" + b.orderTimeElements.deliveryDateLabelID).show();
                $("#" + b.orderTimeElements.deliveryDateValueID).show();
                updateDateLabel($(this).data("radioCtrl"))
            } else {
                $("#" + b.orderTimeElements.deliveryDateLabelID).hide();
                $("#" + b.orderTimeElements.deliveryDateValueID).hide()
            }
        } else {
            $("#" + b.orderTimeElements.inputID).prop("disabled", d == "now")
        }
    });
    if (!IsValidStoreWorkTime && cart.postOrderID == 0) {
        $("input:radio[name=" + b.orderTimeElements.OrderTimeRadioName + "][value=now]").prop("disabled", true);
        $("input:radio[name=" + b.orderTimeElements.OrderTimeRadioName + "][value=now]").prop("checked", false);
        $("input:radio[name=" + b.orderTimeElements.OrderTimeRadioName + "][value=advance]").prop("checked", true);
        m ? cart.cartHeader.delivarytime_type = "advance" : b.cartHeader.delivarytime_type = "advance"
    }
    if ((m ? cart.cartHeader.DelivaryOrTakeout : b.cartHeader.DelivaryOrTakeout) == "Takeaway" && !OriginalStores[m ? cart.cartHeader.StoreID : b.cartHeader.StoreID]["IsInWorkHours"]) {
        $("input:radio[name=" + b.orderTimeElements.OrderTimeRadioName + "][value=now]").prop("checked", false);
        $("input:radio[name=" + b.orderTimeElements.OrderTimeRadioName + "][value=advance]").prop("checked", true);
        $("input:radio[name=" + b.orderTimeElements.OrderTimeRadioName + "][value=now]").prop("disabled", true)
    } else {
        if (!b.useCalendar) {
            $("#" + b.orderTimeElements.dateFieldID).prop("disabled", (m ? cart.cartHeader.delivarytime_type : b.cartHeader.delivarytime_type) == "now");
            $("#" + b.orderTimeElements.hourFieldID).prop("disabled", (m ? cart.cartHeader.delivarytime_type : b.cartHeader.delivarytime_type) == "now");
            $("#" + b.orderTimeElements.minFieldID).prop("disabled", (m ? cart.cartHeader.delivarytime_type : b.cartHeader.delivarytime_type) == "now")
        } else {
            $("#" + b.orderTimeElements.inputID).prop("disabled", (m ? cart.cartHeader.delivarytime_type : b.cartHeader.delivarytime_type) == "now")
        }
    }
}

function validateFutureTime(a) {
    if ($("input:radio[name=" + a.orderTimeElements.OrderTimeRadioName + "]:checked").val() != "advance") {
        return true
    }
    var c = new Date();
    if (a.useCalendar) {
        var b = $("#" + a.orderTimeElements.inputID).val();
        c = new Date(getDateFromFormat(b, "yyyy/MM/dd HH:mm"))
    } else {
        c.setDate(c.getDate() + parseInt($("#" + a.orderTimeElements.dateFieldID).val()));
        c.setHours(parseInt($("#" + a.orderTimeElements.hourFieldID).val()));
        c.setMinutes(parseInt($("#" + a.orderTimeElements.minFieldID).val()))
    }
    var d = new Date(a.minDate.valueOf() + (minFutureMinutes * 60 * 1000));
    return c > d
}

function getWorkTime(e, a, c) {
    var d = null;
    var b = c.getDay();
    if (e && a) {
        d = WorkTimes.DeliveryStart[b]
    } else {
        if (e && !a) {
            d = WorkTimes.DeliveryEnd[b]
        } else {
            if (!e && a) {
                d = WorkTimes.TakeoutStart[b]
            } else {
                if (!e && !a) {
                    d = WorkTimes.TakeoutEnd[b]
                }
            }
        }
    }
    if (d == null || d == "") {
        if (e && a) {
            d = WorkTimeForDelivery_start
        } else {
            if (e && !a) {
                d = WorkTimeForDelivery_end
            } else {
                if (!e && a) {
                    d = WorkTimeForTakeout_start
                } else {
                    if (e && !a) {
                        d = WorkTimeForTakeout_end
                    }
                }
            }
        }
    }
    return d
}

function ContactUs() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.orderID = null;
    this.onClose = null;
    this.Show = function() {
        this.DrawContact()
    };
    this.DrawContact = function() {
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        googleTag.push({
            event: "PageView",
            PageName: "Contact Us",
            PageURL: "/" + UserLanguage + "/contact"
        });
        googleTag.push({
            event: "Open",
            Category: "Contact Us",
            ElementType: "",
            ID: "",
            Name: ""
        });
        var a = this.pages.ContactUs_Main;
        $(this.pagesContainer).html(a);
        var c = this;
        $("#contact_send").click(function() {
            c.send_click()
        });
        $("#contact_close").click(function() {
            c.close_click()
        });
        if (this.orderID != null && typeof this.orderID !== "undefined") {
            $("#contact_ordernumber").val(this.orderID);
            $("#contact_subject").val("Order Feedback")
        }
        if (useJUICombo) {
            $("#contact_subject").combobox();
            $("#phone1type").combobox()
        }
        $.mask.definitions["#"] = "[_ 0-9]";
        $("#phone1type").change(function() {
            var d = $("#phone1type").val();
            $("#contact_telephone").val("").prop("readonly", (d == -1)).mask(PhoneMasks[d]);
            if ((d == -1) || (d == 2)) {
                $("#lblPhone1Ext").prop("disabled", true);
                $("#phone1ext").prop("disabled", true)
            } else {
                $("#lblPhone1Ext").removeAttr("disabled");
                $("#phone1ext").removeAttr("disabled")
            }
        }).val(DefPhoneType).change();
        if (userLogin.isLoggedIn()) {
            var b = userLogin.customerData;
            $("#contact_fname").val(b.FirstName);
            $("#contact_lname").val(b.LastName);
            $("#contact_email").val(b.EMail);
            $("#phone1type").val(b.PhoneType).change();
            $("#contact_telephone").val(b.PhoneNumber);
            $("#phone1ext").val(b.PhoneExtension)
        }
        if (this.afterShowPage != null) {
            this.afterShowPage(2)
        }
    };
    this.DrawThanks = function() {
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        var a = this.pages.ContactUs_Thanks;
        $(this.pagesContainer).html(a);
        $("#contact_close").data("ctrlr", this);
        $("#contact_close").click(function() {
            $(this).data("ctrlr").close_click()
        });
        if (this.afterShowPage != null) {
            this.afterShowPage(1)
        }
    };
    this.send_click = function() {
        var a = {
            Action: "contact",
            contact_subject: $("#contact_subject").val(),
            contact_fname: $("#contact_fname").val(),
            contact_lname: $("#contact_lname").val(),
            contact_email: $("#contact_email").val(),
            contact_phoneType: $("#phone1type").val(),
            contact_telephone: $("#contact_telephone").val(),
            contact_phoneExt: $("#phone1ext").val(),
            contact_comment: $("#contact_comment").val(),
            contact_ordernumber: $("#contact_ordernumber").val()
        };
        if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($("#contact_email").val())) {
            alert("Please enter a valid email");
            return
        }
        if (a.contact_subject == "0" || a.contact_fname == "" || a.contact_email == "" || a.contact_telephone == "" || a.contact_comment == "") {
            alert("Please enter all the required fields.");
            return
        }
        $("#contact_send").attr("disabled", "disabled");
        serverQuery("/Handlers/ContactUs.ashx", a, function(c, d, b) {
            $("#contact_send").removeAttr("disabled");
            if (c && d.valid == true) {
                b.DrawThanks()
            } else {
                alert("Sending message failed, please try again")
            }
        }, this)
    };
    this.close_click = function() {
        if (this.onClose != null) {
            this.onClose()
        }
    }
}

function CustomerRegistration() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.validator = null;
    this.OnClose = null;
    this.address_longitude = 0;
    this.address_latitude = 0;
    this.UseMap = false;
    this.address_placeID = null;
    this.address_place = null;
    this.Show = function() {
        document._register = this;
        document._continueRegisterInit = function() {
            document._register._Show()
        };
        loadGoogleMapsJS(document._continueRegisterInit)
    };
    this._Show = function() {
        var b = this;
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        googleTag.push({
            event: "PageView",
            PageName: "Registration",
            PageURL: "/" + UserLanguage + "/register"
        });
        googleTag.push({
            event: "Open",
            Category: "Registration",
            ElementType: "",
            ID: "",
            Name: ""
        });
        $("#lang_url_un").unbind("click.register");
        $("#lang_url_un").bind("click.register", function() {
            b.SaveState()
        });
        $("#lang_url_en").unbind("click.register");
        $("#lang_url_en").bind("click.register", function() {
            b.SaveState()
        });
        if (this.afterShowPage != null) {
            this.afterShowPage()
        }
        if (translate) {
            $("#preflang").val("2").change()
        }
        if (this.map) {
            google.maps.event.trigger(this.map, "resize")
        }
        setFloatingWindowStyle(1);
        this.LoadSate();
        if (!UnifiedRegistration) {
            $("#mobilenumber").val("").mask(PhoneMasks[2]);
            var a = this.pages.CustomerRegistration_Select;
            $(this.pagesContainer).html(a);
            $("#btnNewcustomer").click(function() {
                b.ShowRegisterNew()
            });
            $("#btnFacebookRegister").click(function() {
                b.ShowRegisterUsingFacebook()
            });
            $("#btnGoogleRegister").click(function() {
                b.ShowRegisterUsingGoogle()
            });
            $("#btnExistingcustomer").click(function() {
                if (isResponsive && $(window).width() < 800) {
                    window.scrollTo(0, 0)
                }
                b.SubmitRegisterExisting_Step1()
            })
        } else {
            this.UnifiedRegister_EnterMobile()
        }
    };
    this.ShowRegisterNew = function(e) {
        var k = this;
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        var a = this.pages.CustomerRegistration_RegisterNew;
        $(this.pagesContainer).html(a);
        FillDropDownList("customertitle", OriginalTitles, true);
        FillDropDownList("nationality", OriginalNationalities, true, undefined, undefined, true);
        FillDropDownList("addresstype", OriginalAddressTypes, true);
        FillDropDownList("buildingtype", OriginalBuildingTypes, false);
        FillDropDownList("city", OriginalCities, true);
        $("#city").val(DefCityID);
        if (useJUICombo) {
            $("#gender").combobox();
            $("#DateOfBirth_Day").combobox({
                enableInput: true
            });
            $("#DateOfBirth_Month").combobox();
            $("#DateOfBirth_Year").combobox();
            $("#addresstype").combobox();
            if ($("#city").is("select")) {
                $("#city").combobox()
            }
            $("#phone1type").combobox();
            $("#phone2type").combobox();
            $("#phone3type").combobox();
            $("#preflang").combobox();
            $("#maritalStat").combobox();
            $("#securityQuestion").combobox();
            $("#nationality").combobox({
                enableInput: true
            })
        }
        $("#btnRegister").click(function() {
            k.validator.ValidateBeforePost(function(p) {
                k.SubmitRegisterNew()
            })
        });
        $("#chkTax").change(function() {
            if ($("#chkTax").is(":checked")) {
                $("#taxnoteslabel").show();
                $("#taxnotes").show()
            } else {
                $("#taxnoteslabel").hide();
                $("#taxnotes").hide()
            }
        }).change();
        $("#resendActivationLink").click(function() {
            k.ResendActivationLink_click()
        });
        $("#linkRegister").click(function() {
            showCustomRegistration()
        });
        $.mask.definitions["#"] = "[_ 0-9]";
        $("#phone1type").change(function() {
            var p = $("#phone1type").val();
            $("#phone1number").val("").prop("readonly", (p == -1)).mask(PhoneMasks[p]);
            if ((p == -1) || (p == 2)) {
                $("#lblPhone1Ext").prop("disabled", true);
                $("#phone1ext").prop("disabled", true)
            } else {
                $("#lblPhone1Ext").removeAttr("disabled");
                $("#phone1ext").removeAttr("disabled")
            }
        }).val(DefPhoneType).change();
        $("#phone1id").val(-1);
        $("#continueToLocationSection").unbind("click");
        $("#continueToLocationSection").click(function() {
            $("#aboutusersection").removeClass("active");
            $("#locationsection").addClass("active");
            var p = ($("#locationsection").offset().top) - 20;
            window.scrollTo(0, p);
            if (AddressEntryType == "Both" || AddressEntryType == "Map") {
                getGPSLocation(function(q) {
                    k.address_longitude = q.lng();
                    k.address_latitude = q.lat();
                    $("#city").val(DefCityID);
                    $("#area").val("");
                    $("#road").val("");
                    $("#district").val("");
                    k.addressMarker.setPosition(q);
                    google.maps.event.trigger(k.map, "resize");
                    k.map.setCenter(q);
                    k.map.setZoom(16);
                    ValidateIfAreaIsServed(k.UseMap, k.address_latitude, k.address_longitude, false, null)
                }, true)
            }
        });
        $("#continueToSecuritySection").unbind("click");
        $("#continueToSecuritySection").click(function() {
            $("#locationsection").removeClass("active");
            $("#securitydetailssection").addClass("active");
            var p = ($("#securitydetailssection").offset().top) - 20;
            window.scrollTo(0, p)
        });
        var l = function(q, p) {
            var r = 0;
            var s = 0;
            s = $("#city").val();
            if (typeof OriginalCities[s] !== "undefined") {
                r = OriginalCities[s].ProvinceID
            } else {
                s = 0
            }
            $.ajax({
                type: "GET",
                url: "/Find/Customer/District?ShowWait=0",
                dataType: "json",
                data: {
                    province: r,
                    city: s,
                    term: (typeof q !== "undefined" && q != null && typeof q.term !== "undefined" && q.term != null) ? q.term : ""
                },
                success: function(u) {
                    if (typeof p !== "undefined" && p != null) {
                        p(u)
                    } else {
                        $("#district").children().remove();
                        if (useJUICombo || useBoxIt) {
                            $("#district").append($("<option value=''>- " + Translate("Select a value") + " -</option>"))
                        } else {
                            $("#district").append($("<option value=''>- " + Translate("District") + " -</option>"))
                        }
                        $("#district").val("");
                        for (var v in u) {
                            var t = u[v];
                            $("#district").append($("<option value='" + u[v] + "'>" + u[v] + "</option>"))
                        }
                    }
                }
            })
        };
        if ($("#district").is("input")) {
            $("#district").autocomplete({
                source: l,
                minLength: 2
            })
        } else {
            if ($("#district").is("select")) {
                if (useJUICombo) {
                    $("#district").combobox()
                }
            }
        }
        $("#city").change(l);
        $("#city").change();
        $("#road").autocomplete({
            source: function(q, p) {
                var r = 0;
                var s = 0;
                s = $("#city").val();
                if (typeof OriginalCities[s] !== "undefined") {
                    r = OriginalCities[s].ProvinceID
                } else {
                    s = 0
                }
                $.ajax({
                    type: "GET",
                    url: "/Find/Customer/Street?ShowWait=0",
                    dataType: "json",
                    data: {
                        province: r,
                        city: s,
                        term: q.term
                    },
                    success: function(t) {
                        p(t)
                    }
                })
            },
            minLength: 2
        });
        var m = function(r, p) {
            if (typeof $("#area") === "undefined" || $("#area") == null) {
                return
            }
            var q = 0;
            var s = 0;
            s = $("#city").val();
            if (typeof OriginalCities[s] !== "undefined") {
                q = OriginalCities[s].ProvinceID
            } else {
                s = 0
            }
            $.ajax({
                type: "GET",
                url: "/Find/Customer/Area?ShowWait=0",
                dataType: "json",
                data: {
                    province: q,
                    city: s,
                    term: (typeof r !== "undefined" && r != null && typeof r.term !== "undefined" && r.term != null) ? r.term : ""
                },
                success: function(v) {
                    $("#area").children().remove();
                    if (useJUICombo || useBoxIt) {
                        $("#area").append($("<option value=''>- " + Translate("Select a value") + " -</option>"))
                    } else {
                        $("#area").append($("<option value=''>- " + Translate("Area") + " -</option>"))
                    }
                    var t = null;
                    for (var w in v) {
                        var u = v[w];
                        $("#area").append($("<option value='" + v[w] + "'>" + v[w] + "</option>"))
                    }
                    if (t != null) {
                        $("#area").val(t)
                    } else {
                        $("#area").val("").change()
                    }
                }
            })
        };
        if ($("#area").is("input")) {
            $("#area").autocomplete({
                source: function(q, p) {
                    var r = 0;
                    var s = 0;
                    s = $("#city").val();
                    if (typeof OriginalCities[s] !== "undefined") {
                        r = OriginalCities[s].ProvinceID
                    } else {
                        s = 0
                    }
                    $.ajax({
                        type: "GET",
                        url: "/Find/Customer/Area?ShowWait=0",
                        dataType: "json",
                        data: {
                            province: r,
                            city: s,
                            term: q.term
                        },
                        success: function(t) {
                            p(t)
                        }
                    })
                },
                minLength: 2
            })
        } else {
            if ($("#area").is("select")) {
                if (useJUICombo) {
                    $("#area").combobox({
                        enableInput: true
                    })
                }
                $("#city").change(m);
                $("#city").change()
            }
        }
        m();
        $("#mapAddressClick").click(function() {
            $("#registerManualAddress").hide();
            $("#registerMapAddress").show();
            $("#manualAddressClick").removeClass("active");
            $("#mapAddressClick").addClass("active");
            k.UseMap = true;
            google.maps.event.trigger(k.map, "resize");
            k.map.setCenter(new google.maps.LatLng(k.address_latitude, k.address_longitude));
            ValidateIfAreaIsServed(k.UseMap, k.address_latitude, k.address_longitude, false, null)
        });
        $("#manualAddressClick").click(function() {
            $("#registerManualAddress").show();
            $("#registerMapAddress").hide();
            $("#mapAddressClick").removeClass("active");
            $("#manualAddressClick").addClass("active");
            k.UseMap = false;
            $(".areanotservedmsg").hide()
        });
        if (AddressEntryType != "Both") {
            $("#mapButtons").hide()
        } else {
            $("#mapButtons").show()
        }
        if (AddressEntryType == "Both" || AddressEntryType == "Map") {
            $("#registerMapAddress").show();
            $("#registerManualAddress").hide();
            this.UseMap = true
        } else {
            $("#registerMapAddress").hide();
            $("#registerManualAddress").show();
            this.UseMap = false
        }
        if (AddressEntryType == "Both" || AddressEntryType == "Map") {
            var h = this;
            var b = new google.maps.LatLng(DefaultMapAddressLocation.split(",")[0].trim(), DefaultMapAddressLocation.split(",")[1].trim());
            this.map = new google.maps.Map($("#registerMapAddress").get(0), {
                zoom: 6,
                center: b,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            this.addressMarker = new google.maps.Marker({
                map: this.map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: b
            });
            google.maps.event.addListener(this.addressMarker, "position_changed", function() {
                var p = h.addressMarker.getPosition();
                h.address_latitude = p.lat();
                h.address_longitude = p.lng()
            });
            navigator.geolocation.getCurrentPosition(function(q) {
                var p = new google.maps.LatLng(q.coords.latitude, q.coords.longitude);
                h.address_longitude = p.lng();
                h.address_latitude = p.lat();
                $("#city").val(DefCityID);
                $("#area").val("");
                $("#road").val("");
                $("#district").val("");
                h.addressMarker.setPosition(p);
                h.map.setCenter(p);
                h.map.setZoom(16);
                $("#direction").val("");
                GetPlace(h.map, p, function(r) {
                    $("#direction").val(r.formatted_address)
                });
                ValidateIfAreaIsServed(h.UseMap, h.address_latitude, h.address_longitude, false, null)
            }, function(p) {
                if (ForceUsingGPS) {
                    switch (p.code) {
                        case p.PERMISSION_DENIED:
                            alert(Translate("GPS location service is not enabled, please enable it and refresh your browser to determine your current location."), 160);
                            break
                    }
                } else {}
            }, {
                timeout: 7000
            });
            google.maps.event.addListener(this.addressMarker, "dragend", function(p) {
                $("#direction").val("");
                GetPlace(h.map, p.latLng, function(q) {
                    $("#direction").val(q.formatted_address)
                });
                ValidateIfAreaIsServed(h.UseMap, h.address_latitude, h.address_longitude, false, null)
            })
        }
        if (typeof e !== "undefined") {
            $("#emailaddress").val(e.email);
            $("#confirmemailaddress").val(e.email);
            $("#firstname").val(e.firstname);
            $("#lastname").val(e.lastname);
            $("#fullname").val(e.firstname + " " + e.lastname);
            if (e.email != "") {
                $("#emailaddress").prop("readonly", true);
                $("#confirmemailaddress").prop("readonly", true)
            }
            if (e.firstname != "") {
                $("#firstname").prop("readonly", true);
                $("#fullname").prop("readonly", true)
            }
            if (e.lastname != "") {
                $("#lastname").prop("readonly", true)
            }
            $("#emailaddress").css("background-color", "#dddddd");
            $("#confirmemailaddress").css("background-color", "#dddddd");
            $("#firstname").css("background-color", "#dddddd");
            $("#lastname").css("background-color", "#dddddd");
            $("#fullname").css("background-color", "#dddddd");
            if (typeof(e.birthday) !== "undefined" && e.birthday != "") {
                var o = new Date(getDateFromFormat(e.birthday, "MM/dd/yyyy"));
                $("#DateOfBirth_Day").val(o.getDate()).change();
                $("#DateOfBirth_Month").val(o.getMonth()).change();
                $("#DateOfBirth_Year").val(o.getFullYear()).change()
            }
            if (typeof(e.gender) !== "undefined" && e.gender != "") {
                $("#gender").val(e.gender.toLowerCase() == "male" ? 1 : 0).change()
            }
            if (typeof(e.relation) !== "undefined" && e.relation != "") {
                $("#maritalStat").val(e.relation.toLowerCase() == "married" ? 1 : 0).change()
            }
            if (typeof(e.language) !== "undefined" && e.language != "") {
                $("#preflang").val(e.language.toLowerCase().substr(0, 2) == "en" ? "E" : "U").change()
            }
            if (typeof(e.location) !== "undefined" && e.location != "") {
                var j = e.location.toLowerCase().split(",");
                var g = "";
                if (j.length > 0) {
                    g = j[0]
                }
                var d = -1;
                for (var f in OriginalCities) {
                    var c = OriginalCities[f];
                    if (namesSimilar(c.Name, g)) {
                        d = c.ID
                    }
                }
                if (d > -1) {
                    $("#city").val(d).change()
                }
            }
        }
        if (this.afterShowPage != null) {
            this.afterShowPage()
        }
        var k = this;
        this.validator = new FormValidator($("#frmRegister"), {
            firstname: {
                customValidation: function(p, q, t) {
                    var s = $("#firstname").val();
                    var r = $("#firstname").length == 1;
                    t(r == false || (r && s), Translate("Please enter your first name"), q)
                }
            },
            lastname: {
                customValidation: function(p, q, t) {
                    var s = $("#lastname").val();
                    var r = $("#lastname").length == 1;
                    t(r == false || (r && s), Translate("Please enter your last name"), q)
                }
            },
            fullname: {
                customValidation: function(p, q, t) {
                    var s = $("#fullname").val();
                    var r = $("#fullname").length == 1;
                    t(r == false || (r && s), Translate("Please enter your full name"), q)
                }
            },
            phone1number: {
                customValidation: function(q, r, u) {
                    var s = parseInt($("#phone1type").val());
                    var t = $("#phone1number").val().replace(/[^\d]*/g, "");
                    var p = PhoneMasks[s].replace(/[^\d]*/g, "").length;
                    if (s < 0) {
                        u(false, Translate("Please select a phone type"), r)
                    } else {
                        if (t.length < p) {
                            u(false, Translate("Please enter your mobile number"), r)
                        } else {
                            if (s == 2) {
                                serverQuery("/Handlers/CustomerRegistration.ashx?ShowWait=0", {
                                    Action: "ValidatePhoneExistance",
                                    number: t
                                }, function(v, w, y) {
                                    if (v) {
                                        var x = "<a id='activateexisting' style='text-decoration:underline !important'>" + Translate("Phone number is already registered. If you already have an existing call center account please click here to activate your online account.") + "</a>";
                                        y(w.valid, x, r);
                                        $("#activateexisting").click(function() {
                                            var z = $("#phone1number").val();
                                            k.SubmitRegisterExisting_Step1(z);
                                            $(window).scrollTop(0)
                                        })
                                    } else {
                                        y(false, "Validation failed due to a server error", r)
                                    }
                                }, u)
                            } else {
                                u(true, "", r)
                            }
                        }
                    }
                }
            },
            phone1ext: {
                customValidation: function(p, q, s) {
                    var r = $("#phone1ext").val();
                    if (isNaN(Number(r)) && r.length != 0) {
                        s(false, Translate("Extension should be a number"), q)
                    } else {
                        s(true, "", q)
                    }
                }
            },
            emailaddress: {
                required: true,
                requiredMsg: Translate("Please fill the EMail address"),
                email: true,
                emailMsg: Translate("Please enter a valid EMail address"),
                customValidation: function(p, r, s) {
                    var q = $("#" + p).val();
                    serverQuery("/Handlers/CustomerRegistration.ashx?ShowWait=0", {
                        Action: "ValidateEMailExistance",
                        emailaddress: q
                    }, function(t, u, w) {
                        if (t) {
                            var v = "";
                            if (u.msg != "") {
                                v = "<a id='resendActivationLink'>" + u.msg + "</a>"
                            }
                            w(u.valid, v, r);
                            $("#resendActivationLink").click(function() {
                                k.ResendActivationLink_click()
                            })
                        } else {
                            w(false, "Validation failed due to a server error", r)
                        }
                    }, s)
                }
            },
            confirmemailaddress: {
                required: true,
                requiredMsg: Translate("Please re-type your EMail address"),
                equalTo: "#emailaddress",
                equalToMsg: Translate("Please enter the same EMail address as above")
            },
            password: {
                required: true,
                requiredMsg: Translate("Please enter a password")
            },
            confirmpassword: {
                required: true,
                requiredMsg: Translate("Please re-type your password"),
                equalTo: "#password",
                equalToMsg: Translate("Please enter the same password as above")
            },
            addresstype: {
                required: false,
                requiredMsg: Translate("Please select an address type")
            },
            city: {
                customValidation: function(q, r, t) {
                    var s = $("#" + q).val();
                    var p = AddressEntryType == "Manual";
                    if ((!s || s == -1) && p) {
                        t(false, Translate("Please select a city"), r)
                    } else {
                        t(true, "", r)
                    }
                }
            },
            area: {
                customValidation: function(q, r, t) {
                    var s = $("#" + q).val();
                    var p = AddressEntryType == "Manual";
                    if ((!s || s == -1) && p) {
                        t(false, Translate("Please fill area field"), r)
                    } else {
                        t(true, "", r)
                    }
                }
            },
            securityQuestion: {
                required: true,
                requiredMsg: Translate("Please select a security question")
            },
            securityAnswer: {
                required: true,
                requiredMsg: Translate("Please enter a security answer")
            },
            buildingname: {
                required: true,
                requiredMsg: Translate("Please fill building name")
            },
            flatno: {
                required: true,
                requiredMsg: Translate("Please fill flat number")
            }
        });
        this.validator.onShowValidateMessage = function(t, p, r, s, u) {
            var q = null;
            if (p == "phone1type" || p == "phone1number" || p == "phone1ext") {
                if ($("#phone1Container").length) {
                    q = $("#phone1Container")
                } else {
                    q = $("#phone1ext")
                }
            }
            if (p == "taxnotes" || p == "chkTax") {
                q = $("#chkTaxLabel")
            }
            if (!t) {
                tooltip($("#" + p), s, 0, u, q)
            } else {
                tooltip($("#" + p), "", 1, false, q)
            }
        };
        if (AddressEntryType == "Both" || AddressEntryType == "Map") {
            google.maps.event.trigger(this.map, "resize");
            this.map.setCenter(new google.maps.LatLng(this.address_latitude, this.address_longitude))
        }
        $("#frmRegister input").focusout({
            customerRegistration: this
        }, function(p) {
            p.data.customerRegistration.SaveState()
        });
        googleTag.push({
            event: "PageView",
            PageName: "Register New",
            PageURL: "/register/newregistration"
        });
        googleTag.push({
            event: "Open",
            Category: "Register New",
            ElementType: "",
            ID: "",
            Name: ""
        })
    };
    this.ResendActivationLink_click = function() {
        var a = {
            Action: "RegisterNewCustomer_ResendActivateLink",
            Email: $("#emailaddress").val()
        };
        $("#resendActivationLink").attr("disabled", "disabled");
        serverQuery("/Handlers/CustomerRegistration.ashx", a, function(c, d, b) {
            $("#resendActivationLink").removeAttr("disabled");
            if (c) {
                if (d.valid) {
                    alert("Activation email sent.")
                } else {
                    alert(d.message)
                }
            } else {
                alert("Request failed")
            }
        }, this)
    };
    this.SubmitRegisterNew = function() {
        if (!$("#chkAcceptTermsAndConditions").prop("checked")) {
            alert("Can't proceed with the registration without accepting the terms and conditions");
            return
        }
        if ($("#chkTax").prop("checked") && $("#taxnotes").val() == "") {
            alert("Please fill Tax receipt information");
            return
        }
        var c = parseInt($("#DateOfBirth_Year").val(), 10);
        var e = parseInt($("#DateOfBirth_Month").val(), 10);
        var a = parseInt($("#DateOfBirth_Day").val(), 10);
        if (!isNaN(c) || !isNaN(e) || !isNaN(a)) {
            var g = new Date(c, e, a);
            if (!(g.getFullYear() == c && g.getMonth() == e && g.getDate() == a)) {
                alert("Please enter a valid date of birth");
                return
            }
        } else {
            var g = ""
        }
        var b = $("#emailaddress").val();
        var d = 0;
        var f = 0;
        f = $("#city").val();
        if (typeof OriginalCities[f] !== "undefined") {
            d = OriginalCities[f].ProvinceID
        } else {
            f = 0
        }
        var h = this;
        ValidateIfAreaIsServed(this.UseMap, this.address_latitude, this.address_longitude, true, function() {
            var j = {
                Action: "RegisterNewCustomer",
                EmailAddress: $("#emailaddress").val(),
                Password: $("#password").val().trim(),
                ConfirmPassword: $("#confirmpassword").val().trim(),
                CustomerTitle: "-1",
                FirstName: $("#firstname").val(),
                MidName: "",
                LastName: $("#lastname").val(),
                FullName: $("#fullname").val(),
                Gender: $("#gender").val(),
                DateOfBirth: (g == "" ? "" : formatDate(g, "yyyyMMdd")),
                SecurityQuestion: $("#securityQuestion").val(),
                SecurityAnswer: $("#securityAnswer").val(),
                MaritalStatus: $("#maritalStat").val(),
                FamilyMembers: $("#familyMember").val() == "" ? "0" : $("#familyMember").val(),
                Nationality: ($("#nationality").val() == "" ? "-1" : $("#nationality").val()),
                PrefLang: $("#preflang").val(),
                AddressName: $("#addressname").val(),
                AddressType: $("#addresstype").val(),
                BuildingName: $("#buildingname").val(),
                BuildingNum: $("#buildingnum").val(),
                BuildingType: "-1",
                County: $("#county").val(),
                Area: $("#area").val(),
                Road: $("#road").val(),
                SubDistrict: "",
                District: $("#district").val(),
                Province: d,
                City: f,
                PostCode: $("#postcode").val(),
                Floor: $("#floor").val(),
                FlatNo: $("#flatno").val(),
                Phone1ID: $("#phone1id").val(),
                Phone1Type: $("#phone1type").val(),
                Phone1Number: $("#phone1number").val(),
                Phone1Ext: $("#phone1ext").val(),
                Directions: $("#direction").val(),
                Offer1: $("#chkOffer1").is(":checked"),
                Offer2: $("#chkOffer2").is(":checked"),
                TaxReceipt: $("#chkTax").val(),
                TaxNotes: $("#chkTax").is(":checked") ? $("#taxnotes").val() : "",
                address_longitude: h.UseMap ? h.address_longitude : 0,
                address_latitude: h.UseMap ? h.address_latitude : 0,
                UseMap: h.UseMap
            };
            $("#btnRegister").attr("disabled", "disabled");
            serverQuery("/Handlers/CustomerRegistration.ashx", j, function(l, m, k) {
                $("#btnRegister").removeAttr("disabled");
                if (l && m.valid) {
                    setFloatingWindowStyle(1);
                    $(k.pagesContainer).html(k.pages.CustomerRegistration_ActivateYourAccount);
                    $("#register_icon_gmail").hide();
                    $("#register_icon_hotmail").hide();
                    $("#register_icon_yahoo").hide();
                    if (b) {
                        if (b.indexOf("@gmail") > -1) {
                            $("#register_icon_gmail").show()
                        } else {
                            if (b.indexOf("@yahoo") > -1) {
                                $("#register_icon_yahoo").show()
                            } else {
                                if (b.indexOf("@hotmail") > -1 || b.indexOf("@live") > -1 || b.indexOf("@msn") > -1) {
                                    $("#register_icon_hotmail").show()
                                } else {
                                    $("#go_to_inbox").hide()
                                }
                            }
                        }
                    } else {
                        $("#go_to_inbox").hide()
                    }
                    window.scrollTo(0, 0);
                    $.cookie("SavedRegisterData", null);
                    googleTag.push({
                        event: "Submit",
                        Category: "Register New",
                        ElementType: "",
                        ID: "",
                        Name: ""
                    })
                } else {
                    if (l && !m.valid) {
                        alert(m.message);
                        $.cookie("SavedRegisterData", null)
                    } else {
                        alert("Request failed")
                    }
                }
            }, h)
        })
    };
    this.ShowRegisterExisting = function(b) {
        var h = this;
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        $(this.pagesContainer).html(this.pages.CustomerRegistration_RegisterExisting);
        this.ExistingCustomerID = b.ID;
        FillDropDownList("customertitle", OriginalTitles, true);
        FillDropDownList("nationality", OriginalNationalities, true, undefined, undefined, true);
        FillDropDownList("addresstype", OriginalAddressTypes, true);
        FillDropDownList("buildingtype", OriginalBuildingTypes, false);
        FillDropDownList("city", OriginalCities, true);
        if (useJUICombo) {
            $("#gender").combobox();
            $("#DateOfBirth_Day").combobox();
            $("#DateOfBirth_Month").combobox();
            $("#DateOfBirth_Year").combobox();
            $("#addresstype").combobox();
            $("#city").combobox();
            $("#phone1type").combobox();
            $("#phone2type").combobox();
            $("#phone3type").combobox();
            $("#preflang").combobox();
            $("#maritalStat").combobox();
            $("#securityQuestion").combobox();
            $("#nationality").combobox({
                enableInput: true
            })
        }
        $("#btnRegister").click(function() {
            h.validator.ValidateBeforePost(function(j) {
                h.SubmitRegisterExisting_Step2()
            })
        });
        $("#chkTax").change(function() {
            if ($("#chkTax").is(":checked")) {
                $("#taxnoteslabel").show();
                $("#taxnotes").show()
            } else {
                $("#taxnoteslabel").hide();
                $("#taxnotes").hide()
            }
        }).change();
        $("#resendActivationLink").click(function() {
            h.ResendActivationLink_click()
        });
        $("#linkRegister").click(function() {
            showCustomRegistration()
        });
        $.mask.definitions["#"] = "[_ 0-9]";
        $("#phone1type").change(function() {
            var j = $("#phone1type").val();
            $("#phone1number").val("").prop("readonly", (j == -1)).mask(PhoneMasks[j]);
            if ((j == -1) || (j == 2)) {
                $("#lblPhone1Ext").prop("disabled", true);
                $("#phone1ext").prop("disabled", true)
            } else {
                $("#lblPhone1Ext").removeAttr("disabled");
                $("#phone1ext").removeAttr("disabled")
            }
        }).val(DefPhoneType).change();
        $("#phone1id").val(-1);
        var a = function(k, j) {
            var l = 0;
            var m = 0;
            m = $("#city").val();
            if (typeof OriginalCities[m] !== "undefined") {
                l = OriginalCities[m].ProvinceID
            } else {
                m = 0
            }
            $.ajax({
                type: "GET",
                url: "/Find/Customer/District?ShowWait=0",
                dataType: "json",
                data: {
                    province: l,
                    city: m,
                    term: (typeof k !== "undefined" && k != null && typeof k.term !== "undefined" && k.term != null) ? k.term : ""
                },
                success: function(p) {
                    if (typeof j !== "undefined" && j != null) {
                        j(p)
                    } else {
                        if ($("#district").is("select")) {
                            $("#district").children().remove();
                            if (useJUICombo || useBoxIt) {
                                $("#district").append($("<option value=''>- " + Translate("Select a value") + " -</option>"))
                            } else {
                                $("#district").append($("<option value=''>- " + Translate("District") + " -</option>"))
                            }
                            $("#district").val("");
                            for (var q in p) {
                                var o = p[q];
                                $("#district").append($("<option value='" + p[q] + "'>" + p[q] + "</option>"))
                            }
                        }
                    }
                }
            })
        };
        if ($("#district").is("input")) {
            $("#district").autocomplete({
                source: a,
                minLength: 2
            })
        } else {
            if ($("#district").is("select")) {
                if (useJUICombo) {
                    $("#district").combobox()
                }
                $("#city").change(a);
                $("#city").change()
            }
        }
        $("#road").autocomplete({
            source: function(k, j) {
                var l = 0;
                var m = 0;
                m = $("#city").val();
                if (typeof OriginalCities[m] !== "undefined") {
                    l = OriginalCities[m].ProvinceID
                } else {
                    m = 0
                }
                $.ajax({
                    type: "GET",
                    url: "/Find/Customer/Street?ShowWait=0",
                    dataType: "json",
                    data: {
                        province: l,
                        city: m,
                        term: k.term
                    },
                    success: function(o) {
                        j(o)
                    }
                })
            },
            minLength: 2
        });
        $("#area").autocomplete({
            source: function(k, j) {
                var l = 0;
                var m = 0;
                m = $("#city").val();
                if (typeof OriginalCities[m] !== "undefined") {
                    l = OriginalCities[m].ProvinceID
                } else {
                    m = 0
                }
                $.ajax({
                    type: "GET",
                    url: "/Find/Customer/Area?ShowWait=0",
                    dataType: "json",
                    data: {
                        province: l,
                        city: m,
                        term: k.term
                    },
                    success: function(o) {
                        j(o)
                    }
                })
            },
            minLength: 2
        });
        if (!UseGoogleMaps) {
            $("#customer_register_showmap").hide()
        }
        $("#customer_register_showmap").click(function() {
            var j = new AddressFromMap();
            j.addressLat = h.address_latitude;
            j.addressLng = h.address_longitude;
            j.OnOk = function(l) {
                var o = 0;
                var p = 0;
                for (var k in OriginalProvinces) {
                    var m = OriginalProvinces[k];
                    if (namesSimilar(m.Name, l.Province) && o == 0) {
                        o = m.ID
                    }
                    for (var r in OriginalCities) {
                        var q = OriginalCities[r];
                        if (namesSimilar(q.Name, l.City) || namesSimilar(q.Name, l.Province)) {
                            o = m.ID;
                            p = q.ID
                        }
                    }
                    if (o != 0 && p != 0) {
                        break
                    }
                }
                $("#city").val(p).change();
                $("#postcode").val(l.PostCode);
                $("#district").val(l.District);
                $("#road").val((l.Route + " " + l.Street).trim());
                $("#area").val(l.Block);
                $("#direction").val(l.addressText);
                $("#buildingname").val(l.Building)
            };
            j.init();
            if (isResponsive && $(window).width() < 800) {
                window.scrollTo(0, 0)
            }
            return false
        });
        if (typeof b !== "undefined" && b != null) {
            $("#emailaddress").val(b.EMail);
            $("#confirmemailaddress").val(b.EMail);
            $("#password").val("");
            $("#confirmpassword").val("");
            var e = b.FirstName + " " + b.LastName;
            e = e.replace(".", "").replace(/\s+/g, " ").trim();
            $("#fullname").val(e);
            e = e.split(" ");
            var c = "";
            var g = "";
            if (e.length > 0) {
                c = e[0]
            }
            if (e.length > 1) {
                g = e[1]
            }
            $("#firstname").val(c);
            $("#lastname").val(g);
            $("#gender").val(b.Gender).change();
            if (b.hasDateOfBirth.toLowerCase() == "true") {
                var d = ConvertDateServerDate(b.DateOfBirth);
                $("#DateOfBirth_Day").val(d.getDate()).change();
                $("#DateOfBirth_Month").val(d.getMonth() + 1).change();
                $("#DateOfBirth_Year").val(d.getFullYear()).change()
            }
            $("#phone1type").val(b.PhoneType).change();
            $("#phone1number").val(b.PhoneNumber);
            $("#phone1ext").val(b.PhoneExtension);
            if (b.Addresses.length > 0) {
                var f = b.Addresses[0];
                this.ExistingAddressID = f.ID;
                $("#addressname").val(f.Name);
                if ($("#addresstype").is("select")) {
                    $("#addresstype").val(f.AddressType).change()
                } else {
                    $("#addresstype").val(f.AddressTypeName)
                }
                $("#buildingname").val(f.BldngName);
                $("#buildingnum").val(f.BldngNum);
                $("#county").val(f.County);
                $("#area").val(f.AreaText);
                $("#road").val(f.StreetText);
                $("#district").val(f.DistrictText);
                $("#city").val(f.CityID).change();
                $("#postcode").val(f.PostalCode);
                $("#floor").val(f.Floor);
                $("#flatno").val(f.FlatNumber);
                $("#direction").val(f.Directions)
            }
        }
        if (this.afterShowPage != null) {
            this.afterShowPage()
        }
        setFloatingWindowStyle(4);
        this.validator = new FormValidator($("#frmRegister"), {
            firstname: {
                customValidation: function(j, k, o) {
                    var m = $("#firstname").val();
                    var l = $("#firstname").length == 1;
                    o(l == false || (l && m), Translate("Please enter your first name"), k)
                }
            },
            lastname: {
                customValidation: function(j, k, o) {
                    var m = $("#lastname").val();
                    var l = $("#lastname").length == 1;
                    o(l == false || (l && m), Translate("Please enter your last name"), k)
                }
            },
            fullname: {
                customValidation: function(j, k, o) {
                    var m = $("#fullname").val();
                    var l = $("#fullname").length == 1;
                    o(l == false || (l && m), Translate("Please enter your full name"), k)
                }
            },
            phone1number: {
                customValidation: function(k, l, p) {
                    var m = parseInt($("#phone1type").val());
                    var o = $("#phone1number").val().replace(/[^\d]*/g, "");
                    var j = PhoneMasks[m].replace(/[^9]*/g, "").length;
                    if (m < 0) {
                        p(false, Translate("Please select a phone type"), l)
                    } else {
                        if (o.length < j) {
                            p(false, Translate("Please enter your mobile number"), l)
                        } else {
                            p(true, "", l)
                        }
                    }
                }
            },
            phone1ext: {
                customValidation: function(j, k, m) {
                    var l = $("#phone1ext").val();
                    if (isNaN(Number(l)) && l.length != 0) {
                        m(false, Translate("Extension should be a number"), k)
                    } else {
                        m(true, "", k)
                    }
                }
            },
            emailaddress: {
                required: true,
                requiredMsg: Translate("Please fill the EMail address"),
                email: true,
                emailMsg: Translate("Please enter a valid EMail address"),
                customValidation: function(j, l, m) {
                    var k = $("#" + j).val();
                    serverQuery("/Handlers/CustomerRegistration.ashx?ShowWait=0", {
                        Action: "ValidateEMailExistance",
                        emailaddress: k
                    }, function(o, p, r) {
                        if (o) {
                            var q = "";
                            if (p.msg != "") {
                                q = "<a id='resendActivationLink'>" + p.msg + "</a>"
                            }
                            r(p.valid, q, l);
                            $("#resendActivationLink").click(function() {
                                h.ResendActivationLink_click()
                            })
                        } else {
                            r(false, "Validation failed due to a server error", l)
                        }
                    }, m)
                }
            },
            confirmemailaddress: {
                required: true,
                requiredMsg: Translate("Please re-type your EMail address"),
                equalTo: "#emailaddress",
                equalToMsg: Translate("Please enter the same EMail address as above")
            },
            password: {
                required: true,
                requiredMsg: Translate("Please enter a password")
            },
            confirmpassword: {
                required: true,
                requiredMsg: Translate("Please re-type your password"),
                equalTo: "#password",
                equalToMsg: Translate("Please enter the same password as above")
            },
            securityQuestion: {
                required: true,
                requiredMsg: Translate("Please select a security question")
            },
            securityAnswer: {
                required: true,
                requiredMsg: Translate("Please enter a security question")
            }
        });
        this.validator.onShowValidateMessage = function(o, j, l, m, p) {
            var k = null;
            if (j == "phone1type" || j == "phone1number") {
                k = $("#phone1ext")
            }
            if (j == "taxnotes" || j == "chkTax") {
                k = $("#chkTaxLabel")
            }
            if (!o) {
                tooltip($("#" + j), m, 0, p, k)
            } else {
                tooltip($("#" + j), "", 1, false, k)
            }
        };
        googleTag.push({
            event: "PageView",
            PageName: "Register Existing",
            PageURL: "/register/existingcustomer"
        });
        googleTag.push({
            event: "Open",
            Category: "Register Existing",
            ElementType: "",
            ID: "",
            Name: ""
        })
    };
    this.SubmitRegisterExisting_Step1 = function(a) {
        if (typeof a === "undefined" || a == null) {
            a = $("#mobilenumber").val()
        }
        if (a == "" && $("#existingemail").val() == "") {
            alert("Please fill either your mobile number or email address");
            return
        }
        var b = {
            Action: "RegisterExistingCustomer_Step1",
            MobileNumber: a,
            EmailAddress: $("#existingemail").val()
        };
        $("#btnNewcustomer").prop("disabled", true);
        $("#btnExistingcustomer").prop("disabled", true);
        serverQuery("/Handlers/CustomerRegistration.ashx", b, function(d, e, c) {
            $("#btnNewcustomer").prop("disabled", false);
            $("#btnExistingcustomer").prop("disabled", false);
            if (d && e.valid) {
                if (e.hasVerficationSMS) {
                    c.ShowRegisterExisting_SMSVerification()
                } else {
                    $(c.pagesContainer).html(c.pages.CustomerRegistration_ActivationLinkSent)
                }
            } else {
                if (d) {
                    alert(e.message)
                }
            }
        }, this)
    };
    this.ShowRegisterExisting_SMSVerification = function() {
        $(this.pagesContainer).html(this.pages.CustomerRegistration_SMSVerification);
        setFloatingWindowStyle(4);
        $("#btnRegisterExistingSubmitVerification").data("owner", this);
        $("#btnRegisterExistingSubmitVerification").click(function() {
            var a = $("#RegisterExistingVerificationNumber").val();
            serverQuery("/Handlers/CustomerRegistration.ashx", {
                Action: "RegisterExistingCustomer_VerifySMS",
                VerificationCode: a
            }, function(c, d, b) {
                if (c && d.valid) {
                    b.ShowRegisterExisting(d.customerData)
                } else {
                    alert("Invalid verification code")
                }
            }, $(this).data("owner"))
        });
        $("#RegisterExistingVerificationNumber").keydown(function(a) {
            if (a.which == 13) {
                $("#btnRegisterExistingSubmitVerification").click()
            }
        })
    };
    this.SubmitRegisterExisting_Step2 = function() {
        if ($("#chkTax").prop("checked") && $("#taxnotes").val() == "") {
            alert("Please fill Tax receipt information");
            return
        }
        if (!$("#chkAcceptTermsAndConditions").prop("checked")) {
            alert("Can't proceed with the registration without accepting the terms and conditions");
            return
        }
        var d = "";
        var a = 0;
        var c = 0;
        c = $("#city").val();
        if (typeof OriginalCities[c] !== "undefined") {
            a = OriginalCities[c].ProvinceID
        } else {
            c = 0
        }
        var b = {
            CustomerID: this.ExistingCustomerID,
            Action: "RegisterExistingCustomer_Step2",
            EmailAddress: $("#emailaddress").val(),
            Password: $("#password").val().trim(),
            ConfirmPassword: $("#confirmpassword").val().trim(),
            SecurityQuestion: $("#securityQuestion").val(),
            SecurityAnswer: $("#securityAnswer").val(),
            CustomerTitle: "-1",
            FirstName: $("#firstname").val(),
            MidName: "",
            LastName: $("#lastname").val(),
            FullName: $("#fullname").val(),
            Gender: $("#gender").val(),
            DateOfBirth: (d == "" ? "" : formatDate(d, "yyyyMMdd")),
            AddressID: this.ExistingAddressID,
            AddressName: $("#addressname").val(),
            AddressType: $("#addresstype").val(),
            BuildingName: $("#buildingname").val(),
            BuildingNum: $("#buildingnum").val(),
            BuildingType: "-1",
            County: $("#county").val(),
            Area: $("#area").val(),
            Road: $("#road").val(),
            SubDistrict: "",
            District: $("#district").val(),
            Province: (typeof OriginalCities[$("#city").val()] !== "undefined") ? OriginalCities[$("#city").val()].ProvinceID : -1,
            City: $("#city").val(),
            PostCode: $("#postcode").val(),
            Floor: $("#floor").val(),
            FlatNo: $("#flatno").val(),
            PhoneID: $("#phone1id").val(),
            PhoneType: $("#phone1type").val(),
            PhoneNumber: $("#phone1number").val(),
            PhoneExt: $("#phone1ext").val(),
            Directions: $("#direction").val(),
            Offer1: $("#chkOffer1").is(":checked"),
            Offer2: $("#chkOffer2").is(":checked"),
            TaxReceipt: $("#chkTax").val(),
            TaxNotes: $("#chkTax").is(":checked") ? $("#taxnotes").val() : "",
            address_longitude: this.address_longitude,
            address_latitude: this.address_latitude
        };
        $("#btnRegister").attr("disabled", "disabled");
        serverQuery("/Handlers/CustomerRegistration.ashx", b, function(f, g, e) {
            $("#btnRegister").removeAttr("disabled");
            if (f && g.valid) {
                e.Close();
                userLogin.customerData = g.customer;
                userLogin.drawUserMenu();
                cart.cartData = g.cartData;
                if (typeof cart.cartData === "undefined" || cart.cartData == null) {
                    cart.cartData = []
                }
                if (typeof showHome !== "undefined") {
                    showHome()
                }
                showNotificationBallon("CustomerRegistration_ActivationSuccessBallon");
                googleTag.push({
                    event: "Activated",
                    Category: "Register Existing",
                    ElementType: "",
                    ID: "",
                    Name: ""
                });
                if (cart.cartData.length > 0) {
                    showCheckout()
                }
            } else {
                if (f && !g.valid) {
                    alert(g.message)
                } else {
                    alert("Request failed")
                }
            }
        }, this)
    };
    this.ShowActivationRequired = function(a) {
        var b = this;
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        $(this.pagesContainer).html(this.pages.CustomerRegistration_ActivationRequired);
        $("#emailaddress").val(a);
        $("#lnkResendActivation").click(function() {
            b.ResendActivationLink_click()
        });
        if (this.afterShowPage != null) {
            this.afterShowPage()
        }
    };
    this.SaveState = function() {
        var b = 0;
        var c = 0;
        c = $("#city").val();
        if (typeof OriginalCities[c] !== "undefined") {
            b = OriginalCities[c].ProvinceID
        } else {
            c = 0
        }
        var a = {
            New: true,
            Step: this.step,
            EmailAddress: $("#emailaddress").val(),
            ConfirmEmailAddress: $("#confirmemailaddress").val(),
            Password: typeof($("#password").val()) === "undefined" ? "" : $("#password").val().trim(),
            ConfirmPassword: typeof($("#confirmpassword").val()) === "undefined" ? "" : $("#confirmpassword").val().trim(),
            CustomerTitle: $("#customertitle").val(),
            FirstName: $("#firstname").val(),
            MidName: $("#midname").val(),
            LastName: $("#lastname").val(),
            FullName: $("#fullname").val(),
            Gender: $("#gender").val(),
            DateOfBirth_Day: $("#DateOfBirth_Day").val(),
            DateOfBirth_Month: $("#DateOfBirth_Month").val(),
            DateOfBirth_Year: $("#DateOfBirth_Year").val(),
            AddressName: $("#addressname").val(),
            AddressType: $("#addresstype").val(),
            BuildingName: $("#buildingname").val(),
            BuildingNum: $("#buildingnum").val(),
            BuildingType: $("#buildingtype").val(),
            County: $("#county").val(),
            Area: $("#area").val(),
            Road: $("#road").val(),
            District: $("#district").val(),
            Province: b,
            City: c,
            PostCode: $("#postcode").val(),
            Floor: $("#floor").val(),
            FlatNo: $("#flatno").val(),
            Phone1ID: $("#phone1id").val(),
            Phone1Type: $("#phone1type").val(),
            Phone1Number: $("#phone1number").val(),
            Phone1Ext: $("#phone1ext").val(),
            Directions: $("#direction").val(),
            Offer1: $("#chkOffer1").val(),
            Offer2: $("#chkOffer2").val(),
            TaxChecked: $("#chkTax").is(":checked"),
            TaxNotes: $("#taxnotes").val(),
            address_longitude: this.address_longitude,
            address_latitude: this.address_latitude
        };
        $.cookie("SavedRegisterData", JSON.stringify(a))
    };
    this.LoadSate = function() {
        var a = JSON.parse($.cookie("SavedRegisterData"));
        $.cookie("SavedRegisterData", null);
        if (a == null) {
            return
        }
        if (a.New) {
            this.ShowRegisterNew();
            $("#emailaddress").val(a.EmailAddress);
            $("#confirmemailaddress").val(a.ConfirmEmailAddress);
            $("#password").val(a.Password);
            $("#confirmpassword").val(a.ConfirmPassword);
            $("#firstname").val(a.FirstName);
            $("#lastname").val(a.LastName);
            $("#fullname").val(a.FullName);
            $("#gender").val(a.Gender).change();
            $("#DateOfBirth_Day").val(a.DateOfBirth_Day).change();
            $("#DateOfBirth_Month").val(a.DateOfBirth_Month).change();
            $("#DateOfBirth_Year").val(a.DateOfBirth_Year).change();
            $("#addressname").val(a.AddressName);
            $("#addresstype").val(a.AddressType).change();
            $("#buildingname").val(a.BuildingName);
            $("#buildingnum").val(a.BuildingNum);
            $("#county").val(a.County), $("#area").val(a.Area);
            $("#road").val(a.Road);
            $("#district").val(a.District);
            $("#city").val(a.City).change();
            $("#postcode").val(a.PostCode);
            $("#floor").val(a.Floor);
            $("#flatno").val(a.FlatNo);
            $("#phone1id").val(a.Phone1ID);
            $("#phone1type").val(a.Phone1Type).change();
            $("#phone1number").val(a.Phone1Number);
            $("#phone1ext").val(a.Phone1Ext);
            $("#direction").val(a.Directions);
            $("#chkTax").prop("checked", a.TaxChecked);
            $("#chkTax").change();
            $("#taxnotes").val(a.TaxNotes)
        }
    };
    this.Close = function() {
        if (this.OnClose != null) {
            this.OnClose()
        }
    };
    this.ShowRegisterUsingFacebook = function() {
        var a = this;
        getFacebookUserInfo(function(b, c) {
            if (b) {
                a.ShowRegisterNew(c)
            }
        })
    };
    this.ShowRegisterUsingGoogle = function() {
        var a = this;
        getGoogleUserInfo(function(b, c) {
            if (b) {
                a.ShowRegisterNew(c)
            }
        })
    };
    this.UnifiedRegister_EnterMobile = function() {
        $(this.pagesContainer).html(this.pages.UnifiedRegister_EnterMobile);
        setFloatingWindowStyle(4);
        $("#btnUnifiedRegisterEnterMobileSubmit").data("owner", this);
        $("#btnUnifiedRegisterEnterMobileSubmit").click(function() {
            var a = $("#UnifiedRegister_Mobile").val();
            serverQuery("/Handlers/CustomerRegistration.ashx", {
                Action: "UnifiedRegister_EnterMobile",
                Mobile: a
            }, function(c, d, b) {
                if (c && d.valid) {
                    b.UnifiedRegister_EnterOTP()
                } else {
                    if (d != null && d.message) {
                        alert(d.message)
                    } else {
                        alert("Invalid request")
                    }
                }
            }, $(this).data("owner"))
        });
        $("#UnifiedRegister_Mobile").val("").mask(PhoneMasks[2]);
        $("#UnifiedRegister_Mobile").keydown(function(a) {
            if (a.which == 13) {
                $("#btnUnifiedRegisterEnterMobileSubmit").click()
            }
        })
    };
    this.UnifiedRegister_EnterOTP = function() {
        $(this.pagesContainer).html(this.pages.UnifiedRegister_EnterOTP);
        setFloatingWindowStyle(4);
        $("#btnUnifiedRegisterEnterOTPSubmit").data("owner", this);
        $("#btnUnifiedRegisterEnterOTPSubmit").click(function() {
            var a = $("#UnifiedRegister_OTP").val();
            serverQuery("/Handlers/CustomerRegistration.ashx", {
                Action: "UnifiedRegister_EnterOTP",
                VerificationCode: a
            }, function(c, d, b) {
                if (c && d.valid) {
                    b.UnifiedRegister_EnterData(d.customerData)
                } else {
                    alert("Invalid verification code")
                }
            }, $(this).data("owner"))
        });
        $("#UnifiedRegister_OTP").keydown(function(a) {
            if (a.which == 13) {
                $("#btnUnifiedRegisterEnterOTPSubmit").click()
            }
        })
    };
    this.UnifiedRegister_EnterData = function(f) {
        var g = this;
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        $(this.pagesContainer).html(this.pages.UnifiedRegister_EnterData);
        FillDropDownList("customertitle", OriginalTitles, true);
        FillDropDownList("nationality", OriginalNationalities, true, undefined, undefined, true);
        FillDropDownList("addresstype", OriginalAddressTypes, true);
        FillDropDownList("buildingtype", OriginalBuildingTypes, false);
        FillDropDownList("city", OriginalCities, true);
        if (useJUICombo) {
            $("#gender").combobox();
            $("#DateOfBirth_Day").combobox();
            $("#DateOfBirth_Month").combobox();
            $("#DateOfBirth_Year").combobox();
            $("#addresstype").combobox();
            $("#city").combobox();
            $("#phone1type").combobox();
            $("#phone2type").combobox();
            $("#phone3type").combobox();
            $("#preflang").combobox();
            $("#maritalStat").combobox();
            $("#securityQuestion").combobox();
            $("#nationality").combobox({
                enableInput: true
            })
        }
        $("#btnRegister").click(function() {
            g.validator.ValidateBeforePost(function(l) {
                g.UnifiedRegister_Submit()
            })
        });
        $("#chkTax").change(function() {
            if ($("#chkTax").is(":checked")) {
                $("#taxnoteslabel").show();
                $("#taxnotes").show()
            } else {
                $("#taxnoteslabel").hide();
                $("#taxnotes").hide()
            }
        }).change();
        $("#resendActivationLink").click(function() {
            g.ResendActivationLink_click()
        });
        $("#linkRegister").click(function() {
            showCustomRegistration()
        });
        $.mask.definitions["#"] = "[_ 0-9]";
        $("#phone1type").change(function() {
            var l = $("#phone1type").val();
            $("#phone1number").val("").prop("readonly", (l == -1)).mask(PhoneMasks[l]);
            if ((l == -1) || (l == 2)) {
                $("#lblPhone1Ext").prop("disabled", true);
                $("#phone1ext").prop("disabled", true)
            } else {
                $("#lblPhone1Ext").removeAttr("disabled");
                $("#phone1ext").removeAttr("disabled")
            }
        }).val(DefPhoneType).change();
        $("#phone1id").val(-1);
        var j = function(m, l) {
            var o = 0;
            var p = 0;
            p = $("#city").val();
            if (typeof OriginalCities[p] !== "undefined") {
                o = OriginalCities[p].ProvinceID
            } else {
                p = 0
            }
            $.ajax({
                type: "GET",
                url: "/Find/Customer/District?ShowWait=0",
                dataType: "json",
                data: {
                    province: o,
                    city: p,
                    term: (typeof m !== "undefined" && m != null && typeof m.term !== "undefined" && m.term != null) ? m.term : ""
                },
                success: function(r) {
                    if (typeof l !== "undefined" && l != null) {
                        l(r)
                    } else {
                        if ($("#district").is("select")) {
                            $("#district").children().remove();
                            if (useJUICombo || useBoxIt) {
                                $("#district").append($("<option value=''>- " + Translate("Select a value") + " -</option>"))
                            } else {
                                $("#district").append($("<option value=''>- " + Translate("District") + " -</option>"))
                            }
                            $("#district").val("");
                            for (var s in r) {
                                var q = r[s];
                                $("#district").append($("<option value='" + r[s] + "'>" + r[s] + "</option>"))
                            }
                        }
                    }
                }
            })
        };
        if ($("#district").is("input")) {
            $("#district").autocomplete({
                source: j,
                minLength: 2
            })
        } else {
            if ($("#district").is("select")) {
                if (useJUICombo) {
                    $("#district").combobox()
                }
                $("#city").change(j);
                $("#city").change()
            }
        }
        $("#road").autocomplete({
            source: function(m, l) {
                var o = 0;
                var p = 0;
                p = $("#city").val();
                if (typeof OriginalCities[p] !== "undefined") {
                    o = OriginalCities[p].ProvinceID
                } else {
                    p = 0
                }
                $.ajax({
                    type: "GET",
                    url: "/Find/Customer/Street?ShowWait=0",
                    dataType: "json",
                    data: {
                        province: o,
                        city: p,
                        term: m.term
                    },
                    success: function(q) {
                        l(q)
                    }
                })
            },
            minLength: 2
        });
        $("#area").autocomplete({
            source: function(m, l) {
                var o = 0;
                var p = 0;
                p = $("#city").val();
                if (typeof OriginalCities[p] !== "undefined") {
                    o = OriginalCities[p].ProvinceID
                } else {
                    p = 0
                }
                $.ajax({
                    type: "GET",
                    url: "/Find/Customer/Area?ShowWait=0",
                    dataType: "json",
                    data: {
                        province: o,
                        city: p,
                        term: m.term
                    },
                    success: function(q) {
                        l(q)
                    }
                })
            },
            minLength: 2
        });
        if (!UseGoogleMaps) {
            $("#customer_register_showmap").hide()
        }
        $("#customer_register_showmap").click(function() {
            var l = new AddressFromMap();
            l.addressLat = g.address_latitude;
            l.addressLng = g.address_longitude;
            l.OnOk = function(o) {
                var q = 0;
                var r = 0;
                for (var m in OriginalProvinces) {
                    var p = OriginalProvinces[m];
                    if (namesSimilar(p.Name, o.Province) && q == 0) {
                        q = p.ID
                    }
                    for (var t in OriginalCities) {
                        var s = OriginalCities[t];
                        if (namesSimilar(s.Name, o.City) || namesSimilar(s.Name, o.Province)) {
                            q = p.ID;
                            r = s.ID
                        }
                    }
                    if (q != 0 && r != 0) {
                        break
                    }
                }
                $("#city").val(r).change();
                $("#postcode").val(o.PostCode);
                $("#district").val(o.District);
                $("#road").val((o.Route + " " + o.Street).trim());
                $("#area").val(o.Block);
                $("#direction").val(o.addressText);
                $("#buildingname").val(o.Building)
            };
            l.init();
            if (isResponsive && $(window).width() < 800) {
                window.scrollTo(0, 0)
            }
            return false
        });
        if (typeof f !== "undefined" && f != null) {
            this.CustomerID = f.ID;
            $("#emailaddress").val(f.EMail);
            $("#password").val("");
            $("#confirmpassword").val("");
            var d = f.FirstName + " " + f.LastName;
            d = d.replace(".", "").replace(/\s+/g, " ").trim();
            $("#fullname").val(d);
            d = d.split(" ");
            var h = "";
            var b = "";
            if (d.length > 0) {
                h = d[0]
            }
            if (d.length > 1) {
                b = d[1]
            }
            $("#firstname").val(h);
            $("#lastname").val(b);
            $("#gender").val(f.Gender).change();
            if (f.hasDateOfBirth != null && f.hasDateOfBirth.toLowerCase() == "true") {
                var k = ConvertDateServerDate(f.DateOfBirth);
                $("#DateOfBirth_Day").val(k.getDate()).change();
                $("#DateOfBirth_Month").val(k.getMonth() + 1).change();
                $("#DateOfBirth_Year").val(k.getFullYear()).change()
            }
            $("#phone1type").val(f.PhoneType).change();
            $("#phone1number").val(f.PhoneNumber);
            $("#phone1ext").val(f.PhoneExtension);
            this.AddressID = 0;
            if (f.Addresses.length > 0) {
                var e = f.Addresses[0];
                this.AddressID = e.ID;
                $("#addressname").val(e.Name);
                if ($("#addresstype").is("select")) {
                    $("#addresstype").val(e.AddressType).change()
                } else {
                    $("#addresstype").val(e.AddressTypeName)
                }
                $("#buildingname").val(e.BldngName);
                $("#buildingnum").val(e.BldngNum);
                $("#county").val(e.County);
                $("#area").val(e.AreaText);
                $("#road").val(e.StreetText);
                $("#district").val(e.DistrictText);
                $("#city").val(e.CityID).change();
                $("#postcode").val(e.PostalCode);
                $("#floor").val(e.Floor);
                $("#flatno").val(e.FlatNumber);
                $("#direction").val(e.Directions)
            }
        }
        $("#mapAddressClick").click(function() {
            $("#registerManualAddress").hide();
            $("#registerMapAddress").show();
            $("#manualAddressClick").removeClass("active");
            $("#mapAddressClick").addClass("active");
            g.UseMap = true;
            google.maps.event.trigger(g.map, "resize");
            g.map.setCenter(new google.maps.LatLng(g.address_latitude, g.address_longitude));
            ValidateIfAreaIsServed(g.UseMap, g.address_latitude, g.address_longitude, false, null)
        });
        $("#manualAddressClick").click(function() {
            $("#registerManualAddress").show();
            $("#registerMapAddress").hide();
            $("#mapAddressClick").removeClass("active");
            $("#manualAddressClick").addClass("active");
            g.UseMap = false;
            $(".areanotservedmsg").hide()
        });
        if (AddressEntryType != "Both") {
            $("#mapButtons").hide()
        } else {
            $("#mapButtons").show()
        }
        if (AddressEntryType == "Both" || AddressEntryType == "Map") {
            $("#registerMapAddress").show();
            $("#registerManualAddress").hide();
            this.UseMap = true
        } else {
            $("#registerMapAddress").hide();
            $("#registerManualAddress").show();
            this.UseMap = false
        }
        if (AddressEntryType == "Both" || AddressEntryType == "Map") {
            var c = this;
            var a = new google.maps.LatLng(DefaultMapAddressLocation.split(",")[0].trim(), DefaultMapAddressLocation.split(",")[1].trim());
            this.map = new google.maps.Map($("#registerMapAddress").get(0), {
                zoom: 6,
                center: a,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            this.addressMarker = new google.maps.Marker({
                map: this.map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: a
            });
            google.maps.event.addListener(this.addressMarker, "position_changed", function() {
                var l = c.addressMarker.getPosition();
                c.address_latitude = l.lat();
                c.address_longitude = l.lng()
            });
            navigator.geolocation.getCurrentPosition(function(m) {
                var l = new google.maps.LatLng(m.coords.latitude, m.coords.longitude);
                c.address_longitude = l.lng();
                c.address_latitude = l.lat();
                $("#city").val(DefCityID);
                $("#area").val("");
                $("#road").val("");
                $("#district").val("");
                c.addressMarker.setPosition(l);
                c.map.setCenter(l);
                c.map.setZoom(16);
                $("#direction").val("");
                GetPlace(c.map, l, function(o) {
                    $("#direction").val(o.formatted_address)
                });
                ValidateIfAreaIsServed(c.UseMap, c.address_latitude, c.address_longitude, false, null)
            }, function(l) {
                if (ForceUsingGPS) {
                    switch (l.code) {
                        case l.PERMISSION_DENIED:
                            alert(Translate("GPS location service is not enabled, please enable it and refresh your browser to determine your current location."), 160);
                            break
                    }
                } else {}
            }, {
                timeout: 7000
            });
            google.maps.event.addListener(this.addressMarker, "dragend", function(l) {
                $("#direction").val("");
                GetPlace(c.map, l.latLng, function(m) {
                    $("#direction").val(m.formatted_address)
                });
                ValidateIfAreaIsServed(c.UseMap, c.address_latitude, c.address_longitude, false, null)
            })
        }
        if (this.afterShowPage != null) {
            this.afterShowPage()
        }
        setFloatingWindowStyle(4);
        this.validator = new FormValidator($("#frmRegister"), {
            firstname: {
                customValidation: function(l, m, q) {
                    var p = $("#firstname").val();
                    var o = $("#firstname").length == 1;
                    q(o == false || (o && p), Translate("Please enter your first name"), m)
                }
            },
            lastname: {
                customValidation: function(l, m, q) {
                    var p = $("#lastname").val();
                    var o = $("#lastname").length == 1;
                    q(o == false || (o && p), Translate("Please enter your last name"), m)
                }
            },
            fullname: {
                customValidation: function(l, m, q) {
                    var p = $("#fullname").val();
                    var o = $("#fullname").length == 1;
                    q(o == false || (o && p), Translate("Please enter your full name"), m)
                }
            },
            phone1number: {
                customValidation: function(m, o, r) {
                    var p = parseInt($("#phone1type").val());
                    var q = $("#phone1number").val().replace(/[^\d]*/g, "");
                    var l = PhoneMasks[p].replace(/[^9]*/g, "").length;
                    if (p < 0) {
                        r(false, Translate("Please select a phone type"), o)
                    } else {
                        if (q.length < l) {
                            r(false, Translate("Please enter your mobile number"), o)
                        } else {
                            r(true, "", o)
                        }
                    }
                }
            },
            phone1ext: {
                customValidation: function(l, m, p) {
                    var o = $("#phone1ext").val();
                    if (isNaN(Number(o)) && o.length != 0) {
                        p(false, Translate("Extension should be a number"), m)
                    } else {
                        p(true, "", m)
                    }
                }
            },
            password: {
                required: true,
                requiredMsg: Translate("Please enter a password")
            },
            confirmpassword: {
                required: true,
                requiredMsg: Translate("Please re-type your password"),
                equalTo: "#password",
                equalToMsg: Translate("Please enter the same password as above")
            },
            securityQuestion: {
                required: true,
                requiredMsg: Translate("Please select a security question")
            },
            securityAnswer: {
                required: true,
                requiredMsg: Translate("Please enter a security question")
            },
            addresstype: {
                required: true,
                requiredMsg: Translate("Please select an address type")
            }
        });
        this.validator.onShowValidateMessage = function(q, l, o, p, r) {
            var m = null;
            if (l == "phone1type" || l == "phone1number") {
                m = $("#phone1ext")
            }
            if (l == "taxnotes" || l == "chkTax") {
                m = $("#chkTaxLabel")
            }
            if (!q) {
                tooltip($("#" + l), p, 0, r, m)
            } else {
                tooltip($("#" + l), "", 1, false, m)
            }
        };
        googleTag.push({
            event: "PageView",
            PageName: "Register Existing",
            PageURL: "/register/existingcustomer"
        });
        googleTag.push({
            event: "Open",
            Category: "Register Existing",
            ElementType: "",
            ID: "",
            Name: ""
        })
    };
    this.UnifiedRegister_Submit = function() {
        if (!$("#chkAcceptTermsAndConditions").prop("checked")) {
            alert("Can't proceed with the registration without accepting the terms and conditions");
            return
        }
        if ($("#chkTax").prop("checked") && $("#taxnotes").val() == "") {
            alert("Please fill Tax receipt information");
            return
        }
        var c = parseInt($("#DateOfBirth_Year").val(), 10);
        var e = parseInt($("#DateOfBirth_Month").val(), 10);
        var a = parseInt($("#DateOfBirth_Day").val(), 10);
        if (!isNaN(c) || !isNaN(e) || !isNaN(a)) {
            var g = new Date(c, e, a);
            if (!(g.getFullYear() == c && g.getMonth() == e && g.getDate() == a)) {
                alert("Please enter a valid date of birth");
                return
            }
        } else {
            var g = ""
        }
        var b = $("#emailaddress").val();
        var d = 0;
        var f = 0;
        f = $("#city").val();
        if (typeof OriginalCities[f] !== "undefined") {
            d = OriginalCities[f].ProvinceID
        } else {
            f = 0
        }
        var h = this;
        ValidateIfAreaIsServed(this.UseMap, this.address_latitude, this.address_longitude, true, function() {
            var j = {
                Action: "UnifiedRegister_Submit",
                CustomerID: h.CustomerID,
                EmailAddress: $("#emailaddress").val(),
                Password: $("#password").val().trim(),
                ConfirmPassword: $("#confirmpassword").val().trim(),
                CustomerTitle: "-1",
                FirstName: $("#firstname").val(),
                MidName: "",
                LastName: $("#lastname").val(),
                FullName: $("#fullname").val(),
                Gender: $("#gender").val(),
                DateOfBirth: (g == "" ? "" : formatDate(g, "yyyyMMdd")),
                SecurityQuestion: $("#securityQuestion").val(),
                SecurityAnswer: $("#securityAnswer").val(),
                MaritalStatus: $("#maritalStat").val(),
                FamilyMembers: $("#familyMember").val() == "" ? "0" : $("#familyMember").val(),
                Nationality: ($("#nationality").val() == "" ? "-1" : $("#nationality").val()),
                PrefLang: $("#preflang").val(),
                AddressID: h.AddressID,
                AddressName: $("#addressname").val(),
                AddressType: $("#addresstype").val(),
                BuildingName: $("#buildingname").val(),
                BuildingNum: $("#buildingnum").val(),
                BuildingType: "-1",
                County: $("#county").val(),
                Area: $("#area").val(),
                Road: $("#road").val(),
                SubDistrict: "",
                District: $("#district").val(),
                Province: d,
                City: f,
                PostCode: $("#postcode").val(),
                Floor: $("#floor").val(),
                FlatNo: $("#flatno").val(),
                Phone1ID: $("#phone1id").val(),
                Phone1Type: $("#phone1type").val(),
                Phone1Number: $("#phone1number").val(),
                Phone1Ext: $("#phone1ext").val(),
                Directions: $("#direction").val(),
                Offer1: $("#chkOffer1").is(":checked"),
                Offer2: $("#chkOffer2").is(":checked"),
                TaxReceipt: $("#chkTax").val(),
                TaxNotes: $("#chkTax").is(":checked") ? $("#taxnotes").val() : "",
                address_longitude: h.UseMap ? h.address_longitude : 0,
                address_latitude: h.UseMap ? h.address_latitude : 0,
                UseMap: h.UseMap
            };
            $("#btnRegister").attr("disabled", "disabled");
            serverQuery("/Handlers/CustomerRegistration.ashx", j, function(l, m, k) {
                $("#btnRegister").removeAttr("disabled");
                if (l && m.valid) {
                    setFloatingWindowStyle(1);
                    $(k.pagesContainer).html(k.pages.UnifiedRegister_Done);
                    window.scrollTo(0, 0);
                    $.cookie("SavedRegisterData", null);
                    googleTag.push({
                        event: "Submit",
                        Category: "Register New",
                        ElementType: "",
                        ID: "",
                        Name: ""
                    })
                } else {
                    if (l && !m.valid) {
                        alert(m.message);
                        $.cookie("SavedRegisterData", null)
                    } else {
                        alert("Request failed")
                    }
                }
            }, h)
        })
    }
}
"use strict";
if (typeof ScrollClicked === "undefined") {
    var ScrollClicked = false
}

function CustomizeItem() {
    this.pages = null;
    this.menuItem = null;
    this.pagesContainer = null;
    this.afterShowPage = null;
    this.onOK = null;
    this.onCancel = null;
    this.addOptionalGroups = true;
    this.enableAutoScroll = true;
    this.enableItemInfoBtn = false
}
CustomizeItem.prototype.getImageFileName = function(a) {
    var b = a.ImageName + ".jpg";
    if (b == ".jpg") {
        b = "itm" + strPadLeft("0", 6, a.ID.toString()) + ".jpg"
    }
    return b
};
CustomizeItem.prototype.getIngredientImage = function(b) {
    var a = b.ImageName + ".png";
    if (a == ".png") {
        a = "itm" + strPadLeft("0", 6, b.ID.toString()) + ".png"
    }
    return a
};
CustomizeItem.prototype.Init = function() {
    if (this.menuItem != null) {
        var b = GoogleTrack_getItemEnName(this.menuItem.ID);
        googleTag.push({
            event: "Open",
            Category: "Customize Item",
            ElementType: "Item",
            ID: this.menuItem.ID,
            Name: b
        })
    }
    ScrollClicked = false;
    if (this.beforeShowPage != null) {
        this.beforeShowPage()
    }
    var a = this.pages.CustomizeItem_Main;
    this.modTitleID = createUUID();
    this.modQuestionID = createUUID();
    this.grpAreaID = createUUID();
    this.customize_summaryID = createUUID();
    this.cancel_actID = createUUID();
    this.cancel_act2ID = createUUID();
    this.totalID = createUUID();
    this.ok_actID = createUUID();
    this.ok_act2ID = createUUID();
    this.mainImageLeftID = createUUID();
    this.mainImageRightID = createUUID();
    this.mainNameID = createUUID();
    this.spinQtyID = createUUID();
    this.spinQtyUpID = createUUID();
    this.spinQtyDownID = createUUID();
    this.pizzaMainFilterBtnHAH_ID = createUUID();
    this.pizzaMainFilterBtnFull_ID = createUUID();
    a = a.replace("#grpArea#", this.grpAreaID);
    a = a.replace("#customize_summary#", this.customize_summaryID);
    a = a.replace(/#BACK#/gi, _genActionLink(this, function(c) {
        c.backClick()
    }, true));
    a = a.replace("#ok_act#", this.ok_actID);
    a = a.replace("#ok_act2#", this.ok_act2ID);
    a = a.replace("#cancel_act#", this.cancel_actID);
    a = a.replace("#cancel_act2#", this.cancel_act2ID);
    a = a.replace("#SUMMARY_TOTAL#", this.totalID);
    a = a.replace("#MAIN_ITM_NAME_ID#", this.mainNameID);
    a = a.replace("#MAIN_ITM_IMG_ID_LEFT#", this.mainImageLeftID);
    a = a.replace("#MAIN_ITM_IMG_ID_RIGHT#", this.mainImageRightID);
    a = a.replace("#QUANTITY_SPIN#", this.spinQtyID);
    a = a.replace("#QUANTITY_SPINUP#", this.spinQtyUpID);
    a = a.replace("#QUANTITY_SPINDOWN#", this.spinQtyDownID);
    a = a.replace("#PIZZA_MAIN_FILTER_HAH#", this.pizzaMainFilterBtnHAH_ID);
    a = a.replace("#PIZZA_MAIN_FILTER_FULL#", this.pizzaMainFilterBtnFull_ID);
    $(this.pagesContainer).html(a);
    $("#" + this.pizzaMainFilterBtnHAH_ID).hide();
    $("#" + this.pizzaMainFilterBtnFull_ID).hide();
    if (this.menuItem != null) {
        $("#" + this.mainNameID).html(this.menuItem.Name);
        $("#" + this.mainImageLeftID).css("background-image", "url('/Images/SummaryImages/" + this.getImageFileName(this.menuItem) + "')");
        $("#" + this.mainImageRightID).css("background-image", "url('/Images/SummaryImages/" + this.getImageFileName(this.menuItem) + "')")
    }
    $(".customizeItem_summary_image_inner_wrapper").hide();
    if ((typeof this.cartItem === "undefined" || this.cartItem == null) && this.menuItem != null) {
        this.cartItem = new Object();
        this.cartItem.ID = this.menuItem.ID;
        this.cartItem.Name = this.menuItem.Name;
        this.cartItem.Price = 0;
        this.cartItem.Weight = 0;
        this.cartItem.modGroupsItems = new Array();
        autoSelectDefaultModifiers(this.cartItem, this.menuItem);
        if (typeof this.cartItem.modGroupsItems === "undefined") {
            this.cartItem.modGroupsItems = new Array()
        }
    } else {
        this["Qty"] = this.cartItem.Qty;
        this["shopping_cart_group"] = getCartItemCRC(this.cartItem)
    }
    if (typeof this["Qty"] === "undefined") {
        this["Qty"] = 1
    }
    if (typeof this["shopping_cart_group"] === "undefined") {
        this["shopping_cart_group"] = null
    }
    $("#" + this.spinQtyID).html(this["Qty"]);
    $("#" + this.spinQtyUpID).data("ctrlr", this);
    $("#" + this.spinQtyDownID).data("ctrlr", this);
    $("#" + this.spinQtyUpID).click(function() {
        $(this).data("ctrlr")["Qty"] = $(this).data("ctrlr")["Qty"] + 1;
        $(this).data("ctrlr").drawSummary()
    });
    $("#" + this.spinQtyDownID).click(function() {
        if ($(this).data("ctrlr")["Qty"] > 1) {
            $(this).data("ctrlr")["Qty"] = $(this).data("ctrlr")["Qty"] - 1
        }
        $(this).data("ctrlr").drawSummary()
    });
    $("#" + this.ok_actID).data("ctrlr", this);
    $("#" + this.ok_act2ID).data("ctrlr", this);
    $("#" + this.cancel_actID).data("ctrlr", this);
    $("#" + this.cancel_act2ID).data("ctrlr", this);
    $("#" + this.ok_act2ID).click(function() {
        $(this).data("ctrlr").finish()
    });
    $("#" + this.ok_actID).click(function() {
        $(this).data("ctrlr").finish()
    });
    $("#" + this.cancel_actID).click(function() {
        $(this).data("ctrlr").cancel()
    });
    $("#" + this.cancel_act2ID).click(function() {
        $(this).data("ctrlr").cancel()
    });
    this.drawModGroups();
    this.drawSummary();
    if (this.afterShowPage != null) {
        this.afterShowPage()
    }
    UpdateScrolls()
};
CustomizeItem.prototype.backClick = function() {};
CustomizeItem.prototype.buildVisualStepsLine = function(c, a, k, b) {
    for (var h in a.modGroup) {
        if (typeof a.modGroup[h] === "undefined") {
            continue
        }
        var o = a.modGroup[h];
        o.viewed = typeof o.viewed !== "undefined" ? o.viewed : false;
        if (typeof a.itemModGroups !== "undefined" && a.itemModGroups != null) {
            for (var f in a.itemModGroups) {
                var l = a.itemModGroups[f];
                if (l.ID == o.ID) {
                    o.Minimum = l.Minimum;
                    o.Maximum = l.Maximum;
                    if (o.Style == "required") {
                        o.Minimum = o.Maximum
                    }
                    break
                }
            }
        }
        k[k.length] = {
            cartItem: c,
            modGroup: o,
            level: b
        };
        for (var d in c.modGroupsItems) {
            var j = c.modGroupsItems[d];
            if (j.ModGroupID == o.ID) {
                for (var f in o.Items) {
                    var e = o.Items[f];
                    if (j.ID == e.ID) {
                        this.buildVisualStepsLine(j, e, k, b + 1);
                        break
                    }
                }
            }
        }
    }
    k = k.sort(function(q, p) {
        var m = typeof q.modGroup === "undefined" ? 0 : q.modGroup.Sequence;
        var g = typeof p.modGroup === "undefined" ? 0 : p.modGroup.Sequence;
        if (typeof m === "undefined" || m == null) {
            m = 0
        }
        if (typeof g === "undefined" || g == null) {
            g = 0
        }
        return parseInt(m) - parseInt(g)
    })
};
CustomizeItem.prototype.getStepsLine = function() {
    var a = [];
    if (typeof this.cartItem !== "undefined" && this.cartItem != null) {
        this.buildVisualStepsLine(this.cartItem, this.menuItem, a, 0)
    }
    return a
};
CustomizeItem.prototype.drawModGroups = function() {
    var c = $("#" + this.grpAreaID);
    var f = this.getStepsLine();
    var b = this["oldLine"];
    for (var a in f) {
        var d = false;
        for (var e in b) {
            if (f[a]["cartItem"] == b[e]["cartItem"] && f[a]["modGroup"] == b[e]["modGroup"]) {
                f[a]["div"] = b[e]["div"];
                f[a]["viewed"] = b[e]["viewed"];
                d = true;
                break
            }
        }
        f[a]["found"] = d
    }
    for (var e in b) {
        var d = false;
        for (var a in f) {
            if (f[a]["cartItem"] == b[e]["cartItem"] && f[a]["modGroup"] == b[e]["modGroup"]) {
                d = true;
                break
            }
        }
        b[e]["found"] = d
    }
    for (var e in b) {
        if (!b[e]["found"]) {
            b[e]["div"].remove()
        }
    }
    for (var a in f) {
        if (!f[a]["found"]) {
            f[a]["div"] = $("<div>");
            if (!this.canShowModGroup(f[a]["modGroup"])) {
                f[a]["div"].css("display", "none")
            }
            f[a]["div"].attr("id", createUUID())
        } else {
            f[a]["div"].detach()
        }
    }
    var e = 1;
    for (var a in f) {
        c.append(f[a]["div"]);
        f[a]["div"].data("view_order", e);
        f[a]["div"].data("view_order_total", f.length);
        e++
    }
    for (var a in f) {
        if (!f[a]["found"]) {
            this.drawModGroupItemsList(f[a]["cartItem"], f[a]["modGroup"], f[a]["div"], f[a]);
            $("#" + f[a]["div"].attr("id") + " img").each(function() {
                this.onerror = function() {
                    ReplaceMissingImage(this)
                }
            })
        }
    }
    for (var a in f) {
        f[a]["div"].data("vieworderArea").html(f[a]["div"].data("view_order"));
        if (f[a]["cartItem"] != null) {
            this.UpdateGroupAreaSummary(f[a]["cartItem"], f[a]["modGroup"], f[a]["div"])
        }
    }
    for (var e in b) {
        if (b[e]["found"] && b[e]["includedStep"]) {
            for (var a in f) {
                if (f[a]["includedStep"]) {
                    f[a]["viewed"] = b[e]["viewed"];
                    break
                }
            }
            break
        }
    }
    this["oldLine"] = f;
    UpdateScrolls()
};
CustomizeItem.prototype.getModGroupsDrawStyle = function(a) {
    var b = "";
    if (a.Maximum == 1 || a.Maximum == 1) {
        b = "single"
    } else {
        if (a.Items.length >= 10) {
            b = "ingredients"
        } else {
            b = "multiple"
        }
    }
    return b
};
CustomizeItem.prototype.scrollToNextArea = function(c) {
    var b = this["oldLine"];
    var e = false;
    var d = null;
    for (var a in b) {
        if (e && b[a]["div"].is(":visible")) {
            d = b[a]["div"].get(0);
            break
        }
        if (b[a]["div"].get(0) == c.get(0)) {
            e = true
        }
    }
    if (e) {
        scrollToControl(d)
    }
};
CustomizeItem.prototype.createBlankModGroup = function(g, f, c, l, j) {
    if (typeof j === "undefined") {
        j = false
    }
    var b = createUUID();
    var e = createUUID();
    var k = createUUID();
    var d = createUUID();
    var m = createUUID();
    var h = createUUID();
    var a = this.pages.CustomizeItem_Group;
    a = a.replace("#TITLE#", f);
    a = a.replace("#QUESTION#", c);
    a = a.replace("#TIP#", l);
    a = a.replace("#GROUPHEADER#", b);
    a = a.replace("#GROUPHEADER_EXPANDIMG#", k);
    a = a.replace("#SELECTEDITEMSSUMMARY#", m);
    a = a.replace("#GROUPBODY#", e);
    a = a.replace("#CONTENT#", "");
    a = a.replace("#VIEWORDERID#", d);
    a = a.replace("#CONTINUE_ID#", h);
    g.html(a);
    $("#" + b).data("body_div", $("#" + e));
    $("#" + b).data("expnd_img", $("#" + k));
    $("#" + b).data("area", g);
    g.data("body_div", $("#" + e));
    g.data("expnd_img", $("#" + k));
    g.data("vieworderArea", $("#" + d));
    g.data("SelectedItemsSummary", $("#" + m));
    g.data("continueBtn", $("#" + h));
    if (!j) {
        $("#" + h).hide()
    }
    $("#" + b).click(function() {
        var o = $(this).data("body_div").is(":visible");
        $(this).data("body_div").toggle("slow", function() {
            UpdateScrolls()
        });
        if (o) {
            $(this).data("expnd_img").attr("src", "/Images/SharedImages/collapsed.png")
        } else {
            $(this).data("expnd_img").attr("src", "/Images/SharedImages/expanded.png")
        }
    });
    $("#" + k).attr("src", "/Images/SharedImages/expanded.png");
    return $("#" + e)
};
CustomizeItem.prototype.drawModGroupItemsList = function(c, m, k, e) {
    var o = "";
    for (var h in m.Items) {
        var f = m.Items[h];
        o += "<span id='MODCNT_" + m.ID + "_" + f.ID + "_" + k.attr("id") + "'></span>"
    }
    var l = "";
    if (m.Minimum == m.Maximum && m.Maximum == 0) {
        l = Translate("Multiple selection")
    } else {
        if (m.Minimum == m.Maximum && m.Maximum == 1) {
            l = Translate("Select one item")
        } else {
            if (m.Minimum == m.Maximum && m.Minimum > 1) {
                l = Translate("Select") + " " + m.Minimum + " " + Translate("items")
            } else {
                if (m.Maximum > m.Minimum && m.Minimum == 0) {
                    l = Translate("Select up to") + " " + m.Maximum + " " + Translate("items (optional)")
                } else {
                    if (m.Maximum > m.Minimum && m.Minimum > 0) {
                        l = Translate("Select at least") + " " + m.Minimum + " " + Translate("up to") + " " + m.Maximum + " " + Translate("items")
                    }
                }
            }
        }
    }
    var b = (g == "multiple") || (m.Minimum == 0);
    this.createBlankModGroup(k, m.Name, m.Question, l, b).html(o);
    k.data("body_div").append("<div style='clear:both;'></div>");
    if (b && m.Minimum > 0) {
        k.data("continueBtn").prop("disabled", true);
        k.data("continueBtn").val(l)
    }
    if (b) {
        m.viewed = false;
        k.data("continueBtn").data("_ctrl", this);
        k.data("continueBtn").data("grpArea", k);
        k.data("continueBtn").data("cartItem", c);
        k.data("continueBtn").data("modGroup", m);
        k.data("continueBtn").click(function() {
            if ($(this).data("modGroup")["Minimum"] == 0) {
                $(this).data("modGroup").viewed = true
            }
            $(this).data("_ctrl").drawModGroups();
            $(this).data("_ctrl").UpdateGroupAreaSummary($(this).data("cartItem"), $(this).data("modGroup"), $(this).data("grpArea"));
            $(this).data("_ctrl").drawSummary()
        })
    }
    var g = this.getModGroupsDrawStyle(m);
    for (var h in m.Items) {
        var f = m.Items[h];
        var j = $("#MODCNT_" + m.ID + "_" + f.ID + "_" + k.attr("id"));
        j.data("cartItem", c);
        j.data("groupData", m);
        j.data("itemData", f);
        j.data("ctrlr", this);
        j.data("click_params", {
            UI: j,
            cartItem: c,
            groupData: m,
            itemData: f,
            ctrlr: this,
            AreaID: k.attr("ID")
        });
        j.data("toggle_click", function() {
            var p = $(this).data("click_params");
            p.ctrlr.clickModItem(p.cartItem, p.UI, p.groupData, p.itemData, "toggle", p.AreaID)
        });
        j.data("add_click", function() {
            var p = $(this).data("click_params");
            p.ctrlr.clickModItem(p.cartItem, p.UI, p.groupData, p.itemData, "add", p.AreaID)
        });
        j.data("remove_click", function() {
            var p = $(this).data("click_params");
            p.ctrlr.clickModItem(p.cartItem, p.UI, p.groupData, p.itemData, "remove", p.AreaID)
        });
        var a = this.isModifierSelected(c, m.ID, f.ID) > 0;
        var d = this.isModifierItemInNoModCode(c, m, f);
        this.setUIState(j, a, d, g);
        if (this.enableItemInfoBtn && (g == "single" || g == "multiple")) {
            this.createItemInfoButton(j, f)
        }
    }
};
CustomizeItem.prototype.createItemInfoButton = function(c, a, b, d) {
    if (typeof b === "undefined") {
        b = 45
    }
    if (typeof d === "undefined") {
        d = 15
    }
    if (c.css("position") == "static") {
        c.css("position", "relative");
        c.css("display", "inline-block")
    }
    var e = $("<img src='/Images/SharedImages/iteminfo.png' />");
    e.data("ctrlr", this);
    e.data("itm", a);
    e.css("position", "absolute");
    e.css("top", b + "px");
    e.css("left", d + "px");
    e.css("cursor", "pointer");
    e.hide();
    e.click(function() {
        var g = $(this).data("itm");
        var f = $(this).data("ctrlr");
        f.onShowItemInfo(g)
    });
    c.data("infBtn", e);
    c.append(e);
    c.mouseenter(function() {
        var f = $(this).data("infBtn");
        f.css("zIndex", getTopmostZIndex() + 1);
        f.show()
    });
    c.mouseleave(function() {
        var f = $(this).data("infBtn");
        f.hide()
    })
};
CustomizeItem.prototype.getLastClickedModItem = function(a, c, b) {
    var f = {
        modItem: null,
        UIElement: null
    };
    var e = null;
    for (var d in a.modGroupsItems) {
        if (a.modGroupsItems[d]["ModGroupID"] == c.ID) {
            e = a.modGroupsItems[d]["ID"]
        }
    }
    if (e != null) {
        for (var g in c.Items) {
            if (c.Items[g]["ID"] == e) {
                f.modItem = c.Items[g];
                break
            }
        }
        f.UIElement = $("#MODCNT_" + c.ID + "_" + e + "_" + b)
    }
    return f
};
CustomizeItem.prototype.clickModItem = function(q, d, g, s, e, k, v) {
    var l = this.isModifierSelected(q, g.ID, s.ID);
    var o = l > 0;
    if ((o && e == "toggle") || (o && e == "remove")) {
        if (e == "toggle") {
            this.clearModifierItem(q, g, s)
        } else {
            if (e == "remove") {
                if (l > 1) {
                    this.removeModifierItem(q, g, s)
                } else {
                    if (this.getModGroupsDrawStyle(g) == "ingredients") {
                        this.clearModifierItem(q, g, s);
                        this.addModifierItemToNoModCode(q, g, s)
                    } else {
                        this.clearModifierItem(q, g, s)
                    }
                }
            }
        }
        var p = this.isModifierItemInNoModCode(q, g, s);
        this.setUIState(d, this.isModifierSelected(q, g.ID, s.ID) > 0, p, this.getModGroupsDrawStyle(g));
        this.drawModGroups()
    } else {
        if ((!o && e == "toggle") || e == "add") {
            var h = this.getModGroupTotalSelectedWeight(q, g);
            var b = this.getLastClickedModItem(q, g, k);
            var t = b.modItem;
            var j = b.UIElement;
            if (t != null && j != null && g.Maximum > 0 && g.Maximum < (h + GetModItemWeight(g, s.ID))) {
                this.removeModifierItem(q, g, t);
                var p = this.isModifierItemInNoModCode(q, g, t);
                this.setUIState(j, this.isModifierSelected(q, g.ID, t.ID) > 0, p, this.getModGroupsDrawStyle(g));
                this.drawModGroups()
            }
            if (this.validateModifiers(q, g, s, false)) {
                if (this.getModGroupsDrawStyle(g) == "ingredients") {
                    this.enableAutoScroll = false
                }
                this.removeModifierItemFromNoModCode(q, g, s);
                this.addModifierItem(q, g, s);
                this.setUIState(d, true, false, this.getModGroupsDrawStyle(g));
                this.drawModGroups();
                var a = $("#" + k).data("view_order_total");
                var r = $("#" + k).data("view_order");
                var h = this.getModGroupTotalSelectedWeight(q, g);
                if (g.Maximum <= h && this.getModGroupsDrawStyle(g) == "single" && a > r) {
                    if (this.enableAutoScroll && !ScrollClicked) {
                        this.scrollToNextArea($("#" + k))
                    }
                }
            }
        } else {
            if (e == "qty_change") {
                var u = v.val();
                var c = u * GetModItemWeight(g, s.ID);
                this.clearModifierItem(q, g, s);
                var h = this.getModGroupTotalSelectedWeight(q, g);
                if (g.Maximum != 0) {
                    if (g.Maximum >= (h + c)) {
                        for (var m = 0; m < u; m++) {
                            this.addModifierItem(q, g, s)
                        }
                        if (g.Minimum > 0 && g.Minimum > (h + c)) {
                            $("#" + k).data("continueBtn").val(Translate("Add") + " " + (g.Minimum - (h + c)) + " " + Translate("more items"));
                            $("#" + k).data("continueBtn").prop("disabled", true)
                        } else {
                            if (g.Minimum == (h + c) || g.Minimum == 0) {
                                $("#" + k).data("continueBtn").prop("disabled", false);
                                $("#" + k).data("continueBtn").val(Translate("Continue"))
                            }
                        }
                    } else {
                        var f = Math.round(g.Maximum - h) / GetModItemWeight(g, s.ID);
                        v.val(f).change();
                        if (!v.is("select")) {
                            v.html(f)
                        }
                        alert(Translate("You can only add") + " " + g.Maximum + " " + Translate("items."));
                        u = f
                    }
                } else {
                    for (var m = 0; m < u; m++) {
                        this.addModifierItem(q, g, s)
                    }
                }
                if (v.data("priceLabel").html() != "Free") {
                    if (u > 1) {
                        v.data("priceLabel").html(s.Price > 0 ? Translate("Extra") + " " + RoundPrice(s.Price * u) + CurrencySymbol : Translate(""))
                    } else {
                        v.data("priceLabel").html(s.Price > 0 ? Translate("Extra") + " " + s.Price + CurrencySymbol : Translate(""))
                    }
                }
                this.UpdateGroupAreaSummary(q, g, $("#" + k));
                this.drawSummary()
            }
        }
    }
};
CustomizeItem.prototype.UpdateGroupAreaSummary = function(a, b, d) {
    var c = d.data("SelectedItemsSummary");
    c.html("")
};
CustomizeItem.prototype.getModItemsHtmlFilesNames = function(a, b, c, d) {
    return d
};
CustomizeItem.prototype.setUIState = function(l, m, a, r) {
    var k = createUUID();
    var q = createUUID();
    var p = createUUID();
    var e = createUUID();
    var j = createUUID();
    var g = $(l).data("itemData");
    var o = $(l).data("groupData");
    var b = $(l).data("cartItem");
    var h = 20;
    var f = {
        Normal: "",
        Active: "",
        No: ""
    };
    if (r == "single") {
        f.Normal = "CustomizeItem_SingleItem";
        f.Active = "CustomizeItem_SingleItemActive";
        f.No = ""
    } else {
        if (r == "ingredients") {
            f.No = "CustomizeItem_MinMaxItemNoMod";
            f.Normal = "CustomizeItem_MinMaxItem";
            f.Active = "CustomizeItem_MinMaxItemActive"
        } else {
            f.No = "";
            f.Normal = "CustomizeItem_MultipleItem";
            f.Active = "CustomizeItem_MultipleItemActive"
        }
    }
    f = this.getModItemsHtmlFilesNames(o, g, r, f);
    var d = "";
    if (a) {
        d = this.pages[f.No]
    }
    if (!m) {
        d = this.pages[f.Normal]
    } else {
        d = this.pages[f.Active]
    }
    if (r == "single") {
        d = d.replace(/#IMG#/gi, "/Images/ItemsImages/Menu" + CurrentMenuTemplateID + "/" + this.getImageFileName(g));
        h = 30
    } else {
        if (r == "ingredients") {
            d = d.replace(/#IMG#/gi, "/Images/IngredientsImages/Menu" + CurrentMenuTemplateID + "/" + this.getIngredientImage(g));
            h = 60
        } else {
            d = d.replace(/#IMG#/gi, "/Images/ItemsImages/Menu" + CurrentMenuTemplateID + "/" + this.getImageFileName(g));
            h = 30
        }
    }
    d = d.replace(/#ADD#/gi, q);
    d = d.replace(/#REMOVE#/gi, p);
    d = d.replace(/#COMMAND#/gi, k);
    d = d.replace(/#NAMEID#/gi, j);
    d = d.replace(/#NAME#/gi, g.Name);
    d = d.replace(/#NAME_LIMITED#/gi, limitText(g.Name, h));
    d = d.replace(/#DESCRIPTION#/gi, g.Description);
    d = d.replace(/#HINT#/gi, g.Name);
    var s = GetModItemPrice(o, g.ID);
    if (!g.showModItemPrice) {
        s = 0
    }
    d = d.replace(/#PRICE#/gi, s > 0 ? s.toString() + CurrencySymbol : "");
    d = d.replace(/#PRICE_DEAL#/gi, s > 0 ? s.toString() + CurrencySymbol : Translate("Continue"));
    d = d.replace(/#NOMODCODE#/gi, e);
    var c = this.isModifierSelected(b, o.ID, g.ID);
    d = d.replace("#COUNT#", c);
    $(l).html(d);
    $("#" + k).data("click_params", $(l).data("click_params"));
    $("#" + j).data("click_params", $(l).data("click_params"));
    $("#" + q).data("click_params", $(l).data("click_params"));
    $("#" + p).data("click_params", $(l).data("click_params"));
    $("#" + k).click($(l).data("toggle_click"));
    $("#" + j).click($(l).data("toggle_click"));
    $("#" + q).click($(l).data("add_click"));
    $("#" + p).click($(l).data("remove_click"));
    $("#" + l.attr("id") + " img").each(function() {
        if (!$(this).attr("orgimg")) {
            $(this).attr("orgimg", $(this).attr("src"))
        }
        this.onerror = function() {
            ReplaceMissingImage(this)
        }
    })
};
CustomizeItem.prototype.addModifierItem = function(a, k, c, m, f) {
    var b = false;
    if (typeof m === "undefined") {
        m = true
    }
    if (typeof f === "undefined") {
        f = GetModItemWeight(k, c.ID)
    }
    if (!m) {
        for (var e in a.modGroupsItems) {
            var h = a.modGroupsItems[e];
            if (h.ModGroupID == k.ID && h.ID == c.ID) {
                b = true;
                break
            }
        }
    } else {
        b = false
    }
    if (!b) {
        var d = new Object();
        d.ID = c.ID;
        d.ModGroupID = k.ID;
        d.ModGroupOrder = getModGroupOrder(a.ID, k.ID);
        d.Name = c.Name;
        d.Weight = f;
        d.Price = getCartItemPrice(d);
        d.modGroupsItems = [];
        d.stepNum = null;
        var g = $("#" + this.customize_summaryID).children();
        for (var l = 0; l < g.length; l++) {
            var j = $(g.get(l));
            if (j.hasClass("active")) {
                d.stepNum = $(j.get(0)).find(".StepNum").html()
            }
        }
        a.modGroupsItems[a.modGroupsItems.length] = d;
        autoSelectDefaultModifiers(d, c)
    }
    this.drawSummary()
};
CustomizeItem.prototype.removeModifierItem = function(c, b, a) {
    var e = false;
    for (var d in c.modGroupsItems) {
        var f = c.modGroupsItems[d];
        if (f.ModGroupID == b.ID && f.ID == a.ID) {
            c.modGroupsItems.splice(d, 1);
            break
        }
    }
};
CustomizeItem.prototype.clearModifierItem = function(c, b, a) {
    var e = false;
    while (this.isModifierSelected(c, b.ID, a.ID) > 0) {
        for (var d in c.modGroupsItems) {
            var f = c.modGroupsItems[d];
            if (f.ModGroupID == b.ID && f.ID == a.ID) {
                c.modGroupsItems.splice(d, 1);
                break
            }
        }
    }
};
CustomizeItem.prototype.clearModifierGroup = function(b, a, d) {
    for (var c in b.modGroupsItems) {
        var f = b.modGroupsItems[c];
        if (f.ModGroupID == a.ID) {
            if (typeof d === "undefined") {
                b.modGroupsItems.splice(c, 1)
            } else {
                var e = $("#MODCNT_" + a.ID + "_" + f.ID + "_" + d);
                this.clickModItem(b, e, a, f, "remove", d)
            }
        }
    }
};
CustomizeItem.prototype.isModifierItemInNoModCode = function(c, b, a) {
    if (typeof c.NoModCodeItems === "undefined") {
        c.NoModCodeItems = []
    }
    for (var d in c.NoModCodeItems) {
        var e = c.NoModCodeItems[d];
        if (e.ID == a.ID && e.ModGroupID == b.ID) {
            return true
        }
    }
    return false
};
CustomizeItem.prototype.addModifierItemToNoModCode = function(c, b, a) {
    this.clearModifierItem(c, b, a);
    if (typeof c.NoModCodeItems === "undefined") {
        c.NoModCodeItems = []
    }
    var d = new Object();
    d.ID = a.ID;
    d.ModGroupID = b.ID;
    d.ModGroupOrder = getModGroupOrder(c.ID, b.ID);
    d.Name = a.Name;
    d.Weight = 0;
    d.Price = getCartItemPrice(d);
    d.modGroupsItems = [];
    c.NoModCodeItems[c.NoModCodeItems.length] = d
};
CustomizeItem.prototype.removeModifierItemFromNoModCode = function(c, b, a) {
    if (typeof c.NoModCodeItems === "undefined") {
        c.NoModCodeItems = []
    }
    for (var d in c.NoModCodeItems) {
        var e = c.NoModCodeItems[d];
        if (e.ID == a.ID && e.ModGroupID == b.ID) {
            c.NoModCodeItems.splice(d, 1);
            break
        }
    }
};
CustomizeItem.prototype.isModifierSelected = function(a, e, c) {
    var d = 0;
    for (var b in a.modGroupsItems) {
        var f = a.modGroupsItems[b];
        if (f.ModGroupID == e && f.ID == c) {
            d++
        }
    }
    return d
};
CustomizeItem.prototype.canShowModGroup = function(a) {
    return !(a.Items.length == 1 && a.Minimum > 0)
};
CustomizeItem.prototype.optionalModGroup = function(a) {
    return a.Minimum == 0
};
CustomizeItem.prototype.drawSummary = function() {
    if (typeof this.cartItem === "undefined" || this.cartItem == null) {
        return
    }
    var j = this.oldLine;
    var b = this.pages.CustomizeItem_SummaryModGroup;
    var g = this.pages.CustomizeItem_SummaryModItem;
    var m = 1;
    $("#" + this.customize_summaryID).empty();
    for (var q in j) {
        var d = j[q];
        var c = d.cartItem;
        var o = d.modGroup;
        var a = d.level;
        d.ctrlr = this;
        if (c == null) {
            continue
        }
        var t = "";
        var f = genActionLink(d.div.get(0), function(l) {
            scrollToControl(l)
        });
        t = b;
        t = t.replace("#NUMBER#", m);
        t = t.replace("#NAME#", o.Name);
        t = t.replace("#CHANGE_LNK#", f);
        if (this.canShowModGroup(o)) {
            t = t.replace("#CHANGE_LINK_VISIBILITY#", "inline")
        } else {
            t = t.replace("#CHANGE_LINK_VISIBILITY#", "none")
        }
        m++;
        var k = "";
        var e = 0;
        var h = "";
        var v = {};
        for (var p in c.modGroupsItems) {
            if (c.modGroupsItems[p]["ModGroupID"] == o.ID) {
                if (typeof v[c.modGroupsItems[p]["ID"]] === "undefined") {
                    v[c.modGroupsItems[p]["ID"]] = true;
                    var r = this.isModifierSelected(c, o.ID, c.modGroupsItems[p]["ID"]);
                    var w = g;
                    w = w.replace("#NAME#", c.modGroupsItems[p]["Name"]);
                    if (e > 0) {
                        h += ", "
                    }
                    h += c.modGroupsItems[p]["Name"];
                    k += w
                }
                e++
            }
        }
        if (e == 1) {
            t = t.replace("#SELECTEDITEMS#", k)
        } else {
            if (e == 0) {
                t = t.replace("#SELECTEDITEMS#", g.replace("#NAME#", Translate("None")))
            } else {
                if (this.getModGroupsDrawStyle(o) == "ingredients") {
                    t = t.replace("#SELECTEDITEMS#", g.replace("#NAME#", "<span style='width:120px;display:inline-block;font-size:10px;'>" + limitText(h, 100) + "</span>"))
                } else {
                    t = t.replace("#SELECTEDITEMS#", g.replace("#NAME#", e + " " + Translate("Items selected")))
                }
            }
        }
        var u = $(t);
        u.data("line", d);
        $("#" + this.customize_summaryID).append(u)
    }
    var s = this["Qty"];
    if (typeof s === "undefined") {
        s = this["Qty"]
    }
    $("#" + this["spinQtyID"]).html(s);
    $("#" + this.totalID).html(getCartItemPrice(this.cartItem) * s + CurrencySymbol)
};
CustomizeItem.prototype.validateModifiers = function(b, g, d, c) {
    var f = true;
    var a = "";
    if (g == null || g.Items.length == 0) {
        return f
    }
    var e = this.getModGroupTotalSelectedWeight(b, g);
    if (d != null && (!c) && g.Maximum != 0 && g.Maximum < (e + GetModItemWeight(g, d.ID))) {
        f = false;
        a = Translate("You can't select more modifiers in") + " '" + g.Name + "' " + Translate("section")
    }
    if (c && (g.Minimum > e)) {
        f = false;
        a = Translate("Please select more modifiers in") + " '" + g.Name + "' " + Translate("section")
    }
    if (!f) {
        alert(a)
    }
    return f
};
CustomizeItem.prototype.ValidateAll = function() {
    var d = this.getStepsLine();
    for (var c in d) {
        var a = d[c]["cartItem"];
        var b = d[c]["modGroup"];
        if (typeof a === "object") {
            var e = this.validateModifiers(a, b, null, true);
            if (!e) {
                return false
            }
        }
    }
    return true
};
CustomizeItem.prototype.finish = function() {
    if (this.ValidateAll()) {
        if (this.onOK != null) {
            this.cartItem.Qty = this["Qty"];
            this.cartItem.EntryID = -1;
            this.onOK(this.cartItem)
        }
    }
};
CustomizeItem.prototype.getModGroupTotalSelectedWeight = function(b, a) {
    var d = 0;
    if (a != null) {
        for (var c in b.modGroupsItems) {
            var e = b.modGroupsItems[c];
            if (e.ModGroupID == a.ID) {
                d += GetModItemWeight(a, e.ID)
            }
        }
    }
    return d
};
CustomizeItem.prototype.cancel = function() {
    if (this.onCancel != null) {
        this.onCancel()
    }
};
"use strict";

function specialPizzaCreateDefaultCartItem(h) {
    var c = h.Crust;
    var q = h.Size;
    var m = {
        Size: q,
        Crust: c
    };
    var p = 0;
    var e = 0;
    var o = m[Pizza_MenuItemsFilter.Row["Name"]];
    for (p = 0; p < Pizza_MenuItemsFilter.Row["Details"].length; p++) {
        if (Pizza_MenuItemsFilter.Row["Details"][p]["ID"] == o) {
            break
        }
    }
    o = m[Pizza_MenuItemsFilter.Col["Name"]];
    for (e = 0; e < Pizza_MenuItemsFilter.Col["Details"].length; e++) {
        if (Pizza_MenuItemsFilter.Col["Details"][e]["ID"] == o) {
            break
        }
    }
    var b = Pizza_MenuItemsData[p][e];
    var a = OriginalItems[b];
    var g = h.PizzaMenuItemMod;
    var l = h.PizzaMenuItemModGroup;
    var d = new Object();
    d.ID = a.ID;
    d.Name = a.Name;
    d.Price = 0;
    d.Weight = 0;
    d.modGroupsItems = new Array();
    var k = new Object();
    k.ID = g.ID;
    k.ModGroupID = l.ID;
    k.ModGroupOrder = 0;
    k.Name = g.Name;
    k.Weight = GetModItemWeight(l, g.ID);
    k.Price = GetModItemPrice(l, g.ID);
    k.modGroupsItems = [];
    d.modGroupsItems[d.modGroupsItems.length] = k;
    var f = new Object();
    f.ID = Original_LeftSideItemID;
    f.ModGroupID = l.ID;
    f.ModGroupOrder = 0;
    f.Name = Tranlsate("Left Half");
    f.Price = 0;
    f.Weight = 0;
    f.modGroupsItems = new Array();
    d.modGroupsItems[d.modGroupsItems.length] = f;
    var j = new Object();
    j.ID = Original_RightSideItemID;
    j.ModGroupID = l.ID;
    j.ModGroupOrder = 0;
    j.Name = Tranlsate("Right Half");
    j.Price = 0;
    j.Weight = 0;
    j.modGroupsItems = new Array();
    d.modGroupsItems[d.modGroupsItems.length] = j;
    return d
}

function CustomizePizza() {
    this.selectedGroupsIDz = null;
    this.typesAndIngrModGroup = null;
    this.filtersExist = false;
    this.scrollDrawAreas = [];
    this.PizzaItem = true;
    this.MainFilter_IsHAH = false
}
CustomizePizza.prototype = new CustomizeItem();
CustomizePizza.prototype.Init = function() {
    googleTag.push({
        event: "PageView",
        PageName: "Deal Builder",
        PageURL: "pizzabuilder"
    });
    if (this.cartItem != null) {
        var e = GoogleTrack_getItemEnName(this.cartItem.ID);
        googleTag.push({
            event: "Open",
            Category: "Pizza Builder",
            ElementType: "",
            ID: this.cartItem.ID,
            Name: e
        });
        for (var d in this.cartItem.modGroupsItems) {
            if (this.cartItem.modGroupsItems[d]["ID"] == Original_LeftSideItemID) {
                this.left_cartItem = this.cartItem.modGroupsItems[d]
            }
            if (this.cartItem.modGroupsItems[d]["ID"] == Original_RightSideItemID) {
                this.right_cartItem = this.cartItem.modGroupsItems[d]
            }
            if (this.left_cartItem != null && this.right_cartItem != null) {
                break
            }
        }
        var b = null;
        var l = OriginalItems[this.cartItem.ID];
        this.PizzaItem = l.PizzaItem;
        for (var d in l.modGroup) {
            if (l.PizzaItem) {
                if (l.modGroup[d]["Minimum"] >= 15 && l.modGroup[d]["Items"].length > 15) {
                    b = l.modGroup[d];
                    break
                }
            } else {
                if (l.modGroup[d]["Minimum"] == 1 && l.modGroup[d]["Maximum"] == 1) {
                    b = l.modGroup[d];
                    break
                }
            }
        }
        if (this.left_cartItem == null) {
            var g = new Object();
            g.ID = Original_LeftSideItemID;
            g.ModGroupID = b.ID;
            g.ModGroupOrder = 0;
            g.Name = Tranlsate("Left Half");
            g.Price = 0;
            g.Weight = 0;
            g.modGroupsItems = new Array();
            this.cartItem.modGroupsItems[this.cartItem.modGroupsItems.length] = g;
            this.left_cartItem = g
        }
        if (this.right_cartItem == null) {
            var h = new Object();
            h.ID = Original_RightSideItemID;
            h.ModGroupID = b.ID;
            h.ModGroupOrder = 0;
            h.Name = Tranlsate("Right Half");
            h.Price = 0;
            h.Weight = 0;
            h.modGroupsItems = new Array();
            this.cartItem.modGroupsItems[this.cartItem.modGroupsItems.length] = h;
            this.right_cartItem = h
        }
    }
    var a = false;
    if (this.menuItem != null && !this.menuItem.SpecialItem) {
        var j = this.menuIDtoFilterGroups();
        this.selectedGroupsIDz = {};
        if (j.row != null) {
            this.selectedGroupsIDz[Pizza_MenuItemsFilter.Row["Name"]] = Pizza_MenuItemsFilter.Row["Details"][j.row]["ID"];
            this.selectedGroupsIDz[Pizza_MenuItemsFilter.Col["Name"]] = Pizza_MenuItemsFilter.Col["Details"][j.col]["ID"];
            var c = Pizza_MenuItemsFilter.Row["Details"][j.row]["IsFull"];
            var f = Pizza_MenuItemsFilter.Col["Details"][j.col]["IsFull"];
            this.MainFilter_IsHAH = !(c || f)
        } else {
            this.selectedGroupsIDz[Pizza_MenuItemsFilter.Row["Name"]] = null;
            this.selectedGroupsIDz[Pizza_MenuItemsFilter.Col["Name"]] = null
        }
    } else {
        if (this.menuItem != null && this.menuItem.SpecialItem) {
            this.selectedGroupsIDz = {};
            this.selectedGroupsIDz.Size = this.menuItem.Size;
            this.selectedGroupsIDz.Crust = this.menuItem.Crust;
            this.specialModGroup = this.menuItem.PizzaMenuItemModGroup;
            this.specialModItem = this.menuItem.PizzaMenuItemMod;
            this.menuItem = null;
            this.filterGroupsToMenuID(false);
            a = true
        }
    }
    CustomizeItem.prototype.Init.call(this);
    $(".customizeItem_summary_image_inner_wrapper").show();
    $("#" + this.pizzaMainFilterBtnHAH_ID).show();
    $("#" + this.pizzaMainFilterBtnHAH_ID).data("owner", this);
    $("#" + this.pizzaMainFilterBtnHAH_ID).click(function() {
        ScrollClicked = true;
        $(this).data("owner").MainFilter_IsHAH = true;
        $(this).data("owner").applyMainFilter(true)
    });
    $("#" + this.pizzaMainFilterBtnFull_ID).show();
    $("#" + this.pizzaMainFilterBtnFull_ID).data("owner", this);
    $("#" + this.pizzaMainFilterBtnFull_ID).click(function() {
        ScrollClicked = true;
        $(this).data("owner").MainFilter_IsHAH = false;
        $(this).data("owner").applyMainFilter(true)
    });
    if (a) {
        this.filterGroupsToMenuID();
        if ($("#TYPE_" + this.specialModItem.ID).length > 0) {
            this.addModifierItem(this.cartItem, this.specialModGroup, this.specialModItem);
            this.setPizzaTypeUIState($("#TYPE_" + this.specialModItem.ID), true)
        }
    }
    if (!this.PizzaItem && this.cartItem != null) {
        var k = this.menuIDtoFilterGroups()["row"];
        var m = Pizza_MenuItemsData[k];
        this.updateFilterColumnsVisibility(m)
    }
    $("#" + this.mainNameID).html("Free Style Pizza");
    this.UpdateImage();
    this.drawModGroups()
};
CustomizePizza.prototype.UpdateImage = function() {
    var c = this.getSelectedPizzaTypesIDz(this.typesAndIngrModGroup);
    if (c.full != 0) {
        var b = OriginalItems[c.full]["ImageName"] + ".png";
        if (b == ".png") {
            b = "itm" + strPadLeft("0", 6, c.full.toString()) + ".png"
        }
        $("#" + this.mainImageLeftID).css("backgroundImage", "url('/Images/SummaryImages/" + b + "')");
        $("#" + this.mainImageRightID).css("backgroundImage", "url('/Images/SummaryImages/" + b + "')")
    } else {
        if (c.left != 0 || c.right != 0) {
            var d = "";
            if (c.left > 0) {
                d = OriginalItems[c.left]["ImageName"] + ".png";
                if (d == ".png") {
                    d = "itm" + strPadLeft("0", 6, c.left.toString()) + ".png"
                }
            }
            var a = "";
            if (c.right > 0) {
                a = OriginalItems[c.right]["ImageName"] + ".png";
                if (a == ".png") {
                    a = "itm" + strPadLeft("0", 6, c.right.toString()) + ".png"
                }
            }
            $("#" + this.mainImageLeftID).css("backgroundImage", "url('/Images/SummaryImages/" + d + "')");
            $("#" + this.mainImageRightID).css("backgroundImage", "url('/Images/SummaryImages/" + a + "')")
        } else {
            $("#" + this.mainImageID).attr("src", "/Images/PizzaTypeImages/Freestyle.jpg")
        }
    }
};
CustomizePizza.prototype.getStepsLine = function() {
    var a = CustomizeItem.prototype.getStepsLine.call(this);
    var f = [];
    var b = {};
    var c = {};
    var d = false;
    for (var e in a) {
        if (a[e]["modGroup"]["Items"].length == 0) {
            continue
        }
        if (a[e]["cartItem"]["ID"] == Original_LeftSideItemID || a[e]["cartItem"]["ID"] == Original_RightSideItemID) {
            continue
        }
        if (a[e]["cartItem"]["Weight"] > 10 && a[e]["level"] > 0) {
            continue
        }
        if (d || (a[e]["modGroup"]["Items"].length < 15 && a[e]["modGroup"]["Minimum"] < 15)) {
            f[f.length] = a[e];
            a[e]["type"] = "normal";
            if (a[e]["modGroup"]["Name"].indexOf("Crust") > -1 || a[e]["modGroup"]["Name"].indexOf("Size") > -1) {
                a[e]["sort"] = f.length
            } else {
                a[e]["sort"] = 100
            }
        } else {
            if (this.PizzaItem) {
                b.cartItem = "PizzaType";
                b.modGroup = a[e]["modGroup"];
                b.type = "PizzaType";
                b.sort = 3;
                f[f.length] = b;
                c.cartItem = "Ingredients";
                c.modGroup = a[e]["modGroup"];
                c.type = "Ingr";
                c.sort = 4;
                f[f.length] = c
            } else {
                if (a[e]["modGroup"]["Minimum"] == 1 && a[e]["modGroup"]["Maximum"] == 1) {
                    b.cartItem = "PizzaType";
                    b.modGroup = a[e]["modGroup"];
                    b.type = "PizzaType";
                    b.sort = 3;
                    f[f.length] = b
                }
                if (a[e]["modGroup"]["Minimum"] == 0 && a[e]["modGroup"]["Maximum"] == 0) {
                    c.cartItem = "Ingredients";
                    c.modGroup = a[e]["modGroup"];
                    c.type = "Ingr";
                    c.sort = 4;
                    f[f.length] = c
                }
            }
            d = true
        }
    }
    f.sort(function(h, g) {
        return h.sort - g.sort
    });
    return f
};
CustomizePizza.prototype.scrollToNextArea = function(c) {
    var b = this.scrollDrawAreas;
    var e = false;
    var d = null;
    for (var a in b) {
        if (e && b[a]["div"].is(":visible")) {
            d = b[a]["div"].get(0);
            break
        }
        if (b[a]["div"].get(0) == c.get(0)) {
            e = true
        }
    }
    if (e && d != null) {
        scrollToControl(d)
    }
};
CustomizePizza.prototype.drawModGroupItemsList = function(b, a, d, c) {
    if (c.type == "PizzaType") {
        this.drawModGroupPizzaType(a, d, c)
    } else {
        if (c.type == "Ingr") {
            this.drawModGroupIngredients(a, d, c)
        } else {
            CustomizeItem.prototype.drawModGroupItemsList.call(this, b, a, d, c)
        }
    }
};
CustomizePizza.prototype.drawModGroups = function() {
    var b = $("#" + this.grpAreaID);
    if (!this.filtersExist) {
        this.scrollDrawAreas = [];
        var d = 1;
        for (var a in Pizza_MenuItemsFilter) {
            var c = $("<div>");
            c.data("view_order", d);
            c.attr("id", "filter_" + a);
            b.append(c);
            this.drawFilterGroup(Pizza_MenuItemsFilter[a], c);
            c.data("vieworderArea").html(d);
            this.scrollDrawAreas[this.scrollDrawAreas.length] = {
                div: c,
                title: Pizza_MenuItemsFilter[a]["Title"],
                data: Pizza_MenuItemsFilter[a]
            };
            d++
        }
        this.applyMainFilter(false);
        this.filtersExist = true
    }
    if (this.menuItem != null) {
        this.scrollDrawAreas.length = 2;
        CustomizeItem.prototype.drawModGroups.call(this);
        this.updateScrollDrawAreas()
    }
};
CustomizePizza.prototype.updateScrollDrawAreas = function() {
    var b = this["oldLine"];
    var d = 2;
    for (var a in b) {
        var c = b[a]["div"];
        this.scrollDrawAreas[d] = {
            div: c,
            title: b[a]["modGroup"]["Name"],
            data: b[a]
        };
        c.data("vieworderArea").html(d + 1);
        d++
    }
};
CustomizePizza.prototype.getFilterCaption = function(c) {
    for (var a in Pizza_MenuItemsFilter) {
        for (var b in Pizza_MenuItemsFilter[a]["Details"]) {
            if (Pizza_MenuItemsFilter[a]["Details"][b]["ID"] == c) {
                return Pizza_MenuItemsFilter[a]["Details"][b]["Title"]
            }
        }
    }
};
CustomizePizza.prototype.drawSummary = function() {
    if (typeof this.cartItem === "undefined" || this.cartItem == null) {
        return
    }
    var m = this.scrollDrawAreas;
    var b = this.pages.CustomizeItem_SummaryModGroup;
    var j = this.pages.CustomizeItem_SummaryModItem;
    var x = "";
    var r = 0;
    for (var s in m) {
        var f = m[s];
        var p = f.title;
        var a = s + 1;
        f.ctrlr = this;
        var v = "";
        var h = genActionLink(f.div.get(0), function(l) {
            scrollToControl(l)
        });
        v = b;
        var o = "";
        var g = 0;
        var k = "";
        var c = "";
        if (typeof f.data["modGroup"] === "undefined") {
            c = "Filter";
            if (this.selectedGroupsIDz[f.data["Name"]] != null) {
                o = this.getFilterCaption(this.selectedGroupsIDz[f.data["Name"]]);
                g = 1
            }
        } else {
            if (f.data["type"] == "PizzaType") {
                c = "PizzaType";
                p = "Pizza Type";
                var d = this.getSelectedPizzaTypesIDz(f.data["modGroup"]);
                if (d.full != 0) {
                    o = OriginalItems[d.full]["Name"];
                    g = 1
                } else {
                    if (d.left > 0) {
                        o = OriginalItems[d.left]["Name"];
                        g++
                    }
                    if (d.right > 0) {
                        o += OriginalItems[d.right]["Name"];
                        g++
                    }
                }
            } else {
                if (f.data["type"] == "Ingr") {
                    c = "Ingredients";
                    p = "Ingredients";
                    var w = {};
                    var q = this.typesAndIngrModGroup;
                    var e = this.cartItem;
                    for (var r in e.modGroupsItems) {
                        if (e.modGroupsItems[r]["ModGroupID"] == q.ID) {
                            if (e.modGroupsItems[r]["Weight"] > 5 || e.modGroupsItems[r]["Weight"] == 0) {
                                continue
                            }
                            if (typeof w[e.modGroupsItems[r]["ID"]] === "undefined") {
                                w[e.modGroupsItems[r]["ID"]] = true;
                                var t = this.isModifierSelected(e, q.ID, e.modGroupsItems[r]["ID"]);
                                var y = j;
                                y = y.replace("#NAME#", e.modGroupsItems[r]["Name"]);
                                o += y;
                                if (g > 0) {
                                    k += ", "
                                }
                                k += e.modGroupsItems[r]["Name"]
                            }
                            g++
                        }
                    }
                    var e = this.left_cartItem;
                    for (var r in e.modGroupsItems) {
                        if (e.modGroupsItems[r]["ModGroupID"] == q.ID) {
                            if (e.modGroupsItems[r]["Weight"] > 5 || e.modGroupsItems[r]["Weight"] == 0) {
                                continue
                            }
                            if (typeof w[e.modGroupsItems[r]["ID"]] === "undefined") {
                                w[e.modGroupsItems[r]["ID"]] = true;
                                var t = this.isModifierSelected(e, q.ID, e.modGroupsItems[r]["ID"]);
                                var y = j;
                                y = y.replace("#NAME#", e.modGroupsItems[r]["Name"]);
                                o += y;
                                if (g > 0) {
                                    k += ", "
                                }
                                k += e.modGroupsItems[r]["Name"]
                            }
                            g++
                        }
                    }
                    var e = this.right_cartItem;
                    for (var r in e.modGroupsItems) {
                        if (e.modGroupsItems[r]["ModGroupID"] == q.ID) {
                            if (e.modGroupsItems[r]["Weight"] > 5 || e.modGroupsItems[r]["Weight"] == 0) {
                                continue
                            }
                            if (typeof w[e.modGroupsItems[r]["ID"]] === "undefined") {
                                w[e.modGroupsItems[r]["ID"]] = true;
                                var t = this.isModifierSelected(e, q.ID, e.modGroupsItems[r]["ID"]);
                                var y = j;
                                y = y.replace("#NAME#", e.modGroupsItems[r]["Name"]);
                                o += y;
                                if (g > 0) {
                                    k += ", "
                                }
                                k += e.modGroupsItems[r]["Name"]
                            }
                            g++
                        }
                    }
                } else {
                    var w = {};
                    var e = f.data["cartItem"];
                    var q = f.data["modGroup"];
                    for (var r in e.modGroupsItems) {
                        if (e.modGroupsItems[r]["ModGroupID"] == q.ID) {
                            if (typeof w[e.modGroupsItems[r]["ID"]] === "undefined") {
                                w[e.modGroupsItems[r]["ID"]] = true;
                                var t = this.isModifierSelected(e, q.ID, e.modGroupsItems[r]["ID"]);
                                var y = j;
                                y = y.replace("#NAME#", e.modGroupsItems[r]["Name"]);
                                o += y
                            }
                            g++
                        }
                    }
                }
            }
        }
        v = v.replace("#NAME#", p);
        v = v.replace("#CHANGE_LNK#", h);
        if (g == 1) {
            v = v.replace("#SELECTEDITEMS#", o)
        } else {
            if (g == 0) {
                v = v.replace("#SELECTEDITEMS#", j.replace("#NAME#", Translate("None")))
            } else {
                if (f.data["type"] == "Ingr") {
                    v = v.replace("#SELECTEDITEMS#", j.replace("#NAME#", "<span style='width:120px;display:inline-block;font-size:10px;'>" + limitText(k, 100) + "</span>"))
                } else {
                    v = v.replace("#SELECTEDITEMS#", j.replace("#NAME#", g + " " + Translate("Items selected")))
                }
            }
        }
        x += "<span>" + v + "</span>";
        r++
    }
    var u = this["Qty"];
    if (typeof u === "undefined") {
        u = this["Qty"]
    }
    $("#" + this["spinQtyID"]).html(u);
    $("#" + this.totalID).html(getCartItemPrice(this.cartItem) * u + CurrencySymbol);
    $("#" + this.customize_summaryID).html(x);
    this.UpdateImage()
};
CustomizePizza.prototype.finish = function() {
    var b = this.getSelectedPizzaTypesIDz(this.typesAndIngrModGroup);
    if (b.full == 0 && (b.left == 0 || b.right == 0)) {
        alert("Please select pizza type");
        return
    }
    this.cartItem.Qty = this["Qty"];
    this.cartItem.shopping_cart_group = this["shopping_cart_group"];
    var a = getCartItemPrice(this.cartItem);
    if (this.menuItem != null) {
        CustomizeItem.prototype.finish.call(this)
    }
};
CustomizePizza.prototype.getModItemByID = function(a, b) {
    for (var c in a.Items) {
        if (a.Items[c]["ID"] == b) {
            return a.Items[c]
        }
    }
    return null
};
CustomizePizza.prototype.GetPizzaTypeImage = function(b) {
    var a = b.ImageName + ".jpg";
    if (a == ".jpg") {
        a = "itm" + strPadLeft("0", 6, b.ID.toString()) + ".jpg"
    }
    return a
};
CustomizePizza.prototype.GetIngredientImage = function(b) {
    var a = b.ImageName + ".png";
    if (a == ".png") {
        a = "itm" + strPadLeft("0", 6, b.ID.toString()) + ".png"
    }
    return a
};
CustomizePizza.prototype.menuIDtoFilterGroups = function() {
    var b = {
        row: null,
        col: null
    };
    if (this.menuItem != null) {
        var d = 0;
        var a = 0;
        var c = false;
        for (d = 0; d < Pizza_MenuItemsData.length; d++) {
            for (a = 0; a < Pizza_MenuItemsData[0].length; a++) {
                if (Pizza_MenuItemsData[d][a] == this.menuItem.ID) {
                    c = true;
                    break
                }
            }
            if (c) {
                break
            }
        }
        if (c) {
            b = {
                row: d,
                col: a
            }
        }
    }
    return b
};
CustomizePizza.prototype.applyMainFilter = function(c) {
    $("#" + this.pizzaMainFilterBtnHAH_ID).removeClass("customizeItem_summary_pizza_btn_filter_hah");
    $("#" + this.pizzaMainFilterBtnFull_ID).removeClass("customizeItem_summary_pizza_btn_filter_full");
    if (typeof c === "undefined") {
        c = false
    }
    if (typeof this.lastFilterIndex === "undefined") {
        this.lastFilterIndex = 0
    }
    var b = this.lastFilterIndex;
    if (this.MainFilter_IsHAH) {
        $("[filtertag=H]").show();
        $("[filtertag=F]").hide();
        this.PizzaTypeFull = false;
        this.PizzaIngFull = false;
        if (c) {
            b = $("[filtertag=H]").length;
            if (this.lastFilterIndex >= b) {
                this.lastFilterIndex = b - 1
            }
            if (b > 0) {
                var a = $("[filtertag=H]").get(this.lastFilterIndex);
                $(a).click()
            }
        }
        $("#" + this.pizzaMainFilterBtnHAH_ID).addClass("customizeItem_summary_pizza_btn_filter_hah")
    } else {
        $("[filtertag=H]").hide();
        $("[filtertag=F]").show();
        this.PizzaTypeFull = true;
        this.PizzaIngFull = true;
        if (c) {
            b = $("[filtertag=F]").length;
            if (this.lastFilterIndex >= b) {
                this.lastFilterIndex = b - 1
            }
            if (b > 0) {
                var a = $("[filtertag=F]").get(this.lastFilterIndex);
                $(a).click()
            }
        }
        $("#" + this.pizzaMainFilterBtnFull_ID).addClass("customizeItem_summary_pizza_btn_filter_full")
    }
};
CustomizePizza.prototype.applyCorrectFilterCol = function() {
    var e = Pizza_MenuItemsFilter.Col["Name"];
    var c = this.selectedGroupsIDz[e];
    var b = "";
    for (var a in Pizza_MenuItemsFilter.Col.Details) {
        var d = Pizza_MenuItemsFilter.Col.Details[a];
        if (d.ID == c) {
            b = d.Name;
            break
        }
    }
    for (var a in Pizza_MenuItemsFilter.Col.Details) {
        var d = Pizza_MenuItemsFilter.Col.Details[a];
        if ((this.MainFilter_IsHAH && !d.IsFull) || (!this.MainFilter_IsHAH && d.IsFull)) {
            if (b == d.Name) {
                this.selectedGroupsIDz[e] = d.ID;
                break
            }
        }
    }
};
CustomizePizza.prototype.updateFilterColumnsVisibility = function(j) {
    var d = 0;
    var e = null;
    var k = null;
    var b = Pizza_MenuItemsFilter.Col["Name"];
    for (var f in Pizza_MenuItemsFilter.Col.Details) {
        var h = Pizza_MenuItemsFilter.Col.Details[f];
        var c = j[h.index] > 0;
        var g = $("#SRCH_" + b.replace(" ", "_") + "_" + h.ID);
        if (c && (typeof g.attr("filtertag") === "undefined" || (g.attr("filtertag") == "H" && this.MainFilter_IsHAH) || (g.attr("filtertag") == "F" && !this.MainFilter_IsHAH))) {
            e = h.ID;
            k = g;
            d++;
            g.show()
        } else {
            g.hide()
        }
    }
    if (d == 0 || d == 1) {
        var l = null;
        if (this.selectedGroupsIDz[b] != null) {
            l = $("#SRCH_" + b.replace(" ", "_") + "_" + this.selectedGroupsIDz[b])
        }
        var a = k;
        if (l != null) {
            this.setFilterUIState(l, false)
        }
        if (k != null) {
            this.setFilterUIState(a, true);
            this.selectedGroupsIDz[b] = e
        } else {}
        $("#filter_Col").hide()
    } else {
        $("#filter_Col").show()
    }
};
CustomizePizza.prototype.filterGroupsToMenuID = function(j) {
    if (typeof j === "undefined") {
        j = true
    }
    var e = 0;
    var d = 0;
    var k = this.selectedGroupsIDz[Pizza_MenuItemsFilter.Row["Name"]];
    for (e = 0; e < Pizza_MenuItemsFilter.Row["Details"].length; e++) {
        if (Pizza_MenuItemsFilter.Row["Details"][e]["ID"] == k) {
            var g = Pizza_MenuItemsFilter.Row["Details"][e]["index"];
            var m = Pizza_MenuItemsData[g];
            this.updateFilterColumnsVisibility(m);
            break
        }
    }
    k = this.selectedGroupsIDz[Pizza_MenuItemsFilter.Col["Name"]];
    for (d = 0; d < Pizza_MenuItemsFilter.Col["Details"].length; d++) {
        if (Pizza_MenuItemsFilter.Col["Details"][d]["ID"] == k) {
            break
        }
    }
    var b = Pizza_MenuItemsData[e][d];
    if (b == null) {
        return
    }
    var w = OriginalItems[b];
    $("#popup_form_title").html(w != null ? w.Name : "");
    if (w == this.menuItem) {
        return
    }
    if (j) {
        if (this["oldLine"] != null) {
            for (var s in this["oldLine"]) {
                var p = this["oldLine"][s]["div"];
                p.remove()
            }
        }
    }
    this["oldLine"] = null;
    this.menuItem = w;
    if (this.menuItem == null) {
        return
    }
    this.PizzaItem = this.menuItem.PizzaItem;
    var h = null;
    for (var q in w.modGroup) {
        if (this.PizzaItem) {
            if (w.modGroup[q]["Minimum"] >= 15 && w.modGroup[q]["Items"].length > 15) {
                h = w.modGroup[q];
                break
            }
        } else {
            if (w.modGroup[q]["Minimum"] == 1 && w.modGroup[q]["Maximum"] == 1) {
                h = w.modGroup[q];
                break
            }
        }
    }
    var o = -1;
    var a = -1;
    var v = -1;
    var y = "";
    var r = "";
    var f = "";
    if (this.cartItem != null) {
        var x = OriginalItems[this.cartItem.ID].PizzaItem;
        for (var u in this.cartItem.modGroupsItems) {
            var c = this.cartItem.modGroupsItems[u];
            if ((c.Weight >= 10 && x) || (!x && c.Weight == 1)) {
                for (var q in OriginalModGroups[c.ModGroupID]["Items"]) {
                    if (OriginalModGroups[c.ModGroupID]["Items"][q]["ID"] == c.ID) {
                        o = q;
                        y = OriginalModGroups[c.ModGroupID]["Items"][q]["Name"];
                        break
                    }
                }
                break
            }
        }
        for (var u in this.left_cartItem.modGroupsItems) {
            var c = this.left_cartItem.modGroupsItems[u];
            if (c.Weight >= 10) {
                for (var q in OriginalModGroups[c.ModGroupID]["Items"]) {
                    if (OriginalModGroups[c.ModGroupID]["Items"][q]["ID"] == c.ID) {
                        a = q;
                        r = OriginalModGroups[c.ModGroupID]["Items"][q]["Name"];
                        break
                    }
                }
                break
            }
        }
        for (var u in this.right_cartItem.modGroupsItems) {
            var c = this.right_cartItem.modGroupsItems[u];
            if (c.Weight >= 10) {
                for (var q in OriginalModGroups[c.ModGroupID]["Items"]) {
                    if (OriginalModGroups[c.ModGroupID]["Items"][q]["ID"] == c.ID) {
                        v = q;
                        f = OriginalModGroups[c.ModGroupID]["Items"][q]["Name"];
                        break
                    }
                }
                break
            }
        }
    }
    if (!this.PizzaItem) {
        a = -1;
        v = -1;
        r = "";
        f = ""
    }
    this.cartItem = new Object();
    this.cartItem.ID = this.menuItem.ID;
    this.cartItem.Name = this.menuItem.Name;
    this.cartItem.Price = 0;
    this.cartItem.Weight = 0;
    this.cartItem.modGroupsItems = new Array();
    this.left_cartItem = new Object();
    this.left_cartItem.ID = Original_LeftSideItemID;
    this.left_cartItem.ModGroupID = h.ID;
    this.left_cartItem.ModGroupOrder = 0;
    this.left_cartItem.Name = Tranlsate("Left Half");
    this.left_cartItem.Price = 0;
    this.left_cartItem.Weight = 0;
    this.left_cartItem.modGroupsItems = new Array();
    this.right_cartItem = new Object();
    this.right_cartItem.ID = Original_RightSideItemID;
    this.right_cartItem.ModGroupID = h.ID;
    this.right_cartItem.ModGroupOrder = 0;
    this.right_cartItem.Name = Tranlsate("Right Half");
    this.right_cartItem.Price = 0;
    this.right_cartItem.Weight = 0;
    this.right_cartItem.modGroupsItems = new Array();
    this.cartItem.modGroupsItems[this.cartItem.modGroupsItems.length] = this.left_cartItem;
    this.cartItem.modGroupsItems[this.cartItem.modGroupsItems.length] = this.right_cartItem;
    for (var u in h.Items) {
        var c = h.Items[u];
        if (c.Name == y) {
            this.addModifierItem(this.cartItem, h, c, false, GetModItemWeight(h, c.ID))
        }
        if (c.Name == r) {
            this.addModifierItem(this.left_cartItem, h, c, false, GetModItemWeight(h, c.ID) / 2)
        }
        if (c.Name == f) {
            this.addModifierItem(this.right_cartItem, h, c, false, GetModItemWeight(h, c.ID) / 2)
        }
    }
    if (typeof this.cartItem.modGroupsItems === "undefined") {
        this.cartItem.modGroupsItems = new Array()
    }
    if (j) {
        CustomizeItem.prototype.drawModGroups.call(this);
        this.updateScrollDrawAreas()
    }
};
CustomizePizza.prototype.canSelectMenuItem = function() {
    for (var a in this.selectedGroupsIDz) {
        if (this.selectedGroupsIDz[a] == null) {
            return false
        }
    }
    return true
};
CustomizePizza.prototype.isFilterSelected = function(b, a) {
    if (this.selectedGroupsIDz == null) {
        return false
    }
    if (typeof this.selectedGroupsIDz[b] === "undefined") {
        return false
    }
    return this.selectedGroupsIDz[b] == a
};
CustomizePizza.prototype.drawFilterGroup = function(e, h) {
    var l = "";
    for (var d in e.Details) {
        var j = e.Details[d];
        var k = "";
        if (e.CanFilterPerHalf) {
            if (j.IsFull) {
                k = " filtertag='F' "
            } else {
                k = " filtertag='H' "
            }
        }
        l += "<span " + k + " id='SRCH_" + e.Name.replace(" ", "_") + "_" + j.ID + "'></span>"
    }
    this.createBlankModGroup(h, e.Name, e.Question, "select one item").html(l);
    var g = 0;
    var c = 0;
    for (var d in e.Details) {
        var j = e.Details[d];
        var f = $("#SRCH_" + e.Name.replace(" ", "_") + "_" + j.ID);
        var a = -1;
        if (e.CanFilterPerHalf) {
            if (j.IsFull) {
                a = g;
                g++
            } else {
                a = c;
                c++
            }
        }
        f.data("groupData", e);
        f.data("itm", j);
        f.data("ctrlr", this);
        f.data("click_params", {
            view_index: a,
            UI: f,
            searchGroup: e,
            itemData: j,
            ctrlr: this,
            AreaID: h.attr("ID"),
            Area: h
        });
        f.click(function() {
            var m = $(this).data("click_params");
            m.ctrlr.filterClick(m)
        });
        var b = this.isFilterSelected(e.Name, j.ID);
        this.setFilterUIState(f, b)
    }
};
CustomizePizza.prototype.getFilterImageFileName = function(b) {
    var a = b.ID + ".png";
    return a
};
CustomizePizza.prototype.setFilterUIState = function(b, f) {
    var d = createUUID();
    var h = "";
    var a = $(b).data("groupData");
    var e = $(b).data("itm");
    if (f && a.CanFilterPerHalf) {
        this.lastFilterIndex = $(b).data("click_params")["view_index"]
    }
    if (!f) {
        h = this.pages.CustomizeItem_FilterItem
    } else {
        h = this.pages.CustomizeItem_FilterItemActive
    }
    var g = this.getFilterImageFileName(e);
    h = h.replace(/#IMG#/gi, "/Images/FiltersImages/Menu" + CurrentMenuTemplateID + "/" + g);
    h = h.replace(/#COMMAND#/gi, d);
    h = h.replace(/#NAME#/gi, e.Title);
    h = h.replace(/#PRICE#/gi, "");
    var c = this.isFilterSelected(a.Name, e.ID);
    $(b).html(h);
    $("#" + d).data("click_params", $(b).data("click_params"));
    $("#" + b.attr("id") + " img").each(function() {
        this.onerror = function() {
            ReplaceMissingImage(this)
        }
    })
};
CustomizePizza.prototype.filterClick = function(b) {
    var d = b.searchGroup;
    var c = b.itemData;
    var e = null;
    if (this.selectedGroupsIDz[d.Name] != null) {
        e = $("#SRCH_" + d.Name.replace(" ", "_") + "_" + this.selectedGroupsIDz[d.Name])
    }
    var a = $("#SRCH_" + d.Name.replace(" ", "_") + "_" + c.ID);
    this.selectedGroupsIDz[d.Name] = c.ID;
    if (e != null) {
        this.setFilterUIState(e, false)
    }
    this.setFilterUIState(a, true);
    if (this.canSelectMenuItem()) {
        this.filterGroupsToMenuID()
    }
    this.drawSummary();
    if (this.menuItem != null) {
        if (this.enableAutoScroll && !ScrollClicked) {
            this.scrollToNextArea(b.Area)
        }
    }
};
CustomizePizza.prototype.getIsPizzaTypeFull = function() {
    if (this.MainFilter_IsHAH) {
        return false
    }
    var a = true;
    for (var c in this.left_cartItem.modGroupsItems) {
        var b = this.left_cartItem.modGroupsItems[c];
        if (b.Weight >= 10) {
            a = false
        }
    }
    for (var c in this.right_cartItem.modGroupsItems) {
        var b = this.right_cartItem.modGroupsItems[c];
        if (b.Weight >= 10) {
            a = false
        }
    }
    return a
};
CustomizePizza.prototype.drawModGroupPizzaType = function(p, l, d) {
    this.typesAndIngrModGroup = p;
    var q = "";
    for (var h in p.Items) {
        var g = p.Items[h];
        if (this.PizzaItem) {
            if (GetModItemWeight(p, g.ID) < 10) {
                continue
            }
        }
        q += "<span id='TYPE_" + g.ID + "'></span>"
    }
    var m = createUUID();
    var k = createUUID();
    var f = createUUID();
    var e = createUUID();
    var o = createUUID();
    var b = createUUID();
    var a = this.pages.CustomizeItem_PizzaTypeGroup;
    a = a.replace(/#ITEMS#/gi, q);
    a = a.replace(/#PIZZATYPE_FULL#/gi, m);
    a = a.replace(/#PIZZATYPE_HAH#/gi, k);
    a = a.replace(/#HALFANDHALFVISIBILITY#/gi, this.PizzaItem ? "block" : "none");
    this.createBlankModGroup(l, Translate("Pizza Type"), Translate("Please select pizza type"), Translate("Select one item")).html(a);
    this.PizzaTypeFull = this.getIsPizzaTypeFull();
    this.PizzaTypeFullID = m;
    this.PizzaTypeHAHID = k;
    $("#" + this.PizzaTypeFullID).html(Translate("Full"));
    $("#" + this.PizzaTypeHAHID).html(Translate("Half and Half"));
    if (this.PizzaTypeFull) {
        $("#" + this.PizzaTypeFullID).addClass("GreenActive");
        $("#" + this.PizzaTypeHAHID).removeClass("GreenActive")
    } else {
        $("#" + this.PizzaTypeFullID).removeClass("GreenActive");
        $("#" + this.PizzaTypeHAHID).addClass("GreenActive")
    }
    $("#" + m).data("ctrlr", this);
    $("#" + k).data("ctrlr", this);
    var r = function() {
        $(this).data("ctrlr").PizzaTypeFull = !$(this).data("ctrlr").PizzaTypeFull;
        $(this).data("ctrlr").pizzaTypeChanged()
    };
    $("#" + m).click(r);
    $("#" + k).click(r);
    for (var h in p.Items) {
        var g = p.Items[h];
        if (this.PizzaItem) {
            if (GetModItemWeight(p, g.ID) < 10) {
                continue
            }
        }
        var j = $("#TYPE_" + g.ID);
        j.data("groupData", p);
        j.data("itemData", g);
        j.data("ctrlr", this);
        j.data("pizzatype_params", {
            UI: j,
            groupData: p,
            itemData: g,
            ctrlr: this,
            Area: l
        });
        j.data("pizzaTypeClick", function() {
            var s = $(this).data("pizzatype_params");
            s.ctrlr.pizzaTypeClick(s.UI, s.groupData, s.itemData, "toggle", s.Area)
        });
        j.data("pizzaTypeLeftClick", function() {
            var s = $(this).data("pizzatype_params");
            s.ctrlr.pizzaTypeClick(s.UI, s.groupData, s.itemData, "left", s.Area)
        });
        j.data("pizzaTypeRightClick", function() {
            var s = $(this).data("pizzatype_params");
            s.ctrlr.pizzaTypeClick(s.UI, s.groupData, s.itemData, "right", s.Area)
        });
        var c = this.getModItemPizzaSide(p, g) != "none";
        this.setPizzaTypeUIState(j, c);
        this.createItemInfoButton(j, g)
    }
};
CustomizePizza.prototype.pizzaTypeChanged = function() {
    if (this.PizzaTypeFull) {
        $("#" + this.PizzaTypeFullID).addClass("GreenActive");
        $("#" + this.PizzaTypeHAHID).removeClass("GreenActive")
    } else {
        $("#" + this.PizzaTypeFullID).removeClass("GreenActive");
        $("#" + this.PizzaTypeHAHID).addClass("GreenActive")
    }
    var c = this.getSelectedPizzaTypesIDz(this.typesAndIngrModGroup);
    var b = this.getModItemByID(this.typesAndIngrModGroup, c.left);
    var a = this.getModItemByID(this.typesAndIngrModGroup, c.right);
    var d = this.getModItemByID(this.typesAndIngrModGroup, c.full);
    if (d != null) {
        this.removeModifierItem(this.cartItem, this.typesAndIngrModGroup, d);
        this.setPizzaTypeUIState($("#TYPE_" + c.full), false)
    }
    if (a != null) {
        this.removeModifierItem(this.right_cartItem, this.typesAndIngrModGroup, a);
        this.setPizzaTypeUIState($("#TYPE_" + c.right), false)
    }
    if (b != null) {
        this.removeModifierItem(this.left_cartItem, this.typesAndIngrModGroup, b);
        this.setPizzaTypeUIState($("#TYPE_" + c.left), false)
    }
};
CustomizePizza.prototype.setPizzaTypeUIState = function(d, f) {
    var b = createUUID();
    var c = createUUID();
    var g = createUUID();
    var a = "";
    var h = $(d).data("groupData");
    var e = $(d).data("itemData");
    if (f) {
        a = this.pages.OrgCustomizeItem_PizzaTypeItemActive
    } else {
        a = this.pages.OrgCustomizeItem_PizzaTypeItem
    }
    var k = this.getModItemPizzaSide(h, e);
    d.data("leftID", c);
    d.data("rightID", g);
    a = a.replace(/#IMG#/gi, this.GetPizzaTypeImage(e));
    a = a.replace(/#COMMAND#/gi, b);
    a = a.replace(/#NAME#/gi, e.Name);
    var j = GetModItemPrice(h, e.ID);
    a = a.replace(/#PRICE#/gi, j + CurrencySymbol);
    a = a.replace(/#SIDE#/gi, Tranlsate(k));
    if (k == "left" || k == "right") {
        a = a.replace(/#HALFTITLE#/gi, Translate((k + " half").toString().toUpperCase()))
    } else {
        a = a.replace(/#HALFTITLE#/gi, "")
    }
    $(d).html(a);
    $("#" + c).attr("src", "/Images/SharedImages/pizzaleft.png");
    $("#" + g).attr("src", "/Images/SharedImages/pizzaright.png");
    $("#" + c).css("display", "none");
    $("#" + g).css("display", "none");
    if (k == "left") {
        $("#" + c).css("display", "inline-block")
    } else {
        if (k == "right") {
            $("#" + g).css("display", "inline-block")
        }
    }
    $("#" + b).data("pizzatype_params", $(d).data("pizzatype_params"));
    $("#" + c).data("pizzatype_params", $(d).data("pizzatype_params"));
    $("#" + g).data("pizzatype_params", $(d).data("pizzatype_params"));
    $("#" + b).click($(d).data("pizzaTypeClick"));
    $("#" + c).click($(d).data("pizzaTypeLeftClick"));
    $("#" + g).click($(d).data("pizzaTypeRightClick"));
    $("#" + d.attr("id") + " img").each(function() {
        this.onerror = function() {
            ReplaceMissingImage(this)
        }
    })
};
CustomizePizza.prototype.getSelectedPizzaTypesIDz = function(a) {
    var f = 0;
    var b = 0;
    var c = 0;
    for (var e in this.cartItem.modGroupsItems) {
        var d = this.cartItem.modGroupsItems[e];
        if (d.ModGroupID == a.ID && (GetModItemWeight(a, d.ID) >= 10 || !this.PizzaItem) && GetModItemWeight(a, d.ID) > 0) {
            f = d.ID;
            break
        }
    }
    for (var e in this.left_cartItem.modGroupsItems) {
        var d = this.left_cartItem.modGroupsItems[e];
        if (d.ModGroupID == a.ID && (GetModItemWeight(a, d.ID) >= 10 || !this.PizzaItem) && GetModItemWeight(a, d.ID) > 0) {
            b = d.ID;
            break
        }
    }
    for (var e in this.right_cartItem.modGroupsItems) {
        var d = this.right_cartItem.modGroupsItems[e];
        if (d.ModGroupID == a.ID && (GetModItemWeight(a, d.ID) >= 10 || !this.PizzaItem) && GetModItemWeight(a, d.ID) > 0) {
            c = d.ID;
            break
        }
    }
    return {
        full: f,
        left: b,
        right: c
    }
};
CustomizePizza.prototype.pizzaTypeClick = function(l, e, g, h, j) {
    var m = "";
    var o = this.getModItemPizzaSide(e, g);
    var c = this.getSelectedPizzaTypesIDz(e);
    if (h == "toggle") {
        if (this.PizzaTypeFull) {
            if (o == "none") {
                m = "full"
            } else {
                m = "none"
            }
        } else {
            if (o == "none") {
                if (c.left == 0) {
                    m = "left"
                } else {
                    if (c.right == 0) {
                        m = "right"
                    } else {
                        m = "left"
                    }
                }
            } else {
                m = "none"
            }
        }
    }
    var a = this.getModItemByID(e, c.left);
    var f = this.getModItemByID(e, c.right);
    var d = this.getModItemByID(e, c.full);
    this.removeModifierItem(this.cartItem, e, g);
    this.removeModifierItem(this.right_cartItem, e, g);
    this.removeModifierItem(this.left_cartItem, e, g);
    if (m == "left") {
        if (d) {
            this.removeModifierItem(this.cartItem, e, d);
            this.setPizzaTypeUIState($("#TYPE_" + c.full), false)
        }
        if (a != null) {
            this.removeModifierItem(this.left_cartItem, e, a);
            this.setPizzaTypeUIState($("#TYPE_" + c.left), false)
        }
        this.addModifierItem(this.left_cartItem, e, g, false, GetModItemWeight(e, g.ID) / 2)
    } else {
        if (m == "right") {
            if (d) {
                this.removeModifierItem(this.cartItem, e, d);
                this.setPizzaTypeUIState($("#TYPE_" + c.full), false)
            }
            if (f) {
                this.removeModifierItem(this.right_cartItem, e, f);
                this.setPizzaTypeUIState($("#TYPE_" + c.right), false)
            }
            this.addModifierItem(this.right_cartItem, e, g, false, GetModItemWeight(e, g.ID) / 2)
        } else {
            if (m == "full") {
                if (a != null) {
                    this.removeModifierItem(this.left_cartItem, e, a);
                    this.setPizzaTypeUIState($("#TYPE_" + c.left), false)
                }
                if (f) {
                    this.removeModifierItem(this.right_cartItem, e, f);
                    this.setPizzaTypeUIState($("#TYPE_" + c.right), false)
                }
                if (d) {
                    this.removeModifierItem(this.cartItem, e, d);
                    this.setPizzaTypeUIState($("#TYPE_" + c.full), false)
                }
                this.addModifierItem(this.cartItem, e, g)
            } else {
                if (m == "none") {
                    if (o == "left") {
                        this.removeModifierItem(this.left_cartItem, e, a);
                        this.setPizzaTypeUIState($("#TYPE_" + c.left), false)
                    } else {
                        if (o == "right") {
                            this.removeModifierItem(this.right_cartItem, e, f);
                            this.setPizzaTypeUIState($("#TYPE_" + c.right), false)
                        } else {
                            if (o == "full") {
                                this.removeModifierItem(this.cartItem, e, d);
                                this.setPizzaTypeUIState($("#TYPE_" + c.full), false)
                            }
                        }
                    }
                }
            }
        }
    }
    var b = this.getModItemPizzaSide(e, g) != "none";
    this.setPizzaTypeUIState(l, b);
    this.drawSummary();
    this.drawModGroups();
    var k = this.getSelectedPizzaTypesIDz(e);
    if (k.full > 0 || (k.left > 0 && k.right > 0)) {
        if (this.enableAutoScroll && !ScrollClicked) {
            this.scrollToNextArea(j)
        }
    }
};
CustomizePizza.prototype.getModItemPizzaSide = function(a, c) {
    var b = "none";
    if (this.isModifierSelected(this.cartItem, a.ID, c.ID)) {
        b = "full"
    } else {
        if (this.isModifierSelected(this.left_cartItem, a.ID, c.ID)) {
            b = "left"
        } else {
            if (this.isModifierSelected(this.right_cartItem, a.ID, c.ID)) {
                b = "right"
            }
        }
    }
    return b
};
CustomizePizza.prototype.getIsPizzaIngFull = function() {
    if (this.MainFilter_IsHAH) {
        return false
    }
    var a = true;
    for (var c in this.left_cartItem.modGroupsItems) {
        var b = this.left_cartItem.modGroupsItems[c];
        if (b.Weight < 5) {
            a = false
        }
    }
    for (var c in this.right_cartItem.modGroupsItems) {
        var b = this.right_cartItem.modGroupsItems[c];
        if (b.Weight < 5) {
            a = false
        }
    }
    return a
};
CustomizePizza.prototype.drawModGroupIngredients = function(j, g, b) {
    var k = "";
    for (var d in j.Items) {
        var c = j.Items[d];
        if (this.PizzaItem) {
            if (GetModItemWeight(j, c.ID) > 10) {
                continue
            }
        }
        k += "<span id='INGR_" + c.ID + "'></span>"
    }
    var l = createUUID();
    var h = createUUID();
    this.PizzaIngFull = this.getIsPizzaIngFull();
    this.PizzaIngFullID = l;
    this.PizzaIngHAHID = h;
    var a = this.pages.CustomizeItem_IngredientsGroup;
    a = a.replace(/#ITEMS#/gi, k);
    a = a.replace(/#PIZZAINGT_FULL#/gi, l);
    a = a.replace(/#PIZZAINGT_HAH#/gi, h);
    this.createBlankModGroup(g, "Pizza Ingredients", Translate("Please select Ingredients"), Translate("Select multiple items")).html(a);
    $("#" + this.PizzaIngFullID).html(Translate("Full"));
    $("#" + this.PizzaIngHAHID).html(Translate("Half and Half"));
    if (this.PizzaTypeFull) {
        $("#" + this.PizzaIngFullID).addClass("GreenActive");
        $("#" + this.PizzaIngHAHID).removeClass("GreenActive")
    } else {
        $("#" + this.PizzaIngFullID).removeClass("GreenActive");
        $("#" + this.PizzaIngHAHID).addClass("GreenActive")
    }
    $("#" + l).data("ctrlr", this);
    $("#" + h).data("ctrlr", this);
    var e = function() {
        $(this).data("ctrlr").PizzaIngFull = !$(this).data("ctrlr").PizzaIngFull;
        $(this).data("ctrlr").pizzaIngChanged()
    };
    $("#" + l).click(e);
    $("#" + h).click(e);
    for (var d in j.Items) {
        var c = j.Items[d];
        if (this.PizzaItem) {
            if (GetModItemWeight(j, c.ID) > 10) {
                continue
            }
        }
        var f = $("#INGR_" + c.ID);
        f.data("groupData", j);
        f.data("itemData", c);
        f.data("ctrlr", this);
        this.setIngredientsUIState(f)
    }
    this.pizzaIngChanged(false)
};
CustomizePizza.prototype.pizzaIngChanged = function(f) {
    if (typeof f === "undefined") {
        f = true
    }
    if (this.PizzaIngFull) {
        $("#" + this.PizzaIngFullID).addClass("GreenActive");
        $("#" + this.PizzaIngHAHID).removeClass("GreenActive")
    } else {
        $("#" + this.PizzaIngFullID).removeClass("GreenActive");
        $("#" + this.PizzaIngHAHID).addClass("GreenActive")
    }
    var j = this.typesAndIngrModGroup;
    for (var c in j.Items) {
        var b = j.Items[c];
        if (GetModItemWeight(j, b.ID) > 10) {
            continue
        }
        var e = $("#INGR_" + b.ID);
        if (f) {
            var g = this.getIngCount(this.typesAndIngrModGroup, b);
            var h = this.getIngModCodeSide(this.typesAndIngrModGroup, b);
            this.clearModifierItem(this.cartItem, this.typesAndIngrModGroup, b);
            this.clearModifierItem(this.right_cartItem, this.typesAndIngrModGroup, b);
            this.clearModifierItem(this.left_cartItem, this.typesAndIngrModGroup, b);
            this.removeModifierItemFromNoModCode(this.cartItem, this.typesAndIngrModGroup, b);
            this.removeModifierItemFromNoModCode(this.right_cartItem, this.typesAndIngrModGroup, b);
            this.removeModifierItemFromNoModCode(this.left_cartItem, this.typesAndIngrModGroup, b);
            var a = this.cartItem;
            var d = GetModItemWeight(this.typesAndIngrModGroup, b.ID);
            if (g > 0) {
                for (var c = 0; c < g; c++) {
                    this.addModifierItem(a, this.typesAndIngrModGroup, b, true, d)
                }
            } else {
                if (h != "") {
                    this.addModifierItemToNoModCode(a, this.typesAndIngrModGroup, b)
                }
            }
            e.data("QtyUI").html(this.getIngCount(this.typesAndIngrModGroup, b));
            e.data("SideTitle").html(this.getIngSide(this.typesAndIngrModGroup, b))
        }
        this.setIngredientUIVisibility(e)
    }
};
CustomizePizza.prototype.setIngredientsUIState = function(k) {
    var m = createUUID();
    var l = createUUID();
    var p = createUUID();
    var o = createUUID();
    var r = createUUID();
    var a = createUUID();
    var h = createUUID();
    var f = createUUID();
    var c = "";
    var g = $(k).data("groupData");
    var q = $(k).data("itemData");
    c = this.pages.CustomizeItem_PizzaIngredients;
    c = c.replace(/#IMG#/gi, "/Images/IngredientsImages/Menu" + CurrentMenuTemplateID + "/" + this.GetIngredientImage(q));
    c = c.replace(/#NAMEID#/gi, p);
    c = c.replace(/#PRICE#/gi, "");
    c = c.replace(/#ADD#/gi, m);
    c = c.replace(/#REMOVE#/gi, l);
    c = c.replace(/#QTY#/gi, o);
    c = c.replace(/#SIDE_LEFT#/gi, r);
    c = c.replace(/#SIDE_RIGHT#/gi, a);
    c = c.replace(/#SIDE#/gi, h);
    c = c.replace(/#NOMODCODE#/gi, f);
    $(k).html(c);
    $("#" + p).html(limitText(q.Name, 20));
    $("#" + p).attr("title", q.Name);
    $("#" + p).css("cursor", "pointer");
    $(k).data("NameUI", $("#" + p));
    $(k).data("QtyUI", $("#" + o));
    $(k).data("AddBtn", $("#" + m));
    $(k).data("RemoveBtn", $("#" + l));
    $(k).data("SideLeft", $("#" + r));
    $(k).data("SideRight", $("#" + a));
    $(k).data("SideTitle", $("#" + h));
    $(k).data("NoModCode", $("#" + f));
    $(k).data("ModGroup", g);
    $(k).data("ModItem", q);
    var b = this.getIngCount(g, q);
    $("#" + o).html(b);
    $("#" + h).html(this.getIngSide(g, q));
    $("#" + p).data("params", {
        ctrlr: this,
        UI: $(k),
        group: g,
        item: q
    });
    $("#" + p).click(function() {
        var s = $(this).data("params");
        s.ctrlr.IngredientNameClick(s.UI, s.group, s.item)
    });
    var d = function() {
        var s = $(this).data("params");
        s.ctrlr.IngredientSideChange(s.group, s.item, s.qtyID, s.act, s.SideTitleUI)
    };
    var e = {
        ctrlr: this,
        group: g,
        item: q,
        qtyID: o,
        act: "left",
        SideTitleUI: $("#" + h)
    };
    var j = {
        ctrlr: this,
        group: g,
        item: q,
        qtyID: o,
        act: "right",
        SideTitleUI: $("#" + h)
    };
    $("#" + r).data("params", e);
    $("#" + a).data("params", j);
    $("#" + r).click(d);
    $("#" + a).click(d);
    $("#" + m).data("addparams", {
        ctrlr: this,
        group: g,
        item: q,
        qtyID: o,
        act: "add",
        UI: $(k)
    });
    $("#" + l).data("removeparams", {
        ctrlr: this,
        group: g,
        item: q,
        qtyID: o,
        act: "remove",
        UI: $(k)
    });
    $("#" + m).click(function() {
        var s = $(this).data("addparams");
        s.ctrlr.IngredientClick(s.group, s.item, s.qtyID, s.act, s.UI)
    });
    $("#" + l).click(function() {
        var s = $(this).data("removeparams");
        s.ctrlr.IngredientClick(s.group, s.item, s.qtyID, s.act, s.UI)
    });
    $("#" + k.attr("id") + " img").each(function() {
        this.onerror = function() {
            ReplaceMissingImage(this)
        }
    });
    this.setIngredientUIVisibility(k)
};
CustomizePizza.prototype.IngredientNameClick = function(d, g, e) {
    this.enableAutoScroll = false;
    var b = d.data("ModGroup");
    var h = d.data("ModItem");
    var c = this.getIngCount(b, h) > 0;
    if (!c) {
        var a = d.data("show");
        if (typeof a === "undefined") {
            a = false
        }
        c = a
    }
    if (c) {
        this.clearModifierItem(this.cartItem, b, h);
        this.clearModifierItem(this.right_cartItem, b, h);
        this.clearModifierItem(this.left_cartItem, b, h);
        this.removeModifierItemFromNoModCode(this.cartItem, b, h);
        this.removeModifierItemFromNoModCode(this.right_cartItem, b, h);
        this.removeModifierItemFromNoModCode(this.left_cartItem, b, h);
        d.data("QtyUI").html("0")
    } else {
        var f = GetModItemWeight(b, h.ID);
        this.addModifierItem(this.cartItem, b, h, true, f);
        d.data("QtyUI").html("1")
    }
    d.data("show", !c);
    this.setIngredientUIVisibility(d);
    d.data("QtyUI").html(this.getIngCount(b, h));
    d.data("SideTitle").html(this.getIngSide(b, h))
};
CustomizePizza.prototype.setIngredientUIVisibility = function(e) {
    var b = $(e).data("ModGroup");
    var f = $(e).data("ModItem");
    var d = this.getIngCount(b, f) > 0;
    if (!d) {
        var a = $(e).data("show");
        if (typeof a === "undefined") {
            a = false
        }
        d = a
    }
    if (typeof e.data("NameOrgColor") === "undefined") {
        e.data("NameOrgColor", e.data("NameUI").css("color"))
    }
    var c = this.getIngModCodeSide(b, f);
    if (c != "") {
        e.data("NameUI").css("color", "red");
        e.data("AddBtn").css("display", "none");
        e.data("RemoveBtn").css("display", "none");
        e.data("QtyUI").css("display", "none");
        if (this.PizzaIngFull) {
            e.data("SideLeft").css("display", "none");
            e.data("SideRight").css("display", "none");
            e.data("SideTitle").css("display", "none")
        } else {
            e.data("SideLeft").css("display", "inline");
            e.data("SideRight").css("display", "inline");
            e.data("SideTitle").css("display", "inline")
        }
        e.data("NoModCode").css("display", "inline")
    } else {
        if (d) {
            e.data("NameUI").css("color", "green");
            e.data("AddBtn").css("display", "inline");
            e.data("RemoveBtn").css("display", "inline");
            e.data("QtyUI").css("display", "inline");
            e.data("NoModCode").css("display", "none");
            if (this.PizzaIngFull) {
                e.data("SideLeft").css("display", "none");
                e.data("SideRight").css("display", "none");
                e.data("SideTitle").css("display", "none")
            } else {
                e.data("SideLeft").css("display", "inline");
                e.data("SideRight").css("display", "inline");
                e.data("SideTitle").css("display", "inline")
            }
        } else {
            e.data("NameUI").css("color", e.data("NameOrgColor"));
            e.data("AddBtn").css("display", "none");
            e.data("RemoveBtn").css("display", "none");
            e.data("QtyUI").css("display", "none");
            e.data("SideLeft").css("display", "none");
            e.data("SideTitle").css("display", "none");
            e.data("SideRight").css("display", "none");
            e.data("NoModCode").css("display", "none")
        }
    }
};
CustomizePizza.prototype.getIngCount = function(b, e) {
    var c = this.isModifierSelected(this.cartItem, b.ID, e.ID);
    var d = this.isModifierSelected(this.left_cartItem, b.ID, e.ID);
    var a = this.isModifierSelected(this.right_cartItem, b.ID, e.ID);
    return Math.max(c, d, a)
};
CustomizePizza.prototype.getIngModCodeSide = function(a, b) {
    if (this.isModifierItemInNoModCode(this.cartItem, a, b)) {
        return "FULL"
    } else {
        if (this.isModifierItemInNoModCode(this.left_cartItem, a, b)) {
            return "LEFT"
        } else {
            if (this.isModifierItemInNoModCode(this.right_cartItem, a, b)) {
                return "RIGHT"
            } else {
                return ""
            }
        }
    }
};
CustomizePizza.prototype.getIngSide = function(c, g) {
    var d = this.isModifierSelected(this.cartItem, c.ID, g.ID);
    var f = this.isModifierSelected(this.left_cartItem, c.ID, g.ID);
    var a = this.isModifierSelected(this.right_cartItem, c.ID, g.ID);
    var e = "FULL";
    var b = this.getIngModCodeSide(c, g);
    if (d > 0) {
        e = "FULL"
    } else {
        if (f > 0) {
            e = "LEFT"
        } else {
            if (a > 0) {
                e = "RIGHT"
            } else {
                if (b != "") {
                    e = b
                } else {
                    e = this[c + "_" + g];
                    if (typeof e === "undefined" || e == null) {
                        e = "FULL"
                    }
                }
            }
        }
    }
    return e
};
CustomizePizza.prototype.setIngSide = function(c, h, f) {
    var e = this.getIngCount(c, h);
    var b = this.getIngModCodeSide(c, h);
    var a = null;
    if (f == "FULL") {
        a = this.cartItem
    } else {
        if (f == "LEFT") {
            a = this.left_cartItem
        } else {
            if (f == "RIGHT") {
                a = this.right_cartItem
            }
        }
    }
    this.removeModifierItemFromNoModCode(this.cartItem, c, h);
    this.removeModifierItemFromNoModCode(this.left_cartItem, c, h);
    this.removeModifierItemFromNoModCode(this.right_cartItem, c, h);
    this.clearModifierItem(this.cartItem, c, h);
    this.clearModifierItem(this.left_cartItem, c, h);
    this.clearModifierItem(this.right_cartItem, c, h);
    if (e > 0) {
        var g = GetModItemWeight(c, h.ID);
        if (f == "LEFT" || f == "RIGHT") {
            g = g / 2
        }
        for (var d = 0; d < e; d++) {
            this.addModifierItem(a, c, h, true, g)
        }
    } else {
        if (b != "") {
            this.addModifierItemToNoModCode(a, c, h)
        }
    }
    this[c + "_" + h] = f
};
CustomizePizza.prototype.IngredientSideChange = function(c, f, a, b, d) {
    var e = this.getIngSide(c, f);
    if (b == "left") {
        if (e == "FULL") {
            e = "LEFT"
        } else {
            if (e == "LEFT") {
                e = "RIGHT"
            } else {
                e = "FULL"
            }
        }
    } else {
        if (e == "FULL") {
            e = "RIGHT"
        } else {
            if (e == "RIGHT") {
                e = "LEFT"
            } else {
                e = "FULL"
            }
        }
    }
    this.setIngSide(c, f, e);
    d.html(e);
    this.drawSummary()
};
CustomizePizza.prototype.IngredientClick = function(j, g, h, e, d) {
    this.enableAutoScroll = false;
    var f = this.getIngSide(j, g);
    var a = this.cartItem;
    if (f == "FULL") {
        a = this.cartItem
    } else {
        if (f == "LEFT") {
            a = this.left_cartItem
        } else {
            if (f == "RIGHT") {
                a = this.right_cartItem
            }
        }
    }
    var c = GetModItemWeight(j, g.ID);
    if (f == "LEFT" || f == "RIGHT") {
        c = c / 2
    }
    var b = this.isModifierSelected(a, j.ID, g.ID);
    if (e == "add") {
        this.removeModifierItemFromNoModCode(this.cartItem, j, g);
        this.removeModifierItemFromNoModCode(this.left_cartItem, j, g);
        this.removeModifierItemFromNoModCode(this.right_cartItem, j, g);
        this.addModifierItem(a, j, g, true, c)
    } else {
        if (b > 1) {
            this.removeModifierItem(a, j, g)
        } else {
            this.addModifierItemToNoModCode(a, j, g)
        }
    }
    b = this.isModifierSelected(a, j.ID, g.ID);
    $("#" + h).html(b);
    this.setIngredientUIVisibility(d);
    this.drawSummary()
};

function dealNumber_combine(b, c, a) {
    return a * 100 * 10000 + c * 10000 + b
}

function dealNumber_extract(d) {
    d = parseInt(d);
    var c = Math.floor(d / 1000000);
    var a = Math.floor((d - (c * 1000000)) / 10000);
    var b = d - (c * 100 * 10000 + a * 10000);
    res = {
        dealID: b,
        stepNumber: a,
        bookmark: c
    };
    return res
}

function genDealBookmark() {
    return Math.floor(Math.random() * 1000)
}

function getEligibleItemsForDealStep(a) {
    if (!(a.DealID > 0)) {
        return []
    }
    var e = dealNumber_extract(a.DealID);
    var f = OriginalDeals[e.dealID];
    var c = {};
    var h = 0;
    for (var b in f.Steps) {
        var d = f.Steps[b];
        var g = d.Min;
        if (g < 0) {
            g = 1
        }
        while (g > 0) {
            c[h] = {
                step: d
            };
            h++;
            g--
        }
    }
    var d = null;
    for (var b in c) {
        if (b == e.stepNumber) {
            d = c[b]["step"];
            break
        }
    }
    itemsArray = [];
    for (var b in d.Items) {
        itemsArray.push(d.Items[b])
    }
    return itemsArray
}

function DealBuilder() {
    this.pagesContainer = null;
    this.onInitialize = null;
    this.onOK = null;
    this.onCancel = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.afterShowPageStep = null;
    this.stepsUI = null;
    this.contentUI = null;
    this.selectedItems = [];
    this.deal = null;
    this.randomCartHolderID = genDealBookmark();
    this.currentStep = 0;
    this.stepsLine = {};
    this.stepsCount = 0;
    this.stepsVisualCount = 0;
    this.stepItemToFreq = new Array();
    this.loadCartDeal = function(b) {
        if (!(b.DealID > 0)) {
            return
        }
        var e = dealNumber_extract(b.DealID);
        this.randomCartHolderID = e.bookmark;
        for (var c in cart.cartData) {
            var b = cart.cartData[c];
            if (b.ID == this.deal.ItemID) {
                for (var g in b.modGroupsItems) {
                    var f = b.modGroupsItems[g];
                    var d = dealNumber_extract(f.DealID);
                    if (d.bookmark == this.randomCartHolderID) {
                        this.selectedItems.push({
                            Item: f,
                            StepNum: d.stepNumber
                        })
                    }
                }
            } else {
                var e = dealNumber_extract(b.DealID);
                if (e.bookmark == this.randomCartHolderID && b.ID != this.deal.itemID) {
                    this.selectedItems.push({
                        Item: b,
                        StepNum: e.stepNumber
                    })
                }
            }
        }
    };
    this.getStepByNumber = function(c) {
        for (var d in this.stepsLine) {
            if (d == c) {
                var e = this.stepsLine[d]["step"];
                var b = this.stepsLine[d]["step"].Question;
                var f = b.indexOf("#");
                var g = b.lastIndexOf("#");
                if (f != -1 && g != -1 && f < g) {
                    freqDisp = b.substring(f + 1, g).split("|");
                    if (typeof this.stepItemToFreq[e.ID] == "undefined") {
                        this.stepItemToFreq[e.ID] = 0
                    } else {
                        this.stepItemToFreq[e.ID] += 1
                    }
                    if (typeof freqDisp[this.stepItemToFreq[e.ID]] != "undefined") {
                        b = b.substring(0, f) + freqDisp[this.stepItemToFreq[e.ID]] + b.substring(g + 1)
                    }
                }
                e.Question = b;
                return e
            }
        }
        return null
    };
    this.isItemSelected = function(d, c) {
        for (var b in this.selectedItems) {
            if (this.selectedItems[b]["Item"]["ID"] == c && this.selectedItems[b]["StepNum"] == d) {
                return true
            }
        }
        return false
    };
    this.addItem = function(c, b) {
        this.selectedItems.push({
            Item: b,
            StepNum: c
        })
    };
    this.removeItem = function(d, c) {
        for (var b in this.selectedItems) {
            if (this.selectedItems[b]["Item"]["ID"] == c && this.selectedItems[b]["StepNum"] == d) {
                this.selectedItems.splice(b, 1)
            }
        }
    };
    this.clearItems = function(c) {
        for (var b in this.selectedItems) {
            if (this.selectedItems[b]["StepNum"] == c) {
                this.selectedItems.splice(b, 1)
            }
        }
    };
    this.getTemplate = function(b) {
        return HTML_Pages["DealBuilder_" + b]
    };
    this.Init = function(v, t) {
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        if (typeof v === "undefined" && t !== "undefined") {
            v = OriginalItems[t.ID]
        }
        var m = GoogleTrack_getItemEnName(v.ID);
        googleTag.push({
            event: "PageView",
            PageName: "Deal Builder",
            PageURL: "dealbuilder"
        });
        googleTag.push({
            event: "Open",
            Category: "Deal Builder",
            ElementType: "Item",
            ID: v.ID,
            Name: m
        });
        this.deal = OriginalDeals[v.DealID];
        this.stepsLine = {};
        var q = 0;
        for (var r in this.deal.Steps) {
            var e = this.deal.Steps[r];
            var j = e.Min;
            if (j < 0) {
                j = 1
            }
            while (j > 0) {
                this.stepsLine[q] = {
                    step: e
                };
                q++;
                j--
            }
        }
        if (typeof t !== "undefined" && t != null) {
            this.loadCartDeal(t)
        }
        var k = this.getTemplate("Main");
        var s = createUUID();
        var c = createUUID();
        var l = createUUID();
        var g = createUUID();
        k = k.replace(/#TITLE#/gi, this.deal.Name);
        k = k.replace(/#DEAL_STEPS#/gi, s);
        k = k.replace(/#DEAL_CONTENT#/gi, l);
        k = k.replace(/#DEAL_STEP_TITLE#/gi, g);
        k = k.replace(/#BACK#/gi, _genActionLink(this, function(x) {
            x.movePrev()
        }, true));
        $(this.pagesContainer).html(k);
        this.stepsUI = $("#" + s);
        this.contentUI = $("#" + l);
        this.stepTitleUI = $("#" + g);
        var f = null;
        var d = null;
        var w = null;
        var p = null;
        var h = 0;
        var o = 0;
        for (var r in this.stepsLine) {
            var e = this.stepsLine[r]["step"];
            if (d == e) {
                o++;
                this.stepsLine[r]["UI"] = w;
                this.stepsLine[r]["Number"] = o;
                this.stepsLine[r]["CountUI"] = p;
                w.data("count", o);
                continue
            }
            o = 1;
            if (f == null) {
                f = e
            }
            var u = createUUID();
            var k = this.getTemplate("Step");
            k = k.replace(/#NUMBER#/gi, parseInt(h) + 1);
            k = k.replace(/#NAME#/gi, e.Name);
            k = k.replace(/#COUNT_ID#/gi, u);
            var b = $(k);
            this.stepsUI.append(b);
            this.stepsLine[r]["UI"] = b;
            this.stepsLine[r]["Number"] = o;
            this.stepsLine[r]["CountUI"] = $("#" + u);
            b.data("count", o);
            b.data("originalTitle", e.Name);
            w = b;
            d = e;
            p = this.stepsLine[r]["CountUI"];
            h++
        }
        var k = this.getTemplate("Step");
        k = k.replace(/#NUMBER#/gi, parseInt(h) + 1);
        k = k.replace(/#NAME#/gi, Translate("Done"));
        var b = $(k);
        this.stepsUI.append(b);
        this.gotoStep(0);
        if (this.afterShowPage != null) {
            this.afterShowPage()
        }
        if (this.afterShowPageStep != null) {
            this.afterShowPageStep()
        }
    };
    this.gotoStep = function(l) {
        this.currentStep = l;
        for (var h in this.stepsLine) {
            var o = this.stepsLine[h]["UI"];
            o.removeClass("active");
            o.removeClass("passed");
            this.stepsLine[h]["CountUI"].html("")
        }
        for (var h in this.stepsLine) {
            var d = this.stepsLine[h]["step"];
            var o = this.stepsLine[h]["UI"];
            if (parseInt(h) == parseInt(l)) {
                o.addClass("active");
                var k = o.data("count");
                var j = this.stepsLine[h]["Number"];
                if (k > 1) {
                    this.stepsLine[h]["CountUI"].html(" (" + j + " / " + k + ") ")
                }
            } else {
                if (parseInt(h) < parseInt(l)) {
                    o.addClass("passed")
                }
            }
        }
        var d = this.getStepByNumber(l);
        var g = "list";
        this.stepTitleUI.html(d.Question);
        var b = [];
        var q = {};
        var m = 0;
        if (d.NoThanks_ItemTitle != null && d.NoThanks_ItemTitle != "") {
            var e = {
                ID: Number.NaN,
                StepID: d.ID,
                Name: d.NoThanks_ItemTitle,
                Title: d.NoThanks_ItemTitle,
                Description: d.NoThanks_ItemDesc,
                ImageName: d.NoThanks_ItemImage,
                ItemTitleStyle: d.NoThanks_ItemStyle,
                SpecialItem: true,
                modGroup: [],
                modGroupIDz: [],
                Price: 0,
                Weight: 0,
                VirtualGroupID: d.NoThanks_ItemVGroupID,
                Selector1ValueID: d.NoThanks_ItemVSel1Val,
                Selector2ValueID: d.NoThanks_ItemVSel2Val,
                Selector3ValueID: d.NoThanks_ItemVSel3Val,
                PizzaItem: false,
                IsSubmenu: false,
                Filter: "",
                Rank: -1
            };
            b.push(e)
        }
        this.GetStepItems(d, l, b);
        for (var h in b) {
            m = b[h]["VirtualGroupID"];
            q[m] = m
        }
        b = b.sort(function(s, r) {
            if (s.Rank == r.Rank) {
                return s.ID - r.ID
            } else {
                return s.Rank - r.Rank
            }
        });
        var p = 0;
        var f = true;
        for (var h in q) {
            p++;
            if (typeof OriginalVirtualGroups[q[h]] === "undefined" || OriginalVirtualGroups[q[h]].CustomizationType != 1) {
                f = false
            }
        }
        if (f && p > 0) {
            g = "PizzaBuilder"
        }
        this.contentUI.empty();
        this.contentUI.removeClass("firstStep");
        if (l == 0) {
            this.contentUI.addClass("firstStep")
        }
        var c = new ItemsViewer();
        c.dataItems = b;
        c.dataTitle = d.Name;
        c.subMenuID = l;
        c.ImagesFolder = "";
        c.imgExtentions = "";
        c.container = this.contentUI.get(0);
        c.activeStyle = new HtmlStyle("DealBuilder_ItemsContainer", "DealBuilder_ItemFilter", "BackgroundList_ThumbsItem", "BackgroundList_ThumbsItem_SelectorItem", 0, 0, "Thumbs", false, true);
        c.activeStyle._dealBuilder = this;
        c.activeStyle._step = d;
        c.activeStyle._stepNum = l;
        c.activeStyle.getSelectedItemOfGroup = bk.activeStyle.getSelectedItemOfGroup;
        c.addItemToCart = function(r) {
            this._dealBuilder.moveNext(this._stepNum, r)
        };
        c.customizeItem = function(s, r) {
            var t = new PizzaBuilder();
            t.loadAllItems = false;
            t._step = this._step;
            t._stepNum = this._stepNum;
            t._dealBuilder = this._dealBuilder;
            t.pagesContainer = this._dealBuilder.contentUI.get(0);
            t.eligibleItems = this.dataItems;
            t.beforeShowPage = function() {};
            t.afterShowPage = function() {};
            t.onOK = function(u) {
                this._dealBuilder.moveNext(this._stepNum, u)
            };
            t.onCancel = function() {
                this._dealBuilder.gotoStep(c._stepNum)
            };
            t.Init(s, r);
            window.scrollTo(0, 0)
        };
        c.Init();
        c.Update();
        window.scrollTo(0, 0);
        if (this.afterShowPageStep != null) {
            this.afterShowPageStep()
        }
    };
    this.getPrevStep = function(b) {
        b--;
        if (b < 0) {
            b = 0
        }
        return this.getStepByNumber(b)
    };
    this.getNextStep = function(b) {
        b++;
        return this.getStepByNumber(b)
    };
    this.moveNext = function(d, c) {
        if (typeof c.SpecialItem === "undefined" || !c.SpecialItem) {
            this.clearItems(d);
            this.addItem(d, c)
        }
        var b = this.getNextStep(d);
        if (b != null) {
            this.gotoStep(d + 1)
        } else {
            this.done()
        }
    };
    this.movePrev = function(c) {
        if (typeof c === "undefined") {
            c = this.currentStep
        }
        var b = this.getPrevStep(c);
        if (b != null && c > 0) {
            this.gotoStep(c - 1)
        } else {
            if (this.onCancel != null) {
                this.onCancel()
            }
        }
    };
    this.done = function() {
        if (this.onOK != null && this.selectedItems != null) {
            var k = [];
            for (var h in cart.cartData) {
                var c = cart.cartData[h];
                if (c.DealID > 0) {
                    var m = dealNumber_extract(c.DealID);
                    if (m.bookmark == this.randomCartHolderID) {
                        k.push(cart.cartData.indexOf(c))
                    }
                }
            }
            k.sort(function(p, o) {
                return p - o
            });
            while (k.length > 0) {
                var h = k.pop();
                cart.cartData.splice(h, 1)
            }
            var g = [];
            var l = [];
            var j = OriginalItems[this.deal.ItemID];
            if (typeof j !== "undefined" && j != null) {
                var f = {
                    EntryID: 0,
                    ID: j.ID,
                    Name: GoogleTrack_getItemEnName(j.ID),
                    Price: getCartItemPrice(j),
                    Weight: j.Weight,
                    modGroupsItems: [],
                    NoModCodeItems: [],
                    DealID: dealNumber_combine(this.deal.ID, 99, this.randomCartHolderID)
                };
                g.push(f);
                l.push(f)
            }
            for (var h in this.selectedItems) {
                var e = this.selectedItems[h]["Item"];
                l.push(e);
                if (isNaN(e.ID)) {
                    continue
                }
                var b = this.selectedItems[h]["StepNum"];
                var d = this.getStepByNumber(b);
                e.DealID = dealNumber_combine(this.deal.ID, b, this.randomCartHolderID);
                if (!d.IsModifier) {
                    g.push(e)
                } else {
                    e.ModGroupID = getModGroupIDForModItem(j.ID, e.ID);
                    e.Weight = 1;
                    f.modGroupsItems.push(e)
                }
            }
            FillItemsSequence(HomeSubmenu);
            this.onOK(g)
        }
    };

    function a(b) {
        for (i = 0; i < b.length; i++) {
            var c = b[i];
            googleTag.push({
                event: "addToCart",
                Category: "Shopping Cart",
                ElementType: "Item",
                ID: c.ID,
                Name: c.Name,
                ecommerce: {
                    add: {
                        products: [{
                            name: c.Name,
                            id: c.ID,
                            price: c.Price,
                            brand: "",
                            category: this.dataTitle,
                            variant: ""
                        }]
                    }
                }
            })
        }
    }
}
DealBuilder.prototype.GetStepItems = function(c, e, b) {
    var d = [];
    for (var a in c.Items) {
        c.Items[a]["Sequence"] = c.Items[a]["Rank"];
        b.push(c.Items[a])
    }
};

function getModGroupIDForModItem(c, f) {
    var a = OriginalItems[c];
    for (var e in a.modGroup) {
        var h = a.modGroup[e];
        if (typeof h === "undefined") {
            continue
        }
        for (var d in h.Items) {
            var b = h.Items[d];
            if (typeof b === "undefined") {
                continue
            }
            if (b.ID == f) {
                return h.ID
            }
        }
    }
    return null
}
var DisableAddressEdit = false;

function EditProfile() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.afterClose = null;
    this.loadedDistrictText = "";
    this.address_longitude = 0;
    this.address_latitude = 0;
    this.UseMap = true;
    this.addressLoading = false;
    this.Show = function() {
        document._editProfile = this;
        document._continueProfileInit = function() {
            document._editProfile._Show()
        };
        loadGoogleMapsJS(document._continueProfileInit)
    };
    this._Show = function() {
        googleTag.push({
            event: "PageView",
            PageName: "Edit Profile",
            PageURL: "/editprofile"
        });
        googleTag.push({
            event: "Open",
            Category: "Edit Profile",
            ElementType: "",
            ID: "",
            Name: ""
        });
        var d = this;
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        var a = this.pages.EditProfile_Main;
        $(this.pagesContainer).html(a);
        $("#btnAddressInformation").click(function() {
            d.btnAddressInformation_Click();
            UpdateScrolls()
        });
        $("#btnGeneralInformation").click(function() {
            d.btnGeneralInformation_Click();
            UpdateScrolls()
        });
        $("#btnProfileNotifications").click(function() {
            d.btnNotificationsInfo_Click();
            UpdateScrolls()
        });
        $("#btnSubmitAccount").unbind("click");
        $("#btnSubmitAccount").click(function() {
            d.validator.ValidateBeforePost(function(e) {
                d.btnSubmitAccount_Click()
            })
        });
        $("#btnSubmitAccount2").unbind("click");
        $("#btnSubmitAccount2").click(function() {
            d.btnSubmitAccount_Click()
        });
        $("#btnSubmitAddress").unbind("click");
        $("#btnSubmitAddress").click(function() {
            d.validator.ValidateBeforePost(function(e) {
                d.btnSubmitAddress_Click()
            })
        });
        $("#btnChangePassword").click(function() {
            d.btnChangePassword_Click()
        });
        $("#btnChangeSecurityQ").click(function() {
            d.btnChangeSecurityQ_Click()
        });
        $("#btnChangeEmail").click(function() {
            d.btnChangeEmail_Click()
        });
        $("#chkTax").change(function() {
            d.chkTax_change()
        }).change();
        $.mask.definitions["#"] = "[_ 0-9]";
        $("#phonetype").change(function() {
            d.phonetype_change("")
        }).change();
        $("#phone1type").change(function() {
            d.phonetype_change("1")
        }).change();
        $("#phone2type").change(function() {
            d.phonetype_change("2")
        }).change();
        $("#phone3type").change(function() {
            d.phonetype_change("3")
        }).change();
        $("#btnAddNewAddress").click(function() {
            d.btnAddNewAddress_click()
        }).change();
        if ($("#district").is("input")) {
            $("#district").autocomplete({
                source: function(f, e) {
                    $.ajax({
                        type: "GET",
                        url: "/Find/Customer/District?ShowWait=0",
                        dataType: "json",
                        data: {
                            province: OriginalCities[$("#city").val()].ProvinceID,
                            city: $("#city").val(),
                            term: f.term
                        },
                        success: function(g) {
                            e(g)
                        }
                    })
                },
                minLength: 2
            })
        } else {
            if ($("#district").is("select")) {
                if (useJUICombo) {
                    $("#district").combobox()
                }
                $("#city").change(function() {
                    var e = $("#city").val();
                    $("#district").children().remove();
                    if (useJUICombo || useBoxIt) {
                        $("#district").append($("<option value=''>- " + Translate("Select a value") + " -</option>"))
                    } else {
                        $("#district").append($("<option value=''>- " + Translate("District") + " -</option>"))
                    }
                    $("#district").val("");
                    if (typeof OriginalCities[e] !== "undefined") {
                        $.ajax({
                            type: "GET",
                            url: "/Find/Customer/District?ShowWait=0",
                            dataType: "json",
                            data: {
                                province: OriginalCities[e].ProvinceID,
                                city: e,
                                term: ""
                            },
                            success: function(g) {
                                for (var h in g) {
                                    var f = g[h];
                                    $("#district").append($("<option value='" + g[h] + "'>" + g[h] + "</option>"))
                                }
                                $("#district").val(d.loadedDistrictText)
                            }
                        })
                    }
                })
            }
        }
        $("#road").autocomplete({
            source: function(f, e) {
                $.ajax({
                    type: "GET",
                    url: "/Find/Customer/Street?ShowWait=0",
                    dataType: "json",
                    data: {
                        province: OriginalCities[$("#city").val()].ProvinceID,
                        city: $("#city").val(),
                        term: f.term
                    },
                    success: function(g) {
                        e(g)
                    }
                })
            },
            minLength: 2
        });
        var c = function(g, e) {
            if (typeof $("#area") === "undefined" || $("#area") == null) {
                return
            }
            var f = 0;
            var h = 0;
            h = $("#city").val();
            if (typeof OriginalCities[h] !== "undefined") {
                f = OriginalCities[h].ProvinceID
            } else {
                h = 0
            }
            $.ajax({
                type: "GET",
                url: "/Find/Customer/Area?ShowWait=0",
                dataType: "json",
                data: {
                    province: f,
                    city: h,
                    term: (typeof g !== "undefined" && g != null && typeof g.term !== "undefined" && g.term != null) ? g.term : ""
                },
                success: function(m) {
                    $("#area").children().remove();
                    if (useJUICombo || useBoxIt) {
                        $("#area").append($("<option value=''>- " + Translate("Select a value") + " -</option>"))
                    } else {
                        $("#area").append($("<option value=''>- " + Translate("Area") + " -</option>"))
                    }
                    var k = null;
                    for (var o in m) {
                        var l = m[o];
                        $("#area").append($("<option value='" + m[o] + "'>" + m[o] + "</option>"))
                    }
                    var j = d.getSelectedActiveAddress();
                    if (j && j.AreaText != "") {
                        k = j.AreaText
                    }
                    if (k != null) {
                        $("#area").val(k).change()
                    }
                }
            })
        };
        if ($("#area").is("input")) {
            $("#area").autocomplete({
                source: function(f, e) {
                    var g = 0;
                    var h = 0;
                    h = $("#city").val();
                    if (typeof OriginalCities[h] !== "undefined") {
                        g = OriginalCities[h].ProvinceID
                    } else {
                        h = 0
                    }
                    $.ajax({
                        type: "GET",
                        url: "/Find/Customer/Area?ShowWait=0",
                        dataType: "json",
                        data: {
                            province: g,
                            city: h,
                            term: f.term
                        },
                        success: function(j) {
                            e(j)
                        }
                    })
                },
                minLength: 2
            })
        } else {
            if ($("#area").is("select")) {
                if (useJUICombo) {
                    $("#area").combobox({
                        enableInput: true
                    })
                }
                $("#city").change(c);
                $("#city").change()
            }
        }
        c();
        $("#mapAddressClick").click(function() {
            $("#editManualAddress").hide();
            $("#editMapAddress").show();
            $("#manualAddressClick").removeClass("active");
            $("#mapAddressClick").addClass("active");
            d.UseMap = true;
            ValidateIfAreaIsServed(d.UseMap, d.address_latitude, d.address_longitude, false, null)
        });
        $("#manualAddressClick").click(function() {
            $("#editManualAddress").show();
            $("#editMapAddress").hide();
            $("#mapAddressClick").removeClass("active");
            $("#manualAddressClick").addClass("active");
            d.UseMap = false;
            $(".areanotservedmsg").hide()
        });
        if (AddressEntryType != "Both") {
            $("#mapButtons").hide()
        } else {
            $("#mapButtons").show()
        }
        if (AddressEntryType == "Both" || AddressEntryType == "Map") {
            $("#editMapAddress").show();
            $("#editManualAddress").hide();
            this.UseMap = true
        } else {
            $("#editMapAddress").hide();
            $("#editManualAddress").show();
            this.UseMap = false
        }
        if (AddressEntryType == "Both" || AddressEntryType == "Map") {
            var b = this;
            this.map = new google.maps.Map($("#editMapAddress").get(0), {
                zoom: 6,
                center: new google.maps.LatLng(0, 0),
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            this.addressMarker = new google.maps.Marker({
                map: this.map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(0, 0)
            });
            google.maps.event.addListener(this.addressMarker, "position_changed", function() {
                if (!b.addressLoading) {
                    var e = b.addressMarker.getPosition();
                    b.address_longitude = e.lng();
                    b.address_latitude = e.lat()
                }
            });
            google.maps.event.addListener(this.addressMarker, "dragend", function(e) {
                $("#direction").val("");
                GetPlace(b.map, e.latLng, function(f) {
                    $("#direction").val(f.formatted_address)
                });
                ValidateIfAreaIsServed(b.UseMap, b.address_latitude, b.address_longitude, false, null)
            })
        }
        FillDropDownList("customertitle", OriginalTitles, true);
        FillDropDownList("nationality", OriginalNationalities, true);
        FillDropDownList("addresstype", OriginalAddressTypes, true);
        FillDropDownList("buildingtype", OriginalBuildingTypes, true);
        FillDropDownList("city", OriginalCities, true);
        if (useJUICombo) {
            $("#customertitle").combobox();
            $("#nationality").combobox();
            $("#gender").combobox();
            $("#maritalStatus").combobox();
            $("#DateOfBirth_Day").combobox();
            $("#DateOfBirth_Month").combobox();
            $("#DateOfBirth_Year").combobox();
            $("#addresstype").combobox();
            if ($("#city").is("select")) {
                $("#city").combobox()
            }
            if ($("#area").is("select")) {
                $("#area").combobox()
            }
            $("#buildingtype").combobox();
            $("#phonetype").combobox();
            $("#phone1type").combobox();
            $("#phone2type").combobox();
            $("#phone3type").combobox();
            $("#preflang").combobox()
        }
        $("#lang_url_un").unbind("click.register");
        $("#lang_url_un").bind("click.register", function() {
            d.OnLanguageChanging()
        });
        $("#lang_url_en").unbind("click.register");
        $("#lang_url_en").bind("click.register", function() {
            d.OnLanguageChanging()
        });
        $("#SMSMobileNumber").mask(PhoneMasks[2]);
        $("#btnAddressInformation").click();
        if (this.afterShowPage != null) {
            this.afterShowPage()
        }
        setFloatingWindowStyle(2);
        document.close_callback = this.afterClose;
        this.LoadSavedSate();
        if (this.map) {
            google.maps.event.trigger(this.map, "resize")
        }
    };
    this.OnLanguageChanging = function() {
        if ($("#ProfileGeneral").is(":visible")) {
            var a = {
                Page: 1,
                CustomerTitle: $("#customertitle").val(),
                FirstName: $("#firstname").val(),
                MidName: $("#midname").val(),
                LastName: $("#lastname").val(),
                FullName: $("#fullnameinput").val(),
                Gender: $("#gender").val(),
                DateOfBirth_Day: $("#DateOfBirth_Day").val(),
                DateOfBirth_Month: $("#DateOfBirth_Month").val(),
                DateOfBirth_Year: $("#DateOfBirth_Year").val(),
                PhoneType: $("#phonetype").val(),
                PhoneNumber: $("#phonenumber").val(),
                PhoneExt: $("#phoneext").val(),
                Nationality: $("#nationality").val(),
                MaritalStatus: $("#maritalStatus").val(),
                FamilyMembers: $("#familyMembers").val(),
                SMSMobileNumber: $("#SMSMobileNumber").val(),
                NotifyNewOrderSMS: $("#NotifyNewOrderSMS").prop("checked"),
                NotifyNewOrderEMail: $("#NotifyNewOrderEMail").prop("checked"),
                NotifyApproveOrderSMS: $("#NotifyApproveOrderSMS").prop("checked"),
                NotifyApproveOrderEMail: $("#NotifyApproveOrderEMail").prop("checked"),
                NotifyCancelOrderSMS: $("#NotifyCancelOrderSMS").prop("checked"),
                NotifyCancelOrderEMail: $("#NotifyCancelOrderEMail").prop("checked")
            }
        } else {
            var a = {
                Page: 2,
                AddressID: $("#addressid").val(),
                AddressName: $("#addressname").val(),
                AddressType: $("#addresstype").val(),
                BuildingName: $("#buildingname").val(),
                BuildingNum: $("#buildingnum").val(),
                BuildingType: ((($)("#buildingtype").val() == "" || $("#buildingtype").val() == null) ? -1 : $("#buildingtype").val()),
                County: $("#county").val(),
                Area: $("#area").val(),
                Road: $("#road").val(),
                District: $("#district").val(),
                Province: (typeof ProvinceID === "undefined") ? -1 : OriginalCities[$("#city").val()].ProvinceID,
                City: $("#city").val(),
                PostCode: $("#postcode").val(),
                Floor: $("#floor").val(),
                FlatNo: $("#flatno").val(),
                Phone1ID: $("#phone1id").val(),
                Phone1Type: $("#phone1type").val(),
                Phone1Number: $("#phone1number").val(),
                Phone1Ext: $("#phone1ext").val(),
                Phone2ID: $("#phone2id").val(),
                Phone2Type: $("#phone2type").val(),
                Phone2Number: $("#phone2number").val(),
                Phone2Ext: $("#phone2ext").val(),
                Phone3ID: $("#phone3id").val(),
                Phone3Type: $("#phone3type").val(),
                Phone3Number: $("#phone3number").val(),
                Phone3Ext: $("#phone3ext").val(),
                Directions: $("#direction").val(),
                TaxChecked: $("#chkTax")[0].checked,
                TaxNotes: $("#taxnotes").val()
            }
        }
        $.cookie("SavedEditProfileData", JSON.stringify(a))
    };
    this.LoadSavedSate = function() {
        var b = JSON.parse($.cookie("SavedEditProfileData"));
        $.cookie("SavedEditProfileData", null);
        if (b == null) {
            return
        }
        if (b.Page == 1) {
            $("#btnGeneralInformation").click();
            $("#customertitle").val(b.CustomerTitle).change();
            $("#firstname").val(b.FirstName);
            $("#midname").val(b.MidName);
            $("#lastname").val(b.LastName);
            $("#fullnameinput").val(b.FullName);
            $("#gender").val(b.Gender).change();
            $("#DateOfBirth_Day").val(b.DateOfBirth_Day).change();
            $("#DateOfBirth_Month").val(b.DateOfBirth_Month).change();
            $("#DateOfBirth_Year").val(b.DateOfBirth_Year).change();
            $("#phonetype").val(b.PhoneType).change();
            $("#phonenumber").val(b.PhoneNumber);
            $("#phoneext").val(b.PhoneExt);
            $("#nationality").val(b.Nationality).change();
            $("#maritalStatus").val(b.MaritalStatus).change();
            $("#familyMembers").val(b.FamilyMembers);
            $("#SMSMobileNumber").val(b.SMSMobileNumber);
            $("#NotifyNewOrderSMS").prop("checked", b.NotifyNewOrderSMS == true);
            $("#NotifyNewOrderEMail").prop("checked", b.NotifyNewOrderEMail == true);
            $("#NotifyApproveOrderSMS").prop("checked", b.NotifyApproveOrderSMS == true);
            $("#NotifyApproveOrderEMail").prop("checked", b.NotifyApproveOrderEMail == true);
            $("#NotifyCancelOrderSMS").prop("checked", b.NotifyCancelOrderSMS == true);
            $("#NotifyCancelOrderEMail").prop("checked", b.NotifyCancelOrderEMail == true)
        } else {
            $("#btnAddressInformation").click();
            var a = $('input[type="button"]').filter(function() {
                return $.data(this, "addressID") == b.AddressID
            });
            a.css("display", "inline-block");
            a.click();
            $("#addressname").val(b.AddressName);
            $("#addresstype").val(b.AddressType).change();
            $("#buildingname").val(b.BuildingName);
            $("#buildingnum").val(b.BuildingNum);
            $("#buildingtype").val(b.BuildingType).change();
            $("#county").val(b.County);
            $("#area").val(b.Area);
            $("#road").val(b.Road);
            $("#district").val(b.District);
            $("#city").val(b.City).change();
            $("#postcode").val(b.PostCode);
            $("#floor").val(b.Floor);
            $("#flatno").val(b.FlatNo);
            $("#phone1id").val(b.Phone1ID);
            $("#phone1type").val(b.Phone1Type).change();
            $("#phone1number").val(b.Phone1Number);
            $("#phone1ext").val(b.Phone1Ext);
            $("#phone2id").val(b.Phone2ID);
            $("#phone2type").val(b.Phone2Type).change();
            $("#phone2number").val(b.Phone2Number);
            $("#phone2ext").val(b.Phone2Ext);
            $("#phone3id").val(b.Phone3ID);
            $("#phone3type").val(b.Phone3Type).change();
            $("#phone3number").val(b.Phone3Number);
            $("#phone3ext").val(b.Phone3Ext);
            $("#direction").val(b.Directions);
            $("#chkTax")[0].checked = b.TaxChecked;
            $("#chkTax").change();
            $("#taxnotes").val(b.TaxNotes)
        }
    };
    this.btnAddNewAddress_click = function() {
        $("#tabNewAddress").css("display", "inline-block");
        $("#tabNewAddress").click();
        $("#addressname").focus().select();
        googleTag.push({
            event: "New Address",
            Category: "Address Book",
            ElementType: "",
            ID: "",
            Name: ""
        })
    };
    this.phonetype_change = function(a) {
        var b = $("#phone" + a + "type").val();
        $("#phone" + a + "number").val("").prop("readonly", (b == -1)).mask(PhoneMasks[b]);
        if ((b == -1) || (b == 2)) {
            $("#lblPhone" + a + "Ext").prop("disabled", true);
            $("#phone" + a + "ext").val("").prop("disabled", true)
        } else {
            $("#lblPhone" + a + "Ext").removeAttr("disabled");
            $("#phone" + a + "ext").val("").removeAttr("disabled")
        }
    };
    this.chkTax_change = function() {
        if ($("#chkTax")[0].checked) {
            $("#taxnoteslabel").removeAttr("disabled");
            $("#taxnotes").removeAttr("disabled")
        } else {
            $("#taxnoteslabel").attr("disabled", "disabled");
            $("#taxnotes").attr("disabled", "disabled")
        }
    };
    this.FillGeneralData = function() {
        var b = userLogin.customerData;
        $("#corpid").val(b.CorpID);
        $("#emailaddress").val(b.UserName);
        $("#customertitle").val(b.Title).change();
        $("#firstname").val(b.FirstName);
        $("#midname").val(b.MidName);
        $("#lastname").val(b.LastName);
        $("#fullnameinput").val(b.FirstName + " " + b.LastName);
        $("#gender").val(b.Gender).change();
        if (b.hasDateOfBirth.toLowerCase() == "true") {
            var a = new Date(parseInt(b.DateOfBirth.replace(/\/Date\((-?\d+)\)\//, "$1")));
            $("#DateOfBirth_Month").val(a.getMonth()).change();
            $("#DateOfBirth_Day").val(a.getDate()).change();
            $("#DateOfBirth_Year").val(a.getFullYear()).change()
        }
        $("#phonetype").val(b.PhoneType).change();
        $("#phonenumber").val(b.PhoneNumber);
        $("#phoneext").val(b.PhoneExt);
        $("#nationality").val(b.NationalityID).change();
        $("#preflang").val((b.PreferedLang == 1 || b.PreferedLang == 2) ? b.PreferedLang : -1).change();
        $("#maritalStatus").val(b.MartialStatus).change();
        $("#familyMembers").val(b.Dependents);
        $("#SMSMobileNumber").val(b.SMSMobileNumber);
        $("#NotifyNewOrderSMS").prop("checked", b.NotifyNewOrderSMS.toLowerCase() == "true");
        $("#NotifyNewOrderEMail").prop("checked", b.NotifyNewOrderEMail.toLowerCase() == "true");
        $("#NotifyApproveOrderSMS").prop("checked", b.NotifyApproveOrderSMS.toLowerCase() == "true");
        $("#NotifyApproveOrderEMail").prop("checked", b.NotifyApproveOrderEMail.toLowerCase() == "true");
        $("#NotifyCancelOrderSMS").prop("checked", b.NotifyCancelOrderSMS.toLowerCase() == "true");
        $("#NotifyCancelOrderEMail").prop("checked", b.NotifyCancelOrderEMail.toLowerCase() == "true");
        this.validator = new FormValidator($("#frmEdit"), {
            firstname: {
                customValidation: function(c, d, g) {
                    var f = $("#firstname").val();
                    var e = $("#firstname").length == 1;
                    g(e == false || (e && f), Translate("Please enter your first name"), d)
                }
            },
            lastname: {
                customValidation: function(c, d, g) {
                    var f = $("#lastname").val();
                    var e = $("#lastname").length == 1;
                    g(e == false || (e && f), Translate("Please enter your last name"), d)
                }
            },
            fullnameinput: {
                customValidation: function(c, d, g) {
                    var f = $("#fullnameinput").val();
                    var e = $("#fullnameinput").length == 1;
                    g(e == false || (e && f), Translate("Please enter your full name"), d)
                }
            },
            phonenumber: {
                customValidation: function(d, e, h) {
                    var f = parseInt($("#phonetype").val());
                    var g = $("#phonenumber").val().replace(/[^\d]*/g, "");
                    var c = PhoneMasks[f].replace(/[^\d]*/g, "").length;
                    if (f < 0) {
                        h(false, Translate("Please select a phone type"), e)
                    } else {
                        if (g.length < c) {
                            h(false, Translate("Please enter your mobile number"), e)
                        } else {
                            h(true, "", e)
                        }
                    }
                }
            },
            phoneext: {
                customValidation: function(c, d, f) {
                    var e = $("#phoneext").val();
                    if (isNaN(Number(e)) && e.length != 0) {
                        f(false, Translate("Extension should be a number"), d)
                    } else {
                        f(true, "", d)
                    }
                }
            }
        });
        this.validator.onShowValidateMessage = function(g, c, e, f, h) {
            var d = null;
            if (c == "phonetype" || c == "phonenumber" || c == "phoneext") {
                if ($("#phoneContainer").length) {
                    d = $("#phoneContainer")
                } else {
                    d = $("#phoneext")
                }
            }
            if (!g) {
                tooltip($("#" + c), f, 0, h, d)
            } else {
                tooltip($("#" + c), "", 1, false, d)
            }
        }
    };
    this.getSelectedActiveAddress = function() {
        var f = userLogin.customerData;
        if (!isMobile) {
            var d = $('input[type="button"]').filter(function() {
                return $.data(this, "selectedButton") == "1"
            });
            var a = d.data("addressID")
        } else {
            a = $("input[name=addressTabs]:checked").data("addressID")
        }
        var b = null;
        for (var c = 0; c < f.Addresses.length; c++) {
            var e = f.Addresses[c];
            if (e.ID == a) {
                b = e;
                break
            }
        }
        return b
    };
    this.FillAddressData = function() {
        var d = userLogin.customerData;
        var b = this.getSelectedActiveAddress();
        if (b) {
            $("#addressid").val(b.ID);
            $("#addressname").val(b.Name);
            $("#addresstype").val(b.AddressType).change();
            $("#buildingname").val(b.BldngName);
            $("#buildingnum").val(b.BldngNum);
            $("#buildingtype").val(b.BldngType).change();
            $("#county").val(b.County);
            $("#area").val(b.AreaText);
            $("#road").val(b.StreetText);
            $("#city").val(b.CityID).change();
            $("#district").val(b.DistrictText);
            this.loadedDistrictText = b.DistrictText;
            $("#postcode").val(b.PostalCode);
            $("#floor").val(b.Floor);
            $("#flatno").val(b.FlatNumber);
            $("#phone1id").val(b.Phone1ID);
            $("#phone1type").val(b.Phone1Type).change();
            $("#phone1number").val(b.Phone1Number);
            $("#phone1ext").val(b.Phone1Ext);
            $("#phone2id").val(b.Phone2ID);
            $("#phone2type").val(b.Phone2Type).change();
            $("#phone2number").val(b.Phone2Number);
            $("#phone2ext").val(b.Phone2Ext);
            $("#phone3id").val(b.Phone3ID);
            $("#phone3type").val(b.Phone3Type).change();
            $("#phone3number").val(b.Phone3Number);
            $("#phone3ext").val(b.Phone3Ext);
            $("#direction").val(b.Sketch);
            $("#chkTax").prop("checked", b.Notes == "" ? false : true);
            $("#chkTax").change();
            $("#taxnotes").val(b.Notes);
            this.address_latitude = b.MapLocation.Latitude;
            this.address_longitude = b.MapLocation.Longitude
        } else {
            $("#addressid").val(-1);
            $("#addressname").val("Address " + (d.Addresses.length + 1));
            $("#addresstype").val("").change();
            $("#buildingname").val("");
            $("#buildingnum").val("");
            $("#buildingtype").val("").change();
            $("#county").val("");
            $("#area").val("");
            $("#road").val("");
            $("#district").val("");
            $("#city").val(DefCityID).change();
            $("#postcode").val("");
            $("#floor").val("");
            $("#flatno").val("");
            $("#phone1id").val(-1);
            $("#phone1type").val(-1).change();
            $("#phone1number").val("");
            $("#phone1ext").val("");
            $("#phone2id").val(-1);
            $("#phone2type").val(-1).change();
            $("#phone2number").val("");
            $("#phone2ext").val("");
            $("#phone3id").val(-1);
            $("#phone3type").val(-1).change();
            $("#phone3number").val("");
            $("#phone3ext").val("");
            $("#direction").val("");
            $("#chkTax")[0].checked = false;
            $("#chkTax").change();
            $("#taxnotes").val("");
            this.address_longitude = 0;
            this.address_latitude = 0
        }
        var c = this;
        if (AddressEntryType == "Both" || AddressEntryType == "Map") {
            var a = null;
            if (!this.address_longitude && !this.address_latitude) {
                a = new google.maps.LatLng(DefaultMapAddressLocation.split(",")[0].trim(), DefaultMapAddressLocation.split(",")[1].trim())
            } else {
                a = new google.maps.LatLng(this.address_latitude, this.address_longitude)
            }
            this.addressLoading = true;
            google.maps.event.trigger(this.map, "resize");
            this.addressMarker.setPosition(a);
            this.map.setCenter(a);
            this.map.setZoom(16);
            this.addressLoading = false;
            if (navigator.geolocation && !this.address_longitude && !this.address_latitude) {
                getGPSLocation(function(e) {
                    c.address_latitude = e.lat();
                    c.address_longitude = e.lng();
                    c.addressMarker.setPosition(e);
                    google.maps.event.trigger(c.map, "resize");
                    c.map.setCenter(e);
                    c.map.setZoom(16);
                    $("#direction").val("");
                    GetPlace(c.map, e, function(f) {
                        $("#direction").val(f.formatted_address)
                    });
                    ValidateIfAreaIsServed(c.UseMap, c.address_latitude, c.address_longitude, false, null)
                }, true)
            }
        }
        this.validator = new FormValidator($("#frmEdit"), {
            city: {
                customValidation: function(f, g, j) {
                    var h = $("#" + f).val();
                    var e = AddressEntryType == "Manual";
                    if ((!h || h == -1) && e) {
                        j(false, Translate("Please select a city"), g)
                    } else {
                        j(true, "", g)
                    }
                }
            },
            area: {
                customValidation: function(f, g, j) {
                    var h = $("#" + f).val();
                    var e = AddressEntryType == "Manual";
                    if ((!h || h == -1) && e) {
                        j(false, Translate("Please select area"), g)
                    } else {
                        j(true, "", g)
                    }
                }
            },
            road: {
                customValidation: function(f, g, j) {
                    var h = $("#" + f).val();
                    var e = AddressEntryType == "Manual";
                    if ((!h || h == -1) && e) {
                        j(false, Translate("Please enter a road value"), g)
                    } else {
                        j(true, "", g)
                    }
                }
            },
            buildingname: {
                required: true,
                requiredMsg: Translate("Please fill building name")
            },
            phone1number: {
                customValidation: function(f, g, k) {
                    var h = parseInt($("#phone1type").val());
                    var j = $("#phone1number").val().replace(/[^\d]*/g, "");
                    var e = PhoneMasks[h].replace(/[^9]*/g, "").length;
                    if (h < 0) {
                        k(false, Translate("Please select a phone type"), g)
                    } else {
                        if (j.length < e) {
                            k(false, Translate("Please enter your mobile number"), g)
                        } else {
                            k(true, "", g)
                        }
                    }
                }
            },
            phone1ext: {
                customValidation: function(e, f, h) {
                    var g = $("#phone1ext").val();
                    if (isNaN(Number(g)) && g.length != 0) {
                        h(false, Translate("Extension should be a number"), f)
                    } else {
                        h(true, "", f)
                    }
                }
            },
            flatno: {
                required: true,
                requiredMsg: Translate("Please fill flat number")
            }
        });
        this.validator.onShowValidateMessage = function(j, e, g, h, k) {
            var f = null;
            if (e == "phone1type" || e == "phone1number" || e == "phone1ext") {
                if ($("#phone1Container").length) {
                    f = $("#phone1Container")
                } else {
                    f = $("#phone1ext")
                }
            }
            if (e == "phone2type" || e == "phone2number" || e == "phone2ext") {
                if ($("#phone2Container").length) {
                    f = $("#phone2Container")
                } else {
                    f = $("#phone2ext")
                }
            }
            if (e == "phone3type" || e == "phone3number" || e == "phone3ext") {
                if ($("#phone3Container").length) {
                    f = $("#phone3Container")
                } else {
                    f = $("#phone3ext")
                }
            }
            if (e == "phonetype" || e == "phonenumber" || e == "phoneext") {
                if ($("#phoneContainer").length) {
                    f = $("#phoneContainer")
                } else {
                    f = $("#phoneext")
                }
            }
            if (e == "addressname") {
                f = $("#edit_address_showmap")
            }
            if (!j) {
                tooltip($("#" + e), h, 0, k, f)
            } else {
                tooltip($("#" + e), "", 1, false, f)
            }
        }
    };
    this.FillAddressesButtons = function(a) {
        var g = userLogin.customerData;
        var d = $("#addressesbuttons");
        d.empty();
        var h = true;
        for (var c = 0; c < g.Addresses.length; c++) {
            var b = g.Addresses[c];
            var f = null;
            if (!isMobile) {
                f = $('<input id="tab' + b.ID + '" type="button" value="' + b.Name + '" />');
                d.append(f);
                f.click(this.btnAddressTitle_Click)
            } else {
                d.append($('<label><input name="addressTabs" id="tab' + b.ID + '" type="radio" />' + b.Name + "</label>"));
                f = $("#tab" + b.ID);
                f.change(this.btnAddressTitle_Click)
            }
            f.data("owner", this);
            f.data("addressID", b.ID);
            f.data("selectedButton", 0);
            f.addClass("AddressTitleButtonOff");
            h = false
        }
        if (!isMobile) {
            $btnNew = $('<input id="tabNewAddress" type="button" value="New Address*" />');
            d.append($btnNew);
            $btnNew.click(this.btnAddressTitle_Click)
        } else {
            d.append($('<label><input name="addressTabs" value="tabNewAddress" id="tabNewAddress" type="radio" />New Address*</label>'));
            $btnNew = $("#tabNewAddress");
            $btnNew.change(this.btnAddressTitle_Click)
        }
        $btnNew.data("owner", this);
        $btnNew.data("addressID", "-1");
        $btnNew.data("selectedButton", 0);
        $btnNew.addClass("AddressTitleButtonOff");
        $btnNew.addClass("AddressTitleButtonGreen");
        $btnNew.hide();
        d.append($btnNew);
        var e = $('input[type="button"]').filter(function() {
            return $.data(this, "selectedButton") == "0" && $.data(this, "addressID") == a
        });
        if (e.length == 0) {
            e = $('input[type="button"]').filter(function() {
                return $.data(this, "selectedButton") == "0"
            }).first()
        }
        e.removeClass("AddressTitleButtonOff").addClass("AddressTitleButtonOn");
        e.data("selectedButton", 1);
        this.FillAddressData()
    };
    this.btnAddressTitle_Click = function() {
        var a = null;
        if (!isMobile) {
            a = $(this)
        } else {
            a = $("input[name=addressTabs]:checked")
        }
        if (!isMobile) {
            if (a.data("selectedButton") == 1) {
                return
            }
            var b = $('input[type="button"]').filter(function() {
                return $.data(this, "selectedButton") == "1"
            });
            b.data("selectedButton", 0);
            b.removeClass("AddressTitleButtonOn").addClass("AddressTitleButtonOff");
            a.removeClass("AddressTitleButtonOff").addClass("AddressTitleButtonOn");
            a.data("selectedButton", 1)
        }
        a.data("owner").FillAddressData()
    };
    this.btnAddressInformation_Click = function() {
        $("#ProfileGeneral").hide();
        $("#ProfileAddress").show();
        $("#ProfileNotifications").hide();
        $("#btnGeneralInformation").removeClass("regButtonSelected");
        $("#btnAddressInformation").removeClass("regButtonSelected");
        $("#btnProfileNotifications").removeClass("regButtonSelected");
        $("#btnGeneralInformation").addClass("regButton");
        $("#btnAddressInformation").addClass("regButton");
        $("#btnProfileNotifications").addClass("regButton");
        $("#btnAddressInformation").removeClass("regButton");
        $("#btnAddressInformation").addClass("regButtonSelected");
        this.FillAddressesButtons()
    };
    this.btnGeneralInformation_Click = function() {
        $("#ProfileAddress").hide();
        $("#ProfileGeneral").show();
        $("#ProfileNotifications").hide();
        $("#btnGeneralInformation").removeClass("regButtonSelected");
        $("#btnAddressInformation").removeClass("regButtonSelected");
        $("#btnProfileNotifications").removeClass("regButtonSelected");
        $("#btnGeneralInformation").addClass("regButton");
        $("#btnAddressInformation").addClass("regButton");
        $("#btnProfileNotifications").addClass("regButton");
        $("#btnGeneralInformation").removeClass("regButton");
        $("#btnGeneralInformation").addClass("regButtonSelected");
        this.FillGeneralData()
    };
    this.btnNotificationsInfo_Click = function() {
        $("#ProfileAddress").hide();
        $("#ProfileGeneral").hide();
        $("#ProfileNotifications").show();
        $("#btnGeneralInformation").removeClass("regButtonSelected");
        $("#btnAddressInformation").removeClass("regButtonSelected");
        $("#btnProfileNotifications").removeClass("regButtonSelected");
        $("#btnGeneralInformation").addClass("regButton");
        $("#btnAddressInformation").addClass("regButton");
        $("#btnProfileNotifications").addClass("regButton");
        $("#btnProfileNotifications").removeClass("regButton");
        $("#btnProfileNotifications").addClass("regButtonSelected");
        this.FillGeneralData()
    };
    this.btnSubmitAccount_Click = function() {
        var b = parseInt($("#DateOfBirth_Year").val(), 10);
        var c = parseInt($("#DateOfBirth_Month").val(), 10);
        var a = parseInt($("#DateOfBirth_Day").val(), 10);
        if (!isNaN(b) || !isNaN(c) || !isNaN(a)) {
            var e = new Date(b, c, a);
            if (!(e.getFullYear() == b && e.getMonth() == c && e.getDate() == a)) {
                alert("Please enter a valid date of birth");
                return
            }
        } else {
            var e = ""
        }
        if ($("#phonetype").val() == "") {
            alert("Please select a Phone Type");
            return
        }
        if (!$("#phonenumber").val()) {
            alert("Please fill Phone Number field");
            return
        }
        if ($("#phonetype").val() < 3 && $("#phonenumber").val().indexOf("00") == 0) {
            alert("Phone Number should not start with 00");
            return
        }
        var d = {
            Action: "UpdateCustomer",
            CustomerTitle: $("#customertitle").val(),
            FirstName: $("#firstname").val(),
            MidName: $("#midname").val(),
            LastName: $("#lastname").val(),
            FullName: $("#fullnameinput").val(),
            Gender: $("#gender").val(),
            DateOfBirth: (e == "" ? "" : formatDate(e, "yyyyMMdd")),
            PhoneType: $("#phonetype").val(),
            PhoneNumber: $("#phonenumber").val(),
            PhoneExt: $("#phoneext").val(),
            Nationality: $("#nationality").val(),
            MaritalStatus: $("#maritalStatus").val(),
            FamilyMembers: $("#familyMembers").val(),
            SMSMobileNumber: $("#SMSMobileNumber").val(),
            NotifyNewOrderSMS: $("#NotifyNewOrderSMS").prop("checked"),
            NotifyNewOrderEMail: $("#NotifyNewOrderEMail").prop("checked"),
            NotifyApproveOrderSMS: $("#NotifyApproveOrderSMS").prop("checked"),
            NotifyApproveOrderEMail: $("#NotifyApproveOrderEMail").prop("checked"),
            NotifyCancelOrderSMS: $("#NotifyCancelOrderSMS").prop("checked"),
            NotifyCancelOrderEMail: $("#NotifyCancelOrderEMail").prop("checked"),
            PrefLang: $("#preflang").val()
        };
        $("#btnSubmitAccount").attr("disabled", "disabled");
        serverQuery("/Handlers/EditProfile.ashx", d, function(g, h, f) {
            $("#btnSubmitAccount").removeAttr("disabled");
            f.SubmitAccountDone(g, h)
        }, this)
    };
    this.SubmitAccountDone = function(a, b) {
        if (a) {
            if (b.valid) {
                userLogin.customerData = b.customer;
                userLogin.updateWelcomeMessage();
                if (typeof this.afterClose !== "undefined") {
                    if (document.close_callback == this.afterClose) {
                        document.close_callback = null
                    }
                    this.afterClose()
                }
                alert(b.message)
            } else {
                alert(b.message)
            }
        } else {
            alert("Request failed")
        }
    };
    this.btnChangePassword_Click = function() {
        this.popupDlg = new PopupForm();
        this.popupDlg.width = 400;
        this.popupDlg.height = 200;
        this.popupDlg.borderColor = "#83633D";
        this.popupDlg.backgroundColor = "rgb(210, 210, 210)";
        var a = this.pages.EditProfile_ChangePassword;
        this.popupDlg.container.html(a);
        var b = this;
        this.validator = new FormValidator($("#frmChangePassword"), {
            currentpassword: {
                required: true,
                requiredMsg: Translate("Please enter your current password")
            },
            newpassword: {
                required: true,
                requiredMsg: Translate("Please enter your new password")
            },
            confirmnewpassword: {
                required: true,
                requiredMsg: Translate("Please re-enter your new password"),
                equalTo: "#newpassword",
                equalToMsg: Translate("Please enter the same new password as above")
            }
        });
        this.validator.onShowValidateMessage = function(g, c, e, f, h) {
            var d = null;
            if (!g) {
                tooltip($("#" + c), f, 0, h, d)
            } else {
                tooltip($("#" + c), "", 1, false, d)
            }
        };
        $("#btnSubmitPassword").click(function() {
            b.validator.ValidateBeforePost(function(c) {
                b.btnSubmitPassword_Click()
            })
        });
        $("#btnCancelPassword").click(function() {
            b.btnCancelPassword_Click()
        });
        this.popupDlg.Show()
    };
    this.btnSubmitPassword_Click = function() {
        if ($("#currentpassword").val() == "") {
            alert("Please fill Current Password field");
            return
        }
        if ($("#newpassword").val() == "") {
            alert("Please fill New Password field");
            return
        }
        if ($("#confirmnewpassword").val() == "") {
            alert("Please fill Confirm New Password field");
            return
        }
        if ($("#newpassword").val() != $("#confirmnewpassword").val()) {
            alert("Password and Confirm Password do not match");
            return
        }
        var a = {
            Action: "ChangePassword",
            CurrentPassword: $("#currentpassword").val(),
            NewPassword: $("#newpassword").val(),
            ConfirmNewPassword: $("#confirmnewpassword").val()
        };
        $("#btnSubmitPassword").attr("disabled", "disabled");
        serverQuery("/Handlers/EditProfile.ashx", a, function(c, d, b) {
            $("#btnSubmitPassword").removeAttr("disabled");
            b.SubmitPasswordDone(c, d)
        }, this)
    };
    this.btnCancelPassword_Click = function() {
        this.popupDlg.Close()
    };
    this.SubmitPasswordDone = function(a, b) {
        if (a) {
            if (b.valid) {
                alert(b.message);
                this.popupDlg.Close()
            } else {
                alert(b.message)
            }
        } else {
            alert("Request failed")
        }
    };
    this.btnChangeSecurityQ_Click = function() {
        this.popupDlg = new PopupForm();
        this.popupDlg.width = 400;
        this.popupDlg.height = 200;
        this.popupDlg.borderColor = "#83633D";
        this.popupDlg.backgroundColor = "rgb(210, 210, 210)";
        var a = this.pages.EditProfile_ChangeSecurityQ;
        this.popupDlg.container.html(a);
        this.validator = new FormValidator($("#frmChangeSecQ"), {
            secQCurrentPassword: {
                required: true,
                requiredMsg: Translate("Please enter your current password")
            },
            securityQuestion: {
                customValidation: function(c, d, f) {
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
        this.validator.onShowValidateMessage = function(g, c, e, f, h) {
            var d = null;
            if (!g) {
                tooltip($("#" + c), f, 0, h, d)
            } else {
                tooltip($("#" + c), "", 1, false, d)
            }
        };
        var b = this;
        $("#btnSubmitChangeSecQ").click(function() {
            b.validator.ValidateBeforePost(function(c) {
                b.btnSubmitChangeSecQ_Click()
            })
        });
        $("#btnCancelChangeSecQ").click(function() {
            b.btnCancelChangeSecQ_Click()
        });
        this.popupDlg.Show()
    };
    this.btnSubmitSecurityQ_Click = function() {
        if ($("#currentpassword").val() == "") {
            alert("Please fill Current Password field");
            return
        }
        if ($("#securityQuestion").val() == -1) {
            alert("Please select a security question");
            return
        }
        if ($("#securityAnswer").val() == "") {
            alert("Please fill security answer field");
            return
        }
        var a = {
            Action: "ChangeSecurityQ",
            CurrentPassword: $("#secQCurrentPassword").val(),
            SecurityQuestion: $("#securityQuestion").val(),
            SecurityAnswer: $("#securityAnswer").val()
        };
        $("#btnSubmitChangeSecQ").attr("disabled", "disabled");
        serverQuery("/Handlers/EditProfile.ashx", a, function(c, d, b) {
            $("#btnSubmitChangeSecQ").removeAttr("disabled");
            b.SubmitSecurityQDone(c, d)
        }, this)
    };
    this.btnCancelSecurityQ_Click = function() {
        this.popupDlg.Close()
    };
    this.SubmitSecurityQDone = function(a, b) {
        if (a) {
            if (b.valid) {
                alert(b.message);
                this.popupDlg.Close()
            } else {
                alert(b.message)
            }
        } else {
            alert("Request failed")
        }
    };
    this.btnChangeEmail_Click = function() {
        this.popupDlg = new PopupForm();
        this.popupDlg.width = 400;
        this.popupDlg.height = 200;
        this.popupDlg.borderColor = "#83633D";
        this.popupDlg.backgroundColor = "rgb(210, 210, 210)";
        var a = this.pages.EditProfile_ChangeEMail;
        this.popupDlg.container.html(a);
        var b = this;
        $("#btnSubmitChangeEMail").click(function() {
            b.btnSubmitEMail_Click()
        });
        $("#btnCancelChangeEMail").click(function() {
            b.btnCancelEMail_Click()
        });
        this.popupDlg.Show()
    };
    this.btnSubmitEMail_Click = function() {
        if ($("#newemail").val() == "") {
            alert("Please fill New EMail field");
            return
        }
        var a = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!a.test($("#newemail").val())) {
            alert("Invalid EMail format");
            return
        }
        if ($("#confirmnewemail").val() == "") {
            alert("Please fill Confirm New EMail field");
            return
        }
        if ($("#newemail").val() != $("#confirmnewemail").val()) {
            alert("EMail and Confirm EMail do not match");
            return
        }
        var b = {
            Action: "SendChangeEMailRequest",
            NewEMail: $("#newemail").val(),
            ConfirmNewEMail: $("#confirmnewemail").val()
        };
        $("#btnSubmitChangeEMail").attr("disabled", "disabled");
        serverQuery("/Handlers/EditProfile.ashx", b, function(d, e, c) {
            $("#btnSubmitChangeEMail").removeAttr("disabled");
            c.SubmitEMailDone(d, e)
        }, this)
    };
    this.btnCancelEMail_Click = function() {
        this.popupDlg.Close()
    };
    this.SubmitEMailDone = function(a, b) {
        if (a) {
            if (b.valid) {
                alert(b.message);
                this.popupDlg.Close()
            } else {
                alert(b.message)
            }
        } else {
            alert("Request failed")
        }
    };
    this.btnSubmitAddress_Click = function() {
        if (DisableAddressEdit && $("#addressid").val() != -1) {
            warn("Address update is not allowed");
            return
        }
        if ((!$("#city").val() || $("#city").val() == -1 || $("#city").val() == "") && !this.UseMap) {
            alert(Translate("Please select the City"));
            return
        }
        if ((typeof $("#area") !== "undefined" && $("#area") != null) && !this.UseMap) {
            if (!$("#area").val() || $("#area").val() == -1 || $("#area").val() == "") {
                alert(Translate("Please select the Area"));
                return
            }
        }
        if ((typeof $("#road") !== "undefined" && $("#road") != null) && !this.UseMap) {
            if ($("#road").val() == -1 || $("#road").val() == "") {
                alert(Translate("Please enter the road"));
                return
            }
        }
        if (typeof $("#buildingname") !== "undefined" && $("#buildingname") != null) {
            if (!$("#buildingname").val() || $("#buildingname").val() == -1 || $("#buildingname").val() == "") {
                alert(Translate("Please enter the building name"));
                return
            }
        }
        if (typeof $("#flatno") !== "undefined" && $("#flatno") != null) {
            if (!$("#flatno").val() || $("#flatno").val() == -1 || $("#flatno").val() == "") {
                alert(Translate("Please enter the flat number"));
                return
            }
        }
        if ($("#phone1type").val() == "") {
            alert("Please select Phone 1 type");
            return
        }
        if ($("#phone2number").val() != "" && $("#phone2type").val() == "") {
            alert("Please select Phone 2 type");
            return
        }
        if ($("#phone3number").val() != "" && $("#phone3type").val() == "") {
            alert("Please select Phone 3 type");
            return
        }
        if (!$("#phone1number").val()) {
            alert("Please fill Phone 1 Number");
            return
        }
        if ($("#phone2number").val() && $("#phone2number").val().replace("_", "").length < PhoneMasks[$("#phone2type").val()].length) {
            alert("Please fill Phone 2 Number");
            return
        }
        if ($("#phone3number").val() && $("#phone3number").val().replace("_", "").length < PhoneMasks[$("#phone3type").val()].length) {
            alert("Please fill Phone 3 Number");
            return
        }
        if ($("#phone1type").val() < 3 && $("#phone1number").val().indexOf("00") == 0) {
            alert("Phone Number 1 should not start with 00");
            return
        }
        if ($("#phone2type").val() < 3 && $("#phone2number").val().indexOf("00") == 0) {
            alert("Phone Number 2 should not start with 00");
            return
        }
        if ($("#phone3type").val() < 3 && $("#phone3number").val().indexOf("00") == 0) {
            alert("Phone Number 3 should not start with 00");
            return
        }
        var a = this;
        ValidateIfAreaIsServed(this.UseMap, this.address_latitude, this.address_longitude, true, function() {
            var b = {
                Action: "UpdateAddress",
                AddressID: $("#addressid").val(),
                AddressName: $("#addressname").val(),
                AddressType: $("#addresstype").val(),
                BuildingName: $("#buildingname").val(),
                BuildingNum: $("#buildingnum").val(),
                BuildingType: $("#buildingtype").val(),
                County: $("#county").val(),
                Area: $("#area").val(),
                Road: $("#road").val(),
                SubDistrict: "",
                District: $("#district").val(),
                Province: OriginalCities[$("#city").val()] ? OriginalCities[$("#city").val()].ProvinceID : null,
                City: $("#city").val(),
                PostCode: $("#postcode").val(),
                Floor: $("#floor").val(),
                FlatNo: $("#flatno").val(),
                Phone1ID: $("#phone1id").val(),
                Phone1Type: $("#phone1type").val(),
                Phone1Number: $("#phone1number").val(),
                Phone1Ext: $("#phone1ext").val(),
                Phone2ID: $("#phone2id").val(),
                Phone2Type: $("#phone2type").val(),
                Phone2Number: $("#phone2number").val(),
                Phone2Ext: $("#phone2ext").val(),
                Phone3ID: $("#phone3id").val(),
                Phone3Type: $("#phone3type").val(),
                Phone3Number: $("#phone3number").val(),
                Phone3Ext: $("#phone3ext").val(),
                Directions: $("#direction").val(),
                TaxReceipt: $("#chkTax").val(),
                TaxNotes: $("#chkTax")[0].checked ? $("#taxnotes").val() : "",
                address_longitude: a.UseMap ? a.address_longitude : 0,
                address_latitude: a.UseMap ? a.address_latitude : 0,
                UseMap: a.UseMap
            };
            $("#btnSubmitAddress").attr("disabled", "disabled");
            serverQuery("/Handlers/EditProfile.ashx", b, function(d, e, c) {
                $("#btnSubmitAddress").removeAttr("disabled");
                c.SubmitAddressDone(d, e)
            }, a)
        })
    };
    this.SubmitAddressDone = function(a, b) {
        if (a) {
            if (b.valid) {
                userLogin.customerData = b.customer;
                this.FillAddressesButtons(b.addressID);
                if (typeof this.afterClose !== "undefined") {
                    if (document.close_callback == this.afterClose) {
                        document.close_callback = null
                    }
                    this.afterClose()
                }
                alert(b.message);
                googleTag.push({
                    event: "Submit",
                    Category: "Address Book",
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
}

function ChangeEMailRequest() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.token = null;
    this.Show = function() {
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        serverQuery("/Handlers/EditProfile.ashx", {
            Action: "ChangeEMail",
            token: this.token
        }, function(b, d, a) {
            var c = "";
            if (b && d.valid) {
                if (typeof d.newEMail !== "undefined" && d.newEMail != null && d.newEMail !== "") {
                    if (typeof userLogin.customerData !== "undefined" && userLogin.customerData != null) {
                        userLogin.customerData.EMail = d.newEMail;
                        userLogin.customerData.UserName = d.newEMail
                    }
                }
                alert(d.message)
            } else {
                alert("Invalid request")
            }
        }, this)
    }
}
var FavoriteItemsList = [];
var DealItemsSent = [];
FavoriteItems.InitFavList = function(d) {
    FavoriteItemsList = [];
    for (var h in d) {
        var g = d[h];
        var c = OriginalItems[g.ID];
        if (typeof c !== "undefined") {
            var f = g.DealID > 0;
            if (f) {
                var a = dealNumber_extract(g.DealID);
                var e = OriginalDeals[a.dealID];
                if (!e) {
                    continue
                }
            }
            g.OrderMode = c.OrderMode;
            g.Filter = "";
            var b = FavoriteItems.getItemNameAndRemarks(g);
            g.Name = b.name;
            g.Description = b.desc;
            FavoriteItemsList.push(g)
        }
    }
};
FavoriteItems.isItemInFavorite = function(b) {
    for (var a in FavoriteItemsList) {
        if (FavoriteItemsList[a]["ID"] == b) {
            return true
        }
    }
    return false
};
FavoriteItems.canDisplayed = function(c) {
    var e = c.DealID > 0;
    if (!e) {
        return true
    } else {
        var a = dealNumber_extract(c.DealID);
        var b = a.dealID;
        var d = OriginalDeals[b];
        if (c.ID == d.ItemID) {
            return true
        } else {
            return false
        }
    }
};
FavoriteItems.getDealItems = function(e) {
    var f = e.DealID > 0;
    var c = [];
    if (f) {
        var a = dealNumber_extract(e.DealID);
        for (var g in FavoriteItemsList) {
            var d = FavoriteItemsList[g];
            if (d.DealID > 0) {
                var b = dealNumber_extract(d.DealID);
                if (b.bookmark == a.bookmark && b.dealID == a.dealID) {
                    c.push(d)
                }
            }
        }
    }
    return c
};
FavoriteItems.getItemNameAndRemarks = function(m) {
    var b = m.Name;
    var g = "";
    var a = m.DealID > 0;
    if (a) {
        var k = dealNumber_extract(m.DealID);
        b = OriginalDeals[k.dealID]["Name"];
        g = "";
        var d = this.getDealItems(m);
        var f = true;
        var l = "";
        for (var c in d) {
            var h = d[c];
            if (h.ID != m.ID) {
                if (!f) {
                    l += ", "
                }
                l += OriginalItems[h.ID]["Name"];
                f = false
            }
        }
        if (!f) {
            g += Translate("With") + " " + l
        }
    } else {
        var l = "";
        var f = true;
        for (var e in m.modGroupsItems) {
            var j = m.modGroupsItems[e];
            if (!f) {
                l += ", "
            }
            l += j.Name;
            f = false
        }
        for (var e in m.NoModCodeItems) {
            var j = m.NoModCodeItems[e];
            if (!f) {
                l += ","
            }
            l += Translate("No") + " " + j.Name;
            f = false
        }
        if (l != "") {
            g += Translate("With") + " " + l
        }
    }
    return {
        name: b,
        desc: g
    }
};
FavoriteItems.isItemInFavoriteByCRC = function(b) {
    var c = false;
    var a = getCartItemCRC(b);
    if (b.DealID > 0) {
        a = a.replace(a.substring(a.lastIndexOf("_")), "")
    }
    for (var f in FavoriteItemsList) {
        var e = FavoriteItemsList[f];
        var d = getCartItemCRC(e);
        if (e.DealID > 0) {
            d = d.replace(d.substring(d.lastIndexOf("_")), "")
        }
        if (a == d) {
            c = true;
            break
        }
    }
    return c
};

function FavoriteItems() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.containerUI = null;
    this.onClose = null;
    this.itemsViewer = null
}
if (typeof CustomerData !== "undefined" && CustomerData != null && CustomerData.favItems != null) {
    FavoriteItems.InitFavList(CustomerData.favItems)
}
FavoriteItems.prototype.Show = function() {
    setFloatingWindowStyle(1);
    googleTag.push({
        event: "PageView",
        PageName: "Favorite Items",
        PageURL: "/favoriteitems"
    });
    googleTag.push({
        event: "Open",
        Category: "Favorite Items",
        ElementType: "",
        ID: "",
        Name: ""
    });
    var b = this.pages.FavoriteItems_Main;
    var c = createUUID();
    b = b.replace(/#TITLE#/gi, "Favorite Items");
    var a = createUUID();
    b = b.replace("#FAVORITEORDER_CONTAINER#", a);
    $(this.pagesContainer).html(b);
    this.containerUI = $("#" + a);
    $("#favorite_close").data("owner", this);
    $("#favorite_close").click(function() {
        $(this).data("owner").onClose()
    });
    this.loadItems()
};
FavoriteItems.prototype.Close = function() {
    if (this.onClose != null) {
        this.onClose()
    }
};
FavoriteItems.prototype.loadItems = function() {
    serverQuery("/Handlers/FavoriteMenu.ashx", {
        action: "getfavoriteitems"
    }, function(c, a, b) {
        if (c && a.valid == true) {
            FavoriteItems.InitFavList(a.ItemsList);
            b.FillFavoriteItems()
        } else {
            alert("Try again")
        }
    }, this)
};
FavoriteItems.prototype.FillFavoriteItems = function() {
    if (this.afterShowPage != null) {
        this.afterShowPage()
    }
    if (FavoriteItemsList.length == 0) {
        $(this.pagesContainer).html(this.pages.FavoriteItems_Empty);
        return
    }
    this.itemsViewer = new ItemsViewer();
    var a = [];
    for (var d in FavoriteItemsList) {
        if (FavoriteItems.canDisplayed(FavoriteItemsList[d])) {
            a.push(FavoriteItemsList[d])
        }
    }
    for (var g in a) {
        if (a[g]["DealID"] > 0) {
            var e = dealNumber_extract(a[g]["DealID"]);
            var f = 0;
            for (var d in FavoriteItemsList) {
                var c = dealNumber_extract(FavoriteItemsList[d]["DealID"]);
                if (c.bookmark == e.bookmark && FavoriteItemsList[d]["ID"] != a[g]["ID"]) {
                    f += FavoriteItemsList[d]["Price"]
                }
            }
            a[g]["OriginalPrice"] = a[g]["Price"];
            a[g]["Price"] = a[g]["Price"] + f
        }
    }
    this.itemsViewer.dataItems = a;
    this.itemsViewer.dataTitle = "Favorite Items";
    this.itemsViewer.subMenuID = 0;
    this.itemsViewer.ImagesFolder = "";
    this.itemsViewer.imgExtentions = "";
    var b = this;
    this.itemsViewer.onCustomItemVariables = function(l, m) {
        l = l.replace(/#ADD_TOFAV#/gi, genActionLink({
            Owner: b,
            Action: "Add",
            Item: m
        }, b.itemClick));
        l = l.replace(/#DELETE_FROMFAV#/gi, genActionLink({
            Owner: b,
            Action: "Remove",
            Item: m
        }, b.itemClick));
        var k = "";
        if (!m.DealID > 0) {
            k = "itm" + strPadLeft("0", 6, (m.ID > 0 ? m.ID.toString() : OriginalItems[m.ID]["VirtualGroupID"].toString())) + ".jpg"
        } else {
            if (m.DealID > 0) {
                var h = dealNumber_extract(m.DealID);
                var j = h.dealID;
                k = "deal" + strPadLeft("0", 6, j.toString()) + ".jpg"
            }
        }
        l = l.replace(/#IMG#/gi, "MenuTemplate" + CurrentMenuTemplateID + "/" + k);
        return l
    };
    this.itemsViewer.container = this.containerUI.get(0);
    this.itemsViewer.activeStyle = new HtmlStyle("FavoriteItems_ItemsContainer", "FavoriteItems_ItemFilter", "FavoriteItems_Item", "FavoriteItems_SelectorItem", 0, 0, "Thumbs", false, true);
    this.itemsViewer.removeFromFav = function(h) {
        confirm("Are you sure you want to remove this order from favourite", {
            owner: $(this).data("owner"),
            item: item
        }, function(k, j) {
            if (k) {
                FavoriteItems.RemoveFromFavorite(j.item["ItemID"]);
                googleTag.push({
                    event: "Delete Item",
                    Category: "Favorite Items",
                    ElementType: "Item",
                    ID: h.ID,
                    Name: h.Name
                })
            }
        })
    };
    this.itemsViewer.customizeItem = function(j, h) {
        showItemCustomize(j, h, true)
    };
    this.itemsViewer.Init();
    this.itemsViewer.Update();
    adjustMenuItemsPositions();
    activateAppropriateEvent()
};
FavoriteItems.ReorderItem = function(h, k) {
    var l = null;
    for (var b in FavoriteItemsList) {
        if (h == FavoriteItemsList[b]["EntryID"]) {
            l = cloneObject(FavoriteItemsList[b]);
            break
        }
    }
    if (l == null) {
        return
    }
    l.Name = OriginalItems[l.ID]["Name"];
    for (var c = 0; c < k; c++) {
        var a = l.DealID > 0;
        if (a) {
            var e = FavoriteItems.getDealItems(l);
            var g = genDealBookmark();
            SortDealItem(e);
            for (var d in e) {
                var f = cloneObject(e[d]);
                var j = dealNumber_extract(f.DealID);
                j.bookmark = g;
                f.DealID = dealNumber_combine(j.dealID, j.stepNumber, j.bookmark);
                f.Name = OriginalItems[f.ID]["Name"];
                f.Price = getCartItemPrice(f);
                cart.addItemToCart(f)
            }
        } else {
            cart.addItemToCart(l)
        }
    }
    googleTag.push({
        event: "Reorder",
        Category: "Favorite Items",
        ElementType: "Item",
        ID: l.ID,
        Name: l.Name
    })
};

function SortDealItem(d) {
    for (var c in d) {
        var f = d[c];
        var b = dealNumber_extract(f.DealID);
        var e = OriginalDeals[b.dealID];
        if (e.ItemID == f.ID) {
            var a = d.splice(c, 1);
            d.unshift(a[0])
        }
    }
}
FavoriteItems.prototype.itemClick = function(b) {
    var d = b.Item;
    var e = b.Action;
    var a = b.Owner;
    var c = $("#BKID_" + d.ID);
    var f = c.data("qty");
    if (typeof f === "undefined" || f == null || f < 0) {
        f = 1
    }
    if (e == "Add") {
        FavoriteItems.ReorderItem(d.EntryID, f)
    } else {
        if (e == "Remove") {
            a.RemoveFromFavorite(d.EntryID);
            googleTag.push({
                event: "Remove",
                Category: "Favorite Items",
                ElementType: "Item",
                ID: d.ID,
                Name: d.Name
            })
        }
    }
};
FavoriteItems.prototype.RemoveFromFavorite = function(c) {
    var a = [];
    var f = null;
    for (var b in FavoriteItemsList) {
        if (FavoriteItemsList[b]["EntryID"] == c) {
            f = FavoriteItemsList[b];
            break
        }
    }
    if (f == null) {
        return
    }
    var d = FavoriteItems.getDealItems(f);
    if (d.length != 0) {
        for (var e in d) {
            a.push(d[e]["EntryID"])
        }
    } else {
        a.push(f.EntryID)
    }
    serverQuery("/Handlers/FavoriteMenu.ashx", {
        action: "deletefavoriteitem",
        entryIDs: a
    }, function(m, h, k) {
        if (m && h.status == true) {
            while (a.length > 0) {
                var o = a.pop();
                var j = -1;
                for (var l in FavoriteItemsList) {
                    if (FavoriteItemsList[l]["EntryID"] == o) {
                        j = l;
                        break
                    }
                }
                if (j != -1) {
                    FavoriteItemsList.splice(j, 1)
                }
            }
            var g = [];
            for (var l in FavoriteItemsList) {
                if (FavoriteItems.canDisplayed(FavoriteItemsList[l])) {
                    g.push(FavoriteItemsList[l])
                }
            }
            if (CustomerData != null && CustomerData.favItems != null) {
                CustomerData.favItems = FavoriteItemsList
            }
            if (typeof(userLogin.customerData.favItems) !== "undefined" && userLogin.customerData.favItems != null) {
                userLogin.customerData.favItems = FavoriteItemsList
            }
            if (jQuery.isEmptyObject(g)) {
                $(k.pagesContainer).html(k.pages.FavoriteItems_Empty)
            } else {
                k.itemsViewer.dataItems = g;
                k.itemsViewer.Update();
                adjustMenuItemsPositions();
                activateAppropriateEvent()
            }
            alert("Item deleted successfully")
        } else {
            if (h != null) {
                alert(h.message, 170, 400)
            }
        }
    }, this)
};
FavoriteItems.LoadFavoriteItems = function(a) {
    if (!ValidateLogin()) {
        if (a != null) {
            a(false)
        }
        return false
    }
    serverQuery("/Handlers/FavoriteMenu.ashx", {
        action: "getfavoriteitems"
    }, function(d, b, c) {
        if (d && b.valid == true) {
            var e = b.ItemsList;
            FavoriteItemsList = [];
            for (var f in e) {
                FavoriteItemsList.push(e[f])
            }
            if (a != null) {
                a(true)
            }
        } else {
            if (a != null) {
                a(false)
            }
        }
    }, this)
};
FavoriteItems.AddItemToFavorite = function(a, e) {
    var c = [];
    if (!ValidateLogin()) {
        return
    }
    if (a.DealID > 0) {
        DealItemsSent.push(cloneObject(a));
        var b = true;
        if (e) {
            for (var d in DealItemsSent) {
                if (!this.isItemInFavoriteByCRC(DealItemsSent[d])) {
                    b = false;
                    DealItemsSent = changeDealID(DealItemsSent);
                    break
                }
            }
            if (b) {
                DealItemsSent = [];
                return
            }
            c = DealItemsSent
        } else {
            return
        }
    } else {
        if (this.isItemInFavoriteByCRC(a)) {
            return
        }
        c.push(a)
    }
    FavoriteItems.PostFavoriteToServer(c);
    DealItemsSent = []
};

function changeDealID(c) {
    var a = genDealBookmark();
    for (var f in c) {
        var b = dealNumber_extract(c[f]["DealID"]);
        b.bookmark = a;
        c[f]["DealID"] = dealNumber_combine(b.dealID, b.stepNumber, b.bookmark);
        for (var d in c[f].modGroupsItems) {
            var e = c[f].modGroupsItems[d];
            var b = dealNumber_extract(e.DealID);
            b.bookmark = a;
            e.DealID = dealNumber_combine(b.dealID, b.stepNumber, b.bookmark)
        }
    }
    return c
}
FavoriteItems.PostFavoriteToServer = function(a) {
    var d = 0;
    for (var b in a) {
        var c = a[b];
        serverQuery("/Handlers/FavoriteMenu.ashx", {
            action: "postfavoriteitem",
            itemname: c.Name,
            item: c
        }, function(g, e, f) {
            d++;
            if (g && e.status == true) {
                var h = e.itemNumber;
                FavoriteItemsList.push(e.item);
                if (a.length > 1 && a.length == d) {
                    alert("The item is saved to favorite successfully");
                    if (CustomerData != null && CustomerData.favItems != null) {
                        CustomerData.favItems = FavoriteItemsList
                    }
                } else {
                    if (a.length == 1) {
                        alert("The item is saved to favorite successfully");
                        if (CustomerData != null && CustomerData.favItems != null) {
                            CustomerData.favItems = FavoriteItemsList
                        }
                    }
                }
                googleTag.push({
                    event: "Add To Favorite",
                    Category: "Shopping Cart",
                    ElementType: "",
                    ID: "",
                    Name: ""
                })
            } else {
                if (e != null) {
                    alert(e.message, 170, 400)
                }
            }
        }, null)
    }
};

function FavoriteMenu() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.FavoriteOrders = null;
    this.onClose = null;
    this.activeOrder = null;
    this.oldActiveItem = null;
    this.InactiveBackground = null;
    this.ActiveBackground = null;
    this.Show = function() {
        setFloatingWindowStyle(1);
        googleTag.push({
            event: "PageView",
            PageName: "Favorite Orders",
            PageURL: "/favoritesorders"
        });
        googleTag.push({
            event: "Open",
            Category: "Favorite Orders",
            ElementType: "",
            ID: "",
            Name: ""
        });
        var a = this.pages.FavoriteOrders_Main;
        $(this.pagesContainer).html(a);
        $("#favorite_close").data("owner", this);
        $("#favorite_close").click(function() {
            $(this).data("owner").onClose()
        });
        this.loadOrders()
    };
    this.Close = function() {
        if (this.onClose != null) {
            this.onClose()
        }
    };
    this.loadOrders = function() {
        if (this.FavoriteOrders != null) {
            this.FillFavoriteOrders();
            return
        }
        serverQuery("/Handlers/FavoriteMenu.ashx", {
            action: "getfavoriteorders"
        }, function(d, a, c) {
            if (d && a.valid == true) {
                var b = a.OrdersList;
                c.FavoriteOrders = [];
                for (var e in b) {
                    c.FavoriteOrders[c.FavoriteOrders.length] = b[e]
                }
                c.FavoriteOrders.sort(function(g, f) {
                    return f.OrderID - g.OrderID
                });
                c.FillFavoriteOrders()
            } else {
                alert("Try again")
            }
        }, this)
    };
    this.FillFavoriteOrders = function() {
        if (this.afterShowPage != null) {
            this.afterShowPage()
        }
        var h = this.pages.FavoriteOrders_Order;
        this.ActiveBackground = $("#favoriteorder_checkview").css("backgroundColor");
        $("#favoriteorder_container").empty();
        var p = 0;
        for (var j in this.FavoriteOrders) {
            var e = this.FavoriteOrders[j];
            var o = createUUID();
            var b = createUUID();
            var f = createUUID();
            var d = createUUID();
            var m = createUUID();
            var c = createUUID();
            var r = createUUID();
            var a = createUUID();
            var q = createUUID();
            var s = h;
            var l = e.Address.toString().trim();
            for (var k in userLogin.customerData.Addresses) {
                if (userLogin.customerData.Addresses[k]["ID"] == l) {
                    l = userLogin.customerData.Addresses[k]["Name"];
                    break
                }
            }
            s = s.replace(/#FAV_ORDERID#/gi, f.toString().trim());
            s = s.replace(/#FAV_ORDERID_DET#/gi, c.toString().trim());
            s = s.replace(/#FAV_ORDERID_DET_WRAPPER#/gi, r.toString().trim());
            s = s.replace(/#FAV_ORDERID_LEFT_ARROW_IMG#/gi, a.toString().trim());
            s = s.replace(/#FAV_ORDERID_DOWN_ARROW_IMG#/gi, q.toString().trim());
            s = s.replace(/#FAV_ORDER_DELETE#/gi, d.toString().trim());
            s = s.replace(/#FAV_ORDER_REORDER#/gi, m.toString().trim());
            s = s.replace(/#FAV_ORDER_REORDER_URL#/gi, genActionLink({
                owner: this,
                cart: e.cart,
                StoreMenuTemplateID: e.StoreMenuTemplateID
            }, function(v) {
                var u = v.cart;
                var t = v.owner;
                ChangeMenuTemplate(v.StoreMenuTemplateID, function() {
                    reorderCheck(u)
                });
                t.Close()
            }));
            s = s.replace(/#ORDERID#/gi, e.OrderID.toString().trim());
            s = s.replace(/#ORDERNAME#/gi, e.OrderName.toString().trim());
            s = s.replace(/#ORDERTIME#/gi, ConvertDateServerDate(e.OrderTime).format("yyyy-mm-dd hh:MM TT").toString().trim());
            s = s.replace(/#TOTAL#/gi, getCheckTotal(e).toString().trim() + CurrencySymbol);
            s = s.replace(/#ADDRESS#/gi, l);
            var g = e.OrderTitle.toString().trim();
            if (g.length > 55) {
                s = s.replace(/#ORDER_TITLE_SLICED#/gi, g.slice(0, 55) + "...")
            } else {
                s = s.replace(/#ORDER_TITLE_SLICED#/gi, g)
            }
            s = s.replace(/#ORDER_TITLE#/gi, g);
            $("#favoriteorder_container").append($(s));
            $("#" + f).data("cart", e);
            $("#" + f).data("owner", this);
            $("#" + f).data("detailWrapper", $("#" + r));
            $("#" + f).data("detailWrapperLeftArrow", $("#" + a));
            $("#" + f).data("detailWrapperDownArrow", $("#" + q));
            $("#" + f).data("orderWrapper", $("#" + e.OrderID.toString().trim()));
            $("#" + c).html(drawCartItemsAsHTML(e.cart, {
                itemGroupTemplate: "FavoriteOrders_CartItemGroup",
                itemTemplate: "FavoriteOrders_CartItem",
                itemDetTemplate: "FavoriteOrders_CartItemDetail",
                itemTemplateEmpty: "FavoriteOrders_CartItemEmpty"
            }));
            $("#" + c).find("img").each(function() {
                this.onerror = function() {
                    ReplaceMissingImage(this)
                }
            });
            $("#" + f).data("detailWrapper").hide();
            $("#" + f).data("detailWrapperLeftArrow").show();
            $("#" + f).data("detailWrapperDownArrow").hide();
            $("#" + f).click(function() {
                if ($(this).data("owner").oldActiveItem == null) {
                    $(this).data("owner").InactiveBackground = $(this).css("backgroundColor")
                }
                if ($(this).data("owner").oldActiveItem != null) {
                    $(this).data("owner").oldActiveItem.css("backgroundColor", $(this).data("owner").InactiveBackground)
                }
                $(this).data("owner").oldActiveItem = $(this);
                $(this).css("backgroundColor", $(this).data("owner").ActiveBackground);
                $(this).data("owner").showCart($(this).data("cart"));
                if (!$(this).data("detailWrapper").is(":visible")) {
                    $(this).data("detailWrapper").show();
                    $(this).data("detailWrapperLeftArrow").hide();
                    $(this).data("detailWrapperDownArrow").show();
                    $(this).data("orderWrapper").addClass("active")
                } else {
                    $(this).data("detailWrapper").hide();
                    $(this).data("detailWrapperLeftArrow").show();
                    $(this).data("detailWrapperDownArrow").hide();
                    $(this).data("orderWrapper").removeClass("active")
                }
            });
            $("#" + d).data("cart", e);
            $("#" + d).data("owner", this);
            $("#" + d).click(function() {
                confirm("Are you sure you want to remove this order from favourite", {
                    owner: $(this).data("owner"),
                    cart: $(this).data("cart")
                }, function(u, t) {
                    if (u) {
                        t.owner.deleteCart(t.cart);
                        googleTag.push({
                            event: "Delete Order",
                            Category: "Favorite Orders",
                            ElementType: "",
                            ID: "",
                            Name: ""
                        })
                    }
                });
                return false
            });
            $("#" + m).data("cart", e);
            $("#" + m).data("owner", this);
            $("#" + m).click(function() {
                if ($(this).data("owner").activeOrder == null) {
                    return
                }
                var t = $(this).data("owner");
                var u = $(this).data("cart");
                var v = u.cart.length;
                ChangeMenuTemplate(u.StoreMenuTemplateID, function() {
                    reorderCheck(u.cart)
                });
                t.Close();
                googleTag.push({
                    event: "Reorder",
                    Category: "Favorite Orders",
                    ElementType: "",
                    ID: "",
                    Name: ""
                });
                return false
            });
            if (p == 0) {
                $("#" + f).click()
            }
            p++;
            if (p >= HistoryMaximumOrders) {
                break
            }
        }
        if (p == 0) {
            $("#favoriteorder_container").append($(this.pages.FavoriteOrders_EmptyOrder));
            if (!showEmptyForms) {
                this.Close();
                alert("Sorry, we did not find any orders.");
                return
            }
        }
        $("#reorder").data("owner", this);
        $("#reorder").click(function() {
            if ($(this).data("owner").activeOrder == null) {
                return
            }
            reorderCheck($(this).data("owner").activeOrder);
            $(this).data("owner").Close()
        })
    };
    this.showCart = function(a) {
        this.activeOrder = a.cart;
        if ($("#favoriteorder_checkview").length > 0) {
            $("#favoriteorder_checkview").html(drawCartItemsAsHTML(a.cart, {
                itemTemplate: "FavoriteOrders_CartItem",
                itemDetTemplate: "FavoriteOrders_CartItemDetail",
                basketTotalUI: $("#favoriteorder_checktotal")
            }))
        }
    };
    this.deleteCart = function(a) {
        serverQuery("/Handlers/FavoriteMenu.ashx", {
            action: "deletefavoriteorder",
            ordername: a.OrderName,
            orderid: a.OrderID
        }, function(d, b, c) {
            if (d && b.status == true) {
                c.FavoriteOrders = null;
                c.loadOrders();
                userLogin.customerData = b.customer;
                alert("Order deleted successfully")
            } else {
                if (b != null) {
                    alert(b.message, 170, 400)
                }
            }
        }, this)
    }
}

function saveOrderToFavorite() {
    if (!ValidateLogin()) {
        return
    }
    if (cart.cartData == null || cart.cartData.length == 0) {
        alert("Can't save empty cart");
        return
    }
    var a = HTML_Pages.FavoriteOrders_OrderName;
    var b = new PopupForm();
    b.width = 300;
    b.height = 100;
    b.borderColor = "#8fe3b6";
    b.backgroundColor = "rgb(0, 101, 45)";
    b.borderWidth = 1;
    b.container.html(a);
    b.container.addClass("favPopup");
    $("#btnOkFavOrderName").data("popup", b);
    $("#btnOkFavOrderName").click(function() {
        var c = $("#txtFavOrderName").val();
        if (c == "") {
            alert("Please fill order name");
            return
        }
        serverQuery("/Handlers/FavoriteMenu.ashx", {
            action: "postfavoriteorder",
            ordername: c,
            cart: cart.cartData,
            MenuTemplateID: cart.cartHeader.MenuTemplateID,
            StoreID: cart.cartHeader.StoreID,
            AddressID: cart.cartHeader.AddressID,
            OrderMode: cart.cartHeader.DelivaryOrTakeout
        }, function(g, e, f) {
            f.Close();
            if (g && e.status == true) {
                var d = e.orderNumber;
                userLogin.customerData = e.customer;
                if (typeof welMsg !== "undefined" && welMsg != null) {
                    welMsg.FillSliders(userLogin.customerData)
                }
                alert("The cart is saved to favorite successfully");
                googleTag.push({
                    event: "Add To Favorite",
                    Category: "Shopping Cart",
                    ElementType: "",
                    ID: "",
                    Name: ""
                })
            } else {
                if (e != null) {
                    alert(e.message, 170, 400)
                }
            }
        }, $(this).data("popup"))
    });
    $("#btnCancelFavOrderName").data("popup", b);
    $("#btnCancelFavOrderName").click(function() {
        $(this).data("popup").Close()
    });
    b.Show();
    $("#txtFavOrderName").focus()
}(function(a) {
    a.fn.formValidator = function(b) {
        return this.each(function() {
            var c = new FormValidator(this, b.fields);
            c.onShowValidateMessage = b.onShowValidateMessage
        })
    }
})(jQuery);

function FormValidator(c, b, a) {
    this.fields = [];
    this.form = null;
    this.onShowValidateMessage = null;
    this.init = function() {
        this.form.data("validator", this);
        this.form.submit(function() {
            return $(this).data("validator").isValid()
        });
        for (var d in this.fields) {
            var e = this.fields[d];
            $("#" + d).data("validator", this);
            $("#" + d).data("validatorID", d);
            var f = $("#" + d);
            if (typeof(a) !== "undefined") {
                f = $("#" + a[d]);
                f.data("validator", this);
                f.data("validatorID", d)
            }
            if (f.css("display") == "none") {
                f = $(f).next();
                f.data("validator", this);
                f.data("validatorID", d)
            }
            f.focusout(function() {
                $(this).data("validator").validateField($(this).data("validatorID"), false)
            })
        }
    };
    this.showValidateMessage = function(g, d, e, f, h) {
        if (this.onShowValidateMessage != null) {
            this.onShowValidateMessage(g, d, e, f, h)
        } else {
            alert(message)
        }
    };
    this.isFieldValid = function(o, g, l) {
        var h = true;
        var j = $("#" + o);
        if (typeof(a) !== "undefined") {
            j = $("#" + a[o])
        }
        var f = this.fields[o];
        var k = j.val();
        var e = "";
        if (j.is(":disabled")) {
            l(true, "", this, o, g);
            return
        }
        if (typeof(f) !== "undefined") {
            if (typeof f.required !== "undefined" && f.required) {
                if (k == "" || k == null || k == -1) {
                    h = false;
                    e = f.requiredMsg;
                    l(h, e, this, o, g);
                    return
                }
            }
            if (typeof f.email !== "undefined" && f.email) {
                var m = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!m.test(k)) {
                    h = false;
                    e = f.emailMsg;
                    l(h, e, this, o, g);
                    return
                }
            }
            if (typeof f.mask !== "undefined" && f.mask != "") {
                var m = new RegExp(f.mask);
                m.test(k);
                if (!m.test(k)) {
                    h = false;
                    e = f.maskMsg;
                    l(h, e, this, o, g);
                    return
                }
            }
            if (typeof f.equalTo !== "undefined" && f.equalTo != "") {
                var d = $(f.equalTo).val();
                if (d != k) {
                    h = false;
                    e = f.equalToMsg;
                    l(h, e, this, o, g);
                    return
                }
            }
            if (typeof f.customValidation !== "undefined") {
                f.customValidation(o, {
                    validator: this,
                    fieldID: o,
                    callbackParam: g
                }, function(q, p, r) {
                    l(q, p, r.validator, r.fieldID, r.callbackParam)
                });
                return
            }
        }
        l(true, "", this, o, g)
    };
    this.validateField = function(d, f) {
        var e = this.fields[d];
        if (typeof(e) !== "undefined") {
            this.isFieldValid(d, {
                fieldData: e,
                isPost: f
            }, function(j, l, h, g, k) {
                h.onShowValidateMessage(j, g, k.fieldData, l, k.isPost)
            })
        }
    };
    this.isValid = function(g) {
        var f = true;
        var e = 0;
        for (var d in this.fields) {
            e = e + 1
        }
        for (var d in this.fields) {
            this.isFieldValid(d, null, function(k, m, j, h, l) {
                e = e - 1;
                if (!k) {
                    f = false
                }
                if (e == 0) {
                    g(f)
                }
            })
        }
    };
    this.ValidateBeforePostQueue = function(e) {
        if (this.validationQueue.length == 0) {
            e()
        } else {
            var d = this.validationQueue.pop();
            this.isFieldValid(d, e, function(h, k, g, f, j) {
                if (!h) {
                    g.validateField(f, true)
                } else {
                    g.ValidateBeforePostQueue(j)
                }
            })
        }
    };
    this.ValidateBeforePost = function(f) {
        var e = true;
        this.validationQueue = [];
        for (var d in this.fields) {
            if ($("#" + d).length > 0) {
                this.validationQueue.push(d)
            }
        }
        this.validationQueue = this.validationQueue.reverse();
        this.ValidateBeforePostQueue(f)
    };
    this.form = $(c);
    this.fields = b;
    this.init()
}

function HistoryOrders() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.HistoryOrders = null;
    this.onClose = null;
    this.activeOrder = null;
    this.oldActiveItem = null;
    this.InactiveBackground = null;
    this.ActiveBackground = null;
    this.Show = function() {
        googleTag.push({
            event: "PageView",
            PageName: "History Orders",
            PageURL: "/lastorders"
        });
        googleTag.push({
            event: "Open",
            Category: "History Orders",
            ElementType: "",
            ID: "",
            Name: ""
        });
        setFloatingWindowStyle(1);
        var a = this.pages.HistoryOrders_Main;
        $(this.pagesContainer).html(a);
        $("#history_close").data("owner", this);
        $("#history_close").click(function() {
            $(this).data("owner").onClose()
        });
        this.loadOrders()
    };
    this.Close = function() {
        if (this.onClose != null) {
            this.onClose()
        }
    };
    this.loadOrders = function() {
        if (this.HistoryOrders != null) {
            this.FillHistoryOrders();
            return
        }
        serverQuery("/Handlers/HistoryOrders.ashx", {
            action: "gethistoryorders"
        }, function(d, a, c) {
            if (d && a.valid == true) {
                var b = a.OrdersList;
                c.HistoryOrders = [];
                for (var e in b) {
                    c.HistoryOrders[c.HistoryOrders.length] = b[e]
                }
                c.HistoryOrders.sort(function(g, f) {
                    return f.OrderID - g.OrderID
                });
                c.FillHistoryOrders()
            } else {
                alert("Try again")
            }
        }, this)
    };
    this.FillHistoryOrders = function() {
        if (this.afterShowPage != null) {
            this.afterShowPage()
        }
        var h = this.pages.HistoryOrders_Order;
        this.ActiveBackground = $("#historyorder_checkview").css("backgroundColor");
        var p = 0;
        for (var j in this.HistoryOrders) {
            var d = this.HistoryOrders[j];
            var m = createUUID();
            var b = createUUID();
            var f = createUUID();
            var o = createUUID();
            var c = createUUID();
            var r = createUUID();
            var a = createUUID();
            var q = createUUID();
            var s = h;
            var l = d.Address.toString();
            for (var k in userLogin.customerData.Addresses) {
                if (userLogin.customerData.Addresses[k]["ID"] == l) {
                    l = userLogin.customerData.Addresses[k]["Name"];
                    break
                }
            }
            var e = d.OrderMode.toString().trim();
            if (e == "Take away") {
                l = d.StoreName.toString().trim()
            }
            s = s.replace(/#ORDERMODE#/gi, Translate(e));
            s = s.replace(/#HIS_ORDERID#/gi, f.toString().trim());
            s = s.replace(/#HIS_ORDER_REORDER#/gi, o.toString().trim());
            s = s.replace(/#HIS_ORDER_REORDER_URL#/gi, genActionLink({
                owner: this,
                cart: d.cart,
                StoreMenuTemplateID: d.StoreMenuTemplateID
            }, function(v) {
                var u = v.cart;
                var t = v.owner;
                googleTag.push({
                    event: "Reorder",
                    Category: "History Orders",
                    ElementType: "",
                    ID: "",
                    Name: ""
                });
                ChangeMenuTemplate(v.StoreMenuTemplateID, function() {
                    reorderCheck(u)
                });
                t.Close()
            }));
            s = s.replace(/#HIS_ORDER_FEEDBACK_URL#/gi, genActionLink({
                orderID: d.OrderID
            }, function(t) {
                showContactUs(t.orderID)
            }));
            s = s.replace(/#HIS_ORDERID_DET#/gi, c.toString().trim());
            s = s.replace(/#HIS_ORDERID_DET_WRAPPER#/gi, r.toString().trim());
            s = s.replace(/#HIS_ORDERID_LEFT_ARROW_IMG#/gi, a.toString().trim());
            s = s.replace(/#HIS_ORDERID_DOWN_ARROW_IMG#/gi, q.toString().trim());
            s = s.replace(/#ORDERID#/gi, d.OrderID.toString().trim());
            s = s.replace(/#ORDERTIME#/gi, ConvertDateServerDate(d.OrderTime).format("mmmm dd, yyyy").toString().trim());
            s = s.replace(/#TOTAL#/gi, getCheckTotal(d).toString().trim() + CurrencySymbol);
            s = s.replace(/#ADDRESS#/gi, l);
            s = s.replace(/#STATUS#/gi, d.StatusName != null ? d.StatusName.toString().trim() : "");
            s = s.replace(/#CANCEL_REASON#/gi, d.CancelReason != null ? d.CancelReason.toString().trim() : "");
            s = s.replace(/#PAY_METHOD#/gi, Translate(d.PaymentMethod.toString().trim()));
            s = s.replace(/#DELIVERY_TIME#/gi, d.DelivaryType.toString().trim() + (d.DelivaryTime.toString().trim() == "" ? "" : " - " + d.DelivaryTime.toString().trim()));
            s = s.replace(/#ORDER_NOTE#/gi, d.OrderNote.toString().trim());
            var g = d.OrderTitle.toString().trim();
            if (g.length > 55) {
                s = s.replace(/#ORDER_TITLE_SLICED#/gi, g.slice(0, 55) + "...")
            } else {
                s = s.replace(/#ORDER_TITLE_SLICED#/gi, g)
            }
            s = s.replace(/#ORDER_TITLE#/gi, g);
            $("#historyorder_container").append($(s));
            $("#" + f).data("cart", d);
            $("#" + f).data("owner", this);
            $("#" + f).data("detailWrapper", $("#" + r));
            $("#" + f).data("detailWrapperLeftArrow", $("#" + a));
            $("#" + f).data("detailWrapperDownArrow", $("#" + q));
            $("#" + f).data("orderWrapper", $("#" + d.OrderID.toString().trim()));
            $("#" + c).html(drawCartItemsAsHTML(d.cart, {
                itemGroupTemplate: "HistoryOrders_CartItemGroup",
                itemTemplate: "HistoryOrders_CartItem",
                itemDetTemplate: "HistoryOrders_CartItemDetail",
                itemTemplateEmpty: "HistoryOrders_CartItemEmpty"
            }));
            $("#" + c).find("img").each(function() {
                this.onerror = function() {
                    ReplaceMissingImage(this)
                }
            });
            $("#" + f).data("detailWrapper").hide();
            $("#" + f).data("detailWrapperLeftArrow").show();
            $("#" + f).data("detailWrapperDownArrow").hide();
            $("#" + f).click(function() {
                if ($(this).data("owner").oldActiveItem == null) {
                    $(this).data("owner").InactiveBackground = $(this).css("backgroundColor")
                }
                if ($(this).data("owner").oldActiveItem != null) {
                    $(this).data("owner").oldActiveItem.css("backgroundColor", $(this).data("owner").InactiveBackground)
                }
                $(this).data("owner").oldActiveItem = $(this);
                $(this).css("backgroundColor", $(this).data("owner").ActiveBackground);
                $(this).data("owner").showCart($(this).data("cart"));
                if (!$(this).data("detailWrapper").is(":visible")) {
                    $(this).data("detailWrapper").show();
                    $(this).data("detailWrapperLeftArrow").hide();
                    $(this).data("detailWrapperDownArrow").show();
                    $(this).data("orderWrapper").addClass("active")
                } else {
                    $(this).data("detailWrapper").hide();
                    $(this).data("detailWrapperLeftArrow").show();
                    $(this).data("detailWrapperDownArrow").hide();
                    $(this).data("orderWrapper").removeClass("active")
                }
            });
            $("#" + o).data("cart", d);
            $("#" + o).data("owner", this);
            $("#" + o).click(function() {
                var t = $(this).data("cart")["cart"];
                ChangeMenuTemplate($(this).data("cart")["StoreMenuTemplateID"], function() {
                    reorderCheck(t)
                });
                $(this).data("owner").Close()
            });
            if (p == 0) {
                $("#" + f).click()
            }
            p++;
            if (p >= HistoryMaximumOrders) {
                break
            }
        }
        if (p == 0) {
            $("#historyorder_container").append($(this.pages.HistoryOrders_EmptyOrder))
        }
        $("#reorder").data("owner", this);
        $("#reorder").click(function() {
            if ($(this).data("owner").activeOrder == null) {
                return
            }
            var t = $(this).data("owner").activeOrder;
            ChangeMenuTemplate(t.StoreMenuTemplateID, function() {
                reorderCheck(t)
            });
            $(this).data("owner").Close();
            googleTag.push({
                event: "Reorder",
                Category: "History Orders",
                ElementType: "",
                ID: "",
                Name: ""
            })
        });
        if (p > 0) {} else {
            if (!showEmptyForms) {
                this.Close();
                alert("Sorry, we did not find any recent orders.");
                return
            }
        }
    };
    this.showCart = function(a) {
        this.activeOrder = a.cart;
        $("#historyorder_checkview").html(drawCartItemsAsHTML(a.cart, {
            itemTemplate: "HistoryOrders_CartItem",
            itemDetTemplate: "HistoryOrders_CartItemDetail",
            basketTotalUI: $("#historyorder_checktotal")
        }))
    }
}
"use strict";

function ItemInformation() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.onOK = null;
    this.item = null;
    this.isdialog = false;
    this.Init = function() {
        var a = GoogleTrack_getItemEnName(item.ID);
        googleTag.push({
            event: "PageView",
            PageName: "Item Information",
            PageURL: "Order/Item/" + a
        });
        googleTag.push({
            event: "Open",
            Category: "Item Information",
            ElementType: "Item",
            ID: item.ID,
            Name: a
        });
        if (!this.isdialog) {
            if (this.beforeShowPage != null) {
                this.beforeShowPage()
            }
        } else {
            this.popupObj = new PopupForm();
            this.popupObj.width = 600;
            this.popupObj.height = 400
        }
        var d = this.pages.ItemInformation_Main;
        var h = this.item;
        var g = h.ImageName + ".jpg";
        if (g == ".jpg") {
            g = "itm" + strPadLeft("0", 6, h.ID.toString()) + ".jpg"
        }
        d = d.replace(/#NAME#/gi, h.Name);
        d = d.replace(/#IMG#/gi, "Menu" + CurrentMenuTemplateID + "/" + g);
        d = d.replace(/#PRICE#/gi, h.Price > 0 ? h.Price + CurrencySymbol : "");
        var e = "";
        if (typeof h.Description !== "undefined" && h.Description != null) {
            e = h.Description
        }
        var f = "";
        if (typeof h.Recipe !== "undefined" && h.Recipe != null) {
            f = h.Recipe
        }
        var c = "";
        if (typeof h.Nutritions !== "undefined" && h.Nutritions != null) {
            c = h.Nutritions
        }
        d = d.replace(/#DESCRIPTION#/gi, e);
        d = d.replace(/#RECEIPE#/gi, f);
        d = d.replace(/#NUTRITIONS#/gi, c);
        d = d.replace(/#ADDTOCART#/gi, genActionLink({
            ctrlr: this,
            btn: "addToCart",
            itm: h
        }, this.itemClick));
        d = d.replace(/#CUSTOMIZE#/gi, genActionLink({
            ctrlr: this,
            btn: "customize",
            itm: h
        }, this.itemClick));
        d = d.replace(/#ADDTOCART_VISIBILITY#/gi, (IsItemCustomizable(h)["canAdd"]) ? "inline-block" : "none");
        d = d.replace(/#CUSTOMIZE_VISIBILITY#/gi, (IsItemCustomizable(h)["canCustomize"]) ? "inline-block" : "none");
        var b = createUUID();
        d = d.replace(/#ITEMINFO_CLOSE#/gi, b);
        if (!this.isdialog) {
            $(this.pagesContainer).html(d);
            $("#" + b).hide()
        } else {
            this.popupObj.container.html(d)
        }
        if ($("#ITMDLGINFO").length > 0) {
            $("#ITMDLGINFO").get(0).onerror = function() {
                ReplaceMissingImage(this)
            }
        }
        $("#" + b).data("ctrlr", this);
        $("#" + b).click(function() {
            if ($(this).data("ctrlr").isdialog) {
                $(this).data("ctrlr").popupObj.Close()
            } else {
                $(this).data("ctrlr").onOK()
            }
            return false
        });
        if (!this.isdialog) {
            if (this.afterShowPage != null) {
                this.afterShowPage()
            }
        } else {
            this.popupObj.Show()
        }
        UpdateScrolls()
    };
    this.itemClick = function(a) {
        if (a.btn == "addToCart") {
            if (typeof a.ctrlr !== "undefined") {
                if (typeof a.ctrlr["addItemToCart"] !== "undefined") {
                    a.ctrlr.addItemToCart(a.itm);
                    if (a.ctrlr.isdialog) {
                        a.ctrlr.popupObj.Close()
                    }
                }
            }
        } else {
            if (a.btn == "customize") {
                if (typeof a.ctrlr !== "undefined") {
                    if (typeof a.ctrlr["customizeItem"] !== "undefined") {
                        a.ctrlr.customizeItem(a.itm);
                        if (a.ctrlr.isdialog) {
                            a.ctrlr.popupObj.Close()
                        }
                    }
                }
            }
        }
    }
}

function LoginWindow() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.Show = function() {
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        var a = this.pages.LoginWindow;
        $(this.pagesContainer).html(a);
        userLogin.drawInlineLoginBlock($("#loginContent").get(0), function() {
            closeFloatPerm()
        });
        if (this.afterShowPage != null) {
            this.afterShowPage()
        }
    }
}(function(b) {
    var a = ["Width", "Height"],
        c;
    while (c = a.pop()) {
        (function(d, e) {
            b.fn[d] = (d in new Image()) ? function() {
                return this[0][d]
            } : function() {
                var g = this[0],
                    f, h;
                if (g.tagName.toLowerCase() === "img") {
                    f = new Image();
                    f.src = g.src, h = f[e]
                }
                return h
            }
        }("natural" + c, c.toLowerCase()))
    }
}(jQuery));
"use strict";

function Navigator() {
    this.container = null;
    this.Count = 0;
    this.columnsPerPage = 4;
    this.value = 0;
    this.screenWidth = 0;
    this.screenHeight = 0;
    this.steps = {};
    this.smallSize = true;
    this.removeOneItem = true;
    this.init = function() {
        if (this.columnsPerPage == 1) {
            this.removeOneItem = false
        }
        this.scrollCarrier = $("<div>");
        this.scrollCarrier.css("position", "absolute");
        if (!this.smallSize) {
            this.scrollCarrier.css("height", "40px")
        } else {
            this.scrollCarrier.css("height", "30px")
        }
        this.scrollCarrier.css("left", "0px");
        this.scrollCarrier.css("right", "0px");
        this.scrollCarrier.css("top", "0px");
        $(this.container).append(this.scrollCarrier);
        this.scrollOpacity = $("<div>");
        this.scrollOpacity.css("position", "absolute");
        this.scrollOpacity.css("left", "-10px");
        this.scrollOpacity.css("right", "-10px");
        this.scrollOpacity.css("bottom", "0px");
        this.scrollOpacity.css("top", "0px");
        this.scrollOpacity.css("background-color", "gray");
        this.scrollOpacity.css("opacity", "0.5");
        this.scrollOpacity.css("filter", "alpha(opacity=50");
        this.scrollOpacity.css("border-radius", "15px");
        this.scrollOpacity.css("box-shadow", "3px 3px 3px darkgray");
        this.scrollCarrier.append(this.scrollOpacity);
        this.scrollLine = $("<div>");
        this.scrollLine.css("background-color", "#e1dddb");
        this.scrollLine.css("position", "absolute");
        this.scrollLine.css("left", "10px");
        this.scrollLine.css("right", "10px");
        if (!this.smallSize) {
            this.scrollLine.css("height", "10px");
            this.scrollLine.css("top", "15px")
        } else {
            this.scrollLine.css("height", "6px");
            this.scrollLine.css("top", "12px")
        }
        this.scrollLine.css("box-shadow", "3px 3px 3px darkgray");
        this.scrollCarrier.append(this.scrollLine);
        this.stepLeft = $("<div>");
        this.stepLeft.css("position", "absolute");
        if (!this.smallSize) {
            this.stepLeft.css("background-image", "url(/Images/SharedImages/step.png)");
            this.stepLeft.css("width", "30px");
            this.stepLeft.css("height", "30px")
        } else {
            this.stepLeft.css("background-image", "url(/Images/SharedImages/step_s.png)");
            this.stepLeft.css("width", "21px");
            this.stepLeft.css("height", "21px")
        }
        this.stepLeft.css("left", "0px");
        this.stepLeft.css("top", "5px");
        this.stepLeft.css("cursor", "pointer");
        this.stepLeft.data("owner", this);
        if (!this.smallSize) {
            this.stepLeft.html("<img id='back_nav_arrow_left' src='/Images/SharedImages/arrow_left.png' style='float:left;margin-left:5px;margin-top:6px;cursor:pointer;' />")
        } else {
            this.stepLeft.html("<img id='back_nav_arrow_left' src='/Images/SharedImages/arrow_left_s.png' style='float:left;margin-left:3px;margin-top:4px;cursor:pointer;' />")
        }
        this.stepLeft.click(function() {
            $(this).data("owner").clickLeft()
        });
        this.scrollCarrier.append(this.stepLeft);
        this.stepRight = $("<div>");
        this.stepRight.css("position", "absolute");
        if (!this.smallSize) {
            this.stepRight.css("background-image", "url(/Images/SharedImages/step.png)");
            this.stepRight.css("width", "30px");
            this.stepRight.css("height", "30px")
        } else {
            this.stepRight.css("background-image", "url(/Images/SharedImages/step_s.png)");
            this.stepRight.css("width", "21px");
            this.stepRight.css("height", "21px")
        }
        this.stepRight.css("right", "0px");
        this.stepRight.css("top", "4px");
        this.stepRight.css("cursor", "pointer");
        this.stepRight.data("owner", this);
        if (!this.smallSize) {
            this.stepRight.html("<img id='back_nav_arrow_right' src='/Images/SharedImages/arrow_right.png' style='float:left;margin-left:7px;margin-top:6px;cursor:pointer;' />")
        } else {
            this.stepRight.html("<img id='back_nav_arrow_right' src='/Images/SharedImages/arrow_right_s.png' style='float:left;margin-left:5px;margin-top:4px;cursor:pointer;' />")
        }
        this.stepRight.click(function() {
            $(this).data("owner").clickRight()
        });
        this.scrollCarrier.append(this.stepRight);
        $("#back_nav_arrow_left").data("owner", this);
        $("#back_nav_arrow_left").mouseenter(function() {
            if (!$(this).data("owner").smallSize) {
                $(this).attr("src", "/Images/SharedImages/arrow_left_hover.png")
            } else {
                $(this).attr("src", "/Images/SharedImages/arrow_left_hover_s.png")
            }
        });
        $("#back_nav_arrow_left").mouseleave(function() {
            if (!$(this).data("owner").smallSize) {
                $(this).attr("src", "/Images/SharedImages/arrow_left.png")
            } else {
                $(this).attr("src", "/Images/SharedImages/arrow_left_s.png")
            }
        });
        $("#back_nav_arrow_right").data("owner", this);
        $("#back_nav_arrow_right").mouseenter(function() {
            if (!$(this).data("owner").smallSize) {
                $(this).attr("src", "/Images/SharedImages/arrow_right_hover.png")
            } else {
                $(this).attr("src", "/Images/SharedImages/arrow_right_hover_s.png")
            }
        });
        $("#back_nav_arrow_right").mouseleave(function() {
            if (!$(this).data("owner").smallSize) {
                $(this).attr("src", "/Images/SharedImages/arrow_right.png")
            } else {
                $(this).attr("src", "/Images/SharedImages/arrow_right_s.png")
            }
        });
        this.resize()
    };
    this.clickRight = function() {
        if (!this.removeOneItem) {
            var a = Math.round(this.value / this.columnsPerPage)
        } else {
            var a = Math.round(this.value / (this.columnsPerPage - 1))
        }
        this.clickStep(a + 1)
    };
    this.clickLeft = function() {
        if (!this.removeOneItem) {
            var a = Math.round(this.value / this.columnsPerPage)
        } else {
            var a = Math.round(this.value / (this.columnsPerPage - 1))
        }
        this.clickStep(a - 1)
    };
    this.clearSteps = function() {
        for (var b in this.steps) {
            var a = this.steps[b];
            a.remove()
        }
        this.steps = {}
    };
    this.fillSteps = function() {
        this.clearSteps();
        if (this.columnsPerPage <= 1) {
            this.removeOneItem = false
        } else {
            this.removeOneItem = true
        }
        var a = 0;
        if (!this.removeOneItem) {
            a = Math.ceil(this.Count / this.columnsPerPage)
        } else {
            a = Math.round(this.Count / (this.columnsPerPage - 1))
        }
        var d = (this.screenWidth - (!this.smallSize ? 30 : 20)) / (a + 1);
        var c = d;
        for (var e = 0; e < a; e++) {
            var b = $("<div>");
            if (!this.smallSize) {
                b.css("background-image", "url(/Images/SharedImages/step.png)")
            } else {
                b.css("background-image", "url(/Images/SharedImages/step_s.png)")
            }
            b.css("position", "absolute");
            if (!this.smallSize) {
                b.css("width", "30px");
                b.css("height", "30px")
            } else {
                b.css("width", "21px");
                b.css("height", "21px")
            }
            b.css("left", Math.round(c));
            b.css("top", "5px");
            b.css("cursor", "pointer");
            b.data("owner", this);
            b.data("step_value", e);
            b.click(function() {
                $(this).data("old_img", null);
                $(this).data("owner").clickStep($(this).data("step_value"))
            });
            b.mouseenter(function() {
                var f = $(this).css("background-image");
                $(this).data("old_img", f);
                if (f.indexOf("_active") == -1) {
                    if (!$(this).data("owner").smallSize) {
                        $(this).css("background-image", "url(/Images/SharedImages/step_hover.png)")
                    } else {
                        $(this).css("background-image", "url(/Images/SharedImages/step_hover_s.png)")
                    }
                }
            });
            b.mouseleave(function() {
                var f = $(this).data("old_img");
                if (typeof f !== "undefined" && f != null) {
                    $(this).css("background-image", f)
                }
            });
            this.scrollCarrier.append(b);
            this.steps[e] = b;
            c += d
        }
        this.setValue(this.value)
    };
    this.resize = function() {
        this.screenWidth = $(this.container).width();
        this.screenHeight = $(this.container).height();
        this.fillSteps()
    };
    this.clickStep = function(a) {
        if (!this.removeOneItem) {
            this.setValue(a * this.columnsPerPage)
        } else {
            this.setValue(a * (this.columnsPerPage - 1))
        }
        this.scrollValueChanged(this.value)
    };
    this.setValue = function(a) {
        for (var d in this.steps) {
            var c = this.steps[d];
            if (!this.smallSize) {
                c.css("background-image", "url(/Images/SharedImages/step.png)")
            } else {
                c.css("background-image", "url(/Images/SharedImages/step_s.png)")
            }
        }
        if (a >= (this.Count - this.columnsPerPage)) {
            this.value = this.Count - this.columnsPerPage
        } else {
            if (a < 0) {
                this.value = 0
            } else {
                this.value = a
            }
        }
        if (!this.removeOneItem) {
            var b = Math.ceil(this.value / this.columnsPerPage)
        } else {
            var b = Math.ceil(this.value / (this.columnsPerPage - 1))
        }
        if (typeof this.steps[b] !== "undefined") {
            if (!this.smallSize) {
                this.steps[b].css("background-image", "url(/Images/SharedImages/step_active.png)")
            } else {
                this.steps[b].css("background-image", "url(/Images/SharedImages/step_active_s.png)")
            }
        }
    };
    this.getValue = function() {
        return this.value
    };
    this.scrollValueChanged = function(a) {}
}
var toolTop = null;
var toolLeft = null;

function NotifyTooltip(e, h) {
    if (typeof h === "undefined") {
        var h = e
    }
    this.control = $(h);
    this.orgControl = $(e);
    this.icontype = 0;
    this.msg = "";
    this.notificationWidth = 180;
    this.pageWidth = $("#container_inner").width();
    var a = false;
    this.labelControl = this.control.prev("label");
    if (this.labelControl.length == 0) {
        this.labelControl = this.control.parent().prev().find("label")
    }
    var d = (this.control.offset() && this.control.offset().left ? this.control.offset().left : 0) - ($("#container_inner").offset().left ? $("#container_inner").offset().left : 0) + this.control.width();
    if ((d + this.notificationWidth > this.pageWidth) && (this.labelControl != null && this.labelControl.length > 0)) {
        a = true
    }
    a = false;
    this.tooltipID = createUUID();
    this.msgContentID = createUUID();
    this.msgIconID = createUUID();
    this.msgContentWrapperID = createUUID();
    var c = (!a ? HTML_Pages.notifyToolTip_Right : HTML_Pages.notifyToolTip_Left);
    c = c.replace("#TOOLTIP_ID#", this.tooltipID);
    c = c.replace("#MSG_CONTENT_ID#", this.msgContentID);
    c = c.replace("#MSG_ICON_ID#", this.msgIconID);
    c = c.replace("#MSG_CONTENT_WRAPPER_ID#", this.msgContentWrapperID);
    this.NotificationUI = $(c);
    this.NotificationUI.css("position", "absolute");
    var b = null;
    if (!a) {
        b = this.control.parent()
    } else {
        b = this.labelControl.parent()
    }
    if (b.css("position") == "static") {
        b.css("display", "inline-block");
        b.css("position", "relative")
    }
    b.append(this.NotificationUI);
    $("#" + this.msgContentWrapperID).css("zIndex", getTopmostZIndex() + 5);
    var g = {
        top: 0,
        left: 0
    };
    if (toolLeft !== null && toolTop !== null) {
        g.top = this.control.position().top + this.control.height() + toolTop;
        g.left = this.control.position().left + toolLeft
    } else {
        if (!a) {
            g.top = this.control.position().top - 16;
            g.left = this.control.position().left + this.control.width() + 13
        } else {
            g.top = -10;
            g.left = this.labelControl.position().left - 0
        }
    }
    this.NotificationUI.clearQueue();
    this.NotificationUI.css("zIndex", getTopmostZIndex() + 1);
    this.NotificationUI.css("left", g.left + "px");
    this.NotificationUI.css("top", (g.top - 13) + "px");
    this.NotificationUI.css({
        opacity: 0.9
    });
    this.NotificationUI.addClass("NotificationUI");
    this.orgControl.data("notify_tooltip", this);
    var f = function() {
        var j = $(this).data("notify_tooltip");
        if (typeof j !== "undefined" && j != null) {
            j.hide()
        }
    };
    this.orgControl.focusout(f);
    this.orgControl.bind("input", f);
    this.orgControl.focus(function() {
        var j = $(this).data("notify_tooltip");
        if (typeof j !== "undefined" && j != null) {
            j.show()
        }
    });
    this.update = function(k, j) {
        this.icontype = j;
        this.msg = k;
        if (this.icontype == 0) {
            icon = "/Images/SharedImages/notify_wrong.png"
        } else {
            if (this.icontype == 1) {
                icon = "/Images/SharedImages/notify_success.png"
            } else {
                icon = "/Images/SharedImages/notify_warn.png"
            }
        }
        $("#" + this.msgIconID).attr("src", icon);
        if (this.icontype == 1 || this.msg == null || this.msg == "") {
            $("#" + this.msgContentID).html("");
            $("#" + this.msgContentWrapperID).hide()
        } else {
            $("#" + this.msgContentID).show();
            $("#" + this.msgContentID).html(k)
        }
    };
    this.hide = function() {
        $("#" + this.msgContentWrapperID).hide()
    };
    this.show = function() {
        if (document._lastNotificationCtrl != null) {
            document._lastNotificationCtrl.hide()
        }
        if (!(this.icontype == 1 || this.msg == null || this.msg == "")) {
            $("#" + this.msgContentWrapperID).show()
        }
        $("#" + this.msgContentWrapperID).css("zIndex", getTopmostZIndex() + 5);
        document._lastNotificationCtrl = this
    };
    this.scrollAndShow = function(j, k) {
        this.orgControl.focus();
        scrollToControl(this.control.get(0), null, {
            owner: this
        }, function(l) {
            l.owner.show()
        })
    }
}

function tooltip(e, f, a, d, c) {
    if ($(e).length == 0) {
        alert(f);
        return
    }
    if ($(e).css("display") == "none" && !(useBoxIt && e.is("select"))) {
        e = $(e).next()
    }
    if (useBoxIt && e.is("select")) {
        c = $("#" + e.attr("id") + "SelectBoxItContainer")
    }
    if (typeof c === "undefined" || c == null) {
        c = e
    }
    var b = $(e).data("notify_tooltip");
    if (typeof b === "undefined") {
        b = new NotifyTooltip(e, c)
    }
    b.update(f, a);
    if (typeof d !== "undefined" && d) {
        b.scrollAndShow()
    } else {
        b.show()
    }
}

function OrderTracking() {
    this.useCountDown = false;
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.onClose = null;
    this.StatusList = null;
    this.oldActiveItem = null;
    this.InactiveBackground = null;
    this.ActiveBackground = null;
    this.dontShowOrderGroup = [-1, 4096, 96, 512, 256, 1024, 8192, 100];
    this.receiveOrderGroup = [0];
    this.cookingOrderGroup = [1, 2, 4, 8, 16];
    this.delivaryOrderGroup = [32];
    this.homeOrderGroup = [2048, 64, 128];
    this.loadActiveOrders = function() {
        if (this.ActiveOrders != null) {
            this.FillActiveOrders();
            return
        }
        if (typeof(this.customerid) !== "undefined") {
            serverQuery("/Handlers/OrderTracking.ashx", {
                action: "getorder",
                orderid: this.orderid,
                customerid: this.customerid
            }, function(c, a, b) {
                if (c && a.valid == true) {
                    b.StatusList = [a.orderstatus];
                    b.FillActiveOrders()
                } else {
                    if (a != null && typeof(a.message) !== "undefined") {
                        alert(a.message)
                    } else {
                        alert("Failed to get order info")
                    }
                }
            }, this)
        } else {
            serverQuery("/Handlers/OrderTracking.ashx", {
                action: "getactiveorders"
            }, function(c, a, b) {
                if (c && a.valid == true) {
                    var d = a.StatusList;
                    b.StatusList = [];
                    for (var e in d) {
                        b.StatusList[b.StatusList.length] = d[e]
                    }
                    b.StatusList.sort(function(g, f) {
                        return f.OrderID - g.OrderID
                    });
                    b.FillActiveOrders()
                } else {
                    alert("Try again")
                }
            }, this)
        }
    };
    this.getStatusType = function(a) {
        for (var b in this.receiveOrderGroup) {
            if (this.receiveOrderGroup[b] == a) {
                return "receive"
            }
        }
        for (var b in this.cookingOrderGroup) {
            if (this.cookingOrderGroup[b] == a) {
                return "cooking"
            }
        }
        for (var b in this.delivaryOrderGroup) {
            if (this.delivaryOrderGroup[b] == a) {
                return "delivary"
            }
        }
        for (var b in this.homeOrderGroup) {
            if (this.homeOrderGroup[b] == a) {
                return "home"
            }
        }
        return ""
    };
    this.updateView = function(a) {
        var c = this.getStatusType(a.Status);
        var e = "";
        if (a != null && a != "") {
            e = a.OrderID.toString().trim()
        }
        var b = 1;
        var d = 0.2;
        if (c == "receive" || c == "cooking" || c == "delivary" || c == "home") {
            $("#ordertrack_receive_img_" + e).fadeTo("fast", b);
            $("#ordertrack_receive_title_" + e).fadeTo("fast", b);
            $("#ordertrack_receive_img").fadeTo("fast", b);
            $("#ordertrack_receive_title").fadeTo("fast", b)
        } else {
            $("#ordertrack_receive_img_" + e).fadeTo("fast", d);
            $("#ordertrack_receive_title_" + e).fadeTo("fast", d);
            $("#ordertrack_receive_img").fadeTo("fast", d);
            $("#ordertrack_receive_title").fadeTo("fast", d)
        }
        if (c == "cooking" || c == "delivary" || c == "home") {
            $("#ordertrack_arrow_1_" + e).fadeTo("fast", b);
            $("#ordertrack_cooking_img_" + e).fadeTo("fast", b);
            $("#ordertrack_cooking_title_" + e).fadeTo("fast", b);
            $("#ordertrack_arrow_1").fadeTo("fast", b);
            $("#ordertrack_cooking_img").fadeTo("fast", b);
            $("#ordertrack_cooking_title").fadeTo("fast", b)
        } else {
            $("#ordertrack_arrow_1_" + e).fadeTo("fast", d);
            $("#ordertrack_cooking_img_" + e).fadeTo("fast", d);
            $("#ordertrack_cooking_title_" + e).fadeTo("fast", d);
            $("#ordertrack_arrow_1").fadeTo("fast", d);
            $("#ordertrack_cooking_img").fadeTo("fast", d);
            $("#ordertrack_cooking_title").fadeTo("fast", d)
        }
        if (c == "delivary" || c == "home") {
            $("#ordertrack_arrow_2_" + e).fadeTo("fast", b);
            $("#ordertrack_delivery_img_" + e).fadeTo("fast", b);
            $("#ordertrack_delivery_title_" + e).fadeTo("fast", b);
            $("#ordertrack_arrow_2").fadeTo("fast", b);
            $("#ordertrack_delivery_img").fadeTo("fast", b);
            $("#ordertrack_delivery_title").fadeTo("fast", b)
        } else {
            $("#ordertrack_arrow_2_" + e).fadeTo("fast", d);
            $("#ordertrack_delivery_img_" + e).fadeTo("fast", d);
            $("#ordertrack_delivery_title_" + e).fadeTo("fast", d);
            $("#ordertrack_arrow_2").fadeTo("fast", d);
            $("#ordertrack_delivery_img").fadeTo("fast", d);
            $("#ordertrack_delivery_title").fadeTo("fast", d)
        }
        if (c == "home") {
            $("#ordertrack_arrow_3_" + e).fadeTo("fast", b);
            $("#ordertrack_home_img_" + e).fadeTo("fast", b);
            $("#ordertrack_home_title_" + e).fadeTo("fast", b);
            $("#ordertrack_arrow_3").fadeTo("fast", b);
            $("#ordertrack_home_img").fadeTo("fast", b);
            $("#ordertrack_home_title").fadeTo("fast", b)
        } else {
            $("#ordertrack_arrow_3_" + e).fadeTo("fast", d);
            $("#ordertrack_home_img_" + e).fadeTo("fast", d);
            $("#ordertrack_home_title_" + e).fadeTo("fast", d);
            $("#ordertrack_arrow_3").fadeTo("fast", d);
            $("#ordertrack_home_img").fadeTo("fast", d);
            $("#ordertrack_home_title").fadeTo("fast", d)
        }
        if (a != "" && $("#ordertrack_selectedorder").length > 0) {
            $("#ordertrack_selectedorder").html(drawCartItemsAsHTML(a.Check, {
                itemGroupTemplate: "HistoryOrders_CartItemGroup",
                itemTemplate: "HistoryOrders_CartItem",
                itemDetTemplate: "HistoryOrders_CartItemDetail",
                itemTemplateEmpty: "HistoryOrders_CartItemEmpty"
            }));
            $("#ordertrack_selectedorder").find("img").each(function() {
                this.onerror = function() {
                    ReplaceMissingImage(this)
                }
            })
        } else {
            $("#ordertrack_selectedorder").empty()
        }
    };
    this.Close = function() {
        if (this.onClose != null) {
            this.onClose()
        }
    };
    this.FillActiveOrders = function() {
        if (!$(this.pagesContainer).is(":visible")) {
            if (this.afterShowPage != null) {
                this.afterShowPage()
            }
        }
        setFloatingWindowStyle(9);
        var s = this;
        this.ActiveBackground = $("#ordertrack_selectedorder").css("backgroundColor");
        var l = this.pages.OrderTracking_Table;
        var e = this.pages.OrderTracking_ItemLine;
        var k = "";
        var y = null;
        $("#ordertrack_currentstate").empty();
        var j = 0;
        for (var u in this.StatusList) {
            var c = null;
            var q = null;
            var b = null;
            var r = this.StatusList[u];
            var t = createUUID();
            var p = createUUID();
            var g = createUUID();
            var o = createUUID();
            var z = createUUID();
            var A = createUUID();
            var v = createUUID();
            var a = r.OrderID.toString().trim();
            var f = "";
            if (r.CheckHeader["DelivaryOrTakeout"] == "Delivary") {
                f = r.CheckHeader["customerAddrDesc"]
            } else {
                var w = r.CheckHeader["StoreID"];
                if (OriginalStores[w] == null) {
                    f = "The store details are currently unavailable."
                } else {
                    f = OriginalStores[w]["Address"]
                }
            }
            var m = e;
            m = m.replace(/#ORDERID#/gi, a);
            m = m.replace(/#ORDERMODE#/gi, r.CheckHeader["DelivaryOrTakeout"] == "Delivary" ? Translate("Delivery") : Translate("Carryout"));
            m = m.replace(/#ADDRESS#/gi, f);
            m = m.replace(/#STATUS#/gi, r.StatusName != null ? r.StatusName.toString().trim() : "");
            m = m.replace(/#ORDERTIME#/gi, r.OrderTime != null ? ConvertDateServerDate(r.OrderTime).format("yyyy-mm-dd hh:MM TT").toString().trim() : "");
            m = m.replace(/#TOTAL#/gi, r.Total != null ? r.Total.toString().trim() + CurrencySymbol : "");
            if (typeof r.PromiseTime !== "undefined") {
                c = r.PromiseTime;
                q = new Date(ConvertDateServerDate(r.OrderTime)).getTime();
                if (r.DelivaryType != "Advance") {
                    b = new Date(q + c * 60000).format("hh:MM TT").toString().trim()
                } else {
                    b = r.CheckHeader["delivarytime_date"]
                }
                m = m.replace("#PROMISETIMECONTAINER#", t);
                m = m.replace(/#DUE_TIME#/gi, b);
                m = m.replace(/#PROMISE_TIME#/gi, c > 0 ? c : "");
                if (c > 0 && r.DelivaryType == "Now" && this.useCountDown) {
                    m = m.replace("#PROMISETIME#", "");
                    m = m.replace("#PROMISETIME_DISPLAYSTYLE#", "block")
                } else {
                    m = m.replace("#PROMISETIME#", "");
                    m = m.replace("#PROMISETIME_DISPLAYSTYLE#", "none")
                }
                if (r.Status == "2048" || r.Status == 64 || r.Status == 128 || r.Status == "8192") {
                    $("#" + t).hide()
                }
            }
            m = m.replace(/#ORDER_EDIT#/gi, g);
            m = m.replace(/#ORDER_DELETE#/gi, p);
            m = m.replace(/#PAY_METHOD#/gi, r.PaymentMethod != null ? Translate(r.PaymentMethod.toString().trim()) : "");
            if (r.DelivaryTime != null) {
                m = m.replace(/#DELIVERY_TIME#/gi, Translate(r.DelivaryType.toString().trim()) + (r.DelivaryTime.toString().trim() == "" ? "" : " - " + r.DelivaryTime.toString().trim()))
            } else {
                m = m.replace(/#DELIVERY_TIME#/gi, "")
            }
            m = m.replace(/#ORDER_NOTE#/gi, r.OrderNote != null ? r.OrderNote.toString().trim() : "");
            m = m.replace(/#TRC_ORDERID_DET#/gi, o.toString().trim());
            m = m.replace(/#TRC_ORDERID_DET_WRAPPER#/gi, z.toString().trim());
            m = m.replace(/#TRC_ORDERID_LEFT_ARROW_IMG#/gi, A.toString().trim());
            m = m.replace(/#TRC_ORDERID_DOWN_ARROW_IMG#/gi, v.toString().trim());
            m = m.replace(/#ORDERTRACK_RECEIVE_IMG#/gi, "order_track_receive_img_" + r.OrderID.toString().trim());
            m = m.replace(/#ORDERTRACK_ARROW_1#/gi, "ordertrack_arrow_1_" + r.OrderID.toString().trim());
            m = m.replace(/#ORDERTRACK_COOKING_IMG#/gi, "ordertrack_cooking_img_" + r.OrderID.toString().trim());
            m = m.replace(/#ORDERTRACK_ARROW_2#/gi, "ordertrack_arrow_2_" + r.OrderID.toString().trim());
            m = m.replace(/#ORDERTRACK_DELIVERY_IMG#/gi, "ordertrack_delivery_img_" + r.OrderID.toString().trim());
            m = m.replace(/#ORDERTRACK_ARROW_3#/gi, "ordertrack_arrow_3_" + r.OrderID.toString().trim());
            m = m.replace(/#ORDERTRACK_HOME_IMG#/gi, "ordertrack_home_img_" + r.OrderID.toString().trim());
            m = m.replace(/#ORDERTRACK_RECEIVE_TITLE#/gi, "ordertrack_receive_title_" + r.OrderID.toString().trim());
            m = m.replace(/#ORDERTRACK_COOKING_TITLE#/gi, "ordertrack_cooking_title_" + r.OrderID.toString().trim());
            m = m.replace(/#ORDERTRACK_DELIVERY_TITLE#/gi, "ordertrack_delivery_title_" + r.OrderID.toString().trim());
            m = m.replace(/#ORDERTRACK_HOME_TITLE#/gi, "ordertrack_home_title_" + r.OrderID.toString().trim());
            var d = $(m);
            $("#ordertrack_currentstate").append(d);
            if (this.useCountDown && typeof r.PromiseTime !== "undefined" && c > 0 && r.DelivaryType == "Now") {
                var h = r.RemainingTime;
                if (h > 0) {
                    showCountDown(t, h)
                } else {
                    $("#" + t).hide()
                }
            }
            if (y == null) {
                y = $("#" + a)
            }
            d.data("status", r);
            d.data("owner", this);
            d.data("detailWrapper", $("#" + z));
            d.data("detailWrapperLeftArrow", $("#" + A));
            d.data("detailWrapperDownArrow", $("#" + v));
            $("#" + o).html(drawCartItemsAsHTML(r.Check, {
                itemGroupTemplate: "HistoryOrders_CartItemGroup",
                itemTemplate: "HistoryOrders_CartItem",
                itemDetTemplate: "HistoryOrders_CartItemDetail",
                itemTemplateEmpty: "HistoryOrders_CartItemEmpty"
            }));
            $("#" + o).find("img").each(function() {
                this.onerror = function() {
                    ReplaceMissingImage(this)
                }
            });
            $("#" + z).hide();
            $("#" + A).show();
            $("#" + v).hide();
            $("#" + a).data("status", r);
            $("#" + a).data("owner", this);
            $("#" + a).data("detailWrapper", $("#" + z));
            $("#" + a).data("orderWrapper", $("#" + r.OrderID.toString().trim()));
            $("#" + a).data("detailWrapperLeftArrow", $("#" + A));
            $("#" + a).data("detailWrapperDownArrow", $("#" + v));
            $("#" + a).click(function() {
                if ($(this).data("owner").oldActiveItem == null) {
                    $(this).data("owner").InactiveBackground = $(this).css("backgroundColor")
                }
                if ($(this).data("owner").oldActiveItem != null) {
                    $(this).data("owner").oldActiveItem.css("backgroundColor", $(this).data("owner").InactiveBackground)
                }
                $(this).data("owner").oldActiveItem = $(this);
                $(this).css("backgroundColor", $(this).data("owner").ActiveBackground);
                $(this).data("owner").updateView($(this).data("status"));
                if (!$(this).data("detailWrapper").is(":visible")) {
                    $(this).data("detailWrapper").show();
                    $(this).data("detailWrapperLeftArrow").hide();
                    $(this).data("detailWrapperDownArrow").show();
                    $(this).data("orderWrapper").addClass("active")
                } else {
                    $(this).data("detailWrapper").hide();
                    $(this).data("detailWrapperLeftArrow").show();
                    $(this).data("detailWrapperDownArrow").hide();
                    $(this).data("orderWrapper").removeClass("active")
                }
            });
            $("#" + g).data("status", r);
            $("#" + g).data("owner", this);
            $("#" + g).click(function() {
                var x = $(this).data("owner");
                var B = $(this).data("status");
                serverQuery("/Handlers/OrderTracking.ashx", {
                    action: "canedit",
                    orderid: B.OrderID
                }, function(E, C, D) {
                    if (E && C.valid) {
                        ChangeMenuTemplate(D.StoreMenuTemplateID, function() {
                            ValidateCheck(B.Check, B, function(L, G, J) {
                                var K = L.Check;
                                var I = L.OrderID;
                                cart.clearCart();
                                cart.cartHeader = L.CheckHeader;
                                for (var H in G) {
                                    var F = G[H];
                                    if (typeof OriginalItems[F.ID] !== "undefined") {
                                        cart.addItemToCart(F, true)
                                    }
                                }
                                cart.cartHeader = L.CheckHeader;
                                cart.updateCart();
                                cart.postOrderID = I;
                                x.Close();
                                alert("Your order is restored to the shopping cart again. Feel free to modify your items and proceed to checkout when you are done.");
                                googleTag.push({
                                    event: "Edit Order",
                                    Category: "Order Tracking",
                                    ElementType: "",
                                    ID: "",
                                    Name: ""
                                })
                            })
                        })
                    } else {
                        s.onRefresh();
                        alert("This order is not valid for editing anymore")
                    }
                }, {
                    StoreMenuTemplateID: B.CheckHeader["StoreMenuTemplateID"]
                });
                return false
            });
            $("#" + p).data("status", r);
            $("#" + p).data("owner", this);
            $("#" + p).click(function() {
                var x = $(this).data("owner");
                var B = $(this).data("status");
                var F = new PopupForm();
                F.width = 400;
                F.height = 130;
                F.borderColor = "#83633D";
                F.backgroundColor = "rgb(210, 210, 210)";
                var E = HTML_Pages.OrderTracking_CancelOrder;
                F.container.html(E);
                var H = this;
                var C = "";
                C += "<option value='-1'>- " + Translate("Select a value") + " -</option>";
                for (var D in OrderCancelReasons) {
                    var G = OrderCancelReasons[D];
                    C += "<option value='" + G.ID + "'>" + G.Name + "</option>"
                }
                $("#cancelorder_reasonid").html(C);
                if (useJUICombo) {
                    $("#cancelorder_reasonid").combobox()
                }
                $("#btnOk_CancelOrder").click(function() {
                    var I = $("#cancelorder_reasonid").val();
                    if (I == "" || I == -1) {
                        alert("Please select a cancellation reason.");
                        return
                    }
                    serverQuery("/Handlers/OrderTracking.ashx", {
                        action: "cancelorder",
                        orderid: B.OrderID,
                        cancelreason: I
                    }, function(L, J, K) {
                        if (L && J.valid == true) {
                            x.onRefresh();
                            alert("Cancelation request sent successfully, you will be informed if cancelation request accepted by E-Mail later.");
                            googleTag.push({
                                event: "Cancel Order",
                                Category: "Order Tracking",
                                ElementType: "",
                                ID: "",
                                Name: ""
                            })
                        } else {
                            if (J != null) {
                                x.onRefresh();
                                alert("Unable to cancel this order", 170, 400)
                            }
                        }
                    }, this);
                    F.Close()
                });
                $("#btnCancel_CancelOrder").click(function() {
                    F.Close()
                });
                if (useBoxIt) {
                    $("select").selectBoxIt({
                        downArrowIcon: "icon-red-arrow"
                    })
                }
                F.Show();
                return false
            });
            if (!r.CanEdit) {
                $("#" + g).addClass("disabled");
                $("#" + g).attr("disabled", "disabled")
            }
            if (!enableCancelOrder) {
                $("#" + p).hide()
            } else {
                if (!r.CanCancel) {
                    $("#" + p).addClass("disabled");
                    $("#" + p).attr("disabled", "disabled")
                }
            }
            if (!userLogin.isLoggedIn()) {
                $("#" + g).hide();
                $("#" + p).hide()
            }
            j++
        }
        if (j == 0) {
            $("#ordertrack_currentstate").append($(this.pages.OrderTracking_EmptyOrder));
            if (!showEmptyForms) {
                this.Close();
                alert("Sorry, we did not find any recent orders.");
                return
            }
        }
        if (y != null) {
            y.click()
        }
    };
    this.onRefresh = function() {
        this.ActiveOrders = null;
        this.loadActiveOrders();
        this.updateView("")
    };
    this.Show = function() {
        googleTag.push({
            event: "PageView",
            PageName: "Order Tracking",
            PageURL: "/trackorder"
        });
        googleTag.push({
            event: "Open",
            Category: "Order Tracking",
            ElementType: "",
            ID: "",
            Name: ""
        });
        var a = this.pages.OrderTracking_Main;
        $(this.pagesContainer).html(a);
        this.updateView("");
        $("#ordertrack_close").data("owner", this);
        $("#ordertrack_close").click(function() {
            $(this).data("owner").Close()
        });
        $("#ordertrack_refresh").data("owner", this);
        $("#ordertrack_refresh").click(function() {
            $(this).data("owner").onRefresh()
        });
        setFloatingWindowStyle(9);
        this.loadActiveOrders()
    }
}

function PasswordRecovery() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.resetType = "email";
    this.Show = function(a, b) {
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        if (a == "showResetPassword") {
            if (b) {
                this.showResetPassword()
            } else {
                this.showInvalidLink()
            }
        } else {
            this.showMain()
        }
        if (this.afterShowPage != null) {
            this.afterShowPage()
        }
    };
    this.showMain = function() {
        googleTag.push({
            event: "PageView",
            PageName: "Recover Account",
            PageURL: "/" + UserLanguage + "/forgotpassword"
        });
        googleTag.push({
            event: "Open",
            Category: "Recover Account",
            ElementType: "",
            ID: "",
            Name: ""
        });
        var b = this;
        var a = this.pages.PasswordRecovery_Main;
        $(this.pagesContainer).html(a);
        $("#mobilenumber").val("").mask(PhoneMasks[2]);
        $("input[type='radio'][name='loginResetType']").change(function() {
            b.resetType = $("input[type='radio'][name='loginResetType']:checked").val();
            $("#emailOption").hide();
            $("#mobileOption").hide();
            $("#securityOption").hide();
            if (b.resetType == "email") {
                $("#emailOption").show()
            } else {
                if (b.resetType == "mobile") {
                    $("#mobileOption").show()
                } else {
                    if (b.resetType == "securityQuestion") {
                        $("#securityOption").show()
                    }
                }
            }
        });
        $("input[type='radio'][name='loginResetType'][value='" + this.resetType + "']").prop("checked", true);
        $("input[type='radio'][name='loginResetType']").change();
        $("#frmRecovery").submit(function() {
            $("#btnSubmit").click();
            return false
        });
        $("#btnSubmit").click(function() {
            if ($("input[type='radio'][name='loginResetType']").length > 0) {
                if ($("input[type='radio'][name='loginResetType']:checked").val() == null) {
                    alert("Please select the method you would like to use");
                    return
                }
                b.resetType = $("input[type='radio'][name='loginResetType']:checked").val()
            }
            if (b.resetType == "email" && $("#emailaddress").val() == "") {
                alert("Please fill EMail field");
                return
            }
            if (b.resetType == "mobile" && $("#mobilenumber").val() == "") {
                alert("Please fill Mobile field");
                return
            }
            if (b.resetType == "securityquestion" && $("#secemailaddress").val() == "") {
                alert("Please fill EMail field");
                return
            }
            if (b.resetType == "email") {
                var c = {
                    Action: "Recover",
                    ResetType: "EMail",
                    Username: $("#emailaddress").val()
                }
            } else {
                if (b.resetType == "mobile") {
                    var c = {
                        Action: "Recover",
                        ResetType: "Mobile",
                        Username: $("#mobilenumber").val()
                    }
                } else {
                    if (b.resetType == "securityQuestion") {
                        var c = {
                            Action: "Recover",
                            ResetType: "SecurityQuestion",
                            Username: $("#secemailaddress").val()
                        }
                    }
                }
            }
            $("#btnSubmit").attr("disabled", "disabled");
            serverQuery("/Handlers/PasswordRecovery.ashx", c, function(e, f, d) {
                $("#btnSubmit").removeAttr("disabled");
                if (e) {
                    if (f.valid) {
                        if (f.method == "email") {
                            d.showEmailSent($("#emailaddress").val())
                        } else {
                            if (f.method == "sms") {
                                d.showEnterOTP()
                            } else {
                                if (f.method == "securityquestion") {
                                    if (f.Question == "-1") {
                                        alert("This account has no security question associated with it. Please verify your email or select 'Email a temporary password.")
                                    } else {
                                        d.showEnterSecurityAnswer($("#secemailaddress").val(), f.Question)
                                    }
                                }
                            }
                        }
                    } else {
                        alert(f.message)
                    }
                } else {
                    alert("Request failed")
                }
            }, b);
            googleTag.push({
                event: "Submit",
                Category: "Recover Account",
                ElementType: "",
                ID: "",
                Name: ""
            })
        })
    };
    this.showEnterSecurityAnswer = function(b, a) {
        var d = this;
        var c = this.pages.PasswordRecovery_EnterAnswer;
        $(this.pagesContainer).html(c);
        $("#securityQ").val(a);
        $("#lblSecurityQ").html($("#securityQ option:selected").text());
        $("#btnSubmitAns").click(function() {
            if ($("#answer").val() == "") {
                alert("Please enter your security question answer");
                return
            }
            var e = {
                Action: "RecoverByQuestion",
                EmailAddress: b,
                Question: a,
                Answer: $("#answer").val()
            };
            $("#btnSubmitAns").attr("disabled", "disabled");
            serverQuery("/Handlers/PasswordRecovery.ashx", e, function(g, h, f) {
                $("#btnSubmitAns").removeAttr("disabled");
                if (g) {
                    if (h.valid) {
                        f.showResetPassword(true)
                    } else {
                        alert("Sorry, your security answer was incorrect.")
                    }
                } else {
                    alert("Request failed")
                }
            }, d)
        })
    };
    this.showEmailSent = function(a) {
        var b = this.pages.PasswordRecovery_EMailSent;
        $(this.pagesContainer).html(b);
        $("#register_icon_gmail").hide();
        $("#register_icon_hotmail").hide();
        $("#register_icon_yahoo").hide();
        if (a.indexOf("@gmail") > -1) {
            $("#register_icon_gmail").show()
        } else {
            if (a.indexOf("@yahoo") > -1) {
                $("#register_icon_yahoo").show()
            } else {
                if (a.indexOf("@hotmail") > -1 || a.indexOf("@live") > -1 || a.indexOf("@msn") > -1) {
                    $("#register_icon_hotmail").show()
                } else {
                    $("#go_to_inbox").hide()
                }
            }
        }
    };
    this.showResetPassword = function() {
        var a = this.pages.PasswordRecovery_EnterPassword;
        $(this.pagesContainer).html(a);
        this.validator = new FormValidator($("#frmChangePassword"), {
            emailaddress: {
                required: true,
                requiredMsg: Translate("Please enter your current password"),
                email: true,
                emailMsg: Translate("Please enter a valid EMail address")
            }
        });
        this.validator.onShowValidateMessage = function(g, c, e, f, h) {
            var d = null;
            if (!g) {
                tooltip($("#" + c), f, 0, h, d)
            } else {
                tooltip($("#" + c), "", 1, false, d)
            }
        };
        var b = this;
        $("#frmResetPassword").submit(function() {
            $("#btnResetSubmit").click();
            return false
        });
        $("#btnResetSubmit").data("owner", this);
        $("#btnResetSubmit").click(function() {
            if ($("#password").val() == "") {
                alert("Please fill New Password field");
                return
            }
            if ($("#confirmpassword").val() == "") {
                alert("Please fill Confirm New Password field");
                return
            }
            if ($("#password").val() != $("#confirmpassword").val()) {
                alert("Password and Confirm Password do not match");
                return
            }
            var c = {
                Action: "ResetPassword",
                Password: $("#password").val(),
                ConfirmPassword: $("#confirmpassword").val()
            };
            $("#btnResetSubmit").attr("disabled", "disabled");
            serverQuery("/Handlers/PasswordRecovery.ashx", c, function(e, f, d) {
                $("#btnResetSubmit").removeAttr("disabled");
                if (e) {
                    if (f.valid) {
                        b.showResetDone();
                        setFloatingWindowStyle(1)
                    } else {
                        alert(f.message)
                    }
                } else {
                    alert("Request failed")
                }
            }, this)
        })
    };
    this.showEnterOTP = function() {
        var a = this.pages.PasswordRecovery_EnterOTP;
        $(this.pagesContainer).html(a);
        var b = this;
        $("#frmEnterOTP").submit(function() {
            $("#btnSubmitOTP").click();
            return false
        });
        $("#btnSubmitOTP").data("owner", this);
        $("#btnSubmitOTP").click(function() {
            if ($("#otp").val() == "") {
                alert("Please fill the verifcation code");
                return
            }
            var c = {
                Action: "RecoverByOTP",
                Otp: $("#otp").val()
            };
            $("#btnSubmitOTP").attr("disabled", "disabled");
            serverQuery("/Handlers/PasswordRecovery.ashx", c, function(e, f, d) {
                $("#btnSubmitOTP").removeAttr("disabled");
                if (e) {
                    if (f.valid) {
                        b.showResetPassword()
                    } else {
                        alert(f.message)
                    }
                } else {
                    alert("Request failed")
                }
            }, this)
        })
    };
    this.showResetDone = function() {
        var a = this.pages.PasswordRecovery_ResetDone;
        $(this.pagesContainer).html(a)
    };
    this.showInvalidLink = function() {
        var a = this.pages.PasswordRecovery_InvalidLink;
        $(this.pagesContainer).html(a)
    }
}

function PizzaBuilder() {
    this.ToppingScrollLoaded = false;
    this.PizzaScrollLoaded = false;
    this.enableHalfAndHalf = false;
    this.eligibleItems = null;
    this.pagesContainer = null;
    this.onInitialize = null;
    this.onOK = null;
    this.onCancel = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.ComboCtrlTitleUI = {};
    this.ComboCtrlUI = {};
    this.ToppingFilterItemsUI = [];
    this.ToppingItemsUI = [];
    this.ToppingGroupWrapperUI = null;
    this.ToppingGroupsUI = null;
    this.ToppingsWrapperUI = null;
    this.ToppingItemsUI = null;
    this.QtyUI = null;
    this.QtyUpUI = null;
    this.QtyDownUI = null;
    this.PriceUI = null;
    this.PizzaImageUI = null;
    this.PizzaTypesUI = null;
    this.PizzaTypesUIArr = [];
    this.StartOverUI = null;
    this.loadAllItems = true;
    this.activeMode = "full";
    this.activeItem = null;
    this.currentPizzaItemLeftUI = null;
    this.currentPizzaItemLeft = null;
    this.currentPizzaItemRightUI = null;
    this.currentPizzaItemRight = null;
    this.originalCartItemRef = null;
    this.originalCartItemDealID = 0;
    this.selectedQty = 1;
    this.currentSelectorOpt1 = null;
    this.currentSelectorOpt2 = null;
    this.currentSelectorOpt3 = null;
    this.selectedFullModItems = {};
    this.selectedLeftModItems = {};
    this.selectedRightModItems = {};
    this.maxExtraModItems = 1;
    this.currentActiveFilter = null;
    this.hahRecipePopupUI = null;
    this.hahRecipePopup_mouseOver = false;
    this.hahRecipePopup_showTimerID = 0;
    this.hahRecipePopup_hideTimerID = 0;
    this.hahRecipePopup_LeftHalfBtnUI = null;
    this.hahRecipePopup_LeftHalfExtraBtnUI = null;
    this.hahRecipePopup_LeftHalfNoBtnUI = null;
    this.hahRecipePopup_RightHalfBtnUI = null;
    this.hahRecipePopup_RightHalfExtraBtnUI = null;
    this.hahRecipePopup_RightHalfNoBtnUI = null;
    this.hahRecipePopup_FullBtnUI = null;
    this.hahRecipePopup_FullExtraBtnUI = null;
    this.hahRecipePopup_FullNoBtnUI = null;
    this.hahRecipePopup_activeItem = null;
    this.hahRecipePopup_activeItemUI = null;
    this.hahToppingPopupUI = null;
    this.hahToppingPopup_mouseOver = false;
    this.hahToppingPopup_showTimerID = 0;
    this.hahToppingPopup_hideTimerID = 0;
    this.hahToppingPopup_LeftHalfBtnUI = null;
    this.hahToppingPopup_LeftHalfExtraBtnUI = null;
    this.hahToppingPopup_LeftHalfNoBtnUI = null;
    this.hahToppingPopup_RightHalfBtnUI = null;
    this.hahToppingPopup_RightHalfExtraBtnUI = null;
    this.hahToppingPopup_RightHalfNoBtnUI = null;
    this.hahToppingPopup_FullBtnUI = null;
    this.hahToppingPopup_FullExtraBtnUI = null;
    this.hahToppingPopup_FullNoBtnUI = null;
    this.hahToppingPopup_activeModGroup = null;
    this.hahToppingPopup_activeModItem = null;
    this.hahToppingPopup_activeModItemUI = null;
    this.PizzaBuilderToppings_total = 15;
    this.PizzaBuilderToppings_ButtonThreashold = 3;
    this.Toppings_PrevMobile_btn = null;
    this.Toppings_NextMobile_btn = null;
    this.mobileView = false;
    this.lastUsedVGroupLeft = 0;
    this.lastUsedVGroupRight = 0;
    this.SizeCrustComboContainerID = null;
    this.includePreattachedInToppingCount = true;
    this.allowSelectRecipes = true
}
PizzaBuilder.prototype.PizzaBuilderTopping_ButtonWidth = 98;
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
    title: "Flavor",
    index: 3,
    source: "selector3"
}, {
    type: "COMBO",
    title: "Crust",
    index: 4,
    source: "modgroup",
    link_condition: function(a) {
        return a.Name.toLowerCase().indexOf("crust") > -1
    }
}, {
    type: "COMBO",
    title: "Cuts",
    index: 5,
    source: "moditems",
    source_filter: function(a) {
        return a.ID >= 417 && a.ID <= 421
    }
}, {
    type: "COMBO",
    title: "Sauce",
    index: 6,
    source: "moditems",
    source_filter: function(a) {
        return ([100109, 100110, 100111, 100112, 100113, 100115, 100117].indexOf(a.ID) > -1)
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
    source_filter: function(a) {
        return ([103025, 102025, 101025, 103012, 102012, 101012, 103020, 102020, 101020, 103023, 102023, 101023, 103018, 102018, 101018, 103019, 102019, 101019, 103017, 102017, 101017, 103022, 102022, 101022, 103021, 102021, 101021].indexOf(a.ID) > -1)
    }
}, {
    type: "TOPPING_GROUP",
    title: "Meat",
    html_name: "meat",
    source: "moditems",
    source_filter: function(a) {
        return ([103009, 102009, 101009, 103015, 102015, 101015, 103007, 102007, 101007, 103011, 102011, 101011, 103008, 102008, 101008, 103036, 102036, 101036].indexOf(a.ID) > -1)
    }
}];
PizzaBuilder.prototype.isModItemSelected = function(c, b) {
    if (typeof b === "undefined") {
        b = "full"
    }
    var a = this.selectedFullModItems;
    if (b == "left") {
        a = this.selectedLeftModItems
    } else {
        if (b == "right") {
            a = this.selectedRightModItems
        }
    }
    return (typeof a[c] !== "undefined")
};
PizzaBuilder.prototype.getModItemType = function(c, b) {
    if (typeof b === "undefined") {
        b = "full"
    }
    var a = this.selectedFullModItems;
    if (b == "left") {
        a = this.selectedLeftModItems
    } else {
        if (b == "right") {
            a = this.selectedRightModItems
        }
    }
    if (typeof a[c] !== "undefined") {
        return a[c]["modCode"]
    } else {
        return false
    }
};
PizzaBuilder.prototype.addModItem = function(a, g, f, k) {
    if (typeof f === "undefined") {
        f = "full"
    }
    if (typeof k === "undefined") {
        k = "add"
    }
    var c = this.isModItemSelected(g, f);
    var h = this.isPreAttachedModItem(g) != false;
    var e = this.getGroupMaximum(a);
    var d = !this.checkModGroupMax(a, f, false);
    if (d && k == "add") {
        if (c || h) {
            this.removeModItem(g, f)
        }
        if (h) {
            this.addModItem(a, g, f, "no")
        }
        if ((e > 1 && !h && !c) || (e == 1 && !c)) {
            alert(Translate("You cannot add more than") + " " + e + " " + Translate("toppings on your pizza."))
        }
        return
    }
    var b = this.selectedFullModItems;
    if (f == "left") {
        b = this.selectedLeftModItems
    } else {
        if (f == "right") {
            b = this.selectedRightModItems
        }
    }
    if (!c) {
        b[g] = {
            itm: OriginalItems[g],
            modID: a,
            modCode: k,
            Qty: 1
        }
    } else {
        var j = b[g]["Qty"];
        b[g]["Qty"] = ++j
    }
    this.updatePizzaPrice();
    this.updatePizzaImage();
    this.updateDropDownGroupsTitles()
};
PizzaBuilder.prototype.removeModItem = function(c, b) {
    if (typeof isNo === "undefined") {
        isNo = false
    }
    if (typeof b === "undefined") {
        b = "full"
    }
    var a = this.selectedFullModItems;
    if (b == "left") {
        a = this.selectedLeftModItems
    } else {
        if (b == "right") {
            a = this.selectedRightModItems
        }
    }
    delete a[c];
    this.updatePizzaPrice();
    this.updatePizzaImage();
    this.updateDropDownGroupsTitles()
};
PizzaBuilder.prototype.clearModGroupItems = function(c, b) {
    if (typeof b === "undefined") {
        b = "full"
    }
    var a = this.selectedFullModItems;
    if (b == "left") {
        a = this.selectedLeftModItems
    } else {
        if (b == "right") {
            a = this.selectedRightModItems
        }
    }
    for (var d in a) {
        if (a[d]["modID"] == c) {
            delete a[d]
        }
    }
};
PizzaBuilder.prototype.getTemplate = function(a) {
    return HTML_Pages["PizzaBuilder_" + a]
};
PizzaBuilder.prototype.getSelectorCtrl = function(b, e) {
    var d = -1;
    if (typeof e === "undefined") {
        e = false
    }
    for (var a in this.controlsMap) {
        var c = this.controlsMap[a];
        if (c.type == "COMBO") {
            if (b == 0 && c.source == "selector1") {
                d = c.index
            } else {
                if (b == 1 && c.source == "selector2") {
                    d = c.index
                } else {
                    if (b == 2 && c.source == "selector3") {
                        d = c.index
                    }
                }
            }
        }
        if (d != -1) {
            break
        }
    }
    if (d != -1) {
        if (!e) {
            return this.ComboCtrlUI[d]["ui"]
        } else {
            return this.ComboCtrlTitleUI[d]["ui"]
        }
    } else {
        return null
    }
};
PizzaBuilder.prototype.loadCartItem = function(l, d) {
    this.activeItem = OriginalItems[l.ID];
    this.activeMode = "full";
    this.currentPizzaItemLeft = null;
    this.currentPizzaItemRight = null;
    if (d != null && typeof d !== "undefined" && typeof d.Qty !== "undefined") {
        this.selectedQty = d.Qty
    }
    var g = OriginalVirtualGroups[this.activeItem.VirtualGroupID];
    this.currentSelectorOpt1 = (typeof OriginalVirtualSelectors[g.Selector1ID] !== "undefined") ? OriginalVirtualSelectors[g.Selector1ID]["SelectorValues"][this.activeItem.Selector1ValueID] : null;
    this.currentSelectorOpt2 = (typeof OriginalVirtualSelectors[g.Selector2ID] !== "undefined") ? OriginalVirtualSelectors[g.Selector2ID]["SelectorValues"][this.activeItem.Selector2ValueID] : null;
    this.currentSelectorOpt3 = (typeof OriginalVirtualSelectors[g.Selector3ID] !== "undefined") ? OriginalVirtualSelectors[g.Selector3ID]["SelectorValues"][this.activeItem.Selector3ValueID] : null;
    this.selectedFullModItems = {};
    this.selectedLeftModItems = {};
    this.selectedRightModItems = {};
    if (d != null && typeof d !== "undefined" && typeof d.modGroupsItems !== "undefined") {
        for (var f in d.modGroupsItems) {
            var j = d.modGroupsItems[f];
            var h = j.ID;
            var c = j.ModGroupID;
            if (h != Original_LeftSideItemID && h != Original_RightSideItemID) {
                if (typeof this.selectedFullModItems[j.ID] === "undefined") {
                    this.selectedFullModItems[j.ID] = {
                        itm: OriginalItems[h],
                        modID: c,
                        modCode: "add",
                        Qty: 1
                    }
                } else {
                    this.selectedFullModItems[j.ID]["Qty"] += 1
                }
            } else {
                if (h == Original_LeftSideItemID) {
                    for (var k in j.modGroupsItems) {
                        var b = j.modGroupsItems[k];
                        var a = b.ID;
                        var e = b.ModGroupID;
                        if (GetModItemWeight(OriginalModGroups[e], a) > 5) {
                            this.currentPizzaItemLeft = OriginalItems[a]
                        } else {
                            if (typeof this.selectedLeftModItems[a] === "undefined") {
                                this.selectedLeftModItems[a] = {
                                    itm: OriginalItems[a],
                                    modID: e,
                                    modCode: "add",
                                    Qty: 1
                                }
                            } else {
                                this.selectedLeftModItems[a]["Qty"] += 1
                            }
                        }
                    }
                } else {
                    if (h == Original_RightSideItemID) {
                        for (var k in j.modGroupsItems) {
                            var b = j.modGroupsItems[k];
                            var a = b.ID;
                            var e = b.ModGroupID;
                            if (GetModItemWeight(OriginalModGroups[e], a) > 5) {
                                this.currentPizzaItemRight = OriginalItems[a]
                            } else {
                                if (typeof this.selectedRightModItems[a] === "undefined") {
                                    this.selectedRightModItems[a] = {
                                        itm: OriginalItems[a],
                                        modID: e,
                                        modCode: "add",
                                        Qty: 1
                                    }
                                } else {
                                    this.selectedRightModItems[a]["Qty"] += 1
                                }
                            }
                        }
                    }
                }
            }
            if (this.currentPizzaItemLeft != null && this.currentPizzaItemRight != null) {
                this.activeMode = "half"
            }
        }
    }
    if (d != null && typeof d !== "undefined" && typeof d.NoModCodeItems !== "undefined") {
        for (var f in d.NoModCodeItems) {
            var j = d.NoModCodeItems[f];
            var h = j.ID;
            var c = j.ModGroupID;
            this.selectedFullModItems[j.ID] = {
                itm: OriginalItems[h],
                modID: c,
                modCode: "no",
                Qty: 1
            }
        }
        for (var f in d.modGroupsItems) {
            var j = d.modGroupsItems[f];
            if (j.ID == Original_RightSideItemID) {
                for (var k in j.NoModCodeItems) {
                    var b = j.NoModCodeItems[k];
                    var a = b.ID;
                    var e = b.ModGroupID;
                    this.selectedRightModItems[a.ID] = {
                        itm: OriginalItems[a],
                        modID: e,
                        modCode: "no",
                        Qty: 1
                    }
                }
            } else {
                if (j.ID == Original_LeftSideItemID) {
                    for (var f in j.NoModCodeItems) {
                        var b = j.NoModCodeItems[k];
                        var a = b.ID;
                        var e = b.ModGroupID;
                        this.selectedLeftModItems[a.ID] = {
                            itm: OriginalItems[a],
                            modID: e,
                            modCode: "no",
                            Qty: 1
                        }
                    }
                }
            }
        }
    }
    if (d != null && typeof d !== "undefined") {
        this.originalCartItemRef = getCartItemCRC(d);
        if (typeof d.DealID !== "undefined") {
            this.originalCartItemDealID = d.DealID
        }
    }
};
PizzaBuilder.getEligibleItems = function(e, a) {
    var f;
    if (f == null && a != null && a.DealID > 0) {
        f = getEligibleItemsForDealStep(a)
    } else {
        if (f == null) {
            f = [];
            var g = (typeof e !== "undefined" && e != null && !this.loadAllItems) ? e.VirtualGroupID : null;
            for (var j in OriginalSubMenu) {
                var d = OriginalSubMenu[j];
                var h = false;
                for (var b in d.Items) {
                    var c = d.Items[b];
                    if (c.ID == e.ID) {
                        h = true;
                        break
                    }
                }
                if (h) {
                    for (var b in d.Items) {
                        itm = d.Items[b];
                        if ((itm.VirtualGroupID > 0) && (typeof OriginalVirtualGroups[itm.VirtualGroupID] !== "undefined") && (itm.CustomizationType == 1) && (f.indexOf(itm) == -1) && (((10 - itm.Price) > 0 && (10 - e.Price) > 0) || ((10 - itm.Price) <= 0 && (10 - e.Price) <= 0))) {
                            f.push(itm)
                        }
                    }
                }
            }
        }
    }
    return f
};
PizzaBuilder.prototype.Init = function(J, G, k) {
    if (typeof G === "undefined") {
        G = null
    }
    if (G != null) {
        var p = GoogleTrack_getItemEnName(J.ID);
        googleTag.push({
            event: "Open",
            Category: "Pizza Builder",
            ElementType: "Item",
            ID: J.ID,
            Name: p
        })
    } else {
        googleTag.push({
            event: "Open",
            Category: "Pizza Builder",
            ElementType: "Item",
            ID: "",
            Name: ""
        })
    }
    googleTag.push({
        event: "PageView",
        PageName: "Deal Builder",
        PageURL: "pizzabuilder"
    });
    if (this.eligibleItems == null) {
        this.eligibleItems = PizzaBuilder.getEligibleItems(J, G)
    }
    if (typeof J === "undefined") {
        J = this.eligibleItems[0]
    }
    this.loadCartItem(J, G);
    if (this.beforeShowPage != null) {
        this.beforeShowPage()
    }
    var u = createUUID();
    var v = createUUID();
    var z = createUUID();
    var b = createUUID();
    var B = createUUID();
    var w = createUUID();
    var x = createUUID();
    var y = createUUID();
    var c = createUUID();
    var j = createUUID();
    var o = createUUID();
    var I = createUUID();
    var K = createUUID();
    var L = createUUID();
    var t = createUUID();
    this.SizeCrustComboContainerID = createUUID();
    var l = this.getTemplate("Main");
    for (var C = 0; C < 7; C++) {
        var f = createUUID();
        var D = createUUID();
        l = l.replace(new RegExp("#COMBOTITLE_" + C + "#", "gi"), f);
        l = l.replace(new RegExp("#COMBOCTRL_" + C + "#", "gi"), D);
        this.ComboCtrlTitleUI[C] = {
            id: f,
            ui: null
        };
        this.ComboCtrlUI[C] = {
            id: D,
            ui: null
        }
    }
    l = l.replace(/#TOPPING_FILTERS#/gi, c);
    l = l.replace(/#TOPPINGS#/gi, j);
    l = l.replace(/#QTY#/gi, u);
    l = l.replace(/#QTY_UP#/gi, v);
    l = l.replace(/#QTY_DOWN#/gi, z);
    l = l.replace(/#PRICE#/gi, b);
    l = l.replace(/#PRICE_DEAL#/gi, B);
    l = l.replace(/#START_OVER#/gi, w);
    l = l.replace(/#EXTRA_CHEESE#/gi, t);
    l = l.replace(/#PIZZAITEMS#/gi, x);
    l = l.replace(/#PIZZAIMAGE#/gi, y);
    l = l.replace(/#TOPPINGS_PREV_MOBILE#/gi, I);
    l = l.replace(/#TOPPINGS_NEXT_MOBILE#/gi, K);
    l = l.replace(/#CANCEL#/gi, genActionLink(this, function(s) {
        s.doCancel()
    }));
    l = l.replace(/#ADDTOCART#/gi, genActionLink(this, function(s) {
        s.doAddToCart()
    }));
    l = l.replace(/#BACK#/gi, genActionLink(this, function(s) {
        s.doCancel()
    }));
    l = l.replace(/#BUILDER_TITLE#/gi, L);
    l = l.replace(/#BUILDER_FIRST_COMBOBOX#/gi, this.SizeCrustComboContainerID);
    l = l.replace(/#SELECTOR3_DISPLAY#/gi, this.showSelector3DropDown(J) ? "block" : "none");
    $(this.pagesContainer).html(l);
    for (var C = 0; C < 7; C++) {
        this.ComboCtrlTitleUI[C]["ui"] = $("#" + this.ComboCtrlTitleUI[C]["id"]);
        this.ComboCtrlUI[C]["ui"] = $("#" + this.ComboCtrlUI[C]["id"])
    }
    this.ToppingFiltersUI = $("#" + c);
    this.ToppingUI = $("#" + j);
    this.PizzaTitleUI = $("#" + L);
    this.QtyUI = $("#" + u);
    this.QtyUpUI = $("#" + v);
    this.QtyDownUI = $("#" + z);
    this.PriceUI = $("#" + b);
    this.PriceDealUI = $("#" + B);
    this.StartOverUI = $("#" + w);
    this.PizzaTypesUI = $("#" + x);
    this.PizzaImageUI = $("#" + y);
    this.ToppingUI.hide();
    this.PizzaTypesUI.show();
    this.Toppings_PrevMobile_btn = $("#" + I);
    this.Toppings_NextMobile_btn = $("#" + K);
    this.QtyUpUI.data("owner", this);
    this.QtyUpUI.click(function() {
        $(this).data("owner").doQtyUp()
    });
    this.QtyDownUI.data("owner", this);
    this.QtyDownUI.click(function() {
        $(this).data("owner").doQtyDown()
    });
    this.StartOverUI.data("owner", this);
    this.StartOverUI.click(function() {
        $(this).data("owner").startOver()
    });
    if (typeof k === "undefined" || k == null) {
        k = 1
    }
    this.selectedQty = k;
    var E = {};
    var r = [{}, {}, {}];
    for (var C in this.eligibleItems) {
        var e = this.eligibleItems[C];
        if (e.VirtualGroupID <= 0) {
            continue
        }
        var h = OriginalVirtualGroups[e.VirtualGroupID];
        E[e.VirtualGroupID] = h;
        if (e.PizzaItem) {
            this.enableHalfAndHalf = true
        }
        for (var q = 0; q < 3; q++) {
            var d = 0;
            var A = 0;
            var m = this.getSelectorCtrl(q);
            if (m == null) {
                continue
            }
            if (q == 0) {
                d = h.Selector1ID;
                A = e.Selector1ValueID
            } else {
                if (q == 1) {
                    d = h.Selector2ID;
                    A = e.Selector2ValueID
                } else {
                    if (q == 2) {
                        d = h.Selector3ID;
                        A = e.Selector3ValueID
                    }
                }
            }
            if (typeof OriginalVirtualSelectors[d] !== "undefined" && typeof OriginalVirtualSelectors[d]["SelectorValues"][A] !== "undefined") {
                var a = OriginalVirtualSelectors[d]["SelectorValues"][A];
                if (typeof r[q][a.ID] === "undefined") {
                    r[q][a.ID] = a;
                    var H = this.getTemplate("OptionItem");
                    H = H.replace(/#ID#/gi, a.ID);
                    H = H.replace(/#NAME#/gi, a.Name);
                    H = H.replace(/#DESCRIPTION#/gi, a.Description);
                    var F = $(H);
                    F.data("owner", this);
                    F.data("obj", a);
                    F.data("index", q);
                    F.data("titleUI", this.getSelectorCtrl(q, true));
                    F.click(function(N) {
                        N.preventDefault();
                        $(this).foundation("dropdown", "close", $(this).parent());
                        var M = $(this).data("index");
                        var s = $(this).data("obj");
                        if (M == 0) {
                            $(this).data("owner").currentSelectorOpt1 = s
                        } else {
                            if (M == 1) {
                                $(this).data("owner").currentSelectorOpt2 = s
                            } else {
                                if (M == 2) {
                                    $(this).data("owner").currentSelectorOpt3 = s
                                }
                            }
                        }
                        $(this).data("titleUI").html(s.Name);
                        $(this).data("owner").populateSelectablePizzaItems()
                    });
                    m.append(F)
                }
            }
        }
    }
    for (var C = 0; C < 3; C++) {
        var a = null;
        if (C == 0) {
            a = this.currentSelectorOpt1
        } else {
            if (C == 1) {
                a = this.currentSelectorOpt2
            } else {
                if (C == 2) {
                    a = this.currentSelectorOpt3
                }
            }
        }
        var g = this.getSelectorCtrl(C, true);
        if (a != null && g != null) {
            g.html(a.Name)
        }
    }
    this.populateSelectablePizzaItems();
    if (this.afterShowPage != null) {
        this.afterShowPage()
    }
    this.prepareDropDownGroups();
    if (this.ToppingFilterItemsUI.length > 0 && this.currentActiveFilter == null) {
        this.ToppingFilterItemsUI[0].click()
    }
    this.initHahToppingPopup();
    this.initHahRecipePopup();
    $(this.pagesContainer).mouseover(function(s) {
        s.stopPropagation()
    });
    document._pizzaBuilder = this;
    $(document).mouseover(function() {
        document._pizzaBuilder.hideToppingItemPopup();
        document._pizzaBuilder.hideRecipeItemPopup()
    });
    this.initForMobile_Toppings();
    this.updatePizzaTitle()
};
PizzaBuilder.prototype.initHahToppingPopup = function() {
    var f = HTML_Pages.PizzaBuilder_ToppingPopup;
    var c = createUUID();
    var k = createUUID();
    var d = createUUID();
    var g = createUUID();
    var e = createUUID();
    var h = createUUID();
    var j = createUUID();
    var b = createUUID();
    var a = createUUID();
    f = f.replace("#LEFHALF#", c);
    f = f.replace("#LEFTHALF_EXTRA#", k);
    f = f.replace("#LEFTHALF_NO#", d);
    f = f.replace("#FULLHALF#", j);
    f = f.replace("#FULL_EXTRA#", b);
    f = f.replace("#FULL_NO#", a);
    f = f.replace("#RIGHTHALF#", g);
    f = f.replace("#RIGHTHALF_EXTRA#", e);
    f = f.replace("#RIGHTHALF_NO#", h);
    this.hahToppingPopupUI = $(f);
    this.hahToppingPopupUI.css("position", "fixed");
    this.hahToppingPopupUI.css("zIndex", getTopmostZIndex() + 1);
    this.hahToppingPopupUI.hide();
    $(this.pagesContainer).append(this.hahToppingPopupUI);
    this.hahToppingPopupUI.data("owner", this);
    this.hahToppingPopupUI.mouseenter(function() {
        var l = $(this).data("owner");
        l.hahToppingPopup_mouseOver = true
    });
    this.hahToppingPopupUI.mouseleave(function() {
        var l = $(this).data("owner");
        l.hahToppingPopup_mouseOver = false;
        l.hideToppingItemPopup()
    });
    this.hahToppingPopup_LeftHalfBtnUI = $("#" + c);
    this.hahToppingPopup_LeftHalfExtraBtnUI = $("#" + k);
    this.hahToppingPopup_LeftHalfNoBtnUI = $("#" + d);
    this.hahToppingPopup_RightHalfBtnUI = $("#" + g);
    this.hahToppingPopup_RightHalfExtraBtnUI = $("#" + e);
    this.hahToppingPopup_RightHalfNoBtnUI = $("#" + h);
    this.hahToppingPopup_FullBtnUI = $("#" + j);
    this.hahToppingPopup_FullExtraBtnUI = $("#" + b);
    this.hahToppingPopup_FullNoBtnUI = $("#" + a);
    this.hahToppingPopup_LeftHalfBtnUI.data("owner", this);
    this.hahToppingPopup_LeftHalfBtnUI.click(function() {
        var l = $(this).data("owner");
        l.toppingBtnClick("LeftHalf", $(this), l.hahToppingPopup_activeModGroup, l.hahToppingPopup_activeModItem, l.hahToppingPopup_activeModItemUI)
    });
    this.hahToppingPopup_LeftHalfExtraBtnUI.data("owner", this);
    this.hahToppingPopup_LeftHalfExtraBtnUI.click(function() {
        var l = $(this).data("owner");
        l.toppingBtnClick("LeftHalfExtra", $(this), l.hahToppingPopup_activeModGroup, l.hahToppingPopup_activeModItem, l.hahToppingPopup_activeModItemUI)
    });
    this.hahToppingPopup_LeftHalfNoBtnUI.data("owner", this);
    this.hahToppingPopup_LeftHalfNoBtnUI.click(function() {
        var l = $(this).data("owner");
        l.toppingBtnClick("LeftHalfNo", $(this), l.hahToppingPopup_activeModGroup, l.hahToppingPopup_activeModItem, l.hahToppingPopup_activeModItemUI)
    });
    this.hahToppingPopup_RightHalfBtnUI.data("owner", this);
    this.hahToppingPopup_RightHalfBtnUI.click(function() {
        var l = $(this).data("owner");
        l.toppingBtnClick("RightHalf", $(this), l.hahToppingPopup_activeModGroup, l.hahToppingPopup_activeModItem, l.hahToppingPopup_activeModItemUI)
    });
    this.hahToppingPopup_RightHalfExtraBtnUI.data("owner", this);
    this.hahToppingPopup_RightHalfExtraBtnUI.click(function() {
        var l = $(this).data("owner");
        l.toppingBtnClick("RightHalfExtra", $(this), l.hahToppingPopup_activeModGroup, l.hahToppingPopup_activeModItem, l.hahToppingPopup_activeModItemUI)
    });
    this.hahToppingPopup_RightHalfNoBtnUI.data("owner", this);
    this.hahToppingPopup_RightHalfNoBtnUI.click(function() {
        var l = $(this).data("owner");
        l.toppingBtnClick("RightHalfNo", $(this), l.hahToppingPopup_activeModGroup, l.hahToppingPopup_activeModItem, l.hahToppingPopup_activeModItemUI)
    });
    this.hahToppingPopup_FullBtnUI.data("owner", this);
    this.hahToppingPopup_FullBtnUI.click(function() {
        var l = $(this).data("owner");
        l.toppingBtnClick("Full", $(this), l.hahToppingPopup_activeModGroup, l.hahToppingPopup_activeModItem, l.hahToppingPopup_activeModItemUI)
    });
    this.hahToppingPopup_FullExtraBtnUI.data("owner", this);
    this.hahToppingPopup_FullExtraBtnUI.click(function() {
        var l = $(this).data("owner");
        l.toppingBtnClick("FullExtra", $(this), l.hahToppingPopup_activeModGroup, l.hahToppingPopup_activeModItem, l.hahToppingPopup_activeModItemUI)
    });
    this.hahToppingPopup_FullNoBtnUI.data("owner", this);
    this.hahToppingPopup_FullNoBtnUI.click(function() {
        var l = $(this).data("owner");
        l.toppingBtnClick("FullNo", $(this), l.hahToppingPopup_activeModGroup, l.hahToppingPopup_activeModItem, l.hahToppingPopup_activeModItemUI)
    });
    document.PizzaBuilder_ToppingUI = this.hahToppingPopupUI
};
PizzaBuilder.prototype.initHahRecipePopup = function() {
    var b = HTML_Pages.PizzaBuilder_RecipePopup;
    var d = createUUID();
    var c = createUUID();
    var a = createUUID();
    b = b.replace("#LEFHALF#", d);
    b = b.replace("#FULLHALF#", a);
    b = b.replace("#RIGHTHALF#", c);
    this.hahRecipePopupUI = $(b);
    this.hahRecipePopupUI.css("position", "fixed");
    this.hahRecipePopupUI.css("zIndex", getTopmostZIndex() + 1);
    this.hahRecipePopupUI.hide();
    $(this.pagesContainer).append(this.hahRecipePopupUI);
    this.hahRecipePopupUI.data("owner", this);
    this.hahRecipePopupUI.mouseenter(function() {
        var e = $(this).data("owner");
        e.hahRecipePopup_mouseOver = true
    });
    this.hahRecipePopupUI.mouseleave(function() {
        var e = $(this).data("owner");
        e.hahRecipePopup_mouseOver = false;
        e.hideRecipeItemPopup()
    });
    this.hahRecipePopup_LeftHalfBtnUI = $("#" + d);
    this.hahRecipePopup_RightHalfBtnUI = $("#" + c);
    this.hahRecipePopup_FullBtnUI = $("#" + a);
    this.hahRecipePopup_LeftHalfBtnUI.data("owner", this);
    this.hahRecipePopup_LeftHalfBtnUI.click(function() {
        var e = $(this).data("owner");
        e.recipeBtnClick("LeftHalf", e.hahRecipePopup_activeItem, e.hahRecipePopup_activeItemUI)
    });
    this.hahRecipePopup_RightHalfBtnUI.data("owner", this);
    this.hahRecipePopup_RightHalfBtnUI.click(function() {
        var e = $(this).data("owner");
        e.recipeBtnClick("RightHalf", e.hahRecipePopup_activeItem, e.hahRecipePopup_activeItemUI)
    });
    this.hahRecipePopup_FullBtnUI.data("owner", this);
    this.hahRecipePopup_FullBtnUI.click(function() {
        var e = $(this).data("owner");
        e.recipeBtnClick("Full", e.hahRecipePopup_activeItem, e.hahRecipePopup_activeItemUI)
    });
    document.PizzaBuilder_RecipeUI = this.hahRecipePopupUI
};
PizzaBuilder.prototype.getSecondPizzaItemHalfUI = function(a) {
    var c = null;
    for (var b = 0; b < this.PizzaTypesUIArr.length; b++) {
        if ($(a).get(0) != this.PizzaTypesUIArr[b].get(0)) {
            c = this.PizzaTypesUIArr[b];
            break
        }
    }
    return c
};
PizzaBuilder.prototype.updateRecipesStyle = function() {
    for (var c in this.PizzaTypesUIArr) {
        var b = this.PizzaTypesUIArr[c];
        var a = b.data("obj");
        b.removeClass("active");
        b.removeClass("activeLeft");
        b.removeClass("activeRight");
        if (this.activeMode == "full" && a.ID == this.activeItem.ID) {
            b.addClass("active")
        } else {
            if (this.activeMode == "half" && a.ID == this.currentPizzaItemLeft.ID) {
                b.addClass("activeLeft")
            } else {
                if (this.activeMode == "half" && a.ID == this.currentPizzaItemRight.ID) {
                    b.addClass("activeRight")
                }
            }
        }
    }
};
PizzaBuilder.prototype.recipeBtnClick = function(c, b, a) {
    var d = false;
    if (c == "LeftHalf" || c == "RightHalf") {
        if (this.activeMode == "full" && this.canSwitchToHAH(b, c)) {
            this.switchToHalf(b, c);
            if (c == "LeftHalf") {
                this.hahRecipePopup_activeItem = this.currentPizzaItemLeft;
                this.hahRecipePopup_activeItemUI = this.currentPizzaItemLeftUI
            } else {
                this.hahRecipePopup_activeItem = this.currentPizzaItemRight;
                this.hahRecipePopup_activeItemUI = this.currentPizzaItemRightUI
            }
            d = true
        } else {
            if (this.activeMode == "full") {
                alert("Sorry, Half and half is not available for this pizza item");
                return
            }
        }
    } else {
        if (this.activeMode == "half" && this.canSwitchToFull(b)) {
            this.switchToFull(b);
            d = true
        }
    }
    if (c == "Full") {
        this.currentPizzaItemLeft = null;
        this.currentPizzaItemRight = null;
        this.currentPizzaItemLeftUI = null;
        this.currentPizzaItemRightUI = null;
        if (!d) {
            this.activeItem = b
        }
    } else {
        if (c == "LeftHalf" && !d) {
            this.currentPizzaItemLeft = b;
            this.currentPizzaItemLeftUI = a;
            if (this.currentPizzaItemRight == null || this.currentPizzaItemRight == b) {
                this.currentPizzaItemRightUI = this.getSecondPizzaItemHalfUI(a);
                this.currentPizzaItemRight = this.currentPizzaItemRightUI.data("obj")
            }
        } else {
            if (c == "RightHalf" && !d) {
                this.currentPizzaItemRight = b;
                this.currentPizzaItemRightUI = a;
                if (this.currentPizzaItemLeft == null || this.currentPizzaItemLeft == b) {
                    this.currentPizzaItemLeftUI = this.getSecondPizzaItemHalfUI(a);
                    this.currentPizzaItemLeft = this.currentPizzaItemLeftUI.data("obj")
                }
            }
        }
    }
    this.updateRecipesStyle();
    this.switchToppings(true);
    this.populateToppingsControls();
    this.updatePopupRecipeItemStyle();
    _gaq.push(["_trackEvent", "PizzaName", "Customize - Recipe - Full", b.Name, 0])
};
PizzaBuilder.prototype.toppingBtnClick = function(b, f, a, g, e) {
    var c = "Customize - Add";
    var d = "full";
    if (b == "Full" || b == "FullExtra") {
        this.removeModItem(g.ID, "left");
        this.removeModItem(g.ID, "right");
        d = "full"
    } else {
        if (b == "LeftHalf" || b == "LeftHalfExtra") {
            this.removeModItem(g.ID, "right");
            this.removeModItem(g.ID, "full");
            d = "left"
        } else {
            if (b == "RightHalf" || b == "RightHalfExtra") {
                this.removeModItem(g.ID, "left");
                this.removeModItem(g.ID, "full");
                d = "right"
            }
        }
    }
    if ((d == "left" || d == "right") && this.activeMode == "full") {
        return
    }
    if (this.isPreAttachedModItem(g.ID)) {
        if (!this.isModItemSelected(g.ID, d)) {
            this.addModItem(a.ID, g.ID, d);
            c = "Customize - Extra - " + d
        } else {
            if (this.getModItemType(g.ID, d) == "add") {
                this.removeModItem(g.ID, d);
                this.addModItem(a.ID, g.ID, d, "no");
                c = "Customize - Remove - " + d
            } else {
                this.removeModItem(g.ID, d)
            }
        }
    } else {
        if (!this.isModItemSelected(g.ID, d)) {
            this.addModItem(a.ID, g.ID, d)
        } else {
            if (d == "full" && this.isModItemSelected(g.ID, "full") && this.selectedFullModItems[g.ID]["Qty"] < (this.maxExtraModItems + 1)) {
                this.addModItem(a.ID, g.ID, d);
                c = "Customize - Extra - " + d
            } else {
                this.removeModItem(g.ID, d);
                c = "Customize - Remove - " + d
            }
        }
    }
    this.setToppingItemStyle(e, g);
    this.updatePopupToppingItemStyle()
};
PizzaBuilder.prototype.showToppingItemPopup = function(a, c, b) {
    if (this.hahToppingPopup_showTimerID != 0) {
        clearTimeout(this.hahToppingPopup_showTimerID);
        this.hahToppingPopup_showTimerID = 0
    }
    document._pizzaBuilderTimeout_params = {
        owner: this,
        modGroup: a,
        modItem: c,
        modItemUI: b
    };
    this.hahToppingPopup_showTimerID = setTimeout(function() {
        var d = document._pizzaBuilderTimeout_params.owner;
        var e = document._pizzaBuilderTimeout_params.modGroup;
        var g = document._pizzaBuilderTimeout_params.modItem;
        var f = document._pizzaBuilderTimeout_params.modItemUI;
        d.internalShowToppingItemPopup(e, g, f)
    }, 500)
};
PizzaBuilder.prototype.internalShowToppingItemPopup = function(a, d, b) {
    if (this.activeMode == "full") {
        return
    }
    this.hahToppingPopup_activeModGroup = a;
    this.hahToppingPopup_activeModItem = d;
    this.hahToppingPopup_activeModItemUI = b;
    var c = b.offset();
    c.left += b.width() / 2;
    c.left -= this.hahToppingPopupUI.width() / 2;
    c.left = Math.round(c.left);
    c.top -= this.hahToppingPopupUI.height();
    this.hahToppingPopupUI.show();
    this.hahToppingPopupUI.offset(c);
    this.updatePopupToppingItemStyle()
};
PizzaBuilder.prototype.hideToppingItemPopup = function() {
    if (this.hahToppingPopup_hideTimerID != 0) {
        clearTimeout(this.hahToppingPopup_hideTimerID);
        this.hahToppingPopup_hideTimerID = 0
    }
    document._pizzaBuilderHideTimeout = this;
    this.hahToppingPopup_hideTimerID = setTimeout(function() {
        var a = document._pizzaBuilderHideTimeout;
        if (!a.hahToppingPopup_mouseOver) {
            a.hahToppingPopupUI.hide()
        }
    }, 500)
};
PizzaBuilder.prototype.showRecipeItemPopup = function(b, a) {
    if (this.hahRecipePopup_showTimerID != 0) {
        clearTimeout(this.hahRecipePopup_showTimerID);
        this.hahRecipePopup_showTimerID = 0
    }
    document._pizzaBuilderRecipeTimeout_params = {
        owner: this,
        item: b,
        itemUI: a
    };
    this.hahRecipePopup_showTimerID = setTimeout(function() {
        var c = document._pizzaBuilderRecipeTimeout_params.owner;
        var e = document._pizzaBuilderRecipeTimeout_params.item;
        var d = document._pizzaBuilderRecipeTimeout_params.itemUI;
        c.internalShowRecipeItemPopup(e, d)
    }, 500)
};
PizzaBuilder.prototype.internalShowRecipeItemPopup = function(b, a) {
    if (!this.enableHalfAndHalf) {
        return
    }
    this.hahRecipePopup_activeItem = b;
    this.hahRecipePopup_activeItemUI = a;
    var c = a.offset();
    c.left += a.width() / 2;
    c.left -= this.hahRecipePopupUI.width() / 2;
    c.left = Math.round(c.left);
    c.top -= this.hahRecipePopupUI.height();
    this.hahRecipePopupUI.show();
    this.hahRecipePopupUI.offset(c);
    this.updatePopupRecipeItemStyle()
};
PizzaBuilder.prototype.hideRecipeItemPopup = function() {
    if (this.hahRecipePopup_hideTimerID != 0) {
        clearTimeout(this.hahRecipePopup_hideTimerID);
        this.hahRecipePopup_hideTimerID = 0
    }
    document._pizzaBuilderHideTimeout = this;
    this.hahRecipePopup_hideTimerID = setTimeout(function() {
        var a = document._pizzaBuilderHideTimeout;
        if (a.hahRecipePopupUI && !a.hahRecipePopup_mouseOver) {
            a.hahRecipePopupUI.hide()
        }
    }, 500)
};
PizzaBuilder.prototype.updatePopupToppingItemStyle = function() {
    if (this.activeMode == "full") {
        return
    }
    var a = this.hahToppingPopup_activeModItem;
    if (a == null) {
        return
    }
    this.hahToppingPopup_LeftHalfBtnUI.removeClass("active");
    this.hahToppingPopup_RightHalfBtnUI.removeClass("active");
    this.hahToppingPopup_FullBtnUI.removeClass("active");
    if (this.isModItemSelected(a.ID, "full")) {
        this.hahToppingPopup_FullBtnUI.addClass("active")
    } else {
        if (this.isModItemSelected(a.ID, "left")) {
            this.hahToppingPopup_LeftHalfBtnUI.addClass("active")
        } else {
            if (this.isModItemSelected(a.ID, "right")) {
                this.hahToppingPopup_RightHalfBtnUI.addClass("active")
            }
        }
    }
};
PizzaBuilder.prototype.updatePopupRecipeItemStyle = function() {
    if (!this.enableHalfAndHalf) {
        return
    }
    if (this.hahRecipePopup_activeItem == null) {
        return
    }
    var a = this.hahToppingPopup_activeModItem;
    this.hahRecipePopup_LeftHalfBtnUI.removeClass("active");
    this.hahRecipePopup_RightHalfBtnUI.removeClass("active");
    this.hahRecipePopup_FullBtnUI.removeClass("active");
    if (this.activeMode == "full" && this.activeItem.ID == this.hahRecipePopup_activeItem.ID) {
        this.hahRecipePopup_FullBtnUI.addClass("active")
    } else {
        if (this.activeMode == "half" && this.currentPizzaItemLeft != null && this.currentPizzaItemLeft.ID == this.hahRecipePopup_activeItem.ID) {
            this.hahRecipePopup_LeftHalfBtnUI.addClass("active")
        } else {
            if (this.activeMode == "half" && this.currentPizzaItemRight != null && this.currentPizzaItemRight.ID == this.hahRecipePopup_activeItem.ID) {
                this.hahRecipePopup_RightHalfBtnUI.addClass("active")
            }
        }
    }
};
PizzaBuilder.prototype.setToppingItemStyle = function(f, c) {
    f.removeClass("active");
    f.removeClass("activeLeft");
    f.removeClass("activeRight");
    f.removeClass("activeExtra");
    f.removeClass("activeNo");
    var e = this.isPreAttachedModItem(c.ID);
    var a = this.activeMode == "half" && (this.isModItemSelected(c.ID, "left") || e == "left") && this.getModItemType(c.ID, "left") == "add";
    var b = this.activeMode == "half" && (this.isModItemSelected(c.ID, "right") || e == "right") && this.getModItemType(c.ID, "right") == "add";
    var g = (this.isModItemSelected(c.ID, "full") && this.getModItemType(c.ID) == "add") || (a && b) || (e == "full");
    var h = g && typeof this.selectedFullModItems[c.ID] !== "undefined" && (e == "full" ? (this.selectedFullModItems[c.ID]["Qty"] <= this.maxExtraModItems && this.getModItemType(c.ID) == "add") : this.selectedFullModItems[c.ID]["Qty"] > 1);
    var d = this.activeMode == "full" && this.isModItemSelected(c.ID, "full") && this.getModItemType(c.ID) == "no";
    if (h) {
        f.addClass("activeExtra")
    } else {
        if (d) {
            f.addClass("activeNo")
        } else {
            if (g) {
                f.addClass("active")
            } else {
                if (a) {
                    f.addClass("activeLeft")
                } else {
                    if (b) {
                        f.addClass("activeRight")
                    }
                }
            }
        }
    }
};
PizzaBuilder.prototype.switchToppings = function(k) {
    if (typeof k === "undefined") {
        k = false
    }
    var b = [];
    var f = [];
    var d = [];
    if (this.activeItem != null && !k) {
        for (var j in this.activeItem.modGroup) {
            for (var c in this.activeItem.modGroup[j]["Items"]) {
                var h = this.activeItem.modGroup[j]["Items"][c];
                var g = h.ID;
                var a = this.activeItem.modGroup[j]["ID"];
                for (var e in this.selectedFullModItems) {
                    if (typeof OriginalItems[e] !== "undefined" && (e == g || OriginalItems[e]["Name"] == h.Name)) {
                        var l = b;
                        if (typeof l[g] === "undefined") {
                            l[g] = {
                                itm: OriginalItems[g],
                                modCode: this.selectedFullModItems[e]["modCode"],
                                modID: a,
                                Qty: this.selectedFullModItems[e]["Qty"]
                            }
                        } else {
                            l[g]["Qty"] = l[g]["Qty"] + 1
                        }
                        break
                    }
                }
                for (var e in this.selectedLeftModItems) {
                    if (typeof OriginalItems[e] !== "undefined" && (e == g || OriginalItems[e]["Name"] == h.Name)) {
                        var l = this.activeItem.PizzaItem ? f : b;
                        if (typeof l[g] === "undefined") {
                            l[g] = {
                                itm: OriginalItems[g],
                                modCode: this.selectedLeftModItems[e]["modCode"],
                                modID: a,
                                Qty: this.selectedLeftModItems[e]["Qty"]
                            }
                        } else {
                            l[g]["Qty"] = l[g]["Qty"] + 1
                        }
                        break
                    }
                }
                for (var e in this.selectedRightModItems) {
                    if (typeof OriginalItems[e] !== "undefined" && (e == g || OriginalItems[e]["Name"] == h.Name)) {
                        var l = this.activeItem.PizzaItem ? d : b;
                        if (typeof l[g] === "undefined") {
                            l[g] = {
                                itm: OriginalItems[g],
                                modCode: this.selectedRightModItems[e]["modCode"],
                                modID: a,
                                Qty: this.selectedRightModItems[e]["Qty"]
                            }
                        } else {
                            l[g]["Qty"] = l[g]["Qty"] + 1
                        }
                        break
                    }
                }
            }
        }
    }
    this.selectedFullModItems = b;
    this.selectedLeftModItems = f;
    this.selectedRightModItems = d
};
PizzaBuilder.prototype.populateSelectablePizzaItems = function() {
    this.PizzaTypesUI.empty();
    this.PizzaTypesUIArr = [];
    this.PizzaScrollLoaded = false;
    this.selectablePizzaItems = [];
    var f = 0;
    if (this.activeItem != null) {
        f = this.activeItem.VirtualGroupID
    }
    this.activeItem = null;
    for (var b in this.eligibleItems) {
        var d = this.eligibleItems[b];
        if ((this.currentSelectorOpt1 == null || d.Selector1ValueID == this.currentSelectorOpt1.ID) && (this.currentSelectorOpt2 == null || d.Selector2ValueID == this.currentSelectorOpt2.ID) && (this.currentSelectorOpt3 == null || d.Selector3ValueID == this.currentSelectorOpt3.ID) && (this.activeMode == "full" && !d.PizzaItem) || (this.activeMode == "half" && d.PizzaItem)) {
            this.selectablePizzaItems.push(d);
            if (this.activeItem == null || f == d.VirtualGroupID) {
                this.activeItem = d
            }
        }
    }
    var c = 0;
    var j = 0;
    if (this.currentPizzaItemLeft != null) {
        c = this.currentPizzaItemLeft.VirtualGroupID
    }
    if (this.currentPizzaItemRight != null) {
        j = this.currentPizzaItemRight.VirtualGroupID
    }
    if (c == 0) {
        c = this.lastUsedVGroupLeft
    }
    if (j == 0) {
        j = this.lastUsedVGroupRight
    }
    this.currentPizzaItemLeft = null;
    this.currentPizzaItemRight = null;
    if (this.activeItem != null) {
        for (var h in this.activeItem.modGroup) {
            for (var b in this.activeItem.modGroup[h]["Items"]) {
                var g = this.activeItem.modGroup[h]["Items"][b];
                var e = g.ID;
                var a = this.activeItem.modGroup[h]["ID"];
                if (c == g.VirtualGroupID && c != 0) {
                    this.currentPizzaItemLeft = OriginalItems[e]
                } else {
                    if (j == g.VirtualGroupID && j != 0) {
                        this.currentPizzaItemRight = OriginalItems[e]
                    }
                }
            }
        }
    }
    this.populateRecipes();
    this.populateToppingsControls();
    this.ToppingReset();
    this.updateScrolls();
    this.updatePizzaTitle()
};
PizzaBuilder.prototype.populateRecipes = function() {
    var l = this.selectablePizzaItems;
    var g = 0;
    var m = 0;
    var o = null;
    var f = null;
    if (this.activeMode == "half") {
        if (this.currentPizzaItemLeft != null) {
            g = this.currentPizzaItemLeft.VirtualGroupID
        }
        if (this.currentPizzaItemRight != null) {
            m = this.currentPizzaItemRight.VirtualGroupID
        }
        if (g == 0) {
            g = this.lastUsedVGroupLeft
        }
        if (m == 0) {
            m = this.lastUsedVGroupRight
        }
        o = OriginalVirtualGroups[g];
        f = OriginalVirtualGroups[m];
        l = [];
        for (var d in this.activeItem.modGroup) {
            for (var j in this.activeItem.modGroup[d]["Items"]) {
                var k = this.activeItem.modGroup[d]["Items"][j];
                if (GetModItemWeight(this.activeItem.modGroup[d], k.ID) > 5) {
                    l.push(k)
                }
            }
        }
    }
    l = l.sort(function(q, p) {
        return q.Name.toString().localeCompare(p.Name.toString())
    });
    this.PizzaTypesUI.empty();
    this.PizzaTypesUIArr = [];
    for (var d in l) {
        var a = l[d];
        var e = this.getTemplate("ToppingItem");
        e = e.replace(/#ID#/gi, a.ID);
        e = e.replace(/#NAME#/gi, this.getVGroupItemTitle(a.ID));
        e = e.replace(/#DESCRIPTION#/gi, a.Description);
        var b = typeof OriginalVirtualGroups[a.VirtualGroupID] !== "undefined";
        var h = "itm" + strPadLeft("0", 6, ((!b && this.activeMode == "full") ? a.ID.toString() : a.VirtualGroupID.toString())) + ".png";
        e = e.replace(/#IMAGE#/gi, "Images/IngredientsImages/Menu" + CurrentMenuTemplateID + "/" + h);
        var c = $(e);
        if (this.activeMode == "full" && this.activeItem.ID == a.ID) {
            c.addClass("active")
        } else {
            if (this.activeMode == "half" && this.currentPizzaItemLeft.ID == a.ID) {
                c.addClass("activeLeft");
                this.currentPizzaItemLeftUI = c
            } else {
                if (this.activeMode == "half" && this.currentPizzaItemRight.ID == a.ID) {
                    c.addClass("activeRight");
                    this.currentPizzaItemRightUI = c
                }
            }
        }
        c.data("owner", this);
        c.data("obj", a);
        c.click(function(p) {
            var q = $(this).data("obj");
            if (isTouchDevice() && this.enableHalfAndHalf) {
                $(this).data("owner").showRecipeItemPopup(q, $(this))
            } else {
                $(this).data("owner").recipeBtnClick("Full", q, $(this))
            }
        });
        c.mouseenter(function() {
            var q = $(this).data("obj");
            var p = $(this).data("owner");
            p.showRecipeItemPopup(q, $(this))
        });
        c.mouseleave(function() {
            var p = $(this).data("owner");
            p.hideRecipeItemPopup()
        });
        this.PizzaTypesUI.append(c);
        this.PizzaTypesUIArr.push(c)
    }
    this.updateRecipesStyle()
};
PizzaBuilder.prototype.canSwitchToHAH = function(d, j) {
    if (typeof d === "undefined") {
        d = this.activeItem
    }
    if (typeof j === "undefined") {
        j = "LeftHalf"
    }
    if (d == null || this.activeMode == "half") {
        return false
    }
    var l = d.VirtualGroupID;
    var c = this.activeItem.VirtualGroupID;
    if (c == l) {
        c = 0
    }
    var a = false;
    var g = {
        activeItem: null,
        leftHalfItem: null,
        rightHalfItem: null
    };
    for (var b in this.eligibleItems) {
        var k = this.eligibleItems[b];
        if ((this.currentSelectorOpt1 == null || k.Selector1ValueID == this.currentSelectorOpt1.ID) && (this.currentSelectorOpt2 == null || k.Selector2ValueID == this.currentSelectorOpt2.ID) && (this.currentSelectorOpt3 == null || k.Selector3ValueID == this.currentSelectorOpt3.ID) && (k.PizzaItem)) {
            for (var m in k.modGroup) {
                for (var e in k.modGroup[m]["Items"]) {
                    if (l == k.modGroup[m]["Items"][e].VirtualGroupID) {
                        a = true;
                        g.activeItem = k;
                        if (j == "LeftHalf") {
                            g.leftHalfItem = k.modGroup[m]["Items"][e]
                        } else {
                            g.rightHalfItem = k.modGroup[m]["Items"][e]
                        }
                        for (var f = 0; f < k.modGroup[m]["Items"].length; f++) {
                            if (j == "LeftHalf") {
                                if (g.leftHalfItem != k.modGroup[m]["Items"][f] && (c == 0 || c == k.modGroup[m]["Items"][f].VirtualGroupID)) {
                                    g.rightHalfItem = k.modGroup[m]["Items"][f];
                                    break
                                }
                            } else {
                                if (g.rightHalfItem != k.modGroup[m]["Items"][f] && (c == 0 || c == k.modGroup[m]["Items"][f].VirtualGroupID)) {
                                    g.leftHalfItem = k.modGroup[m]["Items"][f];
                                    break
                                }
                            }
                        }
                        break
                    }
                }
            }
        }
    }
    if (a) {
        return g
    } else {
        return false
    }
};
PizzaBuilder.prototype.canSwitchToFull = function(e) {
    if (typeof e === "undefined") {
        e = this.activeItem
    }
    if (e == null || this.activeMode == "full") {
        return false
    }
    var d = e.VirtualGroupID;
    var b = false;
    var a = {
        activeItem: null
    };
    for (var f in this.eligibleItems) {
        var c = this.eligibleItems[f];
        if ((this.currentSelectorOpt1 == null || c.Selector1ValueID == this.currentSelectorOpt1.ID) && (this.currentSelectorOpt2 == null || c.Selector2ValueID == this.currentSelectorOpt2.ID) && (this.currentSelectorOpt3 == null || c.Selector3ValueID == this.currentSelectorOpt3.ID) && (!c.PizzaItem && c.VirtualGroupID == d)) {
            b = true;
            a.activeItem = c;
            break
        }
    }
    if (b) {
        return a
    } else {
        return false
    }
};
PizzaBuilder.prototype.switchToFull = function(b) {
    if (this.activeItem == null || this.activeMode == "full") {
        return false
    }
    var a = this.canSwitchToFull(b);
    if (!a) {
        return
    }
    this.activeMode = "full";
    this.activeItem = a.activeItem;
    this.currentPizzaItemLeft = null;
    this.currentPizzaItemRight = null;
    this.populateRecipes()
};
PizzaBuilder.prototype.switchToHalf = function(c, a) {
    if (this.activeItem == null || this.activeMode == "half") {
        return false
    }
    var b = this.canSwitchToHAH(c, a);
    if (!b) {
        return
    }
    this.activeMode = "half";
    this.activeItem = b.activeItem;
    this.currentPizzaItemLeft = b.leftHalfItem;
    this.currentPizzaItemRight = b.rightHalfItem;
    this.populateRecipes()
};
PizzaBuilder.prototype.removeUnusedModItems = function() {
    for (var e = 0; e < 3; e++) {
        var c = null;
        if (e == 0) {
            c = this.selectedFullModItems
        } else {
            if (e == 1) {
                c = this.selectedLeftModItems
            } else {
                if (e == 2) {
                    c = this.selectedRightModItems
                }
            }
        }
        for (var g in c) {
            var a = c[g]["modID"];
            var j = false;
            if (this.activeItem != null && !j) {
                for (var d in this.activeItem.modGroup) {
                    var h = this.activeItem.modGroup[d];
                    if (typeof h === "undefined") {
                        continue
                    }
                    for (var e in h.Items) {
                        var b = h.Items[e]["ID"];
                        var f = h.ID;
                        if (b == g && f == a) {
                            j = true;
                            break
                        }
                    }
                }
            }
            if (this.currentPizzaItemLeft != null && !j) {
                for (var d in this.currentPizzaItemLeft.modGroup) {
                    var h = this.currentPizzaItemLeft.modGroup[d];
                    if (typeof h === "undefined") {
                        continue
                    }
                    for (var e in h.Items) {
                        var b = h.Items[e]["ID"];
                        var f = h.ID;
                        if (b == g && f == a) {
                            j = true;
                            break
                        }
                    }
                }
            }
            if (this.currentPizzaItemRight != null && !j) {
                for (var d in this.currentPizzaItemRight.modGroup) {
                    var h = this.currentPizzaItemRight.modGroup[d];
                    if (typeof h === "undefined") {
                        continue
                    }
                    for (var e in h.Items) {
                        var b = h.Items[e]["ID"];
                        var f = h.ID;
                        if (b == g && f == a) {
                            j = true;
                            break
                        }
                    }
                }
            }
            if (!j) {
                delete c[g]
            }
        }
    }
};
PizzaBuilder.prototype.getModGroupIDofModItem = function(d) {
    if (this.activeItem != null) {
        for (var c in this.activeItem.modGroup) {
            var a = this.activeItem.modGroup[c];
            for (var b in a.Items) {
                var e = a.Items[b];
                if (e.ID == d) {
                    return a.ID
                }
            }
        }
    }
    if (this.currentPizzaItemLeft != null) {
        for (var c in this.currentPizzaItemLeft.modGroup) {
            var a = this.currentPizzaItemLeft.modGroup[c];
            for (var b in a.Items) {
                var e = a.Items[b];
                if (e.ID == d) {
                    return a.ID
                }
            }
        }
    }
    if (this.currentPizzaItemRight != null) {
        for (var c in this.currentPizzaItemRight.modGroup) {
            var a = this.currentPizzaItemRight.modGroup[c];
            for (var b in a.Items) {
                var e = a.Items[b];
                if (e.ID == d) {
                    return a.ID
                }
            }
        }
    }
    return null
};
PizzaBuilder.prototype.loadDefaultModItems = function() {
    for (n in this.activeItem.DefaultModItems) {
        var a = this.activeItem.DefaultModItems[n];
        var b = this.getModGroupIDofModItem(a);
        if (b == null) {
            continue
        }
        if (!this.isModItemSelected(a, "full")) {
            this.addModItem(b, a, "full")
        }
    }
    if (this.currentPizzaItemLeft != null) {
        for (n in this.currentPizzaItemLeft.DefaultModItems) {
            var a = this.currentPizzaItemLeft.DefaultModItems[n];
            var b = this.getModGroupIDofModItem(a);
            if (b == null) {
                continue
            }
            if (!this.isModItemSelected(a, "left")) {
                this.addModItem(b, a, "left")
            }
        }
    }
    if (this.currentPizzaItemRight != null) {
        for (n in this.currentPizzaItemRight.DefaultModItems) {
            var a = this.currentPizzaItemRight.DefaultModItems[n];
            var b = this.getModGroupIDofModItem(a);
            if (b == null) {
                continue
            }
            if (!this.isModItemSelected(a, "right")) {
                this.addModItem(b, a, "right")
            }
        }
    }
};
PizzaBuilder.prototype.isDefaultModItem = function(a) {
    if (this.activeItem != null) {
        for (n in this.activeItem.DefaultModItems) {
            if (this.activeItem.DefaultModItems[n] == a) {
                return true
            }
        }
    }
    if (this.currentPizzaItemLeft != null) {
        for (n in this.currentPizzaItemLeft.DefaultModItems) {
            if (this.currentPizzaItemLeft.DefaultModItems[n] == a) {
                return true
            }
        }
    }
    if (this.currentPizzaItemRight != null) {
        for (n in this.currentPizzaItemRight.DefaultModItems) {
            if (this.currentPizzaItemRight.DefaultModItems[n] == a) {
                return true
            }
        }
    }
    return false
};
PizzaBuilder.prototype.isPreAttachedModItem = function(a) {
    if (this.activeItem != null) {
        for (n in this.activeItem.PreAttachedModItems) {
            if (this.activeItem.PreAttachedModItems[n] == a) {
                return "full"
            }
        }
    }
    if (this.currentPizzaItemLeft != null) {
        for (n in this.currentPizzaItemLeft.PreAttachedModItems) {
            if (this.currentPizzaItemLeft.PreAttachedModItems[n] == a) {
                return "left"
            }
        }
    }
    if (this.currentPizzaItemRight != null) {
        for (n in this.currentPizzaItemRight.PreAttachedModItems) {
            if (this.currentPizzaItemRight.PreAttachedModItems[n] == a) {
                return "right"
            }
        }
    }
    return false
};
PizzaBuilder.prototype.updatePizzaTitle = function() {
    if (this.currentPizzaItemRight != null) {
        this.PizzaTitleUI.html(Translate("Create your own pizza"))
    } else {
        var a = 0;
        if (this.activeItem != null) {
            a = this.activeItem.VirtualGroupID
        }
        var b = OriginalVirtualGroups[a];
        this.PizzaTitleUI.html((typeof b === "undefined" || b == null) ? Translate("Create your own pizza") : b.Name)
    }
};
PizzaBuilder.prototype.getVGroupItemTitle = function(b) {
    var a = OriginalItems[b];
    var c = a.Name;
    if (a.VirtualGroupID > 0 && typeof OriginalVirtualGroups[a.VirtualGroupID] !== "undefined") {
        c = OriginalVirtualGroups[a.VirtualGroupID]["Name"]
    }
    return c
};
PizzaBuilder.prototype.fillEmptyRecordForUICombo = function(b, d, f, c) {
    if (d.children().length > 0 || typeof b.emptyName === "undefined") {
        return
    }
    var g = Translate(b.emptyName);
    var a = typeof b.emptyDesc === "undefined" ? "" : translate(b.emptyDesc);
    var h = this.getTemplate("OptionItem");
    h = h.replace(/#ID#/gi, 0);
    h = h.replace(/#NAME#/gi, g);
    h = h.replace(/#DESCRIPTION#/gi, a);
    var e = $(h);
    e.data("owner", this);
    e.data("modGrp", c);
    e.data("title", g);
    e.data("titleUI", f);
    e.click(function(l) {
        l.preventDefault();
        $(this).foundation("dropdown", "close", $(this).parent());
        var j = $(this).data("modGrp");
        var k = $(this).data("titleUI");
        var m = $(this).data("title");
        k.html(m);
        $(this).data("owner").clearModGroupItems(j.ID)
    });
    d.append(e);
    f.html(g)
};
PizzaBuilder.prototype.populateToppingsControls = function() {
    this.updatePizzaTitle();
    if (this.customizeSubtitle(this.activeItem) != null) {
        $("#PizzaBuilder_Subtitle").html(this.customizeSubtitle(this.activeItem))
    }
    this.ToppingFilterItemsUI = [];
    this.ToppingItemsUI = [];
    this.ToppingFiltersUI.empty();
    this.ToppingUI.empty();
    for (var o in this.controlsMap) {
        var q = this.controlsMap[o];
        var b = q.type;
        var p = q.source;
        if (b == "COMBO" && (p == "modgroup" || p == "moditems")) {
            var r = this.ComboCtrlUI[q.index]["ui"];
            var t = this.ComboCtrlTitleUI[q.index]["ui"];
            r.empty();
            t.html()
        }
    }
    if (this.activeItem == null) {
        this.updatePizzaImage();
        this.updatePizzaPrice();
        this.updateDropDownGroupsTitles();
        this.updateScrolls();
        $(".fake_combobox_button_content_close").click();
        alert("Sorry. No pizza recipes are available for the selected options.");
        return
    }
    this.removeUnusedModItems();
    this.loadDefaultModItems();
    this.ToppingScrollLoaded = false;
    if (this.allowSelectRecipes) {
        var k = this.getTemplate("Filter");
        k = k.replace(/#NAME#/gi, Translate("Recipes"));
        var l = $(k);
        l.data("owner", this);
        l.data("filter", "Recipes");
        l.data("Message", "");
        l.click(function() {
            $(this).data("owner").clickFilter($(this).data("filter"), $(this))
        });
        var y = this.selectablePizzaItems.length;
        if (y > 1) {
            this.ToppingFiltersUI.append(l);
            this.ToppingFilterItemsUI.push(l)
        }
        if (this.currentActiveFilter == "Recipes") {
            l.addClass("active")
        }
    }
    for (var o in this.controlsMap) {
        var q = this.controlsMap[o];
        var b = q.type;
        var p = q.source;
        if (b == "COMBO" && p == "modgroup") {
            var r = this.ComboCtrlUI[q.index]["ui"];
            var t = this.ComboCtrlTitleUI[q.index]["ui"];
            r.empty();
            for (var o in this.activeItem.modGroup) {
                var m = this.activeItem.modGroup[o];
                if (typeof m === "undefined") {
                    continue
                }
                if (q.link_condition(m)) {
                    this.fillEmptyRecordForUICombo(q, r, t, m);
                    for (var s in m.Items) {
                        var d = m.Items[s];
                        var v = this.getTemplate("OptionItem");
                        v = v.replace(/#ID#/gi, d.ID);
                        v = v.replace(/#NAME#/gi, d.Name);
                        v = v.replace(/#DESCRIPTION#/gi, d.Description);
                        var a = $(v);
                        a.data("owner", this);
                        a.data("modGrp", m);
                        a.data("modItm", d);
                        a.data("titleUI", t);
                        a.click(function(A) {
                            A.preventDefault();
                            $(this).foundation("dropdown", "close", $(this).parent());
                            var x = $(this).data("modGrp");
                            var f = $(this).data("modItm");
                            var z = $(this).data("titleUI");
                            z.html(f.Name);
                            $(this).data("owner").clearModGroupItems(x.ID);
                            $(this).data("owner").addModItem(x.ID, f.ID)
                        });
                        r.append(a);
                        if (this.isModItemSelected(d.ID)) {
                            t.html(d.Name)
                        }
                    }
                }
            }
        } else {
            if (b == "COMBO" && p == "moditems") {
                var r = this.ComboCtrlUI[q.index]["ui"];
                var t = this.ComboCtrlTitleUI[q.index]["ui"];
                r.empty();
                for (var o in this.activeItem.modGroup) {
                    var m = this.activeItem.modGroup[o];
                    if (typeof m === "undefined") {
                        continue
                    }
                    this.fillEmptyRecordForUICombo(q, r, t, m);
                    for (var e in m.Items) {
                        var d = m.Items[e];
                        if (q.source_filter(d)) {
                            var v = this.getTemplate("OptionItem");
                            v = v.replace(/#ID#/gi, d.ID);
                            v = v.replace(/#NAME#/gi, d.Name);
                            v = v.replace(/#DESCRIPTION#/gi, d.Description);
                            var a = $(v);
                            a.data("owner", this);
                            a.data("modItm", d);
                            a.data("modGrp", m);
                            a.data("titleUI", t);
                            a.click(function(A) {
                                A.preventDefault();
                                $(this).foundation("dropdown", "close", $(this).parent());
                                var x = $(this).data("modItm");
                                var f = $(this).data("modGrp");
                                var z = $(this).data("titleUI");
                                z.html(x.Name);
                                $(this).data("owner").clearModGroupItems(f.ID);
                                $(this).data("owner").addModItem(f.ID, x.ID)
                            });
                            r.append(a);
                            if (this.isModItemSelected(d.ID)) {
                                t.html(d.Name)
                            }
                        }
                    }
                }
            } else {
                if (b == "TOPPING_GROUP" && p == "moditems") {
                    if (!this.canShowFilter(q.html_name, this.activeItem)) {
                        for (var s in this.selectedFullModItems) {
                            if (q.source_filter(this.selectedFullModItems[s]["itm"])) {
                                delete this.selectedFullModItems[s]
                            }
                        }
                        if (this.currentActiveFilter == q.html_name && this.ToppingFilterItemsUI.length > 0) {
                            this.currentActiveFilter = this.ToppingFilterItemsUI[this.ToppingFilterItemsUI.length - 1].data("filter")
                        }
                        continue
                    }
                    var k = this.getTemplate("Filter");
                    k = k.replace(/#NAME#/gi, Translate(q.title));
                    var l = $(k);
                    l.data("owner", this);
                    l.data("filter", q.html_name);
                    l.data("Message", typeof q.msg !== "undefined" ? q.msg : "");
                    if (this.currentActiveFilter == q.html_name) {
                        l.addClass("active")
                    }
                    l.click(function() {
                        $(this).data("owner").clickFilter($(this).data("filter"), $(this))
                    });
                    var c = false;
                    for (var o in this.activeItem.modGroup) {
                        var m = this.activeItem.modGroup[o];
                        if (typeof m === "undefined") {
                            continue
                        }
                        for (var e in m.Items) {
                            var d = m.Items[e];
                            if (q.source_filter(d)) {
                                c = true;
                                var v = this.getTemplate("ToppingItem");
                                v = v.replace(/#ID#/gi, d.ID);
                                v = v.replace(/#NAME#/gi, d.Name);
                                v = v.replace(/#DESCRIPTION#/gi, d.Description);
                                v = v.replace(/#IMAGE#/gi, "/Images/IngredientsImages/Menu" + CurrentMenuTemplateID + "/itm" + strPadLeft("0", 6, d.ID) + ".png");
                                var a = $(v);
                                a.data("owner", this);
                                a.data("modItm", d);
                                a.data("modGrp", m);
                                a.data("filter", q.html_name);
                                a.click(function() {
                                    var z = $(this).data("modItm");
                                    var x = $(this).data("modGrp");
                                    var f = $(this).data("owner");
                                    f.showToppingItemPopup(x, z, $(this));
                                    f.toppingBtnClick("Full", $(this), x, z, $(this))
                                });
                                a.mouseenter(function() {
                                    var z = $(this).data("modItm");
                                    var x = $(this).data("modGrp");
                                    var f = $(this).data("owner");
                                    f.showToppingItemPopup(x, z, $(this))
                                });
                                a.mouseleave(function() {
                                    var f = $(this).data("owner");
                                    f.hideToppingItemPopup()
                                });
                                this.ToppingUI.append(a);
                                this.ToppingItemsUI.push(a);
                                this.setToppingItemStyle(a, d)
                            }
                        }
                    }
                    if (c) {
                        this.ToppingFiltersUI.append(l);
                        this.ToppingFilterItemsUI.push(l)
                    }
                } else {
                    if (b == "CHECK" && p == "moditems") {
                        var w = null;
                        var j = null;
                        for (var o in this.activeItem.modGroup) {
                            var m = this.activeItem.modGroup[o];
                            if (typeof m === "undefined") {
                                continue
                            }
                            for (var e in m.Items) {
                                var d = m.Items[e];
                                if (q.source_filter(d)) {
                                    w = d;
                                    j = m;
                                    break
                                }
                            }
                        }
                        var h = $("#" + q.html_name);
                        h.data("owner", this);
                        h.data("modItem", w);
                        h.data("modGroup", j);
                        h.click(function() {
                            var f = $(this).data("owner");
                            var z = $(this).data("modItem");
                            var x = $(this).data("modGroup");
                            f.removeModItem(z.ID, "full");
                            if ($(this).prop("checked")) {
                                if (!f.checkModGroupMax(x.ID, "full")) {
                                    $(this).prop("checked", false)
                                } else {
                                    f.addModItem(x.ID, z.ID, "full")
                                }
                            }
                            f.updatePizzaImage();
                            f.updatePizzaPrice()
                        });
                        if (w != null) {
                            if (this.isModItemSelected(w.ID) && this.selectedFullModItems[w.ID]["modCode"] == "add") {
                                h.prop("checked", true)
                            } else {
                                h.prop("checked", false)
                            }
                        }
                    }
                }
            }
        }
    }
    this.ToppingFiltersUI.children().first().addClass("First");
    this.ToppingFiltersUI.children().last().addClass("Last");
    if (this.currentActiveFilter == null) {
        this.ToppingFiltersUI.children().first().addClass("active")
    }
    this.updatePizzaImage();
    this.updatePizzaPrice();
    this.updateDropDownGroupsTitles();
    this.updateScrolls();
    var l = null;
    for (var u in this.ToppingFilterItemsUI) {
        var g = this.ToppingFilterItemsUI[u];
        if (this.currentActiveFilter == g.data("filter")) {
            l = g;
            break
        }
    }
    this.clickFilter(this.currentActiveFilter, l)
};
PizzaBuilder.prototype.showSelector3DropDown = function(a) {
    return false
};
PizzaBuilder.prototype.canShowFilter = function(a, b) {
    return true
};
PizzaBuilder.prototype.customizeSubtitle = function(a) {
    return null
};
PizzaBuilder.prototype.getImageIndex = function(b, a, c) {
    return a
};
PizzaBuilder.prototype.clickFilter = function(e, d) {
    this.ToppingReset();
    if (d != null) {
        for (var c in this.ToppingFilterItemsUI) {
            this.ToppingFilterItemsUI[c].removeClass("active")
        }
        d.addClass("active");
        this.currentActiveFilter = e
    }
    var h = this;
    if (e == "Recipes") {
        if (this.mobileView) {
            this.ToppingUI.hide();
            this.PizzaTypesUI.show()
        } else {
            this.ToppingUI.slideUp("fast", function() {
                h.updateScrolls()
            });
            this.PizzaTypesUI.slideDown("fast", function() {
                h.updateScrolls()
            })
        }
    } else {
        if (this.mobileView) {
            this.ToppingUI.show();
            this.PizzaTypesUI.hide()
        } else {
            this.ToppingUI.slideDown("fast", function() {
                h.updateScrolls()
            });
            this.PizzaTypesUI.slideUp("fast", function() {
                h.updateScrolls()
            })
        }
        for (var j in this.ToppingItemsUI) {
            var a = this.ToppingItemsUI[j];
            filterbutton = a.data("filter");
            var b = (filterbutton == e);
            if (b) {
                if (this.mobileView) {
                    a.show()
                } else {
                    a.slideDown("fast", function() {
                        h.updateScrolls()
                    })
                }
            } else {
                if (this.mobileView) {
                    a.hide()
                } else {
                    a.slideUp("fast", function() {
                        h.updateScrolls()
                    })
                }
            }
            var g = this.getGroupMaximum(a.data("modGrp")["ID"]);
            if (d != null) {
                $(".PizzaBuilder_ToppingItems_Message").html(this.getToppingMessage(e, Translate(d.data("Message")).replace("#MAX#", g)))
            }
        }
    }
    this.ToppingReset();
    this.updateScrolls()
};
PizzaBuilder.prototype.getToppingMessage = function(b, a) {
    return a
};
PizzaBuilder.prototype.generateCartItem = function() {
    if (this.activeItem == null) {
        return null
    }
    var b = new Object();
    b.ID = this.activeItem.ID;
    b.Name = this.activeItem.Name;
    b.Price = 0;
    b.Weight = 0;
    b.Qty = this.selectedQty;
    b.modGroupsItems = new Array();
    if (this.originalCartItemRef != null) {
        b.shopping_cart_group = this.originalCartItemRef
    }
    if (this.originalCartItemDealID != 0) {
        b.DealID = this.originalCartItemDealID
    }
    if (typeof b.modGroupsItems === "undefined") {
        b.modGroupsItems = new Array()
    }
    if (typeof b.NoModCodeItems === "undefined") {
        b.NoModCodeItems = new Array()
    }
    for (var h in this.selectedFullModItems) {
        var a = this.selectedFullModItems[h]["modID"];
        var c = this.selectedFullModItems[h]["itm"];
        var k = this.selectedFullModItems[h]["modCode"];
        var j = this.selectedFullModItems[h]["Qty"];
        var d = new Object();
        d.ID = c.ID;
        d.ModGroupID = a;
        d.ModGroupOrder = getModGroupOrder(b.ID, a);
        d.Name = c.Name;
        d.Weight = GetModItemWeight(OriginalModGroups[a], c.ID);
        d.Price = getCartItemPrice(d);
        d.modGroupsItems = [];
        if (k == "add") {
            for (var e = 0; e < j; e++) {
                b.modGroupsItems.push(d)
            }
        } else {
            b.NoModCodeItems.push(d)
        }
    }
    if (this.activeMode == "half") {
        var g = new Object();
        g.ID = Original_LeftSideItemID;
        g.ModGroupID = this.getModGroupIDofModItem(this.currentPizzaItemLeft.ID);
        g.ModGroupOrder = 0;
        g.Name = Translate("Left half");
        g.Weight = 0;
        g.Price = 0;
        g.modGroupsItems = [];
        var d = new Object();
        d.ID = this.currentPizzaItemLeft.ID;
        d.ModGroupID = this.getModGroupIDofModItem(this.currentPizzaItemLeft.ID);
        d.ModGroupOrder = 0;
        d.Name = this.currentPizzaItemLeft.Name;
        d.Weight = GetModItemWeight(OriginalModGroups[this.getModGroupIDofModItem(this.currentPizzaItemLeft.ID)], this.currentPizzaItemLeft.ID) / 2;
        d.Price = getCartItemPrice(d);
        d.modGroupsItems = [];
        g.modGroupsItems.push(d);
        for (var h in this.selectedLeftModItems) {
            var a = this.selectedLeftModItems[h]["modID"];
            var c = this.selectedLeftModItems[h]["itm"];
            var k = this.selectedLeftModItems[h]["modCode"];
            var j = this.selectedLeftModItems[h]["Qty"];
            var d = new Object();
            d.ID = c.ID;
            d.ModGroupID = a;
            d.ModGroupOrder = 0;
            d.Name = c.Name;
            d.Weight = GetModItemWeight(OriginalModGroups[a], c.ID) / 2;
            d.Price = getCartItemPrice(d);
            d.modGroupsItems = [];
            if (k == "add") {
                for (var e = 0; e < j; e++) {
                    g.modGroupsItems.push(d)
                }
            } else {
                g.modGroupsItems.push(d)
            }
        }
        b.modGroupsItems.push(g);
        var f = new Object();
        f.ID = Original_RightSideItemID;
        f.ModGroupID = this.getModGroupIDofModItem(this.currentPizzaItemRight.ID);
        f.ModGroupOrder = 0;
        f.Name = Translate("Right half");
        f.Weight = 0;
        f.Price = 0;
        f.modGroupsItems = [];
        var d = new Object();
        d.ID = this.currentPizzaItemRight.ID;
        d.ModGroupID = this.getModGroupIDofModItem(this.currentPizzaItemRight.ID);
        d.ModGroupOrder = 0;
        d.Name = this.currentPizzaItemRight.Name;
        d.Weight = GetModItemWeight(OriginalModGroups[this.getModGroupIDofModItem(this.currentPizzaItemRight.ID)], this.currentPizzaItemRight.ID) / 2;
        d.Price = getCartItemPrice(d);
        d.modGroupsItems = [];
        f.modGroupsItems.push(d);
        for (var h in this.selectedRightModItems) {
            var a = this.selectedRightModItems[h]["modID"];
            var c = this.selectedRightModItems[h]["itm"];
            var k = this.selectedRightModItems[h]["modCode"];
            var j = this.selectedRightModItems[h]["Qty"];
            var d = new Object();
            d.ID = c.ID;
            d.ModGroupID = a;
            d.ModGroupOrder = 0;
            d.Name = c.Name;
            d.Weight = GetModItemWeight(OriginalModGroups[a], c.ID) / 2;
            d.Price = getCartItemPrice(d);
            d.modGroupsItems = [];
            if (k == "add") {
                for (var e = 0; e < j; e++) {
                    f.modGroupsItems.push(d)
                }
            } else {
                f.modGroupsItems.push(d)
            }
        }
        b.modGroupsItems.push(f)
    }
    return b
};
PizzaBuilder.prototype.doAddToCart = function() {
    if (!this.checkModGroupsMin()) {
        return
    }
    if (this.hahToppingPopupUI != null) {
        this.hahToppingPopupUI.hide()
    }
    var a = this.generateCartItem();
    if (a == null) {
        alert("Sorry. No pizza recipes are available for the selected options.")
    }
    if (this.onOK != null && a != null) {
        this.onOK(a)
    }
};
PizzaBuilder.prototype.doCancel = function() {
    if (this.hahToppingPopupUI != null) {
        this.hahToppingPopupUI.hide()
    }
    if (this.onCancel != null) {
        this.onCancel()
    }
};
PizzaBuilder.prototype.doQtyUp = function() {
    this.selectedQty++;
    this.updatePizzaPrice()
};
PizzaBuilder.prototype.doQtyDown = function() {
    if (this.selectedQty > 1) {
        this.selectedQty--;
        this.updatePizzaPrice()
    }
};
PizzaBuilder.prototype.updatePizzaPrice = function() {
    this.QtyUI.html(this.selectedQty);
    var a = this.generateCartItem();
    var c = 0;
    var b = 0;
    if (a != null) {
        c = getCartItemPrice(a);
        b = RoundPrice(c * this.selectedQty);
        this.PriceUI.html(b + CurrencySymbol)
    } else {
        this.PriceUI.html(Translate("None"))
    }
    if (a != null) {
        if (b > 0) {
            this.PriceDealUI.html(Translate("Extra") + " " + b + CurrencySymbol)
        } else {
            this.PriceDealUI.html(Translate("Continue"))
        }
    } else {
        this.PriceDealUI.html(Translate("Continue"))
    }
};
PizzaBuilder.prototype.updatePizzaImage = function() {
    var a = [];
    if (this.activeItem != null) {
        if (this.currentSelectorOpt1 != null) {
            a.push({
                Type: "Selector",
                ID: this.currentSelectorOpt1.ID,
                Side: "full"
            })
        }
        if (this.currentSelectorOpt2 != null) {
            a.push({
                Type: "Selector",
                ID: this.currentSelectorOpt2.ID,
                Side: "full"
            })
        }
        if (this.currentSelectorOpt3 != null) {
            a.push({
                Type: "Selector",
                ID: this.currentSelectorOpt3.ID,
                Side: "full"
            })
        }
        a.push({
            Type: "Item",
            ID: this.activeItem.ID,
            Side: "full"
        });
        if (this.activeItem.VirtualGroupID > 0) {
            a.push({
                Type: "VItem",
                ID: this.activeItem.VirtualGroupID,
                Side: "full"
            })
        }
        if (this.activeMode == "half") {
            for (var g = 0; g < this.currentPizzaItemLeft.PreAttachedModItems.length; g++) {
                var q = this.currentPizzaItemLeft.PreAttachedModItems[g];
                if (!this.isModItemSelected(q, "left")) {
                    a.push({
                        Type: "modItem",
                        ID: q,
                        Side: "left"
                    })
                }
            }
            for (var g = 0; g < this.currentPizzaItemLeft.PreAttachedModItems.length; g++) {
                var q = this.currentPizzaItemLeft.PreAttachedModItems[g];
                if (!this.isModItemSelected(q, "right")) {
                    a.push({
                        Type: "modItem",
                        ID: q,
                        Side: "right"
                    })
                }
            }
        } else {
            for (var g = 0; g < this.activeItem.PreAttachedModItems.length; g++) {
                var q = this.activeItem.PreAttachedModItems[g];
                if (!this.isModItemSelected(q, "full")) {
                    a.push({
                        Type: "modItem",
                        ID: q,
                        Side: "full"
                    })
                }
            }
        }
        for (var c in this.selectedFullModItems) {
            if (this.getModItemType(c, "full") != "no") {
                a.push({
                    Type: "modItem",
                    ID: c,
                    Side: "full"
                })
            }
        }
        for (var c in this.selectedLeftModItems) {
            if (this.getModItemType(c, "left") != "no") {
                a.push({
                    Type: "modItem",
                    ID: c,
                    Side: "left"
                })
            }
        }
        for (var c in this.selectedRightModItems) {
            if (this.getModItemType(c, "right") != "no") {
                a.push({
                    Type: "modItem",
                    ID: c,
                    Side: "right"
                })
            }
        }
    } else {
        a.push({
            Type: "Unselected",
            ID: 0,
            Side: "full"
        })
    }
    var l = this.PizzaImageUI.children();
    for (var g = 0; g < l.length; g++) {
        var j = $(l.get(g));
        j.remove()
    }
    var f = a.length;
    for (var d in a) {
        var o = a[d];
        var m = $("<div></div>");
        var b = $("<div></div>");
        m.data("layerInfo", o);
        var h = d;
        h = this.getImageIndex(o.ID, h, f);
        var p = {
            url: "",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: h,
            backgroundSize: "contain"
        };
        if (o.Type == "Unselected") {
            p.url = "/Images/SummaryImages/Unselected.png"
        } else {
            if (o.Type == "Selector") {
                p.url = "/Images/SummaryImages/Selector" + strPadLeft("0", 6, o.ID) + ".png"
            } else {
                if (o.Type == "VItem") {
                    p.url = "/Images/SummaryImages/vitm" + strPadLeft("0", 6, o.ID) + ".png"
                } else {
                    p.url = "/Images/SummaryImages/itm" + strPadLeft("0", 6, o.ID) + ".png"
                }
            }
        }
        if (b.Side != "left" && b.Side != "right") {
            if (typeof PizzaBuilder.onApplyBuilderImage !== "undefined" && PizzaBuilder.onApplyBuilderImage != null) {
                var k = {
                    PizzaBuilder: this,
                    ImageLayer: o,
                    Selector1: (typeof this.currentSelectorOpt1 !== "undefined" && this.currentSelectorOpt1 != null) ? this.currentSelectorOpt1.ID : 0,
                    Selector2: (typeof this.currentSelectorOpt2 !== "undefined" && this.currentSelectorOpt2 != null) ? this.currentSelectorOpt2.ID : 0,
                    SelectedItem: this.activeItem,
                    ImageInfo: p
                };
                var e = PizzaBuilder.onApplyBuilderImage(k);
                if (typeof e !== "undefined" && e != null) {
                    p = e
                }
            }
        }
        b.css("backgroundImage", "url(" + p.url + ")");
        b.css("backgroundRepeat", "no-repeat");
        b.css("backgroundSize", p.backgroundSize);
        m.css("position", "absolute");
        m.css("z-index", p.zIndex);
        m.css("top", "0px");
        m.css("bottom", "0px");
        m.css("left", "0px");
        m.css("right", "0px");
        m.css("overflow", "hidden");
        b.css("position", "absolute");
        b.css("top", p.top);
        b.css("bottom", p.bottom);
        b.css("left", p.left);
        b.css("right", p.right);
        m.append(b);
        if (o.Side == "left") {
            m.css("right", "50%");
            b.css("right", "");
            b.css("width", "200%")
        } else {
            if (o.Side == "right") {
                m.css("left", "50%");
                b.css("left", "");
                b.css("width", "200%")
            }
        }
        this.PizzaImageUI.append(m)
    }
};
PizzaBuilder.prototype.prepareDropDownGroups = function() {
    $(document).click(function(a) {
        if (!$(".fake_combobox_dropdown_content").has(a.target).length > 0 && !$(a.target).hasClass("fake_combobox_dropdown_content")) {
            $(".fake_combobox_dropdown_content").hide()
        }
    });
    $(".fake_combobox_button_content_close").click(function(a) {
        $(this).closest(".fake_combobox_dropdown_content").hide()
    });
    $(".fake_combobox_button_content").click(function(d) {
        var a = $(this).next(".fake_combobox_dropdown_content").first();
        a.toggle();
        var c = $(".fake_combobox_dropdown_content");
        for (var b = 0; b < c.length; b++) {
            if (c.get(b) != a.get(0)) {
                $(c.get(b)).hide()
            }
        }
        d.stopPropagation();
        d.preventDefault()
    })
};
PizzaBuilder.prototype.updateDropDownGroupsTitles = function() {
    $(".fake_combobox_wrapper").each(function(b, c) {
        var a = $(c).find(".fake_combobox_button");
        var d = "";
        for (var b = 0; b < a.length; b++) {
            if (b += 0) {
                d += " - "
            }
            d += $(a.get(b)).html()
        }
        d = limitText(d, 20);
        $(c).find(".fake_combobox_button_content").html(d)
    })
};
PizzaBuilder.prototype.updateScrolls = function(a) {
    if (typeof a === "undefined") {
        a = true
    }
    if (a) {
        if (!this.PizzaScrollLoaded) {
            this.PizzaScrollLoaded = true;
            this.PizzaTypesUI.mCustomScrollbar({
                scrollButtons: {
                    enable: true
                }
            })
        }
        if (!this.ToppingScrollLoaded) {
            this.ToppingScrollLoaded = true;
            this.ToppingUI.mCustomScrollbar({
                scrollButtons: {
                    enable: true
                }
            })
        }
        this.PizzaTypesUI.mCustomScrollbar("update");
        this.ToppingUI.mCustomScrollbar("update")
    } else {
        this.PizzaScrollLoaded = false;
        this.ToppingScrollLoaded = false;
        this.PizzaTypesUI.mCustomScrollbar("destroy");
        this.ToppingUI.mCustomScrollbar("destroy")
    }
};
PizzaBuilder.prototype.ToppingItems_Next = function() {
    var a = this.PizzaBuilderToppings_ButtonThreashold * this.PizzaBuilderTopping_ButtonWidth;
    if (translate) {
        $("div.PizzaBuilder_ToppingItems").scrollTo({
            top: "0px",
            left: "-=" + a + "px"
        }, 500)
    } else {
        $("div.PizzaBuilder_ToppingItems").scrollTo({
            top: "0px",
            left: "+=" + a + "px"
        }, 500)
    }
};
PizzaBuilder.prototype.ToppingItems_Prev = function() {
    var a = this.PizzaBuilderToppings_ButtonThreashold * this.PizzaBuilderTopping_ButtonWidth;
    if (translate) {
        $("div.PizzaBuilder_ToppingItems").scrollTo({
            top: "0px",
            left: "+=" + a + "px"
        }, 500)
    } else {
        $("div.PizzaBuilder_ToppingItems").scrollTo({
            top: "0px",
            left: "-=" + a + "px"
        }, 500)
    }
};
PizzaBuilder.prototype.ToppingReset = function() {
    this.ToppingWrapedWidthCheck();
    $("div.PizzaBuilder_ToppingItems").scrollTo({
        top: "0px",
        left: "0px"
    }, 500)
};
PizzaBuilder.prototype.ToppingWrapedWidthCheck = function() {
    this.CalculatePizzaBuilderToppings_total();
    var a = $(window).width();
    if (a > 767) {
        this.mobileView = false;
        $(".PizzaBuilder_ToppingItems_wraped").css("width", "auto");
        $(".PizzaBuilder_ToppingItems").css("width", "auto");
        this.updateScrolls();
        return
    } else {
        this.updateScrolls(false);
        this.mobileView = true;
        if (isTouchDevice()) {
            $(".PizzaBuilder_ToppingItems").css("overflow-x", "auto")
        } else {
            $(".PizzaBuilder_ToppingItems").css("overflow-x", "hidden")
        }
        $(".PizzaBuilder_ToppingItems_wraped").css("width", (this.PizzaBuilderToppings_total * this.PizzaBuilderTopping_ButtonWidth) + "px")
    }
    if (a < 380) {
        $(".PizzaBuilder_ToppingItems").css("width", "82%")
    } else {
        if (a < 768) {
            extraWidth = a - 380;
            extraRatio = extraWidth * 0.0096;
            percentageWidth = a / (4.6 + extraRatio);
            $(".PizzaBuilder_ToppingItems").css("width", percentageWidth + "%")
        } else {
            $(".PizzaBuilder_ToppingItems").removeAttr("style")
        }
    }
    if (a <= 478) {
        this.PizzaBuilderToppings_ButtonThreashold = 2
    } else {
        if (a <= 570) {
            this.PizzaBuilderToppings_ButtonThreashold = 3
        } else {
            if (a <= 665) {
                this.PizzaBuilderToppings_ButtonThreashold = 4
            } else {
                if (a <= 761) {
                    this.PizzaBuilderToppings_ButtonThreashold = 5
                }
            }
        }
    }
};
PizzaBuilder.prototype.initForMobile_Toppings = function() {
    this.ToppingReset();
    if (this.Toppings_NextMobile_btn != null) {
        this.Toppings_NextMobile_btn.unbind("click").bind("click", {
            bldr: this
        }, function(a) {
            a.data.bldr.ToppingItems_Next()
        })
    }
    if (this.Toppings_PrevMobile_btn != null) {
        this.Toppings_PrevMobile_btn.unbind("click").bind("click", {
            bldr: this
        }, function(a) {
            a.data.bldr.ToppingItems_Prev()
        })
    }
    $(window).bind("resize", {
        bldr: this
    }, function(a) {
        a.data.bldr.ToppingReset()
    })
};
PizzaBuilder.prototype.CalculatePizzaBuilderToppings_total = function() {
    var a = 0;
    $(".PizzaBuilder_ToppingItems_wraped").each(function() {
        if ($(this).css("display") != "none") {
            $(this).find(".PizzaBuilder_ToppingItem").each(function() {
                if ($(this).css("display") != "none") {
                    a++
                }
            });
            return false
        }
    });
    this.PizzaBuilderToppings_total = a
};
PizzaBuilder.prototype.getGroupMaximum = function(e) {
    var f = 0;
    for (var d in this.activeItem.modGroup) {
        var a = this.activeItem.modGroup[d];
        if (a.ID == e) {
            f = a.Maximum;
            break
        }
    }
    for (var c in this.activeItem.itemModGroups) {
        var b = this.activeItem.itemModGroups[c];
        if (b.ID == e && f == 0) {
            f = b.Maximum;
            break
        }
    }
    return f
};
PizzaBuilder.prototype.checkModGroupMax = function(b, o, p) {
    var m = 0;
    var q = 0;
    var t = 0;
    if (typeof p === "undefined") {
        p = true
    }
    for (var j in this.activeItem.modGroup) {
        var s = this.activeItem.modGroup[j];
        if (s.ID == b) {
            m = s.Maximum;
            break
        }
    }
    for (var f in this.activeItem.itemModGroups) {
        var k = this.activeItem.itemModGroups[f];
        if (k.ID == b && m == 0) {
            m = k.Maximum;
            break
        }
    }
    if (m == 0) {
        return true
    }
    if (this.includePreattachedInToppingCount) {
        for (var d in this.activeItem.PreAttachedModItems) {
            modItemID = this.activeItem.PreAttachedModItems[d];
            var e = GetModItemWeight(s, modItemID);
            if (o == "left" || o == "right") {
                e = e / 2
            }
            m -= e
        }
    }
    for (var d in this.selectedFullModItems) {
        if (this.selectedFullModItems[d]["modID"] == b && this.selectedFullModItems[d]["modCode"] != "no") {
            q += this.selectedFullModItems[d]["Qty"] * GetModItemWeight(OriginalModGroups[b], this.selectedFullModItems[d]["itm"]["ID"])
        }
    }
    if (o == "left") {
        for (var c in this.selectedLeftModItems && this.selectedFullModItems[d]["modCode"] != "no") {
            if (this.selectedLeftModItems[c]["modID"] == b) {
                q += this.selectedLeftModItems[c]["Qty"] * GetModItemWeight(OriginalModGroups[b], this.selectedLeftModItems[c]["itm"]["ID"]) / 2
            }
        }
    }
    if (o == "right") {
        for (var a in this.selectedRightModItems && this.selectedFullModItems[d]["modCode"] != "no") {
            if (this.selectedRightModItems[a]["modID"] == b) {
                q += this.selectedRightModItems[a]["Qty"] * GetModItemWeight(OriginalModGroups[b], this.selectedRightModItems[a]["itm"]["ID"]) / 2
            }
        }
    }
    if (m != 0 && q >= m) {
        if (p) {
            alert(Translate("You cannot add more than") + " " + m + " " + Translate("toppings on your pizza."))
        }
        return false
    }
    return true
};
PizzaBuilder.prototype.startOver = function() {
    if (confirm(Translate("Are you sure you want to start over?") + "\n" + Translate("All your delicious topping selections will be reset."), this, function(a, b) {
            if (a) {
                b.selectedFullModItems = {};
                b.selectedLeftModItems = {};
                b.selectedRightModItems = {};
                b.populateToppingsControls()
            }
        })) {}
};
PizzaBuilder.prototype.checkModGroupsMin = function() {
    for (var k in this.activeItem.modGroup) {
        var b = this.activeItem.modGroup[k];
        if (b.Minimum > 0) {
            var d = 0;
            for (var e in this.selectedFullModItems) {
                if (this.selectedFullModItems[e]["modID"] == b.ID && this.selectedFullModItems[e]["modCode"] != "no") {
                    d += this.selectedFullModItems[e]["Qty"] * GetModItemWeight(OriginalModGroups[b.ID], this.selectedFullModItems[e]["itm"]["ID"])
                }
            }
            for (var a in this.selectedLeftModItems) {
                if (this.selectedLeftModItems[a]["modID"] == b.ID && this.selectedFullModItems[e]["modCode"] != "no") {
                    d += this.selectedLeftModItems[a]["Qty"] * GetModItemWeight(OriginalModGroups[b.ID], this.selectedLeftModItems[a]["itm"]["ID"]) / 2
                }
            }
            for (var j in this.selectedRightModItems) {
                if (this.selectedRightModItems[j]["modID"] == b.ID && this.selectedFullModItems[e]["modCode"] != "no") {
                    d += this.selectedRightModItems[j]["Qty"] * GetModItemWeight(OriginalModGroups[b.ID], this.selectedRightModItems[j]["itm"]["ID"]) / 2
                }
            }
            if (d < b.Minimum) {
                alert(Translate("You need to select at least") + " " + b.Minimum + " " + Translate("toppings on your pizza."));
                return false
            }
        }
    }
    for (var f in this.activeItem.itemModGroups) {
        var c = this.activeItem.itemModGroups[f];
        if (c.Minimum > 0) {
            var d = 0;
            for (var e in this.selectedFullModItems) {
                if (this.selectedFullModItems[e]["modID"] == c.ID && this.selectedFullModItems[e]["modCode"] != "no") {
                    d += this.selectedFullModItems[e]["Qty"] * GetModItemWeight(OriginalModGroups[c.ID], this.selectedFullModItems[e]["itm"]["ID"])
                }
            }
            for (var a in this.selectedLeftModItems) {
                if (this.selectedLeftModItems[a]["modID"] == c.ID && this.selectedFullModItems[e]["modCode"] != "no") {
                    d += this.selectedLeftModItems[a]["Qty"] * GetModItemWeight(OriginalModGroups[c.ID], this.selectedLeftModItems[a]["itm"]["ID"]) / 2
                }
            }
            for (var j in this.selectedRightModItems) {
                if (this.selectedRightModItems[j]["modID"] == c.ID && this.selectedFullModItems[e]["modCode"] != "no") {
                    d += this.selectedRightModItems[j]["Qty"] * GetModItemWeight(OriginalModGroups[c.ID], this.selectedRightModItems[j]["itm"]["ID"]) / 2
                }
            }
            if (d < c.Minimum) {
                alert(Translate("You need to select at least") + " " + c.Minimum + " " + Translate("toppings on your pizza."));
                return false
            }
        }
    }
    return true
};
(function(b) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], b)
    } else {
        b(jQuery)
    }
}(function(c) {
    var a = c.scrollTo = function(e, d, f) {
        return c(window).scrollTo(e, d, f)
    };
    a.defaults = {
        axis: "xy",
        duration: parseFloat(c.fn.jquery) >= 1.3 ? 0 : 1,
        limit: true
    };
    a.window = function(d) {
        return c(window)._scrollable()
    };
    c.fn._scrollable = function() {
        return this.map(function() {
            var e = this,
                f = !e.nodeName || c.inArray(e.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
            if (!f) {
                return e
            }
            var d = (e.contentWindow || e).document || e.ownerDocument || e;
            return /webkit/i.test(navigator.userAgent) || d.compatMode == "BackCompat" ? d.body : d.documentElement
        })
    };
    c.fn.scrollTo = function(j, e, d) {
        if (typeof e == "object") {
            d = e;
            e = 0
        }
        if (typeof d == "function") {
            d = {
                onAfter: d
            }
        }
        if (j == "max") {
            j = 9000000000
        }
        d = c.extend({}, a.defaults, d);
        e = e || d.duration;
        d.queue = d.queue && d.axis.length > 1;
        if (d.queue) {
            e /= 2
        }
        d.offset = b(d.offset);
        d.over = b(d.over);
        return this._scrollable().each(function() {
            if (j == null) {
                return
            }
            var p = this,
                k = c(p),
                l = j,
                h, f = {},
                o = k.is("html,body");
            switch (typeof l) {
                case "number":
                case "string":
                    if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(l)) {
                        l = b(l);
                        break
                    }
                    l = c(l, this);
                    if (!l.length) {
                        return
                    }
                case "object":
                    if (l.is || l.style) {
                        h = (l = c(l)).offset()
                    }
            }
            var m = c.isFunction(d.offset) && d.offset(p, l) || d.offset;
            c.each(d.axis.split(""), function(v, t) {
                var r = t == "x" ? "Left" : "Top",
                    x = r.toLowerCase(),
                    u = "scroll" + r,
                    s = p[u],
                    q = a.max(p, t);
                if (h) {
                    f[u] = h[x] + (o ? 0 : s - k.offset()[x]);
                    if (d.margin) {
                        f[u] -= parseInt(l.css("margin" + r)) || 0;
                        f[u] -= parseInt(l.css("border" + r + "Width")) || 0
                    }
                    f[u] += m[x] || 0;
                    if (d.over[x]) {
                        f[u] += l[t == "x" ? "width" : "height"]() * d.over[x]
                    }
                } else {
                    var w = l[x];
                    f[u] = w.slice && w.slice(-1) == "%" ? parseFloat(w) / 100 * q : w
                }
                if (d.limit && /^\d+$/.test(f[u])) {
                    f[u] = f[u] <= 0 ? 0 : Math.min(f[u], q)
                }
                if (!v && d.queue) {
                    if (s != f[u]) {
                        g(d.onAfterFirst)
                    }
                    delete f[u]
                }
            });
            g(d.onAfter);

            function g(q) {
                k.animate(f, e, d.easing, q && function() {
                    q.call(this, l, d)
                })
            }
        }).end()
    };
    a.max = function(h, g) {
        var l = g == "x" ? "Width" : "Height",
            f = "scroll" + l;
        if (!c(h).is("html,body")) {
            return h[f] - c(h)[l.toLowerCase()]()
        }
        var k = "client" + l,
            j = h.ownerDocument.documentElement,
            e = h.ownerDocument.body;
        return Math.max(j[f], e[f]) - Math.min(j[k], e[k])
    };

    function b(d) {
        return c.isFunction(d) || typeof d == "object" ? d : {
            top: d,
            left: d
        }
    }
    return a
}));
var isResponsive = true;

function PopupForm() {
    this.width = 755;
    this.height = 500;
    this.opacity = 50;
    this.pageStyle = "popupPage";
    this.containerStyle = "popupContainer";
    this.useDocumentSize = false;
    this.attached = true;
    this.isClosing = false;
    this.scrollingDone = false;
    this.containerWrapperID = createUUID();
    this.shadow = $("<div style='position:fixed;top:0px;left:0px;right:0px;bottom:0px;opacity: 0.5; background-color: black;display:none;' />");
    $(document.body).append(this.shadow);
    $("#wrapper").after("<div id='" + this.containerWrapperID + "' style='display:none;' ></div>");
    this.containerWrapper = $("#" + this.containerWrapperID);
    this.container = $(HTML_Pages.DialogPopupFrame);
    this.container.css("position", "absolute");
    this.containerWrapper.append(this.container);
    this.Show = function(a) {
        if (typeof a === "undefined" || a == null) {
            a = false
        }
        this.container.css("height", this.height + "px");
        this.container.addClass(this.containerStyle);
        if (!this.attached) {
            $(document.body).append(this.shadow);
            $(document.body).append(this.containerWrapper)
        }
        if (a) {
            $("#wrapper").addClass("blur");
            this.containerWrapper.attr("style", "position:absolute;left:0px;right:0px;bottom:0px;display:none;")
        } else {
            this.containerWrapper.attr("style", "position:absolute;top:0px;left:0px;right:0px;bottom:0px;")
        }
        this.containerWrapper.removeClass(this.pageStyle);
        this.shadow.css("zIndex", getTopmostZIndex() + 100);
        this.containerWrapper.css("zIndex", getTopmostZIndex() + 101);
        this.container.css("zIndex", getTopmostZIndex() + 100 + 2);
        if (this.useDocumentSize) {
            this.containerWrapper.css("position", "absolute");
            this.container.css("position", "absolute")
        } else {
            this.containerWrapper.css("position", "absolute");
            this.container.css("position", "absolute")
        }
        this.containerWrapper.clearQueue();
        if (!isMobile) {
            this.container.css("width", this.width + "px")
        } else {
            this.container.css("width", "");
            this.container.css("left", "20px");
            this.container.css("right", "20px")
        }
        if (useBoxIt) {
            $("select").selectBoxIt({
                downArrowIcon: "icon-red-arrow"
            });
            if (isTouchDevice()) {
                $(".selectboxit-container").css({
                    overflow: "hidden"
                })
            }
        }
        this.shadow.fadeTo("fast", this.opacity / 100);
        this.containerWrapper.fadeIn(1000);
        this.positionContainer(true);
        var b = this;
        $(window).resize(function() {
            b.positionContainer(false)
        });
        $(window).scroll(function() {
            if ((b.container.height()) < $(window).height()) {
                b.positionContainer(false)
            }
        })
    };
    this.positionContainer = function(a) {
        var b = ($(window).height() / 2 - this.height / 2);
        var e = ($(window).width() / 2 - this.width / 2);
        if ($(window).width() < this.width) {
            this.container.css("width", ($(window).width() - 100))
        } else {
            this.container.css("width", this.width + "px")
        }
        b = b < 0 ? 150 : b;
        e = e < 0 ? 0 : e;
        var d = $(window).scrollTop();
        if (typeof a === "undefined") {
            a = false
        }
        if (this.container.height() < $(window).height()) {
            var c = Number(b + d - 50);
            this.containerWrapper.css("top", (c < 0 ? 0 : c) + "px")
        } else {
            if (this.container.height() > $(window).height()) {
                this.containerWrapper.css("top", "50px");
                if (a) {
                    $("html, body").animate({
                        scrollTop: 0
                    }, "fast")
                }
            } else {
                this.containerWrapper.css("top", Number(d - 10) + "px")
            }
        }
        this.container.css("left", e + "px")
    };
    this.Close = function() {
        if (this.containerWrapper.css("display") != "none" && !this.isClosing) {
            this.isClosing = true;
            this.containerWrapper.data("owner", this);
            this.containerWrapper.clearQueue();
            var a = function() {
                var b = $(this).data("owner");
                b.shadow.hide();
                b.shadow.remove();
                b.containerWrapper.remove();
                b.container.empty();
                b.attached = false;
                b.isClosing = false
            };
            $("#wrapper").removeClass("blur");
            this.containerWrapper.fadeOut(a);
            this.scrollingDone = false
        }
    }
}

function Sitemap() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.data = null;
    this.menuClick = function(a) {};
    this.Show = function() {
        var d = this.pages.Sitemap;
        var f = this.pages.SitemapMenuItem;
        var c = "";
        for (var b in this.data) {
            var h = this.data[b];
            if (h.Name.indexOf("@") > -1) {
                continue
            }
            var a = genActionLink({
                ctrlr: this,
                itm: h
            }, function(j) {
                j.ctrlr.menuClick(j.itm)
            });
            var e = f;
            e = e.replace("#TITLE#", h.Name.toUpperCase());
            e = e.replace("#LNK#", a);
            var g = h.Desc;
            if (g == "") {
                g = "No description available"
            }
            e = e.replace("#DESCRIPTION#", g);
            c += e
        }
        d = d.replace("#MENULIST#", c);
        $(this.pagesContainer).html(d);
        if (this.afterShowPage != null) {
            this.afterShowPage()
        }
    };
    this.close_click = function() {
        if (this.onClose != null) {
            this.onClose()
        }
    }
}
"use strict";

function StoreAddressLocator() {
    this.pagesContainer = $("#StoreLocatorContainer").get(0);
    this.map_autocomplete = null;
    this.DeliveryBtnUI = null;
    this.TakewayBtnUI = null;
    this.OrderModeUIName = null;
    this.NowBtnUI = null;
    this.FutureBtnUI = null;
    this.OrderModeToggleUI = null;
    this.OrderModeSelected = "Delivary";
    this.OrderTimeSelected = "now";
    this.DeliveryTime = "2000-01-01 00:00:00";
    this.NewAddressUI = null;
    this.MapSearchFldUI = null;
    this.SearchFldUI = null;
    this.SearchBtnUI = null;
    this.SearchFieldContainerUI = null;
    this.LoginBtnUI = null;
    this.UseCurrentLocationBtnUI = null;
    this.MapContainerUI = null;
    this.LinksContainerUI = null;
    this.MoreLocationsBtnUI = null;
    this.LessLocationsBtnUI = null;
    this.LocationsCountUI = null;
    this.CloseBtnUI = null;
    this.AddressesContainerUI = null;
    this.StoresContainerUI = null;
    this.NewAddressBtnUI = null;
    this.SavedAddressesBtnUI = null;
    this.AddressTypeUI = null;
    this.CityUI = null;
    this.DistrictUI = null;
    this.AreaUI = null;
    this.RoadUI = null;
    this.BuildingNameUI = null;
    this.BuildingNumUI = null;
    this.AddressDescUI = null;
    this.FlatNumUI = null;
    this.futureElementsContainerUI = null;
    this.OrderTimeRadioUI = null;
    this.minDate = getServerTime();
    this.dateFieldUI = null;
    this.hourFieldUI = null;
    this.minFieldUI = null;
    this.useCalendar = true;
    this.orderTimeElements = {};
    this.map = null;
    this.addressMarkers = [];
    this.storeMarkers = [];
    this.findStores_lastFillPage = 0;
    this.findStores_lastAllowedIDs = null;
    this.address_lastFillPage = 0;
    this.address_longitude = 0;
    this.address_latitude = 0;
    this.pageSize = 3;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.onClose = null;
    this.isVisible = false;
    this.checkoutAfterClose = false;
    this.newAddressLatLng = null;
    this.newAddressMarker = null;
    this.mapSearchAreaName = null;
    this.curPosition = null;
    this.placeID = null;
    this.UseMap = true;
    this.onUpdateCartInfo = function() {};
    this.onDataChanged = function() {};
    this.onSubmitNewAddress = function() {};
    this.Init = function() {
        document._addressLocator = this;
        document._continueInit = function() {
            document._addressLocator.continueInit()
        };
        loadGoogleMapsJS(document._continueInit)
    };
    this.continueInit = function() {
        var y = createUUID();
        var v = createUUID();
        var w = createUUID();
        var r = createUUID();
        var V = createUUID();
        var Y = createUUID();
        var P = createUUID();
        var z = createUUID();
        var B = createUUID();
        var U = createUUID();
        var T = createUUID();
        var l = createUUID();
        var c = createUUID();
        var ad = createUUID();
        var C = createUUID();
        var e = createUUID();
        var j = createUUID();
        var W = createUUID();
        var ab = createUUID();
        var b = createUUID();
        var M = createUUID();
        var A = createUUID();
        var s = createUUID();
        var Z = createUUID();
        var K = createUUID();
        var N = createUUID();
        var S = createUUID();
        var F = createUUID();
        var f = createUUID();
        var p = createUUID();
        var E = createUUID();
        var G = createUUID();
        var R = createUUID();
        var I = createUUID();
        var q = createUUID();
        var x = createUUID();
        var h = createUUID();
        var m = createUUID();
        var aa = createUUID();
        var o = createUUID();
        var X = createUUID();
        var J = createUUID();
        var Q = createUUID();
        var L = createUUID();
        var O = createUUID();
        var H = HTML_Pages.StoreAddressLocator_Main;
        H = H.replace(/#ORDER_MODE_DELIVERY#/gi, y);
        H = H.replace(/#ORDER_MODE_TAKEWAY#/gi, v);
        H = H.replace(/#ORDER_MODE#/gi, w);
        H = H.replace(/#ORDER_TIME_NOW#/gi, E);
        H = H.replace(/#ORDER_TIME_FUTURE#/gi, G);
        H = H.replace(/#ADVANCE_COMBOCONTAINER#/gi, I);
        H = H.replace(/#ADVANCE_CALENDAR_CONTAINER#/gi, q);
        H = H.replace(/#DELIVERY_DATE#/gi, x);
        H = H.replace(/#DELIVERY_DATE_ADVANCE#/gi, h);
        H = H.replace(/#DELIVERY_DATE_HOUR#/gi, m);
        H = H.replace(/#DELIVERY_DATE_MINUTE#/gi, aa);
        H = H.replace(/#ORDER_TIME#/gi, o);
        H = H.replace(/#DELIVERY_DATE_LABEL#/gi, X);
        H = H.replace(/#DELIVERY_DATE_VALUE#/gi, J);
        H = H.replace(/#FUTURE_ORDER_ELEMENTS#/gi, Q);
        H = H.replace("#SAVEDADDRESSES#", N);
        H = H.replace("#NEWADDRESS#", K);
        H = H.replace("#ORDER_MODE_TOGGLE#", p);
        H = H.replace("#SEARCH_FIELD_CONTAINER#", r);
        H = H.replace("#SEARCH_FLD#", V);
        H = H.replace("#MAP_SEARCH_FLD#", Y);
        H = H.replace("#SEARCH_BTN#", P);
        H = H.replace("#LOGIN_BTN#", z);
        H = H.replace("#CURRENT_LOCATION#", B);
        H = H.replace("#MAP_CONTAINER#", U);
        H = H.replace("#LINKS_CONTAINER#", R);
        H = H.replace("#LOCATIONS_NEXT#", T);
        H = H.replace("#LOCATIONS_PREV#", l);
        H = H.replace("#LOCATIONS_PAGE#", c);
        H = H.replace("#STORES_CONTAINER#", ad);
        H = H.replace("#ADDRESSES_CONTAINER#", C);
        H = H.replace("#NEWADDRESS_CONTAINER#", e);
        H = H.replace("#ADDRESSTYPE#", j);
        H = H.replace("#CITY#", W);
        H = H.replace("#DISTRICT#", ab);
        H = H.replace("#AREA#", b);
        H = H.replace("#ROAD#", M);
        H = H.replace("#BUILDINGNAME#", A);
        H = H.replace("#BUILDINGNUM#", s);
        H = H.replace("#FLATNUM#", Z);
        H = H.replace(/#CLOSE#/gi, F);
        H = H.replace("#SUBMITNEWADDRS#", f);
        H = H.replace("#ADDRESS_DESC#", S);
        H = H.replace(/#MANUALADDRESS#/gi, L);
        H = H.replace(/#MAPADDRESS#/gi, O);
        $(this.pagesContainer).html(H);
        this.orderTimeElements = {
            ComboContainerID: I,
            CalendarContainerID: q,
            inputID: x,
            dateFieldID: h,
            hourFieldID: m,
            minFieldID: aa,
            OrderTimeRadioName: o,
            deliveryDateLabelID: X,
            deliveryDateValueID: J
        };
        this.AddressDescUI = $("#" + S);
        this.DeliveryBtnUI = $("#" + y);
        this.TakewayBtnUI = $("#" + v);
        this.OrderModeUIName = w;
        this.NowBtnUI = $("#" + E);
        this.FutureBtnUI = $("#" + G);
        this.NewAddressBtnUI = $("#" + K);
        this.OrderModeToggleUI = $("#" + p);
        this.SearchFieldContainerUI = $("#" + r);
        this.LinksContainerUI = $("#" + R);
        this.futureElementsContainerUI = $("#" + Q);
        this.OrderTimeRadioName = o;
        this.dateFieldUI = $("#" + h);
        this.hourFieldUI = $("#" + m);
        this.minFieldUI = $("#" + aa);
        this.SearchFldUI = $("#" + V);
        this.SearchBtnUI = $("#" + P);
        this.SearchFldUI.data("owner", this);
        this.SearchFldUI.keypress(function(ae) {
            if (ae.keyCode == 13) {
                $(this).data("owner").Search($(this).val())
            }
        });
        this.MapSearchFldUI = $("#" + Y);
        this.SearchBtnUI.data("owner", this);
        this.SearchBtnUI.data("textfld", this.SearchFldUI);
        this.SearchBtnUI.click(function() {
            $(this).data("owner").Search($(this).data("textfld").val())
        });
        this.LoginBtnUI = $("#" + z);
        this.LoginBtnUI.data("owner", this);
        this.LoginBtnUI.click(function() {
            $(this).data("owner").Close();
            showLoginWindow()
        });
        var k = this;
        this.manualAddressUI = $("#" + L);
        this.manualAddressUI.data("owner", this);
        this.manualAddressUI.click(function() {
            $("#manualAddress").show();
            $("#" + U).hide();
            $("#" + L).addClass("active");
            $("#" + O).removeClass("active");
            k.UseMap = false;
            $(".areanotservedmsg").hide()
        });
        this.mapAddressUI = $("#" + O);
        this.mapAddressUI.data("owner", this);
        this.mapAddressUI.click(function() {
            $("#manualAddress").hide();
            $("#" + U).show();
            $("#" + O).addClass("active");
            $("#" + L).removeClass("active");
            k.UseMap = true;
            ValidateIfAreaIsServed(k.UseMap, k.address_latitude, k.address_longitude, false, null)
        });
        if (AddressEntryType != "Both") {
            $("#mapButtons").hide()
        } else {
            $("#mapButtons").show()
        }
        if (AddressEntryType == "Both" || AddressEntryType == "Map") {
            $("#" + U).show();
            $("#manualAddress").hide();
            this.UseMap = true
        } else {
            $("#" + U).hide();
            $("#manualAddress").show();
            this.UseMap = false
        }
        this.UseCurrentLocationBtnUI = $("#" + B);
        this.UseCurrentLocationBtnUI.data("owner", this);
        this.UseCurrentLocationBtnUI.click(function() {
            $(this).data("owner").MoveMapToCurrentLocation()
        });
        this.SubmitNewAddrBtnUI = $("#" + f);
        this.SubmitNewAddrBtnUI.data("owner", this);
        this.SubmitNewAddrBtnUI.click(function() {
            var ae = $(this).data("owner");
            $(this).data("owner").newAddressValidator.ValidateBeforePost(function(af) {
                ae.SubmitNewAddr()
            })
        });
        this.SavedAddressesBtnUI = $("#" + N);
        this.SavedAddressesBtnUI.data("owner", this);
        this.SavedAddressesBtnUI.click(function() {
            $(this).data("owner").ShowDelivery()
        });
        var D = {
            AddressTypeID: j,
            CityID: W,
            AreaID: b,
            RoadID: M,
            FlatNumID: Z,
            BuildingNameID: A,
            DistrictID: ab
        };
        this.newAddressValidator = new FormValidator($("#newAddress"), {
            CityID: {
                customValidation: function(af, ag, ai) {
                    var ah = $("#" + af).val();
                    var ae = AddressEntryType == "Manual";
                    if (!ah && ae) {
                        ai(false, Translate("Please select a city"), ag)
                    } else {
                        ai(true, "", ag)
                    }
                }
            },
            AreaID: {
                customValidation: function(af, ag, ai) {
                    var ah = $("#" + af).val();
                    var ae = AddressEntryType == "Manual";
                    if (!ah && ae) {
                        ai(false, Translate("Please select an area value"), ag)
                    } else {
                        ai(true, "", ag)
                    }
                }
            },
            RoadID: {
                customValidation: function(af, ag, ai) {
                    var ah = $("#" + af).val();
                    var ae = AddressEntryType == "Manual";
                    if (!ah && ae) {
                        ai(false, Translate("Please enter a road value"), ag)
                    } else {
                        ai(true, "", ag)
                    }
                }
            },
            BuildingNameID: {
                required: true,
                requiredMsg: Translate("Please enter a building name or description")
            },
            FlatNumID: {
                required: true,
                requiredMsg: Translate("Please enter a flat number")
            },
            DistrictID: {
                required: true,
                requiredMsg: Translate("Please select a district value")
            }
        }, D);
        this.newAddressValidator.onShowValidateMessage = function(ai, ae, ag, ah, aj) {
            var af = null;
            if (typeof(D) !== "undefined" || D != null) {
                ae = D[ae]
            }
            if (!ai) {
                tooltip($("#" + ae), ah, 0, aj, af)
            } else {
                tooltip($("#" + ae), "", 1, false, af)
            }
        };
        this.MapContainerUI = $("#" + U);
        var a = new google.maps.LatLng(DefaultMapAddressLocation.split(",")[0].trim(), DefaultMapAddressLocation.split(",")[1].trim());
        this.curPosition = new google.maps.LatLng(0, 0);
        this.map = new google.maps.Map(this.MapContainerUI.get(0), {
            zoom: 6,
            center: a,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        this.MoreLocationsBtnUI = $("#" + T);
        this.MoreLocationsBtnUI.data("owner", this);
        this.MoreLocationsBtnUI.click(function() {
            if (isResponsive && $(window).width() < 800) {
                window.scrollTo(0, ($(this).data("owner").StoresContainerUI.offset().top - 20))
            }
            $(this).data("owner").ShowMoreLocation();
            return false
        });
        this.LessLocationsBtnUI = $("#" + l);
        this.LessLocationsBtnUI.data("owner", this);
        this.LessLocationsBtnUI.click(function() {
            if (isResponsive && $(window).width() < 800) {
                window.scrollTo(0, ($(this).data("owner").StoresContainerUI.offset().top - 20))
            }
            $(this).data("owner").ShowLessLocation();
            return false
        });
        this.LocationsCountUI = $("#" + c);
        this.AddressesContainerUI = $("#" + C);
        this.StoresContainerUI = $("#" + ad);
        this.NewAddressContainerUI = $("#" + e);
        this.AddressTypeUI = $("#" + j);
        this.CityUI = $("#" + W);
        this.DistrictUI = $("#" + ab);
        this.AreaUI = $("#" + b);
        this.RoadUI = $("#" + M);
        this.BuildingNameUI = $("#" + A);
        this.BuildingNumUI = $("#" + s);
        this.FlatNumUI = $("#" + Z);
        if (this.AreaUI.is("select")) {
            if (useJUICombo) {
                this.AreaUI.combobox({
                    enableInput: true
                })
            }
        }
        FillDropDownList(j, OriginalAddressTypes, true);
        FillDropDownList(W, OriginalCities, true);
        this.CityUI.val(DefCityID);
        if (useJUICombo) {
            if (this.CityUI.is("select")) {
                this.CityUI.combobox()
            }
            if (this.DistrictUI.is("select")) {
                this.DistrictUI.combobox()
            }
            this.AddressTypeUI.combobox()
        }
        var u = this;
        var ac = function(ag, ae) {
            if (typeof u.DistrictUI === "undefined" || u.DistrictUI == null) {
                return
            }
            var af = 0;
            var ah = 0;
            ah = u.CityUI.val();
            if (typeof OriginalCities[ah] !== "undefined") {
                af = OriginalCities[ah].ProvinceID
            } else {
                ah = 0
            }
            $.ajax({
                type: "GET",
                url: "/Find/Customer/District?ShowWait=0",
                dataType: "json",
                data: {
                    province: af,
                    city: ah,
                    term: (typeof ag !== "undefined" && ag != null && typeof ag.term !== "undefined" && ag.term != null) ? ag.term : ""
                },
                success: function(aj) {
                    u.DistrictUI.children().remove();
                    if (useJUICombo || useBoxIt) {
                        u.DistrictUI.append($("<option value=''>- " + Translate("Select a value") + " -</option>"))
                    } else {
                        u.DistrictUI.append($("<option value=''>- " + Translate("District") + " -</option>"))
                    }
                    for (var ak in aj) {
                        var ai = aj[ak];
                        u.DistrictUI.append($("<option value='" + aj[ak] + "'>" + aj[ak] + "</option>"))
                    }
                    u.DistrictUI.val("").change();
                    if (u.onDataChanged != null) {
                        u.onDataChanged()
                    }
                }
            })
        };
        var d = function(ag, ae) {
            if (typeof u.AreaUI === "undefined" || u.AreaUI == null) {
                return
            }
            var af = 0;
            var ah = 0;
            ah = u.CityUI.val();
            if (typeof OriginalCities[ah] !== "undefined") {
                af = OriginalCities[ah].ProvinceID
            } else {
                ah = 0
            }
            $.ajax({
                type: "GET",
                url: "/Find/Customer/Area?ShowWait=0",
                dataType: "json",
                data: {
                    province: af,
                    city: ah,
                    term: (typeof ag !== "undefined" && ag != null && typeof ag.term !== "undefined" && ag.term != null) ? ag.term : ""
                },
                success: function(ak) {
                    u.AreaUI.children().remove();
                    if (useJUICombo || useBoxIt) {
                        u.AreaUI.append($("<option value=''>- " + Translate("Select a value") + " -</option>"))
                    } else {
                        u.AreaUI.append($("<option value=''>- " + Translate("Area") + " -</option>"))
                    }
                    var ai = null;
                    for (var al in ak) {
                        var aj = ak[al];
                        if (typeof u.mapSearchAreaName != "undefined" && u.mapSearchAreaName != null && namesSimilar(u.mapSearchAreaName, ak[al])) {
                            ai = ak[al]
                        }
                        u.AreaUI.append($("<option value='" + ak[al] + "'>" + ak[al] + "</option>"))
                    }
                    if (ai != null) {
                        u.AreaUI.val(ai)
                    } else {
                        u.AreaUI.val(Translate("Select a value")).change()
                    }
                    if (u.onDataChanged != null) {
                        u.onDataChanged()
                    }
                }
            })
        };
        this.AreaUI.autocomplete({
            source: function(af, ae) {
                var ag = 0;
                var ah = 0;
                ah = u.CityUI.val();
                if (typeof OriginalCities[ah] !== "undefined") {
                    ag = OriginalCities[ah].ProvinceID
                } else {
                    ah = 0
                }
                $.ajax({
                    type: "GET",
                    url: "/Find/Customer/Area?ShowWait=0",
                    dataType: "json",
                    data: {
                        province: ag,
                        city: ah,
                        term: af.term
                    },
                    success: function(ai) {
                        ae(ai)
                    }
                })
            },
            minLength: 2
        });
        if (this.DistrictUI.is("select")) {
            this.CityUI.change(ac)
        }
        this.CityUI.change(d);
        ac();
        d();
        this.CloseBtnUI = $("." + F);
        this.CloseBtnUI.data("owner", this);
        this.CloseBtnUI.click(function() {
            $(this).data("owner").Close()
        });
        this.TakewayBtnUI.data("owner", this);
        this.TakewayBtnUI.click(function() {
            $(this).data("owner").ShowTakeway()
        });
        this.DeliveryBtnUI.data("owner", this);
        this.DeliveryBtnUI.click(function() {
            $(this).data("owner").ShowDelivery()
        });
        this.OrderModeToggleUI.data("owner", this);
        this.OrderModeToggleUI.unbind("click");
        this.OrderModeToggleUI.unbind("click").click(function(ae) {
            $(this).data("owner").ToggleOrderMode();
            ae.preventDefault()
        });
        this.NewAddressBtnUI.data("owner", this);
        this.NewAddressBtnUI.click(function() {
            $(this).data("owner").ShowDeliveryNewAddress()
        });
        this.CloseBtnUI.data("owner", this);
        this.CloseBtnUI.click(function() {
            $(this).data("owner").Close()
        });
        this.NowBtnUI.data("owner", this);
        this.NowBtnUI.click(function() {
            $(this).data("owner").SelectNowAsOrderTime()
        });
        this.FutureBtnUI.data("owner", this);
        this.FutureBtnUI.click(function() {
            $(this).data("owner").SelectFutureAsOrderTime()
        });
        this.MoreLocationsBtnUI.hide();
        this.LessLocationsBtnUI.hide();
        this.LocationsCountUI.hide();
        this.SavedAddressesBtnUI.hide();
        this.MapSearchFldUI.hide();
        showFutureOrderFields(this);
        var g = this;
        if (navigator.geolocation) {
            getGPSLocation(function(ae) {
                g.curPosition = ae;
                g.map.setCenter(g.curPosition);
                g.map.setZoom(16);
                g.continueDisplayStores()
            })
        } else {
            this.continueDisplayStores()
        }
        setTimeout(function() {
            if (g.curPosition.lat() == 0) {
                g.continueDisplayStores()
            }
        }, 7000);
        this.activateMapSearch();
        this.Refresh();
        if (cart.postOrderID > 0) {
            $("input:radio[name=" + o + "]").prop("disabled", true);
            var t = cart.cartHeader.delivarytime_type != "advance";
            $("#" + h).prop("disabled", t);
            $("#" + m).prop("disabled", t);
            $("#" + aa).prop("disabled", t);
            $("input:radio[name=" + o + "]").prop("disabled", true);
            $("#" + x).prop("disabled", t)
        }
        updateDateLabel(this)
    };
    this.continueDisplayStores = function() {
        this.FillStores(0);
        this.showMarkers(true, true)
    };
    this.createNewAddressMarker = function(a) {
        var b = this;
        this.address_latitude = a.lat();
        this.address_longitude = a.lng();
        this.map.setCenter(a);
        this.map.setZoom(16);
        this.newAddressLatLng = a;
        this.newAddressMarker = new google.maps.Marker({
            map: this.map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: this.newAddressLatLng
        });
        google.maps.event.addListener(this.newAddressMarker, "position_changed", function() {
            var c = b.newAddressMarker.getPosition();
            b.address_latitude = c.lat();
            b.address_longitude = c.lng()
        });
        google.maps.event.addListener(this.newAddressMarker, "dragend", function(c) {
            b.AddressDescUI.val("");
            GetPlace(b.map, c.latLng, function(d) {
                b.AddressDescUI.val(d.formatted_address)
            });
            ValidateIfAreaIsServed(b.UseMap, b.address_latitude, b.address_longitude, false, null)
        })
    };
    this.startCreateNewAddressMarker = function() {
        var a = this;
        if (this.newAddressMarker == null) {
            getGPSLocation(function(b) {
                a.createNewAddressMarker(b);
                a.AddressDescUI.val("");
                GetPlace(a.map, b, function(c) {
                    a.AddressDescUI.val(c.formatted_address)
                });
                ValidateIfAreaIsServed(a.UseMap, a.address_latitude, a.address_longitude, false, null)
            }, this.mapAddressUI.length == 0 ? true : false)
        } else {
            this.map.setCenter(this.newAddressLatLng);
            this.map.setZoom(16)
        }
    };
    this.removeNewAddressMarker = function() {
        if (this.newAddressMarker != null) {
            this.newAddressMarker.setMap(null);
            this.newAddressMarker.unbindAll();
            google.maps.event.clearListeners(this.newAddressMarker, "click");
            this.newAddressMarker = null
        }
    };
    this.ToggleOrderMode = function() {
        if (this.OrderModeSelected == "Delivary") {
            this.ShowTakeway()
        } else {
            this.ShowDelivery()
        }
    };
    this.ShowTakeway = function() {
        this.OrderModeSelected = "Takeout";
        this.OrderModeToggleUI.removeClass("delivery");
        this.OrderModeToggleUI.addClass("takeaway");
        this.findStores_lastFillPage = 0;
        this.findStores_lastAllowedIDs = null;
        this.TakewayBtnUI.addClass("active");
        this.DeliveryBtnUI.removeClass("active");
        if (typeof this.DeliveryBtnUI[0] != "undefined" && this.DeliveryBtnUI[0].type == "radio") {
            $("input:radio[name=" + this.OrderModeUIName + "][value=delivery]").prop("checked", false);
            $("input:radio[name=" + this.OrderModeUIName + "][value=carryout]").prop("checked", true)
        }
        this.SearchFldUI.prop("disabled", false);
        this.StoresContainerUI.show();
        this.AddressesContainerUI.hide();
        this.NewAddressContainerUI.hide();
        this.MapSearchFldUI.hide();
        this.SearchFldUI.show();
        this.MoreLocationsBtnUI.show();
        this.LessLocationsBtnUI.show();
        this.LocationsCountUI.show();
        this.clearMarkers();
        this.showMarkers(true, false);
        this.SearchFldUI.val("");
        this.FillStores(0);
        this.removeNewAddressMarker()
    };
    this.ShowDelivery = function() {
        this.OrderModeSelected = "Delivary";
        this.OrderModeToggleUI.removeClass("takeaway");
        this.OrderModeToggleUI.addClass("delivery");
        this.address_lastFillPage = 0;
        if (!userLogin.isLoggedIn()) {
            this.ShowDeliveryNewAddress();
            return
        }
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
        this.clearMarkers();
        this.showMarkers(false, true);
        this.removeNewAddressMarker();
        this.FillAddresses()
    };
    this.ShowDeliveryNewAddress = function() {
        this.TakewayBtnUI.removeClass("active");
        this.DeliveryBtnUI.addClass("active");
        if (typeof this.DeliveryBtnUI[0] !== "undefined" && this.DeliveryBtnUI[0].type == "radio") {
            $("input:radio[name=" + this.OrderModeUIName + "][value=delivery]").prop("checked", true);
            $("input:radio[name=" + this.OrderModeUIName + "][value=carryout]").prop("checked", false)
        }
        this.StoresContainerUI.hide();
        this.AddressesContainerUI.hide();
        this.NewAddressContainerUI.show();
        this.MoreLocationsBtnUI.hide();
        this.LessLocationsBtnUI.hide();
        this.LocationsCountUI.hide();
        this.MapSearchFldUI.show();
        this.SearchFldUI.hide();
        this.clearMarkers();
        this.startCreateNewAddressMarker();
        if (this.UseMap) {
            this.mapAddressUI.click()
        } else {
            this.manualAddressUI.click()
        }
        google.maps.event.trigger(this.map, "resize")
    };
    this.FillAddresses = function(f) {
        this.AddressesContainerUI.empty();
        if (userLogin.isLoggedIn()) {
            if (typeof f === "undefined") {
                f = 0
            }
            var e = Math.ceil(this.getCount(userLogin.customerData.Addresses) / this.pageSize);
            if (f >= e) {
                f = e - 1
            }
            if (f < 0) {
                f = 0
            }
            this.address_lastFillPage = f;
            var h = 0;
            for (var c in userLogin.customerData.Addresses) {
                if ((h >= (f * this.pageSize)) && (h < (f * this.pageSize + this.pageSize))) {
                    var a = userLogin.customerData.Addresses[c];
                    var g = createUUID();
                    var d = HTML_Pages.StoreAddressLocator_Address;
                    d = d.replace("#ID#", a.ID);
                    d = d.replace("#NO#", (h + 1));
                    d = d.replace("#NAME#", a.Name);
                    d = d.replace("#DESCRIPTION#", a.Description);
                    d = d.replace("#CHOOSEBTN#", g);
                    var b = $(d);
                    this.AddressesContainerUI.append(b);
                    $("#" + g).data("owner", this);
                    $("#" + g).data("obj_id", a.ID);
                    $("#" + g).data("obj", a);
                    $("#" + g).click(function() {
                        $(this).data("owner").SelectAddressFromList($(this).data("obj"))
                    });
                    $("#" + g).mouseenter(function() {
                        $(this).data("owner").MoveMapToAddress($(this).data("obj_id"))
                    })
                }
                h++
            }
            if (f == e - 1) {
                this.MoreLocationsBtnUI.hide()
            } else {
                this.MoreLocationsBtnUI.show()
            }
            if (f == 0) {
                this.LessLocationsBtnUI.hide()
            } else {
                this.LessLocationsBtnUI.show()
            }
            this.LocationsCountUI.show();
            this.LocationsCountUI.html((f + 1).toString() + "/" + e.toString())
        } else {
            var d = HTML_Pages.StoreAddressLocator_AddressBeforeLogin;
            this.AddressesContainerUI.append($(d))
        }
    };
    this.getCount = function(c) {
        var b = 0;
        for (var a in c) {
            b++
        }
        return b
    };
    this.sortStoresByDistance = function() {
        var b = [];
        for (var d in OriginalStores) {
            if ((OriginalStores[d].Services == "Dine-in") || (!OriginalStores[d].Takeout)) {
                continue
            }
            b.push(OriginalStores[d])
        }
        var c = this.curPosition.lat();
        var a = this.curPosition.lng();
        b = b.sort(function(f, e) {
            if (f.MapLocation.Latitude == 0 && e.MapLocation.Latitude == 0) {
                return 0
            } else {
                if (f.MapLocation.Latitude != 0 && e.MapLocation.Latitude == 0) {
                    return -1
                } else {
                    if (f.MapLocation.Latitude == 0 && e.MapLocation.Latitude != 0) {
                        return 1
                    } else {
                        var h = distanceBetweenTwoPoints(f.MapLocation.Latitude, f.MapLocation.Longitude, c, a);
                        var g = distanceBetweenTwoPoints(e.MapLocation.Latitude, e.MapLocation.Longitude, c, a);
                        if (h > g) {
                            return 1
                        } else {
                            if (h < g) {
                                return -1
                            } else {
                                return 0
                            }
                        }
                    }
                }
            }
        });
        return b
    };
    this.FillStores = function(o, f) {
        if (typeof o === "undefined") {
            o = 0
        }
        var r = [];
        for (var g in OriginalStores) {
            if ((OriginalStores[g].Services == "Dine-in") || (!OriginalStores[g].Takeout)) {
                continue
            }
            r.push(OriginalStores[g])
        }
        var l = (typeof f !== "undefined" && f != null) ? this.getCount(f) : this.getCount(r);
        var a = Math.ceil(l / this.pageSize);
        if (o >= a) {
            o = a - 1
        }
        if (o < 0) {
            o = 0
        }
        this.findStores_lastFillPage = o;
        this.findStores_lastAllowedIDs = f;
        this.StoresContainerUI.empty();
        var c = 0;
        var h = this.sortStoresByDistance();
        l = this.getCount(h);
        var a = Math.ceil(l / this.pageSize);
        for (var g in h) {
            var q = h[g];
            if (typeof f !== "undefined" && f != null && f.indexOf(q.ID) == -1) {
                continue
            }
            if ((c >= (o * this.pageSize)) && (c < (o * this.pageSize + this.pageSize))) {
                var e = createUUID();
                var p = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
                var d = new Date();
                var b = convertToAmPmTime(q[p[d.getDay()] + "TakeoutStart"]);
                var k = convertToAmPmTime(q[p[d.getDay()] + "TakeoutEnd"]);
                var j = HTML_Pages.StoreAddressLocator_Store;
                j = j.replace("#ID#", q.ID);
                j = j.replace("#NAME#", q.Name);
                j = j.replace("#NO#", c + 1);
                j = j.replace("#DESCRIPTION#", q.Address);
                j = j.replace("#CHOOSEBTN#", e);
                j = j.replace(/#CLOSEDMSG_VISIBILITY#/gi, q.IsInWorkHours ? "none" : "block");
                j = j.replace("#WORKINGHOURS#", b + "-" + k);
                var m = $(j);
                this.StoresContainerUI.append(m);
                $("#" + e).data("owner", this);
                $("#" + e).data("obj_id", q.ID);
                $("#" + e).data("obj", q);
                $("#" + e).click(function() {
                    $(this).data("owner").SelectStoreFromList($(this).data("obj"))
                });
                $("#" + e).mouseenter(function() {
                    $(this).data("owner").MoveMapToStore($(this).data("obj_id"))
                })
            }
            c++
        }
        if (o == a - 1) {
            this.MoreLocationsBtnUI.hide()
        } else {
            this.MoreLocationsBtnUI.show()
        }
        if (o == 0) {
            this.LessLocationsBtnUI.hide()
        } else {
            this.LessLocationsBtnUI.show()
        }
        this.LocationsCountUI.show();
        this.LocationsCountUI.html((o + 1).toString() + "/" + a.toString())
    };
    this.Search = function(a) {
        this.findStores_lastFillPage = 0;
        this.findStores_lastAllowedIDs = null;
        if (a != "") {
            serverQuery("/Handlers/StoreInfo.ashx", {
                Action: "FindStore",
                searchText: a
            }, function(d, c, b) {
                if (d && c.valid == true) {
                    var e = c.stores;
                    if (e != null) {
                        b.FillStores(0, e)
                    } else {
                        alert("No stores found")
                    }
                }
            }, this)
        } else {
            this.FillStores(0)
        }
    };
    this.MoveMapToCurrentLocation = function() {
        var a = this;
        getGPSLocation(function(b) {
            a.map.setCenter(b);
            a.map.setZoom(16);
            a.newAddressLatLng = b;
            a.curPosition = b;
            if (a.OrderModeSelected == "Takeout") {
                a.continueDisplayStores()
            }
        })
    };
    this.MoveMapToAddress = function(a) {
        for (var b in this.addressMarkers) {
            if (this.addressMarkers[b]["__address"]["ID"] == a) {
                this.map.setCenter(this.addressMarkers[b].getPosition());
                this.map.setZoom(16);
                break
            }
        }
    };
    this.MoveMapToStore = function(a) {
        for (var b in this.storeMarkers) {
            if (this.storeMarkers[b]["__store"]["ID"] == a) {
                this.map.setCenter(this.storeMarkers[b].getPosition());
                this.map.setZoom(16);
                break
            }
        }
    };
    this.ShowMoreLocation = function() {
        if (this.StoresContainerUI.is(":visible")) {
            this.FillStores(this.findStores_lastFillPage + 1, this.findStores_lastAllowedIDs)
        } else {
            this.FillAddresses(this.address_lastFillPage + 1)
        }
    };
    this.ShowLessLocation = function() {
        if (this.StoresContainerUI.is(":visible")) {
            this.FillStores(this.findStores_lastFillPage - 1, this.findStores_lastAllowedIDs)
        } else {
            this.FillAddresses(this.address_lastFillPage - 1)
        }
    };
    this.SelectStoreFromList = function(a) {
        this.MoveMapToStore(a.ID);
        this.UpdateCartHeader(false, a.ID, a);
        this.Close()
    };
    this.SelectAddressFromList = function(a) {
        this.MoveMapToAddress(a.ID);
        this.UpdateCartHeader(true, a.ID, a);
        this.Close()
    };
    this.SelectStoreFromMap = function(a, b) {
        this.UpdateCartHeader(false, a.ID, a);
        this.Close()
    };
    this.SelectAddressFromMap = function(a, b) {
        this.UpdateCartHeader(true, a.ID, a);
        this.Close()
    };
    this.showMarkers = function(k, c) {
        if (c && userLogin.isLoggedIn() && this.addressMarkers.length == 0) {
            for (var d in userLogin.customerData.Addresses) {
                var j = userLogin.customerData.Addresses[d];
                if (j.MapLocation.Latitude == 0 && j.MapLocation.Longitude == 0) {
                    continue
                }
                var f = new google.maps.LatLng(j.MapLocation.Latitude, j.MapLocation.Longitude);
                var b = new google.maps.Marker({
                    position: f,
                    map: this.map,
                    title: j.Name,
                    cursor: "pointer",
                    draggableCursor: "pointer",
                    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });
                this.addressMarkers.push(b);
                b.__owner = this;
                b.__address = j;
                google.maps.event.addListener(b, "click", function() {
                    this.__owner.SelectAddressFromMap(this.__address, this)
                })
            }
        }
        if (k && this.storeMarkers.length == 0) {
            for (var a in OriginalStores) {
                var h = OriginalStores[a];
                if ((OriginalStores[a].Services == "Dine-in") || (!OriginalStores[a].Takeout)) {
                    continue
                }
                if (h.MapLocation.Latitude == 0 && h.MapLocation.Longitude == 0) {
                    continue
                }
                var g = new google.maps.LatLng(h.MapLocation.Latitude, h.MapLocation.Longitude);
                var e = new google.maps.Marker({
                    position: g,
                    map: this.map,
                    title: h.Name,
                    cursor: "pointer",
                    draggableCursor: "pointer",
                    icon: "../Images/map_icon.png"
                });
                this.storeMarkers.push(e);
                e.__owner = this;
                e.__store = h;
                google.maps.event.addListener(e, "click", function() {
                    this.__owner.SelectStoreFromMap(this.__store, this)
                })
            }
        }
    };
    this.clearMarkers = function() {
        if (this.storeMarkers) {
            for (var b in this.storeMarkers) {
                var a = this.storeMarkers[b];
                a.setMap(null);
                a.unbindAll();
                google.maps.event.clearListeners(a, "click")
            }
            this.storeMarkers = []
        }
        if (this.addressMarkers) {
            for (var b in this.addressMarkers) {
                var a = this.addressMarkers[b];
                a.setMap(null);
                a.unbindAll();
                google.maps.event.clearListeners(a, "click")
            }
            this.addressMarkers = []
        }
    };
    this.Refresh = function() {
        google.maps.event.trigger(this.map, "resize");
        this.FillAddresses();
        if (typeof cart.cartHeader.DelivaryOrTakeout === "undefined") {
            cart.cartHeader.DelivaryOrTakeout = "Delivary";
            cart.cartHeader.AddressID = 0;
            if (userLogin.isLoggedIn()) {
                for (var b in userLogin.customerData.Addresses) {
                    var a = userLogin.customerData.Addresses[b];
                    cart.cartHeader.AddressID = a.ID;
                    break
                }
            }
        }
        if (cart.cartHeader.DelivaryOrTakeout == "Delivary") {
            if (!cart.cartHeader.NewAddress) {
                this.ShowDelivery()
            } else {
                this.ShowDeliveryNewAddress()
            }
        } else {
            this.ShowTakeway()
        }
        if (typeof cart.cartHeader.delivarytime_type === "undefined") {
            cart.cartHeader.delivarytime_type = "now"
        }
        if (cart.cartHeader.delivarytime_type == "now") {
            this.SelectNowAsOrderTime()
        } else {
            this.SelectFutureAsOrderTime()
        }
        if (cart.cartHeader.DelivaryOrTakeout == "Delivary" && cart.cartHeader.AddressID > 0) {
            this.MoveMapToAddress(cart.cartHeader.AddressID)
        } else {
            if (cart.cartHeader.StoreID > 0) {
                this.MoveMapToStore(cart.cartHeader.StoreID)
            } else {
                this.MoveMapToCurrentLocation()
            }
        }
        if (userLogin.isLoggedIn()) {
            this.LoginBtnUI.hide()
        } else {
            this.LoginBtnUI.show()
        }
    };
    this.SubmitNewAddr = function() {
        if ((this.CityUI.val() == -1 || this.CityUI.val() == "") && !this.UseMap) {
            alert(Translate("Please select the City"));
            return
        }
        var j = null;
        if ((typeof this.DistrictUI !== "undefined" && this.DistrictUI != null) && !this.UseMap) {
            if (this.DistrictUI.val() == -1 || this.DistrictUI.val() == "") {
                alert(Translate("Please select the District"));
                return
            }
            j = this.DistrictUI.val()
        }
        if ((typeof this.RoadUI !== "undefined" && this.RoadUI != null) && !this.UseMap) {
            if (this.RoadUI.val() == -1 || this.RoadUI.val() == "") {
                alert(Translate("Please enter the road"));
                return
            }
        }
        var b = null;
        if ((typeof this.AreaUI !== "undefined" && this.AreaUI != null) && !this.UseMap) {
            if (!this.AreaUI.val() || this.AreaUI.val() == -1 || this.AreaUI.val() == "") {
                alert(Translate("Please select the Area"));
                return
            }
            b = this.AreaUI.val()
        }
        if (typeof this.BuildingNameUI !== "undefined" && this.BuildingNameUI != null) {
            if (this.BuildingNameUI.val() == -1 || this.BuildingNameUI.val() == "") {
                alert(Translate("Please enter the building name"));
                return
            }
        }
        if (typeof this.FlatNumUI !== "undefined" && this.FlatNumUI != null) {
            if (this.FlatNumUI.val() == -1 || this.FlatNumUI.val() == "") {
                alert(Translate("Please enter the flat number"));
                return
            }
        }
        var g = this;
        var h = true;
        var a = true;
        for (var d = 0; d < cart.cartData.length; d++) {
            var k = OriginalItems[cart.cartData[0].ID];
            if (typeof k.Availability !== "undefined") {
                var f = k.Availability;
                var e = k.Availability.orderMode;
                if ((h && e.indexOf("delivery") > -1) || (!h && e.indexOf("takeaway") > -1)) {
                    a = true
                } else {
                    a = false;
                    break
                }
            }
        }
        var c = h ? "Takeaway" : "Delivery";
        if (!a) {
            confirm("Some items in your cart are only available for " + c + " if you wish to proceed with changing the order mode your cart will be emptied. Do you wish to proceed?", {
                owner: g
            }, function(m, l) {
                if (m) {
                    cart.cartData = [];
                    cart.updateCart();
                    ValidateIfAreaIsServed(l.owner.UseMap, l.owner.address_latitude, l.owner.address_longitude, true, function() {
                        cart.cartHeader.DelivaryOrTakeout = "Delivary";
                        cart.cartHeader.AddressID = 0;
                        cart.cartHeader.StoreID = 0;
                        cart.cartHeader.NewAddress = {
                            AddressID: -1,
                            AddressName: "Delivery Address",
                            AddressType: g.AddressTypeUI.val(),
                            BuildingName: g.BuildingNameUI.val(),
                            BuildingNum: g.BuildingNumUI.val(),
                            Road: g.RoadUI.val(),
                            District: j,
                            Area: b,
                            Province: (OriginalCities[g.CityUI.val()]) ? OriginalCities[g.CityUI.val()].ProvinceID : 0,
                            City: g.CityUI.val(),
                            CityName: g.CityUI.val(),
                            BuildingType: "",
                            County: "",
                            SubDistrict: "",
                            PostCode: "",
                            Floor: "",
                            FlatNo: g.FlatNumUI.val(),
                            Directions: g.AddressDescUI.val() ? g.AddressDescUI.val() : null,
                            TaxReceipt: "",
                            TaxNotes: "",
                            address_longitude: g.UseMap ? g.address_longitude : 0,
                            address_latitude: g.UseMap ? g.address_latitude : 0,
                            UseMap: g.UseMap
                        };
                        googleTag.push({
                            event: "NewAddress",
                            Category: "Order Mode",
                            ElementType: "",
                            ID: "",
                            Name: ""
                        });
                        ReloadMenu();
                        if (g.onUpdateCartInfo != null) {
                            g.onUpdateCartInfo()
                        }
                        if (g.onSubmitNewAddress != null) {
                            g.onSubmitNewAddress()
                        }
                        g.Close()
                    })
                } else {}
            })
        } else {
            ValidateIfAreaIsServed(g.UseMap, g.address_latitude, g.address_longitude, true, function() {
                cart.cartHeader.DelivaryOrTakeout = "Delivary";
                cart.cartHeader.AddressID = 0;
                cart.cartHeader.StoreID = 0;
                cart.cartHeader.NewAddress = {
                    AddressID: -1,
                    AddressName: "Delivery Address",
                    AddressType: g.AddressTypeUI.val(),
                    BuildingName: g.BuildingNameUI.val(),
                    BuildingNum: g.BuildingNumUI.val(),
                    Road: g.RoadUI.val(),
                    District: j,
                    Area: b,
                    Province: (OriginalCities[g.CityUI.val()]) ? OriginalCities[g.CityUI.val()].ProvinceID : 0,
                    City: g.CityUI.val(),
                    CityName: g.CityUI.val(),
                    BuildingType: "",
                    County: "",
                    SubDistrict: "",
                    PostCode: "",
                    Floor: "",
                    FlatNo: g.FlatNumUI.val(),
                    Directions: g.AddressDescUI.val() ? g.AddressDescUI.val() : null,
                    TaxReceipt: "",
                    TaxNotes: "",
                    address_longitude: g.UseMap ? g.address_longitude : 0,
                    address_latitude: g.UseMap ? g.address_latitude : 0,
                    UseMap: g.UseMap
                };
                googleTag.push({
                    event: "NewAddress",
                    Category: "Order Mode",
                    ElementType: "",
                    ID: "",
                    Name: ""
                });
                ReloadMenu();
                if (g.onUpdateCartInfo != null) {
                    g.onUpdateCartInfo()
                }
                if (g.onSubmitNewAddress != null) {
                    g.onSubmitNewAddress()
                }
                g.Close()
            })
        }
    };
    this.UpdateCartHeader = function(f, c, e) {
        delete cart.cartHeader.NewAddress;
        var d = "";
        if (f) {
            cart.cartHeader.DelivaryOrTakeout = "Delivary";
            cart.cartHeader.AddressID = c;
            cart.cartHeader.StoreID = 0;
            d = e.StoreNote;
            $("#OrderModeType").html(Translate("Delivery to"));
            $("#DeliveryTitle").html(e.Name);
            googleTag.push({
                event: "Delivery",
                Category: "Order Mode",
                ElementType: "",
                ID: "",
                Name: ""
            })
        } else {
            cart.cartHeader.DelivaryOrTakeout = "Takeaway";
            cart.cartHeader.AddressID = 0;
            cart.cartHeader.StoreID = c;
            d = e.StoreNote;
            $("#OrderModeType").html(Translate("Carryout from"));
            $("#DeliveryTitle").html(e.Name);
            googleTag.push({
                event: "Takeway",
                Category: "Order Mode",
                ElementType: "Store",
                ID: c,
                Name: e.Name
            })
        }
        var b = getServerTime();
        if (this.OrderTimeSelected == "now") {
            cart.cartHeader.delivarytime_type = "now";
            cart.cartHeader.delivarytime_date = "2000-01-01 00:00:00"
        } else {
            if (this.useCalendar) {
                var a = $("#" + this.inputID).val();
                b = new Date(getDateFromFormat(a, "yyyy/MM/dd HH:mm"))
            } else {
                b.setDate(b.getDate() + parseInt(this.dateFieldUI.val()));
                b.setHours(parseInt(this.hourFieldUI.val()));
                b.setMinutes(parseInt(this.minFieldUI.val()))
            }
            cart.cartHeader.delivarytime_type = "advance";
            cart.cartHeader.delivarytime_date = formatDate(b, "yyyy-MM-dd HH:mm:ss")
        }
        if (typeof d !== "undefined" && d != null && d != "") {
            Announcement(d)
        }
        ReloadMenu();
        if (this.onUpdateCartInfo != null) {
            this.onUpdateCartInfo()
        }
    };
    this.activateMapSearch = function() {
        if (this.map_autocomplete != null) {
            return
        }
        if (this.map == null) {
            return
        }
        this.map_autocomplete = new google.maps.places.Autocomplete(this.MapSearchFldUI.get(0), {
            componentRestrictions: {
                country: GoogleMapsCountryCode
            }
        });
        this.map_autocomplete.bindTo("bounds", this.map);
        var b = this.map_autocomplete;
        var a = this.map;
        var c = this;
        google.maps.event.addListener(this.map_autocomplete, "place_changed", function() {
            var d = b.getPlace();
            if (!d.geometry) {
                return
            }
            if (d.geometry.viewport) {
                a.fitBounds(d.geometry.viewport)
            } else {
                a.setCenter(d.geometry.location);
                a.setZoom(17)
            }
            c.newAddressLatLng = d.geometry.location;
            c.newAddressMarker.setPosition(d.geometry.location)
        })
    };
    this.dispose = function() {
        if (this.map_autocomplete != null) {
            google.maps.event.clearListeners(this.map_autocomplete, "place_changed");
            google.maps.event.clearListeners(this.map_autocomplete, "focus");
            google.maps.event.clearListeners(this.map_autocomplete, "blur");
            google.maps.event.clearListeners(this.map_autocomplete, "keydown");
            this.map_autocomplete.unbindAll();
            $(".pac-container").remove()
        }
        this.map_autocomplete = null;
        this.clearMarkers();
        google.maps.event.clearListeners(this.map, "click");
        this.map.unbindAll()
    };
    this.Close = function() {
        cart.updateCart();
        cart.saveToLocal();
        if (this.onClose != null) {
            this.onClose()
        }
        this.isVisible = false;
        if (this.isOrderModeSelected() && this.checkoutAfterClose) {
            showCheckout()
        }
        this.checkoutAfterClose = false;
        $(".areanotservedmsg").hide()
    };
    this.Show = function(a) {
        googleTag.push({
            event: "Open",
            Category: "Order Mode",
            ElementType: "",
            ID: "",
            Name: ""
        });
        if (typeof a !== "undefined") {
            this.checkoutAfterClose = a
        }
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        this.Refresh();
        google.maps.event.trigger(this.map, "resize");
        $(".pac-container").css("zIndex", getTopmostZIndex() + 99);
        $(".ui-autocomplete").css("zIndex", getTopmostZIndex() + 99);
        this.isVisible = true;
        google.maps.event.trigger(this.map, "resize")
    };
    this.Toggle = function() {
        if (!this.isVisible) {
            this.Show()
        } else {
            this.Close()
        }
    };
    this.isOrderModeSelected = function() {
        var a = true;
        if (typeof cart.cartHeader.DelivaryOrTakeout === "undefined" || typeof cart.cartHeader.AddressID === "undefined" || typeof cart.cartHeader.StoreID === "undefined") {
            a = false
        } else {
            if (cart.cartHeader.DelivaryOrTakeout == "Delivary" && cart.cartHeader.AddressID == 0 && typeof cart.cartHeader.NewAddress === "undefined") {
                a = false
            } else {
                if (cart.cartHeader.DelivaryOrTakeout == "Takeaway" && cart.cartHeader.StoreID == 0) {
                    a = false
                }
            }
        }
        return a
    };
    this.showIfRequired = function(a) {
        var b = this.isOrderModeSelected();
        if (!b) {
            this.Show(a)
        }
        return b
    };
    this.SelectNowAsOrderTime = function() {
        this.OrderTimeSelected = "now";
        this.DeliveryTime = "2000-01-01 00:00:00";
        this.futureElementsContainerUI.hide();
        $("input:radio[name=" + this.OrderTimeRadioName + "][value=advance]").prop("checked", false);
        $("input:radio[name=" + this.OrderTimeRadioName + "][value=now]").prop("checked", true)
    };
    this.SelectFutureAsOrderTime = function() {
        this.OrderTimeSelected = "advance";
        $("input:radio[name=" + this.OrderTimeRadioName + "][value=advance]").prop("checked", true);
        $("input:radio[name=" + this.OrderTimeRadioName + "][value=now]").prop("checked", false);
        this.futureElementsContainerUI.show()
    }
}
"use strict";

function StoreFromMap() {
    this.startLocationName = GoogleMapsCountry;
    this.Stores = {};
    this.pages = null;
    this.OnOk = null;
    this.OnCancel = null;
    this.width = 515;
    this.height = 400;
    this.APIKey = GoogleMapsKey;
    this.storedMarkers = [];
    this.map = null;
    this.activeStore = null;
    this.init = function() {
        if (typeof document._map === "undefined") {
            document._map = this;
            document._showMap = function() {
                document._map.show_Form()
            };
            loadGoogleMapsJS(document._showMap)
        } else {
            document._map = this;
            this.show_Form()
        }
    };
    this.show_Form = function() {
        var e = this;
        this.popupObj = new PopupForm();
        this.popupObj.width = this.width;
        this.popupObj.height = this.height;
        this.popupObj.borderColor = "#83633D";
        this.popupObj.backgroundColor = "rgb(210, 210, 210)";
        var d = HTML_Pages.StoreOnMap_Main;
        this.popupObj.container.html(d);
        var b = createMap($("#store_map").get(0), new google.maps.LatLng(0, 0));
        this.map = b;
        b.setZoom(6);
        var f = new google.maps.places.PlacesService(b);
        f.textSearch({
            query: this.startLocationName
        }, function(o, l) {
            if (l == google.maps.places.PlacesServiceStatus.OK) {
                for (var m = 0; m < o.length; m++) {
                    var k = o[m];
                    pos = k.geometry.location;
                    b.setCenter(pos);
                    e.setUsingGPS();
                    break
                }
            }
        });
        for (var c in this.Stores) {
            var j = this.Stores[c];
            if (j.MapLocation.Latitude == 0 && j.MapLocation.Longitude == 0) {
                continue
            }
            var h = new google.maps.LatLng(j.MapLocation.Latitude, j.MapLocation.Longitude);
            var g = new google.maps.Marker({
                position: h,
                map: this.map,
                title: j.Name,
                cursor: "pointer",
                draggableCursor: "pointer"
            });
            g.__store = j;
            this.storedMarkers.push(g);
            google.maps.event.addListener(g, "click", function() {
                e.activeStore = this.__store;
                e.OkClicked()
            })
        }
        var a = new google.maps.places.Autocomplete($("#StoreOnMap_Search").get(0), {
            componentRestrictions: {
                country: GoogleMapsCountryCode
            }
        });
        a.bindTo("bounds", b);
        this.autocomplete = a;
        google.maps.event.addListener(a, "place_changed", function() {
            var k = a.getPlace();
            if (!k.geometry) {
                return
            }
            if (k.geometry.viewport) {
                b.fitBounds(k.geometry.viewport)
            } else {
                b.setCenter(k.geometry.location);
                b.setZoom(17)
            }
        });
        $("#StoreOnMap_Cancel").data("ctrlr", this);
        $("#StoreOnMap_Cancel").click(function() {
            $(this).data("ctrlr").disposeItems();
            $(this).data("ctrlr").popupObj.Close();
            if ($(this).data("ctrlr").OnCancel != null) {
                $(this).data("ctrlr").OnCancel()
            }
        });
        this.popupObj.Show();
        google.maps.event.trigger(b, "resize");
        $(".pac-container").css("zIndex", getTopmostZIndex() + 99)
    };
    this.setUsingGPS = function() {
        var a = this;
        getGPSLocation(function(b) {
            a.map.setCenter(b)
        })
    };
    this.disposeItems = function() {
        google.maps.event.clearListeners(this.autocomplete, "place_changed");
        this.autocomplete.unbindAll();
        $(".pac-container").remove();
        if (this.storedMarkers != null) {
            for (var a in this.storedMarkers) {
                google.maps.event.clearListeners(this.storedMarkers[a], "click");
                this.storedMarkers[a].setMap(null);
                this.storedMarkers[a].unbindAll()
            }
        }
        this.storedMarkers = null;
        google.maps.event.clearListeners(this.map, "click");
        this.map.unbindAll();
        this.map = null;
        this.autocomplete = null
    };
    this.OkClicked = function() {
        if (this.activeStore == null) {
            alert("Please select a store first");
            return
        }
        var a = this;
        confirm("Do you want to select store '" + this.activeStore.Name + "'", null, function(b) {
            if (b) {
                a.disposeItems();
                a.popupObj.Close();
                if (a.OnOk != null) {
                    a.OnOk(a.activeStore)
                }
            }
        })
    }
}

function StoreInfo() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.onClose = null;
    this.storeID = 0;
    this.store = null;
    this.Show = function(b) {
        this.storeID = b;
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        googleTag.push({
            event: "PageView",
            PageName: "Store Page",
            PageURL: "/store/" + b
        });
        googleTag.push({
            event: "Open",
            Category: "Store Page",
            ElementType: "Store",
            ID: b,
            Name: OriginalStores[b]["Name"]
        });
        var c = OriginalStores[this.storeID];
        this.store = c;
        var f = this.pages.StoreInfo;
        var a = createUUID();
        f = f.replace(/#CARRYOUT#/gi, a);
        f = f.replace(/#STOREID#/gi, this.storeID);
        f = f.replace(/#STORE_NAME#/gi, c.Name);
        f = f.replace(/#STORE_ADDRESS#/gi, c.Address);
        f = f.replace(/#SUN_DELIVERY_TIME#/gi, convertToAmPmTime(c.SundayDeliveryStart) + " - " + convertToAmPmTime(c.SundayDeliveryEnd));
        f = f.replace(/#MON_DELIVERY_TIME#/gi, convertToAmPmTime(c.MondayDeliveryStart) + " - " + convertToAmPmTime(c.MondayDeliveryEnd));
        f = f.replace(/#TUE_DELIVERY_TIME#/gi, convertToAmPmTime(c.TuesdayDeliveryStart) + " - " + convertToAmPmTime(c.TuesdayDeliveryEnd));
        f = f.replace(/#WED_DELIVERY_TIME#/gi, convertToAmPmTime(c.WednesdayDeliveryStart) + " - " + convertToAmPmTime(c.WednesdayDeliveryEnd));
        f = f.replace(/#THU_DELIVERY_TIME#/gi, convertToAmPmTime(c.ThursdayDeliveryStart) + " - " + convertToAmPmTime(c.ThursdayDeliveryEnd));
        f = f.replace(/#FRI_DELIVERY_TIME#/gi, convertToAmPmTime(c.FridayDeliveryStart) + " - " + convertToAmPmTime(c.FridayDeliveryEnd));
        f = f.replace(/#SAT_DELIVERY_TIME#/gi, convertToAmPmTime(c.SaturdayDeliveryStart) + " - " + convertToAmPmTime(c.SaturdayDeliveryEnd));
        f = f.replace(/#SUN_CARRYOUT_TIME#/gi, convertToAmPmTime(c.SundayTakeoutStart) + " - " + convertToAmPmTime(c.SundayTakeoutEnd));
        f = f.replace(/#MON_CARRYOUT_TIME#/gi, convertToAmPmTime(c.MondayTakeoutStart) + " - " + convertToAmPmTime(c.MondayTakeoutEnd));
        f = f.replace(/#TUE_CARRYOUT_TIME#/gi, convertToAmPmTime(c.TuesdayTakeoutStart) + " - " + convertToAmPmTime(c.TuesdayTakeoutEnd));
        f = f.replace(/#WED_CARRYOUT_TIME#/gi, convertToAmPmTime(c.WednesdayTakeoutStart) + " - " + convertToAmPmTime(c.WednesdayTakeoutEnd));
        f = f.replace(/#THU_CARRYOUT_TIME#/gi, convertToAmPmTime(c.ThursdayTakeoutStart) + " - " + convertToAmPmTime(c.ThursdayTakeoutEnd));
        f = f.replace(/#FRI_CARRYOUT_TIME#/gi, convertToAmPmTime(c.FridayTakeoutStart) + " - " + convertToAmPmTime(c.FridayTakeoutEnd));
        f = f.replace(/#SAT_CARRYOUT_TIME#/gi, convertToAmPmTime(c.SaturdayTakeoutStart) + " - " + convertToAmPmTime(c.SaturdayTakeoutEnd));
        var e = getStoreServices(c);
        var g = "";
        for (var d in e) {
            if (g != "") {
                g += ", "
            }
            g += Translate(e[d])
        }
        f = f.replace(/#STORE_SERVICES#/gi, g);
        f = f.replace(/#STORE_WEB_OFFER#/gi, c.OfferContentHtml);
        $(this.pagesContainer).html(f);
        if (c.Takeout) {
            $("#" + a).show()
        } else {
            $("#" + a).hide()
        }
        $("#" + a).data("owner", this);
        $("#" + a).click(function() {
            $(this).data("owner").carryOut_Click()
        });
        if (this.afterShowPage != null) {
            this.afterShowPage(2)
        }
    };
    this.carryOut_Click = function() {
        storeAddressLocator.UpdateCartHeader(false, this.store.ID, this.store);
        this.close_click()
    };
    this.close_click = function() {
        if (this.onClose != null) {
            this.onClose()
        }
    }
}

function getStoreServices(a) {
    var d = {};
    if (a.Delivery) {
        d.Delivery = Translate("Delivery")
    }
    if (a.Takeout) {
        d.Takeout = Translate("Takeout")
    }
    if (a.DineIn) {
        d.DineIn = Translate("DineIn")
    }
    if (typeof a.Services !== "undefined" && a.Services != null) {
        var c = a.Services.toString().split(",");
        for (var b in c) {
            var e = c[b].trim();
            if (e != null && e != "") {
                d[e] = e
            }
        }
    }
    return d
}
"use strict";

function StoreLocator() {
    this.pagesContainer = null;
    this.map_autocomplete = null;
    this.SearchFldUI = null;
    this.SearchBtnUI = null;
    this.UseCurrentLocationBtnUI = null;
    this.ServicesUI = null;
    this.MapContainerUI = null;
    var c = createUUID();
    var a = createUUID();
    var b = createUUID();
    this.CloseBtnUI = null;
    this.StoresContainerUI = null;
    this.map = null;
    this.storeMarkers = [];
    this.pageSize = 3;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.onClose = null;
    this.curPosition = null;
    this.Init = function() {
        document._storeLocator = this;
        document._storeContinueInit = function() {
            document._storeLocator.continueInit()
        };
        loadGoogleMapsJS(document._storeContinueInit);
        googleTag.push({
            event: "Open",
            Category: "Store Locator",
            ElementType: "",
            ID: "",
            Name: ""
        });
        googleTag.push({
            event: "PageView",
            Category: "Store Locator",
            PageURL: "/storelocator"
        })
    };
    this.getAvilableServices = function() {
        var g = {};
        for (var f in OriginalStores) {
            var d = OriginalStores[f];
            var e = getStoreServices(d);
            for (var h in e) {
                g[e[h]] = e[h]
            }
        }
        return g
    };
    this.continueInit = function() {
        showLoadingProgress();
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        var q = createUUID();
        var h = createUUID();
        var g = createUUID();
        var d = createUUID();
        var l = createUUID();
        var k = createUUID();
        var v = createUUID();
        var u = createUUID();
        var o = createUUID();
        var p = HTML_Pages.StoreLocator_Main;
        p = p.replace("#SEARCH_FLD#", q);
        p = p.replace("#SEARCH_BTN#", h);
        p = p.replace("#CURRENT_LOCATION#", g);
        p = p.replace("#MAP_CONTAINER#", d);
        p = p.replace("#LOCATIONS_NEXT#", l);
        p = p.replace("#LOCATIONS_PREV#", a);
        p = p.replace("#LOCATIONS_PAGE#", b);
        p = p.replace("#STORES_CONTAINER#", k);
        p = p.replace(/#CLOSE#/gi, u);
        p = p.replace(/#SERVICES#/gi, v);
        p = p.replace(/#SEARCH_CITIES#/gi, o);
        $(this.pagesContainer).html(p);
        this.ServicesUI = $("#" + v);
        var e = this.getAvilableServices();
        var r = HTML_Pages.StoreLocator_Filter;
        r = r.replace(/#NAME#/gi, Translate("All"));
        var j = createUUID();
        r = r.replace(/#ID#/gi, j);
        r = r.replace(/#VALUE#/gi, "All");
        var s = $(r);
        s.addClass("active");
        s.data("owner", this);
        s.data("service", null);
        s.click(function() {
            $(this).data("owner").filterServices();
            $(this).parent().children().removeClass("active");
            $(this).addClass("active")
        });
        this.ServicesUI.append(s);
        var f = $("#" + j);
        if (typeof f[0] !== "undefined" && f[0].type == "radio") {
            $("input:radio[name=order_for][value=All]").prop("checked", true)
        }
        for (var t in e) {
            var m = "radio_" + t;
            var r = HTML_Pages.StoreLocator_Filter;
            r = r.replace(/#NAME#/gi, Translate(e[t]));
            r = r.replace(/#ID#/gi, m);
            r = r.replace(/#VALUE#/gi, e[t]);
            var s = $(r);
            s.data("owner", this);
            s.data("service", e[t]);
            s.click(function() {
                $(this).data("owner").filterServices($(this).data("service"));
                $(this).parent().children().removeClass("active");
                $(this).addClass("active")
            });
            this.ServicesUI.append(s)
        }
        this.ServicesUI.children().first().addClass("First");
        this.ServicesUI.children().last().addClass("Last");
        this.SearchFldUI = $("#" + q);
        this.SearchFldUI.data("owner", this);
        this.SearchFldUI.keypress(function(z) {
            if (z.keyCode == 13) {
                $(this).data("owner").Search($(this).data("searchField").val(), $(this).data("cityField").val())
            }
        });
        this.SearchCitiesUI = $("#" + o);
        this.SearchCitiesUI.data("owner", this);
        this.SearchCitiesUI.change(function() {
            $(this).data("owner").Search($(this).data("searchField").val(), $(this).data("cityField").val())
        });
        this.SearchCitiesUI.append("<option value='0'>" + Translate("- Select City -") + "</option>");
        for (var t in OriginalCities) {
            this.SearchCitiesUI.append("<option value='" + OriginalCities[t]["ID"] + "'>" + OriginalCities[t]["Name"] + "</option>")
        }
        this.SearchBtnUI = $("#" + h);
        this.SearchBtnUI.data("owner", this);
        this.SearchBtnUI.click(function() {
            $(this).data("owner").Search($(this).data("searchField").val(), $(this).data("cityField").val())
        });
        this.SearchCitiesUI.data("searchField", this.SearchFldUI);
        this.SearchCitiesUI.data("cityField", this.SearchCitiesUI);
        this.SearchFldUI.data("searchField", this.SearchFldUI);
        this.SearchFldUI.data("cityField", this.SearchCitiesUI);
        this.SearchBtnUI.data("searchField", this.SearchFldUI);
        this.SearchBtnUI.data("cityField", this.SearchCitiesUI);
        if (useJUICombo) {
            this.SearchCitiesUI.combobox()
        }
        this.UseCurrentLocationBtnUI = $("#" + g);
        this.UseCurrentLocationBtnUI.data("owner", this);
        this.UseCurrentLocationBtnUI.click(function() {
            $(this).data("owner").MoveMapToCurrentLocation()
        });
        this.MapContainerUI = $("#" + d);
        var x = new google.maps.LatLng(0, 0);
        this.curPosition = x;
        this.map = new google.maps.Map(this.MapContainerUI.get(0), {
            zoom: 6,
            center: x,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        this.MoreLocationsBtnUI = $("#" + l);
        this.MoreLocationsBtnUI.data("owner", this);
        this.MoreLocationsBtnUI.click(function() {
            $(this).data("owner").ShowMoreLocation()
        });
        this.LessLocationsBtnUI = $("#" + a);
        this.LessLocationsBtnUI.data("owner", this);
        this.LessLocationsBtnUI.click(function() {
            $(this).data("owner").ShowLessLocation();
            return false
        });
        this.LocationsCountUI = $("#" + b);
        this.StoresContainerUI = $("#" + k);
        var w = this;
        this.CloseBtnUI = $("#" + u);
        this.CloseBtnUI.data("owner", this);
        this.CloseBtnUI.click(function() {
            $(this).data("owner").Close()
        });
        var y = this;
        getGPSLocation(function(z) {
            y.curPosition = z;
            y.map.setCenter(y.curPosition);
            y.map.setZoom(16);
            y.continueDisplayStores();
            hideLoadingProgress()
        });
        setTimeout(function() {
            if (y.curPosition.lat() == 0) {
                y.continueDisplayStores();
                hideLoadingProgress()
            }
        }, 7000)
    };
    this.continueDisplayStores = function() {
        this.MoveMapToCurrentLocation();
        this.FillStores(0);
        this.showMarkers(true, true);
        if (this.afterShowPage != null) {
            this.afterShowPage()
        }
        google.maps.event.trigger(this.map, "resize");
        $(".pac-container").css("zIndex", getTopmostZIndex() + 99)
    };
    this.filterServices = function(d) {
        this.FillStores(0, this.findStores_lastAllowedIDs, d)
    };
    this.getCount = function(f) {
        var e = 0;
        for (var d in f) {
            e++
        }
        return e
    };
    this.sortStoresByDistance = function() {
        var e = [];
        for (var g in OriginalStores) {
            e.push(OriginalStores[g])
        }
        var f = this.curPosition.lat();
        var d = this.curPosition.lng();
        e = e.sort(function(j, h) {
            if (j.MapLocation.Latitude == 0 && h.MapLocation.Latitude == 0) {
                return 0
            } else {
                if (j.MapLocation.Latitude != 0 && h.MapLocation.Latitude == 0) {
                    return -1
                } else {
                    if (j.MapLocation.Latitude == 0 && h.MapLocation.Latitude != 0) {
                        return 1
                    } else {
                        var l = distanceBetweenTwoPoints(j.MapLocation.Latitude, j.MapLocation.Longitude, f, d);
                        var k = distanceBetweenTwoPoints(h.MapLocation.Latitude, h.MapLocation.Longitude, f, d);
                        if (l > k) {
                            return 1
                        } else {
                            if (l < k) {
                                return -1
                            } else {
                                return 0
                            }
                        }
                    }
                }
            }
        });
        return e
    };
    this.FillStores = function(t, j, q) {
        if (typeof t === "undefined") {
            t = 0
        }
        var p = (typeof j !== "undefined" && j != null) ? this.getCount(j) : this.getCount(OriginalStores);
        var d = Math.ceil(p / this.pageSize);
        if (t >= d) {
            t = d - 1
        }
        if (t < 0) {
            t = 0
        }
        this.findStores_lastFillPage = t;
        this.findStores_lastAllowedIDs = j;
        this.findStores_Service = q;
        this.StoresContainerUI.empty();
        var f = 0;
        if (typeof q === "undefined") {
            q = null
        }
        var l = this.sortStoresByDistance();
        for (var k in l) {
            var v = l[k];
            var s = getStoreServices(v);
            if (q != null && typeof s[q] === "undefined") {
                continue
            }
            if (typeof j !== "undefined" && j != null && j.indexOf(v.ID) == -1) {
                continue
            }
            if ((f >= (t * this.pageSize)) && (f < (t * this.pageSize + this.pageSize))) {
                var h = createUUID();
                var u = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
                var g = new Date();
                var e = convertToAmPmTime(v[u[g.getDay()] + "TakeoutStart"]);
                var o = convertToAmPmTime(v[u[g.getDay()] + "TakeoutEnd"]);
                var m = HTML_Pages.StoreLocator_Store;
                m = m.replace("#NO#", (f + 1));
                m = m.replace("#NAME#", v.Name);
                m = m.replace("#WORKINGHOURS#", (e + "-" + o));
                m = m.replace("#DESCRIPTION#", v.Address);
                m = m.replace("#CHOOSEBTN#", h);
                m = m.replace("#CLOSEDMSG_VISIBILITY#", v.IsInWorkHours ? "none" : "block");
                var r = $(m);
                this.StoresContainerUI.append(r);
                $("#" + h).data("owner", this);
                $("#" + h).data("obj_id", v.ID);
                $("#" + h).data("obj", v);
                $("#" + h).click(function() {
                    $(this).data("owner").SelectStoreFromList($(this).data("obj"))
                });
                $("#" + h).mouseenter(function() {
                    $(this).data("owner").MoveMapToStore($(this).data("obj_id"))
                })
            }
            f++
        }
        var d = Math.ceil(f / this.pageSize);
        if (t == (d - 1)) {
            this.MoreLocationsBtnUI.hide()
        } else {
            this.MoreLocationsBtnUI.show()
        }
        if (t == 0) {
            this.LessLocationsBtnUI.hide()
        } else {
            this.LessLocationsBtnUI.show()
        }
        this.LocationsCountUI.show();
        this.LocationsCountUI.html((t + 1).toString() + "/" + d.toString())
    };
    this.Search = function(e, d) {
        this.findStores_lastFillPage = 0;
        this.findStores_lastAllowedIDs = null;
        serverQuery("/Handlers/StoreInfo.ashx", {
            Action: "FindStore",
            searchText: e,
            cityID: d
        }, function(h, g, f) {
            if (h && g.valid == true) {
                var j = g.stores;
                if (j != null) {
                    f.FillStores(0, j)
                } else {
                    alert("No stores found")
                }
            }
        }, this);
        googleTag.push({
            event: "Search",
            Category: "Store Locator",
            ElementType: "Filter",
            ID: "",
            Name: e
        })
    };
    this.MoveMapToCurrentLocation = function() {
        var d = this;
        getGPSLocation(function(e) {
            d.map.setCenter(e);
            d.map.setZoom(16);
            d.newAddressLatLng = e;
            d.curPosition = e;
            d.FillStores(0);
            d.showMarkers(true, true)
        })
    };
    this.MoveMapToStore = function(d) {
        for (var e in this.storeMarkers) {
            if (this.storeMarkers[e]["__store"]["ID"] == d) {
                this.map.setCenter(this.storeMarkers[e].getPosition());
                this.map.setZoom(16);
                break
            }
        }
        googleTag.push({
            event: "OpenMap",
            Category: "Store Locator",
            ElementType: "",
            ID: "",
            Name: ""
        })
    };
    this.ShowMoreLocation = function() {
        this.FillStores(this.findStores_lastFillPage + 1, this.findStores_lastAllowedIDs, this.findStores_Service)
    };
    this.ShowLessLocation = function() {
        this.FillStores(this.findStores_lastFillPage - 1, this.findStores_lastAllowedIDs, this.findStores_Service)
    };
    this.SelectStoreFromList = function(d) {
        this.MoveMapToStore(d.ID);
        ShowStoreInfo(d.ID);
        this.Close()
    };
    this.SelectStoreFromMap = function(d, e) {
        ShowStoreInfo(d.ID);
        this.Close()
    };
    this.showMarkers = function() {
        if (this.storeMarkers.length == 0) {
            for (var g in OriginalStores) {
                var e = OriginalStores[g];
                if (e.MapLocation.Latitude == 0 && e.MapLocation.Longitude == 0) {
                    continue
                }
                var d = new google.maps.LatLng(e.MapLocation.Latitude, e.MapLocation.Longitude);
                var f = new google.maps.Marker({
                    position: d,
                    map: this.map,
                    title: e.Name,
                    cursor: "pointer",
                    draggableCursor: "pointer",
                    icon: "../Images/map_icon.png"
                });
                this.storeMarkers.push(f);
                f.__owner = this;
                f.__store = e;
                google.maps.event.addListener(f, "click", function() {
                    this.__owner.SelectStoreFromMap(this.__store, this)
                })
            }
        }
    };
    this.clearMarkers = function() {
        if (this.storeMarkers != null) {
            for (var e in this.storedMarkers) {
                var d = this.storeMarkers[e];
                d.setMap(null);
                d.unbindAll();
                google.maps.event.clearListeners(d, "click")
            }
            this.storedMarkers = []
        }
    };
    this.dispose = function() {
        this.clearMarkers();
        google.maps.event.clearListeners(this.map, "click");
        this.map.unbindAll()
    };
    this.Close = function() {
        if (this.onClose != null) {
            this.onClose()
        }
    }
}
"use strict";

function StoreMapLocation(a, b) {
    if (typeof a === "undefined") {
        a = 0
    }
    if (typeof b === "undefined") {
        b = 0
    }
    this.longitude = a;
    this.latitude = b;
    this.pages = HTML_Pages;
    this.width = 530;
    this.height = 400;
    this.APIKey = GoogleMapsKey;
    this.map = null;
    this.storeMarker = null;
    this.init = function() {
        if (typeof document._map === "undefined") {
            document._map = this;
            document._showMap = function() {
                document._map.show_Form()
            };
            loadGoogleMapsJS(document._showMap)
        } else {
            document._map = this;
            this.show_Form()
        }
    };
    this.show_Form = function() {
        var f = this;
        this.popupObj = new PopupForm();
        this.popupObj.width = this.width;
        this.popupObj.height = this.height;
        this.popupObj.borderColor = "#83633D";
        this.popupObj.backgroundColor = "rgb(210, 210, 210)";
        var d = HTML_Pages.StoreOnMap_Position;
        this.popupObj.container.html(d);
        var c = new google.maps.LatLng(this.longitude, this.latitude);
        var e = createMap($("#store_map").get(0), c);
        this.map = e;
        this.storeMarker = new google.maps.Marker({
            position: c,
            map: this.map,
            cursor: "pointer",
            draggableCursor: "pointer"
        });
        $("#StoreOnMap_Cancel").data("ctrlr", this);
        $("#StoreOnMap_Cancel").click(function() {
            $(this).data("ctrlr").disposeItems();
            $(this).data("ctrlr").popupObj.Close()
        });
        this.popupObj.Show();
        google.maps.event.trigger(this.map, "resize");
        e.setCenter(c);
        e.setZoom(17)
    };
    this.disposeItems = function() {
        this.storeMarker.setMap(null);
        this.storeMarker.unbindAll();
        this.map.unbindAll();
        this.map = null
    };
    this.init()
}

function showStoreOnMap(a) {
    googleTag.push({
        event: "OpenMap",
        Category: "Store Page",
        ElementType: "Store",
        ID: a,
        Name: OriginalStores[a].Name
    });
    if (!canShowStoreMap(a)) {
        alert("The coordinates are not available at the moment.")
    } else {
        var b = OriginalStores[a];
        var e = b.MapLocation;
        var d = e.Latitude;
        var c = e.Longitude;
        new StoreMapLocation(d, c);
        $("#StoreName").html(b.Name)
    }
}

function canShowStoreMap(a) {
    var b = OriginalStores[a];
    return ((b.MapLocation != null) && (b.MapLocation.Latitude != 0) && (b.MapLocation.Longitude != 0))
}

function VirtualGroupCustomization() {
    this.cartItem = null;
    this.currentSelectorOpt1 = null;
    this.currentSelectorOpt2 = null;
    this.currentSelectorOpt3 = null;
    this.hasVirtualGroup = false;
    this.addModItem = function(b, c) {
        var a = new Object();
        a.ID = b;
        a.ModGroupID = c;
        a.Name = OriginalItems[b]["Name"];
        a.Weight = GetModItemWeight(OriginalModGroups[c], b);
        a.Price = getCartItemPrice(a);
        a.modGroupsItems = [];
        this.cartItem.modGroupsItems.push(a)
    };
    this.clearModGroup = function(b) {
        for (var a in this.cartItem.modGroupsItems) {
            var c = this.cartItem.modGroupsItems[a];
            if (c.ModGroupID == b) {
                this.cartItem.modGroupsItems.splice(a, 1);
                break
            }
        }
    };
    this.isModItemSelected = function(d, e) {
        var c = 0;
        for (var b in this.cartItem.modGroupsItems) {
            var a = this.cartItem.modGroupsItems[b];
            if (a.ModGroupID == e && a.ID == d) {
                c++
            }
        }
        return c
    };
    this.Init = function(f, y) {
        if (typeof y !== "undefined") {
            y.shopping_cart_group = getCartItemCRC(y);
            this.cartItem = y
        } else {
            this.cartItem = {};
            this.cartItem.ID = f.ID;
            this.cartItem.Name = f.Name;
            this.cartItem.Price = 0;
            this.cartItem.Weight = 0;
            this.cartItem.modGroupsItems = []
        }
        this.popupObj = new PopupForm();
        this.popupObj.width = 600;
        this.popupObj.height = 500;
        this.popupObj.container.css("background", "none");
        this.popupObj.container.css("border", "none");
        this.container = this.popupObj.container;
        this.virtualGroup = OriginalVirtualGroups[f.VirtualGroupID];
        this.hasVirtualGroup = typeof OriginalVirtualGroups[f.VirtualGroupID] !== "undefined";
        var C = false;
        var h = null;
        for (var w in f.modGroup) {
            if (typeof f.modGroup[w] !== "undefined") {
                if (typeof f.modGroup[w]["QuickCustomize"] !== "undefined" && f.modGroup[w]["QuickCustomize"]) {
                    h = f.modGroup[w];
                    C = true;
                    break
                }
            }
        }
        var j = createUUID();
        var p = createUUID();
        var d = createUUID();
        var r = createUUID();
        var a = createUUID();
        this.qtyID = createUUID();
        this.priceID = createUUID();
        html = HTML_Pages.VirtualGroupCustomization_Main;
        html = html.replace(/#NAME#/gi, this.hasVirtualGroup ? this.virtualGroup.Name : f.Name);
        var b = this.hasVirtualGroup ? this.virtualGroup.Description : f.Description;
        if (b == null) {
            b = ""
        }
        html = html.replace(/#DESCRIPTION#/gi, b);
        html = html.replace(/#SELECTOR1VISIBILITY#/gi, (!this.hasVirtualGroup || typeof OriginalVirtualSelectors[this.virtualGroup.Selector1ID] === "undefined") ? "none" : "inline-block");
        html = html.replace(/#SELECTOR2VISIBILITY#/gi, (!this.hasVirtualGroup || typeof OriginalVirtualSelectors[this.virtualGroup.Selector2ID] === "undefined") ? "none" : "inline-block");
        html = html.replace(/#SELECTOR3VISIBILITY#/gi, (!this.hasVirtualGroup || typeof OriginalVirtualSelectors[this.virtualGroup.Selector3ID] === "undefined") ? "none" : "inline-block");
        html = html.replace(/#SELECTOR1TITLE#/gi, (this.hasVirtualGroup && typeof OriginalVirtualSelectors[this.virtualGroup.Selector1ID] !== "undefined") ? OriginalVirtualSelectors[this.virtualGroup.Selector1ID].Name : "");
        html = html.replace(/#SELECTOR2TITLE#/gi, (this.hasVirtualGroup && typeof OriginalVirtualSelectors[this.virtualGroup.Selector2ID] !== "undefined") ? OriginalVirtualSelectors[this.virtualGroup.Selector2ID].Name : "");
        html = html.replace(/#SELECTOR3TITLE#/gi, (this.hasVirtualGroup && typeof OriginalVirtualSelectors[this.virtualGroup.Selector3ID] !== "undefined") ? OriginalVirtualSelectors[this.virtualGroup.Selector3ID].Name : "");
        html = html.replace(/#SELECTOR1CTRLTITLE#/gi, "SEL1CTRLTITLE");
        html = html.replace(/#SELECTOR2CTRLTITLE#/gi, "SEL2CTRLTITLE");
        html = html.replace(/#SELECTOR3CTRLTITLE#/gi, "SEL3CTRLTITLE");
        html = html.replace(/#SELECTOR1CTRL#/gi, "SEL1CTRL");
        html = html.replace(/#SELECTOR2CTRL#/gi, "SEL2CTRL");
        html = html.replace(/#SELECTOR3CTRL#/gi, "SEL3CTRL");
        html = html.replace(/#CUST_MODGROUP_VISIBILITY#/gi, !C ? "none" : "inherit");
        html = html.replace(/#CUST_MODGROUP_TITLE#/gi, C ? h.Name : "");
        html = html.replace(/#CUST_MODGROUP_CTRLTITLE#/gi, "CUST_MODGROUP_CTRLTITLE");
        html = html.replace(/#CUST_MODGROUP_CTRL#/gi, "CUST_MODGROUP_CTRL");
        this.qtyInCart = getQtyInCart(y.shopping_cart_group);
        html = html.replace(/#PRICE#/gi, f.Price > 0 ? RoundPrice(f.Price * this.qtyInCart) + CurrencySymbol : "");
        html = html.replace(/#QTY#/gi, this.qtyInCart);
        html = html.replace(/#OK#/gi, j);
        html = html.replace(/#CANCEL#/gi, p);
        html = html.replace(/#QTY_UP#/gi, d);
        html = html.replace(/#QTY_DOWN#/gi, r);
        html = html.replace(/#QTY_DROPDOWN#/gi, a);
        html = html.replace(/#QTY_TITLE#/gi, this.qtyID);
        html = html.replace(/#PRICE_LABEL#/gi, this.priceID);
        var z = "itm" + strPadLeft("0", 6, this.hasVirtualGroup ? this.virtualGroup.ID.toString() : f.ID.toString()) + ".jpg";
        html = html.replace(/#IMG#/gi, "Menu" + CurrentMenuTemplateID + "/" + z);
        this.container.html(html);
        this.container.find("img").each(function() {
            if (!$(this).attr("orgimg")) {
                $(this).attr("orgimg", $(this).attr("src"))
            }
            this.onerror = function() {
                ReplaceMissingImage(this)
            }
        });
        this.custModGroupCtrlTitle = $("#CUST_MODGROUP_CTRLTITLE");
        this.custModGroupCtrl = $("#CUST_MODGROUP_CTRL");
        this.OkBtn = $("#" + j);
        this.OkBtn.data("owner", this);
        this.OkBtn.click(function() {
            var g = $("#" + $(this).data("owner").qtyID).html();
            $(this).data("owner").cartItem.Qty = g;
            cart.clearItem(y.shopping_cart_group);
            cart.addItemToCart($(this).data("owner").cartItem);
            cart.updateCart();
            $(this).data("owner").Close()
        });
        this.CancelBtn = $("#" + p);
        this.CancelBtn.data("owner", this);
        this.CancelBtn.click(function() {
            $(this).data("owner").Close()
        });
        this.qtyUp = $("#" + d);
        this.qtyUp.data("owner", this);
        this.qtyUp.click(function() {
            var g = $("#" + $(this).data("owner").qtyID).html();
            if (typeof g === "undefined" || g == null) {
                g = 1
            }
            g++;
            $("#" + $(this).data("owner").qtyID).html(g);
            $("#" + $(this).data("owner").priceID).html(RoundPrice(getCartItemPrice($(this).data("owner").cartItem) * g) + CurrencySymbol)
        });
        this.qtyDown = $("#" + r);
        this.qtyDown.data("owner", this);
        this.qtyDown.click(function() {
            var g = $("#" + $(this).data("owner").qtyID).html();
            if (typeof g === "undefined" || g == null) {
                g = 1
            }
            if (g == 1) {
                return
            }
            g--;
            $("#" + $(this).data("owner").qtyID).html(g);
            $("#" + $(this).data("owner").priceID).html(RoundPrice(getCartItemPrice($(this).data("owner").cartItem) * g) + CurrencySymbol)
        });
        $("#" + a).val(y.Qty);
        $("#" + a).data("owner", this);
        $("#" + a).data("itm", f);
        $("#" + a).on("change", function() {
            var x = $(this).data("itm");
            var g = $(this).val();
            $("#" + $(this).data("owner").qtyID).html(g);
            $("#" + $(this).data("owner").priceID).html(RoundPrice(getCartItemPrice($(this).data("owner").cartItem) * g) + CurrencySymbol)
        });
        if (useJUICombo) {
            $("#" + a).combobox()
        }
        if (this.hasVirtualGroup) {
            this.selectorTitle = [];
            this.selectorCtrlTitle = [];
            this.selectorCtrl = [];
            for (v = 0; v < 3; v++) {
                this.selectorCtrlTitle[v] = $("#SEL" + (v + 1) + "CTRLTITLE");
                this.selectorCtrl[v] = $("#SEL" + (v + 1) + "CTRL")
            }
            var B = OriginalItems[y.ID];
            var t = [{}, {}, {}];
            for (var s in OriginalItems) {
                var u = OriginalItems[s];
                if (u.VirtualGroupID !== this.virtualGroup.ID || typeof u.SubMenu_ID === "undefined") {
                    continue
                }
                for (var m = 0; m < 3; m++) {
                    var o = OriginalVirtualSelectors[this.virtualGroup["Selector" + (m + 1) + "ID"]];
                    if (typeof o !== "undefined" && typeof o.SelectorValues[u["Selector" + (m + 1) + "ValueID"]] !== "undefined") {
                        t[m][u["Selector" + (m + 1) + "ValueID"]] = o.SelectorValues[u["Selector" + (m + 1) + "ValueID"]]
                    }
                }
            }
            if (typeof t[0][OriginalItems[this.cartItem.ID]["Selector1ValueID"]] !== "undefined") {
                this.currentSelectorOpt1 = t[0][OriginalItems[this.cartItem.ID]["Selector1ValueID"]]
            }
            if (typeof t[1][OriginalItems[this.cartItem.ID]["Selector2ValueID"]] !== "undefined") {
                this.currentSelectorOpt2 = t[1][OriginalItems[this.cartItem.ID]["Selector2ValueID"]]
            }
            if (typeof t[2][OriginalItems[this.cartItem.ID]["Selector3ValueID"]] !== "undefined") {
                this.currentSelectorOpt3 = t[2][OriginalItems[this.cartItem.ID]["Selector3ValueID"]]
            }
            for (var m = 0; m < 3; m++) {
                var e = 0;
                var k = 0;
                if (m == 0) {
                    e = this.virtualGroup.Selector1ID;
                    k = this.virtualGroup.Selector1DefaultValueID;
                    if (this.currentSelectorOpt1 != null) {
                        k = this.currentSelectorOpt1.ID
                    }
                } else {
                    if (m == 1) {
                        e = this.virtualGroup.Selector2ID;
                        k = this.virtualGroup.Selector2DefaultValueID;
                        if (this.currentSelectorOpt2 != null) {
                            k = this.currentSelectorOpt2.ID
                        }
                    } else {
                        if (m == 2) {
                            e = this.virtualGroup.Selector3ID;
                            k = this.virtualGroup.Selector3DefaultValueID;
                            if (this.currentSelectorOpt3 != null) {
                                k = this.currentSelectorOpt3.ID
                            }
                        }
                    }
                }
                if (this.selectorCtrl[m].length == 1) {
                    for (var v in t[m]) {
                        var c = t[m][v];
                        var l = HTML_Pages.VirtualGroupCustomization_SelectorItem;
                        l = l.replace(/#ID#/gi, c.ID);
                        l = l.replace(/#NAME#/gi, c.Name);
                        l = l.replace(/#DESCRIPTION#/gi, c.Description);
                        var q = $(l);
                        q.data("Val", c);
                        q.data("Index", m);
                        q.data("TitleUI", this.selectorCtrlTitle[m]);
                        q.data("qtyUI", $("#" + this.qtyID));
                        q.data("priceUI", $("#" + this.priceID));
                        q.data("Ctrlr", this);
                        this.selectorCtrl[m].append(q);
                        if (c.ID == k) {
                            this.selectorCtrlTitle[m].html(c.Name.trim());
                            if (m == 0) {
                                this.currentSelectorOpt1 = c
                            } else {
                                if (m == 1) {
                                    this.currentSelectorOpt2 = c
                                } else {
                                    if (m == 2) {
                                        this.currentSelectorOpt3 = c
                                    }
                                }
                            }
                        }
                        q.click(function(E) {
                            E.preventDefault();
                            $(this).foundation("dropdown", "close", $(this).parent());
                            var g = $(this).data("Ctrlr");
                            var D = $(this).data("Val");
                            var x = $(this).data("Index");
                            if (x == 0) {
                                g.currentSelectorOpt1 = D
                            } else {
                                if (x == 1) {
                                    g.currentSelectorOpt2 = D
                                } else {
                                    if (x == 2) {
                                        g.currentSelectorOpt3 = D
                                    }
                                }
                            }
                            $(this).data("TitleUI").html(D.Name);
                            g.changeSelectedItem();
                            var F = $(this).data("priceUI");
                            var G = $(this).data("qtyUI").html();
                            F.html(RoundPrice(g.cartItem.Price * G) + CurrencySymbol)
                        })
                    }
                }
            }
        }
        if (C) {
            for (var s in h.Items) {
                var A = h.Items[s];
                var l = HTML_Pages.VirtualGroupCustomization_SelectorItem;
                l = l.replace(/#ID#/gi, A.ID);
                l = l.replace(/#NAME#/gi, A.Name);
                l = l.replace(/#DESCRIPTION#/gi, A.Description);
                var q = $(l);
                q.data("modItem", A);
                q.data("modGroup", h);
                q.data("TitleUI", this.qtyID);
                q.data("owner", this);
                this.custModGroupCtrl.append(q);
                if (this.isModItemSelected(A.ID, h.ID)) {
                    this.custModGroupCtrlTitle.html(A.Name.trim())
                }
                q.click(function(E) {
                    E.preventDefault();
                    $(this).foundation("dropdown", "close", $(this).parent());
                    var F = $(this).data("modItem");
                    var D = $(this).data("modGroup");
                    var g = $(this).data("owner");
                    var x = $(this).data("TitleUI");
                    x.html(F.Name.trim());
                    g.clearModGroup(D.ID);
                    g.addModItem(F.ID, D.ID)
                })
            }
        }
        this.Show();
        return true
    };
    this.Show = function() {
        this.popupObj.Show()
    };
    this.Close = function() {
        this.popupObj.Close()
    };
    this.changeSelectedItem = function() {
        var c = null;
        for (var b in OriginalItems) {
            var a = OriginalItems[b];
            if (a.VirtualGroupID !== this.virtualGroup.ID) {
                continue
            }
            if ((a.Selector1ValueID == -1 || a.Selector1ValueID == 0 || this.currentSelectorOpt1 == null || a.Selector1ValueID == this.currentSelectorOpt1.ID) && (a.Selector2ValueID == -1 || a.Selector2ValueID == 0 || this.currentSelectorOpt2 == null || a.Selector2ValueID == this.currentSelectorOpt2.ID) && (a.Selector3ValueID == -1 || a.Selector3ValueID == 0 || this.currentSelectorOpt3 == null || a.Selector3ValueID == this.currentSelectorOpt3.ID)) {
                this.cartItem.ID = a.ID;
                this.cartItem.Name = a.Name;
                this.cartItem.Price = a.Price;
                break
            }
        }
    }
}

function showVirtualGroupCustomization(b, a) {
    var c = new VirtualGroupCustomization();
    c.onOK = function(d) {
        closefloat();
        for (var e in d) {
            cart.addItemToCart(d[e])
        }
    };
    c.onCancel = function() {
        closefloat()
    };
    c.Init(b, a);
    c.Show()
}

function getQtyInCart(a) {
    var d = 0;
    for (var b in cart.cartData) {
        var c = cart.cartData[b];
        if (a == getCartItemCRC(c)) {
            d++
        }
    }
    return d
}

function Questionnaire() {
    this.pages = null;
    this.pagesContainer = null;
    this.beforeShowPage = null;
    this.afterShowPage = null;
    this.onClose = null;
    this.questionnaireResult = {};
    this.radiobuttonNames = [];
    this.FirstNameUI = null;
    this.LastNameUI = null;
    this.EMailUI = null;
    this.PhoneTypeUI = null;
    this.PhoneUI = null;
    this.PhoneExtUI = null;
    this.SubmitUI = null;
    this.Show = function() {
        if (this.beforeShowPage != null) {
            this.beforeShowPage()
        }
        var h = true;
        for (var j in Questionnaires) {
            h = false;
            break
        }
        if (h) {
            $(this.pagesContainer).html(this.pages.Questionnaire_Empty);
            $("#contact_close").data("owner", this);
            $("#contact_close").click(function() {
                var s = $(this).data("owner");
                s.close_click()
            });
            if (this.afterShowPage != null) {
                this.afterShowPage(2)
            }
            return
        }
        var e = "QUESTIONNAIRSCONTAINER";
        var d = "QUEST_FIRSTNAME";
        var b = "QUEST_LASTNAME";
        var g = "QUEST_EMAIL";
        var l = "QUEST_PHONETYPE";
        var m = "QUEST_PHONE";
        var f = "QUEST_EXT";
        var p = "QUEST_SUBMIT";
        var k = this.pages.Questionnaire_Main;
        k = k.replace(/#QUESTIONNAIRS_CONTAINER#/, e);
        k = k.replace(/#FIRSTNAME#/, d);
        k = k.replace(/#LASTNAME#/, b);
        k = k.replace(/#EMAIL#/, g);
        k = k.replace(/#PHONETYPE#/, l);
        k = k.replace(/#PHONE#/, m);
        k = k.replace(/#EXT#/, f);
        k = k.replace(/#SUBMIT#/, p);
        $(this.pagesContainer).html(k);
        var c = $("#" + e);
        this.FirstNameUI = $("#" + d);
        this.LastNameUI = $("#" + b);
        this.EMailUI = $("#" + g);
        this.PhoneTypeUI = $("#" + l);
        this.PhoneUI = $("#" + m);
        this.PhoneExtUI = $("#" + f);
        this.SubmitUI = $("#" + p);
        if (useJUICombo) {
            this.PhoneTypeUI.combobox()
        }
        $.mask.definitions["#"] = "[_ 0-9]";
        this.PhoneTypeUI.data("phone", this.PhoneUI);
        this.PhoneTypeUI.data("ext", this.PhoneExtUI);
        this.PhoneTypeUI.change(function() {
            var s = $(this);
            var v = $(this).data("phone");
            var u = $(this).data("ext");
            var t = s.val();
            $(v).val("").prop("readonly", (t == -1)).mask(PhoneMasks[t]);
            if ((t == -1) || (t == 2)) {
                u.prop("disabled", true)
            } else {
                u.removeAttr("disabled")
            }
        }).val(-1).change();
        if (userLogin.isLoggedIn()) {
            var o = userLogin.customerData;
            this.FirstNameUI.val(o.FirstName);
            this.LastNameUI.val(o.LastName);
            this.EMailUI.val(o.EMail);
            this.PhoneTypeUI.val(o.PhoneType).change();
            this.PhoneUI.val(o.PhoneNumber);
            this.PhoneExtUI.val(o.PhoneExtension)
        }
        this.questionnaire = null;
        for (var j in Questionnaires) {
            var k = this.pages.Questionnaire_Questionnaire;
            var a = "QUESTIONNAIR" + j;
            k = k.replace(/#QUESTIONNAIRE#/, a);
            k = k.replace(/#NAME#/, Questionnaires[j]["Name"]);
            var r = $(k);
            c.append(r);
            var q = $("#" + a);
            this.DrawQuestionnaire(Questionnaires[j], q)
        }
        this.SubmitUI.data("ctrlr", this);
        this.SubmitUI.click(function() {
            var s = $(this).data("ctrlr");
            s.send_click()
        });
        if (this.afterShowPage != null) {
            this.afterShowPage(2)
        }
    };
    this.DrawQuestionnaire = function(g, a) {
        var c = this.pages.Questionnaire_Questions;
        var h = this.pages.Questionnaire_Questions_Options;
        for (var b in g.Questions) {
            var d = g.Questions[b];
            var m = "Q_" + g.ID + "_" + d.ID;
            this.radiobuttonNames.push(m);
            var o = "CONT_" + g.ID + "_" + d.ID;
            var p = c;
            p = p.replace(/#DESCRIPTION#/, d.Description);
            p = p.replace(/#OPTIONCONTAINER#/, o);
            a.append($(p));
            for (var e in d.Options) {
                var l = h;
                var f = d.Options[e];
                var k = f.ID;
                l = l.replace(/#DESCRIPTION#/gi, f.Description);
                l = l.replace(/#NAME#/gi, m);
                l = l.replace(/#VALUE#/gi, k);
                l = l.replace(/#ID#/gi, m + "_" + k);
                $("#" + o).append($(l))
            }
            $("input[name=" + m + "]").data("question", d);
            $("input[name=" + m + "]").data("questionnaire", g);
            $("input:radio[name=" + m + "]").data("owner", this);
            $("input:radio[name=" + m + "]").prop("disabled", false);
            $("input:radio[name=" + m + "]:radio").bind("change", (function() {
                var s = $(this).val();
                var j = $(this).data("owner");
                var q = $(this).data("question");
                var r = $(this).data("questionnaire");
                j.optionSelected(r, q, s)
            }))
        }
    };
    this.optionSelected = function(d, a, b) {
        var c = {
            questionnaire: d.ID,
            question: a.ID,
            option: b
        };
        this.questionnaireResult[a.ID] = c
    };
    this.DrawThanks = function() {
        var a = this.pages.Questionnaire_Thanks;
        $(this.pagesContainer).html(a);
        $("#contact_close").data("owner", this);
        $("#contact_close").click(function() {
            var b = $(this).data("owner");
            b.close_click()
        })
    };
    this.send_click = function() {
        var c = this;
        var a = 1;
        for (var b in this.radiobuttonNames) {
            if (!$("input:radio[name=" + this.radiobuttonNames[b] + "]:checked").val()) {
                alert("Please choose an answer for question No. " + a);
                return
            }
            a++
        }
        this.CustomerData = {};
        this.CustomerData.EmailAddress = this.EMailUI.val();
        this.CustomerData.FirstName = this.FirstNameUI.val();
        this.CustomerData.LastName = this.LastNameUI.val();
        this.CustomerData.PhoneID = -1;
        this.CustomerData.PhoneType = this.PhoneTypeUI.val();
        this.CustomerData.PhoneNumber = this.PhoneUI.val();
        this.CustomerData.PhoneExt = this.PhoneExtUI.val();
        c.postResultToServer()
    };
    this.postResultToServer = function() {
        serverQuery("/Handlers/Questionnaire.ashx", {
            action: "submitresult",
            questionnaireresult: this.questionnaireResult,
            customerInfo: this.CustomerData
        }, function(b, c, a) {
            if (b && c.valid == true) {
                a.DrawThanks()
            } else {
                alert("Submit failed, please try again later\r\n" + c.message)
            }
        }, this)
    };
    this.close_click = function() {
        if (this.onClose != null) {
            this.onClose()
        }
    }
}

function MatrixSuggestiveSelling() {
    this.continueCheckout = null;
    this.continueAddToCart = null;
    this.continueCloseOrderMode = null;
    this.activeSuggestiveSelling = null;
    this.suggestiveSellingIsActive = false;
    this.triggerType = "";
    this.triggerItem = null;
    this.triggerPage = null;
    this.itemInCartID = null;
    this.removedModItem = null;
    this.popupObj = null;
    $(window).on("FullDataRequested", function(a) {
        document.matrixSuggestiveSelling.Init()
    });
    this.Init = function() {
        this.resetState()
    };
    this.isItemInCart = function(a) {
        for (var c in cart.cartData) {
            var b = cart.cartData[c];
            if (b.ID == a) {
                return true
            }
        }
        return false
    };
    this.isSubMenuInCart = function(c) {
        var a = OriginalSubMenu[c];
        if (typeof a === "undefined") {
            return false
        }
        for (var e in cart.cartData) {
            var d = cart.cartData[e];
            for (var b in a.Items) {
                if (a.Items[b]["ID"] == d.ID) {
                    return true
                }
            }
        }
        return false
    };
    this.getContainer = function(b, c) {
        var a = null;
        if (b) {
            this.popupObj = new PopupForm();
            this.popupObj.useDocumentSize = true;
            if (!c) {
                if ($(window).width() < 1024) {
                    this.popupObj.width = 600
                } else {
                    this.popupObj.width = 700
                }
                if ($(window).width() > 768) {
                    this.popupObj.height = 600
                } else {
                    this.popupObj.height = 300
                }
            } else {
                this.popupObj.width = 550;
                this.popupObj.height = 1000
            }
            this.popupObj.container.css("background", "none");
            this.popupObj.container.css("border", "none");
            this.popupObj.container.removeClass("suggestiveWrapperMulti");
            this.popupObj.container.removeClass("suggestiveWrapper");
            if (c) {
                this.popupObj.container.addClass("suggestiveWrapperMulti")
            } else {
                this.popupObj.container.addClass("suggestiveWrapper")
            }
            a = this.popupObj.container
        } else {
            a = $("#container_inner").get(0)
        }
        return a
    };
    this.showContainer = function(a) {
        if (a) {
            this.popupObj.Show(true)
        } else {
            closefloat();
            showFloat()
        }
    };
    this.cartAddItem = function(a) {
        if (this.activeSuggestiveSelling.MultiplyWithQty && this.triggerItem != null && this.triggerItem.Qty > 0) {
            a.Qty = a.Qty * this.triggerItem.Qty
        }
        if (this.activeSuggestiveSelling.Qty > 0) {
            a.Qty = a.Qty * this.activeSuggestiveSelling.Qty
        }
        this.suggestiveSellingIsActive = true;
        if (!this.activeSuggestiveSelling.IsModifier) {
            cart.addItemToCart(a)
        } else {
            this.addModItem(a.ID, a.Qty)
        }
        this.suggestiveSellingIsActive = false;
        this.activeSuggestiveSelling.itemAdded = true;
        $("#SUGGESTIVEITM_" + a.ID).html("Awesom!");
        $("#SUGGESTIVEITM_" + a.ID).hide();
        $("#SUGGESTIVEITM_" + a.ID + "_Added").show();
        if (this.activeSuggestiveSelling.ViewType == 2) {
            document.matrixSuggestiveSelling.cont(true, a.Qty)
        } else {
            setTimeout(function() {
                document.matrixSuggestiveSelling.cont(true, a.Qty)
            }, 1500)
        }
    };
    this.cont = function(b, e) {
        if (this.popupObj != null) {
            this.popupObj.Close()
        }
        this.activeSuggestiveSelling.itemAdded = false;
        if (this.triggerType == "checkout") {
            this.continueCheckout(this.triggerPage)
        } else {
            if (this.triggerType == "addToCart") {
                if (b && this.activeSuggestiveSelling.IsModifier) {
                    this.triggerItem.Qty = this.triggerItem.Qty < e ? this.triggerItem.Qty : e;
                    for (var d = 0; d < this.triggerItem.Qty; d++) {
                        for (var a = cart.cartData.length - 1; a >= 0; a--) {
                            var c = cart.cartData[a];
                            if (c.ID == this.triggerItem.ID) {
                                cart.cartData.splice(cart.cartData.indexOf(c), 1);
                                break
                            }
                        }
                    }
                    this.continueAddToCart(this.triggerItem)
                }
                showHome()
            }
        }
    };
    this.closePopup = function() {
        this.popupObj.Close();
        closefloat()
    };
    this.showSingleAsPopup = function(u) {
        var e = OriginalItems[u.Items[0]["ItemID"]];
        if (typeof e === "undefined") {
            this.cont(false);
            return
        }
        this.cartItem = {};
        this.cartItem.ID = e.ID;
        this.cartItem.Name = e.Name;
        this.cartItem.Price = 0;
        this.cartItem.Weight = 0;
        this.cartItem.modGroupsItems = [];
        this.virtualGroup = OriginalVirtualGroups[e.VirtualGroupID];
        this.hasVirtualGroup = typeof OriginalVirtualGroups[e.VirtualGroupID] !== "undefined";
        var G = false;
        var f = null;
        for (var D in e.modGroup) {
            if (typeof e.modGroup[D]["QuickCustomize"] !== "undefined" && e.modGroup[D]["QuickCustomize"]) {
                f = e.modGroup[D];
                G = true;
                break
            }
        }
        var j = createUUID();
        var q = createUUID();
        var c = createUUID();
        var v = createUUID();
        this.qtyID = createUUID();
        this.priceID = createUUID();
        var o = HTML_Pages.MatrixSuggestiveSelling_MainOneItem;
        o = o.replace(/#NAME#/gi, this.hasVirtualGroup ? this.virtualGroup.Name : e.Name);
        var a = this.hasVirtualGroup ? this.virtualGroup.Description : e.Description;
        if (a == null) {
            a = ""
        }
        o = o.replace(/#MENU_DESCRIPTION#/gi, u.Description);
        o = o.replace(/#MENU_TITLE#/gi, u.Name);
        o = o.replace(/#DESCRIPTION#/gi, a);
        o = o.replace(/#SELECTOR1VISIBILITY#/gi, (!this.hasVirtualGroup || typeof OriginalVirtualSelectors[this.virtualGroup.Selector1ID] === "undefined") ? "none" : "inline-block");
        o = o.replace(/#SELECTOR2VISIBILITY#/gi, (!this.hasVirtualGroup || typeof OriginalVirtualSelectors[this.virtualGroup.Selector2ID] === "undefined") ? "none" : "inline-block");
        o = o.replace(/#SELECTOR3VISIBILITY#/gi, (!this.hasVirtualGroup || typeof OriginalVirtualSelectors[this.virtualGroup.Selector3ID] === "undefined") ? "none" : "inline-block");
        o = o.replace(/#SELECTOR1TITLE#/gi, (this.hasVirtualGroup && typeof OriginalVirtualSelectors[this.virtualGroup.Selector1ID] !== "undefined") ? OriginalVirtualSelectors[this.virtualGroup.Selector1ID].Name : "");
        o = o.replace(/#SELECTOR2TITLE#/gi, (this.hasVirtualGroup && typeof OriginalVirtualSelectors[this.virtualGroup.Selector2ID] !== "undefined") ? OriginalVirtualSelectors[this.virtualGroup.Selector2ID].Name : "");
        o = o.replace(/#SELECTOR3TITLE#/gi, (this.hasVirtualGroup && typeof OriginalVirtualSelectors[this.virtualGroup.Selector3ID] !== "undefined") ? OriginalVirtualSelectors[this.virtualGroup.Selector3ID].Name : "");
        o = o.replace(/#SELECTOR1CTRLTITLE#/gi, "SEL1CTRLTITLE");
        o = o.replace(/#SELECTOR2CTRLTITLE#/gi, "SEL2CTRLTITLE");
        o = o.replace(/#SELECTOR3CTRLTITLE#/gi, "SEL3CTRLTITLE");
        o = o.replace(/#SELECTOR1CTRL#/gi, "SEL1CTRL");
        o = o.replace(/#SELECTOR2CTRL#/gi, "SEL2CTRL");
        o = o.replace(/#SELECTOR3CTRL#/gi, "SEL3CTRL");
        o = o.replace(/#CUST_MODGROUP_VISIBILITY#/gi, !G ? "none" : "inherit");
        o = o.replace(/#CUST_MODGROUP_TITLE#/gi, G ? f.Name : "");
        o = o.replace(/#CUST_MODGROUP_CTRLTITLE#/gi, "CUST_MODGROUP_CTRLTITLE");
        o = o.replace(/#CUST_MODGROUP_CTRL#/gi, "CUST_MODGROUP_CTRL");
        this.qtyInCart = 1;
        o = o.replace(/#PRICE#/gi, e.Price > 0 ? RoundPrice(e.Price * this.qtyInCart) + CurrencySymbol : "");
        o = o.replace(/#QTY#/gi, this.qtyInCart);
        o = o.replace(/#OK#/gi, j);
        o = o.replace(/#CONTINUE#/gi, q);
        o = o.replace(/#QTY_UP#/gi, c);
        o = o.replace(/#QTY_DOWN#/gi, v);
        o = o.replace(/#QTY_TITLE#/gi, this.qtyID);
        o = o.replace(/#PRICE_LABEL#/gi, this.priceID);
        o = o.replace(/#SUGGESTIVEITM_ID#/gi, "SUGGESTIVEITM_" + e.ID);
        var E = "itm" + strPadLeft("0", 6, (this.hasVirtualGroup ? this.virtualGroup.ID.toString() : e.ID.toString())) + "-" + UserLanguage + ".jpg";
        o = o.replace(/#IMG#/gi, "Menu" + CurrentMenuTemplateID + "/" + E);
        var r = this.getContainer(true, false);
        r.html(o);
        if (typeof this.virtualGroup !== "undefined") {
            if (typeof OriginalVirtualSelectors[this.virtualGroup.Selector1ID] !== "undefined" && typeof OriginalVirtualSelectors[this.virtualGroup.Selector2ID] === "undefined" && typeof OriginalVirtualSelectors[this.virtualGroup.Selector3ID] === "undefined") {
                $("#selector1wrapper").css("width", "310px")
            }
        }
        r.find("img").each(function() {
            if (!$(this).attr("orgimg")) {
                $(this).attr("orgimg", $(this).attr("src"))
            }
            this.onerror = function() {
                ReplaceMissingImage(this)
            }
        });
        this.custModGroupCtrlTitle = $("#CUST_MODGROUP_CTRLTITLE");
        this.custModGroupCtrl = $("#CUST_MODGROUP_CTRL");
        var h = $("#" + j);
        h.data("owner", this);
        h.click(function() {
            var x = $("#" + $(this).data("owner").qtyID).html();
            var g = $(this).data("owner").cartItem;
            $(this).data("owner").cartItem.Qty = x;
            $(this).data("owner").cartAddItem($(this).data("owner").cartItem);
            googleTag.push({
                event: "Add",
                Category: "Suggestive Selling",
                ElementType: "Item",
                ID: g.ID,
                Name: GoogleTrack_getItemEnName(g.ID)
            })
        });
        var y = $("#" + q);
        y.data("owner", this);
        y.click(function() {
            $(this).data("owner").cont(false);
            googleTag.push({
                event: "Cancel",
                Category: "Suggestive Selling",
                ElementType: "",
                ID: "",
                Name: ""
            })
        });
        var p = $("#" + c);
        p.data("owner", this);
        p.click(function() {
            var g = $("#" + $(this).data("owner").qtyID).html();
            if (typeof g === "undefined" || g == null) {
                g = 1
            }
            g++;
            $("#" + $(this).data("owner").qtyID).html(g);
            $("#" + $(this).data("owner").priceID).html(RoundPrice(getCartItemPrice($(this).data("owner").cartItem) * g) + CurrencySymbol)
        });
        var C = $("#" + v);
        C.data("owner", this);
        C.click(function() {
            var g = $("#" + $(this).data("owner").qtyID).html();
            if (typeof g === "undefined" || g == null) {
                g = 1
            }
            if (g == 1) {
                return
            }
            g--;
            $("#" + $(this).data("owner").qtyID).html(g);
            $("#" + $(this).data("owner").priceID).html(RoundPrice(getCartItemPrice($(this).data("owner").cartItem) * g) + CurrencySymbol)
        });
        if (this.hasVirtualGroup) {
            this.selectorTitle = [];
            this.selectorCtrlTitle = [];
            this.selectorCtrl = [];
            for (B = 0; B < 3; B++) {
                this.selectorCtrlTitle[B] = $("#SEL" + (B + 1) + "CTRLTITLE");
                this.selectorCtrl[B] = $("#SEL" + (B + 1) + "CTRL")
            }
            var z = [{}, {}, {}];
            for (var w in OriginalItems) {
                var A = OriginalItems[w];
                if (A.VirtualGroupID !== this.virtualGroup.ID) {
                    continue
                }
                for (var m = 0; m < 3; m++) {
                    if (typeof OriginalVirtualSelectors[this.virtualGroup["Selector" + (m + 1) + "ID"]] !== "undefined" && typeof OriginalVirtualSelectors[this.virtualGroup["Selector" + (m + 1) + "ID"]]["SelectorValues"][A["Selector" + (m + 1) + "ValueID"]] !== "undefined") {
                        z[m][A["Selector" + (m + 1) + "ValueID"]] = OriginalVirtualSelectors[this.virtualGroup["Selector" + (m + 1) + "ID"]]["SelectorValues"][A["Selector" + (m + 1) + "ValueID"]]
                    }
                }
            }
            var t = [];
            for (var m = 0; m < 3; m++) {
                t[m] = [];
                for (var B in z[m]) {
                    t[m].push(z[m][B])
                }
                t[m] = t[m].sort(function(x, g) {
                    return x.Seq - g.Seq
                })
            }
            if (typeof z[0][OriginalItems[this.cartItem.ID]["Selector1ValueID"]] !== "undefined") {
                this.currentSelectorOpt1 = z[0][OriginalItems[this.cartItem.ID]["Selector1ValueID"]]
            }
            if (typeof z[1][OriginalItems[this.cartItem.ID]["Selector2ValueID"]] !== "undefined") {
                this.currentSelectorOpt2 = z[1][OriginalItems[this.cartItem.ID]["Selector2ValueID"]]
            }
            if (typeof z[2][OriginalItems[this.cartItem.ID]["Selector3ValueID"]] !== "undefined") {
                this.currentSelectorOpt3 = z[2][OriginalItems[this.cartItem.ID]["Selector3ValueID"]]
            }
            for (var m = 0; m < 3; m++) {
                var d = 0;
                var k = 0;
                if (m == 0) {
                    d = this.virtualGroup.Selector1ID;
                    k = this.virtualGroup.Selector1DefaultValueID;
                    if (this.currentSelectorOpt1 != null) {
                        k = this.currentSelectorOpt1.ID
                    }
                } else {
                    if (m == 1) {
                        d = this.virtualGroup.Selector2ID;
                        k = this.virtualGroup.Selector2DefaultValueID;
                        if (this.currentSelectorOpt2 != null) {
                            k = this.currentSelectorOpt2.ID
                        }
                    } else {
                        if (m == 2) {
                            d = this.virtualGroup.Selector3ID;
                            k = this.virtualGroup.Selector3DefaultValueID;
                            if (this.currentSelectorOpt3 != null) {
                                k = this.currentSelectorOpt3.ID
                            }
                        }
                    }
                }
                if (this.selectorCtrl[m].length == 1) {
                    for (var B in t[m]) {
                        var b = t[m][B];
                        var l = HTML_Pages.VirtualGroupCustomization_SelectorItem;
                        l = l.replace(/#ID#/gi, b.ID);
                        l = l.replace(/#NAME#/gi, b.Name);
                        l = l.replace(/#DESCRIPTION#/gi, b.Description);
                        var s = $(l);
                        s.data("Val", b);
                        s.data("Index", m);
                        s.data("TitleUI", this.selectorCtrlTitle[m]);
                        s.data("qtyUI", $("#" + this.qtyID));
                        s.data("priceUI", $("#" + this.priceID));
                        s.data("Ctrlr", this);
                        this.selectorCtrl[m].append(s);
                        if (b.ID == k) {
                            this.selectorCtrlTitle[m].html(b.Name.trim());
                            if (m == 0) {
                                this.currentSelectorOpt1 = b
                            } else {
                                if (m == 1) {
                                    this.currentSelectorOpt2 = b
                                } else {
                                    if (m == 2) {
                                        this.currentSelectorOpt3 = b
                                    }
                                }
                            }
                        }
                        s.click(function(I) {
                            I.preventDefault();
                            $(this).foundation("dropdown", "close", $(this).parent());
                            var g = $(this).data("Ctrlr");
                            var H = $(this).data("Val");
                            var x = $(this).data("Index");
                            if (x == 0) {
                                g.currentSelectorOpt1 = H
                            } else {
                                if (x == 1) {
                                    g.currentSelectorOpt2 = H
                                } else {
                                    if (x == 2) {
                                        g.currentSelectorOpt3 = H
                                    }
                                }
                            }
                            $(this).data("TitleUI").html(H.Name);
                            g.changeSelectedItem();
                            var J = $(this).data("priceUI");
                            var K = $(this).data("qtyUI").html();
                            J.html(RoundPrice(g.cartItem.Price * K) + CurrencySymbol)
                        })
                    }
                }
            }
        }
        if (G) {
            for (var w in f.Items) {
                var F = f.Items[w];
                var l = HTML_Pages.VirtualGroupCustomization_SelectorItem;
                l = l.replace(/#ID#/gi, F.ID);
                l = l.replace(/#NAME#/gi, F.Name);
                l = l.replace(/#DESCRIPTION#/gi, F.Description);
                var s = $(l);
                s.data("modItem", F);
                s.data("modGroup", f);
                s.data("TitleUI", this.qtyID);
                s.data("owner", this);
                this.custModGroupCtrl.append(s);
                if (this.isModcartAddItem(F.ID, f.ID)) {
                    this.custModGroupCtrlTitle.html(F.Name.trim())
                }
                s.click(function(I) {
                    I.preventDefault();
                    $(this).foundation("dropdown", "close", $(this).parent());
                    var J = $(this).data("modItem");
                    var H = $(this).data("modGroup");
                    var g = $(this).data("owner");
                    var x = $(this).data("TitleUI");
                    x.html(J.Name.trim());
                    g.clearModGroup(H.ID);
                    g.addModItem(J.ID, H.ID)
                })
            }
        }
        this.showContainer(true)
    };
    this.showAsSubMenu = function(a, c) {
        var b = [];
        for (var d in a.Items) {
            var f = OriginalItems[a.Items[d]["ItemID"]];
            if (typeof f !== "undefined") {
                b.push(f)
            }
        }
        if (b.length == 0) {
            this.cont(false);
            return
        }
        var e = new ItemsViewer();
        e.dataItems = b;
        e.dataTitle = a.Name;
        e.ImagesFolder = "";
        e.imgExtentions = "";
        e.container = this.getContainer(c, true);
        if (c) {
            e.activeStyle = new HtmlStyle(c ? "MatrixSuggestiveSelling_MainMultiplePopup" : "MatrixSuggestiveSelling_MainSubMenu", "MatrixSuggestiveSelling_ScrollPageItemFilter", "MatrixSuggestiveSelling_ThumbsItem", "MatrixSuggestiveSelling_ThumbsItem_SelectorItem", 0, 0, "Thumbs")
        } else {
            e.activeStyle = new HtmlStyle("MatrixSuggestiveSelling_MainSubMenu", "BackgroundList_ScrollPageItemFilter", "BackgroundList_ThumbsItem", "BackgroundList_ThumbsItem_SelectorItem", 0, 0, "Thumbs", false, false)
        }
        e.activeStyle.__TITLE = a.Name;
        e.activeStyle.__DESC = a.Description;
        e.activeStyle.__CONTINUE = genActionLink(this, function(g) {
            g.cont(false)
        });
        e.activeStyle.onInitParams = function(g) {
            g = g.replace("#MENU_TITLE#", this.__TITLE);
            g = g.replace("#DESCRIPTION#", this.__DESC);
            g = g.replace("#CONTINUE#", this.__CONTINUE);
            return g
        };
        e.activeStyle._suggestiveSelling = this;
        e.addItemToCart = function(g) {
            this._suggestiveSelling.cartAddItem(g)
        };
        e.customizeItem = function(h, g, j) {
            showItemCustomize(h, g, null, j)
        };
        e.Init();
        e.Update();
        this.showContainer(c);
        $(window).resize()
    };
    this.findSuggestiveSelling = function(c) {
        var j = [];
        for (var q in OriginalSuggesiveSelling) {
            var k = OriginalSuggesiveSelling[q];
            if (c == "checkout" && k.TriggerType != 0) {
                continue
            }
            if (c == "changeOrderMode" && k.TriggerType != 1) {
                continue
            }
            if (c == "addToCart" && k.TriggerType != 2) {
                continue
            }
            var p = k.ConditionType == 0 ? false : true;
            for (var b in k.Rules) {
                var l = k.Rules[b];
                var f = 0;
                if (l.Condition == 0) {
                    f = cart.cartTotalPrice
                } else {
                    if (l.Condition == 1) {
                        f = cart.cartData.length
                    }
                }
                var e = false;
                if (l.Operator == 0) {
                    e = f == l.Value
                } else {
                    if (l.Operator == 1) {
                        e = f < l.Value
                    } else {
                        if (l.Operator == 2) {
                            e = f <= l.Value
                        } else {
                            if (l.Operator == 3) {
                                e = f > l.Value
                            } else {
                                if (l.Operator == 4) {
                                    e = f >= l.Value
                                } else {
                                    if (l.Operator == 5) {
                                        e = f != l.Value
                                    }
                                }
                            }
                        }
                    }
                }
                if (k.ConditionType == 0) {
                    p = p || e
                } else {
                    p = p && e
                }
            }
            if (p == false && k.Rules.length > 0) {
                continue
            }
            p = false;
            for (var a in k.ItemsConditions) {
                var h = k.ItemsConditions[a];
                var e = false;
                if (h.Condition == 0) {
                    if (c == "addToCart") {
                        if (this.triggerItem.ID == h.ItemID) {
                            e = true
                        } else {
                            e = false
                        }
                    } else {
                        e = this.isItemInCart(h.ItemID)
                    }
                } else {
                    if (h.Condition == 1) {
                        e = !this.isItemInCart(h.ItemID)
                    }
                }
                if (e) {
                    itemInCartID = h.ItemID
                }
                p = p || e
            }
            if (p && c != "addToCart") {
                for (var d in k.Items) {
                    var o = k.Items[d];
                    var e = false;
                    p = p && !this.isItemInCart(o.ItemID);
                    if (!p) {
                        break
                    }
                }
            }
            if (p == false && k.ItemsConditions.length > 0) {
                continue
            }
            p = true;
            for (var g in k.MenusConditions) {
                var m = k.MenusConditions[g];
                var e = false;
                if (m.Condition == 0) {
                    e = this.isSubMenuInCart(m.SubMenuID)
                } else {
                    if (m.Condition == 1) {
                        e = !this.isSubMenuInCart(m.SubMenuID)
                    }
                }
                p = p && e
            }
            if (p == false && k.MenusConditions.length > 0) {
                continue
            }
            if (k.AskingType == 1 && k.status.displayed) {
                continue
            }
            if (k.AskingType == 2 && !k.status.itemAdded) {
                continue
            }
            j.push(k);
            if (k.NextExecution == 0) {
                break
            }
        }
        if (j.length > 0) {
            return j[0]
        } else {
            return null
        }
    };
    this.resetState = function() {
        for (var b in OriginalSuggesiveSelling) {
            var a = OriginalSuggesiveSelling[b];
            a.status = {
                displayed: false,
                itemAdded: false
            }
        }
    };
    this.showSuggestiveSelling = function(a) {
        a.status.displayed = true;
        this.activeSuggestiveSelling = a;
        if (a.ViewType == 0) {
            this.showSingleAsPopup(a)
        } else {
            if (a.ViewType == 1) {
                this.showAsSubMenu(a, true)
            } else {
                if (a.ViewType == 2) {
                    this.showAsSubMenu(a, false)
                }
            }
        }
    };
    this.onCheckout = function(b) {
        if (b == "finish" || b == "changepaymethod") {
            this.continueCheckout(b);
            return
        }
        if (!storeAddressLocator.isOrderModeSelected()) {
            this.continueCheckout(b)
        } else {
            this.triggerType = "checkout";
            this.triggerItem = null;
            this.triggerPage = b;
            var a = this.findSuggestiveSelling("checkout");
            if (a != null) {
                this.showSuggestiveSelling(a)
            } else {
                this.continueCheckout(b)
            }
        }
    };
    this.onAddToItem = function(b) {
        this.continueAddToCart(b);
        if (this.suggestiveSellingIsActive == false) {
            this.triggerType = "addToCart";
            this.triggerItem = b;
            this.triggerPage = null;
            this.itemInCartID = b.ID;
            var a = this.findSuggestiveSelling("addToCart");
            if (a != null) {
                this.showSuggestiveSelling(a)
            }
        }
    };
    this.onCloseOrderMode = function() {
        this.triggerType = "changeOrderMode";
        this.triggerItem = null;
        this.triggerPage = null;
        var a = this.findSuggestiveSelling("changeOrderMode");
        if (a != null) {
            this.showSuggestiveSelling(a)
        } else {
            this.continueCloseOrderMode()
        }
    };
    this.addModItem = function(j, m) {
        var e = new Object();
        var c = 0;
        var k = 1;
        for (var h in OriginalItems[itemInCartID]["modGroup"]) {
            var l = OriginalItems[itemInCartID]["modGroup"][h];
            for (var f in l.Items) {
                if (typeof l.Items[f] !== "undefined" && l.Items[f]["ID"] == j) {
                    c = l.ID;
                    k = OriginalItems[itemInCartID]["itemModGroups"][h]["Maximum"]
                }
            }
        }
        m = m > k ? k : m;
        this.clearModGroup(c);
        var k = OriginalItems[itemInCartID]["itemModGroups"];
        for (var a = 0; a < m; a++) {
            e.ID = j;
            e.ModGroupID = c;
            e.Name = OriginalItems[j]["Name"];
            e.Weight = GetModItemWeight(OriginalModGroups[c], j);
            e.Price = getCartItemPrice(e);
            e.modGroupsItems = [];
            if (this.triggerItem != null) {
                this.triggerItem.modGroupsItems.push(e)
            } else {
                for (var d in cart.cartData) {
                    var b = cart.cartData[d];
                    if (b.ID == itemInCartID) {
                        b.modGroupsItems.push(e)
                    }
                }
            }
        }
    };
    this.clearModGroup = function(c) {
        if (this.triggerItem != null) {
            for (var b in this.triggerItem.modGroupsItems) {
                var e = this.triggerItem.modGroupsItems[b];
                if (e.ModGroupID == c) {
                    this.triggerItem.modGroupsItems.splice(b, 1);
                    break
                }
            }
        } else {
            for (var d in cart.cartData) {
                var a = cart.cartData[d];
                if (a.ID == itemInCartID) {
                    for (var b in a.modGroupsItems) {
                        var e = a.modGroupsItems[b];
                        if (e.ModGroupID == c) {
                            this.removedModItem = a.modGroupsItems.splice(b, 1)
                        }
                    }
                }
            }
        }
    };
    this.isModcartAddItem = function(d, e) {
        var c = 0;
        for (var b in this.cartItem.modGroupsItems) {
            var a = this.cartItem.modGroupsItems[b];
            if (a.ModGroupID == e && a.ID == d) {
                c++
            }
        }
        return c
    };
    this.changeSelectedItem = function() {
        var c = null;
        for (var b in OriginalItems) {
            var a = OriginalItems[b];
            if (a.VirtualGroupID !== this.virtualGroup.ID) {
                continue
            }
            if ((a.Selector1ValueID == -1 || a.Selector1ValueID == 0 || this.currentSelectorOpt1 == null || a.Selector1ValueID == this.currentSelectorOpt1.ID) && (a.Selector2ValueID == -1 || a.Selector2ValueID == 0 || this.currentSelectorOpt2 == null || a.Selector2ValueID == this.currentSelectorOpt2.ID) && (a.Selector3ValueID == -1 || a.Selector3ValueID == 0 || this.currentSelectorOpt3 == null || a.Selector3ValueID == this.currentSelectorOpt3.ID)) {
                this.cartItem.ID = a.ID;
                this.cartItem.Name = a.Name;
                this.cartItem.Price = a.Price;
                break
            }
        }
    };
    this.anyUpsaleItemsSelected = function() {
        if (this.submenu == null) {
            return false
        }
        for (var a in this.submenu.Items) {
            var d = this.submenu.Items[a];
            for (var c in cart.cartData) {
                var b = cart.cartData[c];
                if (b.ID == d.ID) {
                    return true
                }
            }
        }
        return false
    }
}
$(document).ready(function() {
    document.matrixSuggestiveSelling = new MatrixSuggestiveSelling();
    document.matrixSuggestiveSelling_showCheckout = showCheckout;
    cart.matrixSuggestiveSelling_addItemToCart = cart.addItemToCart;
    storeAddressLocator.matrixSuggestiveSelling_onClose = storeAddressLocator.onClose;
    cart.matrixSuggestiveSelling_clearCart = cart.clearCart;
    showCheckout = function(a) {
        document.matrixSuggestiveSelling.onCheckout(a)
    };
    cart.addItemToCart = function(a) {
        document.matrixSuggestiveSelling.onAddToItem(a)
    };
    storeAddressLocator.onClose = function() {
        document.matrixSuggestiveSelling.onCloseOrderMode()
    };
    cart.clearCart = function() {
        document.matrixSuggestiveSelling.resetState();
        this.matrixSuggestiveSelling_clearCart()
    };
    document.matrixSuggestiveSelling.continueCheckout = function(a) {
        document.matrixSuggestiveSelling_showCheckout(a)
    };
    document.matrixSuggestiveSelling.continueAddToCart = function(a) {
        cart.matrixSuggestiveSelling_addItemToCart(a)
    };
    document.matrixSuggestiveSelling.continueCloseOrderMode = function() {
        storeAddressLocator.matrixSuggestiveSelling_onClose()
    };
    document.matrixSuggestiveSelling.Init()
});