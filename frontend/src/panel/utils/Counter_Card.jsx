import React from 'react'

const Counter_Card = ({ title, count, icon: Icon, color, iconBg }) => {
  return (
     <div className="bg-gray-800 relative overflow-hidden rounded-xl p-4 flex-shrink-0">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-white">{count}</h3>
        </div>
        
        <div className={`rounded-full p-3 ${iconBg}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
    </div>
  )
}

export default Counter_Card
