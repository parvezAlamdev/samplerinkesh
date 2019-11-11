import { FOLLOW_USERS } from "../types";

const initialState = {
  followUserStatus: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FOLLOW_USERS:
      return {
        ...state,
        followUserStatus: action.payload
      };
    default:
      return state;
  }
}
