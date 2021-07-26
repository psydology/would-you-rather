import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


class Nav extends Component {
  render() {
    const { users, authUser } = this.props;
    const { name, avatarURL } = users[authUser];

    return (
      <div className="menu">
        <div className="container">
          <div className="item" />
          <NavLink
            to="/"
            exact
            className="header item"
            activeClassName="active"
          >
            <img
              src="/would-you-rather.png" alt="avatar"
              style={{ width: "50px", marginRight: "5px" }}
            />
            Home
          </NavLink>
          <NavLink to="/add" exact className="item" activeClassName="active">
            New Question
          </NavLink>
          <NavLink
            to="/leaderboard"
            exact
            className="item"
            activeClassName="active"
          >
            Leader Board
          </NavLink>
          <div className="ui right floated item">
            <span style={{ marginRight: "10px" }}>Hello, {name}</span>
            <img className="ui avatar image" src={avatarURL} alt="" />
          </div>
          <NavLink to="/logout" exact className="item" activeClassName="active">
            Logout
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { authUser: state.authUser, users: state.users };
};

export default connect(mapStateToProps)(Nav);
