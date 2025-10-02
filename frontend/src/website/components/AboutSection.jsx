import React from 'react';
import sumanDudiImage from '../assets/sumandudi.png';

const AboutSection = () => {
  return (
    <section className="py-15 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-10">
        <div className="block lg:hidden md:hidden sm:hidden">
          <h2 className="text-2xl lg:text-4xl md:text-5xl font-bold text-[#F19306] mb-4">
            Meet Our Visionary Leader
          </h2>
          <div className="w-24 h-1 bg-[#F19306] mb-8"></div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12">
          <div className="flex-1 lg:flex-[1.6] lg:space-y-6 space-y-2">
            <div className="hidden lg:block md:block sm:block">
              <h2 className="text-2xl lg:text-4xl md:text-5xl font-bold text-[#F19306] mb-4">
                Meet Our Visionary Leader
              </h2>
              <div className="w-24 h-1 bg-[#F19306] mb-8"></div>
            </div>
            
            <div className="lg:space-y-6 space-y-2 text-gray-700">
              <p className="text-sm leading-relaxed">
                <strong>Suman Dudi</strong> is the Founder & Chairman of Suman TV Network. In just nine years, 
                Suman TV has become India's largest digital media network, transforming the digital content 
                landscape with an astounding <strong>8-10 crore views per day</strong> and 
                <strong> 8 crore subscribers and followers</strong>.
              </p>
              
              <p className="text-sm leading-relaxed">
                Suman TV's success is evident through <strong>over 100 YouTube awards</strong> for its 
                high-quality content. The network covers diverse categories including News, Entertainment, 
                Health, Bhakti, Politics, and Business, appealing to a broad audience. With 
                <strong> over 100 branches across India</strong> and a 
                <strong> global footprint</strong> including offices in the USA, Singapore, and Australia.
              </p>
              
              <p className="text-sm leading-relaxed">
                Suman TV's journey represents impressive milestones, vast viewership, extensive subscriber 
                base, numerous awards, and global presence - a legacy of excellence and innovation in 
                digital media.
              </p>
            </div>

            {/* YouTube Video */}
          <div className="mt-10 w-full aspect-video max-w-4xl mx-auto">
            <h2 className="text-md lg:text-lg font-bold text-[#F19306] mb-4">
            Watch Doctors Awards Event 2025
            </h2>
            <iframe
              className="w-full h-full rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/qoFZ3wCzWsk"
              title="Suman TV YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          </div>
          
          <div className="flex-1 lg:flex-[1] relative">
            <div className="relative">
              <div className="w-full h-full mx-0 mb-6">
                <img 
                  src={sumanDudiImage} 
                  alt="Suman Dudi - Founder & Chairman of Suman TV Network" 
                  className="w-full h-full object-cover"
                />
              </div>
              
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
