import "./style.css";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const loginCredential = { username: "foo", password: "bar" };

export default function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (!username) {
      return setLoginError("Enter a username");
    }
    if (!password) {
      return setLoginError("Enter a password");
    }
    if (username !== loginCredential.username) {
      return setLoginError("User not found");
    }
    if (password !== loginCredential.password) {
      return setLoginError("Wrong password");
    }

    dispatch({ type: "LOGIN", payload: { username } });
    Cookies.set("user", JSON.stringify({ username }));
    navigate("/home");
  };
  return (
    <form
      onSubmit={(e) => {
        submit(e);
      }}
    >
      <div className="login_header">Login</div>
      {loginError && <div className="error">{loginError}</div>}
      <div className="input_wrap">
        <input
          placeholder="Username"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
