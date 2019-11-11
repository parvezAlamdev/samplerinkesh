import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducers";
import localStorage from "localStorage";

//here is our initial state
let initState = {
  userLoginStatus: "",
  userLoginError: "", 
  userList: "",
  particularUserNewsFeed: "",
  followedUserNewsFeed: ""  

};

//this method is used for storing values into the local storage
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("loginInfo", serializedState);
  } catch (e) {
    console.log(e);
  }
}

//this method is used for the reading of the value form the local storage
function readFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("loginInfo");
    if (serializedState == null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

//here we ar reading value from the local storage
const cartStateFromLocalStorage = readFromLocalStorage();

//if there are values into the local store we will store that into our initial state

if (cartStateFromLocalStorage) {
  initState = Object.assign(initState, cartStateFromLocalStorage);
}

//here we are creating store
const store = createStore(rootReducer, initState, applyMiddleware(thunk));

//here we are subscribing any change into the store and will store that into our local store
store.subscribe(() => {
  let appState = store.getState();

  //this method is used for storing value into the local storage
  saveToLocalStorage({
    userLoginStatus: appState.userLoginStatus,
    userLoginError: appState.userLoginError,   
    userList: appState.userList,
    particularUserNewsFeed: appState.particularUserNewsFeed,
    followedUserNewsFeed: appState.followedUserNewsFeed
  });
});

export default store;
