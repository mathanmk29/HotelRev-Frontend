import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { customers, getCustomerBookingById } from "../../data/customers";
import { rooms } from "../../data/rooms";

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [history, setHistory] = useState({ bookings: [] });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Find customer by ID
    const foundCustomer = customers.find((c) => c.id === id);

    if (foundCustomer) {
      setCustomer(foundCustomer);
      setFormData({
        name: foundCustomer.name,
        email: foundCustomer.email,
        phone: foundCustomer.phone,
        address: foundCustomer.address,
      });

      // Get customer booking
      const customerBooking = getCustomerBookingById(id);
      setHistory(customerBooking);
    }

    setLoading(false);
  }, [id]);

  const handleFormChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // In a real app, this would send data to the server
    // For demo, we'll just update the local state
    setCustomer((prev) => ({
      ...prev,
      ...formData,
    }));

    setEditMode(false);
  };

  const handleViewBookings = () => {
    // Store the customer ID in sessionStorage for BookingList to use
    sessionStorage.setItem("selectedCustomerId", customer.id);
    sessionStorage.setItem("selectedCustomerName", customer.name);
    navigate("/bookings");
  };

  const handleViewAllBookings = () => {
    // Store the customer ID in sessionStorage for BookingList to use
    sessionStorage.setItem("selectedCustomerId", customer.id);
    sessionStorage.setItem("selectedCustomerName", customer.name);
    navigate("/bookings");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center p-12 bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-white">Customer Not Found</h2>
        <p className="mt-2 text-gray-400">
          The customer you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/customers"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Back to Customer List
          </Link>
        </div>
      </div>
    );
  }

  // Get room number for bookings
  const getRoomNumber = (roomId) => {
    const room = rooms.find((r) => r.id === roomId);
    return room ? room.number : "Unknown";
  };

  return (
    <div className="animate-fade-in px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/customers"
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <svg
            className="w-5 h-5 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back to Customers
        </Link>
        <div className="flex space-x-3">
          <button
            onClick={() => setEditMode(!editMode)}
            className="inline-flex items-center px-4 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
          <button
            onClick={handleViewBookings}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            View Bookings
          </button>
        </div>
      </div>

      {/* Customer Profile Card */}
      <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <div className="flex-shrink-0 h-20 w-20 bg-primary-900 rounded-full flex items-center justify-center mb-4 sm:mb-0">
              <span className="text-primary-200 font-medium text-2xl">
                {customer.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </span>
            </div>
            <div className="sm:ml-6">
              <h1 className="text-2xl font-bold text-white">
                {customer.name}
              </h1>
              <p className="text-sm text-gray-400">
                Joined on {new Date(customer.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {editMode ? (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-500 transition-all duration-200 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-500 transition-all duration-200 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-500 transition-all duration-200 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-300"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-500 transition-all duration-200 sm:text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="inline-flex justify-center rounded-md border border-gray-600 bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-400">Email</dt>
                <dd className="mt-1 text-sm text-white">{customer.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">Phone</dt>
                <dd className="mt-1 text-sm text-white">{customer.phone}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-400">Address</dt>
                <dd className="mt-1 text-sm text-white">
                  {customer.address}
                </dd>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking History */}
      <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium leading-6 text-primary-400">
              Recent Bookings
            </h3>
            <span className="text-sm text-gray-400">
              {history.bookings.length}{" "}
              {history.bookings.length === 1 ? "booking" : "bookings"}
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-700">
          {history.bookings.length > 0 ? (
            history.bookings.map((booking) => (
              <div
                key={booking.id}
                className="px-6 py-4 hover:bg-gray-700 transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">
                        Room {getRoomNumber(booking.roomId)}
                      </h4>
                      <div className="mt-1 text-sm text-gray-400">
                        {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium text-white">
                      ${booking.totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center bg-gray-800">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-white">
                No bookings found
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                This customer has no booking history yet.
              </p>
            </div>
          )}
        </div>

        {history.bookings.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-700 bg-gray-900 text-right">
            <button
              onClick={handleViewBookings}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              <span>View all bookings</span>
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetail;
