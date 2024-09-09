import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";
import { format } from 'date-fns';

const PaymentHistory = () => {
  const [payHistories, setPayHistories] = useState([]);
  const [vendorEmail, setVendorEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const vendorEmail = localStorage.getItem("vendorEmail");
    setVendorEmail(vendorEmail);
  }, []);

  console.log(vendorEmail);
  useEffect(() => {
    if (vendorEmail) {
      const fetchPayHistories = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/admin/getPayHistoriesByVendorEmail/${vendorEmail}`);
          setPayHistories(response.data);
        } catch (err) {
          setError('Error fetching vendors');
        }
      };
      fetchPayHistories();
    }
  }, [vendorEmail]);


  return (
    <div className='w-full min-h-[100vh] bg-slate-300'>
      <div className='w-full h-16 bg-gray-800 flex justify-between items-center py-3 px-10 border-b border-cyan-400'>
        <div><span className='sm:text-2xl font-semibold uppercase text-white tracking-widest'>Payment History</span></div>
        <div className=' rounded-full flex justify-center items-center'>
          <VscAccount className='text-white w-8 h-8' />
        </div>
      </div>

      {
        payHistories.length === 0 ?

          (<div className='w-full min-h-[90vh] flex justify-center items-center'>
            <h1 className='text-2xl text-black font-semibold tracking-wider'>No Records Found</h1>
          </div>)
          :

          <div className="w-[90%] sm:w-[80%] mx-auto mt-8">
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
          </div>
      }
    </div>
  )
}

export default PaymentHistory;
