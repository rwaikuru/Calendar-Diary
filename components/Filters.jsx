import React, { useState } from "react";

const Filters = ({ onFilterChange }) => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");

  // Function to apply filters
  const applyFilters = () => {
    // Assuming `events` is available in the parent component
    const filteredEvents = events.filter(event => {
      // Apply filtering logic here
      return (
        (!selectedRoom || event.room === selectedRoom) &&
        (!selectedDateRange || (new Date(event.start) >= new Date(selectedDateRange.start) && new Date(event.end) <= new Date(selectedDateRange.end)))
      );
    });
    onFilterChange(filteredEvents);
  };

  return (
    <div className="mb-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Room</label>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">All Rooms</option>
            <option value="Room A">Room A</option>
            <option value="Room B">Room B</option>
            <option value="Room C">Room C</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date Range</label>
          <input
            type="date"
            onChange={(e) => setSelectedDateRange({ ...selectedDateRange, start: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="date"
            onChange={(e) => setSelectedDateRange({ ...selectedDateRange, end: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full mt-2"
          />
        </div>

        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
