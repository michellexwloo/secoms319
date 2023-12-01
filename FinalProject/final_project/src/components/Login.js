import React, { useState, useEffect } from "react";
import usersData from "../employees.json";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Check if the email and password match any user data
    const user = usersData.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Successful login
      onLoginSuccess(user.name);
    } else {
      // Failed login
      setError("Invalid email or password");
    }
  };  

  // Styling
  const styles = {
    loginContainer: {
      maxWidth: "400px",
      margin: "auto",
      marginBottom: "10px",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
    },
    inputContainer: {
      marginBottom: "10px",
      width: "70%",
    },
    inputField: {
      width: "100%",
      padding: "8px",
      boxSizing: "border-box",
      fontSize: "21px",
    },
    loginButton: {
      backgroundColor: "#4caf50",
      color: "#fff",
      padding: "15px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      width: "100%",
    },
    error: {
      marginTop: "10px",
    },
  };

  return (
    <div>
      <header>
        <h1>Wan Yeen Tradings</h1>
      </header>

      <div id="subheader">
        <h2>Temperature & Humidity Tracker</h2>
      </div>

<div id="content">
      <div id="login" style={styles.loginContainer}>
        <h1>Login</h1>
        <div style={styles.loginContainer}>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.loginContainer}
          />
        </div>
        <div style={styles.loginContainer}>
          <label>Password: </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.loginContainer}
          />
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>
        <div>&nbsp;</div>
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: "red", ...styles.error }}>{error}</p>}
      </div>
      </div>

      <footer>
        <p>&copy; Wan Yeen Trading's Warehouse Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;
