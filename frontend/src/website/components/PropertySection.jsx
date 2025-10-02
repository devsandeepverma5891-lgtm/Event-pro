import React from 'react';
import propertyshowcase from '../assets/propertyshowcase.png';
import propertyshowcasemobile from '../assets/mobileview/propertyshowcase.png';
const PropertySection = () => {
  return (
    <section className="py-5 lg:py-20 bg-white">
      <div className="hidden lg:block">
        <img
            src={propertyshowcase}
            alt="Property Showcase"
            className="h-64 md:h-auto md:w-full object-cover"
          />
      </div>
      <div className="block lg:hidden">
        <img
          src={propertyshowcasemobile}
          alt="Suman TV - Banner Image of Suman TV Network"
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default PropertySection;
