import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

const Register = () => {
  const { register, error, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("staff"); // Add role state
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // Add role error state
    mobile: "",
    address: "",
    designation: "",
  });

  // Allow access to sign up page even when logged in

  // Validate name
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (!nameRegex.test(name))
      return "Name can only contain letters and spaces";
    return "";
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  // Validate password
  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";

    const checks = {
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const missing = [];
    if (!checks.uppercase) missing.push("uppercase letter");
    if (!checks.lowercase) missing.push("lowercase letter");
    if (!checks.number) missing.push("number");
    if (!checks.special) missing.push("special character");

    if (missing.length > 0) {
      return `Password must include at least one ${missing.join(", ")}`;
    }

    return "";
  };

  // Validate confirm password
  const validateConfirmPassword = (pass, confirmPass) => {
    if (!confirmPass) return "Please confirm your password";
    if (pass !== confirmPass) return "Passwords do not match";
    return "";
  };

  // Validate mobile number
  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile.trim()) return "Mobile number is required";
    if (!mobileRegex.test(mobile)) return "Please enter a valid 10-digit mobile number";
    return "";
  };

  // Validate address
  const validateAddress = (address) => {
    if (!address.trim()) return "Address is required";
    if (address.trim().length < 5) return "Address must be at least 5 characters";
    return "";
  };

  // Validate designation
  const validateDesignation = (designation) => {
    if (!designation.trim()) return "Designation is required";
    return "";
  };

  // Handle input change and validate on the fly
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        setFormErrors((prev) => ({
          ...prev,
          name: value.trim() ? "" : "Name is required",
        }));
        break;
      case "email":
        setEmail(value);
        setFormErrors((prev) => ({
          ...prev,
          email: value.trim() ? "" : "Email is required",
        }));
        break;
      case "password":
        setPassword(value);
        setFormErrors((prev) => ({
          ...prev,
          password: value ? "" : "Password is required",
          confirmPassword: confirmPassword
            ? value === confirmPassword
              ? ""
              : "Passwords do not match"
            : prev.confirmPassword,
        }));
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        setFormErrors((prev) => ({
          ...prev,
          confirmPassword: password
            ? value === password
              ? ""
              : "Passwords do not match"
            : "Please confirm your password",
        }));
        break;
      case "role":
        setRole(value);
        setFormErrors((prev) => ({
          ...prev,
          role: value ? "" : "Role is required",
        }));
        break;
      case "mobile":
        setMobile(value);
        setFormErrors((prev) => ({
          ...prev,
          mobile: value.trim() ? "" : "Mobile number is required",
        }));
        break;
      case "address":
        setAddress(value);
        setFormErrors((prev) => ({
          ...prev,
          address: value.trim() ? "" : "Address is required",
        }));
        break;
      case "designation":
        setDesignation(value);
        setFormErrors((prev) => ({
          ...prev,
          designation: value.trim() ? "" : "Designation is required",
        }));
        break;
      default:
        break;
    }
  };

  // Validate the entire form before submission
  const validateForm = () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmError = validateConfirmPassword(password, confirmPassword);
    const roleError = role ? "" : "Role is required";
    const mobileError = validateMobile(mobile);
    const addressError = validateAddress(address);
    const designationError = validateDesignation(designation);

    setFormErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmError,
      role: roleError,
      mobile: mobileError,
      address: addressError,
      designation: designationError,
    });

    return (
      !nameError && 
      !emailError && 
      !passwordError && 
      !confirmError && 
      !roleError && 
      !mobileError && 
      !addressError && 
      !designationError
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const success = register(name, email, password, role, mobile, address, designation); // Add new fields to register call
    if (success) {
      navigate("/rooms");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Hotel Manager</h1>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Create an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 text-sm text-red-200 bg-red-900 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-200"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={handleInputChange}
                onBlur={() =>
                  setFormErrors({ ...formErrors, name: validateName(name) })
                }
                className={`block w-full px-3 py-2 mt-1 border rounded-md shadow-sm appearance-none bg-gray-700 text-white focus:outline-none sm:text-sm ${
                  formErrors.name
                    ? "border-red-600 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-primary-500 focus:ring-primary-500"
                }`}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleInputChange}
                onBlur={() =>
                  setFormErrors({ ...formErrors, email: validateEmail(email) })
                }
                className={`block w-full px-3 py-2 mt-1 border rounded-md shadow-sm appearance-none bg-gray-700 text-white focus:outline-none sm:text-sm ${
                  formErrors.email
                    ? "border-red-600 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-primary-500 focus:ring-primary-500"
                }`}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-200"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm appearance-none bg-gray-700 text-white focus:outline-none sm:text-sm border-gray-600 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
              {formErrors.role && (
                <p className="mt-1 text-sm text-red-400">{formErrors.role}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-200"
              >
                Mobile Number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                autoComplete="tel"
                required
                value={mobile}
                onChange={handleInputChange}
                onBlur={() =>
                  setFormErrors({ ...formErrors, mobile: validateMobile(mobile) })
                }
                className={`block w-full px-3 py-2 mt-1 border rounded-md shadow-sm appearance-none bg-gray-700 text-white focus:outline-none sm:text-sm ${
                  formErrors.mobile
                    ? "border-red-600 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-primary-500 focus:ring-primary-500"
                }`}
              />
              {formErrors.mobile && (
                <p className="mt-1 text-sm text-red-400">{formErrors.mobile}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-200"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                value={address}
                onChange={handleInputChange}
                onBlur={() =>
                  setFormErrors({ ...formErrors, address: validateAddress(address) })
                }
                rows="3"
                className={`block w-full px-3 py-2 mt-1 border rounded-md shadow-sm appearance-none bg-gray-700 text-white focus:outline-none sm:text-sm ${
                  formErrors.address
                    ? "border-red-600 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-primary-500 focus:ring-primary-500"
                }`}
              />
              {formErrors.address && (
                <p className="mt-1 text-sm text-red-400">{formErrors.address}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-gray-200"
              >
                Designation
              </label>
              <input
                id="designation"
                name="designation"
                type="text"
                required
                value={designation}
                onChange={handleInputChange}
                onBlur={() =>
                  setFormErrors({ ...formErrors, designation: validateDesignation(designation) })
                }
                className={`block w-full px-3 py-2 mt-1 border rounded-md shadow-sm appearance-none bg-gray-700 text-white focus:outline-none sm:text-sm ${
                  formErrors.designation
                    ? "border-red-600 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-primary-500 focus:ring-primary-500"
                }`}
              />
              {formErrors.designation && (
                <p className="mt-1 text-sm text-red-400">{formErrors.designation}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={handleInputChange}
                onBlur={() =>
                  setFormErrors({
                    ...formErrors,
                    password: validatePassword(password),
                  })
                }
                className={`block w-full px-3 py-2 mt-1 border rounded-md shadow-sm appearance-none bg-gray-700 text-white focus:outline-none sm:text-sm ${
                  formErrors.password
                    ? "border-red-600 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-primary-500 focus:ring-primary-500"
                }`}
              />
              <p className="mt-1 text-xs text-gray-400">
                Password must be at least 8 characters and include uppercase,
                lowercase, number, and special character
              </p>
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-200"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={handleInputChange}
                onBlur={() =>
                  setFormErrors({
                    ...formErrors,
                    confirmPassword: validateConfirmPassword(
                      password,
                      confirmPassword
                    ),
                  })
                }
                className={`block w-full px-3 py-2 mt-1 border rounded-md shadow-sm appearance-none bg-gray-700 text-white focus:outline-none sm:text-sm ${
                  formErrors.confirmPassword
                    ? "border-red-600 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-primary-500 focus:ring-primary-500"
                }`}
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <p className="mt-2 text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
