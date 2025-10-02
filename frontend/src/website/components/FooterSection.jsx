import React from 'react';
import { MapPin, Calendar, Mail, Phone } from 'lucide-react';
import sumantvlogo from '../assets/logo_suman_tv.png';

const FooterSection = () => (
  <footer className="bg-black text-white pt-16 pb-8 px-4">
    <div className="max-w-7xl mx-auto px-4 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          
          {/* Left Content (take more width) */}
          <div className="flex-1 lg:flex-[1] relative">
            <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-1">Suman TV Network</h2>
        <div className="w-24 h-1 bg-[#F19306] mb-8"></div>
        <div className="flex">
          {/* Logo */}
          <img
            src={sumantvlogo}
            alt="Suman TV"
            className="h-32 w-32 object-contain bg-white rounded mb-2 shadow mr-8"
          />
          {/* Vertical menu */}
          <ul className="flex flex-col gap-2 mt-2">
            <li>
              <a
                href="#home"
                className="text-sm text-white font-normal hover:text-yellow-400"
              >
                HOME
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-sm text-white font-normal hover:text-yellow-400"
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                href="#schedule"
                className="text-sm text-white font-normal hover:text-yellow-400"
              >
                SCHEDULE
              </a>
            </li>
            <li>
              <a
                href="#jury"
                className="text-sm text-white font-normal hover:text-yellow-400"
              >
                JURY
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-sm text-white font-normal hover:text-yellow-400"
              >
                CONTACT
              </a>
            </li>
          </ul>
        </div>
        <p className="mt-7 text-base font-normal leading-snug">
          TCI TOWERS, Pragati Nagar Colony Rd, SBH Colony, <br />
          Yousufguda, Hyderabad, Telangana 500045
        </p>
            </div>
          </div>

          
          {/* Right Image (take less width) */}
          <div className="flex-1 lg:flex-[1.6] space-y-6">
            <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-1">Suman TV Builder Awards</h2>
        <div className="w-24 h-1 bg-[#F19306] mb-8"></div>

        <div className="flex items-center mb-5 text-base font-normal justify-between flex-wrap gap-4">
          <div className="flex items-center bg-gradient-to-t from-[#D5B452] to-[#8F6D26] bg-clip-text text-transparent text-md font-medium text-start">
            <Calendar className="w-6 h-6 mr-2 text-[#8F6D26]" />
            <h6 className="mr-7">15 June, 2025</h6>
          </div>
          <div className="flex items-center bg-gradient-to-t from-[#D5B452] to-[#8F6D26] bg-clip-text text-transparent text-md font-medium text-start">
            <MapPin className="w-6 h-6 mr-2 text-[#8F6D26]" />
            <h6 className="mr-7">Novotel, Hyderabad</h6>
          </div>
          
        </div>

        <div className="flex items-center mb-8 text-base font-normal justify-between flex-wrap gap-4">
          <div className="flex items-center bg-gradient-to-t from-[#D5B452] to-[#8F6D26] bg-clip-text text-transparent text-md font-medium text-start">
            <Mail className="w-6 h-6 mr-2 text-[#8F6D26]" />
            <h6 className="mr-8">doctorawards@sumantv.com</h6>
          </div>
          <div className="flex items-center justify-start bg-gradient-to-t from-[#D5B452] to-[#8F6D26] bg-clip-text text-transparent text-md font-medium text-start">
            <Phone className="w-6 h-6 mr-2 text-[#8F6D26]" />
            <h6 className="mr-8">+91 9030392333</h6>
          </div>
        </div>

        {/* <button className="bg-gradient-to-b from-[#F04F82] to-[#F10651] hover:from-[#F10651] hover:to-[#F04F82] h-12 w-full text-white px-6 py-2 rounded transition-colors">
          REGISTER NOW
        </button> */}
            </div>
          </div>
          
        </div>
      </div>
    <div className="mt-14 border-t border-gray-700 pt-5 text-center text-base text-white/90">
      © 2025 Suman TV Network. All rights reserved.
    </div>
  </footer>
);

export default FooterSection;
