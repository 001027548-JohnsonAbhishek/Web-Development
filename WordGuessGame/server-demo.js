"use strict";

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 3000;

const game = require('./game');
const compare = require('./compare');
const dataModal = require('./data-modal');
const win = require('./win');
const warn = require('./warn');
const wordListPage = require('./word-list');
const login = require('./login');

app.use(express.static('./public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended:false }));

const uuidv4= require("uuid").v4;


app.get('/', (req, res) => {
  //This word directs us to the main page
  const sid= req.cookies.sid;

  //Check if any session exists
  if(!sid || !dataModal.isValidSignIn(sid)){
    res.send(login());
    return;
  }
  res.send(game.template());
});


app.post('/login', (req,res)=>{
  
  const uuid = uuidv4();
  let flag = true;

  if(flag){
    console.log("The Word to Guess is:",game.word);
    flag = false;
  }
  dataModal.setUUID(uuid);
  //Storing data to the userInfo object
  dataModal.setUser({username:req.body.username,cookieInfo:req.cookies,
                  guessWord:[],turnsTaken:0,sid:req.cookies.sid,loginTime:Date()},uuid);
  
  res.cookie('sid', uuid);
  res.redirect('/');
});



app.post('/', express.urlencoded({ extended: false }), (req, res) => {

  //This route directs us to different pages depending on word guessed by user

  const guessWord = req.body.guessWord;
  game.setGuess(guessWord);
  const uuid = dataModal.uuidArray[dataModal.uuidArray.length-1];
  
  if(game.exactMatch(guessWord)){

    //The logic for user entering correct word.  

    dataModal.userInfo[uuid].guessWord.push(guessWord);
    res.redirect('/winMessage');
  
  }else if(game.isWordValid()){

    //The logic for user entering a word from word list not equal to actual word 

    const turns   = ++game.turns;
    dataModal.addMessage({ guessWord: guessWord, sameLetterCount: compare(game.word,guessWord), turns: turns });
    dataModal.userInfo[uuid].guessWord.push(guessWord);
    res.redirect('/');
  
  } else{

    //The logic for user entering an invalid word 
    res.redirect('/warning');

  }
});





app.get('/wordList', (req, res) => {
  //This route is to direct to list of words page
  const sid= req.cookies.sid;
  if(!sid || !dataModal.isValidSignIn(sid)){
    res.send(login());
    return;
  }
  res.send(wordListPage.template());
});


app.get('/warning',(req,res)=>{
  //This route directs to invalid message page.
  const sid= req.cookies.sid;
  if(!sid || !dataModal.isValidSignIn(sid)){
    res.send(login());
    return;
    }
    res.send(warn.warnTemplate());
  });

app.get('/winMessage',(req,res)=>{
  //This route directs to winning message page.
  const sid= req.cookies.sid;
  if(!sid || !dataModal.isValidSignIn(sid)){
    res.send(login());
    return;
    }
    res.send(win.winTemplate());
  });


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));