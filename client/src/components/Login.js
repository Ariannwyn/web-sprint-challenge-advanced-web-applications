import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

/////////////////////
//      LOGIN      //
/////////////////////
const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  ///////////////////////////
  //      HANDLE LOGIN     //
  ///////////////////////////

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", credentials)
      .then((res) => {
        window.localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
      })
      .catch((err) => console.log(err));
  };

  /////////////////////////
  //      LOGIN FORM     //
  /////////////////////////

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
