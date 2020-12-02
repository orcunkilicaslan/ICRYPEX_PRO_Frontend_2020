
import PerfectScrollbar from 'perfect-scrollbar';

const compNotifCont          = document.querySelector('.comp-notif');
const compNotifScrllBody     = document.querySelector('.comp-notif .comp-notif-list');


/* Document Load Notifications Start */
document.addEventListener('DOMContentLoaded',()=>{


    // Notifications Perfect Scrollbar
    const psCompNotifList = new PerfectScrollbar(compNotifScrllBody, {
        wheelSpeed: 0.50,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollX: true
    });


});
/* Document Load Notifications End */