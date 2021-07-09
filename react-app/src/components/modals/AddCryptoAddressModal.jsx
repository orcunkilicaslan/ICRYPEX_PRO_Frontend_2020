import { Fragment, useMemo, useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";

import { useCurrencies } from "~/state/hooks/";
import { Button } from "../Button.jsx";
import { IconSet } from "~/components/IconSet";
import Table from "~/components/Table";
import { setOpenModal } from "~/state/slices/ui.slice";
import {
  cryptoAddressWhitelistsCreate,
  cryptoAddressWhitelistsDelete,
} from "~/state/slices/cryptoaddreswhitelist.slice";

export default function AddCryptoAddressModal(props) {
  const { watchedSymbol, selectedCryptoAddress, isOpen, ...rest } = props;

  const { groupedWhitelists = {}, isCreating, isDeleting } = useSelector(
    state => state.cryptoAddressWhitelist
  );
  const [isSuccess, setIsSuccess] = useState(props.isSuccess);
  const [isError, setIsError] = useState(props.isError);
  const [description, setDescription] = useState("");

  const { t } = useTranslation(["form", "common", "finance"]);
  const dispatch = useDispatch();
  const { cryptoCurrencies = [], tokenCurrencies = [] } = useCurrencies();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      currencyid: "",
      addresstitle: "",
      address: "",
      destinationtag: "",
    },
  });

  const visibleCurrencies = useMemo(() => {
    const currencies = cryptoCurrencies.concat(tokenCurrencies);

    return currencies;
  }, [cryptoCurrencies, tokenCurrencies]);

  const selectedWhitelists = useMemo(() => {
    const symbol = selectedCryptoAddress?.symbol;

    return groupedWhitelists?.[symbol] || [];
  }, [groupedWhitelists, selectedCryptoAddress]);

  const onSubmit = async data => {
    if (data.addresstitle !== "") {
      const currencyid = visibleCurrencies.find(
        ({ symbol }) => symbol === watchedSymbol
      )?.id;
      let sendData = {
        addresstitle: data.addresstitle,
        address: data.address,
        currencyid: currencyid,
        destinationtag: data.destinationtag,
      };

      const { payload } = await dispatch(
        cryptoAddressWhitelistsCreate(sendData)
      );

      if (payload?.status !== 1) {
        setDescription(payload?.errormessage);
        setIsError(true);
      } else {
        setDescription(payload?.description);
        setIsSuccess(true);
      }
    }
  };

  const clearOpenModals = async () => {
    await dispatch(setOpenModal("none"));
    setTimeout(() => setIsError(false), 1000);
    setTimeout(() => setIsSuccess(false), 1000);
  };

  const handleDelete = id => {
    dispatch(cryptoAddressWhitelistsDelete(id));
  };

  return (
    <Modal
      wrapClassName=""
      modalClassName=""
      isOpen={isOpen}
      toggle={clearOpenModals}
      keyboard={false}
      fade={false}
      autoFocus={false}
      centered
      {...rest}
    >
      <div className="modal-close">
        <Button className="close" onClick={clearOpenModals}>
          <span aria-hidden="true">&times;</span>
        </Button>
      </div>
      {!isError ? (
        !isSuccess ? (
          <Fragment>
            <ModalBody>
              <Form
                className="siteformui"
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <h4 className="text-center">{t("finance:addCryptoAddress")}</h4>
                <div className="labelfocustop mt-3">
                  <FormGroup>
                    <Input
                      type="text"
                      placeHolder={t("finance:addressTitle")}
                      name="addresstitle"
                      innerRef={register({
                        required: t("isRequired"),
                      })}
                    ></Input>
                    <Label>{t("finance:addressTitle")}</Label>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      placeHolder={t("finance:watchedSymbolAddress", {
                        watchedSymbol: watchedSymbol,
                      })}
                      name="address"
                      innerRef={register({
                        required: t("isRequired"),
                      })}
                    ></Input>
                    <Label>{t("finance:address")}</Label>
                  </FormGroup>
                  {selectedCryptoAddress?.destination_tag ? (
                    <FormGroup>
                      <Input
                        type="text"
                        placeHolder={t("finance:destinationTag")}
                        name="destinationtag"
                        innerRef={register({})}
                      ></Input>
                      <Label>{t("finance:destinationTag")}</Label>
                    </FormGroup>
                  ) : (
                    ""
                  )}
                </div>
                <Button
                  variant="primary"
                  className="w-100 mt-2"
                  type="submit"
                  disabled={isCreating}
                >
                  {t("finance:addAddress")}
                </Button>
              </Form>
              <div className="modalformbttmtablelist">
                <div className="tabcont tabcont-head">
                  <p>{t("finance:registeredAccounts")}</p>
                </div>
                <div className="cryptoaddresslisttable scrollbar">
                  <Table scrollbar>
                    <Table.Thead scrollbar>
                      <Table.Tr>
                        <Table.Th sizeauto className="regs">
                          {t("finance:registeredName")}
                        </Table.Th>
                        <Table.Th sizeauto className="cypt">
                          {t("finance:cryptoCurrency")}
                        </Table.Th>
                        {selectedCryptoAddress?.destination_tag ? (
                          <Table.Th sizeauto className="mmtg">
                            Memo/Tag
                          </Table.Th>
                        ) : null}
                        <Table.Th sizefixed className="addr">
                          {t("finance:address")}
                        </Table.Th>
                        <Table.Th sizeauto className="bttn" />
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody striped hovered scrollbar>
                      {selectedWhitelists.map(list => {
                        return (
                          <Table.Tr key={nanoid()}>
                            <Table.Td sizeauto className="regs">
                              {list?.short_name}
                            </Table.Td>
                            <Table.Td sizeauto className="cypt">
                              {list?.symbol}
                            </Table.Td>
                            {selectedCryptoAddress?.destination_tag ? (
                              <Table.Td sizeauto className="mmtg">
                                {list?.destination_tag}
                              </Table.Td>
                            ) : null}
                            <Table.Td sizefixed className="addr">
                              {list?.address}
                            </Table.Td>
                            <Table.Td sizeauto className="bttn">
                              <Button
                                onClick={() => handleDelete(list?.id)}
                                disabled={isDeleting}
                              >
                                <IconSet
                                  sprite="sprtsmclrd"
                                  size="14"
                                  name="delete"
                                />
                              </Button>
                            </Table.Td>
                          </Table.Tr>
                        );
                      })}
                    </Table.Tbody>
                  </Table>
                </div>
              </div>
            </ModalBody>
          </Fragment>
        ) : (
          <Fragment>
            <ModalBody className="modal-confirm text-center">
              <div className="animation-alert-icons">
                <div className="alert-icons alert-icons-success">
                  <div className="alert-icons-success-tip" />
                  <div className="alert-icons-success-long" />
                </div>
              </div>
              <h4>{t("common:success")}</h4>
              <p>{description}</p>
            </ModalBody>
            <ModalFooter className="row">
              <Button
                variant="secondary"
                className="active col"
                onClick={clearOpenModals}
              >
                {t("common:close")}
              </Button>
            </ModalFooter>
          </Fragment>
        )
      ) : (
        <Fragment>
          <ModalBody className="modal-confirm text-center">
            <div className="animation-alert-icons">
              <div className="alert-icons alert-icons-error">
                <div className="alert-icons-error-x">
                  <div className="alert-icons-error-x-left"></div>
                  <div className="alert-icons-error-x-right"></div>
                </div>
              </div>
            </div>
            <h4>{t("common:failed")}</h4>
            <p>{description}</p>
          </ModalBody>
          <ModalFooter className="row">
            <Button
              variant="secondary"
              className="active col"
              onClick={clearOpenModals}
            >
              {t("common:close")}
            </Button>
          </ModalFooter>
        </Fragment>
      )}
    </Modal>
  );
}
