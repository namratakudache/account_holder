
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../store/store";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import swiper CSS
import "swiper/css/navigation"; // Import navigation CSS
import "swiper/css/pagination"; // Import pagination CSS
import {
  fetchStatementsFailure,
  fetchStatementsRequest,
  fetchStatementsSuccess,
} from "../../actions/statementActions";

import "./statement.css";
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';

const Statements: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.statements
  );

  const [authError, setAuthError] = useState(false);
  const [selectedStatement, setSelectedStatement] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}`;
  };

  // Fetch statements for a specific account
  const fetchStatementsForAccount = async (accountId: number) => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      setAuthError(true);
      return;
    }

    dispatch(fetchStatementsRequest());
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
      if (err.response?.status === 401) setAuthError(true);
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
      setTransactions(response.data.items || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleStatementClick = (statement: any) => {
    setSelectedStatement(statement);
    if (statement?.statement?.id) {
      fetchTransactionsForStatement(statement.statement.id);
    } else {
      console.error("Invalid Statement ID");
    }
  };

  const getLatestStatement = (statementYear: any) => {
    if (statementYear?.months?.length > 0) {
      return [...statementYear.months].sort(
        (a: any, b: any) =>
          new Date(b.cycle_closing_date).getTime() -
          new Date(a.cycle_closing_date).getTime()
      )[0];
    }
    return null;
  };

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      setAuthError(true);
      return;
    }

    const accountId = 103052861; 
    fetchStatementsForAccount(accountId);
  }, [dispatch]);

  if (authError) return <div>Please log in to view your statements.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="statements-full-container">
      <div className="statements-container">
   
        {Array.isArray(data) && (
    
          <Swiper
            modules={[Navigation, Pagination]} // Add navigation and pagination modules
            spaceBetween={10} // Space between slides
            slidesPerView={4} // Number of items per view
            navigation={true} // Enable navigation (arrows)
            pagination={{ clickable: true }} // Enable pagination dots
            scrollbar={{ draggable: true }} // Allow draggable scrollbar
            loop={false} // Disable infinite looping (optional)
          >
            {data.map((statementYear: any, index: number) => {
              const latestStatement = getLatestStatement(statementYear);
              return (
                latestStatement && (
                  <SwiperSlide key={index} className="statement-slide">
                    <div
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
                  </SwiperSlide>
                )
              );
            })}
          </Swiper>
          

        )}
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
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <div key={index} className="transaction-detail">
                  <p>{formatDate(selectedStatement.cycle_closing_date)}</p>
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Statements;
