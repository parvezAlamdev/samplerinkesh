import {USER_LOGIN_ERROR } from "../types";

const initialState = {
  userLoginError: null
};


export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_ERROR:
      return {
        ...state,
        userLoginError: action.payload
      };
    default:
      return state;
  }
}
