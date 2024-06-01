import withAuth from "../authentication/isAuthenticated";
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import RightSideBar from '../../components/rightsidebar';
import { IoChevronDownSharp } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";

const StatusBadge = ({ status }) => {
  
    return (
      <div className={`${'bg-green-100 text-green-700'} px-1.5 rounded text-xs font-semibold`}>
        {status}
      </div>
    );
  };

const SliderSelector = () => {

    const [selectedMode, setSelectedMode] = useState('Overview');

    const handleSetMode = (mode) => {
        setSelectedMode(mode);
    }

    return (
        <div className="pb-3">
            <div className="flex flex-row space-x-3 pb-1">
                <div onClick={() => handleSetMode("Overview")} className="hover:bg-gray-200 -ml-2 rounded-lg py-1 px-2 items-center flex justify-center cursor-pointer">
                    <span className={`text-xs ${selectedMode === "Overview" ? 'text-[#625bf6]' : 'text-gray-500'} font-semibold`}>Overview</span>
                </div>
                <div onClick={() => handleSetMode("All activity")} className="hover:bg-gray-200 rounded-lg px-2 py-1 items-center flex justify-center cursor-pointer">
                    <span className={`text-xs ${selectedMode === "All activity" ? 'text-[#625bf6]' : 'text-gray-500'} font-semibold`}>All activity</span>
                </div>
                <div onClick={() => handleSetMode("Top-ups")} className="hover:bg-gray-200 rounded-lg px-2 py-1 items-center flex justify-center cursor-pointer">
                    <span className={`text-xs ${selectedMode === "Top-ups" ? 'text-[#625bf6]' : 'text-gray-500'} font-semibold`}>Top-ups</span>
                </div>
                <div onClick={() => handleSetMode("Payouts")} className="hover:bg-gray-200 rounded-lg px-2 py-1 items-center flex justify-center cursor-pointer">
                    <span className={`text-xs ${selectedMode === "Payouts" ? 'text-[#625bf6]' : 'text-gray-500'} font-semibold`}>Payouts</span>
                </div>
            </div>
            <div className="w-full h-px bg-gray-300 my-auto"></div>
        </div>
    )
}

const ImportartMessage = () => {
    return (
        <div className="border border-gray-200 rounded-md">
            <div className="flex flex-row items-start pl-3 pt-3 pb-3">
                <div className="mt-0.5 pr-2">
                    <IoMdInformationCircleOutline />
                </div>
                <div className="flex flex-col space-y-0.5">
                    <span className="font-semibold text-sm">A bank holiday is coming</span>
                    <span className="text-xs">MONZO BANK LIMITED ••••7679 is closed for Spring Bank Holiday on Monday, May 27.</span>
                    <span className="text-xs">Expect payouts to arrive on the next business day.</span>
                </div>
            </div>
        </div>
    );
}

function BalanceInformation() {
    return (
        <div>
            <div className="flex flex-col lg:flex-row">
                <div className="pt-4 lg:w-7/12 pb-12">
                    <h1 className="font-bold text-md pb-2">GBP Balance</h1>
                    <div className="w-full h-px bg-gray-200 my-auto"></div>
                    <div className="space-y-3 pt-2 pb-2">
                        <div className="flex flex-row justify-between">
                            <span className="text-xs">On the way to your bank account</span>
                            <span className="text-xs">£0.00</span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <span className="text-xs">Upcoming payouts to your bank (estimated)</span>
                            <span className="text-xs">£2.43</span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <span className="text-xs">Upcoming withdrawals from your bank (estimated)</span>
                            <span className="text-xs">£0.00</span>
                        </div>
                    </div>
                    <div className="w-full h-px bg-gray-200 my-auto"></div>
                    <div className="flex flex-row justify-between pt-2">
                        <span className="text-xs font-semibold">Total</span>
                        <span className="text-xs font-semibold">£2.43</span>
                    </div>
                </div>
                <div className="lg:pt-4 lg:pl-10 pb-4">
                    <div className="bg-gray-100 w-64 p-2 rounded-md flex flex-col space-y-1">
                        <div>
                            <span className="border border-gray-300 bg-gray-200 text-2xs font-semibold text-gray-600 rounded-sm py-0.5 px-1">Highlighted report</span>
                        </div>
                        <span className="text-xs font-semibold text-[#625bf6]">Balance</span>
                        <p className="text-xs text-gray-600">Reconcile your Stripe balance and download your categorized transaction history.</p>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-gray-200 my-auto"></div>
        </div>
    );
}

