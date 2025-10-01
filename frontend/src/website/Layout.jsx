import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import './styles/modal.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import RegistrationSection from './components/RegistrationSection'
import AwardsSection from './components/AwardsSection'
import SubscriptionSection from './components/SubscriptionSection'
import AboutSection from './components/AboutSection'
import OpportunitiesSection from './components/OpportunitiesSection'
import EventScheduleSection from './components/EventScheduleSection'
import FooterSection from './components/FooterSection'
import PropertySection from './components/PropertySection'
import ShowcaseSection from './components/ShowcaseSection'
import NetworkStatsSection from './components/NetworkStatsSection'
import Offering from './components/Offering'
import RegistrationModal from './components/RegistrationModal'

const Layout = () => {
  const [registrationType, setRegistrationType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Set the app element for accessibility
    Modal.setAppElement('#root');
  }, []);

  const handleRegistrationClick = (type) => {
    setRegistrationType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRegistrationType(null);
  };

  return (
    <div className="min-h-screen">
      <Header onRegistrationClick={handleRegistrationClick} />
      <HeroSection />
      <RegistrationSection />
      <AwardsSection />
      <PropertySection />
      <OpportunitiesSection />
      <ShowcaseSection />
      <NetworkStatsSection />
      {/* <EventScheduleSection /> */}
      <Offering />
      <AboutSection />
      <SubscriptionSection />
      
      
      
      <FooterSection />
      
      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        registrationType={registrationType}
      />
    </div>
  )
}

export default Layout
