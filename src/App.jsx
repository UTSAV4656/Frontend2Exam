import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyClinic from "./pages/admin/myClinic";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/admin/Users";
import Dashboard from "./pages/patient/Dashboard";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import ViewReport from "./pages/patient/MyReports";
import MyPrescriptions from "./pages/patient/MyPrescriptions";
import Queue from "./pages/receptionist/queue";
import TvDisplay from "./pages/receptionist/tvDisplay";
import DoctorQueue from "./pages/doctor/todayQueue";
import AddPrescription from "./pages/doctor/addPrec";
import AddReport from "./pages/doctor/addReport";
import Layout from "./components/Layout"; // Ensure this file exists in components folder
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['patient']}><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/book" element={<ProtectedRoute allowedRoles={['patient']}><Layout><BookAppointment /></Layout></ProtectedRoute>} />
      <Route path="/appointments" element={<ProtectedRoute allowedRoles={['patient']}><Layout><MyAppointments /></Layout></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute allowedRoles={['patient']}><Layout><ViewReport /></Layout></ProtectedRoute>} />
      <Route path="/prescriptions" element={<ProtectedRoute allowedRoles={['patient']}><Layout><MyPrescriptions /></Layout></ProtectedRoute>} /> 
      <Route path="/reception/queue" element={<ProtectedRoute allowedRoles={['receptionist']}><Layout><Queue /></Layout></ProtectedRoute>} />
      <Route path="/reception/tv" element={<ProtectedRoute allowedRoles={['receptionist']}><Layout><TvDisplay /></Layout></ProtectedRoute>} />
      <Route path="/doctor/queue" element={<ProtectedRoute allowedRoles={['doctor']}><Layout><DoctorQueue /></Layout></ProtectedRoute>} />
      <Route path="/doctor/add-prescription/:appointmentId" element={<ProtectedRoute allowedRoles={['doctor']}><Layout><AddPrescription /></Layout></ProtectedRoute>} />
      <Route path="/doctor/add-reports/:appointmentId" element={<ProtectedRoute allowedRoles={['doctor']}><Layout><AddReport /></Layout></ProtectedRoute>} />

      <Route path="/admin/myClinic" allowedRoles={['admin']}
        element={
          <ProtectedRoute>
            <Layout>
              <MyClinic />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route path="/admin/users" allowedRoles={['admin']}
        element={
          <ProtectedRoute>
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      
      {/* Catch-all route to prevent blank pages */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;