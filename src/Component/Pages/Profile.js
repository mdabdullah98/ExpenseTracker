import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { CustomContext } from "../UI/ContextProvider";
import { GoMarkGithub } from "react-icons/go";
import { BsFillImageFill } from "react-icons/bs";

// style component goes here
const ligthCoral = "rgb(247, 228, 228)";
const Wrapper = styled.section`
  width: 90%;
  height: 100%;
  margin: 0 auto;

  .update-profile-info {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 0.6rem 0;
    padding-bottom: 0.8rem;
    border-bottom: 0.5px solid black;

    p:nth-child(2) {
      margin: 0;
      background: ${ligthCoral};
      border-radius: 1rem;
      padding: 0 0.8rem;
    }
  }
  .profile-updation-form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3rem 0;
    padding: 3rem 0;

    form {
      width: 70%;
      padding: 1rem;

      input[type="text"] {
        width: 50%;
        margin-left: 1rem;
        border: 1px solid rgb(208, 204, 204);
        outline: none;

        &:focus {
          background: ${ligthCoral};
        }
      }
    }
  }
`;

const Profile = (props) => {
  const [error, seterror] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  //usecontext section
  const crtx = CustomContext();
  const isLoggedIn = crtx.isLoggedIn;
  const displayName = isLoggedIn ? crtx.userData.displayName : "";
  const profilePicture = isLoggedIn ? crtx.userData.profilePicture : "";
  //react router dom section
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(displayName);
  const [profilePic, setProfilePic] = useState(profilePicture);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    seterror(null);

    if (fullName && profilePic) {
      setIsloading(true);
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCJ4FBv5R4Je6SGOblyCuuDVw0_EUaza60";

      let request_body_payload = {
        method: "POST",
        body: JSON.stringify({
          idToken: crtx.token,
          displayName: fullName,
          photoUrl: profilePic,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(url, request_body_payload)
        .then((res) => {
          setIsloading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              throw new Error(data.error.message);
            });
          }
        })
        .then((data) => {
          crtx.logout();
          navigate("/login");
        })
        .catch((err) => {
          seterror(err.message);
        });
    } else {
      alert("fill them its required");
    }
  };

  // veryEmailHandler
  const veryEmailHandler = () => {
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCJ4FBv5R4Je6SGOblyCuuDVw0_EUaza60";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: crtx.token,
        requestType: "VERIFY_EMAIL",
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
        {isLoggedIn && !displayName && (
          <div className="update-profile-info">
            <p></p>

            <p>
              your profile is 64% completed.A complete profile has higher chance
              of landing a job.
              <span className="text-primary fs-5">Complete now</span>
            </p>
          </div>
        )}
        <div className="profile-updation-form">
          <form action="" className="shadow-lg" onSubmit={onSubmitHandler}>
            <h3 className="h3 my-3 w-100">Update Your Profile </h3>
            <div className="w-100 d-flex justify-content-between align-items-center">
              <h5 className="m-0">Contact Details</h5>
              <Link to={"/"}>
                <button
                  className="btn btn-sm btn-outline-danger "
                  type="button"
                >
                  Cancel
                </button>
              </Link>
            </div>

            <div className="w-100 d-flex justify-content-between align-items-center mt-4">
              {/* for full name feild */}
              <div className="w-50 d-flex">
                <label htmlFor="displayName">
                  <span className="fs-5 me-2 ">
                    <GoMarkGithub />
                  </span>
                  Full Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                />
              </div>
              {/* for full name feild */}

              {/* for photo url feild*/}
              <div className="w-50 d-flex">
                <label htmlFor="photo_url">
                  <span className="fs-5 mx-2 ">
                    <BsFillImageFill />
                  </span>
                  Photo url
                </label>
                <input
                  type="text"
                  name="photo_url"
                  onChange={(e) => setProfilePic(e.target.value)}
                  value={profilePic}
                />
              </div>
              {/* for photo url feild*/}
            </div>
            {isLoading && <p className="mt-3">Updating Profile...</p>}
            <button type="submit" className="btn btn-outline-success mt-4 px-4">
              Update
            </button>
            <button
              type="button"
              className="btn btn-outline-primary mt-4 px-4 ms-5"
              onClick={veryEmailHandler}
            >
              Very Email
            </button>
            <p>{error}</p>
          </form>
        </div>
      </Wrapper>
    </>
  );
};

export default Profile;
