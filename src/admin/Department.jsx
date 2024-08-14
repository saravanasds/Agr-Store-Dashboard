import React, { useState, useEffect } from 'react';
import { VscAccount } from "react-icons/vsc";
import axios from 'axios';

const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [newDepartment, setNewDepartment] = useState('');

    useEffect(() => {
        // Fetch departments from the backend
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/getAllDepartments');
                console.log('Departments:', response.data);
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    const handleInputChange = (e) => {
        setNewDepartment(e.target.value);
    };

    const handleCreateDepartment = async (e) => {
        e.preventDefault();
        if (newDepartment.trim()) {
            try {
                const response = await axios.post('http://localhost:5000/api/admin/createDepartment', { department: newDepartment });
                console.log('Result:', response.data);
                window.location.reload(); // Refresh the page
                setDepartments([...departments, response.data]);
                setNewDepartment('');
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

            <div className='w-full flex flex-col justify-center items-center pt-10'>
                <form onSubmit={handleCreateDepartment} >
                    <input
                        type="text"
                        value={newDepartment}
                        onChange={handleInputChange}
                        placeholder="New Department Name"
                        className='w-[300px] '
                    />
                    <button type='submit' className=' bg-cyan-600 py-2 px-6 text-white font-semibold'>
                        Create
                    </button>
                </form>

                <div className='w-[90%] flex flex-wrap justify-center items-center gap-4 py-6'>
                    {departments.map((dept) => (
                        <div key={dept._id} className='bg-[rgba(0,0,0,0.3)] shadow-sm shadow-black px-10 py-2 text-white text-xl rounded-md border border-cyan-400 tracking-wider capitalize' style={{ textShadow: "2px 2px 0px black" }}><h1>{dept.department}</h1></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Department