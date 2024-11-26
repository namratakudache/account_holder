// statementActions.ts

// Action Types
export const FETCH_STATEMENTS_REQUEST = "FETCH_STATEMENTS_REQUEST";
export const FETCH_STATEMENTS_SUCCESS = "FETCH_STATEMENTS_SUCCESS";
export const FETCH_STATEMENTS_FAILURE = "FETCH_STATEMENTS_FAILURE";

interface FetchStatementsRequest {
  type: typeof FETCH_STATEMENTS_REQUEST;
}

interface FetchStatementsSuccess {
  type: typeof FETCH_STATEMENTS_SUCCESS;
  payload: any[]; // Adjust the type as per your API response structure
}

interface FetchStatementsFailure {
  type: typeof FETCH_STATEMENTS_FAILURE;
  payload: string;
}

export type StatementActions =
  | FetchStatementsRequest
  | FetchStatementsSuccess
  | FetchStatementsFailure;

// Action Creators
export const fetchStatementsRequest = (): FetchStatementsRequest => ({
  type: FETCH_STATEMENTS_REQUEST,
});

export const fetchStatementsSuccess = (
  statements: any[]
): FetchStatementsSuccess => ({
  type: FETCH_STATEMENTS_SUCCESS,
  payload: statements,
});

export const fetchStatementsFailure = (
  error: string
): FetchStatementsFailure => ({
  type: FETCH_STATEMENTS_FAILURE,
  payload: error,
});

// Thunk Action Creator (for async API call)
export const fetchAccountStatements =
  (accountId: string) =>
  async (dispatch: any): Promise<void> => {
    dispatch(fetchStatementsRequest());

    // Retrieve the token from session storage
    const token = sessionStorage.getItem("authToken");

    if (!token) {
      dispatch(fetchStatementsFailure("User not authenticated. Please log in."));
      return;
    }

    try {
      const response = await fetch(
        `https://sandbox-apiconnect.42cards.in/pismo-api/statements/v2/accounts/${accountId}/statements`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch account statements");
      }

      const result = await response.json();

      const formattedData = result.items.map((item: any) => ({
        financed_balance: item.financed_balance,
        opening_date: item.cycle.opening_date,
        closing_date: item.cycle.closing_date,
      }));

      dispatch(fetchStatementsSuccess(formattedData));
    } catch (error: any) {
      dispatch(fetchStatementsFailure(error.message || "Something went wrong"));
    }
  };
