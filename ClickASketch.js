"use strict";
/*
	Emily Meuer
	04/27/2015
	CISC 131

	"Click-A-Sketch" drawing program which allows the user to choose "brush"
  and "canvas" colors and draw colorful designs.
	* AMDG *
*/

var applyColor;		// global variable that controls whether the boxes under the mouse should be colored.

window.onload = function()
{
	var brush;
	var brushColorPalette;
	var colors;
	var element;
	var i;

	colors = ["#D2ED9E", "#7A9E35", "#26596A", "#8A2E60", "#804C15", "#552C00"];

	createColorChoice ("brushColorPalette", "brush", colors, updateCurrentColor);
	createColorChoice ("canvasColorPalette", "canvas", colors, updateCanvasColor);

	createDrawingArea ("box", 21, 30, "box", "newRowBox")

	setColoringMode (false)

	for(i = 0; i < countElements("box"); i ++)
	{
		element = document.getElementById("box" + i)
		element.onmouseover = function ()
							  {
								  if (coloringIsTurnedOn())
								  {	colorTheBox(this, currentColor.style.backgroundColor)}
							  };
		element.onclick = function ()
						  {
							  setColoringMode(!coloringIsTurnedOn());
							  if (coloringIsTurnedOn())
							  {	colorTheBox(this, currentColor.style.backgroundColor)}
						  };
	} // for
};

function setColoringMode (bool)
{
	// mutator function for the global variable "applyColor"

	applyColor = bool;
} // setColoringMode

function coloringIsTurnedOn ()
{
	// accessor function for the global variable "applyColor"

	return applyColor;
} // coloringIsTurnedOn

function colorTheBox (box, color)
{	box.style.backgroundColor = color;	}

function createDrawingArea (boxIdPrefix, canvasRows, canvasColumns, boxClass, newRowClass)
{
	// Fills canvas with small boxes

	var classInfo;
	var count;
	var html;
	var i;
	var j;

	count = 0;
	html = "";

	for(i = 0; i < canvasRows; i ++)
	{
		classInfo = boxClass + " " + newRowClass;
		j = 0;

		for(; j < canvasColumns; j ++)
		{
			html = html + createHTMLelement("div", boxIdPrefix + ((i * 30) + j), classInfo, null) + "\n";
			classInfo = boxClass;
			count = count + 1;
		} // for - j
	} // for - i

	canvas.innerHTML = html;
} // createDrawingArea

function setColorChoice ()
{
	// Allows the user to modify the brush and canvas colors
	var color;

	color = window.prompt("Please enter a color:", this.style.backgroundColor);
	if (color !== null && color.length > 0)
	{	this.style.backgroundColor = color;	}
} // setColorChoice

function updateCurrentColor()
{ document.getElementById("currentColor").style.backgroundColor = this.style.backgroundColor;}

function updateCanvasColor()
{ document.getElementById("canvas").style.backgroundColor = this.style.backgroundColor;}

function createColorChoice (containerId, idPrefix, colorNamesArray, onmouseoverFunction)
{
	// Creates and colors the brush and palette color choice boxes
	var container;
	var i;
	var element;
	var html;

	html = "";

	for (i = 0; i < colorNamesArray.length; i++)
	{
		html = html + createHTMLelement("div", idPrefix + i, "colorChoices", null);
	}

	container = document.getElementById(containerId);
	container.innerHTML = html;

	for (i = 0; i < colorNamesArray.length; i++)
	{
		element = document.getElementById(idPrefix + i);
		element.style.backgroundColor = colorNamesArray[i];
		element.onmouseover = onmouseoverFunction;
		element.onclick = setColorChoice;
	}
} // createColorChoice

function createHTMLelement(elementType, id, classInfo, content)
{
	if(elementType === null) {elementType = "";}
	if(id === null)   { id = "";  }
	if(classInfo === null)   {classInfo = "";}
	if(content === null) 	 {content = "";}

	elementType = trim(elementType);
	id = trim(id);
	classInfo = trim(classInfo);

	if(id.length > 0)
	{
	  id = ' id="' + id + '"';
	}

	if(classInfo.length > 0)
	{
	  classInfo = ' class="' + classInfo + '"';
	}

	return '<' + elementType +
		   id + classInfo +
		   '>' + content +
		   '</' + elementType + '>';
} // createHTMLelement

function countElements(idPrefix)
{
	var count;
	var element;
	var i;

	count = 0;
	i = 0;
	element = document.getElementById(idPrefix + i);

	while(element !== null)
	{
		count = count + 1;
		i = i + 1;
		element = document.getElementById(idPrefix + i);
	}
	return count;
}

function getRandomInteger(upperLimit)
{
	return Math.floor(Math.random() * (upperLimit + 1));
}	// getRandomInteger

function getRandomRGB()
{
	var red;
	var green;
	var blue;
	var result;

	result = "rgb(" + getRandomInteger(255) + ", " + getRandomInteger(255) +
	          ", " + getRandomInteger(255) + ")";
	return result;
} // getRandomRGB

function trim(data)
{
    // Removes leading and trailing whitespace
	if(typeof data === "string")
	{
		var end;
		var result;
		var start;
		var whitespace;

		whitespace = " \n\r\t\f";
		start = 0;

		while(start < data.length &&
			 (whitespace.indexOf(data.charAt(start)) >= 0) )
		{	start = start + 1;	}

		end = data.length - 1;

		while(end >= 0 &&
			 (whitespace.indexOf(data.charAt(end)) >= 0) )
		{	end = end - 1;	}

		if(end < start)
		{	result = "";	}
		else
		{	result = data.substring(start, (end + 1));	}

		return result;
	}
	else
	{	return data;	}
} // function trim(data)
