import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteUserFailure,
  DeleteUserStart,
  DeleteUserSuccess,
  UpdateFailure,
  UpdateStart,
  UpdateSuccess,
  UserSignout,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./../utils/constants";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(UpdateStart());
      const res = await fetch(
        `${API_BASE_URL}/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(UpdateFailure(data));
        return;
      }
      dispatch(UpdateSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(UpdateFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(DeleteUserStart());
      const res = await fetch(
        `${API_BASE_URL}/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(DeleteUserFailure(data));
        return;
      }
      dispatch(DeleteUserSuccess(data));
      navigate("/signup");
    } catch (error) {
      dispatch(DeleteUserFailure(error));
    }
  };

  const handleSignout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/signout`, {
        method: "GET",
        credentials: "include",
      });
      dispatch(UserSignout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mb-9">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <img
          className="w-24 h-24 object-cover rounded-full self-center"
          src={currentUser.profilePicture}
        />

        <input
          type="text"
          id="username"
          className="bg-purple-300 p-3 rounded-lg focus:outline-none"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />

        <input
          type="email"
          id="email"
          className="bg-purple-300 p-3 rounded-lg focus:outline-none"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          className="bg-purple-300 p-3 rounded-lg focus:outline-none"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-purple-800 font-semibold cursor-pointer text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span
          className="text-red-700 cursor-pointer font-semibold"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </span>
        <span
          className="text-red-700 cursor-pointer font-semibold"
          onClick={handleSignout}
        >
          Sign Out
        </span>
      </div>

      <p className="text-red-700 my-5">{error && "Something went wrong!"}</p>
      <p className="text-green-700 my-5 font-semibold">
        {updateSuccess && "User Updated Successfully!"}
      </p>
    </div>
  );
}
