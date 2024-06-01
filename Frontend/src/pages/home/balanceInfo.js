import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../Config';


function BalanceInfo() {

    const [balanceData, setBalanceData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/balances`, 
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.status === 'success') {
            setBalanceData(response.data.data);
          } else {
            console.error('Failed to fetch data:', response.data.error);
          }
        } catch (error) {  
          console.error('Failed to fetch data:', error.message);
        }
      }
      fetchData();
    }, [])
  
    return (
      <div className="flex-grow flex flex-col md:pt-0 pt-10 w-full">
        {balanceData ? (
          <>
            <div className="flex flex-row justify-between">
              <div className="pb-8">
                <p className="text-sm text-gray-600">GDP balance</p>
                <p className="text-lg text-black">£{balanceData.balance.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{Math.sign(balanceData.balance) == -1 ? 'Your Stripe balance is negative.' : 'You have no outstanding payments.'}</p>
              </div>
              <div>
                <a href="balances" className="text-violet-500 text-sm hover:text-black align-top">View</a>
              </div>
            </div>
            <div className="w-full h-px bg-gray-300 my-auto"></div>
            <div className="pt-6 flex flex-row justify-between">
              <div>
                <p className="text-sm text-gray-600">Debits</p>
                <p className="text-lg text-black">£{balanceData.debits.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Expected May 28.</p>
              </div>
              <div>
                <a href="balances" className="text-violet-500 text-sm hover:text-black align-top">View</a>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }

export default BalanceInfo;