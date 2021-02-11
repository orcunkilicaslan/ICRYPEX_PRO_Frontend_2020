
/* Alarm Range Start - https://css-tricks.com/value-bubbles-for-range-inputs */
const allRanges = document.querySelectorAll(".setalarmrange");

allRanges.forEach(wrap => {
    const range     = wrap.querySelector(".setalarmrange .setalarmrange-range");
    const bubble    = wrap.querySelector(".setalarmrange .setalarmrange-bubble");
    const circle    = wrap.querySelector(".setalarmrange .setalarmrange-circle");
    const progress  = wrap.querySelector(".setalarmrange .setalarmrange-progress");
    const progressnegative  = wrap.querySelector(".setalarmrange .setalarmrange-progress .barnegative .progress-bar");
    const progresspositive  = wrap.querySelector(".setalarmrange .setalarmrange-progress .barpositive .progress-bar");

    range.addEventListener("input", () => {
        setBubble(range, bubble, circle, progress, progressnegative, progresspositive);
    });

    setBubble(range, bubble, circle, progress, progressnegative, progresspositive);

    const rangePercent = [-100, -75, -50, -25, 0, 25, 50, 75, 100];
    for (let i = 0; i < rangePercent.length; i++) {
        circle.innerHTML +=  "<span class =" + "val-" + rangePercent[i] + ">" + "</span>";
    }

});

function setBubble(range, bubble, circle, progress, progressnegative, progresspositive) {
    const val = range.value;
    const min = range.min ? range.min : -100;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));

    bubble.innerHTML =  "%" + val;
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;

    if (val === 0 ) {
        progressnegative.style.opacity = "0";
        progresspositive.style.opacity = "0";
    } else if (val < 0) {
        progressnegative.style.opacity = "1";
        progresspositive.style.opacity = "0";
        progressnegative.style.width = (val * -1) + "%";
        progress.classList.remove("valpositive");
        range.classList.remove("valpositive");
        bubble.classList.remove("valpositive");
        progress.classList.add("valnegative");
        range.classList.add("valnegative");
        bubble.classList.add("valnegative");
    } else if (val > 0) {
        progressnegative.style.opacity = "0";
        progresspositive.style.opacity = "1";
        progresspositive.style.width = (val) + "%";
        progress.classList.remove("valnegative");
        range.classList.remove("valnegative");
        bubble.classList.remove("valnegative");
        progress.classList.add("valpositive");
        range.classList.add("valpositive");
        bubble.classList.add("valpositive");
    }

    //progressnegative.style.width = newVal + "%";

    circle.setAttribute('data-val', val);

    if ((val >= 1) && (val <= 24)){
        circle.className = "setalarmrange-circle percstepa00";
    } else if ((val >= 25) && (val <= 49)) {
        circle.className = "setalarmrange-circle percstepa25";
    } else if ((val >= 50) && (val <= 74)) {
        circle.className = "setalarmrange-circle percstepa50";
    } else if ((val >= 75) && (val <= 99)) {
        circle.className = "setalarmrange-circle percstepa75";
    } else if ((val <= -1) && (val >= -24)){
        circle.className = "setalarmrange-circle percstepp00";
    } else if ((val <= -25) && (val >= -49)) {
        circle.className = "setalarmrange-circle percstepp25";
    } else if ((val <= -50) && (val >= -74)) {
        circle.className = "setalarmrange-circle percstepp50";
    } else if ((val <= -75) && (val >= -99)) {
        circle.className = "setalarmrange-circle percstepp75";
    }


}
/* Alarm Range End */