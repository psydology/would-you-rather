import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";

class New extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    message: { hidden: true, content: "" }
  };

  handleOnChange = (e, data) => {
    this.setState({ [data.id]: data.value });
  };

  handleClick = async () => {
    const { optionOne: optionOneText, optionTwo: optionTwoText } = this.state;
    const { authedUser: author, history, resetActiveIndexToZero } = this.props;

    if (!optionOneText || !optionTwoText) {
      this.setState({
        message: {
          hidden: false,
          content: "Please enter both Option One Text and Option Two Text"
        }
      });
      return;
    } else {
      this.setState({
        message: {
          hidden: true,
          content: ""
        }
      });
    }
    await this.props.handleAddQuestion({
      optionOneText,
      optionTwoText,
      author
    });
    resetActiveIndexToZero();
    history.push("/");
  };

  render() {
    const { authUser, users } = this.props;
    const user = users[authUser];
    const { message } = this.state;

    return (
      <div>
        <div>
          <div style={{ width: "400px" }}>
            <div>
              <img src={user.avatarURL} alt="avatar"/>
              <h5>{user.name} asks</h5>
              <div>Would you rather</div>
              <div>
                <form>
                  <div>
                    <input
                      id="optionOne"
                      placeholder="Enter Option One Text Here"
                      value={this.state.optionOne}
                      onChange={this.handleOnChange}
                    />
                  </div>
                  <div>
                    <input
                      id="optionTwo"
                      placeholder="Enter Option One Text Here"
                      value={this.state.optionTwo}
                      onChange={this.handleOnChange}
                    />
                  </div>
                  <div hidden={message.hidden} >
                    {message.content}
                  </div>
                </form>
              </div>
            </div>

            <div >
              <div className="buttons">
                <button  color="black" onClick={this.handleClick}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users, authUser: state.authUser };
};

export default connect(
  mapStateToProps,
  { handleAddQuestion }
)(New);
