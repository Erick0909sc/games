import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layaout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layaout;
