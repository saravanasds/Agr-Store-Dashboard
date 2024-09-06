import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";

const AddNewVendor = () => {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState('');
  const [shopName, setShopName] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorMobileNumber, setVendorMobileNumber] = useState('');
  const [vendorAlternateMobileNumber, setVendorAlternateMobileNumber] = useState('');
  const [vendorGpayNo, setVendorGpayNo] = useState('');
  const [vendorBankAcNo, setVendorBankAcNo] = useState('');
  const [vendorBankName, setVendorBankName] = useState('');
  const [vendorBranch, setVendorBranch] = useState('');
  const [vendorIfsc, setVendorIfsc] = useState('');
  const [vendorCommision, setVendorCommision] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [vendorPassword, setVendorPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const [errors, setErrors] = useState({});
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

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!department) newErrors.department = 'Department is required';
    if (!shopName) newErrors.shopName = 'Shop Name Name is required';
    if (!vendorName) newErrors.vendorName = 'Vendor Name of Birth is required';
    if (!vendorEmail) newErrors.vendorEmail = 'Vendor Email is required';
    if (!vendorMobileNumber) newErrors.vendorMobileNumber = 'Mobile Number is required';
    if (!vendorAlternateMobileNumber) newErrors.vendorAlternateMobileNumber = 'Alternate Mobile Number Number is required';
    if (!vendorGpayNo) newErrors.vendorGpayNo = 'Vendor Gpay No Number is required';
    if (!vendorBankAcNo) newErrors.vendorBankAcNo = 'Vendor Bank Ac No is required';
    if (!vendorBankName) newErrors.vendorBankName = 'Vendor Bank Name is required';
    if (!vendorBranch) newErrors.vendorBranch = 'Vendor Branch is required';
    if (!vendorIfsc) newErrors.vendorIfsc = 'Vendor Ifsc is required';
    if (!vendorCommision) newErrors.vendorCommision = 'Vendor Commision  is required';
    if (!shopAddress) newErrors.shopAddress = 'Shop Address  is required';
    if (!vendorPassword) newErrors.vendorPassword = 'Vendor Password is required';
    if (vendorPassword !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'; // Password match validation

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear errors if validation passes

    const vendorData = {
      department,
      shopName,
      vendorName,
      vendorEmail,
      vendorMobileNumber,
      vendorAlternateMobileNumber,
      vendorGpayNo,
      vendorBankAcNo,
      vendorBankName,
      vendorBranch,
      vendorIfsc,
      vendorCommision,
      shopAddress,
      vendorPassword
    };

    console.log(vendorData);

    try {
      const response = await axios.post('http://localhost:5000/api/admin/addNewVendor', vendorData);
      console.log('Vendor registered:', response.data);
      // toast.success('User registered successfully!');
    } catch (error) {
      console.log(error);
    }
   
  };


  return (
    <div className="w-full min-h-screen">
      <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
        <div><span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Add New Vendor</span></div>
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
          (
            <main className="w-full flex justify-center items-center py-8">
              <form onSubmit={handleSubmit} className="w-full max-w-5xl bg-[rgba(0,0,0,0.4)] shadow-sm rounded p-6 flex flex-col sm:p-8 sm:grid md:grid-cols-2 xl:grid-cols-3 gap-3 shadow-black border border-cyan-400">
                <div className="">
                  <label className="block text-white font-semibold mb-1" htmlFor="department">
                    Choose Department
                  </label>
                  <select
                    name="department"
                    id="department"
                    value={department}
                    onChange={handleDepartmentChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-gray-800"
                  >
                    <option value="" className="text-gray-500 bg-transparent">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept._id} value={dept.department} className="text-white bg-gray-800">
                        {dept.department}
                      </option>
                    ))}
                  </select>

                  {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                </div>

                <div className="">
                  <label className="block text-white font-semibold mb-1" htmlFor="shopName">
                    Shop Name
                  </label>
                  <input
                    type="text"
                    name="shopName"
                    id="shopName"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-transparent"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                  />
                  {errors.shopName && <p className="text-red-500 text-xs mt-1">{errors.shopName}</p>}
                </div>

                <div className="">
                  <label className="block text-white font-semibold mb-1" htmlFor="vendorName">
                    Vendor Name
                  </label>
                  <input
                    type="text"
                    name="vendorName"
                    id="vendorName"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-transparent"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                  />
                  {errors.vendorName && <p className="text-red-500 text-xs mt-1">{errors.vendorName}</p>}
                </div>

                <div className="">
                  <label className="block text-white font-semibold mb-1" htmlFor="vendorEmail">
                    Email Id
                  </label>
                  <input
                    type="email"
                    name="vendorEmail"
                    id="vendorEmail"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-transparent"
                    value={vendorEmail}
                    onChange={(e) => setVendorEmail(e.target.value)}
                  />
                  {errors.vendorEmail && <p className="text-red-500 text-xs mt-1">{errors.vendorEmail}</p>}
                </div>

                <div className="">
                  <label className="block text-white font-semibold mb-1" htmlFor="vendorMobileNumber">
                    Mobile no
                  </label>
                  <input
                    type="number"
                    name="vendorMobileNumber"
                    id="vendorMobileNumber"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-transparent"
                    value={vendorMobileNumber}
                    onChange={(e) => setVendorMobileNumber(e.target.value)}
                  />
                  {errors.vendorMobileNumber && <p className="text-red-500 text-xs mt-1">{errors.vendorMobileNumber}</p>}
                </div>

                <div className="">
                  <label className="block text-white font-semibold mb-1" htmlFor="vendorAlternateMobileNumber">
                    Alternate Mobile no
                  </label>
                  <input
                    type="number"
                    name="vendorAlternateMobileNumber"
                    id="vendorAlternateMobileNumber"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-transparent"
                    value={vendorAlternateMobileNumber}
                    onChange={(e) => setVendorAlternateMobileNumber(e.target.value)}
                  />
                  {errors.vendorAlternateMobileNumber && <p className="text-red-500 text-xs mt-1">{errors.vendorAlternateMobileNumber}</p>}
                </div>


                <div className="">
                  <label className="block text-white font-semibold mb-1" htmlFor="vendorGpayNo">
                    Gpay no
                  </label>
                  <input
                    type="number"
                    name="vendorGpayNo"
                    id="vendorGpayNo"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-transparent"
                    value={vendorGpayNo}
                    onChange={(e) => setVendorGpayNo(e.target.value)}
                  />
                  {errors.vendorGpayNo && <p className="text-red-500 text-xs mt-1">{errors.vendorGpayNo}</p>}
                </div>

                <div className="">
                  <label className="block text-white font-semibold mb-1" htmlFor="vendorBankAcNo">
                    Bank Ac.no
                  </label>
                  <input
                    type="number"
                    name="vendorBankAcNo"
                    id="vendorBankAcNo"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-transparent"
                    value={vendorBankAcNo}
                    onChange={(e) => setVendorBankAcNo(e.target.value)}
                  />
                  {errors.vendorBankAcNo && <p className="text-red-500 text-xs mt-1">{errors.vendorBankAcNo}</p>}
                </div>

                <div className="">
                  <label className="block text-white font-semibold mb-1" htmlFor="vendorBankName">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="vendorBankName"
                    id="vendorBankName"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-transparent"
                    value={vendorBankName}
                    onChange={(e) => setVendorBankName(e.target.value)}
                  />
                  {errors.vendorBankName && <p className="text-red-500 text-xs mt-1">{errors.vendorBankName}</p>}
                </div>

                <div className="">
                  <label className="block text-white font-semibold mb-1" htmlFor="vendorBranch">
                    Branch
                  </label>
                  <input
                    type="text"
                    name="vendorBranch"
                    id="vendorBranch"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-transparent"
                    value={vendorBranch}
                    onChange={(e) => setVendorBranch(e.target.value)}
                  />
                  {errors.vendorBranch && <p className="text-red-500 text-xs mt-1">{errors.vendorBranch}</p>}
                </div>

                <div className="">
                  <label className="block text-white font-semibold mb-1" htmlFor="vendorIfsc">
                    Ifsc code
                  </label>
                  <input
                    type="text"
                    name="vendorIfsc"
                    id="vendorIfsc"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-transparent"
                    value={vendorIfsc}
                    onChange={(e) => setVendorIfsc(e.target.value)}
                  />
                  {errors.vendorIfsc && <p className="text-red-500 text-xs mt-1">{errors.vendorIfsc}</p>}
                </div>

                <div className="">
                  <label className="block text-white font-semibold mb-1" htmlFor="vendorCommision">
                    Commision (%)
                  </label>
                  <input
                    type="number"
                    name="vendorCommision"
                    id="vendorCommision"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-transparent"
                    value={vendorCommision}
                    onChange={(e) => setVendorCommision(e.target.value)}
                  />
                  {errors.vendorCommision && <p className="text-red-500 text-xs mt-1">{errors.vendorCommision}</p>}
                </div>

                <div className="md:col-span-2 xl:col-span-3">
                  <label className="block text-white font-semibold mb-1" htmlFor="shopAddress">
                    Shop Address
                  </label>
                  <textarea
                    type="text"
                    name="shopAddress"
                    id="shopAddress"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-transparent"
                    value={shopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                  />
                  {errors.shopAddress && <p className="text-red-500 text-xs mt-1">{errors.shopAddress}</p>}
                </div>

                <div className="">
                  <label className="block text-white font-semibold mb-1" htmlFor="vendorPassword">
                    Set Password
                  </label>
                  <input
                    type="password"
                    name="vendorPassword"
                    id="vendorPassword"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-transparent"
                    value={vendorPassword}
                    onChange={(e) => setVendorPassword(e.target.value)}
                  />
                  {errors.vendorPassword && <p className="text-red-500 text-xs mt-1">{errors.vendorPassword}</p>}
                </div>

                <div className="">
                  <label className="block text-white font-semibold mb-1" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-white focus:outline-none focus:border-cyan-500 bg-transparent"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>



                <div className="flex items-end justify-center md:col-span-2 xl:col-span-1">
                  <button
                    type="submit"
                    className="bg-cyan-600 text-white px-12 py-2 rounded-md hover:bg-cyan-700 focus:outline-none w-full md:w-auto text-md xl:w-full xl:text-xl tracking-wider font-semibold mt-4 xl:mt-0"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </main>
          )

      }

    </div>
  );
};

export default AddNewVendor;
