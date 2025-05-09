import { Link } from "react-router-dom";
import { FaHotel, FaUserFriends, FaCalendarAlt } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

function Landing() {
  const { user } = useAuth();
  return (
    <div className="text-white">
      {/* Header */}
      <header className="bg-black py-4 px-6 fixed w-full z-10 shadow-lg border-b border-primary-500">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <Link to="" className="text-2xl font-bold">
                <span className="text-primary-500">Room</span>
                <span className="text-white">Stack</span>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/login"
                className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Hero Section */}
      <section className="h-screen bg-black flex items-center">
        <div className="container mx-auto px-6 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              <span className="text-primary-400">Room</span>Stack Management
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Streamlined hotel operations management that saves time and
              increases efficiency
            </p>
            <div>
              <Link
                to="/login"
                className="bg-primary-600 hover:bg-primary-700 px-8 py-4 text-lg rounded-lg font-medium transition-all inline-block shadow-lg shadow-primary-900/30"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-gray-900">
        <div className="container mx-auto px-6 pt-24 pb-16">
          <h2 className="text-4xl font-bold text-center text-primary-400 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 transform hover:-translate-y-2 shadow-lg border border-gray-700">
              <div className="w-14 h-14 mb-5 flex items-center justify-center bg-primary-600 rounded-lg text-xl shadow-md mx-auto">
                <FaHotel />
              </div>
              <h3 className="text-xl font-semibold text-primary-400 mb-3 text-center">
                Room Management
              </h3>
              <p className="text-gray-300 text-center">
                Complete oversight of room inventory, maintenance schedules, and
                availability status
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 transform hover:-translate-y-2 shadow-lg border border-gray-700">
              <div className="w-14 h-14 mb-5 flex items-center justify-center bg-primary-600 rounded-lg text-xl shadow-md mx-auto">
                <FaUserFriends />
              </div>
              <h3 className="text-xl font-semibold text-primary-400 mb-3 text-center">
                Guest Profiles
              </h3>
              <p className="text-gray-300 text-center">
                Detailed guest history, preferences, and communication
                management for personalized service
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 transform hover:-translate-y-2 shadow-lg border border-gray-700">
              <div className="w-14 h-14 mb-5 flex items-center justify-center bg-primary-600 rounded-lg text-xl shadow-md mx-auto">
                <FaCalendarAlt />
              </div>
              <h3 className="text-xl font-semibold text-primary-400 mb-3 text-center">
                Booking System
              </h3>
              <p className="text-gray-300 text-center">
                Streamlined reservation management with automated confirmation
                and payment processing
              </p>
            </div>
          </div>

          <div className="text-center mb-8">
            <Link
              to="/register"
              className="bg-primary-600 hover:bg-primary-700 px-7 py-3 text-lg rounded-lg font-medium inline-block shadow-lg shadow-primary-900/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Join Us
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-700">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-white">
                  <span className="text-primary-400">Room</span>Stack
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Modern room management solution
                </p>
              </div>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Contact
                </a>
              </div>
              <p className="text-gray-500 text-sm mt-4 md:mt-0">
                &copy; {new Date().getFullYear()} RoomStack. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default Landing;
