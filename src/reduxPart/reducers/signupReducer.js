import { USER_SIGN_UP } from "../types";

const initialState = {
  userSignUpStatus: null
};

//this one is used for the loading user Informatin
export default function(state = initialState, action) {
  switch (action.type) {
    case USER_SIGN_UP:
      return {
        ...state,
        userSignUpStatus: action.payload
      };
    default:
      return state;
  }
}
