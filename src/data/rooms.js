// Mock room data
export const rooms = [
  {
    id: "room-1",
    number: "101",
    beds: {
      single: 1,
      double: 1,
    },
    capacity: 3,
    pricePerNight: 120,
    features: ["TV", "WiFi", "Air Conditioning", "Mini Bar"],
    status: "available",
    floor: 1,
    description: "A comfortable room with modern amenities.",
  },
  {
    id: "room-2",
    number: "102",
    beds: {
      double: 1,
    },
    capacity: 2,
    pricePerNight: 180,
    features: [
      "TV",
      "WiFi",
      "Air Conditioning",
      "Mini Bar",
      "Room Service",
      "Sea View",
    ],
    status: "occupied",
    floor: 1,
    description: "A luxurious room with sea view.",
  },
  {
    id: "room-3",
    number: "201",
    beds: {
      double: 1,
      single: 1,
    },
    capacity: 2,
    pricePerNight: 250,
    features: [
      "TV",
      "WiFi",
      "Air Conditioning",
      "Mini Bar",
      "Room Service",
      "Mountain View",
      "Jacuzzi",
    ],
    status: "available",
    floor: 2,
    description: "An elegant room with mountain view and private jacuzzi.",
  },
  {
    id: "room-4",
    number: "202",
    beds: {
      double: 1,
      single: 2,
    },
    capacity: 4,
    pricePerNight: 320,
    features: [
      "TV",
      "WiFi",
      "Air Conditioning",
      "Mini Bar",
      "Room Service",
      "Connecting Rooms",
    ],
    status: "maintenance",
    floor: 2,
    description: "A spacious room with connecting rooms.",
  },
  {
    id: "room-5",
    number: "301",
    beds: {
      double: 2,
    },
    capacity: 2,
    pricePerNight: 500,
    features: [
      "TV",
      "WiFi",
      "Air Conditioning",
      "Mini Bar",
      "Room Service",
      "Sea View",
      "Private Balcony",
      "Jacuzzi",
      "Dining Area",
    ],
    status: "available",
    floor: 3,
    description:
      "The opulent presidential suite with private balcony and jacuzzi.",
  },
  {
    id: "room-6",
    number: "302",
    beds: {
      double: 2,
    },
    capacity: 4,
    pricePerNight: 150,
    features: ["TV", "WiFi", "Air Conditioning", "Mini Bar"],
    status: "occupied",
    floor: 3,
    description: "A cozy room, perfect for families.",
  },
];

// Get room statuses
export const roomStatuses = [
  {
    value: "available",
    label: "Available",
    color: "bg-success-500",
  },
  {
    value: "occupied",
    label: "Occupied",
    color: "bg-accent-500",
  },
  {
    value: "maintenance",
    label: "Under Maintenance",
    color: "bg-error-500",
  },
  {
    value: "reserved",
    label: "Reserved",
    color: "bg-primary-500",
  },
];

// Get status by value
export const getStatusByValue = (value) => {
  return (
    roomStatuses.find((status) => status.value === value) || roomStatuses[0]
  );
};

// Add new room
export const addRoom = (roomData) => {
  const newRoom = {
    id: `room-${rooms.length + 1}`,
    ...roomData,
    description: roomData.description || `A comfortable room.`,
  };
  rooms.push(newRoom);
  return newRoom;
};
