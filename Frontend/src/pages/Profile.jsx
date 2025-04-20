import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/Profile/SideBar";
import Loader from "../components/Loader/Loader.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
import MobileNav from "../components/Profile/MobileNav.jsx";

const Profile = () => {
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const headers = {
          id: userId,
          authorization: `Bearer ${token}`,
        };
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-user-information",
          { headers }
        );

        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, [userId, token]);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row gap-4 py-8 text-white">
      {!profile ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <SideBar data={profile} />
            <MobileNav />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
