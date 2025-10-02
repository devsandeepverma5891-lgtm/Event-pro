import React from 'react';
import expoSeasonsIcon from "../assets/digitaloffering/schedule.png";         // Expo Seasons
import productLiveStoryIcon from "../assets/digitaloffering/campaign-play.png"; // Product Live Story
import companyProfileIcon from "../assets/digitaloffering/article-author.png";   // Company Profile
import brandingProjectIcon from "../assets/digitaloffering/campaign-like.png";   // Branding Project Promotions
import influencerProgsIcon from "../assets/digitaloffering/audience-tag.png";    // Influencer Progs
import onlineSalesIcon from "../assets/digitaloffering/article-author.png"; // (if not exist, fallback to campaign-increase.png)
import printMediaIcon from "../assets/digitaloffering/article-image.png";         // Print Media and Website Articles
import customerTestimonialsIcon from "../assets/digitaloffering/pie-chart-tick.png"; // Customer Testimonials
import leadAdsIcon from "../assets/digitaloffering/target-arrowhead.png";         // Lead Ads
import digitalMarketingIcon from "../assets/digitaloffering/seo-dashboard.png";   // Digital Marketing Sales Strategies

// ✅ merged array with both title + icon
const digitalOfferings = [
  { title: "EXPO SEASONS", icon: expoSeasonsIcon },
  { title: "PRODUCT LIVE STORY", icon: productLiveStoryIcon },
  { title: "COMPANY PROFILE", icon: companyProfileIcon },
  { title: "BRANDING PROJECT PROMOTIONS", icon: brandingProjectIcon },
  { title: "INFLUENCER PROGS", icon: influencerProgsIcon },
  { title: "ONLINE SALES SESSIONS", icon: onlineSalesIcon },
  { title: "PRINT MEDIA AND WEBSITE ARTICLES", icon: printMediaIcon },
  { title: "CUSTOMER TESTIMONIALS", icon: customerTestimonialsIcon },
  { title: "LEAD ADS", icon: leadAdsIcon },
  { title: "DIGITAL MARKETING SALES STRATEGIES", icon: digitalMarketingIcon },
];

const Offering = () => (
  <section className="relative py-0 lg:py-0 overflow-hidden bg-[#201E27]">
    <div className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Suman TV Digital Offerings
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#EAB435] to-[#F19306] mx-auto"></div>
        </div>

        {/* Digital Offerings Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {digitalOfferings.map((item, index) => (
            <div
              key={index}
              className="bg-[#2D2A35] rounded-xl lg:p-6 p-4 py-6 text-center hover:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-[#EFB314] rounded-full flex items-center justify-center mx-auto mb-4">
                <img src={item.icon} alt={item.title + " icon"} className="w-8 h-8 object-contain" />
              </div>
              <h3 className="text-white font-semibold text-[0.6em] leading-tight">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Offering;
