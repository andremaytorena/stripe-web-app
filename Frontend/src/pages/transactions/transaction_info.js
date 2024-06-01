
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import withAuth from "../authentication/isAuthenticated";
import Navbar from "../../components/navbar";
import SideBar from "../../components/sidebar";
import RightSideBar from "../../components/rightsidebar";

import { PiExport } from "react-icons/pi";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";

import axios from 'axios';
import API_BASE_URL from '../../Config';
import LoadingWheel from '../../components/loadingWheel';


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

function Header({transaction_id, amount, last_update, customer, payment_method, risk_evaluation, status}) {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row justify-between items-center'>
                <span className='text-gray-500 text-xs'>PAYMENT</span>
                <span className='text-gray-500 text-xs'>{transaction_id}</span>
            </div>
            <div className='flex flex-row justify-between items-center pt-2 pb-3'>
                <div className='flex flex-row items-center'>
                    <h1 className='text-2xl font-bold flex flex-row'>£{amount}<p className='text-2xl font-normal text-gray-600 items-center pl-1'>GBP</p></h1>
                    <div className='pl-2'>
                        <StatusBadge status="Succeeded" />
                    </div>
                </div>
                <div className='flex flex-row space-x-1'>
                    <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
                        <PiExport />
                            <span className='pl-1'>Refund</span>
                    </button>
                    <button className='flex flex-row items-center shadow-sm rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
                        <HiDotsHorizontal />
                    </button>
                </div>
            </div>
            <div className="w-full h-px bg-gray-300 my-auto"></div>
            <div className='flex flex-row space-x-5 pt-2'>
                <div className='flex flex-col space-y-1'>
                    <span className='text-xs text-gray-500'>Last update</span>
                    <span className='text-xs'>{last_update}</span>
                </div>
                <div>
                    <div className="h-full w-px bg-gray-200 mx-auto"></div>
                </div>
                <div className='flex flex-col space-y-1'>
                    <span className='text-xs text-gray-500'>Customer</span>
                    <a href={"customer.id"} className='text-xs font-semibold text-[#625bf6]'>{customer.email}</a>
                </div>
                <div>
                    <div className="h-full w-px bg-gray-200 mx-auto"></div>
                </div>
                <div className='flex flex-col space-y-1'>
                    <span className='text-xs text-gray-500'>Payment method</span>
                    <span className='text-xs'>{payment_method}</span>
                </div>
                <div>
                    <div className="h-full w-px bg-gray-200 mx-auto"></div>
                </div>
                <div className='flex flex-col space-y-1'>
                    <span className='text-xs text-gray-500'>Risk evaluation</span>
                    <span className='text-xs font-medium text-[#625bf6]'>{risk_evaluation}</span>
                </div>
            </div>
        </div>
    )
}

function Timeline() {
    return (
        <div className='pt-14'>
            <div className='flex flex-row items-center justify-between pb-1'>
                <h1 className="font-bold text-lg pb-2">Timeline</h1>
                <button className='flex flex-row items-center rounded-lg border border-gray-200 text-xs font-medium px-2 py-1'>
                    <IoMdAdd />
                    <p className='pl-1'>Add note</p>
                </button>
            </div>
            <div className="w-full h-px bg-gray-200 my-auto"></div>
            <div className='space-y-3 pt-2 pb-4'>
                <div className='flex flex-col'>
                    <span className='text-xs'>Payment succeeded</span>
                    <span className='text-xs text-gray-500'>Apr 29, 2024, 11:56 AM</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xs'>Payment started</span>
                    <span className='text-xs text-gray-500'>Apr 29, 2024, 11:56 AM</span>
                </div>
            </div>
            <div className="w-full h-px bg-gray-200 my-auto"></div>
        </div>
    )
}

