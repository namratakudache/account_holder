

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
