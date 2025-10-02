import React from 'react';
import propertyshowcase from '../assets/propertyshowcase.png';
import propertyshowcasemobile from '../assets/mobileview/propertyshowcase.png';
const PropertySection = () => {
  return (
    <section className="py-0 md:py-15 lg:py-15">
      <div className="hidden lg:block max-w-7xl mx-auto px-12">
        <div className="flex flex-col md:flex-row-reverse rounded-3xl overflow-hidden shadow-lg">
          <img
            src={propertyshowcase}
            alt="Property Showcase"
            className="h-[600px] md:h-auto md:w-full object-cover"
          />
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="flex flex-col md:flex-row-reverse rounded-3xl overflow-hidden shadow-lg">
          <img
            src={propertyshowcasemobile}
            alt="Suman TV - Banner Image of Suman TV Network"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertySection;
