// Mock room data
export const rooms = [
  {
    id: 'room-1',
    number: '101',
    type: 'Standard',
    beds: {
      single: 1,
      double: 1,
    },
    capacity: 3,
    pricePerNight: 120,
    features: ['TV', 'WiFi', 'Air Conditioning', 'Mini Bar'],
    status: 'available',
    floor: 1,
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
  },
  {
    id: 'room-2',
    number: '102',
    type: 'Deluxe',
    beds: {
      queen: 1,
    },
    capacity: 2,
    pricePerNight: 180,
    features: ['TV', 'WiFi', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Sea View'],
    status: 'occupied',
    floor: 1,
    image: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
  },
  {
    id: 'room-3',
    number: '201',
    type: 'Suite',
    beds: {
      king: 1,
    },
    capacity: 2,
    pricePerNight: 250,
    features: ['TV', 'WiFi', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Mountain View', 'Jacuzzi'],
    status: 'available',
    floor: 2,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
  },
  {
    id: 'room-4',
    number: '202',
    type: 'Family Suite',
    beds: {
      queen: 1,
      single: 2,
    },
    capacity: 4,
    pricePerNight: 320,
    features: ['TV', 'WiFi', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Connecting Rooms'],
    status: 'maintenance',
    floor: 2,
    image: 'https://images.pexels.com/photos/3634741/pexels-photo-3634741.jpeg',
  },
  {
    id: 'room-5',
    number: '301',
    type: 'Presidential Suite',
    beds: {
      king: 1,
    },
    capacity: 2,
    pricePerNight: 500,
    features: ['TV', 'WiFi', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Sea View', 'Private Balcony', 'Jacuzzi', 'Dining Area'],
    status: 'available',
    floor: 3,
    image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
  },
  {
    id: 'room-6',
    number: '302',
    type: 'Standard',
    beds: {
      double: 2,
    },
    capacity: 4,
    pricePerNight: 150,
    features: ['TV', 'WiFi', 'Air Conditioning', 'Mini Bar'],
    status: 'occupied',
    floor: 3,
    image: 'https://images.pexels.com/photos/6284232/pexels-photo-6284232.jpeg',
  },
]

// Get all room types
export const roomTypes = [...new Set(rooms.map(room => room.type))]

// Get room statuses
export const roomStatuses = [
  {
    value: 'available',
    label: 'Available',
    color: 'bg-success-500',
  },
  {
    value: 'occupied',
    label: 'Occupied',
    color: 'bg-accent-500',
  },
  {
    value: 'maintenance',
    label: 'Under Maintenance',
    color: 'bg-error-500',
  },
  {
    value: 'reserved',
    label: 'Reserved',
    color: 'bg-primary-500',
  },
]

// Get status by value
export const getStatusByValue = (value) => {
  return roomStatuses.find(status => status.value === value) || roomStatuses[0]
}