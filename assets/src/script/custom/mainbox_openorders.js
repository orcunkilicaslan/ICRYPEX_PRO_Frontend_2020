
/* Document Load Open Orders Start */
function ooTabsArea() {
    const ooTabContent              = document.querySelector('.openorders-tabs > .tab-content');
    const ooTabHstTabCont           = document.querySelector('.openorders-tabs .openorders-history');
    const ooTabHstScrllTble         = document.querySelector('.openorders-tabs .openorders-history .ootransactionhistorytable .scrollbar-horizontal');
    const ooTabHstTblBrwsWrp        = document.querySelectorAll('.openorders .openorders-history .ootransactionhistorytable .scrollbar-tbl-tb .hsttblbrwswrp');
    const ooTabHstTblBrwsBtn        = document.querySelectorAll('.openorders .openorders-history .ootransactionhistorytable .scrollbar-tbl-tb .hsttblbrwswrp .hsttblbrwstr');
    const ooTabHstTblBrwsDiv        = document.querySelectorAll('.openorders .openorders-history .ootransactionhistorytable .scrollbar-tbl-tb .hsttblbrwswrp .hsttblbrwstbl');

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
}

document.addEventListener("DOMContentLoaded", ooTabsArea);
window.addEventListener("resize", ooTabsArea);
/* Document Load Open Orders End */


/* Bootstrap Tab Open Orders */
import Chartist from "chartist";

document.querySelector('.openorders-tabs > .nav-tabs').addEventListener('show.bs.tab', function(e){

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