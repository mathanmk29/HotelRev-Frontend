import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookings } from "../../data/bookings";
import { customers } from "../../data/customers";
import { rooms } from "../../data/rooms";
import ConfirmationModal from "./ConfirmationModal";

function BookingConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("confirmed"); // Changed from "pending"

  useEffect(() => {
    try {
      const booking = bookings.find((b) => b.bookingId === id);
      if (!booking) {
        setError("Booking not found");
        return;
      }

      const room = rooms.find((r) => r.id === booking.roomId);
      const customer = customers.find((c) => c.id === booking.customerId);

      if (!room || !customer) {
        setError("Invalid room or customer data");
        return;
      }

      setBookingDetails({
        ...booking,
        room,
        customer,
      });
    } catch (err) {
      console.error("Error in BookingConfirmation:", err);
      setError("Failed to load booking data");
    }
  }, [id]);

  const handleConfirmationComplete = (updatedBooking) => {
    setShowConfirmModal(false);
    setBookingStatus("confirmed");
    setBookingDetails((prev) => ({
      ...prev,
      status: "confirmed",
      confirmedAt: new Date().toISOString(),
    }));

    // Show success notification
    const successMessage = document.createElement("div");
    successMessage.className =
      "fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg";
    successMessage.innerHTML = `
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm">Booking confirmed successfully!</p>
        </div>
      </div>
    `;
    document.body.appendChild(successMessage);
    setTimeout(() => successMessage.remove(), 3000);
  };

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!bookingDetails || !bookingDetails.room)
    return <div className="p-4">Loading booking data...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-white">Booking Confirmation #{id}</h1>
            <p className="text-gray-400">
              Created: {new Date(bookingDetails.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-white">{bookingDetails.customer.name}</p>
            <p className="text-sm text-gray-400">
              {bookingDetails.customer.email}
            </p>
            <p className="text-sm text-gray-400">
              {bookingDetails.customer.phone}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-white">Booking Details</h2>
          <div className="border border-gray-600 rounded-lg p-6 space-y-4 bg-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Room Details */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Room Information
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-primary-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-white">
                      Room {bookingDetails.room.number}
                    </p>

                  </div>
                </div>
              </div>

              {/* Guest Details */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Guest Count
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-primary-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-white">
                      {bookingDetails.adults + bookingDetails.children} Guest
                      {bookingDetails.adults + bookingDetails.children !== 1
                        ? "s"
                        : ""}
                    </p>
                    <p className="text-sm text-gray-400">
                      {bookingDetails.adults} Adult
                      {bookingDetails.adults !== 1 ? "s" : ""}
                      {bookingDetails.children > 0
                        ? `, ${bookingDetails.children} Children`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Check-in Details */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Check-in
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-white">
                      {new Date(bookingDetails.checkIn).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                    <p className="text-sm text-gray-400">3:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Check-out Details */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Check-out
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-white">
                      {new Date(bookingDetails.checkOut).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                    <p className="text-sm text-gray-400">11:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-white">Booking Summary</h2>
          <div className="border-t border-gray-600 pt-4 space-y-2 text-white">
            <div className="flex justify-between">
              <span>Room Rate (per night):</span>
              <span>${(bookingDetails.room.price || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Number of Nights:</span>
              <span>{bookingDetails.bill.nights} nights</span>
            </div>
            <div className="flex justify-between">
              <span>Room Total:</span>
              <span>${bookingDetails.bill.roomCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span>${bookingDetails.bill.tax.toFixed(2)}</span>
            </div>
            {bookingDetails.extraCharges > 0 && (
              <div className="flex justify-between">
                <span>Additional Charges:</span>
                <span>${bookingDetails.extraCharges.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total Amount:</span>
              <span>${bookingDetails.bill.total.toFixed(2)}</span>
            </div>

            {/* Booking Status and Button */}
            <div className="mt-6 flex justify-between items-center">
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    bookingStatus === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {bookingStatus === "confirmed"
                    ? "Confirmed"
                    : "Pending Confirmation"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Add Confirmation Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                     transition-colors duration-200 flex items-center space-x-2"
          >
            <span>Confirm Booking</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          bookingDetails={bookingDetails} // Pass the full bookingDetails object
          onClose={() => setShowConfirmModal(false)}
          onConfirmationComplete={handleConfirmationComplete}
        />
      )}
    </div>
  );
}

export default BookingConfirmation;
