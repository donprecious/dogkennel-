var OrderModeType_Pickup = 1;
var OrderModeType_Delivery = 2;
var RefererPage = "";
var menuId = 0;
var addressLine1 = "";
var loggedout = false;
var loggedin = false;
var siteClosed = true;
var FeeId = 0;
var DateTimes = null;

var ItemOrderingMode_Normal = 0;
var ItemOrderingMode_Pizza = 1;
var ItemOrderingMode_QtyModifierItem = 2;
var ItemOrderingMode_BuildYourOwn = 3;
var ItemOrderingMode_ModifierDeterminesQty = 4;

var modifierAction = {
    Default: 0,
    Add: 1,
    No: 2,
    Extra: 4,
    Side: 8,
    Light: 16,
    Everything: 32,
    Plain: 64
};

//var DateTimeSelectorTooLongLabel = getResourceText("WebOrder.DateTimeSelector.TooLongLabel", "tooLong");//GTG, datetime stuff goes in pickup.cshtml
//var DateTimeSelectorNoTimesRetry = getResourceText("WebOrder.DateTimeSelector.NoTimesRetry", "noTimesRetry");//GTG, datetime stuff goes in pickup.cshtml
//var DateTimeSelectorErrorRetrievingTimes = getResourceText("WebOrder.DateTimeSelector.ErrorRetrievingTimes", "errorRetrievingTimes");//GTG, datetime stuff goes in pickup.cshtml
//var DateTimeSelectorMobileNoMoreTimes = getResourceText("WebOrder.DateTimeSelector.MobileNoMoreTimes", "showDateWarningUpdate");//GTG, datetime stuff goes in pickup.cshtml
//var SplashPageAddressNotFoundFirst = "@Content.ResourceText("WebOrder.SplashPage.AddressNotFoundFirst", Html)"; GTG, delivery.cshtml
//var SplashPageAddressNotFoundSecond = "@Content.ResourceText("WebOrder.SplashPage.AddressNotFoundSecond", Html)"; GTG, delivery.cshtml
//var ContactInfoMobileUpdatedSuccessfully = getResourceText("WebOrder.ContactInfo.MobileUpdatedSuccessfully", "CustomerInfoUpdateSuccessful");//GTG, accountedit.cshtml
//var ContactInfoMobileUpdateFailed = getResourceText("WebOrder.ContactInfo.MobileUpdateFailed", "CustomerInfoUpdateFailed");//GTG, accountedit.cshtml
//var ContactInfoMobileUpdateFailed = getResourceText("WebOrder.ContactInfo.MobileUpdateFailed", "CustomerInfoUpdateFailed");//GTG, accountedit.cshtml
//var OrderEntryMobileErrorRetry = getResourceText("WebOrder.OrderEntry.MobileErrorRetry", "errorHappened");//checkout.cshtml, seems good, do confirm
//var CheckoutMobileLoginSignupButton = getResourceText("WebOrder.Checkout.MobileLoginSignupButton");//GTG, splash.cshtml
//var OrderEntryMobileLoseOrder = getResourceText("WebOrder.OrderEntry.MobileLoseOrder", "showLoseOrderWarning");//GTG, have it live in _logonpartial.cshtml
//var VerifyPaymentMobileValidCardNumber = getResourceText("WebOrder.VerifyPayment.MobileValidCardNumber", "enterValidCardNumber");//GTG, _creditpayment.cshtml, accountedit.cshtml

var DateTimeSelectorTooLongLabel;
var DateTimeSelectorNoTimesRetry;
var DateTimeSelectorErrorRetrievingTimes;
var DateTimeSelectorMobileNoMoreTimes;
var SplashPageAddressNotFoundFirst;
var SplashPageAddressNotFoundSecond;
var ContactInfoMobileUpdatedSuccessfully;
var ContactInfoMobileEmailUpdated;
var ContactInfoMobileUpdateFailed;
var OrderEntryMobileErrorRetry;
var CheckoutMobileLoginSignupButton;
var OrderEntryMobileLoseOrder;
var VerifyPaymentMobileValidCardNumber;
var MobileComboPriceAtCheckOut;
var MobileASAPDeliveryQuestion;
var DateTimeSelectorTodayLabel;
var MobileEnableASAPOnDelivery;
var LeftHalfString;
var RightHalfString;

$(document).ready(function () {
    if ('undefined' !== typeof DTSTooLongLabel) {  DateTimeSelectorTooLongLabel = DTSTooLongLabel; }
    if ('undefined' !== typeof DTSNoTimesRetry) {  DateTimeSelectorNoTimesRetry = DTSNoTimesRetry; }
    if ('undefined' !== typeof DTSErrorRetrievingTimes) {  DateTimeSelectorErrorRetrievingTimes = DTSErrorRetrievingTimes; }
    if ('undefined' !== typeof DTSMobileNoMoreTimes) {  DateTimeSelectorMobileNoMoreTimes = DTSMobileNoMoreTimes; }
    if ('undefined' !== typeof SPAddressNotFoundFirst) {  SplashPageAddressNotFoundFirst = SPAddressNotFoundFirst; }
    if ('undefined' !== typeof SPAdderssNotFoundSecond) {  SplashPageAddressNotFoundSecond = SPAdderssNotFoundSecond; }
    if ('undefined' !== typeof CIMobileUpdatedSuccessfully) { ContactInfoMobileUpdatedSuccessfully = CIMobileUpdatedSuccessfully; }
    if ('undefined' !== typeof CIMobileEmailUpdated) { ContactInfoMobileEmailUpdated = CIMobileEmailUpdated; }
    if ('undefined' !== typeof CIMobileUpdateFailed) {  ContactInfoMobileUpdateFailed = CIMobileUpdateFailed; }
    if ('undefined' !== typeof OEMobileErrorRetry) {  OrderEntryMobileErrorRetry = OEMobileErrorRetry; }
    if ('undefined' !== typeof CMobileLoginSignupButton) {  CheckoutMobileLoginSignupButton = CMobileLoginSignupButton; }
    if ('undefined' !== typeof OEMobileLoseOrder) {  OrderEntryMobileLoseOrder = OEMobileLoseOrder; }
    if ('undefined' !== typeof VPMobileValidCardNumber) { VerifyPaymentMobileValidCardNumber = VPMobileValidCardNumber; }
    if ('undefined' !== typeof MobileComboAtCheckOut) { MobileComboPriceAtCheckOut = MobileComboAtCheckOut; }
    if ('undefined' !== typeof ASAPDeliveryQuestion) { MobileASAPDeliveryQuestion = ASAPDeliveryQuestion; }
    if ('undefined' !== typeof DTSTodayLabel) { DateTimeSelectorTodayLabel = DTSTodayLabel; }
    if ('undefined' !== typeof EnableASAPOnDelivery) { MobileEnableASAPOnDelivery = EnableASAPOnDelivery; }
    if ('undefined' !== typeof LeftHalf) { LeftHalfString = LeftHalf; }
    if ('undefined' !== typeof RightHalf) { RightHalfString = RightHalf; }
});


(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '../../www.google-analytics.com/analytics.js', 'ga');

////ga('create', 'UA-48435316-4', 'auto');
if ('undefined' !== typeof masterTrackingCode) {
    ga('create', masterTrackingCode, 'auto');
    ga('create', trackingCode, 'auto', { 'name': 'newTracker' });
    ga('send', 'pageview');
    ga('newTracker.send', 'pageview');
}



var stripAccents = (function () {
    var in_chrs = 'àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ',
        out_chrs = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY',
        chars_rgx = new RegExp('[' + in_chrs + ']', 'g'),
        transl = {}, i,
        lookup = function (m) { return transl[m] || m; };

    for (i = 0; i < in_chrs.length; i++) {
        transl[in_chrs[i]] = out_chrs[i];
    }

    return function (s) { return s.replace(chars_rgx, lookup); }
})();

function loadMapDeliveryScript() {
    var script = document.createElement("script");
    var language = "";

    if ($('#hfLanguageParameter').val()) {
        language = $('#hfLanguageParameter').val();
    }

    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?&key=" + apiKey + "&sensor=true" + language + "&callback=initialize_map";
    document.body.appendChild(script);
}

function loadPlacesMapScript() {
    var script = document.createElement("script");
    var language = "";

    if ($('#hfLanguageParameter').val()) {
        language = $('#hfLanguageParameter').val();
    }

    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?libraries=places&key=" + apiKey + "&sensor=true" + language + "&callback=initAutoComplete";
    document.body.appendChild(script);
}

function loadMapController() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "../Scripts/mapControllerMobile.js";
    document.body.appendChild(script);
}

function available_height_locations() {
    var newHeight = $(window).height() - $("#map").position().top - $("#page-footer").height();
    newHeight = newHeight > 320 ? newHeight : 320;
    $("#map-container").css('height', newHeight);
    if ($(window).width() <= 580) {
        if (myScrollLocations != null) {
            myScrollLocations.disable();
        }
    } else {
        var element = document.getElementById('site-list-container');
        if (element.offsetHeight < element.scrollHeight) {
            if (myScrollLocations == null) {
                myScrollLocations = new iScroll('site-list-container', {
                    hScrollbar: false,
                    hScroll: false
                });
            }
            myScrollLocations.enable();
            setTimeout(function () {
                myScrollLocations.refresh();
            }, 0);
        } else {
            if (myScrollLocations != null) {
                myScrollLocations.disable();
            }
        }
    }
    if (map != null) {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(userlocation);
    }
    //there's a 10% width bar on the right side on mobile view in Pickup view because of this
    //$('#site-list-container').css('width','90%');
    $('#site-list-container').css('top', '1em');
}

function addMarkerEventListeners(iconUrl, pos, name, html) {
    var storeLocImg = new google.maps.MarkerImage(iconUrl,
	    new google.maps.Size(23, 35),
	    new google.maps.Point(0, 0),
	    new google.maps.Point(23, 35));

    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        draggable: false,
        icon: storeLocImg,
        key: name,
        content: html
    });

    marker.setMap(map);
    addInfoBoxContent(null, marker, "zoneSiteText", html);
    markersArray.push(marker);

}

