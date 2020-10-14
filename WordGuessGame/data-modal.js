"use strict";
const game = require('./game');

const messages = [];

const userInfo= [];

const uuidArray=[];

function isValidSignIn(sid){
  if(userInfo[sid]){
    return true;
  }
  return false;
};

function setUUID(uuid){
	uuidArray.push(uuid);
}

function setUser({username,cookieInfo,guessWord,sid,turnsTaken,loginTime},uuid){
	//Set the user info
	userInfo[uuid]={username, cookieInfo, guessWord, turnsTaken, sid, loginTime};
}

function addMessage({ guessWord, sameLetterCount, turns}) {
	//Message Info to be displayed when user guesses
    messages.push({ guessWord, sameLetterCount, turns });                 
}

function resetGame(){
	messages.length = 0;
	game.turns = 0;
	messages.turns = 0;
}



module.exports = {
	messages,
	resetGame,
	addMessage,
	userInfo,
	isValidSignIn,
	setUser,
	setUUID,
	uuidArray,
}
