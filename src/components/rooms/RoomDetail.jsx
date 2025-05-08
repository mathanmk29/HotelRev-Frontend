import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { rooms, getStatusByValue } from "../../data/rooms";
import { CalendarDaysIcon } from "@heroicons/react/24/outline"; // Add this import

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    status: "",
    pricePerNight: 0,
  });

  useEffect(() => {
    const foundRoom = rooms.find((r) => r.id === id);

    if (foundRoom) {
      setRoom(foundRoom);
      setFormData({
        status: foundRoom.status,
        pricePerNight: foundRoom.pricePerNight,
      });
    }

    setLoading(false);
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "pricePerNight" ? parseFloat(value) : value,
    }));
  };

  const handleSave = () => {
    setRoom((prev) => ({
      ...prev,
      status: formData.status,
      pricePerNight: formData.pricePerNight,
    }));
    setEditMode(false);
  };

  const handleBookRoom = () => {
    // Navigate to booking confirmation instead of the book form
    navigate(`/bookings/new/${room.id}/confirmation`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="text-center p-12 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900">Room Not Found</h2>
        <p className="mt-2 text-gray-500">
          The room you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/rooms"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Back to Room List
          </Link>
        </div>
      </div>
    );
  }

  const status = getStatusByValue(room.status);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <Link
            to="/rooms"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <svg
              className="w-5 h-5 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to Rooms
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Room {room.number} Details
          </h1>
        </div>
        <div className="flex mt-4 space-x-3 md:mt-0">
          <button
            onClick={() => setEditMode(!editMode)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {editMode ? "Cancel" : "Edit Room"}
          </button>
          {room.status === "available" && (
            <Link
              to={`/rooms/${room.id}/book`}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Book Room
            </Link>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        {editMode ? (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                {roomStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="pricePerNight"
                className="block text-sm font-medium text-gray-700"
              >
                Price per Night ($)
              </label>
              <input
                type="number"
                name="pricePerNight"
                id="pricePerNight"
                value={formData.pricePerNight}
                onChange={handleFormChange}
                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-3"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Room {room.number}
                </h2>
                <p className="text-sm text-gray-500">{room.type}</p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color.replace(
                  "bg-",
                  "bg-opacity-90 text-white bg-"
                )}`}
              >
                {status.label}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Room Information
                </h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span className="text-gray-700">Floor {room.floor}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span className="text-gray-700">
                      Capacity: {room.capacity} people
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">
                      ${room.pricePerNight}/night
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900">
                    Bed Configuration
                  </h4>
                  <div className="mt-2 space-y-1">
                    {Object.entries(room.beds).map(([type, count]) => (
                      <div key={type} className="text-sm text-gray-700">
                        {count} {type} bed{count > 1 ? "s" : ""}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Features & Amenities
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {room.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Description
                  </h3>
                  <p className="mt-2 text-gray-700">
                    This {room.type.toLowerCase()} room offers comfortable
                    accommodations for up to {room.capacity} guests. Perfect for{" "}
                    {room.capacity > 2
                      ? "families or groups"
                      : "couples or solo travelers"}
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Update the Book Room button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleBookRoom}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                   transition-colors duration-200 flex items-center space-x-2"
        >
          <span>Create Booking</span>
          <CalendarDaysIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default RoomDetail;
