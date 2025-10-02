import React from "react";
import Title from "./hero_components/Title";
import bannerIMG from "../assets/banner.png";

const HeroSection = () => {
  return (
    <section className="relative py-40 lg:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={bannerIMG}
          alt="Suman TV - Banner Image of Suman TV Network"
          className="w-[800px] h-[800px] object-fit 
          lg:w-full lg:h-full lg:object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#321A3E] via-[#ED0956] to-transparent opacity-10"></div>
      </div>
      <Title />
    </section>
  );
};

export default HeroSection;
