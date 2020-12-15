
import Chartist from "chartist";

/* Variables */
const OoTabOorTabCont           = document.querySelector('.openorders .openorders-taborders');
const ooTabOorScrllHead         = document.querySelector('.openorders .openorders-taborders .ooopenorderstable .scrollbar-tbl-th');
const ooTabOorScrllBody         = document.querySelector('.openorders .openorders-taborders .ooopenorderstable .scrollbar-tbl-tb');
const ooTabHstTabCont           = document.querySelector('.openorders .openorders-tabhistory');
const ooTabHstScrllTble         = document.querySelector('.openorders .openorders-tabhistory .ootransactionhistorytable .scrollbar-horizontal');
const ooTabHstScrllHead         = document.querySelector('.openorders .openorders-tabhistory .ootransactionhistorytable .scrollbar-tbl-th');
const ooTabHstScrllBody         = document.querySelector('.openorders .openorders-tabhistory .ootransactionhistorytable .scrollbar-tbl-tb');
const ooTabHstTblBrwsWrp        = document.querySelectorAll('.openorders .openorders-tabhistory .ootransactionhistorytable .scrollbar-tbl-tb .hsttblbrwswrp');
const ooTabHstTblBrwsBtn        = document.querySelectorAll('.openorders .openorders-tabhistory .ootransactionhistorytable .scrollbar-tbl-tb .hsttblbrwswrp .hsttblbrwstr');
const ooTabHstTblBrwsDiv        = document.querySelectorAll('.openorders .openorders-tabhistory .ootransactionhistorytable .scrollbar-tbl-tb .hsttblbrwswrp .hsttblbrwstbl');
const ooTabActTabCont           = document.querySelector('.openorders .openorders-tabactivities');
const ooTabActPendScrllHead     = document.querySelector('.openorders .openorders-tabactivities .activitiespendingtable .scrollbar-tbl-th');
const ooTabActPendScrllBody     = document.querySelector('.openorders .openorders-tabactivities .activitiespendingtable .scrollbar-tbl-tb');
const ooTabActHistScrllHead     = document.querySelector('.openorders .openorders-tabactivities .activitieshistorytable .scrollbar-tbl-th');
const ooTabActHistScrllBody     = document.querySelector('.openorders .openorders-tabactivities .activitieshistorytable .scrollbar-tbl-tb');

const ooTabAssAdrTabBtcCont         = document.querySelector('.openorders .openorders-tabassets .assetsaddress .assetsaddress-tabbtc');
const ooTabAssAdrTabBtcScrllHead    = document.querySelector('.openorders .openorders-tabassets .assetsaddress .assetsaddress-tabbtc .asaddresstable .scrollbar-tbl-th');
const ooTabAssAdrTabBtcScrllBody    = document.querySelector('.openorders .openorders-tabassets .assetsaddress .assetsaddress-tabbtc .asaddresstable .scrollbar-tbl-tb');
/* Variables */


/* Document Load Open Orders Start */
document.addEventListener('DOMContentLoaded',()=>{

    // Transaction History Perfect Scrollbar (Horizontal)
    ooTabHstScrllTble.addEventListener('ps-scroll-x', () =>{
        ooTabHstScrllTble.style.width = ooTabHstTabCont.clientWidth + "px";
    });


    // Transaction History Table Browse
    for (let i = 0; i < ooTabHstTblBrwsWrp.length; i++) {
        ooTabHstTblBrwsWrp.forEach(e => {

            ooTabHstTblBrwsBtn[i].onclick = (e) => {
                ooTabHstTblBrwsBtn[i].classList.toggle("active");
                ooTabHstTblBrwsDiv[i].classList.toggle("show");
                ooTabHstTblBrwsDiv[i].style.maxWidth = (ooTabHstTabCont.clientWidth - 10) + "px";
            };

        });
    }

});
/* Document Load Open Orders End */


/* Bootstrap Tab Open Orders */
document.querySelector('.openorders .openorders-tabs').addEventListener('show.bs.tab', function(e){

    // Asset Tab Donut Chart
    const ooAssetsDonutChart = new Chartist.Pie('.assets .assetchartarea .assetchartarea-donut .asssetdonutchrt', {
        labels: ['TRY','USD','BTC','LTC','ETH','XRP','BAT','LINK','XLM','AVAX','TRYB','MPAY'],
        series: [5,15,30,10,6,7,4,1,3,5,6,8]
    },{
        donut: true,
        donutWidth: 8,
        donutSolid: true,
        startAngle: 0,
        showLabel: false,
        labelPosition: 'outside'
    });


}, true);
/* Bootstrap Tab Open Orders */