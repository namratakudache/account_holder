import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sessionTimout.css";

const SessionTimeout: React.FC = () => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const [timer, setTimer] = useState<number>(0); // Track time passed
  const [showWarning, setShowWarning] = useState<boolean>(false); // Show warning flag

  // Set the inactivity timeout period (e.g., 15 minutes)
  const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes in milliseconds
  const WARNING_LIMIT = INACTIVITY_LIMIT - 60000; // 1 minute before session expiration

  // Function to handle reset on user activity
  const resetTimer = () => {
    setTimer(0); // Reset timer to 0 on activity
    setShowWarning(false); // Reset warning when user is active
  };

  // Function to handle session timeout
  const handleTimeout = () => {
    alert("Your session has expired. Please log in again.");
    // Redirect to login page or perform any other session expiration action
    navigate("/"); // Replace history.push with navigate
  };

  // Function to show the warning when time is close to expiration
  const showSessionWarning = () => {
    setShowWarning(true);
  };

  // Detect user activity
  useEffect(() => {
    // Add event listeners for user activity
    const activityEvents = ["mousemove", "keydown", "click", "scroll"];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Start a timer that increases every second
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1000);
    }, 1000);

    // Show warning before session expires
    if (timer >= WARNING_LIMIT && !showWarning) {
      showSessionWarning();
    }

    // Check if session expired
    if (timer >= INACTIVITY_LIMIT) {
      handleTimeout();
    }

    // Cleanup event listeners and interval on component unmount
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearInterval(interval);
    };
  }, [timer, navigate, showWarning]);

  return (
    <div>
      {showWarning && (
        <div className="session-warning">
          Your session will expire in 1 minute!
        </div>
      )}
    </div>
  );
};

export default SessionTimeout;
