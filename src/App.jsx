import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import Layout from "./components/shared/Layout";

// Auth
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Rooms
import RoomList from "./components/rooms/RoomList";
import RoomDetail from "./components/rooms/RoomDetail";
import RoomBookForm from "./components/rooms/RoomBookForm";
import AddRoom from "./components/rooms/AddRoom"; // Import AddRoom

// Customers
import CustomerList from "./components/customers/CustomerList";
import CustomerDetail from "./components/customers/CustomerDetail";
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

// Landing
import Landing from "./components/landing/Landing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Navigate to="/rooms" replace />} />

      <Route path="/" element={<Layout />}>
        <Route path="rooms" element={<RoomList />} />
        <Route path="rooms/add" element={<AddRoom />} /> {/* Add this line */}
        <Route path="rooms/:id" element={<RoomDetail />} />
        <Route path="rooms/:id/book" element={<RoomBookForm />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/new" element={<CustomerForm />} />
        <Route path="customers/edit/:id" element={<CustomerForm />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="guests" element={<GuestList />} />
        <Route path="guests/new" element={<GuestForm />} />
        <Route path="guests/edit/:id" element={<GuestForm />} />
        <Route path="guests/:id" element={<GuestDetail />} />
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
        <Route path="profile" element={<UserProfile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
