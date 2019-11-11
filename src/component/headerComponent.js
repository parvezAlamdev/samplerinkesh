import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../reduxPart/actions/handleUserLogoutAction";

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {    
    return (
      <div className="header-menu">
        <div className="header-menu-inner">
          <ul>
            <li>
              {" "}
              <NavLink exact to="/">
                News Feed
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/myNewsFeed">
                My News Feed
              </NavLink>{" "}
            </li>
            <li>
              <NavLink exact to="/users">
                User List
              </NavLink>{" "}
            </li>
            <li>
              <NavLink exact to="/submitNews">
                Submit News Feed
              </NavLink>{" "}
            </li>
            {!this.props.userLoginStatus && (
              <li>
                <NavLink exact to="/signup">
                  Sign Up
                </NavLink>{" "}
              </li>
            )}
            {!this.props.userLoginStatus && (
              <li>
                <NavLink exact to="/login">
                  Login
                </NavLink>{" "}
              </li>
            )}

            {this.props.userLoginStatus && (
              <li>
                <button className="logoutButton" onClick={this.handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
HeaderComponent.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userLoginStatus: state.userLoginStatus.userLoginStatus
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(HeaderComponent);
