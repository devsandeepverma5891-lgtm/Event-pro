import React from "react"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <main className="flex-grow px-6 py-3">
      <Outlet />
    </main>
  )
}

export default MainLayout
