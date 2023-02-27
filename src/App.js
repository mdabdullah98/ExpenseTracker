import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainheader from "./Component/Mainheader";
import Login from "./Component/Pages/Login";
import Signup from "./Component/Pages/Signup";
import Profile from "./Component/Pages/Profile";
import { CustomContext } from "./Component/UI/ContextProvider";
import Home from "./Component/Home/Home";
import About from "./Component/About/About";
import ForgotPassword from "./Component/Pages/ForgotPassword";
import Premium from "./Component/Premium";

import "./App.css";

const App = () => {
  
  //usecontext section
  const crtx = CustomContext();
  const isLoggedIn = crtx.isLoggedIn;
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Mainheader />}>
            <Route index element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            {!isLoggedIn && <Route path="/login" element={<Login />}></Route>}
            {!isLoggedIn && <Route path="/signup" element={<Signup />}></Route>}
            {isLoggedIn && (
              <Route path="/profile" element={<Profile />}></Route>
            )}
            <Route path="/premium" element={<Premium />}></Route>
            <Route path="*" element={<Home />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
