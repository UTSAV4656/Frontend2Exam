import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const actions = [
    { title: "Book Appointment", icon: "bi-calendar-plus", path: "/book" },
    { title: "My Appointments", icon: "bi-calendar-check", path: "/appointments" },
    { title: "My Reports", icon: "bi-file-earmark-medical", path: "/reports" },
    { title: "My Prescription", icon: "bi-capsule", path: "/prescriptions" }
  ];

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="mb-4">
        <h3 className="fw-bold" style={{ color: "#1a4d2e" }}>
          Welcome, {user?.name || "Patient"}
        </h3>
        <p className="text-muted">Select an option below to manage your healthcare.</p>
      </div>

      {/* Button List */}
      <div className="row g-3">
        {actions.map((item, index) => (
          <div className="col-12 col-md-6" key={index}>
            <button 
              onClick={() => navigate(item.path)}
              className="btn w-100 d-flex align-items-center justify-content-between p-3 rounded-3 shadow-sm border"
              style={{ 
                backgroundColor: "#ffffff",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f8f9fa";
                e.currentTarget.style.borderColor = "#1a4d2e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.borderColor = "#dee2e6";
              }}
            >
              <div className="d-flex align-items-center">
                <i className={`bi ${item.icon} fs-4 me-3`} style={{ color: "#1a4d2e" }}></i>
                <span className="fw-bold text-dark">{item.title}</span>
              </div>
              <i className="bi bi-chevron-right text-muted"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;