"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Events Data ---
const events = {
  "2025-08-15" : ["🇮🇳 Independence Day "],
  "2025-09-04" : ["Teacher's Day Celebrations in college"],
  "2025-09-05" : ["Teacher's Day"],
  "2025-09-15" : ["Engineer's Day"],
  // "2025-08-10": ["🎵 Music Night", "🍔 Food Fest"],
  // "2025-08-15": ["🎨 Art Workshop", "📚 Book Club"],
  // "2025-08-22": ["🏃 Marathon Training", "🎭 Theater Show"],
  // recurring: [
  //   { type: "weekly", weekday: 1, label: "🧘 Yoga Class" },
  //   { type: "weekly", weekday: 3, label: "💻 Tech Meetup" },
  //   { type: "monthly", day: 1, label: "💼 Club Meeting" }
  // ]
};

function formatDate(date) {
  if (!date) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getRecurringEvents(date) {
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const matches = [];

  for (const rule of events.recurring || []) {
    if (rule.type === "weekly" && rule.weekday === dayOfWeek) matches.push(rule.label);
    else if (rule.type === "monthly" && rule.day === dayOfMonth) matches.push(rule.label);
  }

  return matches;
}

function getDaysInMonth(date) {
  const year = date.getFullYear(), month = date.getMonth();
  const firstDay = new Date(year, month, 1), lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate(), startingDayOfWeek = firstDay.getDay();

  const days = [];

  for (let i = 0; i < startingDayOfWeek; i++) {
    const prevDate = new Date(year, month, -(startingDayOfWeek - 1 - i));
    days.push({ date: prevDate, day: prevDate.getDate(), isCurrentMonth: false, isToday: false, hasEvents: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const today = new Date();
    const isToday = currentDate.toDateString() === today.toDateString();
    const hasEvents = (events[formatDate(currentDate)] || []).length > 0 || getRecurringEvents(currentDate).length > 0;

    days.push({ date: currentDate, day, isCurrentMonth: true, isToday, hasEvents });
  }

  const remaining = 42 - days.length;
  for (let day = 1; day <= remaining; day++) {
    const nextDate = new Date(year, month + 1, day);
    days.push({ date: nextDate, day, isCurrentMonth: false, isToday: false, hasEvents: false });
  }

  return days;
}

// --- Main Component ---
export const Component = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const days = getDaysInMonth(currentDate);
  const formattedSelected = formatDate(selectedDate);
  const dayEvents = [...(events[formattedSelected] || []), ...getRecurringEvents(selectedDate)];
  const displayDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const navigateMonth = (dir) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + dir);
    setCurrentDate(newDate);
  };

  return (
    <motion.div
      className="py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Event Calendar
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Stay organized with your upcoming events
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <motion.div
            className="lg:col-span-2 p-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Nav */}
            <div className="flex items-center justify-between mb-8">
              <button onClick={() => navigateMonth(-1)} className="p-2 rounded-full hover:bg-white/10 group">
                <ChevronLeft className="h-6 w-6 text-white group-hover:text-blue-400" />
              </button>
              <h2 className="text-2xl font-semibold text-white">
                {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
              </h2>
              <button onClick={() => navigateMonth(1)} className="p-2 rounded-full hover:bg-white/10 group">
                <ChevronRight className="h-6 w-6 text-white group-hover:text-blue-400" />
              </button>
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-gray-300">{day}</div>
              ))}
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDate.toISOString()}
                className="grid grid-cols-7 gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {days.map((d, i) => {
                  const selected = d.date.toDateString() === selectedDate.toDateString();
                  return (
                    <motion.button
                      key={i}
                      layout
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: d.isCurrentMonth ? 1.05 : 1 }}
                      onClick={() => setSelectedDate(d.date)}
                      className={`
                        relative h-14 w-full rounded-xl flex items-center justify-center text-base font-medium
                        ${d.isCurrentMonth ? 'text-white hover:bg-white/10' : 'text-gray-600'}
                        ${selected ? 'bg-gradient-to-r from-blue-500 to-purple-500 font-bold shadow-lg scale-105' : ''}
                        ${d.isToday && !selected ? 'ring-2 ring-gray-400 font-bold text-orange-400' : ''}
                      `}
                    >
                      <span>{d.day}</span>
                      {d.hasEvents && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="h-1.5 w-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Events Panel */}
          <motion.div
            className="lg:col-span-1 p-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📅</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Selected Date</h2>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-1">Date</p>
              <p className="text-lg font-semibold text-white">{displayDate}</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={formattedSelected}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {dayEvents.length > 0 ? (
                  dayEvents.map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group p-4 rounded-2xl border border-gray-700 hover:border-blue-400 hover:bg-white/5 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 bg-gradient-to-r from-orange-500 to-purple-300 rounded-full group-hover:scale-125 transition-transform" />
                        <span className="text-white group-hover:text-blue-400">{event}</span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="h-16 w-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">🌙</span>
                    </div>
                    <p className="text-gray-300 font-medium">No events planned</p>
                    <p className="text-sm text-gray-500 mt-1">Something's cooking for sure, keep checking!</p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className="text-gray-500 text-sm">
            Click on any date to view its events • Navigate months with arrow buttons
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};