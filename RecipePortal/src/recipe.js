"use strict";
import {
  performLogin,
  getSession,
  checkLoginStatus,
  addRecipe,
  recipeDetails,
  logout
} from './services.js';


import{
  enableLogin,
  disableLogin,
  loginPage,
  showHomePage,
  showNewRecipePage,
  showRecipeDetailsPage,
  resetNewRecipeElements
} from './domDisplay.js';


let currentUser = '';
const recipeListContainer = document.querySelector(".recipe-list");
const userInput = document.querySelector("#enter-username");
const logoutButton = document.querySelector(".logout");

recipeApp();


getSession()
.then( userInfo => {
  disableLogin();
  showHomePage();
  renderRecipe(userInfo);
})
.catch( err =>{
  enableLogin();
  showHomePage();
  renderRecipe(Object.values(err.userInfo));
});


function loginError(error){
  document.querySelector(".login-error").innerText = error;
}

function genericError(error){
  document.querySelector(".generic-error").innerText = error;
}

function recipeEmptyError(error){
  document.querySelector(".recipe-empty-error").innerText = error;
}


function recipeApp(){
  addLogin();
  addNewRecipe();
  showRecipeDetails();
  renderHomePage();
  logouts();

}


function addLogin() {
    
  document.querySelector('#homepage-login-button').addEventListener('click',()=>{
      document.querySelector(".login-error").innerText = '';
      loginPage();
  });

  document.querySelector('#login-button').addEventListener('click', () => {
    const usernames = document.querySelector('#enter-username');
    const username = usernames.value;
    userInput.value = '';


    performLogin(username)
    .then( userInfo => {
      disableLogin();
      showHomePage();
      currentUser = userInfo[0].username;
      renderRecipe(userInfo[1]);
    })
    .catch( err => {
      loginPage();
      loginError(err.errors);
    });
  });
}


 function addNewRecipe(){
  
     document.querySelector('.add-recipe').addEventListener('click',()=>{
      showNewRecipePage();
      document.querySelector(".recipe-empty-error").innerText = '';
    });

  
    document.querySelector(".enter-recipe-button").addEventListener('click',(e)=>{

        e.preventDefault();
        const recipeTitle = document.querySelector(".recipe-input").value;
        const recipeIngredient = document.querySelector(".ingredients-text").value;
        const recipeInstructions = document.querySelector(".recipe-steps-text").value;
                
          addRecipe(currentUser,recipeTitle,recipeIngredient,recipeInstructions)
          .then(userInfo =>{
            resetNewRecipeElements();
            renderRecipe(userInfo);
            renderNewRecipeDetaisPage(userInfo);
          })
          .catch(err => {
            recipeEmptyError(err.error);
          });
      });
 }


//Displays the recipe details page after the recipe is created
function renderNewRecipeDetaisPage(userInfo){

      const currentUserInfo = userInfo[userInfo.length-1];

      showRecipeDetailsPage();
      document.querySelector(".recipe-author-text").innerText = currentUserInfo.author;
      document.querySelector(".recipe-title-text").innerText = currentUserInfo.title;
      document.querySelector(".ingredients-display-text").innerText = currentUserInfo.ingredient;
      document.querySelector(".recipe-steps-display-text").innerText = currentUserInfo.instructions;
    
}


 function showRecipeDetails(){

  recipeListContainer.addEventListener('click',(e)=>{

  const recipeId = e.target.dataset.index;
  resetNewRecipeElements();

  if(e.target.classList.contains('recipe-list-item')){
    e.preventDefault();
    recipeDetails(recipeId)
    .then( userInfo => {
      showRecipeDetailsPage();
      document.querySelector(".recipe-author-text").innerText = userInfo.author;
      document.querySelector(".recipe-title-text").innerText = userInfo.title;
      document.querySelector(".ingredients-display-text").innerText = userInfo.ingredient;
      document.querySelector(".recipe-steps-display-text").innerText = userInfo.instructions; 
      })
    .catch( err => {
      genericError(err.error);
        });
      }
    });

  };

  //Return to home page logic
 function renderHomePage(){
  document.querySelector(".back-to-homepage").addEventListener('click',(e)=>{
    e.preventDefault();
     resetNewRecipeElements();
    showHomePage();
  });

  document.querySelector(".back-to-homepage-1").addEventListener('click',(e)=>{
    e.preventDefault();
    showHomePage();
  });

  document.querySelector(".back-to-homepage-2").addEventListener('click',(e)=>{
    e.preventDefault();
    showHomePage();
  });  
 }  


 function logouts(){
  
   logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      logout()
      .then( () => {
        enableLogin();
        showHomePage();
      })
      .catch( err =>{
        genericError(err.error);
      });
    });
  } 

function renderRecipe( recipes ) {
    
    const recipeContent = recipes.map( (recipe, index) => {

       return `
        <li>
            <button class="recipe-list-item" title="Click To View Recipe Details" data-index="${index}">
            	<span class="recipe-name" data-index="${index}">${recipe.title}</span> Prepared By <span class="author-name" data-index="${index}">${recipe.author}</span></span>
           	</button>
        </li>
        `;
      
    }).join('');

    recipeListContainer.innerHTML = recipeContent;
  };