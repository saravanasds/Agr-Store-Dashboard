import React, { useState, useEffect } from 'react';
import { VscAccount } from "react-icons/vsc";
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

const AdminOrderStatus = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [orders, setOrders] = useState([]);
  const [openOrders, setOpenOrders] = useState(new Set()); // Use Set for tracking open orders
  const [loading, setLoading] = useState(true);
  const [cancelPopupOpen, setCancelPopupOpen] = useState(false);
  const [completePopupOpen, setCompletePopupOpen] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const [selectedTotalAmount, setSelectedTotalAmount] = useState(0);

  // Separate pagination states for each tab
  const [currentOrdersPage, setCurrentOrdersPage] = useState(1);
  const [completedOrdersPage, setCompletedOrdersPage] = useState(1);
  const [canceledOrdersPage, setCanceledOrdersPage] = useState(1);

  const recordsPerPage = 50;

  console.log(orders);

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
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/order/updateOrderStatus/${orderId}`, { orderStatus: status });
      const updatedOrders = orders.map((order, i) =>
        i === index ? { ...order, orderStatus: status } : order
      );
      setOrders(updatedOrders);
      window.alert(`Order status updated to ${status}`);
      window.location.reload();
    } catch (error) {
      console.error(`Error updating order status to ${status}:`, error);
    }
    finally {
      setLoading(false);
      setCancelPopupOpen(false);
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

  // Pagination for each tab
  const getPaginationData = (filteredOrders, currentPage) => {
    // Reverse the filteredOrders to show the last orders first
    const reversedOrders = [...filteredOrders].reverse();

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = reversedOrders.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(reversedOrders.length / recordsPerPage);

    return { currentRecords, totalPages };
  };

  // Function to open/close the complete popup and set the order ID
  const completePopup = (orderId, index) => {
    setSelectedOrderId(orderId); // Set the order ID when opening the popup
    setSelectedOrderIndex(index);
    setCompletePopupOpen(!completePopupOpen); // Toggle the popup state
  };

  // Function to open/close the cancel popup and set the order ID
  const cancelPopup = (orderId, index) => {
    setSelectedOrderId(orderId); // Set the order ID when opening the popup
    setSelectedOrderIndex(index);
    setCancelPopupOpen(!cancelPopupOpen); // Toggle the popup state
  };

  const print = (orderId, index, totalAmount) => {
    setSelectedOrderId(orderId);
    setSelectedOrderIndex(index);
    setSelectedTotalAmount(totalAmount);
    const printContents = document.getElementById("print").innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
            @media print {
                body {
                    width: 80mm; /* Width for 80mm thermal printer */
                    margin: 0;
                    padding: 10px;
                    font-size: 12px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    border: 1px solid rgba(0, 0, 0, 0.3); 
                }
                .heading {
                  text-align: center;
                  font-size: 18px;
                  padding: 4px;
                } 
                #shop, #productCode, #shopHead, #productCodeHead{
                  display: none;
                }
                .content {
                    width: 100%;
                }
                .totalAmount {
                  text-align: right;
                  padding-right: 20px;
                }
                #table { 
                    width: 100%;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.2); 
                    border-top: 1px solid rgba(0, 0, 0, 0.2); 
                    padding-bottom: 5px;
                    padding-top: 5px;
                }
                h1, h2 {
                    text-align: center;
                    font-size: 12px;       
                }
                td{
                  text-align: center;
                }
            }
            </style>
        </head>
        <body>
        <h1 class='heading'>Agr Store</h1>
        <div class='content'>${printContents}</div>
        <div><h1 class='totalAmount'>Total Amount: ${selectedTotalAmount.toFixed(2)}</h1></div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };


  const renderTable = (filteredOrders, currentPage, setPage) => {
    const { currentRecords, totalPages } = getPaginationData(filteredOrders, currentPage);

    return (
      <div className='overflow-x-auto '>
        <table className="min-w-full bg-white text-xs sm:text-sm lg:text-[16px] whitespace-nowrap">
          <thead className=' border-b-2 bg-gray-200'>
            <tr>
              <th className="p-2 py-4">Sl.no</th>
              <th className="p-2 py-4">Name</th>
              <th className="p-2 py-4">Address</th>
              <th className="p-2 py-4">Pincode</th>
              <th className="p-2 py-4">Mobile Number</th>
              <th className="p-2 py-4">Total Amount</th>
              <th className="p-2 py-4">Discount</th>
              {activeTab === "completed" ? <th className="p-2 py-4">Total Balance</th> : ""}
              <th className="p-2 py-4">Status</th>
              <th className="p-2 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((order, index) => {
              const totalOrderBalance = order.products.reduce((total, product) => total + parseFloat(product.balance), 0);

              return (
                <React.Fragment key={order._id}>
                  <tr className="border-b cursor-pointer" onClick={() => toggleAccordion(order._id)}>
                    <td className="p-2 text-center">{index + 1}</td>
                    <td className="p-2 text-center">{order.name}</td>
                    <td className="p-2 text-center">{order.address}</td>
                    <td className="p-2 text-center">{order.pincode}</td>
                    <td className="p-2 text-center">{order.mobileNumber}</td>
                    <td id='totalAmount' className="p-2 text-center">{order.totalAmount}</td>
                    <td className="p-2 text-center">{order.discount}</td>
                    {activeTab === "completed" ? <td className="p-2 text-center">&#x20B9; {totalOrderBalance}</td> : ""}
                    <td className="p-2 text-center">{order.orderStatus}</td>
                    <td className="p-2 text-center">
                      {activeTab === 'current' && order.orderStatus === 'Processing' ? (
                        <>
                          <button
                            onClick={() => completePopup(order._id, index )}
                            className='bg-green-500 text-xs text-white font-semibold py-1 px-3 rounded-md mr-2'
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => cancelPopup(order._id, index)}
                            className='bg-gray-500 text-xs text-white font-semibold py-1 px-3 rounded-md mr-2'
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => print(order._id, index, order.totalAmount)}
                            className='bg-blue-500 text-xs text-white font-semibold py-1 px-3 rounded-md'
                          >
                            Print
                          </button>

                        </>
                      ) : <div className='text-sm text-gray-400 font-semibold'>Updated</div>}
                    </td>
                  </tr>
                  {openOrders.has(order._id) && (
                    <tr id='print'>
                      <td colSpan="10">
                        <div className="p-1 bg-gray-200 border border-gray-700">
                          <div className='w-full flex justify-between items-center px-10 py-2 text-xs md:text-sm'>
                            <h1><strong>Order Id: </strong> #{order._id}</h1>
                            <h1><strong>Time: </strong> {formatDate(new Date(order.createdAt))}</h1>
                          </div>
                          <table id='table' className="min-w-full bg-white">
                            <thead>
                              <tr>
                                <th className="p-2">Sl.no</th>
                                <th id='productCodeHead' className="p-2">Product Code</th>
                                <th className="p-2">Product</th>
                                <th id='shopHead' className="p-2">Shop</th>
                                <th className="p-2">Qty</th>
                                <th className="p-2">Price</th>
                                {activeTab === "completed" ? <th className="p-2">Commission</th> : ""}
                                {activeTab === "completed" ? <th className="p-2">Balance</th> : ""}
                              </tr>
                            </thead>
                            <tbody>
                              {order.products.map((product, i) => (
                                <tr key={product.productId || i} className="border-b">
                                  <td className="p-2 text-center">{i + 1}</td>
                                  <td id='productCode' className="p-2 text-center">{product.productCode}</td>
                                  <td className="p-2 text-center">{product.productName} {product.offered === "true" ? <span className='text-red-600 text-xs font-semibold tracking-wider'>(Offered)</span> : " "}</td>
                                  <td id='shop' className="p-2 text-center">{product.shopName}</td>
                                  <td className="p-2 text-center">{product.quantity}</td>
                                  <td className="p-2 text-center">{product.total}</td>
                                  {activeTab === "completed" ? <td className="p-2 text-center">&#x20B9; {(product.total * product.vendorCommission) / 100}</td> : " "}
                                  {activeTab === "completed" ? <td className="p-2 text-center">&#x20B9; {product.balance}</td> : ""}
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

        {completePopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-[90%] sm:w-[60%] lg:w-[40%] bg-white shadow-md rounded-lg mt-4 p-4 lg:px-8">
              <h2 className="w-[95%] text-lg sm:text-2xl font-semibold mb-2 sm:mb-4 text-left">
                Are you sure you want to complete this order?
              </h2>

              <div className="w-full flex flex-col-reverse sm:flex-row justify-center lg:justify-end items-center mt-4 gap-2 sm:gap-4">
                <button
                  onClick={() => setCompletePopupOpen(false)} // Close popup on 'No'
                  className="w-full sm:w-auto bg-gray-300 text-sm sm:text-[16px] px-8 sm:py-2 py-1 rounded"
                >
                  No
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateOrderStatus(selectedOrderId, 'Completed', selectedOrderIndex); // Pass selectedOrderId to update status
                  }}
                  className="w-full sm:w-auto bg-green-500 text-white px-4 sm:py-2 py-1 rounded hover:bg-green-600 text-sm sm:text-[16px]"
                >
                  {loading ? <ClipLoader color={'#ffffff'} loading={loading} size={20} /> : 'Yes'}
                </button>
              </div>
            </div>
          </div>
        )}


        {cancelPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-[90%] sm:w-[60%] lg:w-[40%] bg-white shadow-md rounded-lg mt-4 p-4 lg:px-8">
              <h2 className="w-[95%] text-lg sm:text-2xl font-semibold mb-2 sm:mb-4 text-left">
                Are you sure you want to cancel this order?
              </h2>

              <div className="w-full flex flex-col-reverse sm:flex-row justify-center lg:justify-end items-center mt-4 gap-2 sm:gap-4">
                <button
                  onClick={() => setCancelPopupOpen(false)} // Close popup on 'No'
                  className="w-full sm:w-auto bg-gray-300 text-sm sm:text-[16px] px-8 sm:py-2 py-1 rounded"
                >
                  No
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateOrderStatus(selectedOrderId, 'Canceled', selectedOrderIndex); // Pass selectedOrderId to update status
                  }}
                  className="w-full sm:w-auto bg-green-500 text-white px-4 sm:py-2 py-1 rounded hover:bg-green-600 text-sm sm:text-[16px]"
                >
                  {loading ? <ClipLoader color={'#ffffff'} loading={loading} size={20} /> : 'Yes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-4 text-xs sm:text-[16px]">
            <button
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-1 mr-2 bg-blue-700 rounded disabled:opacity-50 text-white"
            >
              Prev
            </button>
            <span className="py-1 text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-1 ml-2 bg-blue-700 rounded disabled:opacity-50 text-white"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );


  };

  const filteredCurrentOrders = orders.filter(order => order.orderStatus === 'Processing');
  const filteredCompletedOrders = orders.filter(order => order.orderStatus === 'Completed');
  const filteredCanceledOrders = orders.filter(order => order.orderStatus === 'Canceled');

  return (
    <div className='flex flex-col w-full min-h-screen'>
      <div className="flex flex-col justify-center w-full">
        <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
          <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Order Status</span></div>
          <div className='rounded-full flex justify-center items-center'>
            <VscAccount className='text-gray-400 w-8 h-8' />
          </div>
        </div>

        <div className="flex justify-evenly items-center my-5 border-b pb-4 text-xs sm:text-[16px] gap-4">
          <button
            onClick={() => setActiveTab('current')}
            className={`py-1  ${activeTab === 'current' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-300'}`}
          >
            Current Orders
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-1  ${activeTab === 'completed' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-300'}`}
          >
            Completed Orders
          </button>
          <button
            onClick={() => setActiveTab('canceled')}
            className={`py-1  ${activeTab === 'canceled' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-300'}`}
          >
            Canceled Orders
          </button>
        </div>

        <div className="p-2 sm:p-5 w-full">
          {activeTab === 'current' && renderTable(filteredCurrentOrders, currentOrdersPage, setCurrentOrdersPage)}
          {activeTab === 'completed' && renderTable(filteredCompletedOrders, completedOrdersPage, setCompletedOrdersPage)}
          {activeTab === 'canceled' && renderTable(filteredCanceledOrders, canceledOrdersPage, setCanceledOrdersPage)}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderStatus;
