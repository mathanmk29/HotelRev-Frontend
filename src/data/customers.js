// Mock customer data
export const customers = [
  {
    id: 'customer-1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, CA 12345',
    vipStatus: false,
    createdAt: '2023-12-20T14:30:00.000Z',
    loyalty: {
      points: 350,
      tier: 'Silver',
    },
  },
  {
    id: 'customer-2',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Ave, Somewhere, NY 67890',
    vipStatus: true,
    createdAt: '2023-11-15T10:45:00.000Z',
    loyalty: {
      points: 1200,
      tier: 'Gold',
    },
  },
  {
    id: 'customer-3',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '+1 (555) 456-7890',
    address: '789 Pine Rd, Elsewhere, TX 54321',
    vipStatus: false,
    createdAt: '2024-01-05T09:15:00.000Z',
    loyalty: {
      points: 50,
      tier: 'Bronze',
    },
  },
  {
    id: 'customer-4',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    phone: '+1 (555) 234-5678',
    address: '321 Elm Blvd, Nowhere, FL 34567',
    vipStatus: true,
    createdAt: '2023-10-10T16:20:00.000Z',
    loyalty: {
      points: 2500,
      tier: 'Platinum',
    },
  },
  {
    id: 'customer-5',
    name: 'Robert Garcia',
    email: 'robert.garcia@example.com',
    phone: '+1 (555) 876-5432',
    address: '654 Maple Dr, Anywhere, WA 89012',
    vipStatus: false,
    createdAt: '2024-02-01T11:00:00.000Z',
    loyalty: {
      points: 175,
      tier: 'Bronze',
    },
  },
]

// Mock customer history
export const customerHistory = [
  {
    customerId: 'customer-1',
    bookings: [
      {
        id: 'booking-101',
        roomId: 'room-1',
        checkIn: '2023-12-24T15:00:00.000Z',
        checkOut: '2023-12-26T11:00:00.000Z',
        totalAmount: 240,
        paymentStatus: 'paid',
      },
      {
        id: 'booking-205',
        roomId: 'room-3',
        checkIn: '2024-02-14T15:00:00.000Z',
        checkOut: '2024-02-16T11:00:00.000Z',
        totalAmount: 500,
        paymentStatus: 'paid',
      },
    ],
  },
  {
    customerId: 'customer-2',
    bookings: [
      {
        id: 'booking-102',
        roomId: 'room-5',
        checkIn: '2023-11-20T15:00:00.000Z',
        checkOut: '2023-11-25T11:00:00.000Z',
        totalAmount: 2500,
        paymentStatus: 'paid',
      },
      {
        id: 'booking-189',
        roomId: 'room-5',
        checkIn: '2024-01-01T15:00:00.000Z',
        checkOut: '2024-01-03T11:00:00.000Z',
        totalAmount: 1000,
        paymentStatus: 'paid',
      },
      {
        id: 'booking-254',
        roomId: 'room-2',
        checkIn: '2024-03-08T15:00:00.000Z',
        checkOut: '2024-03-10T11:00:00.000Z',
        totalAmount: 360,
        paymentStatus: 'pending',
      },
    ],
  },
  {
    customerId: 'customer-3',
    bookings: [
      {
        id: 'booking-103',
        roomId: 'room-6',
        checkIn: '2024-01-10T15:00:00.000Z',
        checkOut: '2024-01-12T11:00:00.000Z',
        totalAmount: 300,
        paymentStatus: 'paid',
      },
    ],
  },
  {
    customerId: 'customer-4',
    bookings: [
      {
        id: 'booking-104',
        roomId: 'room-4',
        checkIn: '2023-12-05T15:00:00.000Z',
        checkOut: '2023-12-10T11:00:00.000Z',
        totalAmount: 1600,
        paymentStatus: 'paid',
      },
      {
        id: 'booking-156',
        roomId: 'room-5',
        checkIn: '2024-01-20T15:00:00.000Z',
        checkOut: '2024-01-25T11:00:00.000Z',
        totalAmount: 2500,
        paymentStatus: 'paid',
      },
    ],
  },
  {
    customerId: 'customer-5',
    bookings: [
      {
        id: 'booking-105',
        roomId: 'room-1',
        checkIn: '2024-02-05T15:00:00.000Z',
        checkOut: '2024-02-07T11:00:00.000Z',
        totalAmount: 240,
        paymentStatus: 'paid',
      },
    ],
  },
]

// Get history for a specific customer
export const getCustomerHistoryById = (customerId) => {
  return customerHistory.find(history => history.customerId === customerId) || { customerId, bookings: [] }
}