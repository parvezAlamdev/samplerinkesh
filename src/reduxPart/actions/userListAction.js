import { USER_LIST } from "../types";
import { BASE_URL } from "../../baseUrl/basURL";
import * as firebase from "firebase";

//this action is used for loading list of the users
export const userList = currentLoggedInUser => dispatch => {  
  let currentUserEmail =currentLoggedInUser&& currentLoggedInUser.email;
  let allUsers = [];
  firebase
    .database()
    .ref("users")
    .once("value")
    .then(snapshot => {
      snapshot.forEach(item => {
        if (item.val().email !== currentUserEmail) {
          let userObj = {
            id: item.key,
            userName: item.val().username,
            email: item.val().email
          };
          allUsers.push(userObj);
        }
      });
      dispatch({
        type: USER_LIST,
        payload: allUsers
      });
    });
};
