import React from 'react';
import './public/coin-stats.css'

export default function CoinKeyStats({coin}) {




    return (
        <div>
            <div className="coin-stats">
                <h1 className="coin-stats-header">Coin Key Stats:</h1>
                <div>
                    <span className="coin-stat-element"> <label>Current Price : </label> <span  id="current-price">${coin.market_data.current_price.usd.toLocaleString()}</span> </span>
                    <span className="coin-stat-element" > <label>Price Change in 7d : </label> <span id="price-change">{coin.market_data.price_change_percentage_7d.toFixed(2)}% </span></span>
                    <span className="coin-stat-element" > <label>All Time High : </label> <span id="all-time-high">${coin.market_data.ath.usd.toLocaleString()} </span></span>
                    <span className="coin-stat-element" > <label>Market Cap : </label> <span id="market-cap">${coin.market_data.market_cap.usd.toLocaleString()}</span> </span>
                    <span className="coin-stat-element" > <label>Volume : </label> <span id="volume">${coin.market_data.total_volume.usd.toLocaleString()} </span></span>
                    <span className="coin-stat-element" > <label>Circulating Supply : </label> <span id="supply">{coin.market_data.circulating_supply.toLocaleString()} </span></span>
                </div>
            </div>
        </div>
    )
}
