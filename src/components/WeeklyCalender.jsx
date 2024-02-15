import React, { useState } from "react";
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
  subWeeks,
  addWeeks,
} from "date-fns";

const WeekDays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

const WeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigateToPreviousWeek = () => {
    setCurrentDate((prevDate) => subWeeks(prevDate, 1));
  };

  const navigateToNextWeek = () => {
    setCurrentDate((prevDate) => addWeeks(prevDate, 1));
  };

  const firstDayOfWeek = startOfWeek(currentDate);
  const lastDayOfWeek = endOfWeek(currentDate);

  const daysInWeek = eachDayOfInterval({
    start: firstDayOfWeek,
    end: lastDayOfWeek,
  });

  // State to store selected time slots for each day
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});

  // Function to handle selecting time slots
  const handleTimeSlotSelection = (selectedDate, hour, minute) => {
    const selectedDay = format(selectedDate, "yyyy-MM-dd");
    const selectedTime = `${hour}:${minute < 10 ? "0" + minute : minute}`;
    const newSelectedTimeSlots = {
      ...selectedTimeSlots,
      [selectedDay]: selectedTime,
    };
    setSelectedTimeSlots(newSelectedTimeSlots);

    // Save to JSON file
    saveToJsonFile(newSelectedTimeSlots);
  };

  // Function to save selected time slots to JSON file
  const saveToJsonFile = (timeSlots) => {
    const timeSlotsArray = Object.entries(timeSlots).map(([date, time]) => ({
      Id: Math.floor(Math.random() * 1000) + 100, // Generate unique ID
      Name: "test", // Replace with actual name
      Date: date,
      Time: time,
    }));
    const jsonData = JSON.stringify(timeSlotsArray, null, 2);
    console.log(jsonData);
  };

  const renderTimeSlots = (startTime, endTime, dayIndex, day) => {
    return Array.from({ length: (endTime - startTime) * 2 }, (_, i) => ({
      hour: Math.floor(i / 2 + startTime),
      minute: (i % 2) * 30,
    })).map(({ hour, minute }, i) => {
      if ((hour === 18 && minute === 30) || (hour === 17 && minute === 0))
        return null; // Skip 6:30 pm and 5:00 pm
      return (
        <label key={i} className="inline-block mr-4 ml-2 ">
          <input
            type="radio"
            name={`time_${startTime}_${endTime}`}
            value={`${hour}:${minute < 10 ? "0" + minute : minute}`}
            checked={
              selectedTimeSlots[format(day, "yyyy-MM-dd")] ===
              `${hour}:${minute < 10 ? "0" + minute : minute}`
            }
            onChange={() =>
              handleTimeSlotSelection(
                format(day, "yyyy-MM-dd"),
                `${hour}:${minute < 10 ? "0" + minute : minute}`
              )
            }
            className="rounded-sm appearance-none border-gray-300 border-solid border w-4 h-4 focus:outline-none focus:ring-2  focus:bg-[#e879f9] mr-2 mt-1"
          />
          <span>
            {`${hour % 12 || 12}:${minute < 10 ? "0" + minute : minute} ${
              hour < 12 ? "am" : "pm"
            }`}
          </span>
        </label>
      );
    });
  };

  return (
    <div className="p-3 opacity-70">
      <div className="flex w-full justify-between text-xl">
        <div className="flex w-[450px] justify-between ">
          <div
            className="flex text-blue-700 cursor-pointer gap-x-1 p-2 rounded-md bg-slate-200"
            onClick={navigateToPreviousWeek}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              class="lucide lucide-chevron-left-circle"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m14 16-4-4 4-4" />
            </svg>
            Previous Week
          </div>
          <div>{format(currentDate, "MMMM d, yyyy")}</div>
        </div>
        <div
          className="flex text-blue-700 cursor-pointer gap-x-1 p-2 rounded-md bg-slate-200"
          onClick={navigateToNextWeek}
        >
          Next Week
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="lucide lucide-arrow-right-circle"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="m12 16 4-4-4-4" />
          </svg>
        </div>
      </div>

      <div className="mt-4 text-lg">TimeZone:</div>

      <div className="opacity-50 mt-2">
        <select className="w-full p-3 border-solid border-2 border-black">
          <option value="someOption">[UTC-5] Eastern Standard Time</option>
          <option value="otherOption">Other option</option>
        </select>
      </div>

      <div className="mt-2">
        {daysInWeek.map((day, index) => (
          <div key={index} className="flex gap-x-3  border-2 border-collapse ">
            <div className=" items-center flex flex-col p-2">
              <p>{WeekDays[index]}</p>
              <p>{format(day, "dd/MM")}</p>
            </div>

            <div className=" items-center p-2">
              <div>
                {/* Render time slots from 8:00 am to 11:30 am */}
                {renderTimeSlots(8, 12, index, day)}
              </div>
              <div>
                {/* Render time slots from 12:00 pm to 5:00 pm */}
                {renderTimeSlots(12, 17, index, day)}
              </div>
              <div>
                {/* Render time slots from 7:00 pm to 11:30 pm */}
                {renderTimeSlots(19, 24, index, day)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
