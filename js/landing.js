/* Author:

*/


$(document).ready(function() {
//$('#nav').localScroll(800);
	
	RepositionNav();
	
	$(window).resize(function(){
		RepositionNav();
	});	
	
	//.parallax(xPosition, adjuster, inertia, outerHeight) options:
	//xPosition - Horizontal position of the element
	//adjuster - y position to start from
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	$('#intro').parallax("50%", 0, 0.1, true);
	$('#second').parallax("25%", 2800, 0.1, true);
	$('#fourth').parallax("5%", 3900, 0.6, true);
	

  var deck = new $.scrolldeck({
  	slides: '.slide',
		buttons: '#nav li a',
		easing: 'easeInOutExpo'
  });
});




