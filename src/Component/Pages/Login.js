import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomContext } from "../UI/ContextProvider";
import "./Signup_Login.css";

const Login = () => {
  const [feedback, setfeedback] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  //react-router-dom method and function
  const navigate = useNavigate();

  // useContext Section
  const crtx = CustomContext();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const emailRefValue = emailRef.current.value;
    const passwordRefValue = passwordRef.current.value;

    // fecthing section posting data while creating and login
    setfeedback("");
    setIsloading(true);
    if (emailRef && passwordRef) {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJ4FBv5R4Je6SGOblyCuuDVw0_EUaza60";

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailRefValue,
          password: passwordRefValue,
          returnSecureToken: true,
        }),
      })
        .then((res) => {
          setIsloading(false);
          if (res.ok) {
            setfeedback("Login sucessfully");
            navigate("/");
            return res.json();
          } else {
            return res.json().then((data) => {
              throw new Error(data.error.message);
            });
          }
        })
        .then((data) => {
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          crtx.login(data.idToken, expirationTime.toISOString(), data);
        })
        .catch((err) => {
          setfeedback(err.message);
        });
    }
  };
  // fetch request for storing user email and password after succesfully account created

  return (
    <>
      <div className="main-form-div">
        <div className="form-div-sec">
          <form
            action=""
            className="expense_sign_up_login-form"
            onSubmit={onSubmitHandler}
          >
            <h5 className="display-6 mb-5">Login</h5>
            <div className="expense-form-inputs">
              <input
                type="emial"
                name="email"
                placeholder="Email"
                ref={emailRef}
                required
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="password"
                minLength={6}
                maxLength={10}
                ref={passwordRef}
                required
              />
              <br />
            </div>
            <Link
              to={"/forgot-password"}
              className="text-primary fs-6 text-decoration-none my-1"
            >
              Forgot Password ?
            </Link>
            <div className="my-2 bg-danger text-light">{feedback}</div>
            {isLoading && <div className="loader"></div>}
            <button className="btn-info submit-button" type="submit">
              Login
            </button>
          </form>
          <div className="have-an-account mt-3">
            <span className="m-0">dont't have an account ? </span>
            <Link to={"/signup"}>Signup</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
