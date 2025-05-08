import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getGuestsByCustomerId } from "../../data/guests";
import { customers } from "../../data/customers";

function GuestList() {
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBehavior, setSearchBehavior] = useState("guest"); // Add this line
  const navigate = useNavigate();

  // Get all guests from active customers
  useEffect(() => {
    const allGuests = customers.flatMap((customer) =>
      getGuestsByCustomerId(customer.id)
    );
    setGuests(allGuests);
  }, []);

  // Update the filtering logic
  const filteredGuests = guests.filter((guest) => {
    if (!searchTerm) return true;

    if (searchBehavior === "guest") {
      return guest.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      const customer = customers.find((c) => c.id === guest.customerId);
      return customer?.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Guest List</h1>
        <Link
          to="/guests/new"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Add Guest
        </Link>
      </div>

      {/* Search Section */}
      <div className="mb-6 relative">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder={`Search by ${
                searchBehavior === "guest" ? "guest" : "customer"
              } name...`}
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={searchBehavior}
            onChange={(e) => setSearchBehavior(e.target.value)}
            className="block w-40 py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            <option value="guest">Search Guest</option>
            <option value="customer">Search Customer</option>
          </select>
        </div>
      </div>

      {/* Guest List */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Guest Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Visit Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredGuests.map((guest) => {
              const customer = customers.find((c) => c.id === guest.customerId);
              return (
                <tr
                  key={guest.id}
                  className="cursor-pointer hover:bg-gray-700"
                  onClick={() => navigate(`/guests/${guest.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {guest.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">
                      {new Date(guest.checkIn).toLocaleDateString()} -{" "}
                      {new Date(guest.checkOut).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {customer?.name || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{guest.phone}</div>
                    <div className="text-sm text-gray-400">{guest.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/guests/${guest.id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      View Details →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GuestList;
