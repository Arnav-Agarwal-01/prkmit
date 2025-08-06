"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Events Data ---
const events = {
  "2025-08-10": ["🎵 Music Night", "🍔 Food Fest"],
  "2025-08-15": ["🎨 Art Workshop", "📚 Book Club"],
  "2025-08-22": ["🏃 Marathon Training", "🎭 Theater Show"],
  recurring: [
    { type: "weekly", weekday: 1, label: "🧘 Yoga Class" }, // Every Monday
    { type: "weekly", weekday: 3, label: "💻 Tech Meetup" }, // Every Wednesday
    { type: "monthly", day: 1, label: "💼 Club Meeting" }   // Every 1st of month
  ]
};

// --- Helper Functions ---
function formatDate(date) {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getRecurringEvents(date) {
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const matches = [];

  for (const rule of events.recurring || []) {
    if (rule.type === "weekly" && rule.weekday === dayOfWeek) {
      matches.push(rule.label);
    } else if (rule.type === "monthly" && rule.day === dayOfMonth) {
      matches.push(rule.label);
    }
  }

  return matches;
}

function getDaysInMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    const prevDate = new Date(year, month, -(startingDayOfWeek - 1 - i));
    days.push({
      date: prevDate,
      day: prevDate.getDate(),
      isCurrentMonth: false,
      isToday: false,
      hasEvents: false
    });
  }

  // Add days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const today = new Date();
    const isToday = currentDate.toDateString() === today.toDateString();
    
    const regularEvents = events[formatDate(currentDate)] || [];
    const recurringEvents = getRecurringEvents(currentDate);
    const hasEvents = regularEvents.length > 0 || recurringEvents.length > 0;

    days.push({
      date: currentDate,
      day,
      isCurrentMonth: true,
      isToday,
      hasEvents
    });
  }

  // Add days from next month to fill the grid
  const remainingCells = 42 - days.length; // 6 rows × 7 days
  for (let day = 1; day <= remainingCells; day++) {
    const nextDate = new Date(year, month + 1, day);
    days.push({
      date: nextDate,
      day,
      isCurrentMonth: false,
      isToday: false,
      hasEvents: false
    });
  }

  return days;
}

// --- Main Component ---
export const Component = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const days = getDaysInMonth(currentDate);
  
  const displayDate = selectedDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const regularEvents = events[formatDate(selectedDate)] || [];
  const recurringEvents = getRecurringEvents(selectedDate);
  const dayEvents = [...regularEvents, ...recurringEvents];

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const selectDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Event Calendar
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Stay organized with your upcoming events
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="p-8">
              
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 group"
                >
                  <ChevronLeft className="h-6 w-6 text-white group-hover:text-blue-400" />
                </button>
                
                <h2 className="text-2xl font-semibold text-white">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 group"
                >
                  <ChevronRight className="h-6 w-6 text-white group-hover:text-blue-400" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-300 pb-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((dayObj, index) => {
                  const isSelected = dayObj.date.toDateString() === selectedDate.toDateString();
                  
                  return (
                    <button
                      key={index}
                      onClick={() => selectDate(dayObj.date)}
                      className={`
                        relative h-14 w-full rounded-xl text-base font-medium transition-all duration-200 flex items-center justify-center
                        ${dayObj.isCurrentMonth 
                          ? 'text-white hover:bg-white/10 hover:shadow-sm hover:scale-105' 
                          : 'text-gray-600'
                        }
                        ${isSelected 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg scale-105' 
                          : ''
                        }
                        ${dayObj.isToday && !isSelected
                          ? 'ring-2 ring-gray-400 ring-offset-2 ring-offset-transparent font-bold text-orange-400'
                          : ''
                        }
                      `}
                    >
                      <span>{dayObj.day}</span>
                      {dayObj.hasEvents && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="h-1.5 w-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Events Panel */}
          <div className="lg:col-span-1">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">📅</span>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Selected Date
                </h2>
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">
                  Date
                </p>
                <p className="text-lg font-semibold text-white">
                  {displayDate}
                </p>
              </div>

              <div className="space-y-4">
                {dayEvents.length > 0 ? (
                  dayEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className="group p-4 rounded-2xl border border-gray-700 hover:border-blue-400 hover:shadow-md hover:bg-white/5 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 bg-gradient-to-r from-orange-500 to-purple-300 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                        <span className="text-white font-medium group-hover:text-blue-400 transition-colors duration-200">
                          {event}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🌙</span>
                    </div>
                    <p className="text-gray-300 font-medium">No events planned</p>
                    <p className="text-sm text-gray-500 mt-1">Enjoy your free day!</p>
                  </div>
                )}
              </div>

              {/* Event Legend */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                  Legend
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full"></div>
                    <span className="text-gray-300">Has events</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-white rounded-full"></div>
                    <span className="text-gray-300">Today</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ring-2 ring-blue-200"></div>
                    <span className="text-gray-300">Selected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Click on any date to view its events • Navigate months with arrow buttons
          </p>
        </div>
      </div>
    </div>
  );
};