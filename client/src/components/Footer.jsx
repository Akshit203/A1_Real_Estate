import React from "react";
import { Home, Twitter, Facebook, Instagram, Github, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";


// Contact Information
const contactInfo = [
  { icon: MapPin, text: "A1 RealEstate, Sector 1, Chandigarh (U.T)", href: "https://maps.google.com" },
  { icon: Phone, text: "+91 1234567890", href: "tel:+1234567890" },
  { icon: Mail, text: "support@A1RealEstate.com", href: "mailto:support@A1RealEstate.com" },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 text-black">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          
          <div>
            <div className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-black" />
              
              <span className="text-xl font-bold text-gray-900">A1 RealEstate</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Your trusted partner in finding the perfect home.
            </p>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-md">
              <li><a href="/" className="hover:font-bold hover:text-black">Home</a></li>
              <li><a href="/properties" className="hover:font-bold hover:text-black">Properties</a></li>
              <li><a href="/about" className="hover:font-bold hover:text-black">About Us</a></li>
              <li><a href="/contact" className="hover:font-bold hover:text-black">Contact</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <ul className="mt-2 space-y-2 text-md">
              {contactInfo.map(({ icon: Icon, text, href }, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 text-blue-400" />
                  <a href={href} className="hover:text-blue-500">{text}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">

          {/* Copyright */}
          <p className="text-md text-black mt-2 md:mt-0"> © 2025 A1 RealEstate.com | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
