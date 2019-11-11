import React from "react";
import "../App.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userSignUp } from "../reduxPart/actions/signupAction";
import {clearMessage} from '../reduxPart/actions/clearMessageAction';
import '../config';
import * as firebase from 'firebase';

class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      formErrors: {
        username:"",
        email: "",
        password: "",
        confirmPassword: ""
      },
      usernameValid: false,    
      emailValid: false,
      passwordValid: false,
      confirmPasswordValid: false,
      formValid: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);    
  }

  componentDidMount(){
   
  }
  //this one is used for the handling form input value change
  onChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
    if (this.props.userSignUpError) {
     this.props.clearMessage()
    }
    if (this.props.userSignUpStatus) {
      this.props.clearMessage()
     }
  }

  //this method is used for checking the validation of  the forms
  validateForm() {
    this.setState({
      formValid:
        this.state.usernameValid &&      
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.confirmPasswordValid
    });
  }

  //this  is used for validating individual fields of the forms
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
      let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confirmPasswordValid = this.state.confirmPasswordValid;

    switch (fieldName) {      
      case "username":
        usernameValid = value != "";
        fieldValidationErrors.username = usernameValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value != "";
        fieldValidationErrors.password = passwordValid ? "" : " is invalid";
        break;
      case "confirmPassword":
        confirmPasswordValid = value != "";
        fieldValidationErrors.confirmPassword = confirmPasswordValid
          ? ""
          : " is invalid";
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        usernameValid: usernameValid,      
        emailValid: emailValid,
        passwordValid: passwordValid,
        confirmPasswordValid: confirmPasswordValid
      },
      this.validateForm
    );
  }

  //this is used for the submitting of the form
  onSubmit(e) {
    e.preventDefault();
    const signUpObject = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password    
    };
    if (this.state.password === this.state.confirmPassword) {
      this.props.userSignUp(signUpObject);
    } else {
      alert("password not matched");
    }
  }
  errorClass(error) {
    return error.length === 0 ? "" : "has-error abc";
  }
  

  render() {    
    return (
      <div className="login-box" >
                <h3 className="login-header-text">Sign Up</h3>
                  <div className="sign_up_form">                
                    <div
                      className={`form-group ${this.errorClass(
                        this.state.formErrors.username
                      )}`}
                    >
                      <input
                        type="text"
                        name="username"
                        placeholder="User Name"  className="form-control"
                        onChange={this.onChange}
                        value={this.state.username}
                      />
                    </div>
                    <div
                      className={`form-group ${this.errorClass(
                        this.state.formErrors.email
                      )}`}
                    >
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onBlur={this.isEmailAvailable}
                        onChange={this.onChange}
                        value={this.state.email}
                        className="form-control"
                      />
                    </div>
                    <div
                      className={`form-group ${this.errorClass(
                        this.state.formErrors.password
                      )}`}
                    >
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onChange}
                        value={this.state.password}
                        className="form-control"
                      />
                    </div>
                    <div
                      className={`form-group ${this.errorClass(
                        this.state.formErrors.confirmPassword
                      )}`}
                    >
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={this.onChange}
                        value={this.state.confirmPassword}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <a
                        href={null}
                        disabled={!this.state.formValid}
                        className="Sign_up_btn"
                      >
                        <button className="btn-green"
                          disabled={!this.state.formValid}
                          onClick={this.onSubmit}
                        >
                          Sign Up
                        </button>
                      </a>
                    </div>
                    {this.props.userSignUpError && (
                      <label>{this.props.userSignUpError}</label>
                    )}
                    {this.props.userSignUpStatus && (
                      <label>{this.props.userSignUpStatus}</label>
                    )}
                  </div>
                </div>
    );
  }
}

SignUpComponent.propTypes = {
  userSignUp: PropTypes.func.isRequired ,
  clearMessage:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userSignUpStatus: state.userSignUpStatus.userSignUpStatus ,
  userSignUpError:state.userSignUpError.userSignUpError
});

export default connect(
  mapStateToProps,
  { userSignUp,clearMessage }
)(SignUpComponent);
