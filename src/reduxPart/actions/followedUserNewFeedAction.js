import { FOLLOWERS_NEWS_FEED } from "../types";
import * as firebase from "firebase";

//this action is used for getting the news feed followed by a particular person
export const getFollowersNewsFeed = currentUserObj => dispatch => {  
  let currentUser = currentUserObj&&currentUserObj.followedUser
    ? currentUserObj.followedUser
    : null;
  let followedUserNews = [];
  let finalNewsData = [];
  firebase
    .database()
    .ref("newSubmitted")
    .once("value")
    .then(snapshot => {
      snapshot.forEach(item => {
        let userObj = {
          id: item.key,
          newsDescription: item.val().newsDescription,
          submittedDateTime: item.val().submittedDateTime,
          userID: item.val().userId
        };
        followedUserNews.push(userObj);
      });
      followedUserNews &&
        followedUserNews.map(newsData => {
          currentUser &&
            currentUser.map(userdata => {
              if (userdata.email === newsData.email) {
                finalNewsData.push(newsData);
              }
            });
        });
      dispatch({
        type: FOLLOWERS_NEWS_FEED,
        payload: finalNewsData
      });
    });
};
