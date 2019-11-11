import { FOLLOWERS_NEWS_FEED } from "../types";

const initialState = {
  followedUserNewsFeed: null
};

//this one is used for the loading user Informatin
export default function(state = initialState, action) {
  switch (action.type) {
    case FOLLOWERS_NEWS_FEED:
      return {
        ...state,
        followedUserNewsFeed: action.payload
      };
    default:
      return state;
  }
}
