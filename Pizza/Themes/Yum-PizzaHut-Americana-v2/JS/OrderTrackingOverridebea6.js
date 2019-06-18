function showOrderTracking(ordernumber, customerid) {

    loadFullItems(function () {
        if (typeof (customerid) === "undefined") {
            if (!ValidateLogin())
                return;

            changeAddressTo("trackorder");
        }
        else {
            changeAddressTo("trackorder/" + customerid + "/" + ordernumber);
        }

        var reg = new OrderTracking();
        reg.pages = HTML_Pages;
        reg.orderid = ordernumber;
        reg.customerid = customerid;
        reg.pagesContainer = $("#container_inner").get(0);
        reg.beforeShowPage = function () {
            closefloat();
        };
        reg.afterShowPage = function () {
            showFloat("ORDER TRACKING", 9);
        };
        reg.onClose = function () {
            closefloat(true);
            changeAddressTo("");
        }

        reg.FillActiveOrders = function () {

            if (!$(this.pagesContainer).is(":visible")) {
                if (this.afterShowPage != null)
                    this.afterShowPage();
            }

            setFloatingWindowStyle(9);

            var _this = this;

            this.ActiveBackground = $("#ordertrack_selectedorder").css("backgroundColor");

            var tableTemplate = this.pages["OrderTracking_Table"];
            var lineTemplate = this.pages["OrderTracking_ItemLine"];

            var htmlLines = "";
            var firstItem = null;

            $("#ordertrack_currentstate").empty();
            var x = 0;

            //this.StatusList.sort(function (itm1, itm2) {
            //    return itm2["OrderID"] - itm1["OrderID"];
            //});

            for (var i in this.StatusList) {
                var promiseTime = null;
                var orderTime = null;
                var orderDueTime = null;

                var status = this.StatusList[i];

                var PromiseTimeContID = createUUID();
                var deleteOrderID = createUUID();
                var editOrderID = createUUID();

                var orderDetailID = createUUID();
                var orderDetailWrapperID = createUUID();

                var orderDetailLeftArrowID = createUUID();
                var orderDetailDownArrowID = createUUID();

                var orderID = status["OrderID"].toString().trim();


                var addr = "";
                if (status["CheckHeader"]["DelivaryOrTakeout"] == "Delivary") {
                    addr = status["CheckHeader"]["customerAddrDesc"];
                }
                else {
                    var addrID = status["CheckHeader"]["StoreID"];
                    if (OriginalStores[addrID] == null) { addr = "The store details are currently unavailable." }
                    else { addr = OriginalStores[addrID]["Address"]; }
                }

                var line = lineTemplate;
                line = line.replace(/#ORDERID#/gi, orderID);
                line = line.replace(/#ORDERMODE#/gi, status["CheckHeader"]["DelivaryOrTakeout"] == "Delivary" ? Translate("Delivery") : Translate("Carryout"));
                line = line.replace(/#ADDRESS#/gi, addr)
                line = line.replace(/#STATUS#/gi, status["StatusName"] != null ? status["StatusName"].toString().trim() : "");
                line = line.replace(/#ORDERTIME#/gi, status["OrderTime"] != null ? ConvertDateServerDate(status["OrderTime"]).format("yyyy-mm-dd hh:MM TT").toString().trim() : "");
                line = line.replace(/#TOTAL#/gi, status["Total"] != null ? status["Total"].toString().trim() + CurrencySymbol : "");

                if (typeof status["PromiseTime"] !== "undefined") {
                    promiseTime = status["PromiseTime"];
                    if (promiseTime > 0) {
                        if (promiseTime < 32)
                            promiseTimeRange = translate? '35-25 دقيقة': '25-35 minutes';
                        else if (promiseTime < 37)
                            promiseTimeRange = translate ? '40-30 دقيقة' : '30-40 minutes';
                        else if (promiseTime < 42)
                            promiseTimeRange = translate ? '45-35 دقيقة' : '35-45 minutes';
                        else if (promiseTime < 47)
                            promiseTimeRange = translate ? '50-40 دقيقة' : '40-50 minutes';
                        else if (promiseTime < 52)
                            promiseTimeRange = translate ? '55-45 دقيقة' : '45-55 minutes';
                        else if (promiseTime < 57)
                            promiseTimeRange = translate ? '60-50 دقيقة' : '50-60 minutes';
                        else if (promiseTime < 62)
                            promiseTimeRange = translate ? '65-55 دقيقة' : '55-65 minutes';
                        else if (promiseTime < 67)
                            promiseTimeRange = translate ? '70-60 دقيقة' : '60-70 minutes';
                        else if (promiseTime < 72)
                            promiseTimeRange = translate ? '75-65 دقيقة' : '65-75 minutes';
                        else if (promiseTime < 76)
                            promiseTimeRange = translate ? '80-70 دقيقة' : '70-80 minutes';
                    }
                    orderTime = new Date(ConvertDateServerDate(status["OrderTime"])).getTime();
                    //

                    if (status["DelivaryType"] != "Advance")
                        orderDueTime = new Date(orderTime + promiseTime * 60000).format("hh:MM TT").toString().trim();
                    else{
                        orderDueTime = status["CheckHeader"]["delivarytime_date"];
						promiseTimeRange = orderDueTime;
					}

                    line = line.replace('#PROMISETIMECONTAINER#', PromiseTimeContID);
                    line = line.replace(/#DUE_TIME#/gi, orderDueTime);
                    line = line.replace(/#PROMISE_TIME_RANGE#/gi, promiseTimeRange);
                    line = line.replace(/#PROMISE_TIME#/gi, promiseTime > 0 ? promiseTime : "");

                    if (promiseTime > 0 && status["DelivaryType"] == "Now" && this.useCountDown) {
                        //line = line.replace('#PROMISETIME#', promiseTime); Disabled for the counter
                        line = line.replace('#PROMISETIME#', "");
                        line = line.replace('#PROMISETIME_DISPLAYSTYLE#', "block");
                    }
                    else {
                        line = line.replace('#PROMISETIME#', "");
                        line = line.replace('#PROMISETIME_DISPLAYSTYLE#', "none");
                    }

                    if (status["Status"] == '2048' || status["Status"] == 64 || status["Status"] == 128 || status["Status"] == '8192') {
                        $("#" + PromiseTimeContID).hide();
                    }
                }

                line = line.replace(/#ORDER_EDIT#/gi, editOrderID);
                line = line.replace(/#ORDER_DELETE#/gi, deleteOrderID);

                line = line.replace(/#PAY_METHOD#/gi, status["PaymentMethod"] != null ? Translate(status["PaymentMethod"].toString().trim()) : "");

                if (status["DelivaryTime"] != null)
                    line = line.replace(/#DELIVERY_TIME#/gi, Translate(status["DelivaryType"].toString().trim()) + (status["DelivaryTime"].toString().trim() == "" ? "" : " - " + status["DelivaryTime"].toString().trim()));
                else
                    line = line.replace(/#DELIVERY_TIME#/gi, "");

                line = line.replace(/#ORDER_NOTE#/gi, status["OrderNote"] != null ? status["OrderNote"].toString().trim() : "");

                line = line.replace(/#TRC_ORDERID_DET#/gi, orderDetailID.toString().trim());
                line = line.replace(/#TRC_ORDERID_DET_WRAPPER#/gi, orderDetailWrapperID.toString().trim());

                line = line.replace(/#TRC_ORDERID_LEFT_ARROW_IMG#/gi, orderDetailLeftArrowID.toString().trim());
                line = line.replace(/#TRC_ORDERID_DOWN_ARROW_IMG#/gi, orderDetailDownArrowID.toString().trim());

                line = line.replace(/#ORDERTRACK_RECEIVE_IMG#/gi, "order_track_receive_img_" + status["OrderID"].toString().trim());
                line = line.replace(/#ORDERTRACK_ARROW_1#/gi, "ordertrack_arrow_1_" + status["OrderID"].toString().trim());
                line = line.replace(/#ORDERTRACK_COOKING_IMG#/gi, "ordertrack_cooking_img_" + status["OrderID"].toString().trim());
                line = line.replace(/#ORDERTRACK_ARROW_2#/gi, "ordertrack_arrow_2_" + status["OrderID"].toString().trim());
                line = line.replace(/#ORDERTRACK_DELIVERY_IMG#/gi, "ordertrack_delivery_img_" + status["OrderID"].toString().trim());
                line = line.replace(/#ORDERTRACK_ARROW_3#/gi, "ordertrack_arrow_3_" + status["OrderID"].toString().trim());
                line = line.replace(/#ORDERTRACK_HOME_IMG#/gi, "ordertrack_home_img_" + status["OrderID"].toString().trim());

                line = line.replace(/#ORDERTRACK_RECEIVE_TITLE#/gi, "ordertrack_receive_title_" + status["OrderID"].toString().trim());
                line = line.replace(/#ORDERTRACK_COOKING_TITLE#/gi, "ordertrack_cooking_title_" + status["OrderID"].toString().trim());
                line = line.replace(/#ORDERTRACK_DELIVERY_TITLE#/gi, "ordertrack_delivery_title_" + status["OrderID"].toString().trim());
                line = line.replace(/#ORDERTRACK_HOME_TITLE#/gi, "ordertrack_home_title_" + status["OrderID"].toString().trim());




                var uiItem = $(line);
                $("#ordertrack_currentstate").append(uiItem);
                if (this.useCountDown && typeof status["PromiseTime"] !== "undefined" && promiseTime > 0 && status["DelivaryType"] == "Now") {
                    var remainingTime = status["RemainingTime"];
                    if (remainingTime > 0)
                        showCountDown(PromiseTimeContID, remainingTime);
                    else
                        $("#" + PromiseTimeContID).hide();
                }
                if (firstItem == null)
                    firstItem = $("#" + orderID);

                uiItem.data("status", status);
                uiItem.data("owner", this);
                uiItem.data("detailWrapper", $("#" + orderDetailWrapperID));

                uiItem.data("detailWrapperLeftArrow", $("#" + orderDetailLeftArrowID));
                uiItem.data("detailWrapperDownArrow", $("#" + orderDetailDownArrowID));

                $("#" + orderDetailID).html(drawCartItemsAsHTML(status.Check, { "itemGroupTemplate": "HistoryOrders_CartItemGroup", "itemTemplate": "HistoryOrders_CartItem", "itemDetTemplate": "HistoryOrders_CartItemDetail", "itemTemplateEmpty": "HistoryOrders_CartItemEmpty" }));

                $("#" + orderDetailID).find("img").each(function () {
                    this.onerror = function () {
                        ReplaceMissingImage(this);
                    }
                });
                //uiItem.data("detailWrapper").hide();
                //uiItem.data("detailWrapperLeftArrow").show();
                //uiItem.data("detailWrapperDownArrow").hide();

                $("#" + orderDetailWrapperID).hide();
                $("#" + orderDetailLeftArrowID).show();
                $("#" + orderDetailDownArrowID).hide();


                $("#" + orderID).data("status", status);
                $("#" + orderID).data("owner", this);
                $("#" + orderID).data("detailWrapper", $("#" + orderDetailWrapperID));
                $("#" + orderID).data("orderWrapper", $("#" + status["OrderID"].toString().trim()));

                $("#" + orderID).data("detailWrapperLeftArrow", $("#" + orderDetailLeftArrowID));
                $("#" + orderID).data("detailWrapperDownArrow", $("#" + orderDetailDownArrowID));


                $("#" + orderID).click(function () {

                    if ($(this).data("owner").oldActiveItem == null)
                        $(this).data("owner").InactiveBackground = $(this).css("backgroundColor");

                    if ($(this).data("owner").oldActiveItem != null)
                        $(this).data("owner").oldActiveItem.css("backgroundColor", $(this).data("owner").InactiveBackground);

                    $(this).data("owner").oldActiveItem = $(this);
                    $(this).css("backgroundColor", $(this).data("owner").ActiveBackground);

                    $(this).data("owner").updateView($(this).data("status"));


                    if (!$(this).data("detailWrapper").is(":visible")) {
                        $(this).data("detailWrapper").show();
                        $(this).data("detailWrapperLeftArrow").hide();
                        $(this).data("detailWrapperDownArrow").show();
                        $(this).data("orderWrapper").addClass("active");
                    }
                    else {
                        $(this).data("detailWrapper").hide();
                        $(this).data("detailWrapperLeftArrow").show();
                        $(this).data("detailWrapperDownArrow").hide();
                        $(this).data("orderWrapper").removeClass("active");
                    }
                });

                $("#" + editOrderID).data("status", status);
                $("#" + editOrderID).data("owner", this);
                $("#" + editOrderID).click(function () {

                    ///
                    var owner = $(this).data("owner");
                    var status = $(this).data("status");

                    serverQuery("/Handlers/OrderTracking.ashx", { "action": "canedit", "orderid": status["OrderID"] }, function (res, response, args) {

                        if (res && response["valid"]) {
                            ValidateCheck(status["Check"], status, function (param, cartData, totals) {

                                var Check = param["Check"];
                                var checkID = param["OrderID"];
                                cart.clearCart();

                                cart.cartHeader = param["CheckHeader"];
                                for (var i in cartData) {

                                    var cartItem = cartData[i];

                                    if (typeof OriginalItems[cartItem["ID"]] !== "undefined")
                                        cart.addItemToCart(cartItem, true);
                                }

                                cart.cartHeader = param["CheckHeader"];
                                cart.updateCart();
                                cart.postOrderID = checkID;
                                owner.Close();

                                alert("Your order is restored to the shopping cart again. Feel free to modify your items and proceed to checkout when you are done.");
                                googleTag.push({ 'event': 'Edit Order', 'Category': 'Order Tracking', 'ElementType': '', 'ID': '', 'Name': '' });
                            });
                        }
                        else {
                            _this.onRefresh();
                            alert("This order is not valid for editing anymore");
                        }

                    });
                    ///

                    return false;
                });

                $("#" + deleteOrderID).data("status", status);
                $("#" + deleteOrderID).data("owner", this);
                $("#" + deleteOrderID).click(function () {
                    //
                    var owner = $(this).data("owner");
                    var status = $(this).data("status");


                    var popupDlg = new PopupForm();
                    popupDlg.width = 400;
                    popupDlg.height = 130;
                    popupDlg.borderColor = "#83633D";
                    popupDlg.backgroundColor = "rgb(210, 210, 210)";

                    var html = HTML_Pages["OrderTracking_CancelOrder"];

                    popupDlg.container.html(html);

                    var _this = this;
                    var optionsHTML = "";
                    optionsHTML += "<option value='-1'>- " + Translate("Select a value") + " -</option>";
                    for (var i in OrderCancelReasons) {
                        var reason = OrderCancelReasons[i];
                        optionsHTML += "<option value='" + reason["ID"] + "'>" + reason["Name"] + "</option>";
                    }

                    $("#cancelorder_reasonid").html(optionsHTML);
                    if (useJUICombo) {
                        $("#cancelorder_reasonid").combobox();
                    }


                    $("#btnOk_CancelOrder").click(function () {

                        var cancelReasonID = $("#cancelorder_reasonid").val();
                        if (cancelReasonID == '' || cancelReasonID == -1) {
                            alert("Please select a cancellation reason.");
                            return;
                        }
                        serverQuery("/Handlers/OrderTracking.ashx", { "action": "cancelorder", "orderid": status["OrderID"], "cancelreason": cancelReasonID }, function (res, response, args) {

                            if (res && response["valid"] == true) {
                                owner.onRefresh();
                                alert("Cancelation request sent successfully, you will be informed if cancelation request accepted by E-Mail later.");
                                googleTag.push({ 'event': 'Cancel Order', 'Category': 'Order Tracking', 'ElementType': '', 'ID': '', 'Name': '' });
                            }
                            else if (response != null) {
                                owner.onRefresh();
                                alert("Unable to cancel this order", 170, 400);
                            }

                        }, this);

                        popupDlg.Close();
                    });

                    $("#btnCancel_CancelOrder").click(function () {
                        popupDlg.Close();
                    });
                    //////TEMP to be change
                    if (useBoxIt) {
                        $('select').selectBoxIt({
                            downArrowIcon: "icon-red-arrow",
                        });
                    }
                    popupDlg.Show();

                    //////
                    return false;
                });

                if (!status["CanEdit"]) {
                    $("#" + editOrderID).addClass('disabled');
                    $("#" + editOrderID).attr('disabled', 'disabled');
                }

                if (!enableCancelOrder)
                    $("#" + deleteOrderID).hide();
                else if (!status["CanCancel"]) {
                    $("#" + deleteOrderID).addClass('disabled');
                    $("#" + deleteOrderID).attr('disabled', 'disabled');
                }

                if (!userLogin.isLoggedIn()) {
                    $("#" + editOrderID).hide();
                    $("#" + deleteOrderID).hide();
                }

                x++;
            }

            if (x == 0) {
                $("#ordertrack_currentstate").append($(this.pages["OrderTracking_EmptyOrder"]));

                if (!showEmptyForms) {
                    this.Close();
                    alert("Sorry, we did not find any recent orders.");
                    return;
                }
            }

            if (firstItem != null)
                firstItem.click();
        }





        reg.Show();
    });
}


function showCountDown(container, timeValue) {

    var counteFormat;
    var startTime;
   
        promiseTime = timeValue
        if (promiseTime > 0) {
            if (promiseTime < 32)
                promiseTimeRange = translate? '35-25 دقيقة': '25-35 minutes';
            else if (promiseTime < 37)
                promiseTimeRange = translate ? '40-30 دقيقة' : '30-40 minutes';
            else if (promiseTime < 42)
                promiseTimeRange = translate ? '45-35 دقيقة' : '35-45 minutes';
            else if (promiseTime < 47)
                promiseTimeRange = translate ? '50-40 دقيقة' : '40-50 minutes';
            else if (promiseTime < 52)
                promiseTimeRange = translate ? '55-45 دقيقة' : '45-55 minutes';
            else if (promiseTime < 57)
                promiseTimeRange = translate ? '60-50 دقيقة' : '50-60 minutes';
            else if (promiseTime < 62)
                promiseTimeRange = translate ? '65-55 دقيقة' : '55-65 minutes';
            else if (promiseTime < 67)
                promiseTimeRange = translate ? '70-60 دقيقة' : '60-70 minutes';
            else if (promiseTime < 72)
                promiseTimeRange = translate ? '75-65 دقيقة' : '65-75 minutes';
            else if (promiseTime < 76)
                promiseTimeRange = translate ? '80-70 دقيقة' : '70-80 minutes';
        }
        
        $("#" + container).html(promiseTimeRange);
        $("#" + container).addClass('promiseTimeContainer');
		$("#" + container).css('display', 'inline-block')
		//$("#" + container).show();
}
