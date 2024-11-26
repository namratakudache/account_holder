import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../api/authApi";
import { loginFailure, loginSuccess } from "../../actions/authActions";

const LoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [clientId, setClientId] = useState("sleeve"); // Default value for clientId
  const [encReq, setEncReq] = useState("348158"); // Default value for encReq
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    // Reset any previous error
    setError(null);

    try {
      const response = await login(clientId, encReq);

      if (response.success) {
        // On success, dispatch login success action
        dispatch(loginSuccess(response.token, response));

        // Save token in sessionStorage for the current session
        sessionStorage.setItem("authToken", response.token);

        // Redirect to the main page (after successful login)
        window.location.href = "/home"; // Or use `useNavigate` if you're using React Router v6
      } else {
        // Handle login failure scenario
        setError("Login failed: Invalid credentials or other error.");
        dispatch(loginFailure("Login failed"));
      }
    } catch (err) {
      // Catch any unexpected errors during login API call
      setError("Failed to log in: Please try again later.");
      dispatch(loginFailure("Login failed"));
    }
  };

  return (
    <div>
      {/* <h2>Login</h2> */}
      {/* <div>
        <label>Client ID:</label>
        <input
          type="text"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
      </div> */}
      {/* <div>
        <label>Encrypted Request:</label>
        <input
          type="text"
          value={encReq}
          onChange={(e) => setEncReq(e.target.value)}
        />
      </div> */}
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default LoginComponent;
