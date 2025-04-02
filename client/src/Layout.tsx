import React from "react";
import Navbar from "./components/navbarComponents/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="main-div" className="flex h-screen bg-base-200 ">
      <Navbar />
      <div id="content-div" className="flex-1 flex bg-base-300 overflow-hidden ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
