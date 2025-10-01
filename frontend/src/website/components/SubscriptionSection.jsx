import React from 'react';
import { Crown, Star, Trophy, Medal } from 'lucide-react';
import subscriptionbg from '../assets/subscription/subscription-bg.png';
import SubscriptionCard from './utils/SubscriptionCard';


const packages = [
  {
    name: "10 PACK PLATINUM",
    price: "10 Lakhs + GST",
    icon: Crown,
    isPopular: true,
    features: [
      "EXPO STALLS (Big Size)",
      "PODCAST LIFE STORY",
      "COMPANY PROFILE",
      "PROMOTIONS",
      "INFLUENCER VIDEOS",
      "STRIP ADS (20k+ Views)",
      "PRINT MEDIA ARTICLES",
      "ONLINE SALES SESSIONS",
      "DIGITAL STRATEGIES",
      "CUSTOMER TESTIMONIALS"
    ]
  },
  {
    name: "6 PACK GOLD",
    price: "6 Lakhs + GST",
    icon: Star,
    gold: true,
    features: [
      "EXPO STALLS (Medium Size)",
      "PODCAST LIFE STORY",
      "COMPANY PROFILE",
      "STRIP ADS (6k+ Views)",
      "ONLINE SALES SESSIONS",
      "DIGITAL STRATEGIES"
    ]
  },
  {
    name: "4 PACK SILVER",
    price: "4 Lakhs + GST",
    icon: Trophy,
    features: [
      "PODCAST LIFE STORY",
      "ONGOING PRODUCT PROMOTIONS",
      "STRIP ADS (2k+ Views)",
      "ONLINE SALES SESSIONS"
    ]
  },
  {
    name: "3 PACK SILVER",
    price: "3 Lakhs + GST",
    icon: Medal,
    features: [
      "PODCAST LIFE STORY",
      "GO PROJECT PROMOTIONS",
      "STRIP ADS (1 lakh+ Views)",
      "ONLINE SALES SESSIONS"
    ]
  }
];

const SubscriptionSection = () => (
  <section className="relative py-0 lg:py-20 overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img
        src={subscriptionbg}
        alt="Suman TV - Banner Image of Suman TV Network"
        className="w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#F04F82] opacity-80"></div>
    </div>

    {/* Content */}
    <div className="relative z-10">
      {/* Section Title */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
        EVENT PACKAGES - DELIVERABLES
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#EAB435] to-[#F19306] mx-auto"></div>
      </div>

      {/* Package cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 max-w-6xl mx-auto">
        {packages.map((pkg, i) => (
          <SubscriptionCard key={i} {...pkg} />
        ))}
      </div>
    </div>
  </section>
);

export default SubscriptionSection;
