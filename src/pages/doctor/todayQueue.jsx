import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';

const DoctorQueue = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDoctorQueue = async () => {
    try {
      // Hits your specific /doctor/queue endpoint
      const response = await api.get('/doctor/queue');
      
      // We set the entire list directly from the API response
      setQueue(response.data); 
    } catch (error) {
      console.error("Error fetching doctor queue:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorQueue();
  }, []);

  return (
    <div className="container-fluid py-4">
      <h3 className="fw-bold mb-4" style={{ color: "#1a4d2e" }}>Today's Patient List</h3>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr className="small text-uppercase text-secondary">
                <th className="px-4 py-3">Token</th>
                <th className="py-3">Patient Name</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center py-5">Loading...</td></tr>
              ) : (
                queue.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 fw-bold text-success fs-5">#{item.tokenNumber}</td>
                    <td>
                      <div className="fw-bold">{item.patientName}</div>
                      <div className="small text-muted">Appt ID: {item.appointmentId}</div>
                    </td>
                    <td>
                      <span className={`badge rounded-pill ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="text-center px-4">
                      <div className="d-flex justify-content-center gap-2">
                        <button 
                          className="btn btn-sm btn-outline-success"
                          onClick={() => navigate(`/doctor/add-prescription/${item.appointmentId}`)}
                        >
                          <i className="bi bi-capsule me-1"></i> Medicine
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => navigate(`/doctor/add-reports/${item.appointmentId}`)}
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
  );
};

// Helper to style status badges
const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'waiting': return 'bg-warning-subtle text-warning border border-warning';
    case 'calling': 
    case 'in-progress': return 'bg-danger text-white';
    case 'completed': return 'bg-success-subtle text-success';
    default: return 'bg-light text-dark';
  }
};

export default DoctorQueue;