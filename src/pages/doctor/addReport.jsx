import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/axios';

const AddReport = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [reportData, setReportData] = useState({
    diagnosis: '',
    testRecommended: '',
    remarks: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Following your URL pattern: /reports/{id}
      await api.post(`/reports/${appointmentId}`, reportData);
      
      alert("Medical report saved successfully!");
      navigate('/doctor/queue'); 
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4 animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4" style={{ color: "#1a4d2e" }}>
                <i className="bi bi-file-earmark-medical me-2"></i> Add Medical Report
              </h4>

              <form onSubmit={handleSubmit}>
                {/* Appointment ID Info */}
                <div className="mb-3 p-3 bg-light rounded-3 d-flex justify-content-between align-items-center">
                  <span className="small text-secondary fw-bold text-uppercase">Appointment ID</span>
                  <span className="fw-bold text-dark">#{appointmentId}</span>
                </div>

                {/* Diagnosis */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Diagnosis</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg fs-6" 
                    placeholder="e.g. Viral Fever"
                    value={reportData.diagnosis}
                    onChange={(e) => setReportData({ ...reportData, diagnosis: e.target.value })}
                    required 
                  />
                </div>

                {/* Test Recommended */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Test Recommended</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Blood Test, X-Ray"
                    value={reportData.testRecommended}
                    onChange={(e) => setReportData({ ...reportData, testRecommended: e.target.value })}
                    required 
                  />
                </div>

                {/* Remarks */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted">Remarks / Advice</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    placeholder="e.g. Rest for 3 days, avoid cold water"
                    value={reportData.remarks}
                    onChange={(e) => setReportData({ ...reportData, remarks: e.target.value })}
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <button 
                    type="button" 
                    className="btn btn-light px-4" 
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="btn text-white px-5 fw-bold flex-grow-1 shadow-sm" 
                    style={{ backgroundColor: "#1a4d2e" }}
                    disabled={loading}
                  >
                    {loading ? "Saving Report..." : "Submit Report"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReport;