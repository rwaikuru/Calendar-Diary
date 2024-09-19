import React, { useState } from "react";

export function FloatingDockDemo() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("Upcoming");

  // Tab options
  const tabs = [
    "Upcoming",
    "Pending",
    "Recurring",
    "Past",
    "Cancelled",
  ];

  return (
    <div>
      {/* Tabbed Navigation */}
      <div className="flex space-x-6 bg-gray-50 p-4 rounded-md shadow-md">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab
                ? "bg-blue-900 shadow-md font-semibold text-white"
                : "text-gray-500"
            } hover:bg-gray-100 transition duration-200 hover:text-black`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Below Tabs */}
      <div className="mt-6">
        {activeTab === "Upcoming" && <p>Showing Upcoming Events...</p>}
        {activeTab === "Pending" && <p>Showing Pending Events...</p>}
        {activeTab === "Recurring" && <p>Showing Recurring Events...</p>}
        {activeTab === "Past" && <p>Showing Past Events...</p>}
        {activeTab === "Cancelled" && <p>Showing Cancelled Events...</p>}
      </div>
    </div>
  );
}
