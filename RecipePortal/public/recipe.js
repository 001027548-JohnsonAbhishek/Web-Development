/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domDisplay.js":
/*!***************************!*\
  !*** ./src/domDisplay.js ***!
  \***************************/
/*! namespace exports */
/*! export disableLogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! export enableLogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! export loginPage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export resetNewRecipeElements [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showHomePage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showNewRecipePage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showRecipeDetailsPage [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enableLogin": () => /* binding */ enableLogin,
/* harmony export */   "disableLogin": () => /* binding */ disableLogin,
/* harmony export */   "loginPage": () => /* binding */ loginPage,
/* harmony export */   "showHomePage": () => /* binding */ showHomePage,
/* harmony export */   "showNewRecipePage": () => /* binding */ showNewRecipePage,
/* harmony export */   "showRecipeDetailsPage": () => /* binding */ showRecipeDetailsPage,
/* harmony export */   "resetNewRecipeElements": () => /* binding */ resetNewRecipeElements
/* harmony export */ });
const loginSection =  document.querySelector(".login-panel");
const homePage = document.querySelector(".recipe-home-page");
const recipeDisplayPage = document.querySelector(".recipe-display-section");
const newRecipePage = document.querySelector(".add-new-recipe-details");

const logoutButton = document.querySelector(".logout");
const loginButton = document.querySelector("#homepage-login-button");



const  enableLogin= function(){
  loginButton.classList.add('show');
  document.querySelector(".logout").style.display = 'none';
  document.querySelector(".add-recipe").style.display = 'none';
}

const  disableLogin =function(){
  loginButton.classList.remove('show');
  document.querySelector(".logout").style.display = 'block';
  document.querySelector(".add-recipe").style.display = 'block';
}
//Displays the login Page section 
const loginPage = function (){
  loginSection.classList.add('show');
  homePage.classList.remove('show');
  newRecipePage.classList.remove('show');
  recipeDisplayPage.classList.remove('show');
}
//Displays the home page section
const  showHomePage = function(){
  homePage.classList.add('show');
  loginSection.classList.remove('show');
  newRecipePage.classList.remove('show');
  recipeDisplayPage.classList.remove('show');
}

//Displays the create new recipe page section
const showNewRecipePage= function(){
  homePage.classList.remove('show');
  loginSection.classList.remove('show'); 
  newRecipePage.classList.add('show');
  recipeDisplayPage.classList.remove('show');
}

//Displays the recipe details page section
const showRecipeDetailsPage= function(){
 homePage.classList.remove('show');
 loginSection.classList.remove('show'); 
 newRecipePage.classList.remove('show');
 recipeDisplayPage.classList.add('show');
}
//Resets the recipe input values on create new recipe page
const  resetNewRecipeElements = function(){
    document.querySelector(".recipe-input").value      = '';
    document.querySelector(".ingredients-text").value  = ''; 
    document.querySelector(".recipe-steps-text").value = '';
}


/***/ }),

/***/ "./src/recipe.js":
/*!***********************!*\
  !*** ./src/recipe.js ***!
  \***********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _domDisplay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domDisplay.js */ "./src/domDisplay.js");







let currentUser = '';
const recipeListContainer = document.querySelector(".recipe-list");
const userInput = document.querySelector("#enter-username");
const logoutButton = document.querySelector(".logout");

recipeApp();


