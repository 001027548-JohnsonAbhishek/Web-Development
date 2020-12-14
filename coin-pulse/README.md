# Description
  The Crypto Pulse application displays the cryptocurrency price related data.

## Structure
* A login page for the user to login
* On login a "Main page" is displayed where we can see the list of top 10 crypto coin and its price.
* When a crypto coin container is clicked on the main page,"Coin Metric Information" page is displayed   that gives a detailed information related to the crypto coin clicked by the user.

## Application WorkFlow:
* The application is a SPA and a user needs to login to the application to view it.
* After the user logs in: 
    * A list of top 10 cryptocurrencies are displayed. 
    * The user has the option to view top 10,50,100,200 coins by using the dropdown present on the    screen.
* On the screen the user can press the crypto coin data container:
    * To view the detailed information related to the cryptocurrency clicked
        * On click of a crypto coin data container on main page, the page displays :
            * Cryptocurrency's key coin metric details
            * A chart that displays the coin price in past 5 years
            * Cryptocurrency's important ecosystem links
            * Price change % information in the past 1,7,14,30 days and 1 year
            * Cryptocurrency high level description
* The user can navigate back to the main page by clicking Go Back button
* The user can logout

## Services
* The service methods used were:
    * createSession()- This service is POST method and it handles the login functionality
    * checkSession()- This service is GET method and it checks if a user is logged into application
    * getCoinListData()- The service is used to GET the crypotcurrency coin list from the coin gecko api
    * getCoinDetails()- This service GETS the detailed information of coin metric data
    * getCoinPriceData()- This service GETS the coin price historical data from the past 1600days
    * endSession()- This is a DELETE method and it handles the user logout functionality

## Error Handling and Authentication
* For each service call made, we check to authenticate if a user is logged in or not.
    * If a user is not logged in, a message pops up for the user to login
* Validation of data is done:
    * During login if a user provides invalid name, error message pops up
    * To GET data we provide parameters to API'S. Sometimes the API doesnt get the data and returns
      null. In that scenario message pops up to inform the user of the problem.


### Coin Gecko Apis were used to get crypto currency data :
* The below api is use to get the list of top N crypto coins
    * https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page={N}&page=1&sparkline=false
    Ex: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false (Gives top 10 coins)

* The below api is use to get the coin metric data information for each coin
    * https://api.coingecko.com/api/v3/coins/{coinName}
    Ex: https://api.coingecko.com/api/v3/coins/bitcoin (This api extracts info for bitcoin)

* The below api is use to get the coin historical data information for each coin
    * https://api.coingecko.com/api/v3/coins/{coinName}/market_chart?vs_currency=usd&days={days} 
   Ex: https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1600            (This api extracts info for bitcoin)

Please view the ProjectWorking.pdf file to get a visual view of the application.