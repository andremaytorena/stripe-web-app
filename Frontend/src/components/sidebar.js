import { useLocation, useNavigate } from 'react-router-dom';
import { LuHome } from "react-icons/lu";
import { MdAccountBalance } from "react-icons/md";
import { PiArrowsClockwiseFill } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";

function SideBar() {

    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };

    return (
        <div className="flex flex-row">
            <div className="w-56 hidden md:block flex-col items-start pl-14 pr-4 mt-4 mb-5">
                <button className='w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-xs flex items-center space-x-2'>
                    <AiOutlineShop className='w-4 h-4' />
                    <span className='font-semibold text-gray-700'>Go Kart</span>
                </button>
                <div className='pb-8'></div>
                <button
                    className={`w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-xs flex items-center space-x-2 ${
                        isActive('/dashboard') ? 'text-[#625bf6] font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => navigate('/dashboard')}
                    >
                    <LuHome className="w-4 h-4"/>
                    <span>Home</span>
                </button>
                <button
                    className={`w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-xs flex items-center space-x-2 ${
                        isActive('/balances') ? 'text-[#625bf6] font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => navigate('/balances')}
                    >
                    <MdAccountBalance className="w-4 h-4" />
                    <span>Balances</span>
                </button>
                <button
                    className={`w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-xs flex items-center space-x-2 ${
                        isActive('/payments') ? 'text-[#625bf6] font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => navigate('/payments')}
                    >
                    <PiArrowsClockwiseFill className="w-4 h-4" />
                    <span>Transactions</span>
                </button>
                <button
                    className={`w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-xs flex items-center space-x-2 ${
                        isActive('/customers') ? 'text-[#625bf6] font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => navigate('/customers')}
                    >
                    <IoPersonOutline className="w-4 h-4" />
                    <span>Customers</span>
                </button>
                <button
                    className={`w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-xs flex items-center space-x-2 ${
                        isActive('/product-catalog') ? 'text-[#625bf6] font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => navigate('/product-catalog')}
                    >
                    <BsBoxSeam className="w-4 h-4" />
                    <span>Product catalog</span>
                </button>

                <div className='pb-10'></div>
                
                <p className="text-xs text-gray-600 pl-2 pb-0.5">Shortcuts</p>
                <button className="w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-xs">Reports</button>
                <button className="w-full text-left rounded-md px-2 py-1.5 hover:bg-gray-200 text-xs">Payment links</button>
            </div>

            <div className="h-full w-px bg-gray-300 mx-auto"></div>

            <div className="pr-4 md:pr-8"></div>

        </div>

    )
}

export default SideBar;
