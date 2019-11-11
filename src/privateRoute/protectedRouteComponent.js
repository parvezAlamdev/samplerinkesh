import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class ProtetectedRoute extends React.Component {
  render() {
    if (!this.props.userLoginStatus) {
      return <Redirect to="/login" />;
    }
    return <Route {...this.props} />;
  }
}

const mapStateToProps = state => ({
    userLoginStatus: state.userLoginStatus.userLoginStatus
});

export default connect(
  mapStateToProps,
  null
)(ProtetectedRoute);
