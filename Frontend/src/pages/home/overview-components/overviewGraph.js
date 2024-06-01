import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LineChart from '../lineChart';
import API_BASE_URL from '../../../Config';
import LoadingWheel from "../../../components/loadingWheel";
import Popover from "../../../components/popOver";
import PercentageBadge from '../../../components/percentageBadge';


const OverviewGraph = ({ graphHeader, amount, previousPeriod, percentage, informationMessage, selectedOption}) => {
    const [chartData, setChartData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setChartData(null);
        try {
          const response = await axios.get(`${API_BASE_URL}/api/revenue`, 
            {
              headers: {
                "Content-Type": "application/json",
              },
              params: {
                period: selectedOption,
                graphHeader
              }
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
    }, [selectedOption, graphHeader]); // Empty dependency array ensures useEffect runs only once
  
    return (
      <div>
        {chartData ? (
          <div className='space-y-1'>
            <div className='flex flew-row items-center space-x-2'> 
              <p className="font-bold text-sm">{graphHeader}</p>
              <Popover message={informationMessage} />
              <PercentageBadge percentage={percentage} />
            </div>
            <div className='flex flex-row items-center pb-2'>
              <p className="text-md text-black pr-2">{amount}</p>
              <p className="text-xs text-gray-500">{previousPeriod}</p>
            </div>
            <LineChart data={chartData} width={300} height={200} />
          </div>
        ) : (
          <div style={{ width: 300, height: 200 }}>
            <LoadingWheel />
          </div>
        )}
      </div>
    );
  };

export default OverviewGraph;