/* Market Data Tab Perfect Scrollbar */
const MdTabSymScrllHead = document.querySelector('.marketdata-tabsymbol-table .scrollbartbl-th');
const MdTabSymScrllBody = document.querySelector('.marketdata-tabsymbol-table .scrollbartbl-tb');
const MdTabDtlScrllHead = document.querySelector('.marketdata-tabdetail-table .scrollbartbl-th');
const MdTabDtlScrllBody = document.querySelector('.marketdata-tabdetail-table .scrollbartbl-tb');
const MdTabLstScrllHead = document.querySelector('.marketdata-tablast-table .scrollbartbl-th');
const MdTabLstScrllBody = document.querySelector('.marketdata-tablast-table .scrollbartbl-tb');

const psMtTabSym = new PerfectScrollbar(MdTabSymScrllBody, {wheelSpeed: 0.25, wheelPropagation: true, minScrollbarLength: 10, suppressScrollX: true}); psMtTabSym.update();
const psMtTabDtl = new PerfectScrollbar(MdTabDtlScrllBody, {wheelSpeed: 0.25, wheelPropagation: true, minScrollbarLength: 10, suppressScrollX: true}); psMtTabDtl.update();
const psMtTabLst = new PerfectScrollbar(MdTabLstScrllBody, {wheelSpeed: 0.25, wheelPropagation: true, minScrollbarLength: 10, suppressScrollX: true}); psMtTabLst.update();

document.addEventListener("DOMContentLoaded",()=>{
    if (MdTabSymScrllBody.querySelectorAll('.ps--active-y')){MdTabSymScrllHead.classList.add('active-y');}
    if (MdTabDtlScrllBody.querySelectorAll('.ps--active-y')){MdTabDtlScrllHead.classList.add('active-y');}
    if (MdTabLstScrllBody.querySelectorAll('.ps--active-y')){MdTabLstScrllHead.classList.add('active-y');}
});
/* Market Data Tab Perfect Scrollbar */

/* Bootstrap 5 Tooltip */
//let tooltipElement = document.getElementById('tooltip');
//let tooltip = new bootstrap.Tooltip(tooltipElement);
/* Bootstrap 5 Tooltip */