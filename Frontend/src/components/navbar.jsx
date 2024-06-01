import {React, useState, isActive} from "react";
import { MdOutlineSettings } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { RiQuestionLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import Example from "./dropDownMenu";
import SettingsDropDown from "./dropDownMenu";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import HiddenSideBar from "./hiddenSideBar";


// const Navbar = () => {  
//     return (
//         <div>
//             <nav class="border-gray-200 flex items-center py-6">
//                 <div class="flex justify-between w-full mx-14 items-bottom">
//                     {/* <button className="text-gray-800 text-left font-medium text-sm hover:bg-gray-200 px-4 py-1 rounded-md">
//                         Instagram
//                     </button> */}
//                     <div>
//                         <div className="relative flex items-center bg-white rounded-md md:w-96">
//                             <FaMagnifyingGlass className="absolute left-3 text-gray-400" size={12} />
//                             <input 
//                                 className="w-full py-1 pl-8 pr-4 font-normal text-sm rounded-md outline-none bg-white hover:bg-gray-100" 
//                                 placeholder="Search"
//                             />
//                         </div>
//                     </div>
//                     <div>
//                         <ul class="flex items-center space-x-4">
//                             <li>
//                                 <button className="px-2 font-medium text-sm">Developers</button>
//                             </li>
//                             <li>
//                                 <button className="px-2 font-medium text-sm">Test mode</button>
//                             </li>
//                             <li className="flex items-center justify-center">
//                                 <RiQuestionLine className="text-xl" />
//                             </li>
//                             <li className="flex items-center justify-center">
//                                 <MdNotificationsNone className="text-xl" />
//                             </li>
//                             <li className="flex items-center justify-center">
//                                 <SettingsDropDown />
//                             </li>
//                             <li className="flex items-center justify-center">
//                                 <FaCirclePlus className="text-xl" style={{color:"#625bf6"}} />
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     );
// }

const Navbar = () => {  

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    
    return (
        <div className="">
            <HiddenSideBar hidden={!sidebarOpen} toggleState={toggleSidebar} />
            <div className={`fixed inset-0 bg-black opacity-50 z-30 ${sidebarOpen ? 'block' : 'hidden'}`} onClick={toggleSidebar}></div>
            
            <nav class="border-gray-200 flex items-center mt-2 md:mt-4 mb-6">
                <div class="flex justify-between w-full items-center">
                    <div className="md:hidden">
                        <button onClick={toggleSidebar} className="flex items-center text-gray-600 hover:bg-gray-100 py-2 px-2 rounded-md">
                            <FaBars />
                            <span className="pl-2 font-semibold text-gray-700 text-sx">Instagram</span>
                        </button>
                    </div>
                    <div>
                        <div className="relative flex items-center bg-white rounded-md w-64 md:w-96">
                            <FaMagnifyingGlass className="absolute left-3 text-gray-400" size={10} />
                            <input 
                                className="w-full py-2 pl-8 pr-4 font-normal text-xs rounded-md outline-none md:bg-white bg-gray-100 hover:bg-gray-100" 
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    <div>
                        <ul class="flex items-center space-x-4">
                            <li className="hidden lg:block">
                                <button className="px-2 font-medium text-sx">Developers</button>
                            </li>
                            <li className="hidden lg:block">
                                <button className="px-2 font-medium text-sx">Test mode</button>
                            </li>
                            <li className="flex items-center justify-center">
                                <RiQuestionLine className="text-lg" />
                            </li>
                            <li className="flex items-center justify-center">
                                <MdNotificationsNone className="text-lg" />
                            </li>
                            <li className="flex items-center justify-center">
                                <SettingsDropDown />
                            </li>
                            <li className="flex items-center justify-center hidden md:block">
                                <FaCirclePlus className="text-xl" style={{color:"#625bf6"}} />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;