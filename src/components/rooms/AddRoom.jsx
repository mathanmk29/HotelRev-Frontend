import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { roomStatuses, roomTypes, addRoom } from "../../data/rooms";

export default function AddRoom() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    number: "",
    status: "available",
    type: roomTypes[0], // Set default to first room type
    pricePerNight: 0,
    capacity: 1,
    floor: 1,
    features: [],
    beds: {
      single: 0,
      double: 0,
    },
    description: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoom = addRoom({
      ...formData,
      description:
        formData.description ||
        `A comfortable ${formData.type.toLowerCase()} room.`,
    });
    navigate(`/rooms/${newRoom.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Room</h1>
          <p className="text-gray-400">Create a new room with all details</p>
        </div>
        <button
          onClick={() => navigate("/rooms")}
          className="inline-flex items-center px-3 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
        >
          <svg
            className="w-5 h-5 mr-2"
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
        </button>
      </div>

      <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
        {/* Form Header */}
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-medium text-white">Room Information</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Room Number
              </label>
              <input
                type="text"
                name="number"
                required
                value={formData.number}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
                placeholder="101"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Room Type
              </label>
              <select
                name="type"
                required
                value={formData.type}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
              >
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Price per Night ($)
              </label>
              <input
                type="number"
                name="pricePerNight"
                required
                min="0"
                value={formData.pricePerNight}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                required
                min="1"
                value={formData.capacity}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Floor
              </label>
              <input
                type="number"
                name="floor"
                required
                min="1"
                value={formData.floor}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
              >
                {roomStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bed Configuration - Modified */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-primary-400 mb-4">
              Bed Configuration
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {["single", "double"].map((bedType) => (
                <div key={bedType}>
                  <label className="block text-sm font-medium text-gray-400 capitalize">
                    {bedType} Beds
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.beds[bedType]}
                    onChange={(e) => handleBedChange(bedType, e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Features & Amenities (comma-separated)
            </label>
            <input
              type="text"
              name="features"
              value={formData.features.join(", ")}
              onChange={handleFormChange}
              placeholder="TV, WiFi, Air Conditioning, etc."
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleFormChange}
              placeholder={`A comfortable ${formData.type.toLowerCase()} room.`}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={() => navigate("/rooms")}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
