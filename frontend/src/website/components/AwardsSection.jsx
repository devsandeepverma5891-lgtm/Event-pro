import React from 'react';
import awardforexcellence from '../assets/awardforexcellence.png';
import showcasestagemobile from '../assets/mobileview/awardsforexcellence.png';

const AwardsSection = () => {
  return (
    <section className="py-5 lg:py-20 bg-white">
      {/* Desktop View */}
      <div className="hidden lg:block max-w-7xl mx-auto px-12">
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <img
            src={awardforexcellence}
            alt="Awards for Excellence"
            className="h-64 md:h-auto md:w-full object-cover"
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden">
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <img
            src={showcasestagemobile}
            alt="Awards for Excellence Mobile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
