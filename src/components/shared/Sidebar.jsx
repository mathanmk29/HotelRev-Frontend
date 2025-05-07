import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  HomeIcon,
  UserGroupIcon,
  KeyIcon,
  UserIcon,
  CreditCardIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '../../hooks/useAuth'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth()
  const location = useLocation()
  
  const isAdmin = user?.role === 'admin'
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Rooms', href: '/rooms', icon: KeyIcon },
    { name: 'Customers', href: '/customers', icon: UserGroupIcon },
    { name: 'Guests', href: '/guests', icon: UserIcon },
    { name: 'Billing', href: '/billing', icon: CreditCardIcon },
  ]
  
  const adminNavigation = [
    { name: 'Reports', href: '/reports', icon: ChartBarIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ]
  
  const finalNavigation = isAdmin 
    ? [...navigation, ...adminNavigation] 
    : navigation
  
  return (
    <>
      {/* Mobile Sidebar */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 pt-2 -mr-12">
                    <button
                      type="button"
                      className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="w-6 h-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                
                <div className="flex items-center justify-center flex-shrink-0 h-16 px-4 bg-primary-700">
                  <h1 className="text-xl font-bold text-white">Hotel Manager</h1>
                </div>
                
                <div className="flex flex-col flex-1 h-0 overflow-y-auto">
                  <nav className="flex-1 px-2 py-4 space-y-1">
                    {finalNavigation.map((item) => {
                      const isActive = location.pathname === item.href || 
                                      location.pathname.startsWith(`${item.href}/`)
                      
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`${
                            isActive
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon
                            className={`${
                              isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                            } mr-4 flex-shrink-0 h-6 w-6`}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
            <div className="flex items-center justify-center flex-shrink-0 h-16 px-4 bg-primary-700">
              <h1 className="text-xl font-bold text-white">Hotel Manager</h1>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {finalNavigation.map((item) => {
                  const isActive = location.pathname === item.href || 
                                    location.pathname.startsWith(`${item.href}/`)
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                    >
                      <item.icon
                        className={`${
                          isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                        } mr-3 flex-shrink-0 h-6 w-6`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar