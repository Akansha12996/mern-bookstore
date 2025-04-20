import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [values, setValues] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_address: "",
  });

  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      if (
        values.user_name === "" ||
        values.user_email === "" ||
        values.user_password === "" ||
        values.user_address === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/sign-up",
          values
        );
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
        <form autoComplete="off" className="mt-4" onSubmit={submit}>
          <div>
            <label className="text-zinc-400">Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="user_name"
              required
              value={values.user_name}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Email</label>
            <input
              type="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="xyz@example.com"
              name="user_email"
              required
              value={values.user_email}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Password</label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="user_password"
              required
              value={values.user_password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Address</label>
            <textarea
              rows="5"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="address"
              name="user_address"
              required
              value={values.user_address}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>
        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Already have an account? &nbsp;
          <Link to="/login" className="hover:text-blue-500">
            <u>Log In</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
