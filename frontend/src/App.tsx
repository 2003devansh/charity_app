import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Home from "./pages/Dashboard/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DonorDashboard from "./pages/Donor/DonorDashboard";
import CreateDonation from "./pages/Donor/CreateDonation";
import RecipientDashboard from "./pages/Recipient/RecipientDashboard";
import CreateRequest from "./pages/Recipient/CreateRequest";
import VolunteerDashboard from "./pages/Volunteer/VolunteerDashboard";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/donor/dashboard"
            element={
              <ProtectedRoute allowedRoles={["DONOR"]}>
                <DonorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donor/create-donation"
            element={
              <ProtectedRoute allowedRoles={["DONOR"]}>
                <CreateDonation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recipient/dashboard"
            element={
              <ProtectedRoute allowedRoles={["RECIPIENT"]}>
                <RecipientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipient/create-request"
            element={
              <ProtectedRoute allowedRoles={["RECIPIENT"]}>
                <CreateRequest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/volunteer/dashboard"
            element={
              <ProtectedRoute allowedRoles={["VOLUNTEER"]}>
                <VolunteerDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
