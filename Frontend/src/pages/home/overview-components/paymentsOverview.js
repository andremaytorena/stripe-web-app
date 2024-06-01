import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../../Config';

const PaymentsOverview = () =>  {

    const [paymentsData, setPaymentsData] = useState(null);
  
    const navigate = useNavigate();
  
    useEffect(() => {
  
      const fetchData = async () => {
  
        try {
  
          const response = await axios.get(`${API_BASE_URL}/api/payments`, {
            headers: {
              "Content-Type": "application/json",
            },
  
          });
  
          if (response.data.status === 'success') {
            setPaymentsData(response.data.data);
          } else {
            console.log("erorr")    
          }
        } catch (error) {
      }
        }
      fetchData();
    }, [])
  
    return (
      <div className='w-72'>
        {paymentsData ? (
          <>
          <p className="font-bold text-sm pb-2">Payments</p>
          <div className="py-2 bg-cyan-600 rounded"></div>
          <div className='pb-2'></div>
            <div onClick={() => navigate('/balances')} className="flex flex-row items-center justify-between py-3 px-2 -mx-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className='flex items-center'>
                <div className='w-3 h-3 bg-[#625bf6] rounded'></div>
                <p className='pl-2 text-xs'>Succeeded</p>
              </div>
              <div>
              <p className='pl-2 text-xs font-medium'>£{paymentsData.succeeded.toFixed(2)}</p>
              </div>
            </div>
            <div className="w-full h-px bg-gray-300 my-auto"></div>
            <div onClick={() => navigate('/balances')} className="flex flex-row items-center justify-between py-3 px-2 -mx-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className='flex items-center'>
                <div className='w-3 h-3 bg-blue-500 rounded'></div>
                <p className='pl-2 text-xs'>Uncaptured</p>
              </div>
              <div>
              <p className='pl-2 text-xs font-medium'>£{paymentsData.uncaptured.toFixed(2)}</p>
              </div>
            </div>
            <div className="w-full h-px bg-gray-300 my-auto"></div>
            <div onClick={() => navigate('/balances')} className="flex flex-row items-center justify-between py-3 px-2 -mx-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className='flex items-center'>
                <div className='w-3 h-3 bg-cyan-600 rounded'></div>
                <p className='pl-2 text-xs'>Refunded</p>
              </div>
              <div>
              <p className='pl-2 text-xs font-medium'>£{paymentsData.refunded.toFixed(2)}</p>
              </div>
            </div>
            <div className="w-full h-px bg-gray-300 my-auto"></div>
            <div onClick={() => navigate('/balances')} className="flex flex-row items-center justify-between py-3 px-2 -mx-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className='flex items-center'>
                <div className='w-3 h-3 bg-orange-500 rounded'></div>
                <p className='pl-2 text-xs'>Failed</p>
              </div>
              <div>
              <p className='pl-2 text-xs font-medium'>£{paymentsData.failed.toFixed(2)}</p>
              </div>
            </div>
            <div className="w-full h-px bg-gray-300 my-auto"></div>
            <div className='flex flex-row justify-between pt-2'>
              <a href="balances" className="font-bold text-violet-500 text-xs hover:text-black align-top">View more</a>
              <p className='text-xs text-gray-500'>Updated 12:00 AM</p>
            </div>
            </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }

export default PaymentsOverview;