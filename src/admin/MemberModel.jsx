
const Modal = ({ user, onClose }) => {
    if (!user) return null;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options).replace(/\//g, '-');
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-[3px] flex items-center justify-center">
            <div className="bg-[rgba(0,0,0,0.5)] p-4 rounded shadow-lg w-full md:w-[50%] px-12 text-white border border-cyan-400">
                <h2 className="text-2xl font-bold mb-4 text-center tracking-wider">User Details</h2>
                <ul className="leading-loose flex gap-8 justify-between py-6 tracking-wider">
                    <div>
                        <li><strong>Member Id:</strong> {user.referralId}</li>
                        <li><strong>Name:</strong> {user.name}</li>
                        <li><strong>Gender:</strong> {user.gender}</li>
                        <li><strong>Father's Name:</strong> {user.fatherName}</li>
                        <li><strong>DOB:</strong> {formatDate(user.dob)}</li>
                        <li><strong>Email:</strong> {user.email}</li>
                        <li><strong>Referred By:</strong> {user.referredBy}</li>
                        <li><strong>Adhaar Number:</strong> {user.adhaarNumber}</li>
                        <li><strong>Voter Id:</strong> {user.voterId}</li>
                    </div>
                    <div>
                        <li><strong>Family Members:</strong> {user.familyMembers}</li>
                        <li><strong>No of Members (18+):</strong> {user.voters}</li>
                        <li><strong>Mobile Number:</strong> {user.mobileNumber}</li>
                        <li><strong>Alternate Mobile Number:</strong> {user.alternateMobileNumber}</li>
                        <li><strong>District:</strong> {user.district}</li>
                        <li><strong>Constituency:</strong> {user.constituency}</li>
                        <li><strong>Address:</strong> {user.address}</li>
                        <li><strong>Registered On:</strong> {formatDate(user.updatedAt)}</li>
                    </div>
                </ul>
                <div className="flex">
                    <button className="w-full mt-4 px-4 py-2 bg-cyan-600 text-white rounded border" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};
export default Modal  