import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getGuestById, deleteGuest } from "../../data/guests";
import { customers } from "../../data/customers";

function GuestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guest, setGuest] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const customer = guest
    ? customers.find((c) => c.id === guest.customerId)
    : null;

  useEffect(() => {
    const guestData = getGuestById(id);
    if (guestData) {
      setGuest(guestData);
    } else {
      navigate("/guests");
    }
  }, [id, navigate]);

  const handleDelete = () => {
    deleteGuest(id);
    navigate("/guests");
  };

  if (!guest) return null;

  return (
    <div className="p-4">
      <div className="mb-6">
        <Link to="/guests" className="text-primary-600 hover:text-primary-900">
          ← Back to Guest List
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">{guest.name}</h1>
          <div className="flex gap-3">
            <Link
              to={`/guests/edit/${id}`}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Edit Guest
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete Guest
            </button>
          </div>
        </div>

        <div className="px-6 py-6 grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium text-primary-400 mb-4">
              Guest Information
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-400">Email</dt>
                <dd className="mt-1 text-sm text-white">{guest.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">Phone</dt>
                <dd className="mt-1 text-sm text-white">{guest.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">
                  Relationship
                </dt>
                <dd className="mt-1 text-sm text-white">
                  {guest.relationship}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-lg font-medium text-primary-400 mb-4">
              Visit Details
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-400">
                  Visiting Customer
                </dt>
                <dd className="mt-1 text-sm text-white">{customer?.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">
                  Check-in Date
                </dt>
                <dd className="mt-1 text-sm text-white">
                  {new Date(guest.checkIn).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">
                  Check-out Date
                </dt>
                <dd className="mt-1 text-sm text-white">
                  {new Date(guest.checkOut).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border border-gray-700 w-96 shadow-lg rounded-md bg-gray-800">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-white">
                Delete Guest
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-300">
                  Are you sure you want to delete this guest? This action cannot
                  be undone.
                </p>
              </div>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GuestDetail;
