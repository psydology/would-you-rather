import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class QuestionList extends Component {

  getCardsFromQuestions = filterLogic => {
    const { questions, users } = this.props;
    const cards = Object.keys(questions)
      .filter(filterLogic)
      .map(qid => {
        const question = questions[qid];
        const user = users[question.author];
        return (
          <div key={qid}>
            <div>
              <img floated="right" size="tiny" src={user.avatarURL} alt="avatar"/>
              <h2>{user.name} asks</h2>
              <div>
                Would you rather {question.optionOne.text} or{" "}
                {question.optionTwo.text}?
              </div>
            </div>
            <div>
              <div className="buttons">
                <Link to={`/questions/${qid}`} style={{ width: "100%" }}>
                  <button fluid basic color="black">
                    View Poll
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      });
    
    return cards.length
      ? [
          cards.length,
          <div itemsPerRow={this.cardItemsPerRow}>{cards}</div>
        ]
      : [cards.length];
  };

  render() {
    const { questions, authUser, handleTabChange } = this.props;

    const [
      unansweredQuestionsCount,
      unansweredQuestionsContent = "All questions have been answered."
    ] = this.getCardsFromQuestions(
      id =>
        !questions[id].optionOne.votes.includes(authUser) &&
        !questions[id].optionTwo.votes.includes(authUser)
    );

    const [
      answeredQuestionsCount,
      answeredQuestionsContent = "There are no answered questions available."
    ] = this.getCardsFromQuestions(
      qid =>
        questions[qid].optionOne.votes.includes(authUser) ||
        questions[qid].optionTwo.votes.includes(authUser)
    );

    const panes = [
      {
        menuItem: (
          <div key="unanswered-questions">
            Unanswered Questions<label>{unansweredQuestionsCount}</label>
          </div>
        ),
        render: () => <div>{unansweredQuestionsContent}</div>
      },
      {
        menuItem: (
          <div key="answered-questions">
            Answered Questions<label>{answeredQuestionsCount}</label>
          </div>
        ),
        render: () => <h5>{answeredQuestionsContent}</h5>
      }
    ];
    
    console.log(panes)
    return (
      <div>
        <div>
          <div>
            {panes.map((pane)=>(
              <div>
              <h2>{pane.menuItem.key}</h2>
              <h5>{pane.menuItem._self.props.authUser}</h5>
              <div>
                
              {
               Object.values(pane.menuItem._self.props.questions).map((q)=>(
                 <form>
                 <input type="radio" value={q.optionOne.text} name="answer"/>{q.optionOne.text}
                 <input type="radio" value={q.optionTwo.text} name="answer"/>{q.optionTwo.text}
                 {console.log(q.optionOne.text)}
                 <Link to={`/questions/${q.id}`} >
                  <button >
                    View Poll
                  </button>
                </Link>
                 </form>
              ))
              }
              </div>
            
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const sortQuestionsByTimeStamp = questions => {
  const questionsSorted = {};
  Object.keys(questions)
    .map(key => questions[key])
    .sort((a, b) => b.timestamp - a.timestamp)
    .forEach(question => {
      questionsSorted[question.id] = question;
    });
  return questionsSorted;
};

const mapStateToProps = state => {
  return {
    questions: sortQuestionsByTimeStamp(state.questions),
    users: state.users,
    authUser: state.authUser
  };
};

export default connect(mapStateToProps)(QuestionList);
