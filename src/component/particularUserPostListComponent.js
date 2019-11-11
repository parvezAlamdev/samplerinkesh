import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserNewsFeed } from "../reduxPart/actions/particularUserNewsFeedAction";
import imgg from "../../src/user.jpg";
import moment from 'moment'

class ParticularUserNewsFeedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getUserNewsFeed(this.props.userLoginStatus);
  }

  render() {
    if (this.props && !this.props.userLoginStatus) {
      this.props.history.push("/login");
    }
    return (
      <div className="news-feedback">
        {this.props.particularUserNewsFeed &&
          this.props.particularUserNewsFeed.map((data, index) => {
            return (
              <div key={index} className="news-feedback-inner">
                <ul>
                  <li className="news-feedback-profile">
                    <img src={imgg}></img>
                  </li>
                  <li className="news-feedback-text">
                    <div>{data.userID}</div> {data.newsDescription}
                  </li>
                  <li className="news-feedback-time">
                    {" "}
                    {moment(data.submittedDateTime).format('LLLL')}
                    {/* {data.submittedDateTime}{" "} */}
                  </li>
                </ul>
              </div>
            );
          })}
      </div>
    );
  }
}
ParticularUserNewsFeedComponent.propTypes = {
  getUserNewsFeed: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  particularUserNewsFeed: state.particularUserNewsFeed.particularUserNewsFeed,
  userLoginStatus: state.userLoginStatus.userLoginStatus
});

export default connect(
  mapStateToProps,
  { getUserNewsFeed }
)(ParticularUserNewsFeedComponent);
