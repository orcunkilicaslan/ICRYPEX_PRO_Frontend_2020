
/* Header News Ticker Start - https://codepen.io/dheerajkawatra/pen/gwdoEJ */
(function() {

    // var t0 = performance.now();

    setInterval(function() {

        const newsTickerBarsArea = document.querySelector('.newstickerbars');
        const newsTickerBarsItem = newsTickerBarsArea.querySelectorAll('.newstickerbars-item');

        for (let i = 0; i < newsTickerBarsItem.length; i++) {
            let x = newsTickerBarsItem[i];
            x.classList.toggle('sliding-now');
        }

        setTimeout(function() {
            newsTickerBarsArea.appendChild(newsTickerBarsItem[0]);
        }, 5000);

    }, 5000);

    // var t1 = performance.now();
    // console.log("Carousel taking " + (t1 - t0) + " milliseconds.");

})();
/* Header News Ticker End */

/* PerfectScrollbar General and Table Multiple Start */
import PerfectScrollbar from 'perfect-scrollbar';

document.addEventListener('DOMContentLoaded',()=>{


    // General Vertical
    const perScrollGeneral = document.querySelectorAll(".jsGeneralScrollbar");
    for (let iSc = 0; iSc < perScrollGeneral.length; iSc++) {

        const psGeneralMultiple = new PerfectScrollbar(perScrollGeneral[iSc], {
            wheelSpeed: 0.50,
            wheelPropagation: true,
            minScrollbarLength: 10,
            suppressScrollX: true
        });

    }


    // Scrollbar Table Vertical
    const perScrollTblTable = document.querySelectorAll(".scrollbar");
    const perScrollTblThead = document.querySelectorAll(".scrollbar .scrollbar-tbl-th");
    const perScrollTblTbody = document.querySelectorAll(".scrollbar .scrollbar-tbl-tb");
    for (let iTbody = 0; iTbody < perScrollTblTbody.length; iTbody++) {

        const psTableMultiple = new PerfectScrollbar(perScrollTblTbody[iTbody], {
            wheelSpeed: 0.50,
            wheelPropagation: true,
            minScrollbarLength: 10,
            suppressScrollX: true
        });

        for (let iThead = 0; iThead < perScrollTblThead.length; iThead++) {

            if (perScrollTblTbody[iTbody].querySelectorAll('.ps--active-y')){
                perScrollTblThead[iThead].classList.add('active-y');
            }

        }
    }


    //  Scrollbar Table Horizontal
    const perScrollTblHoriz = document.querySelectorAll(".scrollbar .scrollbar-horizontal");
    for (let iHoriz = 0; iHoriz < perScrollTblHoriz.length; iHoriz++) {

        const psHorizMultiple = new PerfectScrollbar(perScrollTblHoriz[iHoriz], {
            wheelSpeed: 0.50,
            wheelPropagation: true,
            minScrollbarLength: 10,
            suppressScrollY: true
        });

    }

});
/* PerfectScrollbar General and Table Multiple End */

/* Dropzone Multiple Start */
import Dropzone from 'dropzone';

const dzoneGeneral = document.querySelectorAll(".dropzone");
for (let iDz = 0; iDz < dzoneGeneral.length; iDz++) {

    var dzoneMultiple = new Dropzone(dzoneGeneral[iDz], {
        thumbnailWidth: null,
        thumbnailHeight: null
    });

}
/* Dropzone Multiple End */

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

/* Show/Hide Password Start */
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
/* Show/Hide Password End */

/* Copy Text to Clipboard Start */
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

            //console.log("Kopyalandı: " + text);
            document.querySelector('[data-toggle="copytocliptoasttext"]').innerHTML = text;

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
/* Copy Text to Clipboard End */

/* Window Full Screen Show */
document.querySelector('[data-toggle="fullscreenbtn"]').addEventListener("click", function (e) {
    e.preventDefault();

    var target = e.target;

    if(IsFullScreenCurrently()) {
        GoOutFullscreen();
        target.classList.replace("show", "hide");
    }
    else {
        GoInFullscreen(document.querySelector("body"));
        target.classList.replace("hide", "show");
    }

});

document.addEventListener('fullscreenchange', function() {

    var iconShowHideIcon = document.querySelector(".header .sm-pagefullscreen");

    if(IsFullScreenCurrently()) {
        iconShowHideIcon.classList.replace("hide", "show");
        //console.log('Full Screen Mode Enabled');
    }
    else {
        iconShowHideIcon.classList.replace("show", "hide");
        //console.log('Full Screen Mode Disabled');
    }
});

function GoInFullscreen(element) {

    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen){
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen){
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen){
        element.msRequestFullscreen();
    }
}

function GoOutFullscreen() {

    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
    } else if(document.msExitFullscreen){
        document.msExitFullscreen();
    }
}

function IsFullScreenCurrently() {
    var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;

    if(full_screen_element === null) {
        return false;
    } else {
        return true;
    }
}
/* Window Full Screen End */

/* Enabling and Disabling Form Field Elements Start - https://www.qodo.co.uk/blog/javascript-enabling-and-disabling-form-field-elements/ */
function toggleFormElements(bDisabled) {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = bDisabled;
    }
    var selects = document.getElementsByTagName("select");
    for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = bDisabled;
    }
    var textareas = document.getElementsByTagName("textarea");
    for (var i = 0; i < textareas.length; i++) {
        textareas[i].disabled = bDisabled;
    }
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = bDisabled;
    }
}
/* Enabling and Disabling Form Field Elements End */