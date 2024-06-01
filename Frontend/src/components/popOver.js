import React, { useState } from 'react';
import { BiInfoSquare } from "react-icons/bi";
import { GrStatusInfo } from "react-icons/gr";



const Popover = ({ message }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div className="relative flex items-center">
        <GrStatusInfo
          className="h-3 w-3 text-gray-500 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        <div
          className={`absolute bottom-full mb-2 w-64 p-2 bg-white border border-gray-300 rounded shadow-lg text-xs text-gray-700 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {message}
        </div>
      </div>
    );
  };

export default Popover;