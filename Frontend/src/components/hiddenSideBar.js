import React from 'react';
import { AiOutlineShop } from 'react-icons/ai';
import { LuHome } from 'react-icons/lu';
import { MdAccountBalance } from 'react-icons/md';
import { PiArrowsClockwiseFill } from 'react-icons/pi';
import { IoPersonOutline } from 'react-icons/io5';
import { BsBoxSeam } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom'; // Make sure to use your router's navigate hook
import { HiMiniXMark } from "react-icons/hi2";
import { LuChevronsUpDown } from "react-icons/lu";


function HiddenSideBar({ hidden, toggleState }) {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };

  return (
    <div className={`w-72 flex-col items-start pl-3 pr-4 pt-3 mb-5 bg-white fixed top-0 left-0 h-full z-40 transform ${hidden ? '-translate-x-full' : 'translate-x-0'} transition-transform duration-300 rounded-r-xl`}>
        <div>
            <button onClick={toggleState}>
                <HiMiniXMark size={28} />
            </button>

            <div className='flex justify-center pt-7'>
                <button className='flex items-center flex-col'>
                    <AiOutlineShop color='gray' className='w-6 h-6' />
                    <span className='font-bold text-gray-700 text-md pt-3 pb-10 flex flex-row items-center'>Instagram <span className='ml-2'><LuChevronsUpDown size={14}/></span></span>
                </button>
            </div>

            <div className="w-full h-px bg-gray-300 my-auto"></div>
            <div className='pt-4 '></div>
            <button
                className={`w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-sm flex items-center space-x-2 ${isActive('/dashboard') ? 'text-[#625bf6] font-medium' : 'text-gray-700'}`}
                onClick={() => navigate('/dashboard')}
            >
                <LuHome className="w-4 h-4"/>
                <span>Home</span>
            </button>
            <button
                className={`w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-sm flex items-center space-x-2 ${isActive('/balances') ? 'text-[#625bf6] font-medium' : 'text-gray-700'}`}
                onClick={() => navigate('/balances')}
            >
                <MdAccountBalance className="w-4 h-4" />
                <span>Balances</span>
            </button>
            <button
                className={`w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-sm flex items-center space-x-2 ${isActive('/payments') ? 'text-[#625bf6] font-medium' : 'text-gray-700'}`}
                onClick={() => navigate('/payments')}
            >
                <PiArrowsClockwiseFill className="w-4 h-4" />
                <span>Transactions</span>
            </button>
            <button
                className={`w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-sm flex items-center space-x-2 ${isActive('/customers') ? 'text-[#625bf6] font-medium' : 'text-gray-700'}`}
                onClick={() => navigate('/customers')}
            >
                <IoPersonOutline className="w-4 h-4" />
                <span>Customers</span>
            </button>
            <button
                className={`w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-sm flex items-center space-x-2 ${isActive('/product-catalog') ? 'text-[#625bf6] font-medium' : 'text-gray-700'}`}
                onClick={() => navigate('/product-catalog')}
            >
                <BsBoxSeam className="w-4 h-4" />
                <span>Product catalog</span>
            </button>

            <div className='pb-10'></div>
            
            <p className="text-xs text-gray-600 pl-2 pb-0.5">Shortcuts</p>
            <button className="w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-sm">Reports</button>
            <button className="w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-sm">Payment links</button>
        </div>
    </div>
  );
}

export default HiddenSideBar;
