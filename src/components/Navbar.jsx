import React from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { app } from '../firebase'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/Auth/authSlice';

const auth = getAuth(app);

const Navbar = () => {
  const user = useSelector(selectUser);

  return (
    <div className='box flex items-center flex-wrap justify-center gap-2 min-[1130px]:justify-between min-[1130px]:gap-0 px-2 py-4 rounded-tl-lg text-indigo-200 bg-[#2f2d57]'>
      <span className='font-bold text-2xl'>Chattify</span>
      <div className="flex items-center gap-1">
        <div className='flex'>
        <img src={user.photoURL} alt="" className='h-6 w-6 rounded-[50%] hidden md:inline-block object-cover' />
        <span className='mx-1 flex flex-wrap items-end justify-center'>{user.displayName}</span>
        </div>
        <button onClick={()=> signOut(auth)} className='bg-[#7f7fb4] p-1 rounded-sm text-xs text-indigo-100'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
