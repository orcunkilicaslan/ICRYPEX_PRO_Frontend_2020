
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

/* Buy-Sell Action Range Start */
const allRanges = document.querySelectorAll(".buysellaction-form .rangewrp");
allRanges.forEach(wrap => {
    const range = wrap.querySelector(".buysellaction-form .rangewrp .custom-range");
    const bubble = wrap.querySelector(".buysellaction-form .rangewrp .range-bubble");

    range.addEventListener("input", () => {
        setBubble(range, bubble);
    });
    setBubble(range, bubble);
});

function setBubble(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;

    // Sorta magic numbers based on size of the native UI thumb
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}
/* Buy-Sell Action Range End */