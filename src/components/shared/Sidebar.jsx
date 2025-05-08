import { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  UserGroupIcon,
  KeyIcon,
  UserIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition as HeadlessTransition } from "@headlessui/react";
import { useAuth } from "../../hooks/useAuth.jsx";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  const navigation = [
    { name: "Rooms", href: "/rooms", icon: KeyIcon },
    { name: "Customers", href: "/customers", icon: UserGroupIcon },
    { name: "Guests", href: "/guests", icon: UserIcon },
    // { name: "Billing", href: "/billing", icon: CreditCardIcon }, // Commented out billing
    { name: "Bookings", href: "/bookings", icon: CalendarDaysIcon },
  ];

  const finalNavigation = navigation; // Just use navigation directly

  const ProfileMenu = () => (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button
          className="w-full group flex items-center px-4 py-3 text-sm 
          font-medium rounded-lg hover:bg-gray-800 transition-all duration-200"
        >
          <div className="flex items-center flex-1">
            <div
              className="flex-shrink-0 h-9 w-9 rounded-full bg-primary-900 
              flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-primary-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
            <div className="ml-3 text-left">
              <p className="text-sm font-medium text-white group-hover:text-white">
                {user?.name || "My Profile"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email || "View profile"}
              </p>
            </div>
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute bottom-full left-0 mb-2 w-48 py-1 origin-bottom-left bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/profile"
                className={`${
                  active ? "bg-gray-700" : ""
                } block px-4 py-2 text-sm text-gray-200`}
              >
                Your Profile
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className={`${
                  active ? "bg-gray-700" : ""
                } block w-full text-left px-4 py-2 text-sm text-gray-200`}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setIsOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
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
              <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs bg-gray-900">
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
                      <XMarkIcon
                        className="w-6 h-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex items-center justify-center flex-shrink-0 h-16 px-4 bg-primary-700">
                  <h1 className="text-xl font-bold text-white">
                    Hotel Manager
                  </h1>
                </div>

                <div className="flex flex-col flex-1 h-0 overflow-y-auto">
                  <nav className="flex-1 px-2 py-4 space-y-1">
                    {finalNavigation.map((item) => {
                      const isActive =
                        location.pathname === item.href ||
                        location.pathname.startsWith(`${item.href}/`);

                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`${
                            isActive
                              ? "bg-gray-800 text-primary-400"
                              : "text-gray-300 hover:bg-gray-800 hover:text-white"
                          } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon
                            className={`${
                              isActive
                                ? "text-primary-600"
                                : "text-gray-400 group-hover:text-gray-500"
                            } mr-4 flex-shrink-0 h-6 w-6`}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                  {/* Add Profile Link at Bottom */}
                  <div className="border-t border-gray-700 p-4 mt-auto">
                    <ProfileMenu />
                  </div>
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
          <div className="flex flex-col flex-1 min-h-0 bg-gray-900 border-r border-gray-700">
            <div className="flex items-center justify-center flex-shrink-0 h-16 px-4 bg-primary-700">
              <h1 className="text-xl font-bold text-white">Hotel Hub</h1>
            </div>
            <div className="flex flex-col flex-1">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {finalNavigation.map((item) => {
                  const isActive =
                    location.pathname === item.href ||
                    location.pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        isActive
                          ? "bg-gray-800 text-primary-400"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                    >
                      <item.icon
                        className={`${
                          isActive
                            ? "text-primary-600"
                            : "text-gray-400 group-hover:text-gray-500"
                        } mr-3 flex-shrink-0 h-6 w-6`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              {/* Add Profile Link at Bottom */}
              <div className="border-t border-gray-700 p-4">
                <ProfileMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
