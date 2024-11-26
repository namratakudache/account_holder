// src/types/transactionTypes.ts

export interface TransactionResponse {
  statementId: string;
  description: string;
  amount: number;
  date: string;
  // Add more fields as per the transaction response from the API
}
