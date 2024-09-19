import React from "react";

const ListView = ({ events }) => {
  const groupEventsByDate = (events) => {
    return events.reduce((groups, event) => {
      const date = new Date(event.start).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'long',
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {});
  };

  const groupedEvents = groupEventsByDate(events);

  return (
    <div className="space-y-6">
      {Object.keys(groupedEvents).length > 0 ? (
        Object.keys(groupedEvents).map((date) => (
          <div key={date} className="flex">
            <div className="w-1/4 pr-4">
              <div className="sticky top-0">
                <p className="font-semibold text-lg">{date.split(',')[0]}</p>
                <p className="text-gray-500">{date.split(',')[1]}</p>
              </div>
            </div>
            <div className="w-3/4 space-y-4">
              {groupedEvents[date].map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 shadow-md relative">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">{event.title}</h2>
                      <p className="text-gray-600">{new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <button className="px-4 py-2 rounded-xl border border-neutral-600 text-black hover:bg-gray-100 transition duration-200">
                      Edit
                    </button>
                  </div>
                  <p className="text-gray-600">End: {event.end && new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default ListView;
