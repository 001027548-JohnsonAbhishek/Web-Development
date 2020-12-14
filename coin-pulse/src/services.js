
export const checkSession = () => {
  return fetch('/api/session',  {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
};

export const createSession = ({username}) => {
  return fetch('/api/session',  {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
};

export const endSession = () => {
  return fetch('/api/session',  {
    method: 'DELETE',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });

};

//Gets the list of coins and data related to each coin
export const getCoinListData = (coin)=>{

  return fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page='+coin+'&page=1&sparkline=false',  {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}

//Gets the detailed data related to a coin
export const getCoinDetails = (coinName)=>{
  const err = "Data for the "+coinName.toUpperCase()+" does not exist";

  return fetch('https://api.coingecko.com/api/v3/coins/'+coinName,  {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(err) );
  })
}


//Gets the coin price history data from the past 1600days(5years)
export const getCoinPriceData = (coinName)=>{
  const err = "Data for the "+coinName.toUpperCase()+" does not exist";
  return fetch('https://api.coingecko.com/api/v3/coins/'+coinName+'/market_chart?vs_currency=usd&days=1600',  {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(err) );
  })
}


