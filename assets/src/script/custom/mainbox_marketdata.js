
import PerfectScrollbar from 'perfect-scrollbar';


/* Variables */
const mdDivTblHeight        = (document.querySelector('.marketdata').clientHeight - 24) - document.querySelector('.marketdata .marketdata-tabs').clientHeight;
const mdTabSymTabCont       = document.querySelector('.marketdata .marketdata-tabsymbol');
const mdTabSymScrllHead     = document.querySelector('.marketdata .marketdata-tabsymbol .mdsymboltable .scrollbar-tbl-th');
const mdTabSymScrllBody     = document.querySelector('.marketdata .marketdata-tabsymbol .mdsymboltable .scrollbar-tbl-tb');
const mdTabLstTabCont       = document.querySelector('.marketdata .marketdata-tablast');
const mdTabLstScrllHead     = document.querySelector('.marketdata .marketdata-tablast .mdlasttable .scrollbar-tbl-th');
const mdTabLstScrllBody     = document.querySelector('.marketdata .marketdata-tablast .mdlasttable .scrollbar-tbl-tb');
/* Variables */


/* Document Load Market Data Start */
document.addEventListener('DOMContentLoaded',()=>{


    // Market Data Symbol Perfect Scrollbar
    const psMtTabSym = new PerfectScrollbar(mdTabSymScrllBody, {
        wheelSpeed: 0.50,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollX: true
    });
    if (mdTabSymScrllBody.querySelectorAll('.ps--active-y')){
        mdTabSymScrllHead.classList.add('active-y');
    }
    mdTabSymScrllBody.style.height = (mdDivTblHeight - mdTabSymScrllHead.clientHeight - 36) + "px";



    // Market Data Last Transactions Perfect Scrollbar
    const psMtTabLst = new PerfectScrollbar(mdTabLstScrllBody, {
        wheelSpeed: 0.50,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollX: true
    });
    if (mdTabLstScrllBody.querySelectorAll('.ps--active-y')){
        mdTabLstScrllHead.classList.add('active-y');
    }
    mdTabLstScrllBody.style.height = (mdDivTblHeight - mdTabLstScrllHead.clientHeight - 20) + "px";


});
/* Document Load Market Data End */