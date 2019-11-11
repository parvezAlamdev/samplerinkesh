import { NEWS_SUBMISSION } from "../types";

const initialState = {
  newsSubmissionStatus: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEWS_SUBMISSION:
      return {
        ...state,
        newsSubmissionStatus: action.payload
      };
    default:
      return state;
  }
}