(0,_services_js__WEBPACK_IMPORTED_MODULE_0__.getSession)()
.then( userInfo => {
  (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.disableLogin)();
  (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.showHomePage)();
  renderRecipe(userInfo);
})
.catch( err =>{
  (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.enableLogin)();
  (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.showHomePage)();
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
      (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.loginPage)();
  });

  document.querySelector('#login-button').addEventListener('click', () => {
    const usernames = document.querySelector('#enter-username');
    const username = usernames.value;
    userInput.value = '';


    (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.performLogin)(username)
    .then( userInfo => {
      (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.disableLogin)();
      (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.showHomePage)();
      currentUser = userInfo[0].username;
      renderRecipe(userInfo[1]);
    })
    .catch( err => {
      (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.loginPage)();
      loginError(err.errors);
    });
  });
}


 function addNewRecipe(){
  
     document.querySelector('.add-recipe').addEventListener('click',()=>{
      (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.showNewRecipePage)();
      document.querySelector(".recipe-empty-error").innerText = '';
    });

  
    document.querySelector(".enter-recipe-button").addEventListener('click',(e)=>{

        e.preventDefault();
        const recipeTitle = document.querySelector(".recipe-input").value;
        const recipeIngredient = document.querySelector(".ingredients-text").value;
        const recipeInstructions = document.querySelector(".recipe-steps-text").value;
                
          (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.addRecipe)(currentUser,recipeTitle,recipeIngredient,recipeInstructions)
          .then(userInfo =>{
            (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.resetNewRecipeElements)();
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

      (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.showRecipeDetailsPage)();
      document.querySelector(".recipe-author-text").innerText = currentUserInfo.author;
      document.querySelector(".recipe-title-text").innerText = currentUserInfo.title;
      document.querySelector(".ingredients-display-text").innerText = currentUserInfo.ingredient;
      document.querySelector(".recipe-steps-display-text").innerText = currentUserInfo.instructions;
    
}


 function showRecipeDetails(){

  recipeListContainer.addEventListener('click',(e)=>{

  const recipeId = e.target.dataset.index;
  (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.resetNewRecipeElements)();

  if(e.target.classList.contains('recipe-list-item')){
    e.preventDefault();
    (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.recipeDetails)(recipeId)
    .then( userInfo => {
      (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.showRecipeDetailsPage)();
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
     (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.resetNewRecipeElements)();
    (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.showHomePage)();
  });

  document.querySelector(".back-to-homepage-1").addEventListener('click',(e)=>{
    e.preventDefault();
    (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.showHomePage)();
  });

  document.querySelector(".back-to-homepage-2").addEventListener('click',(e)=>{
    e.preventDefault();
    (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.showHomePage)();
  });  
 }  


 function logouts(){
  
   logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.logout)()
      .then( () => {
        (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.enableLogin)();
        (0,_domDisplay_js__WEBPACK_IMPORTED_MODULE_1__.showHomePage)();
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

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! namespace exports */
/*! export addRecipe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export checkLoginStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getSession [provided] [no usage info] [missing usage info prevents renaming] */
/*! export logout [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performLogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! export recipeDetails [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkLoginStatus": () => /* binding */ checkLoginStatus,
/* harmony export */   "getSession": () => /* binding */ getSession,
/* harmony export */   "recipeDetails": () => /* binding */ recipeDetails,
/* harmony export */   "addRecipe": () => /* binding */ addRecipe,
/* harmony export */   "performLogin": () => /* binding */ performLogin,
/* harmony export */   "logout": () => /* binding */ logout
/* harmony export */ });
const checkLoginStatus = function() {
  
  return fetch('/session', {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
   })
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( err => Promise.reject(err) );
  });
};


const getSession = function(){
    return fetch('/session', {
          method: 'GET',
        })
        .catch( () => {
          return Promise.reject({ error: 'network-error' });
         })
        .then( response => {
          if(response.ok) {
            return response.json();
          }
          return response.json().then( err => Promise.reject(err) );
        });
};


const recipeDetails = function(index){
     return fetch(`/recipe/${index}`,{
          method: 'GET', 
          headers:{"Content-type": "application/json"},
      })
        .catch( () => {
          return Promise.reject({ error: 'network-error' });
         })
        .then( response => {
          if(response.ok) {
            return response.json();
          }
          return response.json().then( err => Promise.reject(err) );
        });
};

const addRecipe = function( currentUser, recipeTitle, recipeIngredient, recipeInstructions ) {
  
  const newRecipe = {
      title: recipeTitle,
      author: currentUser,
      ingredient: recipeIngredient,
      instructions: recipeInstructions,
  }

  return fetch('/recipe', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify(newRecipe),
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
   })
  .then( response => {
    
    if (!response.ok) {
        return response.json().then(result => Promise.reject(result));
      }
      return response.json();
  });
};





const performLogin =	function( username ) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
   })
  .then( response => {
    
    if (!response.ok) {
        return response.json().then(result => Promise.reject(result));
      }
      return response.json();
  });
};


const logout = function() {
  
  return fetch('/logout', {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
   })
  .then( response => {
    
    if (!response.ok) {
        return response.json().then(result => Promise.reject(result));
      }
      return response.json();
  });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/recipe.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=recipe.js.map