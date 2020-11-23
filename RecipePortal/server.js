const express = require('express');
const cookieParser = require('cookie-parser');
const recipeList = require('./recipeStorage.js');
const session = require('./sessions.js');
const uuid = require('uuid').v4;
const app = express();
const PORT = 3000;


app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const userInfo = recipeList;

let index = 0;

//Login
app.post('/session', express.json(), (req, res) => {
  
  const { username } = req.body;
  const errors = session.validateUsername(username);
  
  const obj = {
    username: req.body,
    user: Object.values(userInfo),
  };

  if( errors.length>0 ) {
    res.status(400).json({ errors });
    return;
  }
  
  const sid = session.createSession(username);
  res.cookie('sid', sid);
  res.status(200).json(Object.values(obj));
});


//Get login details
app.get('/session', (req, res) => {

  const sid = req.cookies.sid;
  

  if(!sid) {
    res.status(401).json({ error: 'Login required',userInfo : userInfo});
    return;
  }

  if(session.isValidSession(sid)) {
    res.status(200).json(Object.values(userInfo));
    return;
  }

  res.status(403).json({ error: 'Login Invalid', userInfo : userInfo});
});

//Add new recipe
app.post('/recipe', express.json(), (req, res) => {
  
  const recipe  = req.body;
  const sid = req.cookies.sid;
  
  if(!sid) {
    res.status(401).json({ error: 'Login required'});
    return;
  }

  if(recipe.title==='' || recipe.ingredient==='' || recipe.instructions===''){
      res.status(400).json({ error: 'Recipe Details Cannot Be Empty' });
      return;
  }

  ++index;

  userInfo[index] = recipe;

  res.status(200).json(Object.values(userInfo));
});

//Get recipe details of a particular item from recipe list
app.get('/recipe/:recipeId', express.json(), (req, res) => {
  const sid = req.cookies.sid;
  const recipeId = req.params.recipeId;

  res.status(200).json(userInfo[recipeId]);
  
});

//Logout user
app.delete('/logout', (req, res) => {

  const uid = req.cookies.uid;
  const sid = req.cookies.sid;

  if(!session.sessions[sid]){
     res.status(400).json({error:'User does not exist'});
     return;
  }

  res.cookie('uid', '');
  delete session.sessions[sid];

  res.status(200).json({message: 'sucessfully logged out'});
  
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

