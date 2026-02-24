import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(TourAppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully! 🌟");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Welcome back! 💙");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/google-signin",
        {
          idToken: response.credential,
        },
      );

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Logged in with Google! 🌍");
        navigate("/");
      } else {
        toast.error(data.message || "Google login failed");
      }
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
      {/* Glassmorphic Form Box */}
      <form
        onSubmit={onSubmitHandler}
        className="
          relative w-full max-w-[360px] xs:max-w-[380px] sm:max-w-md md:max-w-lg lg:max-w-xl
          backdrop-blur-xl bg-white/30 border border-white/40
          rounded-3xl shadow-2xl shadow-black/10
          p-6 xs:p-8 sm:p-10 md:p-12 lg:p-14
          transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20
          overflow-hidden
        "
      >
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

        <div className="relative z-10 space-y-6 sm:space-y-8">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              {state === "Sign up" ? "Create Your Journey" : "Welcome Back"}
            </h2>
            <p className="text-gray-600 text-sm xs:text-base">
              Please {state === "Sign up" ? "sign up" : "log in"} to continue
              exploring
            </p>
          </div>

          {/* Name field */}
          {state === "Sign up" && (
            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm xs:text-base">
                Full Name
              </label>
              <input
                className="
                  w-full px-4 xs:px-5 py-3 rounded-2xl border border-gray-300/50 
                  bg-white/40 backdrop-blur-sm focus:border-indigo-400 
                  focus:ring-2 focus:ring-indigo-200/30 outline-none transition
                  placeholder-gray-500 text-gray-800 text-sm xs:text-base
                "
                type="text"
                placeholder="Your full name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1.5 text-sm xs:text-base">
              Email
            </label>
            <input
              className="
                w-full px-4 xs:px-5 py-3 rounded-2xl border border-gray-300/50 
                bg-white/40 backdrop-blur-sm focus:border-indigo-400 
                focus:ring-2 focus:ring-indigo-200/30 outline-none transition
                placeholder-gray-500 text-gray-800 text-sm xs:text-base
              "
              type="email"
              placeholder="hello@journey.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1.5 text-sm xs:text-base">
              Password
            </label>
            <input
              className="
                w-full px-4 xs:px-5 py-3 rounded-2xl border border-gray-300/50 
                bg-white/40 backdrop-blur-sm focus:border-indigo-400 
                focus:ring-2 focus:ring-indigo-200/30 outline-none transition
                placeholder-gray-500 text-gray-800 text-sm xs:text-base
              "
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          {/* Submit Button - larger & responsive */}
          <button
            type="submit"
            className="
              w-full py-3.5 xs:py-4 sm:py-4.5 bg-gradient-to-r from-indigo-500 to-blue-500 
              hover:from-indigo-600 hover:to-blue-600 
              text-white font-medium rounded-2xl shadow-lg 
              transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
              text-base sm:text-lg md:text-xl
            "
          >
            {state === "Sign up" ? "Create Account" : "Login"}
          </button>

          {/* Google Login */}
          <div className="mt-6 sm:mt-8">
            <div className="relative flex items-center gap-4">
              <div className="flex-grow h-px bg-gray-300/70"></div>
              <span className="text-sm text-gray-500 font-medium">OR</span>
              <div className="flex-grow h-px bg-gray-300/70"></div>
            </div>

            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google Login Failed")}
                useOneTap={false}
                width="340"
                theme="outline"
                size="large"
                text="continue_with"
                shape="rectangular"
              />
            </div>
          </div>

          {/* Toggle */}
          <p className="text-center mt-6 sm:mt-8 text-gray-600 text-sm sm:text-base">
            {state === "Sign up" ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                New here?{" "}
                <span
                  onClick={() => setState("Sign up")}
                  className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                >
                  Create account
                </span>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
