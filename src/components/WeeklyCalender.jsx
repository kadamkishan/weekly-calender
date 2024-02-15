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
            const handleTimeSlotSelection = (dayIndex, hour, minute) => {
                setSelectedTimeSlots({
                    ...selectedTimeSlots,
                    [dayIndex]: { hour, minute },
                });
            };

            const renderTimeSlots = (startTime, endTime) => {
                return Array.from(
                    { length: (endTime - startTime) * 2 },
                    (_, i) => ({ hour: Math.floor((i / 2) + startTime), minute: (i % 2) * 30 })
                ).map(({ hour, minute }, i) => {
                    if ((hour === 18 && minute === 30) || (hour === 17 && minute === 0)) return null; // Skip 6:30 pm and 5:00 pm
                    return (
                        <label key={i}>
                            <input
                                type="radio"
                                name={`time_${startTime}_${endTime}`}
                                value={`${hour}:${minute < 10 ? '0' + minute : minute} ${hour < 12 ? 'am' : 'pm'}`}
                                checked={selectedTimeSlots[`${startTime}_${endTime}`]?.hour === hour && selectedTimeSlots[`${startTime}_${endTime}`]?.minute === minute}
                                onChange={() => handleTimeSlotSelection(`${startTime}_${endTime}`, hour, minute)}
                            />
                            {`${hour % 12 || 12}:${minute < 10 ? '0' + minute : minute} ${hour < 12 ? 'am' : 'pm'}`}
                        </label>
                    );
                });
            };

            return (
                <div>
                    {daysInWeek.map((day, index) => (
                        <div key={index}>
                            <p>{WeekDays[index]}</p>
                            <p>{format(day, 'dd/MM')}</p>
                            <div>
                                {/* Render time slots from 8:00 am to 11:30 am */}
                                {renderTimeSlots(8, 12)}
                            </div>
                            <div>
                                {/* Render time slots from 12:00 pm to 5:00 pm */}
                                {renderTimeSlots(12, 17)}
                            </div>
                            <div>
                                {/* Render time slots from 7:00 pm to 11:30 pm */}
                                {renderTimeSlots(19, 24)}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        export default WeeklyCalendar;
