import { USER_LOGIN, USER_LOGIN_ERROR } from "../types";
import { BASE_URL } from "../../baseUrl/basURL";
import * as firebase from "firebase";

//this action is used for the user login
export const userLogin = loginObj => dispatch => {  
  let retrivedUserForGivenEmail = [];
  let loginObject = loginObj;
  firebase
    .database()
    .ref("users")
    .orderByChild("email")
    .equalTo(loginObj.email)
    .on("value", function(snapshot) {
      if (snapshot.val()) {
        snapshot.forEach(item => {
          let userObj = {
            id: item.key,
            userName: item.val().username,
            email: item.val().email,
            password: item.val().password,
            followedUser: item.val().followedUser
          };
          retrivedUserForGivenEmail.push(userObj);
        });
        retrivedUserForGivenEmail.forEach(function(data) {
          if (data.password == loginObject.password) {
            let followedUser = [];
            if (data.followedUser) {
              for (const [key, value] of Object.entries(data.followedUser)) {
                followedUser.push(value);
              }
            }

            let finalUserObj = {
              id: data.id,
              userName: data.userName,
              email: data.email,
              followedUser: followedUser,
              password:data.password
            };
            dispatch({
              type: USER_LOGIN,
              payload: finalUserObj
            });
          } else {
            dispatch({
              type: USER_LOGIN_ERROR,
              payload: "Please check the username and password"
            });
          }
        });
      } else {
        dispatch({
          type: USER_LOGIN_ERROR,
          payload: "No User eXIST"
        });
      }
    });
};
