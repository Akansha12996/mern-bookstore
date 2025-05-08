import { useParams, useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching recent books:", error);
      }
    };

    fetchBooks();
  }, []);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourite = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/add-book-to-favourite`,
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/add-to-cart`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  const deleteBook = async () => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/delete-book`,
      { headers }
    );
    alert(response.data.message);
    navigate("/all-books");
  };
  return (
    <>
      {data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-3/6">
            <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 rounded p-12">
              <img
                src={data.url}
                alt="/"
                className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-4">
                  <button
                    className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 text-red-500 flex items-center justify-center "
                    onClick={handleFavourite}
                  >
                    <FaHeart />{" "}
                    <span className="ms-4 block lg:hidden">Favourites</span>
                  </button>
                  <button
                    className="text-white rounded mt-8 md:mt-0 lg:rounded-full text-4xl lg:text-3xl p-3  lg:mt-8 bg-blue-500 flex items-center justify-center"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                    <span className="ms-4 block lg:hidden">Add to cart</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          {isLoggedIn === true && role === "admin" && (
            <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-4">
              <Link
                to={`/updateBook/${id}`}
                className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 text-black flex items-center justify-center "
              >
                <FaEdit /> <span className="ms-4 block lg:hidden">Edit</span>
              </Link>
              <button
                className="text-red rounded lg:rounded-full text-4xl lg:text-3xl p-3 mt-8 lg:mt-8 white flex items-center justify-center"
                onClick={deleteBook}
              >
                <MdOutlineDelete />
                <span className="ms-4 block lg:hidden">Delete Book</span>
              </button>
            </div>
          )}
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {data.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" />
              {data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : ₹ {data.price}
            </p>
          </div>
        </div>
      )}
      {!data && (
        <div>
          <Loader className="h-screen bg-zinc-900 flex items-center justify-center" />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
