# About

The RecipePortal app is a single-page application which displays the recipe steps to make a food recipe.
* Please view the ProjectWorking.pdf file to see the working of the application.

## Functionality
* There is an option to login, but users are not required to login to view
* User can see a list of all recipe titles and their authors
* Usser can click a recipe title to see the recipe (author, title, ingredients, and instructions)
* Logged in users can add a new recipe (title, ingredients, and instructions)
* When not on the main page, user can click homepage to return to the main page
  
* All services are RESTful
* All services will return JSON data, not HTML
* All services  accept data as query params, in the path of the url, or as JSON data in the body
* The packages used are 'express', 'cookie-parser', and 'uuid' node modules
* Used 'webpack' and 'babel-loader' to bundle the front end javascript

### Home 

* Displays a list of all stored recipes
* Offers the option to login or logout
* Clicking on a recipe title (the visible text) will load a details page/screen
* Clicking on the "New Recipe" button will to the New Recipe page/screen
* If a logged in user manually reloads the page, the page should show them as logged in

### Login

* User must provide a username to login
* No password
* Displays useful error messages if a login is denied

### Logout 

* User will see the Home screen after logging out
* Another user can log in after someone logged out without requiring a new page load

### Recipe Details

* Displays the author, title, ingredients list, and instructions for the selected recipe
* user can click a "Return to Home" link to return to the Home Page

### New Recipe

* Displays a form to enter the title, ingredients list, and instructions for a new recipe
* The ingredients list is a single textarea field to enter the data
* The instructions list a single textarea field to enter the data
* The user is not allowed to enter a recipe without something present in all 3 fields
* The user can click a "Return to Home" link to return to the Home Page
* The user is put on the Recipe Details screen for the new recipe after successfully submitting a recipe.

### REST Services

* Added REST services to fulfill the needs of the application
* Any services calls that expect the user be logged in should enforce that requirement
* Picked the services data, methods, URLs, and status codes to match the requirements of RESTful services
* Any request/response bodies are in JSON
* Store the author (username) of a new recipe, along with any created id for that recipe
