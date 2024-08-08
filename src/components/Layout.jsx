import { Outlet } from 'react-router-dom';
import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";
import '../App.css'

const Layout = () => {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="leftside">
          <Outlet /> {/* This will render child routes */}
        </div>
      </div>
    </>
  );
};

export default Layout;
