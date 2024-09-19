"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const EventDialog = ({ isOpen, onClose, selectedDate, onSaveEvent, editEvent }) => {
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventRoom, setNewEventRoom] = useState("");
  const [newEventParticipants, setNewEventParticipants] = useState("");
  const [mealRequirements, setMealRequirements] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [dietaryNeeds, setDietaryNeeds] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (editEvent) {
      setNewEventTitle(editEvent.title || "");
      setNewEventRoom(editEvent.room || "");
      setNewEventParticipants(editEvent.participants || "");
      setMealRequirements(editEvent.mealRequirements || "");
      setSpecialRequests(editEvent.specialRequests || "");
      setDietaryNeeds(editEvent.dietaryNeeds || "");
      setAdditionalComments(editEvent.additionalComments || "");
      setAttachedFile(editEvent.attachedFile ? { name: editEvent.attachedFile } : null);
      setCurrentStep(1);
    } else {
      // Reset form when adding a new event
      setNewEventTitle("");
      setNewEventRoom("");
      setNewEventParticipants("");
      setMealRequirements("");
      setSpecialRequests("");
      setDietaryNeeds("");
      setAdditionalComments("");
      setAttachedFile(null);
      setCurrentStep(1);
    }
  }, [editEvent, isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  const handleSaveEventSubmit = (e) => {
    e.preventDefault();
    if (newEventTitle && newEventRoom && newEventParticipants) {
      const event = {
        id: editEvent ? editEvent.id : `${selectedDate?.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate.start,
        end: selectedDate?.end,
        allDay: selectedDate?.allDay,
        room: newEventRoom,
        participants: newEventParticipants,
        mealRequirements: mealRequirements || "None",
        specialRequests: specialRequests || "None",
        dietaryNeeds: dietaryNeeds || "None",
        additionalComments: additionalComments || "None",
        attachedFile: attachedFile ? attachedFile.name : null,
      };
      onSaveEvent(event);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editEvent ? "Edit Event Details" : "Add New Event Details"}</DialogTitle>
        </DialogHeader>
        <form className="space-y-5 mb-4" onSubmit={handleSaveEventSubmit}>
          {currentStep === 1 && (
            <>
              <input
                type="text"
                placeholder="Event Title"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                required
                className="border border-gray-200 p-3 rounded-md text-lg w-full"
              />

              <select
                value={newEventRoom}
                onChange={(e) => setNewEventRoom(e.target.value)}
                required
                className="border border-gray-200 p-3 rounded-md text-lg w-full"
              >
                <option value="">Select Room</option>
                <option value="Room A">Room A</option>
                <option value="Room B">Room B</option>
                <option value="Room C">Room C</option>
              </select>

              <input
                type="number"
                placeholder="Number of Participants"
                value={newEventParticipants}
                onChange={(e) => setNewEventParticipants(e.target.value)}
                required
                className="border border-gray-200 p-3 rounded-md text-lg w-full"
              />

              <div className="flex justify-between items-center">
                <button
                  className="text-gray-500"
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  disabled={currentStep === 1}
                >
                  Prev
                </button>
                <div className="flex space-x-2">
                  <span className={`h-2 w-2 rounded-full ${currentStep === 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                  <span className={`h-2 w-2 rounded-full ${currentStep === 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                </div>
                <button
                  className="text-gray-500"
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={currentStep === 2}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-lg">Additional Options</span>
                <button
                  type="button"
                  className="text-blue-600 font-bold"
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                >
                  {showOptionalFields ? "-" : "+"}
                </button>
              </div>

              {showOptionalFields && (
                <>
                  <input
                    type="text"
                    placeholder="Meal Requirements (Optional)"
                    value={mealRequirements}
                    onChange={(e) => setMealRequirements(e.target.value)}
                    className="border border-gray-200 p-3 rounded-md text-lg w-full"
                  />

                  <input
                    type="text"
                    placeholder="Special Requests (Optional)"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="border border-gray-200 p-3 rounded-md text-lg w-full"
                  />

                  <input
                    type="text"
                    placeholder="Dietary Needs (Optional)"
                    value={dietaryNeeds}
                    onChange={(e) => setDietaryNeeds(e.target.value)}
                    className="border border-gray-200 p-3 rounded-md text-lg w-full"
                  />

                  <textarea
                    placeholder="Additional Comments (Optional)"
                    value={additionalComments}
                    onChange={(e) => setAdditionalComments(e.target.value)}
                    className="border border-gray-200 p-3 rounded-md text-lg w-full"
                  />
                </>
              )}

              <div>
                <label className="text-lg text-gray-700">Attach a File (Optional)</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border border-gray-200 p-3 rounded-md text-lg w-full"
                />
                {attachedFile && (
                  <p className="text-gray-500 mt-2">
                    File selected: {attachedFile.name}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center">
                <button
                  className="text-gray-500"
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  disabled={currentStep === 1}
                >
                  Prev
                </button>
                <div className="flex space-x-2">
                  <span className={`h-2 w-2 rounded-full ${currentStep === 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                  <span className={`h-2 w-2 rounded-full ${currentStep === 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                </div>
                <button
                  className="bg-blue-950 text-white p-3 mt-5 rounded-md"
                  type="submit"
                >
                  {editEvent ? "Save" : "Add"}
                </button>
              </div>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
