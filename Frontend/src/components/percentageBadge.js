import React from 'react';

const PercentageBadge = ({ percentage }) => {
    const isNegative = percentage.includes('-');
    var badgeClasses = isNegative 
      ? 'bg-yellow-100 text-yellow-700' 
      : 'bg-green-100 text-green-700';
  
    const isZero = percentage === '0.0%';
    if (isZero) { badgeClasses = "bg-gray-100 text-gray-700" }
  
    return (
      <div className={`${badgeClasses} px-1.5 rounded text-xs font-semibold`}>
        {percentage}
      </div>
    );
};

export default PercentageBadge;