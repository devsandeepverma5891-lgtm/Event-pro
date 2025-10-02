import React from 'react'
import CountdownTimer from '../CountdownTimer'
import { Calendar } from 'lucide-react';

const Title = () => {

  
  return (
    <div>
      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        {/* Main Title */}
        <h1 className="leading-tight mb-6">
            <span className="text-white lg:text-4xl text-md font-normal lg:mb-5 mb-5">
            SUMAN TV's BIGGEST REAL ESTATE
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#FFBF15] to-[#F19306] bg-clip-text text-transparent lg:text-6xl text-4xl mt-5 lg:mt-0 font-bold">
             AWARDS SHOW & PROPERTY EXPO
             </span>
        </h1>
        
        
        {/* Subtitle */}
        <div className="flex items-center justify-between lg:justify-center mb-6 lg:mb-4 w-[100%] lg:w-auto">
        {/* {Badge()}  */}
        <span className="px-2 lg:px-3 py-2 w-[50%] lg:w-auto rounded-full bg-gradient-to-b from-[#E0BE7F] to-[#C99A17] text-black flex items-center text-[0.7em] lg:text-md font-semibold transition-colors text-center">
        <Calendar className="w-4 h-4 lg:h4 lg:w-4 mr-1" /> 
        <span>October 18-19, 2025</span>
        </span>
        <span className="text-[0.7em] sm:text-xl md:text-1xl text-white ml-4 w-[50%] lg:w-auto"> 
          AT NOVOTEL, HICC, HYDERABAD
        </span>
        </div>
       
        
        {/* Countdown Timer */}
        <CountdownTimer />
        
        {/* Register Button */}
        <button className="bg-gradient-to-r from-[#FFBF15] to-[#F19306] text-white font-bold 
        py-4 px-6
        lg:py-5 lg:px-10 md:py-3 md:px-12 
        rounded-lg text-lg md:text-xl transition-colors shadow-lg">
          REGISTER FOR AWARD
        </button>
      </div>
    </div>
  )
}

export default Title
