import React, { useState, useEffect } from 'react';
import { VscAccount } from "react-icons/vsc";
import axios from 'axios';
import OfferProductList from './OfferProductList';

const OfferProducts = () => {
    const [products, setProducts] = useState([]);
    const [productCodeFilter, setProductCodeFilter] = useState('');
    const [productNameFilter, setProductNameFilter] = useState('');
    const [loading, setLoading] = useState(true);

    // State for editable product fields
    const [productImage, setProductImage] = useState('');
    const [preview, setPreview] = useState(null);
    // const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [actualPrice, setActualPrice] = useState('');
    const [price, setPrice] = useState('');
    const [unit, setUnit] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vendor/getAllProducts');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on product code or product name
    const filteredProducts = products.filter(product =>
        (product.productCode?.toLowerCase().includes(productCodeFilter.toLowerCase()) || !productCodeFilter) &&
        (product.productName?.toLowerCase().includes(productNameFilter.toLowerCase()) || !productNameFilter)
    );

    // Display the first matching product or show nothing if no product matches
    const product = filteredProducts.length > 0 ? filteredProducts[0] : null;
    // console.log(product)


    // Handle form submission to update product details
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product) {
            const formData = new FormData();

            const balance = (price - (price * product.vendorCommission) / 100).toFixed(2);

            // Append other product details
            formData.append('productCode', product.productCode);
            formData.append('vendorEmail', product.vendorEmail);
            formData.append('vendorCommission', product.vendorCommission);
            formData.append('department', product.department);
            formData.append('shopName', product.shopName);
            formData.append('category', product.category);
            formData.append('productName', product.productName);

            // Append the file object to FormData if a new image is selected
            if (productImage instanceof File) {
                formData.append('productImage', productImage);
            } else {
                // Send the existing image URL as a string
                formData.append('productImage', product.productImage);
            }

            // Append other fields
            formData.append('description', description);
            formData.append('actualPrice', actualPrice);
            formData.append('price', price);
            formData.append('unit', unit);
            formData.append('balance', balance);

            try {
                const response = await axios.post('http://localhost:5000/api/admin/offerProduct', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Product added successfully:', response.data);
            } catch (error) {
                console.error('Error updating product:', error);
            }
        }
    };


    useEffect(() => {
        if (product) {
            setProductImage(product.productImage || '');
            setDescription(product.description || '');
            setActualPrice(product.actualPrice || '');
            setPrice(product.price || '');
            setUnit(product.unit || '');
        }
    }, [product]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductImage(file);

            const fileUrl = URL.createObjectURL(file);
            setPreview(fileUrl); // Store the preview URL in a separate state if needed
        }
    };


    return (
        <div className='w-full min-h-screen'>
            {/* Header */}
            <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
                <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Offer Products</span></div>
                <div className='rounded-full flex justify-center items-center'>
                    <VscAccount className='text-gray-400 w-8 h-8' />
                </div>
            </div>

            {/* Filter Inputs */}
            <div className='w-full flex flex-col md:flex-row justify-center items-center gap-2 sm:gap-4 my-4 py-8'>
                <input
                    type='text'
                    placeholder='Search by product code'
                    value={productCodeFilter}
                    onChange={(e) => setProductCodeFilter(e.target.value)}
                    className='p-1 sm:p-2 px-2 border border-gray-300 rounded text-sm sm:text-[16px] w-[80%] md:w-[250px]'
                />
                <input
                    type='text'
                    placeholder='Search by product name'
                    value={productNameFilter}
                    onChange={(e) => setProductNameFilter(e.target.value)}
                    className='p-1 sm:p-2 px-2 border border-gray-300 rounded text-sm sm:text-[16px] w-[80%] md:w-[250px]'
                />
            </div>

            {/* Product Details */}
            {loading ? (
                <div className='text-center text-gray-500'>Loading...</div>
            ) : product ? (
                <div className='w-full flex flex-col-reverse lg:flex-row justify-around items-center gap-6 pb-10 border-b-2 border-cyan-500'>
                    <form className='w-[90%] sm:w-[70%] lg:w-[40%] xl:w-[30%] flex flex-col justify-center items-center' onSubmit={handleSubmit}>
                        <div className="w-full bg-white shadow-sm rounded p-4 text-sm">
                            <div className="flex justify-center items-center ">
                                {/* Display product image */}
                                {productImage && (
                                    <img
                                        src={preview || productImage}
                                        alt="Product Preview"
                                        className="w-full h-auto py-2 max-h-56 object-contain border-b border-black"
                                    />
                                )}
                            </div>

                            {/* Input for choosing a file */}
                            <div className="mt-2 flex items-center gap-2 sm:gap-4">
                                <label className='block mb-1 text-xs font-semibold'>Change Product Image:</label>

                                {/* Hide the default file input */}
                                <input
                                    type='file'
                                    id='fileInput'
                                    accept='image/*'
                                    onChange={handleFileChange}
                                    className='hidden'
                                />

                                {/* Styled label for file input */}
                                <label
                                    htmlFor='fileInput'
                                    className='cursor-pointer inline-block bg-gray-400 py-1 px-3 rounded text-xs hover:bg-gray-300 text-white whitespace-nowrap'
                                >
                                    Choose File
                                </label>
                            </div>


                            <div className='py-2'>
                                <p className='w-full mb-1 p-2 border border-gray-300 rounded text-xs'>

                                    {product.productName}

                                </p>

                                <textarea
                                    placeholder='Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className='w-full mb-1 p-2 border border-gray-300 rounded text-xs'
                                />

                                <div className='flex justify-between gap-2'>
                                    <input
                                        type='text'
                                        placeholder='Actual Price'
                                        value={actualPrice}
                                        onChange={(e) => setActualPrice(e.target.value)}
                                        className='w-full mb-1 p-2 border border-gray-300 rounded text-xs'
                                    />
                                    <input
                                        type='text'
                                        placeholder='Offered Price'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className='w-full mb-1 p-2 border border-gray-300 rounded text-xs'
                                    />
                                    <input
                                        type='text'
                                        placeholder='Unit (e.g., kg, piece)'
                                        value={unit}
                                        onChange={(e) => setUnit(e.target.value)}
                                        className='w-full mb-1 p-2 border border-gray-300 rounded text-xs'
                                    />
                                </div>


                                <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded text-sm'>
                                    Submit Changes
                                </button>
                            </div>
                        </div>
                    </form>
                    {product && (
                        <div
                            className="w-[50%] relative sm:w-[220px] h-[200px] sm:h-[250px] md:h-[320px] bg-white rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-400 border border-[#3E4095] transition-transform duration-1000 transform"
                        >
                            <div className="w-full h-[120px] sm:h-[150px] md:h-[200px] overflow-hidden rounded-t-lg p-1 sm:p-2 shadow-md">
                                <img
                                    src={preview || product.productImage} // Display live preview or original image
                                    alt={product.productName}
                                    className="w-full h-[110px] sm:h-[260px] md:h-[182px] object-cover transition-transform duration-1000 transform hover:scale-105 rounded-t-lg border border-gray-300 overflow-hidden"
                                />

                                {/* Calculate and display offer percentage */}
                                {actualPrice && price && actualPrice > price && (
                                    <span className='absolute top-2 left-2 text-xs bg-red-600 text-white font-semibold px-1 py-0.5 rounded-ss'>
                                        {`${Math.round(((actualPrice - price) / actualPrice) * 100)}% OFF`}
                                    </span>
                                )}
                            </div>

                            <div className="p-2 flex text-left sm:text-center flex-col">
                                <h3 className="text-xs md:text-[16px] font-semibold capitalize">{product.productName}</h3>
                                <p className="hidden md:block text-xs md:text-gray-700 mb-1 capitalize"> {description || product.description} </p>
                                <div className="flex items-center text-xs sm:text-sm md:text-lg justify-start sm:justify-center">
                                    <span className="text-gray-500 text-[10px] sm:text-sm md:text-sm font-normal mr-2 line-through">
                                        &#x20B9;{actualPrice || product.actualPrice}
                                    </span>
                                    <span className="text-[12px] sm:text-base md:text-lg font-semibold text-green-800">
                                        &#x20B9;{price || product.price}
                                    </span>
                                    <span className="font-normal text-gray-800 text-xs">({unit || product.unit})</span>
                                </div>
                                <div className="w-full flex justify-center items-center ">
                                    <div className="w-[90%] flex items-center justify-between bottom-2 absolute">
                                        <button
                                            className="w-full bg-green-500 border-2 text-white py-1 px-2 rounded hover:bg-transparent hover:border-green-500 transition duration-300 hover:text-black text-[10px] sm:text-sm tracking-wider"
                                        >
                                            + Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            ) : (
                <div className='text-center text-gray-500'>No product found.</div>
            )}

            <div>
                <OfferProductList />
            </div>

        </div>
    );
};

export default OfferProducts;
