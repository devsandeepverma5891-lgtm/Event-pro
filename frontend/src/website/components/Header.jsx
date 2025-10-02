import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react"; // X for close
import logo from "../assets/logo.png";

const Header = ({ onRegistrationClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownClick = (type) => {
    setIsDropdownOpen(false);
    onRegistrationClick(type);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-0 px-4 transition-colors duration-300 ${
        scrolled ? "bg-black bg-opacity-90" : "bg-transparent"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-3 items-center w-full">
          {/* Left Navigation */}

          <nav className="flex items-center space-x-8 justify-start">
            {/* <a href="#home" className="hover:text-yellow-400 transition-colors">Home</a> */}
          </nav>
          <div className="flex flex-col items-center justify-center">
            <img src={logo} alt="Logo" className="h-20 w-fit object-contain" />
          </div>
          <nav className="flex items-center space-x-8 justify-end">
            <a
              href="#contact"
              className="hover:text-yellow-400 transition-colors text-sm font-semibold"
            >
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
                    onClick={() => handleDropdownClick("Visitor Registration")}
                    className="hover:bg-gradient-to-b from-[#F04F82] to-[#F10651] text-white block w-full px-4 py-2 text-left text-sm rounded mb-2"
                  >
                    Visitor Registration
                  </button>
                  <button
                    onClick={() => handleDropdownClick("Awards Registration")}
                    className="hover:bg-gradient-to-b from-[#F04F82] to-[#F10651] text-white block w-full px-4 py-2 text-left text-sm rounded mb-2"
                  >
                    Nominate for Award
                  </button>
                  <button
                    onClick={() => handleDropdownClick("Book a Stall")}
                    className="hover:bg-gradient-to-b from-[#F04F82] to-[#F10651] text-white block w-full px-4 py-2 text-left text-sm rounded mb-2"
                  >
                    Book a Stall
                  </button>
                  <button
                    onClick={() => handleDropdownClick("Sponsor Registration")}
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
        <div className="lg:hidden relative flex items-center justify-between py-4">
          {/* Hamburger Menu */}
          <button
            className="px-2"
            aria-label="Open Menu"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-7 w-7 text-white" />
          </button>

          {/* Center Logo */}
          <div className="flex flex-col items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-auto object-contain mx-auto"
            />
          </div>

          {/* Register Button (Horizontal) */}
          <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-gradient-to-b from-[#F04F82] to-[#F10651] hover:from-[#F10651] hover:to-[#F04F82] px-4 py-2 rounded text-white font-semibold text-sm transition-colors"
          >
            REGISTER NOW
          </button>
          {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 px-2 py-1 origin-top-right bg-gradient-to-b from-[#000000] to-[#2C2A2D] text-white rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className="py-1">
                  <button
                    onClick={() => handleDropdownClick("Visitor Registration")}
                    className="hover:bg-gradient-to-b from-[#F04F82] to-[#F10651] text-white block w-full px-4 py-2 text-left text-sm rounded mb-2"
                  >
                    Visitor Registration
                  </button>
                  <button
                    onClick={() => handleDropdownClick("Awards Registration")}
                    className="hover:bg-gradient-to-b from-[#F04F82] to-[#F10651] text-white block w-full px-4 py-2 text-left text-sm rounded mb-2"
                  >
                    Nominate for Award
                  </button>
                  <button
                    onClick={() => handleDropdownClick("Book a Stall")}
                    className="hover:bg-gradient-to-b from-[#F04F82] to-[#F10651] text-white block w-full px-4 py-2 text-left text-sm rounded mb-2"
                  >
                    Book a Stall
                  </button>
                  <button
                    onClick={() => handleDropdownClick("Sponsor Registration")}
                    className="hover:bg-gradient-to-b from-[#F04F82] to-[#F10651] text-white block w-full px-4 py-2 text-left text-sm rounded mb-2"
                  >
                    Sponsor Registration
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Drawer (Mobile Menu) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50">
            {/* Background overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>

            {/* Drawer Panel */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000] to-[#2C2A2D] shadow-lg transform transition-transform duration-300 ease-in-out">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <img src={logo} alt="Logo" className="h-10" />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <nav className="flex flex-col p-4 space-y-4">
                <a
                  href="#about"
                  className="flex items-center bg-gradient-to-t from-[#D5B452] to-[#8F6D26] bg-clip-text text-transparent text-md font-medium text-start"
                >
                  ABOUT
                </a>
                <a
                  href="#schedule"
                  className="flex items-center bg-gradient-to-t from-[#D5B452] to-[#8F6D26] bg-clip-text text-transparent text-md font-medium text-start"
                >
                  SCHEDULE
                </a>
                <a
                  href="#jury"
                  className="flex items-center bg-gradient-to-t from-[#D5B452] to-[#8F6D26] bg-clip-text text-transparent text-md font-medium text-start"
                >
                  JURY
                </a>
                <a
                  href="#contact"
                  className="flex items-center bg-gradient-to-t from-[#D5B452] to-[#8F6D26] bg-clip-text text-transparent text-md font-medium text-start"
                >
                  CONTACT
                </a>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
