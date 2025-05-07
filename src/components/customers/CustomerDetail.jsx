import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { customers } from '../../data/customers'
import { getCustomerHistoryById } from '../../data/customers'
import { rooms } from '../../data/rooms'

const CustomerDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [customer, setCustomer] = useState(null)
  const [history, setHistory] = useState({ bookings: [] })
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    vipStatus: false,
  })
  
  useEffect(() => {
    // Find customer by ID
    const foundCustomer = customers.find(c => c.id === id)
    
    if (foundCustomer) {
      setCustomer(foundCustomer)
      setFormData({
        name: foundCustomer.name,
        email: foundCustomer.email,
        phone: foundCustomer.phone,
        address: foundCustomer.address,
        vipStatus: foundCustomer.vipStatus,
      })
      
      // Get customer history
      const customerHistory = getCustomerHistoryById(id)
      setHistory(customerHistory)
    }
    
    setLoading(false)
  }, [id])
  
  const handleFormChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const name = e.target.name
    
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  
  const handleSave = () => {
    // In a real app, this would send data to the server
    // For demo, we'll just update the local state
    setCustomer(prev => ({
      ...prev,
      ...formData,
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
  
  if (!customer) {
    return (
      <div className="text-center p-12 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900">Customer Not Found</h2>
        <p className="mt-2 text-gray-500">The customer you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link
            to="/customers"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Back to Customer List
          </Link>
        </div>
      </div>
    )
  }
  
  // Get room number for bookings
  const getRoomNumber = (roomId) => {
    const room = rooms.find(r => r.id === roomId)
    return room ? room.number : 'Unknown'
  }
  
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <Link
            to="/customers"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Customers
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Customer Profile</h1>
        </div>
        <div className="flex mt-4 space-x-3 md:mt-0">
          <button
            onClick={() => setEditMode(!editMode)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {editMode ? 'Cancel' : 'Edit Profile'}
          </button>
          <Link
            to={`/customers/${id}/history`}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            View Full History
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 mt-6 gap-x-8 gap-y-8 lg:grid-cols-3">
        {/* Customer Profile */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-800 font-medium text-lg">
                    {customer.name.split(' ').map(name => name[0]).join('')}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {customer.name}
                    {customer.vipStatus && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
                        VIP
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Joined on {new Date(customer.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            
            {editMode ? (
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleFormChange}
                      className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="vipStatus"
                        name="vipStatus"
                        type="checkbox"
                        checked={formData.vipStatus}
                        onChange={handleFormChange}
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="vipStatus" className="font-medium text-gray-700">VIP Status</label>
                      <p className="text-gray-500">Mark as VIP for special treatment and privileges</p>
                    </div>
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
                </form>
              </div>
            ) : (
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.email}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.phone}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.address}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Loyalty Program</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                          customer.loyalty.tier === 'Platinum' ? 'bg-purple-100' :
                          customer.loyalty.tier === 'Gold' ? 'bg-yellow-100' :
                          customer.loyalty.tier === 'Silver' ? 'bg-gray-100' :
                          'bg-amber-100'
                        } ${
                          customer.loyalty.tier === 'Platinum' ? 'text-purple-800' :
                          customer.loyalty.tier === 'Gold' ? 'text-yellow-800' :
                          customer.loyalty.tier === 'Silver' ? 'text-gray-800' :
                          'text-amber-800'
                        }`}>
                          <span className="text-xs font-medium">{customer.loyalty.tier[0]}</span>
                        </div>
                        <span className="ml-2 font-medium">{customer.loyalty.tier} Tier</span>
                        <span className="ml-2 text-gray-500">({customer.loyalty.points} points)</span>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
        
        {/* Booking History & Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Bookings</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Last {history.bookings.length} bookings for this customer.</p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {history.bookings.length > 0 ? (
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {history.bookings.map((booking) => (
                      <li key={booking.id} className="py-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Room {getRoomNumber(booking.roomId)}</h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-sm font-medium text-gray-900">${booking.totalAmount}</p>
                            <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              booking.paymentStatus === 'paid' ? 'bg-success-100 text-success-800' : 'bg-warning-100 text-warning-800'
                            }`}>
                              {booking.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No booking history for this customer.</p>
              )}
              
              {history.bookings.length > 0 && (
                <div className="mt-6">
                  <Link
                    to={`/customers/${id}/history`}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-primary-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                  >
                    View all booking history
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  New Booking
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Process Payment
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Report
                </button>
              </div>
              
              {customer.vipStatus && (
                <div className="mt-6 p-4 bg-accent-50 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-accent-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-accent-800">VIP Benefits</h3>
                      <div className="mt-2 text-sm text-accent-700">
                        <p>This customer has VIP status and is eligible for:</p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Complimentary room upgrades</li>
                          <li>Priority check-in and check-out</li>
                          <li>Welcome package upon arrival</li>
                          <li>Late check-out when available</li>
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

export default CustomerDetail