import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthUser } from "../actions/authUser";

class Logout extends Component {
  componentDidMount() {
    this.props.setAuthUser(null);
  }

  render() {
    return <div>Logging out...</div>;
  }
}

export default connect(
  null,
  { setAuthUser }
)(Logout);