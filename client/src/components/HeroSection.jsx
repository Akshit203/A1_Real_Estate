import React from "react";
import Properties from "./Properties";


const HeroSection = () => {
  return (
    <>
    
      <div className="text-center py-20 bg-gradient-to-b from-blue-50 to-blue-100 mt-20">
   
        
        <h1 className="text-6xl font-bold text-black mb-6 leading-tight">

        <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Luxury living
        </span>

        <span className="text-gray-800 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> Designed Just for You</span>

        </h1>

        <p className="text-slate-700 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Your dream home is just a click away – explore top locations now!       
              
        </p>
      
    </div>
    <Properties/>
        </>


  );
};

export default HeroSection;