function UpcomingToBank() {
    return (
        <div>
            <div className="pt-6 lg:w-7/12 pb-12">
                <h1 className="font-bold text-md pb-2">Upcoming to your bank</h1>
                <div className="flex flex-row items-center pb-2 justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs">These amounts are estimated because transactions are still accumulating.</span>
                        <p className="text-xs">Payouts will arrive in your bank account every business day. <a href="login" className="text-violet-500 font-medium hover:text-black">Edit settings</a></p>
                    </div>
                    <div className="flex flex-row">
                        <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1 whitespace-nowrap'>
                            <p className="pr-1">1 week</p>
                            <IoChevronDownSharp />
                        </button>
                        <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1 whitespace-nowrap'>
                            <p>May 15-May 21</p>
                        </button>
                    </div>
                </div>
                <div className="w-full h-px bg-gray-200 my-auto"></div>
                <div className="flex flex-row justify-between pt-3">
                    <span className="text-xs font-semibold">Total for May 26 - Jun 2</span>
                    <span className="text-xs font-semibold">£0.00</span>
                </div>
                <div className="flex flex-row justify-between pt-4">
                    <span className="text-xs font-semibold">Total</span>
                    <span className="text-xs font-semibold">£2.43</span>
                </div>
            </div>
            <div className="w-full h-px bg-gray-200 my-auto"></div>
        </div>
    );
}

function OnTheWayToBank() {
    return (
        <div>
            <div className="flex flex-col lg:flex-row">
                <div className="pt-6 lg:w-7/12 pb-12">
                    <h1 className="font-bold text-md pb-6">On the way to your bank</h1>
                    <div className="w-full h-px bg-gray-200 my-auto"></div>
                    <div className="flex flex-row justify-between pt-2">
                        <span className="text-xs font-semibold">Total</span>
                        <span className="text-xs font-semibold">£0.00</span>
                    </div>
                </div>
                <div className="lg:pt-4 lg:pl-10 pb-4">
                    <div className="bg-gray-100 w-64 px-2 py-2.5 rounded-md flex flex-col space-y-1">
                        <span className="text-xs font-semibold text-gray-600">Looking for the status of a payout?</span>
                        <p className="text-xs text-gray-600">Reconcile your Stripe balance and download your categorized transaction history.</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-px bg-gray-200 my-auto"></div>
        </div>
    );
}

function RecentlyCompleted() {
    return (
        <div>
            <div className="pt-6 lg:w-7/12 pb-6">
                <h1 className="font-bold text-md pb-2">Recently completed</h1>
                <div className="flex flex-row justify-between pb-2 pt-2 hover:bg-gray-200 px-2 -mx-2 rounded-md">
                    <div className="flex flex-row">
                        <span className="text-xs text-[#625bf6] pr-1">Paid out on May 7, 2024</span>
                        <StatusBadge status="Paid" />
                    </div>
                    <span className="text-xs text-gray-600">£0.00</span>
                </div>
                <div className="w-full h-px bg-gray-200 my-auto"></div>
                <div className="flex flex-row justify-between pb-2 pt-2 hover:bg-gray-200 px-2 -mx-2 rounded-md">
                    <div className="flex flex-row">
                        <span className="text-xs text-[#625bf6] pr-1">Paid out on May 7, 2024</span>
                        <StatusBadge status="Paid" />
                    </div>
                    <span className="text-xs text-gray-600">£0.00</span>
                </div>
                <div className="w-full h-px bg-gray-200 my-auto"></div>
                <div className="flex flex-row justify-between pb-2 pt-2 hover:bg-gray-200 px-2 -mx-2 rounded-md">
                    <div className="flex flex-row">
                        <span className="text-xs text-[#625bf6] pr-1">Paid out on May 7, 2024</span>
                        <StatusBadge status="Paid" />
                    </div>
                    <span className="text-xs text-gray-600">£0.00</span>
                </div>
                <div className="w-full h-px bg-gray-200 my-auto"></div>
                <div className="flex flex-row justify-between pb-2 pt-2 hover:bg-gray-200 px-2 -mx-2 rounded-md">
                    <div className="flex flex-row">
                        <span className="text-xs text-[#625bf6] pr-1">Paid out on May 7, 2024</span>
                        <StatusBadge status="Paid" />
                    </div>
                    <span className="text-xs text-gray-600">£0.00</span>
                </div>
                <div className="w-full h-px bg-gray-200 my-auto"></div>
                <a href="payouts"className="text-xs font-semibold text-[#625bf6] hover:text-black">See more</a>
            </div>
            <div className="w-full h-px bg-gray-200 my-auto"></div>
            <div className="pb-10"></div>
        </div>
    );
}

function Header() {
    return (
        <div>
            <div className="flex flex-row justify-between pb-2 items-center">
                <h1 className="font-bold text-2xl">Balances</h1>
                <div className="flex flex-row space-x-2">
                    <button className='items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
                        Add to balance
                    </button>
                    <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
                        <span className="pr-1">Manage Payouts</span>
                        <IoChevronDownSharp />
                    </button>
                </div>
            </div>
            <SliderSelector />
        </div>
    );
}

function Balances() {

    const navigate = useNavigate();

    return (   
        <div>
            <div className="flex flex-row">
                <SideBar/>
                <div className="flex-grow">
                    <Navbar />
                    <Header />
                    <div className="flex flex-col">
                        <ImportartMessage />
                        <BalanceInformation />
                        <UpcomingToBank />
                        <OnTheWayToBank />
                        <RecentlyCompleted />
                    </div>
                </div>
                <RightSideBar/>
            </div>
        </div>
    );
}

export default withAuth(Balances);