import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import avatar from "../../assets/avatar.png";

const UserToggle = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };
  console.log("User in UserToggle:", user);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white rounded-full p-1 focus:outline-none"
      >
        <img src={avatar} alt="User avatar" className="w-8 h-8 rounded-full" />
        <span className="font-semibold text-black text-lg w-20 h-8 truncate">
          {user?.username || "Guest"}
        </span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

UserToggle.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
  logout: PropTypes.func.isRequired,
};

export default UserToggle;
