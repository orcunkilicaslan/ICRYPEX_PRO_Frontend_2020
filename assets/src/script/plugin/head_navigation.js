/* Header Web Navbar Fixed */
$(document).ready(function() {
    if($(window).width() > 1059){}

    $(window).on("load resize scroll",function(e){

        var scroll  = $(window).scrollTop();
        var body    = $("body");
        var header  = $("header.header");

        if (scroll > (header.height() / 3)) {
            header.addClass("headscroll");
            body.addClass("bodyscroll");
        } else {
            header.removeClass("headscroll");
            body.removeClass("bodyscroll");
        }

    });
});
/* Header Web Navbar Fixed */

/* Daphne Mobile Menu */
$(document).ready(function() {

    // Body Add Class
    $('body').addClass('daphne-navbody');

    // Desktop or Mobile Menu Overlay
    if($(window).width() < 1060){
        $('.daphne-mobile').click(function () {
            $('.daphne-navbody').toggleClass('daphne-moverlay');
        });
    } else {
        $('.daphne-navbar .nav-link[data-toggle="dropdown"]').click(function() {
            $('body').addClass('daphne-doverlay');

            $(document).click(function(event) {
                if (!$(event.target).parent().hasClass('show')) {
                    setTimeout(function () {
                        $('body').removeClass('daphne-doverlay');
                    },250);
                }
            });
        });
    }

});
/* Daphne Mobile Menu */