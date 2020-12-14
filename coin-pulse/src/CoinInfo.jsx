import React from 'react';
import CoinKeyStats from './CoinKeyStats';
import EcosystemLinks from './EcosystemLinks';
import CoinDescription from './CoinDescription'
import Chart from './Chart';

export default function CoinInfo({coin,setCryptoPulseState,chartData,err}) {
    
    const goBack = function(){
        setCryptoPulseState(true);
    }
    
   
     if(coin.length===0 || err)
        return null; 
    
        return (
      
      <div>
          <div className="go-back" onClick={()=>{goBack()}}>
            <span>Go Back</span>
         </div>
        <div className="container">    
            <CoinKeyStats coin = {coin}/>
            <Chart  coinChartData={chartData} coinName={coin.id}/>
            <EcosystemLinks coin = {coin}/>
            <CoinDescription coin = {coin}/>
        </div>
        </div>    
            
    )
}
