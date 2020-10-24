import PerfectScrollbar from 'perfect-scrollbar';
import Chartist from "chartist";

/* Open Orders Tab Perfect Scrollbar */
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
/* Open Orders Tab Perfect Scrollbar */


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



/* Open Orders Tab Chartist */
new Chartist.Pie('.openorders-tabassets .ct-chart', {
    series: [20, 10, 30, 40]
}, {
    donut: true,
    donutWidth: 10,
    donutSolid: true,
    startAngle: 270,
    showLabel: true
});
/* Open Orders Tab Chartist */
