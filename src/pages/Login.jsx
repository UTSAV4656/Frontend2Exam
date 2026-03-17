import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); // Fixed naming
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      // Check for 'role' or 'UserRole' based on your API response
      const role = (result.user?.role || result.user?.UserRole || "").toLowerCase();

      switch (role) {
        case "admin":
          navigate("/admin/myClinic");
          break;
        case "receptionist":
        case "rec":
          navigate("/reception/queue");
          break;
        case "doctor":
          navigate("/doctor/queue");
          break;
        case "patient":
          navigate("/dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    } else {
      alert(result.message || "Login failed. Please check your credentials.");
      setIsSubmitting(false); // Re-enable button on failure
    }
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="auth-card shadow-sm bg-white p-4 p-sm-5 rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
        
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle" style={{ width: '60px', height: '60px' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0d6efd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
        </div>

        <h2 className="h4 fw-bold text-center mb-1">Clinic Login</h2>
        <p className="text-muted text-center mb-4 small">Secure Access for Patients & Staff</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-control form-control-lg fs-6"
              placeholder="name@clinic.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between">
              <label className="form-label small fw-semibold text-secondary" htmlFor="password">
                Password
              </label>
              <Link to="/forgot-password" px="0" className="small text-decoration-none">
                Forgot?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              className="form-control form-control-lg fs-6"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            className="btn btn-primary btn-lg w-100 fw-bold mb-3" 
            type="submit"
            disabled={isSubmitting} // Disable while loading
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="text-center small text-muted">
          Don&apos;t have an account? <Link to="/signup" className="text-primary fw-bold text-decoration-none">Create one</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;