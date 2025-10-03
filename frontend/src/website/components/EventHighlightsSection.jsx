import React from 'react'

import industryspeaker from "../assets/highlights/industryspeaker.png";
import companiesparticipating from "../assets/highlights/companiesparticipating.png";
import awardscategory from "../assets/highlights/awardscategory.png";
import expectedattendees from "../assets/highlights/expectedattendees.png";
import daysofinnovation from "../assets/highlights/daysofinnovation.png";
import networkingopportunities from "../assets/highlights/networkingopportunities.png";



const EventHighlightsSection = () => {

    
  const highlights = [
    { title: "50+ INDUSTRY SPEAKERS", img: industryspeaker },
    { title: "200+ COMPANIES PARTICIPATING", img: companiesparticipating },
    { title: "20+ AWARD CATEGORIES", img: awardscategory },
    { title: "10,000+ EXPECTED ATTENDEES", img: expectedattendees },
    { title: "2 DAYS OF INNOVATION", img: daysofinnovation },
    { title: "NETWORKING OPPORTUNITIES", img: networkingopportunities },
  ];
  return (
    <section className="lg:py-20 py-5 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          {/* Section Title */}
        
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
          EVENT HIGHLIGHTS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#EAB435] to-[#F19306] mx-auto"></div>
        </div>

          {/* Digital Offerings Grid */}
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto lg:mx-auto lg:max-w-6xl sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 md:gap-8">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-[#F10651] to-[#000]  rounded-lg shadow-lg lg:py-16 lg:px-4 py-10 px-2 text-center hover:scale-105 transform transition duration-300"
          >
            {/* Icon Circle */}
            <div className="w-16 h-16 bg-[#EFB314] rounded-full flex items-center justify-center mx-auto mb-4">
              <img src={item.img} alt={item.title} className="w-8 h-8 object-contain" />
            </div>
            {/* Title */}
            <h3 className="text-white font-semibold text-sm lg:text-xl break-words">{item.title}</h3>
          </div>
        ))}
      </div>
        </div>
    </section>
  )
}

export default EventHighlightsSection
