import React, { Component} from 'react'
import { connect } from 'react-redux'

export class Leaderboard extends Component {
    

    render() {
      const { users } = this.props;
  
      
  
      const usersWithScore = {};
      Object.keys(users).forEach(uid => {
        const user = users[uid];
        const answeredQuestions = Object.keys(user.answers).length;
        const createdQuestions = user.questions.length;
        user.score = answeredQuestions + createdQuestions;
        usersWithScore[uid] = user;
      });
  
      const usersWithScoreSorted = {};
      Object.keys(users)
        .map(uid => users[uid])
        .sort((a, b) => b.score - a.score)
        .forEach(user => {
          usersWithScoreSorted[user.id] = user;
        });
  
      const userCards = Object.keys(usersWithScoreSorted).map(uid => {
        const user = usersWithScoreSorted[uid];
        let label = null;
        
    
        const answeredQuestions = Object.keys(user.answers).length;
        const createdQuestions = user.questions.length;
        const score = answeredQuestions + createdQuestions;
        return (
          <div key={uid}>
            <img src={user.avatarURL} label={label} alt="avatar"/>
            <div>
              <div>{user.name}</div>
              <div>
                Rank &nbsp;

              </div>
              <div>
                <div style={{ fontSize: "1rem" }}>
                  <div>
                    <div>
                      Answered: {answeredQuestions}
                      <br />
                      Created: {createdQuestions}
                    </div>
                    <div>
                      <div>
                        <strong>Score</strong>
                      </div>
                      <label>
                        {score}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
      return (
        <div >{userCards}</div>
      );
    }
  }
  
  const mapStateToProps = state => {
    return { users: state.users };
  };
  
  export default connect(mapStateToProps)(Leaderboard);
  