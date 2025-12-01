'use client';
import { useState } from "react";
import Homepage from "../homepage/Homepage";

// --- Sub-component to keep the main code clean ---
const BackgroundLines = () => (
  <>
    
    <div className="absolute top-[9%] right-[0%] w-[300px] md:w-[500px] 2xl:w-[800px] h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent rotate-[134deg] opacity-60" />
   
    <div className="absolute top-[10%] right-[40%] w-[300px] md:w-[500px] 2xl:w-[800px] h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent rotate-[134deg] opacity-60" />
  
    <div className="absolute top-[10%] right-[70%] w-[300px] md:w-[500px] 2xl:w-[800px] h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent rotate-[134deg] opacity-60" />
    
    <div className="absolute top-[25%] left-[25%] w-80 md:w-[500px] 2xl:w-[800px] h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent rotate-[134deg] opacity-70 animate-pulse" />
    
    <div className="absolute top-[60%] left-[-50%] w-96 md:w-[600px] 2xl:w-[1000px] h-[3px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent rotate-[134deg] opacity-60 blur-[1px]" />
    
    <div className="absolute bottom-40 right-10 w-80 md:w-[500px] 2xl:w-[900px] h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent rotate-[134deg] opacity-50" />
    
    <div className="absolute top-[80%] left-[70%] w-96 md:w-[600px] 2xl:w-[1000px] h-[3px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent rotate-[134deg] opacity-60 blur-[1px]" />

    <div className="absolute top-[80%] left-[50%] w-96 md:w-[600px] 2xl:w-[1000px] h-[3px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent rotate-[134deg] opacity-60 blur-[1px]" />
   
    <div className="absolute top-[70%] left-[20%] w-96 md:w-[600px] 2xl:w-[1000px] h-[3px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent rotate-[134deg] opacity-60 blur-[1px]" />
    
    <div className="absolute bottom-80 right-20 w-[300px] md:w-[500px] 2xl:w-[800px] h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent rotate-[134deg] opacity-50" />
  </>
);

export default function LoginForm() {
  const [showHomePage, setHomePage] = useState(false);
  const loginclick =() =>{
    setHomePage(true)
  }

  const placeholderClick = () => {
    console.log("Feature coming soon!");
  };



  if (showHomePage) {
    return <Homepage />;
  }

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-gradient-to-b from-[#1a1a40] to-[#22d3ee] flex items-center justify-center overflow-hidden">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
   
      <BackgroundLines />

      {/* --- CONTAINER --- */}
      
      <div className="relative z-10 w-[90%] md:w-full max-w-md md:max-w-2xl 2xl:max-w-4xl flex flex-col items-center transition-all duration-300">
        
        {/* LOGO AREA */}
        <div className="mb-8 md:mb-10 2xl:mb-[-10] text-center relative flex flex-col items-center">
          <img 
            src="/images/logo.png" 
            alt="Adrenaline Hub Logo"
            
            className="relative z-20 w-64 md:w-[500px] 2xl:w-[800px] mx-auto drop-shadow-lg transition-all" 
          />
          {/* Platform Glow */}
          <div className="absolute z-10 bottom-[60px] 2xl:bottom-[60px] w-[140px] md:w-[450px] 2xl:w-[450px] h-[25px] 2xl:h-[50px] bg-white/20 rounded-[100%] blur-md" />
        </div>

        {/*  CONTAINER */}
        <div className="w-full space-y-4 md:space-y-6 2xl:space-y-12">
          
          
          <div className="bg-[#1f2937]/80 backdrop-blur-sm rounded-xl p-4 2xl:p-8 border border-white/10 shadow-lg">
            <p className="text-gray-400 text-sm md:text-base 2xl:text-2xl font-medium mb-1">Email address</p>
            <input 
              type="text" 
              placeholder="name@example.com" 
              className="bg-transparent w-full text-white outline-none text-base md:text-xl 2xl:text-4xl placeholder-gray-500" 
            />
          </div>

          
          <div className="bg-[#1f2937]/80 backdrop-blur-sm rounded-xl p-4 2xl:p-8 border border-white/10 shadow-lg">
            <p className="text-gray-400 text-sm md:text-base 2xl:text-2xl font-medium mb-1">Password</p>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="bg-transparent w-full text-white outline-none text-base md:text-xl 2xl:text-4xl placeholder-gray-500" 
            />
          </div>

         
          <div className="flex">
            <u 
    onClick={placeholderClick}
        className="text-[blue] text-[24px] ml-5 mt-3 cursor-pointer"
    >
        Forgot Password
    </u>
          </div>

       
         <button
         onClick={loginclick}  
         className="  p-4 2xl:p-8 w-full text-base md:text-xl 2xl:text-4xl bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all">
                Login
            </button>

          
          <div className="flex items-center gap-4 py-2 2xl:py-4">
            <div className="h-px bg-white/20 flex-1" />
            <span className="text-gray-400 text-sm md:text-lg 2xl:text-2xl font-medium">OR</span>
            <div className="h-px bg-white/20 flex-1" />
          </div>

          {/* Sign Up Button */}
          <div>
           <button
         onClick={placeholderClick}
        className= "p-4 2xl:p-8 w-full text-base md:text-xl 2xl:text-4xl bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all"
                
        >SignUp</button>
          </div>

        </div>
      </div>
    </div>
  );
}