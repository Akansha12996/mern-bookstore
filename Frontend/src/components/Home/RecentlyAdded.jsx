import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-recent-books"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching recent books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {!data && (
          <div className="flex items-center justify-center my-8">
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

export default RecentlyAdded;
