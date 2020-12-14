const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;
const session = require('./session');

app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));

app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  if( !sid) {
    res.status(401).json({ error: 'Please Login To view the application' });
    return;
  }
  if( !session.isValid(sid) ) {
    res.status(403).json({ error: 'Please Login To view the application' });
    return;
  }
  res.json(session.details[sid]);
});

app.post('/api/session', (req, res) => {
  const username = req.body.username;
  const { sid, error } = session.create({ username });
  if(error) {
    res.status(400).json(error);
    return;
  }
  res.cookie('sid', sid);
  res.json(session.details[sid]);
});



app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  if( !sid) {
    res.status(401).json({ error: 'Please Login To view the application' });
    return;
  }

  const username = session.details[sid].username;

  session.remove(sid);
  res.clearCookie('sid');
  res.json({ sid, status: username.toUpperCase()+' successfully logged out' });
});


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
