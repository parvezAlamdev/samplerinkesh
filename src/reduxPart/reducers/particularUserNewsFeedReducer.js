import { USER_NEWS_FEED } from "../types";

const initialState = {
  particularUserNewsFeed: null
};


export default function(state = initialState, action) {
  switch (action.type) {
    case USER_NEWS_FEED:
      return {
        ...state,
        particularUserNewsFeed: action.payload
      };
    default:
      return state;
  }
}
