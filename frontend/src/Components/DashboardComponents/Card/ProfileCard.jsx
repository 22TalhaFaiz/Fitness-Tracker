import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserEdit, FaUser, FaWeight, FaRuler, FaTint, FaStar, FaTrophy, FaFire } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfileCard = ({ user = {} }) => {
  const [profileData, setProfileData] = useState({
    name: "",
    weight: "",
    height: "",
    bloodType: "",
    age: "",
    gender: "",
    activityLevel: "",
    profilePicture: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3008/api/profile', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const userData = await response.json();

        // Set the profile data from the API response
        setProfileData({
          name: userData.name || "",
          weight: userData.weight ? `${userData.weight} kg` : "Not set",
          height: userData.height ? `${userData.height} cm` : "Not set",
          bloodType: userData.bloodType || "Not set",
          age: userData.age || "",
          gender: userData.gender || "",
          activityLevel: userData.activityLevel || "",
          profilePicture: userData.profilePicture || ""
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Profile fetch failed:", error);
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Calculate BMI (example calculation)
  const weightNum = parseFloat(profileData.weight);
  const heightNum = parseFloat(profileData.height) / 100; // convert cm to m
  const bmi = weightNum && heightNum ? (weightNum / (heightNum * heightNum)).toFixed(1) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-neutral-800/80 to-neutral-900/90 backdrop-blur-sm text-white rounded-2xl shadow-2xl border border-neutral-700/50 overflow-hidden hover:shadow-3xl transition-all duration-500"
    >
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 border-b border-neutral-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <FaUser className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">My Profile</h2>
              <p className="text-xs text-neutral-300">Personal Information</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-lg transition-all duration-200"
          >
            <Link to="/dashboard/profile">
              <FaUserEdit className="text-sm" />
            </Link>
          </motion.button>
        </div>

        {/* Profile Avatar Section */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            {isLoading ? (
              <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
            ) : profileData.profilePicture ? (
              <img
                src={profileData.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <FaUser className="text-white text-2xl" />
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-neutral-800 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">
            {profileData.name ? `Hello, ${profileData.name}!` : "Welcome!"}
          </h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-xs text-green-300 font-medium">Active Member</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-4 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <FaWeight className="text-blue-400 text-lg" />
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Weight</span>
            </div>
            <p className="text-xl font-bold text-white">{profileData.weight}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-4 rounded-xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <FaRuler className="text-green-400 text-lg" />
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Height</span>
            </div>
            <p className="text-xl font-bold text-white">{profileData.height}</p>
          </motion.div>
        </div>

        {/* Additional Stats */}
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl border border-red-500/20 hover:border-red-400/40 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <FaTint className="text-red-400 text-lg" />
              <div>
                <p className="text-sm font-medium text-white">Blood Type</p>
                <p className="text-xs text-neutral-400">Medical Info</p>
              </div>
            </div>
            <span className="text-lg font-bold text-red-400">{profileData.bloodType}</span>
          </motion.div>

          {bmi && (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">BMI</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Body Mass Index</p>
                  <p className="text-xs text-neutral-400">Health Metric</p>
                </div>
              </div>
              <span className="text-lg font-bold text-purple-400">{bmi}</span>
            </motion.div>
          )}
        </div>

        {/* Achievement Section */}
        <div className="mt-6 pt-6 border-t border-neutral-700/50">
          <div className="flex items-center gap-2 mb-4">
            <FaTrophy className="text-yellow-400 text-sm" />
            <h4 className="text-sm font-semibold text-white">Quick Stats</h4>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <FaFire className="text-orange-400 text-lg" />
              </div>
              <div className="text-lg font-bold text-orange-400">7</div>
              <div className="text-xs text-neutral-400">Streak Days</div>
            </div>
            <div className="text-center border-x border-neutral-700/50">
              <div className="flex items-center justify-center mb-2">
                <FaTrophy className="text-yellow-400 text-lg" />
              </div>
              <div className="text-lg font-bold text-yellow-400">12</div>
              <div className="text-xs text-neutral-400">Achievements</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-lg font-bold text-blue-400">85%</div>
              <div className="text-xs text-neutral-400">Goal Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </motion.div>
  );
};

export default UserProfileCard;