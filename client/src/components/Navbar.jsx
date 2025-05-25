// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  FaHome,
  FaInfoCircle,
  FaSearch,
  FaPlus,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  return (
    <nav className="bg-white text-gray-800 fixed top-0 left-0 w-full px-6 py-4 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <FaHome size={30} />
        <div className="text-2xl font-bold flex-1 m-2">A1 RealEstate</div>

        <div className="hidden md:flex flex-1 justify-center space-x-6 text-lg">
          <Link to="/" className="flex items-center space-x-2 hover:text-blue-600">
            <FaHome />
            <span>Home</span>
          </Link>

          <Link to="/properties" className="flex items-center space-x-2 hover:text-blue-600">
            <FaSearch />
            <span>Properties</span>
          </Link>

          <Link to="/about" className="flex items-center space-x-2 hover:text-blue-600">
            <FaInfoCircle />
            <span>About</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-end space-x-4">
  {currentUser ? (
    <>
      <Link to="/list-property">
        <button className="flex items-center space-x-2 bg-blue-500 p-2  py-2 rounded-md text-white hover:bg-black">
          <FaPlus size={15} />
          <span>List Property</span>
        </button>
      </Link>

      <Link to="/dashboard">
        <button className="flex items-center space-x-2 border border-gray-400 p-2 py-2 rounded-md hover:bg-zinc-300 hover:text-black">
          {/* <img
            // src={currentUser.profilePic || "/default-avatar.png"}
            // alt="avatar"
            className="w-6 h-6 rounded-full object-cover"
          /> */}
          <span>Dashboard</span>
        </button>
      </Link>

      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white"
      >
        <FaSignOutAlt size={18} />
        <span>Logout</span>
      </button>
    </>
  ) : (
    <>
      <Link to="/sign-in">
        <button className="flex items-center space-x-2 border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">
          <FaSignInAlt size={18} />
          <span>Login</span>
        </button>
      </Link>

      <Link to="/register">
        <button className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700">
          <FaUserPlus size={18} />
          <span>Sign Up</span>
        </button>
      </Link>
    </>
  )}
</div>

      </div>
    </nav>
  );
};

export default Navbar;
