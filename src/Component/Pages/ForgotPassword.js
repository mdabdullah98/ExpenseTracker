import React, { useRef } from "react";
import styled from "styled-components";
import { AiOutlineMail } from "react-icons/ai";
import { CustomContext } from "../UI/ContextProvider";

const ligthCoral = "rgb(243, 236, 236)";
const Wrapper = styled.section`
  width: 95%;
  margin: 0 auto;
  .main-outer-from-div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form {
    width: 50%;
    padding: 1rem 0.8rem;
    .input-div {
      width: 100%;
      border: 0.5px solid black;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      border: 1px solid blue;

      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        border-radius: 1rem;
        padding: 0.8rem 1rem;
        background: transparent;
      }
    }
  }
`;
const ForgotPassword = () => {
  const crtx = CustomContext();
  const resetEmailref = useRef();

  const onSumbitHandler = (e) => {
    e.preventDefault();
    const resetEmailrefValue = resetEmailref.current.value;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCJ4FBv5R4Je6SGOblyCuuDVw0_EUaza60";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: resetEmailrefValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
        alert("email sent");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <Wrapper>
        <div className="main-outer-from-div">
          <form action="" onSubmit={onSumbitHandler}>
            <h3 className="h1 text-capitalize mt-3">Forgot your password</h3>
            <p className="mt-2">
              No problem you can reset your password using your email
            </p>
            <div className="input-div">
              <AiOutlineMail className="fs-4 mx-2" />
              <input
                type="email"
                name="email"
                id="password"
                required
                placeholder="email here"
                ref={resetEmailref}
              />
            </div>
            <button className="btn btn-outline-info mt-4" type="submit">
              Send Link
            </button>
          </form>
        </div>
      </Wrapper>
    </>
  );
};

export default ForgotPassword;
