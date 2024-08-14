import React from 'react'
import { VscAccount } from "react-icons/vsc";

const AdminWallet = () => {
  return (
    <>
      <div className='w-full min-h-[100vh]'>
      <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
        <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Wallet</span></div>
        <div className=' rounded-full flex justify-center items-center'>
          <VscAccount className='text-gray-400 w-8 h-8' />
        </div>
      </div>

        <div>
          <div className="flex flex-col justify-around items-center mt-16 gap-4 text-white ">
            <div className=" w-[95%] md:w-[70%] p-2 md:p-10 bg-[rgba(0,0,0,0.4)] rounded-md border border-cyan-400">
              <h1 className="text-xl font-semibold border-b-2 border-cyan-600 p-2  mb-8">Current Balance</h1>
              <div className="my-3">
                <div className="flex justify-center items-center w-full  p-2  border-b-2 border-cyan-600 mb-4">
                  <div className="w-1/2"><h1 className="text-md sm:text-lg">Vendor Commision</h1></div>
                  <div className="w-1/2 h-full bg-gradient-to-r from-cyan-600 to-transparent  px-2 py-1 rounded-md text-xl text-white"><p>&#x20B9; </p></div>
                </div>
                <div className="flex justify-center items-center w-full  p-2  border-b-2 border-cyan-600  mb-4">
                  <div className="w-1/2"><h1 className="text-md sm:text-lg">User Commision</h1></div>
                  <div className="w-1/2 h-full bg-gradient-to-r from-cyan-600 to-transparent  px-2 py-1 rounded-md text-xl text-white"><p>&#x20B9; </p></div>
                </div>
                <div className="flex justify-center items-center w-full  p-2  border-b-2 border-cyan-600  mb-4">
                  <div className="w-1/2"><h1 className="text-md sm:text-lg">Total Balance</h1></div>
                  <div className="w-1/2 h-full bg-gradient-to-r from-cyan-600 to-transparent  px-2 py-1 rounded-md text-xl text-white"><p>&#x20B9; </p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default AdminWallet