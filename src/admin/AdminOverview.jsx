import React from 'react';
import { VscAccount } from "react-icons/vsc";
import { TbPigMoney } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";



const AdminOverview = () => {
  return (
    <div className='w-full min-h-[100vh]'>

      <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
        <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Admin Panel</span></div>
        <div className=' rounded-full flex justify-center items-center'>
          <VscAccount className='text-gray-400 w-8 h-8' />
        </div>
      </div>

      <div className='w-full flex flex-col justify-center items-start'>

        <div className='w-full gap-4 grid grid-cols-1 md:grid-cols-2 px-3 lg:px-14 py-6 min-h-[300px] md:py-12'>

          <div className='rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.1)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider' style={{ textShadow: "2px 2px 0px black" }}>Total Members</p>
              <p className='text-md sm:text-md font-semibold text-center text-gray-500'></p>
            </div>
            <div><FaPeopleGroup className='text-[30px] md:text-[65px] opacity-80 text-cyan-500' /></div>
          </div>
          <div className=' rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.1)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider' style={{ textShadow: "2px 2px 0px black" }}>Total Vendors</p>
              <p className='text-xl sm:text-2xl font-semibold text-center'></p>
            </div>
            <div><BsShop className='text-[40px] md:text-[65px] opacity-80 text-lime-500' /></div>
          </div>
          <div className=' rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.1)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider' style={{ textShadow: "2px 2px 0px black" }}>Total Received Amount</p>
              <p className='text-xl sm:text-2xl font-semibold text-center'></p>
            </div>
            <div><TbPigMoney className='text-[40px] md:text-[65px] opacity-80 text-orange-400' /></div>
          </div>
          <div className=' rounded-lg py-5 flex justify-around items-center px-4 bg-[rgba(0,0,0,0.1)] shadow-sm shadow-black border border-cyan-400'>
            <div>
              <p className='text-md sm:text-2xl font-semibold text-white tracking-wider' style={{ textShadow: "2px 2px 0px black" }}>Total Commision</p>
              <p className='text-xl sm:text-2xl font-semibold text-center'></p>
            </div>
            <div><GiTakeMyMoney className='text-[40px] md:text-[65px] opacity-80 text-blue-500' /></div>
          </div>
        </div>

      </div>
    </div>

  )
}

export default AdminOverview