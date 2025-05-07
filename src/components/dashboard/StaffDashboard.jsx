import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { rooms, getStatusByValue } from '../../data/rooms'
import { customerHistory } from '../../data/customers'

const StaffDashboard = () => {
  const [todayCheckIns, setTodayCheckIns] = useState([])
  const [todayCheckOuts, setTodayCheckOuts] = useState([])
  const [availableRooms, setAvailableRooms] = useState([])
  
  useEffect(() => {
    // Get today's check-ins and check-outs (for demo purposes, using mocked data)
    const today = new Date().toISOString().split('T')[0]
    
    // Get all bookings
    const allBookings = customerHistory.flatMap(ch => 
      ch.bookings.map(booking => ({
        ...booking,
        customerId: ch.customerId,
      }))
    )
    
    // Filter for today's check-ins
    const checkIns = allBookings.filter(booking => 
      booking.checkIn.split('T')[0] === today
    )
    
    // Filter for today's check-outs
    const checkOuts = allBookings.filter(booking => 
      booking.checkOut.split('T')[0] === today
    )
    
    setTodayCheckIns(checkIns)
    setTodayCheckOuts(checkOuts)
    
    // Get available rooms
    const available = rooms.filter(room => room.status === 'available')
    setAvailableRooms(available)
  }, [])
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Staff Dashboard</h1>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/guests/new"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow transition-shadow"
          >
            <div className="p-3 mb-4 bg-primary-100 rounded-full">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">New Check-in</h3>
          </Link>
          
          <Link
            to="/guests"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow transition-shadow"
          >
            <div className="p-3 mb-4 bg-accent-100 rounded-full">
              <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Process Check-out</h3>
          </Link>
          
          <Link
            to="/rooms"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow transition-shadow"
          >
            <div className="p-3 mb-4 bg-secondary-100 rounded-full">
              <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">View Rooms</h3>
          </Link>
          
          <Link
            to="/billing"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow transition-shadow"
          >
            <div className="p-3 mb-4 bg-success-100 rounded-full">
              <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Process Payment</h3>
          </Link>
        </div>
        
        {/* Today's Overview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Available Rooms */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900">Available Rooms ({availableRooms.length})</h2>
            <div className="mt-4 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Room</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Capacity</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {availableRooms.slice(0, 4).map((room) => (
                        <tr key={room.id}>
                          <td className="py-4 pl-4 pr-3 whitespace-nowrap text-sm font-medium text-gray-900 sm:pl-0">
                            {room.number}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{room.type}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{room.capacity}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">${room.pricePerNight}</td>
                          <td className="relative py-4 pl-3 pr-4 text-right whitespace-nowrap text-sm font-medium sm:pr-0">
                            <Link to={`/rooms/${room.id}`} className="text-primary-600 hover:text-primary-900">
                              View<span className="sr-only">, {room.number}</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {availableRooms.length > 4 && (
                    <div className="flex justify-center mt-4">
                      <Link to="/rooms" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                        View all available rooms
                      </Link>
                    </div>
                  )}
                  
                  {availableRooms.length === 0 && (
                    <p className="py-4 text-sm text-gray-500 text-center">No available rooms</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Today's Check-ins & Check-outs */}
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="pb-5 border-b border-gray-200">
              <div className="sm:flex sm:items-center sm:justify-between">
                <h2 className="text-lg font-medium text-gray-900">Today's Activities</h2>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="mb-6">
                <h3 className="text-base font-medium text-gray-900">Check-ins ({todayCheckIns.length})</h3>
                {todayCheckIns.length > 0 ? (
                  <ul className="mt-3 divide-y divide-gray-100">
                    {todayCheckIns.slice(0, 3).map((checkIn) => (
                      <li key={checkIn.id} className="py-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Room {rooms.find(r => r.id === checkIn.roomId)?.number || 'Unknown'}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(checkIn.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <Link
                            to={`/customers/${checkIn.customerId}`}
                            className="text-sm font-medium text-primary-600 hover:text-primary-500"
                          >
                            View
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-gray-500">No check-ins scheduled for today</p>
                )}
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-900">Check-outs ({todayCheckOuts.length})</h3>
                {todayCheckOuts.length > 0 ? (
                  <ul className="mt-3 divide-y divide-gray-100">
                    {todayCheckOuts.slice(0, 3).map((checkOut) => (
                      <li key={checkOut.id} className="py-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Room {rooms.find(r => r.id === checkOut.roomId)?.number || 'Unknown'}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(checkOut.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <Link
                            to={`/customers/${checkOut.customerId}`}
                            className="text-sm font-medium text-primary-600 hover:text-primary-500"
                          >
                            View
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-gray-500">No check-outs scheduled for today</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffDashboard