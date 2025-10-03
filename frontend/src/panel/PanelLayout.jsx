
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import SidebarComponent from "./components/Sidebar";
import Header from "./components/Header";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer, toast } from "react-toastify";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Visitors from "./pages/Visitors";
import Stalls from "./pages/Stalls";
import Sponsors from "./pages/Sponsors";
import AwardeesReg from "./pages/Awardees";
import Teams from "./pages/Teams";
import Coordination from "./pages/Coordination";
import Volunteers from "./pages/Volunteers";
import Guests from "./pages/Guests";
import Speakers from "./pages/Speakers";
import AwardeesVIP from "./pages/AwardeesVIP";
import Timeline from "./pages/Timeline";
import Settings from "./pages/Settings";

function PanelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const isLoginRoute = location.pathname === "/" && !isAuthenticated;

  return (
    <div className="flex min-h-screen bg-gray-950 text-amber-50">
      {/* Sidebar */}
      {!isLoginRoute && sidebarOpen && (
        <div className="hidden xl:block">
          <SidebarComponent />
        </div>
      )}

      {/* Right content area */}
      <div
        className={`flex flex-col flex-grow ${
          !isLoginRoute ? "ml-0 xl:ml-[270px] 2xl:ml-72" : ""
        }`}
      >
        {isLoginRoute && (
          <Header onToggleSidebar={setSidebarOpen} onLogout={logout} />
        )}

        {/* Routes */}
        <Routes>
          {/* Public Login - redirect to dashboard if authenticated */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/events" element={<Events />} />

              {/* Registration Management */}
              <Route path="/registrations/visitors" element={<Visitors />} />
              <Route path="/registrations/stalls" element={<Stalls />} />
              <Route path="/registrations/sponsors" element={<Sponsors />} />
              <Route path="/registrations/awardees" element={<AwardeesReg />} />

              {/* VIP Management */}
              <Route path="/vips/guests" element={<Guests />} />
              <Route path="/vips/speakers" element={<Speakers />} />
              <Route path="/vips/awardees" element={<AwardeesVIP />} />

              {/* Team Management */}
              <Route path="/teams" element={<Teams />} />
              <Route path="/teams/coordination" element={<Coordination />} />
              <Route path="/teams/volunteers" element={<Volunteers />} />

              {/* Planning */}
              <Route path="/timeline-management" element={<Timeline />} />

              {/* System */}
              <Route path="/settings" element={<Settings />} />

              {/* Catch-all */}
              <Route
                path="*"
                element={<h2 className="text-red-400">404 - Page Not Found</h2>}
              />
            </Route>
          </Route>
        </Routes>

        <ToastContainer />
      </div>
    </div>
  );
}

export default PanelLayout;
