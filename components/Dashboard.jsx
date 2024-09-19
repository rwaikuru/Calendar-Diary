"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faList } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Room type, room, and status options
const roomTypes = [
  { label: "Cafeteria", value: "cafeteria" },
  { label: "Auditorium", value: "auditorium" },
  { label: "Flexi Rooms", value: "flexi" },
  { label: "Boardroom", value: "boardroom" },
  { label: "Classroom", value: "classroom" },
  { label: "Personal Office", value: "personal_office" },
  { label: "Atrium", value: "atrium" },
  { label: "Syndicate", value: "syndicate" },
  { label: "CFAO", value: "cfao" },
];

const rooms = [
  "Maasai Mara", "Almasi", "Atrium", "CFAO", "Chui", "Cityclock",
  "Coop Room Fahari", "GK", "KCB Bank", "Kifaru", "Mbuni", "Mvuli",
  "Nyati", "Oak", "Old Mutual", "Palm", "Rwenzori", "Tanzanite",
  "Tembo", "Auditorium", "Watamu",
];

const statusOptions = ["Upcoming", "Pending", "Cancelled", "Recurring", "Past"];

const Dashboard = ({ events }) => {
  const [viewMode, setViewMode] = useState("calendar");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Group events by date
  const groupEventsByDate = (events) => {
    return events.reduce((groups, event) => {
      const date = new Date(event.start).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "long",
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {});
  };

  // Filter events based on room type, room, and status
  const filteredEvents = events.filter((event) => {
    const matchesRoomType = selectedRoomType ? event.roomType === selectedRoomType : true;
    const matchesRoom = selectedRoom ? event.room === selectedRoom : true;
    const matchesStatus = selectedStatus ? event.status === selectedStatus : true;
    return matchesRoomType && matchesRoom && matchesStatus;
  });

  const groupedEvents = groupEventsByDate(filteredEvents);

  const handleEventClick = (selected) => {
    setSelectedEvent(selected.event);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="px-4 py-6">
      {/* Filters */}
      <div className="mb-4 flex gap-4">
        <select onChange={(e) => setSelectedRoomType(e.target.value)} className="p-2 border rounded-md">
          <option value="">Select Room Type</option>
          {roomTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSelectedRoom(e.target.value)} className="p-2 border rounded-md">
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSelectedStatus(e.target.value)} className="p-2 border rounded-md">
          <option value="">Select Status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* View mode toggle */}
      <div className="flex items-center mb-4">
        <button
          className={`p-2 ${viewMode === "calendar" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setViewMode("calendar")}
        >
          <FontAwesomeIcon icon={faCalendar} />
        </button>
        <button
          className={`p-2 ml-2 ${viewMode === "list" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setViewMode("list")}
        >
          <FontAwesomeIcon icon={faList} />
        </button>
      </div>

      {/* Calendar view */}
      {viewMode === "calendar" && (
        <FullCalendar
          height={"85vh"}
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next,today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={false}
          selectable={true}
          events={filteredEvents}
          eventClick={handleEventClick}
        />
      )}

      {/* List view */}
      {viewMode === "list" && (
        <div className="space-y-6">
          {Object.keys(groupedEvents).length > 0 ? (
            Object.keys(groupedEvents).map((date) => (
              <div key={date} className="flex">
                <div className="w-1/4 pr-4">
                  <div className="sticky top-0">
                    <p className="font-semibold text-lg">{date.split(",")[0]}</p>
                    <p className="text-gray-500">{date.split(",")[1]}</p>
                  </div>
                </div>

                <div className="w-3/4 space-y-4">
                  {groupedEvents[date].map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4 shadow-md relative">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-semibold">{event.title}</h2>
                          <p className="text-gray-600">{new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                        </div>
                        <button
                          className="px-4 py-2 rounded-xl border border-neutral-600 text-black hover:bg-gray-100 transition duration-200 flex items-center"
                          onClick={() => {
                            setSelectedEvent(event);
                            setIsDialogOpen(true);
                          }}
                        >
                          View
                        </button>
                      </div>
                      <p className="text-gray-600">
                        End: {event.end && new Date(event.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      )}

      {/* Event dialog */}
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent?.title}</DialogTitle>
            </DialogHeader>
            <p>Start: {new Date(selectedEvent?.start).toLocaleString()}</p>
            <p>End: {selectedEvent?.end && new Date(selectedEvent.end).toLocaleString()}</p>
            <p>Room: {selectedEvent?.room}</p>
            <p>Participants: {selectedEvent?.participants}</p>
            <p>Meal Requirements: {selectedEvent?.mealRequirements}</p>
            <p>Special Requests: {selectedEvent?.specialRequests}</p>
            <p>Dietary Needs: {selectedEvent?.dietaryNeeds}</p>
            <p>Additional Comments: {selectedEvent?.additionalComments}</p>
            {selectedEvent?.attachedFile && <p>Attached File: {selectedEvent.attachedFile}</p>}
            <button onClick={handleCloseDialog} className="bg-blue-950 text-white p-3 mt-5 rounded-md">
              Closes
            </button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Dashboard;
