import {
  Modal,
  ModalBody,
} from "reactstrap";

import { Button } from "../Button.jsx";

export default function DepositWithdrawalTermsModal(props) {
  const {
    isOpen,
    clearModals,
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
      backdrop="static"
      {...rest}
    >
      <div className="modal-close">
        <Button className="close" onClick={clearModals}>
          <span aria-hidden="true">&times;</span>
        </Button>
      </div>
      <ModalBody className="modal-confirm text-center">
        <h4>İşlemlerinizi Tamamlamak İçin Lütfen Dikkatle Okuyup Onaylayınız</h4>
        <div className="dottedlist text-left mt-2 mb-2">
          <ul>
            <li>TL yatırma işlemi gerçekleştirebilmek için, yatırmak istediğiniz tutarı girerek <strong>TALEP OLUŞTUR</strong> butonuna tıklayın ve işleminize özel <strong>açıklama kodunu</strong> oluşturunuz.</li>
            <li>TL yatırma işlemlerinde yalnızca sistemimize kayıt olduğunuz isim, soy isim ve T.C. Kimlik Numarası’na ait banka hesaplarından gelen tutarlar kabul edilmektedir.</li>
            <li>24 saat içinde gönderilmeyen talepler otomatik olarak iptal edilir.</li>
          </ul>
        </div>
      </ModalBody>
    </Modal>
  );
}
