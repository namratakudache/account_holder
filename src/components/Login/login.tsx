import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Use navigate for redirection
import { login } from "../../api/authApi";
import { loginFailure, loginSuccess } from "../../actions/authActions";
import "./login.css";

const LoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate for redirection after login
  const [clientId, setClientId] = useState<string>("sleeve"); // Default value for clientId
  const [encReq, setEncReq] = useState<string>("348158"); // Default value for encReq
  const [error, setError] = useState<string | null>(null); // Error state for feedback
  const [loading, setLoading] = useState<boolean>(false); // Loading state to indicate the request is in progress

  // Handle login
  const handleLogin = async () => {
    setError(null); // Reset error before starting
    setLoading(true); // Start loading

    try {
      // Make the login API call using clientId and encReq
      const response = await login(clientId, encReq);

      setLoading(false); // Stop loading after receiving the response

      if (response.success) {
        // On success, dispatch login success action
        dispatch(loginSuccess(response.token, response));

        // Save token in sessionStorage for the current session
        sessionStorage.setItem("authToken", response.token);

        // Redirect to the home page after successful login
        navigate("/home");
      } else {
        // Handle login failure scenario
        setError(
          response.message ||
            "Login failed: Invalid credentials or other error."
        );
        dispatch(loginFailure("Login failed"));
      }
    } catch (err) {
      // Catch any unexpected errors during login API call
      setLoading(false); // Stop loading if an error occurs
      setError("Failed to log in: Please try again later.");
      dispatch(loginFailure("Login failed"));
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Login</h2>

        {/* Input for clientId */}
        <div>
          <label>Client ID:</label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)} // Updating clientId dynamically
          />
        </div>

        {/* Input for encrypted request (encReq) */}
        <div>
          <label>Encrypted Request:</label>
          <input
            type="text"
            value={encReq}
            onChange={(e) => setEncReq(e.target.value)} // Updating encReq dynamically
          />
        </div>

        {/* Login button */}
        <div>
          <button onClick={handleLogin} disabled={loading}>
            {loading ? <div className="loading-spinner"></div> : "Login"}
          </button>
        </div>

        {/* Show error message if there's an error */}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default LoginComponent;
