
import PerfectScrollbar from 'perfect-scrollbar';

const modalCompAlarmSetCont          = document.querySelector('.modalcomp-setalarm .modalcomp-setalarm-table');
const modalCompAlarmSetScrllHead     = document.querySelector('.modalcomp-setalarm .modalcomp-setalarm-table .setalarmtable .scrollbar-tbl-th');
const modalCompAlarmSetScrllBody     = document.querySelector('.modalcomp-setalarm .modalcomp-setalarm-table .setalarmtable .scrollbar-tbl-tb');


/* Document Load Alarm Set Start */
document.addEventListener('DOMContentLoaded',()=>{


    // Alarm Set Perfect Scrollbar
    const psModalCompSetAlarmTbl = new PerfectScrollbar(modalCompAlarmSetScrllBody, {
        wheelSpeed: 0.50,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollX: true
    });
    if (modalCompAlarmSetScrllBody.querySelectorAll('.ps--active-y')){
        modalCompAlarmSetScrllHead.classList.add('active-y');
    }


});
/* Document Load Alarm Set End */