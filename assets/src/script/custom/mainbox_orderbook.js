
import Chartist from "chartist";


/* Document Load Order Book Start */
document.addEventListener('DOMContentLoaded',()=>{


    // Order Book BuySide Horizontal Bars Chartist
    const obRectangleBarChartBuy = new Chartist.Bar('.orderbook .orderbook-chartarea-rectangle .orderbookchartbuy', {
        series: [[1,2,3,4,5,7,9,11,12,13,15,18]]
    },{
        reverseData: false,
        horizontalBars: true,
        fullWidth: true,
        axisX:{
            offset: 0
        },
        axisY:{
            offset: 0
        },
        chartPadding:{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    });



    // Order Book SellSide Horizontal Bars Chartist
    const obRectangleBarChartSell = new Chartist.Bar('.orderbook .orderbook-chartarea-rectangle .orderbookchartsell', {
        series: [[1,2,3,4,5,7,9,11,12,13,15,18]]
    },{
        reverseData: true,
        horizontalBars: true,
        fullWidth: true,
        axisX:{
            offset: 0
        },
        axisY:{
            offset: 0
        },
        chartPadding:{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    });


});
/* Document Load Order Book End */