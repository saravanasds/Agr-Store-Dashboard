import React from 'react'
import { VscAccount } from "react-icons/vsc";

const PaymentHistory = () => {
  return (
    <div className='w-full min-h-[100vh]'>

      <div className='w-full h-16 bg-gray-800 flex justify-between items-center py-3 px-10 border-b border-cyan-400'>
        <div><span className='sm:text-2xl font-semibold uppercase text-white tracking-widest'>Payment History</span></div>
        <div className=' rounded-full flex justify-center items-center'>
          <VscAccount className='text-white w-8 h-8' />
        </div>
      </div>

      <div className="w-[90%] sm:w-[80%] mx-auto mt-8">
        <div className="overflow-auto border border-gray-300 rounded">
          <table className="min-w-full">
            <thead className="bg-cyan-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sl.no</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Transaction Id</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Level Income</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Referral Income</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Bonus</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* {withdrawHistory.map((history, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className={`px-6 py-4 whitespace-nowrap ${history.paymentStatus === 'rejected' ? 'text-red-500' : 'text-green-500'}`}>
                    {history.date ? history.date : "null"}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${history.paymentStatus === 'rejected' ? 'text-red-500' : 'text-green-500'}`}>
                    {history.transactionNo ? history.transactionNo : "null"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{history.withdrawLevelIncome ? history.withdrawLevelIncome : "0"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{history.withdrawRefferalIncome ? history.withdrawRefferalIncome : "0"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{history.bonusValue ? history.bonusValue : "0"}</td>
                  <td className={`px-6 py-4 whitespace-nowrap ${history.paymentStatus === 'rejected' ? 'text-red-500' : 'text-green-500'}`}>
                    {history.paymentStatus ? history.paymentStatus : "Success"}
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default PaymentHistory