import React from 'react';
import awardforexcellence from '../assets/awardforexcellence.png';

const AwardsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
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
    </section>
  );
};

export default AwardsSection;
