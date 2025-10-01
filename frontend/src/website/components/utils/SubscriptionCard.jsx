import React, { useState } from "react";
import { Crown } from "lucide-react";
import RegistrationModal from "../RegistrationModal";

const SubscriptionCard = ({
  name,
  price,
  icon: Icon = Crown,
  isPopular,
  gold,
  features,
  onEnquire
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState('');

  const handleEnquireClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubscription('');
  };

  const handleSubscriptionSelect = (type) => {
    setSelectedSubscription(type);
  };

  const subscriptionTypes = [
    '10 PACK PLATINUM',
    '6 PACK GOLD',
    '4 PACK SILVER',
    '2 PACK BRONZE'
  ];

  return (
    <div className="relative w-[265px] pb-6 mx-auto">
      {/* Pill Badge */}
      {isPopular && (
        <span className="absolute left-1/2 -top-4 -translate-x-1/2 z-10 bg-gradient-to-r from-[#E0BE7F] to-[#C99A17] text-white text-sm font-medium px-2 py-1.5 rounded-full shadow">
          Most Popular
        </span>
      )}

      {/* Header */}
      <div
        className={`px-5 pt-7 pb-4 flex items-center justify-between rounded-t-lg ${
          gold
            ? "bg-gradient-to-b from-[#E0BE7F] to-[#C99A17]" // Gold gradient
            : "bg-gradient-to-b from-[#D1D1D1] to-[#6F6F6F]" // Silver gradient
        }`}
      >
        <div>
          <div className="text-xs font-semibold text-white tracking-wide">
            {name}
          </div>
          <div className="text-[13px] text-white font-medium mt-1">
            ₹{price} + GST
          </div>
        </div>
        {Icon && <Icon className="w-8 h-8 text-white" />}
      </div>

      {/* Features */}
      <ul className="py-6 px-5 flex flex-col gap-4 min-h-[380px] bg-[#1B1A1A]">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <span className="mt-1 w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
            <span className="text-white text-[13px] font-semibold">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="px-5 pb-5 rounded-b-lg bg-[#1B1A1A]">
        <button className="w-full border border-white rounded-md py-2 text-white font-semibold text-base transition mb-3">
          More Details
        </button>
        <button 
          onClick={handleEnquireClick}
          className="w-full transition bg-gradient-to-b from-[#F04F82] to-[#F10651] hover:from-[#F10651] hover:to-[#F04F82] rounded-md py-3 text-base font-bold text-white shadow-md"
        >
          Enquire Now
        </button>
        
        <RegistrationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          registrationType="Enquire Now"
          selectedSubscription={name}
          subscriptionTypes={subscriptionTypes}
          selectedSubscriptionType={name}
          onSubscriptionSelect={handleSubscriptionSelect}   // ✅ Pass it here
        />

      </div>
    </div>
  );
};

export default SubscriptionCard;
