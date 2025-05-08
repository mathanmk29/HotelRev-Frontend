import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { rooms } from "../../data/rooms";
import {
  customers,
  customerBooking,
  getCustomerBookingById,
} from "../../data/customers";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [customerBookings, setCustomerBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Remove the BILL- format check since we're using booking ID directly
      const bookingId = id;

      // Find booking in customerBooking data
      let foundBooking = null;
      let foundCustomer = null;
      let foundRoom = null;

      for (const cb of customerBooking) {
        const booking = cb.bookings.find((b) => b.id === bookingId);
        if (booking) {
          foundBooking = booking;
          foundCustomer = customers.find((c) => c.id === cb.customerId);
          foundRoom = rooms.find((r) => r.id === booking.roomId);
          break;
        }
      }

      if (!foundBooking) {
        setError("Booking record not found");
        setLoading(false);
        return;
      }

      if (!foundCustomer) {
        setError("Customer not found");
        setLoading(false);
        return;
      }

      // Get customer's booking history
      const customerBookingHistory = getCustomerBookingById(foundCustomer.id);

      setBooking({
        ...foundBooking,
        customer: foundCustomer,
        room: foundRoom,
      });
      setCustomerBookings(customerBookingHistory.bookings || []);
    } catch (err) {
      setError("Failed to load booking details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Format date to readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!booking) return <div className="p-6">No booking record found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/bookings"
          className="text-primary-600 hover:text-primary-700 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Booking List
        </Link>
      </div>

      {/* Main Content */}
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Booking Header */}
        <div className="border-b border-gray-600 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Booking #{booking.id}
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                Created on{" "}
                {booking.checkIn ? formatDate(booking.checkIn) : "N/A"}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                booking.status === "confirmed"
                  ? "bg-green-900 text-green-200"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {booking.status}
            </span>
          </div>
        </div>

        {/* Customer Information */}
        <div className="p-6 border-b border-gray-600">
          <h2 className="text-lg font-medium text-white mb-4">
            Customer Information
          </h2>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="font-medium text-white">{booking.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-medium text-white">{booking.customer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="font-medium text-white">{booking.customer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className="font-medium text-white">
                  {booking.customer.currentGuest
                    ? "Current Guest"
                    : "Not Currently Staying"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Room Details Section */}
        <div className="p-6 border-b border-gray-600">
          <h2 className="text-lg font-medium text-white mb-4">
            Room Details
          </h2>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Room Number</p>
                <p className="font-medium text-white">{booking.room?.number || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Room Type</p>
                <p className="font-medium text-white">{booking.room?.type || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Floor</p>
                <p className="font-medium text-white">{booking.room?.floor || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Capacity</p>
                <p className="font-medium text-white">
                  {booking.room?.capacity || "N/A"} persons
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-400">Features</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {booking.room?.features?.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Booking History */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-white mb-4">
            Booking History
          </h2>
          <div className="overflow-hidden">
            {customerBookings.length > 0 ? (
              <div className="flow-root">
                <ul className="divide-y divide-gray-700">
                  {customerBookings.map((booking) => (
                    <li key={booking.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">
                            {booking.roomType} Room
                          </p>
                          <div className="text-sm text-gray-400">
                            {formatDate(booking.checkIn)} -{" "}
                            {formatDate(booking.checkOut)}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-white">
                            ${booking.totalAmount}
                          </p>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              booking.status === "confirmed"
                                ? "bg-green-900 text-green-200"
                                : "bg-gray-700 text-gray-200"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">
                No booking history found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
