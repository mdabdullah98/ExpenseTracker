import React from "react";
import { NavLink, Link } from "react-router-dom";
import { CustomContext } from "../ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { toggleButton } from "../../Store/Slice";
import { BsMoonStars, BsSun } from "react-icons/bs";

import "./Header.css";
const Header = () => {
  const mode = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  //context api section
  const crtx = CustomContext();
  const isLoggedIn = crtx.isLoggedIn;
  const displayName = isLoggedIn ? crtx.userData.displayName : "";

  // const profilePicture = isLoggedIn ? crtx.userData.profilePicture : "";

  const logoutHandler = () => {
    crtx.logout();
  };

  //equation for the premiuim amount for that i used map on items array and then using for loop I itrate each array
  const premiumUser = crtx.getpremiuim();

  const changeMode = () => {
    dispatch(toggleButton());
  };
  return (
    <>
      <section className="section-1st-in-header">
        <nav className="expense-navbar">
          <Link to={"/"} className="navbar_brand">
            <h4>Expense tracker</h4>
          </Link>
          <div className="mynavbar-items">
            <div>
              <NavLink to={"/"}>Home</NavLink>
              <NavLink to={"/about"}>About</NavLink>
            </div>

            <div className="d-flex">
              <div>{!isLoggedIn && <NavLink to={"/login"}>Login</NavLink>}</div>
              <div>
                {isLoggedIn && premiumUser >= crtx.premiuim && (
                  <NavLink to={"/premium"}>Premium</NavLink>
                )}
              </div>
              {/* <div>
                {!isLoggedIn && <NavLink to={"/signup"}>Signup</NavLink>}
              </div> */}
              <div>
                {isLoggedIn && (
                  <NavLink to={"/profile"}>
                    {displayName ? displayName : "Profile"}
                  </NavLink>
                )}
              </div>
              <div>
                {isLoggedIn && (
                  <Link to={"/login"} onClick={logoutHandler}>
                    Logout
                  </Link>
                )}
              </div>
              <div>
                {isLoggedIn && (
                  <button
                    className={`bg-${mode ? "light" : "dark"} text-${
                      mode ? "dark" : "light"
                    }  changeMode ${mode}`}
                    onClick={changeMode}
                  >
                    {mode ? <BsSun /> : <BsMoonStars />}
                    <span className="ms-1">
                      {mode ? "Light Mode" : "Dark mode"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Header;
