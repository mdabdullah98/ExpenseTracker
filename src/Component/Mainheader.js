import React from "react";
import Header from "./UI/Header/Header";
import { Outlet } from "react-router-dom";
const Mainheader = () => {
  return (
    <>
      hi this is test
      <Header />
      <Outlet />
    </>
  );
};

export default Mainheader;
