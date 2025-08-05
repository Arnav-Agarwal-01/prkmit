"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // required for base calendar layout

const events = {
  "2025-08-10": ["🎵 Music Night", "🍔 Food Fest"],
  "2024-02-12": ["🎨 Art Exhibition"],
  "2024-02-15": ["💻 Tech Talk", "🛠️ Workshop"]
};

function formatDate(date) {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const Component = () => {
  const [selected, setSelected] = useState(new Date());
  const selectedDate = selected ? formatDate(selected) : null;
  const dayEvents = selectedDate && events[selectedDate] ? events[selectedDate] : [];

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-xl mx-auto rounded-xl shadow-xl bg-black/60 backdrop-blur border border-white/10 text-white">
      <h1 className="text-3xl font-extrabold tracking-wide">📅 Event Calendar</h1>

      <div className="[&_.rdp-day_selected]:bg-indigo-500 [&_.rdp-day_selected]:text-white [&_.rdp-day_selected]:font-bold [&_.rdp-day_selected]:rounded-full [&_.rdp-day:hover]:bg-indigo-500/20 [&_.rdp-day:hover]:text-white [&_.rdp]:text-white [&_.rdp]:rounded-xl">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          showOutsideDays
          defaultMonth={new Date()}
        />
      </div>

      <div className="w-full mt-4 p-4 rounded-xl bg-zinc-900/70 border border-white/10">
        <h2 className="text-xl font-semibold text-purple-300 mb-3">
          Events on {selectedDate}:
        </h2>

        {dayEvents.length > 0 ? (
          <ul className="space-y-2">
            {dayEvents.map((event, idx) => (
              <li
                key={idx}
                className="p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-white shadow"
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