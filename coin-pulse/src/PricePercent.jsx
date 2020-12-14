import React from 'react';
import './public/price-change.css';

export default function PricePercent({percent}) {
    return (
        <div className="price-percent-table">  
            <h2 className="price-change-heading">Price Change(%) History</h2>
            <div className="time-heading-2">
                <span> 24h </span>
            </div>
            <div className="price-percent-value-2">
                {percent[0]}
            </div>
            <div className="time-heading-3">
                <span> 7d </span>
            </div>
            <div className="price-percent-value-3">
                {percent[1]}
            </div>
            <div className="time-heading-4">
                <span> 14d </span>
            </div>
            <div className="price-percent-value-4">
                {percent[2]}
            </div>
            <div className="time-heading-5">
                <span> 30d </span>
            </div>
            <div className="price-percent-value-5">
                {percent[3]}
            </div>
            <div className="time-heading-6">
                <span> 1y </span>
            </div>
            <div className="price-percent-value-6">
                {percent[4]}
            </div>
        </div>
    )
}
