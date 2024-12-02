import {
  FETCH_ACCOUNT_INFO_REQUEST,
  FETCH_ACCOUNT_INFO_SUCCESS,
  FETCH_ACCOUNT_INFO_FAILURE,
} from "../actions/accountActions";

const initialState = {
  accountInfo: null,
  loading: false,
  error: null,
};

const accountReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_ACCOUNT_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        accountInfo: action.payload,
      };
    case FETCH_ACCOUNT_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default accountReducer;
