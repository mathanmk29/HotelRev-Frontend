import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addGuest, updateGuest, getGuestById } from "../../data/guests";
import { customers } from "../../data/customers";

function GuestForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    relationship: "",
    customerId: "",
    checkIn: new Date().toISOString().split("T")[0],
    checkOut: new Date().toISOString().split("T")[0],
    idVerified: false,
    idType: "",
    idNumber: "",
    notes: "",
  });

  useEffect(() => {
    if (id) {
      const guest = getGuestById(id);
      if (guest) {
        setFormData({
          ...guest,
          checkIn: guest.checkIn.split("T")[0],
          checkOut: guest.checkOut.split("T")[0],
        });
      } else {
        setError("Guest not found");
      }
    }
    setLoading(false);
  }, [id]);

  const validateForm = () => {
    if (!formData.customerId) {
      setError("Please select a customer");
      return false;
    }
    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      setError("Check-out date must be after check-in date");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    const guestData = {
      ...formData,
      checkIn: `${formData.checkIn}T15:00:00.000Z`,
      checkOut: `${formData.checkOut}T11:00:00.000Z`,
    };

    try {
      if (id) {
        updateGuest(id, guestData);
        navigate(`/guests/${id}`);
      } else {
        const newGuest = addGuest(guestData);
        navigate(`/guests/${newGuest.id}`);
      }
    } catch (err) {
      setError(err.message || "Failed to save guest");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <Link
          to={id ? `/guests/${id}` : "/guests"}
          className="text-primary-600 hover:text-primary-900"
        >
          ← Back to {id ? "Guest Details" : "Guest List"}
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">
          {id ? "Edit Guest" : "New Guest"}
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Guest Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Guest Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Customer Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Customer
              </label>
              <select
                name="customerId"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.customerId}
                onChange={handleChange}
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Visit Dates */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Check-in Date
              </label>
              <input
                type="date"
                name="checkIn"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.checkIn}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Check-out Date
              </label>
              <input
                type="date"
                name="checkOut"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.checkOut}
                onChange={handleChange}
              />
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Relationship
              </label>
              <input
                type="text"
                name="relationship"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.relationship}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-6">
            <Link
              to={id ? `/guests/${id}` : "/guests"}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
            >
              {id ? "Save Changes" : "Add Guest"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GuestForm;
