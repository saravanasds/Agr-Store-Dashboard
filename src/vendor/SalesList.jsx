import React, { useState } from 'react';
import { VscAccount } from "react-icons/vsc";

const SalesList = () => {
  const [filterCategory, setFilterCategory] = useState('');
  const [filterName, setFilterName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const sales = [
    {
      name: "Rajabogam",
      category: "Rice",
      price: "50",
      unit: "1kg",
    },
    {
      name: "Tomato",
      category: "Vegetables",
      price: "30",
      unit: "1kg",
    },
    // Add more sales data here...
  ];

  // Filtered sales data based on filterCategory and filterName
  const filteredSales = sales.filter(sale =>
    sale.category.toLowerCase().includes(filterCategory.toLowerCase()) &&
    sale.name.toLowerCase().includes(filterName.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

  // Get current page data
  const currentSales = filteredSales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='w-full min-h-screen bg-slate-300'>
      <div className='w-full h-16 bg-gray-800 flex justify-between items-center py-3 px-10'>
        <div><span className='sm:text-2xl font-semibold uppercase text-white tracking-widest'>Sales List</span></div>
        <div className='rounded-full flex justify-center items-center'>
          <VscAccount className='text-white w-8 h-8' />
        </div>
      </div>

      <div className='w-full flex flex-col justify-center items-center p-4 md:p-10'>
        <div className='w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center mb-6 gap-6'>
          <div>
            <span className='text-xl font-semibold tracking-wider'>Total Sales: {filteredSales.length}</span>
          </div>
          <div className='w-full lg:w-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center md:gap-6 gap-2'>
            <input
              type='text'
              placeholder='Filter by Category'
              className='p-2 border border-gray-400 rounded w-full lg:w-auto'
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            />
            <input
              type='text'
              placeholder='Filter by Product Name'
              className='p-2 border border-gray-400 rounded w-full lg:w-auto'
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-auto w-full border-[1px] border-black">
          <table className="min-w-full">
            <thead className="bg-cyan-700">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Sl.no</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Quandity</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Price</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentSales.map((sale, index) => (
                <tr key={index} className='border-b-2'>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{sale.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{sale.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{sale.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">&#x20B9; {sale.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className='flex justify-center items-center mt-4'>
          <button
            onClick={() => handlePageChange('prev')}
            className={`px-4 py-1 mx-1 rounded text-sm ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-700 text-white'}`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className='px-4 py-1'>{currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange('next')}
            className={`px-4 py-1 mx-1 rounded text-sm ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-700 text-white'}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default SalesList;
