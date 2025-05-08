import { rooms } from "./rooms";
import { customerBooking } from "./customers";
import { customers } from "./customers"; // Add this import

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

export const updateBookingPayment = (billingId, paymentDetails) => {
  const bookingIndex = bookings.findIndex((b) => b.billingId === billingId);

  if (bookingIndex !== -1) {
    const currentBooking = bookings[bookingIndex];

    const updatedBooking = {
      ...currentBooking,
      paymentStatus: "paid",
      paymentDetails: {
        ...paymentDetails,
        paidAt: new Date().toISOString(),
      },
    };

    // Update main bookings array
    bookings[bookingIndex] = updatedBooking;

    // Update customer status to currentGuest
    const customerIndex = customers.findIndex(
      (c) => c.id === currentBooking.customerId
    );
    if (customerIndex !== -1) {
      customers[customerIndex] = {
        ...customers[customerIndex],
        currentGuest: true,
      };
    }

    // Update customer booking history
    const customerBookingIndex = customerBooking.findIndex(
      (cb) => cb.customerId === updatedBooking.customerId
    );

    if (customerBookingIndex !== -1) {
      const bookingInHistory = customerBooking[
        customerBookingIndex
      ].bookings.findIndex((b) => b.id === updatedBooking.id);

      if (bookingInHistory !== -1) {
        // Update existing booking in customer history
        customerBooking[customerBookingIndex].bookings[bookingInHistory] = {
          ...customerBooking[customerBookingIndex].bookings[bookingInHistory],
          paymentStatus: "paid",
          paidAt: paymentDetails.paidAt,
        };
      }
    }

    return updatedBooking;
  }
  return null;
};

export const createBooking = (bookingData) => {
  const newBooking = {
    id: `booking-${bookings.length + 1}`,
    ...bookingData,
    createdAt: new Date().toISOString(),
    status: "confirmed",
    billingId: `bill-${bookings.length + 1}`,
    extraCharges: 0,
    paymentStatus: "pending", // Add initial payment status
  };

  // Update room status
  const room = rooms.find((r) => r.id === bookingData.roomId);
  if (room) {
    room.status = "occupied";
  }

  // Add to main bookings array
  bookings.push(newBooking);

  // Add to customer booking history
  const customerBookingIndex = customerBooking.findIndex(
    (cb) => cb.customerId === bookingData.customerId
  );

  if (customerBookingIndex !== -1) {
    customerBooking[customerBookingIndex].bookings.push({
      id: newBooking.id,
      checkIn: newBooking.checkIn,
      checkOut: newBooking.checkOut,
      roomType: newBooking.roomType,
      roomId: newBooking.roomId,
      totalAmount: newBooking.bill.total,
      paymentStatus: "pending",
    });
  } else {
    customerBooking.push({
      customerId: bookingData.customerId,
      bookings: [
        {
          id: newBooking.id,
          checkIn: newBooking.checkIn,
          checkOut: newBooking.checkOut,
          roomType: newBooking.roomType,
          roomId: newBooking.roomId,
          totalAmount: newBooking.bill.total,
          paymentStatus: "pending",
        },
      ],
    });
  }

  return newBooking;
};
