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
  const [totalSaleAmount, setTotalSaleAmount] = useState("");
  const [totalCommission, setTotalCommission] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [userShare, setUserShare] = useState(0);
  const [usedUserShare, setUsedUserShare] = useState('');


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/all');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err) {
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vendor/all');
        setVendors(response.data);
        // setFilteredVendors(response.data);
      } catch (err) {
        setError('Error fetching vendors');
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

        // Calculate the total sale amount
        const totalSaleAmount = products.reduce((acc, product) => acc + product.total, 0);
        setTotalSaleAmount(totalSaleAmount);

      } catch (error) {
        console.error('Error fetching orders:', error);
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
      }
    };

    fetchCommissions();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/order/getAllOrders');
        const orders = response.data.orders;
        console.log(orders);

        // Calculate the total sale amount
        const totalUsedUserShare = orders.reduce((acc, order) => acc + order.discount, 0);
        setUsedUserShare(totalUsedUserShare);

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);


  return (
    <div className='w-full min-h-[100vh]'>

      <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
        <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Admin Panel</span></div>
        <div className=' rounded-full flex justify-center items-center'>
          <VscAccount className='text-gray-400 w-8 h-8' />
        </div>
      </div>

      <div className='w-full flex flex-col justify-center items-start'>

        <div className='w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-3 lg:px-14 py-6 min-h-[300px] md:py-12'>

          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider' style={{ textShadow: "2px 2px 0px black" }}>Total Members</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>{users.length}</p>
            </div>
            <div><FaPeopleGroup className='text-[30px] md:text-[65px] opacity-80 text-cyan-500' /></div>
          </div>

          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider' style={{ textShadow: "2px 2px 0px black" }}>Total Vendors</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>{vendors.length}</p>
            </div>
            <div><BsShop className='text-[40px] md:text-[65px] opacity-80 text-lime-500' /></div>
          </div>

          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider' style={{ textShadow: "2px 2px 0px black" }}>Total Products</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>{products.length}</p>
            </div>
            <div><AiFillDatabase className='text-[40px] md:text-[65px] opacity-80 text-pink-500' /></div>
          </div>

          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider' style={{ textShadow: "2px 2px 0px black" }}>Total Sales</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>{soldProducts.length}</p>
            </div>
            <div><TbPigMoney className='text-[40px] md:text-[65px] opacity-80 text-orange-400' /></div>
          </div>

          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider' style={{ textShadow: "2px 2px 0px black" }}>Total Sale Amount</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>{totalSaleAmount || 0}</p>
            </div>
            <div><TbPigMoney className='text-[40px] md:text-[65px] opacity-80 text-orange-400' /></div>
          </div>

          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider' style={{ textShadow: "2px 2px 0px black" }}>Total Commision</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>{totalCommission.toFixed(2)}</p>
            </div>
            <div><GiTakeMyMoney className='text-[40px] md:text-[65px] opacity-80 text-blue-500' /></div>
          </div>

          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider' style={{ textShadow: "2px 2px 0px black" }}>Admin Share (80%)</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>{totalBalance.toFixed(2)}</p>
            </div>
            <div><GiTakeMyMoney className='text-[40px] md:text-[65px] opacity-80 text-blue-500' /></div>
          </div>

          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider' style={{ textShadow: "2px 2px 0px black" }}>User Share (20%)</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>{userShare.toFixed(2)}</p>
            </div>
            <div><GiTakeMyMoney className='text-[40px] md:text-[65px] opacity-80 text-blue-500' /></div>
          </div> 

          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider' style={{ textShadow: "2px 2px 0px black" }}>Used User Share</p>
              <p className='text-xl sm:text-2xl font-semibold text-center text-white'>{usedUserShare}</p>
            </div>
            <div><GiTakeMyMoney className='text-[40px] md:text-[65px] opacity-80 text-blue-500' /></div>
          </div>
        </div>

      </div>
    </div>

  )
}

export default AdminOverview