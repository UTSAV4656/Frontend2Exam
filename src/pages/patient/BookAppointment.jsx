import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    appointmentDate: '',
    timeSlot: ''
  });

  const generateSlots = () => {
    const slots = [];
    let startHour = 9;
    for (let i = 0; i < 32; i++) {
      const totalMinutes = i * 15;
      const hour = startHour + Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const nextTotalMinutes = (i + 1) * 15;
      const nextHour = startHour + Math.floor(nextTotalMinutes / 60);
      const nextMinutes = nextTotalMinutes % 60;

      const format = (h, m) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      slots.push(`${format(hour, minutes)}-${format(nextHour, nextMinutes)}`);
    }
    return slots;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingData.timeSlot) return alert("Please select a time slot");

    setLoading(true);
    try {
      const response = await api.post('/appointments', bookingData);
      if (response.status === 201 || response.status === 200) {
        alert("Appointment booked successfully!");
        navigate('/appointments');
      }
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4 animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <h3 className="fw-bold mb-4" style={{ color: "#1a4d2e" }}>
                <i className="bi bi-calendar-check me-2"></i>Book Appointment
              </h3>

              <form onSubmit={handleBooking}>
                <div className="mb-4">
                  <label className="form-label fw-bold small text-secondary">Select Date</label>
                  <input 
                    type="date" 
                    className="form-control form-control-lg rounded-3"
                    min={new Date().toISOString().split('T')[0]} 
                    value={bookingData.appointmentDate}
                    onChange={(e) => setBookingData({ ...bookingData, appointmentDate: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                <label className="form-label fw-bold small text-secondary">Select 15-Min Time Slot</label>
                <div className="row g-2 overflow-auto" style={{ maxHeight: '300px' }}>
                    {generateSlots().map((slot) => (
                    <div className="col-6 col-sm-4 col-lg-3" key={slot}>
                        <button
                        type="button"
                        className={`btn w-100 py-2 small fw-semibold border rounded-3 ${
                            bookingData.timeSlot === slot ? 'btn-success shadow' : 'btn-outline-light text-dark'
                        }`}
                        style={bookingData.timeSlot === slot ? { backgroundColor: "#1a4d2e", color: "#fff" } : {}}
                        onClick={() => setBookingData({ ...bookingData, timeSlot: slot })}
                        >
                        {slot.split('-')[0]} 
                        </button>
                    </div>
                    ))}
                </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading || !bookingData.appointmentDate}
                  className="btn btn-lg w-100 text-white rounded-3 py-3 fw-bold mt-2 shadow-sm"
                  style={{ backgroundColor: "#1a4d2e" }}
                >
                  {loading ? "Processing..." : "Confirm Booking"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;