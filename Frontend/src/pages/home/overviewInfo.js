
import React, { useState } from 'react';
import PaymentsOverview from './overview-components/paymentsOverview';
import OverviewGraph from './overview-components/overviewGraph';
import FailedPaymentsOverview from './overview-components/failedPayments';
import TopCustomersBySpend from './overview-components/topCustomersBySpend';
import OverviewSettingsSelectorsBar from './overview-components/overviewSettingsSelectors';

function OverviewInfo() {

    const [selectedOption, setSelectedOption] = useState('Today');
  
    return (
      <div>
        <h1 className="font-bold text-2xl pb-3">Your Overview</h1>
        <OverviewSettingsSelectorsBar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <div className="w-full h-px bg-gray-300 my-auto"></div>
        <div className="pt-6 grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          <PaymentsOverview />
          <OverviewGraph
            graphHeader={"Gross volume"}
            amount={"£61.28"}
            previousPeriod={"£12.00 previous period"}
            percentage={"+410.7%"}
            informationMessage={"Estimated revenue from payments that are settled to your Stripe balance."}
            selectedOption={selectedOption}
          />
          <OverviewGraph
            graphHeader={"Net volume from sales"}
            amount={"-£1.72"}
            previousPeriod={"-£0.38 previous period"}
            percentage={"-352%"}
            informationMessage={"Estimated revenue from payments after fees, refunds, disputes, and Connect transfers have been deducted."}
            selectedOption={selectedOption}
          />
        </div>
        <div className='pb-12'></div>
        <div className="w-full h-px bg-gray-300 my-auto"></div>
        <div className="pt-8 grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 pb-14 items-start">
          <FailedPaymentsOverview />
          <OverviewGraph
            graphHeader={"New customers"}
            amount={"1"}
            previousPeriod={"1 previous period"}
            percentage={"0.0%"}
            informationMessage={"Number of new customers created, including customers that are subsequently deleted. This number does not include guest customers."}
            selectedOption={selectedOption}
          />
          <TopCustomersBySpend />
        </div>
      </div>
    );
  }

export default OverviewInfo;
