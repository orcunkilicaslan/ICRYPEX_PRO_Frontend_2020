import { useSelector } from "react-redux";

const usePrices = (props = {}) => {
  const { selected, fiatCurrency, cryptoCurrency } = useSelector(
    state => state.pair
  );
  const pricesData = useSelector(state => state.socket.prices);

  return {
    selectedPair: selected,
    selectedPrice: pricesData?.find(
      ({ symbol }) => symbol === selected?.symbol
    ),
    fiatCurrency,
    cryptoCurrency,
  };
};

export default usePrices;
