import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  Users,
  Package,
  DollarSign,
  Gem,
  UserCircle,
  UserPlus,
  User,
  MessageSquare,
  Settings,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";



// Sidebar menu
const sidebarMenu = [
  {
    group: "Overview",
    items: [
      { 
        title: "Dashboard", 
        href: "/", 
        icon: BarChart3 
      }
    ],
  },
  {
    group: "Events",
    items: [
      { 
        title: "Event Management", 
        href: "/events", 
        icon: Calendar 
      }
    ],
  },
  {
    group: "Registration Management",
    items: [
      { 
        title: "Visitors", 
        href: "/registrations/visitors", 
        icon: Users 
      },
      { 
        title: "Stalls", 
        href: "/registrations/stalls", 
        icon: Package 
      },
      { 
        title: "Sponsors", 
        href: "/registrations/sponsors", 
        icon: DollarSign 
      },
      { 
        title: "Awardees Nominees", 
        href: "/registrations/awardees", 
        icon: Gem 
      },
    ],
  },
  {
    group: "VIP Management",
    items: [
      { 
        title: "Guests", 
        href: "vips/guests", 
        icon: User 
      },
      { 
        title: "Speakers", 
        href: "vips/speakers", 
        icon: MessageSquare 
      },
      { 
        title: "Awardees", 
        href: "vips/awardees", 
        icon: Gem 
      },
    ],
  },
  {
    group: "Team Management",
    items: [
      { 
        title: "Team Management", 
        href: "/teams", 
        icon: Users 
      },
      { 
        title: "Coordination Team", 
        href: "/teams/coordination", 
        icon: UserCircle 
      },
      { 
        title: "Volunteers Team", 
        href: "/teams/volunteers", 
        icon: UserPlus 
      },
    ],
  },
  {
    group: "Planning",
    items: [
      {
        title: "Timeline Management",
        href: "/timeline-management",
        icon: Calendar,
        badge: "NEW",
      },
    ],
  },
  {
    group: "System",
    items: [
      { 
        title: "Settings", 
        href: "/settings", 
        icon: Settings 
      }
    ],
  },
];


const SidebarComponent = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(true);

  // toggle html class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

 const renderMenuItem = (item, index) => {
  const isActive = location.pathname === item.href;
  const IconComponent = item.icon || Users; // Directly use item.icon

  return (
    <Link
      key={index}
      to={item.href}
      className={`group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize
        lg:my-1 2xl:mx-5 2xl:my-2 ${
          isActive
            ? "bg-gray-700 before:top-[0] before:bottom-[0] text-amber-400 before:absolute before:-end-0 before:block before:h-full before:w-1 before:rounded-ee-md before:rounded-se-md  before:bg-amber-400 2xl:before:-start-5"
            : "text-gray-400 transition-colors duration-200 hover:bg-gray-800 hover:text-gray-50 dark:text-gray-400 dark:hover:text-gray-200"
        }`}
    >
      <div className="flex items-center truncate text-[13px]">
        <span
          className={`me-2 inline-flex size-4 items-center justify-center rounded-md ${
            isActive ? "text-amber-400" : "text-gray-400"
          }`}
        >
          <IconComponent className="size-4  hover:text-gray-50" />
        </span>
        <span className="truncate font-normal">{item.title}</span>
      </div>
      {item.badge && (
        <span className="inline-flex items-center justify-center rounded-full text-[11px] px-2 py-0.5 font-medium border bg-red-100 text-red-600 dark:bg-red-200 dark:text-red-900">
          {item.badge}
        </span>
      )}
    </Link>
  );
};

  return (
    <aside className="fixed bottom-0 start-0 z-50 h-full w-[270px] border-e border-gray-700 bg-gray-900 dark:bg-gray-50 2xl:w-72 hidden xl:block">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-gray-900 dark:bg-gray-100 px-6 py-3 border-b border-gray-700">
        <a href="/" className="text-lg font-bold text-amber-400">
          EventPro
        </a>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <Sun className="size-5 text-yellow-400" />
          ) : (
            <Moon className="size-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Menu */}
      <div className="custom-scrollbar h-[calc(100%-60px)] overflow-y-auto">
        <div className="mt-4 pb-3 3xl:mt-6">
          {sidebarMenu.map((menuGroup, groupIndex) => (
            <div key={groupIndex} className="mb-5">
              <h6 className="mb-2 truncate px-6 text-[11px] font-normal uppercase tracking-widest text-amber-300 2xl:px-8">
                {menuGroup.group}
              </h6>
              {menuGroup.items.map((item, itemIndex) =>
                renderMenuItem(item, itemIndex)
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SidebarComponent;
