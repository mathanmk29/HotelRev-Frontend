import { createContext, useState, useEffect } from "react";
import { users } from "../data/users";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("hotelUser");
    if (storedUser) {
      try {
        let parsedUser = JSON.parse(storedUser);
        
        // Check if the user is missing the new fields (mobile, address, designation)
        if (parsedUser && parsedUser.id && (!parsedUser.mobile || !parsedUser.address || !parsedUser.designation)) {
          // Find the user in the mock data to get the updated fields
          const updatedUserData = users.find(u => u.id === parsedUser.id);
          if (updatedUserData) {
            // Add the missing fields
            parsedUser = {
              ...parsedUser,
              mobile: updatedUserData.mobile || "",
              address: updatedUserData.address || "",
              designation: updatedUserData.designation || "",
            };
            // Update localStorage with the enhanced user data
            localStorage.setItem("hotelUser", JSON.stringify(parsedUser));
          }
        }
        
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem("hotelUser");
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    setError(null);

    // Find user by email and password
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // Remove password from stored user data
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("hotelUser", JSON.stringify(userWithoutPassword));
      return true;
    } else {
      setError("Invalid email or password");
      return false;
    }
  };

  const register = (name, email, password, role = "staff", mobile = "", address = "", designation = "") => {
    setError(null);

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      setError("User with this email already exists");
      return false;
    }

    // In a real app, this would be an API call to register the user
    // For this demo, we'll just add to the in-memory array
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password, // In real app, this would be hashed
      role,
      mobile,
      address,
      designation,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    // Remove password from stored user data for security
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("hotelUser", JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hotelUser");
  };

  const updateUserProfile = (userData) => {
    try {
      // In a real app, this would be an API call
      // For demo, we'll just update the local state
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("hotelUser", JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to update profile" };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
