"use strict";
var PizzaDiscount;
var isPizzaDiscountEnabled = false;
var PizzaDisc = null;
var eligibleItemsFound = false;

function PizzaDiscount() {

    this.isCouponRedeemed = false;
	this.Init = function(CustomPromoEligibleSubmenuID, CustomPromoSubmenuID){
		this.PromotionSubmenu = OriginalSubMenu[CustomPromoSubmenuID];
        this.EligibleSubmenu = OriginalSubMenu[CustomPromoEligibleSubmenuID];
		this.loadItems();
	}
	
	 this.loadItems = function () {
        //Get the discounted items
        for (var i in this.PromotionSubmenu["Items"]) {
            var itm = this.PromotionSubmenu["Items"][i];
            this.PromotionItems[itm["ID"]] = itm;
        }

        //Get the Original Eligible Items 
        for (var i in this.EligibleSubmenu["Items"]) {
            var itm = this.EligibleSubmenu["Items"][i];
            this.EligibleItems[itm["ID"]] = itm;
        }

    }
	this.addItem = function (itm, skipPromoValidation) {
        cart.addItemToCart(itm, true);

    };

	this.reviewCartItems = function (selectedItems) {
    //When a user edit a cart item that is eligible for promotion or is a promotion item, the cart items are reviewed to make sure the promotion is correctly applied
    var ItemsToAdd = [];
	if (!this.isCouponRedeemed)
		return; 
	
    //Get all the items from the cart that are eligible for the promotion or belong to the promotion item list
    if (cart.cartData.length > 0) {
        for (var i in cart.cartData) {
            var cartItem = cart.cartData[i];
            if (this.EligibleItems.hasOwnProperty(cartItem["ID"])  && cartItem["DealID"] ==0) {
                var itmWithPrice = this.getOriginalPriceAndType(cartItem);
                itmWithPrice["existInCart"] = true;
                ItemsToAdd.push(itmWithPrice);
				eligibleItemsFound = true;
            }
        }
    }

	for(var i=0; i<ItemsToAdd.length; i++){
		 var item = ItemsToAdd[i];
		 if (item.existInCart)
                cart.cartData.splice(cart.cartData.indexOf(item), 1);
			
		 var promotionItem = this.getEquivalentItem(this.PromotionItems, this.EligibleItems[item["ID"]]);

            var addItem = {
                "ID": promotionItem["ID"],
                "Name": promotionItem["Name"],
                "Price": promotionItem["Price"],
                "Weight": promotionItem["Weight"],
                "modGroupsItems": item["modGroupsItems"],
                "NoModCodeItems": item["NoModCodeItems"],
                "DealID": promotionItem["DealID"],
                "Qty": item["Qty"]
            };

            addItem = this.removeUnappliableModifiers(addItem, promotionItem);
            //update cart item price after fixing the modifiers.
            addItem["Price"] = getCartItemPrice(addItem);

            this.addItem(addItem, true);
	}
}

}


PizzaDiscount.prototype.getEquivalentItem = function (ItemsList, sourceItm) {
    //Get the equivalent item, if the item was not found return null.
    var resutlItem = null;
    for (var i in ItemsList) {
        var itm = ItemsList[i];
        if (itm["Selector1ValueID"] == sourceItm["Selector1ValueID"] &&
            itm["Selector2ValueID"] == sourceItm["Selector2ValueID"] &&
            itm["Selector3ValueID"] == sourceItm["Selector3ValueID"] &&
            itm["VirtualGroupID"] == sourceItm["VirtualGroupID"]) {
            resutlItem = itm;
            break;
        }
    }

    return resutlItem;
}


