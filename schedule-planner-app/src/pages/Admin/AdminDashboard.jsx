import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // For click & drag events
import timeGridPlugin from "@fullcalendar/timegrid"; // For week/day views
import listPlugin from "@fullcalendar/list"; // For list vie
import NavbarAdmin from "../../components/NavbarAdmin";

const AdminDashboard = () => {
  const { user, dispatch } = useContext(AuthContext);





  return (
    <div className="flex h-screen bg-gray-100">
      <NavbarAdmin />

        {/* <h2 className="text-2xl font-semibold">Welcome, {user.user?.firstname || "Admin"}!</h2> */}

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
  );
};

export default AdminDashboard;
