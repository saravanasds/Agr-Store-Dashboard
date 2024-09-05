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

const VendorSidebar = ({ children }) => {
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
            path: "/vendorDashboard",
            name: "Overview",
            icon: <MdWindow />
        },
        {
            path: "/productList",
            name: "Product List",
            icon: <IoListSharp />
        },
        {
            path: "/addProduct",
            name: "Add Product",
            icon: <MdLibraryAdd />
        },
        {
            path: "/currentOrders",
            name: "Current Orders",
            icon: <LuListChecks />
        },
        {
            path: "/completedOrders",
            name: "Completed Orders",
            icon: <LuListChecks />
        },
        {
            path: "/vendorWallet",
            name: "Wallet",
            icon: <GiWallet />
        },
        {
            path: "/vendorPayHistory",
            name: "Payment History",
            icon: <LuListChecks />
        },
        // {
        //     path: "/vendorOrderStatus",
        //     name: "Order Status",
        //     icon: <BsFillBagCheckFill />
        // },
        {
            name: "Logout",
            icon: <RiLogoutCircleRLine />,
            action: () => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("vendorEmail");
                localStorage.removeItem("vendorCommision");
                navigate("/");
            }
        },
    ];


    return (
        <div className="flex w-full">
            <div
                style={{
                    width: isOpen ? (isMobile ? "100%" : "250px") : "40px",
                    minWidth: isOpen ? (isMobile ? "100%" : "250px") : "40px"
                }}
                className="sidebar bg-gray-950 min-h-screen text-white transition-all duration-500 fixed z-10 border-r-2 border-gray-700"
            >
                <div className="top_section flex items-center py-[20px] pb-8 border-b-2 border-gray-800 " style={{ marginBottom: isOpen ? "20px" : "60px" }}>
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
                                className="link flex items-center py-[10px] px-[18px] gap-[15px] text-cyan-400 hover:bg-gradient-to-r from-cyan-700 to-transparent hover:text-white transition-all duration-500 mb-5 "
                                activeClassName="active"
                                style={{ justifyContent: isOpen ? "start" : "center" }}
                                onClick={handleMenuClick}
                            >
                                <div className="icon" style={{ fontSize: isOpen ? "25px" : "20px" }}>{item.icon}</div>
                                <div style={{ display: isOpen ? "block" : "none" }} className="link_text text-md text-gray-200 font-semibold hover:text-white">{item.name}</div>
                            </NavLink>
                        ) : (
                            <button
                                onClick={() => {
                                    item.action();
                                    handleMenuClick();
                                }}
                                key={index}
                                className="link flex items-center py-[10px] px-[18px] gap-[15px] text-cyan-400 hover:bg-gradient-to-r from-cyan-500 hover:text-cyan-400 transition-all duration-500 mb-5"
                                style={{ justifyContent: isOpen ? "start" : "center", width: '100%', background: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                                <div className="icon" style={{ fontSize: isOpen ? "25px" : "20px" }}>{item.icon}</div>
                                <div style={{ display: isOpen ? "block" : "none" }} className="link_text text-md text-white font-semibold hover:text-white">{item.name}</div>
                            </button>
                        )
                    ))
                }
            </div>
            <div className={`main-container w-full transition-all duration-500 ${isOpen && isMobile ? 'hidden' : ''}`} style={{ overflowY: "auto", marginLeft: isOpen && !isMobile ? "250px" : "40px" }}>
                <main className='w-full'>{children}</main>
            </div>
        </div>
    );
};

export default VendorSidebar;
