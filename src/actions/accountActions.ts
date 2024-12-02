export const FETCH_ACCOUNT_INFO_REQUEST = "FETCH_ACCOUNT_INFO_REQUEST";
export const FETCH_ACCOUNT_INFO_SUCCESS = "FETCH_ACCOUNT_INFO_SUCCESS";
export const FETCH_ACCOUNT_INFO_FAILURE = "FETCH_ACCOUNT_INFO_FAILURE";

export const fetchAccountInfoRequest = () => ({
  type: FETCH_ACCOUNT_INFO_REQUEST,
});

export const fetchAccountInfoSuccess = (data: any) => ({
  type: FETCH_ACCOUNT_INFO_SUCCESS,
  payload: data,
});

export const fetchAccountInfoFailure = (error: string) => ({
  type: FETCH_ACCOUNT_INFO_FAILURE,
  payload: error,
});
