
import PerfectScrollbar from 'perfect-scrollbar';
import Chartist from "chartist";


/* Variables */
const OoTabOorTabCont       = document.querySelector('.openorders-taborders');
const ooTabOorScrllHead     = document.querySelector('.openorders-taborders-table .scrollbar-tbl-th');
const ooTabOorScrllBody     = document.querySelector('.openorders-taborders-table .scrollbar-tbl-tb');
const ooTabHstTabCont       = document.querySelector('.openorders-tabhistory');
const ooTabHstScrllTble     = document.querySelector('.openorders-tabhistory-table .scrollbar-horizontal');
const ooTabHstScrllHead     = document.querySelector('.openorders-tabhistory-table .scrollbar-tbl-th');
const ooTabHstScrllBody     = document.querySelector('.openorders-tabhistory-table .scrollbar-tbl-tb');
const ooTabHstTblBrwsWrp    = document.querySelectorAll('.openorders-tabhistory-table .scrollbar-tbl-tb .hsttblbrwswrp');
const ooTabHstTblBrwsBtn    = document.querySelectorAll('.openorders-tabhistory-table .scrollbar-tbl-tb .hsttblbrwswrp .hsttblbrwstr');
const ooTabHstTblBrwsDiv    = document.querySelectorAll('.openorders-tabhistory-table .scrollbar-tbl-tb .hsttblbrwswrp .hsttblbrwstbl');
/* Variables */


/* Document Load Open Orders Start */
document.addEventListener('DOMContentLoaded',()=>{


    // Open Order Perfect Scrollbar
    const psOoTabOOr = new PerfectScrollbar(ooTabOorScrllBody, {
        wheelSpeed: 0.50,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollX: true
    });
    if (ooTabOorScrllBody.querySelectorAll('.ps--active-y')){
        ooTabOorScrllHead.classList.add('active-y');
    }



    // Transaction History Perfect Scrollbar (Horizontal)
    const psOoTabHTb = new PerfectScrollbar(ooTabHstScrllTble, {
        wheelSpeed: 0.50,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollY: true
    });
    ooTabHstScrllTble.addEventListener('ps-scroll-x', () =>{
        ooTabHstScrllTble.style.width = ooTabHstTabCont.clientWidth + "px";
    });



    // Transaction History Perfect Scrollbar (Vertical)
    const psOoTabHst = new PerfectScrollbar(ooTabHstScrllBody, {
        wheelSpeed: 0.50,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollX: true
    });
    if (ooTabHstScrllBody.querySelectorAll('.ps--active-y')){
        ooTabHstScrllHead.classList.add('active-y');
    }



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
    const ooAssetsDonutChart = new Chartist.Pie('.assettabcont-chartarea .assettabcont-donutchart .asssetdonutchrt', {
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