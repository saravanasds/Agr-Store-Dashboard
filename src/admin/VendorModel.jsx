
const VendorModel = ({ vendor, onClose }) => {
    if (!vendor) return null;
  
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('en-GB', options).replace(/\//g, '-');
    };
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-[3px] flex items-center justify-center">
        <div className="bg-[rgba(0,0,0,0.5)] p-4 rounded shadow-lg max-w-md w-full px-8 text-white border border-cyan-400">
          <h2 className="text-2xl font-bold mb-4 text-center tracking-wider">Vendor Details</h2>
          <ul className="leading-loose">
            <li><span className="font-semibold tracking-wide">Name:</span> {vendor.vendorName}</li>
            <li><span className="font-semibold tracking-wide">Shop Name:</span> {vendor.shopName}</li>
            <li><span className="font-semibold tracking-wide">Department:</span> {vendor.department}</li>
            <li><span className="font-semibold tracking-wide">Email:</span> {vendor.vendorEmail}</li>
            <li><span className="font-semibold tracking-wide">Commision:</span> {vendor.vendorCommision}</li>
            <li><span className="font-semibold tracking-wide">Mobile Number:</span> {vendor.vendorMobileNumber}</li> 
            <li><span className="font-semibold tracking-wide">Alternate Mobile Number:</span> {vendor.vendorAlternateMobileNumber}</li> 
            <li><span className="font-semibold tracking-wide">Bank Ac.no:</span> {vendor.vendorBankAcNo}</li>    
            <li><span className="font-semibold tracking-wide">Bank Name:</span> {vendor.vendorBankName}</li>
            <li><span className="font-semibold tracking-wide">Branch:</span> {vendor.vendorBranch}</li>
            <li><span className="font-semibold tracking-wide">Ifsc code:</span> {vendor.vendorIfsc}</li>
            <li><span className="font-semibold tracking-wide">Gpay no:</span> {vendor.vendorGpayNo}</li>
            <li><span className="font-semibold tracking-wide">Address:</span> {vendor.shopAddress}</li>
            <li><span className="font-semibold tracking-wide">Registered On:</span> {formatDate(vendor.createdAt)}</li>
          </ul>
          <div className="flex">
            <button className="w-full mt-4 px-4 py-2 bg-cyan-700 text-white rounded border border-gray-300" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  };
  export default VendorModel 