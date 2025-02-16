import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/auth/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch((err) => console.error("Auth check failed", err));
  }, []);

  const logout = async () => {
    try {
      await fetch("http://localhost:3000/auth/logout", {
        method: "GET",
        credentials: "include", // Include cookies for session
      });

      setUser(null); // Clear user state
      window.location.href = "/"; // Redirect to home page
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
