import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { NETFLIX_LOGO, USER_AVATAR } from '../utils/constants';
import { ShowGptSearch } from '../utils/gptSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store)=>store.user);
  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch)

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

  const handleGptToggle =()=>{
    dispatch(ShowGptSearch())
  }

  const handleSignOut = () => {

    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      
    });

  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-black md:bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={NETFLIX_LOGO}
        alt="logo" />
      {user && <div className='flex justify-center'>
      <button onClick={handleGptToggle} className="text-bold cursor-pointer m-3 mt-4 px-4 py-1 h-9 text-white rounded-lg bg-red-800" >{showGptSearch? 'Home Page' :'Ask GPT'}</button>
      <button onClick={handleSignOut} className="text-bold cursor-pointer m-3 mt-4 px-4 py-1 h-9 text-white rounded-lg bg-red-800">Sign Out</button>
        <img 
        alt='user-profile'
        className='w-9 h-9 mt-4' src={user?.profileURL}/>
      </div>}
    </div>


  )
}

export default Header