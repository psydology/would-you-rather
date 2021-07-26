import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthUser } from "../actions/authUser";

class Login extends Component {
  state = {
    selectedUser: '',
    message: { hidden: true, content: "" }
  };
  referrer = null;

  componentDidMount() {
    const {
      history,
      location: { pathname }
    } = this.props;
    this.referrer = pathname;
    history.push("/login");
  }

  handleUserSelection = (event) => {
    this.setState({ selectedUser: event.target.value });
  };

  handleUserLogin = () => {
    const { history } = this.props;
    if (this.state.selectedUser === '') {
      this.setState({
        message: {
          hidden: false,
          content: "Please select a user"
        }
      });
      return;
    } else {
      this.setState({
        message: {
          hidden: true,
          content: "done"
        }
      });
    }

    this.props.setAuthUser(this.state.selectedUser);
    if (this.referrer === "/logout" || this.referrer === "/login") {
      history.push("/");
    } else {
      history.push(this.referrer);
    }
  };

  render() {
    const { users } = this.props;
    if (!users) {
      return;
    }

    const userOptions = Object.keys(users).map(userId => ({
      key: userId,
      value: userId,
      text: users[userId].name,
      image: { avatar: true, src: users[userId].avatarURL }
    }));


    const { message } = this.state;

    return (
      <div className="Login">
        <div className="login_page">
          <div >
           
            <h2
              style={{ marginLeft: "60px", marginBottom: "30px" }}
            >
              <div className="content">Log-in to your account</div>
            </h2>
            <form className="form">
              <div className="main_field">
                <div className="field">
                  <select  onChange={this.handleUserSelection} value={this.state.selectedUser}>
                    {userOptions.map((user)=>(
                      //console.log(user.text)
                      <option value={user.value} key={user.key} >{user.text}</option>
                    ))}

                  </select>
                 
                </div>
                <div hidden={message.hidden} >
                  {message.content}
                </div>
                <div className="field">
                  Select a user from above and click the login button.
                </div>
                <div
                  className="button"
                  onClick={this.handleUserLogin}
                >
                  Login
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return { users };
};

export default connect(
  mapStateToProps,
  { setAuthUser }
)(Login);
