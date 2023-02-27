import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [feedback, setfeedback] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  //usecontext section
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const emailRefValue = emailRef.current.value;
    const passwordRefValue = passwordRef.current.value;
    const confirmPasswordRefValue = confirmPasswordRef.current.value;

    //doning empty of setfeedback prev state
    setfeedback("");

    if (passwordRefValue === confirmPasswordRefValue) {
      setIsloading(true);
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJ4FBv5R4Je6SGOblyCuuDVw0_EUaza60";
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
            setfeedback("account is created succesfully ");
            setTimeout(() => {
              setfeedback("");
              e.target.reset();
              navigate("/login");
            }, 2000);
            return res.json();
          } else {
            return res.json().then((data) => {
              throw new Error(data.error.message);
            });
          }
        })
        .then((data) => {})
        .catch((err) => {
          setfeedback(err.message);
        });
    } else {
      setfeedback("Password do not Match");
    }
  };
  return (
    <>
      <div className="main-form-div">
        <div className="form-div-sec">
          <form
            action=""
            className="expense_sign_up_login-form"
            onSubmit={onSubmitHandler}
          >
            <h5 className="display-6 mb-5">Sign Up</h5>
            <div className="expense-form-inputs">
              <input
                type="emial"
                name="email"
                required
                placeholder="Email"
                ref={emailRef}
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
              <input
                className="mb-3"
                type="password"
                name="confirm-password"
                placeholder="confrim password"
                minLength={6}
                maxLength={10}
                ref={confirmPasswordRef}
                required
              />
              <br />
            </div>
            <div className="my-2 bg-danger text-light">{feedback}</div>
            {isLoading && <div className="loader"></div>}
            <button className="btn-info submit-button" type="submit">
              Sign up
            </button>
          </form>
          <div className="have-an-account mt-3">
            <Link to={"/login"}>login with existin account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
