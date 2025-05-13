import { Link } from 'react-router-dom'
import { getStatusByValue } from '../../data/rooms'

const RoomCard = ({ room }) => {
  const status = getStatusByValue(room.status)
  
  return (
    <div className="overflow-hidden transition-shadow duration-200 bg-gray-800 rounded-lg shadow hover:shadow-md">
      <div className="relative h-48 bg-gray-700">
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
          <h3 className="text-lg font-medium text-white">Room {room.number}</h3>
          <p className="text-lg font-semibold text-white">${room.pricePerNight}<span className="text-sm text-gray-400">/night</span></p>
        </div>

        
        <div className="mt-3">
          <div className="flex items-center text-sm text-gray-300">
            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Floor {room.floor}
          </div>
          <div className="flex items-center mt-1 text-sm text-gray-300">
            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Capacity: {room.capacity}
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex flex-wrap gap-1">
            {room.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-200">
                {feature}
              </span>
            ))}
            {room.features.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-200">
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
}

export default RoomCard