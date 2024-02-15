import React, { useState } from 'react';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';

const WeekDays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];



const WeeklyCalendar = () => {
    const currentDate = new Date();
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
        const selectedDay = format(selectedDate, 'yyyy-MM-dd');
        const selectedTime = `${hour}:${minute < 10 ? '0' + minute : minute}`;
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
        // You can use any method to save this JSON data to a file
        // For example, in a Node.js environment, you can use 'fs' module to write to a file
        // In a browser environment, you may need to use browser APIs like FileSaver.js
        console.log(jsonData); // Log JSON data for demonstration
    };

    const renderTimeSlots = (startTime, endTime, dayIndex, day) => {
        return Array.from(
            { length: (endTime - startTime) * 2 },
            (_, i) => ({ hour: Math.floor((i / 2) + startTime), minute: (i % 2) * 30 })
        ).map(({ hour, minute }, i) => {
            if ((hour === 18 && minute === 30) || (hour === 17 && minute === 0)) return null; // Skip 6:30 pm and 5:00 pm
            return (
                <label key={i} className=" items-center space-x-2">
                    <input
                        type="radio"
                        name={`time_${startTime}_${endTime}`}
                        value={`${hour}:${minute < 10 ? '0' + minute : minute}`}
                        checked={selectedTimeSlots[format(day, 'yyyy-MM-dd')] === `${hour}:${minute < 10 ? '0' + minute : minute}`}
                        onChange={() => handleTimeSlotSelection(day, hour, minute)}
                        className="rounded-none appearance-none border-gray-300 border-solid border w-4 h-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {`${hour % 12 || 12}:${minute < 10 ? '0' + minute : minute} ${hour < 12 ? 'am' : 'pm'}`}
                </label>
            );
        });
    };

    return (
        <div className='p-3'>
            {daysInWeek.map((day, index) => (
                <div key={index} className='flex gap-x-3'>
                    <div>
                        <p>{WeekDays[index]}</p>
                        <p>{format(day, 'dd/MM')}</p>
                    </div>

                    <div>
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
    );
}

export default WeeklyCalendar;
