import { rooms } from "./rooms";

export const bookings = [];

export const createBooking = (bookingData) => {
  const newBooking = {
    id: `booking-${bookings.length + 1}`,
    ...bookingData,
    createdAt: new Date().toISOString(),
    status: "confirmed",
    billingId: `bill-${bookings.length + 1}`,
  };

  // Update room status
  const room = rooms.find((r) => r.id === bookingData.roomId);
  if (room) {
    room.status = "occupied";
  }

  bookings.push(newBooking);
  return newBooking;
};

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
  };
};
