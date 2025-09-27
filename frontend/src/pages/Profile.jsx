import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUserFailure, DeleteUserStart, DeleteUserSuccess, UpdateFailure, UpdateStart, UpdateSuccess, UserSignout } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(UpdateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(UpdateFailure(data));
        return;
      }
      dispatch(UpdateSuccess(data));
      setUpdateSuccess(true);
    }
    catch (error) {
      dispatch(UpdateFailure(error));
    }
  }

  const handleDeleteAccount = async () => {
    try {
      dispatch(DeleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(DeleteUserFailure(data));
        return;
      }
      dispatch(DeleteUserSuccess(data));
      navigate('/signup');
    }
    catch (error) {
      dispatch(DeleteUserFailure(error));
    }
  }

  const handleSignout = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(UserSignout());
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto mb-9'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleUpdate} className='flex flex-col gap-4'>
        <img className='w-24 h-24 object-cover rounded-full self-center' src={currentUser.profilePicture} />

        <input type='text' id='username' className='bg-slate-100 p-3 rounded-lg' placeholder='Username' defaultValue={currentUser.username} onChange={handleChange} />

        <input type='email' id='email' className='bg-slate-100 p-3 rounded-lg' placeholder='Email' defaultValue={currentUser.email} onChange={handleChange} />

        <input type='password' id='password' className='bg-slate-100 p-3 rounded-lg' placeholder='Password' onChange={handleChange} />

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : "Update"}</button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteAccount}>Delete Account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignout}>Sign Out</span>
      </div>

      <p className='text-red-700 my-5'>{error && 'Something went wrong!'}</p>
      <p className='text-green-700 my-5'>{updateSuccess && 'User Updated Successfully!'}</p>
    </div>
  )
}
