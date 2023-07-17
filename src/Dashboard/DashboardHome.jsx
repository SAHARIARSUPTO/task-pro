import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Home/Navbar";
import RouterSidebar from "./RouterSideBar";
import Footer from "../Home/Footer";

const DashboardHome = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar></Navbar>
      <div className="grid grid-cols-1 sm:flex">
        <div>
          <RouterSidebar className="h-auto"></RouterSidebar>
        </div>
        <div>
          {location.pathname === "/dashboard" ? (
            <div>
            <p className="text-center text-2xl mx-auto ms-5 font-extrabold  lg:text-4xl">Welcome to TaskPro Dashboard</p>
            </div>
            
          ) : (
            <Outlet className="w-full"></Outlet>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardHome;
