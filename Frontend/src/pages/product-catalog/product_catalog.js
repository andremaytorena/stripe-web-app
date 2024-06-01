import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import withAuth from "../authentication/isAuthenticated";
import Navbar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import RightSideBar from '../../components/rightsidebar';
import { IoMdAdd } from "react-icons/io";
import { FiPackage } from "react-icons/fi";
import { GoPlusCircle } from 'react-icons/go';
import { PiExport } from 'react-icons/pi';
import { MdOutlineSettings } from 'react-icons/md';
import axios from 'axios';
import API_BASE_URL from '../../Config';
import LoadingWheel from '../../components/loadingWheel';


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

    const filters = ["Created", "Status", "Tax code"];

    return (
        <div className='flex sm:flex-row flex-col justify-between pb-2.5 sm:items-center'>
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
                    <p className='pl-1'>Export prices</p>
                </button>
                <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
                <PiExport />
                    <p className='pl-1'>Export products</p>
                </button>
                <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
                    <MdOutlineSettings />
                    <p className='pl-1'>Edit columns</p>
                </button>
                </div>
        </div>
    );
}

const SliderSelector = () => {

    const [selectedMode, setSelectedMode] = useState('All products');

    const handleSetMode = (mode) => {
        setSelectedMode(mode);
    }

    return (
        <div className="pb-3">
            <div className="flex flex-row space-x-3 pb-1">
                <div onClick={() => handleSetMode("All products")} className="-ml-2 hover:bg-gray-200 rounded-lg py-1 px-2 items-center flex justify-center cursor-pointer">
                    <span className={`text-xs ${selectedMode === "All products" ? 'text-[#625bf6]' : 'text-gray-500'} font-semibold`}>All products</span>
                </div>
                <div onClick={() => handleSetMode("Coupons")} className="hover:bg-gray-200 rounded-lg px-2 py-1 items-center flex justify-center cursor-pointer">
                    <span className={`text-xs ${selectedMode === "Coupons" ? 'text-[#625bf6]' : 'text-gray-500'} font-semibold`}>Coupons</span>
                </div>
                <div onClick={() => handleSetMode("Shipping rates")} className="hover:bg-gray-200 rounded-lg px-2 py-1 items-center flex justify-center cursor-pointer">
                    <span className={`text-xs ${selectedMode === "Shipping rates" ? 'text-[#625bf6]' : 'text-gray-500'} font-semibold`}>Shipping rates</span>
                </div>
                <div onClick={() => handleSetMode("Tax rates")} className="hover:bg-gray-200 rounded-lg px-2 py-1 items-center flex justify-center cursor-pointer">
                    <span className={`text-xs ${selectedMode === "Tax rates" ? 'text-[#625bf6]' : 'text-gray-500'} font-semibold`}>Tax rates</span>
                </div>
                <div onClick={() => handleSetMode("Pricing tables")} className="hover:bg-gray-200 rounded-lg px-2 py-1 items-center flex justify-center cursor-pointer">
                    <span className={`text-xs ${selectedMode === "Pricing tables" ? 'text-[#625bf6]' : 'text-gray-500'} font-semibold`}>Pricing tables</span>
                </div>
                <div onClick={() => handleSetMode("Meters")} className="hover:bg-gray-200 rounded-lg px-2 py-1 items-center flex justify-center cursor-pointer">
                    <span className={`text-xs ${selectedMode === "Meters" ? 'text-[#625bf6]' : 'text-gray-500'} font-semibold`}>Meters</span>
                </div>
            </div>
            <div className="w-full h-px bg-gray-300 my-auto"></div>
        </div>
    )
}

function ProductsTable() {

    const navigate = useNavigate();

    const [products , setProducts] = useState(null);
    const [countProducts, setCountProducts] = useState({all: 0, active: 0, archived: 0})


    useEffect(() => {
        // Fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/products`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.data.status === 'success') {
                    setProducts(response.data.data.products)
                    setCountProducts(response.data.data.count)
                }
            } catch (error) {

            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <OptionsSelectors options={["All", "Active", "Archived"]} countTransactions={{all: 10, active: 5, archived: 5}} selectedTransactionOption={"All"} setSelectedTransactionOption={() => {}} />
            <FilterSelectors />
            <div className="w-full h-px bg-gray-300 my-auto"></div>
            {products ? (
                <>
                <div className='overflow-x-auto'>
                    <table className='lg:w-full lg:min-w-full min-w-[800px]'>
                        <thead>
                            <tr className='text-left text-xs'>
                                <th></th>
                                <th className='py-2'>Name</th>
                                <th className='py-2'>Pricing</th>
                                <th className='py-2'>Tax category</th>
                                <th className='py-2'>Created</th>
                                <th className='py-2'>Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr onClick={() => navigate(`/products/${product.id}`)} className='border-t border-gray-200 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer'>
                                    <td className='py-1.5'>
                                        <div className='bg-gray-200 w-9 h-9 rounded-md flex justify-center items-center'> <FiPackage size={18} style={{color: "gray"}} /> </div>
                                    </td>
                                    <td className='font-semibold text-black'>{product.name}</td>
                                    <td className=''>{product.pricing}</td>
                                    <td className=''>Download software - personal use</td>
                                    <td className=''>Feb 28</td>
                                    <td className=''>Mar 6</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </>
            ) : (
                <LoadingWheel />
            )}
        </div>
    )
}

function Header() {
    return (
        <div>
            <div className="flex flex-row justify-between pb-2">
                <h1 className="font-bold text-2xl">Product catalog</h1>
                <div>
                <button className='flex flex-row items-center rounded-lg border bg-[#625bf6] px-2 py-1.5'>
                    <IoMdAdd size={16} style={{color:"white"}}/>
                    <p className='pl-1 text-white font-medium text-xs'>Add product</p>
                </button>
                </div>
            </div>
            <SliderSelector />
        </div>
    );
}

function ProductCatalog() {

    const navigate = useNavigate();

    return (   
        <div>
            <div className="flex flex-row">
                <SideBar/>
                <div className="flex-grow overflow-x-auto">
                    <Navbar />
                    <Header />
                    <div className="flex flex-col">
                        <ProductsTable />
                    </div>
                </div>
                <RightSideBar/>
            </div>
        </div>
    );
}

export default withAuth(ProductCatalog);