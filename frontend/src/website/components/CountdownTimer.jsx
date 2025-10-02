import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  // Event date: 18 Oct 2025, 10:00 AM
  const eventDate = new Date("2025-10-18T10:00:00");

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = eventDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Event started/passed
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HOURS" },
    { value: timeLeft.minutes, label: "MINUTES" },
    { value: timeLeft.seconds, label: "SECONDS" },
  ];

  return (
    <div className="flex justify-center space-x-2 sm:space-x-4 mb-6 lg:mb-4 flex-wrap">
      {timeUnits.map((unit, index) => (
        <div key={index}>
          <div className="bg-gradient-to-b from-[#F04F82] to-[#F10651] border-2 border-amber-400 text-white text-center p-2 sm:p-4 rounded-lg min-w-[60px] lg:min-w-[80px] sm:min-w-[100px] mb-2">
            <div className="text-xl sm:text-2xl font-bold">
              {unit.value.toString().padStart(2, "0")}
            </div>
          </div>
          <div className="text-xs sm:text-xs mt-1">{unit.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
