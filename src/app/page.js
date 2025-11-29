'use client'
import Image from "next/image";
import Button from '@/components/ui/Button.jsx';
import LoginForm from '@/components/features/(auth)/LoginForm'
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
      <Button onClick={() => setshowLogin(true)}/>
         </div>
    )}
 
    </div>
    

  );
 
}
