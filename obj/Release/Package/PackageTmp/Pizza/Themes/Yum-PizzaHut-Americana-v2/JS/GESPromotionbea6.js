"use strict";
var GESPromo;


function GESPromotion() {

    this.popupObj = new PopupForm();
    this.htmlContainer = null;

    this.popupObj.width = 700;
    this.popupObj.height = 380;


    var _popupObj = this.popupObj;


    this.PromotionSubmenu = null;
    this.PromotionItems = [];
    this.GESApplied = false;


    this.Init = function () {


        this.PromotionSubmenu = OriginalSubMenu[4000056];


        //Get the discounted items
        for (var i in this.PromotionSubmenu["Items"]) {
            var itm = this.PromotionSubmenu["Items"][i];
            GESPromo.PromotionItems[itm["ID"]] = itm;
        }

    }

    this.showOfferSubmenu = function (subMenuID) {

        var menu = new ItemsViewer();

        menu.dataItems = OriginalSubMenu[subMenuID]["Items"];;
        menu.dataTitle = OriginalSubMenu[subMenuID]["Name"];
        menu.subMenuID = OriginalSubMenu[subMenuID]["ID"];
        menu.ImagesFolder = "";
        menu.imgExtentions = "";
        menu.productCategory = OriginalSubMenu[subMenuID]["NameEN"];
        menu.container = $('#PromotionMenu').get(0);

        menu.activeStyle = new HtmlStyle('BackgroundList_ScrollPage', 'BackgroundList_ScrollPageItemFilter', 'BackgroundList_PromoItem', 'BackgroundList_ThumbsItem_SelectorItem', 0, 0, "Thumbs", false, false);

        menu.activeStyle._CustomPromo = this;

        menu.addItemToCart = function (itm) {
            GESPromo.GESApplied = true;
            cart.addItemToCart(itm, true);
            checkoutForm.Show();
            GESPromo.showCheckoutPaymentPage();

        };

        menu.customizeItem = function (item, cartItem, qty) {
            showItemCustomize(item, cartItem, false, qty);
        };

        menu.activeStyle.onItemFiltering = function () {
            adjustMenuItemsPositions();
        }


        menu.Init();
        menu.Update();
        this.afterShowDiscountMenu();

        activateAppropriateEvent();

        //changeAddressTo("menu/" + subMenuID + "/");
        //Add  subtitle to the submenu.
        $('.background_page_content_wrapper').prepend('<h3>' + "Choice of Free Chicken" + '</h3>');

        window.scrollTo(0, 0);
    }


}


GESPromotion.prototype.afterShowDiscountMenu = function () {
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
    adjustMenuItemsPositions();
}


GESPromotion.prototype.PromotionList = [];

GESPromotion.prototype.GESPromoMessage = "";

GESPromotion.prototype.addItemToCart = null;

GESPromotion.prototype.afterAddItems = function () {
    GESPromo.originaItemSelected = null;
    GESPromo.discountedItemSelected = null;
    GESPromo.useCartAddFunction = false;
};

GESPromotion.prototype.reviewCartItems = function (selectedItems, skipCustomization) {

    var count = 0;
    var deletePositions = [];

    for (var i in cart.cartData) {
        var cartItem = cart.cartData[i];
        if (typeof GESPromo.PromotionItems[cartItem["ID"]] !== "undefined") {
            if (!GESPromo.GESApplied) {
                deletePositions.push(cart.cartData.indexOf(cartItem));
            }
            else {
                count++;
                if (count > 1)
                    deletePositions.push(cart.cartData.indexOf(cartItem));
            }
        }
    }

    if (deletePositions.length > 0) {
        deletePositions.sort(function (pos1, pos2) {
            return pos1 - pos2;
        });

        while (deletePositions.length > 0) {
            var i = deletePositions.pop();
            cart.cartData.splice(i, 1);
        }
    }
}

