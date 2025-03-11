import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaHome, FaBullhorn, FaUser, FaBars, FaTimes, FaClipboardList, FaRegCalendar } from "react-icons/fa";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // For click & drag events
import timeGridPlugin from "@fullcalendar/timegrid"; // For week/day views
import listPlugin from "@fullcalendar/list"; // For list vie

const Dashboard = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handleRoutes = (path) =>{
    navigate(path);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 w-64 h-full bg-white shadow-xl p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button (Mobile) */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-600"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaTimes size={24} />
        </button>

        <h5 className="text-xl font-semibold text-gray-900 mb-4">Dashboard</h5>
        <nav className="flex flex-col gap-2">
          <button className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition" onClick={() => handleRoutes("/homepage")}>
            <FaHome className="mr-3 text-blue-900" />
            Home
          </button>
          <button className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition" onClick={() => handleRoutes("/request-shift")}>
            <FaClipboardList  className="mr-3 text-blue-900" />
            Request Shift
          </button>
          <button className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition" onClick={() => handleRoutes("/profile")}>
            <FaUser className="mr-3 text-blue-900" />
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </nav>
      </div>


      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Hamburger Menu Button (Mobile) */}
        <button className="md:hidden mb-4 text-gray-600" onClick={() => setIsSidebarOpen(true)}>
          <FaBars size={24} />
        </button>

        <h2 className="text-2xl font-semibold">Welcome, {user.user?.firstname || "Admin"}!</h2>

        {/* FullCalendar Component */}
        <div className="mt-6 bg-white shadow-lg p-4 rounded-lg">
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        height="auto"
        selectable={true}
        editable={true}
        dateClick={(info) => alert(`Clicked on: ${info.dateStr}`)}
        events={[
          {
            title: "Meeting",
            start: "2024-03-15T10:00:00",
            end: "2024-03-15T12:00:00",
            color: "blue",
          },
          {
            title: "Conference",
            start: "2024-03-18",
            end: "2024-03-20",
            color: "red",
          },
        ]}
      />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
