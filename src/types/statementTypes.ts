// // types.ts

// // Defines the structure of a single cycle
// export interface Cycle {
//   real_due_date: string;
//   due_date: string;
//   opening_date: string;
//   closing_date: string;
//   cycle_number: number;
// }

// // Defines the structure of a statement
// export interface Statement {
//   statement_id: number;
//   status: string;
//   month_index: number;
//   month_name: string;
//   year_due_date: string;
//   cycle: Cycle;
//   previous_balance: number;
//   previous_due_date: string;
//   current_balance: number;
//   minimum_payment: number;
//   total_due_amount: number;
//   total_credit: number;
//   total_debit: number;
//   min_upfront_amount: number;
//   paid_amount: number | null;
//   paid_amount_before_due_date: number | null;
//   local_balance: number;
//   max_number_of_installments: number;
//   financed_balance: number;
//   posted_date: string | null;
//   bar_code: string | null;
//   international_debts: string | null;
//   exchange_rate: number | null;
//   summary: Array<{ description: string; value: number }>;
// }

// // Defines the API response structure for statements
// export interface ApiResponse {
//   current_page: number;
//   per_page: number;
//   pages: number;
//   total_items: number;
//   items: Statement[];  // Use 'items' if that's what the API returns, or 'data' if it's the correct field
// }

// // Simplified structure of a statement item for pagination
// export interface StatementItem {
//   statement_id: string;
//   status: string;
//   month_name: string;
//   // Add other fields that you need for the pagination or list view (e.g., month, year, balance)
// }

// // State structure for statements in the Redux store
// interface StatementsState {
//   loading: boolean;
//   data: StatementItem[] | null;  // Use Statement[] if full statement data is needed, else StatementItem[]
//   error: string | null;
// }

// Assuming ApiResponse is the structure of the response

interface Statement {
  id: number; // Adjusted based on the "statement.id" field
}

interface Month {
  current_balance: number;
  previous_balance: number;
  credits: number;
  debits: number;
  minimum_payment: number;
  cycle_closing_date: string;
  due_date: string;
  previous_due_date: string | null;
  posted_date: string;
  bar_code: string | null;
  international_debts: number | null;
  exchange_rate: number | null;
  local_balance: number;
  statement: Statement;
  name: string;
  month_index: number;
  cycle_opening_date: string;
  payment_status: string;
  max_number_of_installments: string;
}

interface YearlyStatements {
  year_due_date: number;
  months: Month[];
}

type ApiResponse = YearlyStatements[];
