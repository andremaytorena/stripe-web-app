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
import { FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const OptionsSelectors = ({options, countTransactions, selectedTransactionOption, setSelectedTransactionOption}) => {

    const handleSetOption = (option) => {
        setSelectedTransactionOption(option);
    }

    return (
        <div className="flex flex-row pb-2.5 space-x-1">
            {options.map((option) => (
                <button onClick={() => handleSetOption(option)} className={`flex flex-col border py-2 pl-3 rounded-lg w-full ${selectedTransactionOption === option ? 'border-violet-500' : 'border-gray-300 hover:border-violet-400'}`}>
                    <p className={`text-xs ${selectedTransactionOption === option ? 'text-[#625bf6] font-medium' : 'text-gray-500' }`}>{option}</p>
                    <p className={`text-sm ${selectedTransactionOption === option ? 'text-[#625bf6] font-medium' : 'text-gray-700'}  font-semibold`}>{countTransactions[option.toLowerCase()]}</p>
                </button>
            ))}
        </div>
    );
}

const FilterSelectors = () => {

    const filters = ["Date and time", "Amount", "Currency", "Status", "Payment method", "More filters"];

    return (
        <div className='flex flex-row justify-between pb-2.5 items-center'>
            <div className="flex flex-row space-x-2">
                {filters.map((filter) => (
                    <div>
                    <button className='flex flex-row items-center rounded-xl border border-dashed border-gray-300 text-2xs font-medium px-2 py-0.5 text-gray-600 hover:bg-gray-100'>
                        <GoPlusCircle />
                        <span className='pl-1'>{filter}</span>
                    </button>
                    </div>
                ))}
            </div>
            <div className="flex flex-row space-x-2">
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

function Header() {
    return (
        <div>
            <div className="flex flex-row justify-between pb-3">
                <h1 className="font-bold text-2xl">Transactions</h1>
                <div>
                    <button className='flex flex-row items-center rounded-lg border bg-[#625bf6] px-2 py-1.5'>
                        <IoMdAdd size={16} style={{color:"white"}}/>
                        <p className='pl-1 text-white font-medium text-xs'>Create payment</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

const StatusBadge = ({ status }) => {

    const statuses = {
        "succeeded":"bg-green-100 text-green-700",
        "refunded": "bg-gray-100 text-gray-600",
        "uncaptured": "bg-gray-100 text-gray-600",
        "failed": "bg-red-100 text-red-700"
    }
  
    return (
      <div className={`${statuses[status.toLowerCase()]} px-1.5 rounded text-xs font-semibold`}>
        {status}
      </div>
    );
  };

function TransactionsTable() {

    const [selectedTransactionOption, setSelectedTransactionOption] = useState('All');
    const [transactions, setTransactions] = useState(null);
    const [countTransactions, setCountTransactions] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/transactions`,
                    {
                        headers: {
                        "Content-Type": "application/json",
                        },
                  }
                );
                if (response.data.status === 'success') {
                    setTransactions(response.data.data.transactions);
                    setCountTransactions(response.data.data.count);
                } else {
                    console.error('Failed to fetch data:', response.data.error);
                }
            } catch(error) {
                console.error('Failed to fetch data:', error.message);
            }
        }
        fetchData();
    }, []);

    const options = ["All", "Succeeded", "Refunded", "Uncaptured", "Failed"];

    return (
        <div className="flex flex-col">
            {transactions ? (
             <>
                <OptionsSelectors options={options} countTransactions={countTransactions} selectedTransactionOption={selectedTransactionOption} setSelectedTransactionOption={setSelectedTransactionOption} />
                <FilterSelectors />
                <div className='overflow-x-auto'>
                    <table className='lg:w-full lg:min-w-full min-w-[800px]'>
                        <thead>
                            <tr className='text-left text-xs'>
                                <th className='py-2'>Amount</th>
                                <th className='py-2'>Payment method</th>
                                <th className='py-2'>Description</th>
                                <th className='py-2'>Customer</th>
                                <th className='py-2'>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {transactions.filter(transaction => transaction.status === selectedTransactionOption || selectedTransactionOption === "All").map((transaction, index) => (
                                <tr onClick={() => navigate(`/payments/${transaction.id}`)} className='border-t border-gray-200 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer'>
                                    <td className="flex-1 text-left flex-row">
                                        <div className="flex flex-row">
                                            <span className="pr-2 font-semibold">£{transaction.amount}</span>
                                            <span className="pr-2">GBP</span>
                                            <StatusBadge status={transaction.status} />
                                        </div>
                                    </td>
                                    <td className=''>{transaction.paymentMethod}</td>
                                    <td className=''>{transaction.description}</td>
                                    <td className='py-2'>{transaction.customer}</td>
                                    <td className=''>{transaction.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <div className="w-full h-px bg-gray-300 my-auto"></div>
                <div className="flex flex-row py-2 text-xs font-semibold">
                    <span className="flex-1 text-left">Amount</span>
                    <span className="flex-1 text-left">Payment method</span>
                    <span className="flex-1 text-left">Description</span>
                    <span className="flex-1 text-left">Customer</span>
                    <span className="flex-1 text-left">Date</span>
                </div>
                <div className="w-full h-px bg-gray-200 my-auto"></div>
                <div className="text-gray-600">
                    {transactions.filter(transaction => transaction.status === selectedTransactionOption || selectedTransactionOption === "All").map((transaction, index) => (
                        <div key={index} className="flex flex-row py-2 border-b border-gray-200 text-xs">
                            <span className="flex-1 text-left flex-row">
                                <div className="flex flex-row">
                                    <span className="pr-2 font-semibold">£{transaction.amount}</span>
                                    <span className="pr-2">GBP</span>
                                    <StatusBadge status={transaction.status} />
                                </div>
                            </span>
                            <span className="flex-1 text-left">{transaction.paymentMethod}</span>
                            <span className="flex-1 text-left">{transaction.description}</span>
                            <span className="flex-1 text-left">{transaction.customer}</span>
                            <span className="flex-1 text-left">{transaction.date}</span>
                        </div>
                    ))}
                </div> */}
                </>
            ) : (
                <LoadingWheel />
            )}
        </div>
    );
}

function Transactions() {
    return (
        <div>
        <div className="flex flex-row">
            <SideBar/>
            <div className="flex-grow overflow-x-auto">
            <Navbar />
              <Header />
              <div className="flex flex-col">
              <TransactionsTable />
              </div>
            </div>
            <RightSideBar/>
        </div>
    </div>
    );
}

export default withAuth(Transactions);