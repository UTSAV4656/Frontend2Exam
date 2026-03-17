import React, { useState, useEffect } from 'react';
import api from '../../utils/axios'; // Using your axios instance

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'doctor', // Default role
    phone: ''
  });

  // Fetch Users List
  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users'); // Adjust endpoint if needed
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Add User
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/admin/users', formData);
      if (response.status === 201 || response.status === 200) {
        alert("User added successfully!");
        setFormData({ name: '', email: '', password: '', role: 'doctor', phone: '' }); // Reset
        fetchUsers(); // Refresh list
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error adding user");
    }
  };

  return (
    <div className="container-fluid animate__animated animate__fadeIn">
      <h3 className="fw-bold mb-4" style={{ color: "#1a4d2e" }}>User Management</h3>

      {/* ADD USER FORM */}
      <div className="card border-0 shadow-sm mb-5 rounded-4">
        <div className="card-body p-4">
          <h5 className="card-title mb-4 fw-bold">Add New Staff / Patient</h5>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-3">
              <label className="form-label small fw-bold">Full Name</label>
              <input type="text" name="name" className="form-control" placeholder="Enter name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Email</label>
              <input type="email" name="email" className="form-control" placeholder="email@clinic.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="col-md-2">
              <label className="form-label small fw-bold">Password</label>
              <input type="password" name="password" className="form-control" placeholder="Min 6 chars" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="col-md-2">
              <label className="form-label small fw-bold">Role</label>
              <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
                <option value="doctor">Doctor</option>
                <option value="receptionist">Receptionist</option>
                <option value="patient">Patient</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label small fw-bold">Phone (Optional)</label>
              <input type="text" name="phone" className="form-control" placeholder="Phone number" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="col-12 text-end">
              <button type="submit" className="btn text-white px-4 fw-bold shadow-sm" style={{ backgroundColor: "#1a4d2e" }}>
                <i className="bi bi-person-plus-fill me-2"></i> Create User
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* USERS LIST TABLE */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="py-3">Name</th>
                  <th className="py-3">Email</th>
                  <th className="py-3">Role</th>
                  <th className="py-3">Phone</th>
                  <th className="py-3 text-end px-4">Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" className="text-center py-5">Loading users...</td></tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td className="px-4 text-muted small">#{u.id}</td>
                      <td className="fw-bold">{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`badge rounded-pill ${getRoleBadge(u.role)}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>{u.phone || <span className="text-muted opacity-50">N/A</span>}</td>
                      <td className="text-end px-4 text-muted small">
                        {new Date(u.createdAt).toLocaleDateString()}
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

const getRoleBadge = (role) => {
  switch (role.toLowerCase()) {
    case 'admin': return 'bg-danger text-white';
    case 'doctor': return 'bg-primary text-white';
    case 'receptionist':
    case 'rec': return 'bg-info text-dark';
    case 'patient': return 'bg-success text-white';
    default: return 'bg-secondary text-white';
  }
};

export default Users;