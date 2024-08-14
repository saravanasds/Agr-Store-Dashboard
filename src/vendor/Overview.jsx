import React from 'react'
import { VscAccount } from "react-icons/vsc";
import { PiWindowsLogoBold } from "react-icons/pi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { TbPigMoney } from "react-icons/tb";
import { PiHandbagBold } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";

const Overview = () => {
  return (
    <div className='bg-slate-300 w-full min-h-[100vh]'>

      <div className='w-full h-16 bg-gray-800 flex justify-between items-center py-3 px-10'>
        <div><span className='sm:text-2xl font-semibold uppercase text-white tracking-widest'>Furnitures</span></div>
        <div className=' rounded-full flex justify-center items-center'>
          <VscAccount className='text-white w-8 h-8' />
        </div>
      </div>

      <div className='w-full flex flex-col xl:flex-row justify-center items-start'>
        <div className='w-full gap-4 grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 px-3 lg:px-14 py-6 min-h-[300px]'>

          <div className='border-2 border-purple-500 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500 bg-white'>
            <div>
              <p className='text-md sm:text-xl font-semibold'>Catagories</p>
              <p className='text-md sm:text-md font-semibold text-center text-gray-500'></p>
            </div>
            <div><PiWindowsLogoBold className='text-[30px] md:text-[45px] opacity-80 text-purple-700' /></div>
          </div>
          <div className='border-2 border-green-500 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500 bg-white'>
            <div>
              <p className='text-md sm:text-xl font-semibold'>Products</p>
              <p className='text-xl sm:text-2xl font-semibold text-center'></p>
            </div>
            <div><MdOutlineProductionQuantityLimits className='text-[40px] md:text-[65px] opacity-80 text-green-700' /></div>
          </div>
          <div className='border-2 border-orange-500 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500 bg-white'>
            <div>
              <p className='text-md sm:text-xl font-semibold'>Orders</p>
              <p className='text-xl sm:text-2xl font-semibold text-center'></p>
            </div>
            <div><GrDeliver className='text-[40px] md:text-[65px] opacity-80 text-orange-700' /></div>
          </div>
          <div className='border-2 border-yellow-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500 bg-white'>
            <div>
              <p className='text-md sm:text-xl font-semibold'>Total Earning</p>
              <p className='text-xl sm:text-2xl font-semibold text-center'></p>
            </div>
            <div><TbPigMoney className='text-[40px] md:text-[65px] opacity-80 text-yellow-500' /></div>
          </div>
          <div className='border-2 border-cyan-500 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500 bg-white'>
            <div>
              <p className='text-md sm:text-xl font-semibold'>Sales</p>
              <p className='text-xl sm:text-2xl font-semibold text-center'></p>
            </div>
            <div><PiHandbagBold className='text-[40px] md:text-[65px] opacity-80 text-cyan-700' /></div>
          </div>

          <div className='border-2 border-lime-500 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500 bg-white'>
            <div>
              <p className='text-md sm:text-xl font-semibold'>Customers</p>
              <p className='text-xl sm:text-2xl font-semibold text-center'> </p>
            </div>
            <div><FaPeopleGroup className='text-[40px] md:text-[65px] opacity-80 text-lime-600' /></div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Overview