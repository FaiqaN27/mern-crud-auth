import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { API_BASE_URL } from "./../utils/constants";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-5xl text-center font-semibold my-7 font-cursive text-purple-900">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className=" bg-purple-300 p-3 rounded-lg focus:outline-none"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-purple-300 p-3 rounded-lg focus:outline-none"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-purple-300 p-3 rounded-lg focus:outline-none"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-purple-800 font-semibold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer"
        >
          {loading ? "loading..." : "Sign up"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-purple-800 font-semibold hover:underline">
            Sign in
          </span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
    </div>
  );
}
