
/* Detect Browser - https://www.npmjs.com/package/detect-browser */

import PerfectScrollbar from "perfect-scrollbar";


/* Variables */
const {detect}      = require('detect-browser');
const browser       = detect();
/* Variables */


/* Document Load Detect Browser Start */
document.addEventListener('DOMContentLoaded',()=>{


    document.querySelector('html').classList.add(browser.name);

    if (browser) {
        //console.log(browser.name);
        //console.log(browser.version);
        //console.log(browser.os);
    }

    if (browser.name === "chrome") {
        //console.log("Bu tarayıcı chrome");
    }


});
/* Document Load Detect Browser End */