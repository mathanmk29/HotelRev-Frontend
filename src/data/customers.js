// customers.js
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

export const customerBooking = [
  {
    customerId: "customer-1",
    bookings: [
      {
        id: "booking-101",
        checkIn: "2025-04-10T15:00:00.000Z",
        checkOut: "2025-04-12T11:00:00.000Z",

        roomId: "room-2",
        totalAmount: 240,
        status: "confirmed",
      },
    ],
  },
  {
    customerId: "customer-2",
    bookings: [
      {
        id: "booking-102",
        checkIn: "2025-03-20T15:00:00.000Z",
        checkOut: "2025-03-25T11:00:00.000Z",

        roomId: "room-3",
        totalAmount: 1200,
        status: "confirmed",
      },
    ],
  },
  {
    customerId: "customer-3",
    bookings: [
      {
        id: "booking-103",
        checkIn: "2025-01-10T15:00:00.000Z",
        checkOut: "2025-01-12T11:00:00.000Z",

        roomId: "room-1",
        totalAmount: 300,
        status: "confirmed",
      },
    ],
  },
  {
    customerId: "customer-4",
    bookings: [
      {
        id: "booking-104",
        checkIn: "2025-04-05T15:00:00.000Z",
        checkOut: "2025-04-10T11:00:00.000Z",

        roomId: null,
        totalAmount: 1500,
        status: "confirmed",
      },
    ],
  },
  {
    customerId: "customer-5",
    bookings: [
      {
        id: "booking-105",
        checkIn: "2025-02-05T15:00:00.000Z",
        checkOut: "2025-02-07T11:00:00.000Z",

        roomId: "room-2",
        totalAmount: 450,
        status: "confirmed",
      },
    ],
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
  return (
    customerBooking.find((booking) => booking.customerId === customerId) || {
      customerId,
      bookings: [],
    }
  );
};

export const updateCustomerStatus = (customerId, isCurrentGuest) => {
  const customerIndex = customers.findIndex((c) => c.id === customerId);
  if (customerIndex !== -1) {
    customers[customerIndex].currentGuest = isCurrentGuest;
    return customers[customerIndex];
  }
  return null;
};
