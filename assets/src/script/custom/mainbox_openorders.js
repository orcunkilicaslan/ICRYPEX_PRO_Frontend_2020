
/* Open Orders Tab Perfect Scrollbar */
import PerfectScrollbar from 'perfect-scrollbar';

const OoTabOorArea      = document.querySelector('.openorders-taborders');
const OoTabOorScrllHead = document.querySelector('.openorders-taborders-table .scrollbar-tbl-th');
const OoTabOorScrllBody = document.querySelector('.openorders-taborders-table .scrollbar-tbl-tb');
const OoTabHstArea      = document.querySelector('.openorders-tabhistory');
const OoTabHstScrllTble = document.querySelector('.openorders-tabhistory-table .scrollbar-horizontal');
const OoTabHstScrllHead = document.querySelector('.openorders-tabhistory-table .scrollbar-tbl-th');
const OoTabHstScrllBody = document.querySelector('.openorders-tabhistory-table .scrollbar-tbl-tb');

const psOoTabOOr        = new PerfectScrollbar(OoTabOorScrllBody, {wheelSpeed: 0.50, wheelPropagation: true, minScrollbarLength: 10, suppressScrollX: true});
const psOoTabHTb        = new PerfectScrollbar(OoTabHstScrllTble, {wheelSpeed: 0.50, wheelPropagation: true, minScrollbarLength: 10, suppressScrollY: true});
const psOoTabHst        = new PerfectScrollbar(OoTabHstScrllBody, {wheelSpeed: 0.50, wheelPropagation: true, minScrollbarLength: 10, suppressScrollX: true});


document.addEventListener('DOMContentLoaded',()=>{
    if (OoTabOorScrllBody.querySelectorAll('.ps--active-y')){OoTabOorScrllHead.classList.add('active-y');}
    if (OoTabHstScrllBody.querySelectorAll('.ps--active-y')){OoTabHstScrllHead.classList.add('active-y');}

    OoTabHstScrllTble.addEventListener('ps-scroll-x', () =>{
        OoTabHstScrllTble.style.width = OoTabHstArea.clientWidth + "px";
    });

    psOoTabOOr.update();
    psOoTabHTb.update();
    psOoTabHst.update();
});


document.addEventListener('DOMContentLoaded',()=>{
    const OoHtTblBrwsWrp = document.querySelectorAll('.openorders-tabhistory-table .scrollbar-tbl-tb .hsttblbrwswrp');
    const OoHtTblBrwsBtn = document.querySelectorAll('.openorders-tabhistory-table .scrollbar-tbl-tb .hsttblbrwswrp .hsttblbrwstr');
    const OoHtTblBrwsDiv = document.querySelectorAll('.openorders-tabhistory-table .scrollbar-tbl-tb .hsttblbrwswrp .hsttblbrwstbl');

    for (let i = 0; i < OoHtTblBrwsWrp.length; i++) {

        OoHtTblBrwsWrp.forEach(element => {
            OoHtTblBrwsDiv[i].style.maxWidth = (OoTabHstArea.clientWidth - 10) + "px";
            OoHtTblBrwsBtn[i].onclick = (e) => {
                OoHtTblBrwsBtn[i].classList.toggle("active");
                OoHtTblBrwsDiv[i].classList.toggle("show");
            };
        });

    }
});
/* Open Orders Tab Perfect Scrollbar */



/* Open Orders Assets Chartist */
import Chartist from "chartist";

const OoTabArea = document.querySelector('.openorders .openorders-tabs');
OoTabArea.addEventListener('show.bs.tab', function(){

    const ooAssetsDonutChart = new Chartist.Pie('.ooassetarea-chartarea .tabsasset-donutchart .asssetdonutchrt', {
        labels: ['TRY','USD','BTC','LTC','ETH','XRP','BAT','LINK','XLM','AVAX','TRYB','MPAY'],
        series: [5,15,30,10,6,7,4,1,3,5,6,8]
    }, {
        donut: true,
        donutWidth: 8,
        donutSolid: true,
        startAngle: 0,
        showLabel: false,
        labelPosition: 'outside'
    });

}, true);
/* Open Orders Assets Chartist */
