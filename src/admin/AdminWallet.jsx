import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";

const AdminWallet = () => {
  const [vendorCommissions, setVendorCommissions] = useState([]);
  const [totalCommission, setTotalCommission] = useState(0);
  const [userShare, setUserShare] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/getVendorCommissions');
        const totalComm = response.data.totalCommission;

        const userComm = totalComm * 0.2; // 20% of total commission
        const totalBal = totalComm - userComm; // Total balance after subtracting user commission

        setVendorCommissions(response.data.vendorCommissions);
        setTotalCommission(totalComm);
        setUserShare(userComm);
        setTotalBalance(totalBal);
      } catch (err) {
        console.error('Error fetching commissions:', err);
      }
    };

    fetchCommissions();
  }, []);

  return (
    <>
      <div className='w-full min-h-[100vh]'>
        <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
          <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Wallet</span></div>
          <div className='rounded-full flex justify-center items-center'>
            <VscAccount className='text-gray-400 w-8 h-8' />
          </div>
        </div>

        <div className='w-full flex mx-auto justify-center items-center'>
          <div className="w-[95%] flex justify-around items-center mt-16 gap-4 text-white">
            <div className='w-[95%] md:w-[50%] p-2 md:p-10 bg-[rgba(0,0,0,0.4)] rounded-md border border-cyan-400'>
              <h1 className="text-xl font-semibold border-b-2 border-cyan-600 p-2 mb-8">Commission by each vendor</h1>
              <div className="my-2">
                {vendorCommissions.map((vendor, index) => (
                  <div key={index} className="flex justify-center items-center w-full p-2 border-b-2 border-cyan-600 mb-2">
                    <div className="w-1/2"><h1 className="text-md ">{vendor.shopName}</h1></div>
                    <div className="w-1/2 h-full bg-gradient-to-r from-cyan-600 to-transparent px-2 py-1 rounded-md text-md text-white"><p>&#x20B9; {vendor.totalCommission.toFixed(2)}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[95%] md:w-[50%] p-2 md:p-10 bg-[rgba(0,0,0,0.4)] rounded-md border border-cyan-400">
              <h1 className="text-xl font-semibold border-b-2 border-cyan-600 p-2 mb-8">Current Balance</h1>
              <div className="my-3">
                <div className="flex justify-center items-center w-full p-2 border-b-2 border-cyan-600 mb-4">
                  <div className="w-1/2"><h1 className="text-md sm:text-lg">Total Vendor Commission</h1></div>
                  <div className="w-1/2 h-full bg-gradient-to-r from-cyan-600 to-transparent px-2 py-1 rounded-md text-xl text-white"><p>&#x20B9; {totalCommission.toFixed(2)}</p></div>
                </div>
                <div className="flex justify-center items-center w-full p-2 border-b-2 border-cyan-600 mb-4">
                  <div className="w-1/2"><h1 className="text-md sm:text-lg">User Share (20%)</h1></div>
                  <div className="w-1/2 h-full bg-gradient-to-r from-cyan-600 to-transparent px-2 py-1 rounded-md text-xl text-white"><p>&#x20B9; {userShare.toFixed(2)}</p></div>
                </div>
                <div className="flex justify-center items-center w-full p-2 border-b-2 border-cyan-600 mb-4">
                  <div className="w-1/2"><h1 className="text-md sm:text-lg">Total Balance</h1></div>
                  <div className="w-1/2 h-full bg-gradient-to-r from-cyan-600 to-transparent px-2 py-1 rounded-md text-xl text-white"><p>&#x20B9; {totalBalance.toFixed(2)}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminWallet;
