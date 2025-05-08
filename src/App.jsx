import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.jsx";

// Layouts
import Layout from "./components/shared/Layout";

// Auth
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Rooms
import RoomList from "./components/rooms/RoomList";
import RoomDetail from "./components/rooms/RoomDetail";
import RoomBookForm from "./components/rooms/RoomBookForm";

// Customers
import CustomerList from "./components/customers/CustomerList";
import CustomerDetail from "./components/customers/CustomerDetail";
// import CustomerHistory from "./components/customers/#CustomerHistory";
import CustomerForm from "./components/customers/CustomerForm";

// Guests
import GuestList from "./components/guests/GuestList";
import GuestForm from "./components/guests/GuestForm";
import GuestDetail from "./components/guests/GuestDetail";

// Bookings
import BookingList from "./components/booking/BookingList";
import BookingDetails from "./components/booking/BookingDetails";
import BookingConfirmation from "./components/booking/BookingConfirmation";

// Users
import UserProfile from "./components/users/UserProfile";

// Billing
// import BillingList from "./components/billing/BillingList";
// import Invoice from "./components/billing/Invoice";
// import BillingDetails from "./components/billing/BillingDetails";

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
        <Route path="dashboard" element={<Navigate to="/rooms" replace />} />

        {/* Rooms */}
        <Route path="rooms" element={<RoomList />} />
        <Route path="rooms/:id" element={<RoomDetail />} />
        <Route path="rooms/:id/book" element={<RoomBookForm />} />

        {/* Customers */}
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/new" element={<CustomerForm />} />
        <Route path="customers/edit/:id" element={<CustomerForm />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        {/* <Route path="customers/:id/history" element={<CustomerHistory />} /> */}

        {/* Guests */}
        <Route path="guests" element={<GuestList />} />
        <Route path="guests/new" element={<GuestForm />} />
        <Route path="guests/:id" element={<GuestDetail />} />
        <Route path="guests/edit/:id" element={<GuestForm />} />

        {/* Billing Routes - Commented out */}
        {/* <Route path="billing" element={<BillingList />} />
        <Route path="billing/:id" element={<Invoice />} />
        <Route path="billing/:id/details" element={<BillingDetails />} /> */}

        {/* Booking Routes */}
        <Route path="bookings" element={<BookingList />} />
        <Route path="bookings/:id/details" element={<BookingDetails />} />
        <Route
          path="bookings/:id/confirmation"
          element={<BookingConfirmation />}
        />
        <Route
          path="bookings/new/:roomId/confirmation"
          element={<BookingConfirmation />}
        />

        {/* User Profile */}
        <Route path="profile" element={<UserProfile />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
