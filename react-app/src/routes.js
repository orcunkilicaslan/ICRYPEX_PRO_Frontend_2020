export const dictEasyBuy = {
  tr: "/kolay-al",
  en: "/easy-buy",
};

export const dictEasySell = {
  tr: "/kolay-sat",
  en: "/easy-sell",
};

export const dictProTrading = {
  tr: "/pro-gorunum",
  en: "/pro-view",
};

export const pathEasyBuy = Object.values(dictEasyBuy);
export const pathEasySell = Object.values(dictEasySell);
export const pathProTrading = Object.values(dictProTrading);

export const getLocalePath = (pathname, lang) => {
  if (pathEasyBuy.includes(pathname)) {
    return dictEasyBuy[lang];
  }

  if (pathEasySell.includes(pathname)) {
    return dictEasySell[lang];
  }

  if (pathProTrading.includes(pathname)) {
    return dictProTrading[lang];
  }

  return false;
};
