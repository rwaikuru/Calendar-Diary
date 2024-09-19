"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventDialog from "./EventDialog";

const Calendar = ({ onEventsChange }) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents));
      }
    }
  }, []);

  useEffect(() => {
    onEventsChange(currentEvents);
  }, [currentEvents, onEventsChange]);

  const handleDateClick = (selected) => {
    if (isDateInPast(selected)) {
      setErrorMessage("It's impossible to book a prior date.");
      setIsDialogOpen(true); // Open dialog to show the error
    } else {
      setSelectedDate(selected);
      setEditEvent(null); // Clear any existing event for editing
      setErrorMessage(null); // Clear any previous error message
      setIsDialogOpen(true); // Open dialog to add event
    }
  };

  const handleEventClick = (selected) => {
    setEditEvent(selected.event);
    setSelectedDate({
      start: selected.event.start,
      end: selected.event.end,
      view: selected.event.view,
    });
    setIsDialogOpen(true);
  };

  const handleSaveEvent = (event) => {
    if (editEvent) {
      // Edit existing event
      setCurrentEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === editEvent.id ? { ...e, ...event } : e
        )
      );
    } else {
      // Add new event
      setCurrentEvents((prevEvents) => [...prevEvents, event]);
    }

    // Save to local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }

    setIsDialogOpen(false);
  };

  return (
    <div className="justify-start items-start gap-8">
      <EventDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedDate={selectedDate}
        onSaveEvent={handleSaveEvent}
        editEvent={editEvent}
      />
      <FullCalendar
        height={"85vh"}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        select={handleDateClick}
        events={currentEvents}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
