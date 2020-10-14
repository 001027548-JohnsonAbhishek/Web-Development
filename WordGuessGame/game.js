"use strict";

const compare = require('./compare');
const wordList = require('./words');
const dataModal = require('./data-modal');

//This variable is guess word
let guess;

const game = {
  word: wordList[Math.floor(Math.random() * wordList.length)],
  turns: 0,
  clickWordList: clickWordList(),
  
  template: function() {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Guess Word</title>
          <link rel="stylesheet" type="text/css" href="/game.css"/>
        </head>
        <body>
          <div class="display-panel">
            ${clickWordList()}
            ${game.guessHistory(dataModal)}
            ${prompt()}
          </div>
        </body>
      </html>
  `;
  },

  exactMatch: function(guess) {
  return game.word.toUpperCase() === guess.toUpperCase();
},

  guessHistory: function(dataModal,guess) {

    return `<ol>` +
      dataModal.messages.map(message =>`
        <li>
          <div>
            <p>Your guess word is <span class="guess-info">"${message.guessWord.toUpperCase()}"</span> and the 
               letters that match with the target word is <span class="guess-info">"${message.sameLetterCount}"</span> 
               and the number of turns taken till now are <span class="guess-info">"${message.turns}"</span>
            </p>
          </div>
        </li>`).join('')+
      `</ol>`;
  },
    
  setGuess : function(setValue){
    guess = setValue;
  },

  isWordValid : function() {
                  guess = guess.toUpperCase();
                  return (guess.length==game.word.length && wordList.includes(guess)); 
                },
  
};

function clickWordList(){

  return `<form action= "/wordList" method= "GET">
              <button id="word-list-button" type="submit">Word List</button>
          </form>`
}


function prompt() {
  
  return`<form action="/" method="POST">
            <div class="enter-word">
              <label>Guess Word:</label>
              <input type="text" name="guessWord" id="enter-guess-word" placeholder="Enter Your Guess Word" required>
              <button class="guess-button" type="submit">Guess</button>
            </div>
          </form>`
}

module.exports = game;