
import { 
  StatementActionTypes, 
  FETCH_STATEMENTS_REQUEST, 
  FETCH_STATEMENTS_SUCCESS, 
  FETCH_STATEMENTS_FAILURE 
} from '../actions/statementActions';

// Define the initial state type
interface State {
  data: ApiResponse | null; // The data is nullable until fetched
  loading: boolean;         // Indicates if the API call is in progress
  error: string | null;     // Holds the error message if the API call fails
}

// Initial state to match the State type
const initialState: State = {
  data: null,  // Data starts as null until fetched
  loading: false, // Initially not loading
  error: null,    // No errors initially
};

// Reducer to handle state changes
const statementReducer = (state = initialState, action: StatementActionTypes): State => {
  switch (action.type) {
    case FETCH_STATEMENTS_REQUEST:
      return {
        ...state,
        loading: true,  // Set loading to true when the request starts
        error: null,    // Clear any previous errors
      };
    case FETCH_STATEMENTS_SUCCESS:
      return {
        ...state,
        loading: false, // Request completed
        data: action.payload, // Update data with API response
      };
    case FETCH_STATEMENTS_FAILURE:
      return {
        ...state,
        loading: false, // Request completed
        error: action.payload, // Update error with the failure message
      };
    default:
      return state; // Return current state for any unknown action
  }
};

export default statementReducer;
