import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/axios';

const ViewReport = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get(`/reports/my`);
        // Since API returns an array, we take the first element
        if (response.data && response.data.length > 0) {    
          setReport(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [appointmentId]);

  if (loading) return <div className="p-5 text-center text-muted">Loading Report...</div>;
  if (!report) return <div className="p-5 text-center">No report found for this appointment.</div>;

  return (
    <div className="container py-4">
      {/* Back Button for UI */}
      <button onClick={() => navigate(-1)} className="btn btn-sm btn-outline-secondary mb-3 d-print-none">
        <i className="bi bi-arrow-left me-1"></i> Back to List
      </button>

      <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: '700px' }}>
        <div className="card-body p-4 p-md-5">
          
          {/* Clinic Header Section */}
          <div className="d-flex justify-content-between align-items-start border-bottom pb-4 mb-4">
            <div>
              <h3 className="fw-bold mb-1" style={{ color: "#1a4d2e" }}>MEDICAL REPORT</h3>
              <p className="text-muted small mb-0">Appt ID: #{report.appointmentId}</p>
              <p className="text-muted small mb-0">Date: {new Date(report.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="text-end">
              <h5 className="fw-bold mb-0">Dr. {report.doctor?.name}</h5>
              <span className="badge bg-light text-dark border">Consulting Physician</span>
            </div>
          </div>

          {/* Diagnosis Section */}
          <div className="mb-4">
            <label className="small text-uppercase fw-bold text-secondary border-bottom d-block mb-2">Final Diagnosis</label>
            <p className="fs-5 fw-bold text-dark">{report.diagnosis}</p>
          </div>

          {/* Test Recommended Section */}
          <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: "#f8f9fa" }}>
            <label className="small text-uppercase fw-bold text-primary d-block mb-1">Recommended Tests</label>
            <p className="mb-0 fs-6">{report.testRecommended || "None"}</p>
          </div>

          {/* Remarks Section */}
          <div className="mb-5">
            <label className="small text-uppercase fw-bold text-secondary border-bottom d-block mb-2">Doctor's Advice / Remarks</label>
            <p className="text-dark" style={{ lineHeight: '1.6' }}>{report.remarks}</p>
          </div>

          {/* Footer Signature Area */}
          <div className="mt-5 d-flex justify-content-between align-items-end pt-4 border-top">
            <div className="small text-muted">
              Generated on: {new Date().toLocaleString()}
            </div>
            <div className="text-center border-top border-dark pt-2 px-4">
              <p className="mb-0 fw-bold">Authorized Signature</p>
              <small className="text-muted">Clinic Management System</small>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center mt-5 d-print-none">
            <button className="btn btn-success px-5 fw-bold" onClick={() => window.print()}>
              <i className="bi bi-printer me-2"></i> Print Report
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewReport;