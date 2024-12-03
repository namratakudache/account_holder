
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