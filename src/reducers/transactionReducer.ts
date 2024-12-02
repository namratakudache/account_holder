// reducers/transactionReducer.ts
import {
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
} from "../types/transactionTypes";

const initialState = {
  loading: false,
  soft_descriptor: null,
  value: null,
  error: null,
};

const transactionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        soft_descriptor: action.payload.soft_descriptor,
        value: action.payload.value,
      };
    case FETCH_TRANSACTIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default transactionReducer;
