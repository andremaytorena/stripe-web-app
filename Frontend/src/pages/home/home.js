import React, { useState, isActive } from 'react';
import withAuth from "../authentication/isAuthenticated";

import Navbar from "../../components/navbar";
import SideBar from "../../components/sidebar";
import RightSideBar from "../../components/rightsidebar";

import VolumeInfo from './volumeInfo';
import BalanceInfo from './balanceInfo';
import OverviewInfo from './overviewInfo';

function Header() {
  return (
    <div>
      <h1 className="font-bold text-2xl pb-1">Today</h1>
      <div className="w-full h-px bg-gray-300 my-auto"></div>
    </div>
  );
}

// function Home() {
//   return (
//     <div>
//         <Navbar />
//         <div className="flex flex-row">
//             <SideBar/>
//             <div className="flex-grow">
//               <Header />
//               <div className="flex flex-col pt-6">
//                 <div className="flex flex-col md:flex-row space-x-20 items-start">
//                   <VolumeInfo />
//                   <BalanceInfo />
//                 </div>
//                 <div className="pt-10">
//                   <OverviewInfo />
//                 </div>
//               </div>
//             </div>
//             <RightSideBar/>
//         </div>
//     </div>
//   );
// }

function Home() {
  return (
    <div>
        <div className="flex flex-row">
            <SideBar/>
            <div className="flex-grow">
              <Navbar />
              <Header />
              <div className="flex flex-col pt-6">
                <div className="flex flex-col md:flex-row md:space-x-20 items-start">
                  <VolumeInfo />
                  <BalanceInfo />
                </div>
                <div className="pt-10">
                  <OverviewInfo />
                </div>
              </div>
            </div>
            <RightSideBar/>
        </div>
    </div>
  );
}

export default withAuth(Home);