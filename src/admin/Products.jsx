import React, { useState, useEffect } from 'react';
import { VscAccount } from "react-icons/vsc";
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [productCodeFilter, setProductCodeFilter] = useState('');
    const [productNameFilter, setProductNameFilter] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [shopNameFilter, setShopNameFilter] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vendor/getAllProducts');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredProducts.length / productsPerPage)));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    // Filter products based on the filters
    const filteredProducts = products.filter(product =>
        (product.productCode?.toLowerCase().includes(productCodeFilter.toLowerCase()) || !productCodeFilter) &&
        (product.productName?.toLowerCase().includes(productNameFilter.toLowerCase()) || !productNameFilter) &&
        (product.department?.toLowerCase().includes(departmentFilter.toLowerCase()) || !departmentFilter) &&
        (product.category?.toLowerCase().includes(categoryFilter.toLowerCase()) || !categoryFilter) &&
        (product.shopName?.toLowerCase().includes(shopNameFilter.toLowerCase()) || !shopNameFilter)
    );


    // Calculate the products to display for the current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    return (
        <div className='w-full min-h-screen'>
            <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
                <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Products</span></div>
                <div className='rounded-full flex justify-center items-center'>
                    <VscAccount className='text-gray-400 w-8 h-8' />
                </div>
            </div>

            <div className='w-full flex flex-col justify-center items-center p-4 md:p-10'>

                <div className='py-4'>
                    <span className='text-xl font-semibold tracking-wider text-white '>Total products: {filteredProducts.length}</span>
                </div>

                <div className='w-full flex flex-col lg:flex-row justify-center items-center mb-6 gap-6'>

                    {/* Filter Inputs */}
                    <div className='flex flex-col md:flex-row lg:justify-end justify-center items-center gap-4'>
                        <input
                            type='text'
                            placeholder='Filter by product code'
                            value={productCodeFilter}
                            onChange={(e) => setProductCodeFilter(e.target.value)}
                            className='p-2 border border-gray-300 rounded'
                        />
                        <input
                            type='text'
                            placeholder='Filter by product name'
                            value={productNameFilter}
                            onChange={(e) => setProductNameFilter(e.target.value)}
                            className='p-2 border border-gray-300 rounded'
                        />
                        <input
                            type='text'
                            placeholder='Filter by department'
                            value={departmentFilter}
                            onChange={(e) => setDepartmentFilter(e.target.value)}
                            className='p-2 border border-gray-300 rounded'
                        />
                        <input
                            type='text'
                            placeholder='Filter by category'
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className='p-2 border border-gray-300 rounded'
                        />
                        <input
                            type='text'
                            placeholder='Filter by shop name'
                            value={shopNameFilter}
                            onChange={(e) => setShopNameFilter(e.target.value)}
                            className='p-2 border border-gray-300 rounded'
                        />
                    </div>
                </div>

                <div className="overflow-auto w-full border-[1px] border-black">
                    <table className="min-w-full">
                        <thead className="bg-cyan-700">
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Sl.no</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">ShopName</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Product Code</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Unit</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Price</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentProducts.map((product, index) => (
                                <tr key={index} className='border-b-2'>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{startIndex + index + 1}</td>
                                    <td className="px-6 py-4 flex justify-center items-center">
                                        <img src={product.productImage || ''} alt={product.productName || 'Product Image'} className='h-16 object-cover' />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.productCode || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.shopName || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.productName || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.description || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.category || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.unit || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">&#x20B9; {product.price || 'N/A'}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className='w-full flex justify-center items-center py-2'>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className='px-4 py-1 mx-1 bg-gray-500 text-white rounded disabled:opacity-50'
                    >
                        Previous
                    </button>
                    <span className='mx-2 bg-cyan-600 p-1 px-3 text-white'>{currentPage}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
                        className='px-4 py-1 mx-1 bg-gray-500 text-white rounded disabled:opacity-50'
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Products