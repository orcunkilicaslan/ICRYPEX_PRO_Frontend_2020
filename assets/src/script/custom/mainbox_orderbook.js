
/* Order Book Chartist */
import Chartist from "chartist";

const obChartBarDataBuy = {
    series: [
        [1,2,3,4,5,7,9,11,12,13,15,18]
    ]
};

const obChartBarOptionsBuy = {
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
};

const obChartBarDataSell = {
    series: [
        [1,2,3,4,5,7,9,11,12,13,15,18]
    ]
};

const obChartBarOptionsSell = {
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
};

const obRectangleBarChartBuy = new Chartist.Bar('.orderbook-chartarea-rectangle .orderbookchartbuy', obChartBarDataBuy, obChartBarOptionsBuy);
const obRectangleBarChartSell = new Chartist.Bar('.orderbook-chartarea-rectangle .orderbookchartsell', obChartBarDataSell, obChartBarOptionsSell);
/* Order Book Chartist */