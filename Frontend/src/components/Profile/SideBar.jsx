import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { authactions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
const SideBar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const onclick = () => {
    dispatch(authactions.logout());
    dispatch(authactions.changeRole("user"));
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role");
    history("/");
  };
  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto w-full lg:h-[100%">
      {/* Profile Image & Info */}
      <div className="flex flex-col items-center w-full">
        <img
          src={data.avatar}
          alt="User Avatar"
          className="h-20 w-20 rounded-full border-2 border-zinc-600 object-cover shadow-md"
        />
        <p className="mt-3 text-xl text-white font-semibold">{data.username}</p>
        <p className="mt-1 text-sm text-zinc-400">{data.email}</p>
      </div>

      {/* Divider */}
      <div className="w-full mt-6 h-[1px] bg-zinc-600"></div>

      {/* Navigation Links */}
      {role === "user" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Settings
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Add Book
          </Link>
        </div>
      )}
      <button
        className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
        onClick={onclick}
      >
        Log Out
        <FaArrowRightFromBracket className="ms-4" />
      </button>
    </div>
  );
};

export default SideBar;
