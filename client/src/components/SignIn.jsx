// src/pages/SignIn.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; 
import { Link } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const [userSignIn, setUserSignIn] = useState({
    email: '',
    password: ''
  });

  const userSignInFunction = async (e) => {
    e.preventDefault();

    if (userSignIn.email === '' || userSignIn.password === '') {
      toast.error('All fields are required');
      return;
    }

    try {
      // Replace this with your actual login API call
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userSignIn),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Login Successful');
        navigate('/dashboard');  // Redirect to dashboard
      } else {
        toast.error('Login failed. Please check your credentials');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={userSignInFunction}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={userSignIn.email}
                  onChange={(e) =>
                    setUserSignIn({ ...userSignIn, email: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={userSignIn.password}
                  onChange={(e) =>
                    setUserSignIn({ ...userSignIn, password: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="*******"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign In
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
              <Link to="/register" className="font-medium text-blue-600 hover:underline">
                    Sign up
              </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
