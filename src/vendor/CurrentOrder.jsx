import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";

const CurrentOrder = () => {
  const [orders, setOrders] = useState([]);
  const [vendorEmail, setVendorEmail] = useState('');
  const [commission, setCommission] = useState(''); // Initialize as a number

  useEffect(() => {
    const email = localStorage.getItem("vendorEmail");
    setVendorEmail(email);

    const vendorCommission = parseFloat(localStorage.getItem("vendorCommision"));
    setCommission(vendorCommission);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (vendorEmail) {
          const response = await axios.get(`http://localhost:5000/api/order/getVendorOrders/${vendorEmail}`);
          const currentOrders = response.data.products.filter(order => order.orderStatus === 'Processing');
          setOrders(currentOrders.reverse());
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [vendorEmail]);

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



  return (
    <div className='w-full min-h-screen bg-slate-300'>
      <div className='w-full h-16 bg-gray-800 flex justify-between items-center py-3 px-4 md:px-10'>
        <div>
          <span className='text-lg md:text-2xl font-semibold uppercase text-white tracking-widest'>Current Orders</span>
        </div>
        <div className='rounded-full flex justify-center items-center'>
          <VscAccount className='text-white w-6 h-6 md:w-8 md:h-8' />
        </div>
      </div>

      <div className='w-full flex justify-center items-center'>
        <table className="min-w-[95%] bg-white mt-10">
          <thead className='border-b-2 bg-slate-400'>
            <tr>
              <th className="py-4">Sl.no</th>
              <th className="py-4">Product Code</th>
              <th className="py-4">Product</th>
              <th className="py-4">Quantity</th>
              <th className="py-4">Price</th>
              <th className="py-4">Time</th>
              <th className="py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.productId} className="border-b">
                <td className="py-2 text-center">{index + 1}</td>
                <td className="py-2 text-center">{order.productCode}</td>
                <td className="py-2 text-center">{order.productName}</td>
                <td className="py-2 text-center">{order.quantity}</td>
                <td className="py-2 text-center">&#x20B9; {order.total}</td>
                <td className="py-2 text-center">{formatDate(new Date(order.createdAt))}</td>
                <td className="py-2 text-center">{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentOrder;
