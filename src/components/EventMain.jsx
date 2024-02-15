import React from 'react'
import {eachDayOfInterval, endOfWeek, format, startOfWeek, weeksToDays} from 'date-fns'

const WeekDays=["Mon","Tue","Wed","Thur","Fri","Sat","Sun"];

const EventMain = () => {
    const currentDate=new Date();
    const firstDayOfWeek=startOfWeek(currentDate);
    const lastDayOfWeek=endOfWeek(currentDate);

    const daysInWeek=eachDayOfInterval({
        start:firstDayOfWeek,
        end:lastDayOfWeek,
    })

    return (
        <div className='container max-auto p-4'>
            <div >
                <h2 className='text-center'>
                    {format(currentDate,"MMMM yyyy")}
                </h2>
            </div>
            <div className=''>
                {
                    WeekDays.map((day)=>{
                        return <div key={day} className='border '>{day}</div>
                    })
                }

                {
                    daysInWeek.map((day)=>{
                        return <div>{format(day,"d")}</div>
                    })
                }
            </div>
        </div>
  )
}

export default EventMain