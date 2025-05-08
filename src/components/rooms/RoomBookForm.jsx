import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { rooms } from "../../data/rooms";
import { customers } from "../../data/customers";
import { createBooking, calculateBill } from "../../data/bookings";

export default function RoomBookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    customerId: "",
    checkIn: new Date().toISOString().split("T")[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    adults: 1,
    children: 0,
    specialRequests: "",
  });

  useEffect(() => {
    const foundRoom = rooms.find((r) => r.id === id);
    if (foundRoom && foundRoom.status === "available") {
      setRoom(foundRoom);
    } else {
      setError("Room not available for booking");
    }
    setLoading(false);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.customerId) {
      setError("Please select a customer");
      return;
    }

    try {
      const bill = calculateBill(
        formData.checkIn,
        formData.checkOut,
        room.pricePerNight
      );

      const booking = createBooking({
        roomId: room.id,
        ...formData,
        totalAmount: bill.total,
        checkIn: `${formData.checkIn}T15:00:00.000Z`,
        checkOut: `${formData.checkOut}T11:00:00.000Z`,
      });

      navigate(`/billing/${booking.billingId}`);
    } catch (err) {
      setError(err.message || "Failed to create booking");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!room) return <div>Room not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Book Room {room.number}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Customer
          </label>
          <select
            value={formData.customerId}
            onChange={(e) =>
              setFormData({ ...formData, customerId: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Check-in Date
            </label>
            <input
              type="date"
              value={formData.checkIn}
              onChange={(e) =>
                setFormData({ ...formData, checkIn: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Check-out Date
            </label>
            <input
              type="date"
              value={formData.checkOut}
              onChange={(e) =>
                setFormData({ ...formData, checkOut: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Adults
            </label>
            <input
              type="number"
              min="1"
              value={formData.adults}
              onChange={(e) =>
                setFormData({ ...formData, adults: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Children
            </label>
            <input
              type="number"
              min="0"
              value={formData.children}
              onChange={(e) =>
                setFormData({ ...formData, children: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Special Requests
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) =>
              setFormData({ ...formData, specialRequests: e.target.value })
            }
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/rooms/${id}`)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
          >
            Create Booking
          </button>
        </div>
      </form>
    </div>
  );
}