function addInfoBoxContent(polygon, marker, className, html) {
    var boxText = document.createElement("div");
    boxText.className = className;
    boxText.innerHTML = html;

    var myOptions = {
        content: boxText
			, disableAutoPan: false
			, maxWidth: 0
			, pixelOffset: new google.maps.Size(-140, 0)
			, zIndex: null
			, boxStyle: {
			    background: "url('" + staticContentUrl + "Images/tipbox.gif') no-repeat"
			  , opacity: 1
			  , width: "18em"
			}
			, closeBoxMargin: "10px 2px 2px 2px"
			, closeBoxURL: "https://www.google.com/intl/en_us/mapfiles/close.gif"
			, infoBoxClearance: new google.maps.Size(1, 1)
			, isHidden: false
			, pane: "floatPane"
			, enableEventPropagation: false
    };

    if (polygon == null) polygon = marker;
    google.maps.event.addListener(polygon, "click", function (e) {
        $('.infoBox').each(function () {
            $(this).hide();
        });
        ib = new InfoBox(myOptions);
        ib.open(map, marker);
    });
}

function getResourceText(key, funcName) {
    $.ajax({
        url: '/mobile/GetResourceTextAjax',
        type: 'POST',
        data: { key: key },
        success: function (result) {
            if (funcName != null) {
                window[funcName](result.value);
            }
            else
            {
                if (result.value != null) return result.value;
                else return "";
            }
        },
        error: function (result) {
            return "";
        }
    });
}

function popUpDateTimeModal(siteID, orderMode, menuID) {
    if (menuID) {
        menuId = menuID;
    }
    showLoader();
    $.ajax({
        url: '/mobile/GetAvailableTimes',
        type: 'POST',
        dataType: 'json',
        data: { siteID: siteID, orderMode: orderMode, menuId: menuId, feeId: FeeId },
        error: function (jqXHR, textStatus) {
            hideLoader();
            if (textStatus == 'timeout') {
                //$('.modal-content').html("Sorry, but the request took too long, please select another site or retry.");
                //getResourceText("WebOrder.DateTimeSelector.TooLongLabel", "tooLong");
                tooLong(DateTimeSelectorTooLongLabel);
                displayModal('client-side-ok');
            }
        },
        success: function (data) {
            try {
                $('#datetime').val('');
                if (data.dateHtml === undefined ||  data.siteClosed) {
                    //$('.modal-content').html("Sorry, but there are no available times on this date. Please select another day or store");
                    //getResourceText("WebOrder.DateTimeSelector.NoTimesRetry", "noTimesRetry");
                    noTimesRetry(DateTimeSelectorNoTimesRetry);
                    displayModal('client-side-ok');
                }
                else {
                    DateTimes = data;
                    setUpDate(data);
                    setUpTime(data);
                    remove_tooltip();
                    displayModal('_DateTimeSelector');
                    SelectedOrderMode = orderMode;
                    SelectedSiteID = siteID;
                }
                hideLoader();
            }
            catch (e) {
                hideLoader();
                //$('.modal-content').html("Error retrieving times");
                //getResourceText("WebOrder.DateTimeSelector.ErrorRetrievingTimes", "errorRetrievingTimes");
                errorRetrievingTimes(DateTimeSelectorErrorRetrievingTimes);
                displayModal('client-side-ok');
            }
        },
        timeout: 20000
    });

}

function setUpDate(data) {
    var dateSelect = $('#date-select');
    dateSelect.empty();
    dateSelect.append(data.dateHtml);
    dateSelect.scroller('destroy');
    dateSelect.scroller({
        preset: 'select',
        theme: 'default',
        display: 'inline',
        mode: 'mixed',
        inputClass: 'i-txt'

    });
    $('#date-select-button').off('click');
    $('#date-cancel-button').off('click');
    $('#date-select-button').on("click", function () {
        setUpTime(DateTimes);
        slideLeftToggle($('.date-content'));
    });
    $('#date-cancel-button').on("click", function () {
        closeModal('_DateTimeSelector');
    });
    //$('.date-content').css('left', 0);
    dateSelect.scroller('show');
    $("#date-select").change(function () {
        setUpTime(data);
    });
}

function setUpTime(data) {
    showDateWarning(data);
    var invalidSelections = [];
    var timeSelect = $('#time-select');
    timeSelect.empty();
    var dateSelect = $('#date-select');
    var date = $('#date-select').val();
    var timeHtml = "";
	var timeInfo;
    for (x in data.dateList) {
        if (data.dateList[x] == date) 
		{
			timeHtml = data.timeListHtml[x];
			timeInfo = data.timeInfo[x];
            break;
        }
    }
    timeSelect.append(timeHtml);

    timeSelect.scroller('destroy');
    timeSelect.scroller({
        preset: 'select',
        theme: 'default',
        display: 'inline',
        mode: 'clickpick',
        inputClass: 'i-txt',
        invalid: invalidSelections
    });
    $('#date-select-button').off('click');
    $('#date-cancel-button').off('click');
    $('#date-select-button').on("click", function () 
	{
        if ((MobileEnableASAPOnDelivery == 'true') && SelectedOrderMode == OrderModeType_Delivery && (dateSelect.text().indexOf(DateTimeSelectorTodayLabel) > -1) && timeSelect.prop("selectedIndex") == 0 && dateSelect.prop("selectedIndex") == 0) {
            closeModal('_DateTimeSelector');
			var selTimeIndex = timeSelect.prop("selectedIndex");
            var question = MobileASAPDeliveryQuestion.replace("%FirstAvailableTime%", timeInfo.strTimes[selTimeIndex]);
            $('.modal-content').html(question);
            $('#modal-yes-button').unbind('click').click(function () {
                closeModal('client-side-yes_no');
                saveCookieGlobal('ASAPDeliveryEnabled', 'true', 1);
                startOrder();
            });
            $('#modal-no-button').unbind('click').click(function () {
                closeModal('client-side-yes_no');
                eraseCookie('ASAPDeliveryEnabled');
                startOrder();
            });
            displayModal('client-side-yes_no');
        } else {
            eraseCookie('ASAPDeliveryEnabled'); //just to make sure ASAPDeliveryEnabled wasn't enabled at an earlier time
            startOrder();
        }
        
    });
    $('#date-cancel-button').on("click", function () {
        closeModal('_DateTimeSelector');
    });
}

function showDateWarning(data) {
    if (data.NoTimesForCurrentDay) {
        showDateWarningUpdate(DateTimeSelectorMobileNoMoreTimes);
    }
    else {
        hideDateWarningUpdate();
    }
}

//all the methods that do ('.modal-content').html(warningText) can possibly be merged into one.
function showDateWarningUpdate(warningText)
{
    $("#date-time-warning").text(warningText);
}
function hideDateWarningUpdate()
{
    $("#date-time-warning").text("");
}
function showLoseOrderWarning(warningText)
{
    $('.modal-content').html(warningText);
}
function enterValidCardNumber(warningText)
{
    $('.modal-content').html(warningText);
}
function tooLong(warningText)
{
    $('.modal-content').html(warningText);
}
function noTimesRetry(warningText)
{
    $('.modal-content').html(warningText);
}
function errorRetrievingTimes(warningText)
{
    $('.modal-content').html(warningText);
}
function CustomerInfoUpdateSuccessful(warningText)
{
    $('.modal-content').html(warningText);
}
function CustomerInfoUpdateFailed(warningText)
{
    $('.modal-content').html(warningText);
}
function errorHappened(warningText)
{
    $('.modal-content').html(warningText);
}


function remove_tooltip() {
    var tooltip = $('#tooltip');
    tooltip.remove();
    $(window).off('mousedown').off('touchstart');
    $(window).off('resize', remove_tooltip);
}

function startOrder() {
    var add1 = "";
    var add2 = "";
    var city = "";
    var state = "";
    var postal = "";
    if ($('#tbAddress1').length > 0) {
        add1 = $('#tbAddress1').val();
        add2 = $('#tbAddress2').val();
        city = $('#tbCity').val();
        state = $('#ddlStates').val();
        postal = $('#tbPostalCode').val();
    }

    var extradata = '';
    if (isAddrFreeForm()) {
        extradata = constructExtraData(null);
    }

    $.form('/mobile/StartOrder', {
        "address1": add1,
        "address2": add2,
        "city": city,
        "state": state,
        "postal": postal,
        "siteID": SelectedSiteID,
        "orderMode": SelectedOrderMode,
        "RefererPage": RefererPage,
        "feeId": FeeId,
        "menuId": menuId,
        "dateTime": $('#date-select').val() + $('#time-select').val(),
        "extradata": extradata,
    }).submit();
}

function slideLeftToggle(selection) {
    selection.animate({
        left: parseInt(selection.css('left'), 10) == 0 ? -selection.outerWidth() : 0
    });
}

jQuery(function ($) {
    $.extend({
        form: function (url, data, method) {
            if (method == null) method = 'POST';
            if (data == null) data = {};

            var form = $('<form>').attr({
                method: method,
                action: url
            }).css({
                display: 'none'
            });

            var addData = function (name, data) {
                if ($.isArray(data)) {
                    for (var i = 0; i < data.length; i++) {
                        var value = data[i];
                        addData(name + '[]', value);
                    }
                } else if (typeof data === 'object') {
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            addData(name + '[' + key + ']', data[key]);
                        }
                    }
                } else if (data != null) {
                    form.append($('<input>').attr({
                        type: 'hidden',
                        name: String(name),
                        value: String(data)
                    }));
                }
            };
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    addData(key, data[key]);
                }
            }
            return form.appendTo('body');
        }
    });
});

function initButtons() {
    $('#modal-cancel-button').on("click", function () {
        closeModal('client-side');
        setEmptyResultMessage();
    });
    $('#modal-select-button').on("click", function () {
        setSuggestedAddress();
    });
}

