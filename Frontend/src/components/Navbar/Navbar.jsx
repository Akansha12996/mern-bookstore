import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  if (isLoggedIn === true && role === "admin") {
    links.splice(3, 1);
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }

  const [mobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="relative flex bg-zinc-800 text-white px-4 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
        </Link>
        <div className="text-2xl font-semibold">
          <h1>Book Store</h1>
        </div>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((item, i) => (
              <div className="flex items-center" key={i}>
                {item.title === "Profile" || item.title === "Admin Profile" ? (
                  <Link
                    to={item.link}
                    className="px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <Link
                    to={item.link}
                    className="hover:text-blue-500 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {!isLoggedIn && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/login"
                className="px-8 text-lg font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition duration-300"
              >
                SignIn
              </Link>
              <Link
                to="/signup"
                className="px-8 text-lg font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                SignUp
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() =>
              setMobileNav(mobileNav === "hidden" ? "block" : "hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${
          mobileNav === "hidden" ? "hidden" : "flex"
        } bg-zinc-800 h-screen top-0 left-0 w-full z-40 flex-col items-center justify-center`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
            key={i}
            onClick={() => setMobileNav("hidden")}
          >
            {item.title}
          </Link>
        ))}

        {!isLoggedIn && (
          <>
            <Link
              to="/login"
              className="px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition duration-300"
              onClick={() => setMobileNav("hidden")}
            >
              SignIn
            </Link>
            <Link
              to="/signup"
              className="px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={() => setMobileNav("hidden")}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
