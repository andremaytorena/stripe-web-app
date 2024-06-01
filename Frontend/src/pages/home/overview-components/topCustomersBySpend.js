import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../Config";
import LoadingWheel from "../../../components/loadingWheel";
import Popover from "../../../components/popOver";


function TopCustomersBySpend() {
    const [topCustomersData, setTopCustomersData] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/customers`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (response.data.status === 'success') {
            setTopCustomersData(response.data.data);
          } else {
            console.log("error");
          }
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
    }, []);
  
    return (
      <div className='w-72'>
        <div className='flex justify-between items-center'>
          <div className='flex flex-row items-center space-x-2 pb-2'>
            <p className="font-bold text-sm">Top customers by spend</p>
            <Popover message={"Estimated gross volume is the total spend per customer, including guest customers. The numbers do not include refunds and disputes."} />
          </div>
          <div>
            <p className='text-xs text-gray-500'>All time</p>
          </div>
        </div>
  
        {topCustomersData ? (
          topCustomersData.map((customer, index) => (
            <div key={index}>
              <div onClick={() => navigate('/balances')} className='flex flex-row justify-between items-center py-2.5 hover:bg-gray-100 rounded-lg cursor-pointer'>
                <div className='flex flex-col'>
                  <p className='text-black font-semibold text-xs'>{customer.email}</p>
                  <p className='text-gray-500 text-xs'>{customer.customer_id}</p>
                </div>
                <div>
                  <p className='pl-2 text-xs font-medium'>£61.28</p> {/* Replace with actual spend if available */}
                </div>
              </div>
              <div className="w-full h-px bg-gray-300 my-auto"></div>
            </div>
          ))
        ) : (
          <LoadingWheel />
        )}
        <div className='flex flex-row justify-between pt-2'>
              <a href="balances" className="font-bold text-violet-500 text-xs hover:text-black align-top">View more</a>
              <p className='text-xs text-gray-500'>Updated 12:00 AM</p>
            </div>
      </div>
    );
  }

export default TopCustomersBySpend;