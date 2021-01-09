import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {ThunkDispatch} from "redux-thunk";
import {State, User} from "../state";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import {fetchData, storeData} from "../action";
import {Button, Table} from 'semantic-ui-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import UserModal from "./UserModal";
import ConfirmationModal from "./ConfirmationModal";
import logo from "../assets/crudifyLogo.png"
import {formatDate, formatTime, generateGreeting} from "../formatTime";

interface AppProps {
  dispatch: ThunkDispatch<State, {}, AnyAction>;
  userList: User[];
}

const mapStateToProps = (state: State) => {
  return {
    userList: state.data.users
  }
}

const App = (props: AppProps) => {
  const dispatch = props.dispatch;
  const userList = props.userList;
  const contentRef = useRef(null);

  const [date, setDate] = useState(new Date());
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<undefined | User>(undefined);
  const [totalUser, setTotalUser] = useState(0)

  useEffect(() => {
    dispatch(fetchData())

    setTotalUser(userList.length + 1)
  }, [dispatch, userList.length])

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  const tick = () => {
    setDate(new Date());
  }

  const handleOpenModal = (user: User | undefined) => {
    if (user) {
      setSelectedUser(user)
    }
    setIsUserModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedUser(undefined)
    setIsUserModalOpen(false)
  }

  const handleScrollToContent = (ref: any) => {
    ref.current.scrollIntoView({behavior: "smooth"})
  }

  const handleUpdateData = (type: string, receivedData: User) => {
    let newUserData: User[] = [];

    if (type === 'create') {
      newUserData = userList;

      newUserData.push(receivedData)
    } else {
      userList.forEach((singleUser) => {
        if (receivedData.id === singleUser.id) {
          if (type === 'edit') {
            newUserData.push(receivedData)
          }
        } else {
          newUserData.push(singleUser)
        }
      })
    }

    dispatch(storeData(newUserData, type))
    setSelectedUser(undefined)
    setIsUserModalOpen(false)
  }

  const handleDeleteButtonClick = (user: User) => {
    setSelectedUser(user)
    setIsConfirmationModalOpen(true)
  }
  const handleConfirmationModalClose = () => {
    setSelectedUser(undefined)
    setIsConfirmationModalOpen(false)
  }

  const handleDeleteUser = () => {
    if (selectedUser)
      handleUpdateData("delete", selectedUser)
    handleConfirmationModalClose()
  }

  const renderUserData = () => {
    let userDataRows: JSX.Element[] = [];

    let idx = 1;
    props.userList.forEach((userData: User) => {
      userDataRows.push(
        <Table.Row key={userData.id}>
          <Table.Cell>{idx}</Table.Cell>
          <Table.Cell>{userData.name}</Table.Cell>
          <Table.Cell>{userData.address}</Table.Cell>
          <Table.Cell>{userData.phone}</Table.Cell>
          <Table.Cell>
            <div>
              <Button className="edit-container" onClick={() => handleOpenModal(userData)}>
                <FontAwesomeIcon icon={faEdit} fill="#ffffff"/>
              </Button>
              <Button className="delete-container" onClick={() => handleDeleteButtonClick(userData)}>
                <FontAwesomeIcon icon={faTrash} fill="#ffffff"/>
              </Button>
            </div>
          </Table.Cell>
        </Table.Row>
      )
      idx++;
    });

    return userDataRows;
  }

  return (
    <React.Fragment>
      <div style={{textAlign: "center", height: "100%", backgroundColor: "#fffcec" , paddingBottom: "210px"}}>
        <div className="logo-container">
          <img alt="Crudify" src={logo} style={{width: "100%", margin: "40px 0", maxWidth: "300px", objectFit: "cover"}}/>
        </div>
        <Button className="get-started-button" onClick={() => handleScrollToContent(contentRef)}>Get Started</Button>
      </div>
      <div style={{height: "90%"}} className="App" ref={contentRef}>
        <div style={{width: "35%", color: "#cda291", backgroundColor: "#fffcec"}}>
          <div className="date-container">
            <h4>{formatDate(date)}</h4>
            <div style={{textAlign: "center", marginTop: "60px"}}>
              <h3>{generateGreeting(date)}</h3>
              <h1 style={{fontSize: "80px"}}>{formatTime(date)}</h1>
            </div>
            <div style={{marginTop: "230px", textAlign: "center"}}>
              <span>Crudify by Cyntia Fanny</span>
            </div>
          </div>
        </div>
        <div className="table-container">
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className="table-header">No.</Table.HeaderCell>
                <Table.HeaderCell className="table-header">Name</Table.HeaderCell>
                <Table.HeaderCell className="table-header">Address</Table.HeaderCell>
                <Table.HeaderCell className="table-header">Phone</Table.HeaderCell>
                <Table.HeaderCell className="table-header">Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {renderUserData()}
            </Table.Body>
          </Table>
          <Button className="create-button" onClick={() => handleOpenModal(undefined)}>Create New User</Button>
        </div>
      </div>
      <UserModal isOpen={isUserModalOpen}
                 handleCloseModal={handleCloseModal}
                 selectedUser={selectedUser}
                 totalUser={totalUser}
                 handleUpdateData={handleUpdateData}
      />
      <ConfirmationModal isOpen={isConfirmationModalOpen}
                         userSelected={selectedUser}
                         handleCloseModal={handleConfirmationModalClose}
                         handleDelete={handleDeleteUser}/>
    </React.Fragment>
  );
}

export default connect(mapStateToProps)(App);
