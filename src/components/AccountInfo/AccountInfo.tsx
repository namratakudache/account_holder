import React from "react";
import "./accountInfo.css";

const AccountInfo: React.FC = () => {
  // Sample data for the sections
  const accountInfo = [
    {
      title: "ST",
      content: "SentilKumar T",
      c: "Credit Card",
    },
    {
      title: "Available Credit",
      content: "INR 136,791.58",
    },
    {
      title: "",
      content: "",
      extra: [
        { label: "Closed Statement.", value: "INR 1,008.42", date: "Nov 11" },
        { label: "Adjustment Credit", value: "INR 1,008.42", date: "Oct 29" },
        { label: "Adjustment Credit", value: "INR 2,008.42", date: "Oct 29" },
        { label: "Closed Statement", value: "INR 3,008.42", date: "Nov 11" },
        { label: "Adjustment Credit", value: "INR 4,008.42", date: "Oct 29" },
        { label: "Adjustment Credit", value: "INR 1,008.42", date: "Oct 29" },
        { label: "Closed Statement", value: "INR 6,008.42", date: "Nov 11" },
        { label: "Adjustment Credit", value: "INR 1,008.42", date: "Oct 29" },
        { label: "Adjustment Credit", value: "INR 1,008.42", date: "Oct 29" },
      ],
    },
  ];

  return (
    <div className="account-info">
      {accountInfo.map((info, index) => (
        <div key={index} className="account-info-section">
          <h3>{info.title}</h3>
          <p>{info.content}</p>
          {info.c && <p>{info.c}</p>}
          {/* For the 3rd section, render additional divs */}

          {info.extra && (
            <div className="extra-info">
              <p>Refresh</p>
              {info.extra.map((item, idx) => (
                <div key={idx} className="extra-info-item">
                  <div>
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </div>
                  <div className="date">{item.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccountInfo;
