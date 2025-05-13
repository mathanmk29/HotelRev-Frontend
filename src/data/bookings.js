import { rooms } from "./rooms";
import { calculateBill, createBill } from "./bills";

// Single bookings array to store all booking data
export const bookings = [
  {
    id: "booking-101",
    roomId: "room-2",
    customerId: "customer-1",
    checkIn: "2025-04-10T15:00:00.000Z",
    checkOut: "2025-04-12T11:00:00.000Z",
    adults: 2,
    children: 1,
    specialRequests: "Extra pillows, late check-out",
    status: "confirmed",
    createdAt: "2025-04-05T10:30:00.000Z",

    // bill information moved to bills.js
    extraCharges: 0
  },
  {
    id: "booking-102",
    roomId: "room-3",
    customerId: "customer-2",
    checkIn: "2025-03-20T15:00:00.000Z",
    checkOut: "2025-03-25T11:00:00.000Z",
    adults: 1,
    children: 0,
    specialRequests: "",
    status: "checked_out",
    createdAt: "2025-03-15T14:45:00.000Z",

    // bill information moved to bills.js
    extraCharges: 0
  },
  {
    id: "booking-103",
    roomId: "room-1",
    customerId: "customer-3",
    checkIn: "2025-04-01T15:00:00.000Z",
    checkOut: "2025-04-03T11:00:00.000Z",
    adults: 2,
    children: 0,
    specialRequests: "Quiet room",
    status: "checked_in",
    createdAt: "2025-03-25T09:15:00.000Z",

    // bill information moved to bills.js
    extraCharges: 0
  },
  {
    id: "booking-104",
    roomId: "room-4",
    customerId: "customer-4",
    checkIn: "2025-04-05T15:00:00.000Z",
    checkOut: "2025-04-10T11:00:00.000Z",
    adults: 2,
    children: 2,
    specialRequests: "High floor with view",
    status: "confirmed",
    createdAt: "2025-03-28T16:20:00.000Z",

    // bill information moved to bills.js
    extraCharges: 0
  },
  {
    id: "booking-105",
    roomId: "room-5",
    customerId: "customer-5",
    checkIn: "2025-04-15T15:00:00.000Z",
    checkOut: "2025-04-18T11:00:00.000Z",
    adults: 1,
    children: 0,
    specialRequests: "\"No disturbance please\"",
    status: "confirmed",
    createdAt: "2025-04-10T11:30:00.000Z",

    // bill information moved to bills.js
    extraCharges: 0
  }
];

// calculateBill function has been moved to bills.js

export const createBooking = (bookingData) => {
  // Generate a consistent ID format
  const bookingId = `booking-${bookings.length + 1}`;

  const newBooking = {
    id: bookingId, // Use the same format as in mock data
    ...bookingData,
    createdAt: new Date().toISOString(),
    status: "confirmed",
    extraCharges: 0,
  };

  // Update room status
  const room = rooms.find((room) => room.id === bookingData.roomId);
  if (room) {
    room.status = "occupied";
  }

  // Add to bookings array
  bookings.push(newBooking);

  // Create a bill for this booking
  if (room) {
    const billDetails = calculateBill(
      bookingData.checkIn,
      bookingData.checkOut,
      room.pricePerNight
    );
    
    createBill({
      bookingId: newBooking.id, // use the booking id as the foreign key
      ...billDetails,
    });
  }

  return newBooking;
};

export const updateBookingStatus = (bookingId, status) => {
  const bookingIndex = bookings.findIndex((booking) => booking.id === bookingId);

  if (bookingIndex !== -1) {
    const updatedBooking = {
      ...bookings[bookingIndex],
      status,
      confirmedAt: status === "confirmed" ? new Date().toISOString() : null,
    };

    bookings[bookingIndex] = updatedBooking;
    return updatedBooking;
  }
  return null;
};
