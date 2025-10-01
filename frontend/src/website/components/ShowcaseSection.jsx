import React from 'react'
import showcasestage from '../assets/showcase/showcasestagedrk.png';
import middleimage from '../assets/showcase/cityline.png';
const ShowcaseSection = () => {
  return (
    <section className="relative py-0 lg:py-0 lg:pt-48 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={showcasestage}
          alt="Suman TV - Banner Image of Suman TV Network"
          className="w-full h-full"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#321A3E] via-[#ED0956] to-transparent opacity-[0.8]"></div> */}
        
      </div>
      <div className="relative z-10 flex justify-center align-bottom">
      <img
          src={middleimage}
          alt="Suman TV - Banner Image of Suman TV Network"
          className="w-2xl"
        />
      </div>
      
    </section>
);
}

export default ShowcaseSection
