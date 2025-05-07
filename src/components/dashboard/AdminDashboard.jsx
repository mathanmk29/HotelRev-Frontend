import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  UserGroupIcon, 
  KeyIcon, 
  CreditCardIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { rooms } from '../../data/rooms'
import { customers, customerHistory } from '../../data/customers'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    occupancy: 0,
    revenue: 0,
    bookings: 0,
    customers: 0,
  })
  
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  })
  
  useEffect(() => {
    // Calculate stats
    const totalRooms = rooms.length
    const occupiedRooms = rooms.filter(room => room.status === 'occupied').length
    
    // Calculate occupancy percentage
    const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100)
    
    // Calculate total revenue
    const allBookings = customerHistory.flatMap(ch => ch.bookings)
    const totalRevenue = allBookings.reduce((sum, booking) => sum + booking.totalAmount, 0)
    
    // Set stats
    setStats({
      occupancy: occupancyRate,
      revenue: totalRevenue,
      bookings: allBookings.length,
      customers: customers.length,
    })
    
    // Generate revenue data for chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const revenueByMonth = months.map((_, index) => Math.random() * 10000 + 5000)
    
    setRevenueData({
      labels: months,
      datasets: [
        {
          label: 'Revenue',
          data: revenueByMonth,
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
        },
      ],
    })
  }, [])
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue (2024)',
      },
    },
  }
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Occupancy Rate */}
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <KeyIcon className="w-6 h-6 text-primary-600" aria-hidden="true" />
                </div>
                <div className="flex-1 w-0 ml-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Occupancy Rate</dt>
                    <dd>
                      <div className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.occupancy}%</div>
                        <div className="flex items-baseline ml-2 text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="flex-shrink-0 w-5 h-5 self-center" aria-hidden="true" />
                          <span className="sr-only">Increased by</span>
                          5%
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-50">
              <div className="text-sm">
                <Link to="/rooms" className="font-medium text-primary-700 hover:text-primary-900">
                  View all rooms
                </Link>
              </div>
            </div>
          </div>
          
          {/* Total Revenue */}
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CreditCardIcon className="w-6 h-6 text-primary-600" aria-hidden="true" />
                </div>
                <div className="flex-1 w-0 ml-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                    <dd>
                      <div className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">${stats.revenue.toLocaleString()}</div>
                        <div className="flex items-baseline ml-2 text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="flex-shrink-0 w-5 h-5 self-center" aria-hidden="true" />
                          <span className="sr-only">Increased by</span>
                          12%
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-50">
              <div className="text-sm">
                <Link to="/billing" className="font-medium text-primary-700 hover:text-primary-900">
                  View billing
                </Link>
              </div>
            </div>
          </div>
          
          {/* Bookings */}
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CalendarIcon className="w-6 h-6 text-primary-600" aria-hidden="true" />
                </div>
                <div className="flex-1 w-0 ml-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                    <dd>
                      <div className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.bookings}</div>
                        <div className="flex items-baseline ml-2 text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="flex-shrink-0 w-5 h-5 self-center" aria-hidden="true" />
                          <span className="sr-only">Increased by</span>
                          8%
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-50">
              <div className="text-sm">
                <Link to="/bookings" className="font-medium text-primary-700 hover:text-primary-900">
                  View all bookings
                </Link>
              </div>
            </div>
          </div>
          
          {/* Customers */}
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="w-6 h-6 text-primary-600" aria-hidden="true" />
                </div>
                <div className="flex-1 w-0 ml-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                    <dd>
                      <div className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.customers}</div>
                        <div className="flex items-baseline ml-2 text-sm font-semibold text-red-600">
                          <ArrowDownIcon className="flex-shrink-0 w-5 h-5 self-center" aria-hidden="true" />
                          <span className="sr-only">Decreased by</span>
                          3%
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-50">
              <div className="text-sm">
                <Link to="/customers" className="font-medium text-primary-700 hover:text-primary-900">
                  View all customers
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Revenue Chart */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900">Revenue Overview</h2>
          <div className="mt-4 h-80">
            <Bar options={chartOptions} data={revenueData} />
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="flow-root mt-6">
            <ul className="-my-5 divide-y divide-gray-200">
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full">
                      <KeyIcon className="w-5 h-5 text-primary-600" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Room 302 marked as occupied</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                      <CreditCardIcon className="w-5 h-5 text-green-600" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">New payment received ($320)</p>
                    <p className="text-sm text-gray-500">4 hours ago</p>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 bg-accent-100 rounded-full">
                      <UserGroupIcon className="w-5 h-5 text-accent-600" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">New customer registered</p>
                    <p className="text-sm text-gray-500">Yesterday</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <Link
              to="/activity"
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-primary-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              View all
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard