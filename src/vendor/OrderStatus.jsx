import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";

const OrderStatus = () => {
  const [activeTab, setActiveTab] = useState('current'); // State to manage active tab
  const [orders, setOrders] = useState([]);
  const [vendorEmail, setVendorEmail] = useState(''); // Replace with the actual vendorEmail
  const [commission, setCommission] = useState('');

  useEffect(() => {
    const vendorEmail = localStorage.getItem("vendorEmail");
    setVendorEmail(vendorEmail);

    const vendorCommission = localStorage.getItem("vendorCommision");
    setCommission(parseFloat(vendorCommission));
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/order/getVendorOrders/${vendorEmail}`);
        setOrders(response.data.products);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [activeTab, vendorEmail]); // Fetch orders when active tab or vendorEmail changes

  console.log(orders);

  const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    return formattedDate;
  };


  const renderTable = (filteredOrders) => (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Sl.no</th>
          <th className="py-2">Product Code</th>
          <th className="py-2">Product</th>
          <th className="py-2">Quantity</th>
          <th className="py-2">Price</th>
          {activeTab === "current" ? "" : <th className="py-2">Commission</th>}
          {activeTab === "current" ? "" : <th className="py-2">Balance</th>}
          {activeTab === "current" ? <th className="py-2">Time</th> : ""}
          <th className="py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {filteredOrders.reverse().map((order, index) =>  (
          <tr key={order.productId} className="border-b">
            <td className="py-2 text-center">{index + 1}</td>
            <td className="py-2 text-center">{order.productCode}</td>
            <td className="py-2 text-center">{order.productName}</td>
            <td className="py-2 text-center">{order.quantity}</td>
            <td className="py-2 text-center">&#x20B9; {order.total}</td>
            {activeTab === "current" ? "" : <td className="py-2 text-center">&#x20B9; {(order.total * commission) / 100}</td>}
            {activeTab === "current" ? "" : <td className="py-2 text-center">&#x20B9; {order.total - (order.total * commission) / 100}</td>}
            {activeTab === "current" ? <td className="py-2 text-center">{formatDate(new Date(order.createdAt))}</td> : ""}
            <td className="py-2 text-center">{order.orderStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const currentOrders = orders.filter(order => order.orderStatus === 'Processing');
  const completedOrders = orders.filter(order => order.orderStatus === 'Completed');

  return (
    <div className='w-full min-h-screen bg-slate-300'>
      <div className='w-full h-16 bg-gray-800 flex justify-between items-center py-3 px-4 md:px-10'>
        <div>
          <span className='text-lg md:text-2xl font-semibold uppercase text-white tracking-widest'>Order Status</span>
        </div>
        <div className='rounded-full flex justify-center items-center'>
          <VscAccount className='text-white w-6 h-6 md:w-8 md:h-8' />
        </div>
      </div>

      <div className="w-full p-4">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setActiveTab('current')}
            className={`py-2 px-4 rounded ${activeTab === 'current' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          >
            Current Orders
          </button>
          <button
            onClick={() => {
              setActiveTab('completed');
              // window.location.reload();
            }}
            className={`py-2 px-4 rounded ${activeTab === 'completed' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          >
            Completed Orders
          </button>

        </div>

        <div className="bg-white shadow rounded-lg p-4">
          {activeTab === 'current' ? renderTable(currentOrders) : renderTable(completedOrders)}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