function PaymentDetails({statement_descriptor, amount, fee, net, status, description}) {
    return (
        <div className='pt-14'>
            <h1 className="font-bold text-lg pb-2">Payment details</h1>
            <div className="w-full h-px bg-gray-200 my-auto"></div>
            <div className='flex flex-col space-y-1.5'>
                <div className='flex flex-row pt-3'>
                    <span className='text-sx text-gray-500 w-52'>Statement descriptor</span>
                    <span className='text-sx'>{statement_descriptor}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-sx text-gray-500 w-52'>Amount</span>
                    <span className='text-sx'>{amount}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-sx text-gray-500 w-52'>Fee</span>
                    <span className='text-sx'>{fee}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-sx text-gray-500 w-52'>Net</span>
                    <span className='text-sx'>{net}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-sx text-gray-500 w-52'>Status</span>
                    <span className='text-sx'>{status}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-sx text-gray-500 w-52'>Description</span>
                    <span className='text-sx'>{description === '' ?  "No description" : description}</span>
                </div>
            </div>
        </div>
    )
}

function PaymentMethod({ payment_id, number, fingerprint, expires, type, issuer, owner, address, origin, street_check, zip_check}) {
    return (
        <div className='pt-14'>
        <h1 className="font-bold text-lg pb-2">Payment method</h1>
        <div className="w-full h-px bg-gray-200 my-auto"></div>
        <div className='flex md:flex-row flex-col md:space-x-10 lg:space-x-36'>
            <div className='flex flex-col space-y-1.5'>
                <div className='flex flex-row pt-3'>
                    <span className='text-sx text-gray-500 w-44'>ID</span>
                    <span className='text-sx'>{payment_id}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-sx text-gray-500 w-44'>Number</span>
                    <span className='text-sx'>{number}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-sx text-gray-500 w-44'>Fingerprint</span>
                    <span className='text-sx'>{fingerprint}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-sx text-gray-500 w-44'>Expires</span>
                    <span className='text-sx'>{expires}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-sx text-gray-500 w-44'>Type</span>
                    <span className='text-sx'>{type}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-sx text-gray-500 w-44'>Issuer</span>
                    <span className='text-sx'>{issuer}</span>
                </div>
            </div>
            <div className='flex flex-col space-y-1.5'>
                <div className='flex flex-row pt-3'>
                    <span className='text-sx text-gray-500 w-44'>Owner</span>
                    <span className='text-sx'>{owner}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-sx text-gray-500 w-44'>Address</span>
                    <span className='text-sx max-w-44'>{address}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-sx text-gray-500 w-44'>Origin</span>
                    <span className='text-sx'>{origin}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-sx text-gray-500 w-44'>Street check</span>
                    <span className='text-sx'>{street_check}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-sx text-gray-500 w-44'>Zip check</span>
                    <span className='text-sx'>{zip_check}</span>
                </div>
            </div>
        </div>
    </div>
    )
}

function TransactionInfo() {

    const { transaction_id } = useParams();
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/transactions/${transaction_id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
                )
                if (response.data.status === 'success') {
                    setTransaction(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex flex-row">
                <SideBar/>
                <div className="flex-grow pb-20">
                    {transaction ? (
                        <>
                        <Header transaction_id={transaction.id} amount={transaction.payment_details.amount} last_update={transaction.last_update} customer={transaction.customer} payment_method={transaction.payment_method.payment_method} risk_evaluation={transaction.risk_evaluation} />
                        <Timeline />
                        <PaymentDetails statement_descriptor={transaction.payment_details.statement_descriptor} amount={transaction.payment_details.amount} fee={transaction.payment_details.fee} net={transaction.payment_details.net} status={transaction.payment_details.status} description={transaction.payment_details.description} />
                        <PaymentMethod payment_id={transaction.payment_method.id} number={transaction.payment_method.number} fingerprint={transaction.payment_method.fingerprint} expires={transaction.payment_method.expires} type={transaction.payment_method.type} issuer={transaction.payment_method.issuer} owner={transaction.payment_method.owner} address={transaction.payment_method.address} origin={transaction.payment_method.origin} street_check={transaction.payment_method.street_check} zip_check={transaction.payment_method.zip_check} />
                    </>
                    ) : (
                        <LoadingWheel />
                    )}
                </div>
                <RightSideBar/>
            </div>
        </div>
    );
}

export default withAuth(TransactionInfo);