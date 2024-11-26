import { Dispatch } from "redux";
import axios from "axios";

// Action Types
export const FETCH_ACCOUNT_REQUEST = "FETCH_ACCOUNT_REQUEST";
export const FETCH_ACCOUNT_SUCCESS = "FETCH_ACCOUNT_SUCCESS";
export const FETCH_ACCOUNT_FAILURE = "FETCH_ACCOUNT_FAILURE";

// Interfaces for Actions
interface FetchAccountRequestAction {
  type: typeof FETCH_ACCOUNT_REQUEST;
}

interface FetchAccountSuccessAction {
  type: typeof FETCH_ACCOUNT_SUCCESS;
  payload: AccountData; // Define the proper type
}

interface FetchAccountFailureAction {
  type: typeof FETCH_ACCOUNT_FAILURE;
  error: string;
}

export type AccountActionTypes =
  | FetchAccountRequestAction
  | FetchAccountSuccessAction
  | FetchAccountFailureAction;

// Interface for Account Data
interface AccountData {
  balance: number;
  transactions: string[];
  // Add other fields as per API response
}

// Async Action (Thunk)
export const fetchAccountData = (accountId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_ACCOUNT_REQUEST });

    const token = sessionStorage.getItem("authToken");
    if (!token) {
      dispatch({
        type: FETCH_ACCOUNT_FAILURE,
        error: "User is not authenticated. Please log in.",
      });
      return;
    }

    try {
      console.log("Fetching account data for ID:", accountId); // Debugging log
      const response = await axios.get(
        `https://sandbox-apiconnect.42cards.in/pismo-api/accounts/v1/accounts/${accountId}?cb=${new Date().getTime()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API response:", response.data); // Debugging log
      dispatch({
        type: FETCH_ACCOUNT_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      console.error("Error fetching account data:", error.response || error);
      const errorMessage =
        error.response?.data?.message || error.message || "An unexpected error occurred.";
      dispatch({
        type: FETCH_ACCOUNT_FAILURE,
        error: errorMessage,
      });
    }
  };
};
