/* Market Data Start */
function mdTabsArea() {

    // Tab Content
    const mdTabContent      = document.querySelector('.marketdata-tabs > .tab-content');

    // Symbol
    const mdTabSymTable     = document.querySelector('.marketdata-tabs .mdsymboltable');
    const mdTabSymTblTh     = document.querySelector('.marketdata-tabs .mdsymboltable .scrollbar-tbl-th');
    const mdTabSymTblTb     = document.querySelector('.marketdata-tabs .mdsymboltable .scrollbar-tbl-tb');
    mdTabSymTblTb.style.height = (mdTabContent.clientHeight - mdTabSymTblTh.clientHeight - 60) + "px";

    // Last Transactions
    const mdTabLstTable     = document.querySelector('.marketdata-tabs .mdlasttable');
    const mdTabLstTblTh     = document.querySelector('.marketdata-tabs .mdlasttable .scrollbar-tbl-th');
    const mdTabLstTblTb     = document.querySelector('.marketdata-tabs .mdlasttable .scrollbar-tbl-tb');
    mdTabLstTblTb.style.height = (mdTabContent.clientHeight - mdTabLstTblTh.clientHeight - 60) + "px";

}
/* Market Data End */

/* Document Load Market Data Start */
document.addEventListener("DOMContentLoaded", mdTabsArea);
window.addEventListener("resize", mdTabsArea);
/* Document Load Market Data End */