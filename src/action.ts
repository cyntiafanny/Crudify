import {ModalProps, User} from "./state";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {dummyUser} from "./dummy-data";

export const UPDATE_FETCH_DATA = "UPDATE_FETCH_DATA"
export const UPDATE_STORED_DATA = "UPDATE_STORED_DATA"
export const UPDATE_SUCCESS_MODAL = "UPDATE_SUCCESS_MODAL";

export const updateSuccessModalStatus = (successModal: ModalProps) => {
  return {type: UPDATE_SUCCESS_MODAL, payload: successModal};
}

export const updateFetchData = (userData: User[]) => {
  return {type: UPDATE_FETCH_DATA, payload: userData}
}

export const updateStoredData = (userData: User[]) => {
  return {type: UPDATE_STORED_DATA, payload: userData}
}

export const fetchData = () => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateFetchData(dummyUser))
  }
}

export const storeData = (newData: User[], type: string) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    let successMessage = ""

    switch (type) {
      case "create": {
        successMessage = "User has been added";
        break;
      }
      case "edit": {
        successMessage = "User has been edited";
         break;
      }
      default: {
        successMessage = "User has been deleted"
        break;
      }
    }
    dispatch(updateStoredData(newData))
    dispatch(updateSuccessModalStatus({
      isOpen: true,
      content: successMessage
    }))
  }
}
