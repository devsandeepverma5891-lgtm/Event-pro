import React from 'react'
import sumantvlogo from '../assets/logo_suman_tv.png'

// Icons (as before)
import img100 from '../assets/diditalmedia/100.png'
import img150 from '../assets/diditalmedia/150.png'
import img500 from '../assets/diditalmedia/500.png'
import img1000 from '../assets/diditalmedia/1000.png'

const stats = [
  {
    value: "500+",
    label: "DIGITAL CHANNELS & PAGES",
    img: img500
  },
  {
    value: "1000+",
    label: "TEAM MEMBERS",
    img: img1000
  },
  {
    value: "100+",
    label: "GOOGLE REWARDS",
    img: img100
  },
  {
    value: "150+",
    label: "BRANCHES",
    img: img150
  }
];

const NetworkStatsSection = () => {
  return (
    <section className="relative py-0 lg:py-0 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
      <div className="text-center mb-12 md:mb-16 py-15">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#F4C264] to-[#CDA368] bg-clip-text text-transparent mb-4">
          India’s Largest<br />Digital Media Network
        </h2>

        {/* Countries */}
        <div className="text-center bg-gradient-to-r from-[#F04F82] to-[#F10651] bg-clip-text text-transparent font-semibold space-x-6 mb-1 text-md tracking-wider">
          <span>USA</span>
          <span>UAE</span>
          <span>AUSTRALIA</span>
          <span>SINGAPORE</span>
        </div>

        {/* Grid with stats */}
        <div className="flex flex-wrap justify-center items-center relative w-full my-26">
          <div className="flex flex-wrap w-full justify-center items-center">
            {/* Top row */}
            <div className="flex w-full justify-around mb-10">
              {stats.slice(0, 2).map((stat) => (
                <div key={stat.label} className="flex flex-col items-center px-6">
                  <img src={stat.img} alt={stat.label} className="w-full h-22 lg:h-32 mb-3" />
                </div>
              ))}
            </div>

            {/* Plus (+) behind the logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              {/* Horizontal line */}
              <div className="absolute left-1/2 top-1/2 w-3xl h-1 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#F4C264] via-[#F9E39A] to-[#CDA368] rounded-full z-0" />
              {/* Vertical line */}
              <div className="absolute left-1/2 top-1/2 h-96 w-1 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-[#F4C264] via-[#F9E39A] to-[#CDA368] rounded-full z-0" />
              {/* Center Logo */}
              <img
                src={sumantvlogo}
                alt="Suman TV Logo"
                className="relative rounded-full border-4 border-yellow-300 bg-white w-20 h-20 shadow-lg mx-auto z-10"
              />
            </div>

            {/* Bottom row */}
            <div className="flex w-full justify-around mt-14">
              {stats.slice(2, 4).map((stat) => (
                <div key={stat.label} className="flex flex-col items-center px-6">
                  <img src={stat.img} alt={stat.label} className="w-full h-22 mb-3" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer stats */}
        <div className="flex flex-col justify-between lg:flex-row lg:justify-evenly w-full mt-4">
          <div className="mb-10 lg:mb-0">
            <span className="bg-gradient-to-r from-[#E0BE7F] to-[#C99A17] bg-clip-text text-transparent text-5xl font-bold">10 Cr</span>
            <p className="text-white text-md font-medium">Viewership Per day</p>
          </div>
          <div className="">
            <span className="bg-gradient-to-r from-[#E0BE7F] to-[#C99A17] bg-clip-text text-transparent text-5xl font-bold">10 Cr</span>
            <p className="text-white text-md font-medium">Subscribers & Followers</p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default NetworkStatsSection;
