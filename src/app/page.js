'use client'
import Image from "next/image";
import Button from '@/components/ui/Button.jsx';
import LoginForm from '@/components/features/(auth)/LoginForm'
import { useState } from "react";


export default function Home() {
  const [showLogin,setshowLogin] = useState(false);
  return (
    <div>
      
    <h1>hello</h1>
    {showLogin ? (
    <LoginForm/>
    
    ):(
      <Button onClick={() => setshowLogin(true)}/>
    )}
    
    </div>
    

  );
}
