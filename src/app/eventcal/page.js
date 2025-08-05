import React from "react";
import { Component as CalendarWithEventSlots } from "@/components/ui/calendar-with-event-slots";

function Page() {
  return (
    <div className="flex flex-col items-center gap-8 py-8 pt-36">
      <div className="w-full max-w-md bg-card rounded-lg shadow p-6">
        <CalendarWithEventSlots />
      </div>
    </div>
  );
}

export default Page