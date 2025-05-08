import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { customerBooking, customers } from "../../data/customers";
import { rooms } from "../../data/rooms";

function BookingList() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");

  useEffect(() => {
    // Check for stored customer filter
    const customerId = sessionStorage.getItem("selectedCustomerId");
    const customerName = sessionStorage.getItem("selectedCustomerName");
    if (customerId) {
      setSelectedCustomerId(customerId);
      setSearchTerm(customerName || "");
      // Clear the stored filter
      sessionStorage.removeItem("selectedCustomerId");
      sessionStorage.removeItem("selectedCustomerName");
    }
  }, []);

  // Get all bookings by combining customer bookings
  const allBookings = customerBooking.flatMap((cb) => {
    const customer = customers.find((c) => c.id === cb.customerId);
    return cb.bookings.map((booking) => {
      const room = rooms.find((r) => r.id === booking.roomId);
      return {
        ...booking,
        customer,
        room,
        // Use the original booking ID instead of creating a new format
        bookingId: booking.id,
      };
    });
  });

  // Update filter logic to include customer filter
  const filteredBookings = allBookings.filter((booking) => {
    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus;
    const matchesCustomer = selectedCustomerId
      ? booking.customer?.id === selectedCustomerId
      : true;
    const matchesSearch =
      !selectedCustomerId &&
      (booking.customer?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && (matchesCustomer || matchesSearch);
  });

  return (
    <div className="p-4">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-white mb-4 sm:mb-0">
          {selectedCustomerId
            ? `Bookings for ${selectedCustomerName}`
            : "Booking Transactions"}
        </h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by customer or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary-500 placeholder-gray-400"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        {selectedCustomerId && (
          <button
            onClick={() => {
              setSelectedCustomerId(null);
              setSelectedCustomerName("");
              setSearchTerm("");
            }}
            className="ml-2 text-sm text-primary-600 hover:text-primary-700"
          >
            Clear Filter
          </button>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {booking.bookingId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">
                    {booking.customer?.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {booking.customer?.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">
                    Room {booking.room?.number}
                  </div>
                  <div className="text-sm text-gray-400">
                    {booking.roomType}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  ${booking.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full 
                    ${
                      booking.status === "confirmed"
                        ? "bg-green-900 text-green-200"
                        : "bg-red-900 text-red-200"
                    }`}
                  >
                    {booking.status === "confirmed" ? "Confirmed" : "Cancelled"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/bookings/${booking.id}/details`} // Update to use /details and correct ID
                    className="text-primary-600 hover:text-primary-900"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-white">
              No bookings found
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              {searchTerm
                ? "Try adjusting your search terms"
                : "No booking transactions available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingList;
