// import React, { useRef } from "react";
// import "./accountInr.css";

// const AccountINR: React.FC = () => {
//   // Dummy data for INR and date
//   const data = [
//     { amount: "INR 10,000.00", date: "12-Mar to 11-Apr" },
//     { amount: "INR 20,000.00", date: "2-Mar to 11-Apr" },
//     { amount: "INR 15,500.00", date: "3-Jun to 11-Apr 3" },
//     { amount: "INR 30,000.00", date: "12-Mar to 11-Aprv 4" },
//     { amount: "INR 25,000.00", date: "4-Jan to 11-Apr 5" },
//     { amount: "INR 18,000.00", date: "12-Mar to 11-Apr" },
//     { amount: "INR 50,000.00", date: "5-Sep to 11-Apr" },
//     { amount: "INR 45,000.00", date: "12-Mar to 11-Apr" },
//     { amount: "INR 40,000.00", date: "6-Oct to 11-Apr" },
//   ];

//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   // Function to scroll left
//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({
//         left: -200, // Amount to scroll to the left
//         behavior: "smooth",
//       });
//     }
//   };

//   // Function to scroll right
//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({
//         left: 200, // Amount to scroll to the right
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="horizontal-scroll-container">
//       <button className="scroll-arrow left" onClick={scrollLeft}>
//         &#8249; {/* Left Arrow */}
//       </button>
//       <div className="scroll-row" ref={scrollContainerRef}>
//         {data.map((item, index) => (
//           <div key={index} className="scroll-item">
//             <span className="amount">{item.amount}</span>
//             <span className="date">{item.date}</span>
//           </div>
//         ))}
//       </div>
//       <button className="scroll-arrow right" onClick={scrollRight}>
//         &#8250; {/* Right Arrow */}
//       </button>
//     </div>
//   );
// };

// export default AccountINR;
// src/components/AccountINRScroll/AccountINR.tsx
import React, { useRef, useState } from "react";
import AccountDetails from "../AccountDetails/AccountDetails"; // Adjust the path as needed
import "./accountInr.css";

const AccountINR: React.FC = () => {
  const data = [
    { amount: "INR 10,000.00", date: "12-Mar to 11-Apr" },
    { amount: "INR 20,000.00", date: "2-Mar to 11-Apr" },
    { amount: "INR 15,500.00", date: "3-Jun to 11-Apr 3" },
    { amount: "INR 30,000.00", date: "12-Mar to 11-Aprv 4" },
    { amount: "INR 25,000.00", date: "4-Jan to 11-Apr 5" },
    { amount: "INR 18,000.00", date: "12-Mar to 11-Apr" },
    { amount: "INR 50,000.00", date: "5-Sep to 11-Apr" },
    { amount: "INR 45,000.00", date: "12-Mar to 11-Apr" },
    { amount: "INR 40,000.00", date: "6-Oct to 11-Apr" },
  ];

  const [selectedItem, setSelectedItem] = useState<{
    amount: string;
    date: string;
  } | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const handleItemClick = (item: { amount: string; date: string }) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <div className="horizontal-scroll-container">
        <button className="scroll-arrow left" onClick={scrollLeft}>
          &#8249;
        </button>
        <div className="scroll-row" ref={scrollContainerRef}>
          {data.map((item, index) => (
            <div
              key={index}
              className="scroll-item"
              onClick={() => handleItemClick(item)}
            >
              <span className="amount">{item.amount}</span>
              <span className="date">{item.date}</span>
            </div>
          ))}
        </div>
        <button className="scroll-arrow right" onClick={scrollRight}>
          &#8250;
        </button>
      </div>
      {selectedItem && (
        <AccountDetails amount={selectedItem.amount} date={selectedItem.date} />
      )}
    </div>
  );
};

export default AccountINR;