PizzaDiscount.prototype.removeUnappliableModifiers = function (itemToAdd, originalItem) {
    //Modifiers Items
    for (var m in itemToAdd["modGroupsItems"]) {
        var modItem = itemToAdd["modGroupsItems"][m];
        var modGroupID = modItem["ModGroupID"];
        var modItemName = modItem["Name"];
        var modItemID = modItem["ID"];
        var found = false;

        if (!found)
            for (var g in originalItem["modGroup"]) {
                var modGroup = originalItem["modGroup"][g];

                if (typeof modGroup === "undefined")
                    continue;

                for (var i in modGroup.Items) {
                    var tmpModItemID = modGroup.Items[i]["ID"];
                    var tmpModGroupID = modGroup["ID"];
                    var tmpModItemName = modGroup.Items[i]["Name"];

                    if (tmpModItemID == modItemID && tmpModGroupID == modGroupID) {
                        found = true;
                        break;
                    }
                    else if (tmpModItemName == modItemName) {
                        itemToAdd["modGroupsItems"][m]["ID"] = tmpModItemID;
                        itemToAdd["modGroupsItems"][m]["ModGroupID"] = tmpModGroupID;
                        itemToAdd["modGroupsItems"][m]["ModGroupOrder"] = getModGroupOrder(itemToAdd["ID"], tmpModGroupID);
                        itemToAdd["modGroupsItems"][m]["Price"] = getCartItemPrice(itemToAdd["modGroupsItems"][m]);
                        itemToAdd["modGroupsItems"][m]["Weight"] = GetModItemWeight(OriginalModGroups[tmpModGroupID], tmpModItemID);

                        found = true;
                        break;
                    }
                }
            }

        if (!found) {
            delete itemToAdd[m];
        }
    }


    //NoModCodeItems
    for (var n in itemToAdd["NoModCodeItems"]) {
        var modItem = itemToAdd["NoModCodeItems"][n];
        var modGroupID = modItem["ModGroupID"];
        var modItemName = modItem["Name"];
        var modItemID = modItem["ID"];
        var found = false;

        if (!found)
            for (var g in originalItem["modGroup"]) {
                var modGroup = originalItem["modGroup"][g];

                if (typeof modGroup === "undefined")
                    continue;

                for (var i in modGroup.Items) {
                    var tmpModItemID = modGroup.Items[i]["ID"];
                    var tmpModGroupID = modGroup["ID"];
                    var tmpModItemName = modGroup.Items[i]["Name"];

                    if (tmpModItemID == modItemID && tmpModGroupID == modGroupID) {
                        found = true;
                        break;
                    }
                    else if (tmpModItemName == modItemName) {
                        itemToAdd["NoModCodeItems"][n]["ID"] = tmpModItemID;
                        itemToAdd["NoModCodeItems"][n]["ModGroupID"] = tmpModGroupID;
                        itemToAdd["NoModCodeItems"][n]["ModGroupOrder"] = getModGroupOrder(itemToAdd["ID"], tmpModGroupID);
                        itemToAdd["NoModCodeItems"][n]["Price"] = getCartItemPrice(itemToAdd["NoModCodeItems"][n]);
                        itemToAdd["NoModCodeItems"][n]["Weight"] = GetModItemWeight(OriginalModGroups[tmpModGroupID], tmpModItemID);

                        found = true;
                        break;
                    }
                }
            }

        if (!found) {
            delete itemToAdd[n];
        }
    }

    return itemToAdd;
}
PizzaDiscount.prototype.PromotionItems = {};

PizzaDiscount.prototype.EligibleItems = {};

PizzaDiscount.prototype.originalCheckoutAfterShowPage = checkoutAfterShowPage;

PizzaDiscount.prototype.validateCouponNumber = function () {
    var couponNo = $("#checkout_coupon").val();
	if (couponNo == 'Ramadan50'  || couponNo.toLowerCase() == 'ramadan50')
    {
		
        PizzaDisc.isCouponRedeemed = true; 
		PizzaDisc.reviewCartItems();
		checkoutForm.validateCheck(true);
		if(eligibleItemsFound)
			alert("Voucher code applied. Your order has been updated.");
		else
			alert("This offers applies on individual pizzas only.");
	}
	else
        PizzaDisc.originalValidateCouponNumber();

}

PizzaDiscount.prototype.getOriginalPriceAndType = function (itm) {
    /*Get the Original price for the item and flag whether it is a discounted item or not. 
      In case the item is discounted, keep the original item ID in case the item has to 
      be switched we don't need to lookup the original item again.*/
   
        itm["isDiscountedItem"] = false;
        itm["OriginalPrice"] = this.EligibleItems[itm["ID"]]["Price"];
        itm["OriginalItemID"] = itm["ID"];

    
    return itm;
}



$(document).ready(function () {
    isPizzaDiscountEnabled = true;
	
    if (isPizzaDiscountEnabled) {

        //Initiate promotion 

         PizzaDisc = new PizzaDiscount();
		

		
		
        PizzaDisc.Init(4000044, 4000054);
		
        checkoutAfterShowPage = function () {
            PizzaDisc.originalCheckoutAfterShowPage();
            PizzaDisc.originalValidateCouponNumber = checkoutForm.validateCouponNumber;
			checkoutForm.validateCouponNumber = PizzaDisc.validateCouponNumber;
            checkoutForm.originalThankyou = checkoutForm.showThankyou;
            checkoutForm.showThankyou = function (updatedOrder) {

                PizzaDisc.isCouponRedeemed = false;

                checkoutForm.originalThankyou(updatedOrder);
            }
			
        }


        PizzaDisc.onCartUpdated = cart.onCartUpdated;
        cart.onCartUpdated = function () {
            PizzaDisc.onCartUpdated();
            if (PizzaDisc.isCouponRedeemed)
                PizzaDisc.reviewCartItems();
        };
    }
});

