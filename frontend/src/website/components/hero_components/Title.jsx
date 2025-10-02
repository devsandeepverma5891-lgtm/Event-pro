import React from 'react'
import CountdownTimer from '../CountdownTimer'
import { Calendar } from 'lucide-react';

const Title = () => {

  const Badge = () => {
    return (
      <span className="px-3 py-1 rounded-full bg-gradient-to-b from-[#E0BE7F] to-[#C99A17] text-black inline-flex items-center text-md font-semibold transition-colors ">
        <Calendar className="w-4 h-4 mr-2" /> October 18-19, 2025
      </span>
    );
  };
  
  
  return (
    <div>
      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        {/* Main Title */}
        <h1 className="leading-tight mb-6">
            <span className="text-white text-4xl font-normal mb-5">
            SUMAN TV's BIGGEST REAL ESTATE
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#FFBF15] to-[#F19306] bg-clip-text text-transparent text-6xl font-bold">
             AWARDS SHOW & PROPERTY EXPO
             </span>
        </h1>
        
        
        {/* Subtitle */}
        <div className="flex items-center justify-center mb-4 ">
        {Badge()} 
        <span className="text-lg sm:text-xl md:text-1xl text-white ml-4"> AT NOVOTEL, HICC, HYDERABAD</span>
        </div>
       
        
        {/* Countdown Timer */}
        <CountdownTimer />
        
        {/* Register Button */}
        <button className="bg-gradient-to-r from-[#FFBF15] to-[#F19306] text-white font-bold py-5 px-10 md:py-3 md:px-12 rounded-lg text-lg md:text-xl transition-colors shadow-lg">
          REGISTER FOR AWARD
        </button>
      </div>
    </div>
  )
}

export default Title
