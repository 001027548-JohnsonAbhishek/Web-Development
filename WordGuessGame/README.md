# Word Guessing Game

# About
The application is a game to guess a word.

The User will be given a list of words and he needs to enter a word, and the page will do one of:

* Say the word is not one of the permitted words and allow them to enter a new word
* Display that the user has correctly guessed the word and allow them to start a new game
* Say how many letters the word has in common with the word they are trying to guess, without regard to   	  position or case-sensitivity (See "Examples" below)

# Implementation

* This is a multiple page application where the main focus on is on server side javascript coding with 	    simple styling using css.
* Developed the backend code of the game using NodeJS.
* Developed the front-end using HTML and CSS.

Examples
If words.js has the words "TEA, EAT, TEE, PEA, PET, APE" and the game selects TEA as the secret word then:

* TREE will give a warning about an invalid word, not increment the turn counter and allow a new guess
* ATE will give a warning about an invalid word, not increment the turn counter and allow a new guess
* PET will respond with 2 matches and increment the turn counter then allow a new guess
* TEE will respond with 2 matches and increment the turn counter then allow a new guess
* tee will respond with 2 matches and increment the turn counter then allow a new guess

TEA will respond that they have won the game in however many turns and allow them to start a new game with a new randomly selected word from the list

# Commands to run the project
* Clone the WrodGuessGame.
* npm install
* node server.js
You will be able to try the game at "http://localhost:3000/".