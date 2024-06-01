import React, {useState} from "react";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";
import { IoChevronDownSharp } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";

import { IoIosCheckmark } from "react-icons/io";

const DropDownSelector = ({selectedOption, setSelectedOption}) => {
    const [isClicked, setIsClicked] = useState(false);
  
    const options = ["Today", "Last 7 days", "Last 4 weeks", "Last 3 months", "Last 12 months", "Month to date", "Quarter to date", "Year to date", "All time"];
  
    const toggleIsClicked = () => {
      setIsClicked(!isClicked);
    };
  
    const handleSetOption = (option) => {
      setSelectedOption(option);
      setIsClicked(false); // Optionally close the dropdown on selection
    };
  
    return (
      <div className="relative flex flex-col items-start">
        <button onClick={toggleIsClicked} className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
          <p className='pr-1'>{selectedOption}</p>
          <IoChevronDownSharp />
        </button>
        <div
          className={`absolute top-full mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg text-xs text-gray-700 transition-opacity duration-300 ${
            isClicked ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {options.map((option, index) => (
            <div key={option} className={`${index == 0 ? 'pt-1' : ''} ${index == options.length-1 ? 'pb-1' : ''}`}>
              <button
                onClick={() => handleSetOption(option)}
                className={`flex flex-row w-full text-left py-1 hover:bg-gray-200 ${selectedOption === option ? 'text-violet-500' : 'text-gray-800'} font-medium text-xs items-center`}
              >
                <IoIosCheckmark
                  className={`absolute pl-1 ${selectedOption === option ? 'opacity-100' : 'opacity-0'}`}
                  size={26}
                />
                <span className="pl-6">{option}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

const OverviewSettingsSelectorsBar = ({ selectedOption, setSelectedOption }) => {
    return (
      <div className='flex flex-row justify-between pb-3'>
        <div className='flex flex-row space-x-2 items-center'>
        <DropDownSelector selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
          <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
            <LuCalendarDays />
            <p className='pl-1'>May 15-May 21</p>
          </button>
          <p className='text-xs text-gray-600'>compared to</p>
          <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
            <p className='pr-1'>Previous period</p>
            <IoChevronDownSharp />
          </button>
          <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
            <p className='pr-1'>Daily</p>
            <IoChevronDownSharp />
          </button>
        </div>
        <div className='flex flex-row space-x-2'>
          <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
          <IoMdAdd />
            <p className='pl-1'>Add</p>
          </button>
          <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
            <MdOutlineSettings />
            <p className='pl-1'>Edit</p>
          </button>
        </div>
      </div>
    );
  }

export default OverviewSettingsSelectorsBar;