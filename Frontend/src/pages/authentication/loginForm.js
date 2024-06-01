import axios from "axios";
import React, { useState } from "react";
import API_BASE_URL from "../../Config";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get("token");
      if (token) {
        console.log("Token found:", token);
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/ios/auth/verify_token`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          );

          if (response.data.status === "authorized") {
            navigate("/dashboard");
          } else {
            Cookies.remove("token");
          }
        } catch (error) {
          console.error(
            "Token verification failed:",
            error.response ? error.response.data : error.message
          );
          Cookies.remove("token");
        }
      }
    };

    verifyToken();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }

    try {
      const login_provider = "inhouse";
      axios.defaults.headers.post['Content-Type'] ='application/json';

      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        login_provider,
        email,
        password,
      });

      Cookies.set("token", response.data.token, { expires: 7 , secure: false});

      console.log("Login successful:", response.data);

      navigate("/dashboard");
      // Handle successful login (e.g., save token, redirect user)
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      // Handle login failure (e.g., show error message to user)
    }
  };

  return (
    <div className="bg-white px-14 pt-10 pb-2 rounded-md shadow-md border border-gray-100">
      <h1 className="text-2xl font-semibold text-gray-700 w-80">
        Sign in to your account
      </h1>

      <div className="mt-8">
        <div>
          <label className="text-sm font-medium text-gray-500">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded p-2 mt-1 bg-transparent"
            placeholder=""
          />
        </div>
        <div className="mt-6">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-500">
              Password
            </label>
            <button className="text-sm font-medium hover:text-black text-violet-500">
              Forgot your password?
            </button>
          </div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-sm p-2 mt-1 bg-transparent"
            placeholder=""
            type="password"
          />
        </div>
        <div className="mt-6">
          <div>
            <input className="" type="checkbox" id="rememberMe" />
            <label className="text-sm text-gray-500" htmlFor="rememberMe">
              {" "}
              Remember me
            </label>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type=""
            onClick={handleSubmit}
            className="active:scale-[.98] transition:all hover:scale-[1.01] ease-in-out py-3 bg-[#625bf6] rounded-md text-white text-sm font-medium"
          >
            Sign in
          </button>
        </div>
        <div className="mt-6 flex justify-center">
          <button className="text-sm font-medium hover:text-black text-violet-500">
            Use single sign-on (SSO)
          </button>
        </div>
        <div className="bg-gray-100 py-4 mt-6 rounded-md -mx-12">
          <p className="text-center text-xs font-medium text-gray-500">
            New to Stripe?{" "}
            <a
              href="signup"
              className="text-violet-500 font-medium hover:text-black"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
