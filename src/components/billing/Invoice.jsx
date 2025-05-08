import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookings } from "../../data/bookings";
import { rooms } from "../../data/rooms";
import { customers } from "../../data/customers";

function Invoice() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const booking = bookings.find((b) => b.billingId === id);
    if (booking) {
      const room = rooms.find((r) => r.id === booking.roomId);
      const customer = customers.find((c) => c.id === booking.customerId);
      setInvoice({ ...booking, room, customer });
    }
  }, [id]);

  if (!invoice) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Invoice #{id}</h1>
            <p className="text-gray-500">
              Created: {new Date(invoice.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{invoice.customer.name}</p>
            <p className="text-sm text-gray-600">{invoice.customer.email}</p>
            <p className="text-sm text-gray-600">{invoice.customer.phone}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
          <div className="border rounded-lg p-4">
            <p>
              <span className="font-medium">Room:</span> {invoice.room.number} ({" "}
              {invoice.room.type})
            </p>
            <p>
              <span className="font-medium">Check-in:</span>{" "}
              {new Date(invoice.checkIn).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Check-out:</span>{" "}
              {new Date(invoice.checkOut).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Guests:</span> {invoice.adults}{" "}
              adults, {invoice.children} children
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
          <div className="border-t pt-4">
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-semibold">
                ${invoice.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
