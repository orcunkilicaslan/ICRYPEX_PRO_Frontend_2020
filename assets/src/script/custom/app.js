
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

/* Progress Range Start - https://css-tricks.com/value-bubbles-for-range-inputs */
const allRanges = document.querySelectorAll(".rangeprogress");
allRanges.forEach(wrap => {
    const range     = wrap.querySelector(".rangeprogress .rangeprogress-range");
    const bubble    = wrap.querySelector(".rangeprogress .rangeprogress-bubble");
    const circle    = wrap.querySelector(".rangeprogress .rangeprogress-circle");
    const progress  = wrap.querySelector(".rangeprogress .rangeprogress-progress .progress-bar");

    range.addEventListener("input", () => {
        setBubble(range, bubble, circle, progress);
    });
    setBubble(range, bubble, circle, progress);
});

function setBubble(range, bubble, circle, progress) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));

    bubble.innerHTML =  "%" + val;
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;

    progress.style.width = newVal + "%";

    circle.setAttribute('data-val', newVal);
}
/* Progress Range End */