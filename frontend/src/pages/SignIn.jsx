import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SignInFailure,
  SignInStart,
  SignInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { API_BASE_URL } from "./../utils/constants";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(SignInStart());
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(SignInFailure(data));
        return;
      }
      dispatch(SignInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(SignInFailure(error));
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-purple-900 text-5xl text-center font-semibold my-10 font-cursive">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          className="bg-purple-800 font-semibold cursor-pointer text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to="/sign-up">
          <span className="text-purple-800 font-semibold hover:underline">
            Sign up
          </span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
}
