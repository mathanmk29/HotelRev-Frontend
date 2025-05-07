import React from 'react'
import { useParams } from 'react-router-dom'

function Invoice() {
  const { id } = useParams()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice #{id}</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <p>Invoice details will go here</p>
      </div>
    </div>
  )
}

export default Invoice