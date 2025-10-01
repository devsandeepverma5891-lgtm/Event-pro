import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Award, Building } from 'lucide-react';

const EventScheduleSection = () => {
  const [activeTab, setActiveTab] = useState('morning');

  const sessions = {
    morning: [
      {
        time: "8:00 AM - 9:00 AM",
        title: "Registration Welcome",
        description: "Right on Province, Research & Operating Committee with Guest's general info."
      },
      {
        time: "9:00 AM - 10:30 AM",
        title: "Best Villas Awards",
        description: "Award ceremony and announcement of awards for best villas."
      },
      {
        time: "10:30 AM - 11:00 AM",
        title: "Best Highrise Awards",
        description: "Award ceremony and announcement of awards for best highrise projects."
      }
    ],
    afternoon: [
      {
        time: "12:00 PM - 1:00 PM",
        title: "Lunch Break",
        description: "Networking lunch with industry professionals and award winners."
      },
      {
        time: "1:00 PM - 2:30 PM",
        title: "Commercial Projects Awards",
        description: "Recognition for outstanding commercial real estate developments."
      },
      {
        time: "2:30 PM - 3:30 PM",
        title: "Innovation in Construction",
        description: "Awards for innovative construction techniques and sustainable practices."
      }
    ],
    evening: [
      {
        time: "4:00 PM - 5:00 PM",
        title: "Lifetime Achievement Awards",
        description: "Honoring industry veterans and their contributions to real estate."
      },
      {
        time: "5:00 PM - 6:00 PM",
        title: "Gala Dinner",
        description: "Celebration dinner with entertainment and networking opportunities."
      },
      {
        time: "6:00 PM - 7:00 PM",
        title: "Closing Ceremony",
        description: "Final remarks and thank you to all participants and sponsors."
      }
    ]
  };


  return (
    <div>
      {/* Event Schedule Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Event Schedule
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              {[
                { id: 'morning', label: 'Morning Session' },
                { id: 'afternoon', label: 'Afternoon Session' },
                { id: 'evening', label: 'Evening Session' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-pink-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Session Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sessions[activeTab].map((session, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-2xl p-6 text-white shadow-2xl">
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="text-yellow-400 font-semibold">{session.time}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{session.title}</h3>
                <p className="text-gray-300 leading-relaxed">{session.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventScheduleSection;
