import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { rooms, getStatusByValue, roomStatuses } from "../../data/rooms";
import { AuthContext } from "../../context/AuthContext";

const RoomDetail = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    status: "",
    pricePerNight: 0,
    type: "",
    capacity: 0,
    floor: 1,
    features: [],
    beds: {},
    description: "", // Add description field
  });

  useEffect(() => {
    const foundRoom = rooms.find((r) => r.id === id);

    if (foundRoom) {
      setRoom(foundRoom);
      setFormData({
        status: foundRoom.status,
        pricePerNight: foundRoom.pricePerNight,
        type: foundRoom.type,
        capacity: foundRoom.capacity,
        floor: foundRoom.floor,
        features: [...foundRoom.features],
        beds: { ...foundRoom.beds },
        description: foundRoom.description || "", // Initialize description
      });
    }

    setLoading(false);
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "pricePerNight" || name === "capacity" || name === "floor"
          ? parseInt(value, 10)
          : name === "features"
          ? value
              .split(",")
              .map((f) => f.trim())
              .filter(Boolean)
          : value,
    }));
  };

  const handleBedChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      beds: {
        ...prev.beds,
        [type]: parseInt(value) || 0,
      },
    }));
  };

  const handleSave = () => {
    const roomIndex = rooms.findIndex((r) => r.id === id);
    if (roomIndex !== -1) {
      rooms[roomIndex] = {
        ...rooms[roomIndex],
        ...formData,
        description:
          formData.description ||
          `A comfortable ${formData.type.toLowerCase()} room.`,
      };
      setRoom(rooms[roomIndex]);
    }
    setEditMode(false);
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
      <div className="text-center p-12 bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-white">Room Not Found</h2>
        <p className="mt-2 text-gray-400">
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
          <h1 className="mt-2 text-2xl font-bold text-white">
            Room {room.number} Details
          </h1>
        </div>
        <div className="flex mt-4 space-x-3 md:mt-0">
          {isAdmin && (
            <button
              onClick={() => setEditMode(!editMode)}
              className="inline-flex items-center px-4 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {editMode ? "Cancel" : "Edit Room"}
            </button>
          )}
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
      <div className="mt-6 bg-gray-800 rounded-lg shadow p-6">
        {/* Edit Form */}
        {editMode ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-400"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
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
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-400"
                >
                  Room Type
                </label>
                <input
                  type="text"
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="pricePerNight"
                  className="block text-sm font-medium text-gray-400"
                >
                  Price per Night ($)
                </label>
                <input
                  type="number"
                  name="pricePerNight"
                  id="pricePerNight"
                  value={formData.pricePerNight}
                  onChange={handleFormChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-400"
                >
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  value={formData.capacity}
                  onChange={handleFormChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="floor"
                  className="block text-sm font-medium text-gray-400"
                >
                  Floor
                </label>
                <input
                  type="number"
                  name="floor"
                  id="floor"
                  value={formData.floor}
                  onChange={handleFormChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                />
              </div>
            </div>

            {/* Add Bed Configuration */}
            <div className="mt-6">
              <h4 className="text-lg font-medium text-primary-400 mb-4">
                Bed Configuration
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {["single", "double", "queen", "king"].map((bedType) => (
                  <div key={bedType}>
                    <label className="block text-sm font-medium text-gray-400 capitalize">
                      {bedType} Beds
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.beds[bedType] || 0}
                      onChange={(e) => handleBedChange(bedType, e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Add Features */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-400">
                Features & Amenities (comma-separated)
              </label>
              <input
                type="text"
                name="features"
                value={formData.features.join(", ")}
                onChange={handleFormChange}
                placeholder="TV, WiFi, Air Conditioning, etc."
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              />
            </div>

            {/* Add Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-400">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleFormChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-700 py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-3"
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
                <h2 className="text-xl font-bold text-white">
                  Room {room.number}
                </h2>
                <p className="text-sm text-gray-400">{room.type}</p>
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
                <h3 className="text-lg font-medium text-primary-400">
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
                    <span className="text-gray-300">Floor {room.floor}</span>
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
                    <span className="text-gray-300">
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
                    <span className="text-gray-300">
                      ${room.pricePerNight}/night
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium text-primary-400">
                    Bed Configuration
                  </h4>
                  <div className="mt-2 space-y-1">
                    {Object.entries(room.beds).map(([type, count]) => (
                      <div key={type} className="text-sm text-gray-300">
                        {count} {type} bed{count > 1 ? "s" : ""}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-primary-400">
                  Features & Amenities
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {room.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-primary-400">
                    Description
                  </h3>
                  <p className="mt-2 text-gray-300">
                    {room.description ||
                      `This ${room.type.toLowerCase()} room offers comfortable
                    accommodations for up to ${
                      room.capacity
                    } guests. Perfect for
                    ${
                      room.capacity > 2
                        ? "families or groups"
                        : "couples or solo travelers"
                    }.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetail;
