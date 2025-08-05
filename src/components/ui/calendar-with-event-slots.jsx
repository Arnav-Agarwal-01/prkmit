"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // required for layout

// --- Events Data ---
const events = {
  "2025-08-10": ["🎵 Music Night", "🍔 Food Fest"],
  recurring: [
    { type: "weekly", weekday: 1, label: "🧘 Yoga Class" }, // Every Monday
    { type: "monthly", day: 1, label: "💼 Club Meeting" }   // Every 1st of month
  ]
};

// --- Helper: Format Date ---
function formatDate(date) {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// --- Helper: Get Recurring Events ---
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

// --- Main Component ---
export const Component = () => {
  const [selected, setSelected] = useState(new Date());
  const selectedDate = selected ? formatDate(selected) : null;

  const regularEvents = selectedDate && events[selectedDate] ? events[selectedDate] : [];
  const recurringEvents = selected ? getRecurringEvents(selected) : [];
  const dayEvents = [...regularEvents, ...recurringEvents];

  return (
    <div className="flex flex-col items-center gap-6 px-6 py-10 w-full max-w-3xl mx-auto rounded-xl shadow-2xl bg-black/70 backdrop-blur-md border border-white/10 text-white">

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">📅 Event Calendar</h1>

      {/* Calendar */}
      <div className="w-full max-w-full overflow-x-auto">
        <div className="[&_.rdp]:w-full 
                        [&_.rdp]:text-white 
                        [&_.rdp]:rounded-lg 
                        [&_.rdp-caption]:flex 
                        [&_.rdp-caption]:justify-between 
                        [&_.rdp-caption_label]:text-lg 
                        [&_.rdp-months]:flex 
                        [&_.rdp-months]:justify-center 
                        [&_.rdp-month]:w-full 
                        [&_.rdp-table]:w-full 
                        [&_.rdp-tbody]:text-center 
                        [&_.rdp-day]:h-12 
                        [&_.rdp-day]:w-12 
                        [&_.rdp-day_selected]:bg-indigo-500 
                        [&_.rdp-day_selected]:text-white 
                        [&_.rdp-day_selected]:font-bold 
                        [&_.rdp-day_selected]:rounded-full 
                        [&_.rdp-day]:transition 
                        [&_.rdp-day]:duration-200 
                        [&_.rdp-day:hover]:bg-indigo-500/30 
                        [&_.rdp-day:hover]:text-white">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            showOutsideDays
            defaultMonth={new Date()}
            className="text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Events List */}
      <div className="w-full mt-2 sm:mt-4 p-5 rounded-xl bg-zinc-900/80 border border-white/10">
        <h2 className="text-xl font-semibold text-purple-300 mb-3">
          Events on {selectedDate}:
        </h2>

        {dayEvents.length > 0 ? (
          <ul className="space-y-3">
            {dayEvents.map((event, idx) => (
              <li
                key={idx}
                className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-white shadow"
              >
                {event}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-zinc-400 italic">No events for this day.</p>
        )}
      </div>
    </div>
  );
};