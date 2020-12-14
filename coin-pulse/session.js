const uuid = require('uuid').v4;

const users = {};
const sessions = {};

const isValidUsername = function( username ) {
  
  const cleanUsername = username.replace(/[^a-zA-Z ]/g, '');

  if(username !== cleanUsername){
    return false;
  }
  return true;
};

const create = function({ username }) {
  
  
  if(!username) {
    return { error: 'Username is required' };
  }

  if(username==='dog') {
    return { error: 'Dog is not permitted into the Application' };
  }

  if(!isValidUsername(username)) {
    return { error: 'Username can contain only alphabets' };
  }
  const sid = uuid();
  users[username] = users[username];

  sessions[sid] = {
    sid,
    username,
  };
  return { sid };
};

const remove = function(sid) {
  delete sessions[sid];
};

const isValid = function(sid) {
  return !!sessions[sid];
};

module.exports = {
  details: sessions,
  create,
  remove,
  isValid,
};
