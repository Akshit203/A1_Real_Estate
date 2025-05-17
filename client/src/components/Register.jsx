import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice"; // adjust if needed

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userSignUp, setUserSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.toLowerCase());
  };

  const userSignUpFunction = async () => {
    const { name, email, password } = userSignUp;

    // ✅ FRONTEND VALIDATION
    if (!name || !email || !password) {
      toast.error("All fields are required", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        name,
        email: email.toLowerCase(), // Normalize email
        password,
      });

      const { user, token } = response.data;

      dispatch(login({ user, token }));

      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      setUserSignUp({ name: "", email: "", password: "" });
      navigate("/sign-in");
    } catch (error) {
      console.error("Registration Error:", error);
      const msg = error.response?.data?.message || "Signup failed. Try again.";
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-800 p-6 space-y-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
          Create your account
        </h1>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            userSignUpFunction();
          }}
        >
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Your full name
            </label>
            <input
              type="text"
              id="name"
              value={userSignUp.name}
              onChange={(e) => setUserSignUp({ ...userSignUp, name: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={userSignUp.email}
              onChange={(e) => setUserSignUp({ ...userSignUp, email: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={userSignUp.password}
              onChange={(e) => setUserSignUp({ ...userSignUp, password: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5 font-medium"
          >
            Sign up
          </button>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/sign-in" className="font-medium text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
