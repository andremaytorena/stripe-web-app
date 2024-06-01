
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineChart from './lineChart';
import 'chart.js';
import LoadingWheel from '../../components/loadingWheel';
import API_BASE_URL from '../../Config';

const RevenuePerTimeGraph = () => {
    const [chartData, setChartData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/revenue`, 
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.status === 'success') {
            // Extract data from the response
            const { times, revenue } = response.data.data;
            // Update chart data state
            setChartData({
              labels: times,
              datasets: [
                {
                  label: 'Amount',
                  data: revenue,
                  borderColor: '#6366f1',
                  backgroundColor: '#6366f1',
                  fill: false,
                  tension: 0,
                  pointRadius: 0,
                },
              ],
            });
          } else {
            // Handle error response
            console.error('Failed to fetch data:', response.data.error);
          }
        } catch (error) {
          // Handle network error
          console.error('Failed to fetch data:', error.message);
        }
      };
  
      fetchData();
    }, []); // Empty dependency array ensures useEffect runs only once
  
    return (
      <div >
        {chartData ? (
          <LineChart data={chartData} width={700} height={125} />
        ) : (
          <div style={{ width: 700, height: 125 }}>
            <LoadingWheel />
          </div>
        )}
      </div>
    );
  };

function VolumeInfo() {
    return (
      <div className='flex flex-col w-full'>
        <div className="flex flex-row space-x-20 pb-4">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600">Gross volume</p>
            <p className="text-lg text-black">£0.00</p>
            <p className="text-xs text-gray-600">10:31 PM</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-600">Yesterday</p>
            <p className="text-xs text-gray-500">£0.00</p>
          </div>
        </div>
        <RevenuePerTimeGraph />
      </div>
    );
  }

export default VolumeInfo;