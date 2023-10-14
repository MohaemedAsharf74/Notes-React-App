import Sidebar from "../Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {


  return (
    <>
      <div className={`row d-flex  justify-content-center   `}>
        <div className={`col-md-3 col-8 `}>
          <Sidebar />
        </div>

        <div className={`col-md-9 col-8`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