function setEmptyResultMessage() {
    var decodedstring = $("<div>").html($("<div>").html(emptyResultMessage).text()).text();
    pickupOrderLink = "<a href='/Mobile/Pickup/" + menuType + "?lat=" + userlocation.lat() + "&lng=" + userlocation.lng() + "'>" + pickupOrderLink;
    $('.modal-content').html('<div>' +
        FormatResourceString(decodedstring, pickupOrderLink, storeLocatorRange, distanceText) +
        '</div>');
    $('.modal-content').find('a').css('text-decoration', 'underline');
    $('.modal-content').find('a').css('font-weight', 'bold');

    displayModal('client-side-ok');
}

function loadSavedAddress(onPageLoad) {
    searchAddress(onPageLoad);
}

function populateNearbySitesWithPolygonsList(site) {
    if (site.Polygons.length > 0) {//if site has polygons defined    
        if (site.IsUserInDeliveryZone) {
            //do not include site if the user location is in a polygon that is not deliverable
            var bIsDeliverable = true;
            for (ctr = 0; ctr < site.Polygons.length ; ctr++) {
                if (!site.Polygons[ctr].isdeliverable && site.Polygons[ctr].UserInPolygon) {
                    bIsDeliverable = false;
                    break;
                }
            }
            if (bIsDeliverable)
                nearbySitesWithPolygons.push(site);
        }
    }
    else {
        nearbySitesWOPolygons.push(site);
    }
}

function displayUserLocation() {
    var sitemarker = new google.maps.Marker({
        position: userlocation,
        map: map
    });

    sitemarker.setMap(map);
    markersArray.push(sitemarker);
    sitemarker.setAnimation(null);
}

function displayDeliveryZones() {
    bounds.extend(userlocation);
    for (var i = 0; i < nearbySitesWithPolygons.length; i++) {
        for (var k = 0; k < nearbySitesWithPolygons[i].Polygons.length; k++) {
            loadPolygon(nearbySitesWithPolygons[i].Polygons[k]);
        }
    }
    map.fitBounds(bounds);
}

function AddSiteLocations() {
    for (var n = 0; n < nearbySitesWithPolygons.length; n++) {
        var iconUrl = contentUrl + "?ContentFile=marker_" + (n + 1) + ".png" + companyCodeQueryString + designIdQueryString;
        var infoWindowHTML = nearbySitesWithPolygons[n].Html;
        var pos = new google.maps.LatLng(nearbySitesWithPolygons[n].NearBySite.nearbySite.Site.Latitude, nearbySitesWithPolygons[n].NearBySite.nearbySite.Site.Longitude);
        addMarkerEventListeners(iconUrl, pos, nearbySitesWithPolygons[n].NearBySite.nearbySite.Site.SiteName, infoWindowHTML);
    }
    for (var n = 0; n < nearbySitesWOPolygons.length; n++) {
        var iconUrl = contentUrl + "?ContentFile=marker_" + (n + 1) + ".png" + companyCodeQueryString + designIdQueryString;
        var infoWindowHTML = nearbySitesWOPolygons[n].Html;
        var pos = new google.maps.LatLng(nearbySitesWOPolygons[n].NearBySite.nearbySite.Site.Latitude, nearbySitesWOPolygons[n].NearBySite.nearbySite.Site.Longitude);
        addMarkerEventListeners(iconUrl, pos, nearbySitesWOPolygons[n].NearBySite.nearbySite.Site.SiteName, infoWindowHTML);
    }
}

function loadPolygon(polygon) {
    MapController.stopEditing();
    MapController.initFeature('shape', polygon.name);

    if (polygon.UserInPolygon) {
        var feeid = '' + polygon.deliveryfeeId;
        feeid = parseInt(feeid) || -1;

        var siteid = polygon.siteid;
        var sitediv = $("#site-list").find("div[data-siteid='" + siteid + "']");
        if (sitediv.length > 0) {
            var currentFeeId = sitediv.attr('data-feeid');
            if (feeid == 0 || feeid == -1) {
                if (currentFeeId <= 0) {//dont want to overwrite zone with feeid, with zone with no fees
                    var priority = sitediv.attr('data-priority');
                    if (priority == 99999) {
                        sitediv.attr('data-feeid', feeid);
                        sitediv.attr('data-priority', polygon.priority);
                    }
                    else if (priority == 0 && polygon.priority >= 0) {
                        sitediv.attr('data-feeid', feeid);
                        sitediv.attr('data-priority', polygon.priority);
                    }
                    else if (polygon.priority < priority) {
                        sitediv.attr('data-feeid', feeid);
                        sitediv.attr('data-priority', polygon.priority);
                    }
                }
            } else {
                if (currentFeeId <= 0 || feeid > 0) {
                    var priority = sitediv.attr('data-priority');
                    if (priority == 99999) {
                        sitediv.attr('data-feeid', feeid);
                        sitediv.attr('data-priority', polygon.priority);
                    }
                    else if (priority == 0 && polygon.priority >= 0) {
                        sitediv.attr('data-feeid', feeid);
                        sitediv.attr('data-priority', polygon.priority);
                    }
                    else if (polygon.priority < priority) {
                        sitediv.attr('data-feeid', feeid);
                        sitediv.attr('data-priority', polygon.priority);
                    }
                }
            }
        }
    }
}

function setFeeId(siteid, mode) {
    var sitediv = $("#site-list").find("div[data-siteid='" + siteid + "']");
    FeeId = sitediv.attr('data-feeid');
    popUpDateTimeModal(siteid, mode);
}

function GetCountry(){
    var country = "";

    if($('#hfCountryCode').val()) {

        country = $('#hfCountryCode').val();
        if (country.toLowerCase() === "us") {
            return ", USA";
        }
        else{
            country = ", " + country;       
        }
    }

    return country;
}

function searchAddress(onPageLoad) {
    var address = '';
    if (validateSearchFields(onPageLoad)) {
        var city = $('#tbCity').val();
        var state = "";
        if (IsCultureTerritoriesFormatTypeDefault()) {
            state = $('#ddlStates option:selected').attr("title");
        } else {
            state = $('#ddlStates').val();
        }
        var zipcode = '';

        if ($('#tbPostalCode').val()) {
            zipcode = $('#tbPostalCode').val();
        }

        var optionalAddress = $('#tbAddress2').val();

        if (optionalAddress.length > 0) {
            optionalAddress += ', ';
        }

        address = $('#tbAddress1').val() + ', ';
        address += optionalAddress;
        address += city + ', ';
        address += state + ', ';
        address += zipcode;
        address += GetCountry();

        if (isAddrFreeForm()) {
            var extradata = '';
            $('input[target="extradata"]').each(function () {
                extradata += $(this).val() + ',' ;
            });

            address = extradata + address;
        }

        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                userlocation = results[0].geometry.location;
                if ((verifyReturnedAddress(results) == false)) {
                    currentSearchResult = results;
                    var message = SplashPageAddressNotFoundFirst + results[0].formatted_address + SplashPageAddressNotFoundSecond;
                    if (useDeliveryZone == 'True') {
                        $('.modal-content').html(message);
                        displayModal('client-side');
                        resetSearchDefaults();
                    }
                    else {
                        searchByLocation(true);
                    }
                }
                else {
                    searchByLocation(true);
                }
            }
            else {
                resetSearchDefaults();
                setEmptyResultMessage();
            }
        });
    }
    else {
        resetSearchDefaults();
    }
}

function validateSearchFields(onPageLoad) {
    var bValid = true;
    $('.delivery_input').each(function () {
        $(this).removeClass('errorBackgroundColor');
    });
    $('#ddlStates').removeClass('errorBackgroundColor');
    var address = $('#tbAddress1').val() + $('#tbCity').val() + $('#ddlStates').val() + $('#tbPostalCode').val();
    if (address == "" && onPageLoad) {
        return false;
    }

    var bValid = true;
    if ($('#tbAddress1').val() == "") {
        bValid = false;
        $('#tbAddress1').addClass('errorBackgroundColor'); ;
    }
    if ($('#tbCity').val() == "") {
        bValid = false;
        $('#tbCity').addClass('errorBackgroundColor');
    }
    if ($('#ddlStates').val() == "") {
        bValid = false;
        $('#ddlStates').addClass('errorBackgroundColor');
    }

    var tbPostalCodeIsRequired = true;
    if ($('#hfZipCodeVisibility').val()) {
        var zipCodeVisibility = $('#hfZipCodeVisibility').val();
        if (zipCodeVisibility.toLowerCase() == 'optional') {
            tbPostalCodeIsRequired = false;
        }
    }

    if ($('#tbPostalCode').val() == "" && tbPostalCodeIsRequired) {
        bValid = false;
        $('#tbPostalCode').addClass('errorBackgroundColor');
    }
    return bValid;
}

