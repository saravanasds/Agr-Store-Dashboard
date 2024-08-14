import React from 'react'
import { VscAccount } from "react-icons/vsc";

const Wallet = () => {
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
      <div>
        <div className="flex flex-col justify-around items-center mt-16 gap-4">
          <div className="border-2 border-gray-400 w-[95%] md:w-[70%] p-2 md:p-5 bg-white rounded-md">
            <h1 className="text-xl font-semibold mb-1">Current Balance</h1>
            <div className="my-3">
              <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                <div className="w-1/2"><h1 className="text-md sm:text-lg">Level Income</h1></div>
                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl"><p>&#x20B9; </p></div>
              </div>
              <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                <div className="w-1/2"><h1 className="text-md sm:text-lg">Referral Income</h1></div>
                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl"><p>&#x20B9; </p></div>
              </div>
              <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                <div className="w-1/2"><h1 className="text-md sm:text-lg">Total Balance</h1></div>
                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md"><p>&#x20B9; </p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Wallet