
/* Document Load Market Data Start */
function mdTabsArea() {
    const mdTabContent      = document.querySelector('.marketdata-tabs > .tab-content');
    const mdTabSymTblTh     = document.querySelector('.marketdata-tabs .mdsymboltable .scrollbar-tbl-th');
    const mdTabSymTblTb     = document.querySelector('.marketdata-tabs .mdsymboltable .scrollbar-tbl-tb');
    const mdTabLstTblTh     = document.querySelector('.marketdata-tabs .mdlasttable .scrollbar-tbl-th');
    const mdTabLstTblTb     = document.querySelector('.marketdata-tabs .mdlasttable .scrollbar-tbl-tb');

    // Market Data Symbol
    mdTabSymTblTb.style.height = (mdTabContent.clientHeight - mdTabSymTblTh.clientHeight - 60) + "px";

    // Market Data Last Transactions
    mdTabLstTblTb.style.height = (mdTabContent.clientHeight - mdTabLstTblTh.clientHeight - 50) + "px";


}

document.addEventListener("DOMContentLoaded", mdTabsArea);
window.addEventListener("resize", mdTabsArea);
/* Document Load Market Data End */