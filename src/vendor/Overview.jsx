import React, { useState, useEffect } from 'react';
import { VscAccount } from "react-icons/vsc";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { TbPigMoney } from "react-icons/tb";
import { PiHandbagBold } from "react-icons/pi";
import axios from 'axios';

const Overview = () => {
  const [department, setDepartment] = useState('');
  const [vendorProducts, setVendorProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [vendorEmail, setVendorEmail] = useState('');
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalCommissions, setTotalCommissions] = useState(0);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingCommissions, setLoadingCommissions] = useState(true);
  const [loadingEarnings, setLoadingEarnings] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("vendorEmail");
    setVendorEmail(email);
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("vendorDepartment");
    setDepartment(email);
  }, []);

  useEffect(() => {
    const vendorEmail = localStorage.getItem('vendorEmail');

    const fetchVendorProducts = async () => {
      setLoadingProducts(true);
      try {
        const response = await axios.post('http://localhost:5000/api/vendor/getVendorProducts', { vendorEmail });
        setVendorProducts(response.data.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchVendorProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      setLoadingEarnings(true);
      setLoadingCommissions(true);

      try {
        if (vendorEmail) {
          const response = await axios.get(`http://localhost:5000/api/order/getVendorOrders/${vendorEmail}`);
          const completedOrders = response.data.products.filter(order => order.orderStatus === 'Completed');
          setOrders(completedOrders.reverse());

          const totalEarning = completedOrders.reduce((acc, order) => acc + order.balance, 0);
          setTotalEarnings(totalEarning);

          const totalCommission = completedOrders.reduce((acc, order) => acc + order.commissionAmount, 0);
          setTotalCommissions(totalCommission);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoadingOrders(false);
        setLoadingEarnings(false);
        setLoadingCommissions(false);
      }
    };

    fetchOrders();
  }, [vendorEmail]);

  return (
    <div className='bg-slate-300 w-full min-h-[100vh]'>

      <div className='w-full h-16 bg-gray-800 flex justify-between items-center py-3 px-10'>
        <div><span className='sm:text-2xl font-semibold uppercase text-white tracking-widest'>{department}</span></div>
        <div className=' rounded-full flex justify-center items-center'>
          <VscAccount className='text-white w-8 h-8' />
        </div>
      </div>

      <div className='w-full flex flex-col xl:flex-row justify-center items-start'>
        <div className='w-full gap-4 grid grid-cols-1 xl:grid-cols-2 md:grid-cols-2 px-3 lg:px-14 py-6 min-h-[300px]'>

          <div className='border-2 border-green-500 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500 bg-white'>
            <div>
              <p className='text-md sm:text-xl font-semibold'>Total Products</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-black'>
                {loadingProducts ? (
                  <span className='text-sm tracking-widest font-semibold flex items-end justify-center py-2'>
                    Loading...
                  </span>
                ) : (
                  vendorProducts.length
                )}
              </p>
            </div>
            <div><MdOutlineProductionQuantityLimits className='text-[40px] md:text-[65px] opacity-80 text-green-700' /></div>
          </div>

          <div className='border-2 border-orange-500 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500 bg-white'>
            <div>
              <p className='text-md sm:text-xl font-semibold'>Total Sales</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-black'>
                {loadingOrders ? (
                  <span className='text-sm tracking-widest font-semibold flex items-end justify-center py-2'>
                    Loading...
                  </span>
                ) : (
                  orders.length
                )}
              </p>
            </div>
            <div><GrDeliver className='text-[40px] md:text-[65px] opacity-80 text-orange-700' /></div>
          </div>

          <div className='border-2 border-yellow-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500 bg-white'>
            <div>
              <p className='text-md sm:text-xl font-semibold'>Total Earning</p>
              <p className='text-xl sm:text-2xl font-semibold text-center'>
                {loadingEarnings ? (
                  <span className='text-sm tracking-widest font-semibold flex items-end justify-center py-2'>
                    Loading...
                  </span>
                ) : (
                  totalEarnings.toFixed(2)
                )}
              </p>
            </div>
            <div><TbPigMoney className='text-[40px] md:text-[65px] opacity-80 text-yellow-500' /></div>
          </div>

          <div className='border-2 border-cyan-500 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500 bg-white'>
            <div>
              <p className='text-md sm:text-xl font-semibold'>Total Commission</p>
              <p className='text-xl sm:text-2xl font-semibold text-center'>
                {loadingCommissions ? (
                  <span className='text-sm tracking-widest font-semibold flex items-end justify-center py-2'>
                    Loading...
                  </span>
                ) : (
                  totalCommissions.toFixed(2)
                )}
              </p>
            </div>
            <div><PiHandbagBold className='text-[40px] md:text-[65px] opacity-80 text-cyan-700' /></div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Overview;
