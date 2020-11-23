const sessions = {};
const uuid = require('uuid').v4;


const isValidSession = function(sid) {
  return sessions[sid];
};

const validateUsername = function(username) {
  const errors = [];
  const clean = username.replace(/[^A-Za-z0-9_]+/g, '');
  if( clean !== username  || username==="dog") {
     errors.push("Invalid UserName");
  }
  if(!username) {
     errors.push("UserName is Empty")
  }
  return errors.length ? errors : '';
};

const createSession = function(username) {
  const sid = uuid();

  sessions[sid] = {
    username
  };
  return sid;
};

module.exports = {
  sessions,
  isValidSession,
  validateUsername,
  createSession
}