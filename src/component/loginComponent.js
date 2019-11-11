import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userLogin } from "../reduxPart/actions/loginAction";
import { clearLoginErrorMessage } from "../reduxPart/actions/clearLoginErrorMessageAction";

class LoginComponent extends React.Component {
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
  }

  onChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
    if (this.props.userLoginError) {
      this.props.clearLoginErrorMessage();
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
  }

  componentWillUnmount() {
    this.props.clearLoginErrorMessage();
  }

  render() {    
    let lo = this.props.userLoginStatus;
    if (this.props && this.props.userLoginStatus) {
      this.props.history.push("/submitNews");
    }
    return (
      <div className="login-box">
        <form id="login-form">
          <h3 className="login-header-text">Login</h3>
          <div
            className={`form-group ${this.errorClass(
              this.state.formErrors.userName
            )}`}
          >
            <label for="username" className="text-info">
              Email:
            </label>

            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Enter your Username"
              className="form-control"
              onChange={this.onChange}
            />
          </div>
          <div
            className={`form-group ${this.errorClass(
              this.state.formErrors.password
            )}`}
          >
            <label for="password" className="text-info">
              Password:
            </label>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
              className="form-control"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn-green"
              value="Login"
              disabled={!this.state.formValid}
              onClick={this.handleLoginClick}
            >
              Login
            </button>
          </div>
          <div id="register-link" className="text-right">
            <a href={null} className="text-info">
              <NavLink exact to="/signup">
                Register here
              </NavLink>
            </a>
          </div>
          {this.props.userLoginError && (
            <label>{this.props.userLoginError}</label>
          )}
        </form>
      </div>
    );
  }
}
LoginComponent.propTypes = {
  userLogin: PropTypes.func.isRequired,
  clearLoginErrorMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userLoginStatus: state.userLoginStatus.userLoginStatus,
  userLoginError: state.userLoginError.userLoginError
});

export default connect(
  mapStateToProps,
  { userLogin, clearLoginErrorMessage }
)(LoginComponent);
