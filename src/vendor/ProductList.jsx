import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscAccount } from 'react-icons/vsc';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

const ProductList = () => {
  const [vendorProducts, setVendorProducts] = useState([]);
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
    const vendorEmail = localStorage.getItem('vendorEmail');

    const fetchVendorProducts = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/vendor/getVendorProducts', { vendorEmail });
        setVendorProducts(response.data.data || []);
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

      // Check if a new product image is selected
      if (selectedProduct.productImage) {
        formData.append('productImage', selectedProduct.productImage);
      }

      const response = await axios.put(
        `http://localhost:5000/api/vendor/editProduct/${selectedProduct._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Update the product list with the edited product
      const updatedProducts = vendorProducts.map((product) =>
        product._id === selectedProduct._id ? response.data.product : product
      );

      setVendorProducts(updatedProducts);
      closeEditPopup();
    } catch (error) {
      setError('Error updating product');
      console.error(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Send a DELETE request to the backend API
      await axios.delete(`http://localhost:5000/api/vendor/deleteProduct/${selectedProduct._id}`);

      alert('Product deleted successfully!');
      closeDeletePopup();

      // Update the product list by filtering out the deleted product
      const updatedProducts = vendorProducts.filter((product) => product._id !== selectedProduct._id);
      setVendorProducts(updatedProducts);
    } catch (error) {
      setError('Error deleting product');
      console.error("Error deleting product:", error);
    }
  };

  // Filter products based on the filters
  const filteredProducts = vendorProducts.filter(product =>
    (product.productName?.toLowerCase().includes(productNameFilter.toLowerCase()) || !productNameFilter) &&
    (product.category?.toLowerCase().includes(categoryFilter.toLowerCase()) || !categoryFilter) &&
    (product.productCode?.toLowerCase().includes(productCodeFilter.toLowerCase()) || !productCodeFilter)
  );

  // Calculate the products to display for the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className='w-full min-h-screen bg-slate-300'>
      <div className='w-full h-16 bg-gray-800 flex justify-between items-center py-3 px-10'>
        <div>
          <span className='sm:text-2xl font-semibold uppercase text-white tracking-widest'>Product List</span>
        </div>
        <div className='rounded-full flex justify-center items-center'>
          <VscAccount className='text-white w-8 h-8' />
        </div>
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

            <div className='w-full flex flex-col xl:flex-row justify-center xl:justify-between items-center mb-6 gap-6'>
              <div>
                <span className='text-xl font-semibold tracking-wider whitespace-nowrap'>Total products: {filteredProducts.length}</span>
              </div>
              {/* Filter Inputs */}
              <div className='w-full flex flex-col lg:flex-row xl:justify-end justify-center items-center gap-2 sm:gap-4'>
                <input
                  type='text'
                  placeholder='Filter by product code'
                  value={productCodeFilter}
                  onChange={(e) => setProductCodeFilter(e.target.value)}
                  className='w-full lg:w-auto p-2 border border-gray-300 rounded text-sm '
                />
                <input
                  type='text'
                  placeholder='Filter by product name'
                  value={productNameFilter}
                  onChange={(e) => setProductNameFilter(e.target.value)}
                  className='w-full lg:w-auto p-2 border border-gray-300 rounded text-sm '
                />
                <input
                  type='text'
                  placeholder='Filter by category'
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className='w-full lg:w-auto p-2 border border-gray-300 rounded text-sm '
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
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Unit</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProducts.map((product, index) => (
                    <tr key={index} className='border-b-2'>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{startIndex + index + 1}</td>
                      <td className="px-6 py-4 flex justify-center items-center">
                        <img src={product.productImage || ''} alt={product.productName || 'Product Image'} className='h-8 sm:h-12 object-cover' />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.productCode || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.productName || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.description || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.category || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold">{product.unit || 'N/A'}</td>
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
            <div className='w-full flex justify-center items-center py-4 text-sm'>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className='px-4 py-1 mx-1 bg-gray-500 text-white rounded disabled:opacity-50'
              >
                Prev
              </button>
              <span className='mx-2'>{currentPage}</span>
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.2)] backdrop-blur-[1px]">
          <div className="bg-white px-4 md:px-8 py-4 rounded shadow-md w-[80%] lg:w-[60%] ml-10 z-50">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <form className="w-full flex md:flex-row flex-col gap-0 md:gap-10" onSubmit={handleEditSubmit}>
              <div className='w-full md:w-[50%]'>
                <div className="mb-2 md:mb-4">
                  <label className="block text-xs md:text-sm font-medium mb-2">Product Name</label>
                  <input
                    type="text"
                    value={selectedProduct.productName}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, productName: e.target.value })}
                    className="p-2 border border-gray-300 rounded w-full text-xs md:text-sm"
                  />
                </div>
                <div className="mb-2 md:mb-4">
                  <label className="block text-xs md:text-sm font-medium mb-2">Category</label>
                  <input
                    type="text"
                    value={selectedProduct.category}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                    className="p-2 border border-gray-300 rounded w-full text-xs md:text-sm"
                  />
                </div>
                <div className="mb-2 md:mb-4">
                  <label className="block text-xs md:text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={selectedProduct.description}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                    className="p-2 border border-gray-300 rounded w-full text-xs md:text-sm"
                  />
                </div>
              </div>
              <div className='w-full md:w-[50%]'>
                <div className="mb-2 md:mb-4">
                  <label className="block text-xs md:text-sm font-medium mb-2">Unit</label>
                  <input
                    type="text"
                    value={selectedProduct.unit}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, unit: e.target.value })}
                    className="p-2 border border-gray-300 rounded w-full text-xs md:text-sm"
                  />
                </div>
                <div className="mb-2 md:mb-4">
                  <label className="block text-xs md:text-sm font-medium mb-2">Price</label>
                  <input
                    type="number"
                    value={selectedProduct.price}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })}
                    className="p-2 border border-gray-300 rounded w-full text-xs md:text-sm"
                  />
                </div>
                <div className="mb-2 md:mb-4">
                  <label className="block text-xs md:text-sm font-medium mb-2">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, productImage: e.target.files[0] })}
                    className="border border-gray-300 rounded w-full text-xs md:text-sm"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={closeEditPopup} className="px-4 py-2 mr-2 bg-gray-500 text-white rounded text-xs md:text-sm">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded text-xs md:text-sm">
                    Save
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Popup */}
      {isDeletePopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.2)] backdrop-blur-[2px]'>
          <div className='w-[90%] sm:w-auto bg-white p-4 sm:p-8 rounded-md text-sm'>
            <h2 className='text-xl font-semibold mb-4'>Confirm Delete {selectedProduct.productName}</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className='flex justify-end gap-4 mt-4'>
              <button onClick={closeDeletePopup} className='px-4 py-1 bg-gray-300 rounded'>
                Cancel
              </button>
              <button onClick={handleDeleteProduct} className='px-4 py-1 bg-red-600 text-white rounded'>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductList;
