import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { isAuthenticated, authLoading } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch("/api/user-info/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
    };

    if (!authLoading) {
      fetchUserData();
    }
  }, [isAuthenticated, authLoading]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => useContext(UserContext);
