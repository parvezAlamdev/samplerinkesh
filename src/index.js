import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./reduxPart/store";
import UserList from "./component/userListComponent";
import SignUp from "./component/signUpComponent";
import Login from "./component/loginComponent";
import FollowersNewFeed from "./component/followedUserNewFeedComponent";
import MyNewsFeed from "./component/particularUserPostListComponent";
import SubmitNewsComponent from "./component/submitNewsComponent";
import HeaderComponent from "./component/headerComponent";
import { NavLink } from "react-router-dom";
import ProtetectedRoute from './privateRoute/protectedRouteComponent';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <HeaderComponent />
        <Route exact path="/" component={FollowersNewFeed} />
        <Route path="/users" component={UserList} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        {/* <Route path='/myFollowersNewsFeed' component={FollowersNewFeed} /> */}
        <Route path="/myNewsFeed" component={MyNewsFeed} />
        <Route path="/submitNews" component={SubmitNewsComponent} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
