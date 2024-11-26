export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const loginSuccess = (token: string, user: any) => ({
  type: LOGIN_SUCCESS,
  payload: { token, user },
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: { error },
});
