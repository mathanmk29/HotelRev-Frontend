// Mock bills data
import { bookings } from './bookings';

export const bills = [
  {
    id: "bill-101",
    bookingId: "booking-101",
    nights: 2,
    roomCharge: 360,
    tax: 36,
    total: 396,
    pricePerNight: 180,
    createdAt: "2025-04-05T10:30:00.000Z",
    updatedAt: "2025-04-05T10:30:00.000Z"
  },
  {
    id: "bill-102",
    bookingId: "booking-102",
    nights: 5,
    roomCharge: 1250,
    tax: 125,
    total: 1375,
    pricePerNight: 250,
    createdAt: "2025-03-15T14:45:00.000Z",
    updatedAt: "2025-03-15T14:45:00.000Z"
  },
  {
    id: "bill-103",
    bookingId: "booking-103",
    nights: 2,
    roomCharge: 240,
    tax: 24,
    total: 264,
    pricePerNight: 120,
    createdAt: "2025-03-25T09:15:00.000Z",
    updatedAt: "2025-03-25T09:15:00.000Z"
  },
  {
    id: "bill-104",
    bookingId: "booking-104",
    nights: 5,
    roomCharge: 1500,
    tax: 150,
    total: 1650,
    pricePerNight: 300,
    createdAt: "2025-03-28T16:20:00.000Z",
    updatedAt: "2025-03-28T16:20:00.000Z"
  },
  {
    id: "bill-105",
    bookingId: "booking-105",
    nights: 3,
    roomCharge: 600,
    tax: 60,
    total: 660,
    pricePerNight: 200,
    createdAt: "2025-04-10T11:30:00.000Z",
    updatedAt: "2025-04-10T11:30:00.000Z"
  }
];

// Function to get bill by booking ID (using bookingId as foreign key reference)
export const getBillByBookingId = (bookingId) => {
  return bills.find(bill => bill.bookingId === bookingId);
};

// Function to create a new bill
export const createBill = (billData) => {
  const newBill = {
    id: `bill-${bills.length + 1}`,
    ...billData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  bills.push(newBill);
  return newBill;
};

// Function to update a bill
export const updateBill = (billId, billData) => {
  const billIndex = bills.findIndex(bill => bill.id === billId);
  
  if (billIndex !== -1) {
    bills[billIndex] = { 
      ...bills[billIndex], 
      ...billData, 
      updatedAt: new Date().toISOString() 
    };
    return bills[billIndex];
  }
  
  return null;
};

// Calculate bill (moved from bookings.js)
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
    pricePerNight,
  };
};
