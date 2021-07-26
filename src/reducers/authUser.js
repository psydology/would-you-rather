import { USER_AUTHED_ID } from '../actions/authUser';

export default function authUser(state = null, action) {
  if (action.type === USER_AUTHED_ID) {
    return action.id;
  }
  return state;
}