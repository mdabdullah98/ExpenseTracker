import React from "react";
import Header from "./UI/Header/Header";
import { Outlet } from "react-router-dom";
const Mainheader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Mainheader;