function searchByLocation(pushState) {
    resetSearchDefaults();
    showLoader();
    $.ajax({
        url: '/Mobile/GetNearbySitesForDelivery',
        type: 'POST',
        data: JSON.stringify({ lat: userlocation.lat(), lng: userlocation.lng(), menuType: menuType }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        error: function (xhr) {
            hideLoader();
        },
        success: function (result) {
            for (var i = 0; i < result.length; i++) {
                populateNearbySitesWithPolygonsList(result[i]);
            }

            if (nearbySitesWithPolygons.length > 0) {
                $('#site-list').empty();
                for (i = 0; i < nearbySitesWithPolygons.length; i++) {
                    $('#site-list').append(nearbySitesWithPolygons[i].Html);
                }
                for (i = 0; i < nearbySitesWOPolygons.length; i++) {
                    $('#site-list').append(nearbySitesWOPolygons[i].Html);
                }
                displayUserLocation();
                AddSiteLocations();
                if (useDeliveryZone == 'True') {
                    displayDeliveryZones();
                }
                else {
                    bounds.extend(userlocation);
                    map.fitBounds(bounds);
                }
            }
            else if (nearbySitesWOPolygons.length > 0) {
                $('#site-list').empty();
                for (i = 0; i < nearbySitesWOPolygons.length; i++) {
                    $('#site-list').append(nearbySitesWOPolygons[i].Html);
                }
                displayUserLocation();
                AddSiteLocations();
                bounds.extend(userlocation);
                map.fitBounds(bounds);
            }
            else {
                displayUserLocation();
                bounds.extend(userlocation);
                map.fitBounds(bounds);
                setEmptyResultMessage();
            }
            if (pushState) {
                var stateObj = { lat: userlocation.lat(), lng: userlocation.lng(), add1: $('#tbAddress1').val(), add2: $('#tbAddress2').val(), city: $('#tbCity').val(), state: $('#ddlStates').val(), postal: $('#tbPostalCode').val(), catering: $('#catering-checkbox-delivery').is(':checked') };
                history.pushState(stateObj, new Date().getTime(), "/Mobile/Delivery/" + menuType);
            }
            hideLoader();
            if (!$('#right-column').is(':visible'))
                $('#site-list-container').slideDown();

            checkForSiteClosed();
        }
    });
}

function verifyReturnedAddress(results) {
    var city = "";
    var state = "";
    var zip = "";

    var enteredCity = $('#tbCity').val().split('.').join('');
    var addressFormatList = results[0].formatted_address.split(',');
    var containsCity = false;

    for (var addComponent in results[0].address_components) {
        var component = results[0].address_components[addComponent];
        for (typeIndex in component.types) {
            if (component.types[typeIndex] == 'locality') {
                city = component.long_name;
            }
            if (component.types[typeIndex] == 'neighborhood') {
                if (component.long_name.toLowerCase() == $('#tbCity').val().toLowerCase())
                    city = component.long_name;
            }
            if (component.types[typeIndex] == 'sublocality') {
                if (component.long_name.toLowerCase() == $('#tbCity').val().toLowerCase())
                    city = component.long_name;
            }
            if (component.types[typeIndex] == 'administrative_area_level_3') {
                if (component.long_name.toLowerCase() == $('#tbCity').val().toLowerCase())
                    city = component.long_name;
            }
            if (component.types[typeIndex] == 'administrative_area_level_2') {
                if (component.long_name.toLowerCase() == $('#tbCity').val().toLowerCase())
                    city = component.long_name;
            }
            if (component.types[typeIndex] == 'administrative_area_level_1') {
                state = component.long_name;
            }
            if (component.types[typeIndex] == 'postal_code') {
                zip = component.long_name;
            }
        }
    }

    var isZipCodeRequired = IsZipCodeRequired();
    var zipCodeValidated = true;

    if (isZipCodeRequired) {
        zipCodeValidated = zip != "";
    }

    if (city != "" && state != "" && zipCodeValidated) {        
        var _city = $('#tbCity').val().toLowerCase();
        var _state = $('#ddlStates').find('option:selected').attr('title').toLowerCase();
        var _stateShort = $('#ddlStates').find('option:selected').val().toLowerCase();

        city = stripAccents(city);
        _city = stripAccents(_city);
        
        for (var _addr in addressFormatList) {
            if (stripAccents(enteredCity).toLowerCase().trim() == stripAccents(addressFormatList[_addr]).toLowerCase().trim()) {
                containsCity = true;
            }
        }

        zipCodeValidated = true;
        if (isZipCodeRequired) {
            var _zip = $('#tbPostalCode').val();
            zipCodeValidated = zip.toLowerCase().replace(/\s/g, '') == _zip.toLowerCase().replace(/\s/g, '');
        }

        var stateValidated = (state.toLowerCase().indexOf(_state) >= 0 || state.toLowerCase().indexOf(_stateShort) >= 0);

        if (((city.toLowerCase() == _city) || (containsCity)) && stateValidated && zipCodeValidated) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}

function IsZipCodeRequired() {
    var zipCodeVisibility = $("input[id$=hfZipCodeVisibility]").val();

    return zipCodeVisibility.toLowerCase() == 'required';
}

function resetSearchDefaults() {
    //clear previous search info
    if (markersArray.length > 0) {
        MapController.colorIndex = 0;
        nearbySitesWithPolygons = [];
        nearbySitesWOPolygons = [];

        for (var i = 0; i < MapController.Polygons.length; i++) {
            MapController.removeFeature(MapController.Polygons[i].id);
        }
        for (i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
        }
        markersArray = [];
        MapController.Polygons = [];
    }
    else {
        nearbySitesWithPolygons = [];
        nearbySitesWOPolygons = [];
        if (typeof MapController !== "undefined") {
            MapController.colorIndex = 0;
            MapController.Polygons = [];
        }
        markersArray = [];
    }
}

function setSuggestedAddress() {
    var street_address = '';
    var streetname = $("#tbAddress1").val();
    var streetnumber = $("#tbAddress2").val();
    var enteredCity = $("#tbCity").val().split('.').join('');
    var addressFormatList = currentSearchResult[0].formatted_address.split(',');
    var city = "";

    for (var _addr in addressFormatList) {
        if (enteredCity.toLowerCase() == addressFormatList[_addr].toLowerCase().trim()) {
            city = enteredCity;
        }
    }

    for (var addComponent in currentSearchResult[0].address_components) {
        var component = currentSearchResult[0].address_components[addComponent];
        for (typeIndex in component.types) {
            if (component.types[typeIndex] == 'street_number') {
                street_address = component.long_name;
            }
            if (component.types[typeIndex] === 'route') {
                if (street_address === '' && streetnumber !== '') {
                    street_address = "[" + streetnumber + "]";
                }
                street_address = street_address === '' ? component.long_name : street_address + ' ' + component.long_name;
                $("#tbAddress1").val(street_address);
            }
            if (component.types[typeIndex] == 'locality') {
                if (street_address == '') {
                    if (streetnumber || streetname) {
                        var street = streetnumber + (streetnumber && streetname ? ' ' : '') + streetname;
                        $("#tbAddress1").val(street);
                    }
                }
                if (city == "") {
                    city = component.long_name;
                }
            }
            if (component.types[typeIndex] == 'administrative_area_level_1') {

                $('#ddlStates option[title]').filter(function () {
                    if ($(this).attr('title').toLowerCase() == component.long_name.toLowerCase() ||
                        $(this).val().toLowerCase() == component.short_name.toLowerCase()) {
                            $(this).attr('selected', true);
                            return false;
                    }
                });
            }
            if (component.types[typeIndex] == 'postal_code') {
                $("#tbPostalCode").val(component.long_name);
            }
        }
    }

    $("#tbCity").val(city);
    closeModal('client-side');
    currentSearchResult = null;
}

function reloadQuickOrder() {
    showLoader();
    window.forceUpdate();
}

//Ajax Login
function login(form, captchaResponse, UseCaptcha) {
    if (UseCaptcha === 'True' && !captchaResponse) {
        $('#divLoginError').show();
        $('.error-credential').hide();
        $('.error-captcha').show();
    }
    else {
        loggedin = true;
        var userName = form.elements["login-email"].value;
        var password = form.elements["login-password"].value;
        var rememberMe = form.elements["login-remember"].checked;
        showLoader();
        $.ajax({
            url: '/mobile/accountlogin',
            type: 'POST',
            data: { email: userName, password: password, persist: rememberMe, captchaResponse: captchaResponse },
            success: function (data) {
                hideLoader();
                if (data.loggedIn) {
                    $.event.trigger('loggedIn', { username: userName });
                    closeModals();
                    if ($('#COguestCheckout').length > 0 || $('#vp-continue').length > 0) {
                        checkoutUser(false);
                    }

                    if (window.location.pathname.toLowerCase().indexOf("quickorder") >= 0) {
                        reloadQuickOrder();
                    }
                }
                else {
                    $('#divLoginError').show();

                    if (data.isLockedOut) {
                        $('.error-lockedout').show();
                        $('.error-credential').hide();
                    }
                    else {
                        $('.error-credential').show();
                        $('.error-lockedout').hide();
                    }

                    $('.error-captcha').hide();
                    $('.captchaResponse').val(''); 
                    grecaptcha.reset();   
                }
            },
            error: function (data) {
                hideLoader();
                $('.modal-content').html(data);
                displayModal('client-side-ok');
            }
        });
    }    
}

function logout(redirect) {
    showLoader();
    loggedout = true;
    $.ajax({
        url: '/mobile/logout',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            hideLoader();
            if (data) {
                if (redirect) {
                    window.location.href = redirect;
                } else {
                    window.location.href = "splash-2.html";
                }
            }
        },
        error: function () {
            hideLoader();
            //$('.modal-content').html("Error occurred, please retry!");
            //displayModal('client-side-ok');
        }
    });
}

function createAccount(form) {
    showLoader();
    var FirstName = form.elements["account-creation-first-name"].value;
    var LastName = form.elements["account-creation-last-name"].value;
    var Email = form.elements["account-creation-email"].value;
    var SecondaryEmail = form.elements["account-creation-secondary-email"].value;
    var PhoneNumber = form.elements["account-creation-phone"].value;
    //var PhoneExtension = form.elements[""].value;
    var AltPhoneNumber = form.elements["account-creation-alt-phone"].value;
    //var AltPhoneExtension = form.elements["account-creation-alt-phone"].value;
    var BusinessName = form.elements["account-creation-business-name"].value;
    var DepartmentName = form.elements["account-creation-department-name"].value;
    var LoyaltyNumber = form.elements["account-creation-loyalty-number"].value;
    var Password = form.elements["account-creation-password"].value;
    var SecurityQuestion = form.elements["account-creation-security-question"].value;
    var SecurityAnswer = form.elements["account-creation-security-answer"].value;
    var PromotionNotificationEnabled = (form.elements["account-creation-promotion"] != undefined) ? form.elements["account-creation-promotion"].checked : false; 
    $.ajax({
        url: '/Mobile/CreateAccount',
        type: 'POST',
        data: {
            'FirstName': FirstName,
            'LastName': LastName,
            'Email': Email,
            'SecondaryEmail': SecondaryEmail,
            'PhoneNumber': PhoneNumber,
            'PhoneExtension': "",
            'AltPhoneNumber': AltPhoneNumber,
            'AltPhoneExtension': "",
            'BusinessName': BusinessName,
            'DepartmentName': DepartmentName,
            'LoyaltyNumber': LoyaltyNumber,
            'Password': Password,
            'SecurityQuestion': SecurityQuestion,
            'SecurityAnswer': SecurityAnswer,
            'PromotionNotificationEnabled': PromotionNotificationEnabled
        },
        traditional: true,
        success: function (data) {
            hideLoader();
            if (data.success) {
                $.event.trigger('loggedIn', { username: Email });
                closeModals();
            }
            else {
                $('#spErrorMsg').html(data.message);
            }
        },
        error: function (data) {
            hideLoader();
            $('.modal-content').html(data);
            displayModal('client-side-ok');
        }
    });
}

function loadExtraAddrInfo(extradata) {
    if (isAddrFreeForm()) {
        var dholder = $('<div />');
        dholder.append(extradata);
        var jsonAddr = JSON.parse(dholder.text()).ExtraData;
        var controls = $('[target=extradata]');
        $(controls).each(function () {
            var addrinfo = $(this).attr('addressinfoname');
            $(this).val(jsonAddr[addrinfo]);
        });
    }
}

function constructExtraData(form) {
    var frAddObj = {};
    var controls;

    if(form == null || form == undefined){
        controls = $.find('input[target="extradata"]');
    }
    else {
        controls = $(form).find('input[target="extradata"]');
    }
    
    frAddObj["ExtraData"] = createObjExtraData(controls);
    return JSON.stringify(frAddObj);
};

function createObjExtraData(controls) {
    var item = {};
    item["@xmlns"] = "";
    $(controls).each(function () {
        var key = $(this).attr('addressinfoname');
        var value = $(this).val();
        item[key] = value;
    });

    return item;
};

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function updateInfo(form) {
    var extradata = constructExtraData(form);
    var serializedvalue = $(form).serialize();
    serializedvalue = serializedvalue + '&extradata=' + extradata;

    if (typeof companySettings !== "undefined" && companySettings.EnableThirdPartyAuthentication === 'true'
        && ['UpdateContactInfo', 'UpdateDeliveryInfo', 'UpdatePassword'].indexOf($(form).attr('action')) > -1) {
        window.location = companySettings.EditProfileURL;
        return;
    }
    if (form.elements["cardNumberValue"]) {
        delete form.elements["cardNumberValue"];
    }
    showLoader();
    $.ajax({
        url: $(form).attr('action'),
        type: 'POST',
        data: serializedvalue,
        traditional: true,
        success: function (data) {
            if (data.success) {
                if (typeof data !== "undefined" && typeof data["invalidAuthenticationToken"] !== "undefined" && !data.invalidAuthenticationToken) {
                    loggedout = true;
                    message = ContactInfoMobileUpdateFailed;
                    $('#modal-ok-button').unbind('click').click(function () {
                        closeModals();
                        window.location.href = "splash-2.html";
                    });
                    CustomerInfoUpdateFailed(message);
                    $(form).find('.errorBackgroundColor').each(function () {
                        $(this).removeClass('errorBackgroundColor');
                    });
                    displayModal('client-side-ok');
                    return;
                }
                if (data["addressId"] != undefined) {
                    updateAddressOptions('billing', data.addressId, data.addressName, extradata);
                }

                if (data["delAddressId"] != undefined) {
                    updateAddressOptions('delivery', data.delAddressId, data.delAddressName, extradata);
                }

                if (data.paymentInfo === true) {
                    window.location.replace('splash-2.html?payments=true');
                }
                var message = ContactInfoMobileUpdatedSuccessfully;
                if (data["forceUpdateEmail"] != undefined && data.forceUpdateEmail) {
                    loggedout = true;
                    message = ContactInfoMobileEmailUpdated;
                    $('#modal-ok-button').unbind('click').click(function () {
                        closeModals();
                        window.location.href = "splash-2.html";
                    });
                }
                CustomerInfoUpdateSuccessful(message);
                $(form).find('.errorBackgroundColor').each(function () {
                    $(this).removeClass('errorBackgroundColor');
                });
                displayModal('client-side-ok');
            }
            else {
                if (data["forceUpdateEmail"] != undefined && !data.forceUpdateEmail) {
                    CustomerInfoUpdateFailed(data.errorText);
                } else if (data["errorText"] !== "undefined") {
                    $('.modal-content').html(data.errorText);
                }
                else {
                    CustomerInfoUpdateFailed(ContactInfoMobileUpdateFailed);
                }
                displayModal('client-side-ok');
            }
            hideLoader();
        },
        error: function (data) {
            hideLoader();
            CustomerInfoUpdateFailed(ContactInfoMobileUpdateFailed);
            displayModal('client-side-ok');
        }
    });
}

function updateAddressOptions(target, addressId, addressName, extradata) {
    var selected = $('#account-' + target + '-selection').find(":selected");
    var selection = $('#account-' + target + '-selection');
    var isDefault = $('#customer-edit-default-' + target).is(':checked');

    var newOpt = $('<option>', {
        value: addressId,
        text: addressName,
        "data-extradata": extradata,
        "data-address": $('#account-' + target + '-address').val(),
        "data-addresstwo": $('#account-' + target + '-suite').val(),
        "data-city": $('#account-' + target + '-city').val(),
        "data-state": $('#account-' + target + '-state').val(),
        "data-zip": $('#account-' + target + '-zip').val(),
        "data-default": isDefault
    });

    if (isDefault) {
        var prevdefaultOpt = $('#account-' + target + '-selection option[data-default=true]');
        if (prevdefaultOpt.length > 0) {
            var _addressId = prevdefaultOpt.val();
            var _addressName = prevdefaultOpt.text();
            var _extradata = JSON.stringify(prevdefaultOpt.data('extradata'));
            var _address = prevdefaultOpt.data('address');
            var _addresstwo = prevdefaultOpt.data('addresstwo');
            var _city = prevdefaultOpt.data('city');
            var _state = prevdefaultOpt.data('state');
            var _zip = prevdefaultOpt.data('zip');

            var updatedOpt = $('<option>', {
                value: _addressId,
                text: _addressName,
                "data-extradata": _extradata,
                "data-address": _address,
                "data-addresstwo": _addresstwo,
                "data-city": _city,
                "data-state": _state,
                "data-zip": _zip,
                "data-default": false
            });

            prevdefaultOpt.remove();
            selection.append(updatedOpt);
        }
    }

    if (selected.val() === addressId.toString()) {
        selected.remove();
    }

    selection.append(newOpt);

    if ($('#account-' + target + '-selection option').length > 1) {
        $('#div' + target).show();
    }

    var options = $('#account-' + target + '-selection option');

    options.sort(function (a, b) {
        if (a.text > b.text) return 1;
        else if (a.text < b.text) return -1;
        else return 0;
    });

    selection.empty().append(options);
    selection.val(addressId).change();
}

function displayModal(modalName) {
    $("html, body").animate({ scrollTop: 0 }, 0);
    $('.popupModal[data-partial="' + modalName + '"]').show();
}

function closeModal(modalName) {
    $('.popupModal[data-partial="' + modalName + '"]').hide();
    $("html, body").animate({ scrollTop: 0 }, 0);
}

function closeModals() {
    $('.popupModal').hide();
    $("html, body").animate({ scrollTop: 0 }, 0);
}

function FormatResourceString() {
    if (arguments.length == 0) {
        return "";
    }

    var resourceString = arguments[0];
    if (resourceString != null) {
        for (var i = 1; i < arguments.length; i++) {
            resourceString = resourceString.replace("{" + (i - 1) + "}", arguments[i]);
        }
    }
    else {
        return "";
    }
    return resourceString;
}

function CurrencyFormattedSuppressZero(amount) {
    var result = CurrencyFormatted(amount);
    return (result == CurrencyFormatted(0.00)) ? "" : result;
}

function CurrencyFormatted(amount) {

    amount = ConvertAmountToDecimalPeriodFormat(amount);

    var i = parseFloat(amount);
    if (isNaN(i)) { i = 0.00; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    if (i === 0) minus = '';             // to prevent -0.00
    i = i / 100;
    s = new String(i);
    if (s.indexOf('.') < 0) { s += '.00'; }
    if (s.indexOf('.') == (s.length - 2)) { s += '0'; }
    s = minus + s;

    s = ConvertToCurrentCultureCurrencyFormat(s);

    return ' ' + FormatCurrencyPosition(s);
}

function ConvertAmountToDecimalPeriodFormat(amount) {
    //Test if the amount format use period decimal separator
    var testUSNumberFormat = Number(amount).toLocaleString('en-US');
    //If isNaN means that the amount currency format use comma decimal separator
    if (isNaN(testUSNumberFormat)) {
        //Replace comma with periodo as decimal separtor
        amount = amount.replace(/,/g, '.');
    }

    return amount;
}

function ConvertToCurrentCultureCurrencyFormat(amount) {
    if (typeof window.GetCultureCode == 'function') {
        var cultureCode = window.GetCultureCode();
        
        //Test currency to find out if the decimal separator is a comma
        var testCommaInsteadPeriodNumber = new String(parseFloat("1.25").toLocaleString(cultureCode));

        //Default decimal separator
        var decimalSeparator = '.';

        if (testCommaInsteadPeriodNumber.substring(1, 2) === ",") {
            decimalSeparator = window.GetCultureCurrencyDecimalSeparator();
            //Format amount to the current culture with comma decimal separator
            amount = amount.toString().replace(".", decimalSeparator);
        }

        //Add zeros to have two decimal after parsing
        if (amount.indexOf(decimalSeparator) < 0) { amount += decimalSeparator + '00'; }
        if (amount.indexOf(decimalSeparator) === (amount.length - 2)) { amount += '0'; }
    }

    return amount;
}

function FormatCurrencyPosition(amount)
{
    var isCurrSymbolLeft = /true/i.test(IsCurrencyPositionLeft());
    var amt = (isCurrSymbolLeft) ? CurrencySymbol + amount.toString() : amount.toString() + CurrencySymbol;
    return amt;
}

function checkArrows() {
    var all_anchor_seeds = $('a[show-arrow="1"]');
    $(all_anchor_seeds).each(function () {
        $(this).append("<img class='action-button-arrow' src='" + staticContentUrl + "Images/arrow.png' />");
    });
    var all_back_seeds = $('a[show-back-arrow="1"]');
    $(all_back_seeds).each(function () {
        $(this).prepend("<img class='action-button-arrow left' src='" + staticContentUrl + "Images/arrowBack.png' />");
    });
    var all_button_seeds = $('button[show-arrow="1"]');
    $(all_button_seeds).each(function () {
        $(this).append("<img class='action-button-arrow' src='" + staticContentUrl + "Images/arrow.png' />");
    });
}

function initMapToggle() {
    $('.sc-cart-button').click(function () {
        if ($('#site-list-container').is(':visible')) {
            $('#site-list-container').hide();
        } else {
            $('#site-list-container').show();
        }
        available_height_locations();
        $('#right-column').toggle(0, function () {
            available_height_locations();
            map.fitBounds(bounds);
        });
    });
}

function clearErrors() {
    $('.error').each(function () {
        $(this).removeClass('error');
    });
    $('.errorBackgroundColor').each(function () {
        $(this).removeClass('errorBackgroundColor');
    });

}
//function updateFromAutoComplete(addressInput) {
//    if (addressLine1 != "") {
//        $(addressInput).val(addressLine1);
//        addressLine1 = "";
//        //$('#tbPostalCode').focus();
//    }
//}
function showLoader() {
    $('.loaderPopup').show();
}

function hideLoader() {
    $('.loaderPopup').hide();
}

function showContactForm() {
    $(document).scrollTop(0);
    $('.contactModal').show();
}

function sendMessage() {
    showLoader();
    var email = $('#txtEmailAddress').val()
    var message = $('#txtMessage').val()
    email = unescape(email);
    email = escape(email);
    message = unescape(message);
    message = escape(message);
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/mobile/SendMessage',
        data: {
            "emailAddress": email,
            "message": message
        },
        success: function (data) {
            hideLoader();
            $('#spResponseMessage').html(data.message);
        }
    });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function checkoutLoggedInUser() {
    window.location = 'Splash.html';
}

function checkoutUser(isGuest) {
    showLoader();

    var extradata = '';
    if (isAddrFreeForm()) {
        extradata = constructExtraData(null);
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/mobile/SaveCustomerInformation',
        data: {
            "CustomerFirstName": $('#customerFirstName').val(),
            "CustomerLastName": $('#customerLastName').val(),
            "CustomerEmailAddress": $('#customerEmailAddress').val(),
            "CustomerPhoneNumber": $('#phoneNumber').val(),
            "CustomerIsGuest": isGuest,
            "CustomerBillingAddress1": $("#tbAddress1").val(),
            "CustomerBillingAddress2": $("#tbAddress2").val(),
            "CustomerBillingCity": $("#tbCity").val(),
            "CustomerBillingState": $("#ddlStates").val(),
            "CustomerBillingPostalCode": $("#tbPostalCode").val(),
            "CustomerLoyaltyNumber": $('#loyaltynumber').val(),
            "BusinessName": $("#businessname").val(),
            "DepartmentName": $("#departmentname").val(),
            "LoyaltyNumber": $("#loyaltyNumber").val(),
            "extradata": extradata
        },
        success: function (data) {
            //hideLoader();
            if (data) {
                window.location = 'Splash-3.html';
            }
            else {
                hideLoader();
                //$('.modal-content').html("Error occurred, please retry!");
                //getResourceText("WebOrder.OrderEntry.MobileErrorRetry", "errorHappened");
                errorHappened(OrderEntryMobileErrorRetry);
                displayModal('client-side-ok');
            }
        }
    });
}

