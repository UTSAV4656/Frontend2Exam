import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';

const TvDisplay = () => {
  const [queue, setQueue] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchQueue = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await api.get(`/queue?date=${today}`);
      const sortedData = response.data.sort((a, b) => 
        a.appointment.timeSlot.localeCompare(b.appointment.timeSlot)
      );
      setQueue(sortedData);
    } catch (error) {
      console.error("TV Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 10000); // Refresh every 10 seconds
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="vh-100 bg-dark text-white p-4 overflow-hidden d-flex flex-column">
      {/* Header Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary">
        <h1 className="fw-bold display-4 m-0" style={{ color: "#2ecc71" }}>LIVE QUEUE</h1>
      </div>

      {/* Grid of Cards */}
      <div className="row g-4 flex-grow-1 align-content-start">
        {queue.length === 0 ? (
          <div className="col-12 text-center mt-5 opacity-50">
            <h1 className="display-3">No Appointments Scheduled</h1>
          </div>
        ) : (
          queue.map((item) => (
            <div className="col-md-4 col-lg-3" key={item.id}>
              <div 
                className={`card h-100 border-0 shadow-lg rounded-4 text-center p-3 ${
                  item.status === 'calling' 
                    ? 'bg-danger animate__animated animate__flash animate__infinite' 
                    : 'bg-secondary bg-opacity-25 border border-secondary'
                }`}
              >
                <div className="card-body">
                  <div className="text-uppercase small fw-bold opacity-75 mb-2">Token Number</div>
                  <div className="display-2 fw-black mb-2" style={{ fontSize: "5rem" }}>
                    {item.tokenNumber}
                  </div>
                  <div className="fs-3 fw-bold text-truncate">{item.appointment.patient.name}</div>
                  <hr className="my-3 opacity-25" />
                  <div className="d-flex justify-content-between align-items-center px-2">
                    <span className="fs-5 opacity-75">{item.appointment.timeSlot.split('-')[0]}</span>
                    <span className={`badge rounded-pill px-3 py-2 ${item.status === 'calling' ? 'bg-white text-danger' : 'bg-success'}`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TvDisplay;