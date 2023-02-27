import React, { useEffect } from "react";
import FunctionHandler from "./ExpenseFunctionHandler";
import { Link } from "react-router-dom";
import { CustomContext } from "../UI/ContextProvider";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
const Wrapper = FunctionHandler.Wrapper;

const Expenses = () => {
  const mode = useSelector((state) => state.toggle);
  // component state ,usecontext and react-router-dom function and method  goes here

  //use context section
  const crtx = CustomContext();
  const isLoggedIn = crtx.isLoggedIn;
  const displayName = isLoggedIn ? crtx.userData.displayName : "";
  const premiumUser = crtx.getpremiuim();
  //useeffect for the fecthhandler;

  useEffect(() => {
    crtx.fetchDataHandler();
  }, []);
  //all logic and function related to component  goes here
  const onchangeHandler = (e) => {
    crtx.listenInputs(e);
  };

  const addExpenseHandlerPostRequest = (e) => {
    crtx.postDataHandler(e);
  };

  //get request to get data from the firebase  realtime datebase

  const deletEpense = (id) => {
    crtx.deletEpenseHandler(id);
  };

  //edit expense
  const editExpense = (item) => {
    crtx.editExpenseHandler(item);
  };

  const displayExpense = () => {
    crtx.fetchDataHandler();
  };
  return (
    <>
      <div
        className={`bg-${mode ? "dark" : "light"}  text-${
          mode ? "light" : "dark"
        } wrapper-parent`}
      >
        <Wrapper>
          <div className="welcome-profile-updatation">
            <div>
              <i>Welcome to Expense Tracker !!!</i>
            </div>

            {isLoggedIn && !displayName && (
              <div className="complete-profile">
                Your profile is incomeplete{" "}
                <i>
                  <Link to={"/profile"}>Complete now</Link>
                </i>
              </div>
            )}
            <div>
              {isLoggedIn && premiumUser >= crtx.premiuim && (
                <Link to={"/premium"}>
                  <button className="btn btn-outline-danger">
                    Activate Premium
                  </button>
                </Link>
              )}
            </div>
          </div>
          {!isLoggedIn && (
            <h3 className=" alert alert-danger mt-5">
              To add Expense or to display your previous added expenses that
              will display only after succesfull login
            </h3>
          )}
          {isLoggedIn && (
            <form
              action=""
              className="w-100 mt-4"
              onSubmit={addExpenseHandlerPostRequest}
            >
              <div className="expense-grid ">
                <div className="expense_grid_child">
                  <label htmlFor="amount">Amount spent</label>
                  <input
                    type="text"
                    placeholder="$amount"
                    id="amount"
                    name="amount"
                    onChange={onchangeHandler}
                    required
                    value={crtx.expense.amount}
                  />
                </div>

                <div className="expense_grid_child">
                  <label htmlFor="description">Expense Description</label>
                  <input
                    type="text"
                    placeholder="expense description"
                    id="description"
                    name="description"
                    onChange={onchangeHandler}
                    required
                    value={crtx.expense.description}
                  />
                </div>
                <div className="expense_grid_child">
                  <label htmlFor="catagory">expense catagory</label>
                  <select
                    name="catagory"
                    id="catagory"
                    onChange={onchangeHandler}
                    required
                    value={crtx.expense.catagory}
                  >
                    <option value="">Select</option>
                    <option value="food">Food</option>
                    <option value="petrol">Petrol</option>
                    <option value="library-fee">Libary Fee</option>
                    <option value="rent">Rent</option>
                    <option value="electricity-bill">Electricity bill</option>
                    <option value="car-parking">Car parking</option>
                    <option value="mobile-recharge">Mobile Recaharge</option>
                    <option value="wifi-bill">Wifi Bill</option>
                  </select>
                </div>
              </div>
              <p className="text-danger fz-5 mt-2">{crtx.isError}</p>
              {crtx.isLoading && (
                <p className="text-danger fw-bold fz-3 my-3">
                  Sending Request ....
                </p>
              )}

              <div className="button-group ">
                <button type="submit" className="btn btn-outline-danger ">
                  Add Expense
                </button>
                <button
                  type="button"
                  className={`btn btn-outline-${mode ? "light" : "info"}`}
                  onClick={displayExpense}
                >
                  display Expense
                </button>
              </div>
            </form>
          )}

          <p className="text-danger text-center my-3">
            {crtx.items.length ? crtx.feedback : ""}
          </p>

          {isLoggedIn &&
            crtx.items.length !== 0 &&
            crtx.items.map((item, i) => {
              return (
                <>
                  <div className="expense-table" key={i}>
                    <div className="w-100 d-flex justify-content-end">
                      <button
                        className="btn btn-sm btn-outline-danger "
                        title="delete"
                        onClick={() => deletEpense(item.id)}
                      >
                        <MdDelete className="text-light" />
                      </button>
                      <button
                        className="btn btn-sm btn-success ms-3"
                        title="edit"
                      >
                        <FiEdit onClick={() => editExpense(item)} />
                      </button>
                    </div>
                    <div
                      className={`box-1 bg-${mode ? "dark" : "light"} text-${
                        mode ? "light" : "dark"
                      }`}
                    >
                      <p>
                        <b>Amount</b> :
                        <span className="text-danger fw-bold fz-3">
                          $ {item.amount}
                        </span>
                      </p>
                      <p>
                        <b>Description</b> : {item.description}
                      </p>
                      <p>
                        <b>Catagoty</b> : {item.catagory}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          {isLoggedIn && crtx.items.length === 0 && <div>No data found</div>}
        </Wrapper>
      </div>
    </>
  );
};

export default Expenses;
