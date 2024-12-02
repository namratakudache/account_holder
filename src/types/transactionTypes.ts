// types/transactionTypes.ts
export const FETCH_TRANSACTIONS_REQUEST = "FETCH_TRANSACTIONS_REQUEST";
export const FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS";
export const FETCH_TRANSACTIONS_FAILURE = "FETCH_TRANSACTIONS_FAILURE";

export interface TransactionResponse {
  soft_descriptor: string;
  value: number;
}

export interface TransactionState {
  loading: boolean;
  soft_descriptor: string | null;
  value: number | null;
  error: string | null;
}
