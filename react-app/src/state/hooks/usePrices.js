import { useSelector } from "react-redux";

const usePrices = (props = {}) => {
  const { all, selected, fiatCurrency, cryptoCurrency } = useSelector(
    state => state.pair
  );
  const pricesData = useSelector(state => state.socket.prices);

  return {
    allPrices: pricesData,
    allPairs: all,
    selectedPair: selected,
    selectedPrice: pricesData?.find(
      ({ symbol }) => symbol === selected?.symbol
    ),
    fiatCurrency,
    cryptoCurrency,
  };
};

export default usePrices;
