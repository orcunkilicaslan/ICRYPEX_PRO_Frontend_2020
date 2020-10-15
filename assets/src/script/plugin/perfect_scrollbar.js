/* Market Data Tab Perfect Scrollbar */
import PerfectScrollbar from 'perfect-scrollbar';

const MdDivTblHeight    = (document.querySelector('.marketdata').clientHeight - 24) - document.querySelector('.marketdata .marketdata-tabs').clientHeight;

const MdTabSymArea      = document.querySelector('.marketdata-tabsymbol');
const MdTabSymScrllHead = document.querySelector('.marketdata-tabsymbol-table .scrollbartbl-th');
const MdTabSymScrllBody = document.querySelector('.marketdata-tabsymbol-table .scrollbartbl-tb');
const MdTabDtlArea      = document.querySelector('.marketdata-tabdetail');
const MdTabDtlScrllHead = document.querySelector('.marketdata-tabdetail-table .scrollbartbl-th');
const MdTabDtlScrllBody = document.querySelector('.marketdata-tabdetail-table .scrollbartbl-tb');
const MdTabLstArea      = document.querySelector('.marketdata-tablast');
const MdTabLstScrllHead = document.querySelector('.marketdata-tablast-table .scrollbartbl-th');
const MdTabLstScrllBody = document.querySelector('.marketdata-tablast-table .scrollbartbl-tb');

const psMtTabSym = new PerfectScrollbar(MdTabSymScrllBody, {wheelSpeed: 0.25, wheelPropagation: true, minScrollbarLength: 10, suppressScrollX: true});
const psMtTabDtl = new PerfectScrollbar(MdTabDtlScrllBody, {wheelSpeed: 0.25, wheelPropagation: true, minScrollbarLength: 10, suppressScrollX: true});
const psMtTabLst = new PerfectScrollbar(MdTabLstScrllBody, {wheelSpeed: 0.25, wheelPropagation: true, minScrollbarLength: 10, suppressScrollX: true});

document.addEventListener('DOMContentLoaded',()=>{
    if (MdTabSymScrllBody.querySelectorAll('.ps--active-y')){MdTabSymScrllHead.classList.add('active-y');}
    if (MdTabDtlScrllBody.querySelectorAll('.ps--active-y')){MdTabDtlScrllHead.classList.add('active-y');}
    if (MdTabLstScrllBody.querySelectorAll('.ps--active-y')){MdTabLstScrllHead.classList.add('active-y');}

    MdTabSymScrllBody.style.height = (MdDivTblHeight - MdTabSymScrllHead.clientHeight - 36) + "px";
    MdTabDtlScrllBody.style.height = (MdDivTblHeight - MdTabDtlScrllHead.clientHeight - 36) + "px";
    MdTabLstScrllBody.style.height = (MdDivTblHeight - MdTabLstScrllHead.clientHeight - 36) + "px";

    psMtTabSym.update();
    psMtTabDtl.update();
    psMtTabLst.update();
});


window.addEventListener("resize", ()=>{
    //console.log('resize!');

    MdTabSymScrllBody.style.height = (MdDivTblHeight - MdTabSymScrllHead.clientHeight - 36) + "px";
    MdTabDtlScrllBody.style.height = (MdDivTblHeight - MdTabDtlScrllHead.clientHeight - 36) + "px";
    MdTabLstScrllBody.style.height = (MdDivTblHeight - MdTabLstScrllHead.clientHeight - 36) + "px";

    psMtTabSym.update();
    psMtTabDtl.update();
    psMtTabLst.update();

}, true);
/* Market Data Tab Perfect Scrollbar */