// actions/transactionActions.ts
import { Dispatch } from "redux";
import {
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
} from "../types/transactionTypes";

export const fetchTransactions = (statementId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_TRANSACTIONS_REQUEST });

    try {
      const response = await fetch(
        `https://sandbox-apiconnect.42cards.in/pismo-api/transactions-core/v2/transactions?statementId=${statementId}&order=desc&pageSize=30&pageOffset=0&statementPost=true`
      );

      const data = await response.json();

      if (response.ok) {
        const { soft_descriptor, value } = data.data;
        dispatch({
          type: FETCH_TRANSACTIONS_SUCCESS,
          payload: { soft_descriptor, value },
        });
      } else {
        dispatch({
          type: FETCH_TRANSACTIONS_FAILURE,
          payload: "Failed to fetch data",
        });
      }
    } catch (error: any) {
      dispatch({ type: FETCH_TRANSACTIONS_FAILURE, payload: error.message });
    }
  };
};
//
