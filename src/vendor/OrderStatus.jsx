import React, { useState } from 'react';
import { VscAccount } from "react-icons/vsc";

const OrderStatus = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

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

  return (
    <div className='w-full min-h-screen bg-slate-300'>
      <div className='w-full h-16 bg-gray-800 flex justify-between items-center py-3 px-4 md:px-10'>
        <div><span className='text-lg md:text-2xl font-semibold uppercase text-white tracking-widest'>Order Status</span></div>
        <div className='rounded-full flex justify-center items-center'>
          <VscAccount className='text-white w-6 h-6 md:w-8 md:h-8' />
        </div>
      </div>

      <div className='p-4 md:p-10'>
        {orders.map(order => (
          <div key={order.id} className='mb-4 p-4 bg-white rounded shadow-md'>
            <div className='flex justify-between items-center'>
              <h2 className='text-base md:text-lg font-semibold'>
                {order.product}
                <span
                  className={`ml-2 ${order.status === 'Placed' ? 'text-blue-600' :
                    order.status === 'Processing' ? 'text-yellow-400' :
                      order.status === 'Cancel' ? 'text-red-600' :
                        'text-green-500'
                    }`}
                >
                  ({order.status})
                </span>
              </h2>
              <button onClick={() => toggleAccordion(order.id)} className='text-xs md:text-sm text-blue-500'>
                {expandedOrderId === order.id ? 'Hide Details' : 'Show Details'}
              </button>
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
                              'bg-green-500 text-white'
                        : 'bg-gray-300'
                        }`}
                    >
                      {stages.indexOf(order.status) >= index && (
                        <span className='text-xs'>{index + 1}</span>
                      )}
                    </div>
                    {index < stages.length - 1 && (
                      <div className='w-6 md:w-16 lg:w-24 h-1 bg-gray-300 mx-1 md:mx-2 '>
                        <div
                          className={`h-1 ${stages.indexOf(order.status) > index
                            ? order.status === 'Order Placed' ? 'bg-blue-600' :
                              order.status === 'Processing' ? 'bg-yellow-400' :
                                order.status === 'Cancel' ? 'bg-red-500' :
                                  'bg-green-500'
                            : ''
                            }`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className='flex justify-between mt-2 text-xs md:text-sm '>
                {stages.map((stage, index) => (
                  <span key={index} className='w-6 md:w-24 text-end'>{stage}</span>
                ))}
              </div>
              {expandedOrderId === order.id && (
                <div className='mt-4 text-xs md:text-sm flex flex-col md:flex-row gap-2 md:gap-10 bg-gray-200 p-2 rounded'>
                  <p><strong>Price:</strong> &#x20B9; {order.price}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Time:</strong> {order.time}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
