import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { rooms } from "../../data/rooms";
import { customers } from "../../data/customers";
import { createBooking, calculateBill } from "../../data/bookings";

const inputClassName =
  "mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm " +
  "transition-all duration-200 ease-in-out " +
  "focus:ring-2 focus:ring-primary-500 focus:border-primary-500 " +
  "hover:border-gray-400 bg-white";

const dropdownClassName =
  "absolute z-10 w-full mt-1 bg-white border border-gray-300 " +
  "rounded-lg shadow-lg max-h-60 overflow-auto divide-y divide-gray-100";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const foundRoom = rooms.find((r) => r.id === id);
    if (foundRoom && foundRoom.status === "available") {
      setRoom(foundRoom);
    } else {
      setError("Room not available for booking");
    }
    setLoading(false);
  }, [id]);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    const errors = {};
    if (!formData.customerId) errors.customerId = "Please select a customer";
    if (!formData.checkIn) errors.checkIn = "Check-in date is required";
    if (!formData.checkOut) errors.checkOut = "Check-out date is required";
    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      errors.dates = "Check-out date must be after check-in date";
    }
    if (formData.adults < 1) errors.adults = "At least 1 adult is required";
    if (formData.children < 0) errors.children = "Cannot be negative";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setError(null);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!room) return <div>Room not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Book Room {room?.number}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Customer
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search customer..."
            className={inputClassName}
          />
          {showDropdown && (
            <div className={dropdownClassName}>
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => {
                    setFormData({ ...formData, customerId: customer.id });
                    setSearchTerm(customer.name);
                    setShowDropdown(false);
                  }}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                >
                  {customer.name}
                </div>
              ))}
            </div>
          )}
          {validationErrors.customerId && (
            <p className="text-red-500 text-sm mt-1 ml-1">
              {validationErrors.customerId}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in Date
            </label>
            <input
              type="date"
              value={formData.checkIn}
              onChange={(e) =>
                setFormData({ ...formData, checkIn: e.target.value })
              }
              className={inputClassName}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out Date
            </label>
            <input
              type="date"
              value={formData.checkOut}
              onChange={(e) =>
                setFormData({ ...formData, checkOut: e.target.value })
              }
              className={inputClassName}
            />
          </div>
        </div>
        {validationErrors.dates && (
          <p className="text-red-500 text-sm">{validationErrors.dates}</p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adults
            </label>
            <input
              type="number"
              min="1"
              value={formData.adults}
              onChange={(e) =>
                setFormData({ ...formData, adults: parseInt(e.target.value) })
              }
              className={inputClassName}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Children
            </label>
            <input
              type="number"
              min="0"
              value={formData.children}
              onChange={(e) =>
                setFormData({ ...formData, children: parseInt(e.target.value) })
              }
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) =>
              setFormData({ ...formData, specialRequests: e.target.value })
            }
            rows={3}
            className={inputClassName + " resize-none"}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/rooms/${id}`)}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                     rounded-lg hover:bg-gray-50 transition-colors duration-200"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-medium text-white bg-primary-600 
                     rounded-lg hover:bg-primary-700 transition-colors duration-200 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Booking"}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
