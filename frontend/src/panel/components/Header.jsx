import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PanelLeftCloseIcon, PanelLeftOpenIcon, LogOut } from "lucide-react"

function Header({ onToggleSidebar, onLogout }) {
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (onToggleSidebar) onToggleSidebar(!isOpen)
  }

  const handleLogout = () => {
    // Call parent logout handler if provided
    if (onLogout) {
      onLogout()
      navigate('/', { replace: true })
    } else {
      // Default logout behavior - redirect to login
      window.location.href = '/'
    }
  }

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-gray-900 dark:bg-gray-100 px-4 py-3 border-b border-gray-700">
      <div className="flex items-center">
        <button
          onClick={handleToggle}
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none p-2 hover:bg-gray-800 text-amber-50"
        >
          {isOpen ? <PanelLeftCloseIcon className="w-5 h-5" /> : <PanelLeftOpenIcon className="w-5 h-5" />}
          <span className="sr-only">Toggle Sidebar</span>
        </button>

        <h1 className="ml-4 text-lg font-semibold text-amber-50">
          Admin Dashboard
        </h1>
      </div>

      <button
        onClick={handleLogout}
        className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none p-2 px-3 hover:bg-gray-800 text-amber-50 hover:text-red-400"
        title="Logout"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </header>
  )
}

export default Header