import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VendorSidebar from "./components/VendorSidebar.jsx";
import Overview from "./vendor/Overview.jsx";
import ProductList from "./vendor/ProductList.jsx";
import AddProduct from "./vendor/AddProduct.jsx";
import SalesList from "./vendor/SalesList.jsx";
import OrderStatus from "./vendor/OrderStatus.jsx";
import VendorLogin from "./components/VendorLogin.jsx";


// Admin
import AdminRegister from "./components/AdminRegister.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminSidebar from "./components/AdminSidebar.jsx";
import AdminOverview from "./admin/AdminOverview.jsx";
import MemberDetails from "./admin/MemberDetails.jsx";
import VendorDetails from "./admin/VendorDetails.jsx";
import AddNewVendor from "./admin/AddNewVendor.jsx";
import AdminWallet from "./admin/AdminWallet.jsx";
import PaymentHistory from "./admin/PaymentHistory.jsx";
import AdminOrderStatus from "./admin/AdminOrderStatus.jsx";
import Department from "./admin/Department.jsx";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));

  console.log(role);

  const handleSetRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole); // Store the role in local storage
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []); // Load the role from local storage when the component mounts


  return (
    <Router>
      <Routes>
        <Route path="/" element={<VendorLogin setRole={handleSetRole} />} />
        <Route path="/adminRegister" element={<AdminRegister />} />
        <Route path="/adminLogin" element={<AdminLogin setRole={handleSetRole} />} />
      </Routes>

      {role === "vendor" && (
        <VendorSidebar>
          <Routes>
            <Route path="/vendorDashboard" element={<Overview />} />
            <Route path="/productList" element={<ProductList />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/salesList" element={<SalesList />} />
            <Route path="/vendorOrderStatus" element={<OrderStatus />} />
          </Routes>
        </VendorSidebar>
      )}

      {role === "admin" && (
        <AdminSidebar>
          <Routes>
            <Route path="/adminDashboard" element={<AdminOverview />} />
            <Route path="/membersDetails" element={<MemberDetails />} />
            <Route path="/vendorDetails" element={<VendorDetails />} />
            <Route path="/addNewVendor" element={<AddNewVendor />} />
            <Route path="/adminDepartment" element={<Department />} />
            <Route path="/adminWallet" element={<AdminWallet />} />
            <Route path="/adminPayHistory" element={<PaymentHistory />} />
            <Route path="/adminOrderStatus" element={<AdminOrderStatus />} />
          </Routes>
        </AdminSidebar>
      )}

    </Router>

  );
}

export default App;
