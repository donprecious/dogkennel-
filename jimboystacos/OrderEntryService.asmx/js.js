Type.registerNamespace('Radiant.AlohaOnline');
Radiant.AlohaOnline.OrderEntryService=function() {
Radiant.AlohaOnline.OrderEntryService.initializeBase(this);
this._timeout = 0;
this._userContext = null;
this._succeeded = null;
this._failed = null;
}
Radiant.AlohaOnline.OrderEntryService.prototype={
_get_path:function() {
 var p = this.get_path();
 if (p) return p;
 else return Radiant.AlohaOnline.OrderEntryService._staticInstance.get_path();},
GetSiteMenu:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetSiteMenu',false,{},succeededCallback,failedCallback,userContext); },
GetReadOnlyMenuItemsHtml:function(iSubMenuId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetReadOnlyMenuItemsHtml',false,{iSubMenuId:iSubMenuId},succeededCallback,failedCallback,userContext); },
CheckIfPesIsEnabled:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'CheckIfPesIsEnabled',false,{},succeededCallback,failedCallback,userContext); },
GetRewardPromotionIdAndName:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetRewardPromotionIdAndName',false,{},succeededCallback,failedCallback,userContext); },
GetMenuItemsHtml:function(iSubMenuId,orderType,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetMenuItemsHtml',false,{iSubMenuId:iSubMenuId,orderType:orderType},succeededCallback,failedCallback,userContext); },
GetWebSalesGroupItemWithOptions:function(itemHeaderId,itemId,lineItemNumber,webSalesGroupId,mappings,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetWebSalesGroupItemWithOptions',false,{itemHeaderId:itemHeaderId,itemId:itemId,lineItemNumber:lineItemNumber,webSalesGroupId:webSalesGroupId,mappings:mappings},succeededCallback,failedCallback,userContext); },
GetItemWithOptions:function(itemHeaderId,itemId,lineItemNumber,mappings,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetItemWithOptions',false,{itemHeaderId:itemHeaderId,itemId:itemId,lineItemNumber:lineItemNumber,mappings:mappings},succeededCallback,failedCallback,userContext); },
GetOrderUpsellItems:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetOrderUpsellItems',false,{},succeededCallback,failedCallback,userContext); },
GetOrderAndSiteInfo:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetOrderAndSiteInfo',false,{},succeededCallback,failedCallback,userContext); },
GetExistingOrderAndSiteInfo:function(allowCompletedOrder,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetExistingOrderAndSiteInfo',false,{allowCompletedOrder:allowCompletedOrder},succeededCallback,failedCallback,userContext); },
GetOrder:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetOrder',false,{},succeededCallback,failedCallback,userContext); },
ValidateOrderMaximum:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'ValidateOrderMaximum',false,{},succeededCallback,failedCallback,userContext); },
DeleteOrderLineItems:function(groupLineId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'DeleteOrderLineItems',false,{groupLineId:groupLineId},succeededCallback,failedCallback,userContext); },
DeleteOrderLine:function(itemLineNumber,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'DeleteOrderLine',false,{itemLineNumber:itemLineNumber},succeededCallback,failedCallback,userContext); },
DeleteOrderLines:function(itemLineNumbers,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'DeleteOrderLines',false,{itemLineNumbers:itemLineNumbers},succeededCallback,failedCallback,userContext); },
DeleteOrderTipAmount:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'DeleteOrderTipAmount',false,{},succeededCallback,failedCallback,userContext); },
DeleteRecipientRow:function(recipientId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'DeleteRecipientRow',false,{recipientId:recipientId},succeededCallback,failedCallback,userContext); },
AddOrderLineItems:function(lstOrderLineItems,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'AddOrderLineItems',false,{lstOrderLineItems:lstOrderLineItems},succeededCallback,failedCallback,userContext); },
AddOrderLine:function(lineItemNumber,menuItemId,itemId,qty,specialInstruction,recipientName,modGrpIds,modIds,modQuantity,iModActions,modParentIndex,modSection1,modSection2,rolledUpModQty,iDefaultModActions,wsgOrderItem,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'AddOrderLine',false,{lineItemNumber:lineItemNumber,menuItemId:menuItemId,itemId:itemId,qty:qty,specialInstruction:specialInstruction,recipientName:recipientName,modGrpIds:modGrpIds,modIds:modIds,modQuantity:modQuantity,iModActions:iModActions,modParentIndex:modParentIndex,modSection1:modSection1,modSection2:modSection2,rolledUpModQty:rolledUpModQty,iDefaultModActions:iDefaultModActions,wsgOrderItem:wsgOrderItem},succeededCallback,failedCallback,userContext); },
ChangeItemQty:function(itemLineNumber,qty,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'ChangeItemQty',false,{itemLineNumber:itemLineNumber,qty:qty},succeededCallback,failedCallback,userContext); },
ChangeTargetPortionCount:function(targetPortions,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'ChangeTargetPortionCount',false,{targetPortions:targetPortions},succeededCallback,failedCallback,userContext); },
AddDefaultOrderLines:function(menuItemIds,itemIds,qtys,specialInstruction,recipientName,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'AddDefaultOrderLines',false,{menuItemIds:menuItemIds,itemIds:itemIds,qtys:qtys,specialInstruction:specialInstruction,recipientName:recipientName},succeededCallback,failedCallback,userContext); },
SetSiteId:function(siteId,feeId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'SetSiteId',false,{siteId:siteId,feeId:feeId},succeededCallback,failedCallback,userContext); },
GetSiteInfo:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetSiteInfo',false,{},succeededCallback,failedCallback,userContext); },
GetSiteList:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetSiteList',false,{},succeededCallback,failedCallback,userContext); },
GetCitySiteLocationsForState:function(state,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetCitySiteLocationsForState',false,{state:state},succeededCallback,failedCallback,userContext); },
GetNearbySites:function(lat,lng,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetNearbySites',false,{lat:lat,lng:lng},succeededCallback,failedCallback,userContext); },
AddressIsWithinDeliveryRangeOfSelectedSite:function(lat,lng,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'AddressIsWithinDeliveryRangeOfSelectedSite',false,{lat:lat,lng:lng},succeededCallback,failedCallback,userContext); },
GetSitePolygons:function(siteId,designId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetSitePolygons',false,{siteId:siteId,designId:designId},succeededCallback,failedCallback,userContext); },
GetSitePolygonsWithUserLocation:function(siteId,designId,lat,lng,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetSitePolygonsWithUserLocation',false,{siteId:siteId,designId:designId,lat:lat,lng:lng},succeededCallback,failedCallback,userContext); },
SetBrowseMenuOrderMode:function(orderMode,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'SetBrowseMenuOrderMode',false,{orderMode:orderMode},succeededCallback,failedCallback,userContext); },
SetOrderMode:function(orderMode,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'SetOrderMode',false,{orderMode:orderMode},succeededCallback,failedCallback,userContext); },
SendRequestForRewardsRedemption:function(order,lstCategoryIdsForItems,pxErrMsg,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'SendRequestForRewardsRedemption',false,{order:order,lstCategoryIdsForItems:lstCategoryIdsForItems,pxErrMsg:pxErrMsg},succeededCallback,failedCallback,userContext); },
SendRequestForLoyaltyPointsAccrual:function(order,lstCategoryIdsForItems,pxErrorMsg,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'SendRequestForLoyaltyPointsAccrual',false,{order:order,lstCategoryIdsForItems:lstCategoryIdsForItems,pxErrorMsg:pxErrorMsg},succeededCallback,failedCallback,userContext); },
VoidRequestForLoyaltyPointsAccrual:function(order,lstCategoryIdsForItems,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'VoidRequestForLoyaltyPointsAccrual',false,{order:order,lstCategoryIdsForItems:lstCategoryIdsForItems},succeededCallback,failedCallback,userContext); },
VoidRequestForLoyaltyRewards:function(order,lstCategoryIdsForItems,message,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'VoidRequestForLoyaltyRewards',false,{order:order,lstCategoryIdsForItems:lstCategoryIdsForItems,message:message},succeededCallback,failedCallback,userContext); },
GetGiftCardBalanceAndLoyaltyPoints:function(cardNumber,isGiftCard,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetGiftCardBalanceAndLoyaltyPoints',false,{cardNumber:cardNumber,isGiftCard:isGiftCard},succeededCallback,failedCallback,userContext); },
GetStoredValueBalance:function(cardNumber,cardPin,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetStoredValueBalance',false,{cardNumber:cardNumber,cardPin:cardPin},succeededCallback,failedCallback,userContext); },
GetGuestRewardsItemsForCustomer:function(loyaltyCardNumber,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetGuestRewardsItemsForCustomer',false,{loyaltyCardNumber:loyaltyCardNumber},succeededCallback,failedCallback,userContext); },
GetLoadMapResponse:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetLoadMapResponse',false,{},succeededCallback,failedCallback,userContext); },
GetWalletContentsForLoyaltyPoints:function(order,lstCategoryIdsForItems,bVoidRequest,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetWalletContentsForLoyaltyPoints',false,{order:order,lstCategoryIdsForItems:lstCategoryIdsForItems,bVoidRequest:bVoidRequest},succeededCallback,failedCallback,userContext); },
GetWalletContentsRewards:function(order,lstCategoryIdsForItems,loyaltyCardNumber,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetWalletContentsRewards',false,{order:order,lstCategoryIdsForItems:lstCategoryIdsForItems,loyaltyCardNumber:loyaltyCardNumber},succeededCallback,failedCallback,userContext); },
TenderOrderWithPaytronixGiftCard:function(giftcardNumber,tenderAmount,transactionAmount,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'TenderOrderWithPaytronixGiftCard',false,{giftcardNumber:giftcardNumber,tenderAmount:tenderAmount,transactionAmount:transactionAmount},succeededCallback,failedCallback,userContext); },
VoidTenderedOrderWithPaytronixGiftCard:function(giftcardNumber,tenderAmount,message,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'VoidTenderedOrderWithPaytronixGiftCard',false,{giftcardNumber:giftcardNumber,tenderAmount:tenderAmount,message:message},succeededCallback,failedCallback,userContext); }}
Radiant.AlohaOnline.OrderEntryService.registerClass('Radiant.AlohaOnline.OrderEntryService',Sys.Net.WebServiceProxy);
Radiant.AlohaOnline.OrderEntryService._staticInstance = new Radiant.AlohaOnline.OrderEntryService();
Radiant.AlohaOnline.OrderEntryService.set_path = function(value) { Radiant.AlohaOnline.OrderEntryService._staticInstance.set_path(value); }
Radiant.AlohaOnline.OrderEntryService.get_path = function() { return Radiant.AlohaOnline.OrderEntryService._staticInstance.get_path(); }
Radiant.AlohaOnline.OrderEntryService.set_timeout = function(value) { Radiant.AlohaOnline.OrderEntryService._staticInstance.set_timeout(value); }
Radiant.AlohaOnline.OrderEntryService.get_timeout = function() { return Radiant.AlohaOnline.OrderEntryService._staticInstance.get_timeout(); }
Radiant.AlohaOnline.OrderEntryService.set_defaultUserContext = function(value) { Radiant.AlohaOnline.OrderEntryService._staticInstance.set_defaultUserContext(value); }
Radiant.AlohaOnline.OrderEntryService.get_defaultUserContext = function() { return Radiant.AlohaOnline.OrderEntryService._staticInstance.get_defaultUserContext(); }
Radiant.AlohaOnline.OrderEntryService.set_defaultSucceededCallback = function(value) { Radiant.AlohaOnline.OrderEntryService._staticInstance.set_defaultSucceededCallback(value); }
Radiant.AlohaOnline.OrderEntryService.get_defaultSucceededCallback = function() { return Radiant.AlohaOnline.OrderEntryService._staticInstance.get_defaultSucceededCallback(); }
Radiant.AlohaOnline.OrderEntryService.set_defaultFailedCallback = function(value) { Radiant.AlohaOnline.OrderEntryService._staticInstance.set_defaultFailedCallback(value); }
Radiant.AlohaOnline.OrderEntryService.get_defaultFailedCallback = function() { return Radiant.AlohaOnline.OrderEntryService._staticInstance.get_defaultFailedCallback(); }
Radiant.AlohaOnline.OrderEntryService.set_enableJsonp = function(value) { Radiant.AlohaOnline.OrderEntryService._staticInstance.set_enableJsonp(value); }
Radiant.AlohaOnline.OrderEntryService.get_enableJsonp = function() { return Radiant.AlohaOnline.OrderEntryService._staticInstance.get_enableJsonp(); }
Radiant.AlohaOnline.OrderEntryService.set_jsonpCallbackParameter = function(value) { Radiant.AlohaOnline.OrderEntryService._staticInstance.set_jsonpCallbackParameter(value); }
Radiant.AlohaOnline.OrderEntryService.get_jsonpCallbackParameter = function() { return Radiant.AlohaOnline.OrderEntryService._staticInstance.get_jsonpCallbackParameter(); }
Radiant.AlohaOnline.OrderEntryService.set_path("/OrderEntryService.asmx");
Radiant.AlohaOnline.OrderEntryService.GetSiteMenu= function(onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetSiteMenu(onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetReadOnlyMenuItemsHtml= function(iSubMenuId,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetReadOnlyMenuItemsHtml(iSubMenuId,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.CheckIfPesIsEnabled= function(onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.CheckIfPesIsEnabled(onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetRewardPromotionIdAndName= function(onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetRewardPromotionIdAndName(onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetMenuItemsHtml= function(iSubMenuId,orderType,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetMenuItemsHtml(iSubMenuId,orderType,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetWebSalesGroupItemWithOptions= function(itemHeaderId,itemId,lineItemNumber,webSalesGroupId,mappings,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetWebSalesGroupItemWithOptions(itemHeaderId,itemId,lineItemNumber,webSalesGroupId,mappings,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetItemWithOptions= function(itemHeaderId,itemId,lineItemNumber,mappings,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetItemWithOptions(itemHeaderId,itemId,lineItemNumber,mappings,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetOrderUpsellItems= function(onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetOrderUpsellItems(onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetOrderAndSiteInfo= function(onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetOrderAndSiteInfo(onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetExistingOrderAndSiteInfo= function(allowCompletedOrder,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetExistingOrderAndSiteInfo(allowCompletedOrder,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetOrder= function(onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetOrder(onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.ValidateOrderMaximum= function(onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.ValidateOrderMaximum(onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.DeleteOrderLineItems= function(groupLineId,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.DeleteOrderLineItems(groupLineId,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.DeleteOrderLine= function(itemLineNumber,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.DeleteOrderLine(itemLineNumber,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.DeleteOrderLines= function(itemLineNumbers,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.DeleteOrderLines(itemLineNumbers,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.DeleteOrderTipAmount= function(onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.DeleteOrderTipAmount(onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.DeleteRecipientRow= function(recipientId,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.DeleteRecipientRow(recipientId,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.AddOrderLineItems= function(lstOrderLineItems,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.AddOrderLineItems(lstOrderLineItems,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.AddOrderLine= function(lineItemNumber,menuItemId,itemId,qty,specialInstruction,recipientName,modGrpIds,modIds,modQuantity,iModActions,modParentIndex,modSection1,modSection2,rolledUpModQty,iDefaultModActions,wsgOrderItem,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.AddOrderLine(lineItemNumber,menuItemId,itemId,qty,specialInstruction,recipientName,modGrpIds,modIds,modQuantity,iModActions,modParentIndex,modSection1,modSection2,rolledUpModQty,iDefaultModActions,wsgOrderItem,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.ChangeItemQty= function(itemLineNumber,qty,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.ChangeItemQty(itemLineNumber,qty,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.ChangeTargetPortionCount= function(targetPortions,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.ChangeTargetPortionCount(targetPortions,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.AddDefaultOrderLines= function(menuItemIds,itemIds,qtys,specialInstruction,recipientName,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.AddDefaultOrderLines(menuItemIds,itemIds,qtys,specialInstruction,recipientName,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.SetSiteId= function(siteId,feeId,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.SetSiteId(siteId,feeId,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetSiteInfo= function(onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetSiteInfo(onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetSiteList= function(onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetSiteList(onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetCitySiteLocationsForState= function(state,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetCitySiteLocationsForState(state,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetNearbySites= function(lat,lng,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetNearbySites(lat,lng,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.AddressIsWithinDeliveryRangeOfSelectedSite= function(lat,lng,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.AddressIsWithinDeliveryRangeOfSelectedSite(lat,lng,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetSitePolygons= function(siteId,designId,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetSitePolygons(siteId,designId,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetSitePolygonsWithUserLocation= function(siteId,designId,lat,lng,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetSitePolygonsWithUserLocation(siteId,designId,lat,lng,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.SetBrowseMenuOrderMode= function(orderMode,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.SetBrowseMenuOrderMode(orderMode,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.SetOrderMode= function(orderMode,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.SetOrderMode(orderMode,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.SendRequestForRewardsRedemption= function(order,lstCategoryIdsForItems,pxErrMsg,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.SendRequestForRewardsRedemption(order,lstCategoryIdsForItems,pxErrMsg,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.SendRequestForLoyaltyPointsAccrual= function(order,lstCategoryIdsForItems,pxErrorMsg,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.SendRequestForLoyaltyPointsAccrual(order,lstCategoryIdsForItems,pxErrorMsg,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.VoidRequestForLoyaltyPointsAccrual= function(order,lstCategoryIdsForItems,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.VoidRequestForLoyaltyPointsAccrual(order,lstCategoryIdsForItems,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.VoidRequestForLoyaltyRewards= function(order,lstCategoryIdsForItems,message,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.VoidRequestForLoyaltyRewards(order,lstCategoryIdsForItems,message,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetGiftCardBalanceAndLoyaltyPoints= function(cardNumber,isGiftCard,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetGiftCardBalanceAndLoyaltyPoints(cardNumber,isGiftCard,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetStoredValueBalance= function(cardNumber,cardPin,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetStoredValueBalance(cardNumber,cardPin,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetGuestRewardsItemsForCustomer= function(loyaltyCardNumber,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetGuestRewardsItemsForCustomer(loyaltyCardNumber,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetLoadMapResponse= function(onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetLoadMapResponse(onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetWalletContentsForLoyaltyPoints= function(order,lstCategoryIdsForItems,bVoidRequest,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetWalletContentsForLoyaltyPoints(order,lstCategoryIdsForItems,bVoidRequest,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.GetWalletContentsRewards= function(order,lstCategoryIdsForItems,loyaltyCardNumber,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.GetWalletContentsRewards(order,lstCategoryIdsForItems,loyaltyCardNumber,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.TenderOrderWithPaytronixGiftCard= function(giftcardNumber,tenderAmount,transactionAmount,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.TenderOrderWithPaytronixGiftCard(giftcardNumber,tenderAmount,transactionAmount,onSuccess,onFailed,userContext); }
Radiant.AlohaOnline.OrderEntryService.VoidTenderedOrderWithPaytronixGiftCard= function(giftcardNumber,tenderAmount,message,onSuccess,onFailed,userContext) {Radiant.AlohaOnline.OrderEntryService._staticInstance.VoidTenderedOrderWithPaytronixGiftCard(giftcardNumber,tenderAmount,message,onSuccess,onFailed,userContext); }
var gtc = Sys.Net.WebServiceProxy._generateTypedConstructor;
Type.registerNamespace('Radiant.Order.Shared.Contracts.ServiceEntities');
if (typeof(Radiant.Order.Shared.Contracts.ServiceEntities.Order) === 'undefined') {
Radiant.Order.Shared.Contracts.ServiceEntities.Order=gtc("Radiant.Order.Shared.Contracts.ServiceEntities.Order");
Radiant.Order.Shared.Contracts.ServiceEntities.Order.registerClass('Radiant.Order.Shared.Contracts.ServiceEntities.Order');
}
if (typeof(Radiant.Order.Shared.Contracts.ServiceEntities.ItemHeader) === 'undefined') {
Radiant.Order.Shared.Contracts.ServiceEntities.ItemHeader=gtc("Radiant.Order.Shared.Contracts.ServiceEntities.ItemHeader");
Radiant.Order.Shared.Contracts.ServiceEntities.ItemHeader.registerClass('Radiant.Order.Shared.Contracts.ServiceEntities.ItemHeader');
}
Type.registerNamespace('Radiant.Order.Web.Order.CodeFiles.OrderEntryResults');
if (typeof(Radiant.Order.Web.Order.CodeFiles.OrderEntryResults.OrderEntryResult) === 'undefined') {
Radiant.Order.Web.Order.CodeFiles.OrderEntryResults.OrderEntryResult=gtc("Radiant.Order.Web.Order.CodeFiles.OrderEntryResults.OrderEntryResult");
Radiant.Order.Web.Order.CodeFiles.OrderEntryResults.OrderEntryResult.registerClass('Radiant.Order.Web.Order.CodeFiles.OrderEntryResults.OrderEntryResult');
}
if (typeof(Radiant.Order.Web.Order.CodeFiles.OrderEntryResults.BooleanResult) === 'undefined') {
Radiant.Order.Web.Order.CodeFiles.OrderEntryResults.BooleanResult=gtc("Radiant.Order.Web.Order.CodeFiles.OrderEntryResults.BooleanResult");
Radiant.Order.Web.Order.CodeFiles.OrderEntryResults.BooleanResult.registerClass('Radiant.Order.Web.Order.CodeFiles.OrderEntryResults.BooleanResult');
}
if (typeof(Radiant.Order.Shared.Contracts.ServiceEntities.OrderWebSalesGroupLineItem) === 'undefined') {
Radiant.Order.Shared.Contracts.ServiceEntities.OrderWebSalesGroupLineItem=gtc("Radiant.Order.Shared.Contracts.ServiceEntities.OrderWebSalesGroupLineItem");
Radiant.Order.Shared.Contracts.ServiceEntities.OrderWebSalesGroupLineItem.registerClass('Radiant.Order.Shared.Contracts.ServiceEntities.OrderWebSalesGroupLineItem');
}
if (typeof(Radiant.AlohaOnline.SetSiteIdResult) === 'undefined') {
Radiant.AlohaOnline.SetSiteIdResult=gtc("Radiant.AlohaOnline.SetSiteIdResult");
Radiant.AlohaOnline.SetSiteIdResult.registerClass('Radiant.AlohaOnline.SetSiteIdResult');
}
if (typeof(Radiant.Order.Shared.Contracts.ServiceEntities.Site) === 'undefined') {
Radiant.Order.Shared.Contracts.ServiceEntities.Site=gtc("Radiant.Order.Shared.Contracts.ServiceEntities.Site");
Radiant.Order.Shared.Contracts.ServiceEntities.Site.registerClass('Radiant.Order.Shared.Contracts.ServiceEntities.Site');
}
if (typeof(Radiant.Order.Shared.Contracts.ServiceEntities.NearbySite) === 'undefined') {
Radiant.Order.Shared.Contracts.ServiceEntities.NearbySite=gtc("Radiant.Order.Shared.Contracts.ServiceEntities.NearbySite");
Radiant.Order.Shared.Contracts.ServiceEntities.NearbySite.registerClass('Radiant.Order.Shared.Contracts.ServiceEntities.NearbySite');
}
if (typeof(Radiant.Order.Shared.Contracts.ServiceEntities.JsonPolygonList) === 'undefined') {
Radiant.Order.Shared.Contracts.ServiceEntities.JsonPolygonList=gtc("Radiant.Order.Shared.Contracts.ServiceEntities.JsonPolygonList");
Radiant.Order.Shared.Contracts.ServiceEntities.JsonPolygonList.registerClass('Radiant.Order.Shared.Contracts.ServiceEntities.JsonPolygonList');
}
if (typeof(Radiant.Order.Shared.Contracts.ServiceEntities.CardBalance) === 'undefined') {
Radiant.Order.Shared.Contracts.ServiceEntities.CardBalance=gtc("Radiant.Order.Shared.Contracts.ServiceEntities.CardBalance");
Radiant.Order.Shared.Contracts.ServiceEntities.CardBalance.registerClass('Radiant.Order.Shared.Contracts.ServiceEntities.CardBalance');
}
if (typeof(Radiant.Order.Shared.Contracts.ServiceEntities.LoadMapResponse) === 'undefined') {
Radiant.Order.Shared.Contracts.ServiceEntities.LoadMapResponse=gtc("Radiant.Order.Shared.Contracts.ServiceEntities.LoadMapResponse");
Radiant.Order.Shared.Contracts.ServiceEntities.LoadMapResponse.registerClass('Radiant.Order.Shared.Contracts.ServiceEntities.LoadMapResponse');
}
if (typeof(Radiant.Order.Shared.Contracts.ServiceEntities.walletcontent) === 'undefined') {
Radiant.Order.Shared.Contracts.ServiceEntities.walletcontent=gtc("Radiant.Order.Shared.Contracts.ServiceEntities.walletcontent");
Radiant.Order.Shared.Contracts.ServiceEntities.walletcontent.registerClass('Radiant.Order.Shared.Contracts.ServiceEntities.walletcontent');
}
if (typeof(Radiant.Order.Shared.Contracts.ServiceEntities.OrderType) === 'undefined') {
Radiant.Order.Shared.Contracts.ServiceEntities.OrderType = function() { throw Error.invalidOperation(); }
Radiant.Order.Shared.Contracts.ServiceEntities.OrderType.prototype = {Individual: 1,GroupOrderOrganizer: 2,GroupOrderInvitee: 3,CallCenter: 4,GroupOrderByName: 5,PortionAssistant: 6,RestaurantPortal: 7}
Radiant.Order.Shared.Contracts.ServiceEntities.OrderType.registerEnum('Radiant.Order.Shared.Contracts.ServiceEntities.OrderType', true);
}
