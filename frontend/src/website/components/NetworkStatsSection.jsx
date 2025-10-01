import React from 'react'
import sumantvlogo from '../assets/logo_suman_tv.png'
const stats = [
  {
    value: "500+",
    label: "DIGITAL CHANNELS & PAGES"
  },
  {
    value: "1000+",
    label: "TEAM MEMBERS"
  },
  {
    value: "100+",
    label: "GOOGLE REWARDS"
  },
  {
    value: "150+",
    label: "BRANCHES"
  }
];
 const NetworkStatsSection = () => {
   return (
     <section className="relative py-0 lg:py-0 overflow-hidden bg-black">
         <div className="text-center mb-12 md:mb-16 py-15">
           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#F4C264] to-[#CDA368] bg-clip-text text-transparent mb-4">
             India’s Largest<br />Digital Media Network
           </h2>
        <div className="bg-gradient-to-r from-[#F04F82] to-[#F10651] bg-clip-text text-transparent font-semibold space-x-6 mb-1 text-md tracking-wider">
          <span>USA</span>
          <span>UAE</span>
          <span>AUSTRALIA</span>
          <span>SINGAPORE</span>
        </div> 


{/* Flex Grid of stats */}
<div className="flex flex-wrap justify-center items-center relative w-full my-26">
        <div className="flex flex-wrap w-full justify-center items-center">
          {/* Top row */}
          <div className="flex w-full justify-around mb-10">
            {stats.slice(0, 2).map((stat, idx) => (
              <div key={stat.label} className="flex flex-col items-center mx-6">
                <span className="bg-gradient-to-t from-[#F04F82] to-[#F10651] bg-clip-text text-transparent text-4xl font-bold mb-1">{stat.value}</span>
                
                <span className="bg-gradient-to-t from-[#D5B452] to-[#8F6D26] bg-clip-text text-transparent text-md font-medium text-center">{stat.label}</span>
              </div>
            ))}
          </div>
          {/* Center logo column */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              src={sumantvlogo}
              alt="Suman TV Logo"
              className="rounded-full border-4 border-yellow-300 bg-white w-20 h-20 shadow-lg mx-auto"
            />
          </div>
          {/* Bottom row */}
          <div className="flex w-full justify-around mt-14">
            {stats.slice(2, 4).map((stat, idx) => (
              <div key={stat.label} className="flex flex-col items-center mx-6">
                <span className="bg-gradient-to-t from-[#F04F82] to-[#F10651] bg-clip-text text-transparent text-4xl font-bold mb-1">{stat.value}</span>
                <span className="bg-gradient-to-t from-[#D5B452] to-[#8F6D26] bg-clip-text text-transparent text-md font-medium text-center">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


{/* Footer stats */}
 <div className="flex justify-evenly w-full mt-4">
<div>
  <span className="bg-gradient-to-r from-[#E0BE7F] to-[#C99A17] bg-clip-text text-transparent text-5xl font-bold">10 Cr</span>
  <p className="text-white text-md font-medium">Viewership Per day</p>
</div>
<div>
  <span className="bg-gradient-to-r from-[#E0BE7F] to-[#C99A17] bg-clip-text text-transparent text-5xl font-bold">10 Cr</span>
  <p className="text-white text-md font-medium">Subscribers & Followers</p>
</div>
</div> 
         </div>
     </section>
 );
 }

 export default NetworkStatsSection
