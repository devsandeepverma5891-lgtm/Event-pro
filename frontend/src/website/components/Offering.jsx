import React from 'react'

const Offering = () => {

    
  const digitalOfferings = [
    "EXPO SEASONS",
    "PRODUCT LIVE STORY",
    "COMPANY PROFILE",
    "BRANDING PROJECT PROMOTIONS",
    "INFLUENCER PROGS",
    "ONLINE SALES SESSIONS",
    "PRINT MEDIA AND WEBSITE ARTICLES",
    "CUSTOMER TESTIMONIALS",
    "LEAD ADS",
    "DIGITAL MARKETING SALES STRATEGIES"
  ];


  return (
    <section className="relative py-0 lg:py-0 overflow-hidden bg-[#201E27]">
      {/* Suman TV Digital Offerings Section */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Suman TV Digital Offerings
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#EAB435] to-[#F19306] mx-auto"></div>
        </div>

          {/* Digital Offerings Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {digitalOfferings.map((offering, index) => (
              <div key={index} className="bg-[#2D2A35] rounded-xl p-6 text-center hover:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-[#EFB314] rounded-full flex items-center justify-center mx-auto mb-4">
                  
                </div>
                <h3 className="text-white font-semibold text-sm leading-tight">
                  {offering}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Offering
