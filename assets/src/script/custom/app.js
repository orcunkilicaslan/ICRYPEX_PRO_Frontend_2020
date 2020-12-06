
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

/* Input Spinner Start */

/* Input Spinner End */

/* Show/Hide Password */
document.querySelectorAll('[data-toggle="showhidepassword"]').forEach(function (el) {
    el.addEventListener("click", function (e) {
        e.preventDefault();

        var target = el.dataset.target;
        document.querySelector(target).focus();

        if (document.querySelector(target).getAttribute('type') === 'password') {
            document.querySelector(target).setAttribute('type', 'text');
        } else {
            document.querySelector(target).setAttribute('type', 'password');
        }

        if (el.dataset.classActive) el.classList.toggle(el.dataset.classActive);
    });
});
/* Show/Hide Password */

/*  Copy Text to Clipboard Start */
import Toast from "bootstrap.native/dist/components/toast-native";

var toastCopyToClip = new Toast('#toastCopyToClipboard');

document.querySelectorAll('[data-toggle="copytoclipboard"]').forEach(function (el) {
    el.addEventListener("click", function (e) {
        e.preventDefault();

        var target = el.dataset.target;
        var element = document.querySelector(target);
        var text = element.innerHTML;

        if (window.clipboardData && window.clipboardData.setData) {
            return clipboardData.setData("Text", text);

        } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";
            document.body.appendChild(textarea);
            textarea.select();

            toastCopyToClip.show();

            console.log("Kopyalandı: " + text);

            try {
                return document.execCommand("copy");
            } catch (ex) {
                console.warn("Panoya kopyalanamadı.", ex);
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }

    });
});
/*  Copy Text to Clipboard End */