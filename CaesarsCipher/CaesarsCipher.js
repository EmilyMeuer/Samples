"use strict";
/*
	Emily Meuer
	04/07/2015
	CISC 131

	Simple cipher program.
	* AMDG *
*/

// WEADQ
window.onload = function()
{
  	var cipherText;
  	var clearText;
  	var message;

  	message = window.prompt("Please enter some text:");

  	cipherText  = singleCharacterSubstitutionCipher(message,200);
  	clearText   = singleCharacterSubstitutionCipher(cipherText,-200);

  	window.alert("Original text: " + message +
  	             "\nEncrypted text: " + cipherText +
  	             "\nDecrypted text: " + clearText);
};

function singleCharacterSubstitutionCipher(message, delta)
{
  	var alpha;
  	var cipherText;
  	var i;

  	alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  	message = message.toUpperCase();
  	delta = delta % alpha.length;

  	if(delta < 0)                     // Allows decryption by negative numbers
  	{ delta = alpha.length + delta; }

  	cipherText = "";
  	i = 0;

  	while(i < message.length)
  	{
  	  var char;

  	  if(alpha.indexOf(message.charAt(i)) >= 0)
  	  { char = alpha.charAt((alpha.indexOf(message.charAt(i)) + delta) % alpha.length);  }
  	  else
  	  { char = message.charAt(i); } // Leaves non-alphabetical characters unchanged

  	  cipherText = cipherText + char;

  	  i = i + 1;
  	}

  	return cipherText;
} // singleCharacterSubstitutionCipher