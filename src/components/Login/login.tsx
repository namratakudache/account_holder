import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import { loginFailure, loginSuccess } from "../../actions/authActions";
import "./login.css";

const LoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clientId, setClientId] = useState<string>("sleeve");
  const [encReq, setEncReq] = useState<string>("348158");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle login
  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await login(clientId, encReq);

      setLoading(false);

      if (response.success) {
        dispatch(loginSuccess(response.token, response));
        sessionStorage.setItem("authToken", response.token);
        navigate("/home"); // Navigate to Home
      } else {
        setError(response.message || "Invalid credentials or other error.");
        dispatch(loginFailure("Login failed"));
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to log in: Please try again later.");
      dispatch(loginFailure("Login failed"));
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Login</h2>
        <div>
          <label>Client ID:</label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />
        </div>
        <div>
          <label>Encrypted Request:</label>
          <input
            type="text"
            value={encReq}
            onChange={(e) => setEncReq(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleLogin} disabled={loading}>
            {loading ? <div className="loading-spinner"></div> : "Login"}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default LoginComponent;
