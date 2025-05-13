// customers.js
import { bookings } from './bookings';
import { getBillByBookingId } from './bills';

export const customers = [
  {
    id: "customer-1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    currentGuest: true,
    createdAt: "2025-01-20T14:30:00.000Z",
  },
  {
    id: "customer-2",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Somewhere, NY 67890",
    currentGuest: false,
    createdAt: "2025-01-15T10:45:00.000Z",
  },
  {
    id: "customer-3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine Rd, Elsewhere, TX 54321",
    currentGuest: true,
    createdAt: "2025-01-05T09:15:00.000Z",
  },
  {
    id: "customer-4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 234-5678",
    address: "321 Elm Blvd, Nowhere, FL 34567",
    currentGuest: false,
    createdAt: "2025-01-10T16:20:00.000Z",
  },
  {
    id: "customer-5",
    name: "Robert Garcia",
    email: "robert.garcia@example.com",
    phone: "+1 (555) 876-5432",
    address: "654 Maple Dr, Anywhere, WA 89012",
    currentGuest: true,
    createdAt: "2025-02-01T11:00:00.000Z",
  },
];

// Helper functions for customers
export const addCustomer = (customerData) => {
  const newCustomer = {
    id: `customer-${customers.length + 1}`,
    ...customerData,
    createdAt: new Date().toISOString(),
  };
  customers.push(newCustomer);
  return newCustomer;
};

export const updateCustomer = (id, customerData) => {
  const index = customers.findIndex((customer) => customer.id === id);
  if (index !== -1) {
    customers[index] = { ...customers[index], ...customerData };
    return customers[index];
  }
  return null;
};

export const deleteCustomer = (id) => {
  const index = customers.findIndex((customer) => customer.id === id);
  if (index !== -1) {
    return customers.splice(index, 1)[0];
  }
  return null;
};

export const getCustomerById = (id) => {
  return customers.find((customer) => customer.id === id);
};

export const getCustomerBookingById = (customerId) => {
  // Find all bookings for this customer
  const customerBookings = bookings.filter(booking => booking.customerId === customerId);
  
  // Map the bookings to the format expected by the frontend
  const formattedBookings = customerBookings.map(booking => {
    const bill = getBillByBookingId(booking.id);
    return {
      id: booking.id,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      roomId: booking.roomId,
      totalAmount: bill?.total || 0,
      status: booking.status
    };
  });
  
  // Return in the format expected by the frontend
  return {
    customerId,
    bookings: formattedBookings
  };
};

export const updateCustomerStatus = (customerId, isCurrentGuest) => {
  const customerIndex = customers.findIndex((customer) => customer.id === customerId);
  if (customerIndex !== -1) {
    customers[customerIndex].currentGuest = isCurrentGuest;
    return customers[customerIndex];
  }
  return null;
};
