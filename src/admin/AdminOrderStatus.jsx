import React, { useState, useEffect } from 'react';
import { VscAccount } from "react-icons/vsc";
import axios from 'axios';

const AdminOrderStatus = () => {
  const [activeTab, setActiveTab] = useState('current'); // State to manage active tab
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/order/getAllOrders`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [activeTab]); // Fetch orders when active tab or vendorEmail changes

  console.log(orders)

  const renderTable = (filteredOrders) => (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Product</th>
          <th className="py-2">Status</th>
          <th className="py-2">Price</th>
          <th className="py-2">Quantity</th>
          <th className="py-2">Time</th>
        </tr>
      </thead>
      <tbody>
        {filteredOrders.map((order) => (
          order.products.map(product => (
            <tr key={product.productId} className="border-b">
              <td className="py-2 text-center">{product.productName}</td>
              <td className="py-2 text-center">{product.orderStatus || order.orderStatus}</td>
              <td className="py-2 text-center">{product.price}</td>
              <td className="py-2 text-center">{product.quantity}</td>
              <td className="py-2 text-center">{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))
        ))}
      </tbody>
    </table>
  );

  const currentOrders = orders.filter(order => order.orderStatus === 'Processing');
  const completedOrders = orders.filter(order => order.orderStatus === 'Completed');

  return (
    <div className='w-full min-h-screen '>
      <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
        <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Order Status</span></div>
        <div className=' rounded-full flex justify-center items-center'>
          <VscAccount className='text-gray-400 w-8 h-8' />
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
            onClick={() => setActiveTab('completed')}
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

export default AdminOrderStatus;
