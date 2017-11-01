//some variables
var pwidth;
var pheight;
var backgroundCount = 0;
var timer = 60; //seconds

var newImage = new Image();





//when the document has loaded
$(document).ready(function(){

	//some preconfig, getting the browser container details also setting the fadingout the options
	//also setting the timer.
	$(".topOver").fadeOut();
	$("#mainImage").fadeIn(100);
	document.getElementById('timer').value = timer;
	pwidth = $(window).width();
	pheight = $(window).height();
	$('#allContent').mouseleave(showDetailsEnd);



	//the timer
	changeImage();

	//when the window is resized, it will update the width and height
	$(window).resize(function(){
		pwidth = $(window).width();
		pheight = $(window).height();
	});
});

// stert loading the new image
function changeImage()
{
	var blurStr = (document.getElementById('blur').checked) ? '&blur' : '';
	newImage.src = 'https://unsplash.it/' + pwidth + '/' + pheight + '/?random' + blurStr + '&' + backgroundCount;
	backgroundCount++;
}

// now that the new image is loaded, fade out the current one
newImage.onload = function() {
	$("#mainImage").fadeOut(1000, switchPic);

}

// now that the current image has been faded out, load in the new one
function switchPic(){
	$("#mainImage").attr('src', newImage.src);
	$("#mainImage").fadeIn(1000, restartTimer);
}

//when hovering over an image show the details.
function showDetails()
{
	$(".topOver").fadeIn();
}


//when not hovering over an image hide details.
function showDetailsEnd()
{
	$(".topOver").fadeOut();
}

//when the timer is changed, set the new timer variable to what the user has entered, no input validation though
function setTimer()
{
	var value = document.getElementById('timer').value;
	timer = value;
}

//basically to start the timer for the clock
function restartTimer()
{
	timePrompt = setTimeout(function(){
		changeImage();
	}, timer*1000);
}

function imageClicked()
{
	// prevent race condition. 60 second timeout
	timePrompt = setTimeout(function(){
		changeImage();
	}, 60*1000);
	changeImage();
}
