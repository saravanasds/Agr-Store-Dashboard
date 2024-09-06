import React, { useEffect, useState } from 'react';
import { VscAccount } from "react-icons/vsc";
import { TbPigMoney } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { AiFillDatabase } from "react-icons/ai";
import axios from 'axios';

const AdminOverview = () => {
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [userShare, setUserShare] = useState(0);
  const [usedUserShare, setUsedUserShare] = useState(0);

  // Loading states
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingVendors, setLoadingVendors] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingSoldProducts, setLoadingSoldProducts] = useState(true);
  const [loadingCommissions, setLoadingCommissions] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/all');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vendor/all');
        setVendors(response.data);
      } catch (err) {
        console.error('Error fetching vendors:', err);
      } finally {
        setLoadingVendors(false);
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vendor/getAllProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchSoldProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/order/getAllSoldProducts');
        const products = response.data.soldProducts;
        setSoldProducts(products);
        const totalSaleAmount = products.reduce((acc, product) => acc + product.total, 0);
        setTotalSaleAmount(totalSaleAmount);
      } catch (error) {
        console.error('Error fetching sold products:', error);
      } finally {
        setLoadingSoldProducts(false);
      }
    };

    fetchSoldProducts();
  }, []);

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/getVendorCommissions');
        const totalComm = response.data.totalCommission;
        const userComm = totalComm * 0.2; // 20% of total commission
        const totalBal = totalComm - userComm;
        setTotalCommission(totalComm);
        setUserShare(userComm);
        setTotalBalance(totalBal);
      } catch (err) {
        console.error('Error fetching commissions:', err);
      } finally {
        setLoadingCommissions(false);
      }
    };

    fetchCommissions();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/order/getAllOrders');
        const orders = response.data.orders;
        const totalUsedUserShare = orders.reduce((acc, order) => acc + order.discount, 0);
        setUsedUserShare(totalUsedUserShare);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='w-full min-h-[100vh]'>
      <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
        <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Admin Panel</span></div>
        <div className='rounded-full flex justify-center items-center'>
          <VscAccount className='text-gray-400 w-8 h-8' />
        </div>
      </div>

      <div className='w-full flex flex-col justify-center items-start'>
        <div className='w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-3 lg:px-14 py-6 min-h-[300px] md:py-12'>

          {/* Total Members */}
          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider'>Total Members</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>
                {loadingUsers ? (
                  <span className='text-sm tracking-widest font-normal flex items-end justify-center py-2'>
                    Loading
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce1'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce2'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce3'></span>
                  </span>
                ) : (
                  users.length
                )}
              </p>
            </div>

            <div><FaPeopleGroup className='text-[30px] md:text-[65px] opacity-80 text-cyan-500' /></div>
          </div>

          {/* Total Vendors */}
          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider'>Total Vendors</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>
                {loadingVendors ? (
                  <span className='text-sm tracking-widest font-normal flex items-end justify-center py-2'>
                    Loading
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce1'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce2'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce3'></span>
                  </span>
                ) : (
                  vendors.length
                )}
              </p>
            </div>
            <div><BsShop className='text-[40px] md:text-[65px] opacity-80 text-lime-500' /></div>
          </div>

          {/* Total Products */}
          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider'>Total Products</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>
                {loadingProducts ? (
                  <span className='text-sm tracking-widest font-normal flex items-end justify-center py-2'>
                    Loading
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce1'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce2'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce3'></span>
                  </span>
                ) : (
                  products.length
                )}
              </p>
            </div>
            <div><AiFillDatabase className='text-[40px] md:text-[65px] opacity-80 text-pink-500' /></div>
          </div>

          {/* Total Sales */}
          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider'>Total Sales</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>
                {loadingSoldProducts ? (
                  <span className='text-sm tracking-widest font-normal flex items-end justify-center py-2'>
                    Loading
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce1'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce2'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce3'></span>
                  </span>
                ) : (
                  soldProducts.length
                )}
              </p>
            </div>
            <div><TbPigMoney className='text-[40px] md:text-[65px] opacity-80 text-orange-400' /></div>
          </div>

          {/* Total Sale Amount */}
          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider'>Total Sale Amount</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>
                {loadingSoldProducts ? (
                  <span className='text-sm tracking-widest font-normal flex items-end justify-center py-2'>
                    Loading
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce1'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce2'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce3'></span>
                  </span>
                ) : (
                  `₹ ${totalSaleAmount.toFixed(2)}`
                )}
              </p>
            </div>
            <div><GiTakeMyMoney className='text-[40px] md:text-[65px] opacity-80 text-yellow-400' /></div>
          </div>

          {/* Total Commission */}
          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider'>Total Commission</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>
                {loadingCommissions ? (
                  <span className='text-sm tracking-widest font-normal flex items-end justify-center py-2'>
                    Loading
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce1'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce2'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce3'></span>
                  </span>
                ) : (
                  `₹ ${totalCommission.toFixed(2)}`
                )}
              </p>
            </div>
            <div><AiFillDatabase className='text-[40px] md:text-[65px] opacity-80 text-blue-500' /></div>
          </div>

          {/* Admin Share */}
          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider'>Admin Share (80%)</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>
                {loadingCommissions ? (
                  <span className='text-sm tracking-widest font-normal flex items-end justify-center py-2'>
                    Loading
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce1'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce2'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce3'></span>
                  </span>
                ) : (
                  `₹ ${totalBalance.toFixed(2)}`
                )}
              </p>
            </div>
            <div><GiTakeMyMoney className='text-[40px] md:text-[65px] opacity-80 text-green-400' /></div>
          </div>

          {/* User Share */}
          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider'>User Share (20%)</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>
                {loadingCommissions ? (
                  <span className='text-sm tracking-widest font-normal flex items-end justify-center py-2'>
                    Loading
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce1'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce2'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce3'></span>
                  </span>
                ) : (
                  `₹ ${userShare.toFixed(2)}`
                )}
              </p>
            </div>
            <div><TbPigMoney className='text-[40px] md:text-[65px] opacity-80 text-orange-400' /></div>
          </div>

          {/* Used User Share */}
          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider'>Used User Share</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>
                {loadingOrders ? (
                  <span className='text-sm tracking-widest font-normal flex items-end justify-center py-2'>
                    Loading
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce1'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce2'></span>
                    <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce3'></span>
                  </span>
                ) : (
                  `₹ ${usedUserShare.toFixed(2)}`
                )}
              </p>
            </div>
            <div><FaPeopleGroup className='text-[40px] md:text-[65px] opacity-80 text-pink-400' /></div>
          </div>



        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
