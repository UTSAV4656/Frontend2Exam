import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Role-based Menu Configuration
  const menuItems = {
    admin: [
      { name: "My Clinic", path: "/admin/myClinic" },
      { name: "Users", path: "/admin/users" },
    ],
    receptionist: [
      { name: "Manage Queue", path: "/reception/queue" },
      { name: "TV Display", path: "/reception/tv" },
    ],
    patient: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Book Appointment", path: "/book" },
      { name: "My Appointments", path: "/appointments" },
      { name: "My Prescriptions", path: "/prescriptions" },
      { name: "My Reports", path: "/reports" },
    ],
    doctor: [
      { name: "Today's Queue", path: "/doctor/queue" },
      { name: "Add Prescription", path: "/doctor/add-prescription" },
      { name: "Add Reports", path: "/doctor/add-reports" },
    ],
  };

  const currentMenu = menuItems[user?.role] || [];

  return (
    <div className="min-vh-100 bg-light">
      {/* DARK GREEN HEADER */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: "#1a4d2e" }}>
        <div className="container">
          {/* Clinic Brand */}
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
            <i className="bi bi-shield-plus me-2"></i>
            CLINIC<span>PRO</span>
          </Link>

          {/* Mobile Toggle */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {currentMenu.map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link 
                    className={`nav-link ${location.pathname === item.path ? 'active fw-bold text-white' : ''}`} 
                    to={item.path}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Side: User Info & Logout */}
            <div className="d-flex align-items-center gap-3">
              <div className="text-light d-none d-md-block text-end me-2">
                <small className="d-block opacity-75" style={{ fontSize: '10px', textTransform: 'uppercase' }}>{user?.role}</small>
                <span className="fw-semibold">{user?.name || "User"}</span>
              </div>
              <button 
                onClick={handleLogout} 
                className="btn btn-outline-light btn-sm px-3 rounded-pill"
              >
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT CONTAINER */}
      <main className="container py-4">
        <div className="bg-white p-4 rounded-4 shadow-sm" style={{ minHeight: "80vh" }}>
          {children}
        </div>
      </main>

      {/* SIMPLE FOOTER */}
      <footer className="text-center py-4 text-muted small">
        &copy; {new Date().getFullYear()} ClinicPro Health Systems. Secure Portal.
      </footer>
    </div>
  );
}

export default Layout;