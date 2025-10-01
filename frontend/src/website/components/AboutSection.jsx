import React from 'react';
import sumanDudiImage from '../assets/sumandudi.png';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          
          {/* Left Content (take more width) */}
          <div className="flex-1 lg:flex-[1.6] space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#F19306] mb-4">
                Meet Our Visionary Leader
              </h2>
              <div className="w-24 h-1 bg-[#F19306] mb-8"></div>
            </div>
            
            <div className="space-y-6 text-gray-700">
              <p className="text-sm leading-relaxed">
                <strong>Suman Dudi</strong> is the Founder & Chairman of Suman TV Network. In just nine years, 
                Suman TV has become India's largest digital media network, transforming the digital content 
                landscape with an astounding <strong>8-10 crore views per day</strong> and 
                <strong>8 crore subscribers and followers</strong>.
              </p>
              
              <p className="text-sm leading-relaxed">
                Suman TV's success is evident through <strong>over 100 YouTube awards</strong> for its 
                high-quality content. The network covers diverse categories including News, Entertainment, 
                Health, Bhakti, Politics, and Business, appealing to a broad audience. With 
                <strong>over 100 branches across India</strong> and a 
                <strong>global footprint</strong> including offices in the USA, Singapore, and Australia.
              </p>
              
              <p className="text-sm leading-relaxed">
                Suman TV's journey represents impressive milestones, vast viewership, extensive subscriber 
                base, numerous awards, and global presence - a legacy of excellence and innovation in 
                digital media.
              </p>
            </div>
          </div>
          
          {/* Right Image (take less width) */}
          <div className="flex-1 lg:flex-[1] relative">
            <div className="relative">
              {/* Suman Dudi's image */}
              <div className="w-full h-full mx-0 mb-6">
                <img 
                  src={sumanDudiImage} 
                  alt="Suman Dudi - Founder & Chairman of Suman TV Network" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Name and Title */}
              <div className="text-left">
                <h3 className="text-2xl font-bold text-dark mb-2">Suman Dudi</h3>
                <p className="text-dark text-lg">Founder & Chairman of Suman TV Network</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
