import { useCallback } from "react";
import { useSelector } from "react-redux";

import { useCurrencies } from "~/state/hooks/";
import { getPairTuple, getFormattedPrice } from "~/util/";

const usePrices = (props = {}) => {
  const {
    all: allPairs,
    selected: selectedPair,
    fiatCurrency,
    cryptoCurrency,
  } = useSelector(state => state.pair);
  const allPrices = useSelector(state => state.socket.prices);
  const { activeCurrencies } = useCurrencies();

  const formatPrice = useCallback(
    price => {
      const [_, fiatCurrencySymbol] = getPairTuple(price?.name);
      const fiatCurrency = activeCurrencies?.find?.(
        ({ symbol }) => symbol === fiatCurrencySymbol
      );
      const clone = { ...price };

      for (const [key, value] of Object.entries(clone)) {
        if (key === "id" || key.includes("volume")) continue;

        if (key.includes("percent")) {
          clone[key] = getFormattedPrice(value, 2);
        } else if (typeof value === "number") {
          clone[key] = getFormattedPrice(value, fiatCurrency?.digit);
        }
      }

      return clone;
    },
    [activeCurrencies]
  );

  return {
    allPrices,
    allPairs,
    selectedPair,
    selectedPrice: allPrices?.find(
      ({ symbol }) => symbol === selectedPair?.symbol
    ),
    fiatCurrency,
    cryptoCurrency,
    formatPrice,
  };
};

export default usePrices;
