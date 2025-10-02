import React, { useState } from "react";
import awardees from "../assets/awardees.png";
import visitor from "../assets/visitor.png";
import stalls from "../assets/stalls.png";
import sponsor from "../assets/sponsor.png";
import RegistrationModal from "./RegistrationModal";

const RegistrationSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState("");
  const registrationOptions = [
    {
      img: visitor,
      title: "Visitor Registration",
      description: "General admission to all sessions and exhibitions.",
      buttonText: "Register Now",
    },
    {
      img: awardees,
      title: "Awards Registration",
      description: "Submit your nomination for industry awards.",
      buttonText: "Register Now",
    },
    {
      img: stalls,
      title: "Book a Stall",
      description: "Showcase your products and services.",
      buttonText: "Register Now",
    },
    {
      img: sponsor,
      title: "Sponsor Registration",
      description: "Become a sponsor and gain visibility.",
      buttonText: "Register Now",
    },
  ];

  return (
    <section className="py-5 lg:py-20 bg-white">
      <div className="lg:max-w-7xl mx-auto lg:px-6">
        {/* Section Title */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
            Choose Your Registration
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#EAB435] to-[#F19306] mx-auto"></div>
        </div>
        {/* Registration Cards */}
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto lg:mx-auto lg:max-w-6xl sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 md:gap-8">
          {registrationOptions.map((option, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#000000] to-[#2C2A2D] text-white rounded-2xl 
              pt-10 pb-5 px-2
lg:py-7 lg:px-3 flex flex-col items-center justify-between"
            >
              {/* Image */}
              <div className="flex justify-center mb-2">
                <img
                  src={option.img}
                  alt={option.title}
                  className="h-8 w-8 lg:h-12 lg:w-12 object-contain mb-2"
                />
              </div>
              {/* Title */}
              <h5 className="lg:text-[1rem] text-[0.8rem] font-semibold text-center mb-2">
                {option.title}
              </h5>
              {/* Description */}
              <p className="lg:text-[0.95rem] text-[0.69rem] font-normal text-gray-300 text-center mb-5">
                {option.description}
              </p>
              {/* Button */}
              <button
                className="bg-gradient-to-b from-[#F04F82] to-[#F10651] text-white 
                 py-2 px-0 rounded font-medium w-full text-center text-xs lg:text-lg"
                onClick={() => {
                  setSelectedRegistration(option.title);
                  setIsModalOpen(true);
                }}
              >
                {option.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRegistration("");
        }}
        registrationType={selectedRegistration}
      />
    </section>
  );
};

export default RegistrationSection;
