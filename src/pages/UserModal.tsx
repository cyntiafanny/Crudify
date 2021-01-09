import {User} from "../state";
import {Button, Form, Icon, Modal} from "semantic-ui-react";
import {useEffect, useState} from "react";
import editIllustration from "../assets/edit.png";
import createIllustration from "../assets/create.png";

interface UserModalProps {
  isOpen: boolean;
  totalUser: number;
  selectedUser: User | undefined;
  handleCloseModal: () => void;
  handleUpdateData: (type: string, receiveData: User) => void;
}

const UserModal: React.FC<UserModalProps> = (props: UserModalProps) => {
  const selectedUser = props.selectedUser;

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isAddressEmpty, setIsAddressEmpty] = useState(false);
  const [isPhoneEmpty, setIsPhoneEmpty] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [modalIllustration, setModalIllustration] = useState(createIllustration);

  useEffect(() => {
    if (selectedUser) {
      setModalIllustration(editIllustration)
      setInputName(selectedUser.name)
      setInputAddress(selectedUser.address)
      setInputPhone(selectedUser.phone)
    }
    else {
      setModalIllustration(createIllustration)
    }
  }, [props.isOpen])

  const handleSetState = (type: string, val: any) => {
    if (type === "name") {
      setInputName(val.value)
    } else if (type === "address") {
      setInputAddress(val.value)
    } else {
      setInputPhone(val.value)
    }
  }

  const handleSubmitForm = () => {
    if (inputName === '') {
      setIsNameEmpty(true)
    } else {
      setIsNameEmpty(false)
    }

    if (inputAddress === '') {
      setIsAddressEmpty(true)
    } else {
      setIsAddressEmpty(false)
    }

    if (inputPhone === '') {
      setIsPhoneEmpty(true)
    } else {
      setIsPhoneEmpty(false)
    }

    if (inputName !== '' && inputAddress !== '' && inputPhone !== '') {
      let updatedId = "";
      if (selectedUser) {
        updatedId = selectedUser.id
      } else {
        updatedId = "usr" + props.totalUser + 1
      }
      let updatedData: User = {
        id: updatedId,
        name: inputName,
        address: inputAddress,
        phone: inputPhone
      };

      setInputName("")
      setInputAddress("")
      setInputPhone("")

      if (selectedUser) {
        props.handleUpdateData("edit", updatedData)
      } else {
        props.handleUpdateData("create", updatedData)
      }
    }
  }

  return (
    <Modal open={props.isOpen}
           onClose={props.handleCloseModal}
           size='tiny'
           className='modal-container'
    >
      <Icon className='close-icon' name='close' onClick={props.handleCloseModal}/>
      <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
        <div style={{width: "50%", height: "100%"}}>
          <img style={{width: "50%", minWidth: "218px", objectFit: "cover", borderBottomLeftRadius: "10px", borderTopLeftRadius: "10px"}} className="logo-image"
               src={modalIllustration}/>
        </div>
        <div className="modal-content" style={{width: "50%", margin: "40px 20px 20px"}}>
          {
            selectedUser ?
              <Modal.Content>
               <div>
                  <Form>
                    <div className="field">
                      <Form.Field>
                        <Form.Input onChange={(e, val) => handleSetState("name", val)} label="Name" error={isNameEmpty}
                                    defaultValue={selectedUser.name}/>
                      </Form.Field>
                    </div>
                    <div className="field">
                      <Form.Field>
                        <Form.Input onChange={(e, val) => handleSetState("address", val)} label="Address"
                                    error={isAddressEmpty} defaultValue={selectedUser.address}/>
                      </Form.Field>
                    </div>
                    <div className="field">
                      <Form.Field>
                        <Form.Input onChange={(e, val) => handleSetState("phone", val)} label="Phone"
                                    error={isPhoneEmpty} defaultValue={selectedUser.phone}/>
                      </Form.Field>
                    </div>
                  </Form>
                 <Button style={{margin: "20px auto 0", backgroundColor: "#61BAAE", color: "white"}} onClick={handleSubmitForm}>Save</Button>
                </div>
              </Modal.Content> :
              <Modal.Content>
                <div>
                  <Form>
                    <div className="field">
                      <Form.Field>
                        <Form.Input onChange={(e, val) => handleSetState("name", val)} label="Name"
                                    error={isNameEmpty}/>
                      </Form.Field>
                    </div>
                    <div className="field">
                      <Form.Field>
                        <Form.Input onChange={(e, val) => handleSetState("address", val)} label="Address"
                                    error={isAddressEmpty}/>
                      </Form.Field>
                    </div>
                    <div className="field">
                      <Form.Field>
                        <Form.Input onChange={(e, val) => handleSetState("phone", val)} label="Phone"
                                    error={isPhoneEmpty}/>
                      </Form.Field>
                    </div>
                  </Form>
                </div>
                <Button style={{margin: "20px auto 0", backgroundColor: "#61BAAE", color: "white"}} onClick={handleSubmitForm}>Submit</Button>
              </Modal.Content>
          }
        </div>
      </div>
    </Modal>
  );
}

export default UserModal;
