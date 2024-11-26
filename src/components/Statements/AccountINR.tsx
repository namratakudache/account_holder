import React, { useEffect, useState, useRef } from "react";
import AccountDetails from "../AccountDetails/AccountDetails";
import "./accountInr.css";

// Define types for account data and transaction details
interface AccountData {
  statementId: string;
  current_balance: number;
  opening_date: string;
  closing_date: string;
  due_date: string;
  minimum_payment: number;
  softDescriptor?: string; // Optional field
  value?: number; // Optional field
}

interface Transaction {
  description: string;
  amount: number;
  date: string;
  softDescriptor: string;
  value: number;
}

// Function to format the date in 'DD-MMM' format
const formatDate = (dateString: string): string => {
  const date = new Date(dateString); // Parse the date string into a Date object
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
  };
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

const AccountINR: React.FC = () => {
  const [data, setData] = useState<AccountData[]>([]); // Typed data state
  const [selectedItem, setSelectedItem] = useState<AccountData | null>(null); // Typed selectedItem state
  const [transactionDetails, setTransactionDetails] = useState<Transaction[]>(
    []
  ); // Strict typing for transactions
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = sessionStorage.getItem("authToken");

      if (!token) {
        setError("Authentication token is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://sandbox-apiconnect.42cards.in/pismo-api/accounts/v1/accounts/103052861/statements",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        const formattedData = result
          .map((year: any) =>
            year.months.map((month: any) => ({
              statementId: month.statement.id,
              current_balance: month.current_balance,
              opening_date: month.cycle_opening_date,
              closing_date: month.cycle_closing_date,
              due_date: month.due_date,
              minimum_payment: month.minimum_payment,
              softDescriptor: month.softDescriptor || "Default Descriptor", // Extract from API or use fallback
              value: month.value || 0, // Extract from API or use fallback
            }))
          )
          .flat();

        setData(formattedData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchTransactionDetails = async (statementId: string) => {
    setLoading(true);
    const token = sessionStorage.getItem("authToken");

    if (!token) {
      setError("Authentication token is missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://sandbox-apiconnect.42cards.in/pismo-api/transactions-core/v2/transactions?statementId=${statementId}&order=desc&pageSize=30&pageOffset=0&statementPost=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transaction details");
      }

      const result = await response.json();

      // Check if 'items' is an array and map through it
      if (Array.isArray(result.items)) {
        const transactionData = result.items.map((transaction: any) => {
          // Extracting value from the amount array where type is "PRINCIPAL"
          const principalAmount =
            transaction.amount.find((amt: any) => amt.type === "PRINCIPAL")
              ?.value || 0; // Default to 0 if not found

          return {
            description: transaction.processing_description || "No description",
            softDescriptor: transaction.soft_descriptor || "Default Descriptor",
            value: principalAmount,
            date: transaction.event_date,
          };
        });

        setTransactionDetails(transactionData);
      } else {
        setTransactionDetails([]);
      }

      setLoading(false);
    } catch (error) {
      setError("Error fetching transaction details.");
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const handleItemClick = (item: AccountData) => {
    setSelectedItem(item);
    fetchTransactionDetails(item.statementId);
  };

  return (
    <>
      <div className="horizontal-scroll-container">
        <button className="scroll-arrow left" onClick={scrollLeft}>
          &#8249;
        </button>
        <div className="scroll-row" ref={scrollContainerRef}>
          {loading && <div>Loading...</div>} {/* Show loading text */}
          {error && <div className="error">{error}</div>}{" "}
          {/* Display error message */}
          {data.map((item, index) => (
            <div
              key={index}
              className="scroll-item"
              onClick={() => handleItemClick(item)}
            >
              <span className="amount">
                INR {item.current_balance.toFixed(2)}
              </span>
              <span className="date">
                {formatDate(item.opening_date)} to{" "}
                {formatDate(item.closing_date)}
              </span>
            </div>
          ))}
        </div>
        <button className="scroll-arrow right" onClick={scrollRight}>
          &#8250;
        </button>
      </div>
      {selectedItem && (
        <AccountDetails
          amount={`INR ${selectedItem.current_balance.toFixed(2)}`}
          date={`${formatDate(selectedItem.opening_date)} to ${formatDate(
            selectedItem.closing_date
          )}`}
          dueDate={formatDate(selectedItem.due_date)}
          minimumPayment={selectedItem.minimum_payment}
          softDescriptor={selectedItem.softDescriptor || "N/A"} // Use dynamic value
          value={selectedItem.value || 0} // Use dynamic value
        />
      )}
      {transactionDetails &&
      Array.isArray(transactionDetails) &&
      transactionDetails.length > 0 ? (
        <div className="transaction-details">
          <div className="transaction-list">
            {transactionDetails.map((transaction, index) => (
              <div key={index} className="transaction-item">
                <span>{formatDate(transaction.date)}</span>
                <span>
                  <strong>{transaction.description}</strong>
                </span>
                <span>
                  INR <strong> {transaction.value}</strong>
                </span>
                <span>{transaction.softDescriptor}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-transactions">No transactions available.</div>
      )}
    </>
  );
};

export default AccountINR;
