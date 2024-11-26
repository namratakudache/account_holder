import {
    FETCH_STATEMENTS_REQUEST,
    FETCH_STATEMENTS_SUCCESS,
    FETCH_STATEMENTS_FAILURE,
    StatementActions,
  } from '../actions/statementActions';
  
  // State Interface
  interface StatementState {
    loading: boolean;
    statements: any[];
    error: string | null;
  }
  
  // Initial State
  const initialState: StatementState = {
    loading: false,
    statements: [],
    error: null,
  };
  
  // Reducer Function
  export const statementReducer = (
    state = initialState,
    action: StatementActions
  ): StatementState => {
    switch (action.type) {
      case FETCH_STATEMENTS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_STATEMENTS_SUCCESS:
        return { ...state, loading: false, statements: action.payload, error: null };
      case FETCH_STATEMENTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  