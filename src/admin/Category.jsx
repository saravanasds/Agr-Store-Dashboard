import React, { useState, useEffect } from 'react';
import { VscAccount } from "react-icons/vsc";
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

const Category = () => {
    const [departments, setDepartments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState(''); // State for selected department
    const [categoryImage, setCategoryImage] = useState(null); // State for the category image
    const [imagePreview, setImagePreview] = useState(''); // State for image preview
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/getAllDepartments');
                console.log('Departments:', response.data);
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (newCategory.trim() && categoryImage && selectedDepartment) {
            const formData = new FormData();
            formData.append('category', newCategory);
            formData.append('categoryImage', categoryImage);
            formData.append('department', selectedDepartment); // Append selected department

            try {
                const response = await axios.post('http://localhost:5000/api/admin/createCategory', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Result:', response.data);
                window.location.reload(); // Refresh the page
                setCategories([...categories, response.data]);
                setNewCategory('');
                setSelectedDepartment(''); // Clear the selected department
                setCategoryImage(null); // Clear the image input
                setImagePreview(''); // Clear the image preview
            } catch (error) {
                console.error('Error creating category:', error);
            }
            finally {
                setLoading(false);
            }
        }
    };

    const handleInputChange = (e) => {
        setNewCategory(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setCategoryImage(file);

        // Set the image preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='w-full min-h-screen'>
            <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
                <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Categories</span></div>
                <div className='rounded-full flex justify-center items-center'>
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

                    (<form onSubmit={handleCreateCategory} className="w-full flex flex-col md:flex-row items-center justify-center min-h-[40vh] py-20 border-b-2 border-cyan-400 gap-8">
                        <div className='w-full md:w-[50%] flex flex-col justify-center items-center'>
                            <h1 className='text-white text-3xl font-semibold tracking-wider mb-8'>Create New Category</h1>
                            <label className="block text-white font-semibold mb-1" htmlFor="department">
                                Choose Department
                            </label>
                            <select
                                name="department"
                                id="department"
                                value={selectedDepartment}
                                onChange={handleDepartmentChange}
                                className="border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-gray-800"
                            >
                                <option value="" className="text-gray-500 bg-transparent">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept._id} value={dept.department} className="text-white bg-gray-800">
                                        {dept.department}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="categoryImage" className='mb-4 text-white'>Category Image:</label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                className='w-[300px] mb-4 bg-white'
                            />
                            <input
                                type="text"
                                value={newCategory}
                                onChange={handleInputChange}
                                placeholder="New Category Name"
                                className='w-[300px] mb-4'
                            />
                        </div>

                        {imagePreview && (
                            <div className='w-full md:w-[50%] flex flex-col justify-center items-center'>
                                <div className="bg-[rgb(244,246,248)] flex flex-col justify-center items-center rounded-xl overflow-hidden shadow-lg p-2">
                                    <div className="h-[200px] flex justify-center items-center">
                                        <img
                                            className="w-40 h-40 object-cover rounded-full"
                                            src={imagePreview}
                                            alt="Category Preview"
                                        />
                                    </div>
                                    <div className="text-center py-2 text-[rgb(69,89,91)]">
                                        <h2 className="text-xl font-semibold">{newCategory}</h2>
                                    </div>

                                    <button type='submit' className='w-full bg-cyan-600 py-2 px-6 text-white font-semibold'>
                                        {loading ? <ClipLoader color="#ffffff" size={20} /> : 'Create'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>)
            }
        </div>
    )
}

export default Category;
