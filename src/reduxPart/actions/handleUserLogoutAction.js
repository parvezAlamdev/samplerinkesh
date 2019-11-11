import { USER_LOGIN, USER_LOGIN_ERROR } from "../types";
//this action is used for getting the news feed followed by a particular person
export const logoutUser = () => dispatch => {
  dispatch({
    type: USER_LOGIN,
    payload: null
  });
  dispatch({
    type: USER_LOGIN_ERROR,
    payload: null
  });
};
