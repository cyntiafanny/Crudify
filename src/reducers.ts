import {combineReducers} from "redux";
import {ControlState, DataState, State} from "./state";
import {initialControlState, initialDataState} from "./initialState";
import {UPDATE_FETCH_DATA, UPDATE_STORED_DATA, UPDATE_SUCCESS_MODAL} from "./action";

export const dataReducer = (state: DataState = initialDataState, action: any) => {
  switch (action.type) {
    case UPDATE_FETCH_DATA: {
      return Object.assign({}, state, {
        users: action.payload
      });
    }
    case UPDATE_STORED_DATA: {
      return Object.assign({}, state, {
        users: action.payload
      });
    }
    default:
      return state;
  }
}

export const controlReducer = (state: ControlState = initialControlState, action: any) => {
  switch (action.type) {
    case UPDATE_SUCCESS_MODAL:
      return Object.assign({}, state, {
        successModal: action.payload
      });
    default:
      return state;
  }
}

export const reducers = combineReducers<State>({
  data: dataReducer,
  control: controlReducer
});
