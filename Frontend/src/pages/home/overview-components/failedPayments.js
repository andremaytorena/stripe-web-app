import React from 'react'

function FailedPaymentsOverview() {
    return (
      <div className="">
        <p className="font-bold text-sm pb-4">Failed payments</p>
        <div className="w-80 border-2 border-dashed border-gray-300 rounded-lg py-20 p-4 items-center justify-center flex text-gray-500 text-xs">
          <p className='text-center'>No failed payments to show in selected time period.</p>
        </div>
      </div>
    )
  }

export default FailedPaymentsOverview;