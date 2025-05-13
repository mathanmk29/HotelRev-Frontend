import { rooms } from "./rooms";
import { customerBooking } from "./customers";

export const bookings = [];

export const calculateBill = (checkIn, checkOut, pricePerNight) => {
  const nights = Math.ceil(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
  );
  const roomCharge = nights * pricePerNight;
  const tax = roomCharge * 0.1; // 10% tax
  const total = roomCharge + tax;

  return {
    nights,
    roomCharge,
    tax,
    total,
    pricePerNight, // Add price per night to bill details
  };
};

export const createBooking = (bookingData) => {
  // Generate a consistent ID format
  const bookingId = `booking-${bookings.length + 1}`;

  const newBooking = {
    id: bookingId, // Use the same format as in mock data
    ...bookingData,
    createdAt: new Date().toISOString(),
    status: "confirmed",
    bookingId: bookingId, // Add this for consistency
    extraCharges: 0,
  };

  // Update room status
  const room = rooms.find((r) => r.id === bookingData.roomId);
  if (room) {
    room.status = "occupied";
  }

  // Add to main bookings array
  bookings.push(newBooking);

  // Add to customer booking history with consistent ID format
  const customerBookingIndex = customerBooking.findIndex(
    (cb) => cb.customerId === bookingData.customerId
  );

  const bookingHistoryEntry = {
    id: bookingId, // Use consistent ID format
    checkIn: newBooking.checkIn,
    checkOut: newBooking.checkOut,

    roomId: newBooking.roomId,
    totalAmount: newBooking.bill.total,
    status: "confirmed",
  };

  if (customerBookingIndex !== -1) {
    customerBooking[customerBookingIndex].bookings.push(bookingHistoryEntry);
  } else {
    customerBooking.push({
      customerId: bookingData.customerId,
      bookings: [bookingHistoryEntry],
    });
  }

  return newBooking;
};

export const updateBookingStatus = (bookingId, status) => {
  const bookingIndex = bookings.findIndex((b) => b.bookingId === bookingId);

  if (bookingIndex !== -1) {
    const currentBooking = bookings[bookingIndex];

    const updatedBooking = {
      ...currentBooking,
      status,
      confirmedAt: status === "confirmed" ? new Date().toISOString() : null,
    };

    // Update main bookings array
    bookings[bookingIndex] = updatedBooking;

    // Update customer booking history
    const customerBookingIndex = customerBooking.findIndex(
      (cb) => cb.customerId === updatedBooking.customerId
    );

    if (customerBookingIndex !== -1) {
      const bookingInHistory = customerBooking[
        customerBookingIndex
      ].bookings.findIndex((b) => b.id === updatedBooking.id);

      if (bookingInHistory !== -1) {
        customerBooking[customerBookingIndex].bookings[bookingInHistory] = {
          ...customerBooking[customerBookingIndex].bookings[bookingInHistory],
          status,
          confirmedAt: updatedBooking.confirmedAt,
        };
      }
    }

    return updatedBooking;
  }
  return null;
};