function validateCCNum(str) {
    t = "";
    for (i = 0; i < str.length; i++) {
        c = parseInt(str.charAt(i), 10);
        if (i % 2 != 0)
            c *= 2;
        t = t + c;
    }

    // Finally, add up all the single digits in this string.

    n = 0;
    for (i = 0; i < t.length; i++) {
        c = parseInt(t.charAt(i), 10);
        n = n + c;
    }

    // If the resulting sum is an even multiple of ten (but not zero), the
    // card number is good.

    if (n != 0 && n % 10 == 0)
        return true;
    else
        return false;
}

function show_sc_combo_mods(divID) {
    var divid = "#" + divID;
    var htmlToShow = "";
    if ($(divid + " #sc-combo-item-mods").html().trim().length > 0 || $(divid + " sc-combo-item-spl-instructions").text().length > 0 || $(divid + " .sc-combo-item-recipient-name").text().length > 0) {
        if ($(divid + " #sc-combo-item-mods").html().trim().length > 0)
        {
            if ($(divid + " #sc-combo-item-mods div .sc-item-mod-price").length == 0)
            {
                $(divid + " #sc-combo-item-mods div .sc-item-mod-price").remove();
                $(divid + " #sc-combo-item-mods div .sc-item-mod-qty").remove();
            }
            else
            {
                $(divid + " #sc-combo-item-mods div .sc-item-mod-price .mod_price").each(
                     function () {
                         var amount = $(this).text();
                         var parsedAmount = parseFloat(amount);
                         if (parsedAmount == 0) {
                             $(this).parent().remove();
                         }
                     }
                 );
            }
            $(divid + " #sc-combo-item-mods div").css("padding-left", "2em");
            htmlToShow += $(divid + " #sc-combo-item-mods").html().trim();
        }
        if ($(divid + " .sc-combo-item-spl-instructions").text().length > 0) {
            htmlToShow += $(divid + ' .sc-combo-item-spl-instructions-div').html();
        }
        if ($(divid + " .sc-combo-item-recipient-name").text().length > 0) {
            htmlToShow += $(divid + ' .sc-combo-item-recipient-name-div').html();
        }
        if (htmlToShow.length == 0) {
            "(No Modifiers)";
        }
        $('.modal-content').html(htmlToShow);
        displayModal('client-side-cart-ok');
    }
}

