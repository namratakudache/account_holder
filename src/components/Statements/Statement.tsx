import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../store/store";

import {
  fetchStatementsFailure,
  fetchStatementsRequest,
  fetchStatementsSuccess,
} from "../../actions/statementActions";

import "./statement.css";

const Statements: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.statements
  );

  const [authError, setAuthError] = useState(false);
  const [selectedStatement, setSelectedStatement] = useState<any>(null);
  const [transactions, setTransactions] = useState<any>(null);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}`;
  };

  // Fetch statements for a specific account
  const fetchStatementsForAccount = async (accountId: number) => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      setAuthError(true);
      return;
    }

    try {
      const response = await axios.get(
        `https://sandbox-apiconnect.42cards.in/pismo-api/statements/v1/accounts/${accountId}/statements`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(fetchStatementsSuccess(response.data));
      setAuthError(false);
    } catch (err: any) {
      dispatch(fetchStatementsFailure(err.message));
      if (err.response?.status === 401) {
        setAuthError(true);
      }
    }
  };

  // Fetch transactions for a specific statement
  const fetchTransactionsForStatement = async (statementId: number) => {
    const token = sessionStorage.getItem("authToken");
    if (!token || !statementId) return;

    try {
      const response = await axios.get(
        `https://sandbox-apiconnect.42cards.in/pismo-api/transactions-core/v2/transactions?statementId=${statementId}&order=desc&pageSize=30&pageOffset=0&statementPost=true`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.items); // Log to check the structure of items
      setTransactions(response.data.items || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleStatementClick = (statement: any) => {
    setSelectedStatement(statement);
    const statementId = statement?.statement?.id;
    if (statementId) {
      fetchTransactionsForStatement(statementId);
    } else {
      console.error("Invalid Statement ID");
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      setAuthError(true);
      return;
    }

    const accountId = 103052861; // Update with your actual account ID
    fetchStatementsForAccount(accountId);
  }, [dispatch]);

  if (authError) return <div>Please log in to view your statements.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const formtDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // Short month name (e.g., "Oct")
    return `${day} ${month}`;
  };

  // Define the function to get the latest statement
  const getLatestStatement = (statementYear: any) => {
    if (statementYear.months && statementYear.months.length > 0) {
      // Make a copy of the array before sorting to prevent mutation
      const monthsCopy = [...statementYear.months];
      const latestStatement = monthsCopy.sort((a: any, b: any) => {
        const dateA = new Date(a.cycle_closing_date).getTime();
        const dateB = new Date(b.cycle_closing_date).getTime();
        return dateB - dateA;
      })[0]; // Select the latest one
      return latestStatement;
    }
    return null;
  };

  return (
    <div className="statements-full-container">
      <div className="statements-container">
        {Array.isArray(data) &&
          data.map((statementYear: any, index: number) => {
            const latestStatement = getLatestStatement(statementYear);
            if (latestStatement) {
              return (
                <div key={index} className="statement-year">
                  <div
                    key={latestStatement.statement.id}
                    className="statement"
                    onClick={() => handleStatementClick(latestStatement)}
                  >
                    <p className="current-balance">
                      INR {latestStatement.current_balance || 0}
                    </p>
                    <p className="date-range">
                      {formatDate(latestStatement.cycle_opening_date)} to{" "}
                      {formatDate(latestStatement.cycle_closing_date)}
                    </p>
                  </div>
                </div>
              );
            }
            return null; // No latest statement found for this year
          })}
      </div>

      {selectedStatement && (
        <div className="statement-details">
          <div className="details1">
            <p>INR {selectedStatement.current_balance || 0}</p>
            <p>
              <strong>Due date on </strong>
              {formatDate(selectedStatement.due_date) || "N/A"}
            </p>
          </div>
          <div className="transaction-details">
            <p>
              <strong>Transactions</strong>
            </p>
            {transactions ? (
              transactions.length > 0 ? (
                transactions.map((transaction: any, index: number) => (
                  <div key={index} className="transaction-detail">
                    <p>{formtDate(selectedStatement.cycle_closing_date)}</p>
                    <div className="description">
                      <p>{transaction.soft_descriptor || "N/A"}</p>
                      <p>{transaction.processing_description}</p>
                    </div>

                    <p>
                      <strong>
                        INR{" "}
                        {transaction.amount?.find(
                          (amt: any) => amt.type === "PRINCIPAL"
                        )?.value || "N/A"}
                      </strong>
                    </p>
                  </div>
                ))
              ) : (
                <p>No transactions found.</p>
              )
            ) : (
              <p>Loading transactions...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Statements;
