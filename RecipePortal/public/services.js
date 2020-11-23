"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.performLogin = exports.addRecipe = exports.recipeDetails = exports.getSession = exports.checkLoginStatus = void 0;

var checkLoginStatus = function checkLoginStatus() {
  return fetch('/session', {
    method: 'GET'
  }).catch(function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};

exports.checkLoginStatus = checkLoginStatus;

var getSession = function getSession() {
  return fetch('/session', {
    method: 'GET'
  }).catch(function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};

exports.getSession = getSession;

var recipeDetails = function recipeDetails(index) {
  return fetch("/recipe/".concat(index), {
    method: 'GET',
    headers: {
      "Content-type": "application/json"
    }
  }).catch(function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};

exports.recipeDetails = recipeDetails;

var addRecipe = function addRecipe(currentUser, recipeTitle, recipeIngredient, recipeInstructions) {
  var newRecipe = {
    title: recipeTitle,
    author: currentUser,
    ingredient: recipeIngredient,
    instructions: recipeInstructions
  };
  return fetch('/recipe', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify(newRecipe)
  }).catch(function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};

exports.addRecipe = addRecipe;

var performLogin = function performLogin(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  }).catch(function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};

exports.performLogin = performLogin;

var logout = function logout() {
  return fetch('/logout', {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json'
    })
  }).catch(function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};

exports.logout = logout;