// src/types/accountTypes.ts
export interface AccountData {
    name: string;
    available_limit: number;
    transactions: Transaction[];
  }
  
  export interface Transaction {
    type: string;
    category: string;
    timestamp: string;
  }
  