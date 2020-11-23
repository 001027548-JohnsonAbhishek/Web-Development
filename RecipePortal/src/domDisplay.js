const loginSection =  document.querySelector(".login-panel");
const homePage = document.querySelector(".recipe-home-page");
const recipeDisplayPage = document.querySelector(".recipe-display-section");
const newRecipePage = document.querySelector(".add-new-recipe-details");

const logoutButton = document.querySelector(".logout");
const loginButton = document.querySelector("#homepage-login-button");



export const  enableLogin= function(){
  loginButton.classList.add('show');
  document.querySelector(".logout").style.display = 'none';
  document.querySelector(".add-recipe").style.display = 'none';
}

export const  disableLogin =function(){
  loginButton.classList.remove('show');
  document.querySelector(".logout").style.display = 'block';
  document.querySelector(".add-recipe").style.display = 'block';
}
//Displays the login Page section 
export const loginPage = function (){
  loginSection.classList.add('show');
  homePage.classList.remove('show');
  newRecipePage.classList.remove('show');
  recipeDisplayPage.classList.remove('show');
}
//Displays the home page section
export const  showHomePage = function(){
  homePage.classList.add('show');
  loginSection.classList.remove('show');
  newRecipePage.classList.remove('show');
  recipeDisplayPage.classList.remove('show');
}

//Displays the create new recipe page section
export const showNewRecipePage= function(){
  homePage.classList.remove('show');
  loginSection.classList.remove('show'); 
  newRecipePage.classList.add('show');
  recipeDisplayPage.classList.remove('show');
}

//Displays the recipe details page section
export const showRecipeDetailsPage= function(){
 homePage.classList.remove('show');
 loginSection.classList.remove('show'); 
 newRecipePage.classList.remove('show');
 recipeDisplayPage.classList.add('show');
}
//Resets the recipe input values on create new recipe page
export const  resetNewRecipeElements = function(){
    document.querySelector(".recipe-input").value      = '';
    document.querySelector(".ingredients-text").value  = ''; 
    document.querySelector(".recipe-steps-text").value = '';
}
