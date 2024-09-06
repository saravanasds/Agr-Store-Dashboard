import React, { useState, useEffect } from 'react';
import { VscAccount } from "react-icons/vsc";
import axios from 'axios';

const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [newDepartment, setNewDepartment] = useState('');
    const [departmentImage, setDepartmentImage] = useState(null); // New state for the department image
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

    const handleInputChange = (e) => {
        setNewDepartment(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setDepartmentImage(file);

        // Set the image preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleCreateDepartment = async (e) => {
        e.preventDefault();
        if (newDepartment.trim() && departmentImage) {
            const formData = new FormData();
            formData.append('department', newDepartment);
            formData.append('departmentImage', departmentImage);

            try {
                const response = await axios.post('http://localhost:5000/api/admin/createDepartment', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Result:', response.data);
                window.location.reload(); // Refresh the page
                setDepartments([...departments, response.data]);
                setNewDepartment('');
                setDepartmentImage(null); // Clear the image input
                setImagePreview(''); // Clear the image preview
            } catch (error) {
                console.error('Error creating department:', error);
            }
        }
    };

    return (
        <div className='w-full min-h-screen'>
            <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
                <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Departments</span></div>
                <div className=' rounded-full flex justify-center items-center'>
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

                    (<div className='w-full flex flex-col justify-center items-center pt-10'>
                        <form onSubmit={handleCreateDepartment} className="w-full flex flex-col md:flex-row items-center justify-center min-h-[40vh] py-20 border-b-2 border-cyan-400 gap-8">
                            <div className='w-full md:w-[50%] flex flex-col justify-center items-center '>
                                <h1 className='text-white text-3xl font-semibold tracking-wider mb-8'>Create New Department</h1>
                                <label htmlFor="" className='mb-4 text-white'>Department Image:</label>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className='w-[300px] mb-4 bg-white'
                                />
                                <input
                                    type="text"
                                    value={newDepartment}
                                    onChange={handleInputChange}
                                    placeholder="New Department Name"
                                    className='w-[300px] mb-4'
                                />
                            </div>

                            {imagePreview && (
                                <div className='w-full md:w-[50%] flex flex-col justify-center items-center'>
                                    <div className=" bg-[rgb(244,246,248)] flex flex-col justify-center items-center rounded-xl overflow-hidden shadow-lg p-2">
                                        <div className="h-[200px] flex justify-center items-center">
                                            <img
                                                className="w-[250px] h-full object-cover rounded-full"
                                                src={imagePreview}
                                            />
                                        </div>
                                        <div className=" text-center py-5 text-[rgb(69,89,91)]">
                                            <h2 className="text-xl font-semibold">{newDepartment}</h2>
                                        </div>

                                        <button type='submit' className='w-full bg-cyan-600 py-2 px-6 text-white font-semibold'>
                                            Create
                                        </button>
                                    </div>
                                </div>
                            )}

                        </form>

                        <div className='w-full flex flex-col justify-center items-center mt-10'>
                            <h1 className='w-full text-center text-4xl py-6 text-white font-semibold tracking-wider '>Our Departments</h1>
                            <div className='w-[90%] flex flex-wrap justify-center items-center gap-10 py-6'>
                                {departments.map((dept) => (
                                    <div key={dept._id} className="bg-[rgb(244,246,248)] rounded-xl overflow-hidden shadow-lg hover:scale-[1.1] transform transition-all duration-300 p-2">
                                        <div className="w-full h-[200px] flex justify-center items-center">
                                            <img
                                                className="w-[250px] h-full object-cover rounded-full"
                                                src={dept.departmentImage}
                                                alt={`Slide ${dept.department}`}
                                            />
                                        </div>
                                        <div className="w-full text-center py-5 text-[rgb(69,89,91)]">
                                            <h2 className="text-xl font-semibold">{dept.department}</h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>)
            }
        </div>
    );
}

export default Department;
