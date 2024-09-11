import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";
import MemberModel from "./MemberModel";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    mobileNumber: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/all');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err) {
        setError('Error fetching users');
      }
      finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.mobileNumber.includes(filter.mobileNumber)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to the first page when filter changes
  }, [filter, users]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(/\//g, '-');
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (

    <div className='w-full min-h-screen '>

      <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
        <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Member Details</span></div>
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

          (<div className="w-full min-h-screen mx-auto px-4 sm:px-8 md:px-20 py-10">

            <div className="mb-4 rounded p-4 flex justify-center lg:justify-between items-center flex-wrap gap-4">
              <div>
                <h2 className='text-white text-xl sm:text-2xl font-semibold'>Total Member: <span>{users.length}</span></h2>
              </div>
              <div className='flex justify-center items-center flex-wrap gap-4'>
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Filter by Mobile Number"
                  value={filter.mobileNumber}
                  onChange={handleFilterChange}
                  className="px-4 py-2 border rounded mr-2 border-none outline-none w-full sm:w-auto text-sm sm:text-[16px]"
                />
              </div>

            </div>
            <div className="overflow-x-auto rounded">
              <table className="min-w-full border border-gray-500 bg-[rgba(0,0,0,0.4)] text-white rounded whitespace-nowrap text-sm sm:text-[16px]">
                <thead className='bg-cyan-700 text-white tracking-wider border-b border-gray-400' >
                  <tr>
                    <th className="px-4 py-2 font-semibold">Sl.no</th>
                    <th className="px-4 py-2 font-semibold">Member Id</th>
                    <th className="px-4 py-2 font-semibold">Name</th>
                    <th className="px-4 py-2 font-semibold">Mobile Number</th>
                    <th className="px-4 py-2 font-semibold">Registered On</th>
                    <th className="px-4 py-2 font-semibold">Referrals</th>
                    <th className="px-4 py-2 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr key={index} className="cursor-pointer text-center" onClick={() => handleRowClick(user)}>
                      <td className="px-4 py-2 border-b border-gray-500">{index + 1}</td>
                      <td className="px-4 py-2 border-b border-gray-500">{user.referralId}</td>
                      <td className="px-4 py-2 border-b border-gray-500">{user.name}</td>
                      <td className="px-4 py-2 border-b border-gray-500">{user.mobileNumber}</td>
                      <td className="px-4 py-2 border-b border-gray-500">{formatDate(user.createdAt)}</td>
                      <td className="px-4 py-2 border-b border-gray-500">{user.referredPeoples.length}</td>
                      <td className="px-4 py-2 border-b border-gray-500">
                        <button className="px-8 py-1 bg-cyan-600 text-white rounded text-xs" onClick={(e) => { e.stopPropagation(); handleRowClick(user); }}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-2 mx-1 rounded-full ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                >
                  {number}
                </button>
              ))}
            </div>
            {selectedUser && <MemberModel user={selectedUser} onClose={handleCloseModal} />}
          </div>)
      }
    </div>
  );
};

export default Dashboard;
