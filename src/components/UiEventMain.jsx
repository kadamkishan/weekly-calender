import React from 'react'

const UiEventMain = () => {
  return (
    <div className=' p-4'>
        <div className='flex w-full justify-between text-xl'>
            <div className='flex w-[450px] justify-between '>
                <div className='flex text-blue-700 gap-x-1 p-2 rounded-md bg-slate-200'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-circle"><circle cx="12" cy="12" r="10"/><path d="m14 16-4-4 4-4"/></svg>
                    Previous Week</div>
                <div>Aug 4 2021</div>
            </div>
            <div className='flex text-blue-700 gap-x-1 p-2 rounded-md bg-slate-200'>
                Next Week
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="m12 16 4-4-4-4"/></svg>
            </div>
        </div>

        <div className='mt-4 text-lg'>
            TimeZone:
        </div>

        <div className='opacity-50 mt-2'>
            <select className='w-full p-3 border-solid border-2 border-black'>
                <option value="someOption">[UTC-5] Eastern Standard Time</option>
                <option value="otherOption">Other option</option>
            </select>
        </div>

        <div>
            
        </div>

    </div>
  )
}

export default UiEventMain