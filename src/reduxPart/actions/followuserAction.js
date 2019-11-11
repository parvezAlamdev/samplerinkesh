import { FOLLOW_USERS ,USER_LOGIN} from "../types";
import { BASE_URL } from "../../baseUrl/basURL";
import * as firebase from "firebase";

//this action is used for getting the news feed followed by a particular person
export const followUsers = (followObj,currentUserEmail) => dispatch => {
  let CurrentUserEmail=currentUserEmail 
  firebase
    .database()
    .ref("users/" + followObj.userId)
    .child("followedUser")
    .push(followObj)
    .then(data => {        
  let retrivedUserForGivenEmail = []; 
  firebase
    .database()
    .ref("users")
    .orderByChild("email")
    .equalTo(CurrentUserEmail)
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
            password: data.password
          };
          dispatch({
            type: USER_LOGIN,
            payload: finalUserObj
          });
        });
      }
    });
      
      
    });
    
};

const loadLatestUser = userEmail =>dispatch=>{  
  let retrivedUserForGivenEmail = []; 
  firebase
    .database()
    .ref("users")
    .orderByChild("email")
    .equalTo(userEmail)
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
            password: data.password
          };
          dispatch({
            type: USER_LOGIN,
            payload: finalUserObj
          });
        });
      }
    });
};
