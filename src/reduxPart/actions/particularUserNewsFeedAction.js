import { USER_NEWS_FEED } from "../types";
import { BASE_URL } from "../../baseUrl/basURL";
import * as firebase from "firebase";

//this action is used for the getting particular user newsFeed That he posted
export const getUserNewsFeed = currentUSerObj => dispatch => {
  let currentUser = currentUSerObj&&  currentUSerObj.email;
  let particularUserNews = [];
  let finalNews = [];
  firebase
    .database()
    .ref("newSubmitted")
    .once("value")
    .then(snapshot => {
      snapshot.forEach(item => {
        let userObj = {
          id: item.key,
          newsDescription: item.val().newsDescription,
          submittedDateTime: new Date(item.val().submittedDateTime), //convertTimeStampToDate(item.val().submittedDateTime),
          userID: item.val().userId
        };
        particularUserNews.push(userObj);
      });      
      particularUserNews &&
        particularUserNews.map(data => {
          if (data.userID === currentUser) {
            finalNews.push(data);
          }
        });
      dispatch({
        type: USER_NEWS_FEED,
        payload: finalNews
      });
    });
};

const convertTimeStampToDate = value => {  
  // Unixtimestamp
  //var unixtimestamp = document.getElementById('timestamp').value;

  // Months array
  var months_arr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  // Convert timestamp to milliseconds
  var date = new Date(value * 1000);

  // Year
  var year = date.getFullYear();

  // Month
  var month = months_arr[date.getMonth()];

  // Day
  var day = date.getDate();

  // Hours
  var hours = date.getHours();

  // Minutes
  var minutes = "0" + date.getMinutes();

  // Seconds
  var seconds = "0" + date.getSeconds();

  // Display date time in MM-dd-yyyy h:m:s format
  return (
    month +
    "-" +
    day +
    "-" +
    year +
    " " +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2)
  );
};
