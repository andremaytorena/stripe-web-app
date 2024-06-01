import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data, width, height }) => {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                display: true, // Show the Y-axis line
                ticks: {
                    display: false, // Hide Y-axis tick labels
                },
                beginAtZero: true,
                // ticks: {
                //     callback: (value, index, values) => {
                //     if (index === 0 || index === values.length - 1) {
                //         return `£${value.toFixed(2)}`;
                //     } else {
                //         return '';
                //     }
                //     },
                // },
                grid: {
                    display: false,
                },
            },
            x: {
                ticks: {
                    maxTicksLimit: 30,
                    padding: 0, // Remove padding to align the labels with the axis
                    callback: function (value, index, values) {
                        // Display only the first and last labels
                        if (index === 0 || index === values.length - 1) {
                          return this.getLabelForValue(value); // Return the actual label value
                        }
                        return ''; // Return empty string for other labels
                      },
                      align: 'start',
                      maxRotation: 0, // Prevent rotation of the labels
                      minRotation: 0, // Prevent rotation of the labels
                },
                grid: {
                    display: true,
                    drawBorder: false,
                },
                padding: {
                    left: 100,
                    right: 1,
                }
            },
        },
        plugins: {
            legend: {
            display: false,
            },
            tooltip: {
            mode: 'nearest', // Show tooltip for the nearest data point
            intersect: false, // Allow tooltips to show even if not directly hovering over the point
            position: 'average', // Display tooltip at the average position of the points
            callbacks: {
                label: function(context) {
                var label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                label += `£${context.parsed.y.toFixed(2)}`;
                return label;
                },
                // Custom tooltip function to draw vertical line
            },
            },
        },
    };
    
    return (
      <div style={{ width: width, height: height }}>
        <Line data={data} options={options} />
      </div>
    );
  };
  
export default LineChart;