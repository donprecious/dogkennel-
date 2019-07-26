$( window ).ready(function() {
	
	// Add analytics
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  	ga('create', 'UA-33780535-1', 'auto');
  	ga('send', 'pageview');
	
	//Initialize burger menu click events.
	$('.cell-menu').click(function() {
		$('.burger').addClass('over');
	});
	$('.cell-x').click(function() {
		$('.burger').removeClass('over');
	});
	
	//Initialize flex slider
	$('.feat-content').flexslider({
    	animation: "slide",
		slideshow: false,
		controlNav: false,
		controlsContainer: $(".dots-cont"),
    	customDirectionNav: $(".c-nav a"),
		smoothHeight: false
  	});
	
	$('.loc-content').flexslider({
    	animation: "slide",
		slideshow: true,
		controlNav: false,
		animationLoop: true,
  	});
	
	$('.frch-switcher').flexslider({
    	animation: "slide",
		slideshow: true,
		controlNav: false,
  	});
	
	$('.w-frch-head').flexslider({
    	animation: "slide",
		slideshow: false,
		controlNav: false,
		controlsContainer: $(".dots-cont"),
    	customDirectionNav: $(".wjb-nav a"),
		smoothHeight: false
  	});
	
	// Animate the initial scrolling.
	var allments = $('.page-template-page-franchiseres .os-content h1, .page-template-page-franchise-form .os-content h1');
	  if ( allments.length ) {
		// Handler for .ready() called.
		$('html, body').animate({
			scrollTop: allments.offset().top
		}, 600);
	  }
});// JavaScript Document