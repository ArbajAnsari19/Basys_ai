import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PatientDetails from './components/Patientdetails';
import HealthcareDashboard from './components/HealthcareDashboard';
import Login from './components/Login';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  console.log('PrivateRoute - isAuthenticated:', isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HealthcareDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/patient-details/:id"
          element={
            <PrivateRoute>
              <PatientDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;