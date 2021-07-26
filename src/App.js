import React, { Component , Fragment } from 'react';
import { BrowserRouter , Route , Switch} from 'react-router-dom';
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from './actions/shared'; 
import { connect } from 'react-redux'; 

import Login from './components/Login';
import Logout from './components/Logout';
import Nav from './components/Nav';
import New from './components/New';
import QuestionList from './components/QuestionList';
import QuestionView from './components/QuestionView';
import Leaderboard from './components/Leaderboard';
import NotFound from './components/NotFound';


import './App.css';

class App extends Component{

  state = { activeIndex: 0 };

  handleTabChange = (e, { activeIndex }) => {
    this.setState({ activeIndex });
  };

  resetActiveIndexToZero = () => {
    this.setState({ activeIndex: 0 });
  };

  componentDidMount(){
    const { handleInitialData } = this.props;
    handleInitialData();
  }
  render() {
    const { authUser } = this.props;
    if (!authUser) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      );
    }
    return(
      <BrowserRouter>
      <Fragment>
        <LoadingBar style={{ zIndex: 1000 }} />
        <Nav />
        <div className="container" style={{ marginTop: "7em" }}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <QuestionList
                    handleTabChange={this.handleTabChange}
                    activeIndex={this.state.activeIndex}
                  />
                );
              }}
            />
            <Route
              path="/add"
              render={history => {
                return (
                  <New
                    resetActiveIndexToZero={this.resetActiveIndexToZero}
                    history={history.history}
                  />
                );
              }}
            />
            <Route path="/questions/:question_id" component={QuestionView} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/logout" component={Logout} />
            <Route path="/404" component={NotFound} />
            <Route path="/" component={NotFound} />
          </Switch>
        </div>

      </Fragment>
    </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  const { authUser } = state;
  return { authUser };
};

export default connect(mapStateToProps , {handleInitialData})(App);
