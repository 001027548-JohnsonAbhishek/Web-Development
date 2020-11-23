# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.

A url should represent a resource/thing but not the purpose it serves. For example, if a service is used to add an item, it is a bad practice to name it as /addItem. Instead we can rename url as /item. /item indicates that it is a resource that we interact with and we can do multiple operations on it such get,put,post etc.

## Q2: If the service returns the username as a plain text string, what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  

In the above code the fetch method returns a promise and as a result the promise object is stored in username. We need to parse the response data of promise so that username variable can hold user data.
```
const username = fetch('/username')
		.then(res
			=>{
			return res.text();
			})
			.then(user =>
			return user;
			)
			.catch(err 
			=>
			console.log(err);
			);	
```

## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?

By “store your state in DOM” we mean that we are depending on the html content (classes, id etc of an html element) to make modification to our visual output.For example, there is requirement that when a user logs in, the log in button must change to log out. It is a bad practice to read the DOM state of the login button and change it accordingly. So we read the html to change the content of the page. This increases complexity in future if additional capabilities are added to the page.

## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.

SPA(Single Page Application):
In a SPA we have a single page and all the changes to the page are done in-place via the service calls. Every other call from a service just modifies the page in-place and displays the content of page accordingly. In a spa the page is loaded only once initially when we start the server. There is no need of a form html element, action and name attributes to interact with server.

MPA(Multiple Page Application):
Calls a URL and does a page load of css and html of that page(url) and sends data in form of name attribute. It lacks a way to talk to the server. Causes a full page load on the url every time when some sort of change or interaction takes place between the client and the server. Interaction with the backend takes place through form html element, action and name attributes.


## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?

Progressive enhancement means create a page from a baseline that works without JS(javascript) and then add more features and enhancements using JS as functionality increases to the page. If we disable the JS of our page, even then the page works if we build it using progressive enhancement method.

SPA with progressive enhancement means, modifying/displaying the content of the page using DOM and fetch apis.

SPA without progressive enhancement means, just the front-end application written in html and the backend interaction takes place with the help of form html elements.


## Q6: Explain how a REST service is or is not similar to a dynamic asset.

Rest service can be considered as a dynamic asset. This is because the rest service posts or retrieves the data to/from the server and does some kind of operations on the data such as parsing the response data, storing the data etc. So rest service is similar to dynamic asset.

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.

Cookies are generally used for authentication in our applications. So we need to send only the required data to the cookie while sending it from services. By doing this we are safeguarding the user data and also saving the unwanted data being sent to the server, thereby increasing the application performance.

Example:
In exam02, there is a requirement to show the Add recipe button only for the logged in user. So it makes no sense if we attach the recipe list data and sessions data to the cookie with help of an object. What we can do is we can define a separate object for the recipe list data and another separate object for the sessions data to check if a user is logged in.


## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data

---> The code is cleaner, modular and easier to understand and debug.	  
---> We can reuse the service function(function in which service code is defined) for multiple purposes.	  
---> Error handling becomes easier as we can clearly state to the user the error type if it is from server(network) or data(bad user request).	   
---> Side effects are minimized i.e changes in data logic doesn’t effect service logic and vice versa.	


## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)

By the time the asynchronous code inside the try block gets executed the try is already executed by JS runtime and the error thrown by code inside the try block will not be caught by catch block.( After the try is run the code inside try block runs by itself)

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.

Separation of Concern(SOC) is both a front-end and server-side issue.

Ex: Code without SOC
```
document.querySelector(".enter-recipe-button").addEventListener('click',(e)=>{
 const newRecipe = {
      title: recipeTitle,
      author: currentUser,
      ingredient: recipeIngredient,
      instructions: recipeInstructions,
  }

 fetch('/newRecipe', {
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
  }).then(userInfo =>{
         
        document.querySelector(".recipe-input").value = '';
        document.querySelector(".ingredients-text").value  = ''; 
        document.querySelector(".recipe-steps-text").value = '';
          
  listEl.innerHTML =  `
        <li>
            <button class="recipe-list-item" data-index="${index}">
              <span class="recipe-name" data-index="${index}">${recipe.title}</span> Prepared By <span class="author-name" data-index="${index}">${recipe.author}</span></span>
            </button>
        </li>
        `;
     })
 }
 ```
In the above example we are adding the data using POST service and then we are setting the html content of the page. By writing the code in the above way we are coupling html with the backend. If in future there is a requirement to add extra features the change in code of front-end html can affect server-side of the application and vice-versa(side-effects). Also we cannot reuse the code for other purposes.

Code with SOC:
```
document.querySelector(".enter-recipe-button").addEventListener('click',(e)=>{
       e.preventDefault();
        const recipeTitle = document.querySelector(".recipe-input").value
        const recipeIngredient = document.querySelector(".ingredients-text").value;
        const recipeInstructions = document.querySelector(".recipe-steps-text").value;
  addRecipe(currentUser,recipeTitle,recipeIngredient,recipeInstructions)
          .then(userInfo =>{
            resetNewRecipeElements();
            showHomePage();
            renderRecipe(userInfo);
          })
          .catch(err => {
            document.querySelector(".recipe-empty-error").innerText = err.error;
          });
      });
```
We can see the drastic change in the length of the code and it appears more modular and cleaner.In the above updated code we have separated the services logic and front-end render logic in separate functions. By using separate functions for each part of the code we are minimizing the side effects and increasing the reusability of code.