function show_sc_mods(divID) {
    var divid = "#" + divID;
    var htmlToShow = "";
    if ($(divid + " #sc-item-mods").html().trim().length > 0 || $(divid + " .sc-item-spl-instructions").text().length > 0 || $(divid + " .sc-item-recipient-name").text().length > 0) {
        if ($(divid + " #sc-item-mods").html().trim().length > 0) {
            htmlToShow += $(divid + " #sc-item-mods").html();
        }
        if ($(divid + " .sc-item-spl-instructions").text().length > 0) {
            htmlToShow += $(divid + ' .sc-item-spl-instructions-div').html();
        }
        if ($(divid + " .sc-item-recipient-name").text().length > 0) {
            htmlToShow += $(divid + ' .sc-item-recipient-name-div').html();
        }
        if (htmlToShow.length == 0) {
            "(No Modifiers)";
        }
        $('.modal-content').html(htmlToShow);
        $('.mod_price').each(function () {
            var amount = $(this).text();
            var testUSNumberFormat = Number(amount).toLocaleString('en-US');

            if (isNaN(testUSNumberFormat)) {
                amount = amount.replace(/,/g, '.');
            }

            var parsedAmount = parseFloat(amount);
            if (parsedAmount > 0.0) {
                amount = CurrencyFormatted(amount).trim();
                $(this).html(amount);
            }
            else {
                $(this).parent().remove();
            }

        });

        $(".sc-item-mod-price").each(function () {
            var price = $(this).text();
            price = price.replace('$', CurrencySymbol);
            $(this).html(price);
        });

        displayModal('client-side-cart-ok');
    }
}

function verifyLoginRequired() {
    if (loginRequired === "browse" && isAuthenticated === 'false') {
        //var message = getResourceText("WebOrder.Checkout.MobileLoginSignupButton");
        var message = CheckoutMobileLoginSignupButton;
        $("#tabs").hide();
        $("#tab-contents").hide();
        $("#login-link").trigger('click');
        $("#cover-container").after('<div id="login-required-div" style="padding:10%"><a class="green-button btn-large" >'+message+'</a></div>');
        $("#login-required-div a").click(function () { $("#login-link").trigger('click'); });
        $("#left-column").bind("loggedIn", function (e, data) {
            $("#tabs").show();
            $("#tab-contents").show();
            $("#login-required-div").hide();
        });
    }
}

function showCancelDialog() {
    //getResourceText("WebOrder.OrderEntry.MobileLoseOrder","showLoseOrderWarning");
    $('.modal-content').html(OrderEntryMobileLoseOrder);
    $('#modal-no-button').on("click", function () {
        closeModal('client-side-yes_no');
    });
    $('#modal-yes-button').on("click", function () {
        if (getCookie("paypalLocId") != null && getCookie("paypalLocId").length > 0) {
            eraseAllCookies();
            PayPalApp.call({ func: "DismissWebView" });
        }
        else {
            window.location.href = "splash-2.html";
        }
    });
    displayModal('client-side-yes_no');
}

function resetHomeAnchorRef() {
    $('#home-link').attr('href', '/mobile/splash');
    $('#home-link').attr('onclick', '').unbind('click');
}

function maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
        object.value = object.value.slice(0, object.maxLength)
}

function checkForSiteClosed() {
    $("#site-list > .site").each(
         function () {
             if (($(this).data("siteclosed").toLowerCase() === 'true')) {
                 $(this).attr("onclick", "");
                 $(this).find(".site-button-arrow").hide();
             }
         }
     );
}

function ValidateMod10(accountNumber) {
    if (accountNumber == "****************") {
        return true;
    }
    var total = 0;
    var twice;
    var i;

    for (i = accountNumber.length - 2; i >= 0; i -= 2) {
        twice = parseInt(accountNumber.charAt(i)) * 2;
        if (twice > 9) {
            total += 1 + (twice % 10);
        }
        else {
            total += twice;
        }
    }
    for (i = accountNumber.length - 1; i >= 0; i -= 2) {
        total += parseInt(accountNumber.charAt(i));
    }

    return (total % 10) == 0;
}

