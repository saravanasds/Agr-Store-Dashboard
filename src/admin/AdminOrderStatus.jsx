import React, { useState, useEffect } from 'react';
import { VscAccount } from "react-icons/vsc";
import axios from 'axios';

const AdminOrderStatus = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [orders, setOrders] = useState([]);
  const [openOrders, setOpenOrders] = useState(new Set()); // Use Set for tracking open orders
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/order/getAllOrders');
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [activeTab]);

  const toggleAccordion = (orderId) => {
    setOpenOrders(prevOpenOrders => {
      const newOpenOrders = new Set(prevOpenOrders);
      if (newOpenOrders.has(orderId)) {
        newOpenOrders.delete(orderId); // Close if already open
      } else {
        newOpenOrders.add(orderId); // Open if not already open
      }
      return newOpenOrders;
    });
  };

  const updateOrderStatus = async (orderId, status, index) => {
    try {
      await axios.put(`http://localhost:5000/api/order/updateOrderStatus/${orderId}`, { orderStatus: status });
      const updatedOrders = orders.map((order, i) =>
        i === index ? { ...order, orderStatus: status } : order
      );
      setOrders(updatedOrders);
      window.alert(`Order status updated to ${status}`);
    } catch (error) {
      console.error(`Error updating order status to ${status}:`, error);
    }
  };

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
          <th className="py-2">Name</th>
          <th className="py-2">Address</th>
          <th className="py-2">Pincode</th>
          <th className="py-2">Mobile Number</th>
          <th className="py-2">Total Amount</th>
          <th className="py-2">Discount</th>
          {activeTab === "completed" ? <th className="py-2">Total Balance</th> : ""}
          <th className="py-2">Status</th>
          <th className="py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredOrders.reverse().map((order, index) => {  // Reverse the order here
          const totalOrderBalance = order.products.reduce((total, product) => total + parseFloat(product.balance), 0);

          return (
            <React.Fragment key={order._id}>
              <tr className="border-b cursor-pointer" onClick={() => toggleAccordion(order._id)}>
                <td className="py-2 text-center">{index + 1}</td>
                <td className="py-2 text-center">{order.name}</td>
                <td className="py-2 text-center">{order.address}</td>
                <td className="py-2 text-center">{order.pincode}</td>
                <td className="py-2 text-center">{order.mobileNumber}</td>
                <td className="py-2 text-center">{order.totalAmount}</td>
                <td className="py-2 text-center">{order.discount}</td>
                {activeTab === "completed" ? <td className="py-2 text-center">&#x20B9; {totalOrderBalance}</td> : ""}
                <td className="py-2 text-center">{order.orderStatus}</td>
                <td className="py-2 text-center">
                  {activeTab === 'current' && order.orderStatus === 'Processing' ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(order._id, 'Completed', index);
                        }}
                        className='bg-green-500 text-xs text-white font-semibold py-1 px-3 rounded-md mr-2'
                      >
                        Complete
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(order._id, 'Canceled', index);
                        }}
                        className='bg-gray-500 text-xs text-white font-semibold py-1 px-3 rounded-md'
                      >
                        Cancel
                      </button>
                    </>
                  ) : <div className='text-sm text-gray-400 font-semibold'>Updated</div>}
                </td>
              </tr>
              {openOrders.has(order._id) && (
                <tr>
                  <td colSpan="10">
                    <div className="p-1 bg-gray-200 border border-gray-700">
                      <div className='w-full flex justify-between items-center px-10 py-2 text-sm'>
                        <h1><strong>Order Id: </strong> #{order._id}</h1>
                        <h1><strong>Time: </strong> {formatDate(new Date(order.createdAt))}</h1>
                      </div>
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr>
                            <th className="py-2">Sl.no</th>
                            <th className="py-2">Product Code</th>
                            <th className="py-2">Product</th>
                            <th className="py-2">Shop</th>
                            <th className="py-2">Quantity</th>
                            <th className="py-2">Price</th>
                            {activeTab === "completed" ? <th className="py-2">Commission</th> : ""}
                            {activeTab === "completed" ? <th className="py-2">Balance</th> : ""}
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((product, i) => (
                            <tr key={product.productId || i} className="border-b">
                              <td className="py-2 text-center">{i + 1}</td>
                              <td className="py-2 text-center">{product.productCode}</td>
                              <td className="py-2 text-center">{product.productName}</td>
                              <td className="py-2 text-center">{product.shopName}</td>
                              <td className="py-2 text-center">{product.quantity}</td>
                              <td className="py-2 text-center">{product.total}</td>
                              {activeTab === "completed" ? <td className="py-2 text-center">&#x20B9; {(product.total * product.vendorCommission) / 100}</td> : " "}
                              {activeTab === "completed" ? <td className="py-2 text-center">&#x20B9; {product.balance}</td> : ""}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );



  const currentOrders = orders.filter(order => order.orderStatus === 'Processing');
  const completedOrders = orders.filter(order => order.orderStatus === 'Completed');
  const canceledOrders = orders.filter(order => order.orderStatus === 'Canceled');

  return (
    <div className='w-full min-h-screen'>
      <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
        <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Order Status</span></div>
        <div className='rounded-full flex justify-center items-center'>
          <VscAccount className='text-gray-400 w-8 h-8' />
        </div>
      </div>

      {
        loading ?
          (
            <span className='w-full min-h-[80vh] text-2xl text-white tracking-widest font-semibold flex items-center justify-center py-2'>
              Loading
              <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce1 mt-6'></span>
              <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce2 mt-6'></span>
              <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce3 mt-6'></span>
            </span>
          ) :

          (<div className="w-full p-4">
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
              <button
                onClick={() => setActiveTab('canceled')}
                className={`py-2 px-4 rounded ${activeTab === 'canceled' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
              >
                Canceled Orders
              </button>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              {activeTab === 'current' && renderTable(currentOrders)}
              {activeTab === 'completed' && renderTable(completedOrders)}
              {activeTab === 'canceled' && renderTable(canceledOrders)}
            </div>
          </div>)
      }
    </div>
  );
};

export default AdminOrderStatus;
