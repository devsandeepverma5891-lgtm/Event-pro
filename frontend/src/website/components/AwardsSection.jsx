import React from 'react';
import awardforexcellence from '../assets/awardforexcellence.png';
import showcasestagemobile from '../assets/mobileview/awardsforexcellence.png';
const AwardsSection = () => {
  return (
    <section className="py-5 lg:py-20 bg-white">
      <div className="hidden lg:block">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8">
        {/* Awards For Excellence Card */}
        <div className="flex flex-col md:flex-row bg-[#18181A] rounded-xl overflow-hidden shadow-lg">
          <img
            src={awardforexcellence}
            alt="Awards for Excellence"
            className="h-64 md:h-auto md:w-full object-cover"
          />
          
        </div>
      </div>
      </div>
      <div className="block lg:hidden">
        <img
          src={showcasestagemobile}
          alt="Suman TV - Banner Image of Suman TV Network"
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default AwardsSection;
