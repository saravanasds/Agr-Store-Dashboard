import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';

const AdminLogin = ({ setRole }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('adminRole', data.role);
                setMessage('Login successful');
                setRole('admin');
                navigate("/adminDashboard");
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-[100vh] bg-gray-950 flex flex-col justify-center items-center gap-3 p-10'>
            <form onSubmit={handleSubmit} className='min-h-[50vh] flex flex-col justify-center items-center w-full md:w-[40%] gap-3 p-5 rounded-xl' style={{ boxShadow: "0px 0px 12px cyan" }}>
                <h2 className='text-3xl font-bold tracking-wider mb-4 text-gray-300 uppercase'>Admin Login</h2>
                <input type="email" name="email" placeholder='Email' className='w-full md:w-[80%] p-3 rounded border-none outline-none' required onChange={handleChange} value={formData.email}/>
                <input type="password" name="password" placeholder='Password' className='w-full md:w-[80%] p-3 rounded border-none outline-none' required onChange={handleChange} value={formData.password}/>
                <button type='submit' className='w-full md:w-[80%] bg-cyan-700 py-3 px-10 rounded font-semibold text-white flex justify-center items-center hover:bg-cyan-800 border uppercase tracking-widest'>
                    {loading ? <ClipLoader color="#ffffff" size={24} /> : 'Login'} 
                </button>
            </form>
            {message && <p className='text-white'>{message}</p>}
            <div className="text-center text-white mt-3">
                <p>
                    Go to Vendor Login
                    <Link to="/" className="font-bold hover:underline ml-3 text-cyan-400 underline">
                        Click Here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AdminLogin