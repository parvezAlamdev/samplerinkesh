import { USER_LOGIN } from "../types";

const initialState = {
  userLoginStatus: null
};


export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userLoginStatus: action.payload
      };
    default:
      return state;
  }
}
