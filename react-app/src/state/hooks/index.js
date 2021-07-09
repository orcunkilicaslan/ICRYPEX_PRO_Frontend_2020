import { useSelector } from "react-redux";

export { default as useClientRect } from "./useClientRect";
export { default as useTicker } from "./useTicker";
export { default as useCurrencies } from "./useCurrencies";
export { default as useBanks } from "./useBanks";
export { default as usePrices } from "./usePrices";

export const useLocaleUpperCase = () => {
  const { lang } = useSelector(state => state.ui);

  return string => (string ? String(string).toLocaleUpperCase(lang) : null);
};

export const useLocaleFormat = () => {
  const { lang } = useSelector(state => state.ui);

  const localeFormat = number => {
    const formatter = new Intl.NumberFormat(lang);

    return formatter.format(number);
  };

  return localeFormat;
};
