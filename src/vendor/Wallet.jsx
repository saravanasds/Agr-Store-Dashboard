import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";

const Wallet = () => {
  const [vendorData, setVendorData] = useState(null); // Change the initial state to null
  const [vendorEmail, setVendorEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const vendorEmail = localStorage.getItem("vendorEmail");
    setVendorEmail(vendorEmail);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vendor/getVendorByEmail/${vendorEmail}`);
        setVendorData(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
      finally {
        setLoading(false);
      }
    };

    if (vendorEmail) {
      fetchOrders();
    }
  }, [vendorEmail]);

  console.log(vendorEmail);
  console.log(vendorData);

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

      {
        loading ?
          (
            <span className='w-full min-h-[80vh] text-2xl text-black tracking-widest font-semibold flex items-center justify-center py-2'>
              Loading
              <span className='dot-animate inline-block w-1 h-1 mx-1 bg-black rounded-full animate-bounce1 mt-6'></span>
              <span className='dot-animate inline-block w-1 h-1 mx-1 bg-black rounded-full animate-bounce2 mt-6'></span>
              <span className='dot-animate inline-block w-1 h-1 mx-1 bg-black rounded-full animate-bounce3 mt-6'></span>
            </span>
          ) :
          <div>
            <div className="flex flex-col justify-around items-center mt-16 gap-4">
              <div className="border-2 border-gray-400 w-[95%] md:w-[70%] p-2 md:p-5 bg-white rounded-md">
                <h1 className="text-xl font-semibold mb-1">Current Balance</h1>
                <div className="my-3">
                  <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                    <div className="w-1/2">
                      <h1 className="text-md sm:text-lg">Total Sales Amount</h1>
                    </div>
                    <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl">
                      <p>
                        &#x20B9; {vendorData && vendorData.totalSaleAmount ? vendorData.totalSaleAmount.toFixed(2) : '0.00'}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                    <div className="w-1/2">
                      <h1 className="text-md sm:text-lg">Total Commission</h1>
                    </div>
                    <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl">
                      <p>
                        &#x20B9; {vendorData && vendorData.commissionAmount ? vendorData.commissionAmount.toFixed(2) : '0.00'}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                    <div className="w-1/2">
                      <h1 className="text-md sm:text-lg">Total Balance</h1>
                    </div>
                    <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl">
                      <p>
                        &#x20B9; {vendorData && vendorData.vendorBalance ? vendorData.vendorBalance.toFixed(2) : '0.00'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default Wallet;
