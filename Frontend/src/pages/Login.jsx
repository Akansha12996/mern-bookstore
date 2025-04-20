import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authactions } from "../store/auth";
import { useDispatch } from "react-redux";
const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      if (values.username === "" || values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/sign-in",
          values
        );
        dispatch(authactions.login());
        dispatch(authactions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-zinc-800 rounded-lg px-8 py-6 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl font-semibold">Login</p>
        <form className="mt-4" autoComplete="off" onSubmit={submit}>
          <div>
            <label className="text-zinc-400">Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="username"
              name="username"
              value={values.username}
              required
              onChange={change}
              autoComplete="off"
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Password</label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="password"
              name="password"
              required
              value={values.password}
              onChange={change}
              autoComplete="new-password"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
            >
              LogIn
            </button>
          </div>
        </form>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>
        <p className="flex mt-2 items-center justify-center text-zinc-500">
          Don't have an account?&nbsp;
          <Link to="/signup" className="text-blue-500">
            <u>Sign Up</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
