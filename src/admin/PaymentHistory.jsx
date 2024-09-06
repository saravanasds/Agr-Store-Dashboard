import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";
import { format } from 'date-fns';

const PaymentHistory = () => {
  const [payHistories, setPayHistories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayHistories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/getAllPayHistories');
        setPayHistories(response.data);
      } catch (err) {
        setError('Error fetching vendors');
      }
      finally {
        setLoading(false);
      }
    };

    fetchPayHistories();
  }, []);

  return (
    <div className='w-full min-h-[100vh]'>
      <div className='w-full h-16 bg-gray-800 flex justify-between items-center py-3 px-10 border-b border-cyan-400'>
        <div><span className='sm:text-2xl font-semibold uppercase text-white tracking-widest'>Payment History</span></div>
        <div className=' rounded-full flex justify-center items-center'>
          <VscAccount className='text-white w-8 h-8' />
        </div>
      </div>

      {
        loading ?
          (
            <span className='w-full min-h-[80vh] text-2xl text-white tracking-widest font-semibold flex items-center justify-center py-2'>
              Loading
              <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce1 mt-6'></span>
              <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce2 mt-6'></span>
              <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce3 mt-6'></span>
            </span>
          ) :

          (<div className="w-[95%] sm:w-[90%] mx-auto mt-8">
            <div className="overflow-auto border border-gray-300 rounded">
              <table className="min-w-full">
                <thead className="bg-cyan-700">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Sl.no</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Transaction Id</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Shop Name</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payHistories.map((history, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-center">{index + 1}</td>
                      <td className={"px-6 py-4 whitespace-nowrap text-center"}>
                        {format(new Date(history.createdAt), 'dd/MM/yy')}
                      </td>
                      <td className={"px-6 py-4 whitespace-nowrap text-center"}>
                        {history.transactionId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">{history.shopName}</td>
                      <td className={"px-6 py-4 whitespace-nowrap text-center"}>
                        {history.paymentAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">Successful</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>)
      }
    </div>
  )
}

export default PaymentHistory;
