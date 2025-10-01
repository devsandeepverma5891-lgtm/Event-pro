import React from 'react';
import opportunitiesbanner from '../assets/opportunities/opportunitiesbanner.png';
import leadGeneration from '../assets/opportunities/Lead Generation.png';
import brandPromotion from '../assets/opportunities/Brand Promotion 1.png';
import projectShowcase from '../assets/opportunities/Project Showcase.png';
import networking from '../assets/opportunities/networking.png';
import marketResearch from '../assets/opportunities/Market Research.png';
import salesOpportunities from '../assets/opportunities/Sales Opportunities.png';
import mediaExposure from '../assets/opportunities/Media Exposure.png';
import directCustomer from '../assets/opportunities/Direct Customer Interaction.png';

const opportunities = [
  { img: leadGeneration, title: "Lead Generation" },
  { img: brandPromotion, title: "Brand Promotion" },
  { img: projectShowcase, title: "Project Showcasing" },
  { img: networking, title: "Networking Opportunity" },
  { img: marketResearch, title: "Market Research" },
  { img: salesOpportunities, title: "Sales Opportunities" },
  { img: mediaExposure, title: "Media Exposure" },
  { img: directCustomer, title: "Direct Customer Interaction" }
];

const OpportunitiesSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      {/* Section Title */}
      <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
          Amazing Opportunities for Real Estate Firms
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#EAB435] to-[#F19306] mx-auto"></div>
      </div>
      <div className="flex flex-col lg:flex-row items-start gap-5">
        {/* Left Side - Banner Image */}
        <div className="w-full lg:w-1/2 flex justify-start">
          <img
            src={opportunitiesbanner}
            alt="Opportunities Banner"
            className="rounded-xl shadow-lg object-cover w-[320px] h-full lg:w-full lg:h-full"
          />
        </div>
        {/* Right Side - Opportunities Grid */}
        <div className="w-full lg:w-1/2 grid grid-cols-3 gap-6">
          {opportunities.map((op, idx) => (
            <div
              key={idx}
              className="bg-white border-1 border-[#F19306] rounded-xl p-6 flex flex-col items-start hover:border-pink-400 transition"
            >
              <img src={op.img} alt={op.title} className="w-12 h-12 mb-3 object-contain" />
              <span className="text-base font-semibold text-gray-700 text-start">{op.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default OpportunitiesSection;
