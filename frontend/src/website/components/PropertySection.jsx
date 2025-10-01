import React from 'react';
import propertyshowcase from '../assets/propertyshowcase.png';

const PropertySection = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8">
        {/* Property Showcase Card */}
        <div className="flex flex-col md:flex-row-reverse bg-gradient-to-r from-[#FA1B55] via-[#F27676] to-[#A825D6] rounded-xl overflow-hidden shadow-lg">
          <img
            src={propertyshowcase}
            alt="Property Showcase"
            className="h-64 md:h-auto md:w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertySection;
