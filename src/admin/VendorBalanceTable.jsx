import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";

const VendorBalanceTable = () => {
    const [vendorBalances, setVendorBalances] = useState([]);

    useEffect(() => {
        const fetchVendorBalances = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/order/getVendorBalanceSums');
                setVendorBalances(response.data);
            } catch (error) {
                console.error('Error fetching vendor balances:', error);
            }
        };

        fetchVendorBalances();
    }, []);

    console.log(vendorBalances);

    return (
        <div className='w-full min-h-screen'>
            <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
                <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Vendor Balances</span></div>
                <div className=' rounded-full flex justify-center items-center'>
                    <VscAccount className='text-gray-400 w-8 h-8' />
                </div>
            </div>

            <table className="min-w-[95%] bg-[rgba(0,0,0,0.4)] mt-10 mx-auto">
                <thead className='bg-cyan-700 text-white '>
                    <tr>
                        <th className="py-2 font-semibold tracking-wider">Sl.no</th>
                        <th className="py-2 font-semibold tracking-wider">ShopName</th>
                        <th className="py-2 font-semibold tracking-wider">Total Balance (&#x20B9;)</th>
                    </tr>
                </thead>
                <tbody>
                    {vendorBalances.map((balance, index) => (
                        <tr key={balance.shopName} className="border-b border-gray-600">
                            <td className="py-2 text-center text-white">{index + 1}</td>
                            <td className="py-2 text-center text-white">{balance.shopName}</td>
                            <td className="py-2 text-center text-white">&#x20B9; {balance.totalBalance.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VendorBalanceTable;
