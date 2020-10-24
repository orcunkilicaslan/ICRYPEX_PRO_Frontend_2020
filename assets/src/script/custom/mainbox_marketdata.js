import PerfectScrollbar from 'perfect-scrollbar';
/* import Tab from 'bootstrap.native/dist/components/tab-native.esm.js' */

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
/* Market Data Tab Perfect Scrollbar */


const MdTabArea = document.querySelector('.marketdata .marketdata-tabs');
MdTabArea.addEventListener('show.bs.tab', function(){

    psMtTabSym.update();
    psMtTabLst.update();

}, true);


document.addEventListener('DOMContentLoaded',()=>{
    if (MdTabSymScrllBody.querySelectorAll('.ps--active-y')){MdTabSymScrllHead.classList.add('active-y');}
    if (MdTabLstScrllBody.querySelectorAll('.ps--active-y')){MdTabLstScrllHead.classList.add('active-y');}

    MdTabSymScrllBody.style.height = (MdDivTblHeight - MdTabSymScrllHead.clientHeight - 36) + "px";
    MdTabLstScrllBody.style.height = (MdDivTblHeight - MdTabLstScrllHead.clientHeight - 36) + "px";

    psMtTabSym.update();
    psMtTabLst.update();

});


window.addEventListener("resize", ()=>{
    //console.log('resize!');

    MdTabSymScrllBody.style.height = (MdDivTblHeight - MdTabSymScrllHead.clientHeight - 36) + "px";
    MdTabLstScrllBody.style.height = (MdDivTblHeight - MdTabLstScrllHead.clientHeight - 36) + "px";

    psMtTabSym.update();
    psMtTabLst.update();

}, true);