function ItemsAvailabilityValidation() {
}

ItemsAvailabilityValidation.ItemsEvents = [ //used for deals and items
    { ItemID: -37000, type: "enable", from: "00:00", to: "23:59", days: "0", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Sunday." },
	{ ItemID: -43000, type: "enable", from: "12:00", to: "16:00", days: "0,1,2,3,4", orderModes: "delivery,takeaway", message: "Daily 12:00 PM to 04:00 PM except Friday and Saturday." },
	{ ItemID: -47000, type: "enable", from: "00:00", to: "23:59", days: "0", orderModes: "delivery,takeaway", message: "Sorry, this item is not available." },
	/*{ ItemID: 7885, type: "enable", from: "00:00", to: "23:59", days: "0", orderModes: "delivery,takeaway", message: "Sorry, this item is not available." },*/
		{ ItemID: -54000, type: "enable", from: "00:00", to: "23:59", days: "0,1,2,3,4,5,6", orderModes: "takeaway", message: "This item is available for takeaway only" },
		{ ItemID: -59000, type: "enable", from: "00:00", to: "23:59", days: "0,1,2,3,4,5,6", orderModes: "takeaway", message: "This item is available for takeaway only" },
		{ ItemID: -63000, type: "enable", from: "00:00", to: "23:59", days: "0,1,2,3,4,5,6", orderModes: "takeaway", message: "This item is available for takeaway only" },
    /*{ ItemID: -7338000, type: "enable", from: "00:00", to: "23:59", days: "0", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Sunday." },
	{ ItemID: -7338001, type: "enable", from: "00:00", to: "23:59", days: "0", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Sunday." },
	{ ItemID: -7338003, type: "enable", from: "00:00", to: "23:59", days: "0", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Sunday." },
	{ ItemID: -7338002, type: "enable", from: "00:00", to: "23:59", days: "0", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Sunday." },
	{ ItemID: -7338004, type: "enable", from: "00:00", to: "23:59", days: "0", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Sunday." },
	{ ItemID: -7338005, type: "enable", from: "00:00", to: "23:59", days: "0", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Sunday." },
	{ ItemID: -7338006, type: "enable", from: "00:00", to: "23:59", days: "0", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Sunday." },
	{ ItemID: -7339000, type: "enable", from: "00:00", to: "23:59", days: "1", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Monday." },
	{ ItemID: -7339001, type: "enable", from: "00:00", to: "23:59", days: "1", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Monday." },
	{ ItemID: -7339002, type: "enable", from: "00:00", to: "23:59", days: "1", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Monday." },
	{ ItemID: -7339003, type: "enable", from: "00:00", to: "23:59", days: "1", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Monday." },
	{ ItemID: -7339004, type: "enable", from: "00:00", to: "23:59", days: "1", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Monday." },
	{ ItemID: -7339005, type: "enable", from: "00:00", to: "23:59", days: "1", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Monday." },
	{ ItemID: -7339006, type: "enable", from: "00:00", to: "23:59", days: "1", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Monday." },
	{ ItemID: -7340000, type: "enable", from: "00:00", to: "23:59", days: "2", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Tuesday." },
	{ ItemID: -7340001, type: "enable", from: "00:00", to: "23:59", days: "2", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Tuesday." },
	{ ItemID: -7340002, type: "enable", from: "00:00", to: "23:59", days: "2", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Tuesday." },
	{ ItemID: -7340003, type: "enable", from: "00:00", to: "23:59", days: "2", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Tuesday." },
	{ ItemID: -7340004, type: "enable", from: "00:00", to: "23:59", days: "2", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Tuesday." },
	{ ItemID: -7340005, type: "enable", from: "00:00", to: "23:59", days: "2", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Tuesday." },
	{ ItemID: -7340006, type: "enable", from: "00:00", to: "23:59", days: "2", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Tuesday." },
	{ ItemID: -7341000, type: "enable", from: "00:00", to: "23:59", days: "3", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Wednesday." },
	{ ItemID: -7341001, type: "enable", from: "00:00", to: "23:59", days: "3", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Wednesday." },
	{ ItemID: -7341002, type: "enable", from: "00:00", to: "23:59", days: "3", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Wednesday." },
	{ ItemID: -7341003, type: "enable", from: "00:00", to: "23:59", days: "3", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Wednesday." },
	{ ItemID: -7341004, type: "enable", from: "00:00", to: "23:59", days: "3", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Wednesday." },
	{ ItemID: -7341005, type: "enable", from: "00:00", to: "23:59", days: "3", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Wednesday." },
	{ ItemID: -7341006, type: "enable", from: "00:00", to: "23:59", days: "3", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Wednesday." },
	{ ItemID: -7342000, type: "enable", from: "00:00", to: "23:59", days: "4", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Thursday." },
	{ ItemID: -7342001, type: "enable", from: "00:00", to: "23:59", days: "4", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Thursday." },
	{ ItemID: -7342002, type: "enable", from: "00:00", to: "23:59", days: "4", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Thursday." },
	{ ItemID: -7342003, type: "enable", from: "00:00", to: "23:59", days: "4", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Thursday." },
	{ ItemID: -7342004, type: "enable", from: "00:00", to: "23:59", days: "4", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Thursday." },
	{ ItemID: -7342005, type: "enable", from: "00:00", to: "23:59", days: "4", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Thursday." },
	{ ItemID: -7342006, type: "enable", from: "00:00", to: "23:59", days: "4", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Thursday." },
	{ ItemID: -7343000, type: "enable", from: "00:00", to: "23:59", days: "5", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Friday." },
	{ ItemID: -7343001, type: "enable", from: "00:00", to: "23:59", days: "5", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Friday." },
	{ ItemID: -7343002, type: "enable", from: "00:00", to: "23:59", days: "5", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Friday." },
	{ ItemID: -7343003, type: "enable", from: "00:00", to: "23:59", days: "5", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Friday." },
	{ ItemID: -7343004, type: "enable", from: "00:00", to: "23:59", days: "5", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Friday." },
	{ ItemID: -7343005, type: "enable", from: "00:00", to: "23:59", days: "5", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Friday." },
	{ ItemID: -7343006, type: "enable", from: "00:00", to: "23:59", days: "5", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Friday." },
	{ ItemID: -7337000, type: "enable", from: "00:00", to: "23:59", days: "6", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Saturday." },
	{ ItemID: -7337001, type: "enable", from: "00:00", to: "23:59", days: "6", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Saturday." },
	{ ItemID: -7337002, type: "enable", from: "00:00", to: "23:59", days: "6", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Saturday." },
	{ ItemID: -7337003, type: "enable", from: "00:00", to: "23:59", days: "6", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Saturday." },
	{ ItemID: -7337004, type: "enable", from: "00:00", to: "23:59", days: "6", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Saturday." },
	{ ItemID: -7337005, type: "enable", from: "00:00", to: "23:59", days: "6", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Saturday." },
	{ ItemID: -7337006, type: "enable", from: "00:00", to: "23:59", days: "6", orderModes: "delivery,takeaway", message: "Sorry, this item is only available on Saturday." },*/
];

ItemsAvailabilityValidation.SubMenuEvents = [ //used for submenus
 { subMenuID: 4000006, type: "enable", from: "00:00", to: "23:59", days: "2", orderModes: "delivery,takeaway", message: "Sorry, this offer is only available on Tuesday." },
   { subMenuID: 4000007, type: "enable", from: "00:00", to: "23:59", days: "2", orderModes: "delivery,takeaway", message: "Sorry, this offer is only available on Tuesday." },
	{ subMenuID: 4000008, type: "enable", from: "00:00", to: "23:59", days: "2", orderModes: "delivery,takeaway", message: "Sorry, this offer is only available on Tuesday." },
	{ subMenuID: 4000060, type: "enable", from: "00:00", to: "23:59", days: "0,1,2,3,4,5,6", orderModes: "takeaway", message: "This item is available for takeaway only" },
];

$(window).on('FullDataRequested', function (e) {
    ItemsAvailabilityValidation.SetItemsAvailability();
});

ItemsAvailabilityValidation.SetItemsAvailability = function () {
    //This works only with type enable, still needs development to work with disable.
    for (var i in ItemsAvailabilityValidation.SubMenuEvents) {
        validationRec = ItemsAvailabilityValidation.SubMenuEvents[i];

        var subMenuID = validationRec["subMenuID"];
        var submenu = OriginalSubMenu[subMenuID];

        if (typeof submenu !== "undefined" && submenu != null) {
            var valDaysStr = validationRec["days"];

            var fromMins = parseInt(validationRec["from"].substr(0, validationRec["from"].indexOf(":"))) * 60 +
                           parseInt(validationRec["from"].substr(validationRec["from"].indexOf(":") + 1));

            var toMins = parseInt(validationRec["to"].substr(0, validationRec["to"].indexOf(":"))) * 60 +
                         parseInt(validationRec["to"].substr(validationRec["to"].indexOf(":") + 1));

            var orderModes = validationRec["orderModes"];

            for (var i in submenu["Items"]) {
                var submenuitm = submenu["Items"][i];
				if (typeof submenuitm !== "undefined" && submenuitm != null) {
                var orgitm = OriginalItems[submenuitm["ID"]];
				if (typeof orgitm !== "undefined" && orgitm != null) {
                orgitm.Availability = {};
                orgitm.Availability.days = valDaysStr;
                orgitm.Availability.start = fromMins;
                orgitm.Availability.end = toMins;
                orgitm.Availability.orderMode = orderModes;
				}
            }
		  }
        }
    }

    for (var i in ItemsAvailabilityValidation.ItemsEvents) {
        validationRec = ItemsAvailabilityValidation.ItemsEvents[i];

        var ItemID = validationRec["ItemID"];
        var orgitm = OriginalItems[ItemID];

        if (typeof orgitm !== "undefined" && orgitm != null) {
            var valDaysStr = validationRec["days"];

            var fromMins = parseInt(validationRec["from"].substr(0, validationRec["from"].indexOf(":"))) * 60 +
                           parseInt(validationRec["from"].substr(validationRec["from"].indexOf(":") + 1));

            var toMins = parseInt(validationRec["to"].substr(0, validationRec["to"].indexOf(":"))) * 60 +
                         parseInt(validationRec["to"].substr(validationRec["to"].indexOf(":") + 1));

            var orderModes = validationRec["orderModes"];

            if (!orgitm["IsDeal"]) {
                orgitm.Availability = {};
                orgitm.Availability.days = valDaysStr;
                orgitm.Availability.start = fromMins;
                orgitm.Availability.end = toMins;
                orgitm.Availability.orderMode = orderModes;
            }
            else {
                var deal = OriginalDeals[orgitm["DealID"]];
                if (typeof deal !== "undefined" && deal != null) {
                    var dealOrginalItem = OriginalItems[deal["ItemID"]];
                    if (typeof dealOrginalItem !== "undefined" && dealOrginalItem != null) {
                        dealOrginalItem.Availability = {};
                        dealOrginalItem.Availability.days = valDaysStr;
                        dealOrginalItem.Availability.start = fromMins;
                        dealOrginalItem.Availability.end = toMins;
                        dealOrginalItem.Availability.orderMode = orderModes;
						/*
                        for (var n in deal["Steps"]) {
                            var step = deal["Steps"][n];

                            for (var j in step["Items"]) {
                                var stepItm = step["Items"][j];
                                var stepOriginalItem = OriginalItems[stepItm["ID"]];
                                stepOriginalItem.Availability = {};
                                stepOriginalItem.Availability.days = valDaysStr;
                                stepOriginalItem.Availability.start = fromMins;
                                stepOriginalItem.Availability.end = toMins;
                                stepOriginalItem.Availability.orderMode = orderModes;
                            }
                        }
						*/
                    }
                }
            }
        }

    }
}

$(document).ready(function () {
    ItemsAvailabilityValidation.SetItemsAvailability();
});



function validateMenuAccess(SubMenu, update, isDelivery, orderTime) {
    var subMenuID = SubMenu["ID"];

    var ItemsEvents = ItemsAvailabilityValidation.SubMenuEvents;

    //if (typeof orderTime === "undefined" || orderTime == null || orderTime < getServerTime())
    orderTime = getServerTime();

    if (typeof isDelivery === "undefined" || isDelivery == null)
        isDelivery = true;

    var orderDay = orderTime.getDay();
    var orderMins = orderTime.getHours() * 60 + orderTime.getMinutes();

    var res = true;
    var valid = false;
    var found = false;
    var validationRec = null;
    var msg = Translate("Sorry, this item is not available at this time");

    //if (typeof itemsMessages[subMenuID] !== "undefined")
    //msg = Translate(ItemsEvents[subMenuID].message);



    for (var i in ItemsEvents) {
        validationRec = ItemsEvents[i];

        if (validationRec["subMenuID"] == subMenuID) {
            found = true;

            var valDaysStr = validationRec["days"];

            var submenu = OriginalSubMenu[subMenuID];


            var fromMins = parseInt(validationRec["from"].substr(0, validationRec["from"].indexOf(":"))) * 60 +
                           parseInt(validationRec["from"].substr(validationRec["from"].indexOf(":") + 1));

            var toMins = parseInt(validationRec["to"].substr(0, validationRec["to"].indexOf(":"))) * 60 +
                         parseInt(validationRec["to"].substr(validationRec["to"].indexOf(":") + 1));

            var orderModes = validationRec["orderModes"];

            msg = Translate(validationRec["message"]);

            if ((valDaysStr.indexOf(orderDay) > -1) && (orderMins >= fromMins) && (orderMins <= toMins)) {
                valid = true;
                break;
            }

        }
    }

    if (found) { // the item is found in the list of items with time or order mode restrictions
        if (!valid && validationRec["type"] == "enable") { //time & type validation, is true when trying to order the item on the days when the item is not available
            res = false;
        }
        else if (valid && validationRec["type"] == "disable") { //time & type validation
            res = false;
        }
            //order mode validation, the time is valid but the user order mode is not known yet, and the item has order mode restriction.
        else if ((typeof cart.cartHeader === "undefined" || jQuery.isEmptyObject(cart.cartHeader)) && valid && !(orderModes.indexOf("delivery") > -1 && orderModes.indexOf("takeaway") > -1)) {
            //loginAndChooseOrderMode.ItemsViewerOpenMenu(SubMenu, update);
            //return false;
        }
        else if (valid && //order mode validation, the time is valid and the user chose his order mode
                    (!(orderModes.indexOf("delivery") > -1 && orderModes.indexOf("takeaway") > -1)) &&
                    ((!isDelivery && orderModes.indexOf("delivery") > -1) || (isDelivery && orderModes.indexOf("takeaway") > -1))
                ) {
            res = false;
        }

        if(valid && !res){
			confirm(msg + ". Would you like to change your order mode?", "", function(res, args){
				if (res) {
				storeAddressLocator.Toggle();
            }
				
			});
		}else if (!res)
            alert(msg);


    }
	
	

    return res;

}

function validateItemOrderingTime(itemID, isDelivery, orderTime) {

    var ItemsEvents = ItemsAvailabilityValidation.ItemsEvents;
    // if (typeof orderTime === "undefined" || orderTime == null || orderTime < getServerTime())
    orderTime = getServerTime();

    if (typeof isDelivery === "undefined" || isDelivery == null)
        isDelivery = true;

    var orderDay = orderTime.getDay();
    var orderMins = orderTime.getHours() * 60 + orderTime.getMinutes();

    var res = true;
    var valid = false;
    var found = false;
    var validationRec = null;
    var msg = Translate("Sorry, this item is not available at this time");

    //if (typeof itemsMessages[itemID] !== "undefined")
    //  msg = Translate(itemsMessages[itemID]);

    for (var i in ItemsEvents) {
        validationRec = ItemsEvents[i];

        if (validationRec["ItemID"] == itemID) {
            found = true;

            var valDaysStr = validationRec["days"];

            var fromMins = parseInt(validationRec["from"].substr(0, validationRec["from"].indexOf(":"))) * 60 +
                           parseInt(validationRec["from"].substr(validationRec["from"].indexOf(":") + 1));

            var toMins = parseInt(validationRec["to"].substr(0, validationRec["to"].indexOf(":"))) * 60 +
                         parseInt(validationRec["to"].substr(validationRec["to"].indexOf(":") + 1));

            var orderModes = validationRec["orderModes"];

            msg = Translate(validationRec["message"]);

            if ((valDaysStr.indexOf(orderDay) > -1) && (orderMins >= fromMins) && (orderMins <= toMins)) {
                valid = true;
                break;
            }

        }
    }

    if (found) {

        if (!valid && validationRec["type"] == "enable") {
            res = false;
        }
        else if (valid && validationRec["type"] == "disable") {
            res = false;
        }
        else if (valid &&
					(!(orderModes.indexOf("delivery") > -1 && orderModes.indexOf("takeaway") > -1)) &&
					((!isDelivery && orderModes.indexOf("delivery") > -1) || (isDelivery && orderModes.indexOf("takeaway") > -1))
				) {
            res = false;
        }

        if(valid && !res){
			confirm(msg + ". Would you like to change your order mode?", "", function(res, args){
				if (res) {
				storeAddressLocator.Toggle();
            }
				
			});
		}else if (!res)
            alert(msg);
    }

	 
	
    return res;

}