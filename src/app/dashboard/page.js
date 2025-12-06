'use client'
import Image from "next/image";
import LoginForm from '@/app/login/LoginForm'
import { useState } from "react";



export default function Home() {
  const [showLogin,setshowLogin] = useState(false);
  return (
    
    <div>
      
   <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    
    {showLogin ? (
    <LoginForm/>
    
    ):(
      
      <div className="">
      <div className="h-screen flex flex-col justify-end items-center pb-75">
        <button
        onClick={() => {setshowLogin(true)}}
        className="bg-[#6C90A7] text-white px-70 py-12 rounded-[40px]"
        >
            Get Started
        </button>
        </div>
         </div>
    )}
 
    </div>
    

  );
 
}
