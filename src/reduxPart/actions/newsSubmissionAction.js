import { NEWS_SUBMISSION} from "../types";
import { BASE_URL } from "../../baseUrl/basURL";
import * as firebase from 'firebase';

//this action is used for the user login
export const newsSubmission = news => dispatch => {
  firebase.database().ref('newSubmitted').push(news)     
    .then(data => {
      if (data.key) {
        dispatch({
          type: NEWS_SUBMISSION,
          payload: "New Submitted Successfully"
        });
      }      
    })
    .catch(err => {      
    });
};
