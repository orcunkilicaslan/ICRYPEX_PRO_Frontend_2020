
import PerfectScrollbar from 'perfect-scrollbar';

const modalCompNotifCont          = document.querySelector('.modalcomp-notif');
const modalCompNotifScrllBody     = document.querySelector('.modalcomp-notif .modalcomp-notif-list');


/* Document Load Notifications Start */
document.addEventListener('DOMContentLoaded',()=>{


    // Notifications Perfect Scrollbar
    const psModalCompNotifList = new PerfectScrollbar(modalCompNotifScrllBody, {
        wheelSpeed: 0.50,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollX: true
    });


});
/* Document Load Notifications End */