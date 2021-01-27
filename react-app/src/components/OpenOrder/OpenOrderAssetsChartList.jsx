import ChartistGraph from "react-chartist";

const assetbalancelist = [
  {
    currency: "TRY",
    balance: "0.00000000",
  },
  {
    currency: "USD",
    balance: "0.00000000",
  },
  {
    currency: "BTC",
    balance: "0.00000000",
  },
  {
    currency: "LTC",
    balance: "0.00000000",
  },
  {
    currency: "ETH",
    balance: "0.00000000",
  },
  {
    currency: "XRP",
    balance: "0.00000000",
  },
  {
    currency: "BAT",
    balance: "0.00000000",
  },
  {
    currency: "LINK",
    balance: "0.00000000",
  },
  {
    currency: "XLM",
    balance: "0.00000000",
  },
  {
    currency: "AVAX",
    balance: "0.00000000",
  },
  {
    currency: "TRYB",
    balance: "0.00000000",
  },
  {
    currency: "MPAY",
    balance: "0.00000000",
  }
];

const assetchartlistdata = {
  labels: ['TRY','USD','BTC','LTC','ETH','XRP','BAT','LINK','XLM','AVAX','TRYB','MPAY'],
  series: [5,15,30,10,6,7,4,1,3,5,6,8]
};

const assetchartlistoptions = {
  donut: true,
  donutWidth: 8,
  donutSolid: true,
  startAngle: 0,
  showLabel: false,
  labelPosition: 'outside'
};

const assetchartlisttype = "Pie";

const OpenOrderAssetsChartList = props => {

  return (
      <div className="assets-chartlist">
        <div className="assetchartarea">
          <div className="assetchartarea-donut">
            <ChartistGraph
                className="asssetdonutchrt"
                data={assetchartlistdata}
                options={assetchartlistoptions}
                type={assetchartlisttype}
            />
            <div className="asssetdonutinfo">
              <div className="asssetdonutinfo-box">
                <h6>Toplam</h6>
                <p>1.350.750,00 TRY</p>
                <p>0.0028200 BTC</p>
              </div>
            </div>
          </div>
          <div className="assetchartarea-list">
            <ul className="asssetalllist">

              {assetbalancelist.map(({ currency, balance }) => {
                return (
                    <li className={`asssetcurr-${currency.toLowerCase()}`} key={currency}>
                      <div className="circle"><i></i></div>
                      <div className="info"><h6>{currency}</h6><p>{balance}</p></div>
                    </li>
                );
              })}

            </ul>
          </div>
        </div>
      </div>
  );
};

export default OpenOrderAssetsChartList;
