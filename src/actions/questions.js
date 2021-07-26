import { saveQuestionAnswer, saveQuestion } from "../api/api";
import { userAddedQuestion, userAnsweredQuestion } from "./users";
import { showLoading, hideLoading } from "react-redux-loading-bar";


export const QUESTIONS = 'QUESTIONS';
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: QUESTIONS,
    questions
  };
}

//-- answer question

function answerQuestion({ authUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authUser,
    qid,
    answer
  };
}

export function handleAnswerQuestion({ authUser, qid, answer }) {
  return dispatch => {
    dispatch(showLoading());

    return saveQuestionAnswer({ authUser, qid, answer }).then(() => {
      dispatch(answerQuestion({ authUser, qid, answer }));
      dispatch(userAnsweredQuestion({ authUser, qid, answer }));
      dispatch(hideLoading());
    });
  };
}

//-- add question

function addQuestion({ question }) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleAddQuestion({ optionOneText, optionTwoText, author }) {
  return dispatch => {
    dispatch(showLoading());

    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(userAddedQuestion({ authUser: author, qid: question.id }));
        dispatch(addQuestion({ question }));
        dispatch(hideLoading());
      }
    );
  };
}