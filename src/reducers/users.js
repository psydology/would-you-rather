import { USERS , USER_ADDED_QUESTION, USER_ANSWERED_QUESTION } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case USERS:
      return {
        ...state,
        ...action.users
      };
      case USER_ADDED_QUESTION:
      return {
        ...state,
        [action.authUser]: {
          ...state[action.authUser],
          questions: [...state[action.authUser].questions, action.qid]
        }
      };
    case USER_ANSWERED_QUESTION:
      return {
        ...state,
        [action.authUser]: {
          ...state[action.authUser],
          answer: {
            ...state[action.authUser].answer,
            [action.qid]: action.answer
          }
        }
      };
    default:
      return state;
  }
}