function cardNumberMask(object) {
    if (object.value.length != 0) {
        if (object.value == "****************") {
            return true;
        }
        else if ((object.value.length < 13) ||             
            (ValidateMod10(object.value) == false)) {
            //getResourceText("WebOrder.VerifyPayment.MobileValidCardNumber", "enterValidCardNumber");
            enterValidCardNumber(VerifyPaymentMobileValidCardNumber);
            displayModal('client-side-ok');
            $("input[name=cardNumber]").val("");
            return false;
        }
        else {
            $("input[name=cardNumber]").val($("input[name=cardNumberValue]").val());
            $("input[name=cardNumberValue]").val("****************");
            return true;
        }
    }
}

function clearCardNumberMask(object, e) {
    if (object.value.indexOf("*") != -1) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            $("input[name=cardNumber]").val("");
            $("input[name=cardNumberValue]").val("");
        }
        return true;
    }
}

function websalesgroupSetup() {
    //modifiers for sales item in each wsg should be hidden by default
    $(".websalesgroup-item-modifiers").hide();

    //no default sales item selected
    $(".websalesgroup-item input").prop("checked", false);

    //if an item is selected, hide other selection mods and show current
    $(".wsg-item-select-input").click(wsgItemSelectEvent);

    //select default sales item and expand its modifiers (didn't want to touch above code, incase it would break anything)
    $('.wsg-item-select-input').each(function () {
        if ($(this).attr("data-isDefault") == "true") {
            $(this).click();
        }
    });
}

function wsgItemSelectEvent() {
    var parentNodeId = $(this).data("parentnodeid");
    var selectedItemId = $(this).data("itemid");

    hideAllGroupMods(parentNodeId);
    showItemMods(parentNodeId, selectedItemId);
}

function hideAllGroupMods(parentNodeId) {
    showItemMods(parentNodeId, -1);
}

function showItemMods(parentNodeId, selectedItemId) {
    $(".websalesgroup-item-modifiers[data-parentnodeid="+parentNodeId+"]").hide();
    $(".websalesgroup-item-modifiers[data-parentnodeid=" + parentNodeId + "][data-itemid=" + selectedItemId + "]").show();

    
    if (selectedItemId > -1) {
        var container = $('body'),
        scrollTo = $("input[data-itemid=" + selectedItemId + "]");

        container.scrollTop(
            scrollTo.offset().top
        );
    }
}

function populateWebSalesGroupLineitem(WebSalesGroupItemId, PromoId, MenuItemId, MenuItemName, itemId, Qty, SpecialInstructions, RecipientName, $inputs, comboType, promoPrice) {
    var modifierIds = $.makeArray($inputs.map(function () {
        return $(this).data("modifierid");
    }));
    var modifierActions = $.makeArray($inputs.map(function () {
        return $(this).data("modifieraction");
    }));
    var defaultModifierActions = $.makeArray($inputs.map(function () {
        return $(this).data("defaultmodifieraction");
    }));
    var modifierGroupIds = $.makeArray($inputs.map(function () {
        return $(this).data("modifiergroupid");
    }));
    var modifierQtys = $.makeArray($inputs.map(function () {
        if (Boolean($(this).attr("hasOptionQty")))
            return parseInt($($("input[id=modifier-peroptionvalue][data-nodeid=" + $(this).data("nodeid") + "]")[0]).val());
        else if (Boolean($(this).attr("hasValidQty")))
            return $("#modifier-validqty" + $(this).data("nodeid")).val();
        else
            return $(this).val();
    }));
    var ModSection1 = $.makeArray($inputs.map(function () {
        return $(this).data("modsection1");
    }));
    var ModSection2 = $.makeArray($inputs.map(function () {
        return $(this).data("modsection2");
    }));
    var ModParentIndex = $.makeArray($inputs.map(function () {
        return $(this).data("modparentindex");
    }));
    updateModParentIndex($inputs, ModParentIndex, modifierGroupIds);

    var OrderWebSalesGroupLineItem = {};
    OrderWebSalesGroupLineItem.GroupLineId = 0;//this will be randomly generated upon insert
    OrderWebSalesGroupLineItem.MenuItemName = MenuItemName;
    OrderWebSalesGroupLineItem.WebSalesGroupId = WebSalesGroupItemId;
    OrderWebSalesGroupLineItem.LineItemNumber = -1;
    OrderWebSalesGroupLineItem.MenuItemId = MenuItemId; 
    OrderWebSalesGroupLineItem.ItemId = itemId;
    OrderWebSalesGroupLineItem.Quantity = Qty;
    OrderWebSalesGroupLineItem.SpecialInstruction = SpecialInstructions;
    OrderWebSalesGroupLineItem.RecipientName = RecipientName;
    OrderWebSalesGroupLineItem.ModGrpIds = modifierGroupIds;
    OrderWebSalesGroupLineItem.ModIds = modifierIds;
    OrderWebSalesGroupLineItem.ModQuantity = modifierQtys;
    OrderWebSalesGroupLineItem.IModActions = modifierActions;
    OrderWebSalesGroupLineItem.ModParentIndex = ModParentIndex;
    OrderWebSalesGroupLineItem.ModSection1 = ModSection1;
    OrderWebSalesGroupLineItem.ModSection2 = ModSection2;
    OrderWebSalesGroupLineItem.RolledUpModQty = false;
    OrderWebSalesGroupLineItem.IDefaultModActions = defaultModifierActions;
    OrderWebSalesGroupLineItem.PromoId = PromoId;
    OrderWebSalesGroupLineItem.PromoType = comboType;
    OrderWebSalesGroupLineItem.Price = promoPrice;

    return OrderWebSalesGroupLineItem;
}

function makeAddOrderLineParams(MenuItemId, itemId, Qty, SpecialInstructions, RecipientName, $inputs) {

    var modifierIds = $.makeArray($inputs.map(function () {
        return $(this).data("modifierid");
    }));
    var modifierActions = $.makeArray($inputs.map(function () {
        return $(this).attr("data-modifieraction");
    }));
    var defaultModifierActions = $.makeArray($inputs.map(function () {
        return $(this).data("defaultmodifieraction");
    }));
    var modifierGroupIds = $.makeArray($inputs.map(function () {
        return $(this).data("modifiergroupid");
    }));
    var modifierQtys = $.makeArray($inputs.map(function () {
        if (Boolean($(this).attr("hasOptionQty"))) {
            var $modifierPerOptionNode = $($("input[id=modifier-peroptionvalue][data-nodeid=" + $(this).data("nodeid") + "]")[0]);
            //has default modifier been modified?
            if ($modifierPerOptionNode.is("[oldValue]") && $(this).attr('data-modifieraction') == modifierAction.No) {
                return parseInt($(this).attr('value'));
            }
            return parseInt($modifierPerOptionNode.val());
        }
        else if (Boolean($(this).attr("hasValidQty")))
            return $("#modifier-validqty" + $(this).data("nodeid")).val();
        else
            return $(this).val();
    }));
    var ModSection1 = $.makeArray($inputs.map(function () {
        return $(this).data("modsection1");
    }));
    var ModSection2 = $.makeArray($inputs.map(function () {
        return $(this).data("modsection2");
    }));
    var ModParentIndex = $.makeArray($inputs.map(function () {
        return $(this).data("modparentindex");
    }));

    updateModParentIndex($inputs, ModParentIndex, modifierGroupIds);

    return {
        LineItemNumber: -1,
        MenuItemId: MenuItemId,
        ItemId: itemId,
        Qty: Qty,
        SpecialInstruction: SpecialInstructions,
        RecipientName: RecipientName,
        ModGrpIds: modifierGroupIds,
        ModIds: modifierIds,
        ModQuantity: modifierQtys,
        iModActions: modifierActions,
        iDefaultModActions: defaultModifierActions,
        ModParentIndex: ModParentIndex,
        ModSection1: ModSection1,
        ModSection2: ModSection2,
        RolledUpModQty: false
    }
}

function updateModParentIndex(inputs, ModParentIndex, modifierGroupIds) {
    inputs.each(function (index) {
        var input = $(this);
        var lastParentInput = null;
        if (input.parents('.modifier-group').length > 1) { //first we need to find the parent of the modifier if its nested
            var datainput = input.parent().find('input[data-modparentindex="-1"]');
            var inpModGrpid = datainput.data("modifiergroupid");   
            input.parents('.modifier-group').each(function () {
                var parDataInput = $(this).find('input[data-modparentindex="-1"]');
                if (inpModGrpid != parDataInput.data('modifiergroupid')) {
                    lastParentInput = parDataInput; //could be a long nested loop, we just need to get the last parent
                    return false;
                }
            });
            if (lastParentInput != null) { //if a parent is found, then its a nested mod,we need to set its parent index
                var modgrpId = input.data("modifiergroupid");
                loop1://sweet like perl, didnt know u could do this with javascript
                for (var i = index; i >= 0; i--) { //we are looking to set the parentmod index of the selected nested modifier
                    if (modifierGroupIds[i] == modgrpId) {
                        var pModGrpId = lastParentInput.data("modifiergroupid");
                        loop2:
                        for (var j = index; j >= 0; j--) {
                            if (modifierGroupIds[j] == pModGrpId) {
                                ModParentIndex[index] = j;
                                break loop2;
                            }
                        }
                    }
                }
            }
        }
    });
}

