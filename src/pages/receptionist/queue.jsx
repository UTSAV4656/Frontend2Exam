import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchQueue = async (date) => {
    setLoading(true);
    try {
      const response = await api.get(`/queue?date=${date}`);
      setQueue(response.data);
    } catch (error) {
      console.error("Queue fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue(selectedDate);
  }, [selectedDate]);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/queue/${id}`, { status: newStatus });
      fetchQueue(selectedDate); 
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="container-fluid animate__animated animate__fadeIn">
      <div className="d-md-flex justify-content-between align-items-center mb-4 p-3 bg-white rounded-4 shadow-sm">
        <div>
          <h3 className="fw-bold mb-0" style={{ color: "#1a4d2e" }}>Daily Queue</h3>
          <p className="text-muted small mb-md-0">Viewing records for {selectedDate}</p>
        </div>
        
        <div className="d-flex gap-3 align-items-center">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-calendar-event"></i>
            </span>
            <input 
              type="date" 
              className="form-control border-start-0" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <button onClick={() => fetchQueue(selectedDate)} className="btn btn-success">
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light text-secondary small text-uppercase">
                <tr>
                  <th className="px-4 py-3">Token</th>
                  <th className="py-3">Patient Name</th>
                  <th className="py-3">Appt. Time</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-end px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-5">Loading Live Queue...</td></tr>
                ) : queue.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                      No appointments found for this date.
                    </td>
                  </tr>
                ) : (
                  queue.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4">
                        <span className="badge rounded-circle bg-success bg-opacity-10 text-success p-3 fs-6" style={{ width: '45px' }}>
                          {item.tokenNumber}
                        </span>
                      </td>
                      <td>
                        <div className="fw-bold">{item.appointment?.patient?.name}</div>
                        <small className="text-muted">{item.appointment?.patient?.phone}</small>
                      </td>
                      <td>
                        <span className="text-primary fw-semibold">{item.appointment?.timeSlot}</span>
                      </td>
                      <td>
                        <span className={`badge rounded-pill ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="text-end px-4">
                        <div className="btn-group">
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => updateStatus(item.id, 'in-progress')}
                          >
                            In Progress
                          </button>
                          <button 
                            className="btn btn-sm btn-dark"
                            onClick={() => updateStatus(item.id, 'done')}
                          >
                            Done
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

// Helper for status colors
const getStatusBadge = (status) => {
  switch (status) {
    case 'waiting': return 'bg-warning-subtle text-warning border border-warning';
    case 'in-progress': return 'bg-danger text-white';
    case 'done': return 'bg-success text-green';
    default: return 'bg-light text-dark';
  }
};

export default Queue;