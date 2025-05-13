import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { rooms } from "../../data/rooms";
import { customers, getCustomerBookingById } from "../../data/customers";
import { bookings } from "../../data/bookings";
import { getBillByBookingId } from "../../data/bills";

const BillingDetails = () => {
  const { id } = useParams();
  const [billing, setBilling] = useState(null);
  const [customerBookings, setCustomerBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Parse billingId from URL param, expected format: "BILL-<number>"
      if (!id || !id.startsWith("BILL-")) {
        setError("Invalid billing ID");
        setLoading(false);
        return;
      }
      const bookingId = "booking-" + id.split("-")[1];

      // Find booking directly in the bookings array
      const foundBooking = bookings.find(booking => booking.id === bookingId);
      let foundCustomer = null;
      let foundRoom = null;
      let foundBill = null;
      
      if (foundBooking) {
        foundCustomer = customers.find(customer => customer.id === foundBooking.customerId);
        foundRoom = rooms.find(room => room.id === foundBooking.roomId);
        foundBill = getBillByBookingId(foundBooking.id);
      }

      if (!foundBooking) {
        setError("Billing record not found");
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

      setBilling({
        id: foundBooking.id,
        // no need for separate bookingId since we're using id consistently
        billingId: id,
        checkIn: foundBooking.checkIn,
        checkOut: foundBooking.checkOut,
        status: foundBooking.status,
        paymentStatus: foundBooking.paymentStatus || (foundBooking.status === "checked_out" ? "paid" : "pending"),
        totalAmount: foundBill?.total || 0,
        customer: foundCustomer,
        room: foundRoom,
      });
      setCustomerBookings(customerBookingHistory.bookings || []);
    } catch (err) {
      setError("Failed to load billing details");
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
  if (!billing) return <div className="p-6">No billing record found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/billing"
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
          Back to Billing List
        </Link>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Billing Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Billing #{billing.id}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Created on {billing.checkIn ? formatDate(billing.checkIn) : "N/A"}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                billing.paymentStatus === "paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {billing.paymentStatus === "paid" ? "Paid" : "Pending"}
            </span>
          </div>
        </div>

        {/* Customer Information */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Customer Information
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{billing.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{billing.customer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{billing.customer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">
                  {billing.customer.currentGuest
                    ? "Current Guest"
                    : "Not Currently Staying"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Booking History */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Booking History
          </h2>
          <div className="overflow-hidden">
            {customerBookings.length > 0 ? (
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {customerBookings.map((booking) => (
                    <li key={booking.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            Room
                          </p>
                          <div className="text-sm text-gray-500">
                            {formatDate(booking.checkIn)} -{" "}
                            {formatDate(booking.checkOut)}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ${booking.totalAmount}
                          </p>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              booking.paymentStatus === "paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No booking history found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
