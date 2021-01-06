import OrderBook from "../OrderBook/OrderBook.jsx";
import BuySellAction from "../BuySellAction/BuySellAction.jsx";
import OpenOrder from "../OpenOrder/OpenOrder.jsx";

const MainLayoutFoot = props => {
  return (
    <section className="main-foot main-h100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <OrderBook />
          </div>
          <div className="col-4">
            <BuySellAction />
          </div>
          <div className="col-4">
            <OpenOrder />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainLayoutFoot;
