import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyAppointments = async () => {
      try {
        const response = await api.get('/appointments/my'); // Adjust to your actual endpoint
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyAppointments();
  }, []);

  return (
    <div className="container-fluid animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0" style={{ color: "#1a4d2e" }}>My Appointments</h3>
        <button 
          onClick={() => navigate('/book')} 
          className="btn text-white px-4 fw-bold shadow-sm"
          style={{ backgroundColor: "#1a4d2e" }}
        >
          <i className="bi bi-plus-lg me-2"></i>Book New
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="text-secondary small text-uppercase">
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="py-3">Token</th>
                  <th className="py-3">Appt. Status</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-5">Loading your visits...</td></tr>
                ) : appointments.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-5 text-muted">No appointments found.</td></tr>
                ) : (
                  appointments.map((app) => (
                    <tr key={app.id}>
                      <td className="px-4">
                        <div className="fw-bold text-dark">{app.appointmentDate}</div>
                        <div className="small text-muted">{app.timeSlot}</div>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border px-3">
                          #{app.queueEntry?.tokenNumber || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className={`small fw-semibold ${app.queueEntry?.status === 'waiting' ? 'text-warning' : 'text-success'}`}>
                          <i className="bi bi-dot fs-4 align-middle"></i>
                          {app.queueEntry?.status || 'Not Checked-in'}
                        </span>
                      </td>
                      <td className="text-center px-4">
                        <div className="d-flex justify-content-center gap-2">
                          <button 
                            className="btn btn-sm btn-outline-success d-flex align-items-center"
                            onClick={() => navigate(`/prescriptions/${app.id}`)}
                            title="View Medicine"
                          >
                            <i className="bi bi-capsule me-1"></i> Medicine
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-primary d-flex align-items-center"
                            onClick={() => navigate(`/reports/${app.id}`)}
                            title="View Reports"
                          >
                            <i className="bi bi-file-earmark-medical me-1"></i> Reports
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;