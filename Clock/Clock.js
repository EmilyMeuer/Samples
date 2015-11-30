"use strict";
/*
	Emily Meuer
	03/26/2015
	CISC 131

	Displays a working clock.
	* Ad maiorem Dei gloriam *
*/

//
window.onload = function()
{
  hours.style.color   = getRandomRGB();
  minutes.style.color   = getRandomRGB();

  updateClock();
  window.setInterval(updateClock, 1000);
};

function updateClock()
{
  
  var now;
  now = new Date();
  
  hours.innerHTML 	= now.getHours();
  minutes.innerHTML	= padWithZeroCharacters(now.getMinutes());
  seconds.innerHTML	= padWithZeroCharacters(now.getSeconds());
  
  randomClockColors();
}	// updateClock

function padWithZeroCharacters(source)
{
  source = "0" + source;
  return source.substring(source.length - 2);
}	// padWithZeroCharacters

function getRandomInteger(upperLimit)
{
  var result;
  result = Math.floor(Math.random() * (upperLimit + 1));
  return result;
}	// getRandomInteger

function getRandomRGB()
{
  var red;
  var green;
  var blue;
  var result;
  
  red = getRandomInteger(255);
  green = getRandomInteger(255);
  blue = getRandomInteger(255);
  
  result = "rgb(" + red + ", " + green + ", " + blue + ")";
  return result;
} // getRandomRGB

function randomClockColors()
{
  seconds.style.color  = getRandomRGB();
  
  if(seconds.innerHTML === "00")
  { minutes.style.color = getRandomRGB(); }
  
  if((minutes.innerHTML === "00") && (seconds.innerHTML === "00"))
  { hours.style.color = getRandomRGB(); }
} // randomClockColors