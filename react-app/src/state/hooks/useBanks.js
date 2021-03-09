import { useSelector } from "react-redux";
import { groupBy } from "lodash";

const useBanks = (props = {}) => {
  const { settings } = useSelector(state => state.api);
  const banks = settings?.banks || [];
  const _accounts = settings?.bankAccounts || [];
  const currencies = settings?.currencies || [];

  const accounts = _accounts.map(account => {
    const { currency_id, bank_id } = account;
    const currency = currencies.find(({ id }) => Number(id) === currency_id);
    const bank = banks.find(({ id }) => Number(id) === bank_id);

    return { ...account, currency, bank };
  });

  return {
    banks,
    accounts,
    accountsByBankId: groupBy(accounts, ({ bank_id }) => bank_id),
    accountsByBankCode: groupBy(
      accounts,
      ({ bank_id }) => banks.find(({ id }) => Number(id) === bank_id)?.code
    ),
    accountsByCurrencyId: groupBy(accounts, ({ currency_id }) => currency_id),
  };
};

export default useBanks;
