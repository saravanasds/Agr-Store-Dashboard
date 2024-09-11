
const Modal = ({ user, onClose }) => {
    if (!user) return null;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options).replace(/\//g, '-');
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-[3px] flex items-center justify-center">
            <div className="bg-[rgba(0,0,0,0.5)] p-4 rounded shadow-lg w-[80%] md:w-[50%] px-4 sm:px-12 ml-10 text-white border border-cyan-400 text-sm sm:text-[16px]">
                <h2 className="text-2xl font-bold mb-4 text-center tracking-wider">User Details</h2>
                <ul className="leading-loose py-6 tracking-wider">

                    <li><strong>Member Id:</strong> {user.referralId}</li>
                    <li><strong>Name:</strong> {user.name}</li>
                    <li><strong>Email:</strong> {user.email}</li>
                    <li><strong>Referred By:</strong> {user.referredBy}</li>
                    <li><strong>Referred Members:</strong> {user.referredPeoples}</li>
                    <li><strong>Registered On:</strong> {formatDate(user.updatedAt)}</li>

                </ul>
                <div className="flex">
                    <button className="w-full mt-4 px-4 py-2 bg-cyan-600 text-white rounded border" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};
export default Modal  