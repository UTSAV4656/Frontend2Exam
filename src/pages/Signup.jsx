import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axios";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("waiter");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users/signup", {
        UserName: username,
        Password: password,
        UserRole: role,
        RestaurantID: 789,
      });

      alert("User created successfully");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create account</h2>
        <p className="auth-subtitle">
          Add a user for your restaurant system.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="auth-input"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="auth-input"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              className="auth-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="waiter">Waiter</option>
              <option value="manager">Manager</option>
              <option value="cashier">Cashier</option>
            </select>
          </div>

          <button className="auth-button" type="submit">
            Sign up
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;