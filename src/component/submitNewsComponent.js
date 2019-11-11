import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newsSubmission } from "../reduxPart/actions/newsSubmissionAction";
import imgg from "../../src/user.jpg";
import { clearNewsSubmissionMessage } from "../reduxPart/actions/clearNewsSubmissionStatusMessageAction";

class SubmitNewsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsFeed: "",
      formErrors: {
        newsFeed: ""
      },
      newsFeedValid: false,
      formValid: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleNewsSubmission = this.handleNewsSubmission.bind(this);
  }

  onChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
    if (this.props.newsSubmissionStatus) {
      this.props.clearNewsSubmissionMessage();
    }
  }
  handleNewsSubmission(e) {    
    let newsObj = {
      newsDescription: this.state.newsFeed,
      userId: this.props.userLoginStatus.email,
      submittedDateTime: Date.now()
    };
    this.props.newsSubmission(newsObj);
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let newsFeedValid = this.state.newsFeedValid;
    switch (fieldName) {
      case "newsFeed":
        newsFeedValid = value.length >= 1;
        fieldValidationErrors.newsFeed = newsFeedValid ? "" : " is invalid";
        break;

      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        newsFeedValid: newsFeedValid
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid: this.state.newsFeedValid
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
    this.props.clearNewsSubmissionMessage();
  }

  render() {
    if (this.props && !this.props.userLoginStatus) {
      this.props.history.push("/login");
    }
    return (
      <div className="news-feedback">
        <div className="submit-text-box">
          <textarea
            onChange={this.onChange}
            name="newsFeed"
            id="newsFeed"
            value={this.state.newsFeed}
            placeholder="Enter your news"
            className="form-control commentBox"
          ></textarea>
        </div>
        <div className="align-right">
          <button
            type="button"
            className="btn-green"
            disabled={!this.state.formValid}
            onClick={this.handleNewsSubmission}
            value="Login"
          >
            {" "}
            Submit
          </button>
        </div>
        <div>
          {this.props.newsSubmissionStatus && (
            <div>{this.props.newsSubmissionStatus}</div>
          )}
        </div>
      </div>
    );
  }
}
SubmitNewsComponent.propTypes = {
  newsSubmission: PropTypes.func.isRequired,
  clearNewsSubmissionMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  newsSubmissionStatus: state.newsSubmissionStatus.newsSubmissionStatus,
  userLoginStatus: state.userLoginStatus.userLoginStatus
});

export default connect(
  mapStateToProps,
  { newsSubmission, clearNewsSubmissionMessage }
)(SubmitNewsComponent);
