import { useSelector } from "react-redux";

const ACTIVE_FIAT_IDS = [1, 2, 3];

const useCurrencies = (props = {}) => {
  const { settings } = useSelector(state => state.api);
  const all = settings?.currencies || [];
  const types = settings?.currencyTypes || [];
  const fiatCurrencyId = types.find(({ name }) => name === "Fiat")?.id;
  const cryptoCurrencyId = types.find(({ name }) => name === "Crypto")?.id;
  const tokenCurrencyId = types.find(({ name }) => name === "Token")?.id;

  return {
    all,
    types,
    fiatCurrencies: all
      .filter(({ type }) => Number(type) === fiatCurrencyId)
      .filter(({ id }) => ACTIVE_FIAT_IDS.includes(Number(id))),
    cryptoCurrencies: all.filter(
      ({ type }) => Number(type) === cryptoCurrencyId
    ),
    tokenCurrencies: all.filter(({ type }) => Number(type) === tokenCurrencyId),
  };
};

export default useCurrencies;
