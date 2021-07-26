import { getInitialData } from '../api/api';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';
import { showLoading, hideLoading } from "react-redux-loading-bar";


export const handleInitialData = () => dispatch => {
  dispatch(showLoading());
  return getInitialData().then(({ users, questions }) => {
    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
    dispatch(hideLoading());
  });
};