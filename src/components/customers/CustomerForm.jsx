import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { customers } from "../../data/customers";

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    currentGuest: true, // Set to true by default
  });

  useEffect(() => {
    if (id) {
      const customer = customers.find((customer) => customer.id === id);
      if (customer) {
        setFormData({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          currentGuest: customer.currentGuest,
        });
      } else {
        setError("Customer not found");
      }
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) return "Name is required";
    if (!emailRegex.test(formData.email)) return "Valid email is required";
    if (!formData.phone.replace(/\D/g, "")) return "Phone number is required";
    if (!formData.address.trim()) return "Address is required";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const customerData = {
      ...formData,
      phone: formData.phone.replace(/\D/g, ""),
    };

    if (id) {
      const index = customers.findIndex((customer) => customer.id === id);
      if (index !== -1) {
        customers[index] = {
          ...customers[index],
          ...customerData,
          createdAt: customers[index].createdAt,
        };
      }
    } else {
      customers.push({
        ...customerData,
        id: `customer-${customers.length + 1}`,
        createdAt: new Date().toISOString(),
      });
    }

    navigate("/customers");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/customers" className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700">
          <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Customers
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-white">
          {id ? "Edit Customer" : "Add New Customer"}
        </h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-900 border border-red-800 rounded-md">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-800 shadow-lg rounded-xl">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 transition-all"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 transition-all"
                placeholder="john@example.com"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 transition-all"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Address Field */}
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-300">
                Address *
              </label>
              <textarea
                name="address"
                id="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 transition-all"
                placeholder="123 Main St, Anytown, CA 12345"
              />
            </div>
          </div>
        </div>

        {/* Form Footer */}
        <div className="px-6 py-4 bg-gray-900 flex items-center justify-end rounded-b-xl border-t border-gray-700">
          <Link
            to="/customers"
            className="mr-3 px-5 py-2.5 text-sm font-medium text-white bg-gray-700 border border-gray-600 rounded-lg shadow-sm hover:bg-gray-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all"
          >
            {id ? "Save Changes" : "Add Customer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;