import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 6,
    minutes: 42,
    seconds: 24
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HOURS' },
    { value: timeLeft.minutes, label: 'MINUTES' },
    { value: timeLeft.seconds, label: 'SECONDS' }
  ];

  return (
    <div className="flex justify-center space-x-2 sm:space-x-4 mb-6 lg:mb-4 flex-wrap">
      {timeUnits.map((unit, index) => (
        <div>
        <div key={index} className="bg-gradient-to-b from-[#F04F82] to-[#F10651] border-2 border-amber-400 text-white text-center p-2 sm:p-4 rounded-lg min-w-[60px] lg:min-w-[80px] sm:min-w-[100px] mb-2">
          <div className="text-xl sm:text-2xl font-bold">{unit.value.toString().padStart(2, '0')}</div>
        </div>
          <div className="text-xs sm:text-xs mt-1">{unit.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
