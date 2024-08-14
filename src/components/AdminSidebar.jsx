import React, { useState, useEffect } from 'react';
import {
    FaBars,
} from "react-icons/fa";
import { MdWindow } from "react-icons/md";
import { IoListSharp } from "react-icons/io5";
import { LuListChecks } from "react-icons/lu";
import { MdLibraryAdd } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { BsFillBagCheckFill } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';
import agrlogo from '../../public/assets/agr-logo.png'
import bg from "../../public/assets/bg-1.jpg"

const AdminSidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(window.innerWidth > 568);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 568);

    const navigate = useNavigate();

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const handleResize = () => {
        const isMobileView = window.innerWidth < 568;
        setIsMobile(isMobileView);
        setIsOpen(!isMobileView);
    };

    const handleMenuClick = () => {
        if (isMobile) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItem = [
        {
            path: "/adminDashboard",
            name: "Overview",
            icon: <MdWindow />
        },
        {
            path: "/membersDetails",
            name: "Members Details",
            icon: <IoListSharp />
        },
        {
            path: "/vendorDetails",
            name: "Vendor Details",
            icon: <MdLibraryAdd />
        },
        {
            path: "/addNewVendor",
            name: "Add New Vendor",
            icon: <MdLibraryAdd />
        },
        {
            path: "/adminDepartment",
            name: "Departments",
            icon: <MdLibraryAdd />
        },
        {
            path: "/adminWallet",
            name: "Wallet",
            icon: <GiWallet />
        },
        {
            path: "/adminPayHistory",
            name: "Payment History",
            icon: <LuListChecks />
        },
        {
            path: "/adminOrderStatus",
            name: "Order Status",
            icon: <BsFillBagCheckFill />
        },
        {
            name: "Logout",
            icon: <RiLogoutCircleRLine />,
            action: () => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/adminLogin");
            }
        },
    ];


    return (
        <div className="flex w-full bg-fixed" style={{backgroundImage: `url(${bg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover",}}>
            <div
                style={{
                    width: isOpen ? (isMobile ? "100%" : "250px") : "40px",
                    minWidth: isOpen ? (isMobile ? "100%" : "250px") : "40px"
                }}
                className="border-r border-cyan-400 bg-[rgba(0,0,0,0.4)] min-h-screen text-white transition-all duration-500 fixed z-10 shadow-md shadow-gray-600"
            >
                <div className="top_section flex items-center py-[20px] pb-8 border-b border-cyan-400 " style={{ marginBottom: isOpen ? "20px" : "60px" }}>
                    <img src={agrlogo} alt="" style={{ display: isOpen ? "block" : "none" }} className="logo w-[85px] sm:w-[100px] ml-14 sm:ml-16 mt-5" />
                    <div style={{ marginTop: isOpen ? "15px" : "30px", fontSize: isOpen ? "30px" : "25px", marginLeft: isOpen ? "16px" : "7px" }} className="bars flex justify-center items-center text-3xl cursor-pointer hover:text-blue-400 absolute">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        item.path ? (
                            <NavLink
                                to={item.path}
                                key={index}
                                className="link flex items-center py-[8px] px-[18px] gap-[15px] text-cyan-400 hover:bg-gradient-to-r from-cyan-500 to-transparent hover:text-white transition-all duration-500 mb-5 "
                                activeClassName="active"
                                style={{ justifyContent: isOpen ? "start" : "center" }}
                                onClick={handleMenuClick}
                            >
                                <div className="icon" style={{ fontSize: isOpen ? "25px" : "20px" }}>{item.icon}</div>
                                <div style={{ display: isOpen ? "block" : "none" }} className="link_text text-md text-white font-semibold hover:text-white tracking-wider">{item.name}</div>
                            </NavLink>
                        ) : (
                            <button
                                onClick={() => {
                                    item.action();
                                    handleMenuClick();
                                }}
                                key={index}
                                className="link flex items-center py-[10px] px-[18px] gap-[15px] text-cyan-400 hover:bg-gradient-to-r from-cyan-500 to-transparent hover:text-white transition-all duration-500 mb-5"
                                style={{ justifyContent: isOpen ? "start" : "center", width: '100%',  border: 'none', cursor: 'pointer' }}
                            >
                                <div className="icon" style={{ fontSize: isOpen ? "25px" : "20px" }}>{item.icon}</div>
                                <div style={{ display: isOpen ? "block" : "none", }} className="link_text text-md text-white font-semibold hover:text-white">{item.name}</div>
                            </button>
                        )
                    ))
                }
            </div>
            <div className={`main-container w-full transition-all duration-500 ${isOpen && isMobile ? 'hidden' : ''}`} style={{ overflowY: "auto", marginLeft: isOpen && !isMobile ? "250px" : "40px",  }}>
                <main className='w-full'>{children}</main>
            </div>
        </div>
    );
};

export default AdminSidebar;
