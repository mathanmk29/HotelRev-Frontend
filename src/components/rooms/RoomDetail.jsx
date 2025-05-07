import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { rooms, getStatusByValue } from '../../data/rooms'

const RoomDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('details')
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    status: '',
    pricePerNight: 0,
  })
  
  useEffect(() => {
    // Find room by ID
    const foundRoom = rooms.find(r => r.id === id)
    
    if (foundRoom) {
      setRoom(foundRoom)
      setFormData({
        status: foundRoom.status,
        pricePerNight: foundRoom.pricePerNight,
      })
    }
    
    setLoading(false)
  }, [id])
  
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }
  
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pricePerNight' ? parseFloat(value) : value,
    }))
  }
  
  const handleSave = () => {
    // In a real app, this would send data to the server
    // For demo, we'll just update the local state
    setRoom(prev => ({
      ...prev,
      status: formData.status,
      pricePerNight: formData.pricePerNight,
    }))
    
    setEditMode(false)
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
      </div>
    )
  }
  
  if (!room) {
    return (
      <div className="text-center p-12 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900">Room Not Found</h2>
        <p className="mt-2 text-gray-500">The room you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link
            to="/rooms"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Back to Room List
          </Link>
        </div>
      </div>
    )
  }
  
  const status = getStatusByValue(room.status)
  
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <Link
            to="/rooms"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Rooms
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Room {room.number} Details</h1>
        </div>
        <div className="flex mt-4 space-x-3 md:mt-0">
          <button
            onClick={() => setEditMode(!editMode)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {editMode ? 'Cancel' : 'Edit Room'}
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Book Room
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 mt-6 gap-x-8 gap-y-8 lg:grid-cols-3">
        {/* Left Column - Room Image & Basic Info */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="relative h-64 bg-gray-200">
              <img
                src={room.image}
                alt={`Room ${room.number}`}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-3 right-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color.replace('bg-', 'bg-opacity-90 text-white bg-')}`}>
                  {status.label}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Room {room.number}</h2>
                <p className="text-lg font-bold text-gray-900">${room.pricePerNight}<span className="text-sm text-gray-500">/night</span></p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{room.type}</p>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span className="text-gray-700">Floor {room.floor}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span className="text-gray-700">Capacity: {room.capacity} people</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                  <span className="text-gray-700">Bed Configuration:</span>
                </div>
                <div className="pl-7 space-y-1">
                  {Object.entries(room.beds).map(([type, count]) => (
                    <div key={type} className="text-sm text-gray-700">
                      {count} {type} bed{count > 1 ? 's' : ''}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Tabs & Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px" aria-label="Tabs">
                <button
                  onClick={() => handleTabChange('details')}
                  className={`${
                    activeTab === 'details'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                >
                  Details & Amenities
                </button>
                <button
                  onClick={() => handleTabChange('availability')}
                  className={`${
                    activeTab === 'availability'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                >
                  Availability
                </button>
                <button
                  onClick={() => handleTabChange('maintenance')}
                  className={`${
                    activeTab === 'maintenance'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                >
                  Maintenance
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {/* Details & Amenities Tab */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {editMode ? (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleFormChange}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                        >
                          <option value="available">Available</option>
                          <option value="occupied">Occupied</option>
                          <option value="maintenance">Under Maintenance</option>
                          <option value="reserved">Reserved</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700">
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
                    <>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Features & Amenities</h3>
                        <div className="mt-4 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-2">
                          {room.features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <svg className="h-5 w-5 text-success-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Room Description</h3>
                        <div className="mt-2 text-gray-700">
                          <p>
                            This spacious {room.type.toLowerCase()} room offers comfortable accommodations for up to {room.capacity} guests. 
                            With modern amenities and a {room.features.includes('Sea View') ? 'beautiful sea view' : 'pleasant atmosphere'}, 
                            this room provides everything needed for a relaxing stay.
                          </p>
                          <p className="mt-2">
                            Perfect for {room.capacity > 2 ? 'families or groups' : 'couples or solo travelers'}, 
                            the room features {Object.entries(room.beds).map(([type, count], index, arr) => 
                              `${count} ${type} bed${count > 1 ? 's' : ''}${index < arr.length - 1 ? ', ' : ''}`
                            )}.
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Policies</h3>
                        <div className="mt-2 space-y-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-gray-900">Check-in/Check-out</h4>
                              <p className="text-sm text-gray-500">Check-in time: 3:00 PM, Check-out time: 11:00 AM</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-gray-900">Cancellation Policy</h4>
                              <p className="text-sm text-gray-500">Free cancellation up to 48 hours before check-in.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {/* Availability Tab */}
              {activeTab === 'availability' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Availability Calendar</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    View and manage room availability for the upcoming months.
                  </p>
                  
                  <div className="mt-6 bg-gray-100 p-6 rounded-lg flex justify-center items-center h-64">
                    <p className="text-gray-500">Calendar view is not available in the demo.</p>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-900">Upcoming Reservations</h4>
                    <div className="mt-2">
                      {room.status === 'available' ? (
                        <p className="text-sm text-gray-500">No upcoming reservations for this room.</p>
                      ) : (
                        <div className="bg-white shadow overflow-hidden sm:rounded-md">
                          <ul className="divide-y divide-gray-200">
                            <li>
                              <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-primary-600 truncate">
                                    Emma Johnson
                                  </p>
                                  <div className="ml-2 flex-shrink-0 flex">
                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      Confirmed
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                  <div className="sm:flex">
                                    <p className="flex items-center text-sm text-gray-500">
                                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                      </svg>
                                      3 nights
                                    </p>
                                  </div>
                                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    <p>
                                      Mar 8, 2024 - Mar 11, 2024
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Maintenance Tab */}
              {activeTab === 'maintenance' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Maintenance Records</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Track maintenance history and schedule upcoming maintenance.
                  </p>
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-md font-medium text-gray-900">Recent Maintenance</h4>
                      <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Schedule Maintenance
                      </button>
                    </div>
                    
                    {room.status === 'maintenance' ? (
                      <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                          <li>
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-primary-600 truncate">
                                  Regular Maintenance
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    In Progress
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                  <p className="flex items-center text-sm text-gray-500">
                                    Plumbing fixture replacement
                                  </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                  </svg>
                                  <p>
                                    Expected completion: Mar 7, 2024
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <p className="mt-4 text-sm text-gray-500">No current or scheduled maintenance.</p>
                    )}
                    
                    <div className="mt-6">
                      <h4 className="text-md font-medium text-gray-900">Maintenance History</h4>
                      <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                          <li>
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  HVAC Service
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Completed
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                  <p className="flex items-center text-sm text-gray-500">
                                    Air conditioning system maintenance
                                  </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <p>
                                    Jan 15, 2024
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  Deep Cleaning
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Completed
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                  <p className="flex items-center text-sm text-gray-500">
                                    Thorough cleaning of all surfaces and furniture
                                  </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <p>
                                    Dec 5, 2023
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetail