"use strict";

const game = require('./game');
const dataModal = require('./data-modal');
const wordList = require('./words');


const win = {
  
  winTemplate: function(){
    return `
            <!doctype html>
            <html>
              <head>
                <title>Winning Message</title>
                <link rel="stylesheet" type="text/css" href="/win.css"/>
              </head>
              <body>
                  ${win.wonGame()}
              </body>
            </html>
          `
  },

  wonGame: function(){
    
    //See resetGame() method
    dataModal.resetGame();
    //New word to guess.
    game.word = wordList[Math.floor(Math.random() * wordList.length)];
    const numOfTurns = ++game.turns;
    //Reset turns to 0
    game.turns = 0;
    //Get the latest current session
    const uuid = dataModal.uuidArray[dataModal.uuidArray.length-1];
    //Assign turns to the userInfo object
    dataModal.userInfo[uuid].turnsTaken = numOfTurns;
    
    const guessWordArr = dataModal.userInfo[uuid].guessWord;
    dataModal.userInfo[uuid].guessWord = [];

    console.log("The new word to guess is:",game.word);
    return `
      <div class="win-modal">
        <p id="win-text">Yayyy!!! You won the Game in  <span id="turns-number">"${numOfTurns}"</span> turns</p>
        <a href="/" id="reset-game">Play Again</a>
      </div>

      <div id="user-info-section">
        <h2>User Info:</h2>
        <label> User Name:</label>
        <span class="user-info">${dataModal.userInfo[uuid].username}</span>
        <label>Guess Word List:</label>
        <span class="user-info">${guessWordArr}</span>
        <label>Total Turns Taken:</label>
        <span class="user-info">${dataModal.userInfo[uuid].turnsTaken}</span>
        <label> Login Time:</label>
        <span class="user-info">${dataModal.userInfo[uuid].loginTime}</span>
      </div>
      `
      ;

},
}

module.exports = win;