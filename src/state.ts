export interface State {
  data: DataState;
  control: ControlState;
}

export interface DataState {
  users: User[];
}

export interface ControlState {
  successModal: ModalProps;
}

export interface User {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface ModalProps {
  isOpen: boolean;
  content: string;
}
