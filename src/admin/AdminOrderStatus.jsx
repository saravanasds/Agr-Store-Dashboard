import React, { useState } from 'react';
import { VscAccount } from "react-icons/vsc";

const AdminOrderStatus = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [popupOrder, setPopupOrder] = useState({ id: null, action: null });

  const orders = [
    {
      id: 1,
      product: 'Rajabogam Rice',
      status: 'Placed',
      price: 1000,
      quantity: 20,
      time: '2024-07-30 14:30',
    },
    {
      id: 2,
      product: 'Tomato',
      status: 'Processing',
      price: 200,
      quantity: 10,
      time: '2024-07-29 13:00',
    },
    {
      id: 3,
      product: 'Onion',
      status: 'Completed',
      price: 300,
      quantity: 15,
      time: '2024-07-28 11:15',
    },
    {
      id: 4,
      product: 'Brinjal',
      status: 'Cancel',
      price: 150,
      quantity: 5,
      time: '2024-07-27 10:00',
    }
  ];

  const stages = ['Placed', 'Processing', 'Completed', 'Cancel'];

  const toggleAccordion = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const openPopup = (orderId, action) => {
    setPopupOrder({ id: orderId, action });
  };

  const closePopup = () => {
    setPopupOrder({ id: null, action: null });
  };

  return (
    <div className='w-full min-h-screen '>
      <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
        <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Order Status</span></div>
        <div className=' rounded-full flex justify-center items-center'>
          <VscAccount className='text-gray-400 w-8 h-8' />
        </div>
      </div>

      <div className='p-4 md:p-10 text-white'>
        {orders.map(order => (
          <div key={order.id} className='mb-4 p-4 bg-[rgba(0,0,0,0.4)] rounded shadow-md'>
            <div className='flex justify-between items-center'>
              <h2 className='text-base md:text-lg font-semibold'>
                {order.product}
                <span
                  className={`ml-2 ${order.status === 'Placed' ? 'text-blue-600' :
                    order.status === 'Processing' ? 'text-yellow-400' :
                      order.status === 'Cancel' ? 'text-red-600' :
                        'text-lime-500'
                    }`}
                >
                  ({order.status})
                </span>
              </h2>
              <div>
                <button
                  className='bg-red-600 px-2 py-1 text-white rounded mr-3 text-xs'
                  onClick={() => openPopup(order.id, 'Cancel')}
                >
                  Cancel
                </button>
                <button
                  className='bg-lime-600 px-2 py-1 text-white rounded mr-3 text-xs'
                  onClick={() => openPopup(order.id, 'Complete')}
                >
                  Complete
                </button>
                <button
                  onClick={() => toggleAccordion(order.id)}
                  className='px-2 py-1 text-black rounded mr-3 text-xs bg-gray-300'
                >
                  {expandedOrderId === order.id ? 'Hide Details <' : 'Show Details >'}
                </button>
              </div>
            </div>

            <div className='mt-4'>
              <div className='flex justify-between'>
                {stages.map((stage, index) => (
                  <div key={index} className='flex items-center'>
                    <div
                      className={`flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full ${stages.indexOf(order.status) >= index
                        ? order.status === 'Placed' ? 'bg-blue-600 text-white' :
                          order.status === 'Processing' ? 'bg-yellow-400 text-white' :
                            order.status === 'Cancel' ? 'bg-red-600 text-white' :
                              'bg-lime-500 text-white'
                        : 'bg-gray-300'
                        }`}
                    >
                      {stages.indexOf(order.status) >= index && (
                        <span className='text-xs'>{index + 1}</span>
                      )}
                    </div>
                    {index < stages.length - 1 && (
                      <div className='w-6 md:w-16 lg:w-24 h-1 bg-gray-300 mx-1 md:mx-2'>
                        <div
                          className={`h-1 ${stages.indexOf(order.status) > index
                            ? order.status === 'Placed' ? 'bg-blue-600' :
                              order.status === 'Processing' ? 'bg-yellow-400' :
                                order.status === 'Cancel' ? 'bg-red-600' :
                                  'bg-lime-500'
                            : ''
                            }`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className='flex justify-between mt-2 text-xs md:text-sm'>
                {stages.map((stage, index) => (
                  <span key={index} className='w-6 md:w-24 text-end'>{stage}</span>
                ))}
              </div>
              {expandedOrderId === order.id && (
                <div className='mt-4 text-xs md:text-sm flex flex-col md:flex-row gap-2 md:gap-10 bg-gray-400 p-2 rounded text-black'>
                  <p><strong>Price:</strong> &#x20B9; {order.price}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Time:</strong> {order.time}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {popupOrder.id !== null && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-xl font-semibold mb-4'>
              {popupOrder.action === 'Cancel' ? 'Cancel Order' : 'Complete Order'}
            </h2>
            <p className='mb-6'>
              Are you sure you want to {popupOrder.action.toLowerCase()} this order?
            </p>
            <div className='flex justify-end'>
              <button
                className='bg-gray-300 px-4 py-1 rounded mr-2'
                onClick={closePopup}
              >
                No
              </button>
              <button
                className={`bg-${popupOrder.action === 'Cancel' ? 'red' : 'lime'}-600 px-4 py-1 text-white rounded`}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderStatus;
