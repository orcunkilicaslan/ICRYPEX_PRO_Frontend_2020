
/* Header News Ticker Start */
(function() {

  setInterval(function() {

    const newsTickerBarsArea = document.querySelector('.newstickerbars .newstickerbars-box');
    const newsTickerBarsItem = newsTickerBarsArea.querySelectorAll('.newstickerbars-item');

    for (let i = 0; i < newsTickerBarsItem.length; i++) {
      let x = newsTickerBarsItem[i];
      x.classList.toggle('sliding-now');
    }

    setTimeout(function() {
      newsTickerBarsArea.appendChild(newsTickerBarsItem[0]);
    }, 5000);

  }, 5000);

})();
/* Header News Ticker End */
