import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPrescriptions = async () => {
      try {
        const response = await api.get('/prescriptions/my');
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPrescriptions();
  }, []);

  if (loading) return <div className="p-5 text-center text-muted">Loading your history...</div>;

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h3 className="fw-bold" style={{ color: "#1a4d2e" }}>My Prescriptions</h3>
        <p className="text-muted small">View and track your previous medication history.</p>
      </div>

      {prescriptions.length === 0 ? (
        <div className="text-center p-5 bg-light rounded-4">
          <i className="bi bi-folder2-open display-4 text-muted"></i>
          <p className="mt-2 text-muted">No prescriptions found.</p>
        </div>
      ) : (
        <div className="row g-3">
          {prescriptions.map((item) => (
            <div className="col-12" key={item.id}>
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold mb-1">Dr. {item.doctor?.name}</h5>
                      <span className="text-muted small">
                        <i className="bi bi-calendar-event me-1"></i>
                        {new Date(item.createdAt).toLocaleDateString()} | {item.appointment?.timeSlot}
                      </span>
                    </div>
                    <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2">
                      Appt #{item.appointmentId}
                    </span>
                  </div>

                  <div className="bg-light rounded-3 p-3 mb-3">
                    <h6 className="small fw-bold text-uppercase text-secondary mb-2">Medicines</h6>
                    <ul className="list-unstyled mb-0">
                      {item.medicines?.map((med, idx) => (
                        <li key={idx} className="d-flex justify-content-between border-bottom border-white py-1">
                          <span className="fw-semibold">{med.name}</span>
                          <span className="text-muted small">{med.dosage} ({med.duration})</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="small">
                      <span className="text-secondary fw-bold">Note: </span>
                      <span className="text-muted">{item.notes}</span>
                    </div>
                    <button 
                      className="btn btn-sm btn-dark px-3 rounded-pill"
                      onClick={() => window.print()}
                    >
                      <i className="bi bi-printer me-1"></i> Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPrescriptions;