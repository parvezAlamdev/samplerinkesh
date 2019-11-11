import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userList } from "../reduxPart/actions/userListAction";
import { followUsers } from "../reduxPart/actions/followuserAction";
import imgg from "../../src/user.jpg";
class UserListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      formErrors: {
        userName: "",
        password: ""
      },
      userNameValid: false,
      passwordValid: false,
      formValid: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.isAlreayFollowed = this.isAlreayFollowed.bind(this);
  }

  onChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
    if (this.props.userLoggedInError) {
      this.props.removeLoggedInError();
    }
  }
  handleLoginClick(e) {
    let loginObj = {
      email: this.state.userName,
      password: this.state.password
    };
    this.props.userLogin(loginObj);
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let userNameValid = this.state.userNameValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "password":
        passwordValid = value.length >= 1;
        fieldValidationErrors.password = passwordValid ? "" : " is invalid";
        break;
      case "userName":
        userNameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.userName = userNameValid ? "" : " is invalid";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        userNameValid: userNameValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid: this.state.userNameValid && this.state.passwordValid
    });
  }
  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  handleForgotPasswordClick = () => {
    this.props.history.push("/forgotPassword");
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.userList(this.props.userLoginStatus);
  }
  handleFollowuser = userID => {    
    let obj = {
      userId: this.props.userLoginStatus.id,
      followUserID: userID
    };
    this.props.followUsers(obj, this.props.userLoginStatus.email);
  };

  isAlreayFollowed(followedUserID) {
    if (
      this.props.userLoginStatus &&
      this.props.userLoginStatus.followedUser &&
      this.props.userLoginStatus.followedUser.length > 0
    ) {
      let isFollowed = false;
      this.props.userLoginStatus.followedUser.map(data => {
        if (data.followUserID === followedUserID) {
          isFollowed = true;
        }
      });
      return isFollowed;
    } else {
      return false;
    }
  }

  render() {
    if (this.props && !this.props.userLoginStatus) {
      this.props.history.push("/login");
    }
    return (
      <div className="news-feedback">
        {this.props.allUserList &&
          this.props.allUserList.map((data, index) => {            
            return (
              <div key={index} className="news-feedback-inner">
                <ul>
                  <li className="news-feedback-profile">
                    <img src={imgg}></img>
                  </li>
                  <li className="news-feedback-text">
                    <div>{data.email}</div>
                    {data.userName}
                  </li>
                  <li className="news-feedback-time">
                    {this.isAlreayFollowed(data.email) ? (
                      <button
                        type="button"
                        value="Follow"
                        className="follow-btn"
                        disabled={this.isAlreayFollowed(data.email)}
                        // onClick={this.handleFollowuser.bind(this, data.email)}
                      >
                        Followed
                      </button>
                    ) : (
                      <button
                        type="button"
                        value="Follow"
                        className="follow-btn"
                        disabled={this.isAlreayFollowed(data.email)}
                        onClick={this.handleFollowuser.bind(this, data.email)}
                      >
                        Follow
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            );
          })}
      </div>
    );
  }
}
UserListComponent.propTypes = {
  userList: PropTypes.func.isRequired,
  followUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userLoginStatus: state.userLoginStatus.userLoginStatus,
  allUserList: state.userList.userList
  // userLoginStatus: state.userLoginStatus.userLoginStatus
});

export default connect(
  mapStateToProps,
  { userList, followUsers }
)(UserListComponent);
