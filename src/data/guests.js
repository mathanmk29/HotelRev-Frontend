// Mock guest data
export const guests = [
  {
    id: "guest-1",
    customerId: "customer-1",
    name: "Lisa Smith",
    email: "lisa.smith@example.com",
    phone: "+1 (555) 111-2222",
    relationship: "Spouse",
    checkIn: "2025-04-10T15:00:00.000Z",
    checkOut: "2025-04-12T11:00:00.000Z",
    idVerified: true,
    idType: "Passport",
    idNumber: "A12345678",
    notes: "Vegetarian diet",
  },
  {
    id: "guest-2",
    customerId: "customer-1",
    name: "Tommy Smith",
    email: "tommy.smith@example.com",
    phone: "+1 (555) 111-3333",
    relationship: "Child",
    checkIn: "2025-04-10T15:00:00.000Z",
    checkOut: "2025-04-12T11:00:00.000Z",
    idVerified: true,
    idType: "Birth Certificate",
    idNumber: "BC987654",
    notes: "12 years old",
  },
  {
    id: "guest-3",
    customerId: "customer-2",
    name: "David Johnson",
    email: "david.johnson@example.com",
    phone: "+1 (555) 222-3333",
    relationship: "Business Partner",
    checkIn: "2025-03-20T15:00:00.000Z",
    checkOut: "2025-03-25T11:00:00.000Z",
    idVerified: true,
    idType: "Driver License",
    idNumber: "DL456789",
    notes: "Early check-in requested",
  },
  {
    id: "guest-4",
    customerId: "customer-4",
    name: "Olivia Williams",
    email: "olivia.williams@example.com",
    phone: "+1 (555) 333-4444",
    relationship: "Friend",
    checkIn: "2025-04-05T15:00:00.000Z",
    checkOut: "2025-04-10T11:00:00.000Z",
    idVerified: false,
    idType: "Passport",
    idNumber: "B98765432",
    notes: "Late check-out requested",
  },
  {
    id: "guest-5",
    customerId: "customer-5",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 444-5555",
    relationship: "Spouse",
    checkIn: "2025-02-05T15:00:00.000Z",
    checkOut: "2025-02-07T11:00:00.000Z",
    idVerified: true,
    idType: "ID Card",
    idNumber: "ID789012",
    notes: "Allergic to peanuts",
  },
];

// Helper functions for guests
export const getGuestsByCustomerId = (customerId) => {
  return guests.filter((guest) => guest.customerId === customerId);
};

export const getGuestById = (id) => {
  return guests.find((guest) => guest.id === id);
};

export const addGuest = (guestData) => {
  const newGuest = {
    id: `guest-${guests.length + 1}`,
    ...guestData,
  };
  guests.push(newGuest);
  return newGuest;
};

export const updateGuest = (id, guestData) => {
  const index = guests.findIndex((guest) => guest.id === id);
  if (index !== -1) {
    guests[index] = { ...guests[index], ...guestData };
    return guests[index];
  }
  return null;
};

export const deleteGuest = (id) => {
  const index = guests.findIndex((guest) => guest.id === id);
  if (index !== -1) {
    return guests.splice(index, 1)[0];
  }
  return null;
};
