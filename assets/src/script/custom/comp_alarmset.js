
import PerfectScrollbar from 'perfect-scrollbar';

const compAlarmSetCont          = document.querySelector('.comp-setalarm .comp-setalarm-table');
const compAlarmSetScrllHead     = document.querySelector('.comp-setalarm .comp-setalarm-table .setalarmtable .scrollbar-tbl-th');
const compAlarmSetScrllBody     = document.querySelector('.comp-setalarm .comp-setalarm-table .setalarmtable .scrollbar-tbl-tb');


/* Document Load Alarm Set Start */
document.addEventListener('DOMContentLoaded',()=>{


    // Alarm Set Perfect Scrollbar
    const psCompSetAlarmTbl = new PerfectScrollbar(compAlarmSetScrllBody, {
        wheelSpeed: 0.50,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollX: true
    });
    if (compAlarmSetScrllBody.querySelectorAll('.ps--active-y')){
        compAlarmSetScrllHead.classList.add('active-y');
    }


});
/* Document Load Alarm Set End */