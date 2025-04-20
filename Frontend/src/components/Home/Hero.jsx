import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center px-6">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">
          Find your perfect book match
        </h1>
        <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
          Dive into a world of imagination, knowledge, and discovery with
          handpicked titles that inspire and entertain.
        </p>
        <div className="mt-8">
          <Link
            to="/all-books"
            className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-8 py-3 rounded-full hover:bg-yellow-100 hover:text-zinc-800 transition-all duration-300"
          >
            Explore Books
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-full flex items-center justify-center">
        <img src={"hero.jpg"} alt="hero" className="w-5/6 lg:60" />
      </div>
    </div>
  );
};

export default Hero;
