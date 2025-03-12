import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaHome, FaBullhorn, FaUser, FaBars, FaTimes, FaClipboardList, FaRegCalendar } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext';

const NavbarAdmin = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };

  const handleRoutes = (path) => {
    navigate(path);
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 w-64 h-full bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <button className="md:hidden absolute top-4 right-4 text-gray-600" onClick={() => setIsSidebarOpen(false)}>
          <FaTimes size={24} />
        </button>

        <h5 className="text-xl font-semibold text-gray-900 mb-4">Dashboard</h5>
        <nav className="flex flex-col gap-2">
          <button className="flex items-center p-3 rounded-lg hover:bg-blue-50" onClick={() => handleRoutes("/admin/homepage")}>
            <FaHome className="mr-3 text-blue-900" /> Home
          </button>
          <button className="flex items-center p-3 rounded-lg hover:bg-blue-50" onClick={() => handleRoutes("/admin/manage-shift")}>
            <FaRegCalendar className="mr-3 text-blue-900" /> Manage Shift
          </button>
          <button className="flex items-center p-3 rounded-lg hover:bg-blue-50" onClick={() => handleRoutes("/admin/request-shift")}>
            <FaClipboardList className="mr-3 text-blue-900" /> Requests
          </button>
          <button className="flex items-center p-3 rounded-lg hover:bg-blue-50" onClick={() => handleRoutes("/admin/announcement")}>
            <FaBullhorn className="mr-3 text-blue-900" /> Announcement
          </button>
          <button className="flex items-center p-3 rounded-lg hover:bg-blue-50" onClick={() => handleRoutes("/admin/profile")}>
            <FaUser className="mr-3 text-blue-900" /> Profile
          </button>
          <button onClick={handleLogout} className="flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50">
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </nav>
      </div>

      {/* Hamburger Button */}
      <button className="md:hidden fixed top-4 left-4 text-gray-600 z-50" onClick={() => setIsSidebarOpen(true)}>
        <FaBars size={24} />
      </button>
    </div>
  );
};


export default NavbarAdmin;