import { useMemo } from "react";
import { useSelector } from "react-redux";

const usePrices = () => {
  const {
    all: allPairs,
    selected: selectedPair,
    fiatCurrency,
    cryptoCurrency,
  } = useSelector(state => state.pair);
  const allPrices = useSelector(state => state.socket.prices);

  const selectedPrice = useMemo(
    () => allPrices?.find(({ symbol }) => symbol === selectedPair?.symbol),
    [allPrices, selectedPair?.symbol]
  );

  return {
    allPrices,
    allPairs,
    selectedPair,
    selectedPrice,
    fiatCurrency,
    cryptoCurrency,
  };
};

export default usePrices;
