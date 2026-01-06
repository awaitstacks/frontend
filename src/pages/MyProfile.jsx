import React, { useContext, useState } from "react";
import { TourAppContext } from "../context/TourAppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(TourAppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateUserProfileData = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("userId", userData._id);
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-b from-white via-sky-50 to-sky-100 py-12 md:py-20">
        {/* Subtle floating icons */}

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-white/50">
            {/* Header: Profile Image + Name */}
            <div className="text-center mb-10">
              <div className="relative inline-block group">
                {isEdit ? (
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="relative">
                      <img
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-blue-100 transition-all group-hover:ring-blue-300"
                        src={
                          image ? URL.createObjectURL(image) : userData.image
                        }
                        alt="Profile"
                      />
                      <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <img
                          className="w-10"
                          src={assets.upload_icon}
                          alt="Upload"
                        />
                      </div>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </label>
                ) : (
                  <img
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-blue-100 shadow-lg"
                    src={userData.image}
                    alt="Profile"
                  />
                )}
              </div>

              <div className="mt-6">
                {isEdit ? (
                  <input
                    className="w-full max-w-md mx-auto text-2xl md:text-3xl font-bold text-gray-800 bg-white/90 border-2 border-blue-400 rounded-xl px-6 py-4 text-center focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-md"
                    type="text"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Your Full Name"
                    autoFocus
                  />
                ) : (
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                    {userData.name}
                  </h1>
                )}
                <p className="text-gray-600 mt-3 text-lg">{userData.email}</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-10">
              <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-4 text-center lg:text-left">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Email */}
                <div className="flex flex-col items-center lg:items-start gap-5">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-7 h-7 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-800 mt-1 break-all">
                      {userData.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col items-center lg:items-start gap-5">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-7 h-7 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="text-center lg:text-left w-full">
                    <p className="text-sm text-gray-600">Phone</p>
                    {isEdit ? (
                      <input
                        className="w-full max-w-sm mt-3 px-5 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        type="text"
                        value={userData.phone}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <p className="font-semibold text-gray-800 mt-1">
                        {userData.phone || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address - Full width */}
                <div className="lg:col-span-2 flex flex-col items-center lg:items-start gap-5">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-7 h-7 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="w-full text-center lg:text-left">
                    <p className="text-sm text-gray-600">Address</p>
                    {isEdit ? (
                      <div className="mt-4 space-y-4 w-full max-w-xl mx-auto lg:mx-0">
                        <input
                          className="w-full px-5 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                          placeholder="Line 1 (House no., Street, Landmark)"
                          value={userData.address?.line1 || ""}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              address: {
                                ...prev.address,
                                line1: e.target.value,
                              },
                            }))
                          }
                        />
                        <input
                          className="w-full px-5 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                          placeholder="Line 2 (Area, City, State, PIN)"
                          value={userData.address?.line2 || ""}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              address: {
                                ...prev.address,
                                line2: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                    ) : (
                      <p className="font-semibold text-gray-800 mt-2 leading-relaxed">
                        {userData.address?.line1 ? (
                          <>
                            {userData.address.line1}
                            <br />
                            {userData.address.line2 || ""}
                          </>
                        ) : (
                          "Not provided"
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="space-y-10 mt-12">
              <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-4 text-center lg:text-left">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Gender */}
                <div className="flex flex-col items-center lg:items-start gap-5">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-7 h-7 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-center lg:text-left w-full">
                    <p className="text-sm text-gray-600">Gender</p>
                    {isEdit ? (
                      <select
                        className="w-full max-w-sm mt-3 px-5 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        value={userData.gender || ""}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="font-semibold text-gray-800 mt-1">
                        {userData.gender || "Not specified"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col items-center lg:items-start gap-5">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-7 h-7 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-center lg:text-left w-full">
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    {isEdit ? (
                      <input
                        className="w-full max-w-sm mt-3 px-5 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        type="date"
                        value={userData.dob || ""}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            dob: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="font-semibold text-gray-800 mt-1">
                        {userData.dob
                          ? new Date(userData.dob).toLocaleDateString("en-IN")
                          : "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center mt-14">
              {isEdit ? (
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <button
                    onClick={updateUserProfileData}
                    disabled={isLoading}
                    className={`px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-xl ${
                      isLoading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:shadow-2xl hover:scale-105"
                    }`}
                  >
                    {isLoading ? "Saving Changes..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => {
                      setIsEdit(false);
                      setImage(false);
                      loadUserProfileData();
                    }}
                    disabled={isLoading}
                    className="px-12 py-4 border-2 border-gray-400 text-gray-700 font-bold text-lg rounded-full hover:bg-gray-100 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading Spinner Overlay */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-10 shadow-2xl flex flex-col items-center gap-6">
              <div className="w-16 h-16 border-6 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xl text-gray-700 font-medium">
                Saving your changes...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating animation & glass styles */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-40px) rotate(8deg);
          }
        }
        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </>
  );
};

export default MyProfile;
