import {Button, Modal, ModalContent} from "semantic-ui-react";
import {User} from "../state";

interface ConfirmationModalProps {
  isOpen: boolean;
  userSelected?: User;
  handleCloseModal: () => void;
  handleDelete: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = (props: ConfirmationModalProps) => {
  let selectedUser = "";

  if(props.userSelected) {
    selectedUser = props.userSelected.name
  }

  const message = "Are you sure to delete " + selectedUser + "?"
  return (
    <Modal open={props.isOpen}
           onClose={props.handleCloseModal}
           size='tiny'
           className='modal-container'
    >
      <ModalContent>
        <h3>{message}</h3>
        <h5>This action cannot be undone</h5>
      </ModalContent>

      <Modal.Actions>
        <Button onClick={props.handleCloseModal} style={{color: "white", backgroundColor: "#ffcd34"}}>Cancel</Button>
        <Button onClick={props.handleDelete} style={{color: "white", backgroundColor: "#C0564B"}}>Delete</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ConfirmationModal;
