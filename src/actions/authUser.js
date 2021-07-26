export const USER_AUTHED_ID = "USER_AUTHED_ID";

export function setAuthUser(id) {
  return {
    type: USER_AUTHED_ID,
    id
  };
}