function addToOrderActionSuccess(data, $inputs) {

    hideLoader();

    //scroll to top
    $("html, body").animate({ scrollTop: 0 }, 0);
    if (data.success === true) {
        $('#receipt-table > tbody:last').append('<tr class="lineItem">\
                                        <td class="item-name name">' + $('.modifier-container .modifier-header').html() + '</td>\
                                        <td class="receipt-qty-column">\
                                        </td>\
                                        <td class="receipt-price-column">\
                                                <span class="receipt-price">' + $('.modifier-tab.true .modifer-tab-price').html() + ' </span>\
                                        </td>\
                                    </tr>');

        hideItemStaticFooter();

        
        var orderObject = { Single: data.singleItems, Combo: data.comboItems };
        
        var modifierDisplayNames = data.modifierDisplayNames;//array of modifier names

        $('#sc-items-container').html(Mustache.render(semiCartItemTemplate,
            orderObject, mustachePartialsSC
        ));
        
        $("#sc-item-mods").parent().parent().find(".sc-item-div.site").each(function () {
            $(this).find("#sc-item-mods").each(function () {
                $(this).find("div[data-modaction='2']").each(function () {//ModifierAction.No
                    $(this).find(".sc-item-mod-qty").remove();
                    $(this).find(".sc-item-mod-price").remove();
                    var name = $(this).find(".sc-item-mod-name");
                    name.prepend(modifierDisplayNames[2] + " ");//need to get string for ModifierAction.No
                    if ($(this).attr("data-isOnSection1") == "true")
                        $(this).append("<span class=\"sc-item-mod-whichside\"> " + LeftHalfString + "</span>");
                    if ($(this).attr("data-isOnSection2") == "true")
                        $(this).append("<span class=\"sc-item-mod-whichside\"> " + RightHalfString + "</span>");
                });
                $(this).find("div:not([data-modaction='2'])").each(function () {
                    var name = $(this).find(".sc-item-mod-name");
                    if ($(this).attr("data-modAction") == 4 || $(this).attr("data-modAction") == 16) {// get string for ModifierAction Enum.Extra and Enum.Light
                        name.prepend(modifierDisplayNames[(Math.log($(this).attr("data-modAction")) / Math.LN2) + 1] + " ");
                    }
                    if ($(this).attr("data-isOnSection1") == "true")
                        $(this).append("<span class=\"sc-item-mod-whichside\"> " + LeftHalfString + "</span>");
                    if ($(this).attr("data-isOnSection2") == "true")
                        $(this).append("<span class=\"sc-item-mod-whichside\"> " + RightHalfString + "</span>");
                });
                $(this).children().each(function () {//remove pizza modifier prices
                    if ($(this).attr("data-freeQuantity") >= $(this).find(".sc-item-mod-qty").text().replace('(', '').replace(')', '')) //which is pizza
                        $(this).find('.mod_price').text(0);
                });
            });
        });
        

        $(".sc-item-div").each(function () {
            if ($(this).data("itemorderingmode") == 4) {
                $qt = $(this).find(".item_qty");
                $qt.text($qt.data("itemqty"));
            }
        });

        $('.sc-item-price').each(function () {
            var div = $(this).find('span span').html();
            $(this).find('span span').remove();
            $(this).append(div);
            var price = $(this).find('span').text();
            price = CurrencyFormatted(price);
            $(this).find('span').html(price);

        });

        $('.sc-item-discount').each(function () {
            var $priceDomElement = $(this).find('.sc-item-discount-value');
            var price = $priceDomElement.text();
            var priceInFloat = parseFloat(price);
            if (priceInFloat <= 0) {
                $(this).remove();
            }
            else {
                priceInFloat = CurrencyFormatted(-priceInFloat);
                $priceDomElement.html(priceInFloat);
            }
        });

        $('#sc-total-amount').html(CurrencyFormatted(data.recomputedSubtotal));
        if (data.comboItems != null && data.comboItems.length > 0) {
            $('#sc-combo-final-price').html(MobileComboPriceAtCheckOut);//getResourceText("WebOrder.Order.MobilePriceAtCheckoutLabel", Html)
        } else {
            $('#sc-combo-final-price').html('');
        }

        if (data.deliveryFeeAmount > 0) 
        {
            if ($("#sc-delivery-fee").length === 1)
            {
                $("#sc-delivery-fee").html("Delivery Fee: " + CurrencyFormatted(data.deliveryFeeAmount));
            }
            else 
            {
                $("#sc-total").prepend("<span id='sc-delivery-fee'>Delivery Fee: " + CurrencyFormatted(data.deliveryFeeAmount) + "</span><br/>");
            }
        }

        $('.sc-item-name').each(function () {
            $(this).find('a').html($('<div/>').html($(this).find('a').html()).text());
        });
        $(".mod_price").each(function () {
            var price = parseFloat($(this).text());
            $(this).text(price.toFixed(2));
        });
        updateBubble();


        if (ajaxCache[activeSubMenu]) {
            $("#middle-third-column").hide();
            toOrderEntry();
        } else {
            window.location.href = "Splash.html";
        }
    } else {
        $('.modal-content').html(data.err);
        displayModal('client-side-ok');
    }
}

function addToOrderActionComboSuccess(data, $inputs) {

    hideLoader();

    //scroll to top
    $("html, body").animate({ scrollTop: 0 }, 0);
    if (data.success === true) {
        $('#receipt-table > tbody:last').append('<tr class="lineItem">\
                                        <td class="item-name name">' + $('.modifier-container .modifier-header').html() + '</td>\
                                        <td class="receipt-qty-column">\
                                        </td>\
                                        <td class="receipt-price-column">\
                                                <span class="receipt-price">' + $('.modifier-tab.true .modifer-tab-price').html() + ' </span>\
                                        </td>\
                                    </tr>');

        hideItemStaticFooter();

        var orderObject = { Single: data.singleItems, Combo: data.comboItems };

        $('#sc-items-container').html(Mustache.render(semiCartItemTemplate,
            orderObject, mustachePartialsSC
        ));
        
        $("#sc-combo-item-mods").each(function () {
            $(this).find("div[data-modaction='2']").each(function () {
                $(this).find(".sc-item-mod-qty").remove();
                $(this).find(".sc-item-mod-price").remove();
                $(this).find(".sc-item-mod-name").prepend("No ");
            });
        });

        $(".sc-item-div").each(function () {
            if ($(this).data("itemorderingmode") == 4) {
                $qt = $(this).find(".item_qty");
                $qt.text($qt.data("itemqty"));
            }
        });

        $('.sc-item-price').each(function () {
            var div = $(this).find('span span').html();
            $(this).find('span span').remove();
            $(this).append(div);
            var price = $(this).find('span').text();
            price = CurrencyFormatted(price);
            $(this).find('span').html(price);
        });

        $('#sc-total-amount').html(CurrencyFormatted(data.recomputedSubtotal));

        if (data.comboItems != null && data.comboItems.length > 0) 
        {
            $('#sc-combo-final-price').html(MobileComboPriceAtCheckOut);
        }
        else
        {
            $('#sc-combo-final-price').html('');
        }

        if (data.deliveryFeeAmount > 0) 
        {
            if ($("#sc-delivery-fee").length === 1)
            {
                $("#sc-delivery-fee").html("Delivery Fee: " + CurrencyFormatted(data.deliveryFeeAmount));
            }
            else 
            {
                $("#sc-total").prepend("<span id='sc-delivery-fee'>Delivery Fee: " + CurrencyFormatted(data.deliveryFeeAmount) + "</span><br/>");
            }
        }

        $('.sc-item-name').each(function () {
            $(this).find('a').html($('<div/>').html($(this).find('a').html()).text());
        });
        $(".mod_price").each(function () {
            var price = parseFloat($(this).text());
            $(this).text(price.toFixed(2));
        });
        updateBubble();


        if (ajaxCache[activeSubMenu]) {
            $("#middle-third-column").hide();
            toOrderEntry();
        } else {
            window.location.href = "Splash.html";
        }
    } else {
        $('.modal-content').html(data.err);
        displayModal('client-side-ok');
    }
}

function removeRewardOffersForMobile() {
    if ($("#sc-pes-reward-offer").get().length > 0) {
        $("#sc-pes-reward-offer").remove();
        if ($('#sc-items-container').get().length > 0 && $('#sc-items-container').get(0).childElementCount <= 0) {
            $("#semi-cart-container").hide();
        }
    }
}

function AppendRewardOfferForMobile(promotion) {
    removeRewardOffersForMobile();
    var offer = promotion.Item3 || 'Offer';
    if (promotion.Item1 !== '' && promotion.Item1 !== "null" && promotion.Item1 !== null) {
        if ($("#sc-applied-pes-offer").get().length > 0 && $("#semi-cart-container").get().length > 0) {
            html = (
                '<div id="sc-pes-reward-offer" class="sc-pes-reward-offer">' +
                    offer + ': ' + promotion.Item2 +
                '</div>'
            );
            $("#sc-applied-pes-offer").append(html);
            $("#semi-cart-container").show();
        }
    }
}

//Mobile Web - Static Method to Validate Elements
var globalfrm = {
    validate: function (targetelementid, rules, submitHandler) {
        var target = $('#' + targetelementid);

        if (target === null) return false;

        $(target).validate({
            onfocusout: false,
            onkeyup: false,
            onclick: false,
            focusInvalid: false,
            rules: rules,
            errorPlacement: function (error, element) {
                $(error).insertBefore(element);
                $(element).removeClass('error').addClass('errorBackgroundColor');
            },
            submitHandler: submitHandler,
            success: function (label, element) {
                $(element).removeClass('errorBackgroundColor');
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('errorBackgroundColor');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('errorBackgroundColor');
            },
        });
    }
};

var globalRedirect = {
    delivery: function(menuType, bothMenuType, allowCatering, address1, address2, city, state, postal, extradata) {
        var data = {
            "MenuType": menuType,
            "BothMenu": (bothMenuType === "true"),
            "AllowCatering": allowCatering,
            "Address1": address1,
            "Address2": address2,
            "City": city,
            "State": state,
            "Postal": postal,
            "ExtraData": extradata
        };

        $.form('/Mobile/Delivery', data).submit();
    }
}

var NcrSecurePayment = function(origin, pathname) {
    var me = this;
    me._origin = origin;
    me._pathname = pathname;

    me.postData = function(success, error) {
        var requestUrl = me._origin + me._pathname;
        showLoader();
        $.ajax({
            type: "POST",
            contenttype: 'json',
            url: '/mobile/StartTokenSession',
            data: { "requestUrl": requestUrl },
            success: success,
            error: error
        });
    }
}