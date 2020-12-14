import React from 'react';
import { useState,useEffect} from 'react';
import {checkSession,getCoinListData,getCoinDetails,getCoinPriceData} from './services';
import CoinInfo from './CoinInfo';
import Coins from './Coins';
import MessageDialogBox from './MessageDialogBox';
import Login from './Login';

export default function CryptoPulse({login}) {
  let[coinListData,setCoinListData] = useState([]);//this state stores the list of coins data
  let[topNCoin,setTopNCoin] = useState(10);
  let[id,setId] = useState(0);
  let[coinInfo,setCoinInfo] = useState([]);
  let[stateTracker,setStateTracker] = useState(true);
  let[chart,setChartData]=useState([]);
  let[error,setError] = useState('');

  useEffect( () => {
    getCoinListData(10)
    .then(data =>{
      setError('')
      setCoinListData(
        data 
      )
      setId(0);
    })
    .catch(err => {
      setError(err);
    });

},[]);





const  setContent = function(e){

  let getCoin;

  if(!e.target.id.includes("coin-container-"))
    return;


  getCoin = e.target.id.split("-")[2]; 

  if(getCoin){
    
    //Check if a user is logged in or not
    checkSession()
    .then( () => {
    })
    .catch( (err) => {
      setError(err);
    });

    //If user is not logged in, login page is rendered
    if(error){
      renderError();
      showContent = <Login onLogin={login}/>;
      return;
    }


    //Gets the Individual coinInfo
    getCoinDetails(getCoin)
        .then(coinData =>{
          setError('') 
          setCoinInfo(
            coinData 
          )
          setId(0);
        })
        .catch(err => {
          setError(err)
        });


      }

      if(error){
        return;
      }

    //Gets the Coin Chart Related data  
    getCoinPriceData(getCoin)
        .then(coinData =>{ 
          setError('');
          setChartData(
            coinData 
          )
          setStateTracker(false);
        })
        .catch(err => {
          setError(err);
        });
}

//The content variable stores main page structure. 
//The content variable display header and list of coins on main page 
let content =    <div className="coins-display" onClick={(e)=>setContent(e)}>
                    <div className="header" key="app-header">
                      <div className="top-coin-display">Top :  
                        <select name="top-coin" className="top-N-coin" value={topNCoin} onChange={(e)=>setTop(e.target.value)}>
                          <option value="10">10</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                          <option value="200">200</option>
                        </select>
                      </div>
                      <div className="sNo"><p>Coin Rank</p></div>
                      <div className="coin-name"><p>Coin Name</p></div>
                      <div className="price"><p>Coin Price($)</p></div>
                    </div>
                    <div>      
                    {
                      coinListData.map(coin=>{
                        return (
                          <div> 
                            <Coins
                                  sNo={++id} 
                                  image = {coin.image}
                                  name = {coin.name} 
                                  price = {coin.current_price} 
                                  coinId = {coin.id}
                                  err = {error}
                                  setContents = {setContent}
                                  key= {coin.name}
                            />
                          </div>
                        )
                      })
                    }  
                    </div>
                  </div>;

//The coinContent variable stores coin metrics information page structure.
let coinContent = <div  id="coin-info">  
                    <CoinInfo 
                      coin={coinInfo}
                      setCryptoPulseState = {setStateTracker}
                      chartData = {chart}
                      err = {error}
                    />
                    </div>;


let showContent, contentError;

//This function diplays the error on page depending on the error state
const renderError = function(){    
    if(error){
      contentError = <MessageDialogBox errorMessage={error} err={setError}/>;
    }
    else{
      contentError = null;
      error = '';
    }
}


//This logic handles the rendering of top 10,50,100,200 coins onto the page
 //This method is triggered when <select> tag(present in content variable) is clicked
 
 const setTop = function(value){
  setTopNCoin(value);
  getCoinListData(value)
    .then(data =>{
      setError('')
      setCoinListData(
        data 
      )
    })
    .catch(err => {
      setError(err)
    });
}




renderError();

//The below if condition is entered only if the error doesnt exist.
//If stateTracker is true, main page is displayed else coin metric information page is displayed
//The stateTracker is set to false if the particular coin contanier is clicked so that coin metric page be rendered and vice-versa.

  if(!error)
  {
    if(stateTracker){
      showContent =  content;
    }
    else
    {
      showContent =   coinContent;
    }
 }

 

  return (
    <div>
      {showContent}
      {contentError}
     </div>  
  )
}