GESPromotion.prototype.validateCouponNumber = function () {
    var couponNo = $("#checkout_coupon").val();
	if(couponNo == "")
		{
			 $("#couponvalidationmsg").html(Translate("Voucher code is invalid"));
             $("#couponvalidationmsg").css("color", "red");
		}
    else if (couponNo % 3 === 0 || couponNo.length == 5) {
        

            var itemFound = false;
            //Get all the items from the cart that are eligible for the promotion or belong to the promotion item list
            if (cart.cartData.length > 0) {
                for (var i in cart.cartData) {
                    var cartItem = cart.cartData[i];
                    if (typeof GESPromo.PromotionItems[cartItem["ID"]] !== "undefined") {
                        alert("Offer is already redeemed.");
                        itemFound = true;
                        break;
                    }
                }
            }

            if (!itemFound ) {
				GESPromo.GESApplied = true;
                cart.addItemToCart(OriginalItems[8870], true, true);
				checkoutForm.DrawCart();
				alert("Offer is redeemed.");
            }
            

        
    }
	else if(typeof EnableSpecialPromotion !== "undefined" && EnableSpecialPromotion)
			SpecialPromo.validateCouponNumber();
	else if (typeof isPizzaDiscountEnabled !== "undefined" && isPizzaDiscountEnabled)
			PizzaDisc.validateCouponNumber();
    else
        GESPromo.originalValidateCouponNumber();

}


GESPromotion.prototype.showCheckoutPaymentPage = function () {
    if (!userLogin.isLoggedIn()) {
        //call validation 
        var valid = false;

        checkoutForm.guestFrmValidator.ValidateBeforePost(function (res) {
            valid = true;
        });

        if (!$("#chkAcceptTermsAndConditions").prop("checked")) {
            alert("Can't proceed with the registration without accepting the terms and conditions");
            return;
        }

        if (!valid)
            return;
    }

    if (!validateFutureTime(checkoutForm)) {
        alert("Invalid future time selected, future time should exceed " + minFutureMinutes + " minutes at least");
        return;
    }

    $("#checkoutDetails").hide();
    $("#checkoutSection").hide();
    $("#checkoutPayment").show();
    clearArrowMenuCSS();
    $("#showCheckout").addClass("arrowMenuDone");
    $("#showDetails").addClass("arrowMenuDone");
    $("#showPayment").addClass("arrowMenuActive");
    $(window).scrollTop(0);
}



GESPromotion.prototype.originalCheckoutAfterShowPage = checkoutAfterShowPage;

$(document).ready(function () {
    //Check if the custom promotion is enabled 
    var GESPromoSubmenuID = 4000056;
    var EnableGESPromotion = typeof OriginalSubMenu[GESPromoSubmenuID] !== "undefined";


    //if enabled read the promotion configuration and get the list of eligible items to compare the cart items to it everytime an item is added to the cart 
    if (EnableGESPromotion) {

        var GESPromoMessage = "Select your free Chicken piece";


        GESPromo = new GESPromotion();

        GESPromo.Init();

      var _cartUpdated = cart.onCartUpdated ;
        cart.onCartUpdated = function () {
            GESPromo.reviewCartItems();
			_cartUpdated();
        };
        checkoutAfterShowPage = function () {

            $("#validatecoupon").unbind("click");
            $("#validatecoupon").click(function () {
                GESPromo.validateCouponNumber();
            });
			
			           
           

            GESPromo.originalCheckoutAfterShowPage();
            GESPromo.originalValidateCouponNumber = checkoutForm.validateCouponNumber;
            checkoutForm.validateCouponNumber = GESPromo.validateCouponNumber;
            checkoutForm.originalThankyou = checkoutForm.showThankyou;
            checkoutForm.showThankyou = function (updatedOrder) {

				if(typeof EnableSpecialPromotion !== "undefined" && EnableSpecialPromotion)
					SpecialPromo.SpecialPromotionRedeemed = false;
				
                GESPromo.GESApplied = false;

                checkoutForm.originalThankyou(updatedOrder);
            }


        }

    }

});
