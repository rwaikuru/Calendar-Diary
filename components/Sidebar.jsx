"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar"; // Custom Sidebar components
import { IconArrowLeft, IconBrandTabler, IconCalendar, IconSettings, IconUser, IconUserBolt } from "@tabler/icons-react";
import Calendar from "./Calendar"; // Import your Calendar component
import Dashboard from "./Dashboard"; // Import Dashboard component

export function SidebarDemo() {
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  const [dashboardEvents, setDashboardEvents] = useState([]);

  const links = [
    { label: "Dashboard", href: "#", icon: <IconBrandTabler className="h-5 w-5 flex-shrink-0" />, page: "Dashboard" },
    { label: "Booking Requests", href: "#", icon: <IconUserBolt className="h-5 w-5 flex-shrink-0" />, page: "BookingRequests" },
    { label: "Calendar", href: "#", icon: <IconCalendar className="h-5 w-5 flex-shrink-0" />, page: "Calendar" },
    { label: "Profile", href: "#", icon: <IconUser className="h-5 w-5 flex-shrink-0" />, page: "Profile" },
    { label: "Settings", href: "#", icon: <IconSettings className="h-5 w-5 flex-shrink-0" />, page: "Settings" },
    { label: "Logout", href: "#", icon: <IconArrowLeft className="h-5 w-5 flex-shrink-0" />, page: "Logout" },
  ];

  const handleEventsChange = (events) => {
    setDashboardEvents(events);
  };

  return (
    <div className="flex bg-gray-700 dark:bg-neutral-800 w-full h-[100vh]">
      {/* Sidebar */}
      <div className=" bg-gray-200 z-10 h-full shadow-lg ">
        <Sidebar>
          <SidebarBody className="flex flex-col justify-between gap-10 h-full">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <LogoIcon />
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    onClick={() => setSelectedPage(link.page)}
                  />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "John Doe",
                  href: "#",
                  icon: (
                    <Image
                      src="/profileplaceholder.avif"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white z-0 overflow-auto">
        {selectedPage === "Dashboard" && <Dashboard events={dashboardEvents} />} {/* Pass events */}
        {selectedPage === "BookingRequests" && <div className="h-full bg-white">Booking Requests Content</div>}
        {selectedPage === "Calendar" && <Calendar onEventsChange={handleEventsChange} />} {/* Handle events */}
        {selectedPage === "Profile" && <div className="h-full bg-white">Profile Content</div>}
        {selectedPage === "Settings" && <div className="h-full bg-white">Settings Content</div>}
        {selectedPage === "Logout" && <div className="h-full bg-white">Logout Content</div>}
      </div>
    </div>
  );
}

export const LogoIcon = () => {
  return (
    <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <Image src="/strathlogo.png" alt="Logo" width={100} height={100} className="align-middle" />
    </Link>
  );
};
