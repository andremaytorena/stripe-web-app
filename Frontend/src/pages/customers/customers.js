import React, {useEffect, useState} from "react";
import withAuth from "../authentication/isAuthenticated";
import Navbar from "../../components/navbar";
import SideBar from "../../components/sidebar";
import RightSideBar from "../../components/rightsidebar";

import axios from 'axios';
import API_BASE_URL from '../../Config';

import { IoMdAdd } from "react-icons/io";
import LoadingWheel from "../../components/loadingWheel";
import { MdOutlineSettings } from "react-icons/md";
import { PiExport } from "react-icons/pi";
import { GoPlusCircle } from "react-icons/go";
import { FiCopy } from "react-icons/fi";

const SliderSelector = () => {

    const [selectedMode, setSelectedMode] = useState('Overview');

    const handleSetMode = (mode) => {
        setSelectedMode(mode);
    }

    return (
        <div>
            <div className="flex flex-row space-x-4 pb-1">
                <div onClick={() => handleSetMode("Overview")} className="hover:bg-gray-200 rounded-lg px-2 py-1 items-center flex justify-center cursor-pointer">
                    <span className={`text-xs ${selectedMode === "Overview" ? 'text-[#625bf6]' : 'text-gray-500'} font-semibold`}>Overview</span>
                </div>
                <div onClick={() => handleSetMode("Remaining balances")} className="hover:bg-gray-200 rounded-lg px-2 py-1 items-center flex justify-center cursor-pointer">
                    <span className={`text-xs ${selectedMode === "Remaining balances" ? 'text-[#625bf6]' : 'text-gray-500'} font-semibold`}>Remaining balances</span>
                </div>
            </div>
            <div className="w-full h-px bg-gray-300 my-auto"></div>
        </div>

    )
}

const OptionsSelectors = ({options, selectedCustomerOption, setSelectedCustomerOption}) => {

    const handleSetOption = (option) => {
        setSelectedCustomerOption(option);
    }

    return (
        <div className="flex flex-row pb-2.5 space-x-1">
            {options.map((option) => (
                <button onClick={() => handleSetOption(option)} className={`flex flex-col border py-2 pl-3 rounded-lg w-full ${selectedCustomerOption === option ? 'border-violet-500' : 'border-gray-300 hover:border-violet-400'}`}>
                    <p className={`text-xs ${selectedCustomerOption === option ? 'text-violet-500 font-medium' : 'text-gray-500' }`}>{option}</p>
                </button>
            ))}
        </div>
    );
}

const FilterSelectors = () => {

    const filters = ["Email", "Card", "Created date", "Type", "More filters"];

    return (
        <div className='flex flex-row justify-between pb-2.5'>
            <div className="flex flex-row space-x-2">
                {filters.map((filter) => (
                    <button className='flex flex-row items-center rounded-xl border border-dashed border-gray-300 text-xs font-medium px-2 py-0.5 text-gray-600 hover:bg-gray-100'>
                        <GoPlusCircle />
                        <span className='pl-1'>{filter}</span>
                    </button>
                ))}
            </div>
            <div className="flex flex-row space-x-2">
            <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
                <FiCopy />
                    <p className='pl-1'>Copy</p>
                </button>
                <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
                <PiExport />
                    <p className='pl-1'>Export</p>
                </button>
                <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
                    <MdOutlineSettings />
                    <p className='pl-1'>Edit columns</p>
                </button>
                </div>
        </div>
    );
}

function CustomersTable() {

    const [selectedCustomerOption, setSelectedCustomerOption] = useState('All');

    const filterOptions = ["All", "Top customers", "First-time customers", "Repeat customers", "Recent customers", "High refunds", "High disputes"];

    const [customers, setCustomers] = useState(null);
    const [countCustomers, setCountCustomers] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/customers/list`,
                    {
                        headers: {
                        "Content-Type": "application/json",
                        },
                  }
                );
                if (response.data.status === 'success') {
                    setCustomers(response.data.data.customers);
                    setCountCustomers(response.data.data.count);
                } else {
                    console.error('Failed to fetch data:', response.data.error);
                }
            } catch(error) {
                console.error('Failed to fetch data:', error.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="flex flex-col">
            { customers ? (
                <>
                <div>
                    <OptionsSelectors options={filterOptions} selectedCustomerOption={selectedCustomerOption} setSelectedCustomerOption={setSelectedCustomerOption} />
                    <FilterSelectors />
                    <div className="w-full h-px bg-gray-300 my-auto"></div>
                        <div className="flex flex-row py-2 text-xs font-semibold">
                            <span className="flex-1 text-left">Name</span>
                            <span className="flex-1 text-left">Email</span>
                            <span className="flex-1 text-left">Default payment method</span>
                            <span className="flex-1 text-left">Total spend</span>
                            <span className="flex-1 text-left">Payments</span>
                            <span className="flex-1 text-left">Refunds</span>
                            <span className="flex-1 text-left">Dispute losses</span>
                        </div>
                        <div className="w-full h-px bg-gray-200 my-auto"></div>
                        <div className="text-gray-600">
                            {customers.filter(customer => customer.status === selectedCustomerOption || selectedCustomerOption === "All").map((customer, index) => (
                                <div key={index} className="flex flex-row py-2 border-b border-gray-200 text-xs">
                                    <span className="flex-1 text-left">{customer.name}</span>
                                    <span className="flex-1 text-left">{customer.email}</span>
                                    <span className="flex-1 text-left">{customer.default_payment_method}</span>
                                    <span className="flex-1 text-left">{customer.total_spend}</span>
                                    <span className="flex-1 text-left">{customer.payments}</span>
                                    <span className="flex-1 text-left">{customer.refunds}</span>
                                    <span className="flex-1 text-left">{customer.dispute_losses}</span>
                                </div>
                            ))}
                        </div>
                </div>
                </>
            ) : (
                <LoadingWheel />
            )}
        </div>
    );
}


function Header() {
    return (
        <div className="pb-3">
            <div className="flex flex-row justify-between pb-3">
                <h1 className="font-bold text-2xl">Customers</h1>
                <div>
                    <button className='flex flex-row items-center rounded-lg border bg-[#625bf6] px-2 py-1.5'>
                        <IoMdAdd size={16} style={{color:"white"}}/>
                        <p className='pl-1 text-white font-medium text-xs'>Add customer</p>
                    </button>
                </div>
            </div>
            <SliderSelector />
        </div>
    );
}

function Customers() {
    return (
        <div>
        <div className="flex flex-row">
            <SideBar/>
            <div className="flex-grow">
                <Navbar />
              <Header />
              <div className="flex flex-col">
                <div className="">
                  <CustomersTable />
                </div>
              </div>
            </div>
            <RightSideBar/>
        </div>
    </div>
    );
}

export default withAuth(Customers);