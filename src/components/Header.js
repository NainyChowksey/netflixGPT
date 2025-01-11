import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { NETFLIX_LOGO, USER_AVATAR } from '../utils/constants';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store)=>store.user);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
    if (user) {
    const {uid, displayName, email} = user;
    dispatch(addUser({uid:uid, displayName:displayName, email:email, profileURL:USER_AVATAR}))
    navigate("/browse")
    
   } else {
    dispatch(removeUser())
    navigate("/")
  }
  })
  },[])

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      
    });

  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={NETFLIX_LOGO}
        alt="logo" />
      <div className='flex'>
        <img 
        alt='user-profile'
        className='w-9 h-9 mt-4' src={user?.profileURL}/>
        <button onClick={handleSignOut} className="text-bold cursor-pointer m-2 p-4 text-white">Sign Out</button>
      </div>
    </div>


  )
}

export default Header