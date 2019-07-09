function callNcrProgrammatic(programmaticId, programmaticCustomerId) {
    window._tL = window._tL || [];
    window._tI = window._tI || false;
    window._tT = window._tT || function (adv) { window._tL.push(adv); };
    
    Radiant.AlohaOnline.OrderEntryService.GetOrderAndSiteInfo(function (d) {
        var ordID = "";
        if (d != null && d.SiteInfo != null && d.Order != null) {
            od = d.Order.CreationDateTime;
            odstr = od.getFullYear() + "-" + ('0' + (od.getMonth() + 1)).slice(-2) + "-" + ('0' + od.getDate()).slice(-2);
            ordID = d.SiteInfo.CompanyCode + "_" + d.SiteInfo.SiteId + "_" + d.SiteInfo.StoreIdentifier + "_" + d.Order.OrderId + "_" + odstr
        }

        var receipt = window.location.pathname.includes("OrderReceipt");
        var _adv = _adv = {
            id: programmaticId, ad: programmaticCustomerId
        };
        if (receipt) {
            _adv = {
                id: programmaticId, ad: programmaticCustomerId, e: "R"
            }
        } else if (ordID != "") {
            _adv = {
                id: programmaticId, ad: programmaticCustomerId, e: "R", eid: ordID
            }
        }

        window._tT(_adv);
        if (!window._tI) {
            window._tI = true;
            (function (e, t) {var n = e.createElement(t), r = e.getElementsByTagName(t)[0]; n.src = "../js.turboadv.com/turbo.js"; n.async = true; r.parentNode.insertBefore(n, r)})(document, "scr" + "ipt")
        }
    });
}

function callNcrProgrammaticMobile(programmaticId, programmaticCustomerId) {

    
    window._tL = window._tL || [];
    window._tI = window._tI || false;
    window._tT = window._tT || function (adv) { window._tL.push(adv); };
    var ordID = "";


    

    if (window.currentSiteId != null && window.currentSiteId != "") {
        od = new Date();
        odstr = od.getFullYear() + "-" + ('0' + (od.getMonth() + 1)).slice(-2) + "-" + ('0' + od.getDate()).slice(-2);
        var companyCode = companyCodeQueryString.replace("&companyCode=", "");
        ordID = companyCode + "_" + window.currentSiteId + "_" + "SI" + "_" + window.currentOrderId + "_" + odstr
    }

    var receipt = window.location.pathname.includes("OrderReceipt");
    var _adv = _adv = {
        id: programmaticId, ad: programmaticCustomerId
    };
    if (receipt) {
        _adv = {
            id: programmaticId, ad: programmaticCustomerId, e: "R"
        }
    } else if (ordID != "") {
        _adv = {
            id: programmaticId, ad: programmaticCustomerId, e: "R", eid: ordID
        }
    }

    window._tT(_adv);
    if (!window._tI) {
        window._tI = true;
        (function (e, t) { var n = e.createElement(t), r = e.getElementsByTagName(t)[0]; n.src = "../js.turboadv.com/turbo.js"; n.async = true; r.parentNode.insertBefore(n, r) })(document, "scr" + "ipt")
    }
}


