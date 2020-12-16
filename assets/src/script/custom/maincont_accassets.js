
/* Account Assets Donut Chart Start */
import Chartist from "chartist";

const accAssetsDonutChart = new Chartist.Pie('.maincont-account .accassets .assetsdist-donut .asssetdonutchrt', {
    labels: ['TRY','USD','BTC','LTC','ETH','XRP','BAT','LINK','XLM','AVAX','TRYB','MPAY'],
    series: [5,15,30,10,6,7,4,1,3,5,6,8]
},{
    donut: true,
    donutWidth: 10,
    donutSolid: true,
    startAngle: 0,
    showLabel: false,
    labelPosition: 'outside'
});
/* Account Assets Donut Chart End */