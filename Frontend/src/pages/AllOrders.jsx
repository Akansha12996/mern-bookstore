// export default AllOrders;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserLarge, FaCheck } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import Loader from "../components/Loader/Loader";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState("");
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-all-orders",
          { headers }
        );
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []); // Runs only once when component mounts

  const submitChanges = async (i) => {
    const id = allOrders[i]._id;
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/update-status/${id}`,
        values,
        { headers }
      );
      alert(response.data.message);

      // Update local state after successful API call
      setAllOrders((prevOrders) =>
        prevOrders.map((order, index) =>
          index === i ? { ...order, status: values.status } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleChange = (e) => {
    setValues({ status: e.target.value });
  };

  // Create a copy of orders to avoid mutating state directly
  const filteredOrders = allOrders.slice(0, allOrders.length - 1);

  return (
    <>
      {!allOrders.length ? (
        <div className="h-[100%] flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500">
            All Orders
          </h1>

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-4">
            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[40%] md:w-[22%]">Books</div>
            <div className="w-0 md:w-[45%] hidden md:block">Description</div>
            <div className="w-[17%] md:w-[9%]">Price</div>
            <div className="w-[30%] md:w-[16%]">Status</div>
            <div className="w-[10%] md:w-[5%]">
              <FaUserLarge />
            </div>
          </div>

          {filteredOrders.map((item, i) => (
            <div
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300"
              key={i}
            >
              <div className="w-[3%] text-center">{i + 1}</div>
              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`/view-book-details/${item.book_id}`}
                  className="hover:text-blue-300"
                >
                  {item.book.title}
                </Link>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                {item.book.desc.slice(0, 50)} ...
              </div>
              <div className="w-[17%] md:w-[9%]">{item.book.price}</div>

              <div className="w-[30%] md:w-[16%] font-semibold">
                <button
                  className="hover:scale-105 transition-all duration-300"
                  onClick={() => setOptions(i)}
                >
                  {item.status === "Order placed" ? (
                    <span className="text-yellow-500">{item.status}</span>
                  ) : item.status === "Canceled" ? (
                    <span className="text-red-500">{item.status}</span>
                  ) : (
                    <span className="text-green-500">{item.status}</span>
                  )}
                </button>

                {options === i && (
                  <div className="flex mt-4">
                    <select
                      name="status"
                      className="bg-gray-800"
                      onChange={handleChange}
                      value={values.status}
                    >
                      {[
                        "Order placed",
                        "Out for delivery",
                        "Delivered",
                        "Canceled",
                      ].map((status, index) => (
                        <option value={status} key={index}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        setOptions(-1);
                        submitChanges(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                )}
              </div>

              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(item.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {UserActivation && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
