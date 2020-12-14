import React from 'react';
import './public/chart.css';
import {Line} from 'react-chartjs-2';
import PricePercent from './PricePercent.jsx';


export default function Chart({coinChartData,coinName,err}) {

    let chart= coinChartData
    let price= [];
    let date = [];
    let percent = [];


    if(chart.length===0 || err)
     return null;


    const separateDateAndPrice = function(priceData){
      
      for(let i = 0;i<priceData.length;i++){
        date[i] = new Date(priceData[i][0]).toLocaleDateString("en-US");
        price[i] = priceData[i][1];
      }
    }

    separateDateAndPrice(chart.prices);

    //Set the chart data
    const data = {
      labels: date,
      datasets: [
        {
          fill: false,
          backgroundColor: '#24bbf2',
          borderColor: '#24bbf2',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#24bbf2',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#24bbf2',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: price,
        }
      ]
    };

    const lineOptions = {
      
      title: {
        display: true,
        text: coinName.toUpperCase()[0]+coinName.substring(1)+" Price History"
    },
      
      scales: {
          xAxes: [{
               type: 'time',
            display: true,
            scaleLabel: {
              display: true,
              labelString: coinName.toUpperCase()
            }
          }],
        yAxes: [{
         
          gridLines: {
            display: false,
          },
        
          ticks: {
            beginAtZero:true
        },
        
        scaleLabel: {
          display: true,
          labelString: 'Price in ($)'
          }
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: true,
      },
      
    };
    
    //This method calcualtes the percent change in price
    const calculatePricePercent = function(){

      percent[0] = (((price[price.length-1]-price[price.length-2])/(price[price.length-1]+price[price.length-2]))*100).toFixed(2)+"%";
      percent[1] = (((price[price.length-1]-price[price.length-8])/(price[price.length-1]+price[price.length-8]))*100).toFixed(2)+"%";
      percent[2] = (((price[price.length-1]-price[price.length-15])/(price[price.length-1]+price[price.length-15]))*100).toFixed(2)+"%";
      
      
      //Check if coin exists one month ago
      if(!price[price.length-31]){
        percent[3] = "Coin Not Created";  
      }
      else
        percent[3] = (((price[price.length-1]-price[price.length-31])/(price[price.length-1]+price[price.length-31]))*100).toFixed(2)+"%";

      //Check if coin exists 1 year ago
      if(!price[price.length-366]){
        percent[4] = "Coin Not Created";  
      }
      else
        percent[4] = (((price[price.length-1]-price[price.length-366])/(price[price.length-1]+price[price.length-366]))*100).toFixed(2)+"%";
    }
    
    calculatePricePercent();

    return (
      <div>
        <div className ="chart">
            <Line data={data} options={lineOptions} />     
        </div>
        <PricePercent percent = {percent}/>      
      </div>
    )
}
