import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";

const Wallet = () => {
  const [orders, setOrders] = useState([]);
  const [vendorEmail, setVendorEmail] = useState('');
  const [totalSales, setTotalSales] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);
  const [balance, setBalance] = useState(0);
  const [commissionRate, setCommissionRate] = useState(0); // Example commission rate of 10%

  useEffect(() => {
    const vendorEmail = localStorage.getItem("vendorEmail");
    setVendorEmail(vendorEmail);

    const vendorCommission = localStorage.getItem("vendorCommision");
    setCommissionRate(parseFloat(vendorCommission));
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/order/getVendorOrders/${vendorEmail}`);
        const completedOrders = response.data.products.filter(order => order.orderStatus === 'Completed');
        setOrders(completedOrders);

        // Calculate total sales, total commission, and balance
        const totalSalesAmount = completedOrders.reduce((acc, order) => acc + Number(order.total), 0);
        setTotalSales(totalSalesAmount);

        const commissionAmount = completedOrders.reduce((acc, order) => acc + (Number(order.total) * commissionRate / 100), 0);
        setTotalCommission(commissionAmount);

        const balanceAmount = totalSalesAmount - commissionAmount;
        setBalance(balanceAmount);

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (vendorEmail) {
      fetchOrders();
    }
  }, [vendorEmail, commissionRate]);


  console.log(orders)

  return (
    <>
      <div>
        <header className="w-full h-16 bg-gray-800 flex justify-between items-center px-6 md:px-10">
          <div>
            <span className="text-xl sm:text-2xl font-semibold uppercase text-white tracking-widest">
              Wallet
            </span>
          </div>
          <div className="flex justify-center items-center rounded-full">
            <VscAccount className="text-white w-8 h-8" />
          </div>
        </header>
      </div>
      <div>
        <div className="flex flex-col justify-around items-center mt-16 gap-4">
          <div className="border-2 border-gray-400 w-[95%] md:w-[70%] p-2 md:p-5 bg-white rounded-md">
            <h1 className="text-xl font-semibold mb-1">Current Balance</h1>
            <div className="my-3">
              <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                <div className="w-1/2"><h1 className="text-md sm:text-lg">Total Sales Amount</h1></div>
                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl"><p>&#x20B9; {totalSales}</p></div>
              </div>
              <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                <div className="w-1/2"><h1 className="text-md sm:text-lg">Total Commission</h1></div>
                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl"><p>&#x20B9; {totalCommission}</p></div>
              </div>
              <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                <div className="w-1/2"><h1 className="text-md sm:text-lg">Total Balance</h1></div>
                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl"><p>&#x20B9; {balance}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallet;
