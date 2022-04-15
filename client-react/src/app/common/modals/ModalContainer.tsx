import {observer} from "mobx-react-lite";
import {useStore} from "../../../stores/store";
import {Modal} from "semantic-ui-react";
import ReactDOM from "react-dom";

const ModalContainerPortal = observer(() => {
  const {modalStore: {modal, closeModal, openModal}} = useStore();
  return (
    <Modal onClose={closeModal} open={modal.open} size='mini'>
      <Modal.Content>
        {modal.body}
      </Modal.Content>
    </Modal>
  );
});

const ModalContainer = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalContainerPortal/>,
        document.getElementById('modal-root')!)}
    </>
  );
}

export default ModalContainer;