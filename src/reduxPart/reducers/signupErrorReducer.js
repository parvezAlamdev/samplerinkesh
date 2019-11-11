import { USER_SIGN_UP_ERROR } from "../types";

const initialState = {
  userSignUpError: null
};

//this one is used for the loading user Informatin
export default function(state = initialState, action) {
  switch (action.type) {
    case USER_SIGN_UP_ERROR:
      return {
        ...state,
        userSignUpError: action.payload
      };
    default:
      return state;
  }
}
