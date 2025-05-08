import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/remove-book-from-favourite`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div>
          <div className="">
            <div className="bg-zinc-900 rounded flex items-center justify-center">
              <img src={data.url} alt={data.title} className="h-[25vh]" />
            </div>
            <h2 className="text-white font-semibold text-xl mt-4">
              {data.title}
            </h2>
            <p className="text-zinc-200 font-semibold mt-2">{data.author}</p>
            <p className="text-zinc-200 font-semibold text-xl mt-2">
              ₹ {data.price}
            </p>
          </div>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveBook}
        >
          Remove from favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;
