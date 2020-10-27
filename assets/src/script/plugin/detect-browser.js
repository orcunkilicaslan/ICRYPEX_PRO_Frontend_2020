
/* Detect Browser - https://www.npmjs.com/package/detect-browser */

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


    // handle the case where we don't detect the browser
    switch (browser && browser.name) {
        case 'chrome':
        case 'firefox':
            //console.log('supported');
            break;

        case 'edge':
            //console.log('kinda ok');
            break;

        default:
            //console.log('not supported');
    }


});
/* Document Load Detect Browser End */