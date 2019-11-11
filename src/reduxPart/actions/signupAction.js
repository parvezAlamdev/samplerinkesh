import { USER_SIGN_UP, USER_SIGN_UP_ERROR } from "../types";
import { BASE_URL } from "../../baseUrl/basURL";
import * as firebase from "firebase";

//this action is used for the user signup
export const userSignUp = signupObj => dispatch => {  
  firebase
    .database()
    .ref("users")
    .orderByChild("email")
    .equalTo(signupObj.email)
    .on("value", function(snapshot) {
      if (snapshot.val()) {
        dispatch({
          type: USER_SIGN_UP_ERROR,
          payload: "User Already Exist"
        });
      } else {
        firebase
          .database()
          .ref("users")
          .push(signupObj)
          .then(data => {
            if (data.key) {
              dispatch({
                type: USER_SIGN_UP,
                payload: "Registration Successful"
              });
              dispatch({
                type: USER_SIGN_UP_ERROR,
                payload: null
              });
            }
          })
          .catch(err => {
            dispatch({
              type: USER_SIGN_UP_ERROR,
              payload: "Something Wents Wrong"
            });
          });
      }
    });

  // firebase.database().ref('users').push(signupObj)
  //   .then(data => {
  //     if (data.key) {
  //       dispatch({
  //         type: USER_SIGN_UP,
  //         payload: "Registration Successful"
  //       });
  //     } else {
  //       dispatch({
  //         type: USER_SIGN_UP_ERROR,
  //         payload: "Registration Failed"
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     dispatch({
  //       type: USER_SIGN_UP_ERROR,
  //       payload: "Something Wents Wrong"
  //     });
  //   });
};
