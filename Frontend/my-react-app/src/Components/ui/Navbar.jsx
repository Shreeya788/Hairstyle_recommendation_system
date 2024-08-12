import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import UserToggle from "./UserToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderAuthButtons = () => {
    if (user) {
      return <UserToggle user={user} logout={handleLogout} />;
    } else {
      return (
        <>
          <NavLink to="/signIn">
            <button className="font-semibold font-sans text-[#0D0D0D] opacity-70 px-4 py-2 rounded-md hover:bg-neutral-100">
              Sign In
            </button>
          </NavLink>
          <NavLink to="/signUp">
            <button className="bg-[#2463EB] text-white px-4 py-2 rounded-md hover:bg-[#3772f2]">
              Sign Up
            </button>
          </NavLink>
        </>
      );
    }
  };

  return (
    <nav className="bg-[#F7DDDD]">
      <div className="container mx-auto px-8 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="logo" className="w-14 h-12" />
          <div className="hidden md:flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-bold"
                  : "text-gray-800 font-semibold hover:text-blue-600"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-bold"
                  : "text-gray-800 font-semibold hover:text-blue-600"
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/recommendations"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-bold"
                  : "text-gray-800 font-semibold hover:text-blue-600"
              }
            >
              Recommendation
            </NavLink>
          </div>
        </div>
        <div className="hidden md:flex space-x-4">{renderAuthButtons()}</div>
        <div className="md:hidden flex items-center">
          <button onClick={handleToggle} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2 px-4 py-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-bold"
                  : "text-gray-800 text-center font-semibold hover:text-blue-600"
              }
              onClick={handleToggle}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-bold"
                  : "text-gray-800 text-center font-semibold hover:text-blue-600"
              }
              onClick={handleToggle}
            >
              About Us
            </NavLink>
            <NavLink
              to="/recommendation"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-bold"
                  : "text-gray-800 text-center font-semibold hover:text-blue-600"
              }
              onClick={handleToggle}
            >
              Recommendation
            </NavLink>
            {user ? (
              <>
                <span className="text-gray-800 text-center font-semibold">
                  {user.username}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    handleToggle();
                  }}
                  className="text-gray-800 text-center font-semibold hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/signIn" onClick={handleToggle}>
                  <button className="text-gray-800 text-center font-semibold hover:text-blue-600">
                    Sign In
                  </button>
                </NavLink>
                <NavLink to="/signUp" onClick={handleToggle}>
                  <button className="text-gray-800 text-center font-semibold hover:text-blue-600">
                    Sign Up
                  </button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
