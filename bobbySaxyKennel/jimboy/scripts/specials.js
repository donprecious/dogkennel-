		$(window).ready(function() {
			$(".the-pohp, .the-pohp2, .the-pohp3, .the-pohp4, .the-pohp5, .the-pohp6, .the-pohp7, .the-pohp8").click(function(){
			  if ($(this).css('display') == 'flex') {
					$(this).addClass("hidden");
				} 
			});
			$("#pohp4").click(function(e){
				var abWindow = $(".the-pohp4");
				
				if (abWindow.hasClass("hidden")) {
					abWindow.removeClass("hidden");
				} 
			});
			$(".hide-x").click(function(){
				$(".the-pohp4").addClass("hidden");
			});
			$("#pohp3").click(function(e){
				var abWindow = $(".the-pohp3");
				
				if (abWindow.hasClass("hidden")) {
					abWindow.removeClass("hidden");
				} 
			});
			$(".hide-x").click(function(){
				$(".the-pohp3").addClass("hidden");
			});
$("#pohp10").click(function(e){
				var abWindow = $(".the-pohp10");
				
				if (abWindow.hasClass("hidden")) {
					abWindow.removeClass("hidden");
				} 
			});
			$(".hide-x").click(function(){
				$(".the-pohp10").addClass("hidden");
			});
			$("#pohp2").click(function(e){
				var abWindow = $(".the-pohp2");
				
				if (abWindow.hasClass("hidden")) {
					abWindow.removeClass("hidden");
				} 
			});
			$(".hide-x").click(function(){
				$(".the-pohp2").addClass("hidden");
			});
			$("#pohp").click(function(e){
				var abWindow = $(".the-pohp");
				
				if (abWindow.hasClass("hidden")) {
					abWindow.removeClass("hidden");
				} 
			});
			$(".hide-x").click(function(){
				$(".the-pohp").addClass("hidden");
			});
			$("#pohp5").click(function(e){
				var abWindow = $(".the-pohp5");
				
				if (abWindow.hasClass("hidden")) {
					abWindow.removeClass("hidden");
				} 
			});
			$(".hide-x").click(function(){
				$(".the-pohp5").addClass("hidden");
			});
			$("#pohp6").click(function(e){
				var abWindow = $(".the-pohp6");
				
				if (abWindow.hasClass("hidden")) {
					abWindow.removeClass("hidden");
				} 
			});
			$(".hide-x").click(function(){
				$(".the-pohp6").addClass("hidden");
			});
			$("#pohp7").click(function(e){
				var abWindow = $(".the-pohp7");
				
				if (abWindow.hasClass("hidden")) {
					abWindow.removeClass("hidden");
				} 
			});
			$(".hide-x").click(function(){
				$(".the-pohp7").addClass("hidden");
			});
			$("#pohp8").click(function(e){
				var abWindow = $(".the-pohp8");
				
				if (abWindow.hasClass("hidden")) {
					abWindow.removeClass("hidden");
				} 
			});
			$(".hide-x").click(function(){
				$(".the-pohp8").addClass("hidden");
			});
		});
		
$( document ).ready(function() {
	if ($(window).width() < 840) {
      $(".frch-star-fstmenu ul").hide();

      $(".frch-star-fstmenu h4").click(function(e){
          $(this).next('ul').toggle();
      });
    } else if ($(window).width() > 840) {
    	$(".frch-star-fstmenu ul").show();
    }
});