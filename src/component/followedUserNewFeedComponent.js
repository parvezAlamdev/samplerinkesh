import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFollowersNewsFeed } from "../reduxPart/actions/followedUserNewFeedAction";
import imgg from "../../src/user.jpg";
import moment from 'moment';

class FollowedUserNewsFeedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getFollowersNewsFeed(this.props.userLoginStatus);
  }

  render() {
    if (this.props && !this.props.userLoginStatus) {
      this.props.history.push("/login");
    }
    return (
      <div className="news-feedback">
        {this.props.followedUserNewsFeed &&
          this.props.followedUserNewsFeed.map((data, index) => {
            return (
              <div key={index} className="news-feedback-inner">
                <ul>
                  <li className="news-feedback-profile">
                    <img src={imgg}></img>
                  </li>
                  <li className="news-feedback-text">
                    <div>{data.userID}</div> {data.newsDescription}
                  </li>
                  <li className="news-feedback-time">{moment(data.submittedDateTime).format('LLLL')} </li>
                </ul>
              </div>
            );
          })}
      </div>
    );
  }
}
FollowedUserNewsFeedComponent.propTypes = {
  getFollowersNewsFeed: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  followedUserNewsFeed: state.followedUserNewsFeed.followedUserNewsFeed,
  userLoginStatus:state.userLoginStatus.userLoginStatus
});

export default connect(
  mapStateToProps,
  { getFollowersNewsFeed }
)(FollowedUserNewsFeedComponent);
