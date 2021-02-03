import OrderBook from "~/components/OrderBook/OrderBook.jsx";
import BuySellAction from "~/components/BuySellAction/BuySellAction.jsx";
import OpenOrder from "~/components/OpenOrder/OpenOrder.jsx";

const ProViewFooter = props => {
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

export default ProViewFooter;