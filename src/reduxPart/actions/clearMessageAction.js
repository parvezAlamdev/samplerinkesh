import { USER_SIGN_UP, USER_SIGN_UP_ERROR } from "../types";
//this action is used for getting the news feed followed by a particular person
export const clearMessage = () => dispatch => {
  dispatch({
    type: USER_SIGN_UP,
    payload: null
  });
    dispatch({
      type: USER_SIGN_UP_ERROR,
      payload: null
    });
};
