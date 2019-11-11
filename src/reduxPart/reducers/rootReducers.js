import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import loginErrorReducer from './lognErrorReducer';
import signupReducer from './signupReducer';
import signupErrorReducer from './signupErrorReducer';
import userListReducer from './userListReducer';
import particularUserNewsFeedReucer from './particularUserNewsFeedReducer';
import followedUserNewsFeed from './followedUserNewFeedReducer';
import newsSubmissionStatus from './newsSubmissionReducer';
import followUserStatus from './followUserStatusReducers';

export default combineReducers({ 
    userLoginStatus: loginReducer,
    userLoginError: loginErrorReducer,
    userSignUpStatus: signupReducer,
    userSignUpError: signupErrorReducer,
    userList: userListReducer,
    particularUserNewsFeed: particularUserNewsFeedReucer,
    followedUserNewsFeed: followedUserNewsFeed,
    newsSubmissionStatus:newsSubmissionStatus,
    followUserStatus:followUserStatus
});
