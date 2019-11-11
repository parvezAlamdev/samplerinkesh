import { USER_LIST } from "../types";

const initialState = {
  userList: null
};


export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LIST:
      return {
        ...state,
        userList: action.payload
      };
    default:
      return state;
  }
}
