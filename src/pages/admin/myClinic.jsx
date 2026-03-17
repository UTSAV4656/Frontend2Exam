import React, { useEffect, useState } from "react";

const MyClinic = () => {
  const [clinicData, setClinicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ENDPOINT = "https://cmsback.sampaarsh.cloud/admin/clinic";

  useEffect(() => {
    const fetchClinicDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure this matches your login storage key
        
        const response = await fetch(ENDPOINT, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error("Failed to fetch clinic data");

        const data = await response.json();
        
        // Handle array response: access the first element if it's an array
        const finalData = Array.isArray(data) ? data[0] : data;
        setClinicData(finalData);
        
      } catch (err) {
        console.error("Connectivity issue:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClinicDetails();
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center p-5">
      <div className="spinner-border text-success" role="status"></div>
      <span className="ms-3 text-muted">Synchronizing data...</span>
    </div>
  );

  if (error || !clinicData) return (
    <div className="alert alert-danger m-4">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      {error || "Unable to retrieve clinic record."}
    </div>
  );

  return (
    <div className="clinic-overview animate__animated animate__fadeIn">
      {/* Clinic Header */}
      <div className="d-md-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
        <div>
          <h3 className="fw-bold mb-0" style={{ color: "#1a4d2e" }}>
            {clinicData.name}
          </h3>
          <p className="text-muted small mb-0">
            Registered on {new Date(clinicData.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
          </p>
        </div>
        <span className="badge px-3 py-2 mt-2 mt-md-0 shadow-sm" style={{ backgroundColor: "#1a4d2e" }}>
          <i className="bi bi-hash me-1"></i>{clinicData.code}
        </span>
      </div>

      {/* Stats Cards */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4">
            <div className="card-body p-4 d-flex align-items-center">
              <div className="flex-shrink-0 p-3 rounded-3 me-3" style={{ backgroundColor: "#e8f5e9", color: "#1a4d2e" }}>
                <i className="bi bi-people-fill fs-4">+</i>
              </div>
              <div>
                <h6 className="text-uppercase text-muted fw-semibold small mb-1">Users</h6>
                <h2 className="mb-0 fw-bold text-dark">{clinicData.userCount}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4">
            <div className="card-body p-4 d-flex align-items-center">
              <div className="flex-shrink-0 p-3 rounded-3 me-3 bg-light text-primary">
                <i className="bi bi-calendar2-check fs-4">+</i>
              </div>
              <div>
                <h6 className="text-uppercase text-muted fw-semibold small mb-1">Appointments</h6>
                <h2 className="mb-0 fw-bold text-dark">{clinicData.appointmentCount}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-5 p-4 rounded-4 bg-light border border-white shadow-sm">
        <div className="row align-items-center">
          <div className="col-sm-6 text-muted small">
            <i className="bi bi-info-circle me-2"></i>
            <strong>Internal System ID:</strong> {clinicData.id}
          </div>
          <div className="col-sm-6 text-md-end text-muted small mt-2 mt-sm-0 italic">
            Last verified check: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClinic;