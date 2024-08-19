import React, { useState, useEffect } from 'react';
import { VscAccount } from "react-icons/vsc";
import axios from 'axios'; // For making HTTP requests

const AddProduct = () => {
  const [department, setDepartment] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  // const [newCategory, setNewCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [commissionPercent, setCommissionPercent] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {

    const vendorEmail = localStorage.getItem("vendorEmail");
    setVendorEmail(vendorEmail);

    const vendorDepertment = localStorage.getItem("vendorDepartment");
    setDepartment(vendorDepertment);

    const vendorCommision = localStorage.getItem("vendorCommision");
    setCommissionPercent(vendorCommision);

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/getAllCategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => { 
    setCategory(event.target.value);
  };

  // const handleNewCategoryChange = (event) => {
  //   setNewCategory(event.target.value);
  // };

  // const handleCreateCategory = async (event) => {
  //   event.preventDefault();
  //   if (newCategory.trim() && department) {
  //     try {
  //       const response = await axios.post('http://localhost:5000/api/vendor/category', {
  //         category: newCategory,
  //         department
  //       });
  //       setCategories([...categories, response.data]);
  //       setNewCategory('');
  //     } catch (error) {
  //       console.error('Error creating category:', error);
  //     }
  //   }
  // };

  const handleProductImageChange = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // const handleProductImageChange = (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     // Check if the file size is below 300 KB
  //     const fileSizeInKB = file.size / 1024;
  //     if (fileSizeInKB > 300) {
  //       setError('File size must be below 300 KB.');
  //       return;
  //     }

  //     setError('');
  //     // Process the file here, for example, by uploading it or displaying a preview
  //     // ...
  //   }
  // };

  const handleAddProduct = async (event) => {
    event.preventDefault();
  
    const newErrors = {};
  
    if (!category) newErrors.category = 'Category is required';
    if (!productName) newErrors.productName = 'Product Name is required';
    if (!unit) newErrors.unit = 'Unit is required';
    if (!price) newErrors.price = 'Price is required';
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  +
    setErrors({}); // Clear errors if validation passes
  
    const formData = new FormData();
    formData.append('vendorEmail', vendorEmail);
    formData.append('department', department);
    formData.append('productName', productName);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('unit', unit);
    formData.append('price', price);
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

      <main className="w-full flex items-center justify-center py-8">
        <form
          className='w-[90%] border-2 flex flex-col xl:flex-row items-center justify-center bg-white shadow-sm shadow-black'
          onSubmit={handleAddProduct}
        >
          <div className="w-full xl:w-[70%] bg-white  rounded p-6 flex flex-col sm:p-8 md:grid lg:grid-cols-2 gap-6 border">
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
                  <option key={cat._id} value={cat._id}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>

            <div className="">
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="category">
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
              />
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
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="price">
                Price
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
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="com">
                Commission (amt)
              </label>
              <span className="block border border-gray-300 rounded-md py-2 px-3 text-gray-700">
                &#x20B9; {(price * commissionPercent) / 100}
              </span>
            </div>
          </div>

          <div className='w-full xl:w-[30%] border flex flex-col justify-center items-center p-6'>
            <h2 className="text-xl font-semibold mb-3">Product Preview</h2>
            <div className=' border-2 border-black'>
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

                  <p className='mb-2 text-center text-sm'><strong>Price: &#x20B9;</strong>  {price}  {unit ? `(${unit})` : ""}</p>

                </div>
              </div>

              <div className="w-full flex col-span-2 justify-center p-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-12 py-2 hover:bg-green-600 focus:outline-none w-full font-semibold"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
