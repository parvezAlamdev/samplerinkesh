import { NEWS_SUBMISSION } from "../types";
//this action is used for getting the news feed followed by a particular person
export const clearNewsSubmissionMessage = () => dispatch => {
  dispatch({
    type: NEWS_SUBMISSION,
    payload: null
  })
};
