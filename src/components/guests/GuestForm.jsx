import React from "react";
import { useParams } from "react-router-dom";

function GuestForm() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Guest" : "New Guest"}
      </h1>
      <div className="bg-white rounded-lg shadow p-4">
        {/* Guest form content will be implemented later */}
        <p>Guest form coming soon...</p>
      </div>
    </div>
  );
}

export default GuestForm;
