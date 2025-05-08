import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addGuest, updateGuest, getGuestById } from "../../data/guests";
import { customers } from "../../data/customers";

const inputClassName = `mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-600
  focus:ring-2 focus:ring-primary-500 focus:border-primary-500
  hover:border-gray-500 transition-colors duration-200
  placeholder-gray-400 bg-gray-700 text-white
  disabled:bg-gray-800 disabled:text-gray-400`;

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
  });
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

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

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase())
  );

  const validateForm = () => {
    if (!formData.customerId) {
      setError("Please select a customer");
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

  const handleCustomerSelect = (customer) => {
    setFormData((prev) => ({
      ...prev,
      customerId: customer.id,
    }));
    setCustomerSearchTerm(customer.name);
    setShowCustomerDropdown(false);
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

  // Update the click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".customer-search")) {
        setShowCustomerDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">
          {id ? "Edit Guest" : "New Guest"}
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-900 border border-red-800 rounded-md">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Guest Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Guest Name
              </label>
              <input
                type="text"
                name="name"
                required
                className={inputClassName}
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter guest name"
              />
            </div>

            {/* Customer Selection */}
            <div className="relative customer-search">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Customer *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customerSearchTerm}
                  onChange={(e) => {
                    setCustomerSearchTerm(e.target.value);
                    setShowCustomerDropdown(true);
                  }}
                  onFocus={() => setShowCustomerDropdown(true)}
                  placeholder="Search for customer..."
                  className={inputClassName}
                />
                {showCustomerDropdown && customerSearchTerm && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg border border-gray-600">
                    <ul className="max-h-60 overflow-auto py-1">
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((customer) => (
                          <li
                            key={customer.id}
                            onClick={() => handleCustomerSelect(customer)}
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                          >
                            <div className="font-medium text-white">{customer.name}</div>
                            <div className="text-sm text-gray-400">
                              {customer.email}
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-gray-400">
                          No customers found
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                className={inputClassName}
                value={formData.email}
                onChange={handleChange}
                placeholder="guest@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                className={inputClassName}
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* Check-in Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Check-in Date
              </label>
              <input
                type="date"
                name="checkIn"
                required
                min={new Date().toISOString().split("T")[0]}
                className={inputClassName}
                value={formData.checkIn}
                onChange={handleChange}
              />
            </div>

            {/* Check-out Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Check-out Date
              </label>
              <input
                type="date"
                name="checkOut"
                required
                min={formData.checkIn}
                className={inputClassName}
                value={formData.checkOut}
                onChange={handleChange}
              />
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Relationship
              </label>
              <input
                type="text"
                name="relationship"
                className={inputClassName}
                value={formData.relationship}
                onChange={handleChange}
                placeholder="e.g. Family, Friend"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-700">
            <Link
              to={id ? `/guests/${id}` : "/guests"}
              className="px-6 py-2.5 text-sm font-medium text-white bg-gray-700 border border-gray-600 
                       rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-primary-600 
                       rounded-lg hover:bg-primary-700 transition-colors duration-200"
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
