import {
  Modal,
  ModalBody,
} from "reactstrap";

import QRCode from "react-qr-code";

import { Button } from "../Button.jsx";

export default function QrCodeModal(props) {
  const {
    isOpen,
    clearModals,
      value,
    ...rest
  } = props;

  return (
    <Modal
      wrapClassName=""
      size="md"
      centered
      isOpen={isOpen}
      toggle={clearModals}
      keyboard={false}
      fade={false}
      autoFocus={false}
      {...rest}
    >
      <div className="modal-close">
        <Button className="close" onClick={clearModals}>
          <span aria-hidden="true">&times;</span>
        </Button>
      </div>
      <ModalBody className="modal-confirm text-center">
        <div className="dottedlist text-center mt-2 mb-2">
          <QRCode value={value} />
        </div>
      </ModalBody>
    </Modal>
  );
}
