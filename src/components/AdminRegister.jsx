import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import ClipLoader from 'react-spinners/ClipLoader';

const AdminRegister = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setMessage('Invalid email format');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        if (!formData.role) {
            setMessage('Please select a role');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password, role: formData.role })
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                setMessage(data.message);
                alert("Admin Register Successful");
                navigate("/adminDetails");
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setLoading(false);
            setMessage('Server error');
        }
    };

    return (
        <div className='w-full min-h-screen'>
            <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400 '>
                <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Add New Staff</span></div>
                <div className='rounded-full flex justify-center items-center'>
                    <VscAccount className='text-gray-400 w-8 h-8' />
                </div>
            </div>
            <div className='w-full min-h-[90vh] flex flex-col justify-center items-center gap-3'>
                <form className='flex flex-col justify-center items-center w-[50%] border border-cyan-400 gap-3 py-10 bg-[rgba(0,0,0,0.3)]' onSubmit={handleSubmit}>
                    {message && <p className='text-red-600 mt-2 bg-gray-300 p-1 px-8 tracking-wider'>{message}</p>}
                    <h1 className='text-3xl text-white font-bold tracking-wider mb-2'>Staff Register</h1>
                    <input type="text" name="name" placeholder='Name' className='w-[60%] p-3 rounded-md' onChange={handleChange} value={formData.name} required />
                    <input type="email" name="email" placeholder='Email' className='w-[60%] p-3 rounded-md' onChange={handleChange} value={formData.email} required />
                    <input type="password" name="password" placeholder='Password' className='w-[60%] p-3 rounded-md' onChange={handleChange} value={formData.password} required />
                    <input type="password" name="confirmPassword" placeholder='Confirm Password' className='w-[60%] p-3 rounded-md' onChange={handleChange} value={formData.confirmPassword} required />

                    {/* Role Select Dropdown */}
                    <select name="role" className='w-[60%] p-3 rounded-md' onChange={handleChange} value={formData.role} required>
                        <option value="">Select Role</option> {/* Ensure empty value for default */}
                        <option value="admin">Admin</option>
                        <option value="delivery boy">Delivery Boy</option>
                    </select>

                    <button type='submit' className='w-[60%] bg-cyan-600 p-2 px-8 text-md font-semibold text-white tracking-wider rounded-md hover:bg-cyan-700 flex justify-center items-center'>
                        {loading ? <ClipLoader color={"#fff"} size={20} /> : "Register"}
                    </button>
                    <a href='/adminDetails' className='w-[60%] bg-gray-400 p-1 px-8 text-md text-center font-semibold text-white tracking-wider rounded-md hover:bg-gray-600'>Go back</a>
                </form>
            </div>
        </div>
    );
};

export default AdminRegister;
