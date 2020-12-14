import React from 'react'
import './public/coin-description.css';

export default function CoinDescription({coin}) {
    
    let setDescription;

    if(!coin.description.en){
        setDescription =  "There is no description for this coin";
    }
    else
        setDescription = coin.description.en;

    return (
        <div>
              <div className="coin-description">
                <h2>What is {coin.name}?</h2>
                <p dangerouslySetInnerHTML={{ __html: setDescription }}/>    
            </div>
        </div>
    )
}
