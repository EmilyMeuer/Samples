"use strict";
/*
	Emily Meuer
	03/24/2015
	CISC 131

  	Tic-Tac-Toe game.
  	Ad maiorem Dei gloriam!
*/

var boardState;
//  A string keeping track of which square contains which mark.

var markCount;
//	An integer keeping track of the number of turns.

var winningCombinations;
//  A string containing all possible combinations of winning square numbers.

window.onload = function()
{
    setBoardState("012 345 678 036 147 258 246 048");
    setWinningCombinations("012 345 678 036 147 258 246 048");
	  setMarkCount(0);

  	var element;          // stores the html div element
 	  var elementId;        // contains the id of the div element
  	var i;                // both a counter and numerical suffix for div elements

  	i = 0;

  	while(i < 9)
  	{
    	elementId = "square" + i;
    	element = document.getElementById(elementId);
      element.onclick = markTheSquare;
    	i = i + 1;
  	}

  	getXorO();

  	// turn off selection
    document.onselectstart = function() { return false; };  // ie
    document.onmousedown   = function() { return false; };  // mozilla

}; // window.onload function

function markTheSquare()
{
  	// Marks the square with either an "X" or an "O", depending on the turn.
  	var boardState;
  	var elementId;
  	var foundAt;
  	var i;
  	var nullAll;
  	var playerMark;
  	var winningCombinations;

	this.onclick = null;
  	this.innerHTML = getXorO();

  	updateBoardState(getXorO(),this.id.charAt(6));  // current mark and square number

  	playerMark = getXorO() + getXorO() + getXorO();
  	boardState = getBoardState();
  	winningCombinations = getWinningCombinations();

  	foundAt = boardState.indexOf(playerMark);

  	// set the variable i to 9 if the value of foundAt < 0
  	// and to 0 if foundAt >= 0.

  	nullAll = Math.min((Math.abs(Math.min(foundAt, 0))),(Math.max(foundAt,1)));
  	// left: equal to 0 when foundAt >= 0.
  	// left: equal to +foundAt when foundAt < 0
  	// right: equal to 1 when foundAt < 1
  	// right: equal to foundAt when foundAt > 1

  	i = 0 + (9 * nullAll);

  	while(i < 9)
  	{
  	  document.getElementById("square" + i).onclick = null;
  	  i = i + 1;
  	}

  	while(foundAt >= 0)
  	{
  	  i = 0;

  	  while(i < 3)
  	  {
  	    elementId = this.id.substring(0,(this.id.length - 1)) +
  	    winningCombinations.charAt(foundAt + i);

  	    // how to use .id in the following line?
  	    document.getElementById(elementId).style.color = "red";

  	    i = i + 1;
  	  }

  	  foundAt = boardState.indexOf(playerMark, foundAt + 1);
  	}

	  setMarkCount(getMarkCount()+1);
} // markTheSquare

function getXorO()
{
	// returns an "X" every even turn and an "O" every odd turn.
  	return "XO".charAt(getMarkCount() % 2);

} // get XorO

function replaceCharacterInString(source, where, what)
{
	var result;
	result = source.substring(0,where);
	result = result + what;
	result = result + source.substring((where+1),source.length);

	return result;
}

function updateBoardState(mark,squareNum)
{
  	// replaces each ocurrence of the given square number in "boardState"
  	// with "mark" (either "X" or "O").

  	var boardState;
  	var location;
 	var winners;

 	boardState = getBoardState();
 	winners = getWinningCombinations();
 	location = winners.indexOf(squareNum);

  	while(location >= 0)
  	{
  		boardState = replaceCharacterInString(boardState, location, mark);
		location = winners.indexOf(squareNum, (location + 1));
  	}

  	setBoardState(boardState);
} // updateBoardState

function getMarkCount()
{
	// accessor function for global variable "markCount"
	return markCount;
}

function setMarkCount(newValue)
{
	// mutator function for global variable "markCount"
	markCount = newValue;
}

function setWinningCombinations(newValue)
{
	// mutator function for the global variable "winningCombinations"
  	winningCombinations = newValue;
}

function getWinningCombinations()
{
	// accessor function for the global variable "winningCombinations"
    return winningCombinations;
}

function setBoardState(newValue)
{
	// mutator function for the global variable "winningCombinations"
	boardState = newValue;
}

function getBoardState()
{
  	// accessor function for the global variable "winningCombinations"
    return boardState;
}