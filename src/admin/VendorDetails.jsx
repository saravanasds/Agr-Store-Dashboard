import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";
import VendorModel from './VendorModel.jsx';

const MemberDetails = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [error, setError] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  // const [filter, setFilter] = useState({
  //   mobileNumber: '',
  //   district: '',
  //   constituency: ''
  // });
  // const [currentPage, setCurrentPage] = useState(1);
  // const vendorsPerPage = 20;

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

  console.log(vendors);

  // useEffect(() => {
  //   const filtered = vendors.filter(vendor =>
  //     vendor.mobileNumber.includes(filter.mobileNumber) &&
  //     vendor.district.toLowerCase().includes(filter.district.toLowerCase()) &&
  //     vendor.constituency.toLowerCase().includes(filter.constituency.toLowerCase())
  //   );
  //   setFilteredVendors(filtered);
  //   setCurrentPage(1); // Reset to the first page when filter changes
  // }, [filter, vendors]);

  const handleRowClick = (vendor) => {
    setSelectedVendor(vendor);
  };

  const handleCloseModal = () => {
    setSelectedVendor(null);
  };

  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilter({ ...filter, [name]: value });
  // };

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // // Get current vendors
  // const indexOfLastVendor = currentPage * vendorsPerPage;
  // const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  // const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);

  // const pageNumbers = [];
  // for (let i = 1; i <= Math.ceil(filteredVendors.length / vendorsPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  return (
    <div className="w-full min-h-[100vh]">

      <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
        <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Vendor Details</span></div>
        <div className=' rounded-full flex justify-center items-center'>
          <VscAccount className='text-gray-400 w-8 h-8' />
        </div>
      </div>

      {/* <div className="mb-4 border border-gray-400 rounded p-4 flex justify-center lg:justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className='text-white text-2xl font-semibold'>Total Member: <span>{vendors.length}</span></h2>
        </div>
        <div className='flex justify-center items-center flex-wrap gap-4'>
          <input
            type="text"
            name="mobileNumber"
            placeholder="Filter by Mobile Number"
            value={filter.mobileNumber}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded mr-2 border-none outline-none w-full sm:w-auto"
          />
          <input
            type="text"
            name="district"
            placeholder="Filter by District"
            value={filter.district}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded mr-2 border-none outline-none w-full sm:w-auto"
          />
          <input
            type="text"
            name="constituency"
            placeholder="Filter by Constituency"
            value={filter.constituency}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded mr-2 border-none outline-none w-full sm:w-auto"
          />
        </div>

      </div> */}

      <div className="overflow-x-auto rounded p-10">
        <table className="min-w-full bg-[rgba(0,0,0,0.4)] border border-gray-400 rounded">
          <thead className='bg-cyan-700 text-white'>
            <tr>
              <th className="px-4 py-2 border-b border-gray-400 font-normal">Sl.no</th>
              {/* <th className="px-4 py-2 border-b font-normal">Vendor Id</th> */}
              <th className="px-4 py-2 border-b border-gray-400 font-normal">Name</th>
              <th className="px-4 py-2 border-b border-gray-400 font-normal">Shop Name</th>
              <th className="px-4 py-2 border-b border-gray-400 font-normal">Department</th>
              <th className="px-4 py-2 border-b border-gray-400 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) => ( // currentVendors
              <tr key={index} className="cursor-pointer text-center text-white" >
                <td className="px-4 py-2 border-b border-gray-400">{index + 1}</td>
                <td className="px-4 py-2 border-b border-gray-400">{vendor.vendorName}</td>
                <td className="px-4 py-2 border-b border-gray-400">{vendor.shopName}</td>
                <td className="px-4 py-2 border-b border-gray-400">{vendor.department}</td>
                <td className="px-4 py-2 border-b border-gray-400">
                  <button className="px-8 py-1 bg-cyan-600 text-white rounded text-xs mr-3" onClick={(e) => { e.stopPropagation(); handleRowClick(vendor); }}>View</button>
                  <button className="px-8 py-1 bg-gray-500 text-white rounded text-xs" >Enable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="flex justify-center mt-4">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-2 mx-1 rounded-full ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            {number}
          </button>
        ))}
      </div> */}
      {selectedVendor && <VendorModel vendor={selectedVendor} onClose={handleCloseModal} />}
    </div>
  );
};

export default MemberDetails;
