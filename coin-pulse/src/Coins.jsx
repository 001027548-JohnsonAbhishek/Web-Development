import React from 'react';
import './public/coin.css';

export default function Coins({sNo,image,name,price,coinId}) {



    return (
        
            <div className="coin-container" id={"coin-container-"+coinId+"-info"}>
                <div className="coin-rank"><p>{sNo}</p></div>
                <div className="name"><p id={"coin-container-"+coinId+"-name"}><img src={image} rel="Coin Symbol"></img>  {name}</p></div>
                <div id={"coin-container-"+coinId+"-price"}><p id={"coin-container-"+coinId+"-value"} className="price-value">${price.toLocaleString()}</p></div>
            </div>
    )
}
