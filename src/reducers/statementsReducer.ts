// import {
//   StatementActionTypes,
//   FETCH_STATEMENTS_REQUEST,
//   FETCH_STATEMENTS_SUCCESS,
//   FETCH_STATEMENTS_FAILURE,
// } from "../actions/statementActions";

// // Define the initial state type
// interface State {
//   data: ApiResponse | null; // The data is nullable until fetched
//   loading: boolean; // Indicates if the API call is in progress
//   error: string | null; // Holds the error message if the API call fails
// }

// // Initial state to match the State type
// const initialState: State = {
//   data: null, // Data starts as null until fetched
//   loading: false, // Initially not loading
//   error: null, // No errors initially
// };

// // Reducer to handle state changes
// const statementReducer = (
//   state = initialState,
//   action: StatementActionTypes
// ): State => {
//   switch (action.type) {
//     case FETCH_STATEMENTS_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case FETCH_STATEMENTS_SUCCESS:
//       // Ensure that you're not mutating the state directly
//       return {
//         ...state,
//         loading: false,
//         data: action.payload ? { ...action.payload } : null, // Shallow copy to avoid mutation
//       };
//     case FETCH_STATEMENTS_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default statementReducer;
// statementsReducer.ts
// statementsReducer.ts
import {
  FETCH_STATEMENTS_REQUEST,
  FETCH_STATEMENTS_SUCCESS,
  FETCH_STATEMENTS_FAILURE,
} from "../actions/statementActions";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

export const statementsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_STATEMENTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_STATEMENTS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_STATEMENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default statementsReducer;