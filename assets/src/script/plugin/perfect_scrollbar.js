import PerfectScrollbar from 'perfect-scrollbar';
import Tab from 'bootstrap.native/dist/components/tab-native.esm.js'

/* Market Data Tab Perfect Scrollbar */
const MdDivTblHeight    = (document.querySelector('.marketdata').clientHeight - 24) - document.querySelector('.marketdata .marketdata-tabs').clientHeight;

const MdTabSymArea      = document.querySelector('.marketdata-tabsymbol');
const MdTabSymScrllHead = document.querySelector('.marketdata-tabsymbol-table .scrollbar-tbl-th');
const MdTabSymScrllBody = document.querySelector('.marketdata-tabsymbol-table .scrollbar-tbl-tb');
const MdTabLstArea      = document.querySelector('.marketdata-tablast');
const MdTabLstScrllHead = document.querySelector('.marketdata-tablast-table .scrollbar-tbl-th');
const MdTabLstScrllBody = document.querySelector('.marketdata-tablast-table .scrollbar-tbl-tb');

const psMtTabSym        = new PerfectScrollbar(MdTabSymScrllBody, {wheelSpeed: 0.50, wheelPropagation: true, minScrollbarLength: 10, suppressScrollX: true});
const psMtTabLst        = new PerfectScrollbar(MdTabLstScrllBody, {wheelSpeed: 0.50, wheelPropagation: true, minScrollbarLength: 10, suppressScrollX: true});


document.addEventListener('DOMContentLoaded',()=>{
    if (MdTabSymScrllBody.querySelectorAll('.ps--active-y')){MdTabSymScrllHead.classList.add('active-y');}
    if (MdTabLstScrllBody.querySelectorAll('.ps--active-y')){MdTabLstScrllHead.classList.add('active-y');}

    MdTabSymScrllBody.style.height = (MdDivTblHeight - MdTabSymScrllHead.clientHeight - 36) + "px";
    MdTabLstScrllBody.style.height = (MdDivTblHeight - MdTabLstScrllHead.clientHeight - 36) + "px";

    psMtTabSym.update();
    psMtTabLst.update();

});

const MdTabArea = document.querySelector('.marketdata .marketdata-tabs');
MdTabArea.addEventListener('show.bs.tab', function(){

    psMtTabSym.update();
    psMtTabLst.update();

}, true);


window.addEventListener("resize", ()=>{
    //console.log('resize!');

    MdTabSymScrllBody.style.height = (MdDivTblHeight - MdTabSymScrllHead.clientHeight - 36) + "px";
    MdTabLstScrllBody.style.height = (MdDivTblHeight - MdTabLstScrllHead.clientHeight - 36) + "px";

    psMtTabSym.update();
    psMtTabLst.update();

}, true);
/* Market Data Tab Perfect Scrollbar */

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

document.addEventListener('DOMContentLoaded',()=>{
    if (OoTabOorScrllBody.querySelectorAll('.ps--active-y')){OoTabOorScrllHead.classList.add('active-y');}
    if (OoTabHstScrllBody.querySelectorAll('.ps--active-y')){OoTabHstScrllHead.classList.add('active-y');}

    OoTabHstScrllTble.addEventListener('ps-scroll-x', () =>{
        OoTabHstScrllTble.style.width    = OoTabHstArea.clientWidth + "px";
    });

    psOoTabOOr.update();
    psOoTabHTb.update();
    psOoTabHst.update();
});
/* Open Orders Tab Perfect Scrollbar */