import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 text-center mb-4">
          About A1 RealEstate
        </h1>
        <p className="text-center text-gray-600 text-lg mb-8">
          A simple and intuitive platform designed to help users explore available properties with ease.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Purpose</h2>
            <p className="text-gray-600">
              We built A1 RealEstate with the aim of providing users a clean and easy-to-use interface to browse property listings and make informed decisions.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Key Features</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Responsive and user-friendly interface</li>
              <li>Clean layout for property exploration</li>
              <li>Essential features for property browsing</li>
              <li>Basic user flow with smooth navigation</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
