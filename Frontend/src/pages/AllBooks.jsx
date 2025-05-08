import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";
const AllBooks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/get-all-books`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching recent books:", error);
      }
    };

    fetchBooks();
  }, []);
  return (
    <div className="bg-zinc-900 px-12 h-auto py-8">
      <h4 className="text-3xl text-yellow-100">All books</h4>
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {!data && (
          <div className="w-full h-screen flex items-center justify-center">
            <Loader />
          </div>
        )}
        {data &&
          data.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
