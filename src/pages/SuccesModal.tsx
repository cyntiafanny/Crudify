import {Button, Modal, ModalContent} from "semantic-ui-react";
import {State, User} from "../state";
import {Dispatch} from "redux";
import {updateSuccessModalStatus} from "../action";
import {connect} from "react-redux";

interface SuccessModalProps {
  dispatch: Dispatch;
  isOpen: boolean;
  content: string;
}

const mapStateToProps = (state: State) => {
  return {
    isOpen: state.control.successModal.isOpen,
    content: state.control.successModal.content
  };
};

const SuccessModal: React.FC<SuccessModalProps> = (props: SuccessModalProps) => {
  const handleCloseSuccessModal = () => {
    props.dispatch(props.dispatch(updateSuccessModalStatus({
      content: "",
      isOpen: false
    })));
  };

  return (
    <Modal open={props.isOpen}
           onClose={handleCloseSuccessModal}
           size='tiny'
           className='modal-container'
    >
      <ModalContent>
        <h3>{props.content}</h3>
      </ModalContent>

      <Modal.Actions>
        <Button onClick={handleCloseSuccessModal} style={{color: "white", backgroundColor: "#ffcd34"}}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default connect (mapStateToProps) (SuccessModal);
