import React, { useState , useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validations';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase"

const Login = () => {

    const [isSignIn, setIsSignIn]=useState(true);
    const [errorMessage, setErrorMessage]=useState(null);

    const email = useRef()
    const name = useRef()
    const password = useRef()
    const handleSignInToggle=()=>{
        setIsSignIn(!isSignIn)
    }


    const handleButtonClick=()=>{
        const message = checkValidData(email.current.value, password.current.value)
        setErrorMessage(message);
        if(message!==null)return
        if(!isSignIn){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
              .then((userCredential) => {
                const user = userCredential.user;
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+"-"+errorMessage)
              });
        }
        else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              const user = userCredential.user;
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode+"-"+errorMessage)
            });
        }         
    }

    return (
            <div>
                <Header/>
                <div className='absolute'>
                    <img className="object-cover "src="https://assets.nflxext.com/ffe/siteui/vlv3/2f5a878d-bbce-451b-836a-398227a34fbf/web/IN-en-20241230-TRIFECTA-perspective_5ab944a5-1a71-4f6d-b341-8699d0491edd_medium.jpg"
                        alt="logo" />
                </div>         
                <form onSubmit={(e)=>e.preventDefault()}className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className='p-2 font-bold text-3xl mb-4'>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
                    {!isSignIn && <input ref={name} className="bg-black m-2 p-4 w-full  border-gray-600  border text-white rounded-sm bg-opacity-0"text="Name"  type="text" placeholder='Full Name'/>}
                    <input  ref={email} className="bg-black  border-gray-600  border m-2 p-4 w-full rounded-sm bg-opacity-0" text="Email" type="text"  placeholder='Email'/>
                    <input ref={password} className="bg-black  border-gray-600 border m-2 p-4 w-full rounded-sm bg-opacity-0" text="Password" type="text"  placeholder='Password'/>
                    <button onClick={handleButtonClick} className='bg-red-800 m-2 mt-8 p-2 w-full rounded-md cursor-pointer'>{isSignIn ? 'Sign In' :'Sign up'}</button>
                    <span className='text-red-600 text-sm text-bold m-2'>{errorMessage}</span>
                    <p className='p-2 text-l text-gray-400 cursor-pointer mb-8' onClick={handleSignInToggle}>{isSignIn? 'New to Netflix?': 'Already an user?'}<span className='text-white'> {isSignIn? 'Sign up now.':'Sign in now.'}</span></p>
                </form>
            </div>
            )
}

export default Login