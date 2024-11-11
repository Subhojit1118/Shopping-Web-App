import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import AuthLayout from "./components/auth/Layout";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashboard from "./pages/admin-view/Dashboard";
import AdminProducts from "./pages/admin-view/Products";
import AdminOrders from "./pages/admin-view/Orders";
import AdminFeatures from "./pages/admin-view/Features";
import UserLayout from "./components/user-view/Layout";
import NotFound from "./pages/Error/NotFound";
import UserHome from "./pages/user-view/Home";
import UserListing from "./pages/user-view/Listing";
import UserAccount from "./pages/user-view/Account";
import UserCheckout from "./pages/user-view/Checkout";
import CheckAuth from "./components/common/CheckAuth";
import UnAuth from "./pages/Error/UnAuth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          {/* auth route */}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          {/* admin route */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>
          {/* user route */}
          <Route
            path="/user"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <UserLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<UserHome />} />
            <Route path="listing" element={<UserListing />} />
            <Route path="account" element={<UserAccount />} />
            <Route path="checkout" element={<UserCheckout />} />
          </Route>
          {/* error route */}
          <Route path="unauth-page" element={<UnAuth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
