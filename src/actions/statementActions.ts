// import { Dispatch } from "redux";
// import { ApiResponse } from "../types/statementTypes"; // Import the ApiResponse type

// // Define the action types
// export const FETCH_STATEMENTS_REQUEST = "FETCH_STATEMENTS_REQUEST";
// export const FETCH_STATEMENTS_SUCCESS = "FETCH_STATEMENTS_SUCCESS";
// export const FETCH_STATEMENTS_FAILURE = "FETCH_STATEMENTS_FAILURE";

// // Define the action interfaces
// interface FetchStatementsRequestAction {
//   type: typeof FETCH_STATEMENTS_REQUEST;
// }

// interface FetchStatementsSuccessAction {
//   type: typeof FETCH_STATEMENTS_SUCCESS;
//   payload: ApiResponse; // Assuming your API response matches ApiResponse
// }

// interface FetchStatementsFailureAction {
//   type: typeof FETCH_STATEMENTS_FAILURE;
//   payload: string;
// }

// // Union type for the action creators
// export type StatementActionTypes =
//   | FetchStatementsRequestAction
//   | FetchStatementsSuccessAction
//   | FetchStatementsFailureAction;

// // Define the thunk action
// export const fetchStatements = () => {
//   return async (dispatch: Dispatch<StatementActionTypes>) => {
//     try {
//       dispatch({ type: FETCH_STATEMENTS_REQUEST });

//       const response = await fetch(
//         "https://sandbox-apiconnect.42cards.in/pismo-api/statements/v1/accounts/103052861/statements"
//       );
//       const data: ApiResponse = await response.json();

//       dispatch({
//         type: FETCH_STATEMENTS_SUCCESS,
//         payload: data,
//       });
//     } catch (error: any) {
//       dispatch({
//         type: FETCH_STATEMENTS_FAILURE,
//         payload: error.message,
//       });
//     }
//   };
// };
// export const fetchStatementsRequest = () => ({
//   type: FETCH_STATEMENTS_REQUEST,
// });

// export const fetchStatementsSuccess = (data: any) => ({
//   type: FETCH_STATEMENTS_SUCCESS,
//   payload: data,
// });

// export const fetchStatementsFailure = (error: string) => ({
//   type: FETCH_STATEMENTS_FAILURE,
//   payload: error,
// });
import { Dispatch } from "redux";


// Define the action types
export const FETCH_STATEMENTS_REQUEST = "FETCH_STATEMENTS_REQUEST";
export const FETCH_STATEMENTS_SUCCESS = "FETCH_STATEMENTS_SUCCESS";
export const FETCH_STATEMENTS_FAILURE = "FETCH_STATEMENTS_FAILURE";

// Define the action interfaces
interface FetchStatementsRequestAction {
  type: typeof FETCH_STATEMENTS_REQUEST;
}

interface FetchStatementsSuccessAction {
  type: typeof FETCH_STATEMENTS_SUCCESS;
  payload: ApiResponse; // Assuming your API response matches ApiResponse
}

interface FetchStatementsFailureAction {
  type: typeof FETCH_STATEMENTS_FAILURE;
  payload: string;
}

// Union type for the action creators
export type StatementActionTypes =
  | FetchStatementsRequestAction
  | FetchStatementsSuccessAction
  | FetchStatementsFailureAction;

// Define the thunk action
export const fetchStatements = () => {
  return async (dispatch: Dispatch<StatementActionTypes>) => {
    try {
      dispatch({ type: FETCH_STATEMENTS_REQUEST });

      const response = await fetch(
        "https://sandbox-apiconnect.42cards.in/pismo-api/statements/v1/accounts/103052861/statements"
      );
      const data: ApiResponse = await response.json(); // The data will now match ApiResponse

      // Dispatch the success action with the payload
      dispatch({
        type: FETCH_STATEMENTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_STATEMENTS_FAILURE,
        payload: error.message,
      });
    }
  };
};

// Action creators for request, success, and failure
export const fetchStatementsRequest = () => ({
  type: FETCH_STATEMENTS_REQUEST,
});

export const fetchStatementsSuccess = (data: ApiResponse) => ({
  type: FETCH_STATEMENTS_SUCCESS,
  payload: data,
});

export const fetchStatementsFailure = (error: string) => ({
  type: FETCH_STATEMENTS_FAILURE,
  payload: error,
});
