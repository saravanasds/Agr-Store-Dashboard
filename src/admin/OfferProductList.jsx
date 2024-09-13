import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscAccount } from 'react-icons/vsc';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

const OfferProductList = () => {
    const [offerProducts, setOfferProducts] = useState([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const [productNameFilter, setProductNameFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [productCodeFilter, setProductCodeFilter] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    useEffect(() => {

        const fetchVendorProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/getAllOfferProducts');
                setOfferProducts(response.data || []);
            } catch (err) {
                setError('Error fetching products');
            }
            finally {
                setLoading(false);
            }
        };

        fetchVendorProducts();
    }, []);

    const openEditPopup = (product) => {
        setSelectedProduct(product);
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
        setSelectedProduct(null);
    };

    const openDeletePopup = (product) => {
        setSelectedProduct(product);
        setIsDeletePopupOpen(true);
    };

    const closeDeletePopup = () => {
        setIsDeletePopupOpen(false);
        setSelectedProduct(null);
    };


    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredProducts.length / productsPerPage)));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            // Create a FormData object to send the product data along with the image
            const formData = new FormData();
            formData.append('productName', selectedProduct.productName);
            formData.append('category', selectedProduct.category);
            formData.append('description', selectedProduct.description);
            formData.append('unit', selectedProduct.unit);
            formData.append('price', selectedProduct.price);
            formData.append('actualPrice', selectedProduct.actualPrice);

            // Check if a new product image is selected
            if (selectedProduct.productImage) {
                formData.append('productImage', selectedProduct.productImage);
            }

            const response = await axios.put(
                `http://localhost:5000/api/admin/editOfferProduct/${selectedProduct._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Update the product list with the edited product
            const updatedProducts = offerProducts.map((product) =>
                product._id === selectedProduct._id ? response.data.product : product
            );

            setOfferProducts(updatedProducts);
            closeEditPopup();
        } catch (error) {
            setError('Error updating product');
            console.error(error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            // Send a DELETE request to the backend API
            await axios.delete(`http://localhost:5000/api/admin/deleteOfferProduct/${selectedProduct._id}`);

            alert('Product deleted successfully!');
            closeDeletePopup();

            // Update the product list by filtering out the deleted product
            const updatedProducts = offerProducts.filter((product) => product._id !== selectedProduct._id);
            setOfferProducts(updatedProducts);
        } catch (error) {
            setError('Error deleting product');
            console.error("Error deleting product:", error);
        }
    };

    // Filter products based on the filters
    const filteredProducts = offerProducts.filter(product =>
        (product.productName?.toLowerCase().includes(productNameFilter.toLowerCase()) || !productNameFilter) &&
        (product.category?.toLowerCase().includes(categoryFilter.toLowerCase()) || !categoryFilter) &&
        (product.productCode?.toLowerCase().includes(productCodeFilter.toLowerCase()) || !productCodeFilter)
    );

    // Calculate the products to display for the current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    return (
        <div className='w-full min-h-screen py-10' >

            <div className='w-full h-16 py-3 flex justify-center items-center'>
                <span
                    className='sm:text-2xl lg:text-3xl text-center font-semibold uppercase text-white tracking-widest underline underline-offset-8'
                    style={{ textShadow: "2px 2px 0px black" }}
                >Offer Product List</span>
            </div>

            {
                loading ?
                    (
                        <span className='w-full min-h-[80vh] text-2xl text-black tracking-widest font-semibold flex items-center justify-center py-2'>
                            Loading
                            <span className='dot-animate inline-block w-1 h-1 mx-1 bg-black rounded-full animate-bounce1 mt-6'></span>
                            <span className='dot-animate inline-block w-1 h-1 mx-1 bg-black rounded-full animate-bounce2 mt-6'></span>
                            <span className='dot-animate inline-block w-1 h-1 mx-1 bg-black rounded-full animate-bounce3 mt-6'></span>
                        </span>
                    ) :

                    (<div className='w-full flex flex-col justify-center items-center p-4 md:p-10'>

                        <div className='w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center mb-6 gap-6'>
                            <div>
                                <span className='text-xl font-semibold tracking-wider'>Total products: {filteredProducts.length}</span>
                            </div>
                            {/* Filter Inputs */}
                            <div className='flex flex-col md:flex-row lg:justify-end justify-center items-center gap-4'>
                                <input
                                    type='text'
                                    placeholder='Filter by product code'
                                    value={productCodeFilter}
                                    onChange={(e) => setProductCodeFilter(e.target.value)}
                                    className='p-2 border border-gray-300 rounded text-sm sm:text-[16px]'
                                />
                                <input
                                    type='text'
                                    placeholder='Filter by product name'
                                    value={productNameFilter}
                                    onChange={(e) => setProductNameFilter(e.target.value)}
                                    className='p-2 border border-gray-300 rounded text-sm sm:text-[16px]'
                                />
                                <input
                                    type='text'
                                    placeholder='Filter by category'
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className='p-2 border border-gray-300 rounded text-sm sm:text-[16px]'
                                />
                            </div>
                        </div>

                        <div className="overflow-auto w-full border-[1px] border-black">
                            <table className="min-w-full whitespace-nowrap">
                                <thead className="bg-cyan-700">
                                    <tr>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Sl.no</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Image</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Product Code</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Unit</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Actual Price</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentProducts.map((product, index) => (
                                        <tr key={index} className='border-b-2'>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{startIndex + index + 1}</td>
                                            <td className="px-6 py-4 flex justify-center items-center">
                                                <img src={product.productImage || ''} alt={product.productName || 'Product Image'} className='h-8 sm:h-16 object-cover' />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.productCode || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.productName || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.description || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.unit || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">&#x20B9; {product.actualPrice || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">&#x20B9; {product.price || 'N/A'}</td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                                <button
                                                    className='p-1 text-xs sm:text-sm rounded-md shadow-md shadow-gray-600 text-blue-600 mr-2'
                                                    onClick={() => openEditPopup(product)}
                                                >
                                                    <FaEdit className='w-4 h-4 sm:w-6 sm:h-6' />
                                                </button>
                                                <button
                                                    className='p-1 text-xs sm:text-sm rounded-md shadow-md shadow-gray-600 text-red-600'
                                                    onClick={() => openDeletePopup(product)}
                                                >
                                                    <RiDeleteBin5Line className='w-4 h-4 sm:w-6 sm:h-6' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className='w-full flex justify-center items-center py-4 flex-wrap text-sm'>
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className='px-4 py-1 mx-1 bg-gray-500 text-white rounded disabled:opacity-50'
                            >
                                Previous
                            </button>
                            <span className='mx-2 bg-white rounded-full px-2 font-semibold'>{currentPage}</span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
                                className='px-4 py-1 mx-1 bg-gray-500 text-white rounded disabled:opacity-50'
                            >
                                Next
                            </button>
                        </div>

                    </div>)
            }

            {/* Edit Popup */}
            {isEditPopupOpen && selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md w-60 sm:w-80 xl:w-96 ml-10">
                        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
                        <form onSubmit={handleEditSubmit} className='text-sm'>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">Product Name</label>
                                <p className="p-2 border border-gray-300 rounded w-full">
                                    {selectedProduct.productName}
                                </p>
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    value={selectedProduct.description}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                                    className="p-2 border border-gray-300 rounded w-full text-sm"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">Unit</label>
                                <input
                                    type="text"
                                    value={selectedProduct.unit}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, unit: e.target.value })}
                                    className="p-2 border border-gray-300 rounded w-full text-sm"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">Actual Price</label>
                                <input
                                    type="number"
                                    value={selectedProduct.actualPrice}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, actualPrice: parseFloat(e.target.value) })}
                                    className="p-2 border border-gray-300 rounded w-full text-sm"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">Price</label>
                                <input
                                    type="number"
                                    value={selectedProduct.price}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })}
                                    className="p-2 border border-gray-300 rounded w-full text-sm"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">Product Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, productImage: e.target.files[0] })}
                                    className=" border border-gray-300 rounded w-full text-sm"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={closeEditPopup} className="px-4 py-1 mr-2 bg-gray-500 text-white rounded">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-1 bg-blue-500 text-white rounded">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Popup */}
            {isDeletePopupOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-sm sm:text-lg'>
                    <div className='bg-white p-4 sm:p-8 rounded-md w-60 sm:w-auto ml-10'>
                        <h2 className='text-lg sm:text-xl font-semibold mb-2'>Confirm Delete {selectedProduct.productName}</h2>
                        <p>Are you sure you want to delete this product?</p>
                        <div className='flex justify-end gap-4 mt-4'>
                            <button onClick={closeDeletePopup} className='p-1 px-4 bg-gray-300 rounded'>
                                Cancel
                            </button>
                            <button onClick={handleDeleteProduct} className='p-1 px-4 bg-red-600 text-white rounded'>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default OfferProductList;
