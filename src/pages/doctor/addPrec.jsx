import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/axios';

const AddPrescription = () => {
  const { appointmentId } = useParams(); // Automatically gets ID from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [prescription, setPrescription] = useState({
    appointmentId: appointmentId,
    medicines: [{ name: '', dosage: '', duration: '' }],
    notes: ''
  });

  // Add a new row for another medicine
  const addMedicineRow = () => {
    setPrescription({
      ...prescription,
      medicines: [...prescription.medicines, { name: '', dosage: '', duration: '' }]
    });
  };

  // Remove a medicine row
  const removeMedicineRow = (index) => {
    const updatedMedicines = prescription.medicines.filter((_, i) => i !== index);
    setPrescription({ ...prescription, medicines: updatedMedicines });
  };

  // Update specific medicine field
  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...prescription.medicines];
    updatedMedicines[index][field] = value;
    setPrescription({ ...prescription, medicines: updatedMedicines });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/prescriptions/${appointmentId}`, prescription);
      alert("Prescription saved successfully!");
      navigate('/doctor/queue'); // Go back to list
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save prescription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4 animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4" style={{ color: "#1a4d2e" }}>
                <i className="bi bi-capsule me-2"></i> New Prescription
              </h4>

              <form onSubmit={handleSubmit}>
                {/* Appointment ID (Read Only) */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted">Appointment ID</label>
                  <input type="text" className="form-control bg-light border-0" value={appointmentId} readOnly />
                </div>

                {/* Medicines List */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-label small fw-bold text-muted mb-0">Medicines</label>
                    <button type="button" className="btn btn-sm btn-outline-success" onClick={addMedicineRow}>
                      <i className="bi bi-plus-circle me-1"></i> Add Medicine
                    </button>
                  </div>

                  {prescription.medicines.map((med, index) => (
                    <div className="row g-2 mb-2 p-3 border rounded-3 bg-white shadow-sm" key={index}>
                      <div className="col-md-5">
                        <input 
                          type="text" className="form-control form-control-sm" placeholder="Medicine Name (e.g. Paracetamol)"
                          value={med.name} onChange={(e) => handleMedicineChange(index, 'name', e.target.value)} required 
                        />
                      </div>
                      <div className="col-md-3">
                        <input 
                          type="text" className="form-control form-control-sm" placeholder="Dosage (500mg)"
                          value={med.dosage} onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)} required 
                        />
                      </div>
                      <div className="col-md-3">
                        <input 
                          type="text" className="form-control form-control-sm" placeholder="Duration (5 days)"
                          value={med.duration} onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)} required 
                        />
                      </div>
                      <div className="col-md-1">
                        {prescription.medicines.length > 1 && (
                          <button type="button" className="btn btn-sm btn-outline-danger w-100" onClick={() => removeMedicineRow(index)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted">Instruction Notes</label>
                  <textarea 
                    className="form-control" rows="3" placeholder="E.g. After food, twice a day"
                    value={prescription.notes} onChange={(e) => setPrescription({ ...prescription, notes: e.target.value })}
                  ></textarea>
                </div>

                {/* Footer Buttons */}
                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-light px-4" onClick={() => navigate(-1)}>Cancel</button>
                  <button type="submit" className="btn text-white px-5 fw-bold flex-grow-1 shadow-sm" style={{ backgroundColor: "#1a4d2e" }} disabled={loading}>
                    {loading ? "Saving..." : "Save Prescription"}
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

export default AddPrescription;