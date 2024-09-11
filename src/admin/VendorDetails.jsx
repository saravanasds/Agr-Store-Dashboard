import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";
import VendorModel from './VendorModel.jsx';

const MemberDetails = () => {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingVendor, setUpdatingVendor] = useState(false); // To manage button loading state

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vendor/all');
        setVendors(response.data);
      } catch (err) {
        setError('Error fetching vendors');
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const handleRowClick = (vendor) => {
    setSelectedVendor(vendor);
  };

  const handleCloseModal = () => {
    setSelectedVendor(null);
  };

  const toggleVendorStatus = async (vendorId, currentStatus) => {
    setUpdatingVendor(true);
    try {
      const newStatus = currentStatus === 'enabled' ? 'disabled' : 'enabled';
      await axios.put(`http://localhost:5000/api/vendor/${vendorId}/status`, { status: newStatus });
      setVendors((prevVendors) =>
        prevVendors.map((vendor) =>
          vendor._id === vendorId ? { ...vendor, status: newStatus } : vendor
        )
      );
    } catch (err) {
      setError('Error updating vendor status');
    } finally {
      setUpdatingVendor(false);
    }
  };

  return (
    <div className="w-full min-h-[100vh]">
      <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
        <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Vendor Details</span></div>
        <div className=' rounded-full flex justify-center items-center'>
          <VscAccount className='text-gray-400 w-8 h-8' />
        </div>
      </div>

      {loading ? (
        <span className='w-full min-h-[80vh] text-2xl text-white tracking-widest font-semibold flex items-center justify-center py-2'>
          Loading
          <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce1 mt-6'></span>
          <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce2 mt-6'></span>
          <span className='dot-animate inline-block w-1 h-1 mx-1 bg-white rounded-full animate-bounce3 mt-6'></span>
        </span>
      ) : (
        <div className="overflow-x-scroll rounded py-10 px-4 sm:px-10">
          <table className="w-full bg-[rgba(0,0,0,0.4)] border border-gray-400 rounded whitespace-nowrap text-sm sm:text-[16px]">
            <thead className='bg-cyan-700 text-white'>
              <tr>
                <th className="px-4 py-2 border-b border-gray-400 font-normal">Sl.no</th>
                <th className="px-4 py-2 border-b border-gray-400 font-normal">Name</th>
                <th className="px-4 py-2 border-b border-gray-400 font-normal">Shop Name</th>
                <th className="px-4 py-2 border-b border-gray-400 font-normal">Department</th>
                <th className="px-4 py-2 border-b border-gray-400 font-normal">Status</th>
                <th className="px-4 py-2 border-b border-gray-400 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={index} className="cursor-pointer text-center text-white">
                  <td className="px-4 py-2 border-b border-gray-400">{index + 1}</td>
                  <td className="px-4 py-2 border-b border-gray-400">{vendor.vendorName}</td>
                  <td className="px-4 py-2 border-b border-gray-400">{vendor.shopName}</td>
                  <td className="px-4 py-2 border-b border-gray-400">{vendor.department}</td>
                  <td className="px-4 py-2 border-b border-gray-400">{vendor.status}</td>
                  <td className="px-4 py-2 border-b border-gray-400">
                    <button className="px-8 py-1 bg-cyan-600 text-white rounded text-xs mr-3" onClick={(e) => { e.stopPropagation(); handleRowClick(vendor); }}>
                      View
                    </button>
                    <button
                      className={`px-8 py-1 rounded text-xs ${vendor.status === 'enabled' ? 'bg-red-500' : 'bg-green-500'} text-white`}
                      onClick={(e) => { e.stopPropagation(); toggleVendorStatus(vendor._id, vendor.status); }}
                      disabled={updatingVendor}
                    >
                      {updatingVendor ? 'Updating...' : vendor.status === 'enabled' ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedVendor && <VendorModel vendor={selectedVendor} onClose={handleCloseModal} />}
    </div>
  );
};

export default MemberDetails;
