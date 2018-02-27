"use strict";
/*
	Emily Meuer
	05/10/2015
	CISC 131

	Conway's Game of Life
	* AMDG *
*/

var liveColor;
var deadColor;

window.onload = function()
{
	var element;
	var gameBoardArray;
	var generationCount;
	var generationElement;
	var id;
	var stop;
	var tempArray;

	gameBoardArray = create2dArray(75, 75, getDeadValue());
	tempArray = copy(gameBoardArray);

	createGameBoard(document.getElementById('gameBoard'), gameBoardArray);
	createFirstGeneration(gameBoardArray);

    setColor(gameBoardArray);

	generationCount = 0;
	generationElement = document.getElementById("generation");
	
	//window.alert("haven't started it yet.");

//	stop = false;

//	while(!stop)
//	{
		window.setInterval(function()
						  {
							  document.onclick = function() {stop = true;	}
							  setLiveColor(getRandomRGB());
							  setDeadColor(getRandomRGB());
							  applyRules(gameBoardArray, tempArray);
							  generationElement.innerHTML = "Generation: " + generationCount;
							  generationCount++;
					  }, 1000);
//	} // while
};

function setDeadColor(color)
{	deadColor = color;	}

function getDeadColor ()
{	return deadColor;	}

function setLiveColor (color)
{	liveColor = color;	}

function getLiveColor ()
{	return liveColor;	}

function getDeadValue ()
{	return "0";	}

function getLiveValue ()
{	return "1";	}

function isAlive ( cell )
{	return ( cell === getLiveValue() );	}

function applyRules (array2d, tmpArray)
{
	var element;
	var id;

	for ( var i = 0; i < array2d.length; i++ )
    {
        for ( var j = 0; j < array2d[i].length; j++ )
        {
        	id = "r" + [i] + "c" + [j];
        	element = document.getElementById(id);
            tmpArray[i][j] = countLivingNeighborsOf(array2d, i, j);
        } // for (j)
    } // for (i)

    for ( i = 0; i < array2d.length; i++ )
    {
        for ( j = 0; j < array2d[i].length; j++ )
        {
            if ((tmpArray[i][j] < 2) || (tmpArray[i][j] > 3))
            {	array2d[i][j] = getDeadValue();	}
            else
            {	array2d[i][j] = getLiveValue();	}
        } // for (j)
    } // for (i)

    setColor(array2d);
} // applyRules

function countLivingNeighborsOf (array2d, row, col)
{
    // neighbors: [i-1][j-1],   [i-1][j],   [i-1][j+1]
    //            [i][j-1],                 [i][j+1]
    //            [i+1][j-1],   [i+1][j],   [i+1][j+1]

    var count;
    count = 0;

    for ( var k = -1; k < 2; k++ )
    {
        for ( var l = -1; l < 2; l++)
        {
            if ( isInArray(array2d, row, col) &&
                 isInArray(array2d, (row + k), (col + l)) &&
                 !(k === 0 && l === 0) )
            {
                if (isAlive(array2d[row+k][col+l]))
                {   count++;    }
            } // if (isInArray)
        } // for (l)
    } // for (k)

    return count;
} // countLivingNeighborsOf

function setColor ( array2d )
{
	var element;
	var id;

	for (var i = 0; i < array2d.length; i++)
	{
		for (var j = 0; j < array2d[i].length; j++)
		{
			id = "r" + [i] + "c" + [j];
			element = document.getElementById(id);

			if (isAlive(array2d[i][j]))
			{	element.style.backgroundColor = getLiveColor();	}
			else
			{	element.style.backgroundColor = getDeadColor();	}
		} // for (j)
	} // for (i)
} // setColor

function createFirstGeneration ( array2d )
{
	var col;
	var i;
	var j;
	var k;
	var row;
	var values;

	values = [getLiveValue(), getDeadValue()];

	for (i = 0; i<array2d.length; i++)
	{
		for (j = 0; j<array2d[i].length; j++)
		{
			if( i === j || i === j || (i+j)%2===0 )
			{   array2d[i][j] = getLiveValue(); }

			// Random first generation:
			// array2d[i][j] = values[getRandomInteger(1)];
		} // for (j)
	} // for (i)
} // createFirstGeneration

function createGameBoard ( containerElement, array2d )
{
	var classInfo;
	var id;
	var html;

	classInfo = "cell";
	html = "";

	for ( var i = 0; i < array2d.length; i++ )
	{
		classInfo = classInfo + " newRow";
		for ( var j = 0; j < array2d[i].length; j++ )
		{
			if ( i === 0 )
			{	classInfo = classInfo + " firstRow";	}

			if ( j === array2d[i].length - 1 )
			{	classInfo = classInfo + " lastColumn";	}

			id = "r" + [i] + "c" + [j];

			html = html + createHTMLelement("div", id, classInfo, null) + "\n";

			classInfo = "cell";
		} // for (j)
	} // for (i)

	containerElement.innerHTML = html;
} // createGameBoard

function copy ( twoDimensionArray )
{
    var countRows;
    var countColumns;
    var result;

    countRows = 0;

    for ( var i = 0; i < twoDimensionArray.length; i++)
    {
        countRows = countRows + 1;
    } // for (i)

    result = new Array(countRows);

    for ( i = 0; i < twoDimensionArray.length; i++ )
    {
        countColumns = 0;

        for ( var j = 0; j < twoDimensionArray[i].length; j++ )
        {
            countColumns = countColumns + 1;
        } // for (j)

        result[i] = new Array(countColumns);
    } // for (i)

    for ( i = 0; i < twoDimensionArray.length; i++ )
    {
        for ( j = 0; j < twoDimensionArray[i].length; j++ )
        {
            result[i][j] = twoDimensionArray[i][j];
        } // for (j)
    } // for (i)

    return result;
} // copy

function create2dArray ( rows, columns, initialValue )
{
	var result;

	if ( ( rows >= 0 ) && ( columns >= 0 ) )
	{
		result = new Array(rows);

		for ( var i = 0; i < rows; i++ )
		{
			for ( var j = 0; j < columns; j++ )
			{
				result[i] = new Array(columns);
			} // for (j)
		} // for (i)

		for ( i = 0; i < rows; i++ )
		{
			for ( j = 0; j < columns; j++ )
			{
				result[i][j] = initialValue;
			} // for (j)
		} // for (i)
	}
	else
	{
		window.alert("Those parameters are not valid.");
		result = null;
	}

	return result;
} // create2dArray

function createHTMLelement(elementType, id, classInfo, content)
{
	// requires trim(data) function
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

  	red = getRandomInteger(255);
  	green = getRandomInteger(255);
  	blue = getRandomInteger(255);

  	result = "rgb(" + red + ", " + green + ", " + blue + ")";
  	return result;
} 	// getRandomRGB

function trim(data)
{
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

function isInArray ( array2d, row, col )
{
	return ( ( row >= 0 ) &&
			 ( row < array2d.length) &&
			 ( col >= 0 ) &&
			 ( col < array2d[0].length ) );
}