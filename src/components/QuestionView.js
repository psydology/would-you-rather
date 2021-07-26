import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";

class QuestionView extends Component {
  state = { votedForOption: null, message: { hidden: true, content: "" } };

  handleChange = (event) => {
    this.setState( {votedForOption :event.target.value} );
  };

  handleClick = () => {
    if (!this.state.votedForOption) {
      this.setState({
        message: {
          hidden: false,
          content: "Please select an option"
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
    // action
    const qid = this.props.match.params.question_id;
    const answer = this.state.votedForOption;
    const { authUser, handleAnswerQuestion } = this.props;
    handleAnswerQuestion({ authUser, qid, answer });
  };

  questionResult = () => {
    const qid = this.props.match.params.question_id;
    const { authUser, questions, users } = this.props;

    const question = questions[qid];
    if (!question) {
      return;
    }

    const user = users[question.author];

    const votedForOptionOne = question.optionOne.votes.includes(authUser);
    const votedForOptionTwo = question.optionTwo.votes.includes(authUser);
    const voteCountOptionOne = question.optionOne.votes.length;
    const voteCountOptionTwo = question.optionTwo.votes.length;
    const totalVotes = voteCountOptionOne + voteCountOptionTwo;
    const votePercentOptionOne =
      Math.round((voteCountOptionOne / totalVotes) * 10000) / 100;
    const votePercentOptionTwo =
      Math.round((voteCountOptionTwo / totalVotes) * 10000) / 100;

    return (
      <div key={qid} style={{ width: "400px" }}>
        <div>
          <img floated="right" size="tiny" src={user.avatarURL} alt="avatar" />
          <h5>{user.name} asks</h5>
          <div>Would you rather</div>
          <div>
            <div>
              {votedForOptionOne && (
                <label>
                  Your Vote
                </label>
              )}
              <p>{question.optionOne.text}</p>
              <progress percent={votePercentOptionOne} progress>
                {voteCountOptionOne} out of {totalVotes} votes
              </progress>
            </div>
            <div>
              {votedForOptionTwo && (
                <label>
                  Your Vote
                </label>
              )}
              <p>{question.optionTwo.text}</p>
              <progress percent={votePercentOptionTwo} progress>
                {voteCountOptionTwo} out of {totalVotes} votes
              </progress>
            </div>
          </div>
        </div>
      </div>
    );
  };

  questionAnswer = () => {
    const qid = this.props.match.params.question_id;
    const { questions, users } = this.props;

    const question = questions[qid];
    if (!question) {
      return;
    }

    const user = users[question.author];
    const { message } = this.state;

    return (
      <div key={qid} >
        <div>
          <img  src={user.avatarURL} alt="avatar"/>
          <h5>{user.name} asks</h5>
          <div>Would you rather</div>
          <div>
            <form>
              <div>
              <input type="radio" id={question.optionOne.text} name="fav_language" value="optionOne" checked={this.state.votedForOption === "optionOne"} onChange={this.handleChange}/>
              {question.optionOne.text}
              </div>
              <div>
              <input type="radio" id={question.optionTwo.text} name="fav_language" value="optionTwo" checked={this.state.votedForOption === "optionTwo"} onChange={this.handleChange}/>{question.optionTwo.text}
                
              </div>
              <div hidden={message.hidden} >
                {message.content}
              </div>
            </form>
          </div>
        </div>
        <div>
          <div className="buttons">
            <button  onClick={this.handleClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  didAnswer() {
    const { authUser, questions } = this.props;
    const qid = this.props.match.params.question_id;

    const question = questions[qid];
    if (!question) {
      return null;
    }

    return (
      question.optionOne.votes.includes(authUser) ||
      question.optionTwo.votes.includes(authUser)
    );
  }

  componentDidMount() {
    const { questions } = this.props;
    const qid = this.props.match.params.question_id;

    const question = questions[qid];
    if (!question) {
      const { history } = this.props;
      history.push("/404");
    }
  }

  render() {
    let result;
    if (this.didAnswer() === true) {
      result = this.questionResult();
    } else {
      result = this.questionAnswer();
    }
    return <div >{result}</div>;
  }
}

const mapStateToProps = state => {
  return {
    authUser: state.authUser,
    questions: state.questions,
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { handleAnswerQuestion }
)(QuestionView);
