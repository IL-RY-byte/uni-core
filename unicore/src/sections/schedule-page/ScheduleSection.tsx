"use client"
import { useState, useRef } from "react";
import { testSchedule, ScheduleEntry } from "@services/microsoftService";

const groupByDay = (schedule: ScheduleEntry[]) => {
  const daysMap = new Map<string, ScheduleEntry[]>();

  schedule.forEach((entry) => {
    const day = new Date(entry.start).toLocaleDateString("en-US", { weekday: "long" });
    if (!daysMap.has(day)) {
      daysMap.set(day, []);
    }
    daysMap.get(day)!.push(entry);
  });

  return Array.from(daysMap.entries()).map(([day, entries]) => ({ day, entries }));
};

const ScheduleSection = () => {
  const scheduleByDay = groupByDay(testSchedule.schedule);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount;
      containerRef.current.scrollTo({ left: newScrollPosition, behavior: "smooth" });
      setScrollPosition(newScrollPosition);
    }
  };

  return (
    <section className="container bg-silver p-4">
      <h2 className="text-lg font-semibold mb-4">Weekly Schedule</h2>
      <div className="relative overflow-hidden">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-md shadow-md"
          onClick={() => handleScroll("left")}
        >
          ◀
        </button>
        <div ref={containerRef} className="overflow-x-auto flex space-x-4 scroll-smooth">
          {scheduleByDay.map(({ day, entries }) => (
            <div key={day} className="min-w-[250px] bg-white shadow-md rounded-md p-4">
              <h3 className="text-md font-semibold text-center">{day}</h3>
              <table className="w-full mt-2">
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id} className="border-b">
                      <td className="text-sm font-medium p-2">{entry.start.slice(11, 16)}</td>
                      <td className="text-sm p-2">{entry.subject}</td>
                      <td className="text-xs text-gray-600 p-2">{entry.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-md shadow-md"
          onClick={() => handleScroll("right")}
        >
          ▶
        </button>
      </div>
    </section>
  );
};

export default ScheduleSection;
  