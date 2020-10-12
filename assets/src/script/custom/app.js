
/* Header News Ticker Start - https://codepen.io/dheerajkawatra/pen/gwdoEJ */
(function() {
    // var t0 = performance.now();
    setInterval(function() {
        var parent = document.querySelector('.newstickerbars');
        var slide = parent.querySelectorAll('.newstickerbars-item');

        for (var i = 0; i < slide.length; i++) {
            var x = slide[i];
            x.classList.toggle('sliding-now');
        }

        setTimeout(function() {
            parent.appendChild(slide[0]);
        }, 5000);

    }, 5000);
    // var t1 = performance.now();
    // console.log("Carousel taking " + (t1 - t0) + " milliseconds.");
})();
/* Header News Ticker End */