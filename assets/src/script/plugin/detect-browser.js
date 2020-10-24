
/* Detect Browser - https://www.npmjs.com/package/detect-browser */
const {detect} = require('detect-browser');
const browser = detect();

document.querySelector('html').classList.add(browser.name);

if (browser) {
    //console.log(browser.name);
    //console.log(browser.version);
    //console.log(browser.os);
}

if (browser.name === "chrome") {
    //console.log("Bu tarayıcı chrome");
}
/* Detect Browser */