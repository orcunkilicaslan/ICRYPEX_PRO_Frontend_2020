import {Fragment} from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "../Button.jsx";
import Table from "~/components/Table";

export default function BuySellConfirmModal(props) {
  const {
    isOpen,
      isSuccess,
    clearModals,
    ...rest
  } = props;

  return (
      <Modal
          wrapClassName=""
          modalClassName=""
          className="text-center"
          size="sm"
          isOpen={isOpen}
          toggle={clearModals}
          keyboard={false}
          fade={false}
          autoFocus={false}
          centered
          {...rest}
      >
        <div className="modal-close">
          <Button className="close" onClick={clearModals}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>

        { !isSuccess ? (
            <Fragment>
              <ModalBody className="modal-confirm">
                <h4>İşlem Onayı</h4>
                <Table className="mt2">
                  <Table.Tbody striped>
                    <Table.Tr>
                      <Table.Td sizefixed className="text-left">
                        İşlem Tipi
                      </Table.Td>
                      <Table.Td sizefixed className="text-right">
                        Market - <span className="sitecolorgreen">Alış</span>
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td sizefixed className="text-left">
                        Miktar - TRY
                      </Table.Td>
                      <Table.Td sizefixed className="text-right">
                        999,999.99 TRY
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td sizefixed className="text-left">
                        Miktar - BTC
                      </Table.Td>
                      <Table.Td sizefixed className="text-right">
                        1.44804233 BTC
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td sizefixed className="text-left">
                        Komisyon
                      </Table.Td>
                      <Table.Td sizefixed className="text-right">
                        (0.18%) 1.32 TRY
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td sizefixed className="text-left">
                        Toplam
                      </Table.Td>
                      <Table.Td sizefixed className="text-right">
                        999,999.99 TRY
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </ModalBody>
              <ModalFooter className="row">
                <Button
                    variant="secondary"
                    className="active col"
                    onClick={clearModals}
                >
                  İPTAL ET
                </Button>
                <Button
                    variant="success"
                    className="active col"
                >
                  ONAYLA
                </Button>
              </ModalFooter>
            </Fragment>
        ) : (
            <Fragment>
              <ModalBody className="modal-confirm">
                <div className="animation-alert-icons">
                  <div className="alert-icons alert-icons-success">
                    <div className="alert-icons-success-tip" />
                    <div className="alert-icons-success-long" />
                  </div>
                </div>
                <h4>İşlem Onayı</h4>
                <p>İşleminiz Başarıyla Gerçekleştirildi.</p>
              </ModalBody>
              <ModalFooter className="row">
                <Button
                    variant="secondary"
                    className="active col"
                    onClick={clearModals}
                >
                  KAPAT
                </Button>
              </ModalFooter>
            </Fragment>
        )}

      </Modal>
  );
}
