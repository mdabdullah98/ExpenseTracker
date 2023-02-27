import React, { useState, createContext, useContext, useEffect } from "react";
import { json } from "react-router-dom";
const contextApi = createContext({
  token: "",
  login: (token) => {},
  logout: () => {},
  isLoggedIn: false,
  userData: {
    displayName: "",
    photoUrl: "",
    email: "",
    createdAt: "",
  },
  listenInputs: (e) => {},
  postDataHandler: (e) => {},
  editExpenseHandler: (item) => {},
  deletEpenseHandler: (id) => {},
  fetchDataHandler: () => {},
  //these all are useState
  isError: "",
  feedback: "",
  isLoading: "",
  edit: "",
  items: "",
  expense: "",
  //total amount spend
  getpremiuim: () => {},
  premiuim: "",
});

let logoutTimer;
//helper function for the auto-logout , so it will logout the user automatically after 1 hour of login
const calculateRemainigTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjustedTime = new Date(expirationTime).getTime();

  const remainingTime = adjustedTime - currentTime;
  return remainingTime;
};
const retrieveValidToken = () => {
  const storedToken = localStorage.getItem("token");
  const getExpirationTime = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainigTime(getExpirationTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const ContextProvider = ({ children }) => {
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    catagory: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isError, setISError] = useState(null);
  const [items, setItems] = useState([]);
  const [feedback, setfeeback] = useState("");

  let tokenData = retrieveValidToken();
  let initalToken;
  if (tokenData) {
    initalToken = tokenData.token;
  }
  const [token, setToken] = useState(initalToken);
  //geting stored data from local storage and updatin userdata usestate
  let data = JSON.parse(localStorage.getItem("data"));

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("data");
    setItems([]);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (token, expirationTime, data) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainigTime(expirationTime);
    localStorage.setItem("data", JSON.stringify(data));
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };
  //get data from localstorage
  const mydataFromStorage = JSON.parse(localStorage.getItem("data"));
  //this is the object where we will store all the obj values

  //posting data accoding to user email id
  const userEmailFunc = () => {
    if (!!token) {
      const userEmail = JSON.parse(localStorage.getItem("data"));
      const removeGmail = userEmail.email.replace(/@gmail.com/gi, "");
      return removeGmail;
    }
    return;
  };
  const userEmail = userEmailFunc();

  const postExpenseToFirebase = (e) => {
    e.preventDefault();
    //setError for Error handling
    setISError(null);
    let url;
    if (!!token) {
      if (!edit) {
        setisLoading(true);
        url = `https://expense-tracker-4a347-default-rtdb.firebaseio.com/expense-tracker/${userEmail}.json`;

        const setHeader = {
          method: "POST",
          body: JSON.stringify({
            amount: expense.amount,
            description: expense.description,
            catagory: expense.catagory,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };

        fetch(url, setHeader)
          .then((res) => {
            setisLoading(false);
            if (!res.ok) {
              return res.json().then((data) => {
                throw new Error(data.error.message);
              });
            }
            return res.json();
          })
          .then((data) => {
            const updatedItems = {
              id: data.name,
              amount: expense.amount,
              description: expense.description,
              catagory: expense.catagory,
            };
            setItems((prev) => {
              return [...prev, updatedItems];
            });
          })
          .catch((err) => {
            setISError(err.message);
          });
        e.target.reset();
      } else {
        // this else section for sendin gput request if the user add expense incorrectly se he can edit it later
        url = `https://expense-tracker-4a347-default-rtdb.firebaseio.com/expense-tracker/${userEmail}/${expense.id}.json`;
        fetch(url, {
          method: "PUT",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            setfeeback("expense updated");
            e.target.reset();
            if (!res.ok) {
              throw new Error("something went wrong");
            }
          })
          .catch((err) => {
            setISError(err);
          });

        setEdit(false);
        setTimeout(() => {
          setfeeback("");
        }, 1000);
      }
    } else {
      alert("please login to add expense withould login it would not work");
    }
  };

  ///delete expense handler
  const deletEpenseHandler = async (id) => {
    const url = `https://expense-tracker-4a347-default-rtdb.firebaseio.com/expense-tracker/${userEmail}/${id}.json`;
    const res = await fetch(url, {
      method: "DELETE",
    });
    setfeeback("expense deleted Succesfully ");
    // const data = await res.json();
    const filterItem = items.filter((ele) => {
      return ele.id !== id;
    });
    setItems(filterItem);

    setTimeout(() => {
      setfeeback("");
    }, 1500);
  };

  //edit expense
  const editExpense = (item) => {
    setExpense(item);
    setEdit(true);
  };

  //fecthing data from firebase server
  async function fetchDataHandler() {
    if (!!token) {
      const url = `https://expense-tracker-4a347-default-rtdb.firebaseio.com/expense-tracker/${userEmail}.json`;
      const res = await fetch(url);
      const data = await res.json();
      const dataFomFirebase = [];
      for (let item in data) {
        dataFomFirebase.push({
          id: item,
          amount: data[item].amount,
          description: data[item].description,
          catagory: data[item].catagory,
        });
      }
      //setting items fin local storage
      if (dataFomFirebase[0].amount === undefined) {
        setItems([]);
      } else {
        setItems(dataFomFirebase);
      }
    }
  }

  const authData = {
    token: token,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logoutHandler,
    userData: !!mydataFromStorage ? mydataFromStorage : "",
    listenInputs: (e) => {
      const { name, value } = e.target;
      setExpense((prev) => ({ ...prev, [name]: value }));
    },
    postDataHandler: postExpenseToFirebase,
    deletEpenseHandler: deletEpenseHandler,
    editExpenseHandler: editExpense,
    fetchDataHandler: fetchDataHandler,
    isError: isError,
    feedback: feedback,
    isLoading: isLoading,
    edit: edit,
    items: items,
    expense: expense,
    //total amount spend
    getpremiuim: () => {
      let premiuim = 0;
      if (!!token) {
        const getAmount = items.map((item) => {
          return +item.amount;
        });

        getAmount.forEach((item) => {
          premiuim = premiuim += item;
        });
      }
      return premiuim;
    },
    premiuim: 10000,
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData]);

  return <contextApi.Provider value={authData}>{children}</contextApi.Provider>;
};

const CustomContext = () => {
  return useContext(contextApi);
};
export { ContextProvider, CustomContext };
