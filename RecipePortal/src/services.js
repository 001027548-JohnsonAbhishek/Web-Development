export const checkLoginStatus = function() {
  
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


export const getSession = function(){
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


export const recipeDetails = function(index){
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

export const addRecipe = function( currentUser, recipeTitle, recipeIngredient, recipeInstructions ) {
  
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





export const performLogin =	function( username ) {
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


export const logout = function() {
  
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
