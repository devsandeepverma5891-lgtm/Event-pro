
import Button from "../utils/Button"
import Page_head from "../utils/page_head"
import Counter_Card from "../utils/Counter_Card"
import useDashboardStats from "../hooks/useDashboardStats"

import { Users, Award, Building, BarChart3, Calendar, Settings, RefreshCw } from 'lucide-react';



const Dashboard = () => {
  const { stats, loading, error, refreshStats } = useDashboardStats()

  const cardData = [
    {
      title: "Total Registrations",
      count: loading ? "..." : stats.totalRegistrations.toString(),
      icon: Users,
      color: "text-white",
      iconBg: "bg-orange-400"
    },
    {
      title: "Visitors",
      count: loading ? "..." : stats.visitors.toString(),
      icon: Users,
      color: "text-white",
      iconBg: "bg-purple-500"
    },
    {
      title: "Awards",
      count: loading ? "..." : stats.awards.toString(),
      icon: Award,
      color: "text-white",
      iconBg: "bg-gray-600"
    },
    {
      title: "Stalls",
      count: loading ? "..." : stats.stalls.toString(),
      icon: Building,
      color: "text-white",
      iconBg: "bg-green-500"
    },
    {
      title: "Sponsors",
      count: loading ? "..." : stats.sponsors.toString(),
      icon: BarChart3,
      color: "text-white",
      iconBg: "bg-gray-600"
    },
    {
      title: "Active Events",
      count: loading ? "..." : stats.activeEvents.toString(),
      icon: Calendar,
      color: "text-white",
      iconBg: "bg-orange-400"
    }
  ];

  return (
    <div>
      <Page_head 
        title="Admin Dashboard"
        subtitle="Manage events, registrations, and teams"
        actions={
          <div className="flex gap-2">
            <Button
              onClick={refreshStats}
              tooltip="Refresh Statistics"
              color="default"
              className="flex items-center"
              disabled={loading}
            >
              <RefreshCw className={`size-4 hover:text-gray-50 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              tooltip="Settings"
              color="default"
              className="flex items-center"
            >
              <Settings className="size-4  hover:text-gray-50 mr-2" />
              Settings
            </Button>
          </div>
        }
      />

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-4 w-full">
        {cardData.map((card, index) => (
          <div key={index} className="w-auto min-w-[14.8%]">
            <Counter_Card
              key={index}
              title={card.title}
              count={card.count}
              icon={card.icon}
              color={card.color}
              iconBg={card.iconBg}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
