// customers.js
export const customers = [
  {
    id: "customer-1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    currentGuest: true,
    createdAt: "2023-12-20T14:30:00.000Z",
  },
  {
    id: "customer-2",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Somewhere, NY 67890",
    currentGuest: false,
    createdAt: "2023-11-15T10:45:00.000Z",
  },
  {
    id: "customer-3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine Rd, Elsewhere, TX 54321",
    currentGuest: true,
    createdAt: "2024-01-05T09:15:00.000Z",
  },
  {
    id: "customer-4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 234-5678",
    address: "321 Elm Blvd, Nowhere, FL 34567",
    currentGuest: false,
    createdAt: "2023-10-10T16:20:00.000Z",
  },
  {
    id: "customer-5",
    name: "Robert Garcia",
    email: "robert.garcia@example.com",
    phone: "+1 (555) 876-5432",
    address: "654 Maple Dr, Anywhere, WA 89012",
    currentGuest: true,
    createdAt: "2024-02-01T11:00:00.000Z",
  },
];

export const customerBooking = [
  {
    customerId: "customer-1",
    bookings: [
      {
        id: "booking-101",
        checkIn: "2023-12-24T15:00:00.000Z",
        checkOut: "2023-12-26T11:00:00.000Z",
        roomType: "Deluxe",
        roomId: "room-2",
        totalAmount: 240,
        paymentStatus: "paid",
      },
    ],
  },
  {
    customerId: "customer-2",
    bookings: [
      {
        id: "booking-102",
        checkIn: "2023-11-20T15:00:00.000Z",
        checkOut: "2023-11-25T11:00:00.000Z",
        roomType: "Suite",
        roomId: "room-3",
        totalAmount: 1200,
        paymentStatus: "paid",
      },
    ],
  },
  {
    customerId: "customer-3",
    bookings: [
      {
        id: "booking-103",
        checkIn: "2024-01-10T15:00:00.000Z",
        checkOut: "2024-01-12T11:00:00.000Z",
        roomType: "Standard",
        roomId: "room-1",
        totalAmount: 300,
        paymentStatus: "paid",
      },
    ],
  },
  {
    customerId: "customer-4",
    bookings: [
      {
        id: "booking-104",
        checkIn: "2023-12-05T15:00:00.000Z",
        checkOut: "2023-12-10T11:00:00.000Z",
        roomType: "Executive",
        roomId: null,
        totalAmount: 1500,
        paymentStatus: "paid",
      },
    ],
  },
  {
    customerId: "customer-5",
    bookings: [
      {
        id: "booking-105",
        checkIn: "2024-02-05T15:00:00.000Z",
        checkOut: "2024-02-07T11:00:00.000Z",
        roomType: "Deluxe",
        roomId: "room-2",
        totalAmount: 450,
        paymentStatus: "paid",
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
