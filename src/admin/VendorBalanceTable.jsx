import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";
import ClipLoader from 'react-spinners/ClipLoader';

const VendorBalanceTable = () => {
    const [vendors, setVendors] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [transactionId, setTransactionId] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vendor/all');
                setVendors(response.data);
            } catch (err) {
                setError('Error fetching vendors');
            }
            finally {
                setLoading(false);
            }
        };

        fetchVendors();
    }, []);


    const handleOpen = (vendor) => {
        setSelectedVendor(vendor);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTransactionId("");
    };

    const handleSubmit = async () => {
        if (selectedVendor.vendorBalance <= 0) {
            alert('The vendor balance must be greater than 0 to proceed.');
            return;
        }

        setLoading(true);

        try {
            // Send payment details to the backend
            const response = await axios.post('http://localhost:5000/api/admin/payVendor', {
                vendorEmail: selectedVendor.vendorEmail,
                shopName: selectedVendor.shopName,
                paymentAmount: selectedVendor.vendorBalance,
                transactionId
            });
            console.log('Payment successful:', response.data);
            alert("Payment Status Updated Successfully");
            handleClose();
        } catch (error) {
            console.error('Error making payment:', error);
            alert('Error processing payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='w-full min-h-screen'>
            <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
                <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Vendor Balances</span></div>
                <div className=' rounded-full flex justify-center items-center'>
                    <VscAccount className='text-gray-400 w-8 h-8' />
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

                    (
                        <div className='overflow-x-auto px-4'>
                            <table className="min-w-[95%] bg-[rgba(0,0,0,0.4)] mt-10 mx-auto whitespace-nowrap text-sm sm:text-[16px] ">
                                <thead className='bg-cyan-700 text-white'>
                                    <tr>
                                        <th className="p-2 font-semibold tracking-wider">Sl.no</th>
                                        <th className="p-2 font-semibold tracking-wider">ShopName</th>
                                        <th className="p-2 font-semibold tracking-wider">Total Balance (&#x20B9;)</th>
                                        <th className="p-2 font-semibold tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendors.map((vendor, index) => (
                                        <tr key={vendor.shopName} className="border-b border-gray-600">
                                            <td className="p-2 text-center text-white">{index + 1}</td>
                                            <td className="p-2 text-center text-white">{vendor.shopName}</td>
                                            <td className="p-2 text-center text-white">&#x20B9; {vendor.vendorBalance.toFixed(2)}</td>
                                            <td className="p-2 text-center text-white">
                                                <button
                                                    onClick={() => handleOpen(vendor)}
                                                    className='bg-blue-600 px-8 py-1 text-xs sm:text-sm font-semibold rounded-sm hover:bg-blue-800'
                                                >
                                                    Pay
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
            }

            {open && (
                <div className='fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.2)] backdrop-blur-[2px]'>
                    <form onSubmit={handleSubmit} className='bg-white p-5 rounded shadow-lg w-[90%] max-w-md'>
                        <h2 className='text-xl font-semibold mb-4'>Pay {selectedVendor.shopName}</h2>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium mb-2'>Payment Amount (&#x20B9;)</label>
                            <p>{selectedVendor.vendorBalance}</p>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium mb-2'>Transaction ID</label>
                            <input
                                type='text'
                                className='w-full p-2 border rounded'
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                required
                            />
                        </div>
                        <div className='flex flex-col justify-end gap-2'>
                            <div className='flex justify-end gap-4'>
                                <button
                                    onClick={handleClose}
                                    className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className={`bg-blue-600 text-white px-4 py-2 rounded ${selectedVendor.vendorBalance <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-800'}`}
                                    disabled={selectedVendor.vendorBalance <= 0}
                                >
                                    {loading ? <ClipLoader color="#ffffff" size={20} /> : 'Submit'}
                                </button>
                            </div>
                            {selectedVendor.vendorBalance <= 0 && (
                                <p className='text-red-500 text-sm mt-2'>Payment cannot be processed. The vendor's balance is 0.</p>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default VendorBalanceTable;
