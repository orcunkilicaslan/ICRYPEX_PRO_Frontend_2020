
import PerfectScrollbar from 'perfect-scrollbar';

const modalCompNewsAnalysisCont     = document.querySelector('.modalcomp-newsanalysis');
const modalCompNewsScrllBody        = document.querySelector('.modalcomp-newsanalysis .modalcomp-wrp .modalcomp-news');
const modalCompAnalysisScrllBody    = document.querySelector('.modalcomp-newsanalysis .modalcomp-wrp .modalcomp-analysis');


/* Document Load News and Analysis Start */
document.addEventListener('DOMContentLoaded',()=>{


    // Modal News Perfect Scrollbar
    const psModalCompNewsList = new PerfectScrollbar(modalCompNewsScrllBody, {
        wheelSpeed: 0.50,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollX: true
    });

    // Modal Analysis Perfect Scrollbar
    const psModalCompAnalysisList = new PerfectScrollbar(modalCompAnalysisScrllBody, {
        wheelSpeed: 0.50,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollX: true
    });


});
/* Document Load News and Analysis End */