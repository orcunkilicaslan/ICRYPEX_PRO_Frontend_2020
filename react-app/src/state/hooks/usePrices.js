import { useSelector } from "react-redux";

const usePrices = (props = {}) => {
  const {
    all: allPairs,
    selected: selectedPair,
    fiatCurrency,
    cryptoCurrency,
  } = useSelector(state => state.pair);
  const allPrices = useSelector(state => state.socket.prices);

  return {
    allPrices,
    allPairs,
    selectedPair,
    selectedPrice: allPrices?.find(
      ({ symbol }) => symbol === selectedPair?.symbol
    ),
    fiatCurrency,
    cryptoCurrency,
  };
};

export default usePrices;
