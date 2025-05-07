import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

// Layouts
import Layout from "./components/shared/Layout";

// Auth
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Dashboards
import AdminDashboard from "./components/dashboard/AdminDashboard";
import StaffDashboard from "./components/dashboard/StaffDashboard";

// Rooms
import RoomList from "./components/rooms/RoomList";
import RoomDetail from "./components/rooms/RoomDetail";

// Customers
import CustomerList from "./components/customers/CustomerList";
import CustomerDetail from "./components/customers/CustomerDetail";
import CustomerHistory from "./components/customers/CustomerHistory";

// Guests
import GuestList from "./components/guests/GuestList";
import GuestForm from "./components/guests/GuestForm";
import GuestDetail from "./components/guests/GuestDetail";

// Billing
import BillingList from "./components/billing/BillingList";
import Invoice from "./components/billing/Invoice";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/dashboard" />}
      />

      {/* Protected Routes */}
      <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard */}
        <Route
          path="dashboard"
          element={
            user?.role === "admin" ? <AdminDashboard /> : <StaffDashboard />
          }
        />

        {/* Rooms */}
        <Route path="rooms" element={<RoomList />} />
        <Route path="rooms/:id" element={<RoomDetail />} />

        {/* Customers */}
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="customers/:id/history" element={<CustomerHistory />} />

        {/* Guests */}
        <Route path="guests" element={<GuestList />} />
        <Route path="guests/new" element={<GuestForm />} />
        <Route path="guests/:id" element={<GuestDetail />} />
        <Route path="guests/edit/:id" element={<GuestForm />} />

        {/* Billing */}
        <Route path="billing" element={<BillingList />} />
        <Route path="billing/:id" element={<Invoice />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
