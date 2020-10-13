/* Tooltip */
$(function(){
    $('[data-toggle="tooltip"]').tooltip()
});
/* Tooltip */

/* Popovers */
$(function () {
    $('[data-toggle="popover"]').popover()
});
/* Popovers */

/* Perfect Scrollbar */
const ps = new PerfectScrollbar('.JSPerfectScrollbar', {
    wheelSpeed: 0.25,
    wheelPropagation: true,
    minScrollbarLength: 10,
    suppressScrollX: true
});
/* Perfect Scrollbar */