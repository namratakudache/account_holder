// Action Types
export const FETCH_ACCOUNT_REQUEST = "FETCH_ACCOUNT_REQUEST";
export const FETCH_ACCOUNT_SUCCESS = "FETCH_ACCOUNT_SUCCESS";
export const FETCH_ACCOUNT_FAILURE = "FETCH_ACCOUNT_FAILURE";

// Define Account Data Shape
interface AccountData {
  balance: number;
  transactions: { id: string; amount: number; date: string }[];
  accountHolderName?: string;
}

// Define Error Details Shape
interface ErrorDetails {
  message: string;
  code?: number;
}

// State Interface
interface AccountState {
  data: AccountData | null;
  loading: boolean;
  error: ErrorDetails | null;
}

// Initial State
const initialState: AccountState = {
  data: null,
  loading: false,
  error: null,
};

// Action Interfaces
interface FetchAccountRequestAction {
  type: typeof FETCH_ACCOUNT_REQUEST;
}

interface FetchAccountSuccessAction {
  type: typeof FETCH_ACCOUNT_SUCCESS;
  payload: AccountData;
}

interface FetchAccountFailureAction {
  type: typeof FETCH_ACCOUNT_FAILURE;
  error: ErrorDetails;
}

export type AccountActionTypes =
  | FetchAccountRequestAction
  | FetchAccountSuccessAction
  | FetchAccountFailureAction;

// Reducer
const accountReducer = (
  state = initialState,
  action: AccountActionTypes
): AccountState => {
  switch (action.type) {
    case FETCH_ACCOUNT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ACCOUNT_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_ACCOUNT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default accountReducer;
