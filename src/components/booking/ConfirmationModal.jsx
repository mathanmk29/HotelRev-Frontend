import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { customers } from "../../data/customers"; // Add this import

const ConfirmationModal = ({ bookingDetails }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Update customer's currentGuest status
    const customer = customers.find((customer) => customer.id === bookingDetails.customer.id);
    if (customer) {
      customer.currentGuest = true;
    }

    const timer = setTimeout(() => {
      navigate("/bookings");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate, bookingDetails]);

  const handleClose = () => {
    navigate("/bookings");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm"></div>

        <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 shadow-2xl transition-all sm:w-full sm:max-w-lg">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <div className="p-12">
            {/* Success Icon */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-900">
              <svg
                className="h-12 w-12 text-green-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-3xl font-semibold text-white">
                Booking Created!
              </h3>
              <p className="mt-4 text-lg text-gray-300">
                Your booking has been successfully created
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Redirecting to bookings list...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
