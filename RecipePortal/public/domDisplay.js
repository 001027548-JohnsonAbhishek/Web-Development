"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetNewRecipeElements = exports.showRecipeDetailsPage = exports.showNewRecipePage = exports.showHomePage = exports.loginPage = exports.disableLogin = exports.enableLogin = void 0;
var loginSection = document.querySelector(".login-panel");
var homePage = document.querySelector(".recipe-home-page");
var recipeDisplayPage = document.querySelector(".recipe-display-section");
var newRecipePage = document.querySelector(".add-new-recipe-details");
var logoutButton = document.querySelector(".logout");
var loginButton = document.querySelector("#homepage-login-button");

var enableLogin = function enableLogin() {
  loginButton.classList.add('show');
  document.querySelector(".logout").style.display = 'none';
  document.querySelector(".add-recipe").style.display = 'none';
};

exports.enableLogin = enableLogin;

var disableLogin = function disableLogin() {
  loginButton.classList.remove('show');
  document.querySelector(".logout").style.display = 'block';
  document.querySelector(".add-recipe").style.display = 'block';
}; //Displays the login Page section 


exports.disableLogin = disableLogin;

var loginPage = function loginPage() {
  loginSection.classList.add('show');
  homePage.classList.remove('show');
  newRecipePage.classList.remove('show');
  recipeDisplayPage.classList.remove('show');
}; //Displays the home page section


exports.loginPage = loginPage;

var showHomePage = function showHomePage() {
  homePage.classList.add('show');
  loginSection.classList.remove('show');
  newRecipePage.classList.remove('show');
  recipeDisplayPage.classList.remove('show');
}; //Displays the create new recipe page section


exports.showHomePage = showHomePage;

var showNewRecipePage = function showNewRecipePage() {
  homePage.classList.remove('show');
  loginSection.classList.remove('show');
  newRecipePage.classList.add('show');
  recipeDisplayPage.classList.remove('show');
}; //Displays the recipe details page section


exports.showNewRecipePage = showNewRecipePage;

var showRecipeDetailsPage = function showRecipeDetailsPage() {
  homePage.classList.remove('show');
  loginSection.classList.remove('show');
  newRecipePage.classList.remove('show');
  recipeDisplayPage.classList.add('show');
}; //Resets the recipe input values on create new recipe page


exports.showRecipeDetailsPage = showRecipeDetailsPage;

var resetNewRecipeElements = function resetNewRecipeElements() {
  document.querySelector(".recipe-input").value = '';
  document.querySelector(".ingredients-text").value = '';
  document.querySelector(".recipe-steps-text").value = '';
};

exports.resetNewRecipeElements = resetNewRecipeElements;