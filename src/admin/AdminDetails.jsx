import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VscAccount } from 'react-icons/vsc';

const AdminDetails = () => {
    const [admins, setAdmins] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/all');
                setAdmins(response.data);
            } catch (err) {
                setError('Error fetching admins');
            }
            finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    return (
        <div className='w-full min-h-screen'>
            <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
                <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Admin Details</span></div>
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
                    (
                        <div>
                            <div className='p-8'>
                                {error && <p className='text-red-500 mb-4'>{error}</p>}
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white'>
                                    {admins.map((admin, index) => (
                                        <div key={index} className='bg-[rgba(0,0,0,0.4)] p-6 rounded-lg  shadow-lg border border-cyan-400 text-white' >
                                            <h2 className='text-xl font-semibold text-white mb-2 tracking-wider capitalize'>{admin.name || "N/A"} <span className='text-gray-200 font-normal text-sm'>({admin.role})</span></h2>
                                            <p className='text-gray-300 tracking-wider'>{admin.email}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='w-full text-center p-8'>
                                <a href="/adminRegister" className='bg-cyan-600 text-white px-10 py-2 rounded-md hover:bg-cyan-700 font-semibold tracking-wider'>
                                    Add New Staff
                                </a>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default AdminDetails;
