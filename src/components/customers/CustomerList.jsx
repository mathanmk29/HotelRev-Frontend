import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { customers } from '../../data/customers'

const CustomerList = () => {
  const [filteredCustomers, setFilteredCustomers] = useState(customers)
  const [filters, setFilters] = useState({
    vip: '',
    search: '',
    loyalty: '',
  })
  
  useEffect(() => {
    let results = [...customers]
    
    // Apply VIP filter
    if (filters.vip === 'true') {
      results = results.filter(customer => customer.vipStatus)
    } else if (filters.vip === 'false') {
      results = results.filter(customer => !customer.vipStatus)
    }
    
    // Apply loyalty filter
    if (filters.loyalty) {
      results = results.filter(customer => customer.loyalty.tier === filters.loyalty)
    }
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      results = results.filter(
        customer => 
          customer.name.toLowerCase().includes(searchLower) ||
          customer.email.toLowerCase().includes(searchLower) ||
          customer.phone.includes(filters.search)
      )
    }
    
    setFilteredCustomers(results)
  }, [filters])
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  
  const clearFilters = () => {
    setFilters({
      vip: '',
      search: '',
      loyalty: '',
    })
  }
  
  // Get unique loyalty tiers
  const loyaltyTiers = [...new Set(customers.map(customer => customer.loyalty.tier))]
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage customer information and view booking history
            </p>
          </div>
          <div>
            <Link
              to="/customers/new"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Customer
            </Link>
          </div>
        </div>
        
        {/* Filters */}
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* VIP Filter */}
            <div>
              <label htmlFor="vip" className="block text-sm font-medium text-gray-700">
                VIP Status
              </label>
              <select
                id="vip"
                name="vip"
                value={filters.vip}
                onChange={handleFilterChange}
                className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">All Customers</option>
                <option value="true">VIP Only</option>
                <option value="false">Regular Customers</option>
              </select>
            </div>
            
            {/* Loyalty Tier Filter */}
            <div>
              <label htmlFor="loyalty" className="block text-sm font-medium text-gray-700">
                Loyalty Tier
              </label>
              <select
                id="loyalty"
                name="loyalty"
                value={filters.loyalty}
                onChange={handleFilterChange}
                className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">All Tiers</option>
                {loyaltyTiers.map(tier => (
                  <option key={tier} value={tier}>
                    {tier}
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
                placeholder="Name, email, or phone..."
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
        
        {/* Customer Table */}
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <li key={customer.id}>
                <Link to={`/customers/${customer.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-800 font-medium text-lg">
                              {customer.name.split(' ').map(name => name[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-primary-600">{customer.name}</p>
                          <div className="flex mt-1">
                            <p className="text-sm text-gray-500">{customer.email}</p>
                            {customer.vipStatus && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
                                VIP
                              </span>
                            )}
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {customer.loyalty.tier}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500">{customer.phone}</p>
                        <svg className="ml-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {filteredCustomers.length === 0 && (
          <div className="p-12 text-center bg-white rounded-lg shadow">
            <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No customers found</h3>
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

export default CustomerList