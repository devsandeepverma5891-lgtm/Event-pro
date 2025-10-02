import React, { useState, useEffect } from 'react';
import { Building2, ChevronDown, Menu } from 'lucide-react';
import logo from '../assets/logo.png';

const Header = ({ onRegistrationClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const handleDropdownClick = (type) => {
    setIsDropdownOpen(false);
    onRegistrationClick(type);
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If scrollY greater than 50px, change background
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 transition-colors duration-300 ${
        scrolled ? "bg-black bg-opacity-90" : "bg-transparent"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-3 items-center w-full">
          {/* Left Navigation */}
          <nav className="flex items-center space-x-8 justify-start">
            {/* <a href="#home" className="hover:text-yellow-400 transition-colors">
              HOME
            </a> */}
            {/* <a href="#about" className="hover:text-yellow-400 transition-colors">ABOUT</a>
            <a href="#schedule" className="hover:text-yellow-400 transition-colors">SCHEDULE</a> */}
          </nav>

          {/* Logo */}
          <div className="flex flex-col items-center justify-center">
            <img src={logo} alt="Logo" className="h-20 w-fit object-contain"/>
          </div>

          {/* Right Navigation */}
          <nav className="flex items-center space-x-8 justify-end">
            <a href="#contact" className="hover:text-yellow-400 transition-colors text-sm font-semibold">
              CONTACT
            </a>
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-gradient-to-b from-[#F04F82] to-[#F10651] hover:from-[#F10651] hover:to-[#F04F82] px-6 py-3 rounded text-white font-semibold text-sm transition-colors flex items-center gap-2"
              >
                REGISTER NOW
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 px-2 py-1 origin-top-right bg-gradient-to-b from-[#000000] to-[#2C2A2D] text-white rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleDropdownClick('Visitor Registration')}
                      className="hover:bg-gradient-to-b from-[#F04F82] to-[#F10651] text-white block w-full px-4 py-2 text-left text-sm rounded mb-2"
                    >
                      Visitor Registration
                    </button>
                    <button
                      onClick={() => handleDropdownClick('Awards Registration')}
                      className="hover:bg-gradient-to-b from-[#F04F82] to-[#F10651] text-white block w-full px-4 py-2 text-left text-sm rounded mb-2"
                    >
                      Nominate for Award
                    </button>
                    <button
                      onClick={() => handleDropdownClick('Book a Stall')}
                      className="hover:bg-gradient-to-b from-[#F04F82] to-[#F10651] text-white block w-full px-4 py-2 text-left text-sm rounded mb-2"
                    >
                      Book a Stall
                    </button>
                    <button
                      onClick={() => handleDropdownClick('Sponsor Registration')}
                      className="hover:bg-gradient-to-b from-[#F04F82] to-[#F10651] text-white block w-full px-4 py-2 text-left text-sm rounded mb-2"
                    >
                      Sponsor Registration
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden relative flex items-center justify-center h-24">
          {/* Hamburger Menu */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 px-2"
            aria-label="Open Menu"
            // onClick={openMobileMenu}
          >
            <Menu className="h-7 w-7 text-white" />
          </button>
          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center">
            <img src={logo} alt="Logo" className="h-16 w-auto object-contain mx-auto" />
            <span className="text-sm mt-1 text-yellow-400 tracking-wide font-semibold">BUILDER AWARDS</span>
          </div>
          {/* Vertical Register Button */}
          <button
            onClick={() => onRegistrationClick()}
            className="absolute right-0 top-1/2 -translate-y-1/2 px-0 py-0"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              background: 'linear-gradient(180deg, #F04F82 0%, #F10651 100%)',
              color: 'white',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '0.5rem 0.7rem',
              letterSpacing: '0.1em'
            }}
          >
            REGISTER NOW
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="lg:hidden mt-4 pt-4 border-t border-gray-700">
          <nav className="flex flex-wrap justify-center space-x-6 text-sm">
            {/* <a
              href="#home"
              className="hover:text-yellow-400 transition-colors font-semibold"
            >
              HOME
            </a>
            <a
              href="#about"
              className="hover:text-yellow-400 transition-colors font-semibold"
            >
              ABOUT
            </a>
            <a
              href="#schedule"
              className="hover:text-yellow-400 transition-colors font-semibold"
            >
              SCHEDULE
            </a>
            <a
              href="#jury"
              className="hover:text-yellow-400 transition-colors font-semibold"
            >
              JURY
            </a> */}
            <a
              href="#contact"
              className="hover:text-yellow-400 transition-colors font-semibold"
            >
              CONTACT
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
