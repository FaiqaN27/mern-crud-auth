import { useSelector } from 'react-redux';

export default function Profile() {
  const { loading, error, currentUser } = useSelector((state) => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className='w-28 h-24 object-cover rounded-full self-center cursor-pointer' src={currentUser.profilePicture} />

        <input type='text' id='username' className='bg-slate-100 p-3 rounded-lg' placeholder='Username' defaultValue={currentUser.username} />

        <input type='email' id='email' className='bg-slate-100 p-3 rounded-lg' placeholder='Email' defaultValue={currentUser.email} />

        <input type='password' id='password' className='bg-slate-100 p-3 rounded-lg' placeholder='Password' />

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : "Update"}</button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
