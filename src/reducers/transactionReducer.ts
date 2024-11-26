// src/reducers/transactionReducer.ts
import {
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  TransactionActionTypes,
} from "../actions/transactionActions";
import { TransactionResponse } from "../types/transactionTypes";

// Define Initial State Type
interface TransactionState {
  loading: boolean;
  transactions: TransactionResponse[];
  error: string | null;
}

// Initial State
const initialState: TransactionState = {
  loading: false,
  transactions: [],
  error: null,
};

// Reducer
const transactionReducer = (
  state = initialState,
  action: TransactionActionTypes
): TransactionState => {
  switch (action.type) {
    case FETCH_TRANSACTIONS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TRANSACTIONS_SUCCESS:
      return { ...state, loading: false, transactions: action.payload };
    case FETCH_TRANSACTIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default transactionReducer;
