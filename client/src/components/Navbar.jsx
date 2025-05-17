import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaShoppingCart,
  FaShoppingBag,
  FaDollarSign,
  FaMoneyBillWave,
  FaTags,
  FaKey,
  FaBriefcase,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
  FaSearch
} from "react-icons/fa";

const Navbar = () => {
  return (

    <nav className="bg-white text-gray-800 fixed top-0 left-0 w-full px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <FaHome size={30} />
        <div className="text-2xl font-bold flex-1 m-2">A1 RealEstate</div>

        <div className="hidden md:flex flex-1 justify-center space-x-6 text-lg">
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 px-3 py-2 rounded-md"
          >
            <FaHome size={20} />
            <span>Home</span>
          </Link>

          <Link
            to="/properties"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 px-3 py-2 rounded-md"
          >
            <FaSearch size={20} />
            <span>Properties</span>
          </Link>

          <Link
            to="/about"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 px-3 py-2 rounded-md"
          >
            <FaInfoCircle size={20} />
            <span>About</span>
          </Link>

          <a
            href="#"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 px-3 py-2 rounded-md"
          >
            <FaShoppingCart size={20} />
            <span>Buy</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 px-3 py-2 rounded-md"
          >
            <FaKey size={20} />
            <span>Rent</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 px-3 py-2 rounded-md"
          >
            <FaTags size={20} />
            <span>Sell</span>
          </a>
        </div>

        <div className="hidden md:flex flex-1 justify-end space-x-4">

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

        </div>

      </div>
    </nav>
    
  );
};

export default Navbar;
