
import PerfectScrollbar from 'perfect-scrollbar';
import Chartist from "chartist";
import Modal from "bootstrap.native/dist/components/modal-native";


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



    // Assets Address BTC Perfect Scrollbar
    const psOoTabAssAdrBtc = new PerfectScrollbar(ooTabAssAdrTabBtcScrllBody, {
        wheelSpeed: 0.50,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollX: true
    });
    if (ooTabAssAdrTabBtcScrllBody.querySelectorAll('.ps--active-y')){
        ooTabAssAdrTabBtcScrllHead.classList.add('active-y');
    }



    // Account Activities Pending Perfect Scrollbar
    const psOoTabActPendTblPend = new PerfectScrollbar(ooTabActPendScrllBody, {
        wheelSpeed: 0.50,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollX: true
    });
    if (ooTabActPendScrllBody.querySelectorAll('.ps--active-y')){
        ooTabActPendScrllHead.classList.add('active-y');
    }



    // Account Activities Pending Perfect Scrollbar
    const psOoTabActHistTblPend = new PerfectScrollbar(ooTabActHistScrllBody, {
        wheelSpeed: 0.50,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollX: true
    });
    if (ooTabActHistScrllBody.querySelectorAll('.ps--active-y')){
        ooTabActHistScrllHead.classList.add('active-y');
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