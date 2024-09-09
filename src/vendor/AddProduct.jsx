import React, { useState, useEffect } from 'react';
import { VscAccount } from "react-icons/vsc";
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

const AddProduct = () => {
  const [department, setDepartment] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [shopName, setShopName] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [price, setPrice] = useState('');
  const [commissionPercent, setCommissionPercent] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [addProductLoading, setAddProductLoading] = useState(false);

  useEffect(() => {
    const vendorEmail = localStorage.getItem("vendorEmail");
    setVendorEmail(vendorEmail);

    const vendorDepartment = localStorage.getItem("vendorDepartment");
    setDepartment(vendorDepartment);

    const vendorCommission = localStorage.getItem("vendorCommision");
    setCommissionPercent(parseFloat(vendorCommission) || 0);

    const shopName = localStorage.getItem("shopName");
    setShopName(shopName);


    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/getAllCategories');
        const allCategories = response.data;

        // Filter categories by vendor's department
        const filteredCategories = allCategories.filter(
          (cat) => cat.department === vendorDepartment
        );

        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      finally {
        setLoading(false);
      }
    };

    if (vendorDepartment) {
      fetchCategories();
    }
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleProductImageChange = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    setAddProductLoading(true);

    const newErrors = {};

    if (!category) newErrors.category = 'Category is required';
    if (!productName) newErrors.productName = 'Product Name is required';
    if (!unit) newErrors.unit = 'Unit is required';
    if (!price) newErrors.price = 'Price is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear errors if validation passes

    const balance = price - (price * commissionPercent) / 100;

    const formData = new FormData();
    formData.append('vendorEmail', vendorEmail);
    formData.append('vendorCommission', commissionPercent);
    formData.append('department', department);
    formData.append('shopName', shopName);
    formData.append('productName', productName);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('unit', unit);
    formData.append('actualPrice', actualPrice);
    formData.append('price', price);
    formData.append('balance', balance);
    if (productImage) {
      formData.append('productImage', productImage);
    }

    try {
      await axios.post('http://localhost:5000/api/vendor/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
    finally {
      setAddProductLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-300">
      <header className="w-full h-16 bg-gray-800 flex justify-between items-center px-6 md:px-10">
        <div>
          <span className="sm:text-2xl font-semibold uppercase text-white tracking-widest">
            Add New Product
          </span>
        </div>
        <div className="flex justify-center items-center rounded-full">
          <VscAccount className="text-white w-8 h-8" />
        </div>
      </header>

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

          (<main className="w-full flex items-center justify-center py-8">
            <form
              className='w-[90%] border-2 flex flex-col xl:flex-row items-center justify-center bg-white shadow-sm shadow-black'
              onSubmit={handleAddProduct}
            >
              <div className="w-full xl:w-[70%] bg-white rounded p-6 flex flex-col sm:p-8 md:grid lg:grid-cols-2 gap-6 border">
                <div className="">
                  <label className="block text-gray-700 font-semibold mb-1" htmlFor="dept">
                    Department
                  </label>
                  <span className="block border border-gray-300 rounded-md py-2 px-3 text-gray-700">
                    {department}
                  </span>
                </div>

                <div className="">
                  <label className="block text-gray-700 font-semibold mb-1" htmlFor="categorySelect">
                    Select Category
                  </label>
                  <select
                    name="categorySelect"
                    id="categorySelect"
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.category}>
                        {cat.category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="">
                  <label className="block text-gray-700 font-semibold mb-1" htmlFor="pname">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="pname"
                    id="pname"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="">
                  <label className="block text-gray-700 font-semibold mb-1" htmlFor="des">
                    Description (optional)
                  </label>
                  <input
                    type="text"
                    name="des"
                    id="des"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="">
                  <label className="block text-gray-700 font-semibold mb-1" htmlFor="unit">
                    Unit
                  </label>
                  <input
                    type="text"
                    name="unit"
                    id="unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="">
                  <label className="block text-gray-700 font-semibold mb-1" htmlFor="productImage">
                    Product Image
                  </label>
                  <input
                    type="file"
                    id="productImage"
                    name="productImage"
                    onChange={handleProductImageChange}
                    className="w-full border border-gray-300 rounded-md px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="">
                  <label className="block text-gray-700 font-semibold mb-1" htmlFor="actualPrice">
                    Actual Price
                  </label>
                  <input
                    type="number"
                    name="actualPrice"
                    id="actualPrice"
                    value={actualPrice}
                    onChange={(e) => setActualPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="">
                  <label className="block text-gray-700 font-semibold mb-1" htmlFor="price">
                    Sale Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="">
                  <label className="block text-gray-700 font-semibold mb-1" htmlFor="com">
                    Commission (%)
                  </label>
                  <span className="block border border-gray-300 rounded-md py-2 px-3 text-gray-700">
                    {commissionPercent}%
                  </span>
                </div>


                <div className='flex justify-between gap-4'>
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-semibold mb-1" htmlFor="com">
                      Commission (amt)
                    </label>
                    <span className="block border border-gray-300 rounded-md py-2 px-3 text-gray-700">
                      &#x20B9; {((price * commissionPercent) / 100).toFixed(2)}
                    </span>
                  </div>

                  <div className="w-1/2">
                    <label className="block text-gray-700 font-semibold mb-1" htmlFor="com">
                      Balance (amt)
                    </label>
                    <span className="block border border-gray-300 rounded-md py-2 px-3 text-gray-700">
                      &#x20B9; {(price - (price * commissionPercent) / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className='w-full xl:w-[30%] border flex flex-col justify-center items-center p-6'>
                <h2 className="text-xl font-semibold mb-3">Product Preview</h2>
                <div className='border-2 border-black'>
                  <div className="w-full bg-white shadow-sm rounded">
                    {preview && (
                      <div className="flex justify-center items-center">
                        <img
                          src={preview}
                          alt="Product Preview"
                          className="w-full h-auto max-h-64 object-contain border-b border-black"
                        />
                      </div>
                    )}
                    <div className='py-2'>
                      <p className='mb-1 text-center tracking-wider'><strong>{productName}</strong>
                        {description && (<p className='mb-2 text-center text-xs'>({description})</p>)}
                      </p>

                      <p className='mb-2 text-center text-sm'>
                        <strong>Price: </strong>
                        <span className="text-gray-500">
                          <del>&#x20B9;{actualPrice}</del>
                        </span>
                        <span className='font-semibold text-lg'>&nbsp;&#x20B9;{price} </span>{unit ? `(${unit})` : ""}
                      </p>

                    </div>
                  </div>

                  <div className="w-full flex col-span-2 justify-center p-2">
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-12 py-2 hover:bg-green-600 focus:outline-none w-full font-semibold"
                    >
                      {addProductLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Add Product'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </main>)
      }
    </div>
  );
};

export default AddProduct;
