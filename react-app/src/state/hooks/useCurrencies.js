import { useMemo } from "react";
import { useSelector } from "react-redux";

const ACTIVE_FIAT_IDS = [1, 2, 3];

const useCurrencies = (props = {}) => {
  const { settings } = useSelector(state => state.api);
  const all = useMemo(() => settings?.currencies || [], [settings]);
  const types = settings?.currencyTypes || [];

  const fiatCurrencyId = types.find(({ name }) => name === "Fiat")?.id;
  const cryptoCurrencyId = types.find(({ name }) => name === "Crypto")?.id;
  const tokenCurrencyId = types.find(({ name }) => name === "Token")?.id;

  const fiatCurrencies = useMemo(
    () =>
      all
        .filter(({ type }) => Number(type) === fiatCurrencyId)
        .filter(({ id }) => ACTIVE_FIAT_IDS.includes(Number(id))),
    [all, fiatCurrencyId]
  );
  const cryptoCurrencies = useMemo(
    () => all.filter(({ type }) => Number(type) === cryptoCurrencyId),
    [all, cryptoCurrencyId]
  );
  const tokenCurrencies = useMemo(
    () => all.filter(({ type }) => Number(type) === tokenCurrencyId),
    [all, tokenCurrencyId]
  );
  const activeCurrencies = useMemo(
    () => fiatCurrencies.concat(cryptoCurrencies, tokenCurrencies),
    [cryptoCurrencies, fiatCurrencies, tokenCurrencies]
  );

  return {
    all,
    types,
    fiatCurrencies,
    cryptoCurrencies,
    tokenCurrencies,
    activeCurrencies,
  };
};

export default useCurrencies;
