// src/actions/transactionActions.ts
import { Dispatch } from "redux";
import { TransactionResponse } from "../types/transactionTypes";

// Action Types
export const FETCH_TRANSACTIONS_REQUEST = "FETCH_TRANSACTIONS_REQUEST";
export const FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS";
export const FETCH_TRANSACTIONS_FAILURE = "FETCH_TRANSACTIONS_FAILURE";

// Define Action Interfaces
export interface FetchTransactionsRequestAction {
  type: typeof FETCH_TRANSACTIONS_REQUEST;
}

export interface FetchTransactionsSuccessAction {
  type: typeof FETCH_TRANSACTIONS_SUCCESS;
  payload: TransactionResponse[];
}

export interface FetchTransactionsFailureAction {
  type: typeof FETCH_TRANSACTIONS_FAILURE;
  payload: string;
}

// Union Action Type
export type TransactionActionTypes =
  | FetchTransactionsRequestAction
  | FetchTransactionsSuccessAction
  | FetchTransactionsFailureAction;

// Action Creators
export const fetchTransactionsRequest = (): FetchTransactionsRequestAction => ({
  type: FETCH_TRANSACTIONS_REQUEST,
});

export const fetchTransactionsSuccess = (
  data: TransactionResponse[]
): FetchTransactionsSuccessAction => ({
  type: FETCH_TRANSACTIONS_SUCCESS,
  payload: data,
});

export const fetchTransactionsFailure = (
  error: string
): FetchTransactionsFailureAction => ({
  type: FETCH_TRANSACTIONS_FAILURE,
  payload: error,
});

// Thunk Action to Fetch Transactions
export const fetchTransactions = (statementId: string) => {
  debugger;
  return async (dispatch: Dispatch<TransactionActionTypes>) => {
    dispatch(fetchTransactionsRequest());

    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        dispatch(fetchTransactionsFailure("User is not logged in"));
        return;
      }

      const response = await fetch(
        `https://sandbox-apiconnect.42cards.in/pismo-api/transactions-core/v2/transactions?statementId=${statementId}&order=desc&pageSize=30&pageOffset=0&statementPost=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data: TransactionResponse[] = await response.json();
      dispatch(fetchTransactionsSuccess(data));
    } catch (error: any) {
      dispatch(fetchTransactionsFailure(error.message || "An error occurred"));
    }
  };
};
