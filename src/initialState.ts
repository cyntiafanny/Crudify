import {ControlState, DataState} from "./state";

export const initialDataState: DataState = {
  users: []
};

export const initialControlState: ControlState = {
  successModal: {
    isOpen: false,
    content: ""
  }
};

