$( document ).ready(function() {
	//re-grow slider
    $(window).resize(function() {
		var footertip = $('.site-footer').height() - 30;
    	$('.home-size').height($(window).height() - footertip);
		$('.home-size-2').height($(window).height()/ 1.75 - footertip);
		$('.new-ingrid').height($('.home-size-2').height() + 100);
		if ($(window).width() <= 1080) {
		 //re-grow slider height
			$('.home-size').height($(window).height()/ 2);
			$('.copy-footer').height($('.site-footer').height()/ 2.6)
    	}
		if ($(window).width() <= 840) {
		 //re-grow slider height
			$('.home-size').height($(window).height()/ 2.8);
			$('.home-size-2').height($(window).height()/ 2.8);
			$('.new-ingrid').height(380);
			//$('.copy-footer').height($('.site-footer').height()/ 2.6)
    	}
	});
	$(window).trigger('resize');
	 
	 //re-grow grid height
	 $(window).resize(function() {
        var bodyheight = $('.home-size').height();
		var headerheight = $('.site-header').height();
        $('.grid').css('padding-top', headerheight);

	$('.bot_holder').css('height', $('.home-size').height()+'px');
	$('.top-sizer').css('height', $('#masthead').height()+'px');
	$('.footer-sizer').css('height', $('.site-footer').height() - 35);
	var thumbheight = $('.home-size').height() / 2;
	var halffooter = $('.site-footer').height() / 4;
	$('.image-cover').css('padding-bottom', thumbheight - halffooter);

    }).resize();
	
	//tab switcher
	$('ul.trad-tabz li').click(function(){
	var tab_id = $(this).attr('data-tab');

	$('ul.trad-tabz li').removeClass('current');
	$('.tabzz-content').removeClass('current');

	$(this).addClass('current');
	$("#"+tab_id).addClass('current');
	});
	
	var hash = $.trim( window.location.hash );

    if (hash) $('ul.trad-tabz li[href$="'+hash+'"]').trigger('click');
	
	$(window).load(function() {
    $('.loc-content').flexslider();
    $(window).trigger('resize');
	});
});