import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { rooms, roomTypes, roomStatuses, getStatusByValue } from '../../data/rooms'

const RoomList = () => {
  const [filteredRooms, setFilteredRooms] = useState(rooms)
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    floor: '',
    search: '',
  })
  
  useEffect(() => {
    let results = [...rooms]
    
    // Apply status filter
    if (filters.status) {
      results = results.filter(room => room.status === filters.status)
    }
    
    // Apply type filter
    if (filters.type) {
      results = results.filter(room => room.type === filters.type)
    }
    
    // Apply floor filter
    if (filters.floor) {
      results = results.filter(room => room.floor === parseInt(filters.floor))
    }
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      results = results.filter(
        room => 
          room.number.toLowerCase().includes(searchLower) ||
          room.type.toLowerCase().includes(searchLower)
      )
    }
    
    setFilteredRooms(results)
  }, [filters])
  
  // Get unique floors
  const floors = [...new Set(rooms.map(room => room.floor))].sort((a, b) => a - b)
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  
  const clearFilters = () => {
    setFilters({
      status: '',
      type: '',
      floor: '',
      search: '',
    })
  }
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage all rooms and their availability
            </p>
          </div>
          <div>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Room
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">All Statuses</option>
                {roomStatuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Type Filter */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Room Type
              </label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">All Types</option>
                {roomTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Floor Filter */}
            <div>
              <label htmlFor="floor" className="block text-sm font-medium text-gray-700">
                Floor
              </label>
              <select
                id="floor"
                name="floor"
                value={filters.floor}
                onChange={handleFilterChange}
                className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">All Floors</option>
                {floors.map(floor => (
                  <option key={floor} value={floor}>
                    Floor {floor}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                type="text"
                name="search"
                id="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Room number or type..."
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>
          
          {/* Clear Filters */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        {/* Room Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => {
            const status = getStatusByValue(room.status)
            
            return (
              <div
                key={room.id}
                className="overflow-hidden transition-shadow duration-200 bg-white rounded-lg shadow hover:shadow-md"
              >
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={room.image}
                    alt={`Room ${room.number}`}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color.replace('bg-', 'bg-opacity-90 text-white bg-')}`}>
                      {status.label}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Room {room.number}</h3>
                    <p className="text-lg font-semibold text-gray-900">${room.pricePerNight}<span className="text-sm text-gray-500">/night</span></p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{room.type}</p>
                  
                  <div className="mt-3">
                    <div className="flex items-center text-sm text-gray-700">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      Floor {room.floor}
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-700">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      Capacity: {room.capacity}
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {room.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {feature}
                        </span>
                      ))}
                      {room.features.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{room.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-5">
                    <Link
                      to={`/rooms/${room.id}`}
                      className="inline-flex w-full justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {filteredRooms.length === 0 && (
          <div className="p-12 text-center bg-white rounded-lg shadow">
            <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No rooms found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            <div className="mt-6">
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoomList