// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { customers, getCustomerBookingById } from "../../data/customers";
// import { rooms } from "../../data/rooms";

// const CustomerHistory = () => {
//   const { id } = useParams();
//   const [customer, setCustomer] = useState(null);
//   const [history, setHistory] = useState({ bookings: [] });
//   const [loading, setLoading] = useState(true);
//   const [filterStatus, setFilterStatus] = useState("all");

//   useEffect(() => {
//     // Find customer by ID
//     const foundCustomer = customers.find((c) => c.id === id);

//     if (foundCustomer) {
//       setCustomer(foundCustomer);

//       // Get customer booking
//       const customerBooking = getCustomerBookingById(id);
//       setHistory(customerBooking);
//     }

//     setLoading(false);
//   }, [id]);

//   const filteredBookings = history.bookings
//     .filter((booking) => {
//       // Remove payment status filter
//       return true;
//     })
//     .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));

//   // Get room details for a booking
//   const getRoomDetails = (roomId) => {
//     return rooms.find((r) => r.id === roomId) || {};
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
//       </div>
//     );
//   }

//   if (!customer) {
//     return (
//       <div className="text-center p-12 bg-white rounded-lg shadow">
//         <h2 className="text-2xl font-bold text-gray-900">Customer Not Found</h2>
//         <p className="mt-2 text-gray-500">
//           The customer you're looking for doesn't exist.
//         </p>
//         <div className="mt-6">
//           <Link
//             to="/customers"
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//           >
//             Back to Customer List
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="animate-fade-in">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//         <div className="flex-1">
//           <Link
//             to={`/customers/${id}`}
//             className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
//           >
//             <svg
//               className="w-5 h-5 mr-1"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//               aria-hidden="true"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             Back to Customer
//           </Link>
//           <h1 className="mt-2 text-2xl font-bold text-gray-900">
//             {customer.name}'s Bookings
//           </h1>
//         </div>
//       </div>

//       {/* Customer Info */}
//       <div className="mt-6 bg-white rounded-lg shadow-sm p-4 flex items-center">
//         <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
//           <span className="text-primary-800 font-medium">
//             {customer.name
//               .split(" ")
//               .map((name) => name[0])
//               .join("")}
//           </span>
//         </div>
//         <div className="ml-4">
//           <h2 className="text-lg font-medium text-gray-900">{customer.name}</h2>
//           <p className="text-sm text-gray-500">
//             {customer.email} • {customer.phone}
//           </p>
//         </div>
//         <div className="ml-auto flex items-center">
//           <div className="text-right"></div>
//           <div className="ml-4 flex-shrink-0"></div>
//         </div>
//       </div>

//       {/* History Header & Filter */}
//       <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between">
//         <h2 className="text-lg font-medium text-gray-900">
//           All Bookings
//           <span className="ml-2 text-sm font-normal text-gray-500">
//             ({history.bookings.length} total)
//           </span>
//         </h2>

//         <div className="mt-4 md:mt-0">
//           <select
//             id="status-filter"
//             name="status-filter"
//             className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//           >
//             <option value="all">All Bookings</option>
//             <option value="confirmed">Confirmed</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//         </div>
//       </div>

//       {/* Booking History */}
//       <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
//         {filteredBookings.length > 0 ? (
//           <ul className="divide-y divide-gray-200">
//             {filteredBookings.map((booking) => {
//               const roomDetails = getRoomDetails(booking.roomId);
//               const nights = Math.round(
//                 (new Date(booking.checkOut) - new Date(booking.checkIn)) /
//                   (1000 * 60 * 60 * 24)
//               );

//               return (
//                 <li key={booking.id}>
//                   <div className="px-4 py-4 sm:px-6">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0">
//                           <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
//                             <svg
//                               className="h-6 w-6 text-gray-600"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                               />
//                             </svg>
//                           </div>
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-primary-600">
//                             Room {roomDetails.number || "Unknown"} -{" "}
//                             {roomDetails.type || "Unknown"}
//                           </div>
//                           <div className="flex mt-2 text-sm text-gray-500">
//                             <div className="flex items-center mr-4">
//                               <svg
//                                 className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                               Check-in:{" "}
//                               {new Date(booking.checkIn).toLocaleDateString()}
//                             </div>
//                             <div className="flex items-center">
//                               <svg
//                                 className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                               Check-out:{" "}
//                               {new Date(booking.checkOut).toLocaleDateString()}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-end">
//                         <div className="flex items-center">
//                           <div className="text-sm text-gray-500 mr-2">
//                             {nights} night{nights !== 1 ? "s" : ""}
//                           </div>
//                           <div className="text-sm font-medium text-gray-900">
//                             ${booking.totalAmount}
//                           </div>
//                         </div>
//                         {/* Remove payment status badge */}
//                       </div>
//                     </div>
//                     <div className="mt-4 sm:flex sm:justify-between">
//                       <div className="sm:flex">
//                         <div className="text-sm text-gray-500">
//                           Confirmation #:{" "}
//                           {booking.id.replace("booking-", "CNF-")}
//                         </div>
//                       </div>
//                       <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
//                         <button className="text-primary-600 hover:text-primary-900 mr-4">
//                           View Details
//                         </button>
//                         {booking.paymentStatus === "pending" && (
//                           <button className="text-primary-600 hover:text-primary-900">
//                             Process Payment
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <div className="px-4 py-12 text-center">
//             <svg
//               className="mx-auto h-12 w-12 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <h3 className="mt-2 text-sm font-medium text-gray-900">
//               No bookings found
//             </h3>
//             <p className="mt-1 text-sm text-gray-500">
//               {filterStatus === "all"
//                 ? "This customer has no booking history yet."
//                 : `No ${filterStatus} bookings found.`}
//             </p>
//             {filterStatus !== "all" && (
//               <div className="mt-6">
//                 <button
//                   type="button"
//                   onClick={() => setFilterStatus("all")}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//                 >
//                   View All Bookings
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomerHistory;
