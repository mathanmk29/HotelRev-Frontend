import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserProfile = () => {
  const { user, loading, updateUserProfile } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match";
    return null;
  };

  const handleSave = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const userData = { ...formData };
    if (!userData.password) delete userData.password;
    delete userData.confirmPassword;

    const result = await updateUserProfile(userData);
    if (result.success) {
      setEditMode(false);
      setError(null);
      setSuccessMessage("Profile updated successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      setError(result.error || "Failed to update profile");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700" />
      </div>
    );

  if (!user)
    return (
      <div className="text-center p-6 bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-bold text-white">User Not Found</h2>
        <p className="mt-2 text-gray-400">Unable to load user profile</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-400">My Profile</h1>
        {!editMode && (
          <button onClick={() => setEditMode(true)} className="btn-primary">
            <svg
              className="h-5 w-5 text-primary-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <span className="ml-2">Edit Profile</span>
          </button>
        )}
      </div>

      {(successMessage || error) && (
        <div
          className={`mb-4 p-3 rounded-md animate-fade-in ${
            successMessage
              ? "bg-green-900 border-green-800"
              : "bg-red-900 border-red-800"
          }`}
        >
          <p
            className={`text-sm ${
              successMessage ? "text-green-200" : "text-red-300"
            }`}
          >
            {successMessage || error}
          </p>
        </div>
      )}

      {editMode ? (
        <div className="bg-gray-800 rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-medium text-primary-400">
              Edit Profile
            </h2>
          </div>
          <div className="p-6 space-y-5">
            {["name", "email"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleFormChange}
                  className="input-field"
                />
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["password", "confirmPassword"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {field === "password" ? "New Password" : "Confirm Password"}
                  </label>
                  <input
                    type="password"
                    name={field}
                    value={formData[field]}
                    onChange={handleFormChange}
                    className="input-field"
                    placeholder={
                      field === "password" ? "Leave blank to keep current" : ""
                    }
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setEditMode(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Profile Avatar Section */}
            <div className="flex flex-col items-center md:w-1/3">
              <div className="h-32 w-32 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center mb-4 ring-4 ring-primary-900">
                <span className="text-3xl font-bold text-primary-100">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{user.name}</h2>
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="h-5 w-5 text-primary-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-300">{user.email}</span>
              </div>
              <span className="px-4 py-1.5 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium">
                {user.role === "admin" ? "Administrator" : "Staff Member"}
              </span>
            </div>

            {/* Profile Details Section */}
            <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-gray-700 md:pl-8 pt-6 md:pt-0">
              <h3 className="text-lg font-semibold text-primary-400 mb-6 flex items-center">
                <svg
                  className="h-5 w-5 mr-2 text-primary-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="border-b border-gray-700 pb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-1">
                    Full Name
                  </h4>
                  <p className="text-white text-lg">{user.name}</p>
                </div>
                <div className="pb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-1">
                    Email Address
                  </h4>
                  <p className="text-white text-lg">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
