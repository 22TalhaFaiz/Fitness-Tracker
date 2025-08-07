import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";

const UserProfileCard = ({ user = {} }) => {
const [userName, setUserName] = useState("");
  const { Username = "Summer", weight = "53 kg", height = "162 cm", bloodType = "O+" } = user;

  useEffect(() => {
    axios
      .get("http://localhost:3008/api/auth/me", { withCredentials: true })
      .then((res) => {
        setUserName(res.data?.user?.name || "");
      })
      .catch((err) => {
        console.error("User fetch failed:", err);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-800 text-white rounded-2xl shadow-xl p-6 border border-neutral-700"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Profile</h2>
        <button className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1">
          <FaUserEdit />
          Edit
        </button>
      </div>

      <div className="space-y-2 text-sm text-neutral-300">
        <p><span className="font-semibold text-white">Name:</span> {userName ? `${userName}!` : "Unknown"}</p>
        <p><span className="font-semibold text-white">Weight:</span> {weight}</p>
        <p><span className="font-semibold text-white">Height:</span> {height}</p>
        <p><span className="font-semibold text-white">Blood Type:</span> {bloodType}</p>
      </div>
    </motion.div>
  );
};

export default UserProfileCard;
