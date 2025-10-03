import React from 'react'

const page_head = ({ title, subtitle="", actions=[] }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-0 mb-4 gap-2">
      <div>
        <h1 className="text-xl sm:text-xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  )
}

export default page